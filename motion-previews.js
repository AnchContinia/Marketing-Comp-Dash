/* Continia motion previews — GENERATED, do not hand-edit.
   Source: motion-library/library.json + the copy table in
   tools/gen-motion-previews.js. Regenerate with:
     node tools/gen-motion-previews.js
   Loaded by video.html; rendered by dashboard.js. The prompts carry the
   real token values, so a video made in Claude Design moves the same way
   the hub does. */
window.MOTION_PREVIEWS = [
  {
    "slug": "blur-in",
    "name": "Blur In",
    "category": "entrance",
    "feel": "Comes into focus from an 8px blur. Reads like a camera finding its subject.",
    "useFor": "One authored moment per video - an opening title, a product hero. It is expensive to render, so never on a list.",
    "prompt": "Bring this into focus: start at opacity 0 with an 8px blur, then resolve to sharp and fully opaque over 600ms with cubic-bezier(0.16, 1, 0.3, 1).",
    "demo": "<span class=\"mvp-title\">Continia 2026 R2</span>",
    "loops": false,
    "reducedMotion": "Duration and travel distance collapse to ~0, so the element appears in its final state."
  },
  {
    "slug": "fade-down",
    "name": "Fade Down",
    "category": "entrance",
    "feel": "Drops in from 16px above and settles.",
    "useFor": "Things that belong at the top of frame - a title card, a notification, a banner sliding down into view.",
    "prompt": "Animate this in with a fade-down: start at opacity 0 and 16px above its final position, then settle down into place over 400ms with cubic-bezier(0.16, 1, 0.3, 1).",
    "demo": "<span class=\"mvp-lower\"><b>Fade Down</b><i>Continia · Marketing</i></span>",
    "loops": false,
    "reducedMotion": "Duration and travel distance collapse to ~0, so the element appears in its final state."
  },
  {
    "slug": "fade-in",
    "name": "Fade In",
    "category": "entrance",
    "feel": "Appears out of nothing. No movement at all, so the eye is not pulled anywhere.",
    "useFor": "Anything that should arrive without drawing attention - a background plate, a caption that must not steal the shot.",
    "prompt": "Fade this in from fully transparent to fully opaque over 400ms, easing out with cubic-bezier(0.16, 1, 0.3, 1). No movement, no scale - opacity only.",
    "demo": "<span class=\"mvp-lower\"><b>Fade In</b><i>Continia · Marketing</i></span>",
    "loops": false,
    "reducedMotion": "Duration and travel distance collapse to ~0, so the element appears in its final state."
  },
  {
    "slug": "fade-up",
    "name": "Fade Up",
    "category": "entrance",
    "feel": "Rises 16px into place while fading in, and slows as it lands.",
    "useFor": "The workhorse. Lower thirds, bullet reveals, anything appearing in sequence. Stagger it and a list builds itself.",
    "prompt": "Animate this in with a fade-up: start at opacity 0 and 16px below its final position, then move up into place over 400ms with cubic-bezier(0.16, 1, 0.3, 1) so it decelerates as it settles. For a list, stagger each item by 60ms.",
    "demo": "<span class=\"mvp-lower\"><b>Fade Up</b><i>Continia · Marketing</i></span>",
    "loops": false,
    "reducedMotion": "Duration and travel distance collapse to ~0, so the element appears in its final state."
  },
  {
    "slug": "reveal-up",
    "name": "Reveal Up",
    "category": "entrance",
    "feel": "Uncovered from the bottom up, as if a mask lifts off it. The text itself never moves.",
    "useFor": "Headlines and typography. Because nothing moves, long lines stay readable the whole way through.",
    "prompt": "Reveal this upward with a mask: animate clip-path from inset(100% 0 0 0) to inset(0 0 0 0) over 600ms with cubic-bezier(0.16, 1, 0.3, 1). The element must not move or fade - only the mask travels.",
    "demo": "<span class=\"mvp-title\">Automate your AP in Business Central</span>",
    "loops": false,
    "reducedMotion": "Duration and travel distance collapse to ~0, so the element appears in its final state."
  },
  {
    "slug": "scale-in",
    "name": "Scale In",
    "category": "entrance",
    "feel": "Grows from 96% while fading in. Feels like it appeared where you were already looking.",
    "useFor": "Anything anchored to a point - a callout on a click, a tooltip, a badge popping onto a product shot.",
    "prompt": "Scale this in: start at opacity 0 and scale 0.96, then grow to full size and opacity over 400ms with cubic-bezier(0.16, 1, 0.3, 1). Keep the scale subtle - no bounce, no overshoot.",
    "demo": "<span class=\"mvp-lower\"><b>Scale In</b><i>Continia · Marketing</i></span>",
    "loops": false,
    "reducedMotion": "Duration and travel distance collapse to ~0, so the element appears in its final state."
  },
  {
    "slug": "slide-in-left",
    "name": "Slide In Left",
    "category": "entrance",
    "feel": "Travels in from the left across 32px. Reads as arriving from off-screen.",
    "useFor": "Side panels, left-anchored captions, a name plate sliding on. Pick one direction per shot and keep it.",
    "prompt": "Slide this in from the left: start at opacity 0 and translated 32px to the left, then move to its final position over 400ms with cubic-bezier(0.16, 1, 0.3, 1).",
    "demo": "<span class=\"mvp-lower\"><b>Slide In Left</b><i>Continia · Marketing</i></span>",
    "loops": false,
    "reducedMotion": "Duration and travel distance collapse to ~0, so the element appears in its final state."
  },
  {
    "slug": "slide-in-right",
    "name": "Slide In Right",
    "category": "entrance",
    "feel": "The same arrival, mirrored - in from the right.",
    "useFor": "The right-hand counterpart. Use the pair on opposing columns; never mix directions inside one list.",
    "prompt": "Slide this in from the right: start at opacity 0 and translated 32px to the right, then move to its final position over 400ms with cubic-bezier(0.16, 1, 0.3, 1).",
    "demo": "<span class=\"mvp-lower\"><b>Slide In Right</b><i>Continia · Marketing</i></span>",
    "loops": false,
    "reducedMotion": "Duration and travel distance collapse to ~0, so the element appears in its final state."
  },
  {
    "slug": "fade-out",
    "name": "Fade Out",
    "category": "exit",
    "feel": "Leaves quietly, and faster than it arrived.",
    "useFor": "Clearing a caption or a lower third. Exits are shorter than entrances on purpose - a slow exit feels like a mistake.",
    "prompt": "Fade this out from opacity 1 to 0 over 250ms, easing in with cubic-bezier(0.7, 0, 0.84, 0) so it accelerates away. Keep the exit shorter than the entrance.",
    "demo": "<span class=\"mvp-lower\"><b>Dismissed</b><i>the caption clears</i></span>",
    "loops": false,
    "reducedMotion": "Duration and travel distance collapse to ~0, so the element appears in its final state."
  },
  {
    "slug": "scale-out",
    "name": "Scale Out",
    "category": "exit",
    "feel": "Shrinks slightly as it fades. The natural undo of Scale In.",
    "useFor": "Closing whatever opened with Scale In, so the thing collapses back to where it came from.",
    "prompt": "Scale this out: animate from full size and opacity 1 to scale 0.96 and opacity 0 over 250ms with cubic-bezier(0.7, 0, 0.84, 0).",
    "demo": "<span class=\"mvp-lower\"><b>Closing</b><i>back to where it opened</i></span>",
    "loops": false,
    "reducedMotion": "Duration and travel distance collapse to ~0, so the element appears in its final state."
  },
  {
    "slug": "pulse",
    "name": "Pulse",
    "category": "attention",
    "feel": "A slow breath - dims to 70% and grows 2%, over and over.",
    "useFor": "Live state. A recording dot, a sync indicator, a 'we are on air' marker. One per screen, or it becomes wallpaper.",
    "prompt": "Give this a slow pulse loop: over 1.6s, ease-in-out with cubic-bezier(0.65, 0, 0.35, 1), go from opacity 1 and normal scale to opacity 0.7 and scale 1.02 at the halfway point, then back. Loop forever, and stop it entirely under prefers-reduced-motion.",
    "demo": "<span class=\"mvp-live\"><span class=\"mvp-dot\"></span>Recording</span>",
    "loops": true,
    "reducedMotion": "Loop stops; the element rests in its idle state."
  },
  {
    "slug": "shimmer",
    "name": "Shimmer",
    "category": "attention",
    "feel": "A light sweeps left to right across a placeholder shape.",
    "useFor": "Showing that something is loading. It is a promise that content is coming - never use it as decoration.",
    "prompt": "Add a loading shimmer: a linear-gradient sweeping horizontally across the element on a 1.4s linear loop, moving background-position from 200% to -200%. Keep the highlight subtle. Stop the loop under prefers-reduced-motion.",
    "demo": "<span class=\"mvp-skel\"></span><span class=\"mvp-skel short\"></span>",
    "loops": true,
    "reducedMotion": "Loop stops; the element rests in its idle state."
  }
];
