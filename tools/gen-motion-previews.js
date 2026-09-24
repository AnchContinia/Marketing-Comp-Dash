/* Generates motion-previews.js from motion-library/library.json plus the
   video-facing copy below.
   The gallery in motion-library/ is written for developers - tokens, code,
   copy-paste. This file is written for the video team: what the motion feels
   like, what it is for, and a prompt they can hand to Claude Design that
   carries our real token values, so what they prompt matches what the hub
   ships. Regenerate with:  node tools/gen-motion-previews.js  */
var fs = require("fs"), path = require("path");
var R = path.join(__dirname, "..");
var lib = JSON.parse(fs.readFileSync(path.join(R, "motion-library", "library.json"), "utf8"));

/* feel   - what it reads as on screen, in plain words
   useFor - the job it is actually for
   prompt - pasteable into Claude Design; carries the token values verbatim
   demo   - the preview element */
var COPY = {
  "fade-in": {
    feel: "Appears out of nothing. No movement at all, so the eye is not pulled anywhere.",
    useFor: "Anything that should arrive without drawing attention - a background plate, a caption that must not steal the shot.",
    prompt: "Fade this in from fully transparent to fully opaque over 400ms, easing out with cubic-bezier(0.16, 1, 0.3, 1). No movement, no scale - opacity only."
  },
  "fade-up": {
    feel: "Rises 16px into place while fading in, and slows as it lands.",
    useFor: "The workhorse. Lower thirds, bullet reveals, anything appearing in sequence. Stagger it and a list builds itself.",
    prompt: "Animate this in with a fade-up: start at opacity 0 and 16px below its final position, then move up into place over 400ms with cubic-bezier(0.16, 1, 0.3, 1) so it decelerates as it settles. For a list, stagger each item by 60ms."
  },
  "fade-down": {
    feel: "Drops in from 16px above and settles.",
    useFor: "Things that belong at the top of frame - a title card, a notification, a banner sliding down into view.",
    prompt: "Animate this in with a fade-down: start at opacity 0 and 16px above its final position, then settle down into place over 400ms with cubic-bezier(0.16, 1, 0.3, 1)."
  },
  "slide-in-left": {
    feel: "Travels in from the left across 32px. Reads as arriving from off-screen.",
    useFor: "Side panels, left-anchored captions, a name plate sliding on. Pick one direction per shot and keep it.",
    prompt: "Slide this in from the left: start at opacity 0 and translated 32px to the left, then move to its final position over 400ms with cubic-bezier(0.16, 1, 0.3, 1)."
  },
  "slide-in-right": {
    feel: "The same arrival, mirrored - in from the right.",
    useFor: "The right-hand counterpart. Use the pair on opposing columns; never mix directions inside one list.",
    prompt: "Slide this in from the right: start at opacity 0 and translated 32px to the right, then move to its final position over 400ms with cubic-bezier(0.16, 1, 0.3, 1)."
  },
  "scale-in": {
    feel: "Grows from 96% while fading in. Feels like it appeared where you were already looking.",
    useFor: "Anything anchored to a point - a callout on a click, a tooltip, a badge popping onto a product shot.",
    prompt: "Scale this in: start at opacity 0 and scale 0.96, then grow to full size and opacity over 400ms with cubic-bezier(0.16, 1, 0.3, 1). Keep the scale subtle - no bounce, no overshoot."
  },
  "blur-in": {
    feel: "Comes into focus from an 8px blur. Reads like a camera finding its subject.",
    useFor: "One authored moment per video - an opening title, a product hero. It is expensive to render, so never on a list.",
    prompt: "Bring this into focus: start at opacity 0 with an 8px blur, then resolve to sharp and fully opaque over 600ms with cubic-bezier(0.16, 1, 0.3, 1)."
  },
  "reveal-up": {
    feel: "Uncovered from the bottom up, as if a mask lifts off it. The text itself never moves.",
    useFor: "Headlines and typography. Because nothing moves, long lines stay readable the whole way through.",
    prompt: "Reveal this upward with a mask: animate clip-path from inset(100% 0 0 0) to inset(0 0 0 0) over 600ms with cubic-bezier(0.16, 1, 0.3, 1). The element must not move or fade - only the mask travels."
  },
  "fade-out": {
    feel: "Leaves quietly, and faster than it arrived.",
    useFor: "Clearing a caption or a lower third. Exits are shorter than entrances on purpose - a slow exit feels like a mistake.",
    prompt: "Fade this out from opacity 1 to 0 over 250ms, easing in with cubic-bezier(0.7, 0, 0.84, 0) so it accelerates away. Keep the exit shorter than the entrance."
  },
  "scale-out": {
    feel: "Shrinks slightly as it fades. The natural undo of Scale In.",
    useFor: "Closing whatever opened with Scale In, so the thing collapses back to where it came from.",
    prompt: "Scale this out: animate from full size and opacity 1 to scale 0.96 and opacity 0 over 250ms with cubic-bezier(0.7, 0, 0.84, 0)."
  },
  "pulse": {
    feel: "A slow breath - dims to 70% and grows 2%, over and over.",
    useFor: "Live state. A recording dot, a sync indicator, a 'we are on air' marker. One per screen, or it becomes wallpaper.",
    prompt: "Give this a slow pulse loop: over 1.6s, ease-in-out with cubic-bezier(0.65, 0, 0.35, 1), go from opacity 1 and normal scale to opacity 0.7 and scale 1.02 at the halfway point, then back. Loop forever, and stop it entirely under prefers-reduced-motion."
  },
  "shimmer": {
    feel: "A light sweeps left to right across a placeholder shape.",
    useFor: "Showing that something is loading. It is a promise that content is coming - never use it as decoration.",
    prompt: "Add a loading shimmer: a linear-gradient sweeping horizontally across the element on a 1.4s linear loop, moving background-position from 200% to -200%. Keep the highlight subtle. Stop the loop under prefers-reduced-motion."
  }
};

