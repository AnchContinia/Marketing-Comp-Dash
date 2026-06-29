/* =========================================================================
   LinkedIn post-engagement data for the Continia competitor dashboard.
   Public engagement on each company's 10 most recent posts (reactions /
   comments / reposts). Totals + averages are computed in dashboard.js from
   these raw posts, so the comparison table can never drift from the source.

   Source: Assets/linkedin_post_engagement_report_Jun 29.txt (captured
   2026-06-29). "t" is the post title (normalized to plain ASCII), "ty" is the
   content type pill. Some posts the export couldn't title show a generic
   "<Type> post" label.

   On the tracking list but deliberately excluded (watch, not card - see
   FULL-UPDATE.md): incedo-inc (consulting firm), signup-software (Truvio's
   former brand, already the ExFlow/Truvio card), stripe (payments benchmark).
   ========================================================================= */

window.LI_DATA = {
  source: "LinkedIn public engagement",
  captured: "2026-06-29",
  windowLabel: "last 10 posts each · public engagement",
  companies: [
    { name: "Continia Software", ours: true, posts: [
      {t:"Our biggest team meetup yet - four days in Cascais, Portugal", ty:"Carousel", r:212, c:3, rp:5},
      {t:"From a full-time AP person to automation in minutes", ty:"Image", r:22, c:0, rp:3},
      {t:"The Elevate tour continues - this time in Poland!", ty:"Carousel", r:65, c:1, rp:0},
      {t:"Kicking off Continia Elevate in the UK", ty:"Video", r:50, c:2, rp:1},
      {t:"We're ISO 27001 certified! (Continia Delivery Network)", ty:"Carousel", r:194, c:2, rp:1},
      {t:"It's about time ... we cycled to work (May commute)", ty:"Carousel", r:69, c:1, rp:0},
      {t:"250 Continia-losninger er en god grund til kage (Softvaerket)", ty:"Carousel", r:70, c:1, rp:2},
      {t:"Carousel post", ty:"Carousel", r:93, c:2, rp:0},
      {t:"Text post", ty:"Text", r:42, c:0, rp:0},
      {t:"Video post", ty:"Video", r:34, c:0, rp:4}
    ]},
    { name: "Truvio", posts: [
      {t:"Your catalogue has 400 products missing SEO descriptions (Dynamo AI)", ty:"Image", r:20, c:1, rp:0},
      {t:"Truvio Commerce Customer Day 2026 in motion! (Godsbanen, Aarhus, DK)", ty:"Video", r:46, c:2, rp:3},
      {t:"When evaluating AP automation, AURA Energi spoke to existing customers", ty:"Image", r:24, c:0, rp:5},
      {t:"AI can only work with the product data you give it (webinar w/ compose'it ApS)", ty:"Image", r:29, c:1, rp:5},
      {t:"Program for Truvio Commerce Partner Days 2026 now live (Aarhus, Sept)", ty:"Video", r:17, c:1, rp:8},
      {t:"Forretning Online conference in Aarhus hosted by Novicell (500+ pros)", ty:"Carousel", r:30, c:2, rp:2},
      {t:"Dynamo is your AI assistant, directly inside Truvio Commerce", ty:"Image", r:40, c:1, rp:6},
      {t:"Text post", ty:"Text", r:12, c:0, rp:2},
      {t:"Image post", ty:"Image", r:49, c:1, rp:1},
      {t:"Video post", ty:"Video", r:7, c:0, rp:0}
    ]},
    { name: "Equisys", posts: [
      {t:"Missed our recent webinar? Catch up now (AP automation)", ty:"Video", r:1, c:0, rp:1},
      {t:"A few hours away from our webinar 'Discover THE BEST AP Automation for Business Central'", ty:"Image", r:0, c:0, rp:1},
      {t:"Less than 24 hours left to register for our webinar (Zetadocs / Business Central)", ty:"Image", r:2, c:0, rp:3},
      {t:"Smarter way to manage employee expenses - book a Zetadocs Expenses demo", ty:"Image", r:3, c:0, rp:3},
      {t:"Sponsoring Directions North America 2026 - thank you", ty:"Carousel", r:12, c:0, rp:2},
      {t:"Amazing first day at Directions North America (booth E-32)", ty:"Image", r:14, c:0, rp:5},
      {t:"In Orlando next week for Directions North America - drop by booth E-32", ty:"Image", r:5, c:0, rp:3},
      {t:"Image post", ty:"Image", r:6, c:0, rp:4},
      {t:"Image post", ty:"Image", r:2, c:0, rp:0},
      {t:"Image post", ty:"Image", r:3, c:0, rp:2}
    ]},
    { name: "Medius", posts: [
      {t:"If July gives you a little breathing room, why not learn something new about AP?", ty:"Text", r:5, c:0, rp:0},
      {t:"Many legacy AP systems weren't built for the complexity of freight charges", ty:"Image", r:17, c:0, rp:2},
      {t:"A new edition of MediusExplains? How AP automation...", ty:"Text", r:6, c:0, rp:1},
      {t:"In a recent webinar, Yvonne Gockel-Jans (Director of Global Partners) joined Antaras", ty:"Text", r:8, c:0, rp:3},
      {t:"Your working capital strategy is only as strong as your invoice execution", ty:"Article/Link", r:6, c:0, rp:0},
      {t:"Named a Leader in the 2026 Gartner Magic Quadrant", ty:"Image", r:120, c:2, rp:30},
      {t:"In 2026, why won't most AP AI pass a serious external test?", ty:"Article/Link", r:10, c:0, rp:2},
      {t:"Rapid growth in logistics masks rising operational complexity", ty:"Text", r:7, c:1, rp:1},
      {t:"AP teams in construction manage hundreds/thousands of suppliers", ty:"Image", r:17, c:0, rp:2},
      {t:"E-invoicing is no longer just a compliance checkbox - it's a competitive edge", ty:"Image", r:11, c:0, rp:5}
    ]},
    { name: "Qvalia", posts: [
      {t:"Introducing Qvalia Connect - business transactions easier, faster, cheaper", ty:"Video", r:18, c:1, rp:2},
      {t:"Timeline of finance tech: 1940s-1980s credit scoring -> 2010s+ big data/ML", ty:"Carousel", r:7, c:0, rp:0},
      {t:"Few areas are better positioned to gain from the AI revolution than finance", ty:"Image", r:5, c:0, rp:0},
      {t:"Summer reading no 4: The definitive guide to Peppol", ty:"Text", r:7, c:0, rp:0},
      {t:"Summer reading no 3: Peppol e-orders - how it works & how to get started", ty:"Text", r:12, c:0, rp:2},
      {t:"Text post", ty:"Text", r:5, c:3, rp:0},
      {t:"Text post", ty:"Text", r:6, c:0, rp:1}
    ]},
    { name: "AMC Banking", posts: [
      {t:"Before summer kicks off - milestone: AMC Banking assigned its own SWIFT BIC", ty:"Image", r:9, c:1, rp:2},
      {t:"Thanks to everybody who showed up for the reception in our new building!", ty:"Carousel", r:29, c:1, rp:0},
      {t:"Your biggest compliance risk might be a process nobody questions anymore", ty:"Article/Link", r:6, c:0, rp:2}
    ]},
    { name: "B2Brouter", posts: [
      {t:"When people hear about Poland's mandatory KSeF, they assume it only affects Polish companies. It doesn't.", ty:"Image", r:0, c:0, rp:0},
      {t:"Global e-invoicing interoperability sounds simple... until every country brings its own local dance", ty:"Text", r:2, c:0, rp:0},
      {t:"Vous facturez deja des administrations/hopitaux via Chorus Pro? (FR)", ty:"Text", r:4, c:0, rp:2},
      {t:"Tu empresa esta preparada para la factura electronica B2B obligatoria? (ES, webinar 2 jul)", ty:"Article/Link", r:5, c:0, rp:0},
      {t:"Interoperability is no longer a future objective. It is becoming the infrastructure behind e-invoicing", ty:"Text", r:1, c:0, rp:0},
      {t:"La factura electronica es una herramienta para que Hacienda lo vea todo? (ES)", ty:"Text", r:8, c:2, rp:1},
      {t:"La factura electronica obligatoria ya tiene marco regulatorio (ES)", ty:"Article/Link", r:3, c:0, rp:0},
      {t:"Electronic invoicing is no longer just about tax compliance, it's about data liquidity", ty:"Text", r:5, c:0, rp:1},
      {t:"B2Brouter attended Peppol Conference Europe 2026 in Brussels", ty:"Carousel", r:15, c:0, rp:2},
      {t:"Eine E-Rechnung zu empfangen bedeutet nicht zwangslaufig, sie auch zu verarbeiten (DE)", ty:"Text", r:2, c:0, rp:1}
    ]},
    { name: "Dooap", posts: [
      {t:"Somewhere right now an AP manager is refreshing their inbox hoping an approval magically appeared", ty:"Image", r:17, c:0, rp:2},
      {t:"We are here - find the team and table next to registration", ty:"Video", r:23, c:2, rp:0},
      {t:"The Dynamics community is coming to Toronto - and so are we (DUG)", ty:"Image", r:16, c:0, rp:1},
      {t:"Excited to introduce our latest Dooap Unleashed: Run With Us - Eftsure!", ty:"Video", r:39, c:2, rp:1},
      {t:"This is what agentic AP automation looks like. Dooap Studio", ty:"Video", r:17, c:0, rp:6},
      {t:"Just think of the possibilities with Dooap Studio!", ty:"Image", r:13, c:0, rp:1},
      {t:"AP automation doesn't stop at the invoice. So why should your tech stack?", ty:"Video", r:71, c:10, rp:3},
      {t:"We saw a clear shift across #DynamicsCon2026 and #DynamicsMinds2026", ty:"Image", r:20, c:0, rp:0},
      {t:"That's a wrap on DynamicsMinds. The Dooap team is heading back", ty:"Carousel", r:70, c:4, rp:0},
      {t:"Great conversations. Great community.", ty:"Video", r:9, c:1, rp:0}
    ]},
    { name: "Yavrio", posts: [
      {t:"For finance teams still importing bank statements by CSV into Microsoft Dynamics", ty:"Text", r:12, c:0, rp:1},
      {t:"We are live now with Western Computer for our joint session on banking in MS Dynamics", ty:"Text", r:6, c:0, rp:0},
      {t:"Meet our North America Sales Director, Joshua Wilkinson!", ty:"Image", r:51, c:5, rp:1},
      {t:"Only 18% of finance teams close their books in three days or less", ty:"Image", r:17, c:1, rp:1},
      {t:"Still moving bank data into your finance system one CSV at a time?", ty:"Video", r:26, c:0, rp:1},
      {t:"The payment is accepted. But is the finance work actually done?", ty:"Image", r:47, c:1, rp:0},
      {t:"What a 2026 Yavrio is having so far! Nearly half way through", ty:"Carousel", r:111, c:9, rp:0},
      {t:"Finance teams BEFORE vs AFTER Yavrio", ty:"Video", r:47, c:4, rp:0},
      {t:"DynamicsMinds 2026 is done and what a week it's been", ty:"Carousel", r:108, c:5, rp:0},
      {t:"Next month, in a webinar with Western Computer...", ty:"Image", r:25, c:2, rp:1}
    ]},
    { name: "Rillion", posts: [
      {t:"While most finance leaders are still figuring out where AI fits, Peter Egehoved (CFO Dreamdata)", ty:"Text", r:6, c:0, rp:0},
      {t:"If you recognise yourself in any of these, you're not alone", ty:"Text", r:7, c:0, rp:0},
      {t:"Big news! Rillion is partnering with Pinewood.AI", ty:"Image", r:43, c:1, rp:10},
      {t:"While everyone's drowning in opinions on where AI belongs in finance", ty:"Text", r:12, c:1, rp:0},
      {t:"The Nordics agree on many things. Great coffee. Flat hierarchies.", ty:"Carousel", r:33, c:1, rp:3},
      {t:"We asked 250 CFOs across the Nordics about AI in finance", ty:"Text", r:8, c:0, rp:0},
      {t:"[searching] I'm on the hunt for a US native CFO or financial exec", ty:"Text", r:33, c:20, rp:4},
      {t:"Something fun happens when you bring colleagues together from Sweden and...", ty:"Video", r:20, c:4, rp:1},
      {t:"The Nordic AI Finance Report had zero shortage of mic-drop quotes", ty:"Text", r:7, c:0, rp:0},
      {t:"Rillion's summer celebration was one for the books!", ty:"Video", r:42, c:4, rp:0}
    ]},
    { name: "Fidesic", posts: [
      {t:"Did you know... The first chatbot was a virtual therapist named ELIZA", ty:"Image", r:1, c:0, rp:1},
      {t:"The Reconcile to GL tool is one of Dynamics GP's most valuable yet underused", ty:"Image", r:1, c:0, rp:0},
      {t:"Wire Transfer vs ACH? Wire transfers are immediate...", ty:"Article/Link", r:0, c:0, rp:0},
      {t:"Financial controls are not red tape. They are the guardrails", ty:"Image", r:0, c:0, rp:0},
      {t:"We're making it easier to test accounting software with unlimited...", ty:"Article/Link", r:0, c:0, rp:0},
      {t:"#FunFactFriday Did you know... the product we know today as Dynamics", ty:"Image", r:3, c:1, rp:0},
      {t:"Fidesic has officially joined Knights of GP", ty:"Image", r:15, c:2, rp:3},
      {t:"Why Accruals and Deferrals Matter for Financial Accuracy", ty:"Image", r:1, c:0, rp:0},
      {t:"Budget pressure? It's AP's time to shine.", ty:"Article/Link", r:0, c:0, rp:0}
    ]},
    { name: "Tipalti", posts: [
      {t:"Paying 50 payees is a task. Paying 5,000 requires a system.", ty:"Text", r:8, c:0, rp:1},
      {t:"One of the reasons we've stayed with Tipalti is how fast payments are", ty:"Image", r:15, c:0, rp:2},
      {t:"Trade fragmentation, high interest rates, tighter capital...", ty:"Image", r:5, c:0, rp:0},
      {t:"A 30-day close used to be normal. Now founders/finance teams have...", ty:"Image", r:10, c:1, rp:1},
      {t:"Finance leaders are operating in a different environment than before", ty:"Image", r:9, c:0, rp:1},
      {t:"DreamHost's finance team wanted what most AP teams want", ty:"Video", r:5, c:0, rp:0},
      {t:"Some of the most impactful companies in the creator economy...", ty:"Image", r:8, c:0, rp:1},
      {t:"Heading to #VidCon this week? Come kick off the week with us", ty:"Image", r:7, c:0, rp:0},
      {t:"One customer used to dread pay runs. Now they don't remember when", ty:"Text", r:5, c:0, rp:0},
      {t:"Tipalti's US offices closed in observance of Juneteenth", ty:"Carousel", r:34, c:1, rp:1}
    ]},
    { name: "Stampli", posts: [
      {t:"Accounts Payable is where Procure-to-Pay either works or breaks (G2)", ty:"Article/Link", r:13, c:0, rp:5},
      {t:"Vendor renewal coming up? A lot can change since the last contract", ty:"Article/Link", r:11, c:1, rp:4},
      {t:"Strong customer feedback on real value for finance teams", ty:"Article/Link", r:33, c:1, rp:15},
      {t:"Finance teams don't run out of useful questions. They run out of practical...", ty:"Article/Link", r:22, c:1, rp:6},
      {t:"Market stories become clearer when they show up in operational spend", ty:"Video", r:11, c:1, rp:4},
      {t:"NetSuite 3-way matching often breaks on one missing piece: the item receipt", ty:"Article/Link", r:8, c:0, rp:2},
      {t:"ACH risks don't start at the bank portal. They often start earlier", ty:"Article/Link", r:17, c:3, rp:7},
      {t:"Meaningful savings can hide in everyday finance data (Integra Investments)", ty:"Image", r:28, c:3, rp:10}
    ]}
  ]
};
