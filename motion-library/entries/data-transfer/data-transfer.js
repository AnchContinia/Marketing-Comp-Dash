/* Continia Motion Library — Data Transfer
   ----------------------------------------------------------------------
   Streams of light running in from off-frame and converging on one point,
   photographed at a long shutter speed: every stream is a trail rather than a
   dot, and where the trails bunch they burn out white.

   What it is for here: data arriving. Documents, invoices, bank files and
   e-invoices coming in from everywhere and landing in one place. The default
   direction is therefore `in` - the convergence point is the destination, not
   the source.

   HOW THE EXPOSURE IS DRAWN, because the obvious way is wrong.
   The obvious way is accumulation: paint a nearly-transparent background over
   the canvas each frame and draw a moving dot, letting the smear build up.
   That gives you a trail whose length depends on the frame rate, a canvas
   that has to be thrown away and re-exposed on every resize, and a pause that
   freezes a half-built smear. Instead each trail is drawn in full every
   frame: the path is a fixed curve, the exposure is the slice of it between
   `head - tail` and `head`, and the frame is redrawn from scratch. The look is
   identical, and it is framerate-independent, resize-safe, seekable, and
   pausing lands on a correct picture rather than a smudge.

   Everything is additive (`globalCompositeOperation = "lighter"`), which is
   what real film does: two trails crossing add up, so the convergence blows
   out to white on its own rather than being drawn as a white blob.

   Markup: whatever the author wants over the top. The children are kept and
   laid over the canvas, so this is a background with copy on it, not a
   component that owns the copy.

     <div data-ml="data-transfer">
       <h2>Every document, one place</h2>
     </div>
*/

import { prefersReducedMotion } from "../../tokens/motion-tokens.js";

export const DEFAULTS = {
  height: 360,          /* px of stage. Both hosts clamp this to the card, so
                           it only bites when the entry is used on its own. */
  count: 26,            /* how many streams are in the air at once */
  speed: 6200,          /* ms for one stream to run its whole path. A loop
                           length, so it is an option and not a token. */
  vary: 0.45,           /* spread of speeds between streams; 0 runs them in lockstep */
  tail: 0.66,           /* how much of the path the shutter was open for, 0-1 */
  width: 2.6,           /* px, the core at its thickest */
  glow: 16,             /* px of halo around the core */
  heat: 0.72,           /* how far the core is mixed toward white. A long
                           exposure saturates its centre, and it is also what
                           lets Tech Blue read at all on a near-black ground. */
  arc: 115,             /* deg, the direction the fan points away from the
                           convergence point. 0 is right, 90 is down. Aimed
                           down rather than down-left so the fan covers the
                           stage: pointing it past 130 left every lane on one
                           side of the convergence point and the other half of
                           the frame stayed empty for the whole loop. */
  spread: 95,           /* deg, how wide the fan opens. Wide enough to reach
                           both bottom corners, not so wide that the lanes stop
                           reading as lanes - roughly parallel over most of
                           their length, bundling only near the end. Past ~120
                           it turns into a starburst. */
  curve: 0.3,           /* rad, how far the paths bend on their way in. 0 is
                           straight rays, which read as a starburst, not motion. */
  vanishX: 0.54,        /* the convergence point, in fractions of the stage */
  vanishY: 0.12,        /* kept off the top edge on purpose: the bundle is the
                           subject, and at 0.02 it was cropped by the frame */
  direction: "in",      /* in | out - toward the convergence point, or away from it */
  accent: "mixed",      /* mixed | blue | cyan | green | purple */
  background: "",       /* "" keeps the stylesheet's, which is the hub's dark canvas */
  bloom: true,          /* the soft head on the leading end of each trail */
  seed: 11,             /* the fan is random but fixed - one seed always lays
                           out the same way, on both hosts and across resizes */
  autoplay: true,       /* run once it scrolls into view */
  paused: false,
  compact: false        /* the card-sized skin */
};

/* Palette only. A trail is drawn twice: the halo in the stream's own colour
   and the core in that colour mixed toward white by `heat`. That is why Tech
   Blue is usable here at all - on its own, #052975 added to a #0b1120 ground
   is very nearly nothing. */
var PALETTE = {
  blue: [5, 41, 117],
  cyan: [143, 248, 255],
  green: [95, 158, 141],
  purple: [152, 62, 174]
};
/* `mixed` is a weighted bag rather than an even split: the cool three, with
   Innovation Blue carrying it and Tech Blue as the depth behind. Performance
   Purple is available by name and is deliberately not in the default mix -
   three hues read as one photograph, four read as a test card. */
