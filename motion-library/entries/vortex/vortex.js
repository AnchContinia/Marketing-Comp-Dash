/* Continia Motion Library — Vortex
   ----------------------------------------------------------------------
   A field of small lights lying on the surface of a whirlpool: flat rings at
   the rim, a steep wall, and a throat that flattens out at the bottom. It
   turns forever, and it turns FASTER at the centre than at the rim.

   What it is for here: the hub's "everything ends up in one place" story told
   as a standing state rather than as an arrival. Data Transfer is the trip;
   this is the pool it lands in. It is ambient - it never resolves, so it goes
   behind copy, never beside it as a thing to watch.

   WHY THE SHAPE AND THE SPEED COME FROM ONE FORMULA.
   The obvious build is two unrelated curves: pick something bowl-shaped for
   the silhouette, then pick something else for "inner rings spin faster".
   They then disagree, and the picture reads as rings on a lampshade rather
   than as water. A real vortex does not have that freedom - the surface and
   the rotation are the same field. This uses the Rankine vortex, the standard
   two-part model of one: a core that turns as a solid body, and a free stream
   outside it whose speed falls off as 1/r.

     tangential speed   v(r) = W*r            r <= a      (core, solid body)
                        v(r) = W*a*a/r        r >  a      (free stream)

   Put that through Bernoulli and the free surface is

     depth(r) = D*a*a/(r*r)                   r >  a      -> flat at the rim
     depth(r) = 2D - D*r*r/(a*a)              r <= a      -> parabolic throat

   which is exactly the silhouette: a rim that barely dips, a steep wall where
   1/r*r bites, and a throat that comes to rest at 2D. And the angular speed
   is the same expression again - w = v/r, so w is constant in the core and
   falls as a*a/(r*r) outside. One constant `core` sets the shape AND the
   differential rotation, and they cannot drift apart.

   HOW THE FRAME IS DRAWN, because the obvious way is wrong.
   The obvious way is accumulation: keep a canvas and smear it. That gives a
   picture whose density depends on the frame rate, a canvas that has to be
   thrown away on resize, and a pause that freezes a half-built smudge.
   Instead every particle is placed from the clock each frame and the canvas
   is cleared - so the frame is a pure function of time. Framerate-independent,
   resize-safe, seekable, and pausing lands on a correct picture.

   Drawing ~1500 one-pixel dots with a fillStyle assignment each would spend
   its whole budget on state changes, so dots are bucketed by colour and by a
   quantised alpha and each bucket is filled as one path. About 30 fills a
   frame instead of 1500.

   Markup: whatever the author wants over the top. The children are kept and
   laid over the canvas, so this is a background with copy on it, not a
   component that owns the copy.

     <div data-ml="vortex">
       <h2>Every number, one place</h2>
     </div>
*/

import { prefersReducedMotion } from "../../tokens/motion-tokens.js";

