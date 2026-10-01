/* Continia Motion Library — Portrait Circles
   ----------------------------------------------------------------------
   Concentric rings of faces turning around a common centre. The ring in the
   middle is sharp and the rings behind it fall away into blur, so the set
   reads as a crowd with depth rather than as a diagram of one.

   WHY THERE IS NO ANIMATION FRAME IN THIS FILE.
   Every other canvas entry in the library drives itself from the clock, and
   has to: it repaints pixels. This one moves elements, and an element that
   only rotates is the one case the browser can hand to the compositor and
   forget about. So the whole picture is CSS: each ring carries one infinite
   linear `rotate` animation, each face carries the same animation reversed so
   it stays upright, and the main thread does nothing at all once the DOM is
   built. The cost of a rAF here would be real - this is a gallery of sixty
   entries, and several of them are already painting canvases while you
   scroll past.

   WHY `rotate` AND NOT `transform: rotate()`.
   A face has to do two rotations at once: a static one that cancels the angle
   of its own slot, and an animated one that cancels its ring's turn. They
   cannot both live in `transform`, because an animation replaces the whole
   property. The individual `rotate` property composes *before* `transform`,
   so the static cancel sits in `transform` and the animated one in `rotate`
   and neither has to know about the other. The alternative is a third div per
   face, which is forty more elements for nothing.

   HOW A RING IS SIZED.
   Radii come off the LONGER axis of the stage, not the shorter one. A ring
   fitted to the height of a wide stage leaves the sides empty and the picture
   reads as a medallion; fitted to the width it runs off the top and bottom
   and is clipped, which is what makes it read as part of something larger.

   How many faces a ring holds is NOT measured. `density` states the count on
   the outermost ring and every ring inside it takes its share pro rata by
   radius, so the gaps come out even with no arithmetic on the stage at all.
   The first version divided each circumference by a gap in px, which is the
   obvious way to do it and was wrong: the gallery card and the Video card are
   both 335px wide once the page settles, but they are not the same width at
   the moment the module mounts, so the two hosts ran different numbers of
   faces. A composition's count belongs to the composition.

   WHAT IS IN A FACE BY DEFAULT.
   Not a photograph. A drawn silhouette in a brand tint, for the same reason
   the reel's demo is numbered boxes: an entry whose demo needs particular
   image files is an entry that breaks when they move. Pass `images` to use
   real ones. */

export const DEFAULTS = {
  height: 420,
  rings: 4,
  reach: 0.94,       /* outermost radius / (longer axis / 2) */
  inner: 0.3,        /* innermost ring as a fraction of the outermost */
  density: 19,       /* faces on the OUTERMOST ring; the inner ones are
                        pro rata by radius, so the gaps are even */
  faceSize: 46,
  faceGrow: 0.05,    /* each ring out is this much bigger */
  spin: 48000,       /* innermost ring, one full turn */
  falloff: 0.34,     /* each ring out takes this much longer */
  alternate: true,
  blur: 6,           /* on the outermost ring; the innermost is always sharp */
  dim: 0.42,         /* opacity of the outermost ring */
  guides: true,
  vignette: true,
  accent: "mixed",
  accentEvery: 7,    /* every Nth face carries a ring in the accent colour */
  images: null,
  background: "",
  seed: 7,
  autoplay: true,
  paused: false,
  compact: false
};

var NUM = ["height", "rings", "reach", "inner", "density", "faceSize", "faceGrow",
  "spin", "falloff", "blur", "dim", "accentEvery", "seed"];
var BOOL = ["alternate", "guides", "vignette", "autoplay", "paused", "compact"];

/* Continia palette. Tech Blue is in the list but never alone on near-black -
   at 46px behind a 5px blur it is indistinguishable from the stage, so it is
   always mixed toward the accent before it is used as a tint. */
var PALETTE = {
  blue: [5, 41, 117],
  cyan: [143, 248, 255],
  green: [95, 158, 141],
  purple: [152, 62, 174]
};

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

