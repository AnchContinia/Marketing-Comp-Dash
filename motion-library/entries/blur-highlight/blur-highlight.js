/* Continia Motion Library — Blur Highlight
   ----------------------------------------------------------------------
   A paragraph that arrives out of focus, pulls sharp, and then draws a
   highlighter across the phrases that carry the point.

   Two beats, and the order is the whole idea: the copy has to be readable
   before anything is marked in it, or the highlight is decorating a blur.

   The motion itself is CSS on the tokens - `mlbh-blur` on the copy and
   `mlbh-wipe` on each mark, with the marks delayed past the blur. This module
   only prepares the markup, sequences the two, and owns the loop, so pausing
   is `animation-play-state` rather than a clock this file has to keep.

   Markup: whatever the author writes, with the phrases in <mark> (or any
   element carrying data-bh). <mark> is the semantic element for "highlighted
   for relevance", it needs no JS to mean that, and with this module absent the
   paragraph still reads as a highlighted paragraph rather than as nothing.

     <div data-ml="blur-highlight">
       <p>Our <mark>cutting-edge technology</mark> transforms how ...</p>
     </div>
*/

import { durationMs, prefersReducedMotion } from "../../tokens/motion-tokens.js";

export const DEFAULTS = {
  /* 0 means "whatever the copy needs" - in real copy this is a paragraph in a
     page, not a stage, and giving it a height would leave a hole under it. The
     gallery and the Video page set one so the card has something to centre. */
  height: 0,
  pad: 0,                 /* px of breathing room inside that height */
  blur: 12,               /* px the copy starts out of focus */
  rise: 0,                /* px it lifts as it sharpens - the reference does not move */
  direction: "ltr",       /* ltr | rtl | center - which way the highlighter runs */
  accent: "auto",         /* auto | blue | cyan | green | purple - palette only */
  stagger: 0,             /* ms between one mark and the next; 0 draws them together */
  gap: 60,                /* ms between the copy landing sharp and the first mark */

  /* Loop lengths in ms, so they are options rather than tokens - the duration
     scale describes transitions and tops out at 800ms. The two beats
     themselves DO come off the scale, in the stylesheet. */
  hold: 2200,             /* how long the finished paragraph stands before it replays */
  loop: true,
  autoplay: true,         /* play when it scrolls into view */
  paused: false,
  compact: false          /* the card-sized skin */
};

var NUM = ["height", "pad", "blur", "rise", "stagger", "gap", "hold"];
var BOOL = ["loop", "autoplay", "paused", "compact"];
var DIRS = ["ltr", "rtl", "center"];
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

