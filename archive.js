/* =========================================================================
   THE BRAIN — append-only historical archive for the Continia dashboard.

   Long-term memory for month-over-month comparison. The LIVE site never
   reads this file — it renders from dashboard.js (competitors + events),
   linkedin-data.js and youtube-data.js. This file only accumulates history
   so past states are never lost when those live files are overwritten.
   (YouTube history already lives in youtube-data.js “snapshots”; this brain
   covers the two that USED to be overwritten: LinkedIn + News/competitors.)

   HOW TO UPDATE (done automatically by “Opdater alt”):
     After refreshing the live data, PREPEND one new snapshot to
     “snapshots” (newest first). NEVER edit or delete an existing
     snapshot — each one is a permanent dated layer. (If you refresh
     twice on the SAME date, replace that date’s snapshot rather than
     adding a duplicate.)

   Per snapshot:
     date         the DASHBOARD_UPDATED stamp for that refresh (YYYY-MM-DD)
     linkedin     { source, captured, windowLabel, companies:[ {name,ours,posts:[{t,ty,r,c,rp}]} ] }
     news.events  the Key Events timeline as it stood that month
     competitors  the competitor cards (data[]) as they stood that month
   ========================================================================= */

window.DASH_ARCHIVE = {
  "snapshots": [
    {
      "date": "2026-06-18",
      "linkedin": {
        "source": "LinkedIn public engagement",
        "captured": "2026-06-11",
        "windowLabel": "last 10 posts each",
        "companies": [
          {
            "name": "Continia Software",
            "ours": true,
            "posts": [
              {
                "t": "From a full-time AP person to automation (The Reserves Network)",
                "ty": "Image",
                "r": 11,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Continia Elevate in Warsaw, Poland",
                "ty": "Carousel",
                "r": 56,
                "c": 1,
                "rp": 0
              },
              {
                "t": "Kicking off Continia Elevate in the UK (London)",
                "ty": "Video",
                "r": 46,
                "c": 2,
                "rp": 0
              },
              {
                "t": "We are ISO 27001 certified",
                "ty": "Carousel",
                "r": 170,
                "c": 2,
                "rp": 1
              },
              {
                "t": "Bike to Work — we cycled to work in May",
                "ty": "Image",
                "r": 64,
                "c": 1,
                "rp": 0
              },
              {
                "t": "250 Continia solutions celebrated with Softværket",
                "ty": "Carousel",
                "r": 62,
                "c": 1,
                "rp": 2
              },
              {
                "t": "Thanks for a great time at DynamicsMinds",
                "ty": "Carousel",
                "r": 88,
                "c": 2,
                "rp": 0
              },
              {
                "t": "Continia is growing — swipe to find your next role",
                "ty": "Document",
                "r": 42,
                "c": 0,
                "rp": 0
              },
              {
                "t": "That's a wrap on Directions ASIA",
                "ty": "Carousel",
                "r": 59,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Your BC setup is almost there — upgrade for free",
                "ty": "Video",
                "r": 34,
                "c": 0,
                "rp": 4
              }
            ]
          },
          {
            "name": "Truvio",
            "posts": [
              {
                "t": "Webinar July 2 — product data as the key to AI eCommerce",
                "ty": "Carousel",
                "r": 12,
                "c": 2,
                "rp": 1
              },
              {
                "t": "Community Summit NA Roadshow in Charlotte, June 9",
                "ty": "Carousel",
                "r": 13,
                "c": 0,
                "rp": 1
              },
              {
                "t": "88% of manufacturers/wholesalers now sell online",
                "ty": "Carousel",
                "r": 22,
                "c": 0,
                "rp": 4
              },
              {
                "t": "5 years of reliable AP automation at recucare (ExFlow)",
                "ty": "Carousel",
                "r": 19,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Last chance: Truvio Talks Podcast w/ Parkfield Collective",
                "ty": "Video",
                "r": 1,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Agentic AI for Truvio Commerce Suite (Backend MCP Server)",
                "ty": "Carousel",
                "r": 34,
                "c": 0,
                "rp": 5
              },
              {
                "t": "More than half of B2B revenue now comes from online orders",
                "ty": "Carousel",
                "r": 23,
                "c": 0,
                "rp": 5
              },
              {
                "t": "Fomaco webinar: self-service spare parts portal (D365 F&O)",
                "ty": "Carousel",
                "r": 26,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Three industries, similar commerce challenges (3 webinars)",
                "ty": "Carousel",
                "r": 14,
                "c": 0,
                "rp": 5
              },
              {
                "t": "The State of B2B eCommerce 2026 (Truvio + Sapio Research)",
                "ty": "Event",
                "r": 13,
                "c": 0,
                "rp": 3
              }
            ]
          },
          {
            "name": "Equisys",
            "posts": [
              {
                "t": "Hours away from webinar: Best AP Automation for BC",
                "ty": "Carousel",
                "r": 0,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Less than 24 hours to webinar (June 10)",
                "ty": "Carousel",
                "r": 2,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Thanks for stopping by at Directions North America 2026",
                "ty": "Image",
                "r": 12,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Book a demo of Zetadocs Expenses",
                "ty": "Carousel",
                "r": 3,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Looking forward to AP Automation Comparison Showcase",
                "ty": "Carousel",
                "r": 1,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Celebrating 15 years of the Equisys blog",
                "ty": "Document",
                "r": 3,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Amazing first day at Directions North America (booth E-32)",
                "ty": "Carousel",
                "r": 14,
                "c": 0,
                "rp": 5
              },
              {
                "t": "We'll be in Orlando for Directions — visit booth E-32",
                "ty": "Carousel",
                "r": 5,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Ready to streamline AP? Implementation tips",
                "ty": "Document",
                "r": 2,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Team meet-up in London (HMS Wellington)",
                "ty": "Image",
                "r": 5,
                "c": 0,
                "rp": 0
              }
            ]
          },
          {
            "name": "Medius",
            "posts": [
              {
                "t": "Charterhouse Holdings: 10,000+ invoices a year (case)",
                "ty": "Image",
                "r": 7,
                "c": 0,
                "rp": 0
              },
              {
                "t": "How AI is revolutionizing manufacturing AP processes",
                "ty": "Image",
                "r": 9,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Improve AP without disrupting your ERP (guide)",
                "ty": "Image",
                "r": 8,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Daniel Ball on stage, Gartner Finance Symposium",
                "ty": "Carousel",
                "r": 55,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Webinar June 11 with Antaras: touchless AP in Infor LN",
                "ty": "Carousel",
                "r": 22,
                "c": 0,
                "rp": 4
              },
              {
                "t": "Excited to work with Antaras on webinar (shared)",
                "ty": "Carousel",
                "r": 2,
                "c": 1,
                "rp": 1
              },
              {
                "t": "Got 30 minutes? June webinars",
                "ty": "Document",
                "r": 11,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Thanks for three days at DynamicsMinds 2026",
                "ty": "Carousel",
                "r": 63,
                "c": 7,
                "rp": 0
              },
              {
                "t": "Amazing day 1 at Gartner Finance Symposium/Xpo 2026",
                "ty": "Carousel",
                "r": 94,
                "c": 0,
                "rp": 5
              },
              {
                "t": "Medius reached 30,000 LinkedIn followers",
                "ty": "Carousel",
                "r": 75,
                "c": 0,
                "rp": 0
              }
            ]
          },
          {
            "name": "Qvalia",
            "posts": [
              {
                "t": "E-invoicing mandates becoming infrastructure decisions (SK)",
                "ty": "Carousel",
                "r": 0,
                "c": 0,
                "rp": 0
              },
              {
                "t": "New Billentis report on the global e-invoicing market",
                "ty": "Carousel",
                "r": 4,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Slovakia's eFaktura framework (Peppol BIS)",
                "ty": "Carousel",
                "r": 20,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Qvalia certified for Slovakia e-invoicing (eFaktura)",
                "ty": "Carousel",
                "r": 29,
                "c": 1,
                "rp": 5
              },
              {
                "t": "Qvalia ISO 22301:2019 certified",
                "ty": "Carousel",
                "r": 4,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Qvalia now listed in Cloud Security Alliance STAR Registry",
                "ty": "Carousel",
                "r": 6,
                "c": 1,
                "rp": 0
              },
              {
                "t": "Thanks for joining the IDP webinar",
                "ty": "Image",
                "r": 29,
                "c": 3,
                "rp": 3
              },
              {
                "t": "AI in finance through the decades (1940s to today)",
                "ty": "Image",
                "r": 7,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Qvalia now available on iPhone and Android (app)",
                "ty": "Carousel",
                "r": 42,
                "c": 5,
                "rp": 5
              },
              {
                "t": "Summer reading no 4: The definitive guide to Peppol",
                "ty": "Document",
                "r": 7,
                "c": 0,
                "rp": 0
              }
            ]
          },
          {
            "name": "AMC Banking",
            "posts": [
              {
                "t": "Thanks to everybody who showed up at the reception",
                "ty": "Carousel",
                "r": 28,
                "c": 1,
                "rp": 0
              },
              {
                "t": "AMC operates under Service Provider Agreements with banks",
                "ty": "Image",
                "r": 9,
                "c": 0,
                "rp": 0
              },
              {
                "t": "We're moving — join us for a reception",
                "ty": "Event",
                "r": 12,
                "c": 0,
                "rp": 1
              },
              {
                "t": "New app to simplify cash management in D365 BC",
                "ty": "Document",
                "r": 4,
                "c": 0,
                "rp": 0
              },
              {
                "t": "AMC webinar: new AMC Banking app for D365 BC",
                "ty": "Video",
                "r": 6,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Bank integration: Myth vs reality",
                "ty": "Video",
                "r": 10,
                "c": 0,
                "rp": 3
              },
              {
                "t": "AMC is expanding — looking for a Java developer",
                "ty": "Text/Link",
                "r": 12,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Still uploading payment files manually?",
                "ty": "Text/Link",
                "r": 6,
                "c": 0,
                "rp": 0
              },
              {
                "t": "AMC Banking webinar series: Simplifying Cash Management",
                "ty": "Video",
                "r": 10,
                "c": 0,
                "rp": 1
              },
              {
                "t": "AMC Webinar: Intelligent cash sweeping",
                "ty": "Video",
                "r": 11,
                "c": 0,
                "rp": 0
              }
            ]
          },
          {
            "name": "B2Brouter",
            "posts": [
              {
                "t": "Legal SaaS platforms in France: 2026 product deadline",
                "ty": "Document",
                "r": 2,
                "c": 0,
                "rp": 0
              },
              {
                "t": "B2Brouter at ERP Summit Spain (repost)",
                "ty": "Carousel",
                "r": 33,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Germany's B2B e-invoicing roadmap is already moving",
                "ty": "Document",
                "r": 7,
                "c": 2,
                "rp": 1
              },
              {
                "t": "Ley Crea y Crece vs VeriFactu — are they the same?",
                "ty": "Document",
                "r": 7,
                "c": 0,
                "rp": 1
              },
              {
                "t": "In 8 days: Peppol Conference Europe 2026 in Brussels",
                "ty": "Text/Link",
                "r": 5,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Germany's e-invoicing roadmap (shared from Capde)",
                "ty": "Carousel",
                "r": 0,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Tomorrow: webinar on Ley Crea y Crece",
                "ty": "Carousel",
                "r": 3,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Upcoming webinars June 2026 (API + Ley Crea y Crece, ES)",
                "ty": "Carousel",
                "r": 6,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Upcoming webinars June 2026 (B2Brouter API, EN)",
                "ty": "Carousel",
                "r": 6,
                "c": 0,
                "rp": 2
              },
              {
                "t": "It's tomorrow! Webinar on VeriFactu, May 28",
                "ty": "Carousel",
                "r": 7,
                "c": 0,
                "rp": 2
              }
            ]
          },
          {
            "name": "Dooap",
            "posts": [
              {
                "t": "Dynamics community comes to Toronto (DUG Regional)",
                "ty": "Carousel",
                "r": 14,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Just think of the possibilities with Dooap Studio (shared)",
                "ty": "Carousel",
                "r": 9,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Dooap Unleashed: Run With Us — Eftsure",
                "ty": "Video",
                "r": 30,
                "c": 2,
                "rp": 1
              },
              {
                "t": "Trends from DynamicsCon & DynamicsMinds 2026 (blog)",
                "ty": "Carousel",
                "r": 19,
                "c": 0,
                "rp": 0
              },
              {
                "t": "This is what agentic AP automation looks like (Dooap Studio)",
                "ty": "Video",
                "r": 15,
                "c": 0,
                "rp": 5
              },
              {
                "t": "That's a wrap on DynamicsMinds (Slovenia)",
                "ty": "Carousel",
                "r": 65,
                "c": 4,
                "rp": 0
              },
              {
                "t": "Let Dooap help herd your AP with AI (booth 207)",
                "ty": "Image",
                "r": 57,
                "c": 1,
                "rp": 2
              },
              {
                "t": "Set up and ready for \"Herd your AP with AI Agents\"",
                "ty": "Carousel",
                "r": 27,
                "c": 2,
                "rp": 3
              },
              {
                "t": "Run With Us on Dooap Unleashed — first up: Corpay",
                "ty": "Video",
                "r": 69,
                "c": 10,
                "rp": 3
              },
              {
                "t": "Heading to DynamicsMinds 2026",
                "ty": "Carousel",
                "r": 30,
                "c": 0,
                "rp": 1
              }
            ]
          }
        ]
      },
      "news": {
        "events": [
          {
            "w": "Sept 2026 →",
            "c": "steady",
            "t": "<b>France B2B e-invoicing</b> mandate takes effect — large and mid-size companies must send and receive structured e-invoices. SMEs follow September 2027."
          },
          {
            "w": "Jul 1, 2026",
            "c": "steady",
            "t": "<b>UAE e-invoicing</b> rollout begins for large businesses (revenue ≥ AED 50M); <b>Pagero</b> is listed as a pre-approved accredited service provider."
          },
          {
            "w": "Jun 30, 2026",
            "c": "steady",
            "t": "<b>Saudi Arabia (ZATCA)</b> Fatoora e-invoicing Wave 24 integration deadline — the first wave to reach businesses with VAT revenue above SAR 375K, pulling thousands of smaller firms into mandatory clearance."
          },
          {
            "w": "June 16, 2026",
            "c": "ai",
            "t": "<b>Forrester</b> publishes <i>The Forrester Wave: AP Invoice Automation Software, Q2 2026</i> — agentic AI shifts AP from automation toward proactive, autonomous finance operations."
          },
          {
            "w": "June 9, 2026",
            "c": "cons",
            "t": "<b>AvidXchange</b> launches Payment Automation for Workday on the Workday Marketplace — extending its 1.5M-supplier AvidPay network into Workday Financial Management."
          },
          {
            "w": "June 2, 2026",
            "c": "ai",
            "t": "<b>Microsoft Build 2026</b> reframes the PC as an agentic OS — Windows Agent Framework open-sourced, Office Agent Mode runs agents natively."
          },
          {
            "w": "June 2026",
            "c": "ai",
            "t": "<b>Truvio</b> (formerly SignUp Software/ExFlow) completes its rebrand and ships TruvioSense Coding & Approval — AI/LLM invoice-coding suggestions in D365 F&O."
          },
          {
            "w": "May 11, 2026",
            "c": "ai",
            "t": "<b>Dooap</b> launches Dooap Studio — agentic AI platform."
          },
          {
            "w": "May 13, 2026",
            "c": "steady",
            "t": "<b>Zetadocs</b> Expenses May update (cloud, browser, iOS, Android)."
          },
          {
            "w": "Apr 30, 2026",
            "c": "ai",
            "t": "<b>BC 2026 Wave 1</b> ships two GA AI agents and MCP Server support — custom AL agents can now be built natively inside Business Central."
          },
          {
            "w": "Apr 28, 2026",
            "c": "ai",
            "t": "<b>Tungsten</b> previews TotalAgility 2026.2 with agentic AI features (London Summit)."
          },
          {
            "w": "Apr 28, 2026",
            "c": "ai",
            "t": "<b>Microsoft</b> introduces Expense Agent native to Business Central — AI-expense from the platform owner itself."
          },
          {
            "w": "Apr 14, 2026",
            "c": "ai",
            "t": "<b>Forrester</b> publishes Top Agentic AI Use Cases for AP 2026 — warns that agentic branding is widespread but real autonomy is rare; evaluators should prioritise production metrics over demos."
          },
          {
            "w": "Apr 2026",
            "c": "ai",
            "t": "<b>Tipalti</b> expands agentic AI to include tariff-refund processing."
          },
          {
            "w": "Mar 31, 2026",
            "c": "ai",
            "t": "<b>Stampli</b> launches Deep Finance — turning invoice data into consultant-grade executive spend intelligence."
          },
          {
            "w": "Early 2026",
            "c": "ai",
            "t": "<b>Medius</b> named Market Leader + Elite Performer for AI Innovation (Ardent Partners 2026)."
          },
          {
            "w": "Jan 22, 2026",
            "c": "cons",
            "t": "<b>Pagero</b> (Thomson Reuters) and Deloitte launch global e-invoicing alliance."
          },
          {
            "w": "Jan 21, 2026",
            "c": "cons",
            "t": "<b>onPhase</b> (DocuPhase) acquires enterprise AP player iPayables."
          },
          {
            "w": "Jan 20, 2026",
            "c": "ai",
            "t": "<b>Tungsten</b> hires new executives including its first Chief AI Officer."
          },
          {
            "w": "Jan 2026",
            "c": "cons",
            "t": "<b>ExFlow</b>/SignUp new F&O version; SignUp acquires DynamicWeb (e-commerce/PIM)."
          },
          {
            "w": "Jan 1, 2026",
            "c": "steady",
            "t": "<b>E-invoicing mandate</b> in Belgium takes effect — structured invoice via Peppol required."
          },
          {
            "w": "Oct 15, 2025",
            "c": "cons",
            "t": "<b>AvidXchange</b> taken private by TPG + Corpay for ~$2.2B."
          },
          {
            "w": "Autumn 2025",
            "c": "ai",
            "t": "<b>Tipalti</b> raises $200M (Hercules Capital) earmarked for AI."
          },
          {
            "w": "2025",
            "c": "steady",
            "t": "<b>Lasernet</b> (Formpipe) launches new BC connector with 20+ report types."
          },
          {
            "w": "Sep 2025",
            "c": "ai",
            "t": "<b>Dooap</b> achieves Microsoft Certified Software designation."
          }
        ]
      },
      "competitors": [
        {
          "n": "ExFlow",
          "o": "Truvio (formerly SignUp Software) · Stockholm",
          "stance": "cons",
          "sl": "Rebranded → Truvio + AI",
          "prox": "High",
          "cat": "AP automation · D365 F&O + BC",
          "head": "Rebrand to Truvio complete — ExFlow, Axtension, DynamicWeb and SKSoft unified into one Microsoft-native portfolio, now shipping its own AI.",
          "rel": "June 2026: AP Automation (powered by ExFlow) 2.19.0 for D365 F&O adds “TruvioSense Coding & Approval” — AI/LLM coding suggestions from previously approved invoices.",
          "str": "Rebranded SignUp Software → Truvio, unifying ExFlow/Axtension/DynamicWeb/SKSoft into one D365-native suite (beyond pure AP).",
          "pos": "Fully embedded/native in Dynamics — no third-party system.",
          "ai": "TruvioSense adds LLM-based invoice interpretation + coding suggestions on top of the existing ML Predictions.",
          "sc": "150+ employees · 1,300+ organisations",
          "s": [
            [
              "Truvio: What's New",
              "https://truvio.com/whats-new"
            ],
            [
              "Rebrand",
              "https://enterprisesoftwareexpress.com/signup-software-signs-up-for-a-new-name/"
            ],
            [
              "Release notes",
              "https://docs.signupsoftware.com/finance-operations/docs/user-manual/whats-new-and-planned/release-notes"
            ]
          ]
        },
        {
          "n": "Dooap",
          "o": "Dooap · Austin (Pagero)",
          "stance": "ai",
          "sl": "AI-aggressive",
          "prox": "High",
          "cat": "AP automation · D365 Finance (F&O)",
          "head": "Launched a dedicated agentic AI product — the most offensive AI move in the space.",
          "rel": "Dooap Studio, May 11 2026 — AP teams design and govern their own AI agents without IT.",
          "str": "Agents for GL coding, PO matching, fraud and routing — with rationale, confidence score and audit trail.",
          "pos": "Mobile-first, cloud-native — message: “AI you control.”",
          "ai": "A standalone agent product, not just AI features.",
          "sc": "Microsoft Certified Software (Sep 2025)",
          "s": [
            [
              "Dooap Studio (PR)",
              "https://www.prnewswire.com/news-releases/dooap-inc-launches-dooap-studio-putting-agentic-ap-automation-directly-in-the-hands-of-finance-teams-302768534.html"
            ],
            [
              "YouTube",
              "https://www.youtube.com/@dooap"
            ]
          ]
        },
        {
          "n": "Zetadocs",
          "o": "Equisys",
          "stance": "steady",
          "sl": "Stable cadence",
          "prox": "High",
          "cat": "Delivery · Capture · Expenses · BC",
          "head": "Consistent monthly release cadence; AI embedded in the core rather than big announcements.",
          "rel": "Delivery & Capture updated Jan, Mar and May 2026; Expenses May 2026 (cloud, browser, iOS, Android).",
          "str": "Three product lines kept in sync at a high release cadence.",
          "pos": "Everything happens inside Business Central — one environment, less friction.",
          "ai": "AI-driven data entry + automatic order/invoice matching.",
          "sc": "3 product lines (Delivery · Capture · Expenses)",
          "s": [
            [
              "May 2026 update",
              "https://www.equisys.com/blog/whats-new-in-zetadocs-expenses-may-2026-update"
            ],
            [
              "Equisys blog",
              "https://www.equisys.com/blog"
            ]
          ]
        },
        {
          "n": "Medius",
          "o": "Medius",
          "stance": "ai",
          "sl": "AI leader",
          "prox": "Medium",
          "cat": "AP automation + spend/payments · multi-ERP",
          "head": "Named AI leader by analysts; deep, autonomous AI across the full AP lifecycle.",
          "rel": "Ardent Partners 2026: Market Leader + Elite Performer for AI Innovation.",
          "str": "SmartFlow (proprietary CNN), Medius Copilot, Supplier Conversations (autonomous email handling), “AI workmate”.",
          "pos": "“Autonomous AP” — the finance team stays in control; own models rather than expensive LLMs for core work.",
          "ai": "Claims to have the most of the AP/payments lifecycle automated with AI.",
          "sc": "4,000+ customers · 102 countries · $200B spend/year",
          "s": [
            [
              "Medius AI advantage",
              "https://www.medius.com/ai-innovation/medius-ai-advantage/"
            ],
            [
              "Ardent 2026",
              "https://www.medius.com/resources/guides-reports/2026-ap-automation-payments-technology-advisor/"
            ]
          ]
        },
        {
          "n": "Tipalti",
          "o": "Tipalti · Foster City",
          "stance": "ai",
          "sl": "AI + capital",
          "prox": "Low",
          "cat": "Payables + global payments + procurement + expenses",
          "head": "Raised $200M for AI; rolling out agents across the entire finance flow.",
          "rel": "AI Assistant + AI agents (Invoice Capture, Bill Approvers, reporting, tax, purchase request); tariff-refund AI (Apr 2026).",
          "str": "$200M round (Hercules, autumn 2025) earmarked for AI; agentic focus.",
          "pos": "End-to-end payables + global payments in 200+ countries.",
          "ai": "Conversational assistant + autonomous agents embedded across the entire platform.",
          "sc": "~$75B payments/year",
          "s": [
            [
              "Tipalti AI agents",
              "https://tipalti.com/accounts-payable-software/finance-ai/"
            ],
            [
              "American Banker",
              "https://www.americanbanker.com/payments/news/tipalti-enhances-ai-tech-to-improve-tariff-refund-processing"
            ]
          ]
        },
        {
          "n": "Yooz",
          "o": "Yooz · Dallas",
          "stance": "ai",
          "sl": "AI + fraud",
          "prox": "Medium",
          "cat": "AP / P2P automation · multi-ERP",
          "head": "AI/Deep Learning P2P with a strong fraud focus; active in the BC and GP ecosystem.",
          "rel": "YoozProtect (fraud, NA launch Jan 2026); Line-Level Matching (2025); Yooz 2026 AI in Finance report.",
          "str": "AI + RPA + Big Data; fraud prevention as spearhead.",
          "pos": "Simple, fast, secure cloud P2P; unlimited users.",
          "ai": "Smart data extraction, routing and fraud detection.",
          "sc": "5,000+ customers · 300,000 users",
          "s": [
            [
              "YoozProtect",
              "https://www.getyooz.com/blog/yooz-protect-launch"
            ],
            [
              "Yooz + BC/GP",
              "https://msdynamicsworld.com/blog/two-days-two-erps-how-yooz-powering-ap-automation-gp-and-business-central"
            ]
          ]
        },
        {
          "n": "Stampli",
          "o": "Stampli · Mountain View",
          "stance": "ai",
          "sl": "AI veteran",
          "prox": "Low",
          "cat": "AP automation (invoice-centric) · 70+ ERPs",
          "head": "AI (“Billy the Bot”) at the core for nearly 10 years; raised capital from Blackstone.",
          "rel": "Stampli Deep Finance (Mar 2026) turns invoice data into consultant-grade executive spend intelligence; Stampli Card / Direct Pay; $61M Blackstone Series D (~$148M total); named a G2 Summer 2026 Leader for P2P + AP Automation (Jun 2026).",
          "str": "Invoice-centric communication + “AI employee”.",
          "pos": "Fast implementation (weeks, not months); approvers need no ERP access.",
          "ai": "Positions itself on “proven” AI for capture, coding, routing, duplicates and fraud.",
          "sc": "1,600+ customers · $80–85B invoices/year",
          "s": [
            [
              "Stampli AP",
              "https://www.stampli.com/ap-automation/"
            ],
            [
              "Deep Finance",
              "https://www.prnewswire.com/news-releases/stampli-launches-deep-finance-turning-invoice-data-into-executive-spend-intelligence-302729234.html"
            ],
            [
              "Blackstone funding",
              "https://financialit.net/news/fundraising-news/stampli-secures-61m-advanced-ai-powered-ap-automation"
            ]
          ]
        },
        {
          "n": "AvidXchange",
          "o": "TPG + Corpay · Charlotte",
          "stance": "cons",
          "sl": "Acquired (payments)",
          "prox": "Low",
          "cat": "AP + payment automation · mid-market",
          "head": "Taken private by TPG + Corpay (~$2.2B, Oct 2025) — pointing toward payment rails.",
          "rel": "Launched Payment Automation for Workday on the Workday Marketplace (Jun 2026); new COO Wade Fairey (Jun 2026); AI fraud/BEC detection in the AvidPay network.",
          "str": "Take-private; Corpay stake → focus on payment volume and interchange.",
          "pos": "Mid-market invoice-to-pay + AvidPay payment network.",
          "ai": "AI for fraud/anomaly detection; later on the AI curve than pure AI players.",
          "sc": "~$450M revenue · 25+ years of history",
          "s": [
            [
              "TPG/Corpay close",
              "https://www.avidxchange.com/press-releases/tpg-corpay-complete-acquisition-of-avidxchange/"
            ],
            [
              "Workday integration",
              "https://www.globenewswire.com/news-release/2026/06/09/3309047/37161/en/AvidXchange-Completes-Workday-Integration.html"
            ],
            [
              "Payments Dive",
              "https://www.paymentsdive.com/news/avidxchange-tpg-corpay-accounts-payable-payments/747520/"
            ]
          ]
        },
        {
          "n": "Compleat",
          "o": "Compleat Software · UK",
          "stance": "steady",
          "sl": "SMB / price",
          "prox": "Low",
          "cat": "P2P / AP automation + online buying",
          "head": "Affordable P2P for smaller businesses; UK/EMEA focus, not Dynamics-first.",
          "rel": "Capture + approval workflows + online buying; integration with Sage, Xero, QuickBooks.",
          "str": "Affordable SaaS for all sizes; procurement + AP combined.",
          "pos": "Cheap, simple access (subscription from a low price point).",
          "ai": "AI-OCR for capture/coding — significantly less AI marketing than the big players.",
          "sc": "500+ companies · EMEA/APAC/AMAC",
          "s": [
            [
              "Zone&Co 2026",
              "https://www.zoneandco.com/articles/top-16-ap-automation-software-solutions-in-2026"
            ],
            [
              "Capterra",
              "https://www.capterra.com/p/88208/Compleat-Purchase-to-Pay/"
            ]
          ]
        },
        {
          "n": "Tungsten Automation",
          "o": "formerly Kofax · Irvine",
          "stance": "ai",
          "sl": "AI catch-up",
          "prox": "Low",
          "cat": "IDP / RPA + AP (InvoiceAgility)",
          "head": "Rebranded from Kofax; betting hard on agentic AI to close the gap.",
          "rel": "TotalAgility now GA in three tiers (Standard/Advanced/Enterprise) with agentic AI, Quick AI Agents and multi-agent orchestration; quarterly releases from 2026; InvoiceAgility for AP.",
          "str": "Jan 2026: new executives incl. first Chief AI Officer; “AI-first” repositioning. CEO signals a possible 2027 exit (PE or strategic sale) as the sector consolidates (Jun 2026).",
          "pos": "Broad intelligent automation (document/workflow) — large IDP revenue base.",
          "ai": "Agentic AI now shipping (multi-agent orchestration); analysts said it was 9–12 months behind — now closing the gap.",
          "sc": "~40 years of history · 70+ countries",
          "s": [
            [
              "TotalAgility platform",
              "https://www.tungstenautomation.com/products/totalagility/release-highlights"
            ],
            [
              "Agentic AI hires",
              "https://www.tungstenautomation.com/about/press-releases/2026/tungsten-automation-invests-in-innovation-and-agentic-ai-with-key-executive-hires"
            ],
            [
              "Deep Analysis",
              "https://www.deep-analysis.net/boring-ai-how-tungsten-plans-to-move-beyond-its-idp-roots/"
            ],
            [
              "Exit signal (ION)",
              "https://ionanalytics.com/insights/mergermarket/tungsten-automation-exit-possible-in-2027-as-buyer-appetite-builds-ceo/"
            ]
          ]
        },
        {
          "n": "onPhase",
          "o": "formerly DocuPhase · Tampa",
          "stance": "cons",
          "sl": "Acquisitive + rebrand",
          "prox": "Low",
          "cat": "AP + payments + document management",
          "head": "Rebranded from DocuPhase; growing through acquisitions and embedded payments.",
          "rel": "Acquisition of iPayables (Jan 2026) + Clearwater Payments; Bottomline Paymode network embedded.",
          "str": "AI-driven AP + embedded payments; 173% 3-year growth (Inc. 5000).",
          "pos": "Unified finance automation for SMB → enterprise.",
          "ai": "AI-driven capture/automation combined with payments.",
          "sc": "Fast-growing · NetSuite-centric + others",
          "s": [
            [
              "onPhase news",
              "https://www.onphase.com/news"
            ],
            [
              "Accounting automation",
              "https://www.docuphase.com/accounting-automation"
            ]
          ]
        },
        {
          "n": "MineralTree",
          "o": "Global Payments · Boston",
          "stance": "cons",
          "sl": "Payments-owned",
          "prox": "Low",
          "cat": "AP + payment automation · multi-ERP",
          "head": "Owned by payments giant Global Payments; strength in multi-currency/international payments.",
          "rel": "Multi-currency (TransferMate, 130+ currencies); enterprise multi-ERP focus.",
          "str": "Part of Global Payments ($500M acquisition) → payment monetisation.",
          "pos": "End-to-end invoice-to-pay, fraud protection, multi-ERP.",
          "ai": "Less AI profiling; focus on payments and visibility.",
          "sc": "3,000+ companies · mid-market → Fortune 500",
          "s": [
            [
              "Global Payments acq.",
              "https://investors.globalpayments.com/news-events/press-releases/detail/23/global-payments-agrees-to-acquire-mineraltree-a-leader-in"
            ],
            [
              "Crunchbase",
              "https://www.crunchbase.com/organization/mineraltree"
            ]
          ]
        },
        {
          "n": "Dime Scheduler",
          "o": "Dime Software (Dimenics) · BE",
          "stance": "steady",
          "sl": "Adjacent (scheduling)",
          "prox": "High",
          "cat": "Visual resource/project planning · BC",
          "head": "BC-native, but in a different category (scheduling) — ISV neighbour, not a direct AP rival.",
          "rel": "Real-time BC sync, Gantt, drag-drop, capacity pivot, map/route planning; Outlook/Exchange sync.",
          "str": "Visual planning layer on top of BC/NAV/CRM/Power Platform.",
          "pos": "“Stop guessing, start planning” — easy to implement (~5 days).",
          "ai": "Limited AI profile; strength is visual planning.",
          "sc": "Subscription from ~€50/year · many languages",
          "s": [
            [
              "Features",
              "https://www.dimescheduler.com/features"
            ],
            [
              "Microsoft Marketplace",
              "https://marketplace.microsoft.com/en-us/product/web-apps/dimenics-3435744.dimescheduler"
            ]
          ]
        },
        {
          "n": "Microsoft Expense Agent",
          "o": "Microsoft · native in BC",
          "stance": "ai",
          "sl": "Platform owner · AI",
          "prox": "High",
          "cat": "AI expense capture · native in Business Central",
          "head": "The platform owner itself moving into the expense space with an AI agent — the most important BC-native development to watch.",
          "rel": "Expense Agent introduced in D365 Business Central (Apr 2026) — AI-driven expense capture, submission and compliance.",
          "str": "Microsoft building AI functionality directly into BC, overlapping with third-party expense solutions.",
          "pos": "Native to the platform — no extra vendor, comes with Business Central.",
          "ai": "AI agent for employee expenses embedded in the ERP itself.",
          "sc": "Built into Microsoft Dynamics 365 Business Central",
          "s": [
            [
              "Microsoft blog",
              "https://www.microsoft.com/en-us/dynamics-365/blog/it-professional/2026/04/27/expense-agent-dynamics-365-business-central/"
            ]
          ]
        },
        {
          "n": "Lasernet",
          "o": "Lasernet Group · DK/UK",
          "stance": "steady",
          "sl": "BC-native · output",
          "prox": "High",
          "cat": "Document output & e-invoicing · BC + F&O",
          "head": "Now independent (split from Formpipe, renamed Lasernet Group in 2026) — BC-native output engine competing with Continia Document Output.",
          "rel": "Lasernet for BC live on AppSource (20+ report types, Azure AI mapping); new BC product offering planned Q4 2026; named Temenos Exchange Partner of the Year 2026; joined the IFS partner network.",
          "str": "De-merged from Formpipe into a standalone, listed Lasernet Group focused solely on the Lasernet platform; doubling down on BC/Dynamics.",
          "pos": "Embedded in BC — design, send and archive documents without leaving the ERP.",
          "ai": "Azure AI for data mapping; primarily strong on output/compliance rather than AI marketing.",
          "sc": "20+ years of document expertise · global",
          "s": [
            [
              "Lasernet Group",
              "https://www.lasernetgroup.com/news-blogs/bc-connector-now-on-appsource"
            ],
            [
              "Formpipe/Lasernet split",
              "https://www.formpipe.com/news-formpipe-lasernet-split"
            ]
          ]
        },
        {
          "n": "AMC Banking",
          "o": "AMC-Consult · Denmark",
          "stance": "steady",
          "sl": "BC-native · banking",
          "prox": "High",
          "cat": "Bank integration & payments · BC + F&O",
          "head": "BC-native bank/payments solution — directly competes with Continia Banking & Payment Management.",
          "rel": "Standardises 600+ bank formats via the cloud platform XTendLink; Fundamentals ships as a BC extension.",
          "str": "PSD2-licensed payment institution; payment export, bank statements and reconciliation directly in BC.",
          "pos": "Embedded in BC — from payment journal direct to the bank (host-to-host).",
          "ai": "Data-driven auto-matching; less AI profiling, more operations and compliance.",
          "sc": "600+ banks · Danish vendor",
          "s": [
            [
              "AMC Banking BC",
              "https://www.amcbanking.com/bc-fundamentals/"
            ],
            [
              "Microsoft Learn",
              "https://learn.microsoft.com/en-us/dynamics365/business-central/ui-extensions-amc-banking"
            ]
          ]
        },
        {
          "n": "Acubiz",
          "o": "Acubiz · Denmark",
          "stance": "steady",
          "sl": "Expense · integrated",
          "prox": "Medium",
          "cat": "Expense management · certified BC integration",
          "head": "Danish expense player with certified BC integration — competes with Continia Expense Management.",
          "rel": "Certified integration with BC (+ e-conomic, Danløn, 40+ systems); app + web portal for expenses, cards and mileage.",
          "str": "Standalone expense platform that connects to BC — not “built inside” like Continia.",
          "pos": "Real-time overview of employee spend; automatic import to BC.",
          "ai": "Automation of receipt/expense flow; limited AI profile.",
          "sc": "Danish · 40+ system integrations",
          "s": [
            [
              "Acubiz platform",
              "https://acubiz.com/platform/"
            ]
          ]
        },
        {
          "n": "Pagero",
          "o": "Thomson Reuters",
          "stance": "cons",
          "sl": "TR-owned · e-invoicing",
          "prox": "High",
          "cat": "E-invoicing network & compliance · BC connector",
          "head": "Global e-invoicing network, now owned by Thomson Reuters — one of BC's built-in E-Document connectors.",
          "rel": "ONESOURCE Pagero (e-invoicing + tax); embedded e-invoicing for Oracle Fusion (2026); Deloitte global alliance (Jan 2026); pre-approved ASP for the UAE mandate (from Jul 2026); passed the EU ViDA Peppol 5-corner pilot.",
          "str": "Acquired by Thomson Reuters (2024) and merged with ONESOURCE tax; “two-step” format conversion globally.",
          "pos": "Open, ERP-agnostic network; BC extension sends e-/PDF/print invoice via one connection.",
          "ai": "Focus on compliance/CTC mandates rather than AI marketing.",
          "sc": "14M+ businesses · 100+ networks · IDC leader",
          "s": [
            [
              "Pagero for BC",
              "https://europe.thomsonreuters.com/pagero-network/system-connectivity/microsoft"
            ],
            [
              "UAE ASP",
              "https://europe.thomsonreuters.com/newsroom/pagero-part-of-thomson-reuters-listed-as-pre-approved-e-invoicing-service-provider-in-the-uae"
            ],
            [
              "Deloitte-alliance",
              "https://www.thomsonreuters.com/en/press-releases/2026/january/deloitte-and-thomson-reuters-launch-a-strategic-alliance-to-support-end-to-end-global-e-invoicing-and-e-reporting-for-organizations"
            ]
          ]
        },
        {
          "n": "B2Brouter",
          "o": "B2Brouter Global · ES",
          "stance": "steady",
          "sl": "Peppol · BC connector",
          "prox": "High",
          "cat": "Peppol / e-invoicing access point · BC connector",
          "head": "Certified Peppol access point with native BC connector — one of BC's built-in E-Document APIs.",
          "rel": "BC connector on AppSource; supports Peppol BIS 3.0, UBL, XRechnung, FatturaPA, Chorus Pro, FACe and SDI.",
          "str": "One connection to the entire Peppol network; automatic format conversion and compliance.",
          "pos": "Native in Dynamics — send and receive e-invoices without external portals.",
          "ai": "No significant AI profile; strength is compliance breadth across countries.",
          "sc": "30+ countries · ISO 27001 · EESPA member",
          "s": [
            [
              "B2Brouter for Dynamics",
              "https://www.b2brouter.net/global/e-invoicing-microsoft-dynamics/"
            ],
            [
              "Microsoft Learn (E-Docs)",
              "https://learn.microsoft.com/en-us/dynamics365/business-central/faq-electronic-invoicing"
            ]
          ]
        },
        {
          "n": "Qvalia",
          "o": "Qvalia · SE",
          "stance": "steady",
          "sl": "Peppol · BC app",
          "prox": "High",
          "cat": "Peppol e-invoicing & order management · BC app",
          "head": "Ready-made BC app for Peppol with AI posting suggestions — setup without code.",
          "rel": "Sends/receives Peppol invoices + order management; automatic posting in BC; AI suggestions for account mapping.",
          "str": "Plug-and-play BC connector via the Qvalia platform; no IT resources required.",
          "pos": "Everything posted automatically in BC — no double entry.",
          "ai": "AI-generated posting suggestions for incoming vendor invoices.",
          "sc": "EN 16931 · Peppol BIS · Swedish vendor",
          "s": [
            [
              "Qvalia for BC",
              "https://qvalia.com/peppol-e-invoicing-for-business-central/"
            ]
          ]
        },
        {
          "n": "Rillion",
          "o": "Rillion (formerly Palette) · Stockholm (Altor)",
          "stance": "ai",
          "sl": "AI-native capture",
          "prox": "Medium",
          "cat": "AP automation · multi-ERP + BC connector",
          "head": "Nordic AP-automation veteran going AI-native — LLM invoice capture with no OCR templates.",
          "rel": "Rillion Capture (Mar 25, 2026) — first AI-native, multimodal-LLM invoice capture (no templates); Riley AI Assistant (Sept 2025) for invoice/supplier Q&A.",
          "str": "30+ years (ex-Palette/Centsoft), Altor PE-owned; shifting from template-OCR to AI-native capture and expanding in the US.",
          "pos": "Control, visibility and speed for mid-market/enterprise AP; native Business Central connector among 50+ ERPs.",
          "ai": "Riley AI assistant + Rillion Capture (multimodal LLM) for extraction, coding and approval routing.",
          "sc": "3,000+ customers · 50+ countries · Altor-owned",
          "s": [
            [
              "Rillion AP",
              "https://www.rillion.com/"
            ],
            [
              "Rillion Capture (Mar 2026)",
              "https://www.rillion.com/blog/rillion-capture-announcement/"
            ],
            [
              "BC integration",
              "https://www.rillion.com/integration/microsoft-dynamics-365-business-central/"
            ]
          ]
        },
        {
          "n": "Fidesic",
          "o": "Fidesic (Enliven Software) · East Lansing, MI",
          "stance": "ai",
          "sl": "Built for Dynamics · AI capture",
          "prox": "High",
          "cat": "AP automation · Dynamics GP + BC",
          "head": "AP automation purpose-built for Microsoft Dynamics GP & Business Central, with AI invoice capture.",
          "rel": "AI invoice capture (MagiCapture) for Business Central — no templates, near-touchless; multi-entity BC integration (2024–25).",
          "str": "Deepen the Dynamics ecosystem (GP heritage since 2008 + native BC AL app); raise AI-capture fidelity and multi-entity workflows.",
          "pos": "“Purpose-built for Dynamics” — native GP/BC AP with no coding or mapping.",
          "ai": "MagiCapture ML/AI invoice capture that learns per submission; high first-pass accuracy, no templates.",
          "sc": "East Lansing, MI · GP since 2008 · BC on AppSource",
          "s": [
            [
              "Fidesic",
              "https://www.fidesic.com/"
            ],
            [
              "BC integration",
              "https://www.fidesic.com/product/dynamics-business-central-integration"
            ],
            [
              "MagiCapture",
              "https://www.fidesic.com/product/magicapture"
            ]
          ]
        },
        {
          "n": "Yavrio",
          "o": "Yavrio · London",
          "stance": "steady",
          "sl": "BC-native · open banking",
          "prox": "High",
          "cat": "Bank connectivity & payments · BC + ERPs",
          "head": "Open-banking bank connectivity built inside Business Central — overlaps AMC Banking and Continia Banking & Payment Management.",
          "rel": "Connected the five largest US banks + embedded payments (early 2026); $2.4M seed (Fuel Ventures, Jan 2025); 14,000+ banks across 20 countries.",
          "str": "Expand bank coverage (10K→14K+ banks) and ERP scope beyond BC; positioned as a no-code alternative to CSV/file-based bank imports.",
          "pos": "“Built inside Business Central” — collect, settle and reconcile payments and bank feeds without external portals.",
          "ai": "Rules-based live bank feeds + automated reconciliation; minimal AI positioning.",
          "sc": "London · ~40 staff · 14,000+ banks · seed-stage",
          "s": [
            [
              "Yavrio",
              "https://www.yavr.io/"
            ],
            [
              "5 major US banks",
              "https://www.openbankingexpo.com/news/open-banking-fintech-yavrio-connects-with-five-major-us-banks/"
            ],
            [
              "Yavrio on AppSource",
              "https://appsource.microsoft.com/en-us/product/dynamics-365-business-central/pubid.yavrioltd1647526263468%7Caid.yavrio_open_banking%7Cpappid.3d686c04-e1b1-435e-bea4-862c2c203ca7"
            ]
          ]
        }
      ]
    }
  ]
};
