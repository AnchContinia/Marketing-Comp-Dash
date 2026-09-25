/* Continia Motion Library — Magic Transform
   Documents drift toward a lit vertical axis and slide in under it. On the far
   side the same document comes back out as small coloured pieces, thrown into a
   widening cone, with a confetti burst on every beat.

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
       <div data-mt-result>…</div>       <!-- a piece that is thrown out    -->
       <img data-mt-core src="…" alt=""> <!-- what sits on the axis         -->
     </div>

   Or call it yourself:
     import { initMagicTransform } from "./magic-transform.js";
     const mt = initMagicTransform(el, { docDuration: 3, particles: 24 });
     mt.update({ paused: true });
     mt.destroy(); */

import { prefersReducedMotion, durationMs, ease, stagger } from "../../tokens/motion-tokens.js";

export const DEFAULTS = {
  height: 560,           /* px, the stage */

  /* Documents. The travel is a loop, not a transition, so its length is an
     option rather than a token - the duration scale tops out at 800ms by
     design and a document crossing the stage takes seconds. */
  docCount: 4,           /* procedural documents in rotation */
  docWidth: 220,
  docHeight: 320,
  docGap: 60,            /* px between documents in the queue */
  docDuration: 4,        /* seconds for a document's leading edge to reach the axis */

  /* The axis */
  axis: 0.46,            /* 0-1 across the stage - where the line sits */
  axisWidth: 2,
  coreSize: 56,

  /* What comes out. Pieces are thrown from behind the core into a cone that
     widens with distance, so the far side reads as a spreading fan rather
     than a tidy column. */
  resultCount: 5,        /* distinct pieces in rotation */
  resultsPerBeat: 3,     /* pieces thrown each time a document goes under */
  resultLife: 4,         /* seconds from thrown to gone - a loop length, not a transition */
  resultSpread: 0.9,     /* 0-1, how much of the free space the fan reaches into */
  maxResults: 14,        /* live pieces before the oldest is dropped */
  particles: 18,         /* confetti per beat */

  paused: false,
  compact: false,        /* the card-sized skin: thinner bars, tighter pieces */
  seed: 7                /* deterministic look - a reload is not a reshuffle */
};

