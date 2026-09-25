/* Continia Motion Library — Reel Gallery
   Tilted rows of images drifting sideways, with wheel / drag / arrow-key
   control, inertia, and a spotlight that restores colour under the cursor.

   Built from scratch on the Continia tokens. The motion idea is the one React
   Bits Pro ships as "Reel Gallery"; none of their code is used here - it is a
   paid product whose licence forbids putting its source in a repository, and
   this repo is public. See meta.json → brandNotes.

   Usage:
     <div data-ml="reel-gallery" data-rows="3">
       <img src="…" alt="…"> …
     </div>
     <script type="module" src="entries/reel-gallery/reel-gallery.js"></script>

   Or call it yourself:
     import { initReelGallery } from "./reel-gallery.js";
     const reel = initReelGallery(el, { rows: 4, speed: 40 });
     reel.update({ paused: true });
     reel.destroy(); */

import { prefersReducedMotion } from "../../tokens/motion-tokens.js";

export const DEFAULTS = {
  rows: 3,               /* how many rows to spread the images over */
  rowHeight: 116,        /* px, the height of one row */
  rowGap: 14,            /* px, between rows */
  itemGap: 14,           /* px, between items in a row */
  radius: 12,            /* px, corner radius on each item */

  /* Ambient drift. This is a loop speed, not a transition, so it is an option
     rather than a token - the duration scale tops out at 800ms by design. */
  speed: 26,             /* px per second */
  speedVariance: 0.35,   /* ±fraction, so rows do not move as one block */
  autoScroll: true,
  direction: "alternate",/* "alternate" | "left" | "right" */

  /* Input */
  interactive: true,
  wheelSensitivity: 0.7,
  dragSensitivity: 1,
  inertia: true,
  damping: 0.94,         /* per frame at 60fps, rescaled for other rates */

  /* Shape */
  tilt: -8,              /* deg, the whole stack */
  arch: 18,              /* px, how far the outer rows sit below the middle */
  fade: 72,              /* px, the soft edge left and right */

  /* Spotlight */
  grayscale: 1,          /* 0–1, how far the un-lit images are desaturated */
  focusRadius: 170,      /* px */
  focusStrength: 1,      /* 0–1, 0 turns the spotlight off */

  paused: false
};

var NUM = ["rows", "rowHeight", "rowGap", "itemGap", "radius", "speed", "speedVariance",
  "wheelSensitivity", "dragSensitivity", "damping", "tilt", "arch", "fade",
  "grayscale", "focusRadius", "focusStrength"];
var BOOL = ["autoScroll", "interactive", "inertia", "paused"];

/* data-row-height → rowHeight, and only for keys we actually know */
function fromData(el) {
  var o = {};
  NUM.forEach(function (k) {
    var v = el.dataset[k];
    if (v != null && v !== "" && !isNaN(parseFloat(v))) o[k] = parseFloat(v);
  });
  BOOL.forEach(function (k) {
    var v = el.dataset[k];
    if (v != null && v !== "") o[k] = v !== "false" && v !== "0";
  });
  if (el.dataset.direction) o.direction = el.dataset.direction;
  return o;
}

/* backdrop-filter is what makes the spotlight one element instead of a filter
   on every image. Where it is missing, everything is simply desaturated. */
var SPOT_OK = (function () {
  try {
    return CSS.supports("backdrop-filter", "grayscale(1)") ||
           CSS.supports("-webkit-backdrop-filter", "grayscale(1)");
  } catch (e) { return false; }
})();

