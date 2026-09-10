# Regenerates linkedin-data.js from the LinkedIn trawl CSVs.
# Reusable: point CSV/SUMMARY at the next dated pair in "Assets/LinkedIn trawls".
import csv, io, json, re, unicodedata, collections, sys

BASE = "/Users/andreasv.christensen/Desktop/Claude-Marketing-dashboard/Assets/LinkedIn trawls/"
CSV  = BASE + "linkedin_competitor_posts_2026-09-10.csv"
CAPTURED = "2026-09-10"

# CSV company label -> dashboard label. Anything not listed here is dropped.
KEEP = collections.OrderedDict([
    ("Continia Software A/S", "Continia Software"),
    ("Truvio",                "Truvio"),
    ("Equisys (Zetadocs)",    "Equisys"),
    ("Medius",                "Medius"),
    ("Qvalia",                "Qvalia"),
    ("AMC Banking",           "AMC Banking"),
    ("B2Brouter",             "B2Brouter"),
    ("Dooap",                 "Dooap"),
    ("Yavrio",                "Yavrio"),
    ("Rillion",               "Rillion"),
    ("Fidesic",               "Fidesic"),
    ("Tipalti",               "Tipalti"),
    ("Stampli",               "Stampli"),
    # New with the Sep 10 trawl — the 1:1 solution rivals added to the roster.
    ("Pleo",                  "Pleo"),
    ("Payhawk",               "Payhawk"),
    ("Rydoo",                 "Rydoo"),
    ("Expensify",             "Expensify"),
    ("Zoho Expense",          "Zoho Expense"),
    ("DocuWare",              "DocuWare"),
    # Benchmarks: not competitors. They render with a Benchmark badge, stay out
    # of the engagement bar's scale and are excluded from content-gap / SOV.
    ("Stripe",                "Stripe"),
    ("Incedo Inc",            "Incedo"),
])
OURS  = {"Continia Software"}
BENCH = {"Stripe", "Incedo"}

# Pill vocabulary kept identical to every earlier capture so type-mix
# comparisons across archive snapshots stay meaningful.
TYMAP = {"Image":"Image", "Multi-image":"Image", "Carousel":"Document/carousel",
         "Video":"Video", "Poll":"Poll", "Text":"Text", "Link/Article":"Article/Link",
         "Event":"Event", "Repost":"Repost"}

ZW = dict.fromkeys(map(ord, "​‌‍⁠️︎"), None)

def norm(s):
    """Strip zero-width joiners and emoji, keep real letters (incl. æøå), tidy space."""
    s = s.translate(ZW)
    out = []
    for ch in s:
        cat = unicodedata.category(ch)
        out.append(" " if cat in ("So", "Sk", "Cf", "Co", "Cn") else ch)
    s = "".join(out)
    s = re.sub(r"\.{4,}", "...", s)
    return re.sub(r"\s+", " ", s).strip()

rows = list(csv.DictReader(io.open(CSV, encoding="utf-8-sig")))
by = collections.defaultdict(list)
seen_types = collections.Counter()
for r in rows:
    if r["company"] not in KEEP:
        continue
    seen_types[r["type"]] += 1
    by[r["company"]].append(r)

unknown = [t for t in seen_types if t not in TYMAP]
if unknown:
    sys.exit("unmapped post type(s): %r" % unknown)

out = []
for csv_name, name in KEEP.items():
    posts = sorted(by[csv_name], key=lambda r: int(r["post_no"]))
    if not posts:
        sys.exit("no rows for %r" % csv_name)
    flag = ' ours: true,' if name in OURS else (' bench: true,' if name in BENCH else '')
    head = '    { name: %s,%s url: %s, posts: [' % (
        json.dumps(name, ensure_ascii=False), flag,
        json.dumps(posts[0]["company_url"], ensure_ascii=False))
    lines = [head]
    for p in posts:
        lines.append('      {t:%s, ty:%s, r:%s, c:%s, rp:%s, d:%s, u:%s},' % (
            json.dumps(norm(p["title"]), ensure_ascii=False),
            json.dumps(TYMAP[p["type"]]),
            int(p["reactions"]), int(p["comments"]), int(p["reposts"]),
            json.dumps(p["date"]), json.dumps(p["post_url"])))
    lines[-1] = lines[-1][:-1]  # drop trailing comma
    lines.append('    ]},')
    out.append("\n".join(lines))

body = "\n\n".join(out)
body = body[:-1] if body.endswith(",") else body  # last company: no trailing comma

header = '''/* =========================================================================
   LinkedIn post-engagement data for the Continia competitor dashboard.
   Public engagement on each company's recent posts (reactions / comments /
   reposts). Totals, averages and cadence are computed in dashboard.js from
   these raw posts, so the comparison table can never drift from the source.

   Source: Assets/LinkedIn trawls/linkedin_competitor_posts_2026-09-10.csv
   (captured 2026-09-10; the matching linkedin_competitor_summary_2026-09-10.csv
   holds the same numbers pre-aggregated and is kept only as a cross-check).

   Per post: "t" is the title as the trawl captured it (the opening line, cut at
   a word boundary — no ellipsis is added, so a sentence may simply stop), "ty"
   is the content-type pill, "r"/"c"/"rp" are reactions/comments/reposts, "d" is
   the post date (YYYY-MM-DD) and "u" links the original post. Per company, "url"
   is the LinkedIn company page. Up to 50 most-recent posts each; fewer where the
   page had fewer (Equisys 44, AMC Banking 22, Qvalia 16).

   Type pills follow the vocabulary used since June 2026: LinkedIn's
   "Multi-image" renders as Image and "Carousel" as Document/carousel, so type
   mixes stay comparable with the archive snapshots.

   Two rows carry bench:true - Stripe (payments benchmark) and Incedo (consulting
   firm). They are not competitors: they render with a Benchmark badge, are left
   out of the engagement bar's scale, and are excluded from the content-gap /
   share-of-voice maths. signup-software stays out entirely (Truvio's former
   brand, already covered by the Truvio row).
   ========================================================================= */

window.LI_DATA = {
  source: "LinkedIn public engagement",
  captured: "%s",
  windowLabel: "up to 50 recent posts each \\u00b7 public engagement",
  companies: [
%s
  ]
};
''' % (CAPTURED, body)

io.open("/Users/andreasv.christensen/Desktop/Claude-Marketing-dashboard/linkedin-data.js", "w", encoding="utf-8").write(header)
print("companies:", len(KEEP), "posts:", sum(len(by[c]) for c in KEEP))
print("types:", dict(seen_types))
