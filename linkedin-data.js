/* =========================================================================
   LinkedIn post-engagement data for the Continia competitor dashboard.
   Public engagement on each company's 10 most recent posts (reactions /
   comments / reposts). Totals + averages are computed in dashboard.js from
   these raw posts, so the comparison table can never drift from the source.

   Source: Assets/linkedin_post_engagement_report_Jun 18.txt (re-scraped
   2026-06-19 08:57). This export includes the real post titles AND the post
   type, so "t" is the actual title (normalized to plain ASCII — the export
   uses math-bold unicode + emoji) and "ty" is the content type (the pill).

   On the tracking list but deliberately excluded (watch, not card — see
   FULL-UPDATE.md): incedo-inc (consulting firm), signup-software (Truvio's
   former brand, already the ExFlow/Truvio card), stripe (payments benchmark).

   How to update: re-capture each company's recent posts, replace the "posts"
   arrays, and bump "captured". Per post:
     t  = post title                 r = reactions
     c  = comments                   rp = reposts
     ty = Image | Video | Carousel | Document | Text | Poll | Event | Article/Link
   ========================================================================= */

window.LI_DATA = {
  source: "LinkedIn public engagement",
  captured: "2026-06-19",
  windowLabel: "last 10 posts each · public engagement",
  companies: [
    { name: "Continia Software", ours: true, posts: [
      { t: "From a full-time AP person to automation in minutes", ty: "Image", r: 22, c: 0, rp: 3 },
      { t: "The Elevate tour continues - this time in Poland!", ty: "Carousel", r: 61, c: 1, rp: 0 },
      { t: "We're ISO 27001 certified", ty: "Carousel", r: 187, c: 2, rp: 1 },
      { t: "It's about time we cycled to work", ty: "Carousel", r: 67, c: 1, rp: 0 },
      { t: "250 Continia-losninger er en god grund til kage", ty: "Carousel", r: 68, c: 1, rp: 2 },
      { t: "Thanks for a great time at DynamicsMinds!", ty: "Carousel", r: 92, c: 2, rp: 0 },
      { t: "Continia is growing - swipe to find your next role", ty: "Document", r: 42, c: 0, rp: 0 },
      { t: "Kicking off Continia Elevate in the UK", ty: "Video", r: 49, c: 2, rp: 1 },
      { t: "Your BC setup is almost there. Why not upgrade it for free?", ty: "Video", r: 34, c: 0, rp: 4 },
      { t: "That's a wrap on Directions ASIA", ty: "Carousel", r: 59, c: 0, rp: 0 }
    ]},
    { name: "Truvio", posts: [
      { t: "I dag er Truvio med til Forretning Online hos Novicell i Aarhus", ty: "Image", r: 34, c: 1, rp: 1 },
      { t: "What does successful B2B eCommerce look like today?", ty: "Image", r: 16, c: 0, rp: 5 },
      { t: "Fraud risk is hiding in everyday finance workflows", ty: "Event", r: 10, c: 0, rp: 0 },
      { t: "Truvio is heading to Toronto", ty: "Image", r: 31, c: 0, rp: 2 },
      { t: "Driving Scalable AP Automation Across a Multi-Entity Forestry Business", ty: "Image", r: 16, c: 0, rp: 4 },
      { t: "AI is changing the way customers discover products", ty: "Image", r: 17, c: 2, rp: 3 },
      { t: "We're attending the Community Summit NA Roadshow in Charlotte, June 9", ty: "Image", r: 17, c: 0, rp: 1 },
      { t: "88% of surveyed manufacturers and wholesalers now sell online", ty: "Image", r: 24, c: 0, rp: 4 },
      { t: "5 Years of Reliable AP Automation!", ty: "Image", r: 19, c: 0, rp: 3 },
      { t: "B2B eCommerce is reshaping how manufacturers grow (Truvio + Sapio Research)", ty: "Event", r: 16, c: 0, rp: 6 }
    ]},
    { name: "Equisys", posts: [
      { t: "Hours away from our webinar 'Discover THE BEST AP Automation Solution for Business Central'", ty: "Image", r: 1, c: 0, rp: 1 },
      { t: "Less than 24 hours left to register for our AP Automation webinar", ty: "Image", r: 2, c: 0, rp: 3 },
      { t: "Last week we sponsored Directions North America 2026!", ty: "Carousel", r: 12, c: 0, rp: 2 },
      { t: "Looking for a smarter way to manage employee expenses? Book a Zetadocs demo", ty: "Image", r: 3, c: 0, rp: 3 },
      { t: "Looking forward to being part of this great event!", ty: "Image", r: 1, c: 0, rp: 0 },
      { t: "This month we're celebrating 15 years of the Equisys blog!", ty: "Document", r: 3, c: 0, rp: 1 },
      { t: "We had an amazing first day at Directions North America", ty: "Image", r: 14, c: 0, rp: 5 },
      { t: "Ready to streamline AP? Discover practical tips for implementation", ty: "Document", r: 2, c: 0, rp: 2 },
      { t: "Recently the team got together in London for our company-wide meet up!", ty: "Carousel", r: 5, c: 0, rp: 0 },
      { t: "We'll be in Orlando, Florida next week for Directions North America", ty: "Image", r: 5, c: 0, rp: 3 }
    ]},
    { name: "Medius", posts: [
      { t: "Rapid growth in logistics often masks a dangerous reality: operational complexity", ty: "Document", r: 6, c: 1, rp: 1 },
      { t: "Accounts Payable teams in construction manage thousands of suppliers", ty: "Image", r: 14, c: 0, rp: 2 },
      { t: "E-invoicing is no longer just a compliance checkbox - it's a competitive edge", ty: "Image", r: 9, c: 0, rp: 3 },
      { t: "Looking forward to this. Hope to see you join us on July 15.", ty: "Image", r: 20, c: 0, rp: 5 },
      { t: "Why won't most of the AI that AP teams ship pass a serious external audit?", ty: "Article/Link", r: 3, c: 0, rp: 1 },
      { t: "Garment manufacturing doesn't slow down for admin", ty: "Image", r: 14, c: 0, rp: 0 },
      { t: "How is AI revolutionizing manufacturing AP processes?", ty: "Image", r: 14, c: 0, rp: 2 },
      { t: "'How do I improve AP without disrupting our ERP?'", ty: "Image", r: 11, c: 0, rp: 2 },
      { t: "A webinar with Antaras (June 11): AI-driven AP automation for Infor LN", ty: "Image", r: 2, c: 1, rp: 1 },
      { t: "Speed used to be the whole AP conversation", ty: "Carousel", r: 59, c: 0, rp: 3 }
    ]},
    { name: "Qvalia", posts: [
      { t: "E-invoicing mandates are becoming infrastructure decisions", ty: "Image", r: 3, c: 0, rp: 0 },
      { t: "The new Billentis report on the global e-invoicing market is here", ty: "Image", r: 6, c: 1, rp: 0 },
      { t: "Slovakia's eFaktura framework is another step in Europe's transition", ty: "Image", r: 20, c: 0, rp: 2 },
      { t: "Qvalia is now certified for Slovakia e-invoicing under eFaktura", ty: "Image", r: 29, c: 1, rp: 5 },
      { t: "Qvalia's Business Continuity Management System is now ISO 22301:2019 certified", ty: "Image", r: 4, c: 0, rp: 0 },
      { t: "Thank you to everyone who joined today's webinar with Docupath", ty: "Carousel", r: 29, c: 3, rp: 3 },
      { t: "Qvalia is now listed in the Cloud Security Alliance STAR Registry", ty: "Image", r: 6, c: 1, rp: 0 },
      { t: "1940s-1980s: Early experiments in credit scoring and fraud detection", ty: "Carousel", r: 7, c: 0, rp: 0 },
      { t: "Summer reading no 4: The definitive guide to Peppol", ty: "Document", r: 7, c: 0, rp: 0 },
      { t: "Summer reading no 3: Peppol e-orders - how it works & how to get started", ty: "Document", r: 11, c: 0, rp: 2 }
    ]},
    { name: "AMC Banking", posts: [
      { t: "Thanks to everybody who showed up for the reception in our new building!", ty: "Carousel", r: 29, c: 1, rp: 0 },
      { t: "Your biggest compliance risk might be a process nobody questions anymore", ty: "Article/Link", r: 6, c: 0, rp: 2 },
      { t: "AMC Banking operates under Service Provider Agreements with selected banks", ty: "Text", r: 9, c: 0, rp: 0 },
      { t: "We're moving and we'd love to celebrate with you", ty: "Event", r: 12, c: 0, rp: 1 },
      { t: "Discover AMC Banking 365 BC - cash management inside Dynamics 365 Business Central", ty: "Video", r: 6, c: 0, rp: 0 },
      { t: "Bank integration: Myth vs reality", ty: "Video", r: 10, c: 0, rp: 3 },
      { t: "The AMC Banking webinar series: demos, new features, use cases and Q&A", ty: "Video", r: 10, c: 0, rp: 1 },
      { t: "You can still register for our reception next week", ty: "Event", r: 0, c: 0, rp: 0 },
      { t: "AMC is expanding and we're looking for a Java developer", ty: "Article/Link", r: 12, c: 0, rp: 3 }
    ]},
    { name: "B2Brouter", posts: [
      { t: "B2Brouter attended Peppol Conference Europe 2026 in Brussels", ty: "Carousel", r: 8, c: 0, rp: 2 },
      { t: "Starting the Peppol Conference 2026!", ty: "Image", r: 54, c: 1, rp: 5 },
      { t: "(German) Eine E-Rechnung zu empfangen bedeutet nicht, sie auch zu verarbeiten", ty: "Poll", r: 0, c: 0, rp: 0 },
      { t: "(Spanish) VeriFactu, Ley Crea y Crece, factura electronica B2B", ty: "Document", r: 8, c: 0, rp: 1 },
      { t: "Peppol is becoming one of the most reliable ways to exchange B2B invoices globally", ty: "Document", r: 6, c: 0, rp: 0 },
      { t: "(German) Germany's e-invoicing roadmap is moving fast - legacy EDI won't be enough", ty: "Image", r: 0, c: 0, rp: 0 },
      { t: "(Spanish) Manana hablaremos sobre la Ley Crea y Crece y la nueva facturacion electronica", ty: "Image", r: 3, c: 0, rp: 0 },
      { t: "(French) Plateformes SaaS juridiques en France : 2026", ty: "Document", r: 4, c: 0, rp: 0 },
      { t: "(Spanish) B2Brouter en el ERP Summit Espana con partners", ty: "Image", r: 40, c: 0, rp: 2 },
      { t: "(German) Germany's B2B e-invoicing roadmap is already moving", ty: "Document", r: 8, c: 2, rp: 1 }
    ]},
    { name: "Dooap", posts: [
      { t: "Somewhere right now, an AP manager is refreshing their inbox hoping an approval appeared", ty: "Image", r: 8, c: 0, rp: 1 },
      { t: "We're here - come chat with us about Agentic AP!", ty: "Video", r: 10, c: 2, rp: 0 },
      { t: "The Dynamics community is coming to Toronto - and so are we", ty: "Image", r: 16, c: 0, rp: 1 },
      { t: "Just think of the possibilities with Dooap Studio!", ty: "Image", r: 13, c: 0, rp: 1 },
      { t: "Well, that's a wrap on DynamicsMinds", ty: "Carousel", r: 69, c: 4, rp: 0 },
      { t: "We saw a clear shift across DynamicsCon and DynamicsMinds", ty: "Image", r: 19, c: 0, rp: 0 },
      { t: "Excited to introduce our latest Dooap Unleashed: Run With Us - Eftsure!", ty: "Video", r: 39, c: 2, rp: 1 },
      { t: "This is what agentic AP automation looks like", ty: "Video", r: 17, c: 0, rp: 6 },
      { t: "AP automation doesn't stop at the invoice. So why should your tech stack?", ty: "Video", r: 71, c: 10, rp: 3 },
      { t: "The biggest problem in finance isn't the system. It's that nobody trusts it.", ty: "Video", r: 21, c: 3, rp: 1 }
    ]},
    { name: "Yavrio", posts: [
      { t: "Only 18% of finance teams close their books in three days or less", ty: "Image", r: 14, c: 1, rp: 0 },
      { t: "Still moving bank data into your finance system one CSV at a time?", ty: "Video", r: 21, c: 0, rp: 1 },
      { t: "The payment is accepted. But is the finance work actually done?", ty: "Image", r: 44, c: 1, rp: 0 },
      { t: "What a 2026 Yavrio is having so far!", ty: "Carousel", r: 102, c: 7, rp: 0 },
      { t: "DynamicsMinds 2026 is done and what a week it's been", ty: "Carousel", r: 106, c: 5, rp: 0 },
      { t: "Day one of DynamicsMinds wrapped and what a start it's been", ty: "Carousel", r: 81, c: 4, rp: 0 },
      { t: "Finance teams BEFORE vs AFTER Yavrio", ty: "Video", r: 44, c: 4, rp: 0 },
      { t: "A webinar with Western Computer: banking and payments embedded inside BC", ty: "Image", r: 18, c: 2, rp: 1 },
      { t: "DynamicsCon 2026 wrapped and what a few days it was!", ty: "Carousel", r: 55, c: 2, rp: 0 },
      { t: "We're on the ground at Directions ASIA 2026 in Vietnam!", ty: "Carousel", r: 68, c: 1, rp: 1 }
    ]},
    { name: "Rillion", posts: [
      { t: "We asked 250 CFOs across the Nordics about AI in finance", ty: "Document", r: 7, c: 0, rp: 0 },
      { t: "[searching...]", ty: "Text", r: 30, c: 20, rp: 4 },
      { t: "The Nordic AI Finance Report had zero shortage of 'mic-drop' quotes", ty: "Text", r: 7, c: 0, rp: 0 },
      { t: "Something fun happens when you bring colleagues together from Sweden and the US", ty: "Video", r: 17, c: 4, rp: 0 },
      { t: "40% of CFOs see fraud and anomaly detection as the biggest AI opportunity", ty: "Image", r: 17, c: 1, rp: 2 },
      { t: "Just got back from two of the most energizing days I've had in a long time!", ty: "Image", r: 50, c: 8, rp: 1 },
      { t: "26% of CFOs say lack of AI competence is the single biggest barrier to adoption", ty: "Text", r: 18, c: 1, rp: 1 },
      { t: "Rillion's summer celebration was one for the books!", ty: "Video", r: 41, c: 4, rp: 0 },
      { t: "Our marketing team swapped their laptops for race bibs - running Blodomloppet", ty: "Carousel", r: 33, c: 3, rp: 1 },
      { t: "(Swedish) En hogre lon racker inte langre", ty: "Image", r: 105, c: 2, rp: 1 }
    ]},
    { name: "Fidesic", posts: [
      { t: "Fidesic has officially joined Knights of GP", ty: "Image", r: 5, c: 0, rp: 2 },
      { t: "Why Accruals and Deferrals Matter for Financial Accuracy", ty: "Image", r: 0, c: 0, rp: 0 },
      { t: "If your team uses Microsoft Dynamics GP or Business Central to manage multiple locations", ty: "Image", r: 2, c: 0, rp: 0 },
      { t: "Feel like you're the only person scrambling at work on Friday?", ty: "Image", r: 2, c: 0, rp: 0 },
      { t: "DPO vs. AP Turnover - what the AP Turnover Ratio tells you", ty: "Image", r: 0, c: 0, rp: 0 },
      { t: "'Failure to accurately manage payables makes it harder to forecast cash flows'", ty: "Image", r: 1, c: 0, rp: 0 },
      { t: "Think paper checks are dead? Think again...", ty: "Image", r: 2, c: 0, rp: 1 },
      { t: "Does Native Integration make AP Automation easier to implement for BC?", ty: "Image", r: 2, c: 0, rp: 0 },
      { t: "Budget pressure? It's AP's time to shine - 5 key strategies to get results fast", ty: "Article/Link", r: 0, c: 0, rp: 0 },
      { t: "Did you know... Doug Burgum mortgaged his farmland to fund Great Plains Software", ty: "Image", r: 7, c: 1, rp: 1 }
    ]},
    { name: "Tipalti", posts: [
      { t: "The next chapter of digital commerce is being executed by AI on behalf of consumers", ty: "Image", r: 3, c: 0, rp: 1 },
      { t: "Cubic Games was managing over 180 vendors across global markets", ty: "Image", r: 6, c: 0, rp: 0 },
      { t: "A few days out from World Finance Forum in Amsterdam", ty: "Image", r: 5, c: 0, rp: 0 },
      { t: "Day 1 at #IMA2026 in Tampa", ty: "Image", r: 15, c: 0, rp: 3 },
      { t: "'In periods of economic uncertainty, finance teams play a critical role'", ty: "Image", r: 4, c: 0, rp: 0 },
      { t: "A massive thank you to everyone at the BAASS event", ty: "Image", r: 37, c: 1, rp: 0 },
      { t: "Engineering teams are entering a fundamentally different operating model", ty: "Image", r: 5, c: 0, rp: 0 },
      { t: "Manual payment processes don't scale", ty: "Text", r: 8, c: 0, rp: 0 },
      { t: "'This is how we've always done it' stops being a reason and starts being an excuse", ty: "Text", r: 2, c: 0, rp: 0 },
      { t: "At quarter end, Splice's finance team spent two weeks processing royalty payments", ty: "Image", r: 8, c: 0, rp: 0 }
    ]},
    { name: "Stampli", posts: [
      { t: "Finance teams don't run out of useful questions. They run out of ways to get answers.", ty: "Article/Link", r: 19, c: 1, rp: 4 },
      { t: "Strong customer feedback on real value for finance teams - one connected P2P story", ty: "Article/Link", r: 25, c: 1, rp: 13 },
      { t: "Meaningful savings can hide in everyday finance data (Integra Investments, Deep Finance)", ty: "Image", r: 27, c: 3, rp: 10 },
      { t: "Market stories become clearer when they show up in operational spend (CNN on SpaceX IPO)", ty: "Video", r: 11, c: 1, rp: 4 },
      { t: "NetSuite 3-way matching often breaks on one missing piece: the item receipt", ty: "Article/Link", r: 8, c: 0, rp: 2 },
      { t: "ACH risks don't start at the bank portal. They often start earlier.", ty: "Article/Link", r: 16, c: 3, rp: 7 },
      { t: "Built to scale your business, not your headcount", ty: "Article/Link", r: 24, c: 0, rp: 11 },
      { t: "We're about to see the death of the dashboard - replaced by interactive AI visualizations", ty: "Image", r: 81, c: 8, rp: 23 },
      { t: "We had a great time at the Nashville career fair", ty: "Carousel", r: 43, c: 1, rp: 5 },
      { t: "Big things are happening at Stampli", ty: "Article/Link", r: 98, c: 2, rp: 5 }
    ]}
  ]
};
