# Regenerates linkedin-data.js from the LinkedIn trawl CSVs.
# Reusable: add the next dated CSV to SOURCES and map its company labels in KEEP.
import csv, io, json, re, unicodedata, collections, sys

BASE = "/Users/andreasv.christensen/Desktop/Claude-Marketing-dashboard/Assets/LinkedIn trawls/"
OUT  = "/Users/andreasv.christensen/Desktop/Claude-Marketing-dashboard/linkedin-data.js"

# (csv filename, capture date, dialect). Read in order; a company appearing in
# more than one file keeps the LAST one listed, so put fresher captures further
# down. Captures do not have to share a date - each company carries the date of
# the trawl it came from, and dashboard.js measures that company's 30-day
# momentum window from its own capture date rather than from one global "as of".
#
# Two dialects, because the captures do not all come from the same tool:
#   "trawl"    the multi-company competitor sweep - comma-separated, one
#              "company" column, English type names, titles cut at ~75 chars.
#   "continia" our own page export - semicolon-separated, Danish headers
#              (Dato/Titel/Type/Link), no company column, lowercase type names
#              ("multi-image (9)", "carousel/document") and FULL titles.
SOURCES = [
    ("linkedin_competitor_posts_2026-09-10.csv",       "2026-09-10", "trawl"),
    ("linkedin_competitor_posts_2026-09-14_EXTRA.csv", "2026-09-14", "trawl"),
    ("continia-linkedin-50-posts_16 SEP.csv",          "2026-09-16", "continia"),
]
CAPTURED = "2026-09-16"   # newest capture; shown as the module's "as of" date

# The "continia" dialect carries no company/company_url columns - they are the
# same on every row, so they live here instead.
CONTINIA_LABEL = "Continia Software A/S"
CONTINIA_URL   = "https://www.linkedin.com/company/continia-software-a-s/posts/"

# CSV company label -> dashboard label. Anything not listed here is dropped.
# Dashboard labels match the competitor-card names in dashboard.js wherever a
# card exists, so the module lines up with the roster.
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
    # Added with the Sep 10 trawl - the 1:1 solution rivals.
    ("Pleo",                  "Pleo"),
    ("Payhawk",               "Payhawk"),
    ("Rydoo",                 "Rydoo"),
    ("Expensify",             "Expensify"),
    ("Zoho Expense",          "Zoho Expense"),
    ("DocuWare",              "DocuWare"),
    # Added with the Sep 14 EXTRA trawl - competitor cards that had no LinkedIn
    # coverage at all and were therefore invisible in the Content-Gap Analysis.
    ("Yooz",                  "Yooz"),
    ("AvidXchange",           "AvidXchange"),
    ("Pagero",                "Pagero"),
    ("Compleat Software",     "Compleat"),
    ("Tungsten Automation",   "Tungsten Automation"),
    ("onPhase",               "onPhase"),
    ("MineralTree",           "MineralTree"),
    ("Lasernet (Formpipe)",   "Lasernet"),
    ("Dime Scheduler",        "Dime Scheduler"),
    ("Acubiz",                "Acubiz"),
    # Benchmarks: not competitors. They render with a Benchmark badge, stay out
    # of the engagement bar's scale and are excluded from content-gap / SOV.
    ("Stripe",                "Stripe"),
    ("Incedo Inc",            "Incedo"),
])
OURS  = {"Continia Software"}
BENCH = {"Stripe", "Incedo"}

# Still no LinkedIn coverage, and none is possible:
#   Microsoft Expense Agent - a Microsoft product, no company page of its own.
#
# Deliberately NOT trawled:
#   SignUp Software (linkedin.com/company/signup-software) - the legacy page of
#     the company that is now Truvio. It cross-posts the same Truvio content, so
#     including it would double-count ExFlow/Truvio in every gap and SOV figure.
#   acubiz-consulting - an unrelated Malaysian pharma consultancy. The real
#     Acubiz (Visma, Birkerod) is linkedin.com/company/acubiz.

# Pill vocabulary kept identical to every earlier capture so type-mix
# comparisons across archive snapshots stay meaningful.
TYMAP = {"Image":"Image", "Multi-image":"Image", "Carousel":"Document/carousel",
         "Video":"Video", "Poll":"Poll", "Text":"Text", "Link/Article":"Article/Link",
         "Event":"Event", "Repost":"Repost"}

# The Continia export spells the same types in lowercase and counts the images
# in a multi-image post ("multi-image (9)"). Fold it back onto the vocabulary
# above so our own row stays comparable with every competitor row.
CONTINIA_TYMAP = {"image":"Image", "multi-image":"Multi-image",
                  "carousel/document":"Carousel", "video":"Video",
                  "text":"Text", "poll":"Poll", "link/article":"Link/Article",
                  "event":"Event", "repost":"Repost"}

def continia_type(raw):
    t = re.sub(r"\s*\(\d+\)\s*$", "", raw.strip().lower())   # drop "(9)"
    if t not in CONTINIA_TYMAP:
        sys.exit("unmapped Continia post type: %r" % raw)
    return CONTINIA_TYMAP[t]

