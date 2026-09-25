/* Generates motion-library/entries/<slug>/ and motion-library/library.json from
   motion-library/base/base-animations.css plus the META table below.

   The base stylesheet is the single source of truth for the motion itself: each
   entry's standalone CSS is *extracted* from it, so an entry can never drift
   from what the hub actually ships. META carries only what CSS cannot say - the
   display name, the category, the blurb and the gallery demo element.

   Regenerate with:  node tools/gen-motion-entries.js
   Then regenerate the video-facing previews:  node tools/gen-motion-previews.js */
var fs = require("fs"), path = require("path");
var R = path.join(__dirname, "..");
var ML = path.join(R, "motion-library");
var BASE = fs.readFileSync(path.join(ML, "base", "base-animations.css"), "utf8");

var CHIP = function (t) { return '<span class="mlp-chip">' + t + "</span>"; };
var HEAD = function (t) { return '<span class="mlp-headline">' + t + "</span>"; };

/* cat   - entrance | exit | attention | text | ambient
   blurb - the developer-facing one-liner in the gallery
   demo  - the element the gallery animates */
var META = {
  /* ---- entrance ---- */
  "fade-in":     { name: "Fade In", cat: "entrance", demo: CHIP("Document Capture"),
    blurb: "Opacity only, no movement. The quietest way to bring something on." },
  "fade-up":     { name: "Fade Up", cat: "entrance", demo: CHIP("Expense Management"),
    blurb: "Fades in while rising 16px. The default entrance for cards, list items and section content." },
  "fade-down":   { name: "Fade Down", cat: "entrance", demo: CHIP("Continia Banking"),
    blurb: "Fades in while settling down from 16px above. For anything anchored to the top of the frame." },
  "slide-in-left":  { name: "Slide In Left", cat: "entrance", demo: CHIP("Document Output"),
    blurb: "Travels in from the left across 32px. Reads as arriving from off-screen." },
  "slide-in-right": { name: "Slide In Right", cat: "entrance", demo: CHIP("Continia Finance"),
    blurb: "The mirrored arrival. Use the pair on opposing columns, never inside one list." },
  "scale-in":    { name: "Scale In", cat: "entrance", demo: CHIP("Order Matching"),
    blurb: "Grows from 96%. Feels anchored to the point it appears at." },
  "blur-in":     { name: "Blur In", cat: "entrance", demo: CHIP("Peppol e-invoicing"),
    blurb: "Resolves from an 8px blur. Expensive to render - one authored moment, never a list." },
  "reveal-up":   { name: "Reveal Up", cat: "entrance", demo: HEAD("Automate your AP in Business Central"),
    blurb: "A clip-path mask lifts off the element. The text itself never moves, so long lines stay readable." },
  "zoom-in":     { name: "Zoom In", cat: "entrance", demo: CHIP("21,000+ customers"),
    blurb: "Comes forward from 50%. The loud cousin of Scale In - for a number or a claim, not a list." },
  "bounce-in":   { name: "Bounce In", cat: "entrance", demo: CHIP("Trial started"),
    blurb: "Overshoots to 104% and settles. The only entrance that overshoots; keep it for confirmations." },
  "flip-in-x":   { name: "Flip In X", cat: "entrance", demo: CHIP("Invoice matched"),
    blurb: "Rotates in around the horizontal axis in 3D, like a card turning face-up." },
  "flip-in-y":   { name: "Flip In Y", cat: "entrance", demo: CHIP("Approval sent"),
    blurb: "The same 3D turn around the vertical axis. Pairs with Flip Out X for a two-sided card." },
  "rotate-in":   { name: "Rotate In", cat: "entrance", demo: CHIP("New in 2026 R2"),
    blurb: "Swings in from -45 degrees while scaling up. Restrained on purpose - a full spin reads as a toy." },
  "swirl-in":    { name: "Swirl In", cat: "entrance", demo: CHIP("Continia Hub"),
    blurb: "Half a turn plus a scale from 40%. A deliberate flourish - one per video at most." },
  "roll-in":     { name: "Roll In", cat: "entrance", demo: CHIP("Peppol ready"),
    blurb: "Rolls in from off-screen left, rotating as it travels." },
  "back-in-up":  { name: "Back In Up", cat: "entrance", demo: CHIP("Secure Archive"),
    blurb: "Rises into frame at 70%, holds, then comes forward to full size. Reads as coming from behind the frame." },
  "tilt-in":     { name: "Tilt In", cat: "entrance", demo: CHIP("Web Approval Portal"),
    blurb: "A 3D lean: rotates back on the Y axis and pushes forward in Z. Good for screenshots and device shots." },
  "puff-in":     { name: "Puff In", cat: "entrance", demo: CHIP("OCR complete"),
    blurb: "Contracts from 200% out of a blur. Reads as materialising rather than arriving." },
  "slide-in-blurred": { name: "Slide In Blurred", cat: "entrance", demo: CHIP("Continia Delivery Network"),
    blurb: "Travels up with a motion-blur streak and stretches back into shape. The most expensive entrance here." },
  "light-speed-in":   { name: "Light Speed In", cat: "entrance", demo: CHIP("Instant posting"),
    blurb: "Skews in from the right at speed and straightens out. Built on the short duration token - it must feel fast." },

  /* ---- exit ---- */
  "fade-out":    { name: "Fade Out", cat: "exit", demo: CHIP("Dismissed"),
    blurb: "Opacity to zero on the short token. Exits are shorter than entrances on purpose." },
  "scale-out":   { name: "Scale Out", cat: "exit", demo: CHIP("Closing"),
    blurb: "Shrinks slightly as it fades. The undo of Scale In." },
  "zoom-out":    { name: "Zoom Out", cat: "exit", demo: CHIP("Cleared"),
    blurb: "Collapses to 50% while fading. The undo of Zoom In." },
  "flip-out-x":  { name: "Flip Out X", cat: "exit", demo: CHIP("Turned over"),
    blurb: "Turns away around the horizontal axis. Use it to swap two cards in the same spot." },
  "slide-out-left":  { name: "Slide Out Left", cat: "exit", demo: CHIP("Dismissed left"),
    blurb: "Leaves to the left. Send it out the side it came in, or the eye loses the thread." },
  "slide-out-right": { name: "Slide Out Right", cat: "exit", demo: CHIP("Dismissed right"),
    blurb: "Leaves to the right. The counterpart to Slide In Left." },
  "roll-out":    { name: "Roll Out", cat: "exit", demo: CHIP("Rolled away"),
    blurb: "Rolls off to the right, rotating as it goes. The undo of Roll In." },
  "puff-out":    { name: "Puff Out", cat: "exit", demo: CHIP("Gone"),
    blurb: "Expands to 200% into a blur and disappears. Reads as dissolving, not leaving." },
  "back-out-down":   { name: "Back Out Down", cat: "exit", demo: CHIP("Sent back"),
    blurb: "Drops to 70% in place, then falls out of frame. The undo of Back In Up." },
  "blur-out":    { name: "Blur Out", cat: "exit", demo: CHIP("Out of focus"),
    blurb: "Loses focus as it fades. Pairs with Blur In around a single hero moment." },

  /* ---- attention (one-shot) ---- */
  "bounce":      { name: "Bounce", cat: "attention", demo: CHIP("New document"),
    blurb: "A single vertical hop that returns to rest. Fires once - it is a nudge, not a loop." },
  "shake-x":     { name: "Shake X", cat: "attention", demo: CHIP("Validation failed"),
    blurb: "Four short horizontal shakes. The standard 'this is wrong' signal on a form field." },
  "head-shake":  { name: "Head Shake", cat: "attention", demo: CHIP("Not approved"),
    blurb: "Moves and turns at once, so it reads as a 'no' rather than a rattle." },
  "wobble":      { name: "Wobble", cat: "attention", demo: CHIP("Unstable"),
    blurb: "Swings sideways while rotating, damping out. Large movement - give it room." },
  "jello":       { name: "Jello", cat: "attention", demo: CHIP("Squeezed"),
    blurb: "A skew wobble that settles. Playful; it fits a success state, not an error." },
  "tada":        { name: "Tada", cat: "attention", demo: CHIP("All 42 invoices posted"),
    blurb: "Scales and rocks - the celebration. One per video, on the thing that actually matters." },
  "swing":       { name: "Swing", cat: "attention", demo: CHIP("Pending approval"),
    blurb: "Rotates around its top edge, like something hanging. Needs transform-origin: top center." },
  "heart-beat":  { name: "Heart Beat", cat: "attention", demo: CHIP("2 awaiting you"),
    blurb: "A double scale beat. For a count that just changed." },
  "rubber-band": { name: "Rubber Band", cat: "attention", demo: CHIP("Stretch"),
    blurb: "Squash and stretch on the two axes. The most cartoon-like thing in the set - use sparingly." },
  "vibrate":     { name: "Vibrate", cat: "attention", demo: CHIP("Sync failed"),
    blurb: "A one-pixel jitter. Reads as an alert without moving the layout." },

  /* ---- text ---- */
  "tracking-in":  { name: "Tracking In", cat: "text", demo: HEAD("CONTINIA"),
    blurb: "Letter-spacing closes from 0.6em as it fades in. For a title card - it cannot be composited on the GPU." },
  "tracking-out": { name: "Tracking Out", cat: "text", demo: HEAD("CONTINIA"),
    blurb: "Letter-spacing opens out as it fades. The exit half of a title card." },
  "focus-in":     { name: "Focus In", cat: "text", demo: HEAD("Built Inside Business Central"),
    blurb: "Blur and tracking resolve together, like a lens finding the words." },
  "text-pop-up":  { name: "Text Pop Up", cat: "text", demo: HEAD("30+ years"),
    blurb: "Rises and gains a soft shadow, so it lifts off the background rather than sliding along it." },

  /* ---- ambient (loops) ---- */
  "pulse":       { name: "Pulse", cat: "ambient", demo: '<span class="mlp-dot" aria-hidden="true"></span><span class="mlp-chip">Sync running</span>',
    blurb: "A soft breathing loop for live state. It runs forever, so it must earn its place - one per screen." },
  "shimmer":     { name: "Shimmer", cat: "ambient", demo: '<span class="mlp-skel"></span>',
    blurb: "A loading placeholder sweep. Use it while real content is on its way, never as decoration." },
  "flicker":     { name: "Flicker", cat: "ambient", demo: CHIP("LIVE"),
    blurb: "An irregular dip in opacity, like a sign about to go out. Atmosphere only." },
  "ken-burns":   { name: "Ken Burns", cat: "ambient", demo: '<span class="mlp-skel wide"></span>',
    blurb: "A 20-second scale-and-drift that alternates direction. For a still image that has to hold the screen." },
  "bg-pan":      { name: "Background Pan", cat: "ambient", demo: '<span class="mlp-skel wide"></span>',
    blurb: "Pans a brand gradient across the element. The gradient is the four palette colours and nothing else." }
};

