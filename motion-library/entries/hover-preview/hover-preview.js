/* Continia Motion Library — Hover Preview
   A paragraph whose key words are live: put the cursor on one and a small card
   lifts above it showing what the word means. Move to the next word and the
   same card glides across and cross-fades its contents rather than closing and
   reopening, so the reader's eye is never asked to find it again.

   Built from scratch on the Continia tokens. The motion idea is the one React
   Bits Pro ships as "Hover Preview"; none of their code is used here - it is a
   paid product whose licence (§2.4) forbids putting its source in a repository,
   and this repo is public. See meta.json → brandNotes.

   The arrow is the library's own User Cursor, mounted on the stage rather than
   redrawn here, so the two entries can never drift apart. That module gained
   two hooks for this: `autoPath`, which replaces its wander with a tour of the
   words, and `at()`, which reports where its tip is heading. Hit-testing reads
   `at()` rather than the real pointer, so the preview and the arrow can never
   disagree about which word is hovered - including while the cursor is driving
   itself.

   Usage:
     <div data-ml="hover-preview" data-height="320">
       <p class="mlhp-copy">
         Built on <span data-hp="dc">Document Capture</span> and
         <span data-hp="em">Expense Management</span>.
       </p>
       <template data-hp-for="dc">…anything…</template>
       <template data-hp-for="em">…anything…</template>
     </div>
     <script type="module" src="entries/hover-preview/hover-preview.js"></script>

   A trigger is any element carrying data-hp. Its card comes from the
   <template data-hp-for="…"> with the matching key, or from data-hp-img for the
   common single-image case, or failing both from the trigger's own text.

   Or call it yourself:
     import { initHoverPreview } from "./hover-preview.js";
     const hp = initHoverPreview(el, { width: 150, dwell: 1400 });
     hp.update({ paused: true });
     hp.destroy(); */

import { prefersReducedMotion, durationMs } from "../../tokens/motion-tokens.js";
import { initUserCursor } from "../user-cursor/user-cursor.js";

export const DEFAULTS = {
  height: 320,            /* px, the stage */
  width: 132,             /* px, the preview card */
  ratio: 1,               /* the card's width : height - 1 is the square the reference uses */
  gap: 14,                /* px between the card's bottom edge and the top of the word */

  /* The resting angle. Every card is pinned at a small tilt of its own rather
     than hung straight, which is what stops a row of previews reading as a
     filmstrip; the sign and size come from the key, so a word keeps its angle
     across reloads instead of shuffling. */
  tilt: 7,                /* max degrees, either way */
  parallax: 10,           /* px the card slides as the cursor crosses the word */

  /* A time constant, not a transition: the card closes 63% of the gap to the
     word it is heading for in this long. It is the glide between two words, so
     it comes off the duration scale one step above the arrow's own follow -
     the card is the heavier object and should arrive after the cursor does. */
  follow: durationMs.moderate,   /* 400ms */

  dwell: 1300,            /* ms the self-driving tour rests on each word - a loop length */
  cursor: true,           /* mount the library's User Cursor on the stage */
  name: "Sophie",         /* the cursor's pill */
  accent: "auto",         /* auto | blue | cyan | green | purple - palette only */
  size: 22,               /* the cursor's arrow */
  autoplay: true,         /* tour the words when no pointer is on the stage */
  paused: false,
  compact: false          /* the card-sized skin */
};

var NUM = ["height", "width", "ratio", "gap", "tilt", "parallax", "follow", "dwell", "size"];
var BOOL = ["cursor", "autoplay", "paused", "compact"];
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

/* A stable angle per key. Not Math.random(): a word that leans one way on load
   and the other way on reload reads as a bug rather than as a hand-placed
   card. */
function hash(s) {
  var h = 2166136261, i;
  for (i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0) / 4294967295;
}

function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