export const DEFAULTS = {
  height: 380,          /* px of stage. Both hosts clamp this to the card, so
                           it only bites when the entry is used on its own. */
  rings: 30,            /* concentric rings from rim to throat */
  dots: 700,            /* dots on the rim ring. Inner rings get proportionally
                           fewer, so the dots-per-length stays even - a fixed
                           count per ring crowds the throat into a solid line. */
  minDots: 40,          /* ...but never so few that a ring reads as a dashed arc */
  spin: 7200,           /* ms for the CORE to turn once. The rim is slower by
                           core*core, which is the model's doing, not a second
                           setting. A loop length, so it is an option rather
                           than a token. */
  core: 0.27,           /* core radius, 0-1 of the rim. The one number that
                           sets both the silhouette and the spin falloff:
                           small is a deep narrow funnel that barely turns at
                           the rim, large is a shallow dish turning as a disc. */
  depth: 0.3,          /* the funnel's vertical span, as a fraction of the
                           stage height */
  tilt: 0.52,           /* how far the rings are squashed - the viewing angle.
                           1 is straight down (concentric circles, no funnel to
                           see), 0 is edge-on (the rings collapse to lines). */
  centreY: 0.44,         /* where the RIM's ring sits down the stage, 0-1. The
                           throat hangs `depth` below it, so this is not the
                           centre of the picture. */
  fill: 1.0,           /* the rim's diameter as a fraction of the stage's
                           shorter usable axis. Over 1 the rim is cropped,
                           which is what the reference does. */
  size: 1.15,            /* px, a near-side rim dot at full brightness */
  bright: 1,         /* the field's overall exposure, 0-1 */
  twinkle: 2600,        /* ms for one dot's brightness cycle. Every dot carries
                           its own phase, so the field shimmers rather than
                           pulsing as one sheet. */
  shimmer: 0.38,        /* how much of a dot's brightness the twinkle owns.
                           0 is a steady field, 1 blinks dots fully out. */
  far: 0.42,            /* how much dimmer the far half of a ring is. This is
                           the only depth cue on a flat canvas, and without it
                           the rings read as flat ovals rather than as circles
                           lying in a bowl. */
  heat: 0.8,           /* how far a dot is mixed toward white. A light source
                           saturates its own centre, and it is also the only
                           reason Tech Blue reads at 1.5px on near-black. */
  accent: "mixed",      /* palette only - see PALETTE */
  glow: false,           /* the soft bloom under the throat, where the rings
                           bunch and a real vortex would blow out */
  background: "",       /* empty keeps the stylesheet's dark stage */
  seed: 7,              /* the field is random but fixed - the same seed lays
                           out identically on both hosts and across resizes */
  autoplay: true,
  paused: false,
  compact: false        /* the card-sized skin, for a stage under ~200px */
};

var PALETTE = {
  blue: [5, 41, 117],
  cyan: [143, 248, 255],
  green: [95, 158, 141],
  purple: [152, 62, 174]
};
/* Weighted toward cyan on purpose. The reference field is white; ours is
   Innovation Blue whitened by `heat`, with Smart Green and Tech Blue as the
   minority so the field has depth without turning into a test card. Three
   hues read as one photograph; four read as a legend. */
var MIX = ["cyan", "cyan", "cyan", "green", "cyan", "blue", "cyan", "green"];
var ACCENTS = ["mixed", "blue", "cyan", "green", "purple"];

var NUM = ["height", "rings", "dots", "minDots", "spin", "core", "depth", "tilt",
  "centreY", "fill", "size", "bright", "twinkle", "shimmer", "far", "heat", "seed"];
var BOOL = ["glow", "autoplay", "paused", "compact"];

/* how many alpha steps the field is quantised into before bucketing. Twelve is
   where banding stops being visible on a 1.5px dot; more of them only buys
   more fill() calls. */
var STEPS = 12;
var TAU = Math.PI * 2;

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

/* mulberry32 - small, fast, and the same sequence everywhere, which is the
   point: the field must not rearrange itself between the two hosts, between
   resizes, or between one frame and the next. */
