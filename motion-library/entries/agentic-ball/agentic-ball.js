/* Continia Motion Library — Agentic Ball
   ----------------------------------------------------------------------
   A lit sphere with a liquid swirl turning on its surface, breathing between
   almost-still and churning. It is a state orb: the thing an assistant shows
   while it is idle, listening, thinking or answering.

   WHAT THE REFERENCE ACTUALLY IS, measured rather than eyeballed.
   The capture is 300 frames at 20ms, one 6s pass. Three things came out of it
   and all three are in the defaults:

     - The ball does not move. Its bounding box is identical in all 300 frames,
       so everything that happens, happens on the surface.
     - The pattern is two-armed. An FFT of the luminance around the ball, band
       by band, puts m=2 on top at every radius (6367/6299/4617/2870), with m=1
       and m=4 as the secondaries. Hence `arms: 2` plus two weaker harmonics
       rather than noise: noise would have given a flat spectrum.
     - It breathes. Standard deviation inside the disc runs 10 at frame 60,
       peaks at 52 at frame 217 and falls back to 25 - one slow swell per pass,
       which is `calm` + `swell` over `breath`.

   Two numbers the capture does NOT pin down, said plainly rather than dressed
   up: the rotation came out at 20-40 deg/s against a measurement whose own
   bin size is 20 deg/s, so `spin: 12000` (30 deg/s) is the right order and not
   a measured figure. And the m=2 phase winds about 200 degrees from centre to
   limb, but fitting it as A*r^p gives an 11-14 degree residual for every p
   from 1 to 3 - the data cannot tell a straight wind from a curved one, so
   `swirl` uses the simplest, r to the first power.

   WHY THE WHOLE FRAME IS A DOT PRODUCT.
   The obvious build is per-pixel noise, which is far too slow to do honestly
   at 60fps in 2D. But the field here is a sum of a few sinusoids, and a
   sinusoid separates:

     cos(p + wt) = cos(p)*cos(wt) + sin(p)*sin(wt)

   p is fixed per pixel, wt is one scalar per frame. So cos(p), sin(p) and the
   pixel's own gradient coefficient are precomputed once, and a frame is

     v = base[i] + SUM_k A_k * g_k[i] * (cosP_k[i]*c_k + sinP_k[i]*s_k)

   - nine multiplies and nine adds per pixel for three harmonics, no trig in
   the loop at all. The whole frame is a linear combination of precomputed
   arrays with six time-varying scalars, which is also why it is a pure
   function of the clock: framerate-independent, resize-safe, seekable, and a
   pause lands on a correct picture.

   The useful consequence: `state`, `calm`, `swell`, `relief` and `spin` are
   all scalars in that expression. Switching state costs nothing, rebuilds
   nothing and cannot restart the animation - it just moves two numbers. Only
   `arms`, `swirl`, `light`, `seed` and the geometry touch the arrays.

   The bump term is a shading perturbation, not an integrated normal map: we
   add the height field's screen-space gradient along the light rather than
   re-deriving the normal. It is one multiply instead of a normalise, and on a
   sphere this soft the difference is not visible. Saying so because the code
   looks like a normal map and is not one.

   Markup: children are kept and laid over the ball, so this module never owns
   the copy.

     <div data-ml="agentic-ball" data-state="thinking">
       <p class="mlab-label">Thinking</p>
     </div>
*/

import { prefersReducedMotion } from "../../tokens/motion-tokens.js";