/* Preview elements, sized for a big stage rather than the gallery's thumbnail. */
var DEMO = {
  "reveal-up":  '<span class="mvp-title">Automate your AP in Business Central</span>',
  "blur-in":    '<span class="mvp-title">Continia 2026 R2</span>',
  "pulse":      '<span class="mvp-live"><span class="mvp-dot"></span>Recording</span>',
  "shimmer":    '<span class="mvp-skel"></span><span class="mvp-skel short"></span>',
  "fade-out":   '<span class="mvp-lower"><b>Dismissed</b><i>the caption clears</i></span>',
  "scale-out":  '<span class="mvp-lower"><b>Closing</b><i>back to where it opened</i></span>'
};
function demoFor(slug, name) {
  if (DEMO[slug]) return DEMO[slug];
  return '<span class="mvp-lower"><b>' + name + '</b><i>Continia · Marketing</i></span>';
}

var out = lib.map(function (e) {
  var c = COPY[e.slug];
  if (!c) { console.error("No video-facing copy for " + e.slug); process.exit(1); }
  return {
    slug: e.slug, name: e.name, category: e.category,
    feel: c.feel, useFor: c.useFor, prompt: c.prompt,
    demo: demoFor(e.slug, e.name),
    loops: e.slug === "pulse" || e.slug === "shimmer",
    reducedMotion: e.reducedMotion
  };
});
var extra = Object.keys(COPY).filter(function (k) {
  return !lib.some(function (e) { return e.slug === k; });
});
if (extra.length) { console.error("Copy written for slugs not in library.json: " + extra); process.exit(1); }

var head =
  "/* Continia motion previews — GENERATED, do not hand-edit.\n" +
  "   Source: motion-library/library.json + the copy table in\n" +
  "   tools/gen-motion-previews.js. Regenerate with:\n" +
  "     node tools/gen-motion-previews.js\n" +
  "   Loaded by video.html; rendered by dashboard.js. The prompts carry the\n" +
  "   real token values, so a video made in Claude Design moves the same way\n" +
  "   the hub does. */\n";
fs.writeFileSync(path.join(R, "motion-previews.js"),
  head + "window.MOTION_PREVIEWS = " + JSON.stringify(out, null, 2) + ";\n");
console.log("motion-previews.js: " + out.length + " previews");