ZW = dict.fromkeys(map(ord, "​‌‍⁠️︎"), None)

def norm(s):
    """Strip zero-width joiners and emoji, keep real letters (incl. aeoa), tidy space."""
    s = s.translate(ZW)
    out = []
    for ch in s:
        cat = unicodedata.category(ch)
        out.append(" " if cat in ("So", "Sk", "Cf", "Co", "Cn") else ch)
    s = "".join(out)
    s = re.sub(r"\.{4,}", "...", s)
    return re.sub(r"\s+", " ", s).strip()

by      = {}   # csv label -> rows
cap_of  = {}   # csv label -> capture date of the trawl it came from
seen_types = collections.Counter()

def read_trawl(fname):
    """Multi-company competitor sweep: comma-separated, already in our shape."""
    return list(csv.DictReader(io.open(BASE + fname, encoding="utf-8-sig")))

def read_continia(fname):
    """Our own page export: semicolon-separated, Danish headers, no company."""
    out = []
    for r in csv.DictReader(io.open(BASE + fname, encoding="utf-8-sig"), delimiter=";"):
        out.append({
            "company":      CONTINIA_LABEL,
            "post_no":      r["#"],
            "date":         r["Dato"],
            "type":         continia_type(r["Type"]),
            "reactions":    r["Reactions"],
            "comments":     r["Comments"],
            "reposts":      r["Reposts"],
            "title":        r["Titel"],
            "post_url":     r["Link"].strip(),
            "company_url":  CONTINIA_URL,
        })
    return out

READERS = {"trawl": read_trawl, "continia": read_continia}

for fname, captured, dialect in SOURCES:
    if dialect not in READERS:
        sys.exit("unknown dialect %r for %s" % (dialect, fname))
    rows = READERS[dialect](fname)
    if not rows:
        sys.exit("empty CSV: %s" % fname)
    grouped = collections.defaultdict(list)
    for r in rows:
        if r["company"] not in KEEP:
            continue
        seen_types[r["type"]] += 1
        grouped[r["company"]].append(r)
    for label, rs in grouped.items():
        by[label] = rs               # later SOURCES win
        cap_of[label] = captured

unknown = [t for t in seen_types if t not in TYMAP]
if unknown:
    sys.exit("unmapped post type(s): %r" % unknown)

missing = [c for c in KEEP if c not in by]
if missing:
    sys.exit("no rows for %r - is it in one of the SOURCES CSVs?" % missing)

out = []
for csv_name, name in KEEP.items():
    posts = sorted(by[csv_name], key=lambda r: int(r["post_no"]))
    flag = ' ours: true,' if name in OURS else (' bench: true,' if name in BENCH else '')
    # Only companies captured on a different day than CAPTURED carry "cap";
    # the rest inherit the module-level capture date.
    cap = '' if cap_of[csv_name] == CAPTURED else ' cap: %s,' % json.dumps(cap_of[csv_name])
    head = '    { name: %s,%s%s url: %s, posts: [' % (
        json.dumps(name, ensure_ascii=False), flag, cap,
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

src_lines = "\n".join(
    "     %s  (captured %s, %s dialect)" % (f, d, dl) for f, d, dl in SOURCES)

header = '''/* =========================================================================
   LinkedIn post-engagement data for the Continia competitor dashboard.
   Public engagement on each company's recent posts (reactions / comments /
   reposts). Totals, averages and cadence are computed in dashboard.js from
   these raw posts, so the comparison table can never drift from the source.

   Sources, all in Assets/LinkedIn trawls/:
%s
   Each has a matching linkedin_competitor_summary_*.csv holding the same
   numbers pre-aggregated; those are kept only as a cross-check.

   MIXED CAPTURE DATES. The roster was assembled from two trawls four days
   apart, so a company captured before "captured" below carries its own "cap"
   date. dashboard.js measures that company's 30-day momentum window from its
   own capture date, which keeps the Last-30-days column comparable instead of
   handing the later trawl four extra days of posts.

   Per post: "t" is the title as the capture recorded it. The competitor sweep
   cuts it at ~75 characters on a word boundary (no ellipsis is added, so a
   sentence may simply stop); the Continia export carries the full first line,
   so our own titles read longer than the rest. Emoji are stripped either way.
   "ty"
   is the content-type pill, "r"/"c"/"rp" are reactions/comments/reposts, "d" is
   the post date (YYYY-MM-DD) and "u" links the original post. Per company, "url"
   is the LinkedIn company page. Up to 50 most-recent posts each; fewer where the
   page had fewer (Equisys 44, AMC Banking 22, Dime Scheduler 18, Qvalia 16).

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
''' % (src_lines, CAPTURED, body)

io.open(OUT, "w", encoding="utf-8").write(header)
print("companies:", len(KEEP), "posts:", sum(len(by[c]) for c in KEEP))
print("captures:", dict(collections.Counter(cap_of.values())))
print("types:", dict(seen_types))
