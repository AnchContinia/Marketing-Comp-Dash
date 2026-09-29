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
  if (!e.demo) { console.error("Component " + e.slug + " has no demo markup"); process.exit(1); }
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
