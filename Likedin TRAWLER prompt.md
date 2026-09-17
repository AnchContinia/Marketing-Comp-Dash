# LinkedIn competitor trawl

Read the most recent posts on each company page below and return them as a CSV.

**Generated 2026-09-17 by `node tools/make-trawl-prompt.js`. Regenerate before every run —
the stop markers below go stale as soon as a capture lands.**

---

## Rule 1 — an unread number is BLANK, never 0

A previous run wrote `0` wherever it could not read a counter. 45% of that file said
"zero engagement", a real zero became impossible to tell apart from a failed read, and
the whole capture was thrown away.

- Can you read the number? Write it. **Zero is a real value** — a post with no
  reactions gets `0`.
- Counter not visible, not loaded, or you are unsure? **Leave the cell empty.**
- Never estimate, round, infer from a similar post, or carry a number across rows.

A file with 200 blanks is fine. A file with 200 fake zeros is worthless.

## Rule 2 — do not skip posts

The run after that one got the numbers right but missed about a third of the posts,
scrolling past some and reaching further back to make up the count. That halves every
cadence figure downstream.

Work **straight down the feed in order**. Every post you pass gets a row — including
reposts, event posts and one-line posts with no engagement. If a post will not load,
give it a row with blank counts rather than skipping it, and say which ones in your
reply. Dates must come out monotonically decreasing with no unexplained multi-week
holes.

## Rule 3 — every row needs its own permalink

Each row carries the post's permalink (`.../feed/update/urn:li:activity:.../`), not the
company page URL. No permalink, no row — and report it.

---

## How much to take, and where to stop

Take the **50 most recent posts** per page (fewer where the page has fewer — do not pad).

Each company below has a **stop marker**: the newest post already on file. Use it as a
checkpoint, not as a finish line.

1. Start at the top of the feed.
2. Record every post going down until you reach the marker post.
3. **Keep going past it** until you have 50 posts, or the feed runs out.
4. In your reply, say how many posts sat above the marker — that is the new activity
   since the last capture, and it is the number worth sanity-checking.

If you never reach the marker within 50 posts, that is fine and worth saying: the page
has been busy.

---

## Batches

**Do one batch per run and hand over that batch's CSV before starting the next.** Batches
are ordered by how out of date the data is — batch 1 matters most. Name each file
`linkedin_trawl_<batch>_<date>.csv`.

### Batch 1 of 6

| Company (use this label verbatim) | Page | Stop marker — newest post on file |
|---|---|---|
| **DocuWare**<br><sub>last captured 2026-09-10</sub> | https://www.linkedin.com/company/docuware-corporation/posts/ | 2026-09-10 · Confusion around different versions of a doc<br>https://www.linkedin.com/feed/update/urn:li:activity:7503784465052368896/ |
| **Incedo**<br><sub>last captured 2026-09-10</sub> | https://www.linkedin.com/company/incedo-inc/posts/ | 2026-09-10 · Agentic AI becomes valuable when AI agents c<br>https://www.linkedin.com/feed/update/urn:li:activity:7503652374603886593/ |
| **Stripe**<br><sub>last captured 2026-09-10</sub> | https://www.linkedin.com/company/stripe/posts/ | 2026-09-09 · We're livestreaming the Lenny & Friends Summ<br>https://www.linkedin.com/feed/update/urn:li:activity:7503482743364751360/ |
| **Acubiz**<br><sub>last captured 2026-09-14</sub> | https://www.linkedin.com/company/acubiz/posts/ | 2026-09-11 · En chat er fin til det simple. Når det ikke <br>https://www.linkedin.com/feed/update/urn:li:activity:7504071749500641282/ |
| **AvidXchange**<br><sub>last captured 2026-09-14</sub> | https://www.linkedin.com/company/avidxchange-inc-/posts/ | 2026-09-08 · The Change Maker Awards are back! If you or <br>https://www.linkedin.com/feed/update/urn:li:activity:7503135196624424960/ |
| **Compleat**<br><sub>last captured 2026-09-14</sub> | https://www.linkedin.com/company/compleat-software-ltd/posts/ | 2026-09-10 · 97% of #finance teams have adopted #AI. Only<br>https://www.linkedin.com/feed/update/urn:li:activity:7503755624485134337/ |

### Batch 2 of 6

