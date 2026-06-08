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

## What gets edited (all inside `index.html`)

Two JavaScript arrays near the top of the page's `<script>`:

| Array | What it is | Shape |
|---|---|---|
| `events` | The **Key Events** timeline | `{ w:"May 13, 2026", c:"ai", t:"<b>Vendor</b> did X." }` |
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
2. **The "Updated" stamp** — `var DASHBOARD_UPDATED = "YYYY-MM-DD";` near the
   bottom of `index.html`. This is the single source of truth for both the
   topbar "Updated …" and the footer date. **Set it to today** on every refresh
   (news *and* YouTube). One change keeps every stamp on the page consistent.

---

## Finish

1. Claude edits `events` / `data` in `index.html` with the new news.
2. Claude sets `DASHBOARD_UPDATED` to **today's date**.
3. Claude commits and pushes:
   `git add index.html && git commit -m "..." && git push origin main`.
   (The `.gitignore` keeps local-only files out of the push.)
4. GitHub Pages updates the live dashboard within a minute. Claude confirms with
   the new commit hash on `origin/main`.

> Auth note: the folder is a git clone with a token in the macOS keychain, so the
> push is silent. If it ever fails with an auth error, see the token-refresh note
> at the end of [YOUTUBE-UPDATE.md](YOUTUBE-UPDATE.md).
