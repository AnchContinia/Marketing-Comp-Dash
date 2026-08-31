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

Direct Social Blade URLs. (Source of truth is the `channels` array in
`youtube-data.js`.) Channels 1–7 use verified `/handle/` URLs. Channels 8–17 were
added Jun 2026 and use the `/channel/<ID>` form — the most stable address (handle
and `/user/` forms often 404 on Social Blade even when the channel exists). On the
**first run** these 10 have no per-snapshot stats yet, so capture their numbers and
let the new snapshot populate them; `totalViews` is already filled. A few were
brand-new to Social Blade's database on Jun 18 (ExFlow, onPhase, Dime, AMC, Qvalia)
and showed no 30-day figure — note "no data" for those rather than guessing until
SB builds history. Until captured they render as "—" in the live table.

| # | Channel | Social Blade URL | Ours |
|---|---------|------------------|------|
| 1 | Medius | https://socialblade.com/youtube/handle/mediusapautomation | |
| 2 | Stampli | https://socialblade.com/youtube/handle/stampli | |
| 3 | Yooz | https://socialblade.com/youtube/handle/why_yooz | |
| 4 | Tipalti | https://socialblade.com/youtube/handle/tipaltivideos | |
| 5 | Continia | https://socialblade.com/youtube/handle/continiasoftware | ✅ |
| 6 | Equisys (Zetadocs) | https://socialblade.com/youtube/handle/equisysplc | |
| 7 | Dooap | https://socialblade.com/youtube/handle/dooap | |
| 8 | AMC Banking | https://socialblade.com/youtube/channel/UCg3bQAqsQSKHtMK02oxWN5Q | |
| 9 | ExFlow (Truvio) | https://socialblade.com/youtube/channel/UCcRBDOXYUHYZ18mJzVwptYg | |
| 10 | AvidXchange | https://socialblade.com/youtube/channel/UCyUdf0l5aenkbP6Rjbm1boA | |
| 11 | Compleat | https://socialblade.com/youtube/channel/UCBHrVWn7hW3bimt1RIHVBJg | |
| 12 | Tungsten Automation | https://socialblade.com/youtube/channel/UCLXjytmoPLmzMT9-jRK9eMw | |
| 13 | onPhase | https://socialblade.com/youtube/channel/UCfZ5vZy9s3WC0mcAhGy-6Pg | |
| 14 | Dime Scheduler | https://socialblade.com/youtube/channel/UCYD4LGox7SJLL7r8gmjulNA | |
| 15 | Qvalia | https://socialblade.com/youtube/channel/UC1x8GlYfNAh4jjp3mquVAvw | |
| 16 | Acubiz | https://socialblade.com/youtube/channel/UC69VeuWKBJRLmON3deGjwdw | |
| 17 | B2Brouter | https://socialblade.com/youtube/channel/UChJ6FQX35UJ5CA54wojtaiQ | |

> **Channel 9 renamed.** The channel at `UCcRBDOXYUHYZ18mJzVwptYg` now presents
> itself as **Truvio** on YouTube and Social Blade (it was ExFlow / SignUp
> Software). The `/channel/<ID>` URL is unaffected, and the registry key stays
> `"ExFlow (Truvio)"` so the snapshot history keeps lining up — do not rename it.
> The same rebrand is why SignUp Software and Truvio now post identical content
> on LinkedIn.

> **Not in the registry (by choice):** Lasernet, Pagero (its channel is now
> "Thomson Reuters Europe" — no clean Pagero signal), MineralTree (no resolvable
> active channel — likely dormant after the Global Payments acquisition), and
> Microsoft Expense Agent (no standalone channel).

---

## What to read on each page

From each Social Blade channel page, capture:

| Read this on Social Blade | Goes into `youtube-data.js` field | Format |
|---|---|---|
| Subscribers (total) | `subs` | string as shown, e.g. `"1.78K"` — take it from the **Daily Channel Metrics** table, not the header (see gotchas) |
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
- **Where the numbers are (site redesign, Aug 2026):** the four figures sit in
  tiles under "CREATOR STATISTICS" and are **lazy-loaded** — they show a spinner
  for several seconds after the page settles. Poll until they resolve rather than
  reading immediately. In the DOM the label is an `h4` for the two 30-day tiles
  and an `h3` for the two earnings tiles; the value is the sibling `h2` in the
  same parent. A working read:

  ```js
  const want = {'Subscribers for the last 30 days':'sub30',
                'Views for the last 30 days':'views30',
                'Monthly Estimated Earnings':'earnings'};
  [...document.querySelectorAll('h3,h4')].forEach(h => {
    const key = want[h.innerText.trim()];
    if (key) console.log(key, h.parentElement.querySelector('h2').innerText.trim());
  });
  ```
