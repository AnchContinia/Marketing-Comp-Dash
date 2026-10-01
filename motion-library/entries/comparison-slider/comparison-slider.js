/* Continia Motion Library — Comparison Slider
   Two versions of one picture stacked exactly on top of each other, with a
   divider you drag across them: everything left of the line is the first,
   everything right of it is the second. The handle does not snap to the
   pointer - it is pulled there by a spring, so a flick throws the line and it
   settles rather than stopping dead.

   Built from scratch on the Continia tokens. The motion idea is the one React
   Bits Pro ships as "Comparison Slider"; none of their code is used here - it
   is a paid product whose licence (§2.4) forbids putting its source in a
   repository, and this repo is public. See meta.json → brandNotes.

   The arrow is the library's own User Cursor, mounted rather than redrawn, as
   the standing rule for any entry whose point is a pointer requires. It drives
   the demo when nobody else is: it walks to the handle, presses, drags the
   divider across and lets go. The divider hit-tests `uc.at()` - where the
   arrow's tip is heading - not the real pointer, so the two can never disagree
   about where the line should be. A real pointer takes over the moment it
   enters the stage and the tour stands down.

   Usage:
     <div data-ml="comparison-slider" data-height="360" data-labels="Before,After">
       <img src="before.jpg" alt="…" data-cs="before">
       <img src="after.jpg"  alt="…" data-cs="after">
     </div>
     <script type="module" src="entries/comparison-slider/comparison-slider.js"></script>

   The two sides are the children carrying data-cs="before" / "after", or
   failing that the first two element children in that order. Anything may go
   in them - an <img>, a <video>, a block of markup.

   Or call it yourself:
     import { initComparisonSlider } from "./comparison-slider.js";
     const cs = initComparisonSlider(el, { orientation: "vertical", initial: 35 });
     cs.set(80);
     cs.destroy(); */

import { prefersReducedMotion, durationMs } from "../../tokens/motion-tokens.js";
import { initUserCursor } from "../user-cursor/user-cursor.js";

export const DEFAULTS = {
  height: 360,              /* px, the stage */
  orientation: "horizontal",/* horizontal | vertical */
  initial: 50,              /* where the divider starts, 0-100 */

  /* Inertia. The divider is pulled to the pointer by a critically damped
     spring rather than written to it, which is what makes a flick read as a
     thrown object instead of a jump cut. `follow` is the spring's time
     constant and comes off the duration scale like every other timing here;
     bigger is heavier. Off, the line sits exactly under the pointer. */
  inertia: true,
  follow: durationMs.base,  /* 250ms */

  mode: "drag",             /* drag = press and move | hover = follow the pointer */
  handle: true,             /* the knob on the divider */
  grip: true,               /* the six dots inside it */
  bar: true,                /* the divider line itself */

  /* How close to the ends the divider may come, in px. The knob is a circle
     and the frame clips, so at 0 the far ends of the travel render it as a
     half circle - which is not an approved Continia shape. The default keeps
     the whole circle inside at the default knob size, and the stop is dropped
     entirely when there is no knob to protect. */
  bounds: 20,

  labels: "Before,After",   /* two, comma separated. "" for none. */
  size: 36,                 /* px, the knob */

  /* The self-running tour. `cursor` mounts the library's User Cursor and hands
     it the tour below; without it the entry is an ordinary slider that waits
     for a pointer. */
  cursor: true,
  name: "",                 /* the cursor's pill - empty is the arrow on its own */
  arrow: 22,                /* px, the arrow */
  cycle: 9000,              /* ms for one full tour: grab, left, right, centre, let go */
  reach: 20,                /* how far either side of centre the tour drags, in % */

  accent: "auto",           /* auto | blue | cyan | green | purple - palette only */
  autoplay: true,
  paused: false,
  compact: false            /* the card-sized skin */
};

var ACCENTS = ["auto", "blue", "cyan", "green", "purple"];
var AXES = ["horizontal", "vertical"];
var MODES = ["drag", "hover"];

