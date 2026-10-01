/* Continia Motion Library — Globe
   ----------------------------------------------------------------------
   A dotted Earth turning on a dark stage, with great-circle arcs flying out
   of one hub to the places it reaches and a soft ring of markers where they
   land. It never resolves: it is a standing state, like Vortex, so it goes
   behind copy rather than beside it as a thing to watch.

   WHY THE COASTLINES ARE POLYGONS AND NOT A DATASET.
   The usual build drops in a world GeoJSON or a 1-bit land raster - a file
   nobody in the repo can read, edit or check, and one that outweighs every
   other entry put together. The land here is ~30 hand-written rings in
   [lon, lat], and a dot is land when it falls inside one of them. Two things
   fall out of that: the shape is *described* rather than pasted, so a coast
   can be nudged by reading the numbers; and an enclosed sea needs no special
   case, because a boundary that runs up one side and back down the other
   leaves the water outside the ring. The Red Sea, the Adriatic, the Gulf and
   Hudson Bay are all notches of exactly that kind. The cost is honest: this
   is a coarse Earth, right at a globe's size and wrong at an atlas's.

   WHY A DOT IS NOT PLACED ON A LAT/LON GRID.
   A grid crowds the poles - the same number of dots per row around a circle
   that shrinks to nothing - so the Arctic turns into a solid cap while the
   tropics stay sparse. The dots are laid on a Fibonacci sphere instead: the
   golden-angle spiral, which is the standard way to get a near-uniform set of
   points on a sphere with no clustering and no seam. Density then reads as
   land area, which is the one thing the picture is for.

   HOW A FRAME IS DRAWN.
   Same contract as the rest of the hub's canvas entries: every dot, arc and
   marker is placed from the clock each frame and the canvas is cleared, so a
   frame is a pure function of time - framerate-independent, resize-safe,
   seekable, and a pause lands on a correct picture rather than a half-built
   smear. The one piece of state is the drag offset, and it is deliberately
   outside that contract (see `drag`).

   Rotation is one yaw about the polar axis followed by a fixed tilt, so a dot
   costs six multiplies a frame; the back hemisphere is culled by the sign of
   the rotated z, which is also the occlusion test the arcs and markers use.
   Dots are bucketed by colour and by a quantised alpha and each bucket is
   filled as one path - about 30 fills a frame instead of 4000.

   Markup: whatever the author wants over the top. The children are kept and
   laid over the canvas, so this is a background with copy on it.

     <div data-ml="globe">
       <h2>Everywhere our partners are</h2>
     </div>
*/

import { prefersReducedMotion } from "../../tokens/motion-tokens.js";