- **The header rounds subscriber counts.** Since the redesign the top band shows
  `1.5K` where the channel actually has ~1,480 — two significant figures, which
  destroys the month-over-month delta. The **Daily Channel Metrics** table at the
  bottom still carries three (`1.78K`, `3.28K`, `1.49K`); its last row is today.
  Read `subs` from there. Columns are: date, sub delta, **sub total**, view delta,
  view total, video delta, video total, earnings.
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
- The fastest, most reliable read is from vidIQ's embedded JSON: view source and
  find the `__next_f.push(...)` script containing `longShortStats` — it holds
  every period at once (`7d`/`28d`/`3mo`/`1y`/`ytd`, each with `long`/`short`
  `uploads`+`views`), plus `latestVideos` and `topVideos` arrays. Copy those
  numbers straight into the newest snapshot's `periods`, `recent` and `top`.
- `periods` keys are `"7D"`,`"28D"`,`"3M"`,`"1Y"`,`"YTD"`; each has
  `longForm:{uploads,views}` and `shorts:{uploads,views}` (plain counts — the
  page computes the %). Set `defaultPeriod` (usually `"28D"`).
- `recent[]` = **Latest videos** (newest first): `title`, `views`, `outlier`
  (string like `"1.61x"`, or `null`). `top[]` = **Top videos**: `title`,
  `views`, `vph` (string), `outlier`.
- ALWAYS show the parsed numbers to the user for a quick confirm before pushing.
  (When they come from the embedded JSON below they are exact; when they are read
  off a screenshot they are easy to get wrong. Either way, show them.)
- **All-zero periods are a real answer, not a failure.** `longShortStats` counts
  uploads *published inside* the window and their views, so a channel that has
  not uploaded returns `0/0`. On 2026-08-31 Continia showed `0` across 7D, 28D
  **and** 3M — no uploads since 22 May 2026. Cross-check `latestVideos[0]`'s
  `published_at` before assuming the read broke.
- **Default: Claude reads vidIQ itself via Claude in Chrome — no screenshots
  needed from you.** vidIQ is JS-rendered, so a plain fetch won't work; Claude
  navigates to the channel URL in the browser, sets the toggle to `28D`, reads
  the Long-form vs Shorts panel and the Latest videos tab, and writes the
  numbers into `continiaUploads`. (Handing Claude a screenshot of the two tabs
  still works as a fallback if Chrome isn't connected.)
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

**Ranking is automatic.** The live YouTube table sorts itself by the newest
snapshot's `monthlyViews` (highest first) at render time, so the channel that
"ran away" with views floats to the top on its own. Don't manually reorder the
`channels` array to chase the ranking — just drop in the new snapshot and the
table re-ranks. (Channels with no stats yet sort to the bottom at 0.)

---

## Finish

The local folder `~/Desktop/Claude-Marketing-dashboard` is a git working copy of
`AnchContinia/Marketing-Comp-Dash` (HTTPS remote, token in the macOS keychain).
Claude writes and commits; **you run the push** (see step 4 for why).

1. Claude writes the new snapshot into `youtube-data.js`.
2. **Stamp the date.** Set `DASHBOARD_UPDATED` in **`dashboard.js`** (near the
   bottom, `var DASHBOARD_UPDATED = "YYYY-MM-DD";`) to **today's date**. Both the
   topbar "Updated …" and the footer read from it, so this one change keeps every
   date stamp on the page consistent. Do this on **every** refresh — YouTube *and*
   News. (It used to live in `index.html`; it does not any more.) If another
   refresh already ran today, it is already correct — leave it alone.
3. Claude commits the changed files:
   `git add youtube-data.js dashboard.js && git commit -m "..."`.
   (The `.gitignore` keeps local-only files — the `.indd`, images, MCP links,
   backups — out of the commit automatically.)
4. **You push.** Claude's shell on this Mac runs in an isolated Linux sandbox that
   has no `credential-osxkeychain`, so the GitHub token in the macOS keychain is
   out of reach and `git push` fails with
   `could not read Username for 'https://github.com'`. Run it yourself:

   ```
   cd ~/Desktop/Claude-Marketing-dashboard && git push origin main
   ```

   GitHub Pages updates the live dashboard within a minute.
5. **If git then complains about `index.lock` / `HEAD.lock`:** a failed push from
   the sandbox can leave lock files behind that it is not allowed to delete.
   `rm -f .git/index.lock .git/HEAD.lock .git/objects/maintenance.lock` clears them.

If the push fails with a genuine **auth** error (not the username error above),
the keychain token has expired — make a new fine-grained PAT (Contents:
read/write on the repo) and re-store it with:
`printf "protocol=https\nhost=github.com\nusername=AnchContinia\npassword=NEW_TOKEN\n" | git credential-osxkeychain store`
