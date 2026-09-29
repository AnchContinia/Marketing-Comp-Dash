/* Continia Motion Library — Modal Cards
   A row of cards where one opens into the stage instead of a dialog opening
   over it. The card you click is the card that grows: it leaves the grid, takes
   the whole stage, its title grows with it and its body fades in underneath,
   while the rest of the row dims away behind a scrim. Closing runs the same
   move backwards, and faster.

   Built from scratch on the Continia tokens. The motion idea is the one React
   Bits Pro ships as "Modal Cards"; none of their code is used here - it is a
   paid product whose licence (§2.4) forbids putting its source in a repository,
   and this repo is public. See meta.json → brandNotes.

   The arrow is the library's own User Cursor, mounted rather than redrawn, per
   the pointer-demo rule in CLAUDE.md: an entry about clicking has to show the
   click. The tour walks to a card's open button, presses it, reads the card,
   walks to the close button and presses that. Hit-testing and the presses both
   read the cursor's own at(), so the arrow is never somewhere other than where
   the thing it just clicked is.

   Usage:
     <div data-ml="modal-cards" data-height="360">
       <article>
         <img src="…" alt="">
         <h3>Document Capture</h3>
         <p>Shown when the card is open.</p>
       </article>
       …
     </div>
     <script type="module" src="entries/modal-cards/modal-cards.js"></script>

   A card is any direct child element. The first <img> or [data-mc-media] child
   becomes the media, the first heading the title, and the first <p> the body -
   so the markup stays readable without this module, and readable to a crawler.

   Or call it yourself:
     import { initModalCards } from "./modal-cards.js";
     const mc = initModalCards(el, { open: 1 });
     mc.update({ paused: true });
     mc.destroy(); */

import { prefersReducedMotion, durationMs } from "../../tokens/motion-tokens.js";
import { initUserCursor } from "../user-cursor/user-cursor.js";

export const DEFAULTS = {
  height: 360,            /* px, the stage */
  columns: 3,             /* cards per row */
  gap: 16,                /* px between cards */
  pad: 18,                /* px, the stage's own inset - also the open card's margin */

  /* Measured off the reference: the card takes about 250ms to grow into the
     stage and about 150ms to fall back into the row. Opening is the move that
     has to be read, closing is the one that has to get out of the way, so they
     are deliberately not the same length. */
  openMs: durationMs.base,    /* 250ms */
  closeMs: durationMs.fast,   /* 150ms */

  /* The self-driving tour, in ms. Loop lengths, so they are options rather
     than tokens. */
  reach: 950,             /* travelling to a button, and settling on it */
  hold: 1900,             /* how long an opened card stays open */
  rest: 750,              /* the beat after closing, before the next card */

  cursor: true,           /* mount the library's User Cursor on the stage */
  name: "Sophie",
  accent: "auto",         /* auto | blue | cyan | green | purple - palette only */
  size: 22,
  autoplay: true,         /* run the tour when no pointer is on the stage */
  paused: false,
  compact: false          /* the card-sized skin */
};

var NUM = ["height", "columns", "gap", "pad", "openMs", "closeMs", "reach", "hold", "rest", "size"];
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

var PLUS = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
  '<path d="M8 3.4v9.2M3.4 8h9.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
var CROSS = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
  '<path d="M4.4 4.4l7.2 7.2M11.6 4.4l-7.2 7.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

