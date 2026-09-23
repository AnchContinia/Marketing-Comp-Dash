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
# A capture that skips a company simply leaves that company on its older data.
#
# Three dialects, because the captures do not all come from the same tool:
#   "trawl"    the original competitor sweep - comma-separated, lowercase
#              "company"/"type" headers, English type names, ~75-char titles.
#   "continia" our own page export - semicolon-separated, Danish headers
#              (Dato/Titel/Type/Link), no company column, lowercase type names
#              ("multi-image (9)", "carousel/document") and FULL titles.
#   "sweep2"   the Sep 16 competitor sweep - comma-separated but different
#              headers ("Post #", "Date (UTC)" with a time, "Post type",
#              "Posted by", "Post URL", "Company page"), type names like
#              "Document/Carousel (PDF)" and "Multi-image (4)", and no Repost
#              type at all: a repost is recorded as the original post's type
#              plus the original author in "Posted by". See SELF_ALIAS.
SOURCES = [
    ("linkedin_competitor_posts_2026-09-10.csv",       "2026-09-10", "trawl"),
    ("linkedin_competitor_posts_2026-09-14_EXTRA.csv", "2026-09-14", "trawl"),
    ("continia-linkedin-50-posts_16 SEP.csv",          "2026-09-16", "continia"),
    ("linkedin_competitor_posts_18of31_SEP 17.csv",     "2026-09-17", "sweep2"),
    ("linkedin_competitor_trawl_2026-09-22.csv",       "2026-09-22", "sweep2"),
    # QUARANTINED - do not re-enable this file:
    #   ("linkedin_konkurrent_posts_16 sep.csv",       "2026-09-16", "sweep2"),
    # The Sep 16 competitor sweep is a broken capture. 635 of its 1398 rows
    # (45%) carry 0 reactions AND 0 comments AND 0 reposts, spread evenly
    # across post position (43-50% in every block of ten), including Stripe's
    # newest posts. Cross-checking post URLs against the Sep 10/14 captures
    # settles it: 612 native posts match the older numbers exactly, while 431
    # read zero - so the tool reports correctly when it reads the counter at
    # all and writes 0 when it fails. Because it wrote 0 instead of leaving the
    # cell empty, a real zero is indistinguishable from a failed read and the
    # file cannot be repaired. Loading it dropped every competitor's average
    # by roughly 5x (Stripe 348 -> 68, MineralTree 154 -> 7) and would have
    # made Continia look dramatically stronger than it is.
    # The "sweep2" dialect below is finished and tested against this file, so a
    # clean re-run only needs the SOURCES line above uncommented.
]
CAPTURED = "2026-09-22"   # newest capture; shown as the module's "as of" date
MAX_POSTS = 50            # window size per company, after merging captures

# The "continia" dialect carries no company/company_url columns - they are the
# same on every row, so they live here instead.
CONTINIA_LABEL = "Continia Software A/S"
CONTINIA_URL   = "https://www.linkedin.com/company/continia-software-a-s/posts/"

