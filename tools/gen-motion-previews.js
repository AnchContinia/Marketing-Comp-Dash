/* Generates motion-previews.js from motion-library/library.json plus the
   video-facing copy below.
   The gallery in motion-library/ is written for developers - tokens, code,
   copy-paste. This file is written for the video team: what the motion feels
   like, what it is for, and a prompt they can hand to Claude Design that
   carries our real token values, so what they prompt matches what the hub
   ships. Regenerate with:  node tools/gen-motion-previews.js

   Token values, so the prompts below can be checked against them:
     instant 100ms · fast 150ms · base 250ms · moderate 400ms · slow 600ms · slower 800ms
     ease-standard cubic-bezier(0.2, 0, 0, 1)    ease-out cubic-bezier(0.16, 1, 0.3, 1)
     ease-in cubic-bezier(0.7, 0, 0.84, 0)       ease-in-out cubic-bezier(0.65, 0, 0.35, 1)
     distance sm 8px · md 16px · lg 32px         stagger tight 30ms · base 60ms · loose 100ms */
var fs = require("fs"), path = require("path");
var R = path.join(__dirname, "..");
var lib = JSON.parse(fs.readFileSync(path.join(R, "motion-library", "library.json"), "utf8"));

/* feel   - what it reads as on screen, in plain words
   useFor - the job it is actually for
   prompt - pasteable into Claude Design; carries the token values verbatim */
