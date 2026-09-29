/* Continia Motion Library — Color Carousel
   A 3D carousel whose stage takes its colour from whatever is on the card in
   front. Drop photographs in and the light behind them changes as you move
   through: a green shot lights the stage green, the next one warms it. The
   colour is read off the card's own pixels, so nobody has to hand-pick a
   palette to go with the pictures.

   Built from scratch on the Continia tokens. The motion idea is the one React
   Bits Pro ships as "Gradient Carousel"; none of their code is used here - it
   is a paid product whose licence (§2.4) forbids putting its source in a
   repository, and this repo is public. Theirs reads a gradient definition;
   this one samples the image, which is the point of the difference. See
   meta.json → brandNotes.

   The arrow is the library's own User Cursor, mounted rather than redrawn, per
   the pointer-demo rule in CLAUDE.md - here with no name pill, because the
   cards are the thing to look at.

   Usage:
     <div data-ml="color-carousel" data-height="360">
       <img src="…" alt="">
       <img src="…" alt="">
       …
     </div>
     <script type="module" src="entries/color-carousel/color-carousel.js"></script>

   A card is any direct child element. Where the colour comes from, in order:
   its own data-cc-color, the pixels of the first <img> it holds, or failing
   both its computed background colour - so a coloured <div> works as well as a
   photograph, and a cross-origin image that the canvas refuses to read still
   lights the stage rather than going grey.

   Or call it yourself:
     import { initColorCarousel } from "./color-carousel.js";
     const cc = initColorCarousel(el, { index: 2, autoplay: false });
     cc.go(3); cc.next(); cc.update({ paused: true });
     cc.destroy(); */

import { prefersReducedMotion, durationMs } from "../../tokens/motion-tokens.js";
import { initUserCursor } from "../user-cursor/user-cursor.js";

export const DEFAULTS = {
  height: 360,            /* px, the stage */
  card: 210,              /* px, the width of the card in front */
  ratio: 1,               /* the card's width : height. 1 is the square the reference uses */
  spread: 1.1,            /* how far apart the cards sit, as a fraction of the card's width */
  /* Measured off the reference: the card one place out reads about three
     quarters the width of the one in front. With a camera at 900px that is a
     300px step back - perspective / (perspective + depth) = 0.75 - and the
     shrink is the camera's, not a separate scale, so the card recedes rather
     than merely getting smaller. */
  depth: 300,             /* px, how far each step back recedes */
  angle: 34,              /* deg, how far a card off centre turns to face you */
  perspective: 900,       /* px, the camera distance */
  radius: 15,             /* px, the corner radius - the hub's tile radius */
  reach: 3,               /* how many cards each side stay on the stage */

  /* Colour. `wash` is how much of the card's colour reaches the stage in the
     light theme, `glow` the same in the dark one, where a colour on a dark
     ground has to work much harder to be seen at all. */
  wash: 30,               /* % */
  glow: 42,               /* % */
  saturate: 1.25,         /* the sampled colour is pushed this far toward full chroma */

  /* Loop lengths in ms, so they are options rather than tokens: the duration
     scale tops out at 800ms and describes transitions, not dwell times. */
  dwell: 2400,            /* how long a card holds the front before the next one */
  step: 900,              /* how long the cursor takes to walk to the next card */

  interactive: true,      /* drag, wheel, arrow keys, and click a card to bring it forward */
  autoplay: true,         /* advance on its own when no pointer is on the stage */
  cursor: true,           /* mount the library's User Cursor */
  name: "",               /* the cursor's pill - empty, so it is the arrow alone */
  accent: "auto",         /* auto | blue | cyan | green | purple - palette only */
  size: 22,               /* px, the arrow */
  index: 0,               /* which card starts in front */
  paused: false,
  compact: false          /* the card-sized skin */
};

var NUM = ["height", "card", "ratio", "spread", "depth", "angle", "perspective", "radius",
  "reach", "wash", "glow", "saturate", "dwell", "step", "size", "index"];
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

