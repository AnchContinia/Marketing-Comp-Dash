/* Continia Motion Library — Magic Transform
   Documents drift toward a lit vertical axis, shred into it, and come out the
   other side as coloured result rows, with a confetti burst on every beat.

   Built from scratch on the Continia tokens. The motion idea is the one React
   Bits Pro ships as "Magic Transform"; none of their code is used here - it is
   a paid product whose licence (§2.4) forbids putting its source in a
   repository, and this repo is public. See meta.json → brandNotes.

   Usage:
     <div data-ml="magic-transform" data-height="420"></div>
     <script type="module" src="entries/magic-transform/magic-transform.js"></script>

   Everything is procedural by default. To supply your own, put children in and
   tag them - they are templates, cloned per beat, never moved into the stage:
     <div data-ml="magic-transform">
       <div data-mt-doc>…</div>          <!-- a document that travels in   -->
       <div data-mt-result>…</div>       <!-- a row that comes out          -->
       <img data-mt-core src="…" alt=""> <!-- what sits on the axis         -->
     </div>

   Or call it yourself:
     import { initMagicTransform } from "./magic-transform.js";
     const mt = initMagicTransform(el, { docDuration: 3, particles: 24 });
     mt.update({ paused: true });
     mt.destroy(); */

import { prefersReducedMotion, durationMs, ease, stagger, distance } from "../../tokens/motion-tokens.js";

export const DEFAULTS = {
  height: 560,           /* px, the stage */

  /* Documents. The travel is a loop, not a transition, so its length is an
     option rather than a token - the duration scale tops out at 800ms by
     design and a document crossing the stage takes seconds. */
  docCount: 4,           /* procedural documents in rotation */
  docWidth: 220,
  docHeight: 320,
  docGap: 60,            /* px between documents in the queue */
  docDuration: 4,        /* seconds for one document to reach the axis */

  /* The axis */
  axis: 0.46,            /* 0-1 across the stage - where the line sits */
  axisWidth: 2,
  coreSize: 56,

  /* The transformation */
  slices: 14,            /* shred bars a document breaks into */
  particles: 18,         /* confetti per beat */
  resultCount: 5,        /* distinct result types in rotation */
  maxResults: 6,         /* how many stay on screen before the oldest leaves */

  paused: false,
  compact: false,        /* the card-sized skin: thinner bars, tighter rows */
  seed: 7                /* deterministic look - a reload is not a reshuffle */
};

var NUM = ["height", "docCount", "docWidth", "docHeight", "docGap", "docDuration",
  "axis", "axisWidth", "coreSize", "slices", "particles", "resultCount",
  "maxResults", "seed"];
var BOOL = ["paused", "compact"];

/* data-doc-width → docWidth, and only for keys we actually know */
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
  return o;
}

/* mulberry32 - small, seeded, and good enough for placement. Seeded on purpose:
   the document texture and the fan of the result rows must look the same on
   every reload, or a screenshot of the hub never matches twice. */