export function initReelGallery(el, options) {
  if (!el || el.__mlReel) return el && el.__mlReel;
  var o = Object.assign({}, DEFAULTS, fromData(el), options || {});

  /* the images the caller put inside; anything else is left alone */
  var source = [].slice.call(el.children).filter(function (n) { return n.nodeType === 1; });
  if (!source.length) {
    throw new Error("reel-gallery: no child elements to lay out in " + (el.id || el.className));
  }

  var reduced = prefersReducedMotion();
  el.classList.add("mlrg");
  if (!SPOT_OK) el.classList.add("mlrg-nospot");
  if (o.interactive) { el.classList.add("mlrg-int"); if (!el.hasAttribute("tabindex")) el.tabIndex = 0; }

  /* ---------- build ---------- */
  var view = document.createElement("div"); view.className = "mlrg-view";
  var tilt = document.createElement("div"); tilt.className = "mlrg-tilt";
  var spot = document.createElement("div"); spot.className = "mlrg-spot"; spot.setAttribute("aria-hidden", "true");
  var rows = [];

  function px(n) { return n + "px"; }
  el.style.setProperty("--mlrg-radius", px(o.radius));
  el.style.setProperty("--mlrg-gap", px(o.itemGap));
  el.style.setProperty("--mlrg-h", px(o.rowHeight));
  el.style.setProperty("--mlrg-fade", px(o.fade));
  el.style.setProperty("--mlrg-gray", String(o.grayscale));
  el.style.setProperty("--mlrg-focus", px(o.focusRadius));
  el.style.setProperty("--mlrg-tilt", o.tilt + "deg");

  var n = Math.max(1, Math.round(o.rows));
  for (var r = 0; r < n; r++) {
    var row = document.createElement("div");
    row.className = "mlrg-row";
    row.style.marginBottom = r < n - 1 ? px(o.rowGap) : "0";
    /* arch: the middle row sits highest, the outer ones drop away */
    var mid = (n - 1) / 2;
    var k = mid === 0 ? 0 : (r - mid) / mid;
    row.style.transform = "translateY(" + px(Math.round(k * k * o.arch)) + ")";

    var strip = document.createElement("div");
    strip.className = "mlrg-strip";
    row.appendChild(strip);
    tilt.appendChild(row);

    var dir = o.direction === "left" ? -1 : o.direction === "right" ? 1 : (r % 2 ? -1 : 1);
    /* a deterministic spread, so two rows never drift in lockstep and a
       reload does not reshuffle the look */
    var spread = n === 1 ? 0 : (r / (n - 1) - 0.5) * 2;
    rows.push({
      el: strip, row: row, offset: 0, width: 0, dir: dir,
      drift: o.speed * (1 + spread * o.speedVariance)
    });
  }

  el.innerHTML = "";
  view.appendChild(tilt);
  if (SPOT_OK) view.appendChild(spot);
  el.appendChild(view);
  view.style.height = px(n * o.rowHeight + (n - 1) * o.rowGap + o.arch);

  /* Fill each strip by cycling through the source items, then clone the whole
     run once so the wrap has something to show. Images are deep-cloned, which
     is why the caller's originals are read before el is emptied. */
  function fill() {
    rows.forEach(function (row, i) {
      row.el.innerHTML = "";
      var run = document.createElement("div");
      run.className = "mlrg-run";
      /* start each row at a different point in the sequence */
      for (var j = 0; j < source.length; j++) {
        var node = source[(j + i) % source.length].cloneNode(true);
        var item = document.createElement("div");
        item.className = "mlrg-item";
        item.appendChild(node);
        run.appendChild(item);
      }
      row.el.appendChild(run);
      var wrap = run.cloneNode(true);            /* the second run is the wrap */
      hide(wrap);
      row.el.appendChild(wrap);
      /* Every image appears once per row and twice per strip. A screen reader
         should hear the set once, so only the first run of the first row keeps
         its alt text; the rest is decoration. */
      if (i > 0) hide(run);
      row.run = run;
    });
    measure();
  }

  function hide(node) {
    node.setAttribute("aria-hidden", "true");
    [].forEach.call(node.querySelectorAll("img"), function (im) { im.alt = ""; });
  }

  function measure() {
    rows.forEach(function (row) {
      row.width = row.run ? row.run.getBoundingClientRect().width + o.itemGap : 0;
    });
  }

  fill();
  /* images decode after layout, so the run width is only final once they land */
  var imgs = el.querySelectorAll("img");
  var pending = 0;
  [].forEach.call(imgs, function (im) {
    if (im.complete) return;
    pending++;
    im.addEventListener("load", function () { if (!--pending) measure(); }, { once: true });
    im.addEventListener("error", function () { if (!--pending) measure(); }, { once: true });
  });

  /* ---------- motion ---------- */
  var vel = 0, last = 0, raf = 0, visible = true, running = false;

  function step(now) {
    raf = 0;
    var dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
    last = now;

    if (o.inertia) {
      /* damping is quoted per frame at 60fps; rescale so a 120Hz screen does
         not stop twice as fast */
      vel *= Math.pow(o.damping, dt * 60);
      if (Math.abs(vel) < 0.5) vel = 0;
    } else { vel = 0; }

    rows.forEach(function (row) {
      if (!row.width) return;
      var move = (o.autoScroll && !o.paused ? row.drift * row.dir : 0) * dt + vel * dt;
      row.offset = (row.offset + move) % row.width;
      if (row.offset < 0) row.offset += row.width;
      row.el.style.transform = "translate3d(" + -row.offset + "px,0,0)";
    });

    if (shouldRun()) raf = requestAnimationFrame(step);
    else { running = false; last = 0; }
  }

  function shouldRun() {
    if (reduced) return false;
    if (!visible || document.hidden) return false;
    if (vel !== 0) return true;
    return o.autoScroll && !o.paused;
  }
  function kick() {
    if (running || !shouldRun()) return;
    running = true; last = 0; raf = requestAnimationFrame(step);
  }

  /* ---------- input ---------- */
  var listeners = [];
  function on(target, type, fn, opts) {
    target.addEventListener(type, fn, opts);
    listeners.push([target, type, fn, opts]);
  }

  if (o.interactive) {
    /* The wheel drives the reel but never swallows the page scroll - a
       marketing page that traps the wheel is worse than no effect. */
    on(el, "wheel", function (e) {
      var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      vel -= d * o.wheelSensitivity * 6;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.preventDefault();
      kick();
    }, { passive: false });

    var dragging = false, lastX = 0;
    on(el, "pointerdown", function (e) {
      if (e.button) return;
      dragging = true; lastX = e.clientX; vel = 0;
      el.classList.add("is-drag");
      el.setPointerCapture(e.pointerId);
    });
    on(el, "pointermove", function (e) {
      if (dragging) {
        var dx = e.clientX - lastX; lastX = e.clientX;
        vel = dx * o.dragSensitivity * 60;
        rows.forEach(function (row) {
          if (!row.width) return;
          row.offset = (row.offset - dx) % row.width;
          if (row.offset < 0) row.offset += row.width;
          row.el.style.transform = "translate3d(" + -row.offset + "px,0,0)";
        });
      }
      if (SPOT_OK && o.focusStrength > 0) {
        var b = el.getBoundingClientRect();
        el.style.setProperty("--mlrg-x", (e.clientX - b.left) + "px");
        el.style.setProperty("--mlrg-y", (e.clientY - b.top) + "px");
        el.classList.add("is-lit");
      }
    });
    ["pointerup", "pointercancel"].forEach(function (t) {
      on(el, t, function () { dragging = false; el.classList.remove("is-drag"); kick(); });
    });
    on(el, "pointerleave", function () {
      dragging = false;
      el.classList.remove("is-drag", "is-lit");
    });
    on(el, "keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      vel += (e.key === "ArrowLeft" ? 1 : -1) * 320;
      e.preventDefault();
      kick();
    });
  }

  on(window, "resize", measure);
  on(document, "visibilitychange", function () { if (!document.hidden) kick(); });

  var io = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible) kick();
    }, { threshold: 0.01 });
    io.observe(el);
  }

  if (reduced) {
    /* Static frame: the rows are laid out and readable, nothing drifts. Drag
       still works, because that is the reader asking for movement. */
    el.classList.add("mlrg-static");
  } else {
    kick();
  }

  var api = {
    el: el,
    update: function (next) {
      Object.assign(o, next || {});
      el.style.setProperty("--mlrg-gray", String(o.grayscale));
      el.style.setProperty("--mlrg-focus", px(o.focusRadius));
      el.style.setProperty("--mlrg-tilt", o.tilt + "deg");
      kick();
      return api;
    },
    destroy: function () {
      if (raf) cancelAnimationFrame(raf);
      raf = 0; running = false;
      listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
      listeners.length = 0;
      if (io) io.disconnect();
      el.classList.remove("mlrg", "mlrg-int", "mlrg-nospot", "mlrg-static", "is-lit", "is-drag");
      el.innerHTML = "";
      source.forEach(function (node) { el.appendChild(node); });
      delete el.__mlReel;
    }
  };
  el.__mlReel = api;
  return api;
}

/* Auto-init, so a page only needs the markup and this module. */
export function mountAll(root) {
  return [].slice.call((root || document).querySelectorAll('[data-ml="reel-gallery"]'))
    .map(function (el) { return initReelGallery(el); });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { mountAll(); }, { once: true });
  } else { mountAll(); }
}
