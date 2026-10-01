/* Continia Motion Library — Center Flow
   ----------------------------------------------------------------------
   A lit tile in the middle of a dark stage with eight smaller ones around it,
   and a pulse of light leaving the centre along every spoke in turn. Each
   pulse lands on its node, the node answers with a short flash, and the
   spoke goes quiet again. It never resolves: it is the picture of a hub that
   is working, not of a job that finishes.

   WHY IT IS ONE CANVAS AND NOT EIGHT DIVS AND AN SVG.
   The obvious build is DOM tiles plus an SVG of paths with animated dashes.
   It gives you three coordinate systems to keep in step - the tiles' layout
   boxes, the SVG viewBox and the stage - and every resize has to reconcile
   them. Worse, a dash offset is the wrong tool for a comet: it draws a
   uniform segment, so the head cannot be brighter than the tail without a
   gradient per path per frame. Here the whole picture is one canvas: tiles,
   spokes, pulses and glyph all come from the same clock and the same
   geometry, and a resize is a recompute rather than a reconciliation.

   HOW THE SPOKES ARE LAID OUT.
   The nodes sit on an ELLIPSE, not a circle, because a stage is wider than
   it is tall and a circle of nodes on it leaves two empty gutters. The
   spokes then cannot be straight lines from the centre: a straight line to
   an ellipse point enters the node at an angle that has nothing to do with
   the node's own position, so the eight of them read as a star rather than
   as a system. Each spoke is a quadratic curve whose control point is pushed
   perpendicular to the chord, all with the same rotational sense, which is
   what gives the fan its slight turn.

   HOW A FRAME IS DRAWN.
   Same contract as the rest of the hub's canvas entries: everything is
   placed from the clock each frame and the canvas is cleared, so a frame is
   a pure function of time - framerate-independent, resize-safe, seekable,
   and a pause lands on a correct picture rather than a half-built smear.

   Markup: nothing required. Children, if there are any, are kept and laid
   out as a caption UNDER the diagram rather than over it - the centre tile
   is the subject here, so copy centred on the stage would cover the one
   thing the entry is for.

     <div data-ml="center-flow"></div>
*/

import { prefersReducedMotion } from "../../tokens/motion-tokens.js";