export function initBlurHighlight(node, options) {
  if (!node) throw new Error("initBlurHighlight: no element");
  if (node.__ml) return node.__ml;

  var o = Object.assign({}, DEFAULTS, fromData(node), options || {});
  if (DIRS.indexOf(o.direction) < 0) throw new Error('initBlurHighlight: unknown direction "' + o.direction + '"');
  if (ACCENTS.indexOf(o.accent) < 0) throw new Error('initBlurHighlight: unknown accent "' + o.accent + '"');

  var kept = [].slice.call(node.childNodes);

  var stage = document.createElement("div");
  stage.className = "mlbh-stage";
  var copy = document.createElement("div");
  copy.className = "mlbh-copy";
  stage.appendChild(copy);

  /* Cloned, not moved: `kept` is what destroy() puts back, and a paragraph
     handed back without its own marks is not the markup the caller wrote. */
  kept.forEach(function (n) { copy.appendChild(n.cloneNode(true)); });

  /* The source children are read, not displayed. Left in place they stack
     above the stage and push it out of the host box. */
  node.classList.add("mlbh");
  kept.forEach(function (n) { if (n.parentNode === node) node.removeChild(n); });
  node.appendChild(stage);

  var marks = [].slice.call(copy.querySelectorAll("mark, [data-bh]"));
  marks.forEach(function (m, i) {
    m.classList.add("mlbh-mark");
    m.style.setProperty("--mlbh-i", i);
  });

  var timer = 0, io = null, listeners = [], reduced = false, playing = false;
  function on(t, e, f, opt) { t.addEventListener(e, f, opt); listeners.push([t, e, f, opt]); }

  function vars() {
    if (o.height) node.style.setProperty("--mlbh-h", o.height + "px");
    else node.style.removeProperty("--mlbh-h");
    node.style.setProperty("--mlbh-pad", o.pad + "px");
    node.style.setProperty("--mlbh-blur", o.blur + "px");
    node.style.setProperty("--mlbh-rise", o.rise + "px");
    node.style.setProperty("--mlbh-stagger", o.stagger + "ms");
    node.style.setProperty("--mlbh-gap", o.gap + "ms");
    node.setAttribute("data-dir", o.direction);
    node.setAttribute("data-accent", o.accent);
    node.classList.toggle("mlbh-sm", !!o.compact);
    node.classList.toggle("is-paused", !!o.paused);
  }

  /* ---- the sequence ----
     One lap: the copy sharpens, the marks are drawn, the paragraph stands
     finished for `hold`, and it runs again. The two beats are CSS animations
     on the duration scale; what is here is only how long the finished state
     lasts and when to start over. */
  function lap() {
    return durationMs.slow + o.gap + Math.max(0, marks.length - 1) * o.stagger +
      durationMs.slower + o.hold;
  }

  function clearTimer() { if (timer) { clearTimeout(timer); timer = 0; } }

  function play() {
    clearTimer();
    if (reduced) { node.classList.add("is-done"); node.classList.remove("is-playing"); return api; }
    node.classList.remove("is-playing", "is-done");
    /* Restarting a CSS animation needs the class off, a reflow, and the class
       on again in that order. Without the reflow the browser coalesces the two
       class changes into no change at all and the paragraph never replays -
       which looks exactly like a dead component. */
    void node.offsetWidth;
    node.classList.add("is-playing");
    playing = true;
    if (o.loop && !o.paused) timer = setTimeout(play, lap());
    return api;
  }

  function stop() { clearTimer(); playing = false; }

  reduced = prefersReducedMotion();
  vars();

  if (typeof IntersectionObserver !== "undefined") {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) { if (o.autoplay && !o.paused && !playing) play(); }
        else stop();
      });
    }, { rootMargin: "80px" });
    io.observe(node);
  } else if (o.autoplay && !o.paused) { play(); }

  var mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  if (mq && mq.addEventListener) {
    on(mq, "change", function () {
      reduced = prefersReducedMotion();
      /* Reduced motion is not "nothing happens": the paragraph is copy with
         four phrases marked in it, so it is simply already there. */
      if (reduced) { stop(); node.classList.remove("is-playing"); node.classList.add("is-done"); }
      else if (o.autoplay && !o.paused) play();
    });
  }
  if (reduced) node.classList.add("is-done");

  var api = {
    el: node,
    play: play,
    update: function (next) {
      Object.assign(o, next || {});
      if (DIRS.indexOf(o.direction) < 0) throw new Error('initBlurHighlight: unknown direction "' + o.direction + '"');
      if (ACCENTS.indexOf(o.accent) < 0) throw new Error('initBlurHighlight: unknown accent "' + o.accent + '"');
      vars();
      if (o.paused) { clearTimer(); }
      else if (o.autoplay && !playing) play();
      else if (o.loop && !timer && playing) timer = setTimeout(play, lap());
      return api;
    },
    isPaused: function () { return !!o.paused; },
    /* The pause is `animation-play-state` on the host, so the marks freeze
       part-drawn rather than snapping to an end state - and the loop timer has
       to go with it, or the paragraph restarts while it is meant to be held. */
    toggle: function () { return api.update({ paused: !o.paused }); },
    destroy: function () {
      stop();
      listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
      listeners.length = 0;
      if (io) io.disconnect();
      node.classList.remove("mlbh", "mlbh-sm", "is-paused", "is-playing", "is-done");
      node.removeAttribute("data-dir");
      node.removeAttribute("data-accent");
      ["--mlbh-h", "--mlbh-pad", "--mlbh-blur", "--mlbh-rise", "--mlbh-stagger", "--mlbh-gap"]
        .forEach(function (v) { node.style.removeProperty(v); });
      node.innerHTML = "";
      kept.forEach(function (n) { node.appendChild(n); });
      delete node.__mlBlur;
      delete node.__ml;
    }
  };
  node.__mlBlur = api;
  /* the handle both hosts look for */
  node.__ml = api;
  return api;
}

/* Auto-init, so a page only needs the markup and this module. */
export function mountAll(root) {
  return [].slice.call((root || document).querySelectorAll('[data-ml="blur-highlight"]'))
    .map(function (n) { return initBlurHighlight(n); });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { mountAll(); });
  else mountAll();
}
