# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A **static, zero-build marketing dashboard** for Continia — plain HTML/CSS/vanilla JS, no
framework, no bundler, no package.json, no tests. It is published via **GitHub Pages** from
the repo root (`AnchContinia/Marketing-Comp-Dash`, branch `main`). The `.nojekyll` file keeps
Pages from running Jekyll over the files.

**Network note:** the Cowork sandbox and its device shell have **no outbound network**. Anything
that fetches (news feeds, Social Blade, LinkedIn) runs in Claude Code on the Mac or in the Monday
scheduled task, not from Cowork.

There is **no build, lint, or test step.** Editing a file and pushing to `main` is the entire
deploy pipeline — GitHub Pages serves the new version within ~1 minute.

To preview locally, serve the folder (don't just `file://` it — the image-bank fetches and
relative paths need a real origin):

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Session state — what was last worked on, which design directions the user has already
rejected, and the headless-verification gotchas — lives in [HANDOFF.md](HANDOFF.md).
Read it when picking the repo up in a fresh chat.

## Deploy / workflow

- Commit + push to `origin/main` → live in ~1 min. Confirm by checking the new commit hash on
  `origin/main`. **Push directly to live without asking** (standing instruction from the user).
- **Cache busting:** every page links CSS/JS with a `?v=YYYYMMDDx` query (e.g.
  `dashboard.css?v=20260610c`). When you edit `dashboard.css` or a `*.js` file, **bump the `?v=`
  on every page that loads it**, or browsers serve the stale cached copy. The three pages must
  stay in sync.
- `.gitignore` keeps local-only working folders out of the push (`Competitor content/`,
  `Links til MCP&API/`, `.claude/`, the `.indd` source, the backup HTML).

## Architecture

**Four pages, one shared brain.** `index.html` (Home), `content.html` (Content),
`video.html` (Video) and `knowledge.html` (Continia knowledge base) are near-identical shells.
They differ only in their `<section>` content and which data scripts they load. All four load
the same [dashboard.css](dashboard.css) and [dashboard.js](dashboard.js).

[dashboard.js](dashboard.js) runs on all three pages. It contains **both the data and the
render logic**, and each render block self-guards so a page only runs the renderers whose data
and DOM actually exist:

```js
if (typeof window.YT_DATA === "undefined") return;   // skip on pages that didn't load it
```

This is why one shared script can power four different pages without errors. Key contents:

- **Inline data arrays** (top of the file): `data` (competitor cards), `events` (Key Events
  timeline), `contentIdeas`. **Note:** the runbooks say these live in `index.html` — they don't,
  they were moved into `dashboard.js`. Edit them here.
- **Render functions** for competitors (with stance/proximity filters + search), events, content
  ideas, YouTube tables, image banks, and the image-compression tool.
- **The sidebar** is built from a single `NAV` array (~line 698) and injected into `#sidebar` on
  every page, with a scroll-spy that highlights the current section. Add a page or section by
  editing `NAV`, not by hand-writing nav markup in each HTML file.