export const DEFAULTS = {
  height: 420,          /* px of stage. Both hosts clamp this to the card, so
                           it only bites when the entry is used on its own. */
  dots: 13000,          /* candidate points on the whole sphere BEFORE the land
                           test. The land rings take 29.5% of them - which is
                           the Earth's own land fraction, and a decent check
                           that the coastlines are not nonsense - and half of
                           those face away, so this is about 1900 dots on
                           screen. Under about 8000 the continents read as a
                           scatter rather than as shapes. */
  size: 1.5,            /* px, a land dot at the centre of the disc */
  fill: 0.82,           /* the globe's diameter as a fraction of the stage's
                           shorter axis */
  centreY: 0.5,         /* where the centre of the globe sits down the stage */
  tilt: 18,             /* degrees the north pole is tipped toward the viewer.
                           0 is the equator dead-on, which reads as a circle
                           with no axis - the tilt is what says "globe". */
  spin: 34000,          /* ms for one full turn. Slow: this is scenery. */
  sea: 0,               /* brightness of the ocean dots, 0-1. 0 draws none at
                           all, which is the reference's look - the sphere is
                           then read from its land, its rim and its arcs. */
  seaDots: 0.45,        /* how many of the ocean's candidates are kept when
                           `sea` is on. A full ocean at land density hides the
                           land; this thins it to a wash. */
  poles: true,          /* draw Antarctica. It is real, and leaving it off
                           makes the south look like a rendering error - but a
                           tilted globe shows it as a bright band at the rim,
                           so it is a switch. */
  light: 0.62,          /* how much of a dot's brightness comes from facing the
                           viewer. 0 is a flat disc of dots, 1 is a sphere so
                           dark at the limb that the silhouette closes early. */
  twinkle: 3400,        /* ms for one dot's brightness cycle */
  shimmer: 0.16,        /* how much of a dot's brightness the twinkle owns.
                           Lower than Vortex's on purpose: this is a surface,
                           not a field of lights, and a surface that sparkles
                           reads as static. */
  arcs: true,           /* the great-circle flights */
  arcCycle: 5200,       /* ms for one arc: climb, flight, arrival, gone */
  arcLift: 0.3,         /* how far an arc bows away from the surface, as a
                           fraction of the leg's own angular length - so a
                           short hop stays low and a long haul climbs. A fixed
                           lift puts a 300km hop on the same arch as a
                           transatlantic one, which is the tell that the curve
                           was drawn rather than flown. */
  arcTail: 0.42,        /* the comet's length, as a fraction of the leg */
  arcWidth: 1.6,        /* px, the arc's core at full brightness */
  markers: true,        /* the pulsing rings at each end of a leg */
  markerSize: 3.2,      /* px, the dot at a marker's centre */
  orbits: 4,            /* thin rings tumbling outside the globe. Not satellite
                           tracks and not pretending to be: they are what keeps
                           the silhouette from being a single hard circle. */
  orbitSpread: 1.14,    /* an orbit's radius as a fraction of the globe's */
  glow: true,           /* the atmosphere: a rim light just outside the disc */
  drag: true,           /* pointer-drag to spin it. See `drag` in meta.json -
                           this is the one piece of state outside the clock. */
  accent: "mixed",      /* palette only - see PALETTE */
  background: "",       /* empty keeps the stylesheet's dark stage */
  seed: 11,             /* the dot lay-out and the orbits are random but fixed */
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
/* Weighted toward cyan, as Vortex is and for the same reason: at 1.5px on
   near-black, unmixed Tech Blue is not visible at all, so the land is
   Innovation Blue with Smart Green and Tech Blue as a minority that gives the
   continents some grain. Three hues read as one surface; four read as a map
   legend. */
var MIX = ["cyan", "cyan", "cyan", "green", "cyan", "blue", "cyan", "green"];
var ACCENTS = ["mixed", "blue", "cyan", "green", "purple"];

var NUM = ["height", "dots", "size", "fill", "centreY", "tilt", "spin", "sea",
  "seaDots", "light", "twinkle", "shimmer", "arcCycle", "arcLift", "arcTail",
  "arcWidth", "markerSize", "orbits", "orbitSpread", "seed"];
var BOOL = ["poles", "arcs", "markers", "glow", "drag", "autoplay", "paused", "compact"];

var STEPS = 12;         /* alpha steps the dots are quantised into before
                           bucketing - twelve is where banding stops showing */
var TAU = Math.PI * 2;
var RAD = Math.PI / 180;

/* ---- The land. Rings of [lon, lat], degrees, each one a closed boundary
   walked in one direction. A ring may run up one shore of an enclosed sea and
   back down the other - the water is then outside the ring and needs no hole
   and no second pass. That is how the Red Sea, the Gulf, the Adriatic, the
   Baltic and Hudson Bay are cut.

   Coarse on purpose. At a 340px globe one degree of longitude at the equator
   is under a pixel, so the job of these numbers is the silhouette: the shape
   of a continent and the gap between two of them. ---- */
var LAND = {
  africa: [[-17, 21], [-16, 15], [-17, 12], [-13, 8], [-8, 4], [-2, 5], [3, 6], [6, 4], [9, 4], [9, 2],
    [10, -1], [12, -5], [12, -13], [15, -27], [18, -34], [20, -35], [25, -34], [28, -32], [32,
    -29], [33, -26], [35, -21], [36, -18], [40, -16], [40, -11], [40, -5], [41, -2], [43, 2], [48,
    5], [51, 11], [48, 12], [44, 11], [43, 13], [41, 15], [39, 17], [37, 19], [35, 23], [34, 27],
    [32, 31], [25, 32], [19, 31], [15, 32], [11, 34], [10, 37], [8, 37], [3, 37], [-1, 36], [-6,
    36], [-9, 33], [-13, 28], [-17, 21]],

  /* One ring for the whole landmass, walked from Gibraltar. Three
     enclosed seas are cut as notches - in along one shore and back out
     along the other: the Baltic (down the Danish east side, round the top
     of Bothnia, back down Sweden), the Gulf, and the Red Sea. */
  eurasia: [[-6, 36], [-9, 37], [-9, 41], [-9, 43], [-4, 44], [-1, 46], [-4, 48], [-1, 49], [2, 51], [4,
    52], [5, 53], [7, 53.5], [8, 54], [8, 55], [8, 57.5], [10.5, 57.5], [11, 56.5], [12.7, 56],
    [12.6, 55.2], [11, 54.3], [14, 54], [19, 54.5], [21, 56], [24, 58], [28, 59.5], [30, 60], [28,
    60.4], [25, 60.1], [23, 59.9], [22, 60.6], [21, 63], [24, 65.8], [22, 66], [21, 64], [18, 62],
    [17, 60], [18.7, 59.5], [17, 58.5], [16, 56.5], [13, 55.4], [12.6, 56.5], [11, 58], [11, 59],
    [8, 58.5], [5, 59], [5, 62], [8, 63], [11, 64], [14, 67], [18, 69], [21, 70], [24, 71], [30,
    70], [33, 70], [40, 66], [44, 68], [50, 69], [60, 70], [69, 73], [74, 73], [80, 74], [90, 76],
    [101, 78], [110, 74], [114, 74], [128, 73], [140, 73], [150, 72], [160, 70], [170, 69], [179,
    66], [179, 62], [172, 61], [163, 58], [160, 55], [157, 51], [156, 51], [155, 56], [151, 59],
    [142, 54], [140, 50], [135, 48], [131, 43], [127, 42], [129, 38], [129, 35], [126, 34], [122,
    31], [121, 28], [117, 24], [110, 21], [108, 17], [109, 11], [105, 9], [103, 10], [100, 13],
    [102, 7], [104, 2], [104.4, 1.2], [103.3, 1.3], [102, 2.5], [100.3, 5], [98.5, 8], [94, 16],
    [90, 22], [87, 21], [81, 16], [80, 10], [77, 8], [73, 15], [70, 21], [67, 24], [61, 25], [57,
    25], [53, 27], [50, 29], [48, 30], [51, 24.5], [54.4, 24.5], [55.6, 25.6], [56.2, 26.2],
    [56.4, 25], [59, 22], [55, 18], [52, 17], [45, 13], [43, 16], [39, 22], [35, 28], [34, 31],
    [36, 36], [36, 37], [31, 37], [27, 37], [26, 40], [28, 40.5], [29, 41.3], [32, 42], [36, 42],
    [41, 42], [39, 44], [37, 46], [34, 45], [31, 46], [29, 45], [28, 43], [28, 41], [25, 40], [23,
    38], [21, 37], [23, 40], [19, 40], [17, 43], [14, 45], [13, 45], [16, 42], [18, 40], [16, 38],
    [12, 42], [10, 44], [8, 44], [3, 43], [0, 40], [-1, 38], [-2, 37], [-6, 36]],

  /* Hudson Bay is the notch here: down its east shore, round James
     Bay, back up the west one. */
  namerica: [[-168, 66], [-166, 60], [-162, 58], [-158, 56], [-152, 59], [-147, 61], [-136, 58], [-131,
    53], [-125, 49], [-124, 43], [-122, 37], [-120, 34.5], [-117, 32.6], [-114, 31], [-110, 24],
    [-106, 23], [-104, 19], [-98, 16], [-94, 18], [-97, 21], [-97, 25], [-94, 29], [-89, 29],
    [-84, 30], [-81, 25], [-81, 31], [-76, 35], [-74, 40], [-70, 43], [-67, 45], [-64, 46], [-60,
    47], [-56, 51], [-64, 53], [-70, 58], [-78, 62], [-78, 56], [-79, 52], [-82, 51], [-85, 55],
    [-88, 58], [-94, 59], [-93, 63], [-87, 66], [-83, 70], [-95, 69], [-105, 69], [-115, 70],
    [-125, 70], [-135, 69], [-145, 70], [-156, 71], [-162, 67], [-168, 66]],

  camerica: [[-92, 19], [-87, 21], [-87, 16], [-83, 15], [-83, 10], [-79, 9], [-77, 8], [-80, 7], [-83, 8],
    [-87, 13], [-92, 15], [-96, 16], [-92, 19]],

  samerica: [[-81, 8], [-77, 8], [-75, 11], [-71, 12], [-63, 11], [-60, 8], [-52, 5], [-50, 0], [-44, -2],
    [-38, -5], [-35, -8], [-39, -13], [-39, -18], [-41, -22], [-48, -25], [-53, -34], [-57, -38],
    [-62, -39], [-65, -45], [-68, -50], [-69, -55], [-74, -52], [-73, -45], [-73, -37], [-71,
    -30], [-70, -23], [-71, -18], [-77, -12], [-81, -6], [-80, -3], [-80, 2], [-78, 6], [-81, 8]],

  australia: [[113, -22], [114, -26], [115, -32], [118, -35], [123, -34], [129, -32], [134, -33], [137,
    -35], [140, -38], [146, -39], [150, -37.5], [151.7, -34], [153.2, -29], [153, -25], [146,
    -19], [142, -11], [136, -12], [130, -12], [127, -14], [122, -17], [117, -21], [113, -22]],

  greenland: [[-45, 60], [-50, 64], [-53, 68], [-55, 71], [-62, 76], [-68, 80], [-55, 83], [-30, 83], [-20,
    76], [-22, 70], [-32, 68], [-38, 65], [-43, 60], [-45, 60]],

  britain: [[-5, 50], [-3, 51], [1, 51], [0, 53], [-1, 54], [-3, 58], [-5, 58], [-5, 56], [-5, 54], [-5,
    50]],

  ireland: [[-10, 52], [-6, 52], [-6, 55], [-8, 55], [-10, 54], [-10, 52]],

  iceland: [[-24, 65], [-22, 63.8], [-18, 63.4], [-14, 64.5], [-15, 66], [-22, 66.4], [-24, 65]],

  madagascar: [[43, -12], [48, -14], [50, -20], [47, -25], [44, -22], [43, -16], [43, -12]],

  japan: [[130, 31], [132, 33], [135, 34], [138, 34.6], [140, 35], [141, 38], [142, 40], [145, 43],
    [141, 45], [140, 41], [137, 37], [134, 35], [131, 34], [130, 31]],

  newzealand: [[172, -34], [178, -38], [174, -41], [170, -44], [167, -46], [170, -43], [172, -34]],

  srilanka: [[80, 6], [82, 7], [81, 9], [80, 9], [80, 6]],

  borneo: [[109, 2], [113, 3], [117, 4], [119, 1], [117, -4], [112, -3], [110, -1], [109, 2]],

  sumatra: [[95, 5], [100, 1], [106, -6], [103, -6], [100, -2], [97, 2], [95, 5]],

  java: [[105, -6], [111, -7], [114, -8], [113, -9], [107, -8], [105, -7], [105, -6]],

  sulawesi: [[119, 1], [125, 1], [124, -2], [122, -5], [120, -4], [120, 0], [119, 1]],

  guinea: [[131, -1], [137, -2], [141, -3], [147, -6], [150, -9], [146, -8], [141, -9], [137, -8], [133,
    -5], [131, -1]],

  philippines: [[120, 13], [122, 18], [124, 18], [126, 9], [126, 6], [123, 8], [121, 11], [120, 13]],

  cuba: [[-85, 22], [-80, 23], [-75, 20], [-78, 21], [-82, 22], [-85, 22]],

  hispaniola: [[-74, 18], [-69, 19], [-68, 18], [-72, 17], [-74, 18]],

  antarctica: [[-180, -72], [-150, -75], [-120, -74], [-90, -72], [-60, -63], [-45, -70], [-20, -71], [10,
    -70], [40, -68], [75, -67], [110, -66], [145, -67], [165, -78], [180, -85], [-180, -85],
    [-180, -72]],

  svalbard: [[11, 77], [22, 78], [20, 80], [12, 80], [11, 77]],

  tasmania: [[145, -41], [148, -41], [147, -43], [145, -43], [145, -41]],

  newfoundland: [[-59, 47], [-53, 47], [-55, 52], [-58, 51], [-59, 47]],

  baffin: [[-85, 67], [-73, 67], [-62, 70], [-68, 75], [-80, 73], [-85, 67]]
};

/* The default legs. One hub and the cities it reaches - a shape, not a claim:
   nothing on the page says these are offices, and `points` replaces them
   wholesale. Latitudes and longitudes are the cities' own, so the arcs land
   where the dots are rather than near them.
   Spread deliberately. Every leg starts at the hub, so a list with nine
   European cities in it lands nine markers inside about eight pixels and the
   hub becomes one white blob - which is what the first version did. Five in
   Europe and nine elsewhere is the same idea with the picture left legible. */
export const DEFAULT_HUB = { name: "Copenhagen", lat: 55.7, lon: 12.6 };
export const DEFAULT_POINTS = [
  { name: "London", lat: 51.5, lon: -0.1 },
  { name: "Munich", lat: 48.1, lon: 11.6 },
  { name: "Madrid", lat: 40.4, lon: -3.7 },
  { name: "Warsaw", lat: 52.2, lon: 21.0 },
  { name: "Oslo", lat: 59.9, lon: 10.7 },
  { name: "New York", lat: 40.7, lon: -74.0 },
  { name: "Toronto", lat: 43.7, lon: -79.4 },
  { name: "Sao Paulo", lat: -23.5, lon: -46.6 },
  { name: "Dubai", lat: 25.2, lon: 55.3 },
  { name: "Mumbai", lat: 19.1, lon: 72.9 },
  { name: "Singapore", lat: 1.4, lon: 103.8 },
  { name: "Tokyo", lat: 35.7, lon: 139.7 },
  { name: "Sydney", lat: -33.9, lon: 151.2 },
  { name: "Johannesburg", lat: -26.2, lon: 28.0 }
];

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

/* mulberry32 - small, fast, and the same sequence everywhere, which is the
   point: the continents must not rearrange themselves between the two hosts,
   between resizes, or between one frame and the next. */
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

/* Ray casting, the ordinary way, on the plain lon/lat plane. Two notes.
   A ring that straddles the antimeridian would be tested across the whole
   width of the map, so no ring here crosses it - Chukotka and the Aleutians
   stop at 179, and the southern band is clipped rather than wrapped.
   And the test is a half-open one on latitude, so a point sitting exactly on
   a shared edge is counted once rather than twice. */
function inRing(lon, lat, ring) {
  var inside = false, n = ring.length, i, j, xi, yi, xj, yj;
  for (i = 0, j = n - 1; i < n; j = i++) {
    xi = ring[i][0]; yi = ring[i][1];
    xj = ring[j][0]; yj = ring[j][1];
    if ((yi > lat) !== (yj > lat) &&
      lon < (xj - xi) * (lat - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export function isLand(lon, lat, poles) {
  for (var k in LAND) {
    if (k === "antarctica" && !poles) continue;
    if (inRing(lon, lat, LAND[k])) return true;
  }
  return false;
}

function toVec(lat, lon) {
  var p = lat * RAD, l = lon * RAD, c = Math.cos(p);
  /* y is the polar axis: the rotation is one yaw about it, so putting north
     on y is what keeps a dot down to six multiplies a frame */
  return [c * Math.sin(l), Math.sin(p), c * Math.cos(l)];
}

/* Slerp, so a leg is a great circle - the shortest path over the surface,
   which is the only curve that looks like a flight. Lerping the two vectors
   and normalising gives the same path but bunched toward the ends, and the
   comet then visibly slows down at both airports. */
function slerp(a, b, t, out) {
  var d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  if (d > 1) d = 1; else if (d < -1) d = -1;
  var w = Math.acos(d), s = Math.sin(w);
  var k0, k1;
  if (s < 1e-6) { k0 = 1 - t; k1 = t; }
  else { k0 = Math.sin((1 - t) * w) / s; k1 = Math.sin(t * w) / s; }
  out[0] = a[0] * k0 + b[0] * k1;
  out[1] = a[1] * k0 + b[1] * k1;
  out[2] = a[2] * k0 + b[2] * k1;
  return w;
}

export function initGlobe(el, options) {
  var node = typeof el === "string" ? document.querySelector(el) : el;
  if (!node || node.nodeType !== 1) throw new Error("initGlobe: no element");
  if (node.__ml) return node.__ml;

  var o = {}, k;
  for (k in DEFAULTS) o[k] = DEFAULTS[k];
  Object.assign(o, fromData(node), options || {});
  /* not data-settable: both are lists, and a list in an attribute is a parser
     nobody asked for. They come in through the options object. */
  var hub = (options && options.hub) || DEFAULT_HUB;
  var points = (options && options.points) || DEFAULT_POINTS;
  validate();

  function validate() {
    if (ACCENTS.indexOf(o.accent) < 0) throw new Error('initGlobe: unknown accent "' + o.accent + '"');
    if (!(o.dots >= 200)) throw new Error("initGlobe: dots must be at least 200");
    if (!(o.spin > 0)) throw new Error("initGlobe: spin must be positive");
    if (!(o.arcCycle > 0)) throw new Error("initGlobe: arcCycle must be positive");
    if (!(o.fill > 0 && o.fill <= 1.4)) throw new Error("initGlobe: fill must be between 0 and 1.4");
    if (!points || !points.length) throw new Error("initGlobe: points is empty");
  }

  /* ---- DOM. The caller's children are moved into a layer over the canvas and
     moved back on destroy, so this module never owns the copy. ---- */
  var kept = [].slice.call(node.childNodes);
  var canvas = document.createElement("canvas");
  canvas.className = "mlgb-canvas";
  canvas.setAttribute("aria-hidden", "true");
  var content = document.createElement("div");
  content.className = "mlgb-content";
  kept.forEach(function (n) { content.appendChild(n); });
  node.classList.add("mlgb");
  node.appendChild(canvas);
  node.appendChild(content);

  var ctx = canvas.getContext("2d");
  var W = 0, H = 0, R = 0, U = 1, cx = 0, cy = 0, dpr = 1;
  var clock = 0, last = 0, raf = 0, playing = false, lit = false, onScreen = true;
  var listeners = [], io = null, ro = null;

  /* the surface, flat typed arrays: one dot is five numbers and there are a
     few thousand of them, read every frame */
  var dx, dy, dz, dPh, dCol, dotBr, nDots = 0;
  var legs = [], marks = [], orbits = [];
  var buckets = [], bucketFill = [], nCols = 0;
  var arcRGB = [143, 248, 255], markRGB = [143, 248, 255];

  /* drag state. Deliberately the only thing outside "a frame is a function of
     the clock": a drag is the visitor's, and resetting it every frame would
     make the globe fight the hand on it. `vel` carries the throw. */
  var dragging = false, dragId = -1, dragX = 0, yawOff = 0, vel = 0;

  var scratch = [0, 0, 0];

  function ground() {
    var v = getComputedStyle(node).backgroundColor;
    var m = /rgba?\(([^)]+)\)/.exec(v);
    if (!m) return;
    var p = m[1].split(",");
    return "rgb(" + (+p[0]) + "," + (+p[1]) + "," + (+p[2]) + ")";
  }

  function vars() {
    node.style.setProperty("--mlgb-h", o.height + "px");
    if (o.background) node.style.setProperty("--mlgb-bg", o.background);
    else node.style.removeProperty("--mlgb-bg");
    node.classList.toggle("mlgb-sm", !!o.compact);
    node.classList.toggle("mlgb-drag", !!o.drag);
  }

  /* ---- the surface, the legs and the rings. Seeded and built ONCE:
     re-rolling per frame or per resize would have the continents shimmer and
     the two hosts would disagree about the picture. ---- */
  var SAMP = 56;        /* samples along one leg. Below about 40 a long haul
                           reads as a chain of straight chords. */
  var ORBIT_SAMP = 96;

  function build() {
    var r = rng(o.seed === undefined ? 11 : o.seed | 0);
    var cols = o.accent === "mixed" ? ["cyan", "green", "blue"] : [o.accent];
    nCols = cols.length;
    bucketFill = [];
    buckets = [];
    var white = 0.34;   /* the land is mixed toward white for the same reason
                           Vortex's dots are: at 1.5px on near-black, Tech Blue
                           on its own is not visible. */
    for (var c = 0; c < nCols; c++) {
      var rgb = toward(PALETTE[cols[c]], white);
      for (var s = 0; s < STEPS; s++) {
        bucketFill.push("rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," +
          ((s + 1) / STEPS).toFixed(3) + ")");
        buckets.push([]);
      }
    }
    arcRGB = toward(PALETTE[o.accent === "mixed" ? "cyan" : o.accent], 0.45);
    markRGB = toward(PALETTE[o.accent === "mixed" ? "green" : o.accent], 0.35);

    /* The Fibonacci sphere: the golden-angle spiral, which spaces points on a
       sphere about as evenly as a closed form can. A lat/lon grid instead
       would put the same number of dots on a polar row as on the equator, so
       the Arctic would read as a solid cap and the tropics as a sieve. */
    var n = Math.max(200, Math.round(o.dots));
    var GOLD = Math.PI * (3 - Math.sqrt(5));
    var tmpX = [], tmpY = [], tmpZ = [], tmpB = [];
    for (var i = 0; i < n; i++) {
      var y = 1 - 2 * (i + 0.5) / n;
      var rr = Math.sqrt(Math.max(0, 1 - y * y));
      var th = i * GOLD;
      var x = rr * Math.sin(th), z = rr * Math.cos(th);
      var lat = Math.asin(y) / RAD;
      var lon = Math.atan2(x, z) / RAD;
      var land = isLand(lon, lat, o.poles);
      if (land) { tmpX.push(x); tmpY.push(y); tmpZ.push(z); tmpB.push(1); }
      else if (o.sea > 0 && r() < o.seaDots) {
        tmpX.push(x); tmpY.push(y); tmpZ.push(z); tmpB.push(o.sea);
      }
    }
    nDots = tmpX.length;
    dx = new Float32Array(nDots); dy = new Float32Array(nDots);
    dz = new Float32Array(nDots); dPh = new Float32Array(nDots);
    dCol = new Uint8Array(nDots);
    var dBr = new Float32Array(nDots);
    for (i = 0; i < nDots; i++) {
      dx[i] = tmpX[i]; dy[i] = tmpY[i]; dz[i] = tmpZ[i];
      dPh[i] = r() * TAU;
      dBr[i] = tmpB[i];
      var pick = o.accent === "mixed" ? MIX[(r() * MIX.length) | 0] : o.accent;
      dCol[i] = Math.max(0, cols.indexOf(pick));
      /* the ocean wash rides in the brightness, not in a second colour: a
         second hue there reads as a second thing rather than as water */
      dPh[i] = dPh[i] + (dBr[i] < 1 ? 1e4 : 0);
    }
    dotBr = dBr;

    /* the legs */
    legs = [];
    marks = [];
    var hubV = toVec(hub.lat, hub.lon);
    marks.push({ v: hubV, hub: true, phase: 0 });
    for (i = 0; i < points.length; i++) {
      var p = points[i];
      var a = hubV, b = toVec(p.lat, p.lon);
      var pts = new Float32Array(SAMP * 3);
      var w = slerp(a, b, 0.5, scratch);   /* the leg's angular length */
      var lift = o.arcLift * (w / Math.PI);
      for (var sIdx = 0; sIdx < SAMP; sIdx++) {
        var t = sIdx / (SAMP - 1);
        slerp(a, b, t, scratch);
        /* the bow: a sine arch over the great circle, scaled by the leg's own
           length, so a hop stays low and a haul climbs */
        var h = 1 + lift * Math.sin(Math.PI * t);
        pts[sIdx * 3] = scratch[0] * h;
        pts[sIdx * 3 + 1] = scratch[1] * h;
        pts[sIdx * 3 + 2] = scratch[2] * h;
      }
      legs.push({ pts: pts, phase: i / points.length, w: w });
      marks.push({ v: b, hub: false, phase: i / points.length });
    }

    /* the rings. Each has its own axis and its own precession rate, so they
       tumble past one another rather than turning as a cage. */
    orbits = [];
    var count = Math.max(0, Math.round(o.orbits));
    for (i = 0; i < count; i++) {
      orbits.push({
        tiltA: (0.18 + r() * 0.95) * (r() < 0.5 ? 1 : -1),  /* the ring's own lean */
        phase: r() * TAU,
        rate: (0.35 + r() * 0.5) * (r() < 0.5 ? 1 : -1),    /* precession, x spin */
        rad: o.orbitSpread * (0.97 + r() * 0.12),
        alpha: 0.1 + r() * 0.1
      });
    }
  }

  function layout() {
    var rect = node.getBoundingClientRect();
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    /* cap the pixel ratio at 2: a few thousand dots at DPR 3 is three times
       the fill for a difference nobody can see on a 1.5px square */
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = W / 2;
    cy = H * o.centreY;
    /* off the SHORTER axis, and with room left for the rings: a globe sized
       off the width alone is cropped top and bottom on a card */
    R = Math.min(W, H) * 0.5 * o.fill / (o.orbits > 0 ? o.orbitSpread : 1);
    /* Arcs and markers are sized in px, and a px is a different fraction of a
       67px globe on a card than of a 150px one on a hero - at the card's size
       the ten European legs landed as one white knot. They are therefore
       scaled by the globe's own radius, with a floor so the smallest stage
       still has something to see. */
    U = Math.max(0.55, R / 150);
  }

  /* ---- one frame. Painter's order, and it is the whole occlusion model:
     anything with a negative rotated z is behind the ball, so the back halves
     of the rings go down first, the ball's own disc paints over them, and
     everything on the near side goes on top. An arc is tested on its LIFTED
     point rather than on the surface point under it - that is what lets a leg
     climb out from behind the limb halfway along. ---- */
  var yc = 1, ys = 0, tc = 1, ts = 0;

  function spinTo(t) {
    var yaw = (t / o.spin) * TAU + yawOff;
    yc = Math.cos(yaw); ys = Math.sin(yaw);
    var a = o.tilt * RAD;
    tc = Math.cos(a); ts = Math.sin(a);
  }
  /* yaw about the polar axis, then the fixed tilt about x. Six multiplies,
     written out rather than looped: this runs a few thousand times a frame. */
  function rot(x, y, z, out) {
    var x1 = x * yc + z * ys;
    var z1 = -x * ys + z * yc;
    out[0] = x1;
    out[1] = y * tc - z1 * ts;
    out[2] = y * ts + z1 * tc;
    return out;
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    spinTo(t);
    if (o.glow) atmosphere();
    if (orbits.length) rings(t, false);
    body();
    surface(t);
    if (o.arcs) flights(t);
    if (o.markers) pins(t);
    if (orbits.length) rings(t, true);
    if (o.glow) limb();
  }

  /* The haze. It sits OUTSIDE the disc and is drawn before the ball, so it
     reads as air around the planet rather than as a bloom on top of it. */
  function atmosphere() {
    var g = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.5);
    g.addColorStop(0, "rgba(143,248,255,0.16)");
    g.addColorStop(0.45, "rgba(143,248,255,0.05)");
    g.addColorStop(1, "rgba(143,248,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.5, 0, TAU);
    ctx.fill();
  }

  /* The ball itself: a disc barely lighter than the stage, shaded from the
     same direction as the dots. It carries no detail - its one job is to be
     opaque, so that whatever passed behind it is gone. */
  function body() {
    var g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.05, cx, cy, R);
    g.addColorStop(0, "rgba(10,26,54,0.96)");
    g.addColorStop(0.72, "rgba(6,15,33,0.97)");
    g.addColorStop(1, "rgba(4,10,24,0.99)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, TAU);
    ctx.fill();
  }

  /* the thin bright edge, drawn last, which is what makes the silhouette read
     as a sphere rather than as a hole cut in the stage */
  function limb() {
    ctx.save();
    ctx.lineWidth = Math.max(0.7, R * 0.008);
    ctx.strokeStyle = "rgba(143,248,255,0.38)";
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, TAU);
    ctx.stroke();
    ctx.restore();
  }

  function surface(t) {
    var i, b, p = scratch;
    for (i = 0; i < buckets.length; i++) buckets[i].length = 0;
    var tw = (t / o.twinkle) * TAU;
    for (i = 0; i < nDots; i++) {
      rot(dx[i], dy[i], dz[i], p);
      var face = p[2];
      if (face <= 0.01) continue;             /* the far side */
      var x = cx + R * p[0], y = cy - R * p[1];
      /* sqrt rather than a pow: the exponent that looks right is near 0.5 and
         sqrt is an order of magnitude cheaper a few thousand times a frame */
      var a = ((1 - o.light) + o.light * Math.sqrt(face)) * dotBr[i];
      a *= 1 - o.shimmer * (0.5 + 0.5 * Math.sin(tw + dPh[i]));
      if (a <= 0.02) continue;
      if (a > 1) a = 1;
      var step = Math.round(a * STEPS) - 1;
      if (step < 0) step = 0; else if (step >= STEPS) step = STEPS - 1;
      b = buckets[dCol[i] * STEPS + step];
      var w = o.size * (0.55 + 0.45 * face);
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
  }

  /* The flights. A leg's head runs from 0 to 1 + arcTail over the first 62% of
     its cycle and then the leg is gone for the rest of it, so the picture
     breathes instead of being a permanent cage of lines. The tail running past
     1 is what makes a leg get SWALLOWED at the far end rather than switched
     off - the same trick Data Transfer uses at its convergence point. */
  var FLY = 0.62;
  function flights(t) {
    ctx.save();
    ctx.lineCap = "round";
    for (var L = 0; L < legs.length; L++) {
      var leg = legs[L];
      var prog = ((t / o.arcCycle) + leg.phase) % 1;
      if (prog < 0) prog += 1;
      if (prog > FLY) continue;
      var head = (prog / FLY) * (1 + o.arcTail);
      var tail = head - o.arcTail;
      if (tail < 0) tail = 0;
      if (head > 1) head = 1;
      if (head <= tail) continue;
      stroke(leg, tail, head);
    }
    ctx.restore();
  }

  /* One leg, as a run of short segments whose alpha ramps to the head. Drawn
     per segment rather than as one path because the brightness has to vary
     ALONG it - a single stroke with one alpha is a wire, and a wire does not
     read as something travelling. */
  function stroke(leg, from, to) {
    var pts = leg.pts, n = SAMP, p = scratch;
    var i0 = Math.max(0, Math.floor(from * (n - 1)));
    var i1 = Math.min(n - 1, Math.ceil(to * (n - 1)));
    var px = 0, py = 0, pv = false, first = true;
    for (var i = i0; i <= i1; i++) {
      var s = i / (n - 1);
      rot(pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2], p);
      var vis = p[2] > 0;
      var x = cx + R * p[0], y = cy - R * p[1];
      if (!first && vis && pv) {
        var f = (s - from) / (to - from);        /* 0 at the tail, 1 at the head */
        if (f < 0) f = 0; else if (f > 1) f = 1;
        var a = f * f * 0.9;
        ctx.strokeStyle = "rgba(" + arcRGB[0] + "," + arcRGB[1] + "," + arcRGB[2] + "," + a.toFixed(3) + ")";
        ctx.lineWidth = o.arcWidth * U * (0.45 + 0.55 * f);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      px = x; py = y; pv = vis; first = false;
    }
    /* the head itself: a small bright point, so the eye has something to
       follow rather than a line that happens to be growing */
    if (pv) {
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath();
      ctx.arc(px, py, o.arcWidth * U * 0.95, 0, TAU);
      ctx.fill();
    }
  }

  /* The markers. A ring expands and fades once per cycle at each end of a leg,
     timed off that leg's own phase, so the pulse lands when the arc does
     rather than beating against it. */
  function pins(t) {
    var p = scratch;
    for (var i = 0; i < marks.length; i++) {
      var m = marks[i];
      rot(m.v[0], m.v[1], m.v[2], p);
      if (p[2] <= 0.02) continue;
      var x = cx + R * p[0], y = cy - R * p[1];
      var fade = Math.min(1, p[2] * 2.4);        /* ease out at the limb, where
                                                    a full-strength ring would
                                                    sit half off the ball */
      var prog = ((t / o.arcCycle) + m.phase + (m.hub ? 0 : FLY * 0.72)) % 1;
      if (prog < 0) prog += 1;
      var r0 = o.markerSize * U * (m.hub ? 1.25 : 1);
      ctx.fillStyle = "rgba(" + markRGB[0] + "," + markRGB[1] + "," + markRGB[2] + "," +
        (0.85 * fade).toFixed(3) + ")";
      ctx.beginPath();
      ctx.arc(x, y, r0 * 0.5, 0, TAU);
      ctx.fill();
      if (prog < 0.42) {
        var k = prog / 0.42;
        ctx.strokeStyle = "rgba(" + markRGB[0] + "," + markRGB[1] + "," + markRGB[2] + "," +
          ((1 - k) * 0.55 * fade).toFixed(3) + ")";
        ctx.lineWidth = Math.max(0.5, o.markerSize * U * 0.26);
        ctx.beginPath();
        ctx.arc(x, y, r0 * (0.6 + k * 3.1), 0, TAU);
        ctx.stroke();
      }
    }
  }

  /* The rings. Each is a circle in a plane whose normal is itself turning, so
     the set tumbles instead of rotating as one cage. Split at the horizon and
     drawn in two passes - the back one before the ball, the front one after -
     which is the only reason they read as going AROUND the globe. */
  function rings(t, front) {
    var p = scratch;
    ctx.save();
    for (var k = 0; k < orbits.length; k++) {
      var ob = orbits[k];
      /* the axis precesses about the polar axis; a ring rotated about its own
         axis is the same ring, so moving the AXIS is the only thing that
         animates a circle */
      var ang = ob.phase + (t / o.spin) * TAU * ob.rate;
      var ax = Math.sin(ob.tiltA) * Math.cos(ang);
      var ay = Math.cos(ob.tiltA);
      var az = Math.sin(ob.tiltA) * Math.sin(ang);
      /* an orthonormal pair in the ring's plane */
      var ux = -Math.sin(ang), uy = 0, uz = Math.cos(ang);
      var vx = ay * uz - az * uy, vy = az * ux - ax * uz, vz = ax * uy - ay * ux;
      ctx.strokeStyle = "rgba(143,248,255," + (front ? ob.alpha : ob.alpha * 0.45).toFixed(3) + ")";
      ctx.lineWidth = Math.max(0.5, R * 0.004);
      ctx.beginPath();
      var drawing = false;
      for (var i = 0; i <= ORBIT_SAMP; i++) {
        var a = (i / ORBIT_SAMP) * TAU;
        var ca = Math.cos(a) * ob.rad, sa = Math.sin(a) * ob.rad;
        rot(ux * ca + vx * sa, uy * ca + vy * sa, uz * ca + vz * sa, p);
        var vis = front ? p[2] >= 0 : p[2] < 0;
        if (!vis) { drawing = false; continue; }
        var x = cx + R * p[0], y = cy - R * p[1];
        if (!drawing) { ctx.moveTo(x, y); drawing = true; }
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function frame(now) {
    if (!playing) return;
    raf = requestAnimationFrame(frame);
    if (!last) last = now;
    /* clamp the step: a tab that spent a minute in the background must carry
       on from where it was rather than teleporting half a turn */
    var dt = Math.min(64, now - last);
    last = now;
    clock += dt;
    /* the throw, after a drag is let go. It decays into the automatic spin
       rather than stopping dead, because a globe that halts the instant the
       finger leaves it reads as a picture, not as a ball. */
    if (!dragging && (vel > 1e-5 || vel < -1e-5)) {
      yawOff += vel * (dt / 16.7);
      vel *= Math.pow(0.94, dt / 16.7);
    }
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

  /* Reduced motion is a photograph, not an empty box: the globe IS the
     content. One frame, taken off zero - at t=0 every leg is at its own start
     and the Atlantic faces the viewer, which is the one moment the picture
     has neither a visible arc nor a continent in the middle of it. */
  function still() {
    stop();
    layout();
    draw(0.21 * o.arcCycle + 0.08 * o.spin);
    lit = true;
    node.classList.add("is-lit");
  }

  function on(t, ev, fn, opt) { t.addEventListener(ev, fn, opt); listeners.push([t, ev, fn, opt]); }

  function resize() {
    layout();
    if (!playing) draw(reduced() ? 0.21 * o.arcCycle + 0.08 * o.spin : clock);
  }

  /* ---- the drag. The ONE thing here that is not a function of the clock, and
     it has to be: a globe that snapped back to its clock position the frame
     after the finger lifted would fight the hand on it. `yawOff` is carried,
     the automatic spin keeps running underneath it, and the two simply add. */
  function bindDrag() {
    if (!o.drag) return;
    on(canvas, "pointerdown", function (e) {
      dragging = true; dragId = e.pointerId; dragX = e.clientX; vel = 0;
      node.classList.add("is-dragging");
      try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
    });
    on(canvas, "pointermove", function (e) {
      if (!dragging || e.pointerId !== dragId) return;
      /* a full stage width is a bit more than one turn - the rate a globe is
         expected to answer a swipe with */
      var d = ((e.clientX - dragX) / Math.max(1, W)) * TAU * 1.15;
      dragX = e.clientX;
      yawOff += d;
      vel = d;
      if (!playing) draw(clock);
      e.preventDefault();
    });
    function release(e) {
      if (!dragging || (e && e.pointerId !== dragId)) return;
      dragging = false; dragId = -1;
      node.classList.remove("is-dragging");
      /* a drag while the loop is stopped - paused, or reduced motion - still
         has to coast, and there is no loop to coast it, so it just stops */
      if (!playing) vel = 0;
    }
    on(canvas, "pointerup", release);
    on(canvas, "pointercancel", release);
    on(canvas, "lostpointercapture", release);
  }

  build();
  vars();
  layout();
  bindDrag();

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
    /* where a leg lands, in screen px, for a caller that wants to hang a label
       off one. null when that point is on the far side. */
    at: function (lat, lon) {
      var v = toVec(lat, lon), p = [0, 0, 0];
      spinTo(clock);
      rot(v[0], v[1], v[2], p);
      if (p[2] <= 0) return null;
      return { x: cx + R * p[0], y: cy - R * p[1], z: p[2] };
    },
    update: function (next) {
      var wasPaused = o.paused;
      Object.assign(o, next || {});
      if (next && next.hub) hub = next.hub;
      if (next && next.points) points = next.points;
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
      node.classList.remove("mlgb", "mlgb-sm", "mlgb-drag", "is-lit", "is-dragging");
      ["--mlgb-h", "--mlgb-bg"].forEach(function (v) { node.style.removeProperty(v); });
      node.innerHTML = "";
      kept.forEach(function (n) { node.appendChild(n); });
      delete node.__mlGlobe;
      delete node.__ml;
    }
  };
  node.__mlGlobe = api;
  /* the handle both hosts look for - never the per-entry name */
  node.__ml = api;
  return api;
}

/* Auto-init, so a page only needs the markup and this module. */
export function mountAll(root) {
  return [].slice.call((root || document).querySelectorAll('[data-ml="globe"]'))
    .map(function (n) { return initGlobe(n); });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { mountAll(); });
  else mountAll();
}
