# LinkedIn competitor trawl

Read the 50 most recent posts on each of the 31 company pages below and return
them as one CSV file.

---

## Rule 1 — an unread number is BLANK, never 0

This is the rule the whole task stands on. A previous run wrote `0` wherever it
could not read a counter, so 45% of the file said "zero engagement" and a real
zero became impossible to tell apart from a failed read. The whole capture had
to be thrown away.

- If you can read the number, write it. **Zero is a real value** — a post with
  no reactions gets `0`.
- If the counter is not visible, not loaded, or you are unsure — **leave the
  cell empty.** An empty cell is useful. A wrong `0` destroys the file.
- Never estimate, round, infer from a similar post, or carry a number over from
  another row.
- Scroll each post into view and let the engagement bar render before reading
  it. If a page will not load its counters, say so rather than filling in zeros.

A file with 200 blanks is fine. A file with 200 fake zeros is worthless.

## Rule 2 — every row needs a working post link

Each row carries the post's own permalink
(`https://www.linkedin.com/feed/update/urn:li:activity:.../`), not the company
page URL. If you cannot get the permalink, leave the row out and report it.

---

## The pages

Open each with `?feedView=all` so reposts are included.

| # | Company (use this exact label) | URL |
|---|---|---|
| 1 | Continia Software | https://www.linkedin.com/company/continia-software-a-s/posts/ |
| 2 | Truvio | https://www.linkedin.com/company/truvio-official/posts/ |
| 3 | Equisys | https://www.linkedin.com/company/equisys/posts/ |
| 4 | Medius | https://www.linkedin.com/company/medius/posts/ |
| 5 | Qvalia | https://www.linkedin.com/company/qvalia/posts/ |
| 6 | AMC Banking | https://www.linkedin.com/company/amc-banking/posts/ |
| 7 | B2Brouter | https://www.linkedin.com/company/b2brouter/posts/ |
| 8 | Dooap | https://www.linkedin.com/company/dooap/posts/ |
| 9 | Yavrio | https://www.linkedin.com/company/yavrio/posts/ |
| 10 | Rillion | https://www.linkedin.com/company/rillion/posts/ |
| 11 | Fidesic | https://www.linkedin.com/company/fidesic/posts/ |
| 12 | Tipalti | https://www.linkedin.com/company/tipalti/posts/ |
| 13 | Stampli | https://www.linkedin.com/company/stampli/posts/ |
| 14 | Pleo | https://www.linkedin.com/company/pleo-company/posts/ |
| 15 | Payhawk | https://www.linkedin.com/company/payhawk/posts/ |
| 16 | Rydoo | https://www.linkedin.com/company/rydoo/posts/ |
| 17 | Expensify | https://www.linkedin.com/company/expensify/posts/ |
| 18 | Zoho Expense | https://www.linkedin.com/showcase/zoho-expense/posts/ |
| 19 | DocuWare | https://www.linkedin.com/company/docuware-corporation/posts/ |
| 20 | Yooz | https://www.linkedin.com/company/yooz/posts/ |
| 21 | AvidXchange | https://www.linkedin.com/company/avidxchange-inc-/posts/ |
| 22 | Pagero | https://www.linkedin.com/company/pagero/posts/ |
| 23 | Compleat | https://www.linkedin.com/company/compleat-software-ltd/posts/ |
| 24 | Tungsten Automation | https://www.linkedin.com/company/tungstenautomation/posts/ |
| 25 | onPhase | https://www.linkedin.com/company/onphase/posts/ |
| 26 | MineralTree | https://www.linkedin.com/company/mineraltree-inc-/posts/ |
| 27 | Lasernet | https://www.linkedin.com/showcase/lasernet-formpipe/posts/ |
| 28 | Dime Scheduler | https://www.linkedin.com/company/dimesoftware/posts/ |
| 29 | Acubiz | https://www.linkedin.com/company/acubiz/posts/ |
| 30 | Stripe | https://www.linkedin.com/company/stripe/posts/ |
| 31 | Incedo | https://www.linkedin.com/company/incedo-inc/posts/ |