/* mulberry32 - the tints and the accents must land in the same places on both
   hosts and across every resize, so the randomness is seeded and nothing in
   the layout path ever re-rolls it */
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

function toward(rgb, k) {
  return [rgb[0] + (255 - rgb[0]) * k, rgb[1] + (255 - rgb[1]) * k, rgb[2] + (255 - rgb[2]) * k];
}
function css(rgb, a) {
  return "rgba(" + (rgb[0] | 0) + "," + (rgb[1] | 0) + "," + (rgb[2] | 0) + "," + a + ")";
}

function prefersReducedMotion() {
  try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
  catch (e) { return false; }
}

/* The stand-in avatar: head and shoulders, drawn once as a path and tinted
   per face. It is deliberately a silhouette and not a monogram - a letter
   makes a claim about who the person is, and this is scenery. */
var SIL = '<svg class="mlpc-sil" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' +
  '<circle cx="24" cy="18.5" r="7.6"/>' +
  '<path d="M24 28.5c-7.4 0-13.4 4.9-13.4 11V48h26.8v-8.5c0-6.1-6-11-13.4-11Z"/>' +
  '</svg>';

export function initPortraitCircles(el, options) {
  var node = typeof el === "string" ? document.querySelector(el) : el;
  if (!node) return null;
  if (node.__ml && node.__ml.destroy) node.__ml.destroy();

  var o = Object.assign({}, DEFAULTS, fromData(node), options || {});
  var kept = [].slice.call(node.childNodes);
  var listeners = [], io = null, ro = null;
  var field, veil, content;
  var rings = [];          /* one record per ring: {orbit, track, faces, count} */
  var sig = "";            /* the layout signature - a rebuild only when it changes */
  var onScreen = true, playing = false;

  function validate() {
    o.rings = Math.max(1, Math.min(8, Math.round(o.rings) || 1));
    o.reach = Math.max(0.2, Math.min(1.6, o.reach));
    o.inner = Math.max(0.05, Math.min(0.95, o.inner));
    o.density = Math.max(3, Math.min(60, Math.round(o.density) || 3));
    o.faceSize = Math.max(10, o.faceSize);
    o.spin = Math.max(2000, o.spin);
    o.blur = Math.max(0, o.blur);
    o.dim = Math.max(0.05, Math.min(1, o.dim));
    if (!(o.accent in PALETTE) && o.accent !== "mixed") o.accent = "mixed";
    if (o.images && !Array.isArray(o.images)) o.images = null;
  }

  /* the tint of one face. `mixed` is Innovation Blue carrying Smart Green and
     Performance Purple as a minority, which is what gives the crowd grain;
     a single hue reads as a logo wall. */
  function tint(r) {
    if (o.accent !== "mixed") return PALETTE[o.accent];
    var x = r();
    if (x < 0.56) return PALETTE.cyan;
    if (x < 0.78) return PALETTE.green;
    if (x < 0.93) return PALETTE.purple;
    return PALETTE.blue;
  }
  function accentRGB() {
    return o.accent === "mixed" ? PALETTE.cyan : PALETTE[o.accent];
  }

  function build() {
    node.innerHTML = "";
    rings.length = 0;

    field = document.createElement("div");
    field.className = "mlpc-field";
    node.appendChild(field);

    var W = node.clientWidth || 1, H = node.clientHeight || 1;
    var Rmax = Math.max(W, H) * 0.5 * o.reach;
    var r = rng(o.seed), n = 0;
    var acc = accentRGB();

    for (var i = 0; i < o.rings; i++) {
      var f = o.rings === 1 ? 1 : i / (o.rings - 1);
      var frac = o.inner + (1 - o.inner) * f;        /* radius as a fraction of the outermost */
      var rad = Rmax * frac;
      /* the count comes off `frac` and never off `rad`, so a stage that has
         not been laid out yet - width zero - still builds the right rings */
      var count = Math.max(3, Math.round(o.density * frac));
      var size = o.faceSize * (1 + o.faceGrow * i);
      var spin = o.spin * (1 + o.falloff * i);
      var depth = o.rings === 1 ? 0 : f;             /* 0 at the front, 1 at the back */

      if (o.guides) {
        var track = document.createElement("div");
        track.className = "mlpc-track";
        track.style.setProperty("--mlpc-d", (rad * 2) + "px");
        track.style.setProperty("--mlpc-o", (1 - 0.45 * depth).toFixed(3));
        field.appendChild(track);
      }

      var orbit = document.createElement("div");
      orbit.className = "mlpc-orbit";
      orbit.style.setProperty("--mlpc-sp", spin + "ms");
      orbit.style.setProperty("--mlpc-op", (1 - (1 - o.dim) * depth).toFixed(3));
      /* every other ring turns the other way: it is the single cheapest thing
         that stops four concentric rings reading as one disc */
      if (o.alternate && i % 2 === 1) orbit.classList.add("mlpc-rev");

      var faces = [];
      for (var k = 0; k < count; k++) {
        var a = (360 / count) * k + (i * 11);        /* a per-ring offset, so the
                                                        rings never line up into spokes */
        var slot = document.createElement("div");
        slot.className = "mlpc-slot";
        slot.style.setProperty("--mlpc-a", a + "deg");
        slot.style.setProperty("--mlpc-r", rad + "px");

        var face = document.createElement("div");
        face.className = "mlpc-face";
        face.style.setProperty("--mlpc-a", a + "deg");
        face.style.setProperty("--mlpc-sp", spin + "ms");
        face.style.setProperty("--mlpc-s", size.toFixed(1) + "px");
        var t = tint(r);
        face.style.setProperty("--mlpc-t", css(toward(t, 0.08), 1));
        face.style.setProperty("--mlpc-t2", css(toward(t, 0.42), 1));
        if (o.blur > 0 && depth > 0) {
          face.style.setProperty("--mlpc-bl", (o.blur * depth * depth).toFixed(2) + "px");
          face.classList.add("mlpc-soft");
        }
        /* the accent ring goes on the sharp faces only - a coloured outline
           under 5px of blur is a smudge, not a highlight */
        if (o.accentEvery > 0 && depth < 0.34 && n % o.accentEvery === 0) {
          face.classList.add("mlpc-on");
          face.style.setProperty("--mlpc-ac", css(acc, 0.95));
        }
        if (o.images && o.images.length) {
          var img = document.createElement("img");
          img.src = o.images[n % o.images.length];
          img.alt = "";
          img.loading = "lazy";
          img.decoding = "async";
          face.appendChild(img);
        } else {
          face.innerHTML = SIL;
        }
        n++;
        slot.appendChild(face);
        orbit.appendChild(slot);
        faces.push(face);
      }
      field.appendChild(orbit);
      rings.push({ orbit: orbit, faces: faces, count: count });
    }

    if (o.vignette) {
      veil = document.createElement("div");
      veil.className = "mlpc-veil";
      field.appendChild(veil);
    }

    content = document.createElement("div");
    content.className = "mlpc-content";
    kept.forEach(function (c) { content.appendChild(c); });
    node.appendChild(content);
  }

  /* The layout signature deliberately has no measurement in it. The counts
     used to come from a ring's circumference divided by a gap in px, which
     reads as the obvious way to keep the gaps even - and it made the two
     hosts disagree: the gallery card and the Video card are the same 335px
     wide in the end, but they are not the same width at the moment the
     module mounts, and whichever size the last ResizeObserver callback saw
     is the one that stuck. Faces per ring is a property of the composition,
     not of the stage, so it is stated once and the stage only moves them. */
  function signature() {
    return [o.rings, o.inner, o.density].join(",");
  }

  /* a resize that does not change how many faces a ring holds only moves them:
     the radii are written back and nothing is torn down, so dragging a window
     edge does not rebuild forty elements per frame */
  function relayout() {
    var W = node.clientWidth || 1, H = node.clientHeight || 1;
    var Rmax = Math.max(W, H) * 0.5 * o.reach, i, k;
    for (i = 0; i < rings.length; i++) {
      var f = o.rings === 1 ? 1 : i / (o.rings - 1);
      var rad = Rmax * (o.inner + (1 - o.inner) * f);
      for (k = 0; k < rings[i].faces.length; k++) {
        rings[i].faces[k].parentNode.style.setProperty("--mlpc-r", rad + "px");
      }
    }
    var tracks = field.querySelectorAll(".mlpc-track");
    for (i = 0; i < tracks.length; i++) {
      var ff = o.rings === 1 ? 1 : i / (o.rings - 1);
      tracks[i].style.setProperty("--mlpc-d", (Rmax * (o.inner + (1 - o.inner) * ff) * 2) + "px");
    }
  }

  function resize() {
    var next = signature();
    if (next !== sig) { sig = next; build(); apply(); }
    else relayout();
  }

  function vars() {
    node.style.setProperty("--mlpc-h", o.height + "px");
    if (o.background) node.style.setProperty("--mlpc-bg", o.background);
    else node.style.removeProperty("--mlpc-bg");
    node.classList.toggle("mlpc-sm", !!o.compact);
  }

  /* play and pause are one class: the animations are never removed, so a
     resumed ring picks up exactly where it stopped rather than snapping back
     to the top of its loop */
  function apply() {
    var run = !o.paused && onScreen && !reduced() && o.autoplay !== false;
    playing = run;
    node.classList.toggle("is-still", !run);
    node.classList.toggle("is-lit", true);
  }

  function reduced() { return prefersReducedMotion(); }

  function on(t, ev, fn, opt) { t.addEventListener(ev, fn, opt); listeners.push([t, ev, fn, opt]); }

  node.classList.add("mlpc");
  validate();
  vars();
  sig = signature();
  build();
  apply();

  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(function (es) {
      onScreen = es[es.length - 1].isIntersecting;
      apply();
    }, { threshold: 0.08 });
    io.observe(node);
  }
  on(document, "visibilitychange", function () {
    onScreen = !document.hidden && onScreen;
    if (document.hidden) { node.classList.add("is-still"); playing = false; }
    else apply();
  });
  if ("ResizeObserver" in window) { ro = new ResizeObserver(resize); ro.observe(node); }

  var api = {
    el: node,
    /* where a face is on screen right now, for a caller who wants to hang a
       label or a tooltip off one. Read from the live box rather than from the
       clock, because the clock is the compositor's here, not ours. */
    faceAt: function (i) {
      var all = node.querySelectorAll(".mlpc-face");
      if (i < 0 || i >= all.length) return null;
      var r = all[i].getBoundingClientRect(), b = node.getBoundingClientRect();
      return { x: r.left - b.left + r.width / 2, y: r.top - b.top + r.height / 2, el: all[i] };
    },
    update: function (next) {
      Object.assign(o, next || {});
      validate();
      vars();
      sig = signature();
      build();
      apply();
      return api;
    },
    isPaused: function () { return !!o.paused; },
    toggle: function () { return api.update({ paused: !o.paused }); },
    destroy: function () {
      listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
      listeners.length = 0;
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      node.classList.remove("mlpc", "mlpc-sm", "is-lit", "is-still");
      ["--mlpc-h", "--mlpc-bg"].forEach(function (v) { node.style.removeProperty(v); });
      node.innerHTML = "";
      kept.forEach(function (n2) { node.appendChild(n2); });
      delete node.__mlPortraitCircles;
      delete node.__ml;
    }
  };
  node.__mlPortraitCircles = api;
  /* the handle both hosts look for - never the per-entry name */
  node.__ml = api;
  return api;
}

/* Auto-init, so a page only needs the markup and this module. */
export function mountAll(root) {
  return [].slice.call((root || document).querySelectorAll('[data-ml="portrait-circles"]'))
    .map(function (n) { return initPortraitCircles(n); });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { mountAll(); });
  else mountAll();
}