var COPY = {
  /* ---------- entrance ---------- */
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
  "zoom-in": {
    feel: "Comes forward from half size. Much louder than Scale In - it reads as flying at you.",
    useFor: "A single number, a price, a claim that has to land. One per sequence; on a list it is motion sickness.",
    prompt: "Zoom this in: start at opacity 0 and scale 0.5, then grow to full size and opacity over 400ms with cubic-bezier(0.16, 1, 0.3, 1). Scale from the centre, and do not overshoot past 1."
  },
  "bounce-in": {
    feel: "Arrives at 70%, overshoots to 104%, dips to 98% and settles. The only entrance here that overshoots.",
    useFor: "Confirmations - a tick, a 'done', a success badge. The overshoot is what makes it read as a reward.",
    prompt: "Bounce this in over 600ms with cubic-bezier(0.2, 0, 0, 1): at 0% opacity 0 and scale 0.7, at 60% opacity 1 and scale 1.04, at 80% scale 0.98, at 100% scale 1. The overshoot must be small - 1.04, not 1.2."
  },
  "flip-in-x": {
    feel: "Turns in around its horizontal axis in 3D, like a card flipping face-up on a table.",
    useFor: "Swapping one card for another in the same spot, or revealing a result. Needs perspective or it looks flat.",
    prompt: "Flip this in around the X axis: start at opacity 0 and transform perspective(800px) rotateX(-90deg), end at opacity 1 and rotateX(0), over 600ms with cubic-bezier(0.16, 1, 0.3, 1). Keep the perspective value on the element itself."
  },
  "flip-in-y": {
    feel: "The same 3D turn, around the vertical axis instead.",
    useFor: "The other half of a two-sided card. Use X and Y consistently - one axis per idea, not both in one shot.",
    prompt: "Flip this in around the Y axis: start at opacity 0 and transform perspective(800px) rotateY(-90deg), end at opacity 1 and rotateY(0), over 600ms with cubic-bezier(0.16, 1, 0.3, 1)."
  },
  "rotate-in": {
    feel: "Swings in from -45 degrees while growing from 90%. Deliberately restrained - a full spin reads as a toy.",
    useFor: "A badge, a stamp, a seal landing on something. Rotation is loud, so it needs a reason.",
    prompt: "Rotate this in: start at opacity 0 with transform rotate(-45deg) scale(0.9), end at opacity 1 and no transform, over 600ms with cubic-bezier(0.16, 1, 0.3, 1). Do not use a full 360 - stop at 45 degrees."
  },
  "swirl-in": {
    feel: "Half a turn plus a scale from 40%. A flourish, and it knows it.",
    useFor: "One moment in a whole video - a logo sting, an end card. Never on anything the viewer has to read quickly.",
    prompt: "Swirl this in: start at opacity 0 with transform rotate(-180deg) scale(0.4), end at opacity 1 and no transform, over 600ms with cubic-bezier(0.16, 1, 0.3, 1)."
  },
  "roll-in": {
    feel: "Rolls in from off-screen left, rotating as it travels.",
    useFor: "Something that should feel physical - an icon rolling into a row, a coin, a stamp. Pair it with Roll Out.",
    prompt: "Roll this in from the left: start at opacity 0 with transform translateX(-96px) rotate(-120deg), end at opacity 1 with no transform, over 600ms with cubic-bezier(0.16, 1, 0.3, 1)."
  },
  "back-in-up": {
    feel: "Rises into frame small, holds at 70%, then comes forward to full size. Reads as stepping out from behind the frame.",
    useFor: "A card entering a stack, or an element that should feel like it was already there and has come to the front.",
    prompt: "Bring this in from behind: over 600ms with cubic-bezier(0.16, 1, 0.3, 1), at 0% opacity 0 and transform translateY(96px) scale(0.7), at 70% opacity 1 and translateY(0) scale(0.7), at 100% no transform. The hold at 70% is what sells it - do not smooth it out."
  },
  "tilt-in": {
    feel: "Leans back on the vertical axis and pushes forward in Z. A 3D lean rather than a flip.",
    useFor: "Screenshots, device shots, anything that should read as a physical object angled toward the viewer.",
    prompt: "Tilt this in: start at opacity 0 with transform perspective(800px) rotateY(-24deg) translateZ(-120px), end at opacity 1 with rotateY(0) translateZ(0), over 600ms with cubic-bezier(0.16, 1, 0.3, 1)."
  },
  "puff-in": {
    feel: "Contracts from double size out of a blur. Materialises rather than arrives.",
    useFor: "A result appearing - an OCR read, a match found. It reads as 'this was computed', not 'this moved here'.",
    prompt: "Puff this in: start at opacity 0 with transform scale(2) and filter blur(4px), end at opacity 1 with no transform and no blur, over 600ms with cubic-bezier(0.16, 1, 0.3, 1)."
  },
  "slide-in-blurred": {
    feel: "Travels up with a motion-blur streak, stretched vertically, then snaps back into shape.",
    useFor: "A single hero element. It is the most expensive thing in this set - blur plus a non-uniform scale - so one per video.",
    prompt: "Slide this in with motion blur: start at opacity 0 with transform translateY(64px) scaleY(2.4) scaleX(0.7) and filter blur(12px), end at opacity 1 with no transform and no blur, over 600ms with cubic-bezier(0.16, 1, 0.3, 1). The stretch is the streak - keep scaleY well above scaleX."
  },
  "light-speed-in": {
    feel: "Skews in from the right at speed, overshoots the skew the other way, then straightens.",
    useFor: "Speed claims - instant posting, real-time sync. Built on the short duration on purpose; slowing it kills the idea.",
    prompt: "Bring this in at light speed over 250ms with cubic-bezier(0.16, 1, 0.3, 1): at 0% opacity 0 and transform translateX(96px) skewX(-20deg), at 60% opacity 1 and skewX(8deg), at 100% no transform. Keep it short - this one must feel fast."
  },

  /* ---------- exit ---------- */
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
  "zoom-out": {
    feel: "Collapses to half size while fading. The undo of Zoom In.",
    useFor: "Dismissing whatever zoomed in. Match the pair - a zoom in that fades out slowly reads as two unrelated moves.",
    prompt: "Zoom this out: animate from full size and opacity 1 to scale 0.5 and opacity 0 over 250ms with cubic-bezier(0.7, 0, 0.84, 0)."
  },
  "flip-out-x": {
    feel: "Turns away around the horizontal axis until it is edge-on and gone.",
    useFor: "Swapping two cards in one spot: flip one out, flip the next one in. Half a turn each, never a full one.",
    prompt: "Flip this out around the X axis: animate from opacity 1 and perspective(800px) rotateX(0) to opacity 0 and rotateX(90deg) over 400ms with cubic-bezier(0.7, 0, 0.84, 0)."
  },
  "slide-out-left": {
    feel: "Leaves to the left across 32px while fading.",
    useFor: "Dismissing a panel out the side it came in. Sending it out the other side makes the viewer lose the thread.",
    prompt: "Slide this out to the left: animate from opacity 1 and no transform to opacity 0 and translateX(-32px) over 250ms with cubic-bezier(0.7, 0, 0.84, 0)."
  },
  "slide-out-right": {
    feel: "The mirrored departure, out to the right.",
    useFor: "The counterpart to Slide In Left. Keep the pair consistent across a whole sequence.",
    prompt: "Slide this out to the right: animate from opacity 1 and no transform to opacity 0 and translateX(32px) over 250ms with cubic-bezier(0.7, 0, 0.84, 0)."
  },
  "roll-out": {
    feel: "Rolls off to the right, rotating as it goes.",
    useFor: "The undo of Roll In, for the same physical objects. Use them as a pair or not at all.",
    prompt: "Roll this out to the right: animate from opacity 1 and no transform to opacity 0 and transform translateX(96px) rotate(120deg) over 400ms with cubic-bezier(0.7, 0, 0.84, 0)."
  },
  "puff-out": {
    feel: "Expands to double size into a blur and is gone. Dissolves rather than leaves.",
    useFor: "Clearing a computed result. Pairs with Puff In; on its own it reads as an error.",
    prompt: "Puff this out: animate from opacity 1, no transform and no blur to opacity 0, scale(2) and filter blur(4px) over 400ms with cubic-bezier(0.7, 0, 0.84, 0)."
  },
  "back-out-down": {
    feel: "Drops to 70% where it stands, waits, then falls out of frame.",
    useFor: "The undo of Back In Up - a card going back into the stack it came from.",
    prompt: "Send this back and down over 400ms with cubic-bezier(0.65, 0, 0.35, 1): at 0% opacity 1 and no transform, at 30% opacity 1 and scale(0.7), at 100% opacity 0 and transform translateY(96px) scale(0.7)."
  },
  "blur-out": {
    feel: "Loses focus as it fades, like the camera pulling off it.",
    useFor: "The exit half of a Blur In hero moment. Both are expensive - use them once, together.",
    prompt: "Blur this out: animate from opacity 1 and no filter to opacity 0 and filter blur(8px) over 250ms with cubic-bezier(0.7, 0, 0.84, 0)."
  },

  /* ---------- attention (one-shot) ---------- */
  "bounce": {
    feel: "One vertical hop, 32px up and back with a small second beat. Then it is still again.",
    useFor: "Pointing at something that just changed. It fires once - if it loops, it stops being a signal.",
    prompt: "Bounce this once over 600ms with cubic-bezier(0.65, 0, 0.35, 1): at 0% and 100% no transform, at 40% translateY(-32px), at 60% translateY(-8px). Run it a single time, not on a loop."
  },
  "shake-x": {
    feel: "Four short shakes sideways, 8px each way, ending where it started.",
    useFor: "A rejected input. It is the one motion viewers already read as 'wrong' - do not reuse it for anything positive.",
    prompt: "Shake this horizontally over 600ms with cubic-bezier(0.65, 0, 0.35, 1): at 0% and 100% no transform, at 20% and 60% translateX(-8px), at 40% and 80% translateX(8px). Once only."
  },
  "head-shake": {
    feel: "Moves and turns at the same time, so it reads as a head shaking 'no' rather than a rattle.",
    useFor: "A refusal with a bit more character than Shake X - a rejected approval, a blocked action.",
    prompt: "Shake this like a head saying no, over 600ms with cubic-bezier(0.65, 0, 0.35, 1): at 25% translateX(-8px) rotateY(-9deg), at 50% translateX(8px) rotateY(7deg), at 75% translateX(-4px) rotateY(-5deg), back to no transform at 100%."
  },
  "wobble": {
    feel: "Swings hard side to side while rotating, each swing smaller than the last.",
    useFor: "Something unstable or overloaded. It moves 20% of its own width - give it room or it will collide.",
    prompt: "Wobble this over 800ms with cubic-bezier(0.65, 0, 0.35, 1): at 15% translateX(-20%) rotate(-5deg), 30% translateX(14%) rotate(3deg), 45% translateX(-9%) rotate(-3deg), 60% translateX(6%) rotate(2deg), 75% translateX(-3%) rotate(-1deg), back to rest at 100%."
  },
  "jello": {
    feel: "A skew wobble that damps out. Elastic rather than rigid.",
    useFor: "A light, positive nudge - something landing softly. It is playful, so it does not belong on an error.",
    prompt: "Give this a jello wobble over 800ms with cubic-bezier(0.65, 0, 0.35, 1): at 22% skewX(-12deg) skewY(-12deg), 44% skewX(6deg) skewY(6deg), 66% skewX(-3deg) skewY(-3deg), 88% skewX(1deg) skewY(1deg), rest at 0% and 100%."
  },
  "tada": {
    feel: "Shrinks, then rocks left and right at 108% before settling. The celebration.",
    useFor: "The one genuinely good thing in the video - a batch posted, a month closed. Using it twice halves its value.",
    prompt: "Celebrate with a tada over 800ms with cubic-bezier(0.65, 0, 0.35, 1): at 10% and 20% scale(0.92) rotate(-3deg); at 30%, 50%, 70% and 90% scale(1.08) rotate(3deg); at 40%, 60% and 80% scale(1.08) rotate(-3deg); rest at 0% and 100%."
  },
  "swing": {
    feel: "Rotates around its top edge and settles, like something hanging from a hook.",
    useFor: "Anything pinned or pending - a tag, a flag, an item waiting for approval.",
    prompt: "Swing this from its top edge over 600ms with cubic-bezier(0.65, 0, 0.35, 1). Set transform-origin to top center, then rotate 12deg at 20%, -9deg at 40%, 5deg at 60%, -3deg at 80%, back to 0 at 100%."
  },
  "heart-beat": {
    feel: "Two quick scale beats to 112%, with a pause between them.",
    useFor: "A count that just went up - items awaiting you, documents in the queue.",
    prompt: "Give this a double heartbeat over 800ms with cubic-bezier(0.65, 0, 0.35, 1): scale(1.12) at 14% and 42%, back to scale 1 at 28% and 70%, rest at 0% and 100%."
  },
  "rubber-band": {
    feel: "Squashes and stretches on both axes before settling. The most cartoon-like thing in the set.",
    useFor: "Playful product moments only. On anything financial it undercuts the tone - reach for Heart Beat instead.",
    prompt: "Stretch this like rubber over 800ms with cubic-bezier(0.65, 0, 0.35, 1): at 30% scaleX(1.2) scaleY(0.85), 45% scaleX(0.85) scaleY(1.15), 65% scaleX(1.06) scaleY(0.96), 80% scaleX(0.98) scaleY(1.02), rest at 0% and 100%."
  },
  "vibrate": {
    feel: "A one-pixel jitter. Nothing in the layout moves, but the eye catches it.",
    useFor: "An alert that must not disturb the composition - a failed sync, a connection dropping.",
    prompt: "Vibrate this over 400ms linear: at 20% and 60% translate(-1px, 1px), at 40% and 80% translate(1px, -1px), rest at 0% and 100%. Keep the displacement at one pixel."
  },

  /* ---------- text ---------- */
  "tracking-in": {
    feel: "The letters start far apart and close up as the words fade in.",
    useFor: "A title card or a brand word. It animates letter-spacing, which the GPU cannot composite - one line, never a paragraph.",
    prompt: "Animate the tracking in: start at opacity 0 with letter-spacing 0.6em, end at opacity 1 with normal letter-spacing, over 800ms with cubic-bezier(0.16, 1, 0.3, 1). Use it on a single short line - letter-spacing reflows text on every frame."
  },
  "tracking-out": {
    feel: "The letters drift apart as the words fade away.",
    useFor: "Closing a title card that opened with Tracking In. Same cost warning - one line only.",
    prompt: "Animate the tracking out: from opacity 1 and normal letter-spacing to opacity 0 and letter-spacing 0.6em, over 600ms with cubic-bezier(0.7, 0, 0.84, 0)."
  },
  "focus-in": {
    feel: "Blur and letter-spacing resolve together - a lens finding the words.",
    useFor: "An opening statement. The most cinematic thing here, and the heaviest; budget one per video.",
    prompt: "Focus this text in: start at opacity 0 with filter blur(12px) and letter-spacing 0.3em, end at opacity 1, no blur and normal letter-spacing, over 800ms with cubic-bezier(0.16, 1, 0.3, 1)."
  },
  "text-pop-up": {
    feel: "Rises 16px and gains a soft shadow, so it lifts off the background instead of sliding along it.",
    useFor: "A number or a stat that should read as raised off the plate behind it.",
    prompt: "Pop this text up: start at opacity 0, translateY(16px) and no text-shadow; end at opacity 1, no transform and text-shadow 0 6px 18px rgba(5, 41, 117, .28); over 600ms with cubic-bezier(0.16, 1, 0.3, 1). That shadow colour is Tech Blue at 28%."
  },

  /* ---------- ambient (loops) ---------- */
  "pulse": {
    feel: "A slow breath - dims to 70% and grows 2%, over and over.",
    useFor: "Live state. A recording dot, a sync indicator, a 'we are on air' marker. One per screen, or it becomes wallpaper.",
    prompt: "Give this a slow pulse loop: over 1.6s, ease-in-out with cubic-bezier(0.65, 0, 0.35, 1), go from opacity 1 and normal scale to opacity 0.7 and scale 1.02 at the halfway point, then back. Loop forever, and stop it entirely under prefers-reduced-motion."
  },
  "shimmer": {
    feel: "A light sweeps left to right across a placeholder shape.",
    useFor: "Showing that something is loading. It is a promise that content is coming - never use it as decoration.",
    prompt: "Add a loading shimmer: a linear-gradient sweeping horizontally across the element on a 1.4s linear loop, moving background-position from 200% to -200%. Keep the highlight subtle. Stop the loop under prefers-reduced-motion."
  },
  "flicker": {
    feel: "Holds steady, then stutters down to 35% four times in quick succession, then holds again.",
    useFor: "Atmosphere - a neon sign, a failing connection. It carries no information, so it must never be the only cue.",
    prompt: "Add a flicker loop over 3s linear, repeating forever: opacity 1 for most of the cycle, then between 41% and 49% alternate down to 0.35 and back on every other percent. Stop it under prefers-reduced-motion."
  },
  "ken-burns": {
    feel: "A 20-second drift: the image slowly scales to 115% and moves 2% up and left, then reverses.",
    useFor: "A still that has to hold the screen. Because it alternates direction it never cuts back to the start.",
    prompt: "Add a Ken Burns loop: over 20s with cubic-bezier(0.65, 0, 0.35, 1), animate transform from scale(1) translate(0, 0) to scale(1.15) translate(-2%, -2%), with animation-direction alternate and infinite iterations. Stop it under prefers-reduced-motion."
  },
  "bg-pan": {
    feel: "A brand gradient drifts across the element, never repeating a hard edge.",
    useFor: "A backdrop behind a title, or an end card. The gradient is the four Continia colours - do not substitute others.",
    prompt: "Pan a gradient across this: background linear-gradient(90deg, #052975, #983eae, #5f9e8d, #8ff8ff, #052975) at background-size 300% 100%, animating background-position from 0% 50% to 300% 50% over 8s linear, looping forever. Those four colours are Tech Blue, Performance Purple, Smart Green and Innovation Blue - use no others. Stop it under prefers-reduced-motion."
  }
};

