/* Continia Motion Library — User Cursor
   A second cursor on the stage: an arrow with a name pill trailing behind it.
   It follows the pointer when there is one and wanders on its own when there
   is not, so a card demonstrates itself without anyone hovering it.

   Built from scratch on the Continia tokens. The motion idea is the one React
   Bits Pro ships as "User Cursor"; none of their code is used here - it is a
   paid product whose licence (§2.4) forbids putting its source in a repository,
   and this repo is public. See meta.json → brandNotes.

   Usage:
     <div data-ml="user-cursor" data-name="Sophie" data-height="360">…your content…</div>
     <script type="module" src="entries/user-cursor/user-cursor.js"></script>

   The children are yours. The module moves them into a content layer, paints
   the cursor on a layer above, and puts them back untouched on destroy().

   Or call it yourself:
     import { initUserCursor } from "./user-cursor.js";
     const uc = initUserCursor(el, { name: "Sophie", accent: "cyan" });
     uc.update({ paused: true });
     uc.destroy(); */

import { prefersReducedMotion, durationMs } from "../../tokens/motion-tokens.js";

export const DEFAULTS = {
  height: 320,            /* px, the stage */
  name: "Sophie",         /* what the pill says */
  accent: "auto",         /* auto | blue | cyan | green | purple - palette only */
  size: 22,               /* px, the arrow's width; everything else scales off it */

  /* Smoothing. These are time constants, not transitions: the cursor closes
     63% of the gap to its target in `follow` ms, so a bigger number is a
     softer, later cursor. They come off the duration scale because that is
     where every other timing in this library comes from, and the pill's is one
     step slower than the arrow's - that difference, not a hardcoded offset, is
     what makes the pill trail.

     A lagging follower sits speed x tau behind whatever it is chasing, so the
     scale cannot go much higher than this without the arrow leaving the far
     side of the stage on a fast flick: at 150ms a brisk 1.5px/ms move puts it
     225px back, and at 400ms it would be off a card entirely. Raise both
     together for a dreamier cursor, and keep one step between them. */
  follow: durationMs.fast,        /* 150ms - the arrow */
  labelFollow: durationMs.base,   /* 250ms - the pill, one step behind */
  maxTrail: 56,           /* px - the furthest the pill may fall behind the arrow */

  tilt: 12,               /* max degrees the arrow leans into a move */
  drift: 9,               /* seconds per wander cycle - a loop length, so an option */
  autoplay: true,         /* wander when no pointer is on the stage */
  hideNative: true,       /* hide the real cursor while the pointer is inside */
  paused: false,
  compact: false          /* the card-sized skin */
};

/* The tilt reaches its maximum at this speed. A brisk flick across a laptop
   trackpad is around 1.6px per millisecond; anything faster is already at the
   limit, which is what keeps a fast move from spinning the arrow. */
var TILT_AT = 1.6;
var SEQ = 0;                       /* so every instance gets its own gradient ids */

var ACCENTS = ["auto", "blue", "cyan", "green", "purple"];
var NUM = ["height", "size", "follow", "labelFollow", "maxTrail", "tilt", "drift"];
var BOOL = ["autoplay", "hideNative", "paused", "compact"];

/* data-label-follow → labelFollow, and only for keys we actually know */
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