var NUM = ["height", "docCount", "docWidth", "docHeight", "docGap", "docDuration",
  "axis", "axisWidth", "coreSize", "resultCount", "resultsPerBeat", "resultLife",
  "resultSpread", "maxResults", "particles", "seed"];
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
   the document texture and the fan of the pieces must look the same on every
   reload, or a screenshot of the hub never matches twice. */
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
   colour as c2. Pieces and confetti cycle only the three that stay distinct on
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

  if (!(o.docCount >= 1) || !(o.resultCount >= 1) || !(o.resultsPerBeat >= 1)) {
    throw new Error("magic-transform: docCount, resultCount and resultsPerBeat must all be at least 1 (" +
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

  /* order matters: the lane is clipped at the axis and painted under it, so a
     document reads as sliding in beneath the line and the core */
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

  /* A piece is sized in px, not in flex, because it is thrown into free space
     rather than laid out in a column - and because the throw has to know how
     wide it is before it can decide how far it may travel. */
  function buildResult(i, rand) {
    var k = o.compact ? 0.5 : 1;
    var r = el("div", "mlmt-res");
    r.style.setProperty("--mlmt-c", "var(--mlmt-c" + CHIP[i % CHIP.length] + ")");

    var chip = el("span", "mlmt-chip");
    chip.style.width = Math.round((30 + rand() * 46) * k) + "px";
    r.appendChild(chip);

    var bar = el("div", "mlmt-bar");
    bar.style.width = Math.round((84 + rand() * 66) * k) + "px";
    var lines = 1 + (rand() > 0.45 ? 1 : 0);
    for (var j = 0; j < lines; j++) {
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
  var axisX = 0, speed = 0, docTop = 0, outW = 0, stageH = 0, beatSec = 1;
  function measure() {
    var w = stage.clientWidth || node.clientWidth || 0;
    stageH = stage.clientHeight || o.height;
    axisX = w * o.axis;
    outW = Math.max(40, w - axisX);
    /* docDuration is the time to the line, so the speed is the distance to it.
       A document then keeps going for its own width before it is fully under. */
    speed = Math.max(1, axisX) / Math.max(0.2, o.docDuration);
    docTop = Math.max(0, (stageH - o.docHeight) / 2);
    /* one beat per document, and a document arrives every pitch/speed seconds */
    beatSec = Math.max(0.3, (o.docWidth + o.docGap) / speed);
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
    live.push({ el: d, x: x, fired: false });
    return d;
  }

  function fillQueue() {
    lane.innerHTML = "";
    live.length = 0;
    /* seed the lane so the first frame is already a working machine rather
       than an empty stage waiting for its first document */
    for (var x = axisX - o.docWidth; x > -o.docWidth - pitch; x -= pitch) spawn(x);
  }
  fillQueue();

  /* ---------- what comes out ---------- */
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

  /* A third of the tight stagger. 18 particles on the full 30ms would trail
     540ms behind an 800ms burst, so the last one lands after the first is gone. */
  var PARTICLE_STAGGER = stagger.tight * 1000 / 3;

  /* One piece: thrown from behind the core into a rightward cone and spreading
     as it goes. It covers most of its distance in the first tenth of its life
     and then drifts, which is what makes it read as thrown rather than slid.

     The easing is per keyframe, and the animation itself is linear on purpose.
     An expo-out easing on the whole thing warps the offsets as well as the
     travel: offset 0.74 would arrive about a fifth of the way through the wall
     clock, so a piece spent four fifths of its life already faded out and the
     stage looked empty between beats. */
  function throwPiece(i, rand, phase, lane, lanes) {
    var r = results[i % results.length].cloneNode(true);
    /* Two elements, because they need two curves. The holder carries the throw
       - the travel and the tilt, fast then settling - and the piece inside it
       carries only the scale and the fade, on a gentler curve over a longer
       span. In one transform string they would share an easing, and the scale
       finished inside the first 40ms: a pop rather than something growing as
       it flies out. */
    var hold = el("div", "mlmt-throw");
    hold.style.top = px(Math.round(stageH / 2));
    hold.appendChild(r);
    out.appendChild(hold);

    /* measure once, then stay inside the stage: a piece that flies past the
       right edge is clipped, which looks like a dropped frame */
    var room = Math.max(24, outW - (hold.offsetWidth || 160) - 10);
    /* 0.78 of the half-height, not all of it: a host draws its own play/pause
       control in the top-right of the stage, and a piece at full lift lands
       under it. */
    var lift = Math.max(12, (stageH / 2 - (hold.offsetHeight || 34) / 2 - 6) * 0.78);

    /* One lane per piece in the beat, centred on the axis. A random dy stacked
       two pieces on top of each other often enough to look like a bug; lanes
       cannot, and the fan still reads because the distance is what varies. */
    var n = Math.max(1, lanes || 1);
    var dy = n === 1 ? 0 : (((lane + 0.5) / n) - 0.5) * 2 * lift;

    var reach = 0.36 + rand() * 0.64;
    var dx = Math.min(room, o.coreSize * 0.45 + reach * room * o.resultSpread);
    var rot = (rand() - 0.5) * 9;
    /* The beat is the ceiling: a piece has to be gone before the next document
       goes under, or the far side turns into a pile. resultLife is a cap on
       top of that, not a promise. */
    var life = Math.max(400, Math.min(o.resultLife, beatSec * 0.92) * 1000);

    function at(f, spin) {
      return "translate3d(" + (dx * f).toFixed(1) + "px,calc(" + (dy * f).toFixed(1) +
        "px - 50%),0) rotate(" + (rot * spin).toFixed(2) + "deg)";
    }
    var a = play(hold, [
      { offset: 0,    transform: at(0, 0),       easing: ease.out },
      { offset: 0.10, transform: at(0.45, 0.45), easing: ease.out },
      { offset: 0.40, transform: at(1, 1),       easing: "linear" },
      { offset: 0.75, transform: at(1.06, 1.1),  easing: ease.standard },
      { offset: 1,    transform: at(1.16, 1.3) }
    ], { duration: life, easing: "linear", fill: "forwards" });

    /* The scale runs over the first fifth rather than the first tenth, from
       0.74 rather than 0.5, on the standard curve rather than expo - a smaller
       distance over twice the time on a gentler ease. It is still growing while
       the holder is still travelling, which is the point. */
    var b = play(r, [
      { offset: 0,    transform: "scale(.74)", opacity: 0, easing: ease.standard },
      { offset: 0.22, transform: "scale(1)",   opacity: 1, easing: "linear" },
      { offset: 0.78, transform: "scale(1)",   opacity: 1, easing: ease.standard },
      { offset: 1,    transform: "scale(.94)", opacity: 0 }
    ], { duration: life, easing: "linear", fill: "forwards" });

    if (a) {
      /* seeding the first frame: a piece dropped in part-way through its life,
         so the stage opens mid-flow instead of with an empty right-hand side */
      if (phase) {
        try { a.currentTime = life * phase; } catch (e) {}
        try { if (b) b.currentTime = life * phase; } catch (e) {}
      }
      a.addEventListener("finish", function () { hold.remove(); });
    } else {
      /* no WAAPI (reduced motion, or a test env): park it where it would land */
      hold.style.transform = at(1, 1);
    }
    return r;
  }

  function burst(rand) {
    var n = Math.round(o.particles);
    for (var i = 0; i < n; i++) {
      var p = el("i", "mlmt-p");
      p.style.setProperty("--mlmt-c", "var(--mlmt-c" + CHIP[i % CHIP.length] + ")");
      var s = 3 + Math.round(rand() * 4);
      p.style.width = px(s);
      p.style.height = px(s);
      p.style.left = px(Math.round(axisX));
      p.style.top = "50%";
      fx.appendChild(p);

      /* the same forward cone the pieces use, but faster and shorter, so the
         confetti reads as spray off the axis rather than as more results */
      var reach = 0.2 + rand() * 0.8;
      var dx = reach * outW * 0.7;
      var dy = (rand() - 0.5) * reach * stageH * 0.8;
      (function (n2) {
        var a = play(n2, [
          { transform: "translate3d(0,0,0) scale(1) rotate(0deg)", opacity: 1 },
          { transform: "translate3d(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px,0) scale(.35) rotate(" + Math.round(rand() * 220 - 110) + "deg)", opacity: 0 }
        ], {
          duration: durationMs.slower,
          delay: i * PARTICLE_STAGGER,
          easing: ease.out,
          fill: "forwards"
        });
        if (a) a.addEventListener("finish", function () { n2.remove(); });
        else n2.remove();
      })(p);
    }
  }

  var thrown = 0;
  function emit(phase) {
    var rand = rng(o.seed + beat * 977 + thrown * 13);
    var n = Math.round(o.resultsPerBeat);
    for (var i = 0; i < n; i++) throwPiece(thrown++, rand, phase, i, n);
    burst(rand);

    /* pieces expire on their own; this is only a floor under a tab that was
       hidden mid-flight and came back with a backlog */
    while (out.children.length > Math.round(o.maxResults)) out.removeChild(out.firstElementChild);

    core.classList.add("is-hit");
    clearTimeout(core.__t);
    core.__t = setTimeout(function () { core.classList.remove("is-hit"); }, durationMs.moderate);
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
      rec.el.style.transform = "translate3d(" + rec.x + "px,0,0)";

      /* the beat is the moment the leading edge meets the line. The document
         does not stop there and is not cut up - it keeps travelling, and the
         lane's own clipped edge takes it, so it reads as sliding in under the
         axis and the core. */
      if (!rec.fired && rec.x + o.docWidth >= axisX) {
        rec.fired = true;
        emit(0);
      }
      /* fully under: none of it is on the visible side any more */
      if (rec.x >= axisX) {
        rec.el.remove();
        live.splice(i, 1);
      }
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

  function holdAnims(hold) {
    /* the pieces in flight are WAAPI animations, not rAF, so they carry on
       through a pause of the lane unless they are held with it */
    anims.slice().forEach(function (a) { try { hold ? a.pause() : a.play(); } catch (e) {} });
  }

  /* ---------- static frame ----------
     Reduced motion gets the before and after, not the middle: one document
     short of the axis, the axis lit, and the pieces already spread. A still
     that says what the machine does beats a blank stage. */
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
    var rand = rng(o.seed);
    var n = Math.round(o.resultsPerBeat);
    for (var i = 0; i < n; i++) throwPiece(i, rand, 0, i, n);
  }

  /* The first frame is already mid-flow: one beat's worth of pieces, part-way
     through their life, so the card - and every thumbnail of it - opens on a
     fan rather than on an empty right-hand side. One beat, not several: the
     far side is never meant to hold two bursts at once. */
  function seedOut() {
    out.innerHTML = "";
    emit(0.35);
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
      if (!visible) return;
      /* The thrown pieces are WAAPI, so they expire while the card is off-screen
         even though the lane is stopped. Coming back to an empty right-hand side
         is exactly what a thumbnail or a screenshot catches, so refill it. */
      if (!reduced && !out.children.length) { seedOut(); if (o.paused) holdAnims(true); }
      kick();
    }, { threshold: 0.01 });
    io.observe(node);
  }

  if (o.paused) node.classList.add("is-paused");
  if (reduced) { staticFrame(); }
  else {
    seedOut();
    /* mounted already paused: the seeded fan must hold its pose, not play out */
    if (o.paused) holdAnims(true);
    kick();
  }

  var api = {
    el: node,
    update: function (next) {
      var was = { docCount: o.docCount, resultCount: o.resultCount, seed: o.seed, compact: o.compact };
      Object.assign(o, next || {});
      vars();
      pitch = o.docWidth + o.docGap;
      measure();
      if (was.docCount !== o.docCount || was.resultCount !== o.resultCount ||
          was.seed !== o.seed || was.compact !== o.compact) {
        buildTemplates();
      }
      node.classList.toggle("is-paused", !!o.paused);
      node.classList.toggle("mlmt-sm", !!o.compact);
      holdAnims(!!o.paused);
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