/* Preview elements, sized for a big stage rather than the gallery's thumbnail. */
var DEMO = {
  "reveal-up":     '<span class="mvp-title">Automate your AP in Business Central</span>',
  "blur-in":       '<span class="mvp-title">Continia 2026 R2</span>',
  "tracking-in":   '<span class="mvp-title wide">CONTINIA</span>',
  "tracking-out":  '<span class="mvp-title wide">CONTINIA</span>',
  "focus-in":      '<span class="mvp-title">Built Inside Business Central</span>',
  "text-pop-up":   '<span class="mvp-title">30+ years</span>',
  "zoom-in":       '<span class="mvp-title">21,000+</span>',
  "pulse":         '<span class="mvp-live"><span class="mvp-dot"></span>Recording</span>',
  "flicker":       '<span class="mvp-live"><span class="mvp-dot"></span>Live</span>',
  "shimmer":       '<span class="mvp-skel"></span><span class="mvp-skel short"></span>',
  "ken-burns":     '<span class="mvp-plate"></span>',
  "bg-pan":        '<span class="mvp-plate bare"></span>',
  "fade-out":      '<span class="mvp-lower"><b>Dismissed</b><i>the caption clears</i></span>',
  "scale-out":     '<span class="mvp-lower"><b>Closing</b><i>back to where it opened</i></span>'
};
function demoFor(slug, name) {
  if (DEMO[slug]) return DEMO[slug];
  return '<span class="mvp-lower"><b>' + name + '</b><i>Continia · Marketing</i></span>';
}

/* Component entries (the Reel Gallery) are not previewed on the Video page:
   the stage there replays a CSS class and scales it with ml-slow/ml-slower,
   and neither means anything to a JS component. They live in the gallery. */
var anims = lib.filter(function (e) { return e.kind !== "component"; });

var out = anims.map(function (e) {
  var c = COPY[e.slug];
  if (!c) { console.error("No video-facing copy for " + e.slug); process.exit(1); }
  return {
    slug: e.slug, name: e.name, category: e.category,
    feel: c.feel, useFor: c.useFor, prompt: c.prompt,
    demo: demoFor(e.slug, e.name),
    loops: e.category === "ambient",
    reducedMotion: e.reducedMotion
  };
});
var extra = Object.keys(COPY).filter(function (k) {
  return !anims.some(function (e) { return e.slug === k; });
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