# CSV company label -> dashboard label. Anything not listed here is dropped.
# Several CSV labels may map to the SAME dashboard label: each sweep spells some
# names differently ("Fidesic" vs "Fidesic AP", "Dime Scheduler" vs "Dime
# Software"), so rows are grouped by the DASHBOARD label, never by the CSV one.
# Dashboard labels match the competitor-card names in dashboard.js wherever a
# card exists, so the module lines up with the roster.
KEEP = collections.OrderedDict([
    ("Continia Software A/S",     "Continia Software"),
    ("Continia Software",         "Continia Software"),
    ("Truvio",                    "Truvio"),
    ("Equisys (Zetadocs)",        "Equisys"),
    ("Equisys",                   "Equisys"),
    ("Medius",                    "Medius"),
    ("Qvalia",                    "Qvalia"),
    ("AMC Banking",               "AMC Banking"),
    ("B2Brouter",                 "B2Brouter"),
    ("Dooap",                     "Dooap"),
    ("Yavrio",                    "Yavrio"),
    ("Rillion",                   "Rillion"),
    ("Fidesic",                   "Fidesic"),
    ("Fidesic AP",                "Fidesic"),
    ("Tipalti",                   "Tipalti"),
    ("Stampli",                   "Stampli"),
    # Added with the Sep 10 trawl - the 1:1 solution rivals.
    ("Pleo",                      "Pleo"),
    ("Payhawk",                   "Payhawk"),
    ("Rydoo",                     "Rydoo"),
    ("Expensify",                 "Expensify"),
    ("Zoho Expense",              "Zoho Expense"),
    ("DocuWare",                  "DocuWare"),
    # Added with the Sep 14 EXTRA trawl - competitor cards that had no LinkedIn
    # coverage at all and were therefore invisible in the Content-Gap Analysis.
    ("Yooz",                      "Yooz"),
    ("AvidXchange",               "AvidXchange"),
    ("Pagero",                    "Pagero"),
    ("Pagero (Thomson Reuters)",  "Pagero"),
    ("Compleat Software",         "Compleat"),
    ("Compleat",                  "Compleat"),
    ("Tungsten Automation",       "Tungsten Automation"),
    ("onPhase",                   "onPhase"),
    ("MineralTree",               "MineralTree"),
    ("Lasernet (Formpipe)",       "Lasernet"),
    ("Lasernet",                  "Lasernet"),
    ("Dime Scheduler",            "Dime Scheduler"),
    ("Dime Software",             "Dime Scheduler"),
    ("Acubiz",                    "Acubiz"),
    # Benchmarks: not competitors. They render with a Benchmark badge, stay out
    # of the engagement bar's scale and are excluded from content-gap / SOV.
    ("Stripe",                    "Stripe"),
    ("Incedo Inc",                "Incedo"),
    ("Incedo Inc.",               "Incedo"),
    ("Incedo",                    "Incedo"),
])
OURS  = {"Continia Software"}
BENCH = {"Stripe", "Incedo"}

# Render order = first appearance of each dashboard label in KEEP.
ORDER = list(collections.OrderedDict((v, None) for v in KEEP.values()))

# CSV labels that a capture may contain and that we deliberately throw away.
# Everything NOT in KEEP and NOT in here is a mistake - a sweep spelling a
# company a new way - and the run stops rather than dropping the rows quietly.
# That silence already cost us once: the Sep 17 sweep wrote "Continia Software"
# where the older trawls wrote "Continia Software A/S", so all 50 of our own
# posts vanished and the capture looked like it covered 17 companies, not 18.
DROP = {
    "SignUp Software",      # Truvio's former brand, see below
}

# Dashboard labels whose OLDER captures are known to hold the wrong page and
# must be thrown away rather than merged. A capture listed later in SOURCES
# replaces these outright instead of unioning with what came before.
#
#   MineralTree - the Sep 14 EXTRA trawl recorded 50 posts under this label
#   that are Global Payments Inc. corporate marketing (Genius World, consumer
#   payment research), not MineralTree AP content: zero permalink overlap with
#   the Sep 22 sweep of the same company_url, and the permalinks resolve to
#   "Global Payments Inc." MineralTree is a Global Payments brand, so the
#   trawler most likely followed the page through to the parent. The old rows
#   stay in archive.js; they must not keep feeding the live card.
RESET = {
    "MineralTree",
}

# Still no LinkedIn coverage, and none is possible:
#   Microsoft Expense Agent - a Microsoft product, no company page of its own.
#
# Deliberately NOT trawled:
#   SignUp Software (linkedin.com/company/signup-software) - the legacy page of
#     the company that is now Truvio. It cross-posts the same Truvio content, so
#     including it would double-count ExFlow/Truvio in every gap and SOV figure.
#   acubiz-consulting - an unrelated Malaysian pharma consultancy. The real
#     Acubiz (Visma, Birkerod) is linkedin.com/company/acubiz.

# "sweep2" records a repost as the original post's type plus the original
# author, so the only way to spot one is that "Posted by" is not the page
# itself. Four pages post under a name that differs from their sweep label -
# a legal name, a parent brand, or the showcase's own name - and treating
# those as reposts would mislabel 200 native posts. Anything NOT listed here
# is a genuine repost of someone else's content.
SELF_ALIAS = {
    "AvidXchange":              {"AvidXchange, Inc."},
    "Fidesic":                  {"Fidesic AP"},
    "MineralTree":              {"MineralTree, Inc."},
    "Pagero (Thomson Reuters)": {"Thomson Reuters Europe", "Thomson Reuters",
                                 "Thomson Reuters ONESOURCE"},
    "Lasernet (Formpipe)":      {"Lasernet"},
}

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