export const DEFAULTS = {
  height: 420,          /* px of stage. Both hosts clamp this to the card, so
                           it only bites when the entry is used on its own. */
  nodes: 8,             /* the satellites. Six reads as a diagram, twelve as a
                           dial; eight is the reference's count and the one
                           that still has room for a flash on each. */
  spread: 0.84,         /* the node ring's width as a fraction of the stage */
  ratio: 0.52,          /* the ring's height as a fraction of its width. 1 is
                           a circle, which leaves a gutter at each side of a
                           wide stage; near 0 collapses the fan to a line. */
  centreSize: 86,       /* px, the hub tile */
  nodeSize: 34,         /* px, a satellite tile */
  radius: 0.175,        /* corner radius as a fraction of a tile's size, so
                           the hub lands on the hub's own 15px tile radius and
                           the satellites stay in proportion rather than
                           turning into circles */
  bow: 0.11,            /* how far a spoke bows off its chord, as a fraction
                           of the chord's length. 0 is a star of straight
                           lines; past about 0.3 the spokes cross each other. */
  cycle: 2600,          /* ms for one pulse: leave, travel, land, and the gap
                           before the next. A loop length, so it is an option
                           rather than a token. */
  travel: 0.62,         /* how much of the cycle the pulse is in flight for.
                           The rest is the gap - without one the spokes are a
                           permanent chain of lights and nothing reads as
                           leaving. */
  tail: 0.34,           /* the comet's length as a fraction of the spoke */
  stagger: 1,           /* how far the pulses are spread around the fan, in
                           whole cycles. 1 fires them one after another all
                           the way round; 0 fires all eight together. */
  pulseWidth: 2.2,      /* px, the pulse's core at its head */
  lineWidth: 1,         /* px, the resting spoke */
  flash: 0.55,          /* how hard a node answers when a pulse lands, 0-1 */
  icon: "hourglass",    /* the glyph in the hub tile - see GLYPHS */
  drain: true,          /* the hourglass runs: sand falls, and the glass turns
                           over when it is empty. A still glyph in the middle
                           of eight moving spokes reads as a dead pixel. */
  glassCycle: 7800,     /* ms for the glass to empty and turn over once.
                           Deliberately not a multiple of `cycle`: when the
                           two line up, the flip always lands on the same
                           spoke and the whole picture gets a beat. */
  breathe: 5200,        /* ms for the hub's halo to swell and settle once */
  glow: true,           /* the halo behind the hub tile */
  grid: true,           /* the faint dot field behind everything */
  gridGap: 22,          /* px between grid dots */
  accent: "mixed",      /* palette only - see PALETTE */
  background: "",       /* empty keeps the stylesheet's dark stage */
  seed: 5,
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
/* The hub and the pulses are always Innovation Blue: this is a lit object on
   a dark ground, and Tech Blue at a 2px line width is not visible there - the
   same finding Vortex's field and Globe's land produced. `accent` moves the
   SATELLITES, which is where a second hue can do some work without turning
   the picture into a legend. */
var MIX = ["cyan", "green", "cyan", "blue", "cyan", "green", "cyan", "blue"];
var ACCENTS = ["mixed", "blue", "cyan", "green", "purple"];

var NUM = ["height", "nodes", "spread", "ratio", "centreSize", "nodeSize", "radius",
  "bow", "cycle", "travel", "tail", "stagger", "pulseWidth", "lineWidth", "flash",
  "glassCycle", "breathe", "gridGap", "seed"];
var BOOL = ["drain", "glow", "grid", "autoplay", "paused", "compact"];

var GLYPHS = ["hourglass", "layers", "ring", "none"];
var TAU = Math.PI * 2;

/* ---- helpers ---- */

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

function toward(c, white) {
  return [
    Math.round(c[0] + (255 - c[0]) * white),
    Math.round(c[1] + (255 - c[1]) * white),
    Math.round(c[2] + (255 - c[2]) * white)
  ];
}
function rgba(c, a) { return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a.toFixed(3) + ")"; }

/* A rounded rectangle, written out rather than reached for: roundRect() is
   recent enough that a browser without it would silently draw nothing, and a
   diagram made of invisible tiles is a bug nobody can see the cause of. */
function tile(ctx, x, y, w, h, r) {
  var k = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + k, y);
  ctx.lineTo(x + w - k, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + k);
  ctx.lineTo(x + w, y + h - k);
  ctx.quadraticCurveTo(x + w, y + h, x + w - k, y + h);
  ctx.lineTo(x + k, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - k);
  ctx.lineTo(x, y + k);
  ctx.quadraticCurveTo(x, y, x + k, y);
  ctx.closePath();
}

/* a point on a quadratic Bezier, and the only curve maths in the file */
function bez(p0, p1, p2, t, out) {
  var u = 1 - t, a = u * u, b = 2 * u * t, c = t * t;
  out[0] = a * p0[0] + b * p1[0] + c * p2[0];
  out[1] = a * p0[1] + b * p1[1] + c * p2[1];
  return out;
}