var NUM = ["height", "initial", "follow", "bounds", "size", "arrow", "cycle", "reach"];
var BOOL = ["inertia", "handle", "grip", "bar", "cursor", "autoplay", "paused", "compact"];

function fromData(el) {
  var o = {}, d = el.dataset, k, camel;
  for (k in d) {
    camel = k.replace(/-([a-z])/g, function (m, c) { return c.toUpperCase(); });
    if (!(camel in DEFAULTS)) continue;
    if (NUM.indexOf(camel) >= 0) o[camel] = parseFloat(d[k]);
    else if (BOOL.indexOf(camel) >= 0) o[camel] = d[k] !== "0" && d[k] !== "false";
    else o[camel] = d[k];
  }
  return o;
}

function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

/* A critically damped spring, integrated in closed form so a 64ms frame is as
   stable as a 4ms one. The same model the User Cursor's follower uses, and for
   the same reason: a single-pole lag answers a jumped target with its HIGHEST
   speed in the very first frame and decays from there, so a divider thrown at
   the far edge would leave at a sprint and crawl in. The spring leaves at rest,
   accelerates, and arrives at rest with no overshoot. `w` is its frequency,
   taken off the same `follow` token a lag would have used. */
function damp(p, v, t, w, dt) {
  var e = Math.exp(-w * dt), A = p - t, B = v + w * A, q = A + B * dt;
  return [t + q * e, (B - w * q) * e];
}