- **`DASHBOARD_UPDATED`** (~line 768, `"YYYY-MM-DD"`): the single source of truth for both the
  topbar "Updated …" and the footer date across all pages. (The runbooks say it's in
  `index.html` — it's actually here.)

**Data the pages load (page-specific `<script>` tags):**

| File | Global | Loaded by | Content |
|---|---|---|---|
| [youtube-data.js](youtube-data.js) | `window.YT_DATA` | video.html | YouTube snapshots, Continia upload stats, video ideas |
| [youtube-images.js](youtube-images.js) | `window.YOUTUBE_IMAGES` | video.html | filename index for the YouTube thumbnail bank |
| [linkedin-images.js](linkedin-images.js) | `window.LINKEDIN_IMAGES` | content.html | filename index for the LinkedIn image bank |
| [newsletter-images.js](newsletter-images.js) | `window.NEWSLETTER_IMAGES` | content.html | filename index for the Newsletter image bank |
| [continia-knowledge.js](continia-knowledge.js) | `window.CK_DATA` | knowledge.html | the Continia knowledge base: solutions, modules, platform components, naming, gotchas |

**Image banks** are filename arrays only; the actual images live in `Assets/<folder>/`
(`Linkedin images`, `Newsletter images`, `Youtube images`). The bank JS files are auto-generated
"newest-first" indexes with filenames **normalized to NFC** so they match the git/GitHub-served
paths (macOS NFD filenames otherwise 404 on Pages). When you add bank images, **push the actual
`Assets/<folder>` files too — not just the index JS** — or the bank renders broken thumbnails.

## Knowledge-base rule (nothing without a source)

[knowledge.html](knowledge.html) renders [continia-knowledge.js](continia-knowledge.js) and exists
to be fact-checked against, so **every entry carries an `s:[["label","url"]]` array** — same
convention as the competitor cards — and an entry without one does not go in. Two portals are the
only allowed sources: **docs.continia.com wins on functionality** (features, dependencies, formats,
supported versions, dates) and **continia.com wins on messaging** (positioning, headline claims,
customer numbers). When the two disagree, that split decides; when the file disagrees with either,
the live page is right and the file is wrong.

Anything dated — end-of-sale, end-of-support, release names, supported BC versions, e-invoicing
mandates — gets re-read on the live page before it is written down, because these have already
moved once. Verify the links resolve after editing:

```bash
node -e 'global.window={};require("./continia-knowledge.js");var D=window.CK_DATA;var u=new Set();[].concat(D.portals,D.solutions,D.platform,D.gotchas,[D.company]).forEach(function(o){(o.s||[]).forEach(function(x){u.add(x[1]);});});console.log([...u].join("\n"))' \
  | while read -r x; do printf "%s  %s\n" "$(curl -s -o /dev/null -w '%{http_code}' -L "$x")" "$x"; done
```

Known live discrepancy (Sep 23, 2026): `continia.com/solutions` says Continia Finance has **7**
specialized modules; the Finance product page and Docs both say **8**. Eight is correct.

## Box styling rule (no left-accent bars)

**Never style a box/panel with a colored left-accent bar** (`border-left:4px solid …` or
similar). Boxes stay clean: a uniform `1px solid var(--line)` border all the way around, like
every other card/panel on the page. If a box needs emphasis, use the heading colour or
background — not a coloured edge stripe. (Standing instruction from the user.)

## Corner-radius rule (tiles are 15px)

**App-style tiles get `border-radius:15px` — never 20px, never a percentage.** This covers
the Video-asset tiles (`.va-tile`) and any new tile of that kind. 20px was tried and the user
disliked it; a `%` radius (the squircle look) was rejected too. The ordinary cards and panels
keep their existing 8px — this rule is about the tiles. (Standing instruction from the user.)

## Brand-colour rule (no off-palette tints)

Stick to the Continia palette. Full palette: Tech Blue `#052975`, Innovation Blue/cyan
`#8ff8ff`, Smart Green `#5f9e8d`, Performance Purple `#983eae`.

**Banned off-palette colours — never use any of these:**

| Never | Use instead | What it was |
|---|---|---|
| `#9adcc9` | Smart Green `#5f9e8d` | lightened green tint |
| `#e0a54a` | Performance Purple `#983eae` | lightened amber tint |
| `#6ea8ff` (and `rgba(110,168,255,…)`) | Innovation Blue `#8ff8ff` | the dark theme's old lightened navy |

`#6ea8ff` was not a one-off: it was the **dark-theme value of the `--navy` token**, so it
leaked into ~69 rules at once. In dark mode `--navy` now resolves to `#8ff8ff`, which is why
headings, links and accents all read cyan there. If a dark-mode element needs navy as a
*background*, pair it the other way round — `background:#8ff8ff;color:#052975` — because cyan
text on a cyan fill does not read. (Standing instruction from the user.)

### Link colours (never the generic blue)

**A link is never `var(--blue)` / `#2563eb`.** That is the generic web-blue and it is off-palette;
it must never be used as a link colour anywhere. Links are:

- **light mode — black**, `var(--ink)` (or `var(--navy)` where a link is already navy, e.g.
  `.sources a:hover`, `.li-cohead a`);
- **dark mode — Innovation Blue**, `#8ff8ff` / `var(--cyan)`.

`--blue` stays in the palette *only* as a data-mark fill — the competitor `.dot`, the YouTube
`.bar i` fill and the `.ev .d` timeline dot. It is not a text colour and never a link. When adding
a link, check the light value is `--ink` or `--navy` and that a `html[data-theme="dark"]` rule
turns it cyan; the CK source pills and portal host links were the two that got this wrong.
(Standing instruction from the user.)

## Archive rule (never overwrite data without saving it)

**Every data refresh — news, YouTube or LinkedIn — must save the outgoing data before it is
replaced.** The dashboard is the only record of these captures, so a replaced snapshot is gone
for good unless it is archived. Two steps:

1. **Prepend a snapshot to [archive.js](archive.js)** (`window.DASH_ARCHIVE.snapshots`, newest
   first) holding the outgoing LinkedIn data, `events` and competitor `data`. The archive is
   **append-only** — never edit or delete an existing snapshot. The live site never reads it;
   it exists purely as history (and feeds the archive-derived CSVs).
2. **Keep the outgoing file itself under a dated name in `Assets/`** — the repo's own
   convention: `Assets/youtube-data_Jul 10.js`, `Assets/linkedin-data_Aug 31.js`. Commit the
   source capture too — LinkedIn trawls live in `Assets/LinkedIn trawls/` (from Sep 10, 2026 a
   `linkedin_competitor_posts_<date>.csv` + `linkedin_competitor_summary_<date>.csv` pair;
   older captures are the `linkedin_post_engagement_report_<date>.txt` files). Regenerate
   `linkedin-data.js` with `Assets/LinkedIn trawls/gen-linkedin-data.py` — add the new CSV
   to its `SOURCES` list as `(file, capture date, dialect)`, bump `CAPTURED` to the newest
   date and map any new company labels in `KEEP`; it fails loudly on an unmapped post type
   or an unmatched `KEEP` entry. Two dialects: `trawl` is the multi-company competitor
   sweep (comma-separated, English type names, ~75-char titles) and `continia` is our own
   page export (semicolon-separated, Danish `Dato`/`Titel`/`Type`/`Link` headers, lowercase
   types like `multi-image (9)`, full titles). A capture covering only our page updates the
   Continia row and leaves every competitor row on its own older capture date.
   `SOURCES` merges several trawls, so a roster can be widened without re-trawling the
   companies already covered: each company carries the capture date of the trawl it came
   from (`cap`), and `dashboard.js` measures that company's 30-day momentum window from its
   own date so a later trawl gets no wider window than an earlier one.
   **A newer capture unions with the older one, it does not replace it.** Sweeps come back
   incomplete — the Sep 17 sweep missed ~31% of the posts the Sep 10/14 captures held,
   evenly spread across post age — and replacing wholesale halves `posts/week` and empties
   a third of the Last-30-days column. Post sets are merged on the permalink, the newer
   reading of a post wins, and the result is trimmed to `MAX_POSTS` (50) most recent. The
   trade-off: one company's figures can come from two read dates, so a post only the older
   capture saw carries a slightly stale count.
   **Verify every capture before wiring it in** — `node tools/verify-trawl.js "<csv>"`.
   It auto-detects the dialect and judges three things separately: TRUST (do posts the live
   data already holds still carry the same numbers), PLAUSIBLE (is the all-zero rate low
   enough to be real) and COMPLETE (does it hold the posts we already know about). Exit 1 =
   reject. A Sep 16 sweep was rejected this way: 45% of its rows read 0/0/0 because it wrote
   `0` where it failed to read a counter, which is indistinguishable from a real zero and
   unrepairable. See the QUARANTINED note in the generator.
   **A capture can hold the wrong page.** The union merge assumes both
   captures read the same company; when one did not, merging keeps both sets
   and the card becomes a blend of two firms. The generator's `RESET` set
   names labels whose older captures are known bad - a later capture replaces
   them outright instead of unioning. `MineralTree` is in it: the Sep 14 trawl
   recorded Global Payments Inc. corporate posts under that label (zero
   permalink overlap with the Sep 22 sweep of the same `company_url`; the
   permalinks resolve to Global Payments). The tell is `verify-trawl.js`
   reporting a company as missing *all* of its known posts while every other
   company sits in single digits - check the titles before merging.
   An unmapped company label is a hard error, not a silent skip — add it to `KEEP` (mapped
   to its dashboard name) or to `DROP` (deliberate exclusions). This is how a sweep spelling
   our own name "Continia Software" instead of "Continia Software A/S" once dropped all 50
   of our posts without a word.

Only then regenerate, bump the `?v=` on every page that loads the file, and stamp
`DASHBOARD_UPDATED`. (Standing instruction from the user.)

## Asking for a new LinkedIn trawl

`node tools/make-trawl-prompt.js` regenerates [Likedin TRAWLER prompt.md](Likedin TRAWLER prompt.md)
from the live data — paste that into a browser-driving Claude. **Regenerate it before every
run.** It carries a per-company *stop marker* (the newest post already on file) so the trawler
knows where the last capture ended and cannot quietly skip posts in between; those markers go
stale the moment a capture lands. Companies are ordered stalest-capture-first and split into
batches of six, because a single 31-page run degraded badly — it missed ~31% of posts and
stopped at 18 pages. One batch per session, stalest first, so a short run still lands the data
that was most out of date.

### Why captures go wrong, and the fix that is planned

Both failure modes on record come from the same cause: the trawler **reads the
counters visually and scrolls by hand**. The Sep 16 sweep wrote `0` wherever a
counter had not rendered (45% fake zeros); the Sep 17 sweep skipped ~31% of posts
while scrolling. Stop markers and `verify-trawl.js` catch this after the fact —
they do not prevent it.

**The fix is to stop reading the screen.** LinkedIn's posts feed is structured in
the DOM: each post is a `div[data-urn^="urn:li:activity:"]` (the urn *is* the
permalink id), and the counters sit in `.social-details-social-counts`. A small
JS extractor run in the LinkedIn tab (Claude in Chrome `javascript_tool`, one
company page per call) should:

1. scroll until it holds **N distinct urns** (or the feed ends) — no skipping is
   possible because completeness is counted, not eyeballed;
2. read reactions/comments/reposts from the DOM text, and write an **empty cell**
   when the element is absent — never `0`;
3. emit CSV rows in the `sweep2` dialect (`Company,Post #,Date (UTC),Title (first
   line of post),Reactions,Comments,Reposts,Total engagement,Post type,Posted by,
   Post URL,Company page`) so the file goes straight through `verify-trawl.js` →
   `gen-linkedin-data.py` with no new dialect.

Rules for whoever builds it: keep every selector in one `SEL` object at the top
and **fail loudly** (throw, non-zero) when a selector matches nothing — LinkedIn
renames classes often and a silent empty file is exactly the bug we are trying to
kill. Keep it modest: 31 pages once a week from the logged-in account is fine;
do not run it more often. If the browser dependency itself is the problem, a paid
scraper API (e.g. an Apify LinkedIn company-posts actor) is the alternative that
can run inside the Monday scheduled task without Chrome.

**Continia's own numbers** should come from LinkedIn Pages → Analytics → Content
→ Export (xls), not from reading the feed: exact counts plus impressions, which
the public page never shows. That export feeds the `continia` dialect.

## Archive CSV exports

The five `archive-*.csv` files at repo root are **generated**, never hand-edited. Regenerate them
after every archive prepend or YouTube refresh:

```bash
node tools/export-archive-csv.js
```

They come from two separate histories — `archive.js` (events, competitor cards, LinkedIn posts)
and `youtube-data.js` (Social Blade series + vidIQ cadence). Snapshot dates are **not unique**
(a day with two refreshes carries two layers), so the three archive CSVs also carry
`snapshot_index` (0 = newest). No page loads these files.

## The two-kinds-of-dates rule

There are two distinct date types on the page; never confuse them:

1. **Content/event dates** (e.g. an `events` entry's `w` field, dates inside card text) are **real
   historical dates** — the date the thing actually happened. Never bump these to today.
2. **`DASHBOARD_UPDATED`** is the "last refreshed" stamp — **set it to today** on every refresh.
   It is a **timestamp**, `"YYYY-MM-DD HH:MM"`, not a bare date.
3. **Every event carries `d:"YYYY-MM-DD"`** next to its free-text `w`. `w` is what the page
   shows; `d` is the sortable machine date (month-only items → the 1st; season-only → the
   1st of the first month). New events always get both; backfill old ones when passing by.
4. **`MODULE_UPDATED`** (right below it in `dashboard.js`) carries one stamp per
   data-backed section, keyed by section id, as `{at, src}`. `dashboard.js` appends
   a small "data updated" line to each of those sections. **Every refresh must bump
   the entries for the modules it actually touched** — a LinkedIn trawl bumps
   `content-gap` and `linkedin-compare`, a news pass bumps `news`, `competitors` and
   `events`, a YouTube pass bumps `youtube`, `continia-uploads` and the video-idea
   sections. Bumping only the global stamp makes every other module claim a freshness
   it does not have, which is worse than no stamp at all. Tool sections (Event
   Calendar, SEO scan, the compressors) and static ones (hero, Method, video assets)
   are deliberately absent.

## Monthly update runbooks

Trigger-phrase routines, each with a runbook doc:

- **[FULL-UPDATE.md](FULL-UPDATE.md)** — trigger "Opdater alt." The master routine: runs every data
  refresh in one pass (competitor cards + per-source sweep, Key Events, YouTube Social Blade snapshot,
  Continia vidIQ uploads, image-bank index regen), stamps `DASHBOARD_UPDATED` once, and pushes once.
  Supersedes running the two below separately. Needs Claude in Chrome connected for Social Blade/vidIQ.
- **[NEWS-UPDATE.md](NEWS-UPDATE.md)** — trigger "Kør news-opdateringen." Refreshes the `events`
  and `data` arrays (Key Events + competitor cards) in `dashboard.js`. Every claim stays backed by
  a clickable public source in the card's `s` array.
  **Sourcing order** (fixed list first, open web search last) lives in FULL-UPDATE.md Step 1 —
  native RSS where known → Google News RSS per company → PR wires → newsroom page → LinkedIn →
  AppSource listing → web search. Planned tooling: `sources.json` + `tools/news-inbox.js`
  producing a "new since last run" inbox so Claude judges instead of discovers.
- **[YOUTUBE-UPDATE.md](YOUTUBE-UPDATE.md)** — trigger "Kør YouTube-opdateringen." Reads channel
  numbers off Social Blade and appends a new snapshot to `youtube-data.js` (keep old snapshots for
  history; newest is rendered). `monthlyViews` must be a real number — it sizes the bar and a
  negative value renders a red "down" bar; use `flag:"correction"` for one-time recount spikes.

> **Stale-location note:** YOUTUBE-UPDATE.md still says the arrays and `DASHBOARD_UPDATED` live in
> `index.html` — they were moved to `dashboard.js`. FULL-UPDATE.md has the correct map;
> NEWS-UPDATE.md was corrected Sep 18, 2026.

## TinyJPG proxy (separate from the site)

The Content page's image-compression tool calls a **Cloudflare Worker** in
[tinyjpg-proxy/](tinyjpg-proxy/), so the TinyJPG API key never ships to the browser. The root
[wrangler.toml](wrangler.toml) deploys **only this Worker, not the static site** (no `[assets]`
block on purpose). The proxy URL is hardcoded as `var PROXY` in `dashboard.js`; the API key lives
only as the encrypted Cloudflare secret `TINIFY_KEY`. See [tinyjpg-proxy/README.md](tinyjpg-proxy/README.md)
for deploy steps.

## PDF proxy (separate from the site)

The Content page's **PDF compression** tool works the same way via a **second, independent**
Cloudflare Worker in [pdf-proxy/](pdf-proxy/), which runs iLovePDF's
auth → start → upload → process → download flow server-side. It is **not** deployed by the root
`wrangler.toml` (that one only does tinyjpg-proxy) — deploy it manually with `wrangler deploy` from
inside `pdf-proxy/`, which uses its own `pdf-proxy/wrangler.toml`. The proxy URL is hardcoded as
`var PROXY_PDF` in `dashboard.js` (empty until the Worker is deployed → the module shows a friendly
"configure backend" note); the iLovePDF key lives only as the encrypted secret `ILOVEPDF_PUBLIC_KEY`.
See [pdf-proxy/README.md](pdf-proxy/README.md) for deploy steps.
