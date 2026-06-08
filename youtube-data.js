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
  ]
};
