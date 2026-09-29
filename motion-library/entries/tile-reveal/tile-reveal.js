/* Continia Motion Library — Tile Reveal
   A headline that holds still while a grid of tiles flies in around it from
   behind, rests, and then carries on past the camera and out - all of it
   driven by one number, the scroll position through the section. At the far
   end a sub-line and a button arrive; press the button and the whole thing
   leaves toward the viewer, and the section starts again.

   Built from scratch on the Continia tokens. The motion idea is the one React
   Bits Pro ships as "Tile Reveal"; none of their code is used here - it is a
   paid product whose licence (§2.4) forbids putting its source in a
   repository, and this repo is public. See meta.json → brandNotes.

   The arrow is the library's own User Cursor, mounted rather than redrawn, per
   the pointer-demo rule in CLAUDE.md: it works its way down the section, then
   goes for the button and presses it.

   Usage:
     <div data-ml="tile-reveal" data-title="Built inside Business Central">
       <img src="…" alt="">   <!-- one per tile -->
       …
     </div>
     <script type="module" src="entries/tile-reveal/tile-reveal.js"></script>

   A tile is any direct child element, laid into a columns x rows grid in the
   order given. Give it fewer children than cells and the grid simply has gaps;
   give it more and the extras are ignored.

   Or call it yourself:
     import { initTileReveal } from "./tile-reveal.js";
     const tr = initTileReveal(el, { columns: 5, rows: 3 });
     tr.seek(0.5);            // 0 is the headline alone, 1 is the call to action
     tr.update({ paused: true });
     tr.destroy(); */

import { prefersReducedMotion, durationMs } from "../../tokens/motion-tokens.js";
import { initUserCursor } from "../user-cursor/user-cursor.js";

export const DEFAULTS = {
  height: 420,            /* px, the stage */
  columns: 5,
  rows: 3,
  tile: 116,              /* px, a tile's width */
  ratio: 0.82,            /* a tile's width : height. Below 1 is the portrait the reference uses. */
  radius: 15,             /* px - the hub's tile radius */
  perspective: 1000,      /* px, the camera */
  depth: 900,             /* px, how far behind the camera a tile starts */
  near: 780,              /* px, how far past the camera it ends up */

  /* Where a tile's own run sits inside the scroll. The middle column lands
     first and leaves first, so `stagger` is how much of the range is given
     over to that spread; the rest is the run every tile gets. */
  scatter: 0.62,          /* how far off its cell a tile may sit, in cell widths */
  sizeVary: 0.38,         /* how much the tile sizes differ, 0 = all the same */
  depthVary: 140,         /* px of resting depth between the nearest and furthest */
  seed: 7,                /* the scatter is random but fixed: same layout every load */
  stagger: 0.34,
  inEnd: 0.42,            /* a tile has arrived by here, within its own run */
  outStart: 0.64,         /* and starts leaving here */
  ctaAt: 0.86,            /* the sub-line and the button arrive at this scroll position */

  /* The self-driving tour, in ms. Loop lengths, so they are options rather
     than tokens - the duration scale describes transitions and tops out at
     800ms. The flyaway is the exception: it is a transition, and it takes
     --motion-duration-slower, the scale's one authored moment. */
  scroll: 6800,           /* working down the section */
  settle: 1600,           /* resting at the far end with the button up */
  reach: 1800,            /* walking to the button */
  rest: 1200,             /* still, before it starts again */

  interactive: true,      /* wheel, drag and the arrow keys all seek */
  autoplay: true,         /* run the tour when no pointer is on the stage */
  cursor: true,
  name: "",               /* the cursor's pill - empty, the copy is the thing to read */
  accent: "auto",         /* auto | blue | cyan | green | purple - palette only */
  size: 22,
  title: "Built inside Business Central",
  sub: "One platform. Six solutions. Thirty years of it.",
  cta: "See more",
  hint: "Scroll",         /* the nudge at the foot, while nothing has moved yet */
  paused: false,
  compact: false          /* the card-sized skin */
};

var NUM = ["height", "columns", "rows", "tile", "ratio", "radius", "perspective", "depth", "near",
  "scatter", "sizeVary", "depthVary", "seed", "stagger", "inEnd", "outStart", "ctaAt", "scroll", "settle", "reach", "rest", "size"];
var BOOL = ["interactive", "autoplay", "cursor", "paused", "compact"];
var ACCENTS = ["auto", "blue", "cyan", "green", "purple"];

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

