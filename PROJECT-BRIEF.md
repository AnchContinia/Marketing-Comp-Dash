# Continia Marketing Hub — Complete Project Brief

> **Purpose of this file:** a self-contained handoff so a fresh conversation can pick up
> the project with full context (no slow accumulated history needed). Read this first, then
> [CLAUDE.md](CLAUDE.md) and the runbooks. **Snapshot date: 2026-06-19. Latest commit: `5834564`.**

---

## 1. TL;DR — what this is

A **static, zero-build marketing dashboard** for Continia — plain HTML/CSS/vanilla JS. No
framework, no bundler, no `package.json`, no tests, no build step. Published via **GitHub
Pages** from the repo root (`AnchContinia/Marketing-Comp-Dash`, branch `main`). `.nojekyll`
stops Jekyll. It tracks competitors in the **Business Central / Dynamics finance-automation**
space (AP automation, e-invoicing, banking, expense, document output).

**Editing a file and pushing to `main` is the entire deploy pipeline** — Pages serves the new
version within ~1 minute.

---

## 2. Deploy & workflow — STANDING INSTRUCTIONS

- **Push to live without asking.** Standing instruction from the user: commit + push to
  `origin/main` automatically, no permission prompt. Confirm with the new commit hash on
  `origin/main` (check local `HEAD` == `origin/main`).
- **Cache-busting (critical):** every page links CSS/JS with a `?v=YYYYMMDDx` query. When you
  edit a versioned file, **bump `?v=` on every page that loads it** or browsers serve the stale
  cached copy. The three pages must stay in sync.
- **Commit message footer:** end commit messages with
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- `.gitignore` keeps local-only working folders out of the push (`Competitor content/`,
  `Links til MCP&API/`, `.claude/`, the `.indd` source, backup HTML).
- **Git auth:** HTTPS remote, token in the macOS keychain (username `AnchContinia`). If a push
  fails with auth error, the PAT expired — re-store with
  `printf "protocol=https\nhost=github.com\nusername=AnchContinia\npassword=NEW_TOKEN\n" | git credential-osxkeychain store`.

