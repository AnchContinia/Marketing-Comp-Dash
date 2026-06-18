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
| LinkedIn post engagement | `linkedin-data.js` | `window.LI_DATA` (`captured`, `companies`) |
| Image-bank file lists | `linkedin-images.js`, `newsletter-images.js`, `youtube-images.js` | `window.*_IMAGES` |
| **Historical archive ("the brain")** | `archive.js` | `window.DASH_ARCHIVE.snapshots` — append-only history; NOT read by the live site |

---

## The two-kinds-of-dates rule (never break this)

There are **refresh dates** (which all move to the run date) and **historical
dates** (which never move):

**Refresh dates → set to the run date** (the day "Opdater alt" is executed):
1. **`DASHBOARD_UPDATED`** in `dashboard.js` — the "last refreshed" stamp that
   drives both the topbar "Updated …" and the footer date. Set to today
   (`YYYY-MM-DD`), once, at the end of the run (step 6).
2. **The "Period" pill** in the hero — `Period: 2025-<Mon> <Year>` — on **all
   three** pages. Bump its **end month + year** to the run month/year (e.g. a
   June 2026 run → `Period: 2025-Jun 2026`). Keep the `2025-` start; the pilot
   began in 2025. Use the same 3-letter month style already there (`Jun`, `Jul`…).

**Historical dates → never move:**
3. **Content/event dates** — the `events` `w` field and any date inside card
   text — are **real historical dates**. Use the date the thing actually
   happened. **Never** bump these to the run date; doing so would destroy the
   timeline. "All dates move to today" means the *refresh* dates above, not these.

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

## Step 6 — Archive this month's snapshot (the brain)  (`archive.js`)

Before stamping, **prepend one new snapshot** to `window.DASH_ARCHIVE.snapshots`
in `archive.js` (newest first). This freezes the state you just refreshed so it
can be compared month-over-month later. **Never edit or delete an existing
snapshot** — each is a permanent dated layer.

The snapshot mirrors the live data you just updated:

```js
{
  date: "YYYY-MM-DD",          // same value you'll put in DASHBOARD_UPDATED (step 7)
  linkedin: {                  // copy of window.LI_DATA from linkedin-data.js
    source: "...", captured: "YYYY-MM-DD", windowLabel: "last 10 posts each",
    companies: [ /* {name, ours, posts:[{t,ty,r,c,rp}]} … */ ]
  },
  news:        { events: [ /* the events[] array from dashboard.js */ ] },
  competitors: [ /* the data[] array from dashboard.js */ ]
}
```

Fastest reliable way to build it (no hand-copying — extract straight from the
live files). From the repo root:

```bash
{ echo 'var window={};'; sed -n '1,228p' dashboard.js; cat linkedin-data.js; cat <<'JS'
var out={ date:"YYYY-MM-DD",
  linkedin:{source:window.LI_DATA.source,captured:window.LI_DATA.captured,windowLabel:window.LI_DATA.windowLabel,companies:window.LI_DATA.companies},
  news:{events:events}, competitors:data };
JSON.stringify(out);
JS
} > /tmp/gen.js
osascript -l JavaScript /tmp/gen.js   # → paste this object as the new FIRST element of snapshots[]
```

(`sed -n '1,228p'` grabs the `const data` + `const events` definitions — re-check
those line numbers if dashboard.js shifted; the slice must end before the DOM
code starts.) YouTube history is **not** copied here — `youtube-data.js` already
keeps its own `snapshots`.

## Step 7 — Stamp the dates, commit once, push once

1. Set `DASHBOARD_UPDATED` in `dashboard.js` to **today's date** (`YYYY-MM-DD`).
   Both the topbar "Updated …" and the footer read from it.
2. **Bump the "Period" pill** on all three pages (`index.html`, `content.html`,
   `video.html`): `Period: 2025-<Mon> <Year>` → the run month/year, e.g.
   `Period: 2025-Jun 2026`. (Leave the `2025-` start untouched.) These three must
   stay in sync — the hero is shared.
3. **Bump cache-busts** if a versioned file changed: editing `dashboard.js`
   means bumping `dashboard.js?v=…` on **all three** pages
   (`index.html`, `content.html`, `video.html`) so browsers don't serve a stale
   copy. Same rule for any `*-images.js` you regenerated.
4. Commit everything in one go and push:
   ```bash
   git add -A && git commit -m "Opdater alt: news + competitor sweep + YouTube + vidIQ + image banks + archive snapshot" && git push origin main
   ```
5. GitHub Pages is live within ~1 min. Confirm with the new commit hash on
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