| Company (use this label verbatim) | Page | Stop marker — newest post on file |
|---|---|---|
| **Dime Scheduler**<br><sub>last captured 2026-09-14</sub> | https://www.linkedin.com/company/dimesoftware/posts/ | 2026-05-27 · Webinar alert: What's new in Dime.Scheduler <br>https://www.linkedin.com/feed/update/urn:li:activity:7465304885429796864/ |
| **Lasernet**<br><sub>last captured 2026-09-14</sub> | https://www.linkedin.com/showcase/lasernet-formpipe/posts/ | 2026-09-09 · Can you prove that a batch certificate used <br>https://www.linkedin.com/feed/update/urn:li:activity:7503422990219497472/ |
| **MineralTree**<br><sub>last captured 2026-09-14</sub> | https://www.linkedin.com/company/mineraltree-inc-/posts/ | 2026-09-14 · Consumers are embracing AI for discovery, re<br>https://www.linkedin.com/feed/update/urn:li:activity:7505243969421996033/ |
| **onPhase**<br><sub>last captured 2026-09-14</sub> | https://www.linkedin.com/company/onphase/posts/ | 2026-09-10 · More than 75% of U.S. organizations experien<br>https://www.linkedin.com/feed/update/urn:li:activity:7503849348430995457/ |
| **Pagero**<br><sub>last captured 2026-09-14</sub> | https://www.linkedin.com/company/pagero/posts/ | 2026-09-14 · Delayed payments are often viewed as a tempo<br>https://www.linkedin.com/feed/update/urn:li:activity:7505195437377646593/ |
| **Tungsten Automation**<br><sub>last captured 2026-09-14</sub> | https://www.linkedin.com/company/tungstenautomation/posts/ | 2026-09-14 · A Leader. Again! We’ve been named a Leader i<br>https://www.linkedin.com/feed/update/urn:li:activity:7505264464016011264/ |

### Batch 3 of 6

| Company (use this label verbatim) | Page | Stop marker — newest post on file |
|---|---|---|
| **Yooz**<br><sub>last captured 2026-09-14</sub> | https://www.linkedin.com/company/yooz/posts/ | 2026-09-13 · We're #hiring a new Full Stack Development E<br>https://www.linkedin.com/feed/update/urn:li:activity:7504863731185664000/ |
| **AMC Banking**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/amc-banking/posts/ | 2026-09-15 · More banks. More markets. More coverage.<br>https://www.linkedin.com/feed/update/urn:li:activity:7505543652060901376/ |
| **B2Brouter**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/b2brouter/posts/ | 2026-09-16 · En dos semanas empieza la cuenta atrás de la<br>https://www.linkedin.com/feed/update/urn:li:activity:7505914054385885187/ |
| **Continia Software**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/continia-software-a-s/posts/ | 2026-09-14 · 2026 R2 is almost here, and it's our biggest<br>https://www.linkedin.com/feed/update/urn:li:activity:7505230135697199104/ |
| **Dooap**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/dooap/posts/ | 2026-09-15 · Two continents, one week, zero chill.<br>https://www.linkedin.com/feed/update/urn:li:activity:7505746104035045376/ |
| **Equisys**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/equisys/posts/ | 2026-09-15 · Join us as our panel of product experts and <br>https://www.linkedin.com/feed/update/urn:li:activity:7505565286411063296/ |

### Batch 4 of 6

| Company (use this label verbatim) | Page | Stop marker — newest post on file |
|---|---|---|
| **Expensify**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/expensify/posts/ | 2026-09-14 · "Q2 is one of our strongest shipping quarter<br>https://www.linkedin.com/feed/update/urn:li:activity:7505304316761563137/ |
| **Fidesic**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/fidesic/posts/ | 2026-09-03 · Your AP automation was supposed to eliminate<br>https://www.linkedin.com/feed/update/urn:li:activity:7501380491703373824/ |
| **Medius**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/medius/posts/ | 2026-09-16 · Every quarter, we take a moment to recognize<br>https://www.linkedin.com/feed/update/urn:li:activity:7505992672537477120/ |
| **Payhawk**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/payhawk/posts/ | 2026-09-16 · Eleven years since Grigor Dimitrov last wore<br>https://www.linkedin.com/feed/update/urn:li:activity:7505991541765885952/ |
| **Pleo**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/pleo-company/posts/ | 2026-09-16 · That's a wrap on Accountex Summit Manchester<br>https://www.linkedin.com/feed/update/urn:li:activity:7505958843017994241/ |
| **Qvalia**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/qvalia/posts/ | 2026-09-16 · We are glad to support the UAE Buyer's Guide<br>https://www.linkedin.com/feed/update/urn:li:activity:7505934833659961344/ |

### Batch 5 of 6