function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
/* the same ease-out the tokens name, in JS, for the one curve that has to be
   sampled per frame rather than handed to a transition */
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

export function initTileReveal(node, options) {
  if (!node || node.nodeType !== 1) throw new Error("initTileReveal: needs an element");
  if (node.__ml) return node.__ml;

  var o = Object.assign({}, DEFAULTS, fromData(node), options || {});
  if (ACCENTS.indexOf(o.accent) < 0) {
    throw new Error('initTileReveal: accent "' + o.accent + '" is not one of ' + ACCENTS.join(", ") +
      " - the palette is deliberate, add a token rather than a hex here");
  }
  if (!(o.scroll > 0) || !(o.reach > 0)) throw new Error("initTileReveal: scroll/reach must be > 0");

  var kept = [].slice.call(node.childNodes);

  var stage = document.createElement("div");
  stage.className = "mltr-stage";
  /* Reachable by keyboard, or the arrow-key seek below is unreachable: the
     stage is what the wheel and the drag act on, so it is what takes focus. */
  stage.tabIndex = 0;
  stage.setAttribute("role", "group");
  stage.setAttribute("aria-label", "Section reveal - arrow keys scroll it");

  /* One wrapper for everything the flyaway moves, so the press is a single
     transform rather than the same transform written onto four elements. */
  var inner = document.createElement("div");
  inner.className = "mltr-inner";

  var track = document.createElement("div");
  track.className = "mltr-track";

  var veil = document.createElement("div");
  veil.className = "mltr-veil";

  var copy = document.createElement("div");
  copy.className = "mltr-copy";
  var h = document.createElement("p");
  h.className = "mltr-title";
  var sub = document.createElement("p");
  sub.className = "mltr-sub";
  var cta = document.createElement("button");
  cta.type = "button";
  cta.className = "mltr-cta";
  copy.appendChild(h);
  copy.appendChild(sub);
  copy.appendChild(cta);

  var hint = document.createElement("div");
  hint.className = "mltr-hint";

  var cells = o.columns * o.rows;
  var tiles = kept.filter(function (n) { return n.nodeType === 1; }).slice(0, cells).map(function (src, i) {
    var el = document.createElement("div");
    el.className = "mltr-tile";
    el.setAttribute("aria-hidden", "true");   /* decoration: the copy is the content */
    el.appendChild(src.cloneNode(true));
    track.appendChild(el);
    var c = i % o.columns, r = (i / o.columns) | 0;
    return { el: el, c: c, r: r, i: i };
  });

  /* ---- the scatter ----
     A grid is only the seeding pattern, so no two tiles land on top of each
     other and the stage stays evenly covered; every tile is then thrown off
     its own cell, resized and set at its own resting depth. Straight rows and
     columns are the thing this is avoiding - a wall in clear lines reads as a
     table, not as pictures.

     The randomness is seeded, so the layout is the same on every load and on
     both hosts, and it is computed once rather than in `vars()`: re-rolling on
     a resize would have the wall rearrange itself while you watch. */
  function rnd(n) {
    /* a small integer hash - enough scatter for fifteen boxes, and no state */
    var x = Math.sin((o.seed + 1) * 97.13 + n * 41.7) * 43758.5453;
    return x - Math.floor(x);
  }
  var mid = (o.columns - 1) / 2, midR = (o.rows - 1) / 2;
  var maxRank = Math.max(0.001, Math.sqrt(mid * mid + midR * midR));
  tiles.forEach(function (t, n) {
    t.jx = (rnd(n * 3) - 0.5) * o.scatter;
    t.jy = (rnd(n * 3 + 1) - 0.5) * o.scatter;
    t.scale = 1 + (rnd(n * 3 + 2) - 0.5) * o.sizeVary;
    t.zoff = (rnd(n * 3 + 11) - 0.5) * o.depthVary;
    /* Out from the middle, measured on the scattered position in both axes,
       and then nudged at random. Column order was legible but it read as five
       shutters; this arrives from the centre without being countable. */
    var dx = (t.c + t.jx - mid), dy = (t.r + t.jy - midR) * (o.columns / Math.max(1, o.rows));
    var rank = Math.sqrt(dx * dx + dy * dy) / maxRank;
    t.lead = clamp01(rank * 0.78 + rnd(n * 3 + 5) * 0.22) * o.stagger;
  });

  node.classList.add("mltr");
  /* The source children are read, not displayed: left in place they stack
     above the stage and push it out of the host box. */
  kept.forEach(function (n) { if (n.parentNode === node) node.removeChild(n); });
  node.appendChild(stage);
  stage.appendChild(inner);
  inner.appendChild(track);
  inner.appendChild(veil);
  inner.appendChild(copy);
  inner.appendChild(hint);

  var prog = 0, W = 0, H = 0, uc = null, io = null, listeners = [],
      raf = 0, last = 0, clock = 0, running = false, reduced = false, placed = false,
      step = 0, flying = 0, dragging = false, dragY = 0, dragProg = 0, hold = 0;
  /* How long a hand-driven scrub owns the section before the tour picks it
     up again. Without it a wheel tick is answered by the very next frame. */
  var HOLD = 1400;

  function on(t, e, f, opt) { t.addEventListener(e, f, opt); listeners.push([t, e, f, opt]); }

  function vars() {
    node.style.setProperty("--mltr-h", o.height + "px");
    node.style.setProperty("--mltr-tile", o.tile + "px");
    node.style.setProperty("--mltr-ratio", o.ratio);
    node.style.setProperty("--mltr-radius", o.radius + "px");
    node.style.setProperty("--mltr-persp", o.perspective + "px");
    node.classList.toggle("mltr-sm", !!o.compact);
    node.classList.toggle("is-static", !o.interactive);
    h.textContent = o.title;
    sub.textContent = o.sub;
    cta.textContent = o.cta;
    hint.textContent = o.hint;
    hint.hidden = !o.hint;
    sub.hidden = !o.sub;
    cta.hidden = !o.cta;
    /* Each tile is placed in percentages, so the layout follows the stage
       rather than the numbers it was authored at, and carries its own size. */
    tiles.forEach(function (t) {
      t.el.style.left = ((t.c + 0.5 + t.jx) / o.columns * 100).toFixed(3) + "%";
      t.el.style.top = ((t.r + 0.5 + t.jy) / o.rows * 100).toFixed(3) + "%";
      t.el.style.setProperty("--mltr-tile", (o.tile * t.scale).toFixed(1) + "px");
    });
  }

  function measure() {
    var r = stage.getBoundingClientRect();
    W = r.width; H = r.height;
    return r;
  }

  /* ---- the whole component, as a function of one number ----
     A tile's own run is the scroll range left after its lead. Inside that run
     it flies in from `depth` behind the camera, rests, and carries on to
     `near` in front of it - one Z, three segments, so nothing has to be
     sequenced by hand and seeking backwards is free. */
  function place() {
    var span = Math.max(0.05, 1 - o.stagger);
    tiles.forEach(function (t) {
      var tp = clamp01((prog - t.lead) / span), z, op;
      if (tp < o.inEnd) {
        var a = easeOut(tp / o.inEnd);
        z = t.zoff * a - o.depth * (1 - a);
        op = a;
      } else if (tp < o.outStart) {
        /* Resting, but not all on one plane: a single flat sheet is the other
           half of the grid look, so each tile holds at its own depth. */
        z = t.zoff; op = 1;
      } else {
        var c = (tp - o.outStart) / Math.max(0.001, 1 - o.outStart);
        z = t.zoff + (o.near - t.zoff) * c * c;   /* accelerating away, not drifting */
        op = 1 - clamp01((c - 0.55) / 0.45);
      }
      t.el.style.transform = "translate3d(-50%,-50%," + z.toFixed(1) + "px)";
      t.el.style.opacity = op.toFixed(3);
    });

    /* The tiles behind the headline are what make it hard to read, so the veil
       comes up with them and goes with them. */
    veil.style.opacity = (prog > 0.95 ? clamp01((1 - prog) / 0.05) : clamp01(prog / 0.25)).toFixed(3);

    /* Reduced motion has no scroll to earn the button with, so the copy is
       simply up. Tying it to `prog` there would leave a headline with no way
       on to the rest of the page. */
    var cp = reduced ? 1 : clamp01((prog - o.ctaAt) / Math.max(0.001, 1 - o.ctaAt));
    node.classList.toggle("is-cta", cp > 0.02);
    copy.style.setProperty("--mltr-cta-p", cp.toFixed(3));
    hint.style.opacity = clamp01(1 - prog / 0.08).toFixed(3);
  }

  /* The point where most of the wall is standing. The stagger is wider than
     the band a tile holds still for, so no single frame has all of them flat -
     this is the middle of the average tile's hold, which is the fullest the
     section ever looks. It is where reduced motion comes to rest: the old
     value sat past the flyaway and showed an empty stage. */
  function restPoint() {
    var span = Math.max(0.05, 1 - o.stagger);
    return clamp01(o.stagger / 2 + ((o.inEnd + o.outStart) / 2) * span);
  }

  function seek(v) {
    prog = clamp01(v);
    place();
  }

  /* ---- the flyaway ----
     The press throws everything at the viewer and the section starts over.
     This one is a transition rather than a per-frame curve, so it takes the
     duration scale's one authored moment and the class does the work. */
  function fly() {
    if (flying) return;
    flying = 1;
    node.classList.add("is-flying");
    if (reduced) { landed(); return; }
    flying = setTimeout(landed, durationMs.slower + 40);
  }
  function landed() {
    if (flying && flying !== 1) clearTimeout(flying);
    flying = 0;
    node.classList.remove("is-flying");
    seek(0);
  }

  /* ---- handing the section back and forth ----
     A manual seek has to put the tour's clock where the section now is, not
     reset it: the tour scrubs `prog` from the clock on every frame, so a clock
     of 0 means the frame after a wheel tick drags the section straight back to
     the top. That was the bug - the wheel, the drag and the arrow keys all
     looked dead because the hand undid them 16ms later. `hold` then keeps the
     hand off for a moment so a run of wheel ticks reads as one gesture. */
  function own(ms) {
    var lp = lap(), laps = Math.floor(clock / lp);
    clock = laps * lp + prog * o.scroll;
    step = laps * 4;
    hold = msNow() + (ms === undefined ? HOLD : ms);
  }
  /* the next lap starts once the section has landed */
  function restart(ms) {
    var lp = lap(), laps = Math.floor(clock / lp) + 1;
    clock = laps * lp;
    step = laps * 4;
    hold = msNow() + ms;
  }
  function msNow() { return typeof performance !== "undefined" ? performance.now() : Date.now(); }

  /* ---- the tour ----
     Four beats: work down the section while the scroll runs, rest at the far
     end with the button up, walk to the button, press it. The press is what
     throws the section at the viewer, so the demo shows a hand doing what a
     visitor would do. */
  function lap() { return o.scroll + o.settle + o.reach + durationMs.slower + o.rest; }

  function centreOf(el) {
    var s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
    return [r.left - s.left + r.width / 2, r.top - s.top + r.height / 2];
  }

  function tourPoint() {
    var t = clock % lap();
    if (t < o.scroll) {
      /* working down the middle of the section: that is what a scroll looks
         like from outside, and it keeps the arrow off the copy */
      var a = t / o.scroll;
      return [W * (0.62 + 0.06 * Math.sin(a * Math.PI * 2)), H * (0.24 + 0.52 * a)];
    }
    if (t < o.scroll + o.settle) return [W * 0.68, H * 0.76];
    if (t < o.scroll + o.settle + o.reach) return centreOf(cta);
    return centreOf(cta);
  }

  function advance() {
    var t = clock % lap(), s = Math.floor(clock / lap()) * 4;
    if (t < o.scroll) { s += 0; seek(t / o.scroll); }
    else if (t < o.scroll + o.settle) { s += 1; seek(1); }
    else if (t < o.scroll + o.settle + o.reach) { s += 2; seek(1); }
    else s += 3;
    if (s === step) return;
    step = s;
    if (s % 4 === 3) { if (uc) uc.press(); fly(); }
  }

  function frame(now) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    var dt = Math.min(64, now - last);
    last = now;
    if (dt <= 0) return;
    if (o.paused || dragging || !o.autoplay) { if (o.paused) halt(); return; }
    if (uc && uc.at().mode === "pointer") return;    /* a real pointer owns it */
    if (hold) { if (now < hold) return; hold = 0; }
    clock += dt;
    advance();
  }

  function kick() {
    if (running || reduced || o.paused) return;
    running = true; last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function halt() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function mountCursor() {
    if (!o.cursor || uc) return;
    uc = initUserCursor(stage, {
      height: o.height, name: o.name, accent: o.accent, size: o.size,
      autoplay: o.autoplay, compact: o.compact, paused: o.paused,
      autoPath: function () { return tourPoint(); }
    });
  }

  reduced = prefersReducedMotion();
  vars();
  mountCursor();
  /* after the cursor, and before its layer: appended first it would be laid
     out inside the cursor's own flex column, appended last it would paint over
     the arrow */
  var arrowLayer = stage.querySelector(".mluc-layer");
  if (arrowLayer) stage.insertBefore(inner, arrowLayer);

  /* ---- a real visitor ---- */
  function nudge(d) {
    if (flying) landed();
    seek(prog + d);
    own();
  }
  on(stage, "wheel", function (e) {
    if (!o.interactive) return;
    e.preventDefault();
    nudge(e.deltaY / Math.max(900, H * 2.2));
  }, { passive: false });
  on(node, "keydown", function (e) {
    if (!o.interactive) return;
    if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); nudge(0.12); }
    else if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); nudge(-0.12); }
  });
  on(stage, "pointerdown", function (e) {
    if (!o.interactive || e.target === cta) return;
    dragging = true; dragY = e.clientY; dragProg = prog;
    stage.setPointerCapture && stage.setPointerCapture(e.pointerId);
    node.classList.add("is-dragging");
  });
  on(stage, "pointermove", function (e) {
    if (!dragging) return;
    /* one hand-height covers the run, floored so a small card is not twitchy */
    seek(dragProg - (e.clientY - dragY) / Math.max(260, H));
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    node.classList.remove("is-dragging");
    own();
  }
  on(stage, "pointerup", endDrag);
  on(stage, "pointercancel", endDrag);
  on(stage, "pointerleave", endDrag);

  on(cta, "click", function (e) {
    e.preventDefault(); e.stopPropagation();
    if (uc) uc.press();
    restart(durationMs.slower + 160);
    fly();
  });

  function relayout() { measure(); if (W && H) placed = true; place(); }
  relayout();
  on(window, "resize", relayout);

  if (typeof IntersectionObserver !== "undefined") {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!placed && en.isIntersecting) relayout();
        if (en.isIntersecting) kick(); else halt();
      });
    }, { rootMargin: "120px" });
    io.observe(node);
  } else { kick(); }

  var mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  if (mq && mq.addEventListener) {
    on(mq, "change", function () {
      reduced = prefersReducedMotion();
      /* Reduced motion is not "nothing happens": the section is a piece of
         copy with a picture wall behind it, so it settles at the point where
         everything is up and stays there. */
      if (reduced) { halt(); landed(); seek(restPoint()); } else kick();
    });
  }
  if (reduced) seek(restPoint());

  var api = {
    el: node,
    seek: function (v) { seek(v); own(); return api; },
    progress: function () { return prog; },
    fly: function () { fly(); return api; },
    update: function (next) {
      Object.assign(o, next || {});
      if (ACCENTS.indexOf(o.accent) < 0) throw new Error('initTileReveal: unknown accent "' + o.accent + '"');
      vars();
      relayout();
      node.classList.toggle("is-paused", !!o.paused);
      /* the arrow is half the effect - pausing one without the other leaves a
         cursor pressing a button on a section that never moves */
      if (uc) uc.update({ paused: !!o.paused, name: o.name, accent: o.accent, size: o.size, height: o.height });
      if (o.paused) halt(); else kick();
      return api;
    },
    isPaused: function () { return !!o.paused; },
    toggle: function () { return api.update({ paused: !o.paused }); },
    destroy: function () {
      halt();
      if (flying && flying !== 1) clearTimeout(flying);
      listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
      listeners.length = 0;
      if (io) io.disconnect();
      if (uc) uc.destroy();
      uc = null;
      node.classList.remove("mltr", "mltr-sm", "is-paused", "is-dragging", "is-static", "is-cta", "is-flying");
      ["--mltr-h", "--mltr-tile", "--mltr-ratio", "--mltr-radius", "--mltr-persp"]
        .forEach(function (v) { node.style.removeProperty(v); });
      node.innerHTML = "";
      kept.forEach(function (n) { node.appendChild(n); });
      delete node.__mlTile;
      delete node.__ml;
    }
  };
  if (o.paused) node.classList.add("is-paused");
  node.__mlTile = api;
  /* the handle both hosts look for */
  node.__ml = api;
  return api;
}

/* Auto-init, so a page only needs the markup and this module. */
export function mountAll(root) {
  return [].slice.call((root || document).querySelectorAll('[data-ml="tile-reveal"]'))
    .map(function (n) { return initTileReveal(n); });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { mountAll(); }, { once: true });
  } else { mountAll(); }
}
