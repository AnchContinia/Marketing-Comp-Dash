# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A **static, zero-build marketing dashboard** for Continia — plain HTML/CSS/vanilla JS, no
framework, no bundler, no package.json, no tests. It is published via **GitHub Pages** from
the repo root (`AnchContinia/Marketing-Comp-Dash`, branch `main`). The `.nojekyll` file keeps
Pages from running Jekyll over the files.

There is **no build, lint, or test step.** Editing a file and pushing to `main` is the entire
deploy pipeline — GitHub Pages serves the new version within ~1 minute.

To preview locally, serve the folder (don't just `file://` it — the image-bank fetches and
relative paths need a real origin):

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

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

**Three pages, one shared brain.** `index.html` (Home), `content.html` (Content), and
`video.html` (Video) are near-identical shells. They differ only in their `<section>` content
and which data scripts they load. All three load the same [dashboard.css](dashboard.css) and
[dashboard.js](dashboard.js).

[dashboard.js](dashboard.js) runs on all three pages. It contains **both the data and the
render logic**, and each render block self-guards so a page only runs the renderers whose data
and DOM actually exist:

```js
if (typeof window.YT_DATA === "undefined") return;   // skip on pages that didn't load it
```

This is why one shared script can power three different pages without errors. Key contents:

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

**Image banks** are filename arrays only; the actual images live in `Assets/<folder>/`
(`Linkedin images`, `Newsletter images`, `Youtube images`). The bank JS files are auto-generated
"newest-first" indexes with filenames **normalized to NFC** so they match the git/GitHub-served
paths (macOS NFD filenames otherwise 404 on Pages). When you add bank images, **push the actual
`Assets/<folder>` files too — not just the index JS** — or the bank renders broken thumbnails.

## The two-kinds-of-dates rule

There are two distinct date types on the page; never confuse them:

1. **Content/event dates** (e.g. an `events` entry's `w` field, dates inside card text) are **real
   historical dates** — the date the thing actually happened. Never bump these to today.
2. **`DASHBOARD_UPDATED`** is the "last refreshed" stamp — **set it to today** on every refresh.

## Monthly update runbooks

Two trigger-phrase routines, each with a runbook doc:

- **[NEWS-UPDATE.md](NEWS-UPDATE.md)** — trigger "Kør news-opdateringen." Refreshes the `events`
  and `data` arrays (Key Events + competitor cards) in `dashboard.js`. Every claim stays backed by
  a clickable public source in the card's `s` array.
- **[YOUTUBE-UPDATE.md](YOUTUBE-UPDATE.md)** — trigger "Kør YouTube-opdateringen." Reads channel
  numbers off Social Blade and appends a new snapshot to `youtube-data.js` (keep old snapshots for
  history; newest is rendered). `monthlyViews` must be a real number — it sizes the bar and a
  negative value renders a red "down" bar; use `flag:"correction"` for one-time recount spikes.

## TinyJPG proxy (separate from the site)

The Content page's image-compression tool calls a **Cloudflare Worker** in
[tinyjpg-proxy/](tinyjpg-proxy/), so the TinyJPG API key never ships to the browser. The root
[wrangler.toml](wrangler.toml) deploys **only this Worker, not the static site** (no `[assets]`
block on purpose). The proxy URL is hardcoded as `var PROXY` in `dashboard.js`; the API key lives
only as the encrypted Cloudflare secret `TINIFY_KEY`. See [tinyjpg-proxy/README.md](tinyjpg-proxy/README.md)
for deploy steps.