function rng(seed) {
  var a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    var t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function toward(c, white) {
  return [
    Math.round(c[0] + (255 - c[0]) * white),
    Math.round(c[1] + (255 - c[1]) * white),
    Math.round(c[2] + (255 - c[2]) * white)
  ];
}

export function initVortex(el, options) {
  var node = typeof el === "string" ? document.querySelector(el) : el;
  if (!node || node.nodeType !== 1) throw new Error("initVortex: no element");
  if (node.__ml) return node.__ml;

  var o = {}, k;
  for (k in DEFAULTS) o[k] = DEFAULTS[k];
  Object.assign(o, fromData(node), options || {});
  validate();

  function validate() {
    if (ACCENTS.indexOf(o.accent) < 0) throw new Error('initVortex: unknown accent "' + o.accent + '"');
    if (!(o.rings >= 2)) throw new Error("initVortex: rings must be at least 2");
    if (!(o.dots >= 3)) throw new Error("initVortex: dots must be at least 3");
    if (!(o.core > 0 && o.core < 1)) throw new Error("initVortex: core must be between 0 and 1");
    if (!(o.tilt > 0 && o.tilt <= 1)) throw new Error("initVortex: tilt must be between 0 and 1");
    if (!(o.spin > 0)) throw new Error("initVortex: spin must be positive");
    if (!(o.twinkle > 0)) throw new Error("initVortex: twinkle must be positive");
  }

  /* ---- DOM. The caller's children are moved into a layer over the canvas and
     moved back on destroy, so this module never owns the copy. ---- */
  var kept = [].slice.call(node.childNodes);
  var canvas = document.createElement("canvas");
  canvas.className = "mlvx-canvas";
  canvas.setAttribute("aria-hidden", "true");
  var content = document.createElement("div");
  content.className = "mlvx-content";
  kept.forEach(function (n) { content.appendChild(n); });
  node.classList.add("mlvx");
  node.appendChild(canvas);
  node.appendChild(content);

  var ctx = canvas.getContext("2d");
  var W = 0, H = 0, dpr = 1;
  var clock = 0, last = 0, raf = 0, playing = false, lit = false, onScreen = true;
  var listeners = [], io = null, ro = null;

  /* the field, flat typed arrays rather than objects: one dot is six numbers
     and there are ~1500 of them, read every frame */
  var pRing, pTh, pPh, pSize, pBr, pCol, nDots = 0;
  /* per ring, filled by build() then by layout(). rRot is per FRAME, but it
     is allocated here with the rest: sizing it inside draw() would allocate a
     typed array 60 times a second, which is the one thing a render loop must
     not do. */
  var rU, rDn, rOmega, rCy, rRad, rRot, nRings = 0;
  /* the bucket scratch: one array of rect quads per colour x alpha step,
     reused every frame so a 60fps loop allocates nothing */
  var buckets = [], bucketFill = [], nCols = 0;

  var bg = "#070d1a";
  function ground() {
    var v = getComputedStyle(node).backgroundColor;
    var m = /rgba?\(([^)]+)\)/.exec(v);
    if (!m) return;
    var p = m[1].split(",");
    bg = "rgb(" + (+p[0]) + "," + (+p[1]) + "," + (+p[2]) + ")";
  }

  function vars() {
    node.style.setProperty("--mlvx-h", o.height + "px");
    if (o.background) node.style.setProperty("--mlvx-bg", o.background);
    else node.style.removeProperty("--mlvx-bg");
    node.classList.toggle("mlvx-sm", !!o.compact);
    ground();
  }

  /* depth below the rim, in units of D, as a function of normalised radius.
     The two branches meet at u === core with the same value and the same
     slope - that is the Rankine model's doing, and it is why the wall joins
     the throat without a crease. */
  function dn(u) {
    var c2 = o.core * o.core;
    if (u >= o.core) return c2 / (u * u);
    return 2 - (u * u) / c2;
  }

  /* ---- the field. Seeded and built ONCE: re-rolling it per frame or per
     resize would have the dots swap places while you watch, and the two hosts
     would disagree about the picture. ---- */
  function build() {
    var r = rng(o.seed === undefined ? 7 : o.seed | 0);
    nRings = Math.max(2, Math.round(o.rings));
    rU = new Float32Array(nRings);
    rDn = new Float32Array(nRings);
    rOmega = new Float32Array(nRings);
    rCy = new Float32Array(nRings);
    rRad = new Float32Array(nRings);
    rRot = new Float64Array(nRings);

    var cols = o.accent === "mixed" ? ["cyan", "green", "blue"] : [o.accent];
    nCols = cols.length;
    bucketFill = [];
    buckets = [];
    var ci, si;
    for (ci = 0; ci < nCols; ci++) {
      for (si = 0; si < STEPS; si++) {
        /* the colour is baked per bucket: hot core mixed by `heat`, and the
           alpha is the bucket's own step. One string per bucket, built here
           rather than per dot per frame. */
        var hot = toward(PALETTE[cols[ci]], o.heat);
        var a = ((si + 1) / STEPS) * o.bright;
        bucketFill.push("rgba(" + hot[0] + "," + hot[1] + "," + hot[2] + "," + a.toFixed(3) + ")");
        buckets.push([]);
      }
    }

    /* count first, then fill: the flat arrays are sized exactly */
    var counts = new Int32Array(nRings), total = 0, i, u, n;
    for (i = 0; i < nRings; i++) {
      /* u runs from the throat outward so ring 0 is the innermost. Even
         spacing in radius: the 1/r*r wall does the bunching, and spacing the
         rings unevenly on top of it double-counts the same effect. */
      u = (i + 1) / nRings;
      rU[i] = u;
      rDn[i] = dn(u);
      /* w = v/r - constant in the core, core*core/(u*u) outside. Same constant
         as the depth, which is the whole point of using the model. */
      rOmega[i] = u >= o.core ? (o.core * o.core) / (u * u) : 1;
      n = Math.max(Math.round(o.minDots), Math.round(o.dots * u));
      counts[i] = n;
      total += n;
    }
    nDots = total;
    pRing = new Int32Array(total);
    pTh = new Float32Array(total);
    pPh = new Float32Array(total);
    pSize = new Float32Array(total);
    pBr = new Float32Array(total);
    pCol = new Int32Array(total);

    var p = 0, j;
    for (i = 0; i < nRings; i++) {
      n = counts[i];
      for (j = 0; j < n; j++) {
        pRing[p] = i;
        /* evenly spaced, then jittered by less than the gap to a neighbour so
           the spacing reads as natural without any two dots swapping order */
        pTh[p] = (j / n) * TAU + (r() - 0.5) * (TAU / n) * 0.8;
        pPh[p] = r() * TAU;
        pSize[p] = 0.7 + r() * 0.6;
        pBr[p] = 0.45 + r() * 0.55;
        pCol[p] = o.accent === "mixed"
          ? ["cyan", "green", "blue"].indexOf(MIX[p % MIX.length])
          : 0;
        p++;
      }
    }
  }

  /* ---- geometry. Recomputed on resize, never per frame. ---- */
  function layout() {
    var rect = node.getBoundingClientRect();
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    dpr = Math.min(2, window.devicePixelRatio || 1);   /* capped, per the quality floor */
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    /* The rim is sized off the WIDTH: the funnel is far wider than it is tall
       once squashed by `tilt`, so sizing it off the height leaves the stage
       empty at the sides on any card that is wider than it is high - which is
       both of them. */
    var S = (W * o.fill) / 2;
    var rim = rDn[nRings - 1];
    var span = dn(0) - rim;                    /* in units of D */
    var K = span > 0 ? (o.depth * H) / span : 0;
    var cy0 = H * o.centreY;
    var i;
    for (i = 0; i < nRings; i++) {
      rRad[i] = rU[i] * S;
      rCy[i] = cy0 + (rDn[i] - rim) * K;
    }
  }

  function draw(t) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    /* additive from here on: where the rings bunch at the throat the dots add
       up, so the busiest part of the field brightens on its own */
    ctx.globalCompositeOperation = "lighter";

    var b, i;
    for (i = 0; i < buckets.length; i++) buckets[i].length = 0;

    /* one rotation per ring, not per dot */
    var base = (t / o.spin) * TAU;
    for (i = 0; i < nRings; i++) rRot[i] = base * rOmega[i];

    var twBase = (t / o.twinkle) * TAU;
    var cx = W / 2;
    var rightX = W + 8, botY = H + 8;

    for (i = 0; i < nDots; i++) {
      var ri = pRing[i];
      var th = pTh[i] + rRot[ri];
      var s = Math.sin(th);
      var x = cx + rRad[ri] * Math.cos(th);
      var y = rCy[ri] + rRad[ri] * o.tilt * s;
      /* cull before any further arithmetic: a cropped rim puts a real share of
         the field outside the stage on every frame */
      if (x < -8 || x > rightX || y < -8 || y > botY) continue;

      /* 0 on the far side of the ring, 1 on the near side */
      var dep = 0.5 + 0.5 * s;
      var dim = (1 - o.far) + o.far * dep;
      var tw = 0.5 + 0.5 * Math.sin(twBase + pPh[i]);
      var a = pBr[i] * dim * ((1 - o.shimmer) + o.shimmer * tw);
      if (a <= 0.02) continue;

      var step = Math.round(a * STEPS) - 1;
      if (step < 0) step = 0; else if (step >= STEPS) step = STEPS - 1;
      b = buckets[pCol[i] * STEPS + step];
      var w = pSize[i] * o.size * (0.75 + 0.45 * dep);
      b.push(x - w / 2, y - w / 2, w, w);
    }

    for (i = 0; i < buckets.length; i++) {
      b = buckets[i];
      if (!b.length) continue;
      ctx.fillStyle = bucketFill[i];
      ctx.beginPath();
      for (var j = 0; j < b.length; j += 4) ctx.rect(b[j], b[j + 1], b[j + 2], b[j + 3]);
      ctx.fill();
    }

    if (o.glow) throat();
  }

  /* The bloom at the throat. Not decoration: the rings bunch there, so a real
     surface would be brightest there, and the dots alone cannot reach it
     because each is one quantised step of alpha. Sized off the throat's own
     ring rather than the stage, so it stays put when `depth` or `tilt` move. */
  function throat() {
    var cx = W / 2, cy = rCy[0];
    var r = Math.max(10, rRad[0] * 2.6 + Math.min(W, H) * 0.05);
    var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, "rgba(255,255,255,0.20)");
    g.addColorStop(0.3, "rgba(143,248,255,0.11)");
    g.addColorStop(1, "rgba(143,248,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, TAU);
    ctx.fill();
  }

  function frame(now) {
    if (!playing) return;
    raf = requestAnimationFrame(frame);
    if (!last) last = now;
    /* clamp the step: a tab that was in the background for a minute must not
       teleport the field, it must carry on from where it was */
    var dt = Math.min(64, now - last);
    last = now;
    clock += dt;
    draw(clock);
    if (!lit) { lit = true; node.classList.add("is-lit"); }
  }

  function play() {
    if (playing || o.paused || reduced()) return;
    playing = true;
    last = 0;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    playing = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }
  function reduced() { return prefersReducedMotion(); }

  /* Reduced motion is a photograph, not an empty box: the field IS the
     content, so it renders one frame and stops. Off zero, because at t=0 every
     dot sits on its seeded angle and the twinkle is mid-cycle for all of them,
     which is the one moment the field looks regular. */
  function still() {
    stop();
    layout();
    draw(0.37 * o.spin);
    lit = true;
    node.classList.add("is-lit");
  }

  function on(t, ev, fn, opt) { t.addEventListener(ev, fn, opt); listeners.push([t, ev, fn, opt]); }

  function resize() {
    layout();
    if (!playing) draw(reduced() ? 0.37 * o.spin : clock);
  }

  build();
  vars();
  layout();

  if (reduced()) {
    still();
  } else {
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          onScreen = e.isIntersecting;
          if (onScreen && o.autoplay) play(); else stop();
        });
      }, { threshold: 0.08 });
      io.observe(node);
    } else if (o.autoplay) play();
    on(document, "visibilitychange", function () {
      if (document.hidden) stop();
      else if (onScreen && o.autoplay) play();
    });
  }

  if ("ResizeObserver" in window) { ro = new ResizeObserver(resize); ro.observe(node); }
  else on(window, "resize", resize);

  var api = {
    el: node,
    /* seek is what makes the field testable: hand it a time in ms and the
       picture is fully determined by it, with no history to build up first */
    seek: function (ms) { clock = ms; draw(clock); return api; },
    update: function (next) {
      var wasPaused = o.paused;
      Object.assign(o, next || {});
      validate();
      build();
      vars();
      layout();
      if (reduced()) { still(); return api; }
      if (o.paused) { stop(); draw(clock); }
      else if (wasPaused || (!playing && onScreen && o.autoplay)) play();
      return api;
    },
    isPaused: function () { return !!o.paused; },
    toggle: function () { return api.update({ paused: !o.paused }); },
    destroy: function () {
      stop();
      listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
      listeners.length = 0;
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      node.classList.remove("mlvx", "mlvx-sm", "is-lit");
      ["--mlvx-h", "--mlvx-bg"].forEach(function (v) { node.style.removeProperty(v); });
      node.innerHTML = "";
      kept.forEach(function (n) { node.appendChild(n); });
      delete node.__mlVortex;
      delete node.__ml;
    }
  };
  node.__mlVortex = api;
  /* the handle both hosts look for - never the per-entry name */
  node.__ml = api;
  return api;
}

/* Auto-init, so a page only needs the markup and this module. */
export function mountAll(root) {
  return [].slice.call((root || document).querySelectorAll('[data-ml="vortex"]'))
    .map(function (n) { return initVortex(n); });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { mountAll(); });
  else mountAll();
}