export function initHoverPreview(node, options) {
  if (!node || node.nodeType !== 1) throw new Error("initHoverPreview: needs an element");
  /* Both hosts call mountAll after the cards exist and the module also
     auto-inits on import, so every mount is init'd twice; without this the
     second run captures the first run's wrappers as the caller's children. */
  if (node.__ml) return node.__ml;

  var o = Object.assign({}, DEFAULTS, fromData(node), options || {});
  if (ACCENTS.indexOf(o.accent) < 0) {
    throw new Error('initHoverPreview: accent "' + o.accent + '" is not one of ' + ACCENTS.join(", ") +
      " - the palette is deliberate, add a token rather than a hex here");
  }
  if (!(o.follow > 0)) throw new Error("initHoverPreview: follow must be > 0");
  if (!(o.dwell > 0)) throw new Error("initHoverPreview: dwell must be > 0");

  var kept = [].slice.call(node.childNodes);

  /* The User Cursor wraps whatever it is mounted on and parks its handle on
     el.__ml - the same name both hosts read - so it gets a stage of its own
     inside this node rather than the node itself. */
  var stage = document.createElement("div");
  stage.className = "mlhp-stage";
  kept.forEach(function (n) { stage.appendChild(n); });

  var card = document.createElement("div");
  card.className = "mlhp-card";
  card.setAttribute("aria-hidden", "true");
  card.innerHTML = '<div class="mlhp-inner"><div class="mlhp-slot"></div><div class="mlhp-slot"></div></div>';

  node.classList.add("mlhp");
  node.appendChild(stage);

  var inner = card.querySelector(".mlhp-inner"),
      slots = [].slice.call(card.querySelectorAll(".mlhp-slot")),
      front = 0;

  var triggers = [], stops = [], cx = 0, cy = 0, ax = 0, tcx = 0, tcy = 0, tang = 0,
      active = null, activeRect = null, W = 0, H = 0,
      raf = 0, last = 0, running = false, reduced = false, placed = false,
      hover = null,            /* the real pointer, in stage coordinates */
      uc = null, io = null, listeners = [];

  function on(t, e, f, opt) { t.addEventListener(e, f, opt); listeners.push([t, e, f, opt]); }

  function vars() {
    node.style.setProperty("--mlhp-h", o.height + "px");
    node.style.setProperty("--mlhp-w", o.width + "px");
    node.style.setProperty("--mlhp-ratio", o.ratio);
    node.classList.toggle("mlhp-sm", !!o.compact);
  }

  /* Each trigger's card is built once. Cloning a <template> on every hover
     would restart any animation inside it and re-fetch an <img>. */
  function collect() {
    triggers = [].slice.call(stage.querySelectorAll("[data-hp]")).map(function (el) {
      var key = el.getAttribute("data-hp") || el.textContent.trim();
      var tpl = stage.querySelector('template[data-hp-for="' + (window.CSS && CSS.escape ? CSS.escape(key) : key) + '"]');
      var content;
      if (tpl) content = tpl.content.cloneNode(true);
      else if (el.getAttribute("data-hp-img")) {
        var img = document.createElement("img");
        img.src = el.getAttribute("data-hp-img");
        img.alt = "";
        img.loading = "lazy";
        content = img;
      } else {
        content = document.createElement("div");
        content.className = "mlhp-fallback";
        content.textContent = el.textContent.trim();
      }
      var t = el.hasAttribute("data-hp-tilt")
        ? parseFloat(el.getAttribute("data-hp-tilt"))
        : (hash(key) * 2 - 1) * o.tilt;
      el.classList.add("mlhp-hit");
      return { el: el, key: key, content: content, tilt: t, rects: [], r: null };
    });
  }

  function measure() {
    var s = stage.getBoundingClientRect();
    W = s.width; H = s.height;
    /* One box per LINE, not one box for the element. A trigger that wraps gets
       a bounding box spanning both lines and the full column width, which
       swallows every word beside it: the hit test then answers with whichever
       wrapped trigger comes first in the document and the last word on the
       second line can never be reached. It is also the wrong anchor - the card
       belongs above the line the cursor is actually on, not above the middle of
       a two-line block. */
    triggers.forEach(function (t) {
      var rs = t.el.getClientRects();
      t.rects = (rs.length ? [].slice.call(rs) : [t.el.getBoundingClientRect()]).map(function (r) {
        return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height };
      });
      /* the widest fragment is the one worth aiming at */
      t.r = t.rects.reduce(function (a, b) { return b.w > a.w ? b : a; }, t.rects[0]);
    });
    /* The tour aims the arrow's tip at the middle of each word, then rests
       below the copy so the preview closes once a lap - a card that never
       shuts never shows the reader that it can. */
    stops = triggers.map(function (t) { return [t.r.x + t.r.w / 2, t.r.y + t.r.h / 2]; });
    if (stops.length) {
      var lowest = triggers.reduce(function (m, t) {
        return t.rects.reduce(function (n, r) { return Math.max(n, r.y + r.h); }, m);
      }, 0);
      stops.push([W * 0.5, clamp(lowest + H * 0.22, 0, H - 4)]);
    }
    return s;
  }

  /* The card hangs above the word, clamped to the stage so a word near an edge
     does not push it out of view. */
  function place(r) {
    var w = o.width, h = o.width / (o.ratio || 1);
    return [
      clamp(r.x + r.w / 2 - w / 2, 4, Math.max(4, W - w - 4)),
      Math.max(4, r.y - o.gap - h)
    ];
  }

  function swap(h) {
    var t = h && h.t;
    /* A move between two line fragments of the SAME word re-anchors the card
       without cross-fading it - nothing changed but which line it hangs over. */
    activeRect = h && h.r;
    if (active === t) return;
    active = t;
    if (!t) { card.classList.remove("is-on"); return; }
    /* Two slots, so the outgoing content is still on screen while the new one
       fades up. The gif crossfades in place over a glide - it never blinks. */
    front = 1 - front;
    slots[front].innerHTML = "";
    slots[front].appendChild(t.content.cloneNode ? t.content.cloneNode(true) : t.content);
    slots.forEach(function (s, i) { s.classList.toggle("is-front", i === front); });
    var p = place(activeRect || t.r);
    tcx = p[0]; tcy = p[1]; tang = t.tilt;
    if (!card.classList.contains("is-on")) { cx = tcx; cy = tcy; ax = tang; paint(); }
    card.classList.add("is-on");
  }

  function paint() {
    card.style.transform = "translate3d(" + cx.toFixed(2) + "px," + cy.toFixed(2) + "px,0) rotate(" + ax.toFixed(2) + "deg)";
  }

  function hit(p) {
    if (!p) return null;
    for (var i = 0; i < triggers.length; i++) {
      var rs = triggers[i].rects;
      for (var j = 0; j < rs.length; j++) {
        var r = rs[j];
        if (p.x >= r.x - 2 && p.x <= r.x + r.w + 2 && p.y >= r.y - 2 && p.y <= r.y + r.h + 2) {
          return { t: triggers[i], r: r };
        }
      }
    }
    return null;
  }

  function frame(now) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    var dt = Math.min(64, now - last);
    last = now;
    if (dt <= 0) return;

    /* One source of truth for "where is the cursor": the arrow's own target
       when it is mounted, the real pointer when it is not. */
    var p = uc ? uc.at() : hover;
    swap(hit(p));

    if (active) {
      var ar = activeRect || active.r, q = place(ar);
      tcx = q[0]; tcy = q[1];
      if (o.parallax && p) {
        /* How far across the word the cursor is, -1..1, so the card leans
           toward the side being read rather than sitting dead centre. */
        var f = clamp((p.x - (ar.x + ar.w / 2)) / Math.max(1, ar.w / 2), -1, 1);
        tcx += f * o.parallax;
      }
      tang = active.tilt;
    }

    var k = 1 - Math.exp(-dt / o.follow);
    cx += (tcx - cx) * k; cy += (tcy - cy) * k;
    ax += (tang - ax) * k;
    paint();
  }

  function kick() {
    if (o.paused || running) return;
    running = true; last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function halt() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  /* Reduced motion: no tour, no glide, no lean. The words still work, the card
     still appears - it just appears where it belongs and stays there. */
  function still() {
    var h = hit(hover);
    swap(h);
    if (h) { var p = place(h.r); cx = p[0]; cy = p[1]; ax = 0; paint(); }
  }

  function tour(clock) {
    if (!stops.length) return null;
    return stops[Math.floor(clock / o.dwell) % stops.length];
  }

  function mountCursor() {
    if (!o.cursor || uc) return;
    uc = initUserCursor(stage, {
      height: o.height, name: o.name, accent: o.accent, size: o.size,
      autoplay: o.autoplay, compact: o.compact, paused: o.paused,
      autoPath: function (clock) { return tour(clock); }
    });
  }

  reduced = prefersReducedMotion();
  collect();
  vars();
  mountCursor();
  /* After the cursor, and before its layer: the User Cursor wraps whatever it
     finds into .mluc-content, so a card appended first would be laid out in
     that flex column instead of floating over it - and appended last it would
     paint on top of the arrow. Between the two is the only right place. */
  var arrowLayer = stage.querySelector(".mluc-layer");
  if (arrowLayer) stage.insertBefore(card, arrowLayer); else stage.appendChild(card);

  function relayout() {
    measure();
    if (!W || !H) return;
    placed = true;
    if (reduced) still();
  }
  relayout();

  on(stage, "pointermove", function (e) {
    if (e.pointerType === "touch") return;
    var s = stage.getBoundingClientRect();
    hover = { x: e.clientX - s.left, y: e.clientY - s.top };
    if (reduced) still();
  });
  on(stage, "pointerleave", function () { hover = null; if (reduced) still(); });
  on(window, "resize", function () { relayout(); });

  if (typeof IntersectionObserver !== "undefined") {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!placed && en.isIntersecting) relayout();
        if (en.isIntersecting && !reduced) kick(); else halt();
      });
    }, { rootMargin: "120px" });
    io.observe(node);
  } else if (!reduced) { kick(); }

  var mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  if (mq && mq.addEventListener) {
    on(mq, "change", function () {
      reduced = prefersReducedMotion();
      if (reduced) { halt(); still(); } else kick();
    });
  }

  var api = {
    el: node,
    update: function (next) {
      Object.assign(o, next || {});
      if (ACCENTS.indexOf(o.accent) < 0) throw new Error('initHoverPreview: unknown accent "' + o.accent + '"');
      vars();
      relayout();
      node.classList.toggle("is-paused", !!o.paused);
      /* The arrow is half the effect - pausing one without the other leaves a
         cursor touring words whose preview never opens. */
      if (uc) uc.update({ paused: !!o.paused, name: o.name, accent: o.accent, size: o.size, height: o.height });
      if (o.paused) halt(); else if (!reduced) kick();
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
      node.classList.remove("mlhp", "mlhp-sm", "is-paused");
      ["--mlhp-h", "--mlhp-w", "--mlhp-ratio"].forEach(function (v) { node.style.removeProperty(v); });
      triggers.forEach(function (t) { t.el.classList.remove("mlhp-hit"); });
      node.innerHTML = "";
      kept.forEach(function (n) { node.appendChild(n); });
      delete node.__mlHover;
      delete node.__ml;
    }
  };
  if (o.paused) { node.classList.add("is-paused"); halt(); }
  node.__mlHover = api;
  /* the handle both hosts look for */
  node.__ml = api;
  return api;
}

/* Auto-init, so a page only needs the markup and this module. */
export function mountAll(root) {
  return [].slice.call((root || document).querySelectorAll('[data-ml="hover-preview"]'))
    .map(function (n) { return initHoverPreview(n); });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { mountAll(); }, { once: true });
  } else { mountAll(); }
}