export function initUserCursor(node, options) {
  if (!node || node.nodeType !== 1) throw new Error("initUserCursor: needs an element");
  /* The module auto-inits on import AND both hosts call mountAll after the
     cards exist, so every mount is init'd twice. Without this the second run
     captures the first run's wrappers as the caller's children, and destroy()
     then "restores" a content layer and a cursor layer instead of the markup. */
  if (node.__ml) return node.__ml;

  var o = Object.assign({}, DEFAULTS, fromData(node), options || {});
  if (ACCENTS.indexOf(o.accent) < 0) {
    throw new Error('initUserCursor: accent "' + o.accent + '" is not one of ' + ACCENTS.join(", ") +
      " - the palette is deliberate, add a token rather than a hex here");
  }
  if (!(o.follow > 0) || !(o.labelFollow > 0)) throw new Error("initUserCursor: follow/labelFollow must be > 0");

  /* the caller's children go into a layer of their own and come back on destroy */
  var kept = [].slice.call(node.childNodes);
  var content = document.createElement("div");
  content.className = "mluc-content";
  kept.forEach(function (n) { content.appendChild(n); });

  var gid = "mluc-g" + ++SEQ;
  var layer = document.createElement("div");
  layer.className = "mluc-layer";
  layer.setAttribute("aria-hidden", "true");
  layer.innerHTML =
    '<div class="mluc-label"><span class="mluc-pill"></span></div>' +
    /* Not the OS arrow with its rectangular tail - a three-pointed concave
       arrowhead: a tip, a shallow wing out to the right, a long point down, and
       a back edge that curves in between the two. Traced off the reference at
       the two frames where it is standing still, so its own lean is not baked
       into the shape: apex 49 degrees, the two edges within 8% of the same
       length, and the back edge 12% of its chord deep.

       Each of the three points is rounded to a radius of one viewBox unit,
       measured off the second reference: on a 355px render the corner arcs came
       out 17-20px against edges of ~340, so 5% of an edge. The corner is a
       quadratic whose control point is the sharp vertex it replaces, which is
       tangent to both edges by construction.

       The fill and the rim are two gradients rather than flat paint, because
       the reference is one colour throughout at a falling alpha - 0.76 at the
       tip down to nothing at the far ends, with the outline carrying its own,
       shallower ramp on top. Both read currentColor, so --mluc-accent still
       drives the whole thing and light mode stays Tech Blue. The ids are
       per-instance: SVG references are document-wide, and two cursors on one
       page would otherwise share the first one's gradients. */
    '<div class="mluc-cur"><svg viewBox="0 0 24 24" focusable="false">' +
      "<defs>" +
        '<linearGradient id="' + gid + '-f" gradientUnits="userSpaceOnUse" x1="5.8" y1="4" x2="16.6" y2="13.3">' +
          '<stop offset="0" stop-color="currentColor" stop-opacity=".94"/>' +
          '<stop offset="1" stop-color="currentColor" stop-opacity=".3"/>' +
        "</linearGradient>" +
        '<linearGradient id="' + gid + '-r" gradientUnits="userSpaceOnUse" x1="5.8" y1="4" x2="16.6" y2="13.3">' +
          '<stop offset="0" stop-color="currentColor" stop-opacity="1"/>' +
          '<stop offset="1" stop-color="currentColor" stop-opacity=".62"/>' +
        "</linearGradient>" +
      "</defs>" +
      '<path d="M6.79 3.64 L20.54 6.4 Q22.6 6.81 21.02 8.19 Q16.45 12.4 15 16.6 ' +
        'Q14.35 19.82 12.68 16.98 L5.73 5.13 Q4.6 3.2 6.79 3.64 Z" ' +
        'fill="url(#' + gid + '-f)" stroke="url(#' + gid + '-r)"/>' +
    "</svg></div>";

  node.classList.add("mluc");
  node.appendChild(content);
  node.appendChild(layer);

  var cur = layer.querySelector(".mluc-cur"),
      lab = layer.querySelector(".mluc-label"),
      pill = layer.querySelector(".mluc-pill");

  var W = 0, H = 0,
      px = 0, py = 0,       /* where the arrow is */
      lx = 0, ly = 0,       /* where the pill is - the same target, more lag */
      tx = 0, ty = 0,       /* where both are heading */
      vx = 0,               /* smoothed horizontal speed, px/ms */
      ang = 0,
      clock = 0,            /* wander time, advanced only while running */
      mode = "auto",
      raf = 0, last = 0, running = false, reduced = false, seeded = false;

  var listeners = [], io = null;
  function on(t, e, f, opt) { t.addEventListener(e, f, opt); listeners.push([t, e, f, opt]); }

  function vars() {
    node.style.setProperty("--mluc-h", o.height + "px");
    node.style.setProperty("--mluc-size", o.size + "px");
    node.dataset.accent = o.accent;
    node.classList.toggle("mluc-sm", !!o.compact);
    node.classList.toggle("mluc-hide", !!o.hideNative);
    pill.textContent = o.name;
  }

  function measure() {
    var r = node.getBoundingClientRect();
    W = r.width; H = r.height;
    return r;
  }

  /* Two sine waves at an irrational-ish ratio, so the path wanders for a long
     while before it repeats. Slow on purpose: this is someone else's cursor
     drifting, not a pointer being flicked around. */
  function autoTarget() {
    var w = (2 * Math.PI) / (o.drift * 1000);
    tx = W * 0.5 + W * 0.30 * Math.sin(w * clock);
    ty = H * 0.5 + H * 0.26 * Math.sin(w * clock * 0.618 + 1.1);
  }

  function write() {
    cur.style.transform = "translate3d(" + px.toFixed(2) + "px," + py.toFixed(2) + "px,0) rotate(" + ang.toFixed(2) + "deg)";
    lab.style.transform = "translate3d(" + lx.toFixed(2) + "px," + ly.toFixed(2) + "px,0)";
  }

  function frame(now) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    var dt = Math.min(64, now - last);   /* a backgrounded tab must not teleport it */
    last = now;
    if (dt <= 0) return;

    if (mode === "auto") { clock += dt; autoTarget(); }

    var kA = 1 - Math.exp(-dt / o.follow),
        kL = 1 - Math.exp(-dt / o.labelFollow),
        nx = px + (tx - px) * kA,
        ny = py + (ty - py) * kA;

    /* The speed that drives the lean is the ARROW's, not the pointer's, so it
       is already smooth - the position it comes from was smoothed a line ago.
       It is read raw here on purpose. Filtering it as well, and then easing the
       angle on top of that, put three lags in series, and because the arrow's
       speed peaks the instant the pointer jumps and then decays on its own
       150ms, the filters were still winding up when the peak had gone: a 260ms
       flick that should read as several degrees managed 0.4. One lag only - the
       angle's - and it is a short one. */
    vx = (nx - px) / dt;
    px = nx; py = ny;
    lx += (tx - lx) * kL; ly += (ty - ly) * kL;

    /* The gap between the two time constants is what makes the pill trail, and
       it grows with speed - unbounded, it leaves the stage on a fast move. Pull
       the pill back onto a leash instead of shortening the lag, so a slow move
       still reads as a soft follow. */
    var dx = lx - px, dy = ly - py, d = Math.hypot(dx, dy);
    if (d > o.maxTrail) { var pull = o.maxTrail / d; lx = px + dx * pull; ly = py + dy * pull; }

    var target = clamp(vx / TILT_AT, -1, 1) * o.tilt;
    ang += (target - ang) * (1 - Math.exp(-dt / durationMs.instant));

    write();
  }

  function kick() {
    if (reduced || o.paused || running) return;
    if (mode === "auto" && !o.autoplay) return;
    running = true; last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function halt() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function show(on_) { node.classList.toggle("is-on", !!on_); }

  /* Seed the first frame at the start of the wander rather than at 0,0, or the
     cursor slides in from the top-left corner on every load. */
  function seed() {
    measure();
    if (!W || !H) return;            /* laid out later; the observer will call back */
    autoTarget();
    px = lx = tx; py = ly = ty;
    write();
    seeded = true;
    if (o.autoplay || reduced) show(true);
  }

  function point(e) {
    if (e.pointerType === "touch") return;   /* a cursor chasing a finger reads as lag */
    var r = measure();
    tx = e.clientX - r.left; ty = e.clientY - r.top;
    mode = "pointer";
    node.classList.add("is-live");
    show(true);
    if (reduced) { px = lx = tx; py = ly = ty; ang = 0; write(); return; }
    kick();
  }
  function leave() {
    node.classList.remove("is-live");
    mode = "auto";
    if (reduced) return;
    if (o.autoplay) kick();
    else { show(false); halt(); }
  }

  reduced = prefersReducedMotion();
  vars();
  seed();

  on(node, "pointerenter", point);
  on(node, "pointermove", point);
  on(node, "pointerleave", leave);
  on(window, "resize", function () { measure(); if (!seeded) seed(); });

  /* off-screen cards cost nothing */
  if (typeof IntersectionObserver !== "undefined") {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!seeded && en.isIntersecting) seed();
        if (en.isIntersecting) kick(); else halt();
      });
    }, { rootMargin: "120px" });
    io.observe(node);
  } else { kick(); }

  var mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  if (mq && mq.addEventListener) {
    on(mq, "change", function () {
      reduced = prefersReducedMotion();
      if (reduced) { halt(); ang = 0; write(); show(true); } else kick();
    });
  }

  var api = {
    el: node,
    update: function (next) {
      Object.assign(o, next || {});
      if (ACCENTS.indexOf(o.accent) < 0) throw new Error('initUserCursor: unknown accent "' + o.accent + '"');
      vars();
      measure();
      node.classList.toggle("is-paused", !!o.paused);
      if (o.paused) halt(); else kick();
      return api;
    },
    /* so a host can label its own play/pause control without tracking state */
    isPaused: function () { return !!o.paused; },
    toggle: function () { return api.update({ paused: !o.paused }); },
    destroy: function () {
      halt();
      listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
      listeners.length = 0;
      if (io) io.disconnect();
      node.classList.remove("mluc", "mluc-sm", "mluc-hide", "is-on", "is-live", "is-paused");
      delete node.dataset.accent;
      ["--mluc-h", "--mluc-size"].forEach(function (v) { node.style.removeProperty(v); });
      node.innerHTML = "";
      kept.forEach(function (n) { node.appendChild(n); });
      delete node.__mlCursor;
      delete node.__ml;
    }
  };
  if (o.paused) { node.classList.add("is-paused"); halt(); }
  node.__mlCursor = api;
  /* the handle both hosts look for. A host renders a play/pause button for
     every component, so it cannot know the per-entry name. */
  node.__ml = api;
  return api;
}

/* Auto-init, so a page only needs the markup and this module. */
export function mountAll(root) {
  return [].slice.call((root || document).querySelectorAll('[data-ml="user-cursor"]'))
    .map(function (n) { return initUserCursor(n); });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { mountAll(); }, { once: true });
  } else { mountAll(); }
}