/* ---------- pull each animation's own CSS out of the base stylesheet ---------- */
function rulesFor(slug) {
  var cls = ".ml-" + slug, out = [];
  /* the class's own declaration block(s) */
  /* (?![\w-]) and not \b: \b matches between "bounce" and "-in", which would
     pull .ml-bounce-in into the .ml-bounce entry */
  var re = new RegExp("^\\" + cls + "(?![\\w-])[^{]*\\{[^}]*\\}", "gm");
  var m; while ((m = re.exec(BASE))) out.push(m[0]);
  /* its keyframes */
  var k = BASE.indexOf("@keyframes ml-" + slug);
  while (k > -1) {
    /* only an exact name match, so ml-fade-in does not swallow ml-fade-in-x */
    var after = BASE.slice(k + ("@keyframes ml-" + slug).length, k + ("@keyframes ml-" + slug).length + 1);
    if (after === " " || after === "{") {
      var d = 0, i = BASE.indexOf("{", k), s = i;
      for (; i < BASE.length; i++) {
        if (BASE[i] === "{") d++;
        else if (BASE[i] === "}") { d--; if (!d) break; }
      }
      out.push(BASE.slice(k, i + 1));
    }
    k = BASE.indexOf("@keyframes ml-" + slug, k + 1);
  }
  if (!out.length) { console.error("No CSS found for .ml-" + slug + " in base-animations.css"); process.exit(1); }
  /* a longer slug leaking into a shorter one is the failure mode worth guarding */
  out.forEach(function (r) {
    var m = r.match(/^\.ml-[\w-]+|@keyframes ml-[\w-]+/);
    if (m && m[0].replace(/^(\.ml-|@keyframes ml-)/, "") !== slug) {
      console.error("Rule for a different animation landed in " + slug + ": " + m[0]);
      process.exit(1);
    }
  });
  return out;
}