export function initCenterFlow(el, options) {
  var node = typeof el === "string" ? document.querySelector(el) : el;
  if (!node || node.nodeType !== 1) throw new Error("initCenterFlow: no element");
  if (node.__ml) return node.__ml;

  var o = {}, k;
  for (k in DEFAULTS) o[k] = DEFAULTS[k];
  Object.assign(o, fromData(node), options || {});
  validate();

  function validate() {
    if (ACCENTS.indexOf(o.accent) < 0) throw new Error('initCenterFlow: unknown accent "' + o.accent + '"');
    if (GLYPHS.indexOf(o.icon) < 0) throw new Error('initCenterFlow: unknown icon "' + o.icon + '"');
    if (!(o.nodes >= 3)) throw new Error("initCenterFlow: nodes must be at least 3");
    if (!(o.cycle > 0)) throw new Error("initCenterFlow: cycle must be positive");
    if (!(o.travel > 0 && o.travel <= 1)) throw new Error("initCenterFlow: travel must be between 0 and 1");
    if (!(o.ratio > 0 && o.ratio <= 1)) throw new Error("initCenterFlow: ratio must be between 0 and 1");
  }

  /* ---- DOM. The children are kept and laid out as a caption UNDER the
     diagram - the hub tile is the subject, and copy centred on the stage
     would cover it. They are moved back on destroy. ---- */
  var kept = [].slice.call(node.childNodes);
  var canvas = document.createElement("canvas");
  canvas.className = "mlcf-canvas";
  canvas.setAttribute("aria-hidden", "true");
  var content = document.createElement("div");
  content.className = "mlcf-content";
  kept.forEach(function (n) { content.appendChild(n); });
  node.classList.add("mlcf");
  node.appendChild(canvas);
  node.appendChild(content);

  var ctx = canvas.getContext("2d");
  var W = 0, H = 0, cx = 0, cy = 0, S = 1, dpr = 1;
  var clock = 0, last = 0, raf = 0, playing = false, lit = false, onScreen = true;
  var listeners = [], io = null, ro = null;

  var spokes = [];      /* one per node: its three control points and its node */
  var hubRGB = [143, 248, 255], glyphRGB = [143, 248, 255];
  var p = [0, 0], q = [0, 0];

  function vars() {
    node.style.setProperty("--mlcf-h", o.height + "px");
    if (o.background) node.style.setProperty("--mlcf-bg", o.background);
    else node.style.removeProperty("--mlcf-bg");
    node.classList.toggle("mlcf-sm", !!o.compact);
  }

  /* ---- the fan. Seeded and built once per layout: the node colours and the
     dot grid's jitter must not re-roll between frames or between hosts. ---- */
  function build() {
    var r = rng(o.seed === undefined ? 5 : o.seed | 0);
    hubRGB = toward(PALETTE.cyan, 0.1);
    glyphRGB = toward(PALETTE.cyan, 0.3);
    var n = Math.max(3, Math.round(o.nodes));
    var cols = o.accent === "mixed" ? null : PALETTE[o.accent];
    spokes = [];
    for (var i = 0; i < n; i++) {
      spokes.push({
        a: (i / n) * TAU,
        col: cols || PALETTE[MIX[i % MIX.length]],
        /* each spoke's own place in the queue. `stagger` of 1 walks the fan
           once per cycle; 0 fires the whole fan together. */
        phase: (i / n) * o.stagger
      });
    }
    /* the grid's jitter, so the field does not read as graph paper */
    gridSeed = r() * 10;
  }
  var gridSeed = 0;

  /* The scale. Every px measurement in the options is quoted at the default
     420px stage, and a card is 172px: a 86px hub tile on it would be half the
     picture. S scales the whole diagram off the stage's shorter axis, with a
     floor so the smallest card still has a tile rather than a dot. */
  function layout() {
    var rect = node.getBoundingClientRect();
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = W / 2;
    cy = H / 2;
    S = Math.max(0.42, Math.min(1.35, Math.min(W / 760, H / 420)));

    var rx = (W * o.spread) / 2 - (o.nodeSize * S) / 2 - 4;
    var ry = rx * o.ratio;
    /* the ring has to fit the stage's height as well as its width - on a card
       the ellipse would otherwise run its top and bottom nodes off the edge */
    var maxRy = H / 2 - (o.nodeSize * S) / 2 - 6;
    if (ry > maxRy) { ry = maxRy; }
    for (var i = 0; i < spokes.length; i++) {
      var sp = spokes[i];
      var nx = cx + rx * Math.cos(sp.a), ny = cy + ry * Math.sin(sp.a);
      var dx = nx - cx, dy = ny - cy, L = Math.hypot(dx, dy) || 1;
      var ux = dx / L, uy = dy / L;
      /* leave the hub at its own edge and stop at the node's, so no spoke is
         ever drawn under a tile it is supposed to be touching */
      var x0 = cx + ux * (o.centreSize * S * 0.56);
      var y0 = cy + uy * (o.centreSize * S * 0.56);
      var x1 = nx - ux * (o.nodeSize * S * 0.62);
      var y1 = ny - uy * (o.nodeSize * S * 0.62);
      /* the control point, pushed perpendicular to the chord. One sign for
         the whole fan, so the spokes turn together rather than mirroring. */
      var mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
      var cl = Math.hypot(x1 - x0, y1 - y0);
      sp.p0 = [x0, y0];
      sp.p1 = [mx - uy * cl * o.bow, my + ux * cl * o.bow];
      sp.p2 = [x1, y1];
      sp.nx = nx; sp.ny = ny;
      sp.len = cl;
    }
  }

  /* ---- one frame. Painter's order: the field, the halo, the resting spokes,
     the pulses, the nodes they land on, and the hub last, so nothing is ever
     drawn over the thing the eye is meant to start at. ---- */
  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    if (o.grid) field();
    if (o.glow) halo(t);
    rest();
    var f = pulses(t);
    nodes(f);
    hub(t);
  }

  /* The dot field. Not decoration and not a grid for its own sake: a plain
     dark box gives the eye nothing to measure the spokes against, so the fan
     reads as floating. It is dimmed toward the edges so it never competes
     with the diagram. */
  function field() {
    var g = Math.max(10, o.gridGap * S);
    var rad = Math.min(W, H) * 0.62;
    ctx.fillStyle = "rgba(143,248,255,0.5)";
    ctx.beginPath();
    for (var y = (H % g) / 2; y < H; y += g) {
      for (var x = (W % g) / 2; x < W; x += g) {
        var d = Math.hypot(x - cx, y - cy) / rad;
        if (d > 1.25) continue;
        var a = 0.1 * (1 - Math.min(1, d));
        if (a < 0.012) continue;
        /* one path, one fill: a fillStyle per dot would spend the whole frame
           on state changes for a field nobody is meant to look at */
        var s = 1 + a * 4;
        ctx.rect(x - s / 2, y - s / 2, s, s);
      }
    }
    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  /* The hub's halo, breathing. It is drawn BEFORE the spokes so it reads as
     light coming off the tile rather than as a wash over the diagram. */
  function halo(t) {
    var b = 0.5 + 0.5 * Math.sin((t / o.breathe) * TAU);
    var r = o.centreSize * S * (1.55 + 0.22 * b);
    var g = ctx.createRadialGradient(cx, cy, o.centreSize * S * 0.3, cx, cy, r);
    g.addColorStop(0, rgba(hubRGB, 0.26 + 0.1 * b));
    g.addColorStop(0.45, rgba(hubRGB, 0.08 + 0.04 * b));
    g.addColorStop(1, rgba(hubRGB, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, TAU);
    ctx.fill();
  }

  /* the spokes at rest: one dim stroke each, so the system is legible in the
     gap between pulses rather than only while something is travelling */
  function rest() {
    ctx.lineCap = "round";
    ctx.lineWidth = Math.max(0.6, o.lineWidth * S);
    for (var i = 0; i < spokes.length; i++) {
      var sp = spokes[i];
      ctx.strokeStyle = rgba(sp.col, 0.22);
      ctx.beginPath();
      ctx.moveTo(sp.p0[0], sp.p0[1]);
      ctx.quadraticCurveTo(sp.p1[0], sp.p1[1], sp.p2[0], sp.p2[1]);
      ctx.stroke();
    }
  }

  /* The pulses. A comet per spoke, drawn as a run of short segments whose
     alpha and width ramp to the head - a single stroke at one alpha is a
     wire, and a wire does not read as something leaving. Returns each node's
     flash, so the nodes do not have to work the timing out a second time and
     the two can never disagree about when a pulse landed. */
  var SEG = 22;
  function pulses(t) {
    var flash = [];
    ctx.lineCap = "round";
    for (var i = 0; i < spokes.length; i++) {
      var sp = spokes[i];
      var prog = ((t / o.cycle) - sp.phase) % 1;
      if (prog < 0) prog += 1;
      flash[i] = 0;
      /* the head runs past 1 by the tail's length, so the comet is swallowed
         by the node rather than switched off on top of it */
      var head = (prog / o.travel) * (1 + o.tail);
      if (prog <= o.travel) {
        var tail = Math.max(0, head - o.tail);
        var h = Math.min(1, head);
        if (h > tail) comet(sp, tail, h);
      }
      /* the flash starts when the HEAD lands, which is before the cycle's
         flight window ends - the tail is still arriving */
      var landed = (prog / o.travel) * (1 + o.tail) - 1;
      if (landed > 0 && landed < 0.9) flash[i] = (1 - landed / 0.9) * o.flash;
    }
    return flash;
  }

  function comet(sp, from, to) {
    var n = SEG, i, px = 0, py = 0;
    var white = toward(sp.col, 0.55);
    for (i = 0; i <= n; i++) {
      var s = from + (to - from) * (i / n);
      bez(sp.p0, sp.p1, sp.p2, s, p);
      if (i > 0) {
        var f = i / n;
        var a = f * f * 0.95;
        ctx.strokeStyle = rgba(white, a);
        ctx.lineWidth = Math.max(0.6, o.pulseWidth * S * (0.35 + 0.65 * f));
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p[0], p[1]);
        ctx.stroke();
      }
      px = p[0]; py = p[1];
    }
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.arc(px, py, Math.max(0.8, o.pulseWidth * S * 0.8), 0, TAU);
    ctx.fill();
  }

  function nodes(flash) {
    var sz = o.nodeSize * S;
    for (var i = 0; i < spokes.length; i++) {
      var sp = spokes[i], f = flash[i] || 0;
      var x = sp.nx - sz / 2, y = sp.ny - sz / 2;
      tile(ctx, x, y, sz, sz, sz * o.radius);
      ctx.fillStyle = "rgba(8,16,33,0.92)";
      ctx.fill();
      ctx.lineWidth = Math.max(0.6, S);
      ctx.strokeStyle = rgba(sp.col, 0.3 + 0.6 * f);
      ctx.stroke();
      /* the dot in the middle is the node's only content: a label here would
         need a font, a width and a side to sit on, and at a card's size there
         is room for none of the three */
      ctx.fillStyle = rgba(toward(sp.col, 0.2 + 0.6 * f), 0.55 + 0.45 * f);
      ctx.beginPath();
      ctx.arc(sp.nx, sp.ny, Math.max(1, sz * (0.1 + 0.03 * f)), 0, TAU);
      ctx.fill();
      if (f > 0.01) {
        /* the answer: a ring that opens and fades. It is the only thing in
           the picture that says the pulse ARRIVED rather than just stopped. */
        var k = 1 - f / o.flash;
        ctx.strokeStyle = rgba(sp.col, (1 - k) * 0.5);
        ctx.lineWidth = Math.max(0.6, S * 1.2);
        tile(ctx, sp.nx - sz / 2 - k * sz * 0.5, sp.ny - sz / 2 - k * sz * 0.5,
          sz + k * sz, sz + k * sz, (sz + k * sz) * o.radius);
        ctx.stroke();
      }
    }
  }

  /* The hub: the tile, its edge, and whatever glyph it carries. Drawn last
     and over its own halo, so the glyph is always the brightest thing here. */
  function hub(t) {
    var sz = o.centreSize * S;
    var x = cx - sz / 2, y = cy - sz / 2;
    tile(ctx, x, y, sz, sz, sz * o.radius);
    var g = ctx.createLinearGradient(x, y, x + sz, y + sz);
    g.addColorStop(0, "rgba(13,27,54,0.98)");
    g.addColorStop(1, "rgba(7,16,35,0.98)");
    ctx.fillStyle = g;
    ctx.fill();
    ctx.lineWidth = Math.max(0.8, S * 1.3);
    ctx.strokeStyle = rgba(hubRGB, 0.72);
    ctx.stroke();
    if (o.icon === "hourglass") hourglass(t, sz);
    else if (o.icon === "layers") layers(sz);
    else if (o.icon === "ring") ringGlyph(t, sz);
  }

  /* THE HOURGLASS, and the reason it is not a static glyph: it is the one
     thing in the middle of eight moving spokes, and a still shape there reads
     as a dead pixel.

     The sand level is not linear in time. A bulb is a cone, so the volume
     left above the neck goes as the CUBE of the height - but the silhouette
     the eye reads is the triangle's area, which goes as the square. Taking
     the square root of the remaining fraction is what makes the surface fall
     fast at the start and crawl at the end, the way a real one does; a linear
     level looks like a loading bar standing on its end. */
  /* The glass is two bulbs with bowed walls meeting at a neck, hung in a
     two-post stand. The obvious version - two caps and an X between them -
     is a bowtie: it reads as an hourglass only while it is upright, and the
     moment the turn starts it is four loose strokes. A closed silhouette
     with a stand reads at every angle, which is the half of the cycle the
     first version got wrong. */
  function glassPath(w, h, nw) {
    ctx.beginPath();
    ctx.moveTo(-w, -h);
    ctx.quadraticCurveTo(-w * 0.60, -h * 0.14, -nw, 0);
    ctx.lineTo(nw, 0);
    ctx.quadraticCurveTo(w * 0.60, -h * 0.14, w, -h);
    ctx.closePath();
    ctx.moveTo(-w, h);
    ctx.quadraticCurveTo(-w * 0.60, h * 0.14, -nw, 0);
    ctx.lineTo(nw, 0);
    ctx.quadraticCurveTo(w * 0.60, h * 0.14, w, h);
    ctx.closePath();
  }

  /* one bulb on its own, used as a clip so the sand can be drawn as a plain
     level or a plain heap and still take the shape of the glass holding it */
  function bulbPath(w, h, nw, sign) {
    ctx.beginPath();
    ctx.moveTo(-w, sign * h);
    ctx.quadraticCurveTo(-w * 0.60, sign * h * 0.14, -nw, 0);
    ctx.lineTo(nw, 0);
    ctx.quadraticCurveTo(w * 0.60, sign * h * 0.14, w, sign * h);
    ctx.closePath();
  }

  function hourglass(t, sz) {
    var g = sz * 0.46, h = g / 2, w = g * 0.37, nw = w * 0.10;
    var d = 0, turn = 0;
    if (o.drain) {
      var c = ((t / o.glassCycle) % 1 + 1) % 1;
      var DR = 0.84;                  /* drain, then turn over */
      if (c <= DR) d = c / DR;
      else { d = 1; turn = (c - DR) / (1 - DR); }
    }
    ctx.save();
    ctx.translate(cx, cy);
    /* the flip is eased at both ends: a glass that starts and stops its turn
       at full speed reads as a sprite being rotated, not as a hand doing it */
    if (turn > 0) ctx.rotate(Math.PI * (turn < 0.5 ? 2 * turn * turn : 1 - 2 * (1 - turn) * (1 - turn)));

    var sand = rgba(toward(PALETTE.cyan, 0.22), 0.92);
    /* the level in the top bulb falls as the square root of what is left:
       a bulb is widest at the cap, so the surface drops slowly and then
       quickly, which is the thing that makes a real glass look impatient */
    var up = Math.sqrt(Math.max(0, 1 - d));
    if (up > 0.01) {
      ctx.save();
      bulbPath(w, h, nw, -1); ctx.clip();
      ctx.fillStyle = sand;
      ctx.fillRect(-w, -h * up, w * 2, h * up);
      ctx.restore();
    }
    /* and the heap below, which rises as a mound rather than as a level:
       sand lands in a cone, it does not fill a glass the way water does */
    if (d > 0.01) {
      var dn = Math.sqrt(d), lv = h * 1.02 * dn;
      ctx.save();
      bulbPath(w, h, nw, 1); ctx.clip();
      ctx.fillStyle = sand;
      ctx.beginPath();
      ctx.moveTo(-w, h);
      ctx.lineTo(w, h);
      ctx.lineTo(w, h - lv * 0.5);
      ctx.lineTo(0, h - lv);
      ctx.lineTo(-w, h - lv * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    /* the stream, only while there is something left to fall */
    if (o.drain && d > 0.02 && d < 0.995 && turn === 0) {
      ctx.strokeStyle = rgba(toward(PALETTE.cyan, 0.5), 0.8);
      ctx.lineWidth = Math.max(0.8, g * 0.04);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, h * 0.92);
      ctx.stroke();
    }
    /* the glass itself, over the sand, then the stand it hangs in */
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = rgba(glyphRGB, 0.95);
    ctx.lineWidth = Math.max(0.9, g * 0.065);
    glassPath(w, h, nw);
    ctx.stroke();
    ctx.strokeStyle = rgba(glyphRGB, 0.82);
    ctx.beginPath();
    ctx.moveTo(-w * 1.22, -h); ctx.lineTo(w * 1.22, -h);
    ctx.moveTo(-w * 1.22, h); ctx.lineTo(w * 1.22, h);
    ctx.moveTo(-w * 1.13, -h); ctx.lineTo(-w * 1.13, h);
    ctx.moveTo(w * 1.13, -h); ctx.lineTo(w * 1.13, h);
    ctx.stroke();
    ctx.restore();
  }

  /* a stack of three plates, the other glyph the reference's tile carries */
  function layers(sz) {
    var g = sz * 0.44, w = g * 0.56, h = g * 0.3;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = rgba(glyphRGB, 0.95);
    ctx.lineWidth = Math.max(0.9, g * 0.07);
    ctx.lineJoin = "round";
    for (var i = -1; i <= 1; i++) {
      var y = i * h * 0.92;
      ctx.beginPath();
      ctx.moveTo(0, y - h / 2);
      ctx.lineTo(w, y);
      ctx.lineTo(0, y + h / 2);
      ctx.lineTo(-w, y);
      ctx.closePath();
      if (i === -1) { ctx.fillStyle = rgba(glyphRGB, 0.3); ctx.fill(); }
      ctx.stroke();
    }
    ctx.restore();
  }

  function ringGlyph(t, sz) {
    var g = sz * 0.4;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = rgba(glyphRGB, 0.95);
    ctx.lineWidth = Math.max(0.9, g * 0.09);
    ctx.beginPath();
    ctx.arc(0, 0, g * 0.46, 0, TAU);
    ctx.stroke();
    ctx.fillStyle = rgba(glyphRGB, 0.95);
    ctx.beginPath();
    ctx.arc(0, 0, g * 0.14, 0, TAU);
    ctx.fill();
    ctx.restore();
  }

  function frame(now) {
    if (!playing) return;
    raf = requestAnimationFrame(frame);
    if (!last) last = now;
    /* clamp the step: a tab that spent a minute in the background carries on
       from where it was rather than teleporting the whole fan */
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

  /* Reduced motion is a photograph, not an empty box: the diagram IS the
     content. The frame is taken at a moment with pulses mid-flight and the
     glass half run, so the still says what the moving version says. */
  function STILL_AT() { return 0.26 * o.cycle + 0.38 * o.glassCycle; }
  function still() {
    stop();
    layout();
    draw(STILL_AT());
    lit = true;
    node.classList.add("is-lit");
  }

  function on(t, ev, fn, opt) { t.addEventListener(ev, fn, opt); listeners.push([t, ev, fn, opt]); }

  function resize() {
    layout();
    if (!playing) draw(reduced() ? STILL_AT() : clock);
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
    /* seek is what makes the picture testable: hand it a time in ms and the
       frame is fully determined by it, with no history to build up first */
    seek: function (ms) { clock = ms; draw(clock); return api; },
    /* where a node sits, in screen px, for a caller who wants to hang a real
       label or a link off one */
    nodeAt: function (i) {
      var sp = spokes[i];
      return sp ? { x: sp.nx, y: sp.ny, size: o.nodeSize * S } : null;
    },
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
      node.classList.remove("mlcf", "mlcf-sm", "is-lit");
      ["--mlcf-h", "--mlcf-bg"].forEach(function (v) { node.style.removeProperty(v); });
      node.innerHTML = "";
      kept.forEach(function (n) { node.appendChild(n); });
      delete node.__mlCenterFlow;
      delete node.__ml;
    }
  };
  node.__mlCenterFlow = api;
  /* the handle both hosts look for - never the per-entry name */
  node.__ml = api;
  return api;
}

/* Auto-init, so a page only needs the markup and this module. */
export function mountAll(root) {
  return [].slice.call((root || document).querySelectorAll('[data-ml="center-flow"]'))
    .map(function (n) { return initCenterFlow(n); });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { mountAll(); });
  else mountAll();
}
