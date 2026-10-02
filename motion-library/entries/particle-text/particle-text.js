/* Continia Motion Library — Particle Text
   A word rasterised into a grid of small lights, with a hole the pointer
   carries through it. The particles do not scatter and drift back; each one
   keeps a home cell in the glyph and a critically damped spring pulls it there,
   so the word is always legible and the hole is the only thing that moves.

   Built from scratch on the Continia tokens. The motion idea is the one React
   Bits Pro ships as "Particle Text"; none of their code is used here - it is a
   paid product whose licence (2.4) forbids putting its source in a repository,
   and this repo is public. See meta.json → brandNotes.

   Usage:
     <h2 data-ml="particle-text">Continia</h2>
     <script type="module" src="entries/particle-text/particle-text.js"></script>

   The element's own text is what gets rasterised, and it stays in the DOM in a
   visually-hidden span so a screen reader still reads the word - a canvas full
   of squares says nothing. destroy() puts the original children back.

   Or call it yourself:
     import { initParticleText } from "./particle-text.js";
     const pt = initParticleText(el, { text: "brilliant.", radius: 110 });
     pt.update({ paused: true });
     pt.destroy(); */

import { prefersReducedMotion, durationMs } from "../../tokens/motion-tokens.js";
import { initUserCursor } from "../user-cursor/user-cursor.js";

export const DEFAULTS = {
  height: 360,            /* px, the stage */
  text: "",               /* "" takes the element's own text, which is the usual case */
  weight: 850,            /* the hub's heaviest weight - thin strokes do not survive sampling */
  family: "",             /* "" inherits the page's font. Never load one here. */

  /* Sampling. `gap` is the grid step in CSS px and `dot` is the square drawn at
     each cell; dot < gap is what leaves the lattice visible. Both are in px
     rather than a ratio because the picture is a pixel grid - scaling it with
     the stage would make a card and a hero two different textures. */
  gap: 5,
  dot: 2.6,
  max: 9000,              /* particle cap; `gap` is widened until the count fits */

  /* How much of the stage the word fills. Two numbers, because a long word is
     limited by the width and a short one by the height, and the smaller of the
     two sizes is the one that gets used. */
  fillX: 0.86,
  fillY: 0.62,
  maxSize: 0,             /* px cap on the font size; 0 = no cap */

  /* The hole. A particle inside `radius` is given a target ON THE RIM rather
     than a force pushing it away - see the comment on target() for why that is
     the whole picture. `swirl` slides that target sideways so the rim streaks
     instead of sitting still. */
  radius: 90,
  swirl: 18,

  /* Two time constants, both off the duration scale. The hole has to open as
     fast as the pointer moves or it lags behind the arrow; the word can take
     its time coming back, and a slow return is what makes the wake read. */
  push: durationMs.fast,    /* 150ms  - into the rim */
  settle: durationMs.slow,  /* 600ms  - home again */

  /* Idle shimmer. A flat field of identical squares reads as a halftone print;
     a per-particle phase makes it read as something lit. `twinkle` is a loop
     length, so it is an option rather than a token. */
  twinkle: 2600,
  sparkle: 0.3,           /* 0..1, how deep the shimmer cuts */

  /* Two hues: Innovation Blue carries the word, Performance Purple speckles
     through it. Three was one too many - green sits close enough to cyan in
     value that at a 2px square it read as a dirty cyan rather than as a second
     colour, while purple is far enough away to register as deliberate. A single
     named accent paints every particle one colour. */
  accent: "mixed",        /* mixed | cyan | blue | green | purple - palette only */
  bg: "",                 /* "" keeps the stylesheet's dark stage */
  seed: 7,

  cursor: true,           /* mount the library's User Cursor and hand it the tour */
  name: "",               /* the cursor's pill. Empty is the arrow on its own. */
  arrow: 22,              /* px, the cursor's arrow */
  cycle: 9000,            /* ms for one full figure-eight tour */

  autoplay: true,
  paused: false,
  compact: false
};

/* Continia palette, as RGB so a tint can be written straight into an ImageData
   buffer. Tech Blue is in the list and is never the mixed default: the stage is
   near-black in both themes, and #052975 on #070d1a is not a light. */
var PALETTE = {
  blue:   [5, 41, 117],
  cyan:   [143, 248, 255],
  green:  [95, 158, 141],
  purple: [152, 62, 174]
};

