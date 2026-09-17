#!/usr/bin/env node
/* Regenerates the LinkedIn trawl prompt from the live data.
 *
 *   node tools/make-trawl-prompt.js
 *
 * The prompt carries a per-company STOP MARKER - the newest post we already
 * hold - so the trawling agent knows exactly where the last capture ended and
 * cannot silently skip posts in between. Those markers go stale the moment a
 * capture lands, which is why the prompt is generated rather than hand-kept.
 *
 * Companies are ordered stalest capture first and split into small batches:
 * the Sep 17 run degraded over its 31 pages, missing ~31% of posts and
 * stopping at 18, so the work is handed over in pieces that fit one session.
 * If only the first batches get done, the most out-of-date pages are the ones
 * that landed. */

const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "Likedin TRAWLER prompt.md");
const BATCH = 6;

global.window = {};
eval(fs.readFileSync(path.join(ROOT, "linkedin-data.js"), "utf8"));
const LI = global.window.LI_DATA;

const cos = LI.companies.map(c => {
  const posts = (c.posts || []).slice().sort((a, b) => (b.d || "").localeCompare(a.d || ""));
  return { name: c.name, url: c.url, cap: c.cap || LI.captured,
           newest: posts[0] || null, n: posts.length };
}).sort((a, b) => (a.cap === b.cap ? a.name.localeCompare(b.name) : a.cap.localeCompare(b.cap)));

const batches = [];
for (let i = 0; i < cos.length; i += BATCH) batches.push(cos.slice(i, i + BATCH));

const today = new Date().toISOString().slice(0, 10);
const L = [];
L.push("# LinkedIn competitor trawl");
L.push("");
L.push("Read the most recent posts on each company page below and return them as a CSV.");
L.push("");
L.push("**Generated " + today + " by `node tools/make-trawl-prompt.js`. Regenerate before every run —");
L.push("the stop markers below go stale as soon as a capture lands.**");
L.push("");
L.push("---");
L.push("");
L.push("## Rule 1 — an unread number is BLANK, never 0");
L.push("");
L.push("A previous run wrote `0` wherever it could not read a counter. 45% of that file said");
L.push('"zero engagement", a real zero became impossible to tell apart from a failed read, and');
L.push("the whole capture was thrown away.");
L.push("");
L.push("- Can you read the number? Write it. **Zero is a real value** — a post with no");
L.push("  reactions gets `0`.");
L.push("- Counter not visible, not loaded, or you are unsure? **Leave the cell empty.**");
L.push("- Never estimate, round, infer from a similar post, or carry a number across rows.");
L.push("");
L.push("A file with 200 blanks is fine. A file with 200 fake zeros is worthless.");
L.push("");
L.push("## Rule 2 — do not skip posts");
L.push("");
L.push("The run after that one got the numbers right but missed about a third of the posts,");
L.push("scrolling past some and reaching further back to make up the count. That halves every");
L.push("cadence figure downstream.");
L.push("");
L.push("Work **straight down the feed in order**. Every post you pass gets a row — including");
L.push("reposts, event posts and one-line posts with no engagement. If a post will not load,");
L.push("give it a row with blank counts rather than skipping it, and say which ones in your");
L.push("reply. Dates must come out monotonically decreasing with no unexplained multi-week");
L.push("holes.");
L.push("");
L.push("## Rule 3 — every row needs its own permalink");
L.push("");
L.push("Each row carries the post's permalink (`.../feed/update/urn:li:activity:.../`), not the");
L.push("company page URL. No permalink, no row — and report it.");
L.push("");
L.push("---");
L.push("");
L.push("## How much to take, and where to stop");
L.push("");
L.push("Take the **50 most recent posts** per page (fewer where the page has fewer — do not pad).");
L.push("");
L.push("Each company below has a **stop marker**: the newest post already on file. Use it as a");
L.push("checkpoint, not as a finish line.");
L.push("");
L.push("1. Start at the top of the feed.");
L.push("2. Record every post going down until you reach the marker post.");
L.push("3. **Keep going past it** until you have 50 posts, or the feed runs out.");
L.push("4. In your reply, say how many posts sat above the marker — that is the new activity");
L.push("   since the last capture, and it is the number worth sanity-checking.");
L.push("");
L.push("If you never reach the marker within 50 posts, that is fine and worth saying: the page");
L.push("has been busy.");
L.push("");
L.push("---");
L.push("");
L.push("## Batches");
L.push("");
L.push("**Do one batch per run and hand over that batch's CSV before starting the next.** Batches");
L.push("are ordered by how out of date the data is — batch 1 matters most. Name each file");
L.push("`linkedin_trawl_<batch>_<date>.csv`.");

batches.forEach((b, i) => {
  L.push("");
  L.push("### Batch " + (i + 1) + " of " + batches.length);
  L.push("");
  L.push("| Company (use this label verbatim) | Page | Stop marker — newest post on file |");
  L.push("|---|---|---|");
  b.forEach(c => {
    const m = c.newest
      ? c.newest.d + " · " + (c.newest.t || "(no text)").slice(0, 44) + "<br>" + c.newest.u
      : "*(nothing on file — take 50)*";
    L.push("| **" + c.name + "**<br><sub>last captured " + c.cap + "</sub> | " + c.url + " | " + m + " |");
  });
});

