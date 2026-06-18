/* =========================================================================
   LinkedIn post-engagement data for the Continia competitor dashboard.
   Public engagement on each company's recent posts (reactions / comments /
   reposts). Totals + averages are computed in dashboard.js from these raw
   posts, so the comparison table can never drift from the source numbers.

   Source: Assets/linkedin_post_engagement_report_Jun 18.txt
   This capture had NO post titles, so each post's label is "<age> ago" with
   the post type shown as a pill. Only posts whose public engagement was
   actually readable are included, so post counts vary per company (the
   scraper can't always read lazy-loaded counts). Companies whose engagement
   was entirely unreadable this round are omitted until the next capture.

   How to update: re-capture each company's recent posts, replace the "posts"
   arrays, and bump "captured". Per post:
     t  = label (here "<age> ago")   ty = Image | Carousel | Video | Document | Text | Article/Link | Event
     r  = reactions                  c  = comments            rp = reposts
   ========================================================================= */

window.LI_DATA = {
  source: "LinkedIn public engagement",
  captured: "2026-06-18",
  windowLabel: "recent posts · public engagement",
  companies: [
    { name: "Continia Software", ours: true, posts: [
      { t: "1w ago",  ty: "Carousel", r: 60,  c: 1, rp: 0 },
      { t: "1w ago",  ty: "Carousel", r: 187, c: 2, rp: 1 },
      { t: "2w ago",  ty: "Carousel", r: 67,  c: 1, rp: 0 },
      { t: "3w ago",  ty: "Carousel", r: 68,  c: 1, rp: 2 },
      { t: "4w ago",  ty: "Document", r: 39,  c: 0, rp: 0 },
      { t: "1mo ago", ty: "Video",    r: 34,  c: 0, rp: 4 }
    ]},
    { name: "Truvio", posts: [
      { t: "9m ago", ty: "Image", r: 1,  c: 0, rp: 1 },
      { t: "2h ago", ty: "Image", r: 16, c: 2, rp: 2 },
      { t: "2d ago", ty: "Image", r: 9,  c: 0, rp: 3 },
      { t: "6d ago", ty: "Image", r: 16, c: 0, rp: 4 },
      { t: "1w ago", ty: "Image", r: 16, c: 0, rp: 1 },
      { t: "1w ago", ty: "Image", r: 23, c: 0, rp: 4 },
      { t: "1w ago", ty: "Image", r: 34, c: 0, rp: 5 }
    ]},
    { name: "Equisys", posts: [
      { t: "1w ago",  ty: "Image",    r: 0,  c: 0, rp: 1 },
      { t: "1w ago",  ty: "Image",    r: 12, c: 0, rp: 2 },
      { t: "3mo ago", ty: "Carousel", r: 1,  c: 0, rp: 0 },
      { t: "6mo ago", ty: "Image",    r: 3,  c: 0, rp: 1 },
      { t: "3mo ago", ty: "Document", r: 2,  c: 0, rp: 2 }
    ]},
    { name: "Medius", posts: [
      { t: "1w ago", ty: "Image",    r: 2,   c: 1, rp: 1 },
      { t: "1w ago", ty: "Carousel", r: 69,  c: 7, rp: 0 },
      { t: "2w ago", ty: "Document", r: 105, c: 0, rp: 2 }
    ]},
    { name: "Qvalia", posts: [
      { t: "1w ago",  ty: "Image",    r: 3,  c: 0, rp: 0 },
      { t: "2w ago",  ty: "Image",    r: 20, c: 0, rp: 2 },
      { t: "3w ago",  ty: "Image",    r: 29, c: 1, rp: 5 },
      { t: "1mo ago", ty: "Image",    r: 4,  c: 0, rp: 0 },
      { t: "8mo ago", ty: "Carousel", r: 29, c: 3, rp: 3 },
      { t: "1mo ago", ty: "Image",    r: 6,  c: 0, rp: 0 },
      { t: "9mo ago", ty: "Carousel", r: 7,  c: 0, rp: 0 },
      { t: "10mo ago", ty: "Document", r: 7, c: 0, rp: 0 }
    ]},
    { name: "AMC Banking", posts: [
      { t: "2w ago",  ty: "Carousel",     r: 12, c: 0, rp: 3 },
      { t: "6mo ago", ty: "Video",        r: 11, c: 0, rp: 0 },
      { t: "1mo ago", ty: "Article/Link", r: 6,  c: 0, rp: 2 }
    ]},
    { name: "B2Brouter", posts: [
      { t: "1h ago", ty: "Carousel", r: 7, c: 0, rp: 1 },
      { t: "2d ago", ty: "Document", r: 8, c: 2, rp: 1 }
    ]},
    { name: "Yavrio", posts: [
      { t: "21h ago", ty: "Image",    r: 12, c: 1, rp: 0 },
      { t: "1w ago",  ty: "Image",    r: 44, c: 1, rp: 0 },
      { t: "2w ago",  ty: "Carousel", r: 81, c: 4, rp: 0 },
      { t: "3w ago",  ty: "Video",    r: 14, c: 1, rp: 1 },
      { t: "1mo ago", ty: "Carousel", r: 68, c: 1, rp: 1 }
    ]},
    { name: "Rillion", posts: [
      { t: "recent",  ty: "Text",  r: 28, c: 19, rp: 4 },
      { t: "1w ago",  ty: "Image", r: 17, c: 1,  rp: 2 },
      { t: "recent",  ty: "Image", r: 16, c: 0,  rp: 0 },
      { t: "6d ago",  ty: "Video", r: 33, c: 3,  rp: 1 }
    ]},
    { name: "Fidesic", posts: [
      { t: "17h ago", ty: "Image", r: 4, c: 0, rp: 2 }
    ]},
    { name: "Stampli", posts: [
      { t: "12h ago", ty: "Article/Link", r: 4,  c: 0, rp: 3 },
      { t: "1d ago",  ty: "Article/Link", r: 18, c: 1, rp: 3 },
      { t: "2w ago",  ty: "Image",        r: 27, c: 3, rp: 10 },
      { t: "6d ago",  ty: "Article/Link", r: 8,  c: 0, rp: 2 },
      { t: "1w ago",  ty: "Article/Link", r: 16, c: 3, rp: 7 },
      { t: "3w ago",  ty: "Article/Link", r: 25, c: 0, rp: 11 },
      { t: "recent",  ty: "Image",        r: 80, c: 8, rp: 23 },
      { t: "2mo ago", ty: "Carousel",     r: 43, c: 1, rp: 5 },
      { t: "recent",  ty: "Article/Link", r: 98, c: 2, rp: 5 }
    ]}
  ]
};
