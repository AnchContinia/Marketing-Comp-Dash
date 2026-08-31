/* =========================================================================
   YouTube data for the Continia competitor dashboard.
   THIS IS THE ONLY FILE YOU EDIT FOR A MONTHLY UPDATE.

   How to update each month:
     1. Copy the most recent object in "snapshots".
     2. Change its "date" (YYYY-MM-DD) and the numbers.
     3. Leave the older snapshots in place — they build the history
        used for trend charts later. Newest snapshot is always rendered.

   Field guide (per channel, inside a snapshot's "stats"):
     subs              total subscribers, as shown on Social Blade (string, e.g. "1.78K")
     monthlyViews      monthly gained views as a NUMBER (e.g. 116692, or -726765).
                       Used to size the bar. Negative = red "down" bar.
     monthlyViewsLabel the pretty label shown to the right of the bar (e.g. "+117K")
     monthlySubs       monthly gained subscribers, as a string (e.g. "+10", "0")
     earnings          Social Blade estimated monthly earnings range (string)
     flag (optional)   set to "correction" when Social Blade reports a one-time
                       recount (huge +/- spike that isn't real performance). The
                       label still shows truthfully, but the bar is suppressed and
                       the value is EXCLUDED from the bar scale so it can't dominate.

   Channel registry ("channels") rarely changes. socialBlade is the exact
   URL to read from — these are the verified working handles.
   ========================================================================= */