var SHARED =
  "/* shared timing, copied from base-animations.css */\n" +
  ".ml-SLUG {\n" +
  "  animation-duration: calc(var(--ml-duration, var(--motion-duration-moderate)) * var(--ml-scale, 1));\n" +
  "  animation-timing-function: var(--ml-ease, var(--motion-ease-out));\n" +
  "  animation-delay: calc(var(--ml-index, 0) * var(--ml-stagger, var(--motion-stagger-base)));\n" +
  "  animation-fill-mode: both;\n" +
  "}\n";

function tokensIn(css) {
  var t = {}, m, re = /var\((--motion-[a-z-]+)/g;
  while ((m = re.exec(css))) t[m[1]] = 1;
  return Object.keys(t).sort();
}

var lib = [], made = 0;
Object.keys(META).forEach(function (slug) {
  var e = META[slug], own = rulesFor(slug).join("\n");
  var loops = /animation-iteration-count:\s*infinite/.test(own);
  var css = tokensIn(SHARED + own);

  var dir = path.join(ML, "entries", slug);
  fs.mkdirSync(dir, { recursive: true });

  var head =
    "/* Continia Motion Library — " + e.name + "\n" +
    "   GENERATED by tools/gen-motion-entries.js from base/base-animations.css.\n" +
    "   These rules already ship in base/base-animations.css. This file exists so the\n" +
    "   entry can be lifted on its own; do not load both, or the animation is declared\n" +
    "   twice. Requires tokens/motion-tokens.css for the custom properties. */\n\n";
  fs.writeFileSync(path.join(dir, slug + ".css"),
    head + SHARED.replace(/SLUG/g, slug) + "\n" + own + "\n");

  var html =
    "<!-- Requires: motion-library/tokens/motion-tokens.css, motion-library/base/base-animations.css\n" +
    "     No JavaScript. To trigger on scroll, add class \"ml-paused\" and remove it with an IntersectionObserver. -->\n" +
    '<div class="ml-' + slug + '">Automate your AP in Business Central</div>\n';
  if (!loops) {
    html += "\n<!-- slower: ml-slow (1.5x), ml-slower (2x), ml-slowest (3x) -->\n" +
      '<div class="ml-' + slug + ' ml-slower">Automate your AP in Business Central</div>\n' +
      "\n<!-- staggered: --ml-index multiplies --motion-stagger-base -->\n<ul>\n" +
      ["Document Capture", "Expense Management", "Continia Banking"].map(function (t, i) {
        return '  <li class="ml-' + slug + '" style="--ml-index: ' + i + '">' + t + "</li>";
      }).join("\n") + "\n</ul>\n";
  }
  fs.writeFileSync(path.join(dir, slug + ".html"), html);

  var meta = {
    slug: slug, name: e.name, kind: "animation",
    source: "continia", sourceUrl: "",
    license: "Continia internal", category: e.cat, "class": "css",
    dependencies: [], tokens: css,
    options: {
      "--ml-duration": { type: "token", "default": "--motion-duration-moderate" },
      "--ml-ease": { type: "token", "default": "--motion-ease-out" },
      "--ml-scale": { type: "number", "default": 1 },
      "--ml-index": { type: "number", "default": 0 },
      "--ml-stagger": { type: "token", "default": "--motion-stagger-base" }
    },
    reducedMotion: loops
      ? "Loop stops; the element rests in its idle state."
      : (/rotate|skew|perspective|letter-spacing|scale\((?!0\.9)/.test(own)
        ? "Swapped for a plain fade - a rotation or a skew cannot be collapsed by shortening it."
        : "Duration and travel distance collapse to ~0, so the element appears in its final state."),
    notPorted: [], brandNotes: "",
    blurb: e.blurb, demo: e.demo, addedAt: "2026-09-24"
  };
  fs.writeFileSync(path.join(dir, "meta.json"), JSON.stringify(meta, null, 2) + "\n");
  lib.push(meta); made++;
});

/* Component entries are hand-written - a JS component cannot be extracted from
   a keyframe - so their files are left alone and only their meta.json is read
   into library.json. They are listed here so an orphan is still an error. */
var COMPONENTS = ["reel-gallery", "magic-transform"];
COMPONENTS.forEach(function (slug) {
  var f = path.join(ML, "entries", slug, "meta.json");
  if (!fs.existsSync(f)) { console.error("Component entry " + slug + " has no meta.json"); process.exit(1); }
  var m = JSON.parse(fs.readFileSync(f, "utf8"));
  if (m.kind !== "component") { console.error(slug + "/meta.json must carry kind: \"component\""); process.exit(1); }
  ["html", "css", "js"].forEach(function (ext) {
    if (!fs.existsSync(path.join(ML, "entries", slug, slug + "." + ext))) {
      console.error("Component entry " + slug + " is missing " + slug + "." + ext); process.exit(1);
    }
  });
  lib.push(m);
});

/* an entry folder with neither a META row nor a COMPONENTS row is a leftover -
   say so rather than leaving it in the tree where the gallery will not list it */
fs.readdirSync(path.join(ML, "entries")).forEach(function (d) {
  if (!META[d] && COMPONENTS.indexOf(d) < 0) console.error("WARNING: entries/" + d + " has no META row - orphaned");
});

var order = { entrance: 0, exit: 1, attention: 2, text: 3, ambient: 4, ui: 5 };
lib.sort(function (a, b) {
  return (order[a.category] - order[b.category]) || a.name.localeCompare(b.name);
});
fs.writeFileSync(path.join(ML, "library.json"), JSON.stringify(lib, null, 2) + "\n");
console.log("entries: " + made + " generated + " + COMPONENTS.length + " component  ·  library.json: " + lib.length);