export function initComparisonSlider(node, options) {
  if (!node || node.nodeType !== 1) throw new Error("initComparisonSlider: needs an element");
  /* Both hosts call mountAll after the cards exist and the module also
     auto-inits on import, so every mount is init'd twice; without this the
     second run captures the first run's wrappers as the caller's children. */
  if (node.__ml) return node.__ml;

  var o = Object.assign({}, DEFAULTS, fromData(node), options || {});
  if (ACCENTS.indexOf(o.accent) < 0) {
    throw new Error('initComparisonSlider: accent "' + o.accent + '" is not one of ' + ACCENTS.join(", ") +
      " - the palette is deliberate, add a token rather than a hex here");
  }
  if (AXES.indexOf(o.orientation) < 0) throw new Error('initComparisonSlider: orientation must be one of ' + AXES.join(", "));
  if (MODES.indexOf(o.mode) < 0) throw new Error('initComparisonSlider: mode must be one of ' + MODES.join(", "));
  if (!(o.follow > 0)) throw new Error("initComparisonSlider: follow must be > 0");
  if (!(o.cycle > 0)) throw new Error("initComparisonSlider: cycle must be > 0");

  var kept = [].slice.call(node.childNodes);

  /* Find the two sides. An explicit data-cs wins, so markup can carry a
     caption or a <template> between them without becoming a side by accident;
     otherwise the first two elements, in document order. */
  var els = kept.filter(function (n) { return n.nodeType === 1; });
  var before = els.filter(function (n) { return n.dataset && n.dataset.cs === "before"; })[0];
  var after = els.filter(function (n) { return n.dataset && n.dataset.cs === "after"; })[0];
  if (!before || !after) { before = els[0]; after = els[1]; }
  /* An empty render here is an afternoon of looking for a CSS bug, so it
     throws instead: a comparison of one thing is not a comparison. */
  if (!before || !after) {
    throw new Error("initComparisonSlider: needs two children - mark them data-cs=\"before\" and data-cs=\"after\", " +
      "or supply exactly two elements");
  }

  /* The User Cursor wraps whatever it is mounted on and parks its handle on
     el.__ml - the name both hosts read - so it gets a stage of its own inside
     this node rather than the node itself, exactly as Hover Preview does. */
  var stage = document.createElement("div");
  stage.className = "mlcs-stage";

  var frame = document.createElement("div");
  frame.className = "mlcs-frame";
  stage.appendChild(frame);

  var lay = { before: document.createElement("div"), after: document.createElement("div") };
  lay.before.className = "mlcs-layer mlcs-is-before";
  lay.after.className = "mlcs-layer mlcs-is-after";
  lay.before.appendChild(before);
  lay.after.appendChild(after);
  frame.appendChild(lay.before);
  frame.appendChild(lay.after);

  var labels = String(o.labels || "").split(",").map(function (s) { return s.trim(); });
  var lab = { before: null, after: null };
  if (labels[0]) { lab.before = document.createElement("span"); lab.before.className = "mlcs-label mlcs-is-before"; lab.before.textContent = labels[0]; frame.appendChild(lab.before); }
  if (labels[1]) { lab.after = document.createElement("span"); lab.after.className = "mlcs-label mlcs-is-after"; lab.after.textContent = labels[1]; frame.appendChild(lab.after); }

  var bar = null;
  if (o.bar) { bar = document.createElement("i"); bar.className = "mlcs-bar"; frame.appendChild(bar); }

  var knob = null;
  if (o.handle) {
    knob = document.createElement("button");
    knob.type = "button";
    knob.className = "mlcs-knob";
    /* A slider is what this is, so it says so: arrow keys, Home and End all
       work and a screen reader reads a percentage rather than "button". */
    knob.setAttribute("role", "slider");
    knob.setAttribute("aria-orientation", o.orientation);
    knob.setAttribute("aria-valuemin", "0");
    knob.setAttribute("aria-valuemax", "100");
    knob.setAttribute("aria-label", (labels[0] || "Before") + " / " + (labels[1] || "After") + " comparison");
    knob.innerHTML = o.grip ? '<i class="mlcs-grip" aria-hidden="true"></i>' : "";
    frame.appendChild(knob);
  }

  node.classList.add("mlcs");
  if (o.compact) node.classList.add("mlcs-sm");
  node.setAttribute("data-axis", o.orientation);
  node.appendChild(stage);

  var pos = clamp(o.initial, 0, 100), tpos = pos, vel = 0,
      W = 0, H = 0, lo = 0, hi = 100,
      raf = 0, last = 0, running = false, reduced = false,
      dragging = false, grabbed = false, pressed = -1, clock = 0,
      /* The visitor has taken over. A pointer announces itself through the
         cursor's own mode, but a key press does not - and without this latch
         the tour wrote the divider straight back on the next frame, so the
         arrow keys moved it and it moved itself back. */
      manual = false,
      uc = null, io = null, ro = null, listeners = [];

  function on(t, ev, fn, opt) { t.addEventListener(ev, fn, opt); listeners.push([t, ev, fn, opt]); }

  /* Hand the slider to the visitor, and take it back when they leave. Taking
     it back starts a FRESH cycle rather than resuming mid-tour: leg 0 walks
     the arrow to wherever the divider now is, so the hand-back is a move the
     spring can make instead of a yank to wherever the tour had got to. */
  function hand(on_) {
    if (manual === on_) return;
    manual = on_;
    if (!on_) { clock = Math.ceil(clock / o.cycle) * o.cycle; pressed = -1; grabbed = false; }
  }

  function vars() {
    node.style.setProperty("--mlcs-h", o.height + "px");
    node.style.setProperty("--mlcs-size", o.size + "px");
    node.setAttribute("data-accent", o.accent);
  }

  function measure() {
    var r = stage.getBoundingClientRect();
    W = r.width; H = r.height;
    /* The stop is a px distance converted against whichever axis the divider
       runs along, so a 350px card and a 1200px hero keep the same visual gap
       rather than the same percentage. */
    var span = o.orientation === "vertical" ? H : W;
    var b = o.handle ? o.bounds : 0;
    lo = span > 0 ? clamp((b / span) * 100, 0, 49) : 0;
    hi = 100 - lo;
    return r;
  }

  /* A point in stage coordinates to a position on the axis. Both the real
     pointer and the arrow's tip arrive here, so there is one definition of
     where the line should be. */
  function pctAt(x, y) {
    var span = o.orientation === "vertical" ? H : W;
    if (!(span > 0)) return pos;
    return clamp(((o.orientation === "vertical" ? y : x) / span) * 100, lo, hi);
  }

  function paint() {
    var p = pos.toFixed(3) + "%";
    /* The clip is on the AFTER layer only: both layers are laid out at full
       size, so nothing re-flows while the divider moves and the two pictures
       stay in register at every position. clip-path is composited, width is
       not - animating a width here would re-layout an <img> 60 times a second. */
    lay.after.style.clipPath = o.orientation === "vertical"
      ? "inset(" + p + " 0 0 0)"
      : "inset(0 0 0 " + p + ")";
    node.style.setProperty("--mlcs-p", p);
    if (knob) knob.setAttribute("aria-valuenow", Math.round(pos));
    /* A label sitting on the wrong side of the line is unreadable over the
       other picture, so each one fades out as the divider reaches it rather
       than being left to collide. */
    if (lab.before) lab.before.classList.toggle("is-off", pos < 18);
    if (lab.after) lab.after.classList.toggle("is-off", pos > 82);
  }

  function set(v, snap) {
    tpos = clamp(v, lo, hi);
    if (snap || !o.inertia || reduced) { pos = tpos; vel = 0; paint(); }
    else kick();
  }

  /* ---- the tour ------------------------------------------------------
     Six legs over one `cycle`, closing its own loop: the last leg leaves the
     arrow beside the knob at centre, which is where the first leg starts
     looking for it, so a cycle boundary is not a teleport. Every waypoint is
     a percentage worked out here, never a getBoundingClientRect of the knob -
     reading a live rect off an element the tour is itself moving is what had
     an earlier entry's arrow sprinting after its own target. */
  var LEGS = [
    { to: 0.14, grab: false, aim: "knob" },   /* walk to the handle */
    { to: 0.21, grab: true, aim: "hold" },    /* press, and hold for a beat */
    { to: 0.46, grab: true, aim: -1 },        /* drag toward the before side */
    { to: 0.74, grab: true, aim: 1 },         /* and across to the after side */
    { to: 0.86, grab: true, aim: 0 },         /* back to the middle */
    { to: 1.00, grab: false, aim: "away" }    /* let go and step off it */
  ];

  function leg(f) {
    for (var i = 0; i < LEGS.length; i++) if (f < LEGS[i].to) return i;
    return LEGS.length - 1;
  }

  /* Where the arrow's TIP should be, in stage coordinates. The divider is not
     written here - it reads the arrow through at() and follows, which is the
     same causality a real drag has. */
  function tour(c) {
    if (!(W > 0) || !(H > 0)) return null;
    /* While the visitor has it, the arrow rests on the handle rather than
       standing wherever the tour was frozen. Only the keyboard reaches this -
       a real pointer puts the cursor in pointer mode, where autoPath is not
       consulted at all - but an arrow parked across the stage while the arrow
       keys move the divider reads as two pointers. */
    if (manual) {
      var sp = o.orientation === "vertical" ? H : W;
      var md = o.orientation === "vertical" ? W / 2 : H / 2;
      var ln = (pos / 100) * sp;
      return o.orientation === "vertical" ? [md, ln] : [ln, md];
    }
    var f = (c % o.cycle) / o.cycle, i = leg(f), L = LEGS[i];
    var span = o.orientation === "vertical" ? H : W;
    var mid = o.orientation === "vertical" ? W / 2 : H / 2;
    var p;
    if (L.aim === "knob" || L.aim === "hold") p = pos;
    else if (L.aim === "away") p = pos;
    else p = clamp(50 + L.aim * o.reach, lo, hi);

    var along = (p / 100) * span;
    /* The step-off is a short move to one side of the knob, not a trip to a
       corner: the next cycle has to start from here. */
    var across = L.aim === "away" ? mid + Math.min(mid * 0.55, o.size * 1.6) : mid;
    return o.orientation === "vertical" ? [across, along] : [along, across];
  }

  function frameStep(now) {
    if (!running) return;
    raf = requestAnimationFrame(frameStep);
    var dt = Math.min(64, now - last);   /* a backgrounded tab must not teleport the line */
    last = now;
    if (dt <= 0) return;

    var p = uc ? uc.at() : null;

    /* A real pointer always wins. The cursor reports which source is setting
       its target, so the tour stands down the moment one arrives instead of
       fighting the hand that is already on the handle. */
    if (p && p.mode === "pointer") { grabbed = false; pressed = -1; }
    else if (uc && !manual && !dragging && !o.paused && !reduced) {
      clock += dt;
      var f = (clock % o.cycle) / o.cycle, i = leg(f), L = LEGS[i], n = Math.floor(clock / o.cycle);
      /* press() once per cycle, on the frame the grab begins - the module
         knows where the arrow is, not what it is pressing, so saying when is
         this component's job. */
      if (L.grab && pressed !== n) { pressed = n; if (uc.press) uc.press(); }
      grabbed = L.grab;
      if (grabbed && p) set(pctAt(p.x, p.y));
    }

    if (knob) knob.classList.toggle("is-grabbed", grabbed || dragging);

    if (o.inertia && !reduced) {
      var r = damp(pos, vel, tpos, 2 / o.follow, dt);
      pos = r[0]; vel = r[1];
    } else { pos = tpos; vel = 0; }
    paint();

    /* Settle: nothing is driving it and the spring has arrived, so stop
       burning frames until something asks for one. */
    if (!dragging && !grabbed && !(uc && !o.paused && !reduced) &&
        Math.abs(pos - tpos) < 0.02 && Math.abs(vel) < 0.002) { pos = tpos; paint(); halt(); }
  }

  /* Paused stops the TOUR, not the component: a visitor may still drag the
     divider on a paused card, and the spring has to run for that drag to read
     as a drag at all. So a pause with a hand on the handle keeps the loop. */
  function kick() {
    if (running || reduced) return;
    if (o.paused && !dragging) { pos = tpos; paint(); return; }
    running = true; last = performance.now();
    raf = requestAnimationFrame(frameStep);
  }
  function halt() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  /* ---- the real pointer ---------------------------------------------- */
  function point(e) {
    var r = stage.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  }
  function down(e) {
    if (o.mode === "hover") return;
    hand(true);
    dragging = true;
    grabbed = false;
    node.classList.add("is-dragging");
    if (frame.setPointerCapture && e.pointerId != null) { try { frame.setPointerCapture(e.pointerId); } catch (x) {} }
    var q = point(e);
    set(pctAt(q[0], q[1]));
    /* Show the press on the arrow for a real hand too, not only for the tour -
       the cursor is the pointer here, so a grab it does not render is a grab
       that did not visibly happen. */
    if (uc && uc.press) uc.press();
    kick();
  }
  function move(e) {
    if (o.mode === "hover") { hand(true); var h = point(e); set(pctAt(h[0], h[1])); kick(); return; }
    if (!dragging) return;
    var q = point(e);
    set(pctAt(q[0], q[1]));
  }
  function up(e) {
    if (!dragging) return;
    dragging = false;
    node.classList.remove("is-dragging");
    /* Pointer capture means pointerleave does not fire during a drag, so a
       release outside the frame would leave the tour switched off for good.
       Check where the hand actually let go. */
    if (e && e.clientX != null) {
      var r = frame.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) hand(false);
    }
    /* The throw: the target stays where the hand left it and the spring runs
       the rest, so letting go mid-move coasts instead of stopping dead. */
    kick();
  }

  function key(e) {
    var k = e.key, step = e.shiftKey ? 10 : 2, v = null;
    var less = o.orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    var more = o.orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    if (k === less) v = tpos - step;
    else if (k === more) v = tpos + step;
    else if (k === "Home") v = 0;
    else if (k === "End") v = 100;
    else if (k === "PageUp") v = tpos - 10;
    else if (k === "PageDown") v = tpos + 10;
    if (v === null) return;
    e.preventDefault();
    hand(true);
    set(v);
    kick();
  }

  function mountCursor() {
    if (!o.cursor || uc) return;
    uc = initUserCursor(stage, {
      height: o.height, name: o.name, accent: o.accent, size: o.arrow,
      autoplay: o.autoplay, compact: o.compact, paused: o.paused,
      autoPath: function (c) { return tour(c); }
    });
  }

  /* Reduced motion: no tour, no spring, no throw. The divider sits where it
     was asked to sit and still answers a drag - instantly, which is the whole
     point - so the comparison is fully usable rather than switched off. */
  function still() {
    halt();
    pos = tpos; vel = 0;
    paint();
  }

  reduced = prefersReducedMotion();
  vars();
  measure();
  /* The cursor goes on last: it wraps the frame into .mluc-content and appends
     its own .mluc-layer after it, so the arrow paints over the picture without
     any z-index being involved. Re-measure afterwards - the wrap changes the
     box the tour and the hit test are written against. */
  mountCursor();
  measure();
  set(o.initial, true);

  on(frame, "pointerdown", down);
  on(frame, "pointermove", move);
  on(window, "pointerup", up);
  on(frame, "pointercancel", up);
  /* The tour comes back when the visitor leaves, not the moment they stop
     moving - a tour that restarts between two pointermoves fights the hand
     that is still on the handle. */
  on(frame, "pointerleave", function () { if (!dragging) hand(false); });
  if (knob) {
    on(knob, "keydown", key);
    on(knob, "blur", function () { hand(false); });
  }

  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(function () { measure(); set(tpos, !running); });
    ro.observe(stage);
  }

  if (reduced) still();
  else if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) kick(); else halt(); });
    }, { threshold: 0.08 });
    io.observe(node);
  } else kick();

  on(document, "visibilitychange", function () {
    if (document.hidden) halt(); else kick();
  });

  var api = {
    el: node,
    /* where the divider is, and where it is heading - two different numbers
       while the spring is still running */
    at: function () {
      return { pos: pos, target: tpos, dragging: dragging || grabbed, manual: manual, running: running };
    },
    set: function (v, snap) { set(v, snap !== false); return api; },
    update: function (next) {
      Object.assign(o, next || {});
      if (ACCENTS.indexOf(o.accent) < 0) throw new Error('initComparisonSlider: unknown accent "' + o.accent + '"');
      vars();
      node.setAttribute("data-axis", o.orientation);
      node.classList.toggle("mlcs-sm", !!o.compact);
      node.classList.toggle("is-paused", !!o.paused);
      if (knob) knob.setAttribute("aria-orientation", o.orientation);
      measure();
      if (uc) uc.update({ paused: o.paused, accent: o.accent, name: o.name, size: o.arrow });
      if (o.paused || reduced) { grabbed = false; still(); } else kick();
      return api;
    },
    isPaused: function () { return !!o.paused; },
    toggle: function () { return api.update({ paused: !o.paused }); },
    destroy: function () {
      halt();
      listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
      listeners.length = 0;
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      if (uc) uc.destroy();
      node.classList.remove("mlcs", "mlcs-sm", "is-dragging", "is-paused");
      node.removeAttribute("data-axis");
      node.removeAttribute("data-accent");
      node.style.removeProperty("--mlcs-h");
      node.style.removeProperty("--mlcs-size");
      node.style.removeProperty("--mlcs-p");
      if (stage.parentNode) stage.parentNode.removeChild(stage);
      kept.forEach(function (n) { node.appendChild(n); });
      delete node.__mlCompare;
      delete node.__ml;
    }
  };

  node.classList.toggle("is-paused", !!o.paused);
  node.__mlCompare = api;
  /* the handle both hosts look for. A host renders a play/pause button for
     every component, so it cannot know the per-entry name. */
  node.__ml = api;
  return api;
}

/* Auto-init, so a page only needs the markup and this module. */
export function mountAll(root) {
  return [].slice.call((root || document).querySelectorAll('[data-ml="comparison-slider"]'))
    .map(function (n) { return initComparisonSlider(n); });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { mountAll(); }, { once: true });
  } else { mountAll(); }
}
