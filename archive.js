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
    {"date":"2026-06-29","linkedin":{"source":"LinkedIn public engagement","captured":"2026-06-29","windowLabel":"last 10 posts each · public engagement","companies":[{"name":"Continia Software","ours":true,"posts":[{"t":"Our biggest team meetup yet - four days in Cascais, Portugal","ty":"Carousel","r":212,"c":3,"rp":5},{"t":"From a full-time AP person to automation in minutes","ty":"Image","r":22,"c":0,"rp":3},{"t":"The Elevate tour continues - this time in Poland!","ty":"Carousel","r":65,"c":1,"rp":0},{"t":"Kicking off Continia Elevate in the UK","ty":"Video","r":50,"c":2,"rp":1},{"t":"We're ISO 27001 certified! (Continia Delivery Network)","ty":"Carousel","r":194,"c":2,"rp":1},{"t":"It's about time ... we cycled to work (May commute)","ty":"Carousel","r":69,"c":1,"rp":0},{"t":"250 Continia-losninger er en god grund til kage (Softvaerket)","ty":"Carousel","r":70,"c":1,"rp":2},{"t":"Carousel post","ty":"Carousel","r":93,"c":2,"rp":0},{"t":"Text post","ty":"Text","r":42,"c":0,"rp":0},{"t":"Video post","ty":"Video","r":34,"c":0,"rp":4}]},{"name":"Truvio","posts":[{"t":"Your catalogue has 400 products missing SEO descriptions (Dynamo AI)","ty":"Image","r":20,"c":1,"rp":0},{"t":"Truvio Commerce Customer Day 2026 in motion! (Godsbanen, Aarhus, DK)","ty":"Video","r":46,"c":2,"rp":3},{"t":"When evaluating AP automation, AURA Energi spoke to existing customers","ty":"Image","r":24,"c":0,"rp":5},{"t":"AI can only work with the product data you give it (webinar w/ compose'it ApS)","ty":"Image","r":29,"c":1,"rp":5},{"t":"Program for Truvio Commerce Partner Days 2026 now live (Aarhus, Sept)","ty":"Video","r":17,"c":1,"rp":8},{"t":"Forretning Online conference in Aarhus hosted by Novicell (500+ pros)","ty":"Carousel","r":30,"c":2,"rp":2},{"t":"Dynamo is your AI assistant, directly inside Truvio Commerce","ty":"Image","r":40,"c":1,"rp":6},{"t":"Text post","ty":"Text","r":12,"c":0,"rp":2},{"t":"Image post","ty":"Image","r":49,"c":1,"rp":1},{"t":"Video post","ty":"Video","r":7,"c":0,"rp":0}]},{"name":"Equisys","posts":[{"t":"Missed our recent webinar? Catch up now (AP automation)","ty":"Video","r":1,"c":0,"rp":1},{"t":"A few hours away from our webinar 'Discover THE BEST AP Automation for Business Central'","ty":"Image","r":0,"c":0,"rp":1},{"t":"Less than 24 hours left to register for our webinar (Zetadocs / Business Central)","ty":"Image","r":2,"c":0,"rp":3},{"t":"Smarter way to manage employee expenses - book a Zetadocs Expenses demo","ty":"Image","r":3,"c":0,"rp":3},{"t":"Sponsoring Directions North America 2026 - thank you","ty":"Carousel","r":12,"c":0,"rp":2},{"t":"Amazing first day at Directions North America (booth E-32)","ty":"Image","r":14,"c":0,"rp":5},{"t":"In Orlando next week for Directions North America - drop by booth E-32","ty":"Image","r":5,"c":0,"rp":3},{"t":"Image post","ty":"Image","r":6,"c":0,"rp":4},{"t":"Image post","ty":"Image","r":2,"c":0,"rp":0},{"t":"Image post","ty":"Image","r":3,"c":0,"rp":2}]},{"name":"Medius","posts":[{"t":"If July gives you a little breathing room, why not learn something new about AP?","ty":"Text","r":5,"c":0,"rp":0},{"t":"Many legacy AP systems weren't built for the complexity of freight charges","ty":"Image","r":17,"c":0,"rp":2},{"t":"A new edition of MediusExplains? How AP automation...","ty":"Text","r":6,"c":0,"rp":1},{"t":"In a recent webinar, Yvonne Gockel-Jans (Director of Global Partners) joined Antaras","ty":"Text","r":8,"c":0,"rp":3},{"t":"Your working capital strategy is only as strong as your invoice execution","ty":"Article/Link","r":6,"c":0,"rp":0},{"t":"Named a Leader in the 2026 Gartner Magic Quadrant","ty":"Image","r":120,"c":2,"rp":30},{"t":"In 2026, why won't most AP AI pass a serious external test?","ty":"Article/Link","r":10,"c":0,"rp":2},{"t":"Rapid growth in logistics masks rising operational complexity","ty":"Text","r":7,"c":1,"rp":1},{"t":"AP teams in construction manage hundreds/thousands of suppliers","ty":"Image","r":17,"c":0,"rp":2},{"t":"E-invoicing is no longer just a compliance checkbox - it's a competitive edge","ty":"Image","r":11,"c":0,"rp":5}]},{"name":"Qvalia","posts":[{"t":"Introducing Qvalia Connect - business transactions easier, faster, cheaper","ty":"Video","r":18,"c":1,"rp":2},{"t":"Timeline of finance tech: 1940s-1980s credit scoring -> 2010s+ big data/ML","ty":"Carousel","r":7,"c":0,"rp":0},{"t":"Few areas are better positioned to gain from the AI revolution than finance","ty":"Image","r":5,"c":0,"rp":0},{"t":"Summer reading no 4: The definitive guide to Peppol","ty":"Text","r":7,"c":0,"rp":0},{"t":"Summer reading no 3: Peppol e-orders - how it works & how to get started","ty":"Text","r":12,"c":0,"rp":2},{"t":"Text post","ty":"Text","r":5,"c":3,"rp":0},{"t":"Text post","ty":"Text","r":6,"c":0,"rp":1}]},{"name":"AMC Banking","posts":[{"t":"Before summer kicks off - milestone: AMC Banking assigned its own SWIFT BIC","ty":"Image","r":9,"c":1,"rp":2},{"t":"Thanks to everybody who showed up for the reception in our new building!","ty":"Carousel","r":29,"c":1,"rp":0},{"t":"Your biggest compliance risk might be a process nobody questions anymore","ty":"Article/Link","r":6,"c":0,"rp":2}]},{"name":"B2Brouter","posts":[{"t":"When people hear about Poland's mandatory KSeF, they assume it only affects Polish companies. It doesn't.","ty":"Image","r":0,"c":0,"rp":0},{"t":"Global e-invoicing interoperability sounds simple... until every country brings its own local dance","ty":"Text","r":2,"c":0,"rp":0},{"t":"Vous facturez deja des administrations/hopitaux via Chorus Pro? (FR)","ty":"Text","r":4,"c":0,"rp":2},{"t":"Tu empresa esta preparada para la factura electronica B2B obligatoria? (ES, webinar 2 jul)","ty":"Article/Link","r":5,"c":0,"rp":0},{"t":"Interoperability is no longer a future objective. It is becoming the infrastructure behind e-invoicing","ty":"Text","r":1,"c":0,"rp":0},{"t":"La factura electronica es una herramienta para que Hacienda lo vea todo? (ES)","ty":"Text","r":8,"c":2,"rp":1},{"t":"La factura electronica obligatoria ya tiene marco regulatorio (ES)","ty":"Article/Link","r":3,"c":0,"rp":0},{"t":"Electronic invoicing is no longer just about tax compliance, it's about data liquidity","ty":"Text","r":5,"c":0,"rp":1},{"t":"B2Brouter attended Peppol Conference Europe 2026 in Brussels","ty":"Carousel","r":15,"c":0,"rp":2},{"t":"Eine E-Rechnung zu empfangen bedeutet nicht zwangslaufig, sie auch zu verarbeiten (DE)","ty":"Text","r":2,"c":0,"rp":1}]},{"name":"Dooap","posts":[{"t":"Somewhere right now an AP manager is refreshing their inbox hoping an approval magically appeared","ty":"Image","r":17,"c":0,"rp":2},{"t":"We are here - find the team and table next to registration","ty":"Video","r":23,"c":2,"rp":0},{"t":"The Dynamics community is coming to Toronto - and so are we (DUG)","ty":"Image","r":16,"c":0,"rp":1},{"t":"Excited to introduce our latest Dooap Unleashed: Run With Us - Eftsure!","ty":"Video","r":39,"c":2,"rp":1},{"t":"This is what agentic AP automation looks like. Dooap Studio","ty":"Video","r":17,"c":0,"rp":6},{"t":"Just think of the possibilities with Dooap Studio!","ty":"Image","r":13,"c":0,"rp":1},{"t":"AP automation doesn't stop at the invoice. So why should your tech stack?","ty":"Video","r":71,"c":10,"rp":3},{"t":"We saw a clear shift across #DynamicsCon2026 and #DynamicsMinds2026","ty":"Image","r":20,"c":0,"rp":0},{"t":"That's a wrap on DynamicsMinds. The Dooap team is heading back","ty":"Carousel","r":70,"c":4,"rp":0},{"t":"Great conversations. Great community.","ty":"Video","r":9,"c":1,"rp":0}]},{"name":"Yavrio","posts":[{"t":"For finance teams still importing bank statements by CSV into Microsoft Dynamics","ty":"Text","r":12,"c":0,"rp":1},{"t":"We are live now with Western Computer for our joint session on banking in MS Dynamics","ty":"Text","r":6,"c":0,"rp":0},{"t":"Meet our North America Sales Director, Joshua Wilkinson!","ty":"Image","r":51,"c":5,"rp":1},{"t":"Only 18% of finance teams close their books in three days or less","ty":"Image","r":17,"c":1,"rp":1},{"t":"Still moving bank data into your finance system one CSV at a time?","ty":"Video","r":26,"c":0,"rp":1},{"t":"The payment is accepted. But is the finance work actually done?","ty":"Image","r":47,"c":1,"rp":0},{"t":"What a 2026 Yavrio is having so far! Nearly half way through","ty":"Carousel","r":111,"c":9,"rp":0},{"t":"Finance teams BEFORE vs AFTER Yavrio","ty":"Video","r":47,"c":4,"rp":0},{"t":"DynamicsMinds 2026 is done and what a week it's been","ty":"Carousel","r":108,"c":5,"rp":0},{"t":"Next month, in a webinar with Western Computer...","ty":"Image","r":25,"c":2,"rp":1}]},{"name":"Rillion","posts":[{"t":"While most finance leaders are still figuring out where AI fits, Peter Egehoved (CFO Dreamdata)","ty":"Text","r":6,"c":0,"rp":0},{"t":"If you recognise yourself in any of these, you're not alone","ty":"Text","r":7,"c":0,"rp":0},{"t":"Big news! Rillion is partnering with Pinewood.AI","ty":"Image","r":43,"c":1,"rp":10},{"t":"While everyone's drowning in opinions on where AI belongs in finance","ty":"Text","r":12,"c":1,"rp":0},{"t":"The Nordics agree on many things. Great coffee. Flat hierarchies.","ty":"Carousel","r":33,"c":1,"rp":3},{"t":"We asked 250 CFOs across the Nordics about AI in finance","ty":"Text","r":8,"c":0,"rp":0},{"t":"[searching] I'm on the hunt for a US native CFO or financial exec","ty":"Text","r":33,"c":20,"rp":4},{"t":"Something fun happens when you bring colleagues together from Sweden and...","ty":"Video","r":20,"c":4,"rp":1},{"t":"The Nordic AI Finance Report had zero shortage of mic-drop quotes","ty":"Text","r":7,"c":0,"rp":0},{"t":"Rillion's summer celebration was one for the books!","ty":"Video","r":42,"c":4,"rp":0}]},{"name":"Fidesic","posts":[{"t":"Did you know... The first chatbot was a virtual therapist named ELIZA","ty":"Image","r":1,"c":0,"rp":1},{"t":"The Reconcile to GL tool is one of Dynamics GP's most valuable yet underused","ty":"Image","r":1,"c":0,"rp":0},{"t":"Wire Transfer vs ACH? Wire transfers are immediate...","ty":"Article/Link","r":0,"c":0,"rp":0},{"t":"Financial controls are not red tape. They are the guardrails","ty":"Image","r":0,"c":0,"rp":0},{"t":"We're making it easier to test accounting software with unlimited...","ty":"Article/Link","r":0,"c":0,"rp":0},{"t":"#FunFactFriday Did you know... the product we know today as Dynamics","ty":"Image","r":3,"c":1,"rp":0},{"t":"Fidesic has officially joined Knights of GP","ty":"Image","r":15,"c":2,"rp":3},{"t":"Why Accruals and Deferrals Matter for Financial Accuracy","ty":"Image","r":1,"c":0,"rp":0},{"t":"Budget pressure? It's AP's time to shine.","ty":"Article/Link","r":0,"c":0,"rp":0}]},{"name":"Tipalti","posts":[{"t":"Paying 50 payees is a task. Paying 5,000 requires a system.","ty":"Text","r":8,"c":0,"rp":1},{"t":"One of the reasons we've stayed with Tipalti is how fast payments are","ty":"Image","r":15,"c":0,"rp":2},{"t":"Trade fragmentation, high interest rates, tighter capital...","ty":"Image","r":5,"c":0,"rp":0},{"t":"A 30-day close used to be normal. Now founders/finance teams have...","ty":"Image","r":10,"c":1,"rp":1},{"t":"Finance leaders are operating in a different environment than before","ty":"Image","r":9,"c":0,"rp":1},{"t":"DreamHost's finance team wanted what most AP teams want","ty":"Video","r":5,"c":0,"rp":0},{"t":"Some of the most impactful companies in the creator economy...","ty":"Image","r":8,"c":0,"rp":1},{"t":"Heading to #VidCon this week? Come kick off the week with us","ty":"Image","r":7,"c":0,"rp":0},{"t":"One customer used to dread pay runs. Now they don't remember when","ty":"Text","r":5,"c":0,"rp":0},{"t":"Tipalti's US offices closed in observance of Juneteenth","ty":"Carousel","r":34,"c":1,"rp":1}]},{"name":"Stampli","posts":[{"t":"Accounts Payable is where Procure-to-Pay either works or breaks (G2)","ty":"Article/Link","r":13,"c":0,"rp":5},{"t":"Vendor renewal coming up? A lot can change since the last contract","ty":"Article/Link","r":11,"c":1,"rp":4},{"t":"Strong customer feedback on real value for finance teams","ty":"Article/Link","r":33,"c":1,"rp":15},{"t":"Finance teams don't run out of useful questions. They run out of practical...","ty":"Article/Link","r":22,"c":1,"rp":6},{"t":"Market stories become clearer when they show up in operational spend","ty":"Video","r":11,"c":1,"rp":4},{"t":"NetSuite 3-way matching often breaks on one missing piece: the item receipt","ty":"Article/Link","r":8,"c":0,"rp":2},{"t":"ACH risks don't start at the bank portal. They often start earlier","ty":"Article/Link","r":17,"c":3,"rp":7},{"t":"Meaningful savings can hide in everyday finance data (Integra Investments)","ty":"Image","r":28,"c":3,"rp":10}]}]},"news":{"events":[{"w":"Sept 2026 →","c":"steady","t":"<b>France B2B e-invoicing</b> mandate takes effect — large and mid-size companies must send and receive structured e-invoices. SMEs follow September 2027."},{"w":"Jul 1, 2026","c":"steady","t":"<b>UAE e-invoicing</b> rollout begins for large businesses (revenue ≥ AED 50M); <b>Pagero</b> is listed as a pre-approved accredited service provider."},{"w":"Jun 30, 2026","c":"steady","t":"<b>Saudi Arabia (ZATCA)</b> Fatoora e-invoicing Wave 24 integration deadline — the first wave to reach businesses with VAT revenue above SAR 375K, pulling thousands of smaller firms into mandatory clearance."},{"w":"June 23, 2026","c":"ai","t":"<b>Gartner</b> publishes its 2026 Magic Quadrant for Accounts Payable Applications — <b>Medius</b> is named a Leader (alongside Basware, Coupa and Esker)."},{"w":"June 19, 2026","c":"ai","t":"<b>Microsoft</b> extends the BC Expense Agent (2026 Wave 1) with an AI approval step — it validates expense reports against plain-language policies and guides approvers (public preview Jul 2026)."},{"w":"June 16, 2026","c":"ai","t":"<b>Forrester</b> publishes <i>The Forrester Wave: AP Invoice Automation Software, Q2 2026</i> — agentic AI shifts AP from automation toward proactive, autonomous finance operations."},{"w":"June 9, 2026","c":"cons","t":"<b>AvidXchange</b> launches Payment Automation for Workday on the Workday Marketplace — extending its 1.5M-supplier AvidPay network into Workday Financial Management."},{"w":"June 4, 2026","c":"cons","t":"<b>Lasernet Group</b> (formerly Formpipe Software) receives a recommended SEK 30/share public cash takeover from a PE-led Tabellae BidCo consortium (~SEK 879M, +53.8%); the board backs it, acceptance 22 Jun–22 Jul 2026."},{"w":"June 2, 2026","c":"ai","t":"<b>Microsoft Build 2026</b> reframes the PC as an agentic OS — Windows Agent Framework open-sourced, Office Agent Mode runs agents natively."},{"w":"June 2026","c":"ai","t":"<b>Truvio</b> (formerly SignUp Software/ExFlow) completes its rebrand and ships TruvioSense Coding & Approval — AI/LLM invoice-coding suggestions in D365 F&O."},{"w":"May 11, 2026","c":"ai","t":"<b>Dooap</b> launches Dooap Studio — agentic AI platform."},{"w":"May 13, 2026","c":"steady","t":"<b>Zetadocs</b> Expenses May update (cloud, browser, iOS, Android)."},{"w":"Apr 30, 2026","c":"ai","t":"<b>BC 2026 Wave 1</b> ships two GA AI agents and MCP Server support — custom AL agents can now be built natively inside Business Central."},{"w":"Apr 28, 2026","c":"ai","t":"<b>Tungsten</b> previews TotalAgility 2026.2 with agentic AI features (London Summit)."},{"w":"Apr 28, 2026","c":"ai","t":"<b>Microsoft</b> introduces Expense Agent native to Business Central — AI-expense from the platform owner itself."},{"w":"Apr 14, 2026","c":"ai","t":"<b>Forrester</b> publishes Top Agentic AI Use Cases for AP 2026 — warns that agentic branding is widespread but real autonomy is rare; evaluators should prioritise production metrics over demos."},{"w":"Apr 2026","c":"ai","t":"<b>Tipalti</b> expands agentic AI to include tariff-refund processing."},{"w":"Mar 31, 2026","c":"ai","t":"<b>Stampli</b> launches Deep Finance — turning invoice data into consultant-grade executive spend intelligence."},{"w":"Early 2026","c":"ai","t":"<b>Medius</b> named Market Leader + Elite Performer for AI Innovation (Ardent Partners 2026)."},{"w":"Jan 22, 2026","c":"cons","t":"<b>Pagero</b> (Thomson Reuters) and Deloitte launch global e-invoicing alliance."},{"w":"Jan 21, 2026","c":"cons","t":"<b>onPhase</b> (DocuPhase) acquires enterprise AP player iPayables."},{"w":"Jan 20, 2026","c":"ai","t":"<b>Tungsten</b> hires new executives including its first Chief AI Officer."},{"w":"Jan 2026","c":"cons","t":"<b>ExFlow</b>/SignUp new F&O version; SignUp acquires DynamicWeb (e-commerce/PIM)."},{"w":"Jan 1, 2026","c":"steady","t":"<b>E-invoicing mandate</b> in Belgium takes effect — structured invoice via Peppol required."},{"w":"Oct 15, 2025","c":"cons","t":"<b>AvidXchange</b> taken private by TPG + Corpay for ~$2.2B."},{"w":"Autumn 2025","c":"ai","t":"<b>Tipalti</b> raises $200M (Hercules Capital) earmarked for AI."},{"w":"2025","c":"steady","t":"<b>Lasernet</b> (Formpipe) launches new BC connector with 20+ report types."},{"w":"Sep 2025","c":"ai","t":"<b>Dooap</b> achieves Microsoft Certified Software designation."}]},"competitors":[{"n":"ExFlow","o":"Truvio (formerly SignUp Software) · Stockholm","stance":"cons","sl":"Rebranded → Truvio + AI","prox":"High","cat":"AP automation · D365 F&O + BC","head":"Rebrand to Truvio complete — ExFlow, Axtension, DynamicWeb and SKSoft unified into one Microsoft-native portfolio, now shipping its own AI.","rel":"June 2026: AP Automation (powered by ExFlow) 2.19.0 for D365 F&O adds “TruvioSense Coding & Approval” — AI/LLM coding suggestions from previously approved invoices.","str":"Rebranded SignUp Software → Truvio, unifying ExFlow/Axtension/DynamicWeb/SKSoft into one D365-native suite (beyond pure AP).","pos":"Fully embedded/native in Dynamics — no third-party system.","ai":"TruvioSense adds LLM-based invoice interpretation + coding suggestions on top of the existing ML Predictions.","sc":"150+ employees · 1,300+ organisations","s":[["Truvio: What's New","https://truvio.com/whats-new"],["Rebrand","https://enterprisesoftwareexpress.com/signup-software-signs-up-for-a-new-name/"],["Release notes","https://docs.signupsoftware.com/finance-operations/docs/user-manual/whats-new-and-planned/release-notes"]]},{"n":"Dooap","o":"Dooap · Austin (Pagero)","stance":"ai","sl":"AI-aggressive","prox":"High","cat":"AP automation · D365 Finance (F&O)","head":"Launched a dedicated agentic AI product — the most offensive AI move in the space.","rel":"Dooap Studio, May 11 2026 — AP teams design and govern their own AI agents without IT.","str":"Agents for GL coding, PO matching, fraud and routing — with rationale, confidence score and audit trail.","pos":"Mobile-first, cloud-native — message: “AI you control.”","ai":"A standalone agent product, not just AI features.","sc":"Microsoft Certified Software (Sep 2025)","s":[["Dooap Studio (PR)","https://www.prnewswire.com/news-releases/dooap-inc-launches-dooap-studio-putting-agentic-ap-automation-directly-in-the-hands-of-finance-teams-302768534.html"],["YouTube","https://www.youtube.com/@dooap"]]},{"n":"Zetadocs","o":"Equisys","stance":"steady","sl":"Stable cadence","prox":"High","cat":"Delivery · Capture · Expenses · BC","head":"Consistent monthly release cadence; AI embedded in the core rather than big announcements.","rel":"Delivery & Capture updated Jan, Mar and May 2026; Expenses May 2026 (cloud, browser, iOS, Android).","str":"Three product lines kept in sync at a high release cadence.","pos":"Everything happens inside Business Central — one environment, less friction.","ai":"AI-driven data entry + automatic order/invoice matching.","sc":"3 product lines (Delivery · Capture · Expenses)","s":[["May 2026 update","https://www.equisys.com/blog/whats-new-in-zetadocs-expenses-may-2026-update"],["Equisys blog","https://www.equisys.com/blog"]]},{"n":"Medius","o":"Medius","stance":"ai","sl":"Gartner MQ Leader","prox":"Medium","cat":"AP automation + spend/payments · multi-ERP","head":"Analyst-anointed AP leader — 2026 Gartner Magic Quadrant Leader + Ardent Elite Performer for AI Innovation; deep, autonomous AI across the full AP lifecycle.","rel":"Named a Leader in the 2026 Gartner Magic Quadrant for Accounts Payable Applications (Jun 23, 2026); also Ardent Partners 2026 Market Leader + Elite Performer for AI Innovation.","str":"SmartFlow (proprietary CNN), Medius Copilot, Supplier Conversations (autonomous email handling), “AI workmate”.","pos":"“Autonomous AP” — the finance team stays in control; own models rather than expensive LLMs for core work.","ai":"Claims to have the most of the AP/payments lifecycle automated with AI.","sc":"4,000+ customers · 102 countries · $200B spend/year","s":[["Gartner MQ 2026 (Medius)","https://www.prnewswire.com/news-releases/medius-placed-in-2026-gartner-magic-quadrant-for-accounts-payable-applications-302807993.html"],["Medius AI advantage","https://www.medius.com/ai-innovation/medius-ai-advantage/"],["Ardent 2026","https://www.medius.com/resources/guides-reports/2026-ap-automation-payments-technology-advisor/"]]},{"n":"Tipalti","o":"Tipalti · Foster City","stance":"ai","sl":"AI + capital","prox":"Low","cat":"Payables + global payments + procurement + expenses","head":"Raised $200M for AI; rolling out agents across the entire finance flow.","rel":"AI Assistant + AI agents (Invoice Capture, Bill Approvers, reporting, tax, purchase request); tariff-refund AI (Apr 2026).","str":"$200M round (Hercules, autumn 2025) earmarked for AI; agentic focus.","pos":"End-to-end payables + global payments in 200+ countries.","ai":"Conversational assistant + autonomous agents embedded across the entire platform.","sc":"~$75B payments/year","s":[["Tipalti AI agents","https://tipalti.com/accounts-payable-software/finance-ai/"],["American Banker","https://www.americanbanker.com/payments/news/tipalti-enhances-ai-tech-to-improve-tariff-refund-processing"]]},{"n":"Yooz","o":"Yooz · Dallas","stance":"ai","sl":"AI + fraud","prox":"Medium","cat":"AP / P2P automation · multi-ERP","head":"AI/Deep Learning P2P with a strong fraud focus; active in the BC and GP ecosystem.","rel":"YoozProtect (fraud, NA launch Jan 2026); Line-Level Matching (2025); Yooz 2026 AI in Finance report.","str":"AI + RPA + Big Data; fraud prevention as spearhead.","pos":"Simple, fast, secure cloud P2P; unlimited users.","ai":"Smart data extraction, routing and fraud detection.","sc":"5,000+ customers · 300,000 users","s":[["YoozProtect","https://www.getyooz.com/blog/yooz-protect-launch"],["Yooz + BC/GP","https://msdynamicsworld.com/blog/two-days-two-erps-how-yooz-powering-ap-automation-gp-and-business-central"]]},{"n":"Stampli","o":"Stampli · Mountain View","stance":"ai","sl":"AI veteran","prox":"Low","cat":"AP automation (invoice-centric) · 70+ ERPs","head":"AI (“Billy the Bot”) at the core for nearly 10 years; raised capital from Blackstone.","rel":"Stampli Deep Finance (Mar 2026) turns invoice data into consultant-grade executive spend intelligence; Stampli Card / Direct Pay; $61M Blackstone Series D (~$148M total); named a G2 Summer 2026 Leader for P2P + AP Automation (Jun 2026).","str":"Invoice-centric communication + “AI employee”.","pos":"Fast implementation (weeks, not months); approvers need no ERP access.","ai":"Positions itself on “proven” AI for capture, coding, routing, duplicates and fraud.","sc":"1,600+ customers · $80–85B invoices/year","s":[["Stampli AP","https://www.stampli.com/ap-automation/"],["Deep Finance","https://www.prnewswire.com/news-releases/stampli-launches-deep-finance-turning-invoice-data-into-executive-spend-intelligence-302729234.html"],["Blackstone funding","https://financialit.net/news/fundraising-news/stampli-secures-61m-advanced-ai-powered-ap-automation"]]},{"n":"AvidXchange","o":"TPG + Corpay · Charlotte","stance":"cons","sl":"Acquired (payments)","prox":"Low","cat":"AP + payment automation · mid-market","head":"Taken private by TPG + Corpay (~$2.2B, Oct 2025) — pointing toward payment rails.","rel":"Launched Payment Automation for Workday on the Workday Marketplace (Jun 2026); new COO Wade Fairey (Jun 2026); AI fraud/BEC detection in the AvidPay network.","str":"Take-private; Corpay stake → focus on payment volume and interchange.","pos":"Mid-market invoice-to-pay + AvidPay payment network.","ai":"AI for fraud/anomaly detection; later on the AI curve than pure AI players.","sc":"~$450M revenue · 25+ years of history","s":[["TPG/Corpay close","https://www.avidxchange.com/press-releases/tpg-corpay-complete-acquisition-of-avidxchange/"],["Workday integration","https://www.globenewswire.com/news-release/2026/06/09/3309047/37161/en/AvidXchange-Completes-Workday-Integration.html"],["Payments Dive","https://www.paymentsdive.com/news/avidxchange-tpg-corpay-accounts-payable-payments/747520/"]]},{"n":"Compleat","o":"Compleat Software · UK","stance":"steady","sl":"SMB / price","prox":"Low","cat":"P2P / AP automation + online buying","head":"Affordable P2P for smaller businesses; UK/EMEA focus, not Dynamics-first.","rel":"Capture + approval workflows + online buying; integration with Sage, Xero, QuickBooks.","str":"Affordable SaaS for all sizes; procurement + AP combined.","pos":"Cheap, simple access (subscription from a low price point).","ai":"AI-OCR for capture/coding — significantly less AI marketing than the big players.","sc":"500+ companies · EMEA/APAC/AMAC","s":[["Zone&Co 2026","https://www.zoneandco.com/articles/top-16-ap-automation-software-solutions-in-2026"],["Capterra","https://www.capterra.com/p/88208/Compleat-Purchase-to-Pay/"]]},{"n":"Tungsten Automation","o":"formerly Kofax · Irvine","stance":"ai","sl":"AI catch-up","prox":"Low","cat":"IDP / RPA + AP (InvoiceAgility)","head":"Rebranded from Kofax; betting hard on agentic AI to close the gap.","rel":"TotalAgility now GA in three tiers (Standard/Advanced/Enterprise) with agentic AI, Quick AI Agents and multi-agent orchestration; quarterly releases from 2026; InvoiceAgility for AP.","str":"Jan 2026: new executives incl. first Chief AI Officer; “AI-first” repositioning. CEO signals a possible 2027 exit (PE or strategic sale) as the sector consolidates (Jun 2026).","pos":"Broad intelligent automation (document/workflow) — large IDP revenue base.","ai":"Agentic AI now shipping (multi-agent orchestration); analysts said it was 9–12 months behind — now closing the gap.","sc":"~40 years of history · 70+ countries","s":[["TotalAgility platform","https://www.tungstenautomation.com/products/totalagility/release-highlights"],["Agentic AI hires","https://www.tungstenautomation.com/about/press-releases/2026/tungsten-automation-invests-in-innovation-and-agentic-ai-with-key-executive-hires"],["Deep Analysis","https://www.deep-analysis.net/boring-ai-how-tungsten-plans-to-move-beyond-its-idp-roots/"],["Exit signal (ION)","https://ionanalytics.com/insights/mergermarket/tungsten-automation-exit-possible-in-2027-as-buyer-appetite-builds-ceo/"]]},{"n":"onPhase","o":"formerly DocuPhase · Tampa","stance":"cons","sl":"Acquisitive + rebrand","prox":"Low","cat":"AP + payments + document management","head":"Rebranded from DocuPhase; growing through acquisitions and embedded payments.","rel":"Acquisition of iPayables (Jan 2026) + Clearwater Payments; Bottomline Paymode network embedded.","str":"AI-driven AP + embedded payments; 173% 3-year growth (Inc. 5000).","pos":"Unified finance automation for SMB → enterprise.","ai":"AI-driven capture/automation combined with payments.","sc":"Fast-growing · NetSuite-centric + others","s":[["onPhase news","https://www.onphase.com/news"],["Accounting automation","https://www.docuphase.com/accounting-automation"]]},{"n":"MineralTree","o":"Global Payments · Boston","stance":"cons","sl":"Payments-owned","prox":"Low","cat":"AP + payment automation · multi-ERP","head":"Owned by payments giant Global Payments; strength in multi-currency/international payments.","rel":"Multi-currency (TransferMate, 130+ currencies); enterprise multi-ERP focus.","str":"Part of Global Payments ($500M acquisition) → payment monetisation.","pos":"End-to-end invoice-to-pay, fraud protection, multi-ERP.","ai":"Less AI profiling; focus on payments and visibility.","sc":"3,000+ companies · mid-market → Fortune 500","s":[["Global Payments acq.","https://investors.globalpayments.com/news-events/press-releases/detail/23/global-payments-agrees-to-acquire-mineraltree-a-leader-in"],["Crunchbase","https://www.crunchbase.com/organization/mineraltree"]]},{"n":"Dime Scheduler","o":"Dime Software (Dimenics) · BE","stance":"steady","sl":"Adjacent (scheduling)","prox":"High","cat":"Visual resource/project planning · BC","head":"BC-native, but in a different category (scheduling) — ISV neighbour, not a direct AP rival.","rel":"Real-time BC sync, Gantt, drag-drop, capacity pivot, map/route planning; Outlook/Exchange sync.","str":"Visual planning layer on top of BC/NAV/CRM/Power Platform.","pos":"“Stop guessing, start planning” — easy to implement (~5 days).","ai":"Limited AI profile; strength is visual planning.","sc":"Subscription from ~€50/year · many languages","s":[["Features","https://www.dimescheduler.com/features"],["Microsoft Marketplace","https://marketplace.microsoft.com/en-us/product/web-apps/dimenics-3435744.dimescheduler"]]},{"n":"Microsoft Expense Agent","o":"Microsoft · native in BC","stance":"ai","sl":"Platform owner · AI","prox":"High","cat":"AI expense capture · native in Business Central","head":"The platform owner itself moving into the expense space with an AI agent — the most important BC-native development to watch.","rel":"Expense Agent introduced in D365 BC (Apr 2026); BC 2026 Wave 1 adds (Jun 19, 2026) an AI approval step that validates expense reports against company policies written in plain language and guides approvers — public preview Jul 2026.","str":"Microsoft building AI functionality directly into BC, overlapping with third-party expense solutions.","pos":"Native to the platform — no extra vendor, comes with Business Central.","ai":"AI expense agent embedded in the ERP — now also checks reports against natural-language policies at line, report and cross-line level, while leaving the final call to the approver.","sc":"Built into Microsoft Dynamics 365 Business Central","s":[["Microsoft blog","https://www.microsoft.com/en-us/dynamics-365/blog/it-professional/2026/04/27/expense-agent-dynamics-365-business-central/"],["Approval process (BC 2026 W1)","https://www.azurecurve.co.uk/2026/06/new-functionality-in-microsoft-dynamics-365-business-central-2026-wave-1-expense-agent-supports-approval-process/"]]},{"n":"Lasernet","o":"Lasernet Group · DK/UK","stance":"cons","sl":"Takeover bid · BC output","prox":"High","cat":"Document output & e-invoicing · BC + F&O","head":"BC-native output engine (rival to Continia Document Output) — now itself a take-private target under a recommended SEK 30/share cash offer.","rel":"Under a recommended public cash takeover — Tabellae BidCo (Valedo Partners + Mission Trail + Grenspecialisten) bids SEK 30/share (~SEK 879M, +53.8% premium); the board recommends it, acceptance runs 22 Jun–22 Jul 2026. Lasernet for BC stays live on AppSource (20+ report types, Azure AI mapping); Temenos Exchange Partner of the Year 2026; joined the IFS partner network.","str":"Formpipe Software AB renamed itself Lasernet Group AB (Nasdaq Stockholm ticker LASER, trading from Jun 9, 2026), focused solely on the Lasernet platform — now being taken private by a PE-led consortium.","pos":"Embedded in BC — design, send and archive documents without leaving the ERP.","ai":"Azure AI for data mapping; primarily strong on output/compliance rather than AI marketing.","sc":"20+ years of document expertise · global","s":[["Lasernet Group","https://www.lasernetgroup.com/news-blogs/bc-connector-now-on-appsource"],["Takeover offer (advisor)","https://www.abgsc.com/abgsc-is-acting-as-exclusive-financial-advisor-to-formpipe-software-ab-in-connection-with-the-public-cash-offer-from-tabellae-bidco-aps/"],["Renamed → Lasernet Group (LASER)","https://www.marketscreener.com/news/formpipe-software-begins-trading-on-nasdaq-stockholm-under-new-name-lasernet-group-ce7f5dd3dc81f32d"]]},{"n":"AMC Banking","o":"AMC-Consult · Denmark","stance":"steady","sl":"BC-native · banking","prox":"High","cat":"Bank integration & payments · BC + F&O","head":"BC-native bank/payments solution — directly competes with Continia Banking & Payment Management.","rel":"Standardises 600+ bank formats via the cloud platform XTendLink; Fundamentals ships as a BC extension.","str":"PSD2-licensed payment institution; payment export, bank statements and reconciliation directly in BC.","pos":"Embedded in BC — from payment journal direct to the bank (host-to-host).","ai":"Data-driven auto-matching; less AI profiling, more operations and compliance.","sc":"600+ banks · Danish vendor","s":[["AMC Banking BC","https://www.amcbanking.com/bc-fundamentals/"],["Microsoft Learn","https://learn.microsoft.com/en-us/dynamics365/business-central/ui-extensions-amc-banking"]]},{"n":"Acubiz","o":"Acubiz · Denmark","stance":"steady","sl":"Expense · integrated","prox":"Medium","cat":"Expense management · certified BC integration","head":"Danish expense player with certified BC integration — competes with Continia Expense Management.","rel":"Certified integration with BC (+ e-conomic, Danløn, 40+ systems); app + web portal for expenses, cards and mileage.","str":"Standalone expense platform that connects to BC — not “built inside” like Continia.","pos":"Real-time overview of employee spend; automatic import to BC.","ai":"Automation of receipt/expense flow; limited AI profile.","sc":"Danish · 40+ system integrations","s":[["Acubiz platform","https://acubiz.com/platform/"]]},{"n":"Pagero","o":"Thomson Reuters","stance":"cons","sl":"TR-owned · e-invoicing","prox":"High","cat":"E-invoicing network & compliance · BC connector","head":"Global e-invoicing network, now owned by Thomson Reuters — one of BC's built-in E-Document connectors.","rel":"ONESOURCE Pagero (e-invoicing + tax); embedded e-invoicing for Oracle Fusion (2026); Deloitte global alliance (Jan 2026); pre-approved ASP for the UAE mandate (from Jul 2026); passed the EU ViDA Peppol 5-corner pilot.","str":"Acquired by Thomson Reuters (2024) and merged with ONESOURCE tax; “two-step” format conversion globally.","pos":"Open, ERP-agnostic network; BC extension sends e-/PDF/print invoice via one connection.","ai":"Focus on compliance/CTC mandates rather than AI marketing.","sc":"14M+ businesses · 100+ networks · IDC leader","s":[["Pagero for BC","https://europe.thomsonreuters.com/pagero-network/system-connectivity/microsoft"],["UAE ASP","https://europe.thomsonreuters.com/newsroom/pagero-part-of-thomson-reuters-listed-as-pre-approved-e-invoicing-service-provider-in-the-uae"],["Deloitte-alliance","https://www.thomsonreuters.com/en/press-releases/2026/january/deloitte-and-thomson-reuters-launch-a-strategic-alliance-to-support-end-to-end-global-e-invoicing-and-e-reporting-for-organizations"]]},{"n":"B2Brouter","o":"B2Brouter Global · ES","stance":"steady","sl":"Peppol · BC connector","prox":"High","cat":"Peppol / e-invoicing access point · BC connector","head":"Certified Peppol access point with native BC connector — one of BC's built-in E-Document APIs.","rel":"BC connector on AppSource; supports Peppol BIS 3.0, UBL, XRechnung, FatturaPA, Chorus Pro, FACe and SDI.","str":"One connection to the entire Peppol network; automatic format conversion and compliance.","pos":"Native in Dynamics — send and receive e-invoices without external portals.","ai":"No significant AI profile; strength is compliance breadth across countries.","sc":"30+ countries · ISO 27001 · EESPA member","s":[["B2Brouter for Dynamics","https://www.b2brouter.net/global/e-invoicing-microsoft-dynamics/"],["Microsoft Learn (E-Docs)","https://learn.microsoft.com/en-us/dynamics365/business-central/faq-electronic-invoicing"]]},{"n":"Qvalia","o":"Qvalia · SE","stance":"steady","sl":"Peppol · BC app","prox":"High","cat":"Peppol e-invoicing & order management · BC app","head":"Ready-made BC app for Peppol with AI posting suggestions — setup without code.","rel":"Sends/receives Peppol invoices + order management; automatic posting in BC; AI suggestions for account mapping.","str":"Plug-and-play BC connector via the Qvalia platform; no IT resources required.","pos":"Everything posted automatically in BC — no double entry.","ai":"AI-generated posting suggestions for incoming vendor invoices.","sc":"EN 16931 · Peppol BIS · Swedish vendor","s":[["Qvalia for BC","https://qvalia.com/peppol-e-invoicing-for-business-central/"]]},{"n":"Rillion","o":"Rillion (formerly Palette) · Stockholm (Altor)","stance":"ai","sl":"AI-native capture","prox":"Medium","cat":"AP automation · multi-ERP + BC connector","head":"Nordic AP-automation veteran going AI-native — LLM invoice capture with no OCR templates.","rel":"Rillion Capture (Mar 25, 2026) — first AI-native, multimodal-LLM invoice capture (no templates); Riley AI Assistant (Sept 2025) for invoice/supplier Q&A.","str":"30+ years (ex-Palette/Centsoft), Altor PE-owned; shifting from template-OCR to AI-native capture and expanding in the US.","pos":"Control, visibility and speed for mid-market/enterprise AP; native Business Central connector among 50+ ERPs.","ai":"Riley AI assistant + Rillion Capture (multimodal LLM) for extraction, coding and approval routing.","sc":"3,000+ customers · 50+ countries · Altor-owned","s":[["Rillion AP","https://www.rillion.com/"],["Rillion Capture (Mar 2026)","https://www.rillion.com/blog/rillion-capture-announcement/"],["BC integration","https://www.rillion.com/integration/microsoft-dynamics-365-business-central/"]]},{"n":"Fidesic","o":"Fidesic (Enliven Software) · East Lansing, MI","stance":"ai","sl":"Built for Dynamics · AI capture","prox":"High","cat":"AP automation · Dynamics GP + BC","head":"AP automation purpose-built for Microsoft Dynamics GP & Business Central, with AI invoice capture.","rel":"AI invoice capture (MagiCapture) for Business Central — no templates, near-touchless; multi-entity BC integration (2024–25).","str":"Deepen the Dynamics ecosystem (GP heritage since 2008 + native BC AL app); raise AI-capture fidelity and multi-entity workflows.","pos":"“Purpose-built for Dynamics” — native GP/BC AP with no coding or mapping.","ai":"MagiCapture ML/AI invoice capture that learns per submission; high first-pass accuracy, no templates.","sc":"East Lansing, MI · GP since 2008 · BC on AppSource","s":[["Fidesic","https://www.fidesic.com/"],["BC integration","https://www.fidesic.com/product/dynamics-business-central-integration"],["MagiCapture","https://www.fidesic.com/product/magicapture"]]},{"n":"Yavrio","o":"Yavrio · London","stance":"steady","sl":"BC-native · open banking","prox":"High","cat":"Bank connectivity & payments · BC + ERPs","head":"Open-banking bank connectivity built inside Business Central — overlaps AMC Banking and Continia Banking & Payment Management.","rel":"Connected the five largest US banks + embedded payments (early 2026); $2.4M seed (Fuel Ventures, Jan 2025); 14,000+ banks across 20 countries.","str":"Expand bank coverage (10K→14K+ banks) and ERP scope beyond BC; positioned as a no-code alternative to CSV/file-based bank imports.","pos":"“Built inside Business Central” — collect, settle and reconcile payments and bank feeds without external portals.","ai":"Rules-based live bank feeds + automated reconciliation; minimal AI positioning.","sc":"London · ~40 staff · 14,000+ banks · seed-stage","s":[["Yavrio","https://www.yavr.io/"],["5 major US banks","https://www.openbankingexpo.com/news/open-banking-fintech-yavrio-connects-with-five-major-us-banks/"],["Yavrio on AppSource","https://appsource.microsoft.com/en-us/product/dynamics-365-business-central/pubid.yavrioltd1647526263468%7Caid.yavrio_open_banking%7Cpappid.3d686c04-e1b1-435e-bea4-862c2c203ca7"]]}]},
    {
      "date": "2026-06-19",
      "linkedin": {
        "source": "LinkedIn public engagement",
        "captured": "2026-06-19",
        "windowLabel": "last 10 posts each · public engagement",
        "companies": [
          {
            "name": "Continia Software",
            "ours": true,
            "posts": [
              {
                "t": "From a full-time AP person to automation in minutes",
                "ty": "Image",
                "r": 22,
                "c": 0,
                "rp": 3
              },
              {
                "t": "The Elevate tour continues - this time in Poland!",
                "ty": "Carousel",
                "r": 61,
                "c": 1,
                "rp": 0
              },
              {
                "t": "We're ISO 27001 certified",
                "ty": "Carousel",
                "r": 187,
                "c": 2,
                "rp": 1
              },
              {
                "t": "It's about time we cycled to work",
                "ty": "Carousel",
                "r": 67,
                "c": 1,
                "rp": 0
              },
              {
                "t": "250 Continia-losninger er en god grund til kage",
                "ty": "Carousel",
                "r": 68,
                "c": 1,
                "rp": 2
              },
              {
                "t": "Thanks for a great time at DynamicsMinds!",
                "ty": "Carousel",
                "r": 92,
                "c": 2,
                "rp": 0
              },
              {
                "t": "Continia is growing - swipe to find your next role",
                "ty": "Document",
                "r": 42,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Kicking off Continia Elevate in the UK",
                "ty": "Video",
                "r": 49,
                "c": 2,
                "rp": 1
              },
              {
                "t": "Your BC setup is almost there. Why not upgrade it for free?",
                "ty": "Video",
                "r": 34,
                "c": 0,
                "rp": 4
              },
              {
                "t": "That's a wrap on Directions ASIA",
                "ty": "Carousel",
                "r": 59,
                "c": 0,
                "rp": 0
              }
            ]
          },
          {
            "name": "Truvio",
            "posts": [
              {
                "t": "I dag er Truvio med til Forretning Online hos Novicell i Aarhus",
                "ty": "Image",
                "r": 34,
                "c": 1,
                "rp": 1
              },
              {
                "t": "What does successful B2B eCommerce look like today?",
                "ty": "Image",
                "r": 16,
                "c": 0,
                "rp": 5
              },
              {
                "t": "Fraud risk is hiding in everyday finance workflows",
                "ty": "Event",
                "r": 10,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Truvio is heading to Toronto",
                "ty": "Image",
                "r": 31,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Driving Scalable AP Automation Across a Multi-Entity Forestry Business",
                "ty": "Image",
                "r": 16,
                "c": 0,
                "rp": 4
              },
              {
                "t": "AI is changing the way customers discover products",
                "ty": "Image",
                "r": 17,
                "c": 2,
                "rp": 3
              },
              {
                "t": "We're attending the Community Summit NA Roadshow in Charlotte, June 9",
                "ty": "Image",
                "r": 17,
                "c": 0,
                "rp": 1
              },
              {
                "t": "88% of surveyed manufacturers and wholesalers now sell online",
                "ty": "Image",
                "r": 24,
                "c": 0,
                "rp": 4
              },
              {
                "t": "5 Years of Reliable AP Automation!",
                "ty": "Image",
                "r": 19,
                "c": 0,
                "rp": 3
              },
              {
                "t": "B2B eCommerce is reshaping how manufacturers grow (Truvio + Sapio Research)",
                "ty": "Event",
                "r": 16,
                "c": 0,
                "rp": 6
              }
            ]
          },
          {
            "name": "Equisys",
            "posts": [
              {
                "t": "Hours away from our webinar 'Discover THE BEST AP Automation Solution for Business Central'",
                "ty": "Image",
                "r": 1,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Less than 24 hours left to register for our AP Automation webinar",
                "ty": "Image",
                "r": 2,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Last week we sponsored Directions North America 2026!",
                "ty": "Carousel",
                "r": 12,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Looking for a smarter way to manage employee expenses? Book a Zetadocs demo",
                "ty": "Image",
                "r": 3,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Looking forward to being part of this great event!",
                "ty": "Image",
                "r": 1,
                "c": 0,
                "rp": 0
              },
              {
                "t": "This month we're celebrating 15 years of the Equisys blog!",
                "ty": "Document",
                "r": 3,
                "c": 0,
                "rp": 1
              },
              {
                "t": "We had an amazing first day at Directions North America",
                "ty": "Image",
                "r": 14,
                "c": 0,
                "rp": 5
              },
              {
                "t": "Ready to streamline AP? Discover practical tips for implementation",
                "ty": "Document",
                "r": 2,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Recently the team got together in London for our company-wide meet up!",
                "ty": "Carousel",
                "r": 5,
                "c": 0,
                "rp": 0
              },
              {
                "t": "We'll be in Orlando, Florida next week for Directions North America",
                "ty": "Image",
                "r": 5,
                "c": 0,
                "rp": 3
              }
            ]
          },
          {
            "name": "Medius",
            "posts": [
              {
                "t": "Rapid growth in logistics often masks a dangerous reality: operational complexity",
                "ty": "Document",
                "r": 6,
                "c": 1,
                "rp": 1
              },
              {
                "t": "Accounts Payable teams in construction manage thousands of suppliers",
                "ty": "Image",
                "r": 14,
                "c": 0,
                "rp": 2
              },
              {
                "t": "E-invoicing is no longer just a compliance checkbox - it's a competitive edge",
                "ty": "Image",
                "r": 9,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Looking forward to this. Hope to see you join us on July 15.",
                "ty": "Image",
                "r": 20,
                "c": 0,
                "rp": 5
              },
              {
                "t": "Why won't most of the AI that AP teams ship pass a serious external audit?",
                "ty": "Article/Link",
                "r": 3,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Garment manufacturing doesn't slow down for admin",
                "ty": "Image",
                "r": 14,
                "c": 0,
                "rp": 0
              },
              {
                "t": "How is AI revolutionizing manufacturing AP processes?",
                "ty": "Image",
                "r": 14,
                "c": 0,
                "rp": 2
              },
              {
                "t": "'How do I improve AP without disrupting our ERP?'",
                "ty": "Image",
                "r": 11,
                "c": 0,
                "rp": 2
              },
              {
                "t": "A webinar with Antaras (June 11): AI-driven AP automation for Infor LN",
                "ty": "Image",
                "r": 2,
                "c": 1,
                "rp": 1
              },
              {
                "t": "Speed used to be the whole AP conversation",
                "ty": "Carousel",
                "r": 59,
                "c": 0,
                "rp": 3
              }
            ]
          },
          {
            "name": "Qvalia",
            "posts": [
              {
                "t": "E-invoicing mandates are becoming infrastructure decisions",
                "ty": "Image",
                "r": 3,
                "c": 0,
                "rp": 0
              },
              {
                "t": "The new Billentis report on the global e-invoicing market is here",
                "ty": "Image",
                "r": 6,
                "c": 1,
                "rp": 0
              },
              {
                "t": "Slovakia's eFaktura framework is another step in Europe's transition",
                "ty": "Image",
                "r": 20,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Qvalia is now certified for Slovakia e-invoicing under eFaktura",
                "ty": "Image",
                "r": 29,
                "c": 1,
                "rp": 5
              },
              {
                "t": "Qvalia's Business Continuity Management System is now ISO 22301:2019 certified",
                "ty": "Image",
                "r": 4,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Thank you to everyone who joined today's webinar with Docupath",
                "ty": "Carousel",
                "r": 29,
                "c": 3,
                "rp": 3
              },
              {
                "t": "Qvalia is now listed in the Cloud Security Alliance STAR Registry",
                "ty": "Image",
                "r": 6,
                "c": 1,
                "rp": 0
              },
              {
                "t": "1940s-1980s: Early experiments in credit scoring and fraud detection",
                "ty": "Carousel",
                "r": 7,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Summer reading no 4: The definitive guide to Peppol",
                "ty": "Document",
                "r": 7,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Summer reading no 3: Peppol e-orders - how it works & how to get started",
                "ty": "Document",
                "r": 11,
                "c": 0,
                "rp": 2
              }
            ]
          },
          {
            "name": "AMC Banking",
            "posts": [
              {
                "t": "Thanks to everybody who showed up for the reception in our new building!",
                "ty": "Carousel",
                "r": 29,
                "c": 1,
                "rp": 0
              },
              {
                "t": "Your biggest compliance risk might be a process nobody questions anymore",
                "ty": "Article/Link",
                "r": 6,
                "c": 0,
                "rp": 2
              },
              {
                "t": "AMC Banking operates under Service Provider Agreements with selected banks",
                "ty": "Text",
                "r": 9,
                "c": 0,
                "rp": 0
              },
              {
                "t": "We're moving and we'd love to celebrate with you",
                "ty": "Event",
                "r": 12,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Discover AMC Banking 365 BC - cash management inside Dynamics 365 Business Central",
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
                "t": "The AMC Banking webinar series: demos, new features, use cases and Q&A",
                "ty": "Video",
                "r": 10,
                "c": 0,
                "rp": 1
              },
              {
                "t": "You can still register for our reception next week",
                "ty": "Event",
                "r": 0,
                "c": 0,
                "rp": 0
              },
              {
                "t": "AMC is expanding and we're looking for a Java developer",
                "ty": "Article/Link",
                "r": 12,
                "c": 0,
                "rp": 3
              }
            ]
          },
          {
            "name": "B2Brouter",
            "posts": [
              {
                "t": "B2Brouter attended Peppol Conference Europe 2026 in Brussels",
                "ty": "Carousel",
                "r": 8,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Starting the Peppol Conference 2026!",
                "ty": "Image",
                "r": 54,
                "c": 1,
                "rp": 5
              },
              {
                "t": "(German) Eine E-Rechnung zu empfangen bedeutet nicht, sie auch zu verarbeiten",
                "ty": "Poll",
                "r": 0,
                "c": 0,
                "rp": 0
              },
              {
                "t": "(Spanish) VeriFactu, Ley Crea y Crece, factura electronica B2B",
                "ty": "Document",
                "r": 8,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Peppol is becoming one of the most reliable ways to exchange B2B invoices globally",
                "ty": "Document",
                "r": 6,
                "c": 0,
                "rp": 0
              },
              {
                "t": "(German) Germany's e-invoicing roadmap is moving fast - legacy EDI won't be enough",
                "ty": "Image",
                "r": 0,
                "c": 0,
                "rp": 0
              },
              {
                "t": "(Spanish) Manana hablaremos sobre la Ley Crea y Crece y la nueva facturacion electronica",
                "ty": "Image",
                "r": 3,
                "c": 0,
                "rp": 0
              },
              {
                "t": "(French) Plateformes SaaS juridiques en France : 2026",
                "ty": "Document",
                "r": 4,
                "c": 0,
                "rp": 0
              },
              {
                "t": "(Spanish) B2Brouter en el ERP Summit Espana con partners",
                "ty": "Image",
                "r": 40,
                "c": 0,
                "rp": 2
              },
              {
                "t": "(German) Germany's B2B e-invoicing roadmap is already moving",
                "ty": "Document",
                "r": 8,
                "c": 2,
                "rp": 1
              }
            ]
          },
          {
            "name": "Dooap",
            "posts": [
              {
                "t": "Somewhere right now, an AP manager is refreshing their inbox hoping an approval appeared",
                "ty": "Image",
                "r": 8,
                "c": 0,
                "rp": 1
              },
              {
                "t": "We're here - come chat with us about Agentic AP!",
                "ty": "Video",
                "r": 10,
                "c": 2,
                "rp": 0
              },
              {
                "t": "The Dynamics community is coming to Toronto - and so are we",
                "ty": "Image",
                "r": 16,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Just think of the possibilities with Dooap Studio!",
                "ty": "Image",
                "r": 13,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Well, that's a wrap on DynamicsMinds",
                "ty": "Carousel",
                "r": 69,
                "c": 4,
                "rp": 0
              },
              {
                "t": "We saw a clear shift across DynamicsCon and DynamicsMinds",
                "ty": "Image",
                "r": 19,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Excited to introduce our latest Dooap Unleashed: Run With Us - Eftsure!",
                "ty": "Video",
                "r": 39,
                "c": 2,
                "rp": 1
              },
              {
                "t": "This is what agentic AP automation looks like",
                "ty": "Video",
                "r": 17,
                "c": 0,
                "rp": 6
              },
              {
                "t": "AP automation doesn't stop at the invoice. So why should your tech stack?",
                "ty": "Video",
                "r": 71,
                "c": 10,
                "rp": 3
              },
              {
                "t": "The biggest problem in finance isn't the system. It's that nobody trusts it.",
                "ty": "Video",
                "r": 21,
                "c": 3,
                "rp": 1
              }
            ]
          },
          {
            "name": "Yavrio",
            "posts": [
              {
                "t": "Only 18% of finance teams close their books in three days or less",
                "ty": "Image",
                "r": 14,
                "c": 1,
                "rp": 0
              },
              {
                "t": "Still moving bank data into your finance system one CSV at a time?",
                "ty": "Video",
                "r": 21,
                "c": 0,
                "rp": 1
              },
              {
                "t": "The payment is accepted. But is the finance work actually done?",
                "ty": "Image",
                "r": 44,
                "c": 1,
                "rp": 0
              },
              {
                "t": "What a 2026 Yavrio is having so far!",
                "ty": "Carousel",
                "r": 102,
                "c": 7,
                "rp": 0
              },
              {
                "t": "DynamicsMinds 2026 is done and what a week it's been",
                "ty": "Carousel",
                "r": 106,
                "c": 5,
                "rp": 0
              },
              {
                "t": "Day one of DynamicsMinds wrapped and what a start it's been",
                "ty": "Carousel",
                "r": 81,
                "c": 4,
                "rp": 0
              },
              {
                "t": "Finance teams BEFORE vs AFTER Yavrio",
                "ty": "Video",
                "r": 44,
                "c": 4,
                "rp": 0
              },
              {
                "t": "A webinar with Western Computer: banking and payments embedded inside BC",
                "ty": "Image",
                "r": 18,
                "c": 2,
                "rp": 1
              },
              {
                "t": "DynamicsCon 2026 wrapped and what a few days it was!",
                "ty": "Carousel",
                "r": 55,
                "c": 2,
                "rp": 0
              },
              {
                "t": "We're on the ground at Directions ASIA 2026 in Vietnam!",
                "ty": "Carousel",
                "r": 68,
                "c": 1,
                "rp": 1
              }
            ]
          },
          {
            "name": "Rillion",
            "posts": [
              {
                "t": "We asked 250 CFOs across the Nordics about AI in finance",
                "ty": "Document",
                "r": 7,
                "c": 0,
                "rp": 0
              },
              {
                "t": "[searching...]",
                "ty": "Text",
                "r": 30,
                "c": 20,
                "rp": 4
              },
              {
                "t": "The Nordic AI Finance Report had zero shortage of 'mic-drop' quotes",
                "ty": "Text",
                "r": 7,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Something fun happens when you bring colleagues together from Sweden and the US",
                "ty": "Video",
                "r": 17,
                "c": 4,
                "rp": 0
              },
              {
                "t": "40% of CFOs see fraud and anomaly detection as the biggest AI opportunity",
                "ty": "Image",
                "r": 17,
                "c": 1,
                "rp": 2
              },
              {
                "t": "Just got back from two of the most energizing days I've had in a long time!",
                "ty": "Image",
                "r": 50,
                "c": 8,
                "rp": 1
              },
              {
                "t": "26% of CFOs say lack of AI competence is the single biggest barrier to adoption",
                "ty": "Text",
                "r": 18,
                "c": 1,
                "rp": 1
              },
              {
                "t": "Rillion's summer celebration was one for the books!",
                "ty": "Video",
                "r": 41,
                "c": 4,
                "rp": 0
              },
              {
                "t": "Our marketing team swapped their laptops for race bibs - running Blodomloppet",
                "ty": "Carousel",
                "r": 33,
                "c": 3,
                "rp": 1
              },
              {
                "t": "(Swedish) En hogre lon racker inte langre",
                "ty": "Image",
                "r": 105,
                "c": 2,
                "rp": 1
              }
            ]
          },
          {
            "name": "Fidesic",
            "posts": [
              {
                "t": "Fidesic has officially joined Knights of GP",
                "ty": "Image",
                "r": 5,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Why Accruals and Deferrals Matter for Financial Accuracy",
                "ty": "Image",
                "r": 0,
                "c": 0,
                "rp": 0
              },
              {
                "t": "If your team uses Microsoft Dynamics GP or Business Central to manage multiple locations",
                "ty": "Image",
                "r": 2,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Feel like you're the only person scrambling at work on Friday?",
                "ty": "Image",
                "r": 2,
                "c": 0,
                "rp": 0
              },
              {
                "t": "DPO vs. AP Turnover - what the AP Turnover Ratio tells you",
                "ty": "Image",
                "r": 0,
                "c": 0,
                "rp": 0
              },
              {
                "t": "'Failure to accurately manage payables makes it harder to forecast cash flows'",
                "ty": "Image",
                "r": 1,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Think paper checks are dead? Think again...",
                "ty": "Image",
                "r": 2,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Does Native Integration make AP Automation easier to implement for BC?",
                "ty": "Image",
                "r": 2,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Budget pressure? It's AP's time to shine - 5 key strategies to get results fast",
                "ty": "Article/Link",
                "r": 0,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Did you know... Doug Burgum mortgaged his farmland to fund Great Plains Software",
                "ty": "Image",
                "r": 7,
                "c": 1,
                "rp": 1
              }
            ]
          },
          {
            "name": "Tipalti",
            "posts": [
              {
                "t": "The next chapter of digital commerce is being executed by AI on behalf of consumers",
                "ty": "Image",
                "r": 3,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Cubic Games was managing over 180 vendors across global markets",
                "ty": "Image",
                "r": 6,
                "c": 0,
                "rp": 0
              },
              {
                "t": "A few days out from World Finance Forum in Amsterdam",
                "ty": "Image",
                "r": 5,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Day 1 at #IMA2026 in Tampa",
                "ty": "Image",
                "r": 15,
                "c": 0,
                "rp": 3
              },
              {
                "t": "'In periods of economic uncertainty, finance teams play a critical role'",
                "ty": "Image",
                "r": 4,
                "c": 0,
                "rp": 0
              },
              {
                "t": "A massive thank you to everyone at the BAASS event",
                "ty": "Image",
                "r": 37,
                "c": 1,
                "rp": 0
              },
              {
                "t": "Engineering teams are entering a fundamentally different operating model",
                "ty": "Image",
                "r": 5,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Manual payment processes don't scale",
                "ty": "Text",
                "r": 8,
                "c": 0,
                "rp": 0
              },
              {
                "t": "'This is how we've always done it' stops being a reason and starts being an excuse",
                "ty": "Text",
                "r": 2,
                "c": 0,
                "rp": 0
              },
              {
                "t": "At quarter end, Splice's finance team spent two weeks processing royalty payments",
                "ty": "Image",
                "r": 8,
                "c": 0,
                "rp": 0
              }
            ]
          },
          {
            "name": "Stampli",
            "posts": [
              {
                "t": "Finance teams don't run out of useful questions. They run out of ways to get answers.",
                "ty": "Article/Link",
                "r": 19,
                "c": 1,
                "rp": 4
              },
              {
                "t": "Strong customer feedback on real value for finance teams - one connected P2P story",
                "ty": "Article/Link",
                "r": 25,
                "c": 1,
                "rp": 13
              },
              {
                "t": "Meaningful savings can hide in everyday finance data (Integra Investments, Deep Finance)",
                "ty": "Image",
                "r": 27,
                "c": 3,
                "rp": 10
              },
              {
                "t": "Market stories become clearer when they show up in operational spend (CNN on SpaceX IPO)",
                "ty": "Video",
                "r": 11,
                "c": 1,
                "rp": 4
              },
              {
                "t": "NetSuite 3-way matching often breaks on one missing piece: the item receipt",
                "ty": "Article/Link",
                "r": 8,
                "c": 0,
                "rp": 2
              },
              {
                "t": "ACH risks don't start at the bank portal. They often start earlier.",
                "ty": "Article/Link",
                "r": 16,
                "c": 3,
                "rp": 7
              },
              {
                "t": "Built to scale your business, not your headcount",
                "ty": "Article/Link",
                "r": 24,
                "c": 0,
                "rp": 11
              },
              {
                "t": "We're about to see the death of the dashboard - replaced by interactive AI visualizations",
                "ty": "Image",
                "r": 81,
                "c": 8,
                "rp": 23
              },
              {
                "t": "We had a great time at the Nashville career fair",
                "ty": "Carousel",
                "r": 43,
                "c": 1,
                "rp": 5
              },
              {
                "t": "Big things are happening at Stampli",
                "ty": "Article/Link",
                "r": 98,
                "c": 2,
                "rp": 5
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
    },
    {
      "date": "2026-06-18",
      "linkedin": {
        "source": "LinkedIn public engagement",
        "captured": "2026-06-18",
        "windowLabel": "last 10 posts each · public engagement",
        "companies": [
          {
            "name": "Continia Software",
            "ours": true,
            "posts": [
              {
                "t": "From a full-time AP person to automation in minutes",
                "r": 22,
                "c": 0,
                "rp": 3
              },
              {
                "t": "The Elevate tour continues - this time in Poland!",
                "r": 60,
                "c": 1,
                "rp": 0
              },
              {
                "t": "Kicking off Continia Elevate in the UK",
                "r": 49,
                "c": 2,
                "rp": 1
              },
              {
                "t": "We're ISO 27001 certified",
                "r": 187,
                "c": 2,
                "rp": 1
              },
              {
                "t": "It's about time we cycled to work - May commute in Copenhagen",
                "r": 67,
                "c": 1,
                "rp": 0
              },
              {
                "t": "250 Continia solutions is a good reason for cake",
                "r": 68,
                "c": 1,
                "rp": 2
              },
              {
                "t": "Thanks for a great time at DynamicsMinds!",
                "r": 92,
                "c": 2,
                "rp": 0
              },
              {
                "t": "Continia is growing - swipe to find your next role",
                "r": 42,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Your BC setup is almost there. Why not upgrade it?",
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
                "t": "I dag er Truvio med til Forretning Online hos Novicell i Aarhus",
                "r": 14,
                "c": 1,
                "rp": 1
              },
              {
                "t": "What does successful B2B eCommerce look like today?",
                "r": 10,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Truvio is heading to Toronto - Dynamics Regional event June 18-19",
                "r": 30,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Driving Scalable AP Automation Across a Multi-Entity Forestry Business",
                "r": 16,
                "c": 0,
                "rp": 4
              },
              {
                "t": "Last chance! Truvio Talks Podcast 'Beyond the Platform' with Parkfield Collective",
                "r": 5,
                "c": 0,
                "rp": 0
              },
              {
                "t": "AI is changing how customers discover products (Webinar July 2nd on PIM & AI)",
                "r": 16,
                "c": 2,
                "rp": 2
              },
              {
                "t": "We're attending the Community Summit NA Roadshow in Charlotte, June 9",
                "r": 16,
                "c": 0,
                "rp": 1
              },
              {
                "t": "88% of surveyed manufacturers and wholesalers now sell online",
                "r": 23,
                "c": 0,
                "rp": 4
              },
              {
                "t": "5 Years of Reliable AP Automation! (recucare GmbH / ExFlow case)",
                "r": 19,
                "c": 0,
                "rp": 3
              },
              {
                "t": "B2B eCommerce is reshaping how manufacturers grow (Truvio + Sapio Research)",
                "r": 16,
                "c": 0,
                "rp": 6
              }
            ]
          },
          {
            "name": "Equisys",
            "posts": [
              {
                "t": "Hours away from our webinar 'Discover THE BEST AP Automation Solution for Business Central'",
                "r": 0,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Less than 24 hours left to register for our AP Automation webinar",
                "r": 2,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Looking for a smarter way to manage employee expenses? Book a Zetadocs demo",
                "r": 3,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Last week we sponsored Directions North America 2026!",
                "r": 12,
                "c": 0,
                "rp": 2
              },
              {
                "t": "An amazing first day at Directions North America",
                "r": 14,
                "c": 0,
                "rp": 5
              },
              {
                "t": "We'll be in Orlando, Florida next week for Directions North America",
                "r": 5,
                "c": 0,
                "rp": 3
              },
              {
                "t": "We're headed to Directions in Orlando in 2 weeks",
                "r": 6,
                "c": 0,
                "rp": 4
              },
              {
                "t": "Deliver smarter, not harder! Customize how your documents reach the right people",
                "r": 2,
                "c": 0,
                "rp": 0
              },
              {
                "t": "We're delighted to be part of this exciting event",
                "r": 3,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Zetadocs Expenses offers a smooth expense workflow out-of-the-box",
                "r": 4,
                "c": 0,
                "rp": 1
              }
            ]
          },
          {
            "name": "Medius",
            "posts": [
              {
                "t": "Rapid growth in logistics often masks operational complexity",
                "r": 3,
                "c": 1,
                "rp": 0
              },
              {
                "t": "AP teams in construction manage thousands of invoices",
                "r": 14,
                "c": 0,
                "rp": 2
              },
              {
                "t": "E-invoicing is no longer just a compliance checkbox",
                "r": 9,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Looking forward to this. Hope to see you join us on July 15.",
                "r": 19,
                "c": 0,
                "rp": 5
              },
              {
                "t": "Garment manufacturing doesn't slow down for admin",
                "r": 14,
                "c": 0,
                "rp": 0
              },
              {
                "t": "How is AI revolutionizing manufacturing AP processes?",
                "r": 14,
                "c": 0,
                "rp": 2
              },
              {
                "t": "'How do I improve AP without disrupting our ERP?'",
                "r": 11,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Speed used to be the whole AP conversation",
                "r": 58,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Still manually chasing invoice approvals in Infor LN?",
                "r": 23,
                "c": 0,
                "rp": 4
              },
              {
                "t": "'AI-powered' has become the default claim in AP automation",
                "r": 10,
                "c": 0,
                "rp": 0
              }
            ]
          },
          {
            "name": "Qvalia",
            "posts": [
              {
                "t": "E-invoicing mandates are becoming infrastructure decisions (Slovakia)",
                "r": 3,
                "c": 0,
                "rp": 0
              },
              {
                "t": "The new Billentis report on the global e-invoicing market is here",
                "r": 6,
                "c": 1,
                "rp": 0
              },
              {
                "t": "Slovakia's eFaktura framework is another step in Europe's transition",
                "r": 20,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Qvalia is now certified for Slovakia e-invoicing under eFaktura",
                "r": 29,
                "c": 1,
                "rp": 5
              },
              {
                "t": "Qvalia's Business Continuity Management System is now certified",
                "r": 4,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Qvalia is now listed in the Cloud Security Alliance STAR Registry",
                "r": 6,
                "c": 1,
                "rp": 0
              },
              {
                "t": "Qvalia is now available on iPhone and Android",
                "r": 42,
                "c": 5,
                "rp": 5
              },
              {
                "t": "In 2025, we expanded Qvalia's platform across nearly all fronts",
                "r": 13,
                "c": 1,
                "rp": 2
              },
              {
                "t": "[Peppol for developers] How to get started with Peppol API",
                "r": 9,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Belgium mandates Peppol e-invoicing for most B2B transactions",
                "r": 9,
                "c": 0,
                "rp": 1
              }
            ]
          },
          {
            "name": "AMC Banking",
            "posts": [
              {
                "t": "Your biggest compliance risk might be a process nobody questions",
                "r": 6,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Thanks to everybody who showed up for the reception in our new building!",
                "r": 29,
                "c": 1,
                "rp": 0
              },
              {
                "t": "You can still register for our reception next week",
                "r": 0,
                "c": 0,
                "rp": 0
              },
              {
                "t": "AMC Banking operates under Service Provider Agreements with selected banks",
                "r": 9,
                "c": 0,
                "rp": 0
              },
              {
                "t": "AMC is expanding - we're looking for a Java developer",
                "r": 12,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Still uploading payment files manually? At some point, it stops scaling.",
                "r": 6,
                "c": 0,
                "rp": 0
              },
              {
                "t": "We're moving - join us for a reception",
                "r": 12,
                "c": 0,
                "rp": 1
              },
              {
                "t": "The torch has officially been passed - moving into Kobenhavn",
                "r": 56,
                "c": 4,
                "rp": 1
              },
              {
                "t": "Enterprise treasury demands structure, visibility, and control",
                "r": 7,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Bank integration: Myth vs reality",
                "r": 10,
                "c": 0,
                "rp": 3
              }
            ]
          },
          {
            "name": "B2Brouter",
            "posts": [
              {
                "t": "B2Brouter attended Peppol Conference Europe 2026 in Brussels",
                "r": 6,
                "c": 0,
                "rp": 1
              },
              {
                "t": "(German) Eine E-Rechnung zu empfangen bedeutet nicht, sie auch zu verarbeiten",
                "r": 0,
                "c": 0,
                "rp": 0
              },
              {
                "t": "(Spanish) VeriFactu, Ley Crea y Crece, factura electronica B2B",
                "r": 8,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Starting the Peppol Conference 2026! More than 40 countries embracing Peppol",
                "r": 52,
                "c": 1,
                "rp": 4
              },
              {
                "t": "Peppol is becoming one of the most reliable ways to exchange B2B invoices",
                "r": 5,
                "c": 0,
                "rp": 0
              },
              {
                "t": "A standard should make e-invoicing simpler",
                "r": 1,
                "c": 0,
                "rp": 0
              },
              {
                "t": "(French) Plateformes SaaS juridiques en France : 2026",
                "r": 4,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Germany's B2B e-invoicing roadmap is already moving",
                "r": 8,
                "c": 2,
                "rp": 1
              },
              {
                "t": "(Spanish) B2Brouter en el ERP Summit Espana con partners",
                "r": 40,
                "c": 0,
                "rp": 2
              },
              {
                "t": "(Spanish) Crees que Ley Crea y Crece y VeriFactu son lo mismo?",
                "r": 8,
                "c": 0,
                "rp": 1
              }
            ]
          },
          {
            "name": "Dooap",
            "posts": [
              {
                "t": "The Dynamics community is coming to Toronto - and so are we",
                "r": 16,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Excited to introduce our latest Dooap Unleashed: Run With Us - Eftsure!",
                "r": 39,
                "c": 2,
                "rp": 1
              },
              {
                "t": "This is what agentic AP automation looks like. Dooap Studio",
                "r": 17,
                "c": 0,
                "rp": 6
              },
              {
                "t": "Just think of the possibilities with Dooap Studio!",
                "r": 12,
                "c": 0,
                "rp": 1
              },
              {
                "t": "AP automation doesn't stop at the invoice. So why should your tech stack?",
                "r": 71,
                "c": 10,
                "rp": 3
              },
              {
                "t": "We saw a clear shift across #DynamicsCon2026 and #DynamicsMinds",
                "r": 19,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Well, that's a wrap on DynamicsMinds",
                "r": 69,
                "c": 4,
                "rp": 0
              },
              {
                "t": "Great conversations. Great community.",
                "r": 9,
                "c": 1,
                "rp": 0
              },
              {
                "t": "Set up and ready for 'Herd your AP with AI Agents'",
                "r": 28,
                "c": 2,
                "rp": 3
              },
              {
                "t": "We're heading to #DynamicsMinds2026",
                "r": 30,
                "c": 0,
                "rp": 1
              }
            ]
          },
          {
            "name": "Yavrio",
            "posts": [
              {
                "t": "Only 18% of finance teams close their books in three days or less",
                "r": 12,
                "c": 1,
                "rp": 0
              },
              {
                "t": "Still moving bank data into your finance system one CSV at a time?",
                "r": 19,
                "c": 0,
                "rp": 1
              },
              {
                "t": "The payment is accepted. But is the finance work actually done?",
                "r": 44,
                "c": 1,
                "rp": 0
              },
              {
                "t": "What a 2026 Yavrio is having so far!",
                "r": 102,
                "c": 7,
                "rp": 0
              },
              {
                "t": "DynamicsMinds 2026 is done and what a week it's been",
                "r": 105,
                "c": 5,
                "rp": 0
              },
              {
                "t": "Finance teams BEFORE vs AFTER Yavrio",
                "r": 44,
                "c": 4,
                "rp": 0
              },
              {
                "t": "Next month, a webinar with Western Computer",
                "r": 14,
                "c": 1,
                "rp": 1
              },
              {
                "t": "Day one of DynamicsMinds wrapped",
                "r": 81,
                "c": 4,
                "rp": 0
              },
              {
                "t": "A new partnership between Yavrio and Custom...",
                "r": 32,
                "c": 3,
                "rp": 1
              },
              {
                "t": "DynamicsMinds 2026... we're coming, teaming up with...",
                "r": 61,
                "c": 5,
                "rp": 2
              }
            ]
          },
          {
            "name": "Rillion",
            "posts": [
              {
                "t": "We asked 250 CFOs across the Nordics about AI in finance",
                "r": 6,
                "c": 0,
                "rp": 0
              },
              {
                "t": "I'm on the hunt for a US native CFO or financial executive",
                "r": 28,
                "c": 19,
                "rp": 4
              },
              {
                "t": "Something fun happens when you bring colleagues together from Sweden and the US",
                "r": 16,
                "c": 4,
                "rp": 0
              },
              {
                "t": "The Nordic AI Finance Report had zero shortage of 'mic-drop' quotes",
                "r": 7,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Rillion's summer celebration was one for the books!",
                "r": 41,
                "c": 4,
                "rp": 0
              },
              {
                "t": "Just got back from two of the most energizing days",
                "r": 50,
                "c": 8,
                "rp": 1
              },
              {
                "t": "26% of CFOs say lack of AI competence is the single biggest barrier",
                "r": 18,
                "c": 1,
                "rp": 1
              },
              {
                "t": "40% of CFOs see fraud and anomaly detection as the biggest AI opportunity",
                "r": 17,
                "c": 1,
                "rp": 2
              },
              {
                "t": "Our marketing team swapped their laptops for race bibs",
                "r": 33,
                "c": 3,
                "rp": 1
              },
              {
                "t": "(Swedish) En hogre lon racker inte langre",
                "r": 105,
                "c": 2,
                "rp": 1
              }
            ]
          },
          {
            "name": "Fidesic",
            "posts": [
              {
                "t": "Fidesic has officially joined Knights of GP",
                "r": 4,
                "c": 0,
                "rp": 2
              },
              {
                "t": "We're excited to share Fidesic has joined Knights of GP",
                "r": 4,
                "c": 0,
                "rp": 2
              },
              {
                "t": "Why Accruals and Deferrals Matter for Financial Accuracy",
                "r": 0,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Budget pressure? It's AP's time to shine",
                "r": 0,
                "c": 0,
                "rp": 0
              },
              {
                "t": "If your team uses Microsoft Dynamics GP or Business Central for multi-entity",
                "r": 2,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Feel like you're the only person scrambling at work on Friday?",
                "r": 2,
                "c": 0,
                "rp": 0
              },
              {
                "t": "DPO vs. AP Turnover - what the AP Turnover Ratio tells you",
                "r": 0,
                "c": 0,
                "rp": 0
              },
              {
                "t": "'Failure to accurately manage payables makes it harder to forecast'",
                "r": 1,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Think paper checks are dead? Think again...",
                "r": 2,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Does Native Integration make AP Automation easier for BC?",
                "r": 2,
                "c": 0,
                "rp": 0
              }
            ]
          },
          {
            "name": "Tipalti",
            "posts": [
              {
                "t": "Cubic Games was managing over 180 vendors across global markets",
                "r": 6,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Manual payment processes don't scale",
                "r": 8,
                "c": 0,
                "rp": 0
              },
              {
                "t": "A few days out from World Finance Forum in Amsterdam",
                "r": 4,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Day 1 at #IMA2026 in Tampa is in the books",
                "r": 15,
                "c": 0,
                "rp": 3
              },
              {
                "t": "'In periods of economic uncertainty, finance teams play a critical role'",
                "r": 4,
                "c": 0,
                "rp": 0
              },
              {
                "t": "Hello Tampa! The Tipalti team is on the ground",
                "r": 7,
                "c": 0,
                "rp": 0
              },
              {
                "t": "'This is how we've always done it' stops being a reason",
                "r": 2,
                "c": 0,
                "rp": 0
              },
              {
                "t": "A massive thank you to everyone at the #BAASS event",
                "r": 37,
                "c": 1,
                "rp": 0
              },
              {
                "t": "Engineering teams are entering a fundamentally different operating model",
                "r": 5,
                "c": 0,
                "rp": 0
              },
              {
                "t": "At quarter end, Splice's finance team would spend two weeks...",
                "r": 8,
                "c": 0,
                "rp": 0
              }
            ]
          },
          {
            "name": "Stampli",
            "posts": [
              {
                "t": "Strong customer feedback on real value for finance teams",
                "r": 4,
                "c": 0,
                "rp": 3
              },
              {
                "t": "Finance teams don't run out of useful questions",
                "r": 18,
                "c": 1,
                "rp": 3
              },
              {
                "t": "Market stories become clearer when they show up in operational spend",
                "r": 11,
                "c": 1,
                "rp": 4
              },
              {
                "t": "NetSuite 3-way matching often breaks on the item receipt",
                "r": 8,
                "c": 0,
                "rp": 2
              },
              {
                "t": "ACH risks don't start at the bank portal",
                "r": 16,
                "c": 3,
                "rp": 7
              },
              {
                "t": "Meaningful savings can hide in everyday finance data (Integra Investments)",
                "r": 27,
                "c": 3,
                "rp": 10
              },
              {
                "t": "Built to scale your business, not your headcount",
                "r": 24,
                "c": 0,
                "rp": 11
              },
              {
                "t": "Vendor concentration risk is hiding in your AP data (Stampli Deep Financials)",
                "r": 11,
                "c": 0,
                "rp": 1
              },
              {
                "t": "Day 2 at #SageFuture and the energy is still going strong!",
                "r": 42,
                "c": 1,
                "rp": 1
              },
              {
                "t": "Day 1 of #SageFuture in the books",
                "r": 91,
                "c": 1,
                "rp": 5
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