function rng(seed) {
  var a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* c1 is --navy, which resolves to Innovation Blue in dark mode - the same
   colour as c2. Chips and confetti cycle only the three that stay distinct on
   both themes; c1 is the axis, where nothing sits next to it to clash with. */
var CHIP = [2, 3, 4];

function el(tag, cls) {
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  return n;
}

export function initMagicTransform(node, options) {
  if (!node || node.__ml) return node && node.__ml;
  var o = Object.assign({}, DEFAULTS, fromData(node), options || {});

  if (!(o.docCount >= 1) || !(o.resultCount >= 1) || !(o.slices >= 1)) {
    throw new Error("magic-transform: docCount, resultCount and slices must all be at least 1 (" +
      (node.id || node.className || "element") + ")");
  }

  var reduced = prefersReducedMotion();

  /* The caller's children are templates, not stage furniture. They are read
     once, kept aside, and put back by destroy(). */
  var kept = [].slice.call(node.children).filter(function (n) { return n.nodeType === 1; });
  var docTpl = kept.filter(function (n) { return n.hasAttribute("data-mt-doc"); });
  var resTpl = kept.filter(function (n) { return n.hasAttribute("data-mt-result"); });
  var coreTpl = kept.filter(function (n) { return n.hasAttribute("data-mt-core"); })[0] || null;

  node.classList.add("mlmt");
  if (o.compact) node.classList.add("mlmt-sm");
  node.innerHTML = "";

  /* ---------- build ---------- */
  var stage = el("div", "mlmt-stage");
  var lane = el("div", "mlmt-lane");
  var fx = el("div", "mlmt-fx");
  var out = el("div", "mlmt-out");
  var axis = el("div", "mlmt-axis");
  var core = el("div", "mlmt-core");

  [lane, axis, fx, out, core].forEach(function (n) { n.setAttribute("aria-hidden", "true"); });
  if (coreTpl) core.appendChild(coreTpl.cloneNode(true));

  stage.appendChild(lane);
  stage.appendChild(axis);
  stage.appendChild(out);
  stage.appendChild(fx);
  stage.appendChild(core);
  node.appendChild(stage);

  /* One decorative machine. A screen reader gets a sentence, not 200 divs. */
  if (!node.hasAttribute("role")) node.setAttribute("role", "img");
  if (!node.hasAttribute("aria-label")) {
    node.setAttribute("aria-label", "Documents passing through capture and coming out as structured data");
  }

  function px(n) { return n + "px"; }
  function vars() {
    node.style.setProperty("--mlmt-h", px(o.height));
    node.style.setProperty("--mlmt-dw", px(o.docWidth));
    node.style.setProperty("--mlmt-dh", px(o.docHeight));
    node.style.setProperty("--mlmt-axis", (o.axis * 100) + "%");
    node.style.setProperty("--mlmt-line", px(o.axisWidth));
    node.style.setProperty("--mlmt-core", px(o.coreSize));
  }
  vars();

  /* ---------- procedural content ----------
     Drawn in --panel / --line / --navy so it reads on both themes and the
     entry carries no image dependency. A caller who wants real screenshots
     passes them in as [data-mt-doc] instead. */
  function buildDoc(i, rand) {
    var d = el("div", "mlmt-doc");
    d.style.width = px(o.docWidth);
    d.style.height = px(o.docHeight);

    var head = el("div", "mlmt-dline mlmt-dhead");
    head.style.width = Math.round(34 + rand() * 22) + "%";
    d.appendChild(head);

    /* every other document carries a scan block - the dense square a capture
       engine reads first. One node: the squares are box-shadows. */
    if (i % 2 === 0) d.appendChild(buildCode(rand));

    var rows = Math.max(3, Math.round(o.docHeight / 26));
    for (var r = 0; r < rows; r++) {
      if (r === Math.round(rows * 0.45) || r === rows - 2) {
        var fields = el("div", "mlmt-dfields");
        var n = 1 + (rand() > 0.5 ? 1 : 0);
        for (var f = 0; f < n; f++) {
          var chip = el("span", "mlmt-dfield");
          chip.style.width = Math.round(28 + rand() * 30) + "%";
          fields.appendChild(chip);
        }
        d.appendChild(fields);
        continue;
      }
      var line = el("div", "mlmt-dline");
      line.style.width = Math.round(48 + rand() * 46) + "%";
      d.appendChild(line);
    }
    return d;
  }

  function buildCode(rand) {
    var cell = Math.max(1, Math.round(o.docWidth / 55));
    var cols = 22, rows = 13, sh = [];
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        if (rand() > 0.46) sh.push((x * cell * 2) + "px " + (y * cell * 2) + "px 0 currentColor");
      }
    }
    var c = el("div", "mlmt-code");
    c.style.width = px(cell);
    c.style.height = px(cell);
    c.style.marginBottom = px(rows * cell * 2);
    c.style.boxShadow = sh.join(",");
    return c;
  }

  function buildResult(i, rand) {
    var r = el("div", "mlmt-res");
    r.style.setProperty("--mlmt-c", "var(--mlmt-c" + CHIP[i % CHIP.length] + ")");
    r.style.setProperty("--mlmt-tilt", (rand() * 5 - 2.5).toFixed(2) + "deg");
    r.style.marginLeft = Math.round(rand() * 26) + "px";

    var chip = el("span", "mlmt-chip");
    chip.style.width = Math.round(38 + rand() * 46) + "px";
    r.appendChild(chip);

    var bar = el("div", "mlmt-bar");
    var lines = 1 + (rand() > 0.45 ? 1 : 0);
    for (var k = 0; k < lines; k++) {
      var l = el("span", "mlmt-barline");
      l.style.width = Math.round(34 + rand() * 40) + "%";
      bar.appendChild(l);
    }
    r.appendChild(bar);
    return r;
  }

  /* Templates are built once and cloned per beat. Building 4 documents every
     four seconds would churn a few hundred nodes a minute for no reason. */
  var docs = [], results = [];
  function buildTemplates() {
    var rand = rng(o.seed);
    docs = [];
    for (var i = 0; i < Math.round(o.docCount); i++) {
      docs.push(docTpl.length ? docTpl[i % docTpl.length].cloneNode(true) : buildDoc(i, rand));
    }
    results = [];
    for (var j = 0; j < Math.round(o.resultCount); j++) {
      var r = resTpl.length ? resTpl[j % resTpl.length].cloneNode(true) : buildResult(j, rand);
      r.classList.add("mlmt-res");
      results.push(r);
    }
  }
  buildTemplates();

  /* ---------- geometry ---------- */
  var axisX = 0, travel = 0, speed = 0, docTop = 0;
  function measure() {
    var w = stage.clientWidth || node.clientWidth || 0;
    axisX = w * o.axis;
    /* a document starts fully off the left edge and stops with its right edge
       on the line, so the distance it covers is the axis position itself */
    travel = Math.max(1, axisX);
    speed = travel / Math.max(0.2, o.docDuration);
    docTop = Math.max(0, (o.height - o.docHeight) / 2);
  }
  measure();

  /* ---------- the queue ---------- */
  var live = [], beat = 0;
  var pitch = o.docWidth + o.docGap;

  function spawn(x) {
    var d = docs[beat % docs.length].cloneNode(true);
    beat++;
    d.classList.add("mlmt-doc");
    d.style.top = px(docTop);
    d.style.width = px(o.docWidth);
    d.style.height = px(o.docHeight);
    d.style.transform = "translate3d(" + x + "px,0,0)";
    lane.appendChild(d);
    live.push({ el: d, x: x });
    return d;
  }

  function fillQueue() {
    lane.innerHTML = "";
    live.length = 0;
    /* seed the lane so the first frame is already a working machine rather
       than an empty stage waiting four seconds for its first document */
    for (var x = axisX - o.docWidth; x > -o.docWidth - pitch; x -= pitch) spawn(x);
  }
  fillQueue();

  /* ---------- the transformation ---------- */
  var anims = [];
  function play(target, frames, opts) {
    if (reduced || !target.animate) return null;
    var a = target.animate(frames, opts);
    anims.push(a);
    a.addEventListener("finish", function () {
      var i = anims.indexOf(a);
      if (i > -1) anims.splice(i, 1);
    });
    return a;
  }

  function shred(rec) {
    var n = Math.round(o.slices);
    var h = o.docHeight / n;
    for (var i = 0; i < n; i++) {
      var bar = el("div", "mlmt-shred");
      bar.style.top = px(Math.round(docTop + i * h));
      bar.style.height = px(Math.max(1, Math.ceil(h - 1)));
      bar.style.left = px(Math.round(rec.x));
      bar.style.width = px(o.docWidth);
      fx.appendChild(bar);
      (function (b, i) {
        var a = play(b, [
          { transform: "translate3d(0,0,0) scaleX(1)", opacity: 1 },
          { transform: "translate3d(" + (axisX - rec.x - o.docWidth) + "px,0,0) scaleX(0)", opacity: 1 }
        ], {
          duration: durationMs.moderate,
          delay: i * stagger.tight * 1000,
          easing: ease.in,
          fill: "forwards"
        });
        if (a) a.addEventListener("finish", function () { b.remove(); });
        else b.remove();
      })(bar, i);
    }
    rec.el.remove();
  }

  /* A third of the tight stagger. 18 particles on the full 30ms would trail
     540ms behind a 800ms burst, so the last one lands after the first is gone. */
  var PARTICLE_STAGGER = stagger.tight * 1000 / 3;

  function burst() {
    var n = Math.round(o.particles);
    var rand = rng(o.seed + beat * 31);
    for (var i = 0; i < n; i++) {
      var p = el("i", "mlmt-p");
      p.style.setProperty("--mlmt-c", "var(--mlmt-c" + CHIP[i % CHIP.length] + ")");
      var s = 3 + Math.round(rand() * 4);
      p.style.width = px(s);
      p.style.height = px(s);
      p.style.left = px(Math.round(axisX));
      p.style.top = "50%";
      fx.appendChild(p);

      /* a forward-leaning cone, so the confetti reads as thrown by the axis
         rather than dropped by it */
      var ang = (rand() - 0.5) * Math.PI * 1.1;
      var dist = 40 + rand() * 150;
      var dx = Math.cos(ang) * dist * (rand() > 0.25 ? 1 : -0.4);
      var dy = Math.sin(ang) * dist;
      (function (node2) {
        var a = play(node2, [
          { transform: "translate3d(0,0,0) scale(1) rotate(0deg)", opacity: 1 },
          { transform: "translate3d(" + dx + "px," + dy + "px,0) scale(.3) rotate(" + Math.round(rand() * 220 - 110) + "deg)", opacity: 0 }
        ], {
          duration: durationMs.slower,
          delay: i * PARTICLE_STAGGER,
          easing: ease.out,
          fill: "forwards"
        });
        if (a) a.addEventListener("finish", function () { node2.remove(); });
        else node2.remove();
      })(p);
    }
  }

  function emit() {
    var r = results[beat % results.length].cloneNode(true);
    out.appendChild(r);
    play(r, [
      { transform: "translate3d(-" + Math.round(o.coreSize) + "px,0,0) scale(.72)", opacity: 0 },
      { transform: "translate3d(0,0,0) scale(1)", opacity: 1 }
    ], { duration: durationMs.moderate, easing: ease.out });

    /* A leaving row is still in the DOM until its exit finishes, so count the
       ones that are staying - otherwise the trim never settles. */
    var alive = [].slice.call(out.querySelectorAll(".mlmt-res:not(.mlmt-leaving)"));
    while (alive.length > Math.round(o.maxResults)) {
      (function (old) {
        old.classList.add("mlmt-leaving");
        var a = play(old, [
          { transform: "translate3d(0,0,0)", opacity: 1 },
          { transform: "translate3d(" + distance.lg + "px,0,0)", opacity: 0 }
        ], { duration: durationMs.base, easing: ease.in, fill: "forwards" });
        if (a) a.addEventListener("finish", function () { old.remove(); });
        else old.remove();
      })(alive.shift());
    }

    core.classList.add("is-hit");
    clearTimeout(core.__t);
    core.__t = setTimeout(function () { core.classList.remove("is-hit"); }, durationMs.moderate);
  }

  function transform(rec) {
    shred(rec);
    burst();
    emit();
  }

  /* ---------- loop ---------- */
  var raf = 0, last = 0, running = false, visible = true;

  function shouldRun() {
    if (reduced) return false;
    if (!visible || document.hidden) return false;
    return !o.paused;
  }

  function step(now) {
    raf = 0;
    var dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
    last = now;

    /* The frame already in flight when pause was called still runs once. Without
       this guard it advances the lane one last time, so a paused stage creeps. */
    if (o.paused) { running = false; last = 0; return; }

    for (var i = live.length - 1; i >= 0; i--) {
      var rec = live[i];
      rec.x += speed * dt;
      if (rec.x + o.docWidth >= axisX) {
        live.splice(i, 1);
        transform(rec);
        continue;
      }
      rec.el.style.transform = "translate3d(" + rec.x + "px,0,0)";
    }

    /* keep the queue fed: a new document enters as soon as the last one has
       moved a full pitch off the left edge */
    var tail = live.length ? live[live.length - 1] : null;
    if (!tail || tail.x >= -o.docWidth) spawn(tail ? tail.x - pitch : -o.docWidth);

    if (shouldRun()) raf = requestAnimationFrame(step);
    else { running = false; last = 0; }
  }

  function kick() {
    if (running || !shouldRun()) return;
    running = true; last = 0; raf = requestAnimationFrame(step);
  }

  /* ---------- static frame ----------
     Reduced motion gets the before and after, not the middle: one document
     parked short of the axis, the axis lit, and the result rows already out.
     A still that says what the machine does beats a blank stage. */
  function staticFrame() {
    node.classList.add("mlmt-static");
    lane.innerHTML = "";
    live.length = 0;
    var d = docs[0].cloneNode(true);
    d.classList.add("mlmt-doc");
    d.style.top = px(docTop);
    d.style.width = px(o.docWidth);
    d.style.height = px(o.docHeight);
    d.style.transform = "translate3d(" + Math.round(axisX - o.docWidth - o.docGap) + "px,0,0)";
    lane.appendChild(d);
    out.innerHTML = "";
    for (var i = 0; i < Math.min(results.length, Math.round(o.maxResults)); i++) {
      out.appendChild(results[i].cloneNode(true));
    }
  }

  /* ---------- listeners ---------- */
  var listeners = [];
  function on(target, type, fn, opts) {
    target.addEventListener(type, fn, opts);
    listeners.push([target, type, fn, opts]);
  }

  function relayout() {
    var before = axisX;
    measure();
    if (!before || !axisX) return;
    var k = axisX / before;
    live.forEach(function (rec) {
      rec.x *= k;
      rec.el.style.transform = "translate3d(" + rec.x + "px,0,0)";
    });
  }
  on(window, "resize", relayout);
  on(document, "visibilitychange", function () { if (!document.hidden) kick(); });

  var io = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible) kick();
    }, { threshold: 0.01 });
    io.observe(node);
  }

  /* The first frame is already a working machine: the lane is seeded and so is
     the result column. An empty right-hand side would mean the card, and every
     thumbnail of it, shows a stage waiting for its first beat. */
  function seedResults() {
    out.innerHTML = "";
    var n = Math.min(results.length, Math.max(0, Math.round(o.maxResults) - 1));
    for (var i = 0; i < n; i++) out.appendChild(results[i].cloneNode(true));
  }

  if (o.paused) node.classList.add("is-paused");
  if (reduced) { staticFrame(); } else { seedResults(); kick(); }

  var api = {
    el: node,
    update: function (next) {
      var was = { docCount: o.docCount, resultCount: o.resultCount, seed: o.seed };
      Object.assign(o, next || {});
      vars();
      pitch = o.docWidth + o.docGap;
      measure();
      if (was.docCount !== o.docCount || was.resultCount !== o.resultCount || was.seed !== o.seed) {
        buildTemplates();
      }
      node.classList.toggle("is-paused", !!o.paused);
      node.classList.toggle("mlmt-sm", !!o.compact);
      kick();
      return api;
    },
    /* so a host can label its own play/pause control without tracking state */
    isPaused: function () { return !!o.paused; },
    toggle: function () { return api.update({ paused: !o.paused }); },
    destroy: function () {
      if (raf) cancelAnimationFrame(raf);
      raf = 0; running = false;
      clearTimeout(core.__t);
      anims.slice().forEach(function (a) { try { a.cancel(); } catch (e) {} });
      anims.length = 0;
      listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
      listeners.length = 0;
      if (io) io.disconnect();
      node.classList.remove("mlmt", "mlmt-sm", "mlmt-static", "is-paused");
      ["--mlmt-h", "--mlmt-dw", "--mlmt-dh", "--mlmt-axis", "--mlmt-line", "--mlmt-core"]
        .forEach(function (v) { node.style.removeProperty(v); });
      node.innerHTML = "";
      kept.forEach(function (n) { node.appendChild(n); });
      delete node.__mlMagic;
      delete node.__ml;
    }
  };
  node.__mlMagic = api;
  /* the handle both hosts look for. A host renders a play/pause button for
     every component, so it cannot know the per-entry name. */
  node.__ml = api;
  return api;
}

/* Auto-init, so a page only needs the markup and this module. */
export function mountAll(root) {
  return [].slice.call((root || document).querySelectorAll('[data-ml="magic-transform"]'))
    .map(function (n) { return initMagicTransform(n); });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { mountAll(); }, { once: true });
  } else { mountAll(); }
}