L.push("");
L.push("---");
L.push("");
L.push("## Labels");
L.push("");
L.push("Use the **Company** column above verbatim. Do not substitute the legal name, the parent");
L.push("brand, or whatever the page header shows — `AvidXchange`, not `AvidXchange, Inc.`;");
L.push("`Pagero`, not `Thomson Reuters`; `Fidesic`, not `Fidesic AP`; `Continia Software`, not");
L.push("`Continia Software A/S`. A new spelling stops the import.");
L.push("");
L.push("These pages must **not** be trawled:");
L.push("");
L.push("- `linkedin.com/company/signup-software` — Truvio's former brand. Cross-posts the same");
L.push("  content, so it double-counts Truvio.");
L.push("- `linkedin.com/company/acubiz-consulting` — an unrelated Malaysian pharma consultancy.");
L.push("- `linkedin.com/company/avidxchange` — not the live page; the table has the right one.");
L.push("");
L.push("---");
L.push("");
L.push("## CSV format");
L.push("");
L.push("These exact headers, in this order, comma-separated, UTF-8:");
L.push("");
L.push("```");
L.push("Company,Post #,Date (UTC),Title (first line of post),Reactions,Comments,Reposts,Total engagement,Post type,Posted by,Post URL,Company page");
L.push("```");
L.push("");
L.push("| Field | What goes in it |");
L.push("|---|---|");
L.push("| `Company` | the label from the batch table, verbatim |");
L.push("| `Post #` | 1 = newest, counting up, restarting per company |");
L.push("| `Date (UTC)` | `YYYY-MM-DD HH:MM`. Convert relative ages (\"2w\", \"1mo\") against today |");
L.push("| `Title (first line of post)` | the **full** first line of the post body, on one line. Strip newlines and trailing hashtag blocks. No ellipsis, no truncation. Quote the cell if it contains a comma |");
L.push("| `Reactions` | integer, all reaction types summed — **or blank if unreadable** |");
L.push("| `Comments` | integer — **or blank** |");
L.push("| `Reposts` | integer — **or blank** |");
L.push("| `Total engagement` | the three summed. Blank if any part is blank — a blank is not 0 |");
L.push("| `Post type` | one value from the list below |");
L.push("| `Posted by` | who actually authored the post (see Reposts) |");
L.push("| `Post URL` | the post permalink |");
L.push("| `Company page` | the page URL from the batch table |");
L.push("");
L.push("### Post type — exactly these strings");
L.push("");
L.push("```");
L.push("Image");
L.push("Multi-image (N)            <- N = how many images, e.g. Multi-image (4)");
L.push("Video");
L.push("Text");
L.push("Poll");
L.push("Event");
L.push("Article/Link               <- body is a shared article or link");
L.push("Entity/Link                <- shared LinkedIn entity, incl. auto #hiring posts");
L.push("Document/Carousel (PDF)");
L.push("```");
L.push("");
L.push("No new type names, no new spellings. If a post is genuinely ambiguous, pick the");
L.push("dominant visual element and move on.");
L.push("");
L.push("### Reposts");
L.push("");
L.push("Open each page with `?feedView=all` so reposts are included. For a repost, put the");
L.push("**original author** in `Posted by` and the original post's type in `Post type`.");
L.push("");
L.push("For a post the page wrote itself, `Posted by` is the company. Some pages show a name");
L.push("that is not their label — AvidXchange posts as \"AvidXchange, Inc.\", MineralTree as");
L.push("\"MineralTree, Inc.\", Pagero as \"Thomson Reuters Europe\", Lasernet as \"Lasernet\",");
L.push("Fidesic as \"Fidesic AP\". Write what the post actually shows; the mismatch is handled");
L.push("downstream, so do not normalise it away and do not mark those as reposts.");
L.push("");
L.push("---");
L.push("");
L.push("## Before handing over the file — required self-check");
L.push("");
L.push("Report these as text in your reply, not inside the CSV:");
L.push("");
L.push("1. **Per company:** posts captured, how many sat **above the stop marker**, and how many");
L.push("   rows have a blank `Reactions`, `Comments` or `Reposts`.");
L.push("2. **Continuity:** for each company, confirm the dates run monotonically down with no");
L.push("   unexplained gap. Name any gap longer than three weeks and say whether the page was");
L.push("   simply quiet.");
L.push("3. **Total blanks** across the file and the reason for them.");
L.push("4. **Any page you could not open**, with the reason. Leave it out rather than guessing.");
L.push("5. **Arithmetic:** every non-blank `Total engagement` equals its three parts summed;");
L.push("   `Post #` runs 1..N with no gaps or repeats per company; every `Post URL` is distinct.");
L.push("6. **Plausibility.** Look at your own numbers before sending. If a large page's recent");
L.push("   posts read zero across the board, that is a failed read, not a quiet month — re-read");
L.push("   them or blank them.");
L.push("");
L.push("Say plainly what you could not get. An honest gap is fixable; a fabricated number is not.");
L.push("");

fs.writeFileSync(OUT, L.join("\n"));
console.log("wrote " + path.relative(ROOT, OUT));
console.log(cos.length + " companies in " + batches.length + " batches of up to " + BATCH);
batches.forEach((b, i) =>
  console.log("  batch " + (i + 1) + "  [" + b[0].cap + "]  " + b.map(c => c.name).join(", ")));