export const DEFAULTS = {
  height: 320,          /* px of stage. Both hosts clamp this to the card, so
                           it only bites when the entry is used on its own. */
  size: 0.58,           /* the ball's diameter as a fraction of the stage's
                           shorter side */
  arms: 2,              /* the dominant harmonic - measured m=2 */
  swirl: 200,           /* degrees the pattern winds from centre to limb */
  spin: 12000,          /* ms for the dominant harmonic to go once round. The
                           other two are locked to integer multiples of it, so
                           the whole picture is exactly periodic - see RATES. */
  breath: 6000,         /* ms for one swell of activity */
  state: "thinking",    /* a preset over calm/swell/spin/relief - see STATES.
                           "" or "custom" uses the values as given. */
  calm: 0.26,           /* the floor of the swirl's amplitude */
  swell: 0.4,           /* how much the breath adds on top of the floor */
  relief: 1.5,          /* how hard the swirl carves ridges: the height
                           field's gradient, projected on the light */
  tone: 0.34,           /* how much the swirl darkens and lightens on its own,
                           independent of the light. Without it the pattern is
                           only visible where its gradient faces the key. */
  light: 128,           /* degrees, the key light's bearing. 0 is from the
                           right, 90 from directly above. */
  ambient: 0.1,         /* fill light, so the dark side is not a hole */
  wrap: 0.24,           /* how far the key light wraps past the terminator. A
                           translucent body carries light around its own edge,
                           and a hard terminator is the single thing that makes
                           a sphere read as stone rather than as glass. */
  frost: 0.22,           /* the milkiness. A diffusing medium lifts its shadows
                           far more than its highlights - veiling glare - so
                           this mixes the ramp toward white in inverse
                           proportion to brightness rather than evenly. */
  sheen: 0.34,           /* the specular: the soft window reflection glass
                           catches, sitting off the key light */
  edge: 0.85,           /* the bright ring at the circumference. Glass is
                           brightest where you look through the most of it,
                           which is exactly at the limb. */
  blur: 3,              /* px of defocus on the swirl, at the drawn size. The
                           churn is seen THROUGH the frost, not painted on it. */
  rim: 0.55,            /* the back rim that separates the ball from the
                           stage. Opposite the key, which is why the reference
                           has a bright edge at the bottom right. */
  accent: "cyan",       /* palette only - see PALETTE */
  glow: true,           /* the halo the ball throws onto the stage */
  detail: 288,          /* the shading buffer's longest side, in px. The ball
                           is upscaled from it, which is invisible because a
                           sphere's shading has no hard edges - and the limb
                           is a clipped arc, so the silhouette stays crisp at
                           any buffer size. */
  background: "",       /* empty keeps the stylesheet's dark stage */
  seed: 5,              /* the harmonics' phase offsets. Fixed, so both hosts
                           and every resize draw the same ball. */
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
var ACCENTS = ["blue", "cyan", "green", "purple"];

/* The three harmonics: [m, swirl multiplier, turns per `spin`, weight].
   The turn counts are INTEGERS so the composite is exactly periodic - the ball
   returns to its own starting frame, which a pile of incommensurate rates
   never does. Counter-rotating the second one is what stops the pattern
   reading as one rigid stencil going round. */
var RATES = [
  [2, 1.0, 1, 1.0],
  [1, 0.62, -2, 0.55],
  [4, 0.9, 3, 0.22]
];

/* Presets, straight from what an assistant is doing. They move scalars only,
   so switching costs nothing - see the header. */
var STATES = {
  idle:      { calm: 0.09, swell: 0.11, spin: 17000, breath: 7200, relief: 0.9, tone: 0.2 },
  listening: { calm: 0.14, swell: 0.2, spin: 12000, breath: 4200, relief: 1.2, tone: 0.28 },
  thinking:  { calm: 0.26, swell: 0.4, spin: 12000, breath: 6000, relief: 1.5, tone: 0.34 },
  speaking:  { calm: 0.34, swell: 0.5, spin: 6000, breath: 1800, relief: 1.7, tone: 0.4 }
};

var NUM = ["height", "size", "arms", "swirl", "spin", "breath", "calm", "swell",
  "relief", "tone", "light", "ambient", "wrap", "frost", "sheen", "edge", "blur",
  "rim", "detail", "seed"];
var BOOL = ["glow", "autoplay", "paused", "compact"];

var TAU = Math.PI * 2;
var LUT = 256;
/* How much of the ramp the DIFFUSE term is allowed to use. It is not the whole
   headroom: the specular, the rim and the frost haze are all added on top of
   it, and the swirl on top of those. Raising it without taking the others down
   is what put a fifth of the ball at flat white. */
var LAMBERT = 0.48;

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

function smooth(e0, e1, x) {
  var t = (x - e0) / (e1 - e0);
  if (t < 0) t = 0; else if (t > 1) t = 1;
  return t * t * (3 - 2 * t);
}

export function initAgenticBall(el, options) {
  var node = typeof el === "string" ? document.querySelector(el) : el;
  if (!node || node.nodeType !== 1) throw new Error("initAgenticBall: no element");
  if (node.__ml) return node.__ml;

  var o = {}, k;
  for (k in DEFAULTS) o[k] = DEFAULTS[k];
  var asked = fromData(node);
  Object.assign(o, asked, options || {});

  /* Which keys the author has actually named, at init or in any later update.
     A preset fills the ones they have NOT named and never overrides the ones
     they have - otherwise data-calm="0.9" would be silently discarded by the
     default state, which is the kind of bug nobody reports because the ball
     still looks fine. */
  var explicit = {};
  function noteExplicit(src) { for (var k2 in (src || {})) explicit[k2] = 1; }
  noteExplicit(asked);
  noteExplicit(options);

  /* `o` is what the author asked for; `p` is that with the state preset folded
     in underneath it. Kept apart so update({state:""}) restores the author's
     own numbers rather than the last preset's. */
  var p = {};
  applyState();
  validate();

  function applyState() {
    var s = STATES[o.state] || null;
    for (var k2 in o) {
      p[k2] = explicit[k2] ? o[k2]
        : (s && k2 in s) ? s[k2]
        : DEFAULTS[k2] !== undefined ? DEFAULTS[k2] : o[k2];
    }
  }

  function validate() {
    if (ACCENTS.indexOf(o.accent) < 0) throw new Error('initAgenticBall: unknown accent "' + o.accent + '"');
    if (o.state && o.state !== "custom" && !STATES[o.state]) {
      throw new Error('initAgenticBall: unknown state "' + o.state + '"');
    }
    if (!(o.arms >= 1)) throw new Error("initAgenticBall: arms must be at least 1");
    if (!(p.spin > 0)) throw new Error("initAgenticBall: spin must be positive");
    if (!(p.breath > 0)) throw new Error("initAgenticBall: breath must be positive");
    if (!(o.size > 0 && o.size <= 1)) throw new Error("initAgenticBall: size must be between 0 and 1");
    if (!(o.detail >= 32)) throw new Error("initAgenticBall: detail must be at least 32");
  }

  /* ---- DOM ---- */
  var kept = [].slice.call(node.childNodes);
  var canvas = document.createElement("canvas");
  canvas.className = "mlab-canvas";
  canvas.setAttribute("aria-hidden", "true");
  var content = document.createElement("div");
  content.className = "mlab-content";
  kept.forEach(function (n) { content.appendChild(n); });
  node.classList.add("mlab");
  node.appendChild(canvas);
  node.appendChild(content);

  var ctx = canvas.getContext("2d");
  var supportsFilter = "filter" in ctx;
  var W = 0, H = 0, dpr = 1, cx = 0, cy = 0, rad = 0;
  var clock = 0, last = 0, raf = 0, playing = false, lit = false, onScreen = true;
  var listeners = [], io = null, ro = null;

  /* The shading buffer and its per-pixel constants. N is buf*buf; every one of
     these is read once per pixel per frame and written only by build(). */
  var buf = document.createElement("canvas");
  var bctx = buf.getContext("2d");
  var img = null, px = null, N = 0, B = 0;
  var base = null;                       /* the bare sphere: lambert + rim + ambient */
  var cosP = [], sinP = [], grad = [];   /* one Float32Array per harmonic */
  var wgt = null;                        /* the radial window, shared by all three */
  var ph = [];                           /* seeded phase offset per harmonic */
  var ramp = new Uint8Array(LUT * 3);    /* shade -> colour, so the loop never mixes */
  var built = 0;                         /* the buffer size the arrays were built at */

  function vars() {
    node.style.setProperty("--mlab-h", o.height + "px");
    if (o.background) node.style.setProperty("--mlab-bg", o.background);
    else node.style.removeProperty("--mlab-bg");
    node.classList.toggle("mlab-sm", !!o.compact);
  }

  /* The colour ramp. The shadow end is Tech Blue scaled down rather than a new
     colour: a darker version of a palette hue is shading, a lightened tint of
     it would be an off-palette colour and those are banned. */
  function makeRamp() {
    var hi = PALETTE[o.accent];
    /* Four stops rather than two. A shaded sphere needs a RANGE, and a ramp
       that sits in one hue for most of its length gives a flat sticker
       whatever the shading does. Deep Tech Blue in the shadow, Tech Blue
       through the terminator, the accent in the light, white in the hotspot. */
    var stops = [
      [0.0, [PALETTE.blue[0] * 0.2, PALETTE.blue[1] * 0.2, PALETTE.blue[2] * 0.26]],
      [0.34, [PALETTE.blue[0], PALETTE.blue[1], PALETTE.blue[2]]],
      [0.72, hi],
      [1.0, [255, 255, 255]]
    ];
    var i, t, c, k2;
    for (i = 0; i < LUT; i++) {
      t = i / (LUT - 1);
      for (k2 = 0; k2 < stops.length - 1 && t > stops[k2 + 1][0]; k2++) { /* find span */ }
      var a = stops[k2], b2 = stops[k2 + 1] || a;
      var f = b2[0] === a[0] ? 0 : (t - a[0]) / (b2[0] - a[0]);
      /* Veiling glare: a diffusing medium scatters a fraction of the light
         back out uniformly, which raises the floor far more than it raises the
         ceiling. Mixing the whole ramp toward white by a constant would just
         wash the ball out; mixing it in inverse proportion to brightness is
         what actually makes it read as frosted. */
      var haze = o.frost * (1 - 0.55 * t);
      for (c = 0; c < 3; c++) {
        var v = a[1][c] + (b2[1][c] - a[1][c]) * f;
        v = v + (255 - v) * haze;
        ramp[i * 3 + c] = v < 0 ? 0 : v > 255 ? 255 : v;
      }
    }
  }

  /* ---- the per-pixel constants. Rebuilt only when the buffer size or one of
     arms/swirl/light/seed changes - never per frame, and never per resize
     unless the buffer size itself moved. ---- */
  function build(size) {
    B = size;
    N = B * B;
    buf.width = B;
    buf.height = B;
    img = bctx.createImageData(B, B);
    px = img.data;
    base = new Float32Array(N);
    wgt = new Float32Array(N);
    cosP = []; sinP = []; grad = [];
    var r = rng(o.seed === undefined ? 5 : o.seed | 0);
    ph = RATES.map(function () { return r() * TAU; });

    var h, i, j;
    for (h = 0; h < RATES.length; h++) {
      cosP.push(new Float32Array(N));
      sinP.push(new Float32Array(N));
      grad.push(new Float32Array(N));
    }

    var la = (o.light * Math.PI) / 180;
    /* screen y grows downward, so a light "above" has a negative y */
    /* lz sets where the terminator falls. At 0.62 the whole front face is lit
       and the ball reads as a flat sticker; 0.34 puts the shadow edge on the
       disc, which is what makes it a sphere. */
    var lx = Math.cos(la), ly = -Math.sin(la), lz = 0.34;
    var ll = Math.sqrt(lx * lx + ly * ly + lz * lz);
    lx /= ll; ly /= ll; lz /= ll;
    var sw = (o.swirl * Math.PI) / 180;

    for (j = 0; j < B; j++) {
      var ny = (2 * (j + 0.5)) / B - 1;
      for (i = 0; i < B; i++) {
        var idx = j * B + i;
        var nx = (2 * (i + 0.5)) / B - 1;
        /* Every pixel of the square is shaded, including the corners that fall
           outside the ball - they are clipped away at draw time. The reason is
           the defocus: a blur samples past the limb, and if those samples are
           transparent it pulls a dark ring in all the way round. Clamping the
           normal at the limb extends the edge colour outward instead, so the
           blur has real pixels to read and the clipped arc stays crisp. It
           also removes the only branch in the per-pixel loop. */
        var u2 = nx * nx + ny * ny;
        var u = Math.sqrt(u2);
        if (u > 1) { nx /= u; ny /= u; u2 = 1; u = 1; }
        var nz = Math.sqrt(1 - u2 < 0 ? 0 : 1 - u2);

        /* the bare sphere */
        var lam = nx * lx + ny * ly + nz * lz;
        /* Wrapped diffuse. The raw dot product cuts off at the terminator with
           a hard edge; shifting and rescaling it carries light round past 90
           degrees, which is what a body you can see into actually does. */
        lam = (lam + o.wrap) / (1 + o.wrap);
        if (lam < 0) lam = 0; else if (lam > 1) lam = 1;

        /* Blinn-Phong, wide and soft: the reflection of a window, not a point
           source. The half-vector against a straight-on viewer is just the
           light plus z. */
        var hx = lx, hy = ly, hz = lz + 1;
        var hl = Math.sqrt(hx * hx + hy * hy + hz * hz);
        var nh = (nx * hx + ny * hy + nz * hz) / hl;
        if (nh < 0) nh = 0;
        var spec = Math.pow(nh, 14);

        /* The rim runs all the way round rather than only opposite the key:
           at the limb you are looking through the whole thickness of the ball,
           so it lights everywhere, brightest on the far side. */
        var e = 1 - nz, e2 = e * e;
        var back = -(nx * lx + ny * ly);
        if (back < 0) back = 0;
        back = 0.38 + 0.62 * back;
        /* The bare sphere is deliberately mixed to peak around 0.78, not 1.
           The swirl is ADDED to this, so a base that already reaches the top
           of the ramp leaves it nowhere to go: at 0.92 gain a third of the
           disc clipped to flat white at the peak of the breath, which is a
           third of the ball with no pattern on it at all. Headroom is the
           whole reason for the number. */
        base[idx] = o.ambient + LAMBERT * Math.pow(lam, 1.4)
                  + o.rim * e2 * e2 * back + o.sheen * spec;

        /* The swirl lives ON the sphere, so its radial coordinate is the
           surface polar angle, not the screen radius: q = asin(u), normalised.
           That single substitution is what stops the ball reading as a
           pinwheel painted on a disc - dq/du runs away toward the limb, so
           the fringes crowd there exactly as a texture on a real sphere does,
           and the chain rule below carries it into the shading for free. */
        var th = Math.atan2(ny, nx);
        var rc = Math.cos(th), rs = Math.sin(th);
        var rdotL = rc * lx + rs * ly;          /* r-hat . light, in screen xy */
        var tdotL = -rs * lx + rc * ly;         /* theta-hat . light */
        var q = (Math.asin(u < 1 ? u : 1) * 2) / Math.PI;
        var dq = 2 / (Math.PI * Math.sqrt(1 - u2 < 1e-4 ? 1e-4 : 1 - u2));

        /* Windowed off at the exact centre, where m/r is singular and every
           arm meets in one point, and off at the limb, where the texture is
           edge-on and the fringes would alias. */
        var win = smooth(0.0, 0.3, u) * smooth(1.0, 0.8, u);
        /* The tangential gradient carries a 1/r metric factor, which is right
           and which puts a singular spike at the exact centre where every arm
           meets. Capped at half a radius: outside that the relief behaves like
           a real surface, inside it stays flat. Letting the 1/r run gives a
           hard pinwheel hub, which is the one thing the reference does not
           have - its arms converge into a soft eye. */
        var ur = u < 0.5 ? 0.5 : u;
        wgt[idx] = win;

        for (h = 0; h < RATES.length; h++) {
          var m = RATES[h][0] * (o.arms / 2);
          var s = sw * RATES[h][1];
          var phase = m * th + s * q + ph[h];
          cosP[h][idx] = Math.cos(phase);
          sinP[h][idx] = Math.sin(phase);
          /* The screen-space gradient of sin(phase) along the light: a radial
             part (through dq/du) and a tangential part, each projected. It is
             divided by its own mid-radius magnitude, so `relief` means the
             same thing whatever `arms` and `swirl` are set to - without that,
             raising arms from 2 to 4 doubles the contrast as a side effect and
             the ball posterises to black and white. */
          var norm = s + 2 * m;
          grad[h][idx] = (RATES[h][3] * win * (s * dq * rdotL + (m / ur) * tdotL)) / (norm || 1);
        }
      }
    }
    makeRamp();
    built = B;
  }

  function layout() {
    var rect = node.getBoundingClientRect();
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = W / 2;
    cy = H / 2;
    rad = (Math.min(W, H) * o.size) / 2;

    /* the buffer never needs to be larger than the ball is on screen */
    var want = Math.max(48, Math.min(Math.round(o.detail), Math.ceil(rad * 2 * dpr)));
    if (want !== built) build(want);
  }

  /* one swell of activity per `breath`, sharpened so the ball spends longer
     calm than it does churning - a flat cosine reads as a machine idling */
  function envelope(t) {
    var s = 0.5 - 0.5 * Math.cos((TAU * t) / p.breath);
    return p.calm + p.swell * Math.pow(s, 1.5);
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    if (!N) return;

    var env = envelope(t);
    var amp = env * p.relief;
    var ton = env * p.tone;
    /* six scalars, and that is the whole of the per-frame trigonometry */
    var c0, s0, c1, s1, c2, s2;
    var w0 = (TAU * RATES[0][2] * t) / p.spin;
    var w1 = (TAU * RATES[1][2] * t) / p.spin;
    var w2 = (TAU * RATES[2][2] * t) / p.spin;
    c0 = Math.cos(w0); s0 = Math.sin(w0);
    c1 = Math.cos(w1); s1 = Math.sin(w1);
    c2 = Math.cos(w2); s2 = Math.sin(w2);

    var g0 = grad[0], g1 = grad[1], g2 = grad[2], w = wgt;
    var W0 = RATES[0][3], W1 = RATES[1][3], W2 = RATES[2][3];
    var a0 = cosP[0], b0 = sinP[0], a1 = cosP[1], b1 = sinP[1], a2 = cosP[2], b2 = sinP[2];
    var i, v, q, o4 = 0;

    for (i = 0; i < N; i++, o4 += 4) {
      v = base[i];
      /* cos(p - wt) for the relief, sin(p - wt) for the tone - two readings
         of the same precomputed pair, so the second term costs four multiplies
         rather than a second field.

         Why both are needed. The relief term is the height field's gradient
         projected on the light, which is what carves ridges - but a gradient
         dotted with a direction vanishes wherever it runs ACROSS the light, so
         on its own the swirl shows on one side of the ball and disappears on
         the other. The tone term is the height itself, which shows everywhere.
         Ridges come from the first, the pattern from the second. */
      v += amp * (g0[i] * (a0[i] * c0 + b0[i] * s0)
                + g1[i] * (a1[i] * c1 + b1[i] * s1)
                + g2[i] * (a2[i] * c2 + b2[i] * s2))
         + ton * w[i] * (W0 * (b0[i] * c0 - a0[i] * s0)
                       + W1 * (b1[i] * c1 - a1[i] * s1)
                       + W2 * (b2[i] * c2 - a2[i] * s2));
      q = v < 0 ? 0 : v > 1 ? 255 : (v * 255) | 0;
      q *= 3;
      px[o4] = ramp[q];
      px[o4 + 1] = ramp[q + 1];
      px[o4 + 2] = ramp[q + 2];
      px[o4 + 3] = 255;
    }
    bctx.putImageData(img, 0, 0);

    if (o.glow) halo(amp);

    /* Clip to a real arc rather than relying on the buffer's own alpha edge.
       The buffer is upscaled - a sphere's shading survives that, a silhouette
       does not, and a soft-edged ball on a dark stage reads as out of focus. */
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, TAU);
    ctx.clip();
    /* The defocus. Drawn OVERSIZE by the blur radius, so the clip is always
       cut from covered pixels - a blur draws its own soft edge inward, and
       without the overscan the ball would arrive with a grey halo inside its
       own outline. ctx.filter is skipped where it is not supported rather
       than faked: the ball is simply sharper there. */
    var bl = o.blur * (rad / 160);
    var over = 0;
    if (bl > 0.3 && supportsFilter) {
      ctx.filter = "blur(" + bl.toFixed(2) + "px)";
      over = bl * 2.5;
    }
    ctx.drawImage(buf, cx - rad - over, cy - rad - over, (rad + over) * 2, (rad + over) * 2);
    ctx.filter = "none";
    ctx.restore();

    if (o.edge > 0) edge();
  }

  /* The edge. Glass is brightest where you look through the most of it, and a
     thin bright ring at the circumference is the single strongest tell that a
     thing is glass rather than plastic - it survives being shrunk to a
     favicon, which none of the interior shading does. Two arcs: a cool one on
     the lit side, and a second, fainter one opposite, which is the light that
     went all the way through. */
  function edge() {
    var c = PALETTE[o.accent];
    var la = (o.light * Math.PI) / 180;
    var ex = Math.cos(la), ey = -Math.sin(la);
    var g = ctx.createLinearGradient(cx - ex * rad, cy - ey * rad, cx + ex * rad, cy + ey * rad);
    g.addColorStop(0, "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (0.5 * o.edge).toFixed(3) + ")");
    g.addColorStop(0.42, "rgba(255,255,255," + (0.12 * o.edge).toFixed(3) + ")");
    g.addColorStop(1, "rgba(255,255,255," + (0.92 * o.edge).toFixed(3) + ")");
    ctx.save();
    ctx.lineWidth = Math.max(1, rad * 0.022);
    ctx.strokeStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, rad - ctx.lineWidth / 2, 0, TAU);
    ctx.stroke();
    ctx.restore();
  }

  /* The halo. It brightens with the swell, because the point of the whole
     component is that you can tell across a room whether it is working. */
  function halo(amp) {
    var c = PALETTE[o.accent];
    var r = rad * (1.5 + 0.28 * amp);
    var g = ctx.createRadialGradient(cx, cy, rad * 0.75, cx, cy, r);
    g.addColorStop(0, "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (0.13 + 0.16 * amp).toFixed(3) + ")");
    g.addColorStop(0.45, "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (0.04 + 0.07 * amp).toFixed(3) + ")");
    g.addColorStop(1, "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, TAU);
    ctx.fill();
  }

  function frame(now) {
    if (!playing) return;
    raf = requestAnimationFrame(frame);
    if (!last) last = now;
    /* clamp the step: a tab backgrounded for a minute carries on from where it
       was rather than teleporting */
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

  /* Reduced motion is the ball at rest, not an empty box - it is the content.
     Drawn at a quarter of a breath, which is off both the floor and the peak,
     so the still frame shows what the swirl actually looks like. */
  function still() {
    stop();
    layout();
    draw(0.25 * p.breath);
    lit = true;
    node.classList.add("is-lit");
  }

  function on(t, ev, fn, opt) { t.addEventListener(ev, fn, opt); listeners.push([t, ev, fn, opt]); }

  function resize() {
    layout();
    if (!playing) draw(reduced() ? 0.25 * p.breath : clock);
  }

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
    seek: function (ms) { clock = ms; draw(clock); return api; },
    /* The cheap path, and the one this component exists for: a state is five
       scalars, so it rebuilds nothing, allocates nothing and does not restart
       the clock. An assistant can change it on every token if it wants. */
    setState: function (name) {
      if (name && name !== "custom" && !STATES[name]) {
        throw new Error('setState: unknown state "' + name + '"');
      }
      o.state = name;
      explicit.state = 1;
      applyState();
      if (!playing) draw(clock);
      return api;
    },
    states: function () { return Object.keys(STATES); },
    update: function (next) {
      var wasPaused = o.paused;
      var before = o.arms + "|" + o.swirl + "|" + o.light + "|" + o.seed + "|" + o.accent;
      noteExplicit(next);
      Object.assign(o, next || {});
      applyState();
      validate();
      /* only these five touch the per-pixel arrays; everything else is a scalar */
      if (before !== o.arms + "|" + o.swirl + "|" + o.light + "|" + o.seed + "|" + o.accent) built = 0;
      vars();
      layout();
      if (reduced()) { still(); return api; }
      if (o.paused) { stop(); draw(clock); }
      else if (wasPaused || (!playing && onScreen && o.autoplay)) play();
      else draw(clock);
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
      node.classList.remove("mlab", "mlab-sm", "is-lit");
      ["--mlab-h", "--mlab-bg"].forEach(function (v) { node.style.removeProperty(v); });
      node.innerHTML = "";
      kept.forEach(function (n) { node.appendChild(n); });
      delete node.__mlAgenticBall;
      delete node.__ml;
    }
  };
  node.__mlAgenticBall = api;
  /* the handle both hosts look for - never the per-entry name */
  node.__ml = api;
  return api;
}

export function mountAll(root) {
  return [].slice.call((root || document).querySelectorAll('[data-ml="agentic-ball"]'))
    .map(function (n) { return initAgenticBall(n); });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { mountAll(); });
  else mountAll();
}
