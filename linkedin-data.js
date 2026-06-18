/* =========================================================================
   LinkedIn post-engagement data for the Continia competitor dashboard.
   Public engagement on each company's 10 most recent posts (reactions /
   comments / reposts). Totals + averages are computed in dashboard.js from
   these raw posts, so the comparison table can never drift from the source.

   Source: Assets/linkedin_post_engagement_report_Jun 18.txt (capture
   2026-06-18 14:43). This export includes the real post titles, so each
   post's label "t" is its actual title. No post-type was exported this round,
   so "ty" is omitted (the type pill simply doesn't render). Posts whose
   engagement was unreadable are dropped (e.g. Continia's 10th post), so a
   company can show fewer than 10.

   On the tracking list but deliberately excluded (watch, not card — see
   FULL-UPDATE.md): incedo-inc (consulting firm), signup-software (Truvio's
   former brand, already the ExFlow/Truvio card), stripe (payments benchmark).

   How to update: re-capture each company's recent posts, replace the "posts"
   arrays, and bump "captured". Per post:
     t  = post title                 r = reactions
     c  = comments                   rp = reposts
     ty = (optional) Image | Carousel | Video | Document | Text | Article/Link
   ========================================================================= */

window.LI_DATA = {
  source: "LinkedIn public engagement",
  captured: "2026-06-18",
  windowLabel: "last 10 posts each · public engagement",
  companies: [
    { name: "Continia Software", ours: true, posts: [
      { t: "From a full-time AP person to automation in minutes", r: 22, c: 0, rp: 3 },
      { t: "The Elevate tour continues - this time in Poland!", r: 60, c: 1, rp: 0 },
      { t: "Kicking off Continia Elevate in the UK", r: 49, c: 2, rp: 1 },
      { t: "We're ISO 27001 certified", r: 187, c: 2, rp: 1 },
      { t: "It's about time we cycled to work - May commute in Copenhagen", r: 67, c: 1, rp: 0 },
      { t: "250 Continia solutions is a good reason for cake", r: 68, c: 1, rp: 2 },
      { t: "Thanks for a great time at DynamicsMinds!", r: 92, c: 2, rp: 0 },
      { t: "Continia is growing - swipe to find your next role", r: 42, c: 0, rp: 0 },
      { t: "Your BC setup is almost there. Why not upgrade it?", r: 34, c: 0, rp: 4 }
    ]},
    { name: "Truvio", posts: [
      { t: "I dag er Truvio med til Forretning Online hos Novicell i Aarhus", r: 14, c: 1, rp: 1 },
      { t: "What does successful B2B eCommerce look like today?", r: 10, c: 0, rp: 3 },
      { t: "Truvio is heading to Toronto - Dynamics Regional event June 18-19", r: 30, c: 0, rp: 2 },
      { t: "Driving Scalable AP Automation Across a Multi-Entity Forestry Business", r: 16, c: 0, rp: 4 },
      { t: "Last chance! Truvio Talks Podcast 'Beyond the Platform' with Parkfield Collective", r: 5, c: 0, rp: 0 },
      { t: "AI is changing how customers discover products (Webinar July 2nd on PIM & AI)", r: 16, c: 2, rp: 2 },
      { t: "We're attending the Community Summit NA Roadshow in Charlotte, June 9", r: 16, c: 0, rp: 1 },
      { t: "88% of surveyed manufacturers and wholesalers now sell online", r: 23, c: 0, rp: 4 },
      { t: "5 Years of Reliable AP Automation! (recucare GmbH / ExFlow case)", r: 19, c: 0, rp: 3 },
      { t: "B2B eCommerce is reshaping how manufacturers grow (Truvio + Sapio Research)", r: 16, c: 0, rp: 6 }
    ]},
    { name: "Equisys", posts: [
      { t: "Hours away from our webinar 'Discover THE BEST AP Automation Solution for Business Central'", r: 0, c: 0, rp: 1 },
      { t: "Less than 24 hours left to register for our AP Automation webinar", r: 2, c: 0, rp: 3 },
      { t: "Looking for a smarter way to manage employee expenses? Book a Zetadocs demo", r: 3, c: 0, rp: 3 },
      { t: "Last week we sponsored Directions North America 2026!", r: 12, c: 0, rp: 2 },
      { t: "An amazing first day at Directions North America", r: 14, c: 0, rp: 5 },
      { t: "We'll be in Orlando, Florida next week for Directions North America", r: 5, c: 0, rp: 3 },
      { t: "We're headed to Directions in Orlando in 2 weeks", r: 6, c: 0, rp: 4 },
      { t: "Deliver smarter, not harder! Customize how your documents reach the right people", r: 2, c: 0, rp: 0 },
      { t: "We're delighted to be part of this exciting event", r: 3, c: 0, rp: 1 },
      { t: "Zetadocs Expenses offers a smooth expense workflow out-of-the-box", r: 4, c: 0, rp: 1 }
    ]},
    { name: "Medius", posts: [
      { t: "Rapid growth in logistics often masks operational complexity", r: 3, c: 1, rp: 0 },
      { t: "AP teams in construction manage thousands of invoices", r: 14, c: 0, rp: 2 },
      { t: "E-invoicing is no longer just a compliance checkbox", r: 9, c: 0, rp: 3 },
      { t: "Looking forward to this. Hope to see you join us on July 15.", r: 19, c: 0, rp: 5 },
      { t: "Garment manufacturing doesn't slow down for admin", r: 14, c: 0, rp: 0 },
      { t: "How is AI revolutionizing manufacturing AP processes?", r: 14, c: 0, rp: 2 },
      { t: "'How do I improve AP without disrupting our ERP?'", r: 11, c: 0, rp: 2 },
      { t: "Speed used to be the whole AP conversation", r: 58, c: 0, rp: 3 },
      { t: "Still manually chasing invoice approvals in Infor LN?", r: 23, c: 0, rp: 4 },
      { t: "'AI-powered' has become the default claim in AP automation", r: 10, c: 0, rp: 0 }
    ]},
    { name: "Qvalia", posts: [
      { t: "E-invoicing mandates are becoming infrastructure decisions (Slovakia)", r: 3, c: 0, rp: 0 },
      { t: "The new Billentis report on the global e-invoicing market is here", r: 6, c: 1, rp: 0 },
      { t: "Slovakia's eFaktura framework is another step in Europe's transition", r: 20, c: 0, rp: 2 },
      { t: "Qvalia is now certified for Slovakia e-invoicing under eFaktura", r: 29, c: 1, rp: 5 },
      { t: "Qvalia's Business Continuity Management System is now certified", r: 4, c: 0, rp: 0 },
      { t: "Qvalia is now listed in the Cloud Security Alliance STAR Registry", r: 6, c: 1, rp: 0 },
      { t: "Qvalia is now available on iPhone and Android", r: 42, c: 5, rp: 5 },
      { t: "In 2025, we expanded Qvalia's platform across nearly all fronts", r: 13, c: 1, rp: 2 },
      { t: "[Peppol for developers] How to get started with Peppol API", r: 9, c: 0, rp: 1 },
      { t: "Belgium mandates Peppol e-invoicing for most B2B transactions", r: 9, c: 0, rp: 1 }
    ]},
    { name: "AMC Banking", posts: [
      { t: "Your biggest compliance risk might be a process nobody questions", r: 6, c: 0, rp: 2 },
      { t: "Thanks to everybody who showed up for the reception in our new building!", r: 29, c: 1, rp: 0 },
      { t: "You can still register for our reception next week", r: 0, c: 0, rp: 0 },
      { t: "AMC Banking operates under Service Provider Agreements with selected banks", r: 9, c: 0, rp: 0 },
      { t: "AMC is expanding - we're looking for a Java developer", r: 12, c: 0, rp: 3 },
      { t: "Still uploading payment files manually? At some point, it stops scaling.", r: 6, c: 0, rp: 0 },
      { t: "We're moving - join us for a reception", r: 12, c: 0, rp: 1 },
      { t: "The torch has officially been passed - moving into Kobenhavn", r: 56, c: 4, rp: 1 },
      { t: "Enterprise treasury demands structure, visibility, and control", r: 7, c: 0, rp: 0 },
      { t: "Bank integration: Myth vs reality", r: 10, c: 0, rp: 3 }
    ]},
    { name: "B2Brouter", posts: [
      { t: "B2Brouter attended Peppol Conference Europe 2026 in Brussels", r: 6, c: 0, rp: 1 },
      { t: "(German) Eine E-Rechnung zu empfangen bedeutet nicht, sie auch zu verarbeiten", r: 0, c: 0, rp: 0 },
      { t: "(Spanish) VeriFactu, Ley Crea y Crece, factura electronica B2B", r: 8, c: 0, rp: 1 },
      { t: "Starting the Peppol Conference 2026! More than 40 countries embracing Peppol", r: 52, c: 1, rp: 4 },
      { t: "Peppol is becoming one of the most reliable ways to exchange B2B invoices", r: 5, c: 0, rp: 0 },
      { t: "A standard should make e-invoicing simpler", r: 1, c: 0, rp: 0 },
      { t: "(French) Plateformes SaaS juridiques en France : 2026", r: 4, c: 0, rp: 0 },
      { t: "Germany's B2B e-invoicing roadmap is already moving", r: 8, c: 2, rp: 1 },
      { t: "(Spanish) B2Brouter en el ERP Summit Espana con partners", r: 40, c: 0, rp: 2 },
      { t: "(Spanish) Crees que Ley Crea y Crece y VeriFactu son lo mismo?", r: 8, c: 0, rp: 1 }
    ]},
    { name: "Dooap", posts: [
      { t: "The Dynamics community is coming to Toronto - and so are we", r: 16, c: 0, rp: 1 },
      { t: "Excited to introduce our latest Dooap Unleashed: Run With Us - Eftsure!", r: 39, c: 2, rp: 1 },
      { t: "This is what agentic AP automation looks like. Dooap Studio", r: 17, c: 0, rp: 6 },
      { t: "Just think of the possibilities with Dooap Studio!", r: 12, c: 0, rp: 1 },
      { t: "AP automation doesn't stop at the invoice. So why should your tech stack?", r: 71, c: 10, rp: 3 },
      { t: "We saw a clear shift across #DynamicsCon2026 and #DynamicsMinds", r: 19, c: 0, rp: 0 },
      { t: "Well, that's a wrap on DynamicsMinds", r: 69, c: 4, rp: 0 },
      { t: "Great conversations. Great community.", r: 9, c: 1, rp: 0 },
      { t: "Set up and ready for 'Herd your AP with AI Agents'", r: 28, c: 2, rp: 3 },
      { t: "We're heading to #DynamicsMinds2026", r: 30, c: 0, rp: 1 }
    ]},
    { name: "Yavrio", posts: [
      { t: "Only 18% of finance teams close their books in three days or less", r: 12, c: 1, rp: 0 },
      { t: "Still moving bank data into your finance system one CSV at a time?", r: 19, c: 0, rp: 1 },
      { t: "The payment is accepted. But is the finance work actually done?", r: 44, c: 1, rp: 0 },
      { t: "What a 2026 Yavrio is having so far!", r: 102, c: 7, rp: 0 },
      { t: "DynamicsMinds 2026 is done and what a week it's been", r: 105, c: 5, rp: 0 },
      { t: "Finance teams BEFORE vs AFTER Yavrio", r: 44, c: 4, rp: 0 },
      { t: "Next month, a webinar with Western Computer", r: 14, c: 1, rp: 1 },
      { t: "Day one of DynamicsMinds wrapped", r: 81, c: 4, rp: 0 },
      { t: "A new partnership between Yavrio and Custom...", r: 32, c: 3, rp: 1 },
      { t: "DynamicsMinds 2026... we're coming, teaming up with...", r: 61, c: 5, rp: 2 }
    ]},
    { name: "Rillion", posts: [
      { t: "We asked 250 CFOs across the Nordics about AI in finance", r: 6, c: 0, rp: 0 },
      { t: "I'm on the hunt for a US native CFO or financial executive", r: 28, c: 19, rp: 4 },
      { t: "Something fun happens when you bring colleagues together from Sweden and the US", r: 16, c: 4, rp: 0 },
      { t: "The Nordic AI Finance Report had zero shortage of 'mic-drop' quotes", r: 7, c: 0, rp: 0 },
      { t: "Rillion's summer celebration was one for the books!", r: 41, c: 4, rp: 0 },
      { t: "Just got back from two of the most energizing days", r: 50, c: 8, rp: 1 },
      { t: "26% of CFOs say lack of AI competence is the single biggest barrier", r: 18, c: 1, rp: 1 },
      { t: "40% of CFOs see fraud and anomaly detection as the biggest AI opportunity", r: 17, c: 1, rp: 2 },
      { t: "Our marketing team swapped their laptops for race bibs", r: 33, c: 3, rp: 1 },
      { t: "(Swedish) En hogre lon racker inte langre", r: 105, c: 2, rp: 1 }
    ]},
    { name: "Fidesic", posts: [
      { t: "Fidesic has officially joined Knights of GP", r: 4, c: 0, rp: 2 },
      { t: "We're excited to share Fidesic has joined Knights of GP", r: 4, c: 0, rp: 2 },
      { t: "Why Accruals and Deferrals Matter for Financial Accuracy", r: 0, c: 0, rp: 0 },
      { t: "Budget pressure? It's AP's time to shine", r: 0, c: 0, rp: 0 },
      { t: "If your team uses Microsoft Dynamics GP or Business Central for multi-entity", r: 2, c: 0, rp: 0 },
      { t: "Feel like you're the only person scrambling at work on Friday?", r: 2, c: 0, rp: 0 },
      { t: "DPO vs. AP Turnover - what the AP Turnover Ratio tells you", r: 0, c: 0, rp: 0 },
      { t: "'Failure to accurately manage payables makes it harder to forecast'", r: 1, c: 0, rp: 0 },
      { t: "Think paper checks are dead? Think again...", r: 2, c: 0, rp: 1 },
      { t: "Does Native Integration make AP Automation easier for BC?", r: 2, c: 0, rp: 0 }
    ]},
    { name: "Tipalti", posts: [
      { t: "Cubic Games was managing over 180 vendors across global markets", r: 6, c: 0, rp: 0 },
      { t: "Manual payment processes don't scale", r: 8, c: 0, rp: 0 },
      { t: "A few days out from World Finance Forum in Amsterdam", r: 4, c: 0, rp: 0 },
      { t: "Day 1 at #IMA2026 in Tampa is in the books", r: 15, c: 0, rp: 3 },
      { t: "'In periods of economic uncertainty, finance teams play a critical role'", r: 4, c: 0, rp: 0 },
      { t: "Hello Tampa! The Tipalti team is on the ground", r: 7, c: 0, rp: 0 },
      { t: "'This is how we've always done it' stops being a reason", r: 2, c: 0, rp: 0 },
      { t: "A massive thank you to everyone at the #BAASS event", r: 37, c: 1, rp: 0 },
      { t: "Engineering teams are entering a fundamentally different operating model", r: 5, c: 0, rp: 0 },
      { t: "At quarter end, Splice's finance team would spend two weeks...", r: 8, c: 0, rp: 0 }
    ]},
    { name: "Stampli", posts: [
      { t: "Strong customer feedback on real value for finance teams", r: 4, c: 0, rp: 3 },
      { t: "Finance teams don't run out of useful questions", r: 18, c: 1, rp: 3 },
      { t: "Market stories become clearer when they show up in operational spend", r: 11, c: 1, rp: 4 },
      { t: "NetSuite 3-way matching often breaks on the item receipt", r: 8, c: 0, rp: 2 },
      { t: "ACH risks don't start at the bank portal", r: 16, c: 3, rp: 7 },
      { t: "Meaningful savings can hide in everyday finance data (Integra Investments)", r: 27, c: 3, rp: 10 },
      { t: "Built to scale your business, not your headcount", r: 24, c: 0, rp: 11 },
      { t: "Vendor concentration risk is hiding in your AP data (Stampli Deep Financials)", r: 11, c: 0, rp: 1 },
      { t: "Day 2 at #SageFuture and the energy is still going strong!", r: 42, c: 1, rp: 1 },
      { t: "Day 1 of #SageFuture in the books", r: 91, c: 1, rp: 5 }
    ]}
  ]
};