export function initModalCards(node, options) {
  if (!node || node.nodeType !== 1) throw new Error("initModalCards: needs an element");
  /* Both hosts call mountAll after the cards exist and the module auto-inits on
     import, so every mount is init'd twice. */
  if (node.__ml) return node.__ml;

  var o = Object.assign({}, DEFAULTS, fromData(node), options || {});
  if (ACCENTS.indexOf(o.accent) < 0) {
    throw new Error('initModalCards: accent "' + o.accent + '" is not one of ' + ACCENTS.join(", ") +
      " - the palette is deliberate, add a token rather than a hex here");
  }
  if (!(o.reach > 0) || !(o.hold > 0) || !(o.rest > 0)) throw new Error("initModalCards: reach/hold/rest must be > 0");

  var kept = [].slice.call(node.childNodes);

  /* The User Cursor wraps whatever it is mounted on and parks its handle on
     el.__ml - the one name both hosts read - so it gets a stage of its own
     inside this node rather than the node itself. */
  var stage = document.createElement("div");
  stage.className = "mlmc-stage";

  var scrim = document.createElement("div");
  scrim.className = "mlmc-scrim";

  var grid = document.createElement("div");
  grid.className = "mlmc-grid";

  /* Each source child becomes a card. The markup is read rather than required:
     whatever it holds, the first image is the media, the first heading the
     title and the first paragraph the body, so the source stays a readable
     list of articles with this module removed. */
  var cards = kept.filter(function (n) { return n.nodeType === 1; }).map(function (src, i) {
    var el = document.createElement("article");
    el.className = "mlmc-card";
    el.tabIndex = 0;

    var media = document.createElement("div");
    media.className = "mlmc-media";
    var m = src.querySelector("[data-mc-media]") || src.querySelector("img") || src.querySelector("picture, video");
    /* cloned, not moved: `kept` is what destroy() puts back, and a source
       article handed back without its own picture is not the markup the
       caller wrote */
    if (m) media.appendChild(m.cloneNode(true));

    var bar = document.createElement("div");
    bar.className = "mlmc-bar";
    var h = src.querySelector("h1,h2,h3,h4,h5,h6,[data-mc-title]");
    var title = document.createElement("span");
    title.className = "mlmc-title";
    title.textContent = h ? h.textContent.trim() : "Card " + (i + 1);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mlmc-btn";
    btn.innerHTML = PLUS;
    btn.setAttribute("aria-label", "Open " + title.textContent);

    bar.appendChild(title);
    bar.appendChild(btn);

    var body = document.createElement("div");
    body.className = "mlmc-body";
    var pEl = src.querySelector("[data-mc-body]") || src.querySelector("p");
    if (pEl) body.appendChild(pEl.cloneNode(true));

    /* the bar belongs to the media, not to the card: hung off the card it
       stays pinned to the bottom edge and, once the card is open and the body
       has appeared underneath, prints the title straight over it */
    media.appendChild(bar);
    el.appendChild(media);
    el.appendChild(body);
    grid.appendChild(el);
    return { el: el, btn: btn, title: title.textContent, i: i };
  });

  node.classList.add("mlmc");
  /* The source children are read, not displayed. Left in place they stack
     above the stage and push it out of the host box - which is how the demo
     first rendered: three empty articles, and a grid clipped off the bottom
     of the gallery card. */
  kept.forEach(function (n) { if (n.parentNode === node) node.removeChild(n); });
  node.appendChild(stage);
  stage.appendChild(scrim);
  stage.appendChild(grid);

  var openIdx = -1, W = 0, H = 0, uc = null, io = null, listeners = [],
      raf = 0, last = 0, clock = 0, running = false, reduced = false, placed = false,
      step = -1;

  function on(t, e, f, opt) { t.addEventListener(e, f, opt); listeners.push([t, e, f, opt]); }

  function vars() {
    node.style.setProperty("--mlmc-h", o.height + "px");
    node.style.setProperty("--mlmc-cols", o.columns);
    node.style.setProperty("--mlmc-gap", o.gap + "px");
    node.style.setProperty("--mlmc-pad", o.pad + "px");
    node.classList.toggle("mlmc-sm", !!o.compact);
  }

  function measure() {
    var r = stage.getBoundingClientRect();
    W = r.width; H = r.height;
    return r;
  }

  /* The morph is FLIP, not a scale. The open card is taken out of the grid and
     laid over the stage at its real size; the transform that puts it back where
     it was is then removed over one duration. Done as a scale instead, the
     corner radius would turn into an ellipse - the card is 3.2x wider open but
     only 1.9x taller - and the body text would arrive stretched. The title is
     the one thing that does grow, and it grows on font-size, which is a
     property and not a transform, so it stays crisp the whole way. */
  function flip(cardEl, toOpen, ms) {
    var first = cardEl.getBoundingClientRect();
    /* per element, not per component: opening one card while another is open
       runs two of these in the same frame, and a single shared timer would
       leave the first card wearing an inline transform for good */
    if (cardEl.__mcMorph) { clearTimeout(cardEl.__mcMorph); cardEl.__mcMorph = 0; }
    cardEl.style.transition = "none";
    cardEl.style.transform = "none";
    node.classList.toggle("is-open", toOpen);
    cardEl.classList.toggle("is-open", toOpen);
    var lastR = cardEl.getBoundingClientRect();
    var sx = first.width / lastR.width, sy = first.height / lastR.height;
    cardEl.style.transformOrigin = "0 0";
    cardEl.style.transform = "translate(" + (first.left - lastR.left) + "px," + (first.top - lastR.top) +
      "px) scale(" + sx + "," + sy + ")";
    /* read, so the browser keeps the inverted frame instead of coalescing it */
    void cardEl.offsetWidth;
    cardEl.style.transition = "transform " + ms + "ms var(--motion-ease-out)";
    cardEl.style.transform = "none";
    cardEl.__mcMorph = setTimeout(function () {
      cardEl.style.transition = "";
      cardEl.style.transform = "";
      cardEl.style.transformOrigin = "";
      cardEl.__mcMorph = 0;
    }, ms + 40);
  }

  function open(i) {
    if (i === openIdx || !cards[i]) return;
    if (openIdx >= 0) close();
    openIdx = i;
    cards[i].btn.innerHTML = CROSS;
    cards[i].btn.setAttribute("aria-label", "Close " + cards[i].title);
    if (reduced) { node.classList.add("is-open"); cards[i].el.classList.add("is-open"); return; }
    flip(cards[i].el, true, o.openMs);
  }

  function close() {
    if (openIdx < 0) return;
    var c = cards[openIdx];
    openIdx = -1;
    c.btn.innerHTML = PLUS;
    c.btn.setAttribute("aria-label", "Open " + c.title);
    if (reduced) { node.classList.remove("is-open"); c.el.classList.remove("is-open"); return; }
    flip(c.el, false, o.closeMs);
  }

  /* ---- the tour ----
     One card's turn is four beats: walk to its open button, press, read, walk
     to the close button and press that. The point is returned in the cursor's
     tip coordinates; the presses fire on the beat boundary, which is why the
     step index is tracked rather than derived fresh every frame. */
  function lap() { return o.reach + o.hold + o.reach + o.rest; }

  function centre(el) {
    var s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
    return [r.left - s.left + r.width / 2, r.top - s.top + r.height / 2];
  }

  function tourPoint() {
    if (!cards.length) return null;
    var per = lap(), i = Math.floor(clock / per) % cards.length, t = clock % per;
    var c = cards[i];
    if (t < o.reach) return centre(c.btn);                       /* walk to the open button */
    if (t < o.reach + o.hold) return centre(c.el);               /* drift over the open card */
    if (t < o.reach + o.hold + o.reach) return centre(c.btn);    /* the button is now the X */
    return [W * 0.5, H - Math.max(18, H * 0.12)];                /* step back for a beat */
  }

  function tourStep() {
    if (!cards.length) return -1;
    var per = lap(), i = Math.floor(clock / per) % cards.length, t = clock % per;
    var phase = t < o.reach ? 0 : t < o.reach + o.hold ? 1 : t < o.reach + o.hold + o.reach ? 2 : 3;
    return i * 4 + phase;
  }

  function advance() {
    var s = tourStep();
    if (s === step) return;
    step = s;
    var i = Math.floor(s / 4), phase = s % 4;
    /* phase 1 begins the moment the cursor has reached the open button, phase 3
       the moment it has reached the close button - so a press lands on each. */
    if (phase === 1) { if (uc) uc.press(); open(i); }
    else if (phase === 3) { if (uc) uc.press(); close(); }
  }

  function frame(now) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    var dt = Math.min(64, now - last);
    last = now;
    if (dt <= 0) return;
    if (uc && uc.at().mode === "pointer") return;   /* a real pointer owns it */
    clock += dt;
    advance();
  }

  function kick() {
    if (o.paused || running || reduced || !o.autoplay) return;
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
  /* after the cursor, and before its layer: appended first the scrim and grid
     would be laid out inside the cursor's own flex column, appended last they
     would paint over the arrow */
  var arrowLayer = stage.querySelector(".mluc-layer");
  if (arrowLayer) { stage.insertBefore(scrim, arrowLayer); stage.insertBefore(grid, arrowLayer); }

  cards.forEach(function (c) {
    on(c.btn, "click", function (e) {
      e.preventDefault(); e.stopPropagation();
      if (uc) uc.press();
      if (openIdx === c.i) close(); else open(c.i);
    });
    on(c.el, "keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (openIdx === c.i) close(); else open(c.i); }
      else if (e.key === "Escape") close();
    });
  });
  on(scrim, "click", function () { close(); });

  function relayout() { measure(); if (W && H) placed = true; }
  relayout();
  on(window, "resize", relayout);

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
      if (reduced) { halt(); close(); } else kick();
    });
  }

  var api = {
    el: node,
    open: function (i) { open(i); return api; },
    close: function () { close(); return api; },
    update: function (next) {
      Object.assign(o, next || {});
      if (ACCENTS.indexOf(o.accent) < 0) throw new Error('initModalCards: unknown accent "' + o.accent + '"');
      vars();
      relayout();
      node.classList.toggle("is-paused", !!o.paused);
      /* The arrow is half the effect - pausing one without the other leaves a
         cursor pressing buttons whose cards never open. */
      if (uc) uc.update({ paused: !!o.paused, name: o.name, accent: o.accent, size: o.size, height: o.height });
      if (o.paused) halt(); else kick();
      return api;
    },
    isPaused: function () { return !!o.paused; },
    toggle: function () { return api.update({ paused: !o.paused }); },
    destroy: function () {
      halt();
      cards.forEach(function (c) { if (c.el.__mcMorph) clearTimeout(c.el.__mcMorph); });
      listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
      listeners.length = 0;
      if (io) io.disconnect();
      if (uc) uc.destroy();
      uc = null;
      node.classList.remove("mlmc", "mlmc-sm", "is-open", "is-paused");
      ["--mlmc-h", "--mlmc-cols", "--mlmc-gap", "--mlmc-pad"].forEach(function (v) { node.style.removeProperty(v); });
      node.innerHTML = "";
      kept.forEach(function (n) { node.appendChild(n); });
      delete node.__mlModal;
      delete node.__ml;
    }
  };
  if (o.paused) { node.classList.add("is-paused"); halt(); }
  node.__mlModal = api;
  /* the handle both hosts look for */
  node.__ml = api;
  return api;
}

/* Auto-init, so a page only needs the markup and this module. */
export function mountAll(root) {
  return [].slice.call((root || document).querySelectorAll('[data-ml="modal-cards"]'))
    .map(function (n) { return initModalCards(n); });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { mountAll(); }, { once: true });
  } else { mountAll(); }
}
