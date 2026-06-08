# YouTube Update Runbook — Continia Competitor Dashboard

**What this is:** the fixed monthly routine for refreshing the YouTube Analysis
section. Free, browser-based. Claude reads the numbers off Social Blade via
Claude in Chrome; you just start it and push the result.

---

## Trigger

When you're ready for a monthly refresh, have this ready and say the phrase:

- **Chrome open** with the Claude in Chrome extension connected.
- The dashboard repo handy (`AnchContinia/Marketing-Comp-Dash`).
- Say: **"Kør YouTube-opdateringen."**

Claude will fetch this runbook and `youtube-data.js` from the repo, walk the
channel list, read each channel's numbers, build a new snapshot, and hand you
an updated `youtube-data.js` to commit.

---

## The channel list (read these, in this order)

Direct Social Blade URLs — do **not** guess `/youtube/user/NAME`, these handles
are verified. (Source of truth is the `channels` array in `youtube-data.js`.)

| # | Channel | Social Blade URL | Ours |
|---|---------|------------------|------|
| 1 | Medius | https://socialblade.com/youtube/handle/mediusapautomation | |
| 2 | Stampli | https://socialblade.com/youtube/handle/stampli | |
| 3 | Yooz | https://socialblade.com/youtube/handle/why_yooz | |
| 4 | Tipalti | https://socialblade.com/youtube/handle/tipaltivideos | |
| 5 | Continia | https://socialblade.com/youtube/handle/continiasoftware | ✅ |
| 6 | Equisys (Zetadocs) | https://socialblade.com/youtube/handle/equisysplc | |
| 7 | Dooap | https://socialblade.com/youtube/handle/dooap | |

---

## What to read on each page

From each Social Blade channel page, capture:

| Read this on Social Blade | Goes into `youtube-data.js` field | Format |
|---|---|---|
| Subscribers (total) | `subs` | string as shown, e.g. `"1.78K"` |
| Monthly Gained Subscribers | `monthlySubs` | string with sign, e.g. `"+10"`, `"0"` |
| Monthly Gained Views | `monthlyViews` | **number**, e.g. `147000`, `-7300` |
| Monthly Gained Views (label) | `monthlyViewsLabel` | pretty label, e.g. `"+147K"` |
| Estimated Monthly Earnings | `earnings` | range string, e.g. `"$37-$589"` |
| Total video views (if changed) | `totalViews` (in `channels`) | e.g. `"5.07M total views"` |
| A one-time recount spike (huge +/-) | add `flag: "correction"` to that channel's stat | label still shows truthfully; bar is suppressed and the value is excluded from the bar scale so it can't dominate |

`monthlyViews` must be a real number — it drives the bar width, and a negative
value automatically renders a red "down" bar. `monthlyViewsLabel` is just the
text shown next to the bar.

---

## Known Social Blade gotchas (so the read doesn't stall)

- **No plain fetch / scrape.** Social Blade blocks automated HTTP requests. It
  must be a real browser via Claude in Chrome.
- **Use the direct handle URLs above.** If you ever have to use the search box,
  the autocomplete runs over WebSockets — interact with the box directly (type +
  click), and in the dropdown pick the **"RESULTS"** entry (Social Blade's own
  database), never **"RESULT FROM YOUTUBE."**
- **Where the numbers are:** Monthly Gained Subscribers / Views sit in the stat
  band near the top, roughly the region `[495, 360, 1000, 405]` on a zoomed
  screenshot of the channel page.
- **30-day granularity** sometimes requires being logged in to Social Blade. The
  public estimates are enough for this dashboard; if a channel won't show the
  30-day figure, note it (e.g. "no activity last 30 days") rather than guessing.

---

## In-depth Continia upload info (vidIQ — last 30 days)

A second module sits under the main YouTube table: **"In-depth Continia upload
info"** (Long-form vs Shorts split + recent uploads). Its data lives in the
`continiaUploads` block in `youtube-data.js` and is read from vidIQ, not Social
Blade — so it needs the vidIQ channel page open.

- Source: <https://vidiq.com/youtube-stats/channel/UCVADP02U9sc7Xy2zeSx4xoA/?tab=overview>
- **Set the period toggle to `28D`** (closest to last-30-days) before reading.
- Read off the **Long-form vs Shorts** panel: `uploads.longForm` / `uploads.shorts`
  and `views.longForm` / `views.shorts` (plain counts — the page computes the %).
- Set `windowLabel` to vidIQ's "Since …" date.
- Refresh `recent[]` from the **Latest videos** tab (newest first): `title`,
  `views`, and `outlier` (string like `"1.61x"`, or `null` when vidIQ shows "—").
- vidIQ is JS-rendered, so a plain fetch won't work — read it in a real browser
  (Claude in Chrome) or hand Claude a screenshot of the two tabs.
- Keep this **last-30-days only**; do not add the all-time "Top videos" here.

## Honest caveats (keep these in mind, don't over-read the data)

- Social Blade's "last 30 days" figures are themselves estimates from daily
  snapshots — not exact YouTube Studio numbers.
- These are niche B2B channels with small audiences (hundreds to a few thousand
  subs), so monthly percentages swing dramatically without meaning much.
- Estimated earnings are directional only and not a measure of channel quality.

---

## How a snapshot is added

Claude appends a new object to the `snapshots` array in `youtube-data.js`
(newest is always the one rendered). Older snapshots stay — they build the
history for trend charts later. Example shape:

```js
{
  date: "2026-07-02",
  stats: {
    "Medius":  { subs:"330", monthlyViews:120000, monthlyViewsLabel:"+120K", monthlySubs:"+4", earnings:"$30-$480" },
    "Stampli": { subs:"1.80K", monthlyViews:42000, monthlyViewsLabel:"+42K", monthlySubs:"+20", earnings:"$10-$168" }
    // ...one entry per channel, keyed by the channel "name"
  }
}
```

---

## Finish

The local folder `~/Desktop/Claude-Marketing-dashboard` is a git working copy of
`AnchContinia/Marketing-Comp-Dash` (HTTPS remote, token in the macOS keychain).
So Claude finishes the update directly — no manual GitHub upload anymore:

1. Claude writes the new snapshot into `youtube-data.js`.
2. **Stamp the date.** Set `DASHBOARD_UPDATED` in `index.html` (the single
   source of truth near the bottom, `var DASHBOARD_UPDATED = "YYYY-MM-DD";`) to
   **today's date**. Both the topbar "Updated …" and the footer read from it, so
   this one change keeps every date stamp on the page consistent. Do this on
   **every** refresh — YouTube *and* News.
3. Claude commits the changed files and pushes to `origin/main`:
   `git add youtube-data.js index.html && git commit -m "..." && git push origin main`.
   (The `.gitignore` keeps local-only files — the `.indd`, images, MCP links,
   backups — out of the push automatically.)
4. GitHub Pages updates the live dashboard within a minute. Claude confirms with
   the new commit hash on `origin/main`.

If a push ever fails with an auth error, the keychain token has expired — make a
new fine-grained PAT (Contents: read/write on the repo) and re-store it with:
`printf "protocol=https\nhost=github.com\nusername=AnchContinia\npassword=NEW_TOKEN\n" | git credential-osxkeychain store`