/* ---- reading a colour off a card ----

   Averaging every pixel of a photograph gives mud: the mean of a green field
   under a blue sky is grey. So the pixels are dropped into a coarse 6x6x6
   cube, the near-white, near-black and near-grey ones are left out because
   they are the paper and the shadows rather than the subject, and the biggest
   remaining bucket is averaged. What comes back is the colour someone would
   name if you asked them what colour the picture is. */
var CUBE = 6;

function dominant(data) {
  var bins = {}, i, r, g, b, mx, mn, key, best = null, bestN = 0;
  for (i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue;          /* transparent - not part of the picture */
    r = data[i]; g = data[i + 1]; b = data[i + 2];
    mx = Math.max(r, g, b); mn = Math.min(r, g, b);
    if (mx > 246 || mx < 16) continue;        /* paper and ink */
    if (mx - mn < 18) continue;               /* grey carries no hue to wash with */
    key = ((r * CUBE / 256) | 0) + "," + ((g * CUBE / 256) | 0) + "," + ((b * CUBE / 256) | 0);
    var bin = bins[key] || (bins[key] = [0, 0, 0, 0]);
    bin[0] += r; bin[1] += g; bin[2] += b; bin[3]++;
    if (bin[3] > bestN) { bestN = bin[3]; best = bin; }
  }
  /* Every pixel was paper, ink or grey. A monochrome card is a real card; it
     just has nothing to say about hue, so the second pass takes the plain mean
     and the stage lights in whatever that is. */
  if (!best) {
    var s = [0, 0, 0, 0];
    for (i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 128) continue;
      s[0] += data[i]; s[1] += data[i + 1]; s[2] += data[i + 2]; s[3]++;
    }
    if (!s[3]) return null;
    best = s;
  }
  return [Math.round(best[0] / best[3]), Math.round(best[1] / best[3]), Math.round(best[2] / best[3])];
}

/* Toward full chroma, keeping the lightness. A colour sampled off a photograph
   is usually too soft to light a stage with; this is the one place the module
   is allowed to disagree with the picture. */
function saturate(rgb, k) {
  var m = (rgb[0] + rgb[1] + rgb[2]) / 3;
  return rgb.map(function (c) { return Math.max(0, Math.min(255, Math.round(m + (c - m) * k))); });
}

function css(rgb) { return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")"; }

function parseColor(str) {
  if (!str) return null;
  var m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(str.trim());
  if (m) {
    var h = m[1];
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  m = /rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(str);
  if (!m) return null;
  /* rgba(0,0,0,0) is what an element with no background reports - a colour we
     were not given rather than black */
  if (/rgba/i.test(str) && /,\s*0\s*\)/.test(str)) return null;
  return [+m[1] | 0, +m[2] | 0, +m[3] | 0];
}

