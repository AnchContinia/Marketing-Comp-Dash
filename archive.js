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
    {"date":"2026-07-10","linkedin":{"source":"LinkedIn public engagement","captured":"2026-07-10","windowLabel":"up to 30 recent posts each · public engagement","companies":[{"name":"Continia Software","ours":true,"posts":[{"t":"See Continia in action, at your own pace","ty":"Image","r":34,"c":1,"rp":4},{"t":"It's about time","ty":"Carousel","r":59,"c":1,"rp":0},{"t":"Fake invoices don't always look fake","ty":"Image","r":22,"c":0,"rp":2},{"t":"Our biggest team meetup yet - our entire global team together","ty":"Carousel","r":233,"c":4,"rp":6},{"t":"From a full-time AP person to automation in minutes","ty":"Image","r":22,"c":0,"rp":3},{"t":"The Elevate tour continues - this time in Poland","ty":"Carousel","r":71,"c":1,"rp":0},{"t":"Kicking off Continia Elevate in the UK","ty":"Video","r":53,"c":2,"rp":1},{"t":"We're ISO 27001 certified","ty":"Carousel","r":196,"c":2,"rp":1},{"t":"It's about time ... we cycled to work (May commute)","ty":"Carousel","r":69,"c":1,"rp":0},{"t":"Continia is growing - swipe to find your next role","ty":"Document/carousel","r":42,"c":0,"rp":0},{"t":"Your BC setup is almost there","ty":"Video","r":34,"c":0,"rp":4},{"t":"Continia Elevate comes to Warsaw","ty":"Image","r":47,"c":4,"rp":2},{"t":"That's a wrap on Directions ASIA","ty":"Carousel","r":59,"c":0,"rp":0},{"t":"The Continia Expense App now supports Microsoft integration","ty":"Image","r":69,"c":0,"rp":2},{"t":"Is your Accounts Receivable setup as efficient as it could be","ty":"Document/carousel","r":39,"c":0,"rp":0},{"t":"Celebrating our very own Microsoft MVP","ty":"Carousel","r":217,"c":17,"rp":1},{"t":"Catch up on 2026 R1 and showcase your expertise","ty":"Image","r":27,"c":0,"rp":2},{"t":"Let's catch up at DynamicsMinds","ty":"Image","r":66,"c":1,"rp":1},{"t":"Did you miss our 2026 R1 'What's New' webinars","ty":"Image","r":31,"c":0,"rp":1},{"t":"25 ars samarbejde og +500 aktive Continia-losninger","ty":"Carousel","r":75,"c":2,"rp":2},{"t":"Celebrating the first release of 2026 - 2026 R1 is live","ty":"Carousel","r":80,"c":0,"rp":1},{"t":"2026 R1: A big step forward for AR automation","ty":"Video","r":84,"c":2,"rp":6},{"t":"Hopping into Easter - a little Easter surprise","ty":"Carousel","r":61,"c":0,"rp":2},{"t":"Handling 15,000 invoices every month is no small task","ty":"Image","r":27,"c":0,"rp":1},{"t":"Join us at Days of Knowledge Nordic","ty":"Image","r":33,"c":0,"rp":1},{"t":"Happy birthday to our CEO","ty":"Carousel","r":208,"c":20,"rp":0},{"t":"Get a first look at 2026 R1","ty":"Document/carousel","r":31,"c":0,"rp":3},{"t":"Vi fejrer +500 implementerede Continia-losninger","ty":"Carousel","r":77,"c":0,"rp":3},{"t":"Where to meet Continia this spring and summer","ty":"Document/carousel","r":34,"c":0,"rp":3},{"t":"Lap times (almost) as quick as our invoice process","ty":"Carousel","r":53,"c":0,"rp":1}]},{"name":"Truvio","posts":[{"t":"Better fraud detection starts with better visibility","ty":"Image","r":5,"c":0,"rp":1},{"t":"Is your approval process keeping your finance team working","ty":"Text","r":10,"c":0,"rp":2},{"t":"Traditional AP automation requires companies to define every invoice scenario upfront","ty":"Image","r":15,"c":0,"rp":3},{"t":"AI adoption in B2B eCommerce moved faster than expected - 70% of companies","ty":"Image","r":16,"c":0,"rp":2},{"t":"Is your ERP helping your business scale","ty":"Text","r":15,"c":1,"rp":0},{"t":"Does summer seem to expose every bottleneck in your finance operations","ty":"Image","r":28,"c":0,"rp":11},{"t":"Join us for our next Commerce Product Brief on the 26th of August","ty":"Image","r":14,"c":0,"rp":1},{"t":"This September, our Commerce partner community comes together in Aarhus","ty":"Image","r":23,"c":0,"rp":4},{"t":"3 products (Truvio suite)","ty":"Video","r":24,"c":0,"rp":3},{"t":"Going live with AP automation is an important step forward","ty":"Video","r":21,"c":0,"rp":5},{"t":"On Thursday, we're talking about what AI really needs from your product data","ty":"Image","r":23,"c":0,"rp":1},{"t":"When evaluating AP automation solutions, Sinclar Group Forest Products Ltd","ty":"Image","r":18,"c":1,"rp":3},{"t":"Your catalogue has 400 products missing SEO descriptions","ty":"Image","r":22,"c":1,"rp":2},{"t":"Truvio Commerce Customer Day 2026 in motion","ty":"Video","r":51,"c":2,"rp":3},{"t":"When evaluating AP automation, AURA Energi didn't just listen to sales pitches","ty":"Image","r":24,"c":0,"rp":6},{"t":"AI can only work with the product data you give it","ty":"Image","r":30,"c":1,"rp":7},{"t":"The program for Truvio Commerce Partner Days 2026 is now live","ty":"Video","r":17,"c":1,"rp":9},{"t":"Last week we attended Forretning Online in Aarhus - a full-day conference","ty":"Carousel","r":32,"c":2,"rp":3},{"t":"Fraud risk is hiding in everyday finance workflows - emailed invoices, manual entry","ty":"Text","r":13,"c":0,"rp":2},{"t":"I dag er Truvio med til Forretning Online hos Novicell i Aarhus - over 500 deltagere","ty":"Image","r":49,"c":1,"rp":1},{"t":"What does successful B2B eCommerce look like today","ty":"Image","r":17,"c":1,"rp":5},{"t":"Truvio is heading to Toronto - Dynamics Regional event on June 18-19","ty":"Image","r":35,"c":0,"rp":2},{"t":"Driving scalable AP automation across a multi-entity forestry business (Sinclar Group)","ty":"Image","r":16,"c":0,"rp":4},{"t":"Last chance","ty":"Video","r":8,"c":0,"rp":0},{"t":"AI is changing the way customers discover products","ty":"Image","r":17,"c":2,"rp":3},{"t":"We are excited to attend the Community Summit NA Roadshow in Charlotte, June 9","ty":"Image","r":20,"c":0,"rp":2},{"t":"88% of surveyed manufacturers and wholesalers now sell online","ty":"Image","r":24,"c":0,"rp":5},{"t":"What if managing commerce data could start with a simple question","ty":"Image","r":35,"c":0,"rp":6},{"t":"More than half of B2B revenue now comes from online orders","ty":"Image","r":23,"c":0,"rp":5},{"t":"The numbers don't lie - B2B eCommerce is reshaping manufacturers and distributors","ty":"Text","r":16,"c":0,"rp":6}]},{"name":"Equisys","posts":[{"t":"With Zetadocs, drag and drop supporting documents against a journal entry in BC","ty":"Image","r":2,"c":0,"rp":2},{"t":"Missed our recent webinar? Catch up now","ty":"Video","r":4,"c":0,"rp":2},{"t":"A few hours away from our webinar 'Discover THE BEST AP Automation for Business Central'","ty":"Image","r":0,"c":0,"rp":1},{"t":"Less than 24 hours left to register for our webinar","ty":"Image","r":2,"c":0,"rp":3},{"t":"Looking for a smarter way to manage employee expenses and ensure compliant claims","ty":"Image","r":3,"c":0,"rp":3},{"t":"A great time sponsoring Directions North America 2026","ty":"Carousel","r":12,"c":0,"rp":2},{"t":"An amazing first day at Directions North America","ty":"Image","r":14,"c":0,"rp":5},{"t":"We'll be in Orlando, Florida next week for Directions North America","ty":"Image","r":5,"c":0,"rp":3},{"t":"Headed to Directions in Orlando in 2 weeks - Booth E-32","ty":"Image","r":6,"c":0,"rp":4},{"t":"Deliver smarter, not harder (Zetadocs Delivery)","ty":"Image","r":2,"c":0,"rp":0},{"t":"Looking for an expense management solution built for Business Central","ty":"Image","r":7,"c":0,"rp":2},{"t":"Even the most well-written expense policies can be difficult to enforce","ty":"Image","r":7,"c":0,"rp":4},{"t":"See how Zetadocs can transform the way you work","ty":"Image","r":6,"c":0,"rp":4},{"t":"The future of accounts payable is automated","ty":"Article/Link","r":2,"c":0,"rp":0},{"t":"Accounting teams in manufacturing (and beyond) face challenges with manual processes","ty":"Article/Link","r":1,"c":0,"rp":0},{"t":"Thank you to all who stopped by our booth at Directions EMEA 2025","ty":"Image","r":11,"c":0,"rp":2},{"t":"Our team is enjoying the sessions and conversations at Directions","ty":"Image","r":1,"c":0,"rp":0},{"t":"We're delighted to be at Directions EMEA 2025 in Poznan","ty":"Image","r":22,"c":0,"rp":5},{"t":"Zetadocs Expenses provides a powerful solution that's simple to manage","ty":"Image","r":3,"c":0,"rp":2},{"t":"Zetadocs Delivery helps businesses reduce document delivery costs","ty":"Image","r":3,"c":0,"rp":3},{"t":"AI adoption in the UK is booming, especially in finance and accounting","ty":"Article/Link","r":2,"c":0,"rp":1},{"t":"With reporting from Zetadocs Expenses, your finance team gets real-time insight","ty":"Image","r":0,"c":0,"rp":0},{"t":"How does OCR work in AP automation, and why is it so important","ty":"Article/Link","r":0,"c":0,"rp":1},{"t":"Recently, the team got together in London for our company-wide meet up","ty":"Carousel","r":5,"c":0,"rp":0},{"t":"Don't miss out","ty":"Image","r":1,"c":0,"rp":0},{"t":"What is the Zetadocs FactBox and how does it work","ty":"Video","r":3,"c":0,"rp":1},{"t":"Read our latest whitepaper on the hidden costs often overlooked","ty":"Image","r":5,"c":0,"rp":2}]},{"name":"Medius","posts":[{"t":"The most significant financial leaks in transportation rarely appear on the invoice header","ty":"Image","r":7,"c":0,"rp":0},{"t":"Late payments affect most businesses, even those using e-invoicing","ty":"Image","r":10,"c":0,"rp":2},{"t":"Is your payment mix actually working for you - or against you","ty":"Image","r":11,"c":0,"rp":2},{"t":"Finance and diplomacy have more in common than you'd think","ty":"Carousel","r":120,"c":1,"rp":7},{"t":"Nobody goes into a finance role thinking 'I can't wait to manage late payments'","ty":"Image","r":12,"c":0,"rp":1},{"t":"Thorlux Lighting's journey to AP excellence - from manual bottlenecks to efficiency","ty":"Image","r":29,"c":0,"rp":4},{"t":"Manual exception handling","ty":"Image","r":24,"c":1,"rp":2},{"t":"If July gives you a little breathing room, why not learn something new about AP","ty":"Document/carousel","r":9,"c":0,"rp":1},{"t":"Many legacy AP systems weren't built for the complexity of freight charges","ty":"Image","r":21,"c":0,"rp":3},{"t":"A new edition of MediusExplains","ty":"Document/carousel","r":8,"c":0,"rp":1},{"t":"E-invoicing is no longer just a compliance checkbox - it's becoming a competitive edge","ty":"Image","r":11,"c":0,"rp":5},{"t":"Looking forward to this","ty":"Image","r":25,"c":0,"rp":5},{"t":"Garment manufacturing doesn't slow down for admin","ty":"Image","r":15,"c":0,"rp":0},{"t":"How is AI revolutionizing manufacturing AP processes","ty":"Image","r":14,"c":0,"rp":2},{"t":"Medius has reached 30,000 LinkedIn followers","ty":"Image","r":76,"c":0,"rp":0},{"t":"Three days","ty":"Carousel","r":69,"c":7,"rp":0},{"t":"An amazing day 1 at the Gartner Finance Symposium/Xpo 2026","ty":"Carousel","r":108,"c":0,"rp":5},{"t":"This isn't a product announcement","ty":"Image","r":72,"c":0,"rp":8},{"t":"As a gold sponsor of DynamicsMinds 2026, the Medius team will be in Portoroz, Slovenia","ty":"Image","r":37,"c":3,"rp":1},{"t":"We earned four Customer Value distinction honors in The Hackett Group","ty":"Image","r":25,"c":0,"rp":3},{"t":"Meet us at the Gartner Finance Symposium & Xpo in the UK this June","ty":"Image","r":19,"c":1,"rp":3},{"t":"E-invoicing is no longer just a compliance initiative","ty":"Image","r":43,"c":2,"rp":9},{"t":"The average non-PO invoice takes 7 days","ty":"Image","r":42,"c":0,"rp":6},{"t":"The global shift to e-invoicing: are you ready","ty":"Document/carousel","r":13,"c":1,"rp":4},{"t":"If fraud prevention and supplier headaches are on your radar, this one's worth a lunch break","ty":"Image","r":10,"c":0,"rp":1},{"t":"In construction, slow AP processes are a bottleneck","ty":"Document/carousel","r":12,"c":0,"rp":4},{"t":"Four things AP automation handles that your ERP was never designed for","ty":"Image","r":39,"c":4,"rp":8},{"t":"Rapid growth in logistics masks rising operational complexity","ty":"Document/carousel","r":16,"c":1,"rp":2},{"t":"Yesterday in Utrecht, Medius hosted its very first CFO Circle Benelux","ty":"Video","r":76,"c":4,"rp":7},{"t":"Good accounts payable management isn't an afterthought in retail","ty":"Image","r":27,"c":0,"rp":0}]},{"name":"Qvalia","posts":[{"t":"E-invoicing mandates are becoming infrastructure decisions","ty":"Image","r":3,"c":0,"rp":0},{"t":"The new Billentis report on the global e-invoicing market is here","ty":"Image","r":6,"c":1,"rp":0},{"t":"Slovakia's eFaktura framework is another step in Europe's transition to structured invoicing","ty":"Image","r":26,"c":0,"rp":2},{"t":"Qvalia is now certified for Slovakia e-invoicing under the eFaktura framework","ty":"Image","r":31,"c":1,"rp":6},{"t":"Qvalia's Business Continuity Management System certified against ISO 22301","ty":"Image","r":6,"c":0,"rp":1},{"t":"Qvalia is now listed in the Cloud Security Alliance STAR Registry","ty":"Image","r":8,"c":1,"rp":0},{"t":"Qvalia is now available on iPhone and Android","ty":"Image","r":42,"c":5,"rp":5},{"t":"In 2025, we expanded Qvalia's platform across nearly all fronts","ty":"Image","r":13,"c":1,"rp":2},{"t":"[Peppol for developers] How to get started with Peppol API","ty":"Image","r":9,"c":0,"rp":1},{"t":"Belgium mandates Peppol e-invoicing for most B2B transactions on January 1, 2026","ty":"Image","r":9,"c":0,"rp":1},{"t":"A timeline of finance tech: from 1940s credit scoring to modern ML","ty":"Carousel","r":7,"c":0,"rp":0},{"t":"Few areas are better positioned to gain more from the AI revolution than finance","ty":"Image","r":5,"c":0,"rp":0},{"t":"Summer reading no 4: The definitive guide to Peppol","ty":"Document/carousel","r":7,"c":0,"rp":0},{"t":"Summer reading no 3: Peppol e-orders - how it works & how to get started","ty":"Document/carousel","r":12,"c":0,"rp":2}]},{"name":"AMC Banking","posts":[{"t":"Before summer kicks off - a small milestone from AMC Banking (own SWIFT BIC)","ty":"Image","r":11,"c":1,"rp":2},{"t":"Your biggest compliance risk might be a process nobody questions anymore","ty":"Article/Link","r":6,"c":0,"rp":2},{"t":"Thanks to everybody who showed up for the reception in our new building","ty":"Carousel","r":29,"c":1,"rp":0},{"t":"You can still register for our reception next week","ty":"Text","r":0,"c":0,"rp":0},{"t":"AMC Banking operates under Service Provider Agreements with selected banks","ty":"Text","r":9,"c":0,"rp":0},{"t":"AMC is expanding - we are currently looking for a Java developer","ty":"Article/Link","r":12,"c":0,"rp":3},{"t":"Still uploading payment files manually?","ty":"Article/Link","r":6,"c":0,"rp":0},{"t":"We're moving and we'd love to celebrate with you","ty":"Text","r":12,"c":0,"rp":1},{"t":"The torch has officially been passed - moving into Kobenhavns Frikirke","ty":"Image","r":56,"c":4,"rp":1},{"t":"Enterprise treasury demands structure, visibility, and control","ty":"Image","r":7,"c":0,"rp":0},{"t":"You can still sign up for our webinar tomorrow (treasury deep dive)","ty":"Article/Link","r":4,"c":0,"rp":0},{"t":"How AMC Banking's intelligent cash sweeping works for Microsoft Dynamics","ty":"Video","r":11,"c":0,"rp":0},{"t":"In case you haven't signed up for our treasury extension webinar on cash sweeping","ty":"Article/Link","r":5,"c":0,"rp":0},{"t":"We're excited to team up with Columbus to show how liquidity management can be automated","ty":"Image","r":6,"c":0,"rp":2},{"t":"Convenience is the key word for our AMC Banking app","ty":"Text","r":8,"c":0,"rp":0},{"t":"We've got two seats open at AMC Banking - a Finance & Operations Developer and more","ty":"Text","r":9,"c":0,"rp":0}]},{"name":"B2Brouter","posts":[{"t":"La reforme de la facturation electronique en France ne se limite pas au choix d'une plateforme","ty":"Article/Link","r":0,"c":0,"rp":0},{"t":"Do you have clients, suppliers or subsidiaries in Germany?","ty":"Document/carousel","r":3,"c":0,"rp":0},{"t":"La solucion publica de facturacion electronica de la AEAT","ty":"Document/carousel","r":7,"c":1,"rp":0},{"t":"France's e-invoicing reform is not just about sending invoices (via Capde)","ty":"Image","r":2,"c":0,"rp":1},{"t":"La facturation electronique arrive en France","ty":"Article/Link","r":5,"c":0,"rp":1},{"t":"Proximos webinars | Julio 2026","ty":"Image","r":1,"c":0,"rp":1},{"t":"Upcoming webinars | July 2026","ty":"Image","r":1,"c":0,"rp":0},{"t":"Empfangen ist nicht gleich Verarbeiten (DE)","ty":"Document/carousel","r":3,"c":0,"rp":0},{"t":"Tu tienda online no puede permitirse facturar 'a mano' (ES)","ty":"Image","r":11,"c":0,"rp":3},{"t":"We're excited to announce our partnership with B2Brouter","ty":"Document/carousel","r":28,"c":2,"rp":7},{"t":"La factura electronica obligatoria ya tiene marco regulatorio (ES)","ty":"Article/Link","r":5,"c":0,"rp":0},{"t":"Electronic invoicing is no longer just about tax compliance, it's about data liquidity","ty":"Document/carousel","r":5,"c":0,"rp":1},{"t":"B2Brouter attended Peppol Conference Europe 2026 in Brussels","ty":"Carousel","r":15,"c":0,"rp":2},{"t":"Eine E-Rechnung zu empfangen bedeutet nicht, sie auch zu verarbeiten (DE)","ty":"Text","r":2,"c":0,"rp":1},{"t":"B2Brouter shares a day with partners at ERP Summit Espana","ty":"Image","r":40,"c":0,"rp":2},{"t":"Crees que Ley Crea y Crece y VeriFactu son lo mismo? (ES)","ty":"Document/carousel","r":8,"c":0,"rp":1},{"t":"In 8 days, B2Brouter will attend Peppol Conference Europe 2026 in Brussels","ty":"Text","r":5,"c":0,"rp":2},{"t":"Great reflection from Henrik Moller on a topic often overlooked in e-invoicing","ty":"Text","r":1,"c":0,"rp":0},{"t":"Upcoming webinars | June 2026","ty":"Image","r":8,"c":0,"rp":2},{"t":"Manana hablaremos sobre la Ley Crea y Crece y la nueva facturacion electronica (ES)","ty":"Image","r":3,"c":0,"rp":0},{"t":"Compliance gets companies through the door, but interoperability defines the future","ty":"Text","r":10,"c":0,"rp":1},{"t":"La facturation electronique, un levier de simplification pour les PME francaises","ty":"Document/carousel","r":4,"c":0,"rp":1},{"t":"Choisir sa Plateforme Agreee ne devrait pas se faire dans l'urgence (FR)","ty":"Document/carousel","r":10,"c":2,"rp":2},{"t":"Tu despacho ya no tiene por que perseguir facturas una y otra vez (ES)","ty":"Document/carousel","r":9,"c":0,"rp":1},{"t":"La factura electronica obligatoria no va solo de dejar atras el papel (ES)","ty":"Document/carousel","r":12,"c":0,"rp":1},{"t":"Many companies in Belgium think choosing a Peppol provider is a one-way decision","ty":"Document/carousel","r":7,"c":0,"rp":0},{"t":"La JFE 2026 a confirme une chose essentielle sur la reforme de la facturation (FR)","ty":"Carousel","r":28,"c":2,"rp":4},{"t":"Estem molt contents que MetaData hagi posat el focus en nosaltres (CA)","ty":"Article/Link","r":7,"c":0,"rp":1},{"t":"Meet our Support team","ty":"Document/carousel","r":4,"c":0,"rp":1},{"t":"We've launched B2Brouter's Startups Programme","ty":"Document/carousel","r":13,"c":0,"rp":3}]},{"name":"Dooap","posts":[{"t":"Every AP Manager knows this feeling: you spot the fix, but IT has a three-week queue","ty":"Article/Link","r":11,"c":0,"rp":3},{"t":"Last time we said 'something new is coming', we introduced Dooap Studio - agentic AP","ty":"Image","r":25,"c":0,"rp":3},{"t":"Somewhere right now an AP manager is refreshing their inbox hoping an approval appeared","ty":"Image","r":17,"c":0,"rp":2},{"t":"We are here - find the team and table next to registration","ty":"Video","r":24,"c":2,"rp":0},{"t":"The Dynamics community is coming to Toronto - and so are we","ty":"Image","r":16,"c":0,"rp":1},{"t":"Excited to introduce our latest Dooap Unleashed: Run With Us - Eftsure","ty":"Video","r":39,"c":2,"rp":1},{"t":"This is what agentic AP automation looks like (Dooap Studio)","ty":"Video","r":17,"c":0,"rp":6},{"t":"AP automation doesn't stop at the invoice - so why should your tech stack?","ty":"Video","r":71,"c":10,"rp":3},{"t":"We saw a clear shift across DynamicsCon2026 and DynamicsMinds2026","ty":"Image","r":21,"c":0,"rp":0},{"t":"Well, that's a wrap on DynamicsMinds","ty":"Carousel","r":70,"c":4,"rp":0},{"t":"Great conversations","ty":"Video","r":9,"c":1,"rp":0},{"t":"Set up and ready for 'Herd your AP with AI Agents'","ty":"Image","r":28,"c":2,"rp":3},{"t":"The biggest problem in finance isn't the system","ty":"Video","r":21,"c":3,"rp":1},{"t":"Sam Bush live here in Helsinki","ty":"Video","r":66,"c":4,"rp":0},{"t":"What does AI literacy actually look like for a Dynamics 365 Finance team in 2026","ty":"Article/Link","r":10,"c":0,"rp":1},{"t":"Love spending time with our partners all year around","ty":"Video","r":9,"c":0,"rp":2},{"t":"With AP you have a lot of balls in the air - let Dooap help you herd them","ty":"Carousel","r":57,"c":1,"rp":2},{"t":"Something new is coming","ty":"Image","r":20,"c":1,"rp":4},{"t":"Join us at the Dynamic Communities Summit NA Roadshow in Vancouver","ty":"Carousel","r":16,"c":0,"rp":3},{"t":"Approving invoices shouldn't keep you tied to your desk","ty":"Article/Link","r":10,"c":1,"rp":3},{"t":"We are here in Tampa to talk about AI and AP for Dynamics 365 Finance","ty":"Image","r":49,"c":3,"rp":0},{"t":"Our AP automation solution is designed for Microsoft D365FO","ty":"Document/carousel","r":4,"c":0,"rp":0},{"t":"Great AP automation happens before you even know it","ty":"Video","r":16,"c":0,"rp":1},{"t":"Thank you, Ellipse Solutions, for the highlight","ty":"Image","r":6,"c":0,"rp":0},{"t":"Considering AP Automation for D365 Finance or BC","ty":"Article/Link","r":9,"c":0,"rp":2},{"t":"Dooap the Dog and the team ready to show you AP automation","ty":"Image","r":10,"c":0,"rp":1},{"t":"Next week - Wonderful, wonderful Copenhagen","ty":"Image","r":11,"c":1,"rp":2},{"t":"Hear from one of our partners, Dana Chirieac from GraVoc","ty":"Video","r":8,"c":0,"rp":2},{"t":"Continuing 'My one word for Dooap' - here's what Norman Maxwell said","ty":"Article/Link","r":15,"c":0,"rp":2},{"t":"Since we started, we have not lost a single customer","ty":"Article/Link","r":11,"c":1,"rp":2}]},{"name":"Yavrio","posts":[{"t":"A big couple of weeks for the Yavrio team - across North America and the UK","ty":"Carousel","r":69,"c":1,"rp":0},{"t":"Cards on the Table (Yavrio Cards)","ty":"Carousel","r":44,"c":7,"rp":2},{"t":"We're delighted to announce our partnership with Sabre Limited","ty":"Image","r":34,"c":6,"rp":0},{"t":"260+ hours a year (finance time saved)","ty":"Image","r":15,"c":0,"rp":1},{"t":"For finance teams still importing bank statements by CSV into Dynamics 365 BC","ty":"Document/carousel","r":14,"c":0,"rp":1},{"t":"We are live now with Western Computer for our joint session on banking in Dynamics","ty":"Text","r":7,"c":0,"rp":0},{"t":"Meet our North America Sales Director, Joshua Wilkinson","ty":"Image","r":59,"c":6,"rp":1},{"t":"Still moving bank data into your finance system one CSV at a time?","ty":"Video","r":27,"c":0,"rp":1},{"t":"The payment is accepted. But is the finance work actually done?","ty":"Image","r":48,"c":1,"rp":0},{"t":"What a 2026 Yavrio is having so far","ty":"Carousel","r":110,"c":9,"rp":0},{"t":"DynamicsMinds 2026 is done and what a week it's been","ty":"Carousel","r":108,"c":5,"rp":0},{"t":"Finance teams BEFORE vs AFTER Yavrio","ty":"Video","r":48,"c":5,"rp":0},{"t":"DynamicsMinds 2026","ty":"Image","r":61,"c":5,"rp":2},{"t":"DynamicsCon 2026 wrapped and what a few days it was","ty":"Carousel","r":55,"c":2,"rp":0},{"t":"Feet on the ground at Directions ASIA 2026 in Vietnam","ty":"Carousel","r":68,"c":1,"rp":1},{"t":"Hello from a roasting Las Vegas - DynamicsCon2026","ty":"Image","r":99,"c":10,"rp":1},{"t":"Sponsoring and attending Directions North America in Orlando","ty":"Image","r":62,"c":4,"rp":1},{"t":"Yavrio is a WINNER of the Scaleup category at Innovate Finance","ty":"Image","r":160,"c":22,"rp":1},{"t":"Every card payment sets off a chain of events most people never see","ty":"Image","r":25,"c":3,"rp":1},{"t":"Directions North America is nearly here and the Yavrio team is ready for Orlando","ty":"Image","r":65,"c":3,"rp":3},{"t":"Yavrio Out and About - This Week","ty":"Carousel","r":66,"c":3,"rp":0},{"t":"Finance teams shouldn't be spending their time chasing transactions","ty":"Image","r":24,"c":1,"rp":0},{"t":"Team Yavrio on the ground at the Microsoft AI Tour in Copenhagen","ty":"Image","r":53,"c":2,"rp":1},{"t":"Yavrio Out & About: one of the biggest events in global tourism","ty":"Carousel","r":36,"c":3,"rp":0},{"t":"Big news","ty":"Image","r":46,"c":2,"rp":6},{"t":"The pace of technological change in financial services isn't slowing","ty":"Carousel","r":50,"c":4,"rp":0},{"t":"Today we launched something special","ty":"Carousel","r":53,"c":3,"rp":3},{"t":"Today we're launching Yavrio Cards: a cards payment solution embedded inside Microsoft Dynamics","ty":"Image","r":131,"c":9,"rp":5},{"t":"More big news from Yavrio this week (leadership investment)","ty":"Image","r":75,"c":20,"rp":2},{"t":"Proud to be sponsoring the Microsoft AI Tour in Copenhagen","ty":"Image","r":49,"c":3,"rp":3}]},{"name":"Rillion","posts":[{"t":"AI transformation in finance is more about getting people onboard than the technology","ty":"Video","r":28,"c":3,"rp":4},{"t":"If you'd told us our favourite team events would be the ones you track on Strava","ty":"Carousel","r":15,"c":0,"rp":0},{"t":"48% of finance leaders say they want to be strategic advisors","ty":"Text","r":5,"c":0,"rp":0},{"t":"Rillion + Stratas: taking AP automation in the UK to the next level","ty":"Video","r":22,"c":2,"rp":2},{"t":"Spotted on top of the Empire State Building - Rillion","ty":"Image","r":35,"c":0,"rp":1},{"t":"If you're not optimizing your vacation as much as your AP processes","ty":"Document/carousel","r":10,"c":0,"rp":0},{"t":"Peter Egehoved (CFO Dreamdata) on where AI fits in finance","ty":"Text","r":57,"c":8,"rp":0},{"t":"If you recognise yourself in any of these, you're not alone","ty":"Document/carousel","r":7,"c":0,"rp":0},{"t":"Big news (Rillion + Pinewood.AI)","ty":"Image","r":49,"c":1,"rp":11},{"t":"Monika Pers (CFO) on where AI belongs in finance","ty":"Text","r":12,"c":1,"rp":0},{"t":"Just got back from two of the most energizing days I've had in a long time","ty":"Image","r":52,"c":8,"rp":1},{"t":"26% of CFOs say lack of AI competence is the single biggest barrier to adoption","ty":"Text","r":18,"c":1,"rp":1},{"t":"40% of CFOs see fraud and anomaly detection as the biggest AI opportunity in finance","ty":"Image","r":17,"c":1,"rp":1},{"t":"Our marketing team swapped their laptops for race bibs - Blodomloppet","ty":"Carousel","r":35,"c":3,"rp":1},{"t":"Last week we released The Nordic Finance AI Report 2026","ty":"Image","r":13,"c":0,"rp":1},{"t":"Rillion AI Day","ty":"Image","r":53,"c":14,"rp":1},{"t":"Most companies invest in automating existing processes, not in questioning them","ty":"Document/carousel","r":25,"c":1,"rp":1},{"t":"250 CFOs across Sweden, Denmark and Finland told us where AI in finance actually stands","ty":"Document/carousel","r":18,"c":7,"rp":3},{"t":"Lots of travel these past few weeks, but it's experiences like these that make the job","ty":"Carousel","r":57,"c":3,"rp":2},{"t":"Still reflecting on the conversations at Sage Future in San Francisco","ty":"Image","r":63,"c":4,"rp":1},{"t":"Puppies and candy","ty":"Carousel","r":65,"c":5,"rp":1},{"t":"Kicking off an exciting few days at DynamicsCon","ty":"Carousel","r":52,"c":8,"rp":2},{"t":"Week two of three back-to-back industry events - ERP Summit","ty":"Image","r":45,"c":0,"rp":1},{"t":"When new to SaaS, you learn from the SaaSiest","ty":"Image","r":92,"c":4,"rp":1},{"t":"We are officially live at Sage Future - swing by the Rillion booth","ty":"Image","r":62,"c":4,"rp":2},{"t":"Sage Intacct users, this one's for you","ty":"Document/carousel","r":23,"c":2,"rp":5},{"t":"Our CEO Daniel de Sousa joined a conversation at the Swedish Parliament","ty":"Video","r":45,"c":1,"rp":1},{"t":"Will we see you at CFOradar 2026 next week","ty":"Image","r":24,"c":0,"rp":1},{"t":"There's A LOT of talk about AI in finance right now","ty":"Video","r":14,"c":2,"rp":0},{"t":"Are you vibe coding tools for your finance team","ty":"Image","r":16,"c":1,"rp":4}]},{"name":"Fidesic","posts":[{"t":"How to set up your purchase order matching","ty":"Article/Link","r":0,"c":0,"rp":0},{"t":"AI and human ingenuity are powering a bold new operating model","ty":"Image","r":0,"c":0,"rp":0},{"t":"Modern AI-based invoice capture uses ML models trained on millions of invoices","ty":"Article/Link","r":0,"c":0,"rp":0},{"t":"Unsurprisingly, not all AI projects are a success","ty":"Carousel","r":1,"c":0,"rp":0},{"t":"Fidesic is the strongest AP automation choice for organizations running Microsoft Dynamics","ty":"Article/Link","r":0,"c":0,"rp":0},{"t":"95% of enterprise generative AI pilots fail to deliver measurable results","ty":"Video","r":9,"c":1,"rp":2},{"t":"Financial close is evolving from a manual task to an automated, continuous process","ty":"Image","r":1,"c":0,"rp":0},{"t":"95% of enterprise generative AI pilots fail to deliver any measurable P&L impact","ty":"Article/Link","r":2,"c":0,"rp":0},{"t":"Something hiding in plain sight in Dynamics GP that could make a difference","ty":"Article/Link","r":0,"c":0,"rp":0},{"t":"Did you know... (Fidesic fun fact)","ty":"Image","r":1,"c":0,"rp":1},{"t":"Fidesic has officially joined Knights of GP","ty":"Image","r":17,"c":2,"rp":3},{"t":"Why Accruals and Deferrals Matter for Financial Accuracy","ty":"Image","r":1,"c":0,"rp":0},{"t":"Budget pressure? It's AP's time to shine","ty":"Article/Link","r":0,"c":0,"rp":0},{"t":"If your team uses Microsoft Dynamics GP or BC to manage multiple locations","ty":"Image","r":4,"c":0,"rp":0},{"t":"Did you know...","ty":"Image","r":7,"c":1,"rp":1},{"t":"With only ... (post truncated in export)","ty":"Article/Link","r":1,"c":0,"rp":0},{"t":"Turning AP into a strategic function doesn't require a massive transformation","ty":"Article/Link","r":1,"c":0,"rp":0},{"t":"Microsoft Dynamics 365 Business Central is built for a wide range of business sizes","ty":"Article/Link","r":0,"c":0,"rp":0},{"t":"Who to see at DirectionsNA","ty":"Image","r":55,"c":3,"rp":1},{"t":"Attending Directions NA","ty":"Carousel","r":2,"c":0,"rp":0},{"t":"Directions NA 2026 is in full swing in Orlando with Day 1 keynote","ty":"Image","r":6,"c":1,"rp":1},{"t":"Huge thanks to ERP Software Blog for including us on their Best ERP Tools list","ty":"Image","r":7,"c":2,"rp":2},{"t":"Stop by the booth and say Hi","ty":"Image","r":18,"c":0,"rp":2},{"t":"The teams from PayTrace and Fidesic AP will be at Directions North America in Orlando","ty":"Carousel","r":18,"c":2,"rp":5},{"t":"When an AP tool is built natively inside Business Central, implementation looks different","ty":"Image","r":0,"c":0,"rp":0},{"t":"Almost two weeks away from DirectionsNA","ty":"Image","r":21,"c":3,"rp":1},{"t":"Have you seen Fidesic Free","ty":"Image","r":1,"c":0,"rp":0},{"t":"Wire transfers are a reliable way to send and receive money, but they have limitations","ty":"Image","r":2,"c":1,"rp":0},{"t":"Deploying a new invoice management system across your entire vendor network at once","ty":"Article/Link","r":2,"c":0,"rp":0},{"t":"The AP Turnover Ratio gives you frequency","ty":"Article/Link","r":0,"c":0,"rp":0}]},{"name":"Tipalti","posts":[{"t":"Mechanical, performance, sync, master recording","ty":"Image","r":0,"c":0,"rp":0},{"t":"Before Tipalti, Thematic's finance team manually managed international payments","ty":"Video","r":4,"c":0,"rp":1},{"t":"When did your team last screen a supplier for sanctions exposure?","ty":"Image","r":4,"c":0,"rp":0},{"t":"Brought the Israeli Design Leadership community together at the Tipalti office","ty":"Carousel","r":135,"c":14,"rp":3},{"t":"The Tipalti team will be in Berlin for the World Finance Forum","ty":"Image","r":12,"c":1,"rp":2},{"t":"Is your marketplace's payment infrastructure built to scale or just to function?","ty":"Article/Link","r":2,"c":0,"rp":0},{"t":"A hypothetical about manual processes","ty":"Text","r":4,"c":1,"rp":0},{"t":"Ask any finance team that's made the switch to automation what they regret","ty":"Text","r":1,"c":0,"rp":0},{"t":"Thematic: creators get free licensed music, artists get meaningful payouts","ty":"Image","r":8,"c":0,"rp":1},{"t":"Prodege expanded globally and maintained compliance throughout","ty":"Video","r":7,"c":0,"rp":1},{"t":"Trade fragmentation, high interest rates, tighter capital, and geopolitical uncertainty","ty":"Image","r":6,"c":0,"rp":0},{"t":"A 30-day close used to be normal","ty":"Image","r":12,"c":3,"rp":2},{"t":"Finance leaders are operating in a different environment than a few years ago","ty":"Image","r":10,"c":0,"rp":1},{"t":"DreamHost's finance team wanted full visibility of every transaction","ty":"Video","r":5,"c":0,"rp":0},{"t":"The next chapter of digital commerce is being executed by AI acting for consumers","ty":"Image","r":4,"c":0,"rp":1},{"t":"Cubic Games was managing over 180 vendors across global markets","ty":"Image","r":8,"c":0,"rp":0},{"t":"Manual payment processes don't scale","ty":"Text","r":10,"c":0,"rp":0},{"t":"A few days out from World Finance Forum in Amsterdam and the Tipalti team is ready","ty":"Image","r":7,"c":0,"rp":0},{"t":"Splice's finance team would spend two weeks every quarter on manual work","ty":"Image","r":9,"c":0,"rp":0},{"t":"We're heading your way, Vancouver","ty":"Video","r":10,"c":0,"rp":1},{"t":"Proud to sponsor the Spring 2026 CFO Leadership Conference in Boston","ty":"Carousel","r":81,"c":6,"rp":3},{"t":"Three-way matching by hand is tedious, error-prone, and slow","ty":"Image","r":21,"c":0,"rp":1},{"t":"The questions finance leaders are asking about AI has changed","ty":"Video","r":127,"c":4,"rp":6},{"t":"Approval bottlenecks don't just slow down payments","ty":"Image","r":17,"c":2,"rp":2},{"t":"For a gaming studio managing over 180 active vendors, AP was a challenge","ty":"Image","r":9,"c":0,"rp":0},{"t":"Tariffs and trade fragmentation are reshaping the global economy","ty":"Image","r":6,"c":0,"rp":0},{"t":"The bar for enterprise software has been quietly reset","ty":"Image","r":3,"c":0,"rp":0},{"t":"Show me all unpaid invoices over $10K","ty":"Image","r":13,"c":0,"rp":0},{"t":"Five years ago, Lantern Community Services ran on paper","ty":"Image","r":5,"c":0,"rp":0},{"t":"Technology investments are growing faster and more complex than ever","ty":"Image","r":5,"c":0,"rp":0}]},{"name":"Stampli","posts":[{"t":"I spent ten years as an accountant before I ever touched marketing","ty":"Video","r":49,"c":3,"rp":4},{"t":"What changes when finance teams can analyze data that used to be slow and manual","ty":"Article/Link","r":13,"c":0,"rp":1},{"t":"Finance teams don't run out of good questions","ty":"Document/carousel","r":31,"c":0,"rp":12},{"t":"Accounts Payable is where Procure-to-Pay either works or breaks","ty":"Article/Link","r":16,"c":0,"rp":6},{"t":"Vendor renewal coming up? A lot can change since the last contract","ty":"Article/Link","r":11,"c":1,"rp":4},{"t":"Strong customer feedback on real value - one connected P2P story","ty":"Article/Link","r":37,"c":1,"rp":16},{"t":"Finance teams don't run out of useful questions","ty":"Article/Link","r":22,"c":1,"rp":6},{"t":"ACH risks don't start at the bank portal - they often start earlier","ty":"Article/Link","r":17,"c":3,"rp":7},{"t":"Meaningful savings can hide in everyday finance data","ty":"Image","r":30,"c":3,"rp":10},{"t":"Built to scale your business, not your headcount","ty":"Article/Link","r":25,"c":0,"rp":11},{"t":"Vendor concentration risk is hiding in your AP data","ty":"Article/Link","r":11,"c":0,"rp":1},{"t":"Day 2 at SageFuture and the energy is still going strong","ty":"Image","r":42,"c":1,"rp":1},{"t":"Day 1 of SageFuture in the books","ty":"Carousel","r":91,"c":1,"rp":5},{"t":"We're about to see the death of the dashboard","ty":"Image","r":82,"c":8,"rp":23},{"t":"Budget variance usually doesn't start with one big decision","ty":"Article/Link","r":7,"c":0,"rp":2},{"t":"Cash flow opportunities often hide in Accounts Payable","ty":"Article/Link","r":18,"c":2,"rp":4},{"t":"The data moving through finance systems holds a story teams never see","ty":"Article/Link","r":25,"c":1,"rp":6},{"t":"The most valuable signals in finance are buried where traditional BI can't reach","ty":"Video","r":52,"c":2,"rp":6},{"t":"We're launching something big: an agentic financial analyst you can ask anything","ty":"Video","r":145,"c":3,"rp":21},{"t":"Ask your agentic financial analyst anything","ty":"Video","r":39,"c":0,"rp":22},{"t":"A great time at the Nashville career fair","ty":"Carousel","r":43,"c":1,"rp":5},{"t":"Stampli Deep Finance transforms raw finance data into executive spend intelligence","ty":"Article/Link","r":46,"c":2,"rp":29},{"t":"America's Group automated workflows instead of hiring more AP staff with every acquisition","ty":"Article/Link","r":14,"c":0,"rp":6},{"t":"No matter your ERP, Stampli fits right in","ty":"Article/Link","r":17,"c":0,"rp":9},{"t":"Corporate cards don't have to mean losing control of spend","ty":"Article/Link","r":17,"c":0,"rp":5},{"t":"Finance professionals paired with the right platform turn complexity into advantage","ty":"Image","r":11,"c":0,"rp":3},{"t":"We're grateful for all our customers","ty":"Article/Link","r":65,"c":0,"rp":35},{"t":"Those little clicks add up","ty":"Video","r":25,"c":0,"rp":10}]}]},"news":{"events":[{"w":"Sept 2026 →","c":"steady","t":"<b>France B2B e-invoicing</b> mandate takes effect — large and mid-size companies must send and receive structured e-invoices. SMEs follow September 2027."},{"w":"Jul 3, 2026","c":"ai","t":"<b>Rillion</b> strengthens its UK partnership with Stratas to accelerate AI-native AP automation (AI capture, Riley assistant) in a strategic growth market."},{"w":"Jul 2026","c":"ai","t":"<b>Microsoft</b> expands the BC Expense Agent preview beyond the US to the UK, Australia and New Zealand, with more languages and markets to follow."},{"w":"Jul 1, 2026","c":"steady","t":"<b>UAE e-invoicing</b> rollout begins for large businesses (revenue ≥ AED 50M); <b>Pagero</b> is listed as a pre-approved accredited service provider."},{"w":"Jul 1, 2026","c":"cons","t":"<b>Tungsten Automation</b> (ex-Kofax) lenders sign a cooperation pact to negotiate a possible debt restructuring ahead of ~$150M maturities — a distress signal for the Clearlake/TA-backed IDP + AP vendor."},{"w":"Jun 30, 2026","c":"steady","t":"<b>Saudi Arabia (ZATCA)</b> Fatoora e-invoicing Wave 24 integration deadline — the first wave to reach businesses with VAT revenue above SAR 375K, pulling thousands of smaller firms into mandatory clearance."},{"w":"Jun 30, 2026","c":"cons","t":"<b>onPhase</b> (ex-DocuPhase) partners with <b>TransferMate</b> to add embedded cross-border / international payments to its finance-automation platform."},{"w":"Jun 24, 2026","c":"cons","t":"<b>Tipalti</b> signals a public offering is its most likely path (not acquisition), targeting sustained profitability by early 2027 — ~6,500 customers and ~$90B annual payment volume."},{"w":"Jun 24, 2026","c":"steady","t":"<b>France (DGFiP)</b> confirms the B2B e-invoicing mandate stays on schedule for Sept 1, 2026 while signalling an informal grace period — no automatic sanctions for good-faith filers at launch."},{"w":"Jun 23, 2026","c":"steady","t":"<b>UK (HMRC)</b> names Peppol as the core interoperability network for e-invoicing in its Tax Update 2026 paper — a first formal endorsement ahead of an expected April 2029 mandate."},{"w":"June 23, 2026","c":"ai","t":"<b>Gartner</b> publishes its 2026 Magic Quadrant for Accounts Payable Applications — <b>Medius</b> is named a Leader (alongside Basware, Coupa and Esker)."},{"w":"June 19, 2026","c":"ai","t":"<b>Microsoft</b> extends the BC Expense Agent (2026 Wave 1) with an AI approval step — it validates expense reports against plain-language policies and guides approvers (public preview Jul 2026)."},{"w":"June 16, 2026","c":"ai","t":"<b>Forrester</b> publishes <i>The Forrester Wave: AP Invoice Automation Software, Q2 2026</i> — agentic AI shifts AP from automation toward proactive, autonomous finance operations."},{"w":"June 9, 2026","c":"cons","t":"<b>AvidXchange</b> launches Payment Automation for Workday on the Workday Marketplace — extending its 1.5M-supplier AvidPay network into Workday Financial Management."},{"w":"June 4, 2026","c":"cons","t":"<b>Lasernet Group</b> (formerly Formpipe Software) receives a recommended SEK 30/share public cash takeover from a PE-led Tabellae BidCo consortium (~SEK 879M, +53.8%); the board backs it, acceptance 22 Jun–22 Jul 2026."},{"w":"June 2, 2026","c":"ai","t":"<b>Microsoft Build 2026</b> reframes the PC as an agentic OS — Windows Agent Framework open-sourced, Office Agent Mode runs agents natively."},{"w":"June 2026","c":"ai","t":"<b>Truvio</b> (formerly SignUp Software/ExFlow) completes its rebrand and ships TruvioSense Coding & Approval — AI/LLM invoice-coding suggestions in D365 F&O."},{"w":"May 11, 2026","c":"ai","t":"<b>Dooap</b> launches Dooap Studio — agentic AI platform."},{"w":"May 13, 2026","c":"steady","t":"<b>Zetadocs</b> Expenses May update (cloud, browser, iOS, Android)."},{"w":"Apr 30, 2026","c":"ai","t":"<b>BC 2026 Wave 1</b> ships two GA AI agents and MCP Server support — custom AL agents can now be built natively inside Business Central."},{"w":"Apr 28, 2026","c":"ai","t":"<b>Tungsten</b> previews TotalAgility 2026.2 with agentic AI features (London Summit)."},{"w":"Apr 28, 2026","c":"ai","t":"<b>Microsoft</b> introduces Expense Agent native to Business Central — AI-expense from the platform owner itself."},{"w":"Apr 14, 2026","c":"ai","t":"<b>Forrester</b> publishes Top Agentic AI Use Cases for AP 2026 — warns that agentic branding is widespread but real autonomy is rare; evaluators should prioritise production metrics over demos."},{"w":"Apr 2026","c":"ai","t":"<b>Tipalti</b> expands agentic AI to include tariff-refund processing."},{"w":"Mar 31, 2026","c":"ai","t":"<b>Stampli</b> launches Deep Finance — turning invoice data into consultant-grade executive spend intelligence."},{"w":"Early 2026","c":"ai","t":"<b>Medius</b> named Market Leader + Elite Performer for AI Innovation (Ardent Partners 2026)."},{"w":"Jan 22, 2026","c":"cons","t":"<b>Pagero</b> (Thomson Reuters) and Deloitte launch global e-invoicing alliance."},{"w":"Jan 21, 2026","c":"cons","t":"<b>onPhase</b> (DocuPhase) acquires enterprise AP player iPayables."},{"w":"Jan 20, 2026","c":"ai","t":"<b>Tungsten</b> hires new executives including its first Chief AI Officer."},{"w":"Jan 2026","c":"cons","t":"<b>ExFlow</b>/SignUp new F&O version; SignUp acquires DynamicWeb (e-commerce/PIM)."},{"w":"Jan 1, 2026","c":"steady","t":"<b>E-invoicing mandate</b> in Belgium takes effect — structured invoice via Peppol required."},{"w":"Oct 15, 2025","c":"cons","t":"<b>AvidXchange</b> taken private by TPG + Corpay for ~$2.2B."},{"w":"Autumn 2025","c":"ai","t":"<b>Tipalti</b> raises $200M (Hercules Capital) earmarked for AI."},{"w":"2025","c":"steady","t":"<b>Lasernet</b> (Formpipe) launches new BC connector with 20+ report types."},{"w":"Sep 2025","c":"ai","t":"<b>Dooap</b> achieves Microsoft Certified Software designation."}]},"competitors":[{"n":"ExFlow","o":"Truvio (formerly SignUp Software) · Stockholm","stance":"cons","sl":"Rebranded → Truvio + AI","prox":"High","cat":"AP automation · D365 F&O + BC","head":"Rebrand to Truvio complete — ExFlow, Axtension, DynamicWeb and SKSoft unified into one Microsoft-native portfolio, now shipping its own AI.","rel":"June 2026: AP Automation (powered by ExFlow) 2.19.0 for D365 F&O adds “TruvioSense Coding & Approval” — AI/LLM coding suggestions from previously approved invoices.","str":"Rebranded SignUp Software → Truvio, unifying ExFlow/Axtension/DynamicWeb/SKSoft into one D365-native suite (beyond pure AP).","pos":"Fully embedded/native in Dynamics — no third-party system.","ai":"TruvioSense adds LLM-based invoice interpretation + coding suggestions on top of the existing ML Predictions.","sc":"150+ employees · 1,300+ organisations","s":[["Truvio: What's New","https://truvio.com/whats-new"],["Rebrand","https://enterprisesoftwareexpress.com/signup-software-signs-up-for-a-new-name/"],["Release notes","https://docs.signupsoftware.com/finance-operations/docs/user-manual/whats-new-and-planned/release-notes"]]},{"n":"Dooap","o":"Dooap · Austin (Pagero)","stance":"ai","sl":"AI-aggressive","prox":"High","cat":"AP automation · D365 Finance (F&O)","head":"Launched a dedicated agentic AI product — the most offensive AI move in the space.","rel":"Dooap Studio, May 11 2026 — AP teams design and govern their own AI agents without IT.","str":"Agents for GL coding, PO matching, fraud and routing — with rationale, confidence score and audit trail.","pos":"Mobile-first, cloud-native — message: “AI you control.”","ai":"A standalone agent product, not just AI features.","sc":"Microsoft Certified Software (Sep 2025)","s":[["Dooap Studio (PR)","https://www.prnewswire.com/news-releases/dooap-inc-launches-dooap-studio-putting-agentic-ap-automation-directly-in-the-hands-of-finance-teams-302768534.html"],["YouTube","https://www.youtube.com/@dooap"]]},{"n":"Zetadocs","o":"Equisys","stance":"steady","sl":"Stable cadence","prox":"High","cat":"Delivery · Capture · Expenses · BC","head":"Consistent monthly release cadence; AI embedded in the core rather than big announcements.","rel":"Delivery & Capture updated Jan, Mar, May and Jul 2026 (Jul: captures extra vendor-invoice fields + smarter line-to-account learning); Expenses May 2026 (cloud, browser, iOS, Android).","str":"Three product lines kept in sync at a high release cadence.","pos":"Everything happens inside Business Central — one environment, less friction.","ai":"AI-driven data entry + automatic order/invoice matching.","sc":"3 product lines (Delivery · Capture · Expenses)","s":[["Jul 2026 update","https://www.equisys.com/blog/whats-new-in-zetadocs-delivery-and-zetadocs-capture-june-2026-update"],["May 2026 update","https://www.equisys.com/blog/whats-new-in-zetadocs-expenses-may-2026-update"],["Equisys blog","https://www.equisys.com/blog"]]},{"n":"Medius","o":"Medius","stance":"ai","sl":"Gartner MQ Leader","prox":"Medium","cat":"AP automation + spend/payments · multi-ERP","head":"Analyst-anointed AP leader — 2026 Gartner Magic Quadrant Leader + Ardent Elite Performer for AI Innovation; deep, autonomous AI across the full AP lifecycle.","rel":"Named a Leader in the 2026 Gartner Magic Quadrant for Accounts Payable Applications (Jun 23, 2026); also Ardent Partners 2026 Market Leader + Elite Performer for AI Innovation.","str":"SmartFlow (proprietary CNN), Medius Copilot, Supplier Conversations (autonomous email handling), “AI workmate”.","pos":"“Autonomous AP” — the finance team stays in control; own models rather than expensive LLMs for core work.","ai":"Claims to have the most of the AP/payments lifecycle automated with AI.","sc":"4,000+ customers · 102 countries · $200B spend/year","s":[["Gartner MQ 2026 (Medius)","https://www.prnewswire.com/news-releases/medius-placed-in-2026-gartner-magic-quadrant-for-accounts-payable-applications-302807993.html"],["Medius AI advantage","https://www.medius.com/ai-innovation/medius-ai-advantage/"],["Ardent 2026","https://www.medius.com/resources/guides-reports/2026-ap-automation-payments-technology-advisor/"]]},{"n":"Tipalti","o":"Tipalti · Foster City","stance":"ai","sl":"AI + capital","prox":"Low","cat":"Payables + global payments + procurement + expenses","head":"Raised $200M for AI; rolling out agents across the entire finance flow.","rel":"AI Assistant + AI agents (Invoice Capture, Bill Approvers, reporting, tax, purchase request); tariff-refund AI (Apr 2026).","str":"$200M round (Hercules, autumn 2025) earmarked for AI; agentic focus. Jun 2026: signalled a public offering as its most likely path (over acquisition), targeting sustained profitability by early 2027.","pos":"End-to-end payables + global payments in 200+ countries.","ai":"Conversational assistant + autonomous agents embedded across the entire platform.","sc":"~$90B payments/year · 6,500 customers","s":[["Tipalti AI agents","https://tipalti.com/accounts-payable-software/finance-ai/"],["American Banker","https://www.americanbanker.com/payments/news/tipalti-enhances-ai-tech-to-improve-tariff-refund-processing"],["IPO signal (Payments Dive)","https://www.paymentsdive.com/news/tipalti-counts-on-future-ipo-ai-finance-automation-software/823594/"]]},{"n":"Yooz","o":"Yooz · Dallas","stance":"ai","sl":"AI + fraud","prox":"Medium","cat":"AP / P2P automation · multi-ERP","head":"AI/Deep Learning P2P with a strong fraud focus; active in the BC and GP ecosystem.","rel":"YoozProtect (fraud, NA launch Jan 2026); Line-Level Matching (2025); Yooz 2026 AI in Finance report.","str":"AI + RPA + Big Data; fraud prevention as spearhead.","pos":"Simple, fast, secure cloud P2P; unlimited users.","ai":"Smart data extraction, routing and fraud detection.","sc":"5,000+ customers · 300,000 users","s":[["YoozProtect","https://www.getyooz.com/blog/yooz-protect-launch"],["Yooz + BC/GP","https://msdynamicsworld.com/blog/two-days-two-erps-how-yooz-powering-ap-automation-gp-and-business-central"]]},{"n":"Stampli","o":"Stampli · Mountain View","stance":"ai","sl":"AI veteran","prox":"Low","cat":"AP automation (invoice-centric) · 70+ ERPs","head":"AI (“Billy the Bot”) at the core for nearly 10 years; raised capital from Blackstone.","rel":"Stampli Deep Finance (Mar 2026) turns invoice data into consultant-grade executive spend intelligence; Stampli Card / Direct Pay; $61M Blackstone Series D (~$148M total); named a G2 Summer 2026 Leader for P2P + AP Automation (Jun 2026).","str":"Invoice-centric communication + “AI employee”.","pos":"Fast implementation (weeks, not months); approvers need no ERP access.","ai":"Positions itself on “proven” AI for capture, coding, routing, duplicates and fraud.","sc":"1,600+ customers · $80–85B invoices/year","s":[["Stampli AP","https://www.stampli.com/ap-automation/"],["Deep Finance","https://www.prnewswire.com/news-releases/stampli-launches-deep-finance-turning-invoice-data-into-executive-spend-intelligence-302729234.html"],["Blackstone funding","https://financialit.net/news/fundraising-news/stampli-secures-61m-advanced-ai-powered-ap-automation"]]},{"n":"AvidXchange","o":"TPG + Corpay · Charlotte","stance":"cons","sl":"Acquired (payments)","prox":"Low","cat":"AP + payment automation · mid-market","head":"Taken private by TPG + Corpay (~$2.2B, Oct 2025) — pointing toward payment rails.","rel":"Launched Payment Automation for Workday on the Workday Marketplace (Jun 2026); new COO Wade Fairey (Jun 2026); AI fraud/BEC detection in the AvidPay network.","str":"Take-private; Corpay stake → focus on payment volume and interchange.","pos":"Mid-market invoice-to-pay + AvidPay payment network.","ai":"AI for fraud/anomaly detection; later on the AI curve than pure AI players.","sc":"~$450M revenue · 25+ years of history","s":[["TPG/Corpay close","https://www.avidxchange.com/press-releases/tpg-corpay-complete-acquisition-of-avidxchange/"],["Workday integration","https://www.globenewswire.com/news-release/2026/06/09/3309047/37161/en/AvidXchange-Completes-Workday-Integration.html"],["Payments Dive","https://www.paymentsdive.com/news/avidxchange-tpg-corpay-accounts-payable-payments/747520/"]]},{"n":"Compleat","o":"Compleat Software · UK","stance":"steady","sl":"SMB / price","prox":"Low","cat":"P2P / AP automation + online buying","head":"Affordable P2P for smaller businesses; UK/EMEA focus, not Dynamics-first.","rel":"Capture + approval workflows + online buying; integration with Sage, Xero, QuickBooks.","str":"Affordable SaaS for all sizes; procurement + AP combined.","pos":"Cheap, simple access (subscription from a low price point).","ai":"AI-OCR for capture/coding — significantly less AI marketing than the big players.","sc":"500+ companies · EMEA/APAC/AMAC","s":[["Zone&Co 2026","https://www.zoneandco.com/articles/top-16-ap-automation-software-solutions-in-2026"],["Capterra","https://www.capterra.com/p/88208/Compleat-Purchase-to-Pay/"]]},{"n":"Tungsten Automation","o":"formerly Kofax · Irvine","stance":"ai","sl":"AI catch-up","prox":"Low","cat":"IDP / RPA + AP (InvoiceAgility)","head":"Rebranded from Kofax; betting hard on agentic AI to close the gap.","rel":"TotalAgility now GA in three tiers (Standard/Advanced/Enterprise) with agentic AI, Quick AI Agents and multi-agent orchestration; quarterly releases from 2026; InvoiceAgility for AP.","str":"Jan 2026: new executives incl. first Chief AI Officer; “AI-first” repositioning. CEO signals a possible 2027 exit (PE or strategic sale) as the sector consolidates (Jun 2026); Jul 2026: lenders signed a cooperation pact to negotiate a possible debt restructuring ahead of ~$150M maturities (Clearlake/TA-backed).","pos":"Broad intelligent automation (document/workflow) — large IDP revenue base.","ai":"Agentic AI now shipping (multi-agent orchestration); analysts said it was 9–12 months behind — now closing the gap.","sc":"~40 years of history · 70+ countries","s":[["TotalAgility platform","https://www.tungstenautomation.com/products/totalagility/release-highlights"],["Agentic AI hires","https://www.tungstenautomation.com/about/press-releases/2026/tungsten-automation-invests-in-innovation-and-agentic-ai-with-key-executive-hires"],["Deep Analysis","https://www.deep-analysis.net/boring-ai-how-tungsten-plans-to-move-beyond-its-idp-roots/"],["Exit signal (ION)","https://ionanalytics.com/insights/mergermarket/tungsten-automation-exit-possible-in-2027-as-buyer-appetite-builds-ceo/"],["Lenders' pact (Bloomberg)","https://www.bloomberg.com/news/articles/2026-07-01/lenders-to-clearlake-backed-tungsten-sign-pact-after-debt-slides"]]},{"n":"onPhase","o":"formerly DocuPhase · Tampa","stance":"cons","sl":"Acquisitive + rebrand","prox":"Low","cat":"AP + payments + document management","head":"Rebranded from DocuPhase; growing through acquisitions and embedded payments.","rel":"Acquisition of iPayables (Jan 2026) + Clearwater Payments; Bottomline Paymode network embedded; TransferMate partnership (Jun 2026) for embedded cross-border payments.","str":"AI-driven AP + embedded payments; 173% 3-year growth (Inc. 5000).","pos":"Unified finance automation for SMB → enterprise.","ai":"AI-driven capture/automation combined with payments.","sc":"Fast-growing · NetSuite-centric + others","s":[["onPhase news","https://www.onphase.com/news"],["Accounting automation","https://www.docuphase.com/accounting-automation"]]},{"n":"MineralTree","o":"Global Payments · Boston","stance":"cons","sl":"Payments-owned","prox":"Low","cat":"AP + payment automation · multi-ERP","head":"Owned by payments giant Global Payments; strength in multi-currency/international payments.","rel":"Multi-currency (TransferMate, 130+ currencies); enterprise multi-ERP focus.","str":"Part of Global Payments ($500M acquisition) → payment monetisation.","pos":"End-to-end invoice-to-pay, fraud protection, multi-ERP.","ai":"Less AI profiling; focus on payments and visibility.","sc":"3,000+ companies · mid-market → Fortune 500","s":[["Global Payments acq.","https://investors.globalpayments.com/news-events/press-releases/detail/23/global-payments-agrees-to-acquire-mineraltree-a-leader-in"],["Crunchbase","https://www.crunchbase.com/organization/mineraltree"]]},{"n":"Dime Scheduler","o":"Dime Software (Dimenics) · BE","stance":"steady","sl":"Adjacent (scheduling)","prox":"High","cat":"Visual resource/project planning · BC","head":"BC-native, but in a different category (scheduling) — ISV neighbour, not a direct AP rival.","rel":"Real-time BC sync, Gantt, drag-drop, capacity pivot, map/route planning; Outlook/Exchange sync.","str":"Visual planning layer on top of BC/NAV/CRM/Power Platform.","pos":"“Stop guessing, start planning” — easy to implement (~5 days).","ai":"Limited AI profile; strength is visual planning.","sc":"Subscription from ~€50/year · many languages","s":[["Features","https://www.dimescheduler.com/features"],["Microsoft Marketplace","https://marketplace.microsoft.com/en-us/product/web-apps/dimenics-3435744.dimescheduler"]]},{"n":"Microsoft Expense Agent","o":"Microsoft · native in BC","stance":"ai","sl":"Platform owner · AI","prox":"High","cat":"AI expense capture · native in Business Central","head":"The platform owner itself moving into the expense space with an AI agent — the most important BC-native development to watch.","rel":"Expense Agent introduced in D365 BC (Apr 2026); BC 2026 Wave 1 adds (Jun 19, 2026) an AI approval step that validates expense reports against company policies written in plain language and guides approvers — public preview Jul 2026. Preview expands beyond the US to the UK, Australia and New Zealand from Jul 2026.","str":"Microsoft building AI functionality directly into BC, overlapping with third-party expense solutions.","pos":"Native to the platform — no extra vendor, comes with Business Central.","ai":"AI expense agent embedded in the ERP — now also checks reports against natural-language policies at line, report and cross-line level, while leaving the final call to the approver.","sc":"Built into Microsoft Dynamics 365 Business Central","s":[["Microsoft blog","https://www.microsoft.com/en-us/dynamics-365/blog/it-professional/2026/04/27/expense-agent-dynamics-365-business-central/"],["Approval process (BC 2026 W1)","https://www.azurecurve.co.uk/2026/06/new-functionality-in-microsoft-dynamics-365-business-central-2026-wave-1-expense-agent-supports-approval-process/"],["Markets (MS Learn)","https://learn.microsoft.com/en-us/dynamics365/release-plan/2026wave1/smb/dynamics365-business-central/manage-expenses-business-central-using-expense-agent"]]},{"n":"Lasernet","o":"Lasernet Group · DK/UK","stance":"cons","sl":"Takeover bid · BC output","prox":"High","cat":"Document output & e-invoicing · BC + F&O","head":"BC-native output engine (rival to Continia Document Output) — now itself a take-private target under a recommended SEK 30/share cash offer.","rel":"Under a recommended public cash takeover — Tabellae BidCo (Valedo Partners + Mission Trail + Grenspecialisten) bids SEK 30/share (~SEK 879M, +53.8% premium); the board recommends it, acceptance runs 22 Jun–22 Jul 2026. Lasernet for BC stays live on AppSource (20+ report types, Azure AI mapping); Temenos Exchange Partner of the Year 2026; joined the IFS partner network.","str":"Formpipe Software AB renamed itself Lasernet Group AB (Nasdaq Stockholm ticker LASER, trading from Jun 9, 2026), focused solely on the Lasernet platform — now being taken private by a PE-led consortium.","pos":"Embedded in BC — design, send and archive documents without leaving the ERP.","ai":"Azure AI for data mapping; primarily strong on output/compliance rather than AI marketing.","sc":"20+ years of document expertise · global","s":[["Lasernet Group","https://www.lasernetgroup.com/news-blogs/bc-connector-now-on-appsource"],["Takeover offer (advisor)","https://www.abgsc.com/abgsc-is-acting-as-exclusive-financial-advisor-to-formpipe-software-ab-in-connection-with-the-public-cash-offer-from-tabellae-bidco-aps/"],["Renamed → Lasernet Group (LASER)","https://www.marketscreener.com/news/formpipe-software-begins-trading-on-nasdaq-stockholm-under-new-name-lasernet-group-ce7f5dd3dc81f32d"]]},{"n":"AMC Banking","o":"AMC-Consult · Denmark","stance":"steady","sl":"BC-native · banking","prox":"High","cat":"Bank integration & payments · BC + F&O","head":"BC-native bank/payments solution — directly competes with Continia Banking & Payment Management.","rel":"Standardises 600+ bank formats via the cloud platform XTendLink; Fundamentals ships as a BC extension.","str":"PSD2-licensed payment institution; payment export, bank statements and reconciliation directly in BC.","pos":"Embedded in BC — from payment journal direct to the bank (host-to-host).","ai":"Data-driven auto-matching; less AI profiling, more operations and compliance.","sc":"600+ banks · Danish vendor","s":[["AMC Banking BC","https://www.amcbanking.com/bc-fundamentals/"],["Microsoft Learn","https://learn.microsoft.com/en-us/dynamics365/business-central/ui-extensions-amc-banking"]]},{"n":"Acubiz","o":"Acubiz · Denmark","stance":"steady","sl":"Expense · integrated","prox":"Medium","cat":"Expense management · certified BC integration","head":"Danish expense player with certified BC integration — competes with Continia Expense Management.","rel":"Certified integration with BC (+ e-conomic, Danløn, 40+ systems); app + web portal for expenses, cards and mileage.","str":"Standalone expense platform that connects to BC — not “built inside” like Continia.","pos":"Real-time overview of employee spend; automatic import to BC.","ai":"Automation of receipt/expense flow; limited AI profile.","sc":"Danish · 40+ system integrations","s":[["Acubiz platform","https://acubiz.com/platform/"]]},{"n":"Pagero","o":"Thomson Reuters","stance":"cons","sl":"TR-owned · e-invoicing","prox":"High","cat":"E-invoicing network & compliance · BC connector","head":"Global e-invoicing network, now owned by Thomson Reuters — one of BC's built-in E-Document connectors.","rel":"ONESOURCE Pagero (e-invoicing + tax); embedded e-invoicing for Oracle Fusion (2026); Deloitte global alliance (Jan 2026); pre-approved ASP for the UAE mandate (from Jul 2026); passed the EU ViDA Peppol 5-corner pilot.","str":"Acquired by Thomson Reuters (2024) and merged with ONESOURCE tax; “two-step” format conversion globally.","pos":"Open, ERP-agnostic network; BC extension sends e-/PDF/print invoice via one connection.","ai":"Focus on compliance/CTC mandates rather than AI marketing.","sc":"14M+ businesses · 100+ networks · IDC leader","s":[["Pagero for BC","https://europe.thomsonreuters.com/pagero-network/system-connectivity/microsoft"],["UAE ASP","https://europe.thomsonreuters.com/newsroom/pagero-part-of-thomson-reuters-listed-as-pre-approved-e-invoicing-service-provider-in-the-uae"],["Deloitte-alliance","https://www.thomsonreuters.com/en/press-releases/2026/january/deloitte-and-thomson-reuters-launch-a-strategic-alliance-to-support-end-to-end-global-e-invoicing-and-e-reporting-for-organizations"]]},{"n":"B2Brouter","o":"B2Brouter Global · ES","stance":"steady","sl":"Peppol · BC connector","prox":"High","cat":"Peppol / e-invoicing access point · BC connector","head":"Certified Peppol access point with native BC connector — one of BC's built-in E-Document APIs.","rel":"BC connector on AppSource; supports Peppol BIS 3.0, UBL, XRechnung, FatturaPA, Chorus Pro, FACe and SDI; launched a developer sandbox (Jun 2026) for API/invoice testing ahead of France's Sep 2026 receive deadline.","str":"One connection to the entire Peppol network; automatic format conversion and compliance.","pos":"Native in Dynamics — send and receive e-invoices without external portals.","ai":"No significant AI profile; strength is compliance breadth across countries.","sc":"30+ countries · ISO 27001 · EESPA member","s":[["B2Brouter for Dynamics","https://www.b2brouter.net/global/e-invoicing-microsoft-dynamics/"],["Developer sandbox (Jun 2026)","https://www.b2brouter.net/global/b2brouter-sandbox/"],["Microsoft Learn (E-Docs)","https://learn.microsoft.com/en-us/dynamics365/business-central/faq-electronic-invoicing"]]},{"n":"Qvalia","o":"Qvalia · SE","stance":"steady","sl":"Peppol · BC app","prox":"High","cat":"Peppol e-invoicing & order management · BC app","head":"Ready-made BC app for Peppol with AI posting suggestions — setup without code.","rel":"Sends/receives Peppol invoices + order management; automatic posting in BC; AI suggestions for account mapping.","str":"Plug-and-play BC connector via the Qvalia platform; no IT resources required.","pos":"Everything posted automatically in BC — no double entry.","ai":"AI-generated posting suggestions for incoming vendor invoices.","sc":"EN 16931 · Peppol BIS · Swedish vendor","s":[["Qvalia for BC","https://qvalia.com/peppol-e-invoicing-for-business-central/"]]},{"n":"Rillion","o":"Rillion (formerly Palette) · Stockholm (Altor)","stance":"ai","sl":"AI-native capture","prox":"Medium","cat":"AP automation · multi-ERP + BC connector","head":"Nordic AP-automation veteran going AI-native — LLM invoice capture with no OCR templates.","rel":"Rillion Capture (Mar 25, 2026) — first AI-native, multimodal-LLM invoice capture (no templates); Riley AI Assistant (Sept 2025) for invoice/supplier Q&A; Jul 2026: strengthened UK partnership with Stratas to accelerate AI-driven AP.","str":"30+ years (ex-Palette/Centsoft), Altor PE-owned; shifting from template-OCR to AI-native capture and expanding in the US.","pos":"Control, visibility and speed for mid-market/enterprise AP; native Business Central connector among 50+ ERPs.","ai":"Riley AI assistant + Rillion Capture (multimodal LLM) for extraction, coding and approval routing.","sc":"3,000+ customers · 50+ countries · Altor-owned","s":[["Rillion AP","https://www.rillion.com/"],["Rillion Capture (Mar 2026)","https://www.rillion.com/blog/rillion-capture-announcement/"],["Rillion + Stratas (Jul 2026)","https://www.rillion.com/blog/rillion-and-stratas-strengthen-partnership-to-accelerate-ai-driven-ap-automation-in-the-uk/"],["BC integration","https://www.rillion.com/integration/microsoft-dynamics-365-business-central/"]]},{"n":"Fidesic","o":"Fidesic (Enliven Software) · East Lansing, MI","stance":"ai","sl":"Built for Dynamics · AI capture","prox":"High","cat":"AP automation · Dynamics GP + BC","head":"AP automation purpose-built for Microsoft Dynamics GP & Business Central, with AI invoice capture.","rel":"AI invoice capture (MagiCapture) for Business Central — no templates, near-touchless; multi-entity BC integration (2024–25).","str":"Deepen the Dynamics ecosystem (GP heritage since 2008 + native BC AL app); raise AI-capture fidelity and multi-entity workflows.","pos":"“Purpose-built for Dynamics” — native GP/BC AP with no coding or mapping.","ai":"MagiCapture ML/AI invoice capture that learns per submission; high first-pass accuracy, no templates.","sc":"East Lansing, MI · GP since 2008 · BC on AppSource","s":[["Fidesic","https://www.fidesic.com/"],["BC integration","https://www.fidesic.com/product/dynamics-business-central-integration"],["MagiCapture","https://www.fidesic.com/product/magicapture"]]},{"n":"Yavrio","o":"Yavrio · London","stance":"steady","sl":"BC-native · open banking","prox":"High","cat":"Bank connectivity & payments · BC + ERPs","head":"Open-banking bank connectivity built inside Business Central — overlaps AMC Banking and Continia Banking & Payment Management.","rel":"Connected the five largest US banks + embedded payments (early 2026); $2.4M seed (Fuel Ventures, Jan 2025); 14,000+ banks across 20 countries.","str":"Expand bank coverage (10K→14K+ banks) and ERP scope beyond BC; positioned as a no-code alternative to CSV/file-based bank imports.","pos":"“Built inside Business Central” — collect, settle and reconcile payments and bank feeds without external portals.","ai":"Rules-based live bank feeds + automated reconciliation; minimal AI positioning.","sc":"London · ~40 staff · 14,000+ banks · seed-stage","s":[["Yavrio","https://www.yavr.io/"],["5 major US banks","https://www.openbankingexpo.com/news/open-banking-fintech-yavrio-connects-with-five-major-us-banks/"],["Yavrio on AppSource","https://appsource.microsoft.com/en-us/product/dynamics-365-business-central/pubid.yavrioltd1647526263468%7Caid.yavrio_open_banking%7Cpappid.3d686c04-e1b1-435e-bea4-862c2c203ca7"]]}]},
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
