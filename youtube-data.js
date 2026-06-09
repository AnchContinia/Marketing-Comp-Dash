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
    { name: "Stampli",            handle: "@stampli",            totalViews: "831K total views",   socialBlade: "https://socialblade.com/youtube/handle/stampli",            ours: false },
    { name: "Yooz",               handle: "@why_yooz",           totalViews: "135K total views",   socialBlade: "https://socialblade.com/youtube/handle/why_yooz",           ours: false },
    { name: "Tipalti",            handle: "@tipaltivideos",      totalViews: "3.01M total views",  socialBlade: "https://socialblade.com/youtube/handle/tipaltivideos",      ours: false },
    { name: "Continia",           handle: "@continiasoftware",   totalViews: "510K total views",   socialBlade: "https://socialblade.com/youtube/handle/continiasoftware",   ours: true  },
    { name: "Equisys (Zetadocs)", handle: "@equisysplc",         totalViews: "42K total views",    socialBlade: "https://socialblade.com/youtube/handle/equisysplc",         ours: false },
    { name: "Dooap",              handle: "@dooap",              totalViews: "146K total views",   socialBlade: "https://socialblade.com/youtube/handle/dooap",              ours: false }
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
      }
    ]
  }
};
