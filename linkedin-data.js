/* =========================================================================
   LinkedIn post-engagement data for the Continia competitor dashboard.
   Public engagement on each company's last 10 posts (reactions / comments /
   reposts). Totals + averages are computed in dashboard.js from these raw
   posts, so the comparison table can never drift from the source numbers.

   How to update: re-capture each company's latest 10 posts, replace the
   "posts" arrays, and bump "captured". Posts are stored in LinkedIn "Top"
   (most-relevant) order, not strictly chronological. Per post:
     t  = short title         ty = Image | Carousel | Video | Document | Text/Link | Event
     r  = reactions           c  = comments            rp = reposts
   ========================================================================= */

window.LI_DATA = {
  source: "LinkedIn public engagement",
  captured: "2026-06-11",
  windowLabel: "last 10 posts each",
  companies: [
    { name: "Continia Software", ours: true, posts: [
      { t: "From a full-time AP person to automation (The Reserves Network)", ty: "Image",    r: 11,  c: 0, rp: 0 },
      { t: "Continia Elevate in Warsaw, Poland",                              ty: "Carousel", r: 56,  c: 1, rp: 0 },
      { t: "Kicking off Continia Elevate in the UK (London)",                 ty: "Video",    r: 46,  c: 2, rp: 0 },
      { t: "We are ISO 27001 certified",                                      ty: "Carousel", r: 170, c: 2, rp: 1 },
      { t: "Bike to Work — we cycled to work in May",                    ty: "Image",    r: 64,  c: 1, rp: 0 },
      { t: "250 Continia solutions celebrated with Softværket",          ty: "Carousel", r: 62,  c: 1, rp: 2 },
      { t: "Thanks for a great time at DynamicsMinds",                        ty: "Carousel", r: 88,  c: 2, rp: 0 },
      { t: "Continia is growing — swipe to find your next role",         ty: "Document", r: 42,  c: 0, rp: 0 },
      { t: "That's a wrap on Directions ASIA",                                ty: "Carousel", r: 59,  c: 0, rp: 0 },
      { t: "Your BC setup is almost there — upgrade for free",           ty: "Video",    r: 34,  c: 0, rp: 4 }
    ]},
    { name: "Truvio", posts: [
      { t: "Webinar July 2 — product data as the key to AI eCommerce",   ty: "Carousel", r: 12, c: 2, rp: 1 },
      { t: "Community Summit NA Roadshow in Charlotte, June 9",               ty: "Carousel", r: 13, c: 0, rp: 1 },
      { t: "88% of manufacturers/wholesalers now sell online",               ty: "Carousel", r: 22, c: 0, rp: 4 },
      { t: "5 years of reliable AP automation at recucare (ExFlow)",          ty: "Carousel", r: 19, c: 0, rp: 3 },
      { t: "Last chance: Truvio Talks Podcast w/ Parkfield Collective",       ty: "Video",    r: 1,  c: 0, rp: 0 },
      { t: "Agentic AI for Truvio Commerce Suite (Backend MCP Server)",       ty: "Carousel", r: 34, c: 0, rp: 5 },
      { t: "More than half of B2B revenue now comes from online orders",      ty: "Carousel", r: 23, c: 0, rp: 5 },
      { t: "Fomaco webinar: self-service spare parts portal (D365 F&O)",      ty: "Carousel", r: 26, c: 0, rp: 3 },
      { t: "Three industries, similar commerce challenges (3 webinars)",      ty: "Carousel", r: 14, c: 0, rp: 5 },
      { t: "The State of B2B eCommerce 2026 (Truvio + Sapio Research)",        ty: "Event",    r: 13, c: 0, rp: 3 }
    ]},
    { name: "Equisys", posts: [
      { t: "Hours away from webinar: Best AP Automation for BC",              ty: "Carousel", r: 0,  c: 0, rp: 1 },
      { t: "Less than 24 hours to webinar (June 10)",                         ty: "Carousel", r: 2,  c: 0, rp: 3 },
      { t: "Thanks for stopping by at Directions North America 2026",         ty: "Image",    r: 12, c: 0, rp: 2 },
      { t: "Book a demo of Zetadocs Expenses",                                ty: "Carousel", r: 3,  c: 0, rp: 3 },
      { t: "Looking forward to AP Automation Comparison Showcase",            ty: "Carousel", r: 1,  c: 0, rp: 0 },
      { t: "Celebrating 15 years of the Equisys blog",                        ty: "Document", r: 3,  c: 0, rp: 1 },
      { t: "Amazing first day at Directions North America (booth E-32)",      ty: "Carousel", r: 14, c: 0, rp: 5 },
      { t: "We'll be in Orlando for Directions — visit booth E-32",      ty: "Carousel", r: 5,  c: 0, rp: 3 },
      { t: "Ready to streamline AP? Implementation tips",                     ty: "Document", r: 2,  c: 0, rp: 2 },
      { t: "Team meet-up in London (HMS Wellington)",                         ty: "Image",    r: 5,  c: 0, rp: 0 }
    ]},
    { name: "Medius", posts: [
      { t: "Charterhouse Holdings: 10,000+ invoices a year (case)",           ty: "Image",    r: 7,  c: 0, rp: 0 },
      { t: "How AI is revolutionizing manufacturing AP processes",            ty: "Image",    r: 9,  c: 0, rp: 2 },
      { t: "Improve AP without disrupting your ERP (guide)",                  ty: "Image",    r: 8,  c: 0, rp: 1 },
      { t: "Daniel Ball on stage, Gartner Finance Symposium",                 ty: "Carousel", r: 55, c: 0, rp: 3 },
      { t: "Webinar June 11 with Antaras: touchless AP in Infor LN",          ty: "Carousel", r: 22, c: 0, rp: 4 },
      { t: "Excited to work with Antaras on webinar (shared)",                ty: "Carousel", r: 2,  c: 1, rp: 1 },
      { t: "Got 30 minutes? June webinars",                                   ty: "Document", r: 11, c: 0, rp: 0 },
      { t: "Thanks for three days at DynamicsMinds 2026",                     ty: "Carousel", r: 63, c: 7, rp: 0 },
      { t: "Amazing day 1 at Gartner Finance Symposium/Xpo 2026",             ty: "Carousel", r: 94, c: 0, rp: 5 },
      { t: "Medius reached 30,000 LinkedIn followers",                        ty: "Carousel", r: 75, c: 0, rp: 0 }
    ]},
    { name: "Qvalia", posts: [
      { t: "E-invoicing mandates becoming infrastructure decisions (SK)",     ty: "Carousel", r: 0,  c: 0, rp: 0 },
      { t: "New Billentis report on the global e-invoicing market",           ty: "Carousel", r: 4,  c: 0, rp: 0 },
      { t: "Slovakia's eFaktura framework (Peppol BIS)",                      ty: "Carousel", r: 20, c: 0, rp: 1 },
      { t: "Qvalia certified for Slovakia e-invoicing (eFaktura)",            ty: "Carousel", r: 29, c: 1, rp: 5 },
      { t: "Qvalia ISO 22301:2019 certified",                                 ty: "Carousel", r: 4,  c: 0, rp: 0 },
      { t: "Qvalia now listed in Cloud Security Alliance STAR Registry",      ty: "Carousel", r: 6,  c: 1, rp: 0 },
      { t: "Thanks for joining the IDP webinar",                              ty: "Image",    r: 29, c: 3, rp: 3 },
      { t: "AI in finance through the decades (1940s to today)",              ty: "Image",    r: 7,  c: 0, rp: 0 },
      { t: "Qvalia now available on iPhone and Android (app)",                ty: "Carousel", r: 42, c: 5, rp: 5 },
      { t: "Summer reading no 4: The definitive guide to Peppol",             ty: "Document", r: 7,  c: 0, rp: 0 }
    ]},
    { name: "AMC Banking", posts: [
      { t: "Thanks to everybody who showed up at the reception",              ty: "Carousel", r: 28, c: 1, rp: 0 },
      { t: "AMC operates under Service Provider Agreements with banks",       ty: "Image",    r: 9,  c: 0, rp: 0 },
      { t: "We're moving — join us for a reception",                     ty: "Event",    r: 12, c: 0, rp: 1 },
      { t: "New app to simplify cash management in D365 BC",                  ty: "Document", r: 4,  c: 0, rp: 0 },
      { t: "AMC webinar: new AMC Banking app for D365 BC",                    ty: "Video",    r: 6,  c: 0, rp: 0 },
      { t: "Bank integration: Myth vs reality",                               ty: "Video",    r: 10, c: 0, rp: 3 },
      { t: "AMC is expanding — looking for a Java developer",            ty: "Text/Link", r: 12, c: 0, rp: 3 },
      { t: "Still uploading payment files manually?",                         ty: "Text/Link", r: 6,  c: 0, rp: 0 },
      { t: "AMC Banking webinar series: Simplifying Cash Management",         ty: "Video",    r: 10, c: 0, rp: 1 },
      { t: "AMC Webinar: Intelligent cash sweeping",                          ty: "Video",    r: 11, c: 0, rp: 0 }
    ]},
    { name: "B2Brouter", posts: [
      { t: "Legal SaaS platforms in France: 2026 product deadline",          ty: "Document", r: 2,  c: 0, rp: 0 },
      { t: "B2Brouter at ERP Summit Spain (repost)",                          ty: "Carousel", r: 33, c: 0, rp: 2 },
      { t: "Germany's B2B e-invoicing roadmap is already moving",             ty: "Document", r: 7,  c: 2, rp: 1 },
      { t: "Ley Crea y Crece vs VeriFactu — are they the same?",         ty: "Document", r: 7,  c: 0, rp: 1 },
      { t: "In 8 days: Peppol Conference Europe 2026 in Brussels",            ty: "Text/Link", r: 5,  c: 0, rp: 2 },
      { t: "Germany's e-invoicing roadmap (shared from Capde)",               ty: "Carousel", r: 0,  c: 0, rp: 0 },
      { t: "Tomorrow: webinar on Ley Crea y Crece",                           ty: "Carousel", r: 3,  c: 0, rp: 0 },
      { t: "Upcoming webinars June 2026 (API + Ley Crea y Crece, ES)",        ty: "Carousel", r: 6,  c: 0, rp: 2 },
      { t: "Upcoming webinars June 2026 (B2Brouter API, EN)",                 ty: "Carousel", r: 6,  c: 0, rp: 2 },
      { t: "It's tomorrow! Webinar on VeriFactu, May 28",                     ty: "Carousel", r: 7,  c: 0, rp: 2 }
    ]},
    { name: "Dooap", posts: [
      { t: "Dynamics community comes to Toronto (DUG Regional)",              ty: "Carousel", r: 14, c: 0,  rp: 0 },
      { t: "Just think of the possibilities with Dooap Studio (shared)",      ty: "Carousel", r: 9,  c: 0,  rp: 1 },
      { t: "Dooap Unleashed: Run With Us — Eftsure",                     ty: "Video",    r: 30, c: 2,  rp: 1 },
      { t: "Trends from DynamicsCon & DynamicsMinds 2026 (blog)",             ty: "Carousel", r: 19, c: 0,  rp: 0 },
      { t: "This is what agentic AP automation looks like (Dooap Studio)",    ty: "Video",    r: 15, c: 0,  rp: 5 },
      { t: "That's a wrap on DynamicsMinds (Slovenia)",                       ty: "Carousel", r: 65, c: 4,  rp: 0 },
      { t: "Let Dooap help herd your AP with AI (booth 207)",                 ty: "Image",    r: 57, c: 1,  rp: 2 },
      { t: "Set up and ready for \"Herd your AP with AI Agents\"",            ty: "Carousel", r: 27, c: 2,  rp: 3 },
      { t: "Run With Us on Dooap Unleashed — first up: Corpay",          ty: "Video",    r: 69, c: 10, rp: 3 },
      { t: "Heading to DynamicsMinds 2026",                                   ty: "Carousel", r: 30, c: 0,  rp: 1 }
    ]}
  ]
};