# sweep2 spells them differently again. "Entity/Link" is a shared LinkedIn
# entity - in practice the auto-generated #hiring job posts - which the earlier
# sweep recorded as Link/Article, so it keeps that pill.
SWEEP2_TYMAP = {"Image":"Image", "Multi-image":"Multi-image", "Video":"Video",
                "Text":"Text", "Poll":"Poll", "Event":"Event",
                "Article/Link":"Link/Article", "Entity/Link":"Link/Article",
                "Document/Carousel (PDF)":"Carousel", "Repost":"Repost"}

def strip_count(raw):
    """'Multi-image (9)' -> 'Multi-image'."""
    return re.sub(r"\s*\(\d+\)\s*$", "", raw.strip())

def continia_type(raw):
    t = strip_count(raw).lower()
    if t not in CONTINIA_TYMAP:
        sys.exit("unmapped Continia post type: %r" % raw)
    return CONTINIA_TYMAP[t]

def sweep2_type(raw):
    t = strip_count(raw)
    if t not in SWEEP2_TYMAP:
        sys.exit("unmapped sweep2 post type: %r" % raw)
    return SWEEP2_TYMAP[t]

ZW = dict.fromkeys(map(ord, "​‌‍⁠️︎"), None)

def norm(s):
    """Strip zero-width joiners and emoji, keep real letters (incl. aeoa), tidy space.

    NFKC first: LinkedIn posts are full of mathematical-bold text used as fake
    headline styling ("\U0001d7ee\U0001d7ec\U0001d7ee\U0001d7f0 \U0001d5e5\U0001d7ee" for "2026 R2"). Those are distinct code
    points, so themeOf in dashboard.js cannot match a keyword against them and
    the post silently goes untagged. NFKC folds them to plain ASCII while
    leaving real letters - including aeoa and accents - untouched.
    """
    s = unicodedata.normalize("NFKC", s)
    s = s.translate(ZW)
    out = []
    for ch in s:
        cat = unicodedata.category(ch)
        out.append(" " if cat in ("So", "Sk", "Cf", "Co", "Cn") else ch)
    s = "".join(out)
    s = re.sub(r"\.{4,}", "...", s)
    return re.sub(r"\s+", " ", s).strip()

# ---------------------------------------------------------------- readers ----
def read_trawl(fname):
    """The original competitor sweep: already in our shape."""
    return list(csv.DictReader(io.open(BASE + fname, encoding="utf-8-sig")))

def read_continia(fname):
    """Our own page export: semicolon-separated, Danish headers, no company."""
    out = []
    for r in csv.DictReader(io.open(BASE + fname, encoding="utf-8-sig"), delimiter=";"):
        out.append({
            "company":     CONTINIA_LABEL,
            "post_no":     r["#"],
            "date":        r["Dato"],
            "type":        continia_type(r["Type"]),
            "reactions":   r["Reactions"],
            "comments":    r["Comments"],
            "reposts":     r["Reposts"],
            "title":       r["Titel"],
            "post_url":    r["Link"].strip(),
            "company_url": CONTINIA_URL,
        })
    return out

def read_sweep2(fname):
    """Sep 16 competitor sweep: own headers, timestamped dates, reposts implied
    by 'Posted by'."""
    out = []
    for r in csv.DictReader(io.open(BASE + fname, encoding="utf-8-sig")):
        co = r["Company"].strip()
        by = r["Posted by"].strip()
        ty = sweep2_type(r["Post type"])
        if by and by != co and by not in SELF_ALIAS.get(co, set()):
            ty = "Repost"
        out.append({
            "company":     co,
            "post_no":     r["Post #"],
            "date":        r["Date (UTC)"].strip()[:10],   # drop the HH:MM
            "type":        ty,
            "reactions":   r["Reactions"],
            "comments":    r["Comments"],
            "reposts":     r["Reposts"],
            "title":       r["Title (first line of post)"],
            "post_url":    r["Post URL"].strip(),
            "company_url": r["Company page"].strip().split("?")[0],
        })
    return out

READERS = {"trawl": read_trawl, "continia": read_continia, "sweep2": read_sweep2}

# ------------------------------------------------------------------ merge ----
by     = {}   # dashboard label -> rows
cap_of = {}   # dashboard label -> capture date of the trawl it came from
seen_types = collections.Counter()