var MIX = ["cyan", "green", "cyan", "blue", "green", "cyan", "blue"];

var ACCENTS = ["mixed", "blue", "cyan", "green", "purple"];
var DIRS = ["in", "out"];
var NUM = ["height", "count", "speed", "vary", "tail", "width", "glow", "heat",
  "arc", "spread", "curve", "vanishX", "vanishY", "seed"];
var BOOL = ["bloom", "autoplay", "paused", "compact"];

/* how finely a path is cached, and how many alpha steps the tail is drawn in.
   Both are quality knobs rather than options: the numbers below are where the
   trail stops looking like a chain of dashes and more of them buys nothing. */
var POINTS = 72;
var SEGS = 10;
var SEGS_SM = 7;

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
   point: the layout must not rearrange itself between the two hosts, between
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

function rgba(c, a) { return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a.toFixed(3) + ")"; }
function toward(c, white) {
  return [
    Math.round(c[0] + (255 - c[0]) * white),
    Math.round(c[1] + (255 - c[1]) * white),
    Math.round(c[2] + (255 - c[2]) * white)
  ];
}

export function initDataTransfer(el, options) {
  var node = typeof el === "string" ? document.querySelector(el) : el;
  if (!node || node.nodeType !== 1) throw new Error("initDataTransfer: no element");
  if (node.__ml) return node.__ml;

  var o = {}, k;
  for (k in DEFAULTS) o[k] = DEFAULTS[k];
  Object.assign(o, fromData(node), options || {});
  validate();

  function validate() {
    if (ACCENTS.indexOf(o.accent) < 0) throw new Error('initDataTransfer: unknown accent "' + o.accent + '"');
    if (DIRS.indexOf(o.direction) < 0) throw new Error('initDataTransfer: unknown direction "' + o.direction + '"');
    if (!(o.count >= 1)) throw new Error("initDataTransfer: count must be at least 1");
    if (!(o.tail > 0 && o.tail <= 1)) throw new Error("initDataTransfer: tail must be between 0 and 1");
    if (!(o.speed > 0)) throw new Error("initDataTransfer: speed must be positive");
  }

  /* ---- DOM. The caller's children are moved into a layer over the canvas
     and moved back on destroy, so this module never owns the copy. ---- */
  var kept = [].slice.call(node.childNodes);
  var canvas = document.createElement("canvas");
  canvas.className = "mldt-canvas";
  canvas.setAttribute("aria-hidden", "true");
  var content = document.createElement("div");
  content.className = "mldt-content";
  kept.forEach(function (n) { content.appendChild(n); });
  node.appendChild(canvas);
  node.appendChild(content);
  node.classList.add("mldt");

  var ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("initDataTransfer: no 2d context");

  var streams = [], W = 0, H = 0, dpr = 1;
  var clock = 0, last = 0, raf = 0, playing = false, lit = false, onScreen = true;
  var listeners = [], io = null, ro = null;

  function vars() {
    node.style.setProperty("--mldt-h", o.height + "px");
    if (o.background) node.style.setProperty("--mldt-bg", o.background);
    else node.style.removeProperty("--mldt-bg");
    node.classList.toggle("mldt-sm", !!o.compact);
    ground();
  }

  /* The ground has to be known as numbers, because every frame paints it
     opaquely before the additive pass. Read it back off the element rather
     than trusting the option, so the stylesheet's default and the JS can
     never disagree about what colour the stage is. */
  var bg = "#0b1120";
  function ground() {
    var v = getComputedStyle(node).backgroundColor;
    var m = /rgba?\(([^)]+)\)/.exec(v);
    if (!m) return;
    var p = m[1].split(",");
    bg = "rgb(" + (+p[0]) + "," + (+p[1]) + "," + (+p[2]) + ")";
  }

  /* ---- the streams. Seeded and built ONCE: re-rolling them on a resize
     would have the fan rearrange itself while you watch, and the gallery and
     the Video page would disagree about the picture. ---- */
  function build() {
    var r = rng(o.seed === undefined ? 11 : o.seed | 0), i, n = Math.round(o.count);
    streams = [];
    for (i = 0; i < n; i++) {
      var frac = n === 1 ? 0.5 : i / (n - 1);
      /* an even fan, then jittered by less than the gap between neighbours so
         the spacing reads as natural without any two swapping places */
      var jitter = (r() - 0.5) * (o.spread / n) * 0.75;
      var name = o.accent === "mixed" ? MIX[i % MIX.length] : o.accent;
      streams.push({
        ang: (o.arc - o.spread / 2 + o.spread * frac + jitter) * Math.PI / 180,
        /* the bend keeps ONE sign across the fan. Mixed signs read as noise;
           one sign with a wide spread of magnitudes is what makes the trails
           cross each other near the convergence point, which is the tangle
           the whole effect is recognised by. */
        bend: o.curve * (0.3 + r() * 1.15),
        speed: o.speed * (1 - o.vary / 2 + r() * o.vary),
        phase: r(),
        w: o.width * (0.6 + r() * 0.85),
        col: PALETTE[name],
        hot: toward(PALETTE[name], o.heat),
        pts: null,
        dep: null
      });
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

    var vx = o.vanishX * W, vy = o.vanishY * H;
    streams.forEach(function (s) {
      var ux = Math.cos(s.ang), uy = Math.sin(s.ang);
      /* Spawn each stream just outside the edge the ray actually leaves by,
         rather than at one radius for the whole fan: a fixed radius puts the
         rays that exit a short edge far off-frame, so they spend most of the
         loop invisible and the fan reads as half empty. */
      var tx = ux > 0 ? (W - vx) / ux : ux < 0 ? -vx / ux : Infinity;
      var ty = uy > 0 ? (H - vy) / uy : uy < 0 ? -vy / uy : Infinity;
      var R = Math.min(tx, ty) * 1.12;
      var p0x = vx + ux * R, p0y = vy + uy * R;
      /* the control point is the spawn direction at half distance, rotated -
         one rotation is all the bend there is, and it is enough */
      var ca = s.ang + s.bend;
      var cx = vx + Math.cos(ca) * R * 0.52, cy = vy + Math.sin(ca) * R * 0.52;

      var pts = new Float32Array(POINTS * 2), dep = new Float32Array(POINTS), i;
      for (i = 0; i < POINTS; i++) {
        /* travel order: index 0 is where the head starts. `dep` is distance
           from the convergence point regardless of direction, so the taper
           and the atmospheric dimming are keyed to depth and not to time. */
        var f = i / (POINTS - 1);
        var t = o.direction === "in" ? f : 1 - f;
        var m = 1 - t;
        pts[i * 2] = m * m * p0x + 2 * m * t * cx + t * t * vx;
        pts[i * 2 + 1] = m * m * p0y + 2 * m * t * cy + t * t * vy;
        dep[i] = 1 - t;
      }
      s.pts = pts;
      s.dep = dep;
    });
  }

  function lerpX(p, idx) {
    var i = Math.floor(idx), f = idx - i;
    if (i >= POINTS - 1) return p[(POINTS - 1) * 2];
    return p[i * 2] + (p[i * 2 + 2] - p[i * 2]) * f;
  }
  function lerpY(p, idx) {
    var i = Math.floor(idx), f = idx - i;
    if (i >= POINTS - 1) return p[(POINTS - 1) * 2 + 1];
    return p[i * 2 + 1] + (p[i * 2 + 3] - p[i * 2 + 1]) * f;
  }

  /* one stream's exposure, from `lo` to `hi` in point-index space */
  function trail(s, lo, hi, segs) {
    var span = hi - lo, k, a0, a1, mid, f, d, wAt, x, y, j;
    for (k = 0; k < segs; k++) {
      a0 = lo + span * (k / segs);
      a1 = lo + span * ((k + 1) / segs);
      mid = (a0 + a1) / 2;
      d = s.dep[Math.min(POINTS - 1, Math.round(mid))];
      /* brightness along the tail: dark at the open end, full at the head.
         Squared-ish, because a linear ramp reads as a stick with a fade on it
         rather than as something that was moving. */
      f = Math.pow((k + 0.5) / segs, 1.7);
      /* and the far end of the path is both thinner and dimmer - that is the
         only depth cue there is on a flat canvas */
      var near = 0.3 + 0.7 * d;
      /* the far end is thinner but NOT much darker: the bundle at the
         convergence point is where every trail overlaps, and that is where the
         additive pass is supposed to blow out to white. Dimming with distance
         the way a width taper does would take the one event the picture is
         built around and fade it. */
      var dim = 0.72 + 0.28 * d;
      wAt = s.w * near;

      ctx.beginPath();
      ctx.moveTo(lerpX(s.pts, a0), lerpY(s.pts, a0));
      for (j = Math.ceil(a0); j < a1; j++) {
        x = s.pts[j * 2]; y = s.pts[j * 2 + 1];
        ctx.lineTo(x, y);
      }
      ctx.lineTo(lerpX(s.pts, a1), lerpY(s.pts, a1));

      /* halo first, in the stream's own colour, then the core over it in the
         whitened mix - two strokes of one path, which is the whole of the
         neon look and costs nothing that a blur filter would */
      ctx.strokeStyle = rgba(s.col, f * dim * 0.26);
      ctx.lineWidth = wAt + o.glow * near;
      ctx.stroke();
      ctx.strokeStyle = rgba(s.hot, f * dim);
      ctx.lineWidth = wAt;
      ctx.stroke();
    }
  }

  function head(s, at) {
    var d = s.dep[Math.min(POINTS - 1, Math.round(at))];
    var x = lerpX(s.pts, at), y = lerpY(s.pts, at);
    var r = o.glow * (0.35 + 0.75 * d);
    if (r < 0.5) return;
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgba(s.hot, 0.55 * (0.5 + 0.5 * d)));
    g.addColorStop(0.45, rgba(s.col, 0.2 * (0.5 + 0.5 * d)));
    g.addColorStop(1, rgba(s.col, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  /* The light the streams are travelling to. This is not decoration: it is
     the integral the no-accumulation trade-off dropped. Every stream's head
     passes through this point once per loop, so over an exposure the point
     collects `count` passes while any other pixel collects one - which is why
     it is the only part of the picture that reaches white. Sized off the
     shorter edge so it stays in proportion on a 171px card and a 420px band. */
  function core() {
    var vx = o.vanishX * W, vy = o.vanishY * H;
    var r = Math.max(18, o.glow * 2.2 + Math.min(W, H) * 0.09);
    var g = ctx.createRadialGradient(vx, vy, 0, vx, vy, r);
    g.addColorStop(0, "rgba(255,255,255,0.62)");
    g.addColorStop(0.22, rgba(PALETTE.cyan, 0.34));
    g.addColorStop(0.55, rgba(PALETTE.cyan, 0.1));
    g.addColorStop(1, rgba(PALETTE.cyan, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(vx, vy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  function draw(time) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    /* additive from here on, so crossing trails add up. That alone does NOT
       blow the convergence point out to white, which is what the reference
       asks for: only one or two heads are within the last tenth of the path at
       any moment, and everything before that is in flight somewhere else. The
       burnout in a real long exposure is the film accumulating every trail's
       whole pass through that point - the one thing this renderer deliberately
       throws away to stay framerate-independent. core() models it back. */
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    var segs = o.compact ? SEGS_SM : SEGS, end = POINTS - 1;
    streams.forEach(function (s) {
      /* u runs 0 -> 1 + tail. Up to 1 the head travels; past 1 the head is
         parked on the convergence point and the open end catches up, so the
         trail is swallowed by the point rather than switched off. */
      var span = 1 + o.tail;
      var u = ((time / s.speed) + s.phase) % span;
      if (u < 0) u += span;
      var h = Math.min(1, u), t0 = Math.max(0, u - o.tail);
      if (h - t0 < 0.004) return;
      trail(s, t0 * end, h * end, segs);
      if (o.bloom && u <= 1) head(s, h * end);
    });
    /* last, so it sits over the heads arriving into it rather than under them */
    if (o.bloom) core();
  }

  /* ---- the loop ---- */
  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!last) last = now;
    /* clamp the step: a tab that was in the background for a minute must not
       teleport every stream, it must carry on from where it was */
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

  /* Reduced motion is a photograph, not an empty box: the streams are frozen
     at their own phases inside the readable part of the run, so what is on
     screen is exactly one long exposure - which is what the entry is. */
  function still() {
    stop();
    layout();
    draw(0.42 * o.speed);
    lit = true;
    node.classList.add("is-lit");
  }

  function on(t, ev, fn, opt) { t.addEventListener(ev, fn, opt); listeners.push([t, ev, fn, opt]); }

  function resize() {
    layout();
    if (!playing) draw(reduced() ? 0.42 * o.speed : clock);
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
    /* seek is what makes the exposure testable: hand it a time in ms and the
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
      node.classList.remove("mldt", "mldt-sm", "is-lit");
      ["--mldt-h", "--mldt-bg"].forEach(function (v) { node.style.removeProperty(v); });
      node.innerHTML = "";
      kept.forEach(function (n) { node.appendChild(n); });
      delete node.__mlData;
      delete node.__ml;
    }
  };
  node.__mlData = api;
  /* the handle both hosts look for - never the per-entry name */
  node.__ml = api;
  return api;
}

/* Auto-init, so a page only needs the markup and this module. */
export function mountAll(root) {
  return [].slice.call((root || document).querySelectorAll('[data-ml="data-transfer"]'))
    .map(function (n) { return initDataTransfer(n); });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { mountAll(); });
  else mountAll();
}