### Local preview
Serve the folder (don't `file://` it — image-bank fetches + relative paths need a real origin):
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

---

## 3. Architecture — three pages, one shared brain

`index.html` (Home), `content.html` (Content), `video.html` (Video) are near-identical shells.
They differ only in their `<section>` content and which data scripts they load. **All three load
the same [dashboard.css](dashboard.css) and [dashboard.js](dashboard.js).**

`dashboard.js` runs on all three pages and holds **both data and render logic**. Each render
block **self-guards** so a page only runs the renderers whose data + DOM exist:
```js
if (typeof window.YT_DATA === "undefined") return;        // skip if data not loaded
var tb = document.getElementById("li-body"); if(!tb) return;  // skip if DOM absent
```
This is why one shared script powers three different pages without errors. **When you load a
data file on a new page, every renderer that consumes it must guard on its DOM element** (they
all do).

### The sidebar
Built from a single `NAV` array (`dashboard.js` ~line 1450) injected into `#sidebar` on every
page, with a scroll-spy that highlights the current section. **Add a page/section by editing
`NAV`, not by hand-writing nav markup.** Each `NAV` group = a page; `items[]` = sections
(`{id, icon (FontAwesome), label}`). Section `id` must match the `<section id="...">` for
scroll-spy + nav linking to work.

### FontAwesome
Loaded via kit; renders `<i>` as `<svg>` at runtime — **CSS must target `> svg`** for icon
styling.

---

## 4. Files & data map

| File | Global | Loaded by | Contents |
|---|---|---|---|
| `index.html` | — | — | Home: hero, metrics row, competitor list, **Content-Gap Analysis**, methodology |
| `content.html` | — | — | Content: Strategic Insights + Key Events, Event Calendar, Content Ideas, LinkedIn Engagement, image banks, SEO Scanner, image/PDF compression |
| `video.html` | — | — | Video: YouTube Analysis, In-depth Continia uploads, video ideas, YouTube thumbnail bank |
| `dashboard.js` | — | all 3 | **Data arrays + all render logic + NAV + DASHBOARD_UPDATED** |
| `dashboard.css` | — | all 3 | All styles incl. a big dark-mode override block |
| `linkedin-data.js` | `window.LI_DATA` | content.html, **index.html** | LinkedIn post engagement (13 companies) |
| `youtube-data.js` | `window.YT_DATA` | video.html, **index.html** | YouTube channels, snapshots, Continia uploads, video ideas |
| `linkedin-images.js` | `window.LINKEDIN_IMAGES` | content.html | filename index for LinkedIn image bank |
| `newsletter-images.js` | `window.NEWSLETTER_IMAGES` | content.html | filename index for Newsletter image bank |
| `youtube-images.js` | `window.YOUTUBE_IMAGES` | video.html | filename index for YouTube thumbnail bank |
| `archive.js` | `window.DASH_ARCHIVE` | **none** (not served) | append-only "brain" — dated snapshots for month-over-month comparison |

> **Note:** `linkedin-data.js` + `youtube-data.js` are now **also loaded on index.html** (added
> for the Content-Gap module). Their video/LinkedIn table renderers guard on DOM elements that
> don't exist on Home, so they no-op there.

**Image banks** = filename arrays only; actual images live in `Assets/<folder>/`
(`Linkedin images`, `Newsletter images`, `Youtube images`). Index JS is auto-generated
"newest-first" with filenames **normalized to NFC** (macOS NFD names 404 on Pages/Linux).
When adding bank images, **push the actual `Assets/<folder>` files too** — not just the index.

**Fonts:** Alliance No.2 (in `fonts/`). **Brand palette:** Tech Blue/navy `#052975`,
Innovation Blue/cyan `#8ff8ff`, Performance Purple `#983eae`, Smart Green `#5f9e8d`.

---

## 5. Data structures (current counts as of 2026-06-19)

### `dashboard.js` (top of file)
- **`const data`** (line 2) — **23 competitor cards**. Fields: `n` (name), `o` (owner), `cat`
  (category), `head` (headline), `rel` (latest/key dev), `str` (strategic move), `pos`
  (positioning), `ai` (AI angle), `sc` (scale/status), `sl` (badge label), `stance`
  (`ai`/`cons`/`steady`), `prox` (`High`/`Medium`/`Low`), `s` (sources: `[["label","url"],…]`).
- **`const events`** (line 234) — **25 Key Events**. Shape `{w:"May 13, 2026", c:"ai", t:"<b>X</b> did Y."}`.
  `c` = category colour (`ai`/`cons`/`steady`/omit). `w` dates are **real historical dates**.
- **`const contentIdeas`** (line 262, closes ~323) — **12 ideas**. Shape
  `{type, score, fmt:[…], title, tease, reason, s:[["label","url"]…]}`. Rendered sorted by `score` desc.
- **`var DASHBOARD_UPDATED`** (line ~1522) — `"2026-06-19"`. Single source of truth for the
  topbar "Updated …" and footer date on all pages. **Set to today on every refresh.**
- **`var NAV`** (~line 1450) — sidebar definition.

### `linkedin-data.js` → `window.LI_DATA`
```js
{ source, captured:"2026-06-19", windowLabel:"last 10 posts each · public engagement",
  companies:[ { name, ours:true?, posts:[ {t:title, ty:type, r:reactions, c:comments, rp:reposts} ] } ] }
```
- **13 companies**: Continia (`ours:true`), Truvio, Equisys, Medius, Qvalia, AMC Banking,
  B2Brouter, Dooap, Yavrio, Rillion, Fidesic, Tipalti, Stampli. (AMC has 9 posts, rest 10.)
- **Deliberately excluded** (watch-list, not cards): **Incedo** (consulting firm),
  **SignUp Software** (Truvio's old brand → covered by ExFlow/Truvio card), **Stripe** (payments benchmark).
- `ty` types: Image / Video / Carousel / Document / Text / Poll / Event / Article/Link. Render
  shows the type pill only when `ty` exists.
- dashboard.js computes totals/avg, sorts by total desc, bar scale by max total.

### `youtube-data.js` → `window.YT_DATA`
```js
{ source, channels:[ {name, url, totalViews} ],          // 17 channels (registry)
  snapshots:[ {date, stats:{ "<channel>":{subs,monthlyViews,monthlyViewsLabel,monthlySubs,earnings,flag?} }} ], // 4 snapshots, newest rendered
  continiaUploads:{ source, channelUrl, snapshots:[ {date, defaultPeriod, periods:{ "7D"|"28D"|"3M"|"1Y"|"YTD":{longForm:{uploads,views}, shorts:{uploads,views}} }, recent:[], top:[] } ] },
  videoIdeas:{ longForm:[{score,title,desc}], shortForm:[…] } }   // 6 long + 6 short
```
- Newest snapshot (2026-06-18) has stats for **7** channels (Medius, Stampli, Yooz, Tipalti,
  Continia, Equisys (Zetadocs), Dooap). The other 10 registry channels render as benign "—"/0
  rows until captured.
- `monthlyViews` must be a real **number** (drives bar; negative = red "down" bar). Use
  `flag:"correction"` for one-time recount spikes (suppressed from bar scale).

### `archive.js` → `window.DASH_ARCHIVE.snapshots[]` (the "brain")
Append-only history, **NOT loaded by any page**. Each snapshot:
`{date, linkedin:{source,captured,windowLabel,companies}, news:{events}, competitors:[…]}`.
Currently **2 snapshots**: 2026-06-19 (newest) and 2026-06-18. **Never edit/delete an existing
dated snapshot; prepend a new one** on each refresh. YouTube history lives in `youtube-data.js`,
NOT the brain. Convention: same-date = replace, new date = prepend.

---

## 6. The Content-Gap Analysis module (newest, on Home)

Lives on **index.html** under the competitor list (`<section id="content-gap">` → `#cg-body`),
with a left-nav entry under Home. Rendered by an IIFE in `dashboard.js` (~line 417), guarded by
`LI_DATA` + `YT_DATA` + `#cg-body`. **Everything is derived live — no hand-keyed numbers.**

**Design = theme bullet-bars** (navy "you" bar over a gray "field/competitor" bar, per content
theme; the gap = where gray runs long and navy stays short). Built to match a mockup the user
supplied (`content-gap-module.html`).

- **Theme tagging:** each LinkedIn post title is tagged with ONE theme via a keyword map
  (first match wins; no match → excluded). Themes: AI / agentic AP · E-invoicing mandates ·
  Product demos · Customer stories · Banking & payments · Expense management. (`"ai"` uses a
  `\bai\b` word-boundary to avoid matching "email/campaign/Spain"; others are substring.)
- **Compare-against dropdown:** Field average OR any of the 13 competitors → re-renders bars,
  metric cards, deltas, gaps.
- **Metric cards** (cyan top-accent): Share of voice · LinkedIn engagement (you/post vs target)
  · YouTube reach (#rank/N) · Biggest gap.
- **Deltas:** red (behind) / green (ahead) / neutral (on par).
- **Gaps to close:** themes where you're behind, each with a **"Plan it ↗"** link to
  `content.html#content-ideas` (no Claude prompt bridge on a static site).
- **No 30d/90d/YTD period toggle** (the mockup suggested one): LinkedIn captures carry no
  per-post timestamps yet ("last 10 posts each"), so periods would be fabricated. Shows the
  capture date instead. Can light up once a post-date time-series is collected.

---

## 7. Key conventions (do not break)

### Two kinds of dates
1. **Content/event dates** (`events` `w` field, dates in card text, `captured`) are **real
   historical dates** — never bump to today.
2. **`DASHBOARD_UPDATED`** is the "last refreshed" stamp — **set to today on every refresh.**

### Period pill
Hero pill `Period: 2025-<Mon> <Year>` on all three pages — bump end month/year to the run
month on a full update; keep the `2025-` start.

### Headcount truthfulness
Keep counts consistent across pages when adding/removing competitors (hero pill "Competitors: N",
"N visible", chip "All (N)", metrics tiles for tracked / M&A / BC-native).

### Encoding hygiene (recurring gotcha)
- **Pasted files are often UTF-8-mojibake** (`Â·`, `â`, `Ã³`, `KÃ¸r`). **Never write pasted
  content verbatim** — re-type the genuinely-new portions, reuse existing clean strings. Scan:
  `grep -c $'\xc3\x82\|\xc3\x83\|\xc2\xac' file` (expect 0).
- **LinkedIn titles → normalize to plain ASCII** (the export uses math-bold unicode 𝗙𝗿𝗼𝗺 +
  emoji + accents). Transliterate accents, strip emoji.
- **Image-bank filenames → NFC** or they 404 on Pages.

### Reading/parsing JS files in this repo (no Node)
- **Parse-check:** `osascript -l JavaScript -e 'ObjC.import("Foundation");var s=$.NSString.stringWithContentsOfFileEncodingError("FILE",4,null).js;try{new Function(s);"OK"}catch(e){"ERR "+e.message}'`
  (read with NSString UTF-8 encoding `4` — plain JXA `app.read` mangles `·`/UTF-8).
- **Load data globals:** `var window={}; new Function("window", src)(window);`.

### Visual verification (headless Chrome)
```bash
python3 -m http.server PORT &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --window-size=1320,1400 --screenshot=/tmp/out.png "http://localhost:PORT/page.html"
```
- **Dark mode:** copy the HTML and inject `data-theme="dark"` on `<html>` (or set
  `localStorage continia-theme=dark` — the page reads it on load). Often isolate a module by
  injecting `<style>#other,#sections{display:none!important}</style>` before `</head>`.
- To force-open dropdowns/details for a screenshot, inject CSS like
  `.li-detail{display:table-row!important}`. To test JS interactions, inject a `load` listener
  that dispatches events, and add `--virtual-time-budget=1500`.
- **Use Python to inject CSS/HTML** (sed chokes on `#` selectors and `<` chars).

---

## 8. Dark mode system

Toggled via `html[data-theme="dark"]` (persisted in `localStorage["continia-theme"]`; an inline
`<script>` in each page's `<head>` applies it before paint). The base stylesheet hardcodes light
colors; a large **dark override block** at the bottom of `dashboard.css` flips CSS custom
properties + many per-component overrides.

**Dark vars:** `--ink:#ffffff` (main text is pure white), `--muted:#9aa7be`, `--paper:#141c2e`,
`--canvas:#0b1120`, `--panel:#1a2336`, `--line:#28324a`, `--line2:#3a465f`, `--navy:#6ea8ff`,
cyan accent `#8ff8ff`. When you add a component, add its dark overrides too and **verify in both
themes** before pushing.

---

## 9. Monthly update runbooks (trigger phrases)

- **[FULL-UPDATE.md](FULL-UPDATE.md)** — trigger **"Opdater alt."** Master routine: competitor
  cards + per-source sweep, Key Events, YouTube Social Blade snapshot, Continia vidIQ uploads,
  image-bank regen, **archive snapshot (the brain)**, stamp `DASHBOARD_UPDATED` once, push once.
  Has the correct data-location map + the competitor LinkedIn roster. Needs Claude-in-Chrome for
  Social Blade/vidIQ.
- **[NEWS-UPDATE.md](NEWS-UPDATE.md)** — trigger **"Kør news-opdateringen."** Refreshes `events`
  + `data` arrays. Every claim stays backed by a clickable public source in the card's `s` array.
- **[YOUTUBE-UPDATE.md](YOUTUBE-UPDATE.md)** — trigger **"Kør YouTube-opdateringen."** Reads
  Social Blade → appends a new snapshot to `youtube-data.js` (keep old ones). Has the 17-channel
  list with `/channel/<ID>` URLs + the vidIQ `continiaUploads` reading guide.

> **Stale-location note:** NEWS-UPDATE.md and YOUTUBE-UPDATE.md still say the `data`/`events`
> arrays + `DASHBOARD_UPDATED` live in `index.html` — **they were moved to `dashboard.js`.**
> FULL-UPDATE.md has the correct map.

> **Environment caveat:** "Claude-in-Chrome" (the cloud app with browser tools) is a **separate
> environment** from this VS Code session. Its changes only reach this repo if it pushes to
> `origin/main` or the user pastes the file. Social Blade/vidIQ block plain `fetch`/WebFetch
> (403), so they need the real browser. Verify pasted finish-step claims against `git status`
> before acting — don't fabricate commits.

---

## 10. Serverless proxies (separate from the static site)

Four independent **Cloudflare Workers**; API keys live only as encrypted Worker secrets, never
in the browser. The root `wrangler.toml` deploys **only tinyjpg-proxy** (no `[assets]` block on
purpose — it does NOT deploy the static site). The others deploy manually with `wrangler deploy`
from inside their folder. Each proxy URL is hardcoded as a `var` in `dashboard.js`.

| Proxy | Folder | Powers | `dashboard.js` var | Secret |
|---|---|---|---|---|
| TinyJPG | `tinyjpg-proxy/` | Image compression (Content) | `PROXY` | `TINIFY_KEY` |
| iLovePDF | `pdf-proxy/` | PDF compression (Content) | `PROXY_PDF` | `ILOVEPDF_PUBLIC_KEY` |
| SEO | `seo-proxy/` | SEO Scanner (Content) | (in dashboard.js) | — |
| Calendar | `calendar-proxy/` | Event Calendar shared events (Workers KV) | (in dashboard.js) | KV: `CAL_KV` |

Gotchas recorded in memory: iLovePDF auth 500s on a bad/whitespace key; "TINIFY error on POST =
wrong code deployed" for the SEO proxy; "CAL_KV not bound" for the calendar proxy. See each
folder's `README.md` for deploy steps.

---

## 11. This session's work log (most recent first)

1. **Content-Gap module rebuilt** to a user-supplied mockup: theme bullet-bars, compare-against
   dropdown, cyan metric cards, red/green deltas, Gaps-to-close with Plan-it links. Replaced the
   earlier format-mix version. (`5834564`)
2. **Content-Gap restyled** to the page design system + added the **left-nav entry** under Home. (`4db773d`/`bda3566` lineage)
3. **Content-Gap module created** (first version, format-mix based) on Home under the competitor
   list; loaded `linkedin-data.js` + `youtube-data.js` on index.html.
4. **Dark mode:** breadcrumb tuning then `--ink #e6edf8 → #ffffff` site-wide (main text pure white).
5. **LinkedIn data refresh** from the Jun 19 re-scrape: restored post-type pills + real titles,
   all 13 companies, ASCII-normalized; new brain snapshot 2026-06-19; `DASHBOARD_UPDATED` → 06-19.
6. **6 new Content Ideas** added (now 12 total), grounded in the LinkedIn capture + news cycle.
7. **Strategic Insights / Key Events** layout: made Insights compact + Key Events a height-matched
   internal-scroll list (`height:0;min-height:100%` trick so Insights drives the row height).
8. **YouTube registry** expanded 7 → 17 tracked channels.

---

## 12. Current state snapshot (2026-06-19)

- **Latest commit:** `5834564` (in sync with `origin/main`).
- **Cache versions:** `dashboard.css?v=20260619c` · `dashboard.js?v=20260619d` ·
  `linkedin-data.js?v=20260619-li` · `youtube-data.js?v=20260618b-youtube`.
- **`DASHBOARD_UPDATED`:** `2026-06-19`.
- **Counts:** 23 competitors · 25 events · 12 content ideas · 13 LinkedIn companies ·
  17 YouTube channels (4 snapshots, 7 with stats) · 6+6 video ideas · 2 brain snapshots.

## 13. Open items / nice-to-haves (not started; don't do unprompted)

- Hide the 10 not-yet-captured YouTube registry rows until they have stats (one-line render filter).
- Add a true LinkedIn posting **cadence** axis once post-date capture exists (would enable the
  Content-Gap period toggle).
- Restore Dooap/Tipalti or zero-pad LinkedIn posts to a fixed 10 (AMC currently 9).

---

*Generated as a project handoff. Keep [CLAUDE.md](CLAUDE.md) as the canonical short instructions;
this brief is the fuller pickup context.*