export function initColorCarousel(node, options) {
  if (!node || node.nodeType !== 1) throw new Error("initColorCarousel: needs an element");
  if (node.__ml) return node.__ml;

  var o = Object.assign({}, DEFAULTS, fromData(node), options || {});
  if (ACCENTS.indexOf(o.accent) < 0) {
    throw new Error('initColorCarousel: accent "' + o.accent + '" is not one of ' + ACCENTS.join(", ") +
      " - the palette is deliberate, add a token rather than a hex here");
  }
  if (!(o.dwell > 0) || !(o.step > 0)) throw new Error("initColorCarousel: dwell/step must be > 0");

  var kept = [].slice.call(node.childNodes);

  var stage = document.createElement("div");
  stage.className = "mlcc-stage";

  var wash = document.createElement("div");
  wash.className = "mlcc-wash";

  var track = document.createElement("div");
  track.className = "mlcc-track";

  /* Each source child becomes a card. Its markup moves across whole rather
     than being read field by field, because unlike a modal card there is
     nothing here to read: a card is a picture. */
  var cards = kept.filter(function (n) { return n.nodeType === 1; }).map(function (src, i) {
    var el = document.createElement("figure");
    el.className = "mlcc-card";
    el.tabIndex = -1;
    el.setAttribute("role", "group");
    el.setAttribute("aria-label", "Slide " + (i + 1) + " of " + kept.filter(function (n) { return n.nodeType === 1; }).length);
    el.appendChild(src.cloneNode(true));
    track.appendChild(el);
    return { el: el, src: src, i: i, color: null };
  });

  node.classList.add("mlcc");
  /* The source children are read, not displayed: left in place they stack
     above the stage and push it out of the host box. */
  kept.forEach(function (n) { if (n.parentNode === node) node.removeChild(n); });
  node.appendChild(stage);
  stage.appendChild(wash);
  stage.appendChild(track);

  var pos = 0, target = 0, W = 0, H = 0, uc = null, io = null, listeners = [],
      raf = 0, last = 0, clock = 0, running = false, reduced = false, placed = false,
      /* 0, not -1: the tour advances when the lap counter *changes*, so starting
         it below the first lap would fire on the very first frame and the card
         that was asked to start in front would never hold it. */
      step = 0, dragging = false, dragX = 0, dragPos = 0, current = -1;

  function on(t, e, f, opt) { t.addEventListener(e, f, opt); listeners.push([t, e, f, opt]); }

  function clamp(v) { return Math.max(0, Math.min(cards.length - 1, v)); }

  function vars() {
    node.style.setProperty("--mlcc-h", o.height + "px");
    node.style.setProperty("--mlcc-card", o.card + "px");
    node.style.setProperty("--mlcc-ratio", o.ratio);
    node.style.setProperty("--mlcc-radius", o.radius + "px");
    node.style.setProperty("--mlcc-persp", o.perspective + "px");
    node.style.setProperty("--mlcc-wash", o.wash + "%");
    node.style.setProperty("--mlcc-glow", o.glow + "%");
    node.classList.toggle("mlcc-sm", !!o.compact);
    node.classList.toggle("is-static", !o.interactive);
  }

  function measure() {
    var r = stage.getBoundingClientRect();
    W = r.width; H = r.height;
    return r;
  }

  /* ---- the colour of a card ----
     Three sources, cheapest and most explicit first. An author who has said
     what colour the card is always wins over anything sampled, because they
     may be matching a brand rather than the picture. */
  function sample(c) {
    if (c.color) return c.color;
    var told = c.src.dataset ? c.src.dataset.ccColor : null;
    var p = parseColor(told);
    if (p) return (c.color = css(saturate(p, o.saturate)));

    var img = c.el.querySelector("img");
    if (img && img.complete && img.naturalWidth) {
      try {
        var cv = document.createElement("canvas");
        cv.width = cv.height = 24;              /* 576 pixels is plenty for a hue */
        var ctx = cv.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, 24, 24);
        var d = dominant(ctx.getImageData(0, 0, 24, 24).data);
        if (d) return (c.color = css(saturate(d, o.saturate)));
      } catch (e) {
        /* A cross-origin image taints the canvas and getImageData throws. That
           is not an error to report - it is the common case for a CDN photo -
           so the card falls through to its own background colour and the stage
           still lights. data-cc-color is the fix when the wash matters. */
      }
    }

    var el = c.el.firstElementChild || c.el;
    p = parseColor(getComputedStyle(el).backgroundColor) || parseColor(getComputedStyle(c.el).backgroundColor);
    if (p) return (c.color = css(saturate(p, o.saturate)));
    return null;
  }

  function paint(i) {
    if (i === current || !cards[i]) return;
    current = i;
    var col = sample(cards[i]);
    if (col) node.style.setProperty("--mlcc-color", col);
    cards.forEach(function (c, n) { c.el.setAttribute("aria-current", n === i ? "true" : "false"); });
  }

  /* ---- where a card sits ----
     k is how many places the card is from the front, as a float, so a drag
     moves the whole ring instead of snapping between slots. The card in front
     is face-on; every step out turns toward you, recedes and dims. Positive k
     is to the right, and a right-hand card turns its inner edge away - the
     ring is seen from outside, not from within. */
  function place() {
    var reach = o.reach;
    cards.forEach(function (c, i) {
      var k = i - pos, a = Math.abs(k);
      if (a > reach + 1) { c.el.style.display = "none"; return; }
      c.el.style.display = "";
      var t = Math.min(a, reach);
      c.el.style.transform =
        "translate3d(" + (k * o.card * o.spread).toFixed(2) + "px,0," + (-t * o.depth).toFixed(2) + "px)" +
        " rotateY(" + (-Math.max(-1, Math.min(1, k)) * o.angle).toFixed(2) + "deg)";
      c.el.style.opacity = Math.max(0, Math.min(1, reach - a)).toFixed(3);
      c.el.style.zIndex = String(1000 - Math.round(a * 10));
      c.el.classList.toggle("is-front", a < 0.5);
    });
  }

  function go(i) {
    target = clamp(Math.round(i));
    if (reduced) { pos = target; place(); paint(target); return; }
    kick();
  }

  /* ---- the tour ----
     Two beats per card, in this order: the arrow rides the card in front while
     it holds, then walks to the card on its right, and the press lands on the
     lap boundary - the moment it has arrived. That press is what advances the
     carousel, so the demo shows a hand doing what a visitor would do rather
     than a slideshow running itself, and because `target` becomes the card the
     arrow is already standing on, it rides that one forward without jumping
     back. Walking first and pressing last would have it leave for the card
     after next and then snap back, which is what it did before. */
  function lap() { return o.step + o.dwell; }

  function nextIdx() { return target + 1 >= cards.length ? 0 : target + 1; }

  function centreOf(el) {
    var s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
    return [r.left - s.left + r.width / 2, r.top - s.top + r.height / 2];
  }

  function tourPoint() {
    if (!cards.length) return null;
    var t = clock % lap();
    if (t < o.dwell) return centreOf(cards[clamp(target)].el);   /* riding the front card */
    return centreOf(cards[nextIdx()].el);                        /* walking to the next */
  }

  function advance() {
    var s = Math.floor(clock / lap());
    if (s === step) return;
    step = s;
    if (uc) uc.press();
    go(nextIdx());
  }

  function frame(now) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    var dt = Math.min(64, now - last);
    last = now;
    if (dt <= 0) return;

    if (!dragging) {
      /* Frame-rate independent smoothing: the carousel closes 63% of the gap
         to the card in front every `moderate`, whatever the refresh rate. */
      var k = 1 - Math.exp(-dt / durationMs.moderate);
      pos += (target - pos) * k;
      if (Math.abs(target - pos) < 0.001) pos = target;
    }
    place();
    paint(clamp(Math.round(pos)));

    if (o.autoplay && !o.paused && !dragging && !(uc && uc.at().mode === "pointer")) {
      clock += dt;
      advance();
    }
    /* Paused means the tour stops, not that the component freezes: go(), the
       arrow keys and a drag all still move the ring, and the loop is what
       carries them there. So it runs until there is nothing left to glide and
       then stands itself down, rather than refusing to start. */
    if (o.paused && pos === target && !dragging) halt();
  }

  function kick() {
    if (running || reduced) return;
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
  /* after the cursor, and before its layer: appended first they would be laid
     out inside the cursor's own flex column, appended last they would paint
     over the arrow */
  var arrowLayer = stage.querySelector(".mluc-layer");
  if (arrowLayer) { stage.insertBefore(wash, arrowLayer); stage.insertBefore(track, arrowLayer); }

  cards.forEach(function (c) {
    on(c.el, "click", function () {
      if (!o.interactive) return;
      if (uc) uc.press();
      clock = 0; step = 0;                 /* a click restarts the dwell, so it is not cut short */
      go(c.i);
    });
    /* the image inside a card must not answer a drag with the browser's own
       ghost-image gesture */
    var img = c.el.querySelector("img");
    if (img) img.draggable = false;
  });

  on(node, "keydown", function (e) {
    if (!o.interactive) return;
    if (e.key === "ArrowRight") { e.preventDefault(); clock = 0; step = 0; go(target + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); clock = 0; step = 0; go(target - 1); }
  });

  on(stage, "pointerdown", function (e) {
    if (!o.interactive || reduced) return;
    dragging = true; dragX = e.clientX; dragPos = pos;
    stage.setPointerCapture && stage.setPointerCapture(e.pointerId);
    node.classList.add("is-dragging");
  });
  on(stage, "pointermove", function (e) {
    if (!dragging) return;
    /* a card's width is one place, so the ring tracks the hand one to one */
    pos = Math.max(-0.4, Math.min(cards.length - 0.6, dragPos - (e.clientX - dragX) / (o.card * o.spread)));
    place();
    paint(clamp(Math.round(pos)));
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    node.classList.remove("is-dragging");
    clock = 0; step = 0;
    go(Math.round(pos));
  }
  on(stage, "pointerup", endDrag);
  on(stage, "pointercancel", endDrag);
  on(stage, "pointerleave", endDrag);

  function relayout() { measure(); if (W && H) placed = true; place(); }
  pos = target = clamp(o.index);
  relayout();
  paint(clamp(o.index));
  on(window, "resize", relayout);

  /* An <img> that has not decoded yet has no pixels to sample, so the card it
     is on gets its colour a moment late rather than never. */
  cards.forEach(function (c) {
    var img = c.el.querySelector("img");
    if (img && !img.complete) {
      on(img, "load", function () { c.color = null; if (c.i === current) { current = -1; paint(c.i); } });
    }
  });

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
      if (reduced) { halt(); pos = target; place(); } else kick();
    });
  }

  var api = {
    el: node,
    go: function (i) { clock = 0; step = 0; go(i); return api; },
    next: function () { return api.go(nextIdx()); },
    prev: function () { return api.go(target - 1 < 0 ? cards.length - 1 : target - 1); },
    index: function () { return target; },
    color: function () { return node.style.getPropertyValue("--mlcc-color") || null; },
    update: function (next) {
      Object.assign(o, next || {});
      if (ACCENTS.indexOf(o.accent) < 0) throw new Error('initColorCarousel: unknown accent "' + o.accent + '"');
      cards.forEach(function (c) { c.color = null; });   /* saturate may have moved */
      current = -1;
      vars();
      relayout();
      paint(clamp(Math.round(pos)));
      node.classList.toggle("is-paused", !!o.paused);
      /* the arrow is half the effect - pausing one without the other leaves a
         cursor pressing cards that never come forward */
      if (uc) uc.update({ paused: !!o.paused, name: o.name, accent: o.accent, size: o.size, height: o.height });
      kick();
      return api;
    },
    isPaused: function () { return !!o.paused; },
    toggle: function () { return api.update({ paused: !o.paused }); },
    destroy: function () {
      halt();
      listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
      listeners.length = 0;
      if (io) io.disconnect();
      if (uc) uc.destroy();
      uc = null;
      node.classList.remove("mlcc", "mlcc-sm", "is-paused", "is-dragging", "is-static");
      ["--mlcc-h", "--mlcc-card", "--mlcc-ratio", "--mlcc-radius", "--mlcc-persp",
       "--mlcc-wash", "--mlcc-glow", "--mlcc-color"].forEach(function (v) { node.style.removeProperty(v); });
      node.innerHTML = "";
      kept.forEach(function (n) { node.appendChild(n); });
      delete node.__mlColor;
      delete node.__ml;
    }
  };
  if (o.paused) node.classList.add("is-paused");
  node.__mlColor = api;
  /* the handle both hosts look for */
  node.__ml = api;
  return api;
}

/* Auto-init, so a page only needs the markup and this module. */
export function mountAll(root) {
  return [].slice.call((root || document).querySelectorAll('[data-ml="color-carousel"]'))
    .map(function (n) { return initColorCarousel(n); });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { mountAll(); }, { once: true });
  } else { mountAll(); }
}
