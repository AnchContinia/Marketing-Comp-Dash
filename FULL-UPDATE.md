# Full Update Runbook — "Opdater alt"

**What this is:** the one trigger that refreshes **every data source on the
dashboard in a single pass**, stamps the date once, and pushes once. It
orchestrates the two existing routines ([NEWS-UPDATE.md](NEWS-UPDATE.md) and
[YOUTUBE-UPDATE.md](YOUTUBE-UPDATE.md)) plus a per-competitor source sweep and
the image-bank regen — so you don't have to run them one at a time.

---

## Trigger

- **Chrome open** with the Claude in Chrome extension connected (needed for
  Social Blade + vidIQ — they block plain fetches).
- Say: **"Opdater alt."**

Claude then runs every step below in order, shows you what it found, and finishes
with a single commit + push to `AnchContinia/Marketing-Comp-Dash`.

---

## ⚠️ Where the data actually lives (the old runbooks are stale on this)

NEWS-UPDATE.md / YOUTUBE-UPDATE.md say the arrays live in `index.html` — **they
don't anymore.** Current locations:

| Data | File | Symbol |
|---|---|---|
| Competitor cards | `dashboard.js` | `const data = [` (top) |
| Key Events timeline | `dashboard.js` | `const events = [` |
| Content ideas | `dashboard.js` | `const contentIdeas = [` |
| "Updated" date stamp | `dashboard.js` | `var DASHBOARD_UPDATED = "YYYY-MM-DD"` |
| YouTube snapshots + Continia uploads | `youtube-data.js` | `snapshots`, `continiaUploads` |
| Image-bank file lists | `linkedin-images.js`, `newsletter-images.js`, `youtube-images.js` | `window.*_IMAGES` |

---

## The two-kinds-of-dates rule (never break this)

1. **Content/event dates** — the `events` `w` field and any date inside card
   text — are **real historical dates**. Use the date the thing actually
   happened. **Never** bump them to today.
2. **`DASHBOARD_UPDATED`** is the "last refreshed" stamp. **Set it to today**,
   once, at the end of the full run (step 5).

---

## Step 1 — Competitor cards + per-source sweep  (`data` in `dashboard.js`)

For **each competitor** in the `data` array, actively check their own channels
for anything new since the last refresh — not just a generic news search:

- **Their website / product pages** — new releases, version notes, pricing.
- **Their blog / newsroom** — launches, partnerships, positioning shifts.
- **Their social (LinkedIn first, then X/others)** — announcements, hiring
  signals, campaign themes.
- **General web/news search** — M&A, funding, analyst mentions.

Then update the card fields where something changed: `head`, `rel` (latest/key
development), `str` (strategic move), `pos` (positioning), `ai` (AI angle), `sc`
(scale/status), and `stance` (`ai` / `cons` / `steady`) / `prox` if it shifted.
**Every factual claim must stay backed by a clickable public source** in the
card's `s` array — `["label","https://url"]` pairs, like the existing cards.
If nothing changed for a competitor, leave the card as-is.

## Step 2 — Key Events timeline  (`events` in `dashboard.js`)

Add genuinely new, dated events at the **top** of the `events` array (newest
first); keep the old ones for history. Shape:
`{ w:"May 13, 2026", c:"ai", t:"<b>Vendor</b> did X." }`.
`c` (category colour) is one of `ai`, `cons`, `steady`, or omit for the default
blue — match what similar events already use. Use **real historical dates** in `w`.

## Step 3 — YouTube snapshot  (`youtube-data.js`)

Follow **[YOUTUBE-UPDATE.md](YOUTUBE-UPDATE.md)** for the channel list, the direct
Social Blade handle URLs, the exact fields, and the Social Blade gotchas. Read
all 7 channels and **append a new object to `snapshots`** (newest is the one
rendered; keep the old ones). `monthlyViews` must be a real number (drives the
bar; negative renders a red "down" bar); use `flag:"correction"` for one-time
recount spikes.

## Step 4 — Continia vidIQ uploads  (`continiaUploads` in `youtube-data.js`)

Per YOUTUBE-UPDATE.md's vidIQ section: open the Continia vidIQ channel page, set
the period toggle to **28D**, and read the Long-form-vs-Shorts split, Latest
videos and Top videos (fastest via the embedded `longShortStats` JSON). Update
`periods`, `recent` and `top`. **Show the parsed numbers for a quick confirm
before continuing** — they're easy to misread. Keep this last-30-days only.

## Step 5 — Image-bank indexes  (`*-images.js`)

Regenerate all three indexes from the `Assets/` folders, **NFC-normalized** so
accented filenames don't 404 on GitHub Pages (Linux). Run from the repo root:

```bash
python3 - << 'EOF'
import os, json, unicodedata
banks = [
  ("Assets/Linkedin images",  "LINKEDIN_IMAGES",   "linkedin-images.js"),
  ("Assets/Newsletter images","NEWSLETTER_IMAGES", "newsletter-images.js"),
  ("Assets/Youtube images",   "YOUTUBE_IMAGES",    "youtube-images.js"),
]
for folder, var, out in banks:
    files = [f for f in os.listdir(folder)
             if f.lower().endswith((".jpg",".jpeg",".png",".webp")) and not f.startswith(".")]
    files.sort(key=lambda f: os.path.getmtime(os.path.join(folder, f)), reverse=True)
    files = [unicodedata.normalize("NFC", f) for f in files]
    arr = json.dumps(files, ensure_ascii=False)
    head = ("/* Auto-generated index of "+folder+" — newest first (by file mtime).\n"
            "   Filenames normalized to NFC so they match git/GitHub-served paths.\n"
            "   Regenerate when images change. Titles are derived from filenames. */\n")
    open(out,"w").write(head + "window."+var+" = " + arr + ";\n")
    print(out, len(files), "images")
EOF
```

Then **`git add` the actual `Assets/<folder>` images too** — not just the index
JS — or new bank images render broken (the index lists files that aren't in the
repo). If an index file is unchanged it just produces no diff; that's fine.

## Step 6 — Stamp the date, commit once, push once

1. Set `DASHBOARD_UPDATED` in `dashboard.js` to **today's date** (`YYYY-MM-DD`).
   Both the topbar "Updated …" and the footer read from it.
2. **Bump cache-busts** if a versioned file changed: editing `dashboard.js`
   means bumping `dashboard.js?v=…` on **all three** pages
   (`index.html`, `content.html`, `video.html`) so browsers don't serve a stale
   copy. Same rule for any `*-images.js` you regenerated.
3. Commit everything in one go and push:
   ```bash
   git add -A && git commit -m "Opdater alt: news + competitor sweep + YouTube + vidIQ + image banks" && git push origin main
   ```
4. GitHub Pages is live within ~1 min. Confirm with the new commit hash on
   `origin/main`.

> If the push fails with an auth error, the keychain token has expired — see the
> token-refresh note at the end of [YOUTUBE-UPDATE.md](YOUTUBE-UPDATE.md).

---

## Notes

- **Show before you push.** Surface what changed in each step (new events, card
  diffs, the YouTube numbers, the vidIQ parse) so it can be sanity-checked before
  the single commit.
- **Partial runs are fine.** If a source is down (e.g. Social Blade won't load),
  do the rest, note what was skipped, and still stamp + push the parts that
  succeeded — don't block the whole update on one feed.
- This runbook **supersedes** running NEWS-UPDATE and YOUTUBE-UPDATE separately,
  but those still work on their own if you only want one side refreshed.