| Company (use this label verbatim) | Page | Stop marker — newest post on file |
|---|---|---|
| **Rillion**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/rillion/posts/ | 2026-09-16 · Did you know..<br>https://www.linkedin.com/feed/update/urn:li:activity:7505901573374570497/ |
| **Rydoo**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/rydoo/posts/ | 2026-09-16 · Last week we mapped the five European e-invo<br>https://www.linkedin.com/feed/update/urn:li:activity:7505938431139770368/ |
| **Stampli**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/stampli/posts/ | 2026-09-14 · Really lucky to work with such visionary fou<br>https://www.linkedin.com/feed/update/urn:li:activity:7505310186530828288/ |
| **Tipalti**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/tipalti/posts/ | 2026-09-15 · Heading to Informa's Finance Accounting for <br>https://www.linkedin.com/feed/update/urn:li:activity:7505645729906892801/ |
| **Truvio**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/truvio-official/posts/ | 2026-09-16 · When production planning involves up to 22,0<br>https://www.linkedin.com/feed/update/urn:li:activity:7505909696629837826/ |
| **Yavrio**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/company/yavrio/posts/ | 2026-09-16 · Joshua Wilkinson is on the ground in Dallas <br>https://www.linkedin.com/feed/update/urn:li:activity:7505996930037063680/ |

### Batch 6 of 6

| Company (use this label verbatim) | Page | Stop marker — newest post on file |
|---|---|---|
| **Zoho Expense**<br><sub>last captured 2026-09-17</sub> | https://www.linkedin.com/showcase/zoho-expense/posts/ | 2026-09-15 · What if Zoho Expense existed in the 1980s<br>https://www.linkedin.com/feed/update/urn:li:activity:7505566207702355968/ |

---

## Labels

Use the **Company** column above verbatim. Do not substitute the legal name, the parent
brand, or whatever the page header shows — `AvidXchange`, not `AvidXchange, Inc.`;
`Pagero`, not `Thomson Reuters`; `Fidesic`, not `Fidesic AP`; `Continia Software`, not
`Continia Software A/S`. A new spelling stops the import.

These pages must **not** be trawled:

- `linkedin.com/company/signup-software` — Truvio's former brand. Cross-posts the same
  content, so it double-counts Truvio.
- `linkedin.com/company/acubiz-consulting` — an unrelated Malaysian pharma consultancy.
- `linkedin.com/company/avidxchange` — not the live page; the table has the right one.

---

## CSV format

These exact headers, in this order, comma-separated, UTF-8:

```
Company,Post #,Date (UTC),Title (first line of post),Reactions,Comments,Reposts,Total engagement,Post type,Posted by,Post URL,Company page
```

| Field | What goes in it |
|---|---|
| `Company` | the label from the batch table, verbatim |
| `Post #` | 1 = newest, counting up, restarting per company |
| `Date (UTC)` | `YYYY-MM-DD HH:MM`. Convert relative ages ("2w", "1mo") against today |
| `Title (first line of post)` | the **full** first line of the post body, on one line. Strip newlines and trailing hashtag blocks. No ellipsis, no truncation. Quote the cell if it contains a comma |
| `Reactions` | integer, all reaction types summed — **or blank if unreadable** |
| `Comments` | integer — **or blank** |
| `Reposts` | integer — **or blank** |
| `Total engagement` | the three summed. Blank if any part is blank — a blank is not 0 |
| `Post type` | one value from the list below |
| `Posted by` | who actually authored the post (see Reposts) |
| `Post URL` | the post permalink |
| `Company page` | the page URL from the batch table |

### Post type — exactly these strings

```
Image
Multi-image (N)            <- N = how many images, e.g. Multi-image (4)
Video
Text
Poll
Event
Article/Link               <- body is a shared article or link
Entity/Link                <- shared LinkedIn entity, incl. auto #hiring posts
Document/Carousel (PDF)
```

No new type names, no new spellings. If a post is genuinely ambiguous, pick the
dominant visual element and move on.

### Reposts

Open each page with `?feedView=all` so reposts are included. For a repost, put the
**original author** in `Posted by` and the original post's type in `Post type`.

For a post the page wrote itself, `Posted by` is the company. Some pages show a name
that is not their label — AvidXchange posts as "AvidXchange, Inc.", MineralTree as
"MineralTree, Inc.", Pagero as "Thomson Reuters Europe", Lasernet as "Lasernet",
Fidesic as "Fidesic AP". Write what the post actually shows; the mismatch is handled
downstream, so do not normalise it away and do not mark those as reposts.

---

## Before handing over the file — required self-check

Report these as text in your reply, not inside the CSV:

1. **Per company:** posts captured, how many sat **above the stop marker**, and how many
   rows have a blank `Reactions`, `Comments` or `Reposts`.
2. **Continuity:** for each company, confirm the dates run monotonically down with no
   unexplained gap. Name any gap longer than three weeks and say whether the page was
   simply quiet.
3. **Total blanks** across the file and the reason for them.
4. **Any page you could not open**, with the reason. Leave it out rather than guessing.
5. **Arithmetic:** every non-blank `Total engagement` equals its three parts summed;
   `Post #` runs 1..N with no gaps or repeats per company; every `Post URL` is distinct.
6. **Plausibility.** Look at your own numbers before sending. If a large page's recent
   posts read zero across the board, that is a failed read, not a quiet month — re-read
   them or blank them.

Say plainly what you could not get. An honest gap is fixable; a fabricated number is not.
