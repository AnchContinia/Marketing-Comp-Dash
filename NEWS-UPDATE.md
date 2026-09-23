# News Update Runbook — Continia Competitor Dashboard

**What this is:** the routine for refreshing the *news* side of the dashboard —
the **Key Events** timeline and the **competitor cards**. Companion to
[YOUTUBE-UPDATE.md](YOUTUBE-UPDATE.md); the YouTube numbers have their own routine.

---

## Trigger

Say: **"Kør news-opdateringen."**

Claude reads this runbook, refreshes the news content in `index.html`, stamps the
date, and pushes to `AnchContinia/Marketing-Comp-Dash`.

---

## What gets edited (all inside `dashboard.js` — **not** `index.html` any more)

Two JavaScript arrays at the top of `dashboard.js` (`const data = [` on line ~2,
`const events = [` further down). **How to find the news** — the fixed source
order (RSS → Google News RSS → PR wires → newsroom → LinkedIn → AppSource → web
search) — is in [FULL-UPDATE.md](FULL-UPDATE.md) Step 1; follow it here too.

| Array | What it is | Shape |
|---|---|---|
| `events` | The **Key Events** timeline | `{ w:"May 13, 2026", d:"2026-05-13", c:"ai", t:"<b>Vendor</b> did X." }` — `d` is the sortable ISO date, always set it |
| `data`   | The **competitor cards** | one object per competitor (`n`, `o`, `stance`, `head`, `rel`, `str`, `pos`, `ai`, `sc`, `s` sources…) |

- **`c` (event colour / category):** one of `ai`, `cons` (consolidation),
  `steady`, or the default blue. Match the others already in the list.
- **`stance` (card):** `ai`, `cons`, or `steady`.
- **Sources (`s`):** array of `["label","https://url"]` pairs — keep every claim
  backed by a clickable public source, like the existing cards.
- Add new events at the **top** of the `events` array (newest first); keep the
  older ones for history.

---

## Dates — the one rule that matters

There are **two kinds** of dates on the page; do not mix them up:

1. **Event/content dates** (the `w` field, "Apr 30, 2026", and any dates inside
   card text) are **real historical dates**. Use the date the thing actually
   happened. **Never** bump these to today.
2. **The "Updated" stamp** — `var DASHBOARD_UPDATED = "YYYY-MM-DD";` in
   `dashboard.js` (~line 768). This is the single source of truth for both the
   topbar "Updated …" and the footer date. **Set it to today** on every refresh
   (news *and* YouTube). One change keeps every stamp on the page consistent.

---

## Finish

> **Archive first (the brain).** Before stamping, prepend a new dated snapshot of
> the refreshed `events` + `data` to `window.DASH_ARCHIVE.snapshots` in
> `archive.js` (newest first; never edit past snapshots). See **Step 6** of
> [FULL-UPDATE.md](FULL-UPDATE.md) for the exact shape and the one-liner that
> extracts it from the live files. This preserves the old news/competitor state
> that this refresh would otherwise overwrite.

1. Claude edits `events` / `data` in `dashboard.js` with the new news.
2. Claude sets `DASHBOARD_UPDATED` to **today's date**.

> **Stamps.** Set `DASHBOARD_UPDATED` in `dashboard.js` to the run **timestamp**
> (`"YYYY-MM-DD HH:MM"`), and bump the `MODULE_UPDATED` entries for every module
> this routine touched. The per-module stamps are what the page prints under each
> section; leaving them behind makes the page overstate how fresh it is.
3. Claude commits and pushes:
   `git add dashboard.js archive.js index.html content.html video.html && git commit -m "..." && git push origin main`
   (bump `dashboard.js?v=` on all three pages first — see CLAUDE.md cache-busting).
   (The `.gitignore` keeps local-only files out of the push.)
4. GitHub Pages updates the live dashboard within a minute. Claude confirms with
   the new commit hash on `origin/main`.

> Auth note: the folder is a git clone with a token in the macOS keychain, so the
> push is silent. If it ever fails with an auth error, see the token-refresh note
> at the end of [YOUTUBE-UPDATE.md](YOUTUBE-UPDATE.md).
