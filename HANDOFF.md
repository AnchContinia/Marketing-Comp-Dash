# HANDOFF

Session state for picking this repo up in a fresh chat. Read
[CLAUDE.md](CLAUDE.md) first — it has the architecture, the deploy pipeline and
the standing rules. This file is only what a new chat can't reconstruct from the
code: where things stand, and which design directions have already been tried
and rejected.

Last updated: **September 9, 2026** · live at `474dcaf` on `origin/main`.

---

## Standing instructions (always in effect)

- **Push to live without asking.** Commit + push to `origin/main`; Pages serves
  it in ~1 min. Confirm with `git ls-remote origin -h refs/heads/main`.
- **Cache-bust every changed CSS/JS** with `?v=YYYYMMDDx`, bumped on **all three
  pages** that load it. Only ever move the letter *forward* — reusing an older
  value hits a copy the browser already cached.
- **Never a colored left-accent bar** on a box (`border-left:4px solid …`).
  Uniform border all the way around.
- **Brand palette only.** Tech Blue `#052975`, Innovation cyan `#8ff8ff`, Smart
  Green `#5f9e8d`, Performance Purple `#983eae`. **Never** `#9adcc9` or
  `#e0a54a`.
- **Two kinds of dates.** Content/event dates are real history — never bump
  them. `DASHBOARD_UPDATED` is "last refreshed" — set to today.
- Tone: Danish, casual, homie register. Code, commits and security notes stay
  written normally.
- `M "Assets/Continia primary - white.svg"` in `git status` is **pre-existing and
  not ours** — never stage it.

---

## Current cache versions

| Asset | Version | Loaded by |
|---|---|---|
| `dashboard.css` | `20260908e` | index, content, video |
| `dashboard.js` | `20260831e` | index, content, video |
| `favicon.svg` | `2` | all four pages incl. login |
| `linkedin-data.js` | `20260831d-li` | index, content |
| `youtube-data.js` | `20260831c-youtube` | index, video |
| `youtube-images.js` | `20260609-images` | video |
| `linkedin-images.js` / `newsletter-images.js` | `20260702-images` | content |

FontAwesome kit: **`c11880975e`** (Pro, v7.3.1 — `fa-light` resolves).

---

## What this session did

1. **LinkedIn engagement 30 → 50 posts per company.** `linkedin-data.js`
   regenerated at `CAP=50`; `windowLabel` derives from `CAP`, totals compute live
   from raw posts in `dashboard.js`.
2. **New "Video asset library" module** on `video.html`, under the YouTube
   thumbnail bank — six tiles linking to SharePoint folders (assets are too big
   for git). Nav entry added to the `NAV` array
   ([dashboard.js:2103](dashboard.js#L2103)); the section must stay a direct
   child of `.workspace` or it never gets the reveal animation.
3. **Fixed corner-bleed on all three image banks.** An `object-fit:cover` image
   pokes ~1px past a rounded overflow clip when the parent has both a `border`
   and a `border-radius`. Fixed by dropping the `.is-card` border, adding
   `border-radius:inherit` to the img and `transform:translateZ(0)`.
4. **Swapped the FontAwesome kit.** The old kit `43865117a9` started returning
   **403**, which blanked every icon on all three pages. New kit is Pro so the
   `fa-light` classes still work; all 35 icon names on the site were verified to
   render.
5. **Added a favicon** — the real Continia mark, taken from
   `Assets/Hourglass.svg` (the same two paths `.sb-brand` renders), inlined into
   `favicon.svg` on a Tech Blue rounded square at the sidebar's proportions.
6. **Many rounds on the Video-asset tile design** — see below.

---

## Video asset tile design: where it landed

**Current, approved** (`.va-*` in `dashboard.css`, restored at `474dcaf`):

- Centred icon above a centred label, both **white**; icon carries a cyan
  `drop-shadow` glow.
- Tech Blue `#052975` ground under a **diagonal Innovation-cyan glow that enters
  at the top-left and fades toward the bottom-right** (135°, four stops), over a
  light black wash on the same diagonal.
- Two theme variants: the **base rule is light mode** (more vivid ground so it
  sits on the white card); `html[data-theme="dark"]` deepens it for the dark
  canvas. Both keep white text.
- Hover: `translateY(-7px)`, brighter cyan, near-white rim.

**Already tried and rejected — don't re-propose these:**

| Direction | Verdict |
|---|---|
| Liquid glass / frosted iOS-style tiles | "De ser fandme ikke godt ud" |
| 50%-translucent glass tiles | rejected |
| Hero-pill styling (navy fill, cyan rim + cyan label) | rejected |
| Dark-mode tiles filled cyan at 50% | "det ser ikke godt ud" |
| Dark core with a uniform inner edge-glow (all edges equally) | superseded by the diagonal |
| App-tile layout: frosted round icon chip top-left, label bottom-left, outer bloom | rejected — reverted in `474dcaf` |

Two lessons worth keeping:

- **A colored left-accent bar and off-palette blues both got caught.** Every
  glow must be built from `rgba(143,248,255,…)` and `rgba(5,41,117,…)`, not from
  generic electric blues.
- **When you brighten the base, brighten the hover too.** Raising base
  luminosity once left hover *darker* than its neighbours, so hovering made a
  tile look worse.

---

## SharePoint folder links (in `video.html`)

All under `.../sites/Marketing-Generel/Shared%20Documents/Video/`: `Baggrunde`,
`Endscreens`, `Logo animationer`, `Generelle animationer`, `Graphics`. Each `<a>`
carries `target="_blank" rel="noopener"` and has its `&` escaped as `&amp;`.
The sixth tile, "Claude design", points at `https://claude.ai/design`.

The user creates the folders and sends the links — don't try to create them.

---

## Verifying a visual change headlessly

There is no build and no test suite, so the way to check a CSS change is to
render it and look. Serve a scratch dir on a port, extract the section under
test out of `video.html`, and screenshot it in both themes:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --force-device-scale-factor=2 \
  --hide-scrollbars --window-size=1160,380 --virtual-time-budget=7000 \
  --screenshot=out.png "http://localhost:8931/page.html"
```

Gotchas that cost time this session:

- **The isolated preview page collapses** unless you override `.app{display:block}`
  and clear `.main`'s margin — `.app` is a grid with a sidebar column, and
  without the sidebar the main column has no width. Symptom: the module renders
  as a ~330px column with the labels overlapping.
- **`:hover` can't be screenshotted.** Mirror the `:hover` rules onto a `.hov`
  class in the preview copy of the CSS and put that class on one tile.
- **zsh does not word-split unquoted `$VAR`.** A `for ic in $ICONS` loop over a
  newline-separated list runs **once** with the whole list as one word. Build
  generated HTML in Python instead.
- **`%20` in the SharePoint URLs breaks Python `%`-format strings.** Use
  `.replace("__A__", …)` placeholders, not `%s`.
- **Favicons ignore a hard reload.** Browsers keep them in a separate store, so
  a changed `favicon.svg` stays pinned to the tab. The fix is a query on the
  href (`favicon.svg?v=2`), which makes it a new URL.

---

## Open threads

Nothing in flight. The tile design is settled at `474dcaf` and the working tree
is clean apart from the pre-existing `Assets/Continia primary - white.svg`
modification, which is not ours to commit.