var ACCENTS = ["mixed", "blue", "cyan", "green", "purple"];
var NUM = ["height", "weight", "gap", "dot", "max", "fillX", "fillY", "maxSize",
  "radius", "swirl", "push", "settle", "twinkle", "sparkle", "seed", "arrow", "cycle"];
var BOOL = ["cursor", "autoplay", "paused", "compact"];

/* data-fill-x → fillX, and only for keys we actually know */
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

/* mulberry32 - the tints and the phases must land in the same places on both
   hosts and across every resize, so the randomness is seeded and rolled once. */
function rng(seed) {
  var a = seed >>> 0;
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* A critically damped spring, integrated in closed form so a 64ms frame is as
   stable as a 4ms one - the same model the User Cursor's follower and the
   Comparison Slider's divider use. A single-pole lag is the obvious
   alternative and it is wrong here for the same reason it is wrong there: a
   lag answers a jumped target with its HIGHEST speed in the first frame, so
   every particle would leave its cell at a sprint the instant the hole touched
   it and crawl the last third of the way back. */
function damp(p, v, t, w, dt) {
  var e = Math.exp(-w * dt), A = p - t, B = v + w * A, q = A + B * dt;
  return [t + q * e, (B - w * q) * e];
}

export function initParticleText(node, options) {
  if (!node || node.nodeType !== 1) throw new Error("initParticleText: needs an element");
  /* Both hosts call mountAll after the cards exist and the module also
     auto-inits on import, so every mount is init'd twice; without this the
     second run captures the first run's wrappers as the caller's children. */
  if (node.__ml) return node.__ml;

  var o = Object.assign({}, DEFAULTS, fromData(node), options || {});
  if (ACCENTS.indexOf(o.accent) < 0) {
    throw new Error('initParticleText: accent "' + o.accent + '" is not one of ' +
      ACCENTS.join(", ") + " - the palette is deliberate, add a token rather than a hex here");
  }
  if (!(o.gap > 0) || !(o.dot > 0)) throw new Error("initParticleText: gap and dot must be > 0");
  if (!(o.push > 0) || !(o.settle > 0)) throw new Error("initParticleText: push and settle must be > 0");

  /* The caller's children are the word. They go into a visually-hidden span so
     the text stays in the accessibility tree - everything a visitor can see is
     painted into a canvas, and a canvas of squares reads as nothing at all -
     and they come back untouched on destroy(). */
  var kept = [].slice.call(node.childNodes);
  var word = (o.text || node.textContent || "").replace(/\s+/g, " ").trim();
  if (!word) throw new Error("initParticleText: no text - give the element some, or pass { text }");

  var sr = document.createElement("span");
  sr.className = "mlpt-sr";
  kept.forEach(function (n) { sr.appendChild(n); });

  var stage = document.createElement("div");
  stage.className = "mlpt-stage";

  var canvas = document.createElement("canvas");
  canvas.className = "mlpt-c";
  canvas.setAttribute("aria-hidden", "true");

  node.classList.add("mlpt");
  node.innerHTML = "";
  node.appendChild(sr);
  node.appendChild(stage);

  var ctx = canvas.getContext("2d");
  /* a second, throwaway canvas: the glyphs are drawn once into this one and
     read back as pixels. It is never on the page. */
  var raster = document.createElement("canvas");
  var rctx = raster.getContext("2d", { willReadFrequently: true });

  var W = 0, H = 0, dpr = 1, CW = 0, CH = 0;
  var img = null, buf = null;
  var N = 0, hx = null, hy = null, px = null, py = null, vx = null, vy = null;
  var tint = null, phase = null;
  var reduced = false, running = false, raf = 0, last = 0, clock = 0;
  var uc = null, io = null, ro = null, listeners = [];
  var hover = null;          /* the real pointer, when the cursor is not mounted */
  var built = false;

  function on(t, e, fn, opt) { t.addEventListener(e, fn, opt || false); listeners.push([t, e, fn, opt || false]); }

  function vars() {
    node.style.setProperty("--mlpt-h", o.height + "px");
    if (o.bg) node.style.setProperty("--mlpt-bg", o.bg); else node.style.removeProperty("--mlpt-bg");
    node.classList.toggle("mlpt-sm", !!o.compact);
    node.classList.toggle("is-paused", !!o.paused);
  }

  function measure() {
    var r = node.getBoundingClientRect();
    W = Math.round(r.width); H = Math.round(r.height);
    /* Cap the device pixel ratio at 2. A 3x phone would quadruple the buffer
       for a picture whose smallest feature is already a 2.6px square. */
    dpr = Math.min(2, window.devicePixelRatio || 1);
  }

  /* The font size that makes the word fill the stage. Measured at a reference
     size and scaled, rather than searched: one measureText instead of a dozen,
     and the metrics are linear in the size. */
  function fitSize(font) {
    var ref = 100;
    rctx.font = font(ref);
    var m = rctx.measureText(word);
    var w = m.width || 1;
    var h = (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) || ref * 0.72;
    var s = Math.min((W * o.fillX) / w, (H * o.fillY) / h) * ref;
    if (o.maxSize > 0) s = Math.min(s, o.maxSize);
    return Math.max(8, s);
  }

  /* Rasterise the word, then walk a grid over the result and keep one particle
     per cell that lands on ink. The grid is widened until the count fits under
     `max`, so a long word on a wide hero costs the same as a short one. */
  function build() {
    if (!W || !H) return;
    var fam = o.family || getComputedStyle(node).fontFamily || "sans-serif";
    function font(size) { return o.weight + " " + size + "px " + fam; }

    raster.width = W; raster.height = H;
    rctx.setTransform(1, 0, 0, 1, 0, 0);
    rctx.clearRect(0, 0, W, H);
    var size = fitSize(font);
    rctx.font = font(size);
    rctx.textBaseline = "alphabetic";
    rctx.fillStyle = "#fff";
    var m = rctx.measureText(word);
    var x0 = (W - m.width) / 2;
    /* centre on the INK, not on the em box: a word with no descender sits
       visibly low when it is centred on the line box instead. */
    var base = (H + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent)) / 2;
    rctx.fillText(word, x0, base);

    var data = rctx.getImageData(0, 0, W, H).data;
    var gap = Math.max(1, o.gap), cells;
    var xs = [], ys = [];
    for (;;) {
      xs.length = 0; ys.length = 0;
      for (var y = gap / 2; y < H; y += gap) {
        var ry = y | 0;
        for (var x = gap / 2; x < W; x += gap) {
          if (data[(ry * W + (x | 0)) * 4 + 3] > 128) { xs.push(x); ys.push(y); }
        }
      }
      cells = xs.length;
      if (cells <= o.max || gap > 40) break;
      gap += 1;
    }

    N = cells;
    hx = new Float32Array(N); hy = new Float32Array(N);
    px = new Float32Array(N); py = new Float32Array(N);
    vx = new Float32Array(N); vy = new Float32Array(N);
    tint = new Uint8Array(N); phase = new Float32Array(N);

    var r = rng(o.seed >>> 0);
    for (var i = 0; i < N; i++) {
      hx[i] = xs[i]; hy[i] = ys[i];
      px[i] = xs[i]; py[i] = ys[i];
      phase[i] = r() * Math.PI * 2;
      tint[i] = pick(r());
    }
    built = true;
    resizeCanvas();
  }

  /* "mixed" is the default: Innovation Blue in the clear majority with
     Performance Purple through it. The majority has to stay large - the word is
     read off the cyan, and an even split reads as two words printed on top of
     each other. A named accent paints every particle that colour instead. */
  function pick(x) {
    if (o.accent !== "mixed") return ["blue", "cyan", "green", "purple"].indexOf(o.accent);
    return x < 0.78 ? 1 : 3;     /* cyan : purple */
  }

  function resizeCanvas() {
    CW = Math.max(1, Math.round(W * dpr));
    CH = Math.max(1, Math.round(H * dpr));
    canvas.width = CW; canvas.height = CH;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    img = ctx.createImageData(CW, CH);
    buf = img.data;
  }

  /* Where the hole is. One source of truth: when the cursor is mounted it is
     the arrow's own tip - which IS the real pointer whenever a hand is on the
     stage, because the cursor reports that itself - so the arrow and the hole
     can never disagree about where the hole is. Without the cursor it is the
     real pointer or nothing. */
  function point() {
    if (uc) {
      var a = uc.at();
      return a.reduced ? null : a;
    }
    return hover;
  }

  /* The hole is a TARGET, not a force. A repulsive force pushes every particle
     it touches a different distance depending on how long it has been in the
     field, which blows the word apart into a cloud and never draws an edge.
     Giving a particle inside the radius a target on the RIM instead means the
     boundary is exactly where the picture is: the particles pile up on it and
     the inside empties completely, which is the circle with a bright edge the
     effect is recognised by. `swirl` slides that target around the rim so the
     pile streaks rather than stacking. */
  var PUSH = 0;
  function step(dt) {
    var p = point();
    var R = o.radius, R2 = R * R;
    var wPush = 1000 / o.push, wHome = 1000 / o.settle;
    var sp = dt / 1000;
    PUSH = p ? 1 : 0;
    for (var i = 0; i < N; i++) {
      var tx = hx[i], ty = hy[i], w = wHome;
      if (p) {
        var dx = px[i] - p.x, dy = py[i] - p.y, d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          /* dead centre: push along the particle's own home direction instead
             of dividing by zero, so the middle of the hole empties too */
          var d = Math.sqrt(d2);
          if (d < 0.001) { dx = hx[i] - p.x || 1; dy = hy[i] - p.y; d = Math.hypot(dx, dy) || 1; }
          var ux = dx / d, uy = dy / d;
          tx = p.x + ux * R - uy * o.swirl;
          ty = p.y + uy * R + ux * o.swirl;
          w = wPush;
        }
      }
      var a = damp(px[i], vx[i], tx, w, sp); px[i] = a[0]; vx[i] = a[1];
      var b = damp(py[i], vy[i], ty, w, sp); py[i] = b[0]; vy[i] = b[1];
    }
  }

  function paint() {
    if (!buf) return;
    buf.fill(0);
    var ds = Math.max(1, Math.round(o.dot * dpr));
    var tw = clock / o.twinkle * Math.PI * 2;
    var sparkle = clamp(o.sparkle, 0, 1);
    var cols = ["blue", "cyan", "green", "purple"];
    for (var i = 0; i < N; i++) {
      var c = PALETTE[cols[tint[i]]];
      /* Two things set a particle's brightness: its own shimmer phase, and how
         far it has been carried from its cell. The second one is why the rim
         reads as lit rather than merely crowded. */
      var ex = Math.min(1, Math.hypot(px[i] - hx[i], py[i] - hy[i]) / 46);
      var a = (1 - sparkle + sparkle * (0.5 + 0.5 * Math.sin(phase[i] + tw)));
      if (reduced) a = 1 - sparkle * 0.25;
      a = clamp(a * (0.82 + 0.18 * ex) + ex * 0.3, 0, 1);
      var X = Math.round(px[i] * dpr), Y = Math.round(py[i] * dpr);
      if (X < -ds || Y < -ds || X >= CW || Y >= CH) continue;
      var A = (a * 255) | 0;
      for (var oy = 0; oy < ds; oy++) {
        var yy = Y + oy; if (yy < 0 || yy >= CH) continue;
        var row = yy * CW;
        for (var ox = 0; ox < ds; ox++) {
          var xx = X + ox; if (xx < 0 || xx >= CW) continue;
          var k = (row + xx) * 4;
          buf[k] = c[0]; buf[k + 1] = c[1]; buf[k + 2] = c[2]; buf[k + 3] = A;
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  function frame(now) {
    if (!running || o.paused) return;
    raf = requestAnimationFrame(frame);
    var dt = Math.min(64, now - last);
    last = now;
    if (dt <= 0) return;
    clock += dt;
    step(dt);
    paint();
  }

  function kick() {
    if (o.paused || running || reduced || !built) return;
    running = true; last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function halt() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  /* A figure-eight closes its own loop by construction, which is the whole
     reason to use one: a tour that ends anywhere but where it started
     teleports the arrow at every cycle boundary, and no smoothing makes that
     graceful. It also crosses the word twice per cycle, so a short word is not
     left waiting while the arrow walks back. */
  function tour(t) {
    var u = (t % o.cycle) / o.cycle * Math.PI * 2;
    var ax = W * 0.40, ay = H * 0.17;
    return [W / 2 + ax * Math.sin(u), H / 2 + ay * Math.sin(2 * u)];
  }

  function mountCursor() {
    if (!o.cursor || uc) return;
    /* The arrow is never "auto". auto follows --navy, which is Tech Blue in the
       light theme, and this stage is near-black in BOTH themes - the arrow came
       out as a navy shape on a navy ground on every light-mode page. The same
       inversion the palette rule already demands for a background, applied to
       the one element that has to be seen. Only the two accents that read on a
       dark ground are passed through. */
    var arrowAccent = (o.accent === "green" || o.accent === "purple") ? o.accent : "cyan";
    uc = initUserCursor(stage, {
      height: o.height, name: o.name, accent: arrowAccent,
      size: o.arrow, autoplay: o.autoplay, compact: o.compact, paused: o.paused,
      autoPath: function (clock_) { return tour(clock_); }
    });
  }

  reduced = prefersReducedMotion();
  vars();
  mountCursor();
  /* After the cursor and before its layer. The User Cursor wraps whatever it
     finds into .mluc-content, so a canvas appended first would be laid out
     inside that flex column instead of filling the stage - and appended last
     it would paint over the arrow. Between the two is the only right place. */
  var arrowLayer = stage.querySelector(".mluc-layer");
  if (arrowLayer) stage.insertBefore(canvas, arrowLayer); else stage.appendChild(canvas);

  function relayout() {
    var w0 = W, h0 = H;
    measure();
    if (!W || !H) return;
    if (!built || W !== w0 || H !== h0) { build(); paint(); }
  }
  relayout();

  /* The glyphs are sampled from a raster, so sampling before the webfont has
     arrived samples the FALLBACK's shapes and the word silently comes out in
     the wrong typeface. One rebuild when the font is ready costs nothing and
     is the difference between Alliance No.2 and Helvetica. */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { if (node.__ml === api) { build(); paint(); } });
  }

  /* Only needed when the cursor is off: with it mounted, at() already reports
     the real pointer whenever a hand is on the stage. */
  if (!o.cursor) {
    on(stage, "pointermove", function (e) {
      if (e.pointerType === "touch") return;
      var r = stage.getBoundingClientRect();
      hover = { x: e.clientX - r.left, y: e.clientY - r.top };
    });
    on(stage, "pointerleave", function () { hover = null; });
  }

  if ("ResizeObserver" in window) {
    ro = new ResizeObserver(function () { relayout(); });
    ro.observe(node);
  } else {
    on(window, "resize", relayout);
  }

  /* Off-screen and background tabs cost nothing: the loop stops and the last
     frame stays on the canvas, so a card scrolled back into view is already
     showing the word rather than an empty box. */
  if (o.autoplay && "IntersectionObserver" in window) {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) kick(); else halt(); });
    }, { threshold: 0.12 });
    io.observe(node);
  } else if (o.autoplay) { kick(); }
  on(document, "visibilitychange", function () { if (document.hidden) halt(); else kick(); });

  if (reduced) paint();

  var api = {
    el: node,
    update: function (next) {
      var before = { gap: o.gap, text: o.text, accent: o.accent, weight: o.weight,
        fillX: o.fillX, fillY: o.fillY, maxSize: o.maxSize, seed: o.seed, dot: o.dot };
      Object.assign(o, next || {});
      if (ACCENTS.indexOf(o.accent) < 0) throw new Error('initParticleText: unknown accent "' + o.accent + '"');
      vars();
      if (uc) uc.update({ paused: o.paused, name: o.name, size: o.arrow, compact: o.compact });
      var rebuild = Object.keys(before).some(function (k) { return before[k] !== o[k]; });
      if (next && "text" in next) { word = (o.text || word).replace(/\s+/g, " ").trim(); rebuild = true; }
      measure();
      if (rebuild) build();
      if (o.paused) { halt(); } else { kick(); }
      paint();
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
      if (ro) ro.disconnect();
      if (uc) { uc.destroy(); uc = null; }
      node.classList.remove("mlpt", "mlpt-sm", "is-paused");
      ["--mlpt-h", "--mlpt-bg"].forEach(function (v) { node.style.removeProperty(v); });
      node.innerHTML = "";
      kept.forEach(function (n) { node.appendChild(n); });
      delete node.__mlParticleText;
      delete node.__ml;
    }
  };
  if (o.paused) halt();
  node.__mlParticleText = api;
  /* the handle both hosts look for. A host renders a play/pause button for
     every component, so it cannot know the per-entry name. */
  node.__ml = api;
  return api;
}

/* Auto-init, so a page only needs the markup and this module. */
export function mountAll(root) {
  return [].slice.call((root || document).querySelectorAll('[data-ml="particle-text"]'))
    .map(function (n) { return initParticleText(n); });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { mountAll(); }, { once: true });
  } else { mountAll(); }
}