Use the label in the middle column **verbatim** in the `Company` field. Do not
substitute the legal name, the parent brand, or whatever the page header shows —
`AvidXchange`, not `AvidXchange, Inc.`; `Pagero`, not `Thomson Reuters`;
`Fidesic`, not `Fidesic AP`; `Dime Scheduler`, not `Dime Software`.

Three pages are **not** on the list and must not be trawled:

- `linkedin.com/company/signup-software` — Truvio's former brand. It cross-posts
  the same content, so including it double-counts Truvio.
- `linkedin.com/company/acubiz-consulting` — an unrelated Malaysian pharma
  consultancy. The real Acubiz is #29 above.
- `linkedin.com/company/avidxchange` — not the live page. #21 is.

Take all 50 posts where they exist. Some pages have fewer (Equisys ~40,
AMC Banking ~23, Dime Scheduler ~18, Qvalia ~17) — take what is there and say
so; do not pad to 50.

---

## CSV format

One file. These exact headers, in this exact order, comma-separated, UTF-8:

```
Company,Post #,Date (UTC),Title (first line of post),Reactions,Comments,Reposts,Total engagement,Post type,Posted by,Post URL,Company page
```

| Field | What goes in it |
|---|---|
| `Company` | the label from the table above, verbatim |
| `Post #` | 1 = newest, counting up, restarting per company |
| `Date (UTC)` | `YYYY-MM-DD HH:MM`. LinkedIn shows relative ages ("2w", "1mo") — convert them against today's date |
| `Title (first line of post)` | the opening line of the post body on ONE line. Strip newlines and trailing hashtag blocks. No ellipsis. Quote the cell if it contains a comma |
| `Reactions` | integer, all reaction types summed — **or blank if unreadable** |
| `Comments` | integer — **or blank** |
| `Reposts` | integer — **or blank** |
| `Total engagement` | the three summed. Blank if any of the three is blank — do not treat a blank as 0 |
| `Post type` | one value from the list below |
| `Posted by` | who actually authored the post (see Reposts) |
| `Post URL` | the post permalink |
| `Company page` | the page URL from the table above |

### Post type — use exactly these strings

```
Image
Multi-image (N)            <- N = how many images, e.g. Multi-image (4)
Video
Text
Poll
Event
Article/Link               <- post whose body is a shared article or link
Entity/Link                <- shared LinkedIn entity, incl. auto #hiring posts
Document/Carousel (PDF)
```

Do not invent new type names or new spellings. If a post is genuinely
ambiguous, pick the dominant visual element and move on.

### Reposts

`?feedView=all` puts reposts on the page. For a repost, put the **original
author** in `Posted by` — a person's name, a parent brand, another company —
and record the original post's type in `Post type`.

For a post the page wrote itself, `Posted by` is the company. Some pages show a
name that is not their label: AvidXchange posts as "AvidXchange, Inc.",
MineralTree as "MineralTree, Inc.", Pagero as "Thomson Reuters Europe",
Lasernet as "Lasernet". Write what the post actually shows — the mismatch is
handled downstream, so do not normalise it away and do not mark those as
reposts.

---

## Before you hand over the file — required self-check

Report these, as text in your reply, not inside the CSV:

1. **Per company:** posts captured, and how many of those have a blank
   `Reactions`, `Comments` or `Reposts`.
2. **Total blanks** across the file, and the reason (counter not rendered,
   page would not load, post deleted mid-read…).
3. **Any page you could not open** at all, with the reason. Leave it out of the
   CSV rather than guessing.
4. **The three arithmetic checks:**
   - every non-blank `Total engagement` equals its three parts summed
   - `Post #` runs 1..N with no gaps and no repeats within a company
   - every `Post URL` is a distinct `feed/update/urn:li:activity:` link
5. **A plausibility pass.** Look at your own numbers before sending them. If a
   large page's recent posts read zero across the board, that is a failed read,
   not a quiet month — go back and re-read them, or blank them. Stripe,
   Pagero, Payhawk and MineralTree normally run in the hundreds per post; a
   file where they read single digits is wrong.

Say plainly what you could not get. An honest gap is fixable; a fabricated
number is not.
