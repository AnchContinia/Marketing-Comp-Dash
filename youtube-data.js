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
    { name: "Medius",             handle: "@mediusapautomation", totalViews: "5.07M total views",  socialBlade: "https://socialblade.com/youtube/handle/mediusapautomation", ours: false },
    { name: "Stampli",            handle: "@stampli",            totalViews: "873K total views",   socialBlade: "https://socialblade.com/youtube/handle/stampli",            ours: false },
    { name: "Yooz",               handle: "@why_yooz",           totalViews: "143K total views",   socialBlade: "https://socialblade.com/youtube/handle/why_yooz",           ours: false },
    { name: "Tipalti",            handle: "@tipaltivideos",      totalViews: "3.01M total views",  socialBlade: "https://socialblade.com/youtube/handle/tipaltivideos",      ours: false },
    { name: "Continia",           handle: "@continiasoftware",   totalViews: "516K total views",   socialBlade: "https://socialblade.com/youtube/handle/continiasoftware",   ours: true  },
    { name: "Equisys (Zetadocs)", handle: "@equisysplc",         totalViews: "43K total views",    socialBlade: "https://socialblade.com/youtube/handle/equisysplc",         ours: false },
    { name: "Dooap",              handle: "@dooap",              totalViews: "146K total views",   socialBlade: "https://socialblade.com/youtube/handle/dooap",              ours: false },

    /* Extended tracking (added Jun 2026): 10 more of the tracked competitor set.
       Social Blade URLs use the verified /channel/<ID> form. totalViews are real
       (read Jun 18); per-snapshot stats (subs/30d views/earnings) stay blank until
       the first capture run fills them, so they render as "—" until then. */
    { name: "AMC Banking",         handle: "AMCBanking",           totalViews: "25K total views",   socialBlade: "https://socialblade.com/youtube/channel/UCg3bQAqsQSKHtMK02oxWN5Q", ours: false },
    { name: "ExFlow (Truvio)",     handle: "SignUp Software",      totalViews: "143K total views",  socialBlade: "https://socialblade.com/youtube/channel/UCcRBDOXYUHYZ18mJzVwptYg", ours: false },
    { name: "AvidXchange",         handle: "@avidxchange",         totalViews: "10.8M total views",   socialBlade: "https://socialblade.com/youtube/channel/UCyUdf0l5aenkbP6Rjbm1boA", ours: false },
    { name: "Compleat",            handle: "@compleatp2p",         totalViews: "99K total views",   socialBlade: "https://socialblade.com/youtube/channel/UCBHrVWn7hW3bimt1RIHVBJg", ours: false },
    { name: "Tungsten Automation", handle: "@tungstenautomation",  totalViews: "896K total views",  socialBlade: "https://socialblade.com/youtube/channel/UCLXjytmoPLmzMT9-jRK9eMw", ours: false },
    { name: "onPhase",             handle: "@onphase",             totalViews: "904 total views",   socialBlade: "https://socialblade.com/youtube/channel/UCfZ5vZy9s3WC0mcAhGy-6Pg", ours: false },
    { name: "Dime Scheduler",      handle: "Dime Software",        totalViews: "25K total views",   socialBlade: "https://socialblade.com/youtube/channel/UCYD4LGox7SJLL7r8gmjulNA", ours: false },
    { name: "Qvalia",              handle: "Qvalia",               totalViews: "754 total views",   socialBlade: "https://socialblade.com/youtube/channel/UC1x8GlYfNAh4jjp3mquVAvw", ours: false },
    { name: "Acubiz",              handle: "@acubiztv",            totalViews: "4.7K total views",  socialBlade: "https://socialblade.com/youtube/channel/UC69VeuWKBJRLmON3deGjwdw", ours: false },
    { name: "B2Brouter",           handle: "@b2brouter",           totalViews: "1.19M total views",  socialBlade: "https://socialblade.com/youtube/channel/UChJ6FQX35UJ5CA54wojtaiQ", ours: false }
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
        score: 82,
        title: "End-to-end AP automation in Business Central",
        desc: "Follow one invoice from PDF capture and OCR through coding, the approval portal and payment — the full flow in a single demo. Matches the channel's top-performing how-tos."
      },
      {
        score: 74,
        title: "e-Invoicing & Peppol before the 2026 mandates",
        desc: "A step-by-step compliance walkthrough tied to the France and Belgium 2026 mandates, showing how to get a Business Central setup Peppol-ready. High, recurring EU search demand."
      },
      {
        score: 63,
        title: "Continia vs native BC AI agents (2026 Wave 1)",
        desc: "A comparison of what Continia automates versus BC's new GA AI agents, helping AP teams decide what to hand to which tool. Rides the AI theme but is more niche and dates faster."
      },
      {
        score: 78,
        title: "Document Capture deep-dive: OCR templates that actually stick",
        desc: "A hands-on build of capture templates for messy real-world invoices — multi-line, multi-currency, recurring vendors. Plays directly to the channel's proven product-demo strength."
      },
      {
        score: 70,
        title: "Building your approval workflow from scratch",
        desc: "A practical setup tour of the Continia approval portal — routing rules, delegation, mobile sign-off and the audit trail behind each step. Evergreen onboarding content with steady search demand."
      },
      {
        score: 67,
        title: "Why BC-native beats a bolt-on AP tool",
        desc: "A grounded explainer on what 'embedded in Business Central' really buys finance teams versus payment-owned rivals — no data sync, one ledger, one audit trail. Reinforces the neutral, focused positioning."
      }
    ],
    shortForm: [
      {
        score: 79,
        title: "One invoice, three approvals, zero chasing",
        desc: "A 30-second before/after cut showing an invoice stuck in email versus the same approval moving cleanly through Continia. Strong visual hook for finance teams."
      },
      {
        score: 71,
        title: "Peppol readiness in 20 seconds",
        desc: "Turn the 2026 e-invoicing deadline into a quick checklist: receive, validate, approve and archive inside Business Central. Timely, practical and easy to repurpose."
      },
      {
        score: 66,
        title: "AI is helpful, but your AP flow still matters",
        desc: "A fast myth-vs-reality clip: AI can suggest and extract, but clean approval rules and audit trails are what make AP automation production-ready."
      },
      {
        score: 75,
        title: "Approve an invoice from your phone in 10 seconds",
        desc: "A single-take mobile screen-grab of a manager approving on the go — no laptop, no VPN, no chasing. Punchy proof point that demos the value instantly."
      },
      {
        score: 69,
        title: "3 invoice fields OCR should be reading for you",
        desc: "A quick tip clip pointing at vendor, amount and due date being captured automatically instead of keyed by hand. Educational, repurposable and easy to series."
      },
      {
        score: 64,
        title: "The hidden cost of one lost invoice",
        desc: "A snappy stat-led hook on duplicate payments and late fees, landing on Continia's audit trail as the fix. Pattern-interrupt opener built for the LinkedIn feed."
      }
    ]
  }
};