window.YT_DATA = {
  source: "Social Blade estimates · last 30 days",

  channels: [
    { name: "Medius",             handle: "@mediusapautomation", totalViews: "5.08M total views",  socialBlade: "https://socialblade.com/youtube/handle/mediusapautomation", ours: false },
    { name: "Stampli",            handle: "@stampli",            totalViews: "988K total views",   socialBlade: "https://socialblade.com/youtube/handle/stampli",            ours: false },
    { name: "Yooz",               handle: "@why_yooz",           totalViews: "152K total views",   socialBlade: "https://socialblade.com/youtube/handle/why_yooz",           ours: false },
    { name: "Tipalti",            handle: "@tipaltivideos",      totalViews: "3.01M total views",  socialBlade: "https://socialblade.com/youtube/handle/tipaltivideos",      ours: false },
    { name: "Continia",           handle: "@continiasoftware",   totalViews: "529K total views",   socialBlade: "https://socialblade.com/youtube/handle/continiasoftware",   ours: true  },
    { name: "Equisys (Zetadocs)", handle: "@equisysplc",         totalViews: "42K total views",    socialBlade: "https://socialblade.com/youtube/handle/equisysplc",         ours: false },
    { name: "Dooap",              handle: "@dooap",              totalViews: "147K total views",   socialBlade: "https://socialblade.com/youtube/handle/dooap",              ours: false },

    /* Extended tracking (added Jun 2026): 10 more of the tracked competitor set.
       Social Blade URLs use the verified /channel/<ID> form. totalViews are real
       (read Jun 18); per-snapshot stats (subs/30d views/earnings) stay blank until
       the first capture run fills them, so they render as "—" until then. */
    { name: "AMC Banking",         handle: "AMCBanking",           totalViews: "26K total views",   socialBlade: "https://socialblade.com/youtube/channel/UCg3bQAqsQSKHtMK02oxWN5Q", ours: false },
    { name: "ExFlow (Truvio)",     handle: "SignUp Software",      totalViews: "145K total views",  socialBlade: "https://socialblade.com/youtube/channel/UCcRBDOXYUHYZ18mJzVwptYg", ours: false },
    { name: "AvidXchange",         handle: "@avidxchange",         totalViews: "10.8M total views",   socialBlade: "https://socialblade.com/youtube/channel/UCyUdf0l5aenkbP6Rjbm1boA", ours: false },
    { name: "Compleat",            handle: "@compleatp2p",         totalViews: "100K total views",   socialBlade: "https://socialblade.com/youtube/channel/UCBHrVWn7hW3bimt1RIHVBJg", ours: false },
    { name: "Tungsten Automation", handle: "@tungstenautomation",  totalViews: "888K total views",  socialBlade: "https://socialblade.com/youtube/channel/UCLXjytmoPLmzMT9-jRK9eMw", ours: false },
    { name: "onPhase",             handle: "@onphase",             totalViews: "972 total views",   socialBlade: "https://socialblade.com/youtube/channel/UCfZ5vZy9s3WC0mcAhGy-6Pg", ours: false },
    { name: "Dime Scheduler",      handle: "Dime Software",        totalViews: "25K total views",   socialBlade: "https://socialblade.com/youtube/channel/UCYD4LGox7SJLL7r8gmjulNA", ours: false },
    { name: "Qvalia",              handle: "Qvalia",               totalViews: "786 total views",   socialBlade: "https://socialblade.com/youtube/channel/UC1x8GlYfNAh4jjp3mquVAvw", ours: false },
    { name: "Acubiz",              handle: "@acubiztv",            totalViews: "4.7K total views",  socialBlade: "https://socialblade.com/youtube/channel/UC69VeuWKBJRLmON3deGjwdw", ours: false },
    { name: "B2Brouter",           handle: "@b2brouter",           totalViews: "1.21M total views",  socialBlade: "https://socialblade.com/youtube/channel/UChJ6FQX35UJ5CA54wojtaiQ", ours: false }
  ],

  snapshots: [
    {
      date: "2026-06-02",
      stats: {
        "Medius":             { subs: "326",  monthlyViews:  147000, monthlyViewsLabel: "+147K", monthlySubs: "+10", earnings: "$37-$589" },
        "Stampli":            { subs: "1.78K", monthlyViews:  57000,  monthlyViewsLabel: "+57K",  monthlySubs: "0",   earnings: "$14-$226" },
        "Yooz":               { subs: "199",  monthlyViews:  5100,   monthlyViewsLabel: "+5.1K", monthlySubs: "+6",  earnings: "$1-$21" },
        "Tipalti":            { subs: "3.24K", monthlyViews:  1600,   monthlyViewsLabel: "+1.6K", monthlySubs: "+10", earnings: "$0-$6" },
        "Continia":           { subs: "1.45K", monthlyViews: -7300,   monthlyViewsLabel: "-7.3K", monthlySubs: "+10", earnings: "$0" },
        "Equisys (Zetadocs)": { subs: "128",  monthlyViews:  227,    monthlyViewsLabel: "+227",  monthlySubs: "+1",  earnings: "$0-$1" },
        "Dooap":              { subs: "60",   monthlyViews:  0,      monthlyViewsLabel: "0",     monthlySubs: "0",   earnings: "$0" }
      }
    },
    {
      date: "2026-06-08",
      stats: {
        "Medius":             { subs: "327",  monthlyViews:  116692, monthlyViewsLabel: "+117K", monthlySubs: "+7",  earnings: "$29-$467" },
        "Stampli":            { subs: "1.78K", monthlyViews:  59046,  monthlyViewsLabel: "+59K",  monthlySubs: "0",   earnings: "$15-$236" },
        "Yooz":               { subs: "200",  monthlyViews:  5497,   monthlyViewsLabel: "+5.5K", monthlySubs: "+4",  earnings: "$1-$22" },
        "Tipalti":            { subs: "3.24K", monthlyViews:  1663,   monthlyViewsLabel: "+1.7K", monthlySubs: "+10", earnings: "$0-$7" },
        "Continia":           { subs: "1.46K", monthlyViews: -726765, monthlyViewsLabel: "-727K", monthlySubs: "+20", earnings: "$0", flag: "correction" },
        "Equisys (Zetadocs)": { subs: "128",  monthlyViews:  246,    monthlyViewsLabel: "+246",  monthlySubs: "+1",  earnings: "$0-$1" },
        "Dooap":              { subs: "60",   monthlyViews:  30,     monthlyViewsLabel: "+30",   monthlySubs: "0",   earnings: "$0" }
      }
    },
    {
      date: "2026-06-11",
      stats: {
        "Medius":             { subs: "328",  monthlyViews:  90000,  monthlyViewsLabel: "+90K",  monthlySubs: "+8",  earnings: "$23-$362" },
        "Stampli":            { subs: "1.78K", monthlyViews:  61000,  monthlyViewsLabel: "+61K",  monthlySubs: "0",   earnings: "$15-$244" },
        "Yooz":               { subs: "201",  monthlyViews:  9800,   monthlyViewsLabel: "+9.8K", monthlySubs: "+7",  earnings: "$2-$39" },
        "Tipalti":            { subs: "3.24K", monthlyViews:  1800,   monthlyViewsLabel: "+1.8K", monthlySubs: "0",   earnings: "$0-$7" },
        "Continia":           { subs: "1.46K", monthlyViews: -742000, monthlyViewsLabel: "-742K", monthlySubs: "+20", earnings: "$0", flag: "correction" },
        "Equisys (Zetadocs)": { subs: "128",  monthlyViews:  276,    monthlyViewsLabel: "+276",  monthlySubs: "0",   earnings: "$0-$1" },
        "Dooap":              { subs: "60",   monthlyViews:  38,     monthlyViewsLabel: "+38",   monthlySubs: "0",   earnings: "$0" }
      }
    },
    {
      date: "2026-06-18",
      stats: {
        "Medius":             { subs: "336",  monthlyViews:  53173,  monthlyViewsLabel: "+53K",  monthlySubs: "+14", earnings: "$13-$213" },
        "Stampli":            { subs: "1.78K", monthlyViews:  62346,  monthlyViewsLabel: "+62K",  monthlySubs: "0",   earnings: "$16-$249" },
        "Yooz":               { subs: "202",  monthlyViews:  9313,   monthlyViewsLabel: "+9.3K", monthlySubs: "+5",  earnings: "$2-$37" },
        "Tipalti":            { subs: "3.25K", monthlyViews:  1804,   monthlyViewsLabel: "+1.8K", monthlySubs: "0",   earnings: "$0-$7" },
        "Continia":           { subs: "1.46K", monthlyViews:  8427,   monthlyViewsLabel: "+8.4K", monthlySubs: "+20", earnings: "$2-$34" },
        "Equisys (Zetadocs)": { subs: "128",  monthlyViews:  258,    monthlyViewsLabel: "+258",  monthlySubs: "0",   earnings: "$0-$1" },
        "Dooap":              { subs: "60",   monthlyViews:  82,     monthlyViewsLabel: "+82",   monthlySubs: "0",   earnings: "$0" }
      }
    },
    {
      date: "2026-06-29",
      stats: {
        "Medius":             { subs: "340",  monthlyViews:  13185,  monthlyViewsLabel: "+13K",  monthlySubs: "+15", earnings: "$3-$53" },
        "Stampli":            { subs: "1.78K", monthlyViews:  62817,  monthlyViewsLabel: "+63K",  monthlySubs: "0",   earnings: "$16-$251" },
        "Yooz":               { subs: "202",  monthlyViews:  8913,   monthlyViewsLabel: "+8.9K", monthlySubs: "+4",  earnings: "$2-$36" },
        "Tipalti":            { subs: "3.25K", monthlyViews:  2293,   monthlyViewsLabel: "+2.3K", monthlySubs: "+10", earnings: "$1-$9" },
        "Continia":           { subs: "1.47K", monthlyViews:  7910,   monthlyViewsLabel: "+7.9K", monthlySubs: "+20", earnings: "$2-$32" },
        "Equisys (Zetadocs)": { subs: "129",  monthlyViews:  227,    monthlyViewsLabel: "+227",  monthlySubs: "+1",  earnings: "$0-$1" },
        "Dooap":              { subs: "60",   monthlyViews:  105,    monthlyViewsLabel: "+105",  monthlySubs: "0",   earnings: "$0" },
        "AMC Banking":        { subs: "131",  monthlyViews:  74,     monthlyViewsLabel: "+74",   monthlySubs: "0",   earnings: "$0" },
        "ExFlow (Truvio)":    { subs: "1.52K", monthlyViews:  246,    monthlyViewsLabel: "+246",  monthlySubs: "0",   earnings: "$0-$1" },
        "AvidXchange":        { subs: "3.49K", monthlyViews:  147,    monthlyViewsLabel: "+147",  monthlySubs: "-10", earnings: "$0-$1" },
        "Compleat":           { subs: "175",  monthlyViews:  320,    monthlyViewsLabel: "+320",  monthlySubs: "+2",  earnings: "$0-$1" },
        "Tungsten Automation":{ subs: "3.58K", monthlyViews:  6899,   monthlyViewsLabel: "+6.9K", monthlySubs: "0",   earnings: "$2-$28" },
        "onPhase":            { subs: "10",   monthlyViews:  9,      monthlyViewsLabel: "+9",    monthlySubs: "0",   earnings: "$0" },
        "Dime Scheduler":     { subs: "83",   monthlyViews:  56,     monthlyViewsLabel: "+56",   monthlySubs: "0",   earnings: "$0" },
        "Qvalia":             { subs: "18",   monthlyViews:  4,      monthlyViewsLabel: "+4",    monthlySubs: "0",   earnings: "$0" },
        "Acubiz":             { subs: "66",   monthlyViews:  55,     monthlyViewsLabel: "+55",   monthlySubs: "-1",  earnings: "$0" },
        "B2Brouter":          { subs: "1.47K", monthlyViews:  143080, monthlyViewsLabel: "+143K", monthlySubs: "+50", earnings: "$36-$572" }
      }
    },
    {
      date: "2026-07-10",
      stats: {
        "Medius":             { subs: "340",  monthlyViews:  2000,   monthlyViewsLabel: "+2K",   monthlySubs: "+13", earnings: "$0-$8" },
        "Stampli":            { subs: "1.78K", monthlyViews:  61000,  monthlyViewsLabel: "+61K",  monthlySubs: "0",   earnings: "$15-$246" },
        "Yooz":               { subs: "202",  monthlyViews:  4200,   monthlyViewsLabel: "+4.2K", monthlySubs: "+1",  earnings: "$1-$17" },
        "Tipalti":            { subs: "3.26K", monthlyViews:  2900,   monthlyViewsLabel: "+2.9K", monthlySubs: "+20", earnings: "$1-$12" },
        "Continia":           { subs: "1.48K", monthlyViews:  7700,   monthlyViewsLabel: "+7.7K", monthlySubs: "+20", earnings: "$2-$31" },
        "Equisys (Zetadocs)": { subs: "130",  monthlyViews:  228,    monthlyViewsLabel: "+228",  monthlySubs: "+2",  earnings: "$0-$1" },
        "Dooap":              { subs: "60",   monthlyViews:  124,    monthlyViewsLabel: "+124",  monthlySubs: "0",   earnings: "$0" },
        "AMC Banking":        { subs: "131",  monthlyViews:  141,    monthlyViewsLabel: "+141",  monthlySubs: "0",   earnings: "$0-$1" },
        "ExFlow (Truvio)":    { subs: "1.52K", monthlyViews:  490,    monthlyViewsLabel: "+490",  monthlySubs: "0",   earnings: "$0-$2" },
        "AvidXchange":        { subs: "3.49K", monthlyViews:  145,    monthlyViewsLabel: "+145",  monthlySubs: "-10", earnings: "$0-$1" },
        "Compleat":           { subs: "176",  monthlyViews:  216,    monthlyViewsLabel: "+216",  monthlySubs: "+3",  earnings: "$0-$1" },
        "Tungsten Automation":{ subs: "3.58K", monthlyViews:  6700,   monthlyViewsLabel: "+6.7K", monthlySubs: "+10", earnings: "$2-$27" },
        "onPhase":            { subs: "10",   monthlyViews:  12,     monthlyViewsLabel: "+12",   monthlySubs: "0",   earnings: "$0" },
        "Dime Scheduler":     { subs: "83",   monthlyViews:  123,    monthlyViewsLabel: "+123",  monthlySubs: "0",   earnings: "$0" },
        "Qvalia":             { subs: "18",   monthlyViews:  7,      monthlyViewsLabel: "+7",    monthlySubs: "0",   earnings: "$0" },
        "Acubiz":             { subs: "66",   monthlyViews:  40,     monthlyViewsLabel: "+40",   monthlySubs: "-1",  earnings: "$0" },
        "B2Brouter":          { subs: "1.47K", monthlyViews:  132000, monthlyViewsLabel: "+132K", monthlySubs: "+40", earnings: "$33-$527" }
      }
    },
    {
      date: "2026-08-31",
      stats: {
        "Medius":             { subs: "349",  monthlyViews:  7700,   monthlyViewsLabel: "+7.7K", monthlySubs: "+6",  earnings: "$2-$31" },
        "Stampli":            { subs: "1.78K", monthlyViews:  51000,  monthlyViewsLabel: "+51K",  monthlySubs: "0",   earnings: "$13-$203" },
        "Yooz":               { subs: "206",  monthlyViews:  764,    monthlyViewsLabel: "+764",  monthlySubs: "+2",  earnings: "$0-$3" },
        "Tipalti":            { subs: "3.28K", monthlyViews:  2200,   monthlyViewsLabel: "+2.2K", monthlySubs: "+10", earnings: "$1-$9" },
        "Continia":           { subs: "1.5K", monthlyViews:  6700,   monthlyViewsLabel: "+6.7K", monthlySubs: "+10", earnings: "$2-$27" },
        "Equisys (Zetadocs)": { subs: "131",  monthlyViews: -584,    monthlyViewsLabel: "-584",  monthlySubs: "0",   earnings: "$0" },
        "Dooap":              { subs: "62",   monthlyViews:  122,    monthlyViewsLabel: "+122",  monthlySubs: "0",   earnings: "$0" },
        "AMC Banking":        { subs: "133",  monthlyViews:  238,    monthlyViewsLabel: "+238",  monthlySubs: "+2",  earnings: "$0-$1" },
        "ExFlow (Truvio)":    { subs: "1.52K", monthlyViews:  699,    monthlyViewsLabel: "+699",  monthlySubs: "0",   earnings: "$0-$3" },
        "AvidXchange":        { subs: "3.48K", monthlyViews:  98,     monthlyViewsLabel: "+98",   monthlySubs: "-10", earnings: "$0" },
        "Compleat":           { subs: "178",  monthlyViews:  197,    monthlyViewsLabel: "+197",  monthlySubs: "+1",  earnings: "$0-$1" },
        "Tungsten Automation":{ subs: "3.6K", monthlyViews: -14000,  monthlyViewsLabel: "-14K",  monthlySubs: "0",   earnings: "$0", flag: "correction" },
        "onPhase":            { subs: "11",   monthlyViews:  43,     monthlyViewsLabel: "+43",   monthlySubs: "+1",  earnings: "$0" },
        "Dime Scheduler":     { subs: "85",   monthlyViews: -153,    monthlyViewsLabel: "-153",  monthlySubs: "+2",  earnings: "$0" },
        "Qvalia":             { subs: "19",   monthlyViews:  13,     monthlyViewsLabel: "+13",   monthlySubs: "0",   earnings: "$0" },
        "Acubiz":             { subs: "66",   monthlyViews:  43,     monthlyViewsLabel: "+43",   monthlySubs: "0",   earnings: "$0" },
        "B2Brouter":          { subs: "1.49K", monthlyViews:  11000,  monthlyViewsLabel: "+11K",  monthlySubs: "+10", earnings: "$3-$42" }
      }
    }
  ],

  /* =========================================================================
     In-depth Continia upload info — from vidIQ, last 30 days.
     Source: vidIQ channel overview (Long-form vs Shorts + recent uploads).
     Update each month: copy the newest snapshot, change "date", "windowLabel"
     and the numbers. uploads/views are simple counts — percentages are computed
     in the page. "recent" = uploads from the last ~30 days (vidIQ "Latest").
     outlier: string as shown (e.g. "1.61x") or null when vidIQ shows "—".
     ========================================================================= */
  continiaUploads: {
    source: "vidIQ",
    channelUrl: "https://vidiq.com/youtube-stats/channel/UCVADP02U9sc7Xy2zeSx4xoA/?tab=overview",
    snapshots: [
      {
        date: "2026-06-08",
        windowLabel: "Since May 11, 2026",
        uploads: { longForm: 2,  shorts: 6   },
        views:   { longForm: 55, shorts: 610 },
        recent: [
          { title: "Expense Management — Smarter expense management — What's new in 2026 R1 (NA)", views: 32, outlier: null,    age: "a month ago" },
          { title: "Document Output — Automated Document sending — What's new in 2026 R1 (NA)",    views: 31, outlier: null,    age: "a month ago" },
          { title: "Faster & smarter — What's new in 2026 R1",                                     views: 64, outlier: "1.32x", age: "a month ago" },
          { title: "Expense Management 2026 R1 — Optimiza tu gestión de gastos",                   views: 21, outlier: null,    age: "a month ago" },
          { title: "Continia Banking 2026 - Zahlungen & Abstimmung NEXT LEVEL!",                   views: 69, outlier: "1.61x", age: "a month ago" }
        ]
      },
      {
        date: "2026-06-09",
        defaultPeriod: "28D",
        /* Long-form vs Shorts per period, from vidIQ longShortStats (uploads + views). */
        periods: {
          "7D":  { longForm: { uploads: 0,  views: 0     }, shorts: { uploads: 0,  views: 0    } },
          "28D": { longForm: { uploads: 0,  views: 0     }, shorts: { uploads: 4,  views: 415  } },
          "3M":  { longForm: { uploads: 17, views: 923   }, shorts: { uploads: 16, views: 1872 } },
          "1Y":  { longForm: { uploads: 40, views: 10439 }, shorts: { uploads: 16, views: 1872 } },
          "YTD": { longForm: { uploads: 22, views: 2919  }, shorts: { uploads: 16, views: 1872 } }
        },
        recent: [
          { title: "Expense Management — Smarter expense management — What's new in 2026 R1 (NA)", views: 32, outlier: null,    age: "a month ago" },
          { title: "Document Output — Automated Document sending — What's new in 2026 R1 (NA)",    views: 31, outlier: null,    age: "a month ago" },
          { title: "Faster & smarter — What's new in 2026 R1",                                     views: 64, outlier: "1.32x", age: "a month ago" },
          { title: "Expense Management 2026 R1 — Optimiza tu gestión de gastos",                   views: 22, outlier: null,    age: "a month ago" },
          { title: "Continia Banking 2026 - Zahlungen & Abstimmung NEXT LEVEL!",                   views: 73, outlier: "1.61x", age: "a month ago" }
        ],
        top: [
          { title: "Mobile App – Expense Management",                                              views: 5881, vph: "0.19", outlier: "8.41x"  },
          { title: "Document Output – Solution demo intro (2023)",                                 views: 5368, vph: "0.23", outlier: null      },
          { title: "Create expenses – Expense Management",                                         views: 5263, vph: "0.24", outlier: "5.83x"  },
          { title: "Why Expense Management?",                                                      views: 5290, vph: "0.24", outlier: "10.02x" },
          { title: "Continia Document Capture 2025 | Full Demo & Invoice Automation Overview",     views: 3960, vph: "0.38", outlier: "10.99x" }
        ]
      },
      {
        date: "2026-06-11",
        defaultPeriod: "28D",
        /* Long-form vs Shorts per period, from vidIQ longShortStats (uploads + views). */
        periods: {
          "7D":  { longForm: { uploads: 0,  views: 0     }, shorts: { uploads: 0,  views: 0    } },
          "28D": { longForm: { uploads: 0,  views: 0     }, shorts: { uploads: 4,  views: 415  } },
          "3M":  { longForm: { uploads: 17, views: 923   }, shorts: { uploads: 16, views: 1872 } },
          "1Y":  { longForm: { uploads: 40, views: 10440 }, shorts: { uploads: 16, views: 1872 } },
          "YTD": { longForm: { uploads: 22, views: 2920  }, shorts: { uploads: 16, views: 1872 } }
        },
        recent: [
          { title: "Expense Management — Smarter expense management — What's new in 2026 R1 (NA)", views: 33, outlier: null,    age: "a month ago" },
          { title: "Document Output — Automated Document sending — What's new in 2026 R1 (NA)",    views: 32, outlier: null,    age: "a month ago" },
          { title: "Faster & smarter — What's new in 2026 R1",                                     views: 67, outlier: "1.32x", age: "a month ago" },
          { title: "Expense Management 2026 R1 — Optimiza tu gestión de gastos",                   views: 22, outlier: null,    age: "a month ago" },
          { title: "Continia Banking 2026 - Zahlungen & Abstimmung NEXT LEVEL!",                   views: 80, outlier: "1.61x", age: "a month ago" }
        ],
        top: [
          { title: "Mobile App – Expense Management",                                              views: 5900, vph: "0.3", outlier: "8.98x"  },
          { title: "Document Output – Solution demo intro (2023)",                                 views: 5400, vph: "0.2", outlier: null      },
          { title: "Create expenses – Expense Management",                                         views: 5280, vph: "0.3", outlier: "5.87x"  },
          { title: "Why Expense Management?",                                                      views: 5310, vph: "0.2", outlier: "8.08x"  },
          { title: "Continia Document Capture 2025 | Full Demo & Invoice Automation Overview",     views: 3990, vph: "0.4", outlier: "16.1x" }
        ]
      },
      {
        date: "2026-06-18",
        defaultPeriod: "28D",
        /* Long-form vs Shorts per period, from vidIQ longShortStats (uploads + views). */
        periods: {
          "7D":  { longForm: { uploads: 0,  views: 0     }, shorts: { uploads: 0,  views: 0    } },
          "28D": { longForm: { uploads: 0,  views: 0     }, shorts: { uploads: 2,  views: 160  } },
          "3M":  { longForm: { uploads: 17, views: 1002  }, shorts: { uploads: 16, views: 1907 } },
          "1Y":  { longForm: { uploads: 40, views: 10773 }, shorts: { uploads: 16, views: 1907 } },
          "YTD": { longForm: { uploads: 22, views: 3102  }, shorts: { uploads: 16, views: 1907 } }
        },
        recent: [
          { title: "Continia Banking 2026 - Zahlungen & Abstimmung NEXT LEVEL!",                   views: 86, outlier: "1.61x", age: "2 months ago" },
          { title: "Faster & smarter — What's new in 2026 R1",                                     views: 68, outlier: "1.32x", age: "2 months ago" },
          { title: "Expense Management — Smarter expense management — What's new in 2026 R1 (NA)", views: 38, outlier: null,    age: "2 months ago" },
          { title: "Document Output — Automated Document sending — What's new in 2026 R1 (NA)",    views: 35, outlier: null,    age: "2 months ago" },
          { title: "Expense Management 2026 R1 — Optimiza tu gestión de gastos",                   views: 22, outlier: null,    age: "2 months ago" }
        ],
        top: [
          { title: "Mobile App – Expense Management",                                              views: 5945, vph: "0.27", outlier: "7.99x"  },
          { title: "Document Output – Solution demo intro (2023)",                                 views: 5448, vph: "0.24", outlier: null      },
          { title: "Why Expense Management?",                                                      views: 5358, vph: "0.25", outlier: "10.48x" },
          { title: "Create expenses – Expense Management",                                         views: 5320, vph: "0.26", outlier: "5.87x"  },
          { title: "Continia Document Capture 2025 | Full Demo & Invoice Automation Overview",     views: 4040, vph: "0.29", outlier: "11.26x" }
        ]
      },
      {
        date: "2026-07-10",
        defaultPeriod: "28D",
        /* Long-form vs Shorts per period, from vidIQ longShortStats (uploads + views). */
        periods: {
          "7D":  { longForm: { uploads: 0,  views: 0     }, shorts: { uploads: 0,  views: 0    } },
          "28D": { longForm: { uploads: 0,  views: 0     }, shorts: { uploads: 0,  views: 0    } },
          "3M":  { longForm: { uploads: 17, views: 1164  }, shorts: { uploads: 16, views: 1963 } },
          "1Y":  { longForm: { uploads: 38, views: 11052 }, shorts: { uploads: 16, views: 1963 } },
          "YTD": { longForm: { uploads: 22, views: 3516  }, shorts: { uploads: 16, views: 1963 } }
        },
        recent: [
          { title: "Continia Banking 2026 - Zahlungen & Abstimmung NEXT LEVEL!",                   views: 102, outlier: null, age: "3 months ago" },
          { title: "Faster & smarter — What's new in 2026 R1",                                     views: 71,  outlier: null, age: "3 months ago" },
          { title: "Expense Management — Smarter expense management — What's new in 2026 R1 (NA)", views: 46,  outlier: null, age: "3 months ago" },
          { title: "Document Output — Automated Document sending — What's new in 2026 R1 (NA)",    views: 37,  outlier: null, age: "3 months ago" },
          { title: "Expense Management 2026 R1 — Optimiza tu gestión de gastos",                   views: 24,  outlier: null, age: "3 months ago" }
        ],
        top: [
          { title: "Mobile App – Expense Management",                                              views: 6071, vph: "0.27", outlier: null },
          { title: "Document Output – Solution demo intro (2023)",                                 views: 5604, vph: "0.24", outlier: null },
          { title: "Why Expense Management?",                                                      views: 5488, vph: "0.25", outlier: null },
          { title: "Create expenses – Expense Management",                                         views: 5441, vph: "0.24", outlier: null },
          { title: "Continia Document Capture 2025 | Full Demo & Invoice Automation Overview",     views: 4190, vph: "0.38", outlier: null }
        ]
      },
      {
        date: "2026-08-31",
        defaultPeriod: "28D",
        /* Long-form vs Shorts per period, from vidIQ longShortStats (uploads + views). */
        periods: {
          "7D":  { longForm: { uploads: 0,  views: 0     }, shorts: { uploads: 0,  views: 0    } },
          "28D": { longForm: { uploads: 0,  views: 0     }, shorts: { uploads: 0,  views: 0    } },
          "3M":  { longForm: { uploads: 0,  views: 0     }, shorts: { uploads: 0,  views: 0    } },
          "1Y":  { longForm: { uploads: 38, views: 12792 }, shorts: { uploads: 16, views: 2006 } },
          "YTD": { longForm: { uploads: 22, views: 4407  }, shorts: { uploads: 16, views: 2006 } }
        },
        recent: [
          { title: "How finance teams are saving thousands of hours #finance #automation #shorts",   views: 68,  outlier: null, age: "3 months ago" },
          { title: "How to Manage Credit Card Transactions in Expense Management",                   views: 113, outlier: null, age: "3 months ago" },
          { title: "Stop Manual Receipts | Automate Invoice & Expense Processing",                   views: 138, outlier: null, age: "3 months ago" },
          { title: "When paperwork becomes this easy, it almost feels illegal",                      views: 164, outlier: null, age: "3 months ago" },
          { title: "Expense Management — Smarter expense management — What's new in 2026 R1 (NA)", views: 67,  outlier: null, age: "4 months ago" }
        ],
        top: [
          { title: "Mobile App – Expense Management",                                          views: 6350, vph: "0.27", outlier: "11.98x" },
          { title: "Document Output – Solution demo intro (2023)",                             views: 5867, vph: "0.24", outlier: null      },
          { title: "Why Expense Management?",                                                        views: 5785, vph: "0.25", outlier: "10.91x" },
          { title: "Create expenses – Expense Management",                                      views: 5672, vph: "0.24", outlier: "5.95x"  },
          { title: "Continia Document Capture 2025 | Full Demo & Invoice Automation Overview",       views: 4542, vph: "0.37", outlier: "17.38x" }
        ]
      }
    ]
  },

  /* =========================================================================
     Video ideas — content ideas with a predicted-performance score (0–100).
     The score estimates how well the idea would perform on the Continia
     channel, judged from the channel's proven top videos (product demos &
     how-tos) and the dashboard's strategic signals (AI as the dominant theme,
     the 2026 e-invoicing mandates). The page draws a 0–100% tick bar from it.
     Long-form and short-form ideas render as matching card stacks.
     ========================================================================= */
  videoIdeas: {
    longForm: [
      {
        score: 84,
        title: "Continia Expense Management, end to end: capture, approve, reimburse",
        desc: "Build on the channel's strongest theme - 'Mobile App - Expense Management' (6,071 views), 'Why Expense Management?' (5,488) and 'Create expenses' (5,441) are all top-five all-time. A definitive expense walkthrough plays straight to proven demand."
      },
      {
        score: 82,
        title: "End-to-end AP automation in Business Central",
        desc: "Follow one invoice from PDF capture and OCR through coding, the approval portal and payment - the full flow in a single demo. Matches the channel's top-performing how-tos."
      },
      {
        score: 79,
        title: "Document Capture deep-dive: OCR templates that actually stick",
        desc: "A hands-on build of capture templates for messy real-world invoices - multi-line, multi-currency, recurring vendors. Plays to the channel's proven product-demo strength (the Document Capture full demo is a top-five all-time video)."
      },
      {
        score: 77,
        title: "Document Output done right: automated, compliant distribution from BC",
        desc: "Refresh the channel's #2 all-time video ('Document Output - Solution demo intro', 5,604 views) into a 2026 walkthrough - per-customer layouts, protected PDFs, eIDAS sealing and Peppol delivery, all inside Business Central."
      },
      {
        score: 76,
        title: "e-Invoicing & Peppol before the 2026 mandates",
        desc: "A step-by-step compliance walkthrough tied to the France (Sep 2026), UAE (Jul 2026) and Belgium (Jan 2026) mandates, showing how to get a Business Central setup Peppol-ready. High, recurring EU search demand."
      },
      {
        score: 71,
        title: "AI agents vs your audit trail: what to automate in AP (and what not to)",
        desc: "With Stampli, Dooap and Tipalti all launching 'ask-anything' finance agents, a grounded explainer on what to hand to AI versus what stays in a governed BC approval flow. Rides the dominant AI theme on an evergreen governance spine."
      }
    ],
    shortForm: [
      {
        score: 80,
        title: "Approve an invoice from your phone in 10 seconds",
        desc: "A single-take mobile screen-grab of a manager approving on the go - no laptop, no VPN, no chasing. Mirrors the channel's #1 all-time video (the Expense Management mobile app) in a punchy cut."
      },
      {
        score: 78,
        title: "One invoice, three approvals, zero chasing",
        desc: "A 30-second before/after showing an invoice stuck in email versus the same approval moving cleanly through Continia. Borrows the punchy comparison format outperforming for BC-native rivals like Yavrio."
      },
      {
        score: 74,
        title: "'Ask anything' is cool. Who approved it?",
        desc: "A fast myth-vs-reality clip riffing on the trending 'ask-anything finance agent' launches - AI can answer, but an audit trail says who approved and why. Rides a hot hook and lands on Continia's governance edge."
      },
      {
        score: 72,
        title: "Peppol readiness in 20 seconds",
        desc: "Turn the 2026 e-invoicing deadlines into a quick checklist: receive, validate, approve and archive inside Business Central. Timely, practical and easy to repurpose."
      },
      {
        score: 69,
        title: "3 invoice fields OCR should be reading for you",
        desc: "A quick tip clip pointing at vendor, amount and due date being captured automatically instead of keyed by hand. Educational, repurposable and easy to series."
      },
      {
        score: 66,
        title: "The hidden cost of one lost invoice",
        desc: "A snappy stat-led hook on duplicate payments and late fees, landing on Continia's audit trail as the fix. Pattern-interrupt opener built for the LinkedIn feed."
      }
    ]
  }
};
