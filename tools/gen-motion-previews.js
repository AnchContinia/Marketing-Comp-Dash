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
  },

  /* ---------- components ---------- */
  "reel-gallery": {
    loops: true,
    feel: "Tilted rows of stills drift sideways at different speeds. Everything sits desaturated until the cursor passes over it, and colour comes back in a soft circle that follows the pointer.",
    useFor: "A wall of work. A showreel opener, a partner page, an end card that has to say 'there is a lot of this' without playing any of it. It is the one effect here that is a component rather than a class, so it carries its own JS.",
    prompt: "Build a reel gallery: three rows of images, each row a horizontal strip drifting sideways forever at about 26px per second, neighbouring rows running in opposite directions and at slightly different speeds so they never line up. Rotate the whole stack -8deg and scale it 1.12 so the rotated corners stay covered, and drop the outer rows about 18px lower than the middle one so the set arches. Fade the left and right edges out over 72px with a mask so images enter and leave instead of being cut. Each image is 116px tall with a 12px radius and 14px between them. Desaturate everything and restore full colour in a 170px circle that follows the cursor. The wheel, a drag and the arrow keys all push the rows, with inertia that settles at 0.94 per frame. Transitions on the chrome run 250ms with cubic-bezier(0.2, 0, 0, 1). Under prefers-reduced-motion: no drift, no tilt, no spotlight - the rows sit level and still, and only dragging moves them."
  },
  "user-cursor": {
    loops: true,
    feel: "Someone else's cursor, on your page. An arrow leans a few degrees into whichever way it is travelling and a small name pill follows a step behind it, close on a slow move and further back on a fast one - the lag is the whole effect, and it is deliberately gentler than the reference. Move the pointer onto the card and it takes over; take it away and the cursor goes back to wandering on its own, so the card is never still and never frantic.",
    useFor: "Anything about two people looking at the same thing: a Web Approval Portal hero, a shared-queue explainer, a collaboration section. Also works as a plain custom cursor on a landing page - set autoplay off and it stays hidden until the pointer arrives. It is a component rather than a class, so it carries its own JS.",
    prompt: "Build a stage with a second cursor on it. The cursor is a 22px three-pointed concave arrowhead - a tip, a shallow wing running out to the right, a long point running down, and a back edge curving in between the two, with a 49 degree apex, the two edges within 8% of the same length and the back edge 12% of its chord deep - filled in the page's --navy with a 1.5px halo in the page background colour drawn under the fill, so it reads on any surface, plus a rounded name pill sitting 0.74 of the arrow's width below it and 0.58 to the right, in the same colour with the opposite ink - white text on Tech Blue in light mode, Tech Blue on Innovation Blue in dark. Both the arrow and the pill are moved by transform only, from the same target, but with different smoothing: each frame each closes 1 - exp(-dt/tau) of its remaining distance, with tau 150ms for the arrow and 250ms for the pill. That difference is the only thing that makes the pill trail - there is no fixed offset and no second path - and because the gap grows with speed, the pill is pulled back onto a 56px leash so a fast move cannot fling it off the stage. The arrow leans into the move: take the arrow's own horizontal speed - not the pointer's, it is already smooth because the position it comes from was - read raw, map 1.6px per millisecond to the full 12 degrees and clamp there, then ease the angle itself on 100ms. Exactly one lag: the arrow's speed peaks the instant the pointer jumps and decays on its own 150ms, so any filter stacked on top is still winding up when the peak has gone, and the lean never arrives. When a pointer is over the stage the target is the pointer, the native cursor is hidden, and touch pointers are ignored. When no pointer is present the target wanders on two sine waves at a 1:0.618 ratio - 30% of the width across and 26% of the height down from the centre, one cycle every 9 seconds - so it drifts for a long time before it repeats. Seed the first frame at the start of that path rather than at the origin, or it slides in from the top-left corner on load. Park the whole loop when the stage is off-screen. Under prefers-reduced-motion there is no loop and no wander: the cursor still follows the pointer, but written straight through with no smoothing and no lean, so a custom cursor never becomes an invisible one."
  },
  "hover-preview": {
    loops: true,
    feel: "A paragraph where three words are live. The cursor walks to one, a small card lifts above it from three quarters size, and the card sits at a small angle of its own rather than hanging straight. Walk to the next word and the same card glides across and cross-fades its contents on the way - it never closes and reopens, so the eye never has to find it again. Once a lap the cursor drops below the copy and the card folds away, which is the only way a reader learns it can.",
    useFor: "Dense copy that names things the reader may not know: a solutions paragraph, a release note listing modules, a partner page naming integrations. It shows the thing without sending anyone to another page. It is a component rather than a class, so it carries its own JS - and it mounts the User Cursor, so it needs that entry's stylesheet too.",
    prompt: "Build a paragraph whose key words open a preview. Mark a few words in the page's --navy at weight 800 with a pointer cursor and a 12% tint of the same colour on hover, and nothing else - no underline and no pill, because a paragraph with four buttons in it stops being a paragraph. Hovering one lifts a card above it: a square about 132px wide with a 15px radius, the page's --panel behind a 1px --line border, a soft shadow in 20% of --navy, its bottom edge 14px above the top of the word and its horizontal centre on the word's, clamped so a word near an edge cannot push it out of view. The card fades in and grows from 0.74 to full over 250ms on the standard ease-out, with the scale on a child element so the parent is free to carry position and angle. Each word's card rests at its own small angle within 7 degrees either way, derived from the word rather than drawn at random so it leans the same way on every load. Moving to another word does not close the card: the same card glides to the new word by closing 1 - exp(-dt/400ms) of the remaining distance each frame, its angle easing on the same constant, while two stacked slots cross-fade the old contents out and the new in over 250ms. While a word is held, the card slides up to 10px with the cursor as it crosses the word, so it leans toward the side being read instead of sitting dead centre. With no pointer on the stage the component drives itself: the cursor tours the word centres, resting 1300ms on each, then rests below the copy for one beat so the card folds away before the lap restarts. Hit-testing reads where the cursor's own tip is heading rather than the real pointer, so the two can never disagree about which word is hovered. Park the loop when the stage is off-screen. Under prefers-reduced-motion there is no tour, no glide and no lean: the words still work and the card still appears on hover, at rest, where it belongs."
  },
  "modal-cards": {
    loops: true,
    feel: "A row of cards, and one of them opens by becoming the page. The cursor walks to a card's plus, dips as it presses, and the card leaves the row and grows into the whole stage in a quarter of a second while the others fade out behind a scrim; its title grows with it and a paragraph unfolds underneath. Then the cursor goes for the cross and the card drops back into its slot faster than it left - opening is the move you are meant to read, closing is the one that has to get out of the way.",
    useFor: "Anything where a tile has more behind it than fits on it: a solutions row, a customer-story grid, a release page where each card opens into what changed. It answers 'what is this one' without leaving the page. It is a component rather than a class, so it carries its own JS - and it mounts the User Cursor, so it needs that entry's stylesheet too.",
    prompt: "Build a row of three cards that open in place. Each card is all picture with a 15px radius, its title and a round plus button sitting over the foot of the image on a dark gradient scrim. Clicking the plus takes that card out of the grid and lays it over the whole stage: not by scaling it - measured on the reference the open card is 3.2 times wider but only 1.9 times taller than its slot, so a scale would turn the radius into an ellipse and stretch the text - but by FLIP. Move it to its open position first, measure, apply the transform that puts it back where it started, then transition that transform away over 250ms on the standard ease-out. The title grows with the card on font-size rather than on a transform, so it stays crisp, and a paragraph fades in underneath one duration-fast later, once the card has somewhere to put it. The plus becomes a cross, the other cards fade to nothing, and a scrim in 34% of the page's --navy comes up behind. Closing runs the same move backwards in 150ms, because opening is the move that has to be read and closing is the one that has to get out of the way. With no pointer on the stage the component drives itself: the cursor walks to a card's button over 950ms, presses - the arrow dips 18% toward the surface for one duration-instant and a ring pings out from its tip - opens the card, drifts over it for 1900ms, walks to the cross, presses again, then steps below the row for a beat before the next card's turn. Park the loop when the stage is off-screen, and hand control straight over when a real pointer arrives. Under prefers-reduced-motion the card still opens and still closes, because it is a control and not decoration - it just arrives instead of travelling, with no FLIP, no transitions and no tour."
  },
  "tile-reveal": {
    loops: true,
    feel: "A headline sits dead still in the middle of a black stage while a wall of tiles comes at it from behind - the middle column first, the outer ones last - settles into a grid long enough to be read, and then keeps going, straight past the camera and out of frame. What is left is the headline, a line under it and a button. The cursor presses the button and the whole section is thrown at you on the Z axis and starts again.",
    useFor: "A section opener that has to carry a picture wall and a single message at the same time: a campaign landing page, a solutions overview, a release page, an event splash. The copy never moves, so it stays readable the whole way through, which is the part a fading hero gets wrong. It is a component rather than a class, so it carries its own JS - and it mounts the User Cursor, so it needs that entry's stylesheet too.",
    prompt: "Build a sticky section as one stage with a 1000px perspective and a headline centred on it that never moves. Behind the headline put a five by three grid of tiles, placed in percentages so they overlap a little, and drive the whole thing from one number - the scroll position from 0 to 1. Each tile gets its own run inside that number: the middle column runs first and the outer columns last, spread over a third of the range, because the eye is already in the middle. Inside its run a tile flies in from 900px behind the camera on an expo-out, holds still from 42% to 64% so the wall can actually be read, then accelerates to 780px in front of the camera on a squared curve and fades as it passes. Lay a radial veil between the wall and the copy so the headline stays legible over it, and bring the veil up and down with the wall. At 86% a sub-line and a button arrive - bound to the scroll position rather than to a transition, so dragging backwards takes them away again instead of leaving them stranded. Pressing the button throws the whole section at the viewer: one wrapper, translateZ 680px and fade over --motion-duration-slower on the ease-in, then the scroll resets to 0 and it runs again. With no pointer on the stage the cursor drives it: it works its way down the middle of the section over 3400ms while the scroll runs, rests for 800ms at the far end with the button up, walks to the button over 900ms and presses it - the arrow dips toward the surface and a ring pings out from its tip. The wheel, a drag and the arrow keys all seek, and a real pointer takes over the moment it arrives. Under prefers-reduced-motion there is no tour and no flight: the section settles where the wall is up and the call to action has arrived, and stays there."
  },
  "agentic-ball": {
    loops: true,
    feel: "A lit ball with a liquid swirl turning on it - two arms winding from the centre out to the edge, carved into ridges by the light and wrapping the whole surface. It breathes: almost still for a while, then churning, then still again. Nothing arrives and nothing leaves, so it reads as something working rather than something happening.",
    useFor: "The status of an assistant, shown rather than spelled out: an AI panel in the hub, a chat header, a Continia Hub agent, a waiting state that is not a spinner. It carries four states - idle, listening, thinking, speaking - and switching between them moves five numbers, so it can follow a live conversation without ever restarting or jumping. Whatever you put inside it is laid over the ball and keeps its own layout. It is a component, so it carries its own JS, but it needs no other entry and no library.",
    prompt: "Build a lit sphere with a swirl turning on its surface, on a stage that is dark in both themes because a lit object on a light ground is a flat disc. Shade the ball first: a normal from the screen position, a key light low enough that the terminator falls ON the disc rather than past its edge, a fill so the shadow side is a dark side and not a hole, and a tight rim opposite the key so the ball lifts off the stage. Let the bare sphere use only about three quarters of the available range - the swirl is added on top of it, and a base that already reaches white leaves the pattern nowhere to go. Then the swirl. It is not noise: use three sinusoids, a dominant two-armed one with a weaker one-armed and a weaker four-armed over it, each winding about two hundred degrees from centre to limb and each turning at its own whole number of turns per cycle, one of them backwards, so the composite is exactly periodic and the ball comes back to its own first frame. Give the swirl the sphere's own radial coordinate - the surface polar angle, not the screen radius - and the fringes crowd toward the edge the way a texture on a real sphere does, instead of reading as a pinwheel painted on a disc. Shade the swirl twice over, because one way is not enough: its gradient projected on the light, which carves ridges but vanishes wherever the pattern runs across the light, plus the height itself, which is visible everywhere. Window it off at the exact centre, where every arm meets and a one-over-r term goes singular, and at the limb, where the texture is edge-on. Breathe the amplitude from a floor up to a peak and back once per cycle, sharpened so it spends longer calm than churning. Colour it from the Continia palette only: deep Tech Blue in the shadow, Tech Blue through the terminator, Innovation Blue in the light, white at the hotspot - the dark end is Tech Blue scaled down, never a lightened tint. Make every frame a pure function of the clock, with the per-pixel parts precomputed once so a frame is a dot product rather than a pile of trigonometry, and render into a small buffer that is upscaled under a clipped arc, so the shading can be cheap while the silhouette stays crisp. Give it four named states - idle, listening, thinking, speaking - that move only scalars, so an assistant can change them on every token without a rebuild and without the animation restarting. Cap the pixel ratio at 2, stop the loop when it scrolls out of view or the tab is hidden, clamp the frame step to 64ms, and under prefers-reduced-motion request no frames at all and draw one still ball: it is the content, so an empty box is not a reduced version of it."
  },
  "center-flow": {
    loops: true,
    feel: "A lit tile in the middle of a dark field with eight smaller ones around it, and a pulse of light leaving the centre along every spoke in turn. Each pulse lands on its node, the node answers with a short flash, and the spoke goes quiet again. An hourglass runs in the hub while it happens, and turns itself over when the sand is through.",
    useFor: "Anything where one thing feeds a lot of other things and you would otherwise draw a diagram: a platform or integrations page, an architecture slide, the top of a Continia Hub page, a section that has to say automatic without a screenshot. Whatever you put inside it is laid out as a caption under the diagram rather than over it, so the hub tile is never covered. It is a component, so it carries its own JS, but it needs no other entry and no library.",
    prompt: "Build a hub-and-spoke diagram that runs: one lit tile in the middle of a dark stage, eight smaller tiles around it, and a pulse of light leaving the centre along every spoke in turn. Draw the whole thing into ONE canvas rather than as DOM tiles plus an SVG of paths - three coordinate systems have to be reconciled on every resize, and an animated dash offset draws a uniform segment, so the head of a pulse cannot be brighter than its tail without a gradient per path per frame. Put the nodes on an ellipse rather than a circle, about half as tall as it is wide, because a stage is wider than it is tall and a circle of nodes leaves a gutter at each side; clamp that ellipse to the stage's height as well, or a short card runs its top and bottom nodes off the edge. Make each spoke a quadratic curve whose control point is pushed perpendicular to its chord, all with the same rotational sense, so the fan has a slight turn in it instead of reading as a star - and start each spoke at the hub tile's edge and stop it at its node's, so no spoke is ever drawn under a tile it is supposed to be touching. Draw every spoke at rest as one dim stroke, always, because the system has to be legible in the gap between pulses and not only while something is travelling. Draw a pulse as a run of short segments whose alpha and width ramp to a bright head - a single stroke at one alpha is a wire, and a wire does not read as something leaving - and let its tail run past the far end so it is swallowed by its node rather than switched off on top of it. Have the pulse pass hand each node its own flash rather than working the timing out a second time, so the arrival and the answer can never disagree; the answer is a ring that opens out of the node's own shape and fades. Scale every px measurement by the stage, with a floor, because the same hub tile that is right at 420px is half the picture on a 172px card. Behind it all put a faint dot field, dimmed toward the edges: a plain dark box gives the eye nothing to measure the spokes against, so the fan reads as floating. Give the hub a halo that breathes, drawn BEFORE the spokes so it reads as light coming off the tile rather than as a wash over the diagram. Put an hourglass in the hub tile and let it run, drawn in code rather than loaded as a font or an SVG: sand falling as a cone standing on the neck, a heap growing underneath it, a thin stream between them, and the glass turning over when it is through, on a cycle that is deliberately not a multiple of the pulses' so the flip never lands on the same spoke twice. Take the square root of the fraction left when you set the sand's height - a bulb is a cone, so the silhouette the eye reads goes as the square of the height, and a linear level looks like a loading bar stood on its end. Colours are Continia palette only: the hub and the pulses are Innovation Blue, never a lightened tint, because at a 2px line width a deep blue is not visible on near-black; let the accent move the satellites instead. Make every frame a pure function of the clock, cap the pixel ratio at 2, stop the loop when the stage scrolls out of view or the tab is hidden, clamp the frame step to 64ms, and under prefers-reduced-motion request no frames at all and draw one still frame with pulses mid-flight and the glass half run."
  },
  "portrait-circles": {
    loops: true,
    feel: "Rings of faces turning around a common centre on a dark field. The ring in front is sharp and every ring behind it is softer, dimmer and slower, so the set reads as a crowd with depth rather than as a diagram of one. Neighbouring rings turn opposite ways, which is what stops four circles reading as one disc.",
    useFor: "Anywhere a number of people has to be a picture rather than a figure: a partner or community page, an about page, a careers header, a customer wall, the top of a Continia Hub page. Whatever you put inside it sits in the middle of the rings and keeps its own layout. Real photographs go in through `images`; without them the faces are drawn silhouettes, so the entry never depends on particular files. It is a component, so it carries its own JS, but it needs no other entry and no library.",
    prompt: "Build concentric rings of round faces turning around a common centre on a stage that is dark in both themes. Do NOT drive it from an animation frame: give each ring one infinite linear rotate animation and each face the same animation reversed so it stays upright, and the whole picture then runs on the compositor with the main thread doing nothing once the DOM is built - which is the difference between a page that scrolls and a page that stutters when several of these share it. Put the two rotations in two different properties, because an animation replaces a whole property: the static one that cancels a face's own slot angle goes in `transform`, and the animated one that cancels its ring's turn goes in the individual `rotate` property, which composes first. Size the radii off the LONGER axis of the stage, not the shorter one - a ring fitted to the height of a wide stage leaves the sides empty and reads as a medallion, while one fitted to the width runs off the top and bottom and is clipped, which is what makes it read as part of something larger. State how many faces the OUTERMOST ring holds and give every ring inside it its share pro rata by radius, so the gaps come out even with no arithmetic on the stage at all - do NOT divide each circumference by a gap in pixels, because that has to be measured and two hosts do not measure the same stage at the moment a module mounts, so the same card ends up running different numbers of faces. Offset each ring's first face by a few degrees so the rings never line up into spokes. Carry the depth on three things at once: a blur that grows as the square toward the back, an opacity that falls, and a turn that takes longer - and put the blur on each FACE rather than on the ring, because a face's own content never changes so it is rasterised and blurred once, while a filter on the turning ring is recomputed every frame. Turn every other ring the other way. Lay a dashed track under each ring that does NOT turn, because it is the track and not a thing on it, and darken the corners so the outer ring leaves the frame instead of stopping at it. Make the default face a drawn silhouette in a brand tint rather than a photograph - an entry whose demo needs particular image files breaks when they move - and a silhouette rather than a monogram, because a letter makes a claim about who the person is and this is scenery. Tint the faces from the Continia palette only, Innovation Blue carrying Smart Green and Performance Purple as a minority, since a single hue reads as a logo wall; put a ring in the accent colour on every seventh face, and only on the sharp ones, because a coloured outline under five pixels of blur is a smudge. Seed the tints and the accents so they land in the same places on both hosts and across every resize, and on a resize that does not change how many faces a ring holds, write the radii back instead of rebuilding forty elements. Hold the animations rather than removing them when the stage leaves the viewport, the tab is hidden or it is paused, so a resumed ring picks up where it stopped rather than snapping to the top of its loop. Under prefers-reduced-motion the rings stop where they were laid out - a crowd at rest is still a crowd, so an empty box is not a reduced version of it."
  },
  "globe": {
    loops: true,
    feel: "A dotted Earth turning slowly on a dark stage, with a few thin rings tumbling outside it. Every couple of seconds a line of light leaves one city, arches over the curve and is swallowed at another, and a ring pulses where it lands. Nothing arrives and nothing finishes - it is a standing state, a map that is always working.",
    useFor: "A hero or a section that has to say reach without a list of flags: a platform or partner page, an international page, an event splash, a Continia Hub header. Whatever you put inside it is laid over the globe and keeps its own layout, so the copy belongs to the page. The hub and the cities the legs go to are both replaceable, and the defaults are a shape rather than a claim about where anyone has an office. It is a component, so it carries its own JS, but it needs no other entry and no library.",
    prompt: "Build a dotted globe on a stage that is dark in both themes, because a lit object on a light ground is a flat disc. Do not reach for a 3D library or a world dataset: describe the coastlines as about thirty closed rings of longitude and latitude in the file itself, and let an enclosed sea be a notch - a boundary walked in along one shore and back out along the other, which is what makes the Baltic, the Gulf, the Red Sea and Hudson Bay wet without a single hole or special case. Lay the dots on a Fibonacci sphere, the golden-angle spiral, rather than on a grid of latitude and longitude: a grid puts the same number of dots on a polar row as on the equator, so the Arctic becomes a solid cap while the tropics stay a sieve, and the one thing the picture is for is density reading as land. Keep a dot when it falls inside a ring, draw the ocean either not at all or as a thinned wash, and mix the land a third of the way toward white - at a pixel and a half on near-black, an unmixed deep blue is not visible at all. Rotate with one yaw about the polar axis and then a fixed tilt of about eighteen degrees toward the viewer, six multiplies a dot, and cull the far side by the sign of the rotated depth; that same sign is the whole occlusion model, so the back halves of the rings go down first, an opaque disc paints over them, and everything on the near side goes on top. Fly the legs as great circles - slerp between the two points, never a lerp, which bunches toward the ends and makes the comet slow down at both airports - and bow each one away from the surface in proportion to its OWN angular length, so a short hop stays low and a long haul climbs. Draw a leg as a run of short segments whose alpha ramps to a bright head, let the tail run past the far end so the leg is swallowed rather than switched off, and give each leg its own phase so they stagger without a scheduler. Pulse a ring at each end, timed off that leg's own phase so it lands with the arc instead of beating against it. Add a haze outside the disc drawn BEFORE the ball, so it reads as air around the planet rather than as a bloom on it, and a thin bright edge drawn last. Colours are Continia palette only - Innovation Blue with Smart Green and Tech Blue as a minority - never a lightened tint mixed to make something read. Bucket the dots by colour and by a quantised alpha and fill each bucket as one path, so a few thousand dots cost about thirty fills; cap the pixel ratio at 2, stop the loop when the stage scrolls out of view or the tab is hidden, clamp the frame step to 64ms, and lay the random part down once from a fixed seed so the continents never rearrange themselves. Let a pointer drag it, with a throw that decays back into the automatic turn - that drag is the one thing allowed to be state rather than a function of the clock, because a globe that snapped back the frame after the finger lifted would fight the hand on it. Under prefers-reduced-motion request no frames at all and draw one still globe, taken at a moment when no leg is mid-flight: the globe is the content, so an empty box is not a reduced version of it."
  },
  "vortex": {
    loops: true,
    feel: "A whirlpool seen from just above the water, drawn as thousands of small lights lying on its surface. The rim is almost flat and turns slowly; the wall drops away steeply; the throat at the bottom comes back to level and spins several times faster, because that is what water does. The far side of every ring is dimmer than the near side, which is the only reason it reads as a bowl rather than as a stack of ovals.",
    useFor: "A background for a hero or a section that has to feel like a lot of separate things being drawn into one place - a platform page, an integrations or data page, an event splash, a Continia Hub header. Whatever you put inside it is laid over the field and keeps its own layout, so the copy belongs to the page. It is a component, so it carries its own JS, but it needs no other entry and no library.",
    prompt: "Build a whirlpool as a field of small lights lying on its surface, seen from just above the water. Do not invent the silhouette: take it from the Rankine vortex, the standard two-part model of a real one, so that a single number - the core radius, at 0.34 of the rim - sets both the shape and the speed at once. Outside the core the surface drops as the inverse square of the radius and a ring turns at core squared over radius squared, so the rim is nearly flat and nearly still; inside it the surface is a parabola and every ring turns together as one solid disc, several times faster than the rim. The two branches meet at the core radius with the same value and the same slope, which is why the wall joins the throat with no crease in it - a hand-drawn funnel always has one. Lay twenty-six rings from rim to throat, squash them to 0.45 of their height for the viewing angle, and put proportionally fewer dots on the inner rings so the dots-per-length stays even rather than crowding the throat into a solid line. Size the rim off the stage width, not its height, because a squashed funnel is far wider than it is tall. Each dot carries its own brightness cycle and its own phase, so the field shimmers instead of pulsing as one sheet, and the far half of every ring is dimmed to about 0.58 - that dimming is the only depth cue a flat canvas has, and without it the rings read as flat ovals. Mix each dot toward white, both because a light source saturates its own centre and because a 1.5px dot of Tech Blue is invisible on near-black otherwise. Colours are Continia palette only - Innovation Blue weighted about five to two to one against Smart Green and Tech Blue, never a lightened tint mixed to make it read - and the stage stays dark in both themes, because a light only exists against a dark ground. Redraw the whole field each frame as a pure function of the clock rather than smearing a previous frame, so a pause lands on a correct picture and a resize keeps the layout; lay the random part down once from a fixed seed so the field never rearranges itself. Draw the dots in buckets of colour and quantised alpha, one fill per bucket, so fifteen hundred dots cost about thirty fills; bloom the throat with a radial gradient sized off the throat ring itself, because the rings bunch there and a real surface would be brightest there. Cap the pixel ratio at 2, stop the loop when the band scrolls out of view or the tab is hidden, clamp the frame step to 64ms, and under prefers-reduced-motion request no frames at all and draw one still frame of the field - the field is the content, so an empty box is not a reduced version of it."
  },
  "data-transfer": {
    loops: true,
    feel: "A dark band with streams of light running into it from off-frame, all of them bending toward one point near the top and disappearing into it. Because the shutter is open the whole time, each stream is a long trail rather than a moving dot, and where the trails cross on their way in they add up and burn out white. It reads as a motorway shot from a bridge at night, which is the point: a lot of separate things, all going to the same place.",
    useFor: "A band that has to say \"everything ends up here\" without a diagram: a hero strip, an integrations page, the top of a platform or Continia Hub page, an event splash. It is a background rather than a picture - whatever you put inside it is laid over the trails and keeps its own layout, so the copy belongs to the page. It is a component, so it carries its own JS, but it needs no other entry and no library.",
    prompt: "Build a dark band with light trails converging on a single point near the top right of centre. Pick a convergence point at 60% across and 8% down, fan sixteen streams away from it over a 104 degree arc centred on 145 degrees, and spawn each one just outside the edge its own ray leaves by - not at one radius for the whole fan, or the streams crossing a short edge spend most of the loop off-frame and the fan looks half empty. Each stream is a quadratic curve from its spawn point to the convergence point, with the control point at half distance rotated by up to 0.17 radians; keep that rotation the same sign across the whole fan and vary only its size, so the trails cross each other near the point instead of reading as noise. Then photograph it: do not accumulate a smear by wiping the canvas translucently each frame, because that ties the trail length to the frame rate and turns a pause into a smudge. Redraw every trail in full each frame instead, as the slice of its own curve between head minus 0.58 and head, so the picture is a pure function of the clock. Draw the slice in ten chunks with brightness ramping as the 1.7 power from the open end to the head, everything in additive blending so crossings blow out to white on their own. Two strokes per chunk: a wide halo in the stream's own colour at 17% alpha and a narrow core in that colour mixed 72% toward white - the whitened core is what a long exposure does to its own centre and it is the only reason a dark navy is visible on a near-black ground at all. Taper width and dim brightness toward the convergence point, because that is the only depth cue a flat canvas has. Let the head run from 0 to 1 and the tail keep going to 1.58, so a trail is swallowed by the point rather than switched off. Colours come from the Continia palette only - Innovation Blue, Smart Green and Tech Blue - never a lightened tint mixed to make it read. Cap the pixel ratio at 2, stop the loop when the band scrolls out of view or the tab is hidden, and clamp the frame step to 64ms so a backgrounded tab resumes instead of teleporting. Under prefers-reduced-motion request no frames at all and draw one still exposure with the streams at their own phases - the entry is a photograph, so the reduced state is simply the photograph."
  },
  "blur-highlight": {
    loops: true,
    feel: "A paragraph that is out of focus before it is anything else, then pulls sharp - and once it can actually be read, a highlighter is drawn across the three or four phrases that carry the point, left to right, all of them at once. The ink in a marked phrase darkens as the fill reaches it, so a word is on paper until the pen gets there.",
    useFor: "A claim you want read rather than skimmed: a hero sub-line, the opening of a solution page, a stat paragraph, the one sentence in a newsletter that has to land. It is a component rather than a class, so it carries its own JS - but it needs no other entry, and the markup is a paragraph with the phrases in <mark>, so it still means what it says with the JS switched off.",
    prompt: "Build a paragraph that arrives out of focus and then highlights itself. Two beats, in this order and never the other way round: the whole paragraph - not word by word - goes from blur(12px) and opacity 0 to sharp over --motion-duration-slow on the expo-out, and then, 60ms after it lands, a highlighter is drawn across every phrase marked in it, over --motion-duration-slower on the same easing, all of the phrases together rather than one after another. Draw the fill as the mark's own background-image sized from 0% to 100% of its own width, not as a pseudo-element scaled on X: a phrase that wraps is two boxes, and an absolutely positioned child of an inline element covers the union of them - the full column width, straight through the text beside it - so set box-decoration-break: clone and let each line fragment draw its own fill, which is what a highlighter pen does anyway. Because the sizing is a fraction of each phrase's own width rather than a speed, a long phrase and a short one finish together. The direction is the background's anchor and nothing else: left for a pen running right, right for one running left, centre for a fill opening from the middle of each phrase in both directions at once. The text in a marked phrase changes colour on its own short transition, delayed so it darkens as the fill arrives underneath it rather than before. Highlighter colours come from the Continia palette only - Innovation Blue #8ff8ff with Tech Blue ink on it in both themes by default - never a tint mixed to make the contrast work. The paragraph stands finished for 2200ms and runs again; pausing is animation-play-state, so the marks freeze part-drawn instead of snapping finished. Under prefers-reduced-motion it is simply already there, sharp and fully highlighted, with no loop: the marks are content, not decoration."
  },
  "color-carousel": {
    loops: true,
    feel: "A ring of cards turning past you, and the whole stage lit in the colour of whichever one is in front. The card facing you is square-on and sharp; the ones either side are turned away, stepped back and dimmed. When the next one comes forward the light behind the stage bleeds from one colour to the next over 400ms rather than cutting, so the change reads as a room being re-lit rather than a background being swapped.",
    useFor: "A row of photographs that deserves more than a strip: customer stories, a product gallery, release screenshots, an event recap. It is built for images - the colour is read off the picture's own pixels, so nobody has to pick a palette to go with the shots, and swapping the pictures re-colours the whole thing for free. It is a component rather than a class, so it carries its own JS - and it mounts the User Cursor, so it needs that entry's stylesheet too.",
    prompt: "Build a 3D carousel of square cards on a stage with a 1100px perspective. The card in front is face-on at full size with a 15px radius; each step out translates one card width sideways, 190px back in Z and turns 34 degrees so its inner edge goes away from you - the ring is seen from outside, not from within - and the third card each side is mid-fade. Then light the stage with the card in front: sample that card's own pixels, bin them into a coarse 6x6x6 cube, throw out the near-white, near-black and near-grey ones because they are the paper and the shadows rather than the subject, average the biggest bucket that is left, and push the result a quarter of the way toward full chroma. Paint it as two radials - a tight one behind the front card and a wide one washing the bottom corners - mixed into the page's own surface so the same colour reads as a tint on paper and as a glow on a dark ground. Transition the colour over 400ms so it bleeds rather than cuts. An author's own data-cc-color always wins over the sample, and a cross-origin image whose canvas cannot be read falls back to the card's background colour rather than going grey. The ring itself glides on exponential smoothing with a 400ms time constant, not on a spring. With no pointer on the stage it drives itself: the cursor walks to the card on the right over 900ms, presses it - the arrow dips toward the surface and a ring pings out from its tip - and that press is what brings the card forward, which then holds for 2400ms. No name on the pill; the cards are the thing to look at. Drag, arrow keys and clicking a card all work, and a real pointer takes over the moment it arrives. Under prefers-reduced-motion the carousel still works, because it is a control and not decoration - the card arrives in front instead of travelling there and the colour changes instead of bleeding."
  },
  "magic-transform": {
    loops: true,
    feel: "Documents drift in from the left and slide straight in under a lit vertical axis - they never stop and they are never cut up, the line simply takes them. The axis flares, confetti in the four brand colours sprays forward, and four small coloured pieces are thrown out the far side, each into its own lane and its own distance, so they fan without ever landing on top of each other. A burst fades out before the next document goes under, so the far side never holds two at once.",
    useFor: "Anything that turns a mess into structure: a capture explainer, an e-invoicing page, a hero for automation. It reads as 'paper goes in, data comes out' without a word of copy. It is a component rather than a class, so it carries its own JS.",
    prompt: "Build a document transformation stage. Documents 220x320 queue up off the left edge with 60px between them and travel right at a constant speed, each taking about 4 seconds for its leading edge to reach a lit vertical axis at 46% of the width. The document does not stop there and is not cut up: it keeps moving at the same speed, and the lane it travels in is clipped at the axis with a 26px soft mask on its right edge, so the document dissolves into the line and passes under it and under the tile sitting on it. The moment a leading edge meets the line, four small pieces - a coloured pill next to a bordered bar with one or two short lines in it - are thrown out from behind the tile. Each takes its own horizontal lane, evenly spaced across 78 percent of the half-height so two can never land on top of each other, and picks its own distance, between a third and all of the free space to the right, so the group still fans. A piece covers 45 percent of that distance in the first tenth of its life on cubic-bezier(0.16, 1, 0.3, 1) and the rest by 40 percent, then drifts another 16 percent past the target and fades to nothing over the last quarter. Its scale is a separate animation on a separate element, because in one transform string it would share the travel's easing and be finished inside 40ms: it grows from 0.74 to full over the first fifth of the life on cubic-bezier(0.2, 0, 0, 1), so it is still growing while it is still flying, and settles back to 0.94 as it goes. Its whole life is capped at 92 percent of the gap between documents, so a burst is always gone before the next document goes under and the far side never holds two at once. At the same moment 18 small squares spray forward from the axis through the same cone over 800ms, staggered 10ms apart. The axis is a 2px line with a soft radial glow, and a 56px rounded tile sits on it that scales to 1.08 on every hit - Tech Blue with a white mark on it on a light ground, Innovation Blue with a Tech Blue mark on a dark one, the mark drawn as a mask over the tile's ink so one white file serves both. Colours: the line and the documents follow the page's own ink and panel tokens, and the pills and confetti use only Tech Blue #052975, Innovation Blue #8ff8ff, Smart Green #5f9e8d and Performance Purple #983eae. Place the document texture and the fan from a seeded random number generator so a reload looks the same, and seed the first frame with one beat's worth of pieces already part-way through their life so it never opens empty. Under prefers-reduced-motion: nothing travels and nothing bursts - park one document short of the axis, light the axis, and lay the pieces out already spread."
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

/* A component brings its own preview markup: the module mounts onto the stage
   and lays the children out itself, so there is nothing to make up here. The
   gallery sits one folder down, so its demo paths are relative to that; the
   Video page is at the repo root, so the ../ comes off. */
function componentDemo(e) {
  /* A missing `demo` is a forgotten one; an explicitly empty string is a
     decision. Some components have no content to operate on - Agentic Ball
     draws the whole card itself - and making one up to satisfy this check
     would put a label on a card that is better without one. */
  if (e.demo === undefined) { console.error("Component " + e.slug + " has no demo key"); process.exit(1); }
  /* the gallery sits one folder down, the Video page is at the root - so an
     entry's demo writes ../Assets/… and this strips it. url(../…) inside a
     style attribute counts: the core mark points at the hourglass that way. */
  return e.demo.replace(/(src|href)="\.\.\//g, '$1="').replace(/url\(\.\.\//g, "url(");
}

var out = lib.map(function (e) {
  var c = COPY[e.slug];
  if (!c) { console.error("No video-facing copy for " + e.slug); process.exit(1); }
  var isComp = e.kind === "component";
  return {
    slug: e.slug, name: e.name, category: e.category, kind: e.kind || "animation",
    feel: c.feel, useFor: c.useFor, prompt: c.prompt,
    demo: isComp ? componentDemo(e) : demoFor(e.slug, e.name),
    /* Preview sizing lives in meta.json -> demoAttrs, so the gallery card and
       this one are sized by the same numbers. Both stages are a third of a
       grid row; the component's own defaults are for a full-width stage. */
    attrs: isComp ? (e.demoAttrs || null) : null,
    loops: isComp ? !!c.loops : e.category === "ambient",
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