for fname, captured, dialect in SOURCES:
    if dialect not in READERS:
        sys.exit("unknown dialect %r for %s" % (dialect, fname))
    rows = READERS[dialect](fname)
    if not rows:
        sys.exit("empty CSV: %s" % fname)
    grouped = collections.defaultdict(list)
    stray = collections.Counter()
    for r in rows:
        label = KEEP.get(r["company"])
        if label is None:
            if r["company"] not in DROP:
                stray[r["company"]] += 1
            continue
        seen_types[r["type"]] += 1
        grouped[label].append(r)
    if stray:
        sys.exit("%s: company label(s) not in KEEP and not in DROP: %s\n"
                 "Add each to KEEP (mapped to its dashboard name) or to DROP."
                 % (fname, ", ".join("%r (%d rows)" % (k, v) for k, v in stray.most_common())))
    for label, rs in grouped.items():
        # UNION, not replace. A sweep does not always return every one of the
        # 50 most recent posts - the Sep 17 sweep missed about 31% of what the
        # Sep 10/14 captures held, evenly spread across post age - and letting
        # it replace the company wholesale would have cut posts/week roughly in
        # half (Rydoo 4.5 -> 2.0) and dropped a third of the posts out of the
        # Last-30-days column. So post sets are merged on the permalink, the
        # newer reading of a post wins, and the result is trimmed back to the
        # MAX_POSTS most recent so every company still shows the same window.
        # Consequence to keep in mind: a company's engagement figures can come
        # from two different read dates, so a post only the older capture saw
        # carries a slightly stale count. That is a much smaller error than
        # missing a third of the posts.
        if label in by and label not in RESET:
            merged = collections.OrderedDict((r["post_url"], r) for r in by[label])
            for r in rs:
                merged[r["post_url"]] = r
            rs = list(merged.values())
        rs.sort(key=lambda r: (r["date"], -int(r["post_no"])), reverse=True)
        by[label] = rs[:MAX_POSTS]
        cap_of[label] = captured

unknown = [t for t in seen_types if t not in TYMAP]
if unknown:
    sys.exit("unmapped post type(s): %r" % unknown)

missing = [c for c in ORDER if c not in by]
if missing:
    sys.exit("no rows for %r - is it in one of the SOURCES CSVs?" % missing)

# ------------------------------------------------------------------- emit ----
out = []
for name in ORDER:
    posts = by[name]               # already newest-first from the merge step
    flag = ' ours: true,' if name in OURS else (' bench: true,' if name in BENCH else '')
    # Only companies captured on a different day than CAPTURED carry "cap";
    # the rest inherit the module-level capture date.
    cap = '' if cap_of[name] == CAPTURED else ' cap: %s,' % json.dumps(cap_of[name])
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
   Some have a matching linkedin_competitor_summary_*.csv holding the same
   numbers pre-aggregated; those are kept only as a cross-check.

   MIXED CAPTURE DATES. The roster is assembled from several trawls, so a
   company captured before "captured" below carries its own "cap" date.
   dashboard.js measures that company's 30-day momentum window from its own
   capture date, which keeps the Last-30-days column comparable instead of
   handing the later trawl extra days of posts. A sweep that skips a company
   leaves it on its older data rather than dropping it.

   Per post: "t" is the title as the capture recorded it. The competitor sweeps
   cut it at ~75-130 characters on a word boundary (no ellipsis is added, so a
   sentence may simply stop); the Continia export carries the full first line.
   Emoji are stripped either way. "ty" is the content-type pill, "r"/"c"/"rp"
   are reactions/comments/reposts, "d" is the post date (YYYY-MM-DD) and "u"
   links the original post. Per company, "url" is the LinkedIn company page.
   Up to 50 most-recent posts each; fewer where the page had fewer.

   Type pills follow the vocabulary used since June 2026: LinkedIn's
   "Multi-image" renders as Image and "Carousel" as Document/carousel, so type
   mixes stay comparable with the archive snapshots. The Sep 16 sweep has no
   Repost type of its own - it records a repost as the original post's type
   plus the original author - so a row whose author is not the page itself is
   re-pilled as Repost. Four pages legitimately post under another name
   (AvidXchange Inc., MineralTree Inc., Thomson Reuters for Pagero, Lasernet
   for the Formpipe showcase); those are listed as SELF_ALIAS in the generator
   so their own posts are not mislabelled. Note that a repost carries the
   engagement of the post it resurfaces, which is how every earlier capture
   counted it too.

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
print("companies:", len(ORDER), "posts:", sum(len(by[c]) for c in ORDER))
print("captures:", dict(collections.Counter(cap_of.values())))
print("types:", dict(seen_types))
