# Continia Motion

49 animations built on one set of tokens. Vanilla CSS — no framework, no build step, no JavaScript required. Drop the file in and put a class on an element.

```html
<link rel="stylesheet" href="continia-motion.css">

<div class="ml-fade-up">Automate your AP in Business Central</div>
```

`continia-motion.min.css` is the same file with comments and whitespace removed.

## Speed

Four classes scale whatever duration an animation already has, so one class slows an entrance, an exit and a loop by the same factor:

| Class | Factor |
|---|---|
| `ml-fast` | 0.75× |
| `ml-slow` | 1.5× |
| `ml-slower` | 2× |
| `ml-slowest` | 3× |

They set `--ml-scale`, which is an inherited custom property — put the class on a wrapper and everything inside it runs at that speed:

```html
<section class="ml-slower">
  <h2 class="ml-fade-up">…</h2>
  <p class="ml-fade-up">…</p>
</section>
```

**Do not slow something down by editing a token.** The tokens are the timing scale the whole set is built on; changing one there moves every animation that uses it.

## Stagger

`--ml-index` multiplies the stagger token, so a list builds itself:

```html
<ul>
  <li class="ml-fade-up" style="--ml-index: 0">Document Capture</li>
  <li class="ml-fade-up" style="--ml-index: 1">Expense Management</li>
  <li class="ml-fade-up" style="--ml-index: 2">Continia Banking</li>
</ul>
```

## Playing on scroll

Add `ml-paused` and take it off when the element comes into view. This is the only place the bundle needs JavaScript, and it is optional:

```html
<div class="ml-fade-up ml-paused">…</div>
```

```js
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (!e.isIntersecting) return;
    e.target.classList.remove("ml-paused");
    io.unobserve(e.target);
  });
}, { threshold: 0.3 });

document.querySelectorAll(".ml-paused").forEach(function (el) { io.observe(el); });
```

## Reduced motion

Handled in the file. Under `prefers-reduced-motion: reduce` the durations and travel distances collapse, every loop switches off, and the animations that rotate, skew or flip in 3D are swapped for a plain fade — those cannot be made safe by shortening them. Nothing disappears: every element still ends in its final state.

To preview both versions without changing the OS setting, set `data-motion` on `<html>`:

```html
<html data-motion="reduced">   <!-- or "full" to override the OS setting -->
```

## The catalogue

### Entrances (20)

Something arriving. They decelerate — the easing is expo-out.

| Class | What it does |
|---|---|
| `ml-back-in-up` | Rises into frame at 70%, holds, then comes forward to full size. Reads as coming from behind the frame. |
| `ml-blur-in` | Resolves from an 8px blur. Expensive to render - one authored moment, never a list. |
| `ml-bounce-in` | Overshoots to 104% and settles. The only entrance that overshoots; keep it for confirmations. |
| `ml-fade-down` | Fades in while settling down from 16px above. For anything anchored to the top of the frame. |
| `ml-fade-in` | Opacity only, no movement. The quietest way to bring something on. |
| `ml-fade-up` | Fades in while rising 16px. The default entrance for cards, list items and section content. |
| `ml-flip-in-x` | Rotates in around the horizontal axis in 3D, like a card turning face-up. |
| `ml-flip-in-y` | The same 3D turn around the vertical axis. Pairs with Flip Out X for a two-sided card. |
| `ml-light-speed-in` | Skews in from the right at speed and straightens out. Built on the short duration token - it must feel fast. |
| `ml-puff-in` | Contracts from 200% out of a blur. Reads as materialising rather than arriving. |
| `ml-reveal-up` | A clip-path mask lifts off the element. The text itself never moves, so long lines stay readable. |
| `ml-roll-in` | Rolls in from off-screen left, rotating as it travels. |
| `ml-rotate-in` | Swings in from -45 degrees while scaling up. Restrained on purpose - a full spin reads as a toy. |
| `ml-scale-in` | Grows from 96%. Feels anchored to the point it appears at. |
| `ml-slide-in-blurred` | Travels up with a motion-blur streak and stretches back into shape. The most expensive entrance here. |
| `ml-slide-in-left` | Travels in from the left across 32px. Reads as arriving from off-screen. |
| `ml-slide-in-right` | The mirrored arrival. Use the pair on opposing columns, never inside one list. |
| `ml-swirl-in` | Half a turn plus a scale from 40%. A deliberate flourish - one per video at most. |
| `ml-tilt-in` | A 3D lean: rotates back on the Y axis and pushes forward in Z. Good for screenshots and device shots. |
| `ml-zoom-in` | Comes forward from 50%. The loud cousin of Scale In - for a number or a claim, not a list. |

### Exits (10)

Something leaving. Shorter than the entrances and they accelerate away; a slow exit reads as a mistake.

| Class | What it does |
|---|---|
| `ml-back-out-down` | Drops to 70% in place, then falls out of frame. The undo of Back In Up. |
| `ml-blur-out` | Loses focus as it fades. Pairs with Blur In around a single hero moment. |
| `ml-fade-out` | Opacity to zero on the short token. Exits are shorter than entrances on purpose. |
| `ml-flip-out-x` | Turns away around the horizontal axis. Use it to swap two cards in the same spot. |
| `ml-puff-out` | Expands to 200% into a blur and disappears. Reads as dissolving, not leaving. |
| `ml-roll-out` | Rolls off to the right, rotating as it goes. The undo of Roll In. |
| `ml-scale-out` | Shrinks slightly as it fades. The undo of Scale In. |
| `ml-slide-out-left` | Leaves to the left. Send it out the side it came in, or the eye loses the thread. |
| `ml-slide-out-right` | Leaves to the right. The counterpart to Slide In Left. |
| `ml-zoom-out` | Collapses to 50% while fading. The undo of Zoom In. |

### Attention (10)

One shot, then back to rest. Never loop these — a repeating alert stops being an alert.

| Class | What it does |
|---|---|
| `ml-bounce` | A single vertical hop that returns to rest. Fires once - it is a nudge, not a loop. |
| `ml-head-shake` | Moves and turns at once, so it reads as a 'no' rather than a rattle. |
| `ml-heart-beat` | A double scale beat. For a count that just changed. |
| `ml-jello` | A skew wobble that settles. Playful; it fits a success state, not an error. |
| `ml-rubber-band` | Squash and stretch on the two axes. The most cartoon-like thing in the set - use sparingly. |
| `ml-shake-x` | Four short horizontal shakes. The standard 'this is wrong' signal on a form field. |
| `ml-swing` | Rotates around its top edge, like something hanging. Needs transform-origin: top center. |
| `ml-tada` | Scales and rocks - the celebration. One per video, on the thing that actually matters. |
| `ml-vibrate` | A one-pixel jitter. Reads as an alert without moving the layout. |
| `ml-wobble` | Swings sideways while rotating, damping out. Large movement - give it room. |

### Text (4)

These animate letter-spacing, which the browser cannot composite on the GPU. One line at a time, never a paragraph.

| Class | What it does |
|---|---|
| `ml-focus-in` | Blur and tracking resolve together, like a lens finding the words. |
| `ml-text-pop-up` | Rises and gains a soft shadow, so it lifts off the background rather than sliding along it. |
| `ml-tracking-in` | Letter-spacing closes from 0.6em as it fades in. For a title card - it cannot be composited on the GPU. |
| `ml-tracking-out` | Letter-spacing opens out as it fades. The exit half of a title card. |

### Ambient (5)

Loops. They run until something stops them, so one per screen.

| Class | What it does |
|---|---|
| `ml-bg-pan` | Pans a brand gradient across the element. The gradient is the four palette colours and nothing else. |
| `ml-flicker` | An irregular dip in opacity, like a sign about to go out. Atmosphere only. |
| `ml-ken-burns` | A 20-second scale-and-drift that alternates direction. For a still image that has to hold the screen. |
| `ml-pulse` | A soft breathing loop for live state. It runs forever, so it must earn its place - one per screen. |
| `ml-shimmer` | A loading placeholder sweep. Use it while real content is on its way, never as decoration. |

## Overrides

Per element, without touching the bundle:

| Property | Does |
|---|---|
| `--ml-duration` | Replaces the animation's duration |
| `--ml-ease` | Replaces its easing |
| `--ml-scale` | Multiplies the duration (what the speed classes set) |
| `--ml-index` | Stagger position |
| `--ml-stagger` | Stagger step |

## Tokens

| Token | Value |
|---|---|
| `--motion-duration-instant` | `100ms` |
| `--motion-duration-fast` | `150ms` |
| `--motion-duration-base` | `250ms` |
| `--motion-duration-moderate` | `400ms` |
| `--motion-duration-slow` | `600ms` |
| `--motion-duration-slower` | `800ms` |
| `--motion-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--motion-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--motion-ease-in` | `cubic-bezier(0.7, 0, 0.84, 0)` |
| `--motion-ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--motion-ease-linear` | `linear` |
| `--motion-stagger-tight` | `30ms` |
| `--motion-stagger-base` | `60ms` |
| `--motion-stagger-loose` | `100ms` |
| `--motion-distance-sm` | `8px` |
| `--motion-distance-md` | `16px` |
| `--motion-distance-lg` | `32px` |
| `--motion-duration-moderate` | `1ms` |
| `--motion-duration-slow` | `1ms` |
| `--motion-duration-slower` | `1ms` |
| `--motion-distance-sm` | `0px` |
| `--motion-distance-md` | `0px` |
| `--motion-distance-lg` | `0px` |
| `--motion-duration-moderate` | `1ms` |
| `--motion-duration-slow` | `1ms` |
| `--motion-duration-slower` | `1ms` |
| `--motion-distance-sm` | `0px` |
| `--motion-distance-md` | `0px` |
| `--motion-distance-lg` | `0px` |

## Provenance

Continia internal. The catalogue covers the motion ideas you find in Animate.css and Animista, but no code from either is used: their keyframes carry per-animation constants, and every animation here has to come off the duration scale above. That is the whole reason the timings differ from theirs.

Generated from `motion-library/base/base-animations.css` by `tools/gen-motion-dist.js`. Edit the source and regenerate — never edit `dist/`.
