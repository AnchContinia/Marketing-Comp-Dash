const C = {ai:"#8ff8ff", cons:"#5f9e8d", steady:"#983EAE"};
const data = [
 {n:"ExFlow", o:"Truvio (formerly SignUp Software) · Stockholm", stance:"cons", sl:"Rebranded → Truvio + AI", prox:"High",
  cat:"AP automation · D365 F&O + BC",
  head:"Rebrand to Truvio complete — ExFlow, Axtension, DynamicWeb and SKSoft unified into one Microsoft-native portfolio, now shipping its own AI.",
  rel:"June 2026: AP Automation (powered by ExFlow) 2.19.0 for D365 F&O adds “TruvioSense Coding & Approval” — AI/LLM coding suggestions from previously approved invoices.",
  str:"Rebranded SignUp Software → Truvio, unifying ExFlow/Axtension/DynamicWeb/SKSoft into one D365-native suite (beyond pure AP).",
  pos:"Fully embedded/native in Dynamics — no third-party system.",
  ai:"TruvioSense adds LLM-based invoice interpretation + coding suggestions on top of the existing ML Predictions.",
  sc:"150+ employees · 1,300+ organisations",
  s:[["Truvio: What's New","https://truvio.com/whats-new"],["Rebrand","https://enterprisesoftwareexpress.com/signup-software-signs-up-for-a-new-name/"],["Release notes","https://docs.signupsoftware.com/finance-operations/docs/user-manual/whats-new-and-planned/release-notes"]]},

 {n:"Dooap", o:"Dooap · Austin (Pagero)", stance:"ai", sl:"AI-aggressive", prox:"High",
  cat:"AP automation · D365 Finance (F&O)",
  head:"Launched a dedicated agentic AI product — the most offensive AI move in the space.",
  rel:"Dooap Studio, May 11 2026 — AP teams design and govern their own AI agents without IT.",
  str:"Agents for GL coding, PO matching, fraud and routing — with rationale, confidence score and audit trail.",
  pos:"Mobile-first, cloud-native — message: \u201cAI you control.\u201d",
  ai:"A standalone agent product, not just AI features.",
  sc:"Microsoft Certified Software (Sep 2025)",
  s:[["Dooap Studio (PR)","https://www.prnewswire.com/news-releases/dooap-inc-launches-dooap-studio-putting-agentic-ap-automation-directly-in-the-hands-of-finance-teams-302768534.html"],["YouTube","https://www.youtube.com/@dooap"]]},

 {n:"Zetadocs", o:"Equisys", stance:"steady", sl:"Stable cadence", prox:"High",
  cat:"Delivery · Capture · Expenses · BC",
  head:"Consistent monthly release cadence; AI embedded in the core rather than big announcements.",
  rel:"Delivery & Capture updated Jan, Mar and May 2026; Expenses May 2026 (cloud, browser, iOS, Android).",
  str:"Three product lines kept in sync at a high release cadence.",
  pos:"Everything happens inside Business Central — one environment, less friction.",
  ai:"AI-driven data entry + automatic order/invoice matching.",
  sc:"3 product lines (Delivery · Capture · Expenses)",
  s:[["May 2026 update","https://www.equisys.com/blog/whats-new-in-zetadocs-expenses-may-2026-update"],["Equisys blog","https://www.equisys.com/blog"]]},

 {n:"Medius", o:"Medius", stance:"ai", sl:"AI leader", prox:"Medium",
  cat:"AP automation + spend/payments · multi-ERP",
  head:"Named AI leader by analysts; deep, autonomous AI across the full AP lifecycle.",
  rel:"Ardent Partners 2026: Market Leader + Elite Performer for AI Innovation.",
  str:"SmartFlow (proprietary CNN), Medius Copilot, Supplier Conversations (autonomous email handling), \u201cAI workmate\u201d.",
  pos:"\u201cAutonomous AP\u201d — the finance team stays in control; own models rather than expensive LLMs for core work.",
  ai:"Claims to have the most of the AP/payments lifecycle automated with AI.",
  sc:"4,000+ customers · 102 countries · $200B spend/year",
  s:[["Medius AI advantage","https://www.medius.com/ai-innovation/medius-ai-advantage/"],["Ardent 2026","https://www.medius.com/resources/guides-reports/2026-ap-automation-payments-technology-advisor/"]]},

 {n:"Tipalti", o:"Tipalti · Foster City", stance:"ai", sl:"AI + capital", prox:"Low",
  cat:"Payables + global payments + procurement + expenses",
  head:"Raised $200M for AI; rolling out agents across the entire finance flow.",
  rel:"AI Assistant + AI agents (Invoice Capture, Bill Approvers, reporting, tax, purchase request); tariff-refund AI (Apr 2026).",
  str:"$200M round (Hercules, autumn 2025) earmarked for AI; agentic focus.",
  pos:"End-to-end payables + global payments in 200+ countries.",
  ai:"Conversational assistant + autonomous agents embedded across the entire platform.",
  sc:"~$75B payments/year",
  s:[["Tipalti AI agents","https://tipalti.com/accounts-payable-software/finance-ai/"],["American Banker","https://www.americanbanker.com/payments/news/tipalti-enhances-ai-tech-to-improve-tariff-refund-processing"]]},

 {n:"Yooz", o:"Yooz · Dallas", stance:"ai", sl:"AI + fraud", prox:"Medium",
  cat:"AP / P2P automation · multi-ERP",
  head:"AI/Deep Learning P2P with a strong fraud focus; active in the BC and GP ecosystem.",
  rel:"YoozProtect (fraud, NA launch Jan 2026); Line-Level Matching (2025); Yooz 2026 AI in Finance report.",
  str:"AI + RPA + Big Data; fraud prevention as spearhead.",
  pos:"Simple, fast, secure cloud P2P; unlimited users.",
  ai:"Smart data extraction, routing and fraud detection.",
  sc:"5,000+ customers · 300,000 users",
  s:[["YoozProtect","https://www.getyooz.com/blog/yooz-protect-launch"],["Yooz + BC/GP","https://msdynamicsworld.com/blog/two-days-two-erps-how-yooz-powering-ap-automation-gp-and-business-central"]]},

 {n:"Stampli", o:"Stampli · Mountain View", stance:"ai", sl:"AI veteran", prox:"Low",
  cat:"AP automation (invoice-centric) · 70+ ERPs",
  head:"AI (\u201cBilly the Bot\u201d) at the core for nearly 10 years; raised capital from Blackstone.",
  rel:"Stampli Deep Finance (Mar 2026) turns invoice data into consultant-grade executive spend intelligence; Stampli Card / Direct Pay; $61M Blackstone Series D (~$148M total).",
  str:"Invoice-centric communication + \u201cAI employee\u201d.",
  pos:"Fast implementation (weeks, not months); approvers need no ERP access.",
  ai:"Positions itself on \u201cproven\u201d AI for capture, coding, routing, duplicates and fraud.",
  sc:"1,600+ customers · $80–85B invoices/year",
  s:[["Stampli AP","https://www.stampli.com/ap-automation/"],["Deep Finance","https://www.prnewswire.com/news-releases/stampli-launches-deep-finance-turning-invoice-data-into-executive-spend-intelligence-302729234.html"],["Blackstone funding","https://financialit.net/news/fundraising-news/stampli-secures-61m-advanced-ai-powered-ap-automation"]]},

 {n:"AvidXchange", o:"TPG + Corpay · Charlotte", stance:"cons", sl:"Acquired (payments)", prox:"Low",
  cat:"AP + payment automation · mid-market",
  head:"Taken private by TPG + Corpay (~$2.2B, Oct 2025) — pointing toward payment rails.",
  rel:"First gen-AI \u201cagents\u201d Apr 2025; AI fraud/BEC detection in the AvidPay network.",
  str:"Take-private; Corpay stake → focus on payment volume and interchange.",
  pos:"Mid-market invoice-to-pay + AvidPay payment network.",
  ai:"AI for fraud/anomaly detection; later on the AI curve than pure AI players.",
  sc:"~$450M revenue · 25+ years of history",
  s:[["TPG/Corpay close","https://www.avidxchange.com/press-releases/tpg-corpay-complete-acquisition-of-avidxchange/"],["Payments Dive","https://www.paymentsdive.com/news/avidxchange-tpg-corpay-accounts-payable-payments/747520/"]]},

 {n:"Compleat", o:"Compleat Software · UK", stance:"steady", sl:"SMB / price", prox:"Low",
  cat:"P2P / AP automation + online buying",
  head:"Affordable P2P for smaller businesses; UK/EMEA focus, not Dynamics-first.",
  rel:"Capture + approval workflows + online buying; integration with Sage, Xero, QuickBooks.",
  str:"Affordable SaaS for all sizes; procurement + AP combined.",
  pos:"Cheap, simple access (subscription from a low price point).",
  ai:"AI-OCR for capture/coding — significantly less AI marketing than the big players.",
  sc:"500+ companies · EMEA/APAC/AMAC",
  s:[["Zone&Co 2026","https://www.zoneandco.com/articles/top-16-ap-automation-software-solutions-in-2026"],["Capterra","https://www.capterra.com/p/88208/Compleat-Purchase-to-Pay/"]]},

 {n:"Tungsten Automation", o:"formerly Kofax · Irvine", stance:"ai", sl:"AI catch-up", prox:"Low",
  cat:"IDP / RPA + AP (InvoiceAgility)",
  head:"Rebranded from Kofax; betting hard on agentic AI to close the gap.",
  rel:"TotalAgility now GA in three tiers (Standard/Advanced/Enterprise) with agentic AI, Quick AI Agents and multi-agent orchestration; quarterly releases from 2026; InvoiceAgility for AP.",
  str:"Jan 2026: new executives incl. first Chief AI Officer; \u201cAI-first\u201d repositioning.",
  pos:"Broad intelligent automation (document/workflow) — large IDP revenue base.",
  ai:"Agentic AI now shipping (multi-agent orchestration); analysts said it was 9–12 months behind — now closing the gap.",
  sc:"~40 years of history · 70+ countries",
  s:[["TotalAgility platform","https://www.tungstenautomation.com/products/totalagility/release-highlights"],["Agentic AI hires","https://www.tungstenautomation.com/about/press-releases/2026/tungsten-automation-invests-in-innovation-and-agentic-ai-with-key-executive-hires"],["Deep Analysis","https://www.deep-analysis.net/boring-ai-how-tungsten-plans-to-move-beyond-its-idp-roots/"]]},

 {n:"onPhase", o:"formerly DocuPhase · Tampa", stance:"cons", sl:"Acquisitive + rebrand", prox:"Low",
  cat:"AP + payments + document management",
  head:"Rebranded from DocuPhase; growing through acquisitions and embedded payments.",
  rel:"Acquisition of iPayables (Jan 2026) + Clearwater Payments; Bottomline Paymode network embedded.",
  str:"AI-driven AP + embedded payments; 173% 3-year growth (Inc. 5000).",
  pos:"Unified finance automation for SMB → enterprise.",
  ai:"AI-driven capture/automation combined with payments.",
  sc:"Fast-growing · NetSuite-centric + others",
  s:[["onPhase news","https://www.onphase.com/news"],["Accounting automation","https://www.docuphase.com/accounting-automation"]]},

 {n:"MineralTree", o:"Global Payments · Boston", stance:"cons", sl:"Payments-owned", prox:"Low",
  cat:"AP + payment automation · multi-ERP",
  head:"Owned by payments giant Global Payments; strength in multi-currency/international payments.",
  rel:"Multi-currency (TransferMate, 130+ currencies); enterprise multi-ERP focus.",
  str:"Part of Global Payments ($500M acquisition) → payment monetisation.",
  pos:"End-to-end invoice-to-pay, fraud protection, multi-ERP.",
  ai:"Less AI profiling; focus on payments and visibility.",
  sc:"3,000+ companies · mid-market → Fortune 500",
  s:[["Global Payments acq.","https://investors.globalpayments.com/news-events/press-releases/detail/23/global-payments-agrees-to-acquire-mineraltree-a-leader-in"],["Crunchbase","https://www.crunchbase.com/organization/mineraltree"]]},

 {n:"Dime Scheduler", o:"Dime Software (Dimenics) · BE", stance:"steady", sl:"Adjacent (scheduling)", prox:"High",
  cat:"Visual resource/project planning · BC",
  head:"BC-native, but in a different category (scheduling) — ISV neighbour, not a direct AP rival.",
  rel:"Real-time BC sync, Gantt, drag-drop, capacity pivot, map/route planning; Outlook/Exchange sync.",
  str:"Visual planning layer on top of BC/NAV/CRM/Power Platform.",
  pos:"\u201cStop guessing, start planning\u201d — easy to implement (~5 days).",
  ai:"Limited AI profile; strength is visual planning.",
  sc:"Subscription from ~€50/year · many languages",
  s:[["Features","https://www.dimescheduler.com/features"],["Microsoft Marketplace","https://marketplace.microsoft.com/en-us/product/web-apps/dimenics-3435744.dimescheduler"]]},

 {n:"Microsoft Expense Agent", o:"Microsoft · native in BC", stance:"ai", sl:"Platform owner · AI", prox:"High",
  cat:"AI expense capture · native in Business Central",
  head:"The platform owner itself moving into the expense space with an AI agent — the most important BC-native development to watch.",
  rel:"Expense Agent introduced in D365 Business Central (Apr 2026) — AI-driven expense capture, submission and compliance.",
  str:"Microsoft building AI functionality directly into BC, overlapping with third-party expense solutions.",
  pos:"Native to the platform — no extra vendor, comes with Business Central.",
  ai:"AI agent for employee expenses embedded in the ERP itself.",
  sc:"Built into Microsoft Dynamics 365 Business Central",
  s:[["Microsoft blog","https://www.microsoft.com/en-us/dynamics-365/blog/it-professional/2026/04/27/expense-agent-dynamics-365-business-central/"]]},

 {n:"Lasernet", o:"Lasernet Group · DK/UK", stance:"steady", sl:"BC-native · output", prox:"High",
  cat:"Document output & e-invoicing · BC + F&O",
  head:"Now independent (split from Formpipe, renamed Lasernet Group in 2026) — BC-native output engine competing with Continia Document Output.",
  rel:"Lasernet for BC live on AppSource (20+ report types, Azure AI mapping); new BC product offering planned Q4 2026; named Temenos Exchange Partner of the Year 2026; joined the IFS partner network.",
  str:"De-merged from Formpipe into a standalone, listed Lasernet Group focused solely on the Lasernet platform; doubling down on BC/Dynamics.",
  pos:"Embedded in BC — design, send and archive documents without leaving the ERP.",
  ai:"Azure AI for data mapping; primarily strong on output/compliance rather than AI marketing.",
  sc:"20+ years of document expertise · global",
  s:[["Lasernet Group","https://www.lasernetgroup.com/news-blogs/bc-connector-now-on-appsource"],["Formpipe/Lasernet split","https://www.formpipe.com/news-formpipe-lasernet-split"]]},

 {n:"AMC Banking", o:"AMC-Consult · Denmark", stance:"steady", sl:"BC-native · banking", prox:"High",
  cat:"Bank integration & payments · BC + F&O",
  head:"BC-native bank/payments solution — directly competes with Continia Banking & Payment Management.",
  rel:"Standardises 600+ bank formats via the cloud platform XTendLink; Fundamentals ships as a BC extension.",
  str:"PSD2-licensed payment institution; payment export, bank statements and reconciliation directly in BC.",
  pos:"Embedded in BC — from payment journal direct to the bank (host-to-host).",
  ai:"Data-driven auto-matching; less AI profiling, more operations and compliance.",
  sc:"600+ banks · Danish vendor",
  s:[["AMC Banking BC","https://www.amcbanking.com/bc-fundamentals/"],["Microsoft Learn","https://learn.microsoft.com/en-us/dynamics365/business-central/ui-extensions-amc-banking"]]},

 {n:"Acubiz", o:"Acubiz · Denmark", stance:"steady", sl:"Expense · integrated", prox:"Medium",
  cat:"Expense management · certified BC integration",
  head:"Danish expense player with certified BC integration — competes with Continia Expense Management.",
  rel:"Certified integration with BC (+ e-conomic, Danløn, 40+ systems); app + web portal for expenses, cards and mileage.",
  str:"Standalone expense platform that connects to BC — not \u201cbuilt inside\u201d like Continia.",
  pos:"Real-time overview of employee spend; automatic import to BC.",
  ai:"Automation of receipt/expense flow; limited AI profile.",
  sc:"Danish · 40+ system integrations",
  s:[["Acubiz platform","https://acubiz.com/platform/"]]},

 {n:"Pagero", o:"Thomson Reuters", stance:"cons", sl:"TR-owned · e-invoicing", prox:"High",
  cat:"E-invoicing network & compliance · BC connector",
  head:"Global e-invoicing network, now owned by Thomson Reuters — one of BC's built-in E-Document connectors.",
  rel:"ONESOURCE Pagero (e-invoicing + tax); embedded e-invoicing for Oracle Fusion (2026); Deloitte global alliance (Jan 2026); pre-approved ASP for the UAE mandate (from Jul 2026); passed the EU ViDA Peppol 5-corner pilot.",
  str:"Acquired by Thomson Reuters (2024) and merged with ONESOURCE tax; \u201ctwo-step\u201d format conversion globally.",
  pos:"Open, ERP-agnostic network; BC extension sends e-/PDF/print invoice via one connection.",
  ai:"Focus on compliance/CTC mandates rather than AI marketing.",
  sc:"14M+ businesses · 100+ networks · IDC leader",
  s:[["Pagero for BC","https://europe.thomsonreuters.com/pagero-network/system-connectivity/microsoft"],["UAE ASP","https://europe.thomsonreuters.com/newsroom/pagero-part-of-thomson-reuters-listed-as-pre-approved-e-invoicing-service-provider-in-the-uae"],["Deloitte-alliance","https://www.thomsonreuters.com/en/press-releases/2026/january/deloitte-and-thomson-reuters-launch-a-strategic-alliance-to-support-end-to-end-global-e-invoicing-and-e-reporting-for-organizations"]]},

 {n:"B2Brouter", o:"B2Brouter Global · ES", stance:"steady", sl:"Peppol · BC connector", prox:"High",
  cat:"Peppol / e-invoicing access point · BC connector",
  head:"Certified Peppol access point with native BC connector — one of BC's built-in E-Document APIs.",
  rel:"BC connector on AppSource; supports Peppol BIS 3.0, UBL, XRechnung, FatturaPA, Chorus Pro, FACe and SDI.",
  str:"One connection to the entire Peppol network; automatic format conversion and compliance.",
  pos:"Native in Dynamics — send and receive e-invoices without external portals.",
  ai:"No significant AI profile; strength is compliance breadth across countries.",
  sc:"30+ countries · ISO 27001 · EESPA member",
  s:[["B2Brouter for Dynamics","https://www.b2brouter.net/global/e-invoicing-microsoft-dynamics/"],["Microsoft Learn (E-Docs)","https://learn.microsoft.com/en-us/dynamics365/business-central/faq-electronic-invoicing"]]},

 {n:"Qvalia", o:"Qvalia · SE", stance:"steady", sl:"Peppol · BC app", prox:"High",
  cat:"Peppol e-invoicing & order management · BC app",
  head:"Ready-made BC app for Peppol with AI posting suggestions — setup without code.",
  rel:"Sends/receives Peppol invoices + order management; automatic posting in BC; AI suggestions for account mapping.",
  str:"Plug-and-play BC connector via the Qvalia platform; no IT resources required.",
  pos:"Everything posted automatically in BC — no double entry.",
  ai:"AI-generated posting suggestions for incoming vendor invoices.",
  sc:"EN 16931 · Peppol BIS · Swedish vendor",
  s:[["Qvalia for BC","https://qvalia.com/peppol-e-invoicing-for-business-central/"]]}
];

const events = [
 {w:"Sept 2026 →", c:"steady", t:"<b>France B2B e-invoicing</b> mandate takes effect — large and mid-size companies must send and receive structured e-invoices. SMEs follow September 2027."},
 {w:"Jul 1, 2026", c:"steady", t:"<b>UAE e-invoicing</b> rollout begins for large businesses (revenue ≥ AED 50M); <b>Pagero</b> is listed as a pre-approved accredited service provider."},
 {w:"June 2, 2026", c:"ai", t:"<b>Microsoft Build 2026</b> reframes the PC as an agentic OS — Windows Agent Framework open-sourced, Office Agent Mode runs agents natively."},
 {w:"June 2026", c:"ai", t:"<b>Truvio</b> (formerly SignUp Software/ExFlow) completes its rebrand and ships TruvioSense Coding & Approval — AI/LLM invoice-coding suggestions in D365 F&O."},
 {w:"May 11, 2026", c:"ai", t:"<b>Dooap</b> launches Dooap Studio — agentic AI platform."},
 {w:"May 13, 2026", c:"steady", t:"<b>Zetadocs</b> Expenses May update (cloud, browser, iOS, Android)."},
 {w:"Apr 30, 2026", c:"ai", t:"<b>BC 2026 Wave 1</b> ships two GA AI agents and MCP Server support — custom AL agents can now be built natively inside Business Central."},
 {w:"Apr 28, 2026", c:"ai", t:"<b>Tungsten</b> previews TotalAgility 2026.2 with agentic AI features (London Summit)."},
 {w:"Apr 28, 2026", c:"ai", t:"<b>Microsoft</b> introduces Expense Agent native to Business Central — AI-expense from the platform owner itself."},
 {w:"Apr 14, 2026", c:"ai", t:"<b>Forrester</b> publishes Top Agentic AI Use Cases for AP 2026 — warns that agentic branding is widespread but real autonomy is rare; evaluators should prioritise production metrics over demos."},
 {w:"Apr 2026", c:"ai", t:"<b>Tipalti</b> expands agentic AI to include tariff-refund processing."},
 {w:"Mar 31, 2026", c:"ai", t:"<b>Stampli</b> launches Deep Finance — turning invoice data into consultant-grade executive spend intelligence."},
 {w:"Early 2026", c:"ai", t:"<b>Medius</b> named Market Leader + Elite Performer for AI Innovation (Ardent Partners 2026)."},
 {w:"Jan 22, 2026", c:"cons", t:"<b>Pagero</b> (Thomson Reuters) and Deloitte launch global e-invoicing alliance."},
 {w:"Jan 21, 2026", c:"cons", t:"<b>onPhase</b> (DocuPhase) acquires enterprise AP player iPayables."},
 {w:"Jan 20, 2026", c:"ai", t:"<b>Tungsten</b> hires new executives including its first Chief AI Officer."},
 {w:"Jan 2026", c:"cons", t:"<b>ExFlow</b>/SignUp new F&O version; SignUp acquires DynamicWeb (e-commerce/PIM)."},
 {w:"Jan 1, 2026", c:"steady", t:"<b>E-invoicing mandate</b> in Belgium takes effect — structured invoice via Peppol required."},
 {w:"Oct 15, 2025", c:"cons", t:"<b>AvidXchange</b> taken private by TPG + Corpay for ~$2.2B."},
 {w:"Autumn 2025", c:"ai", t:"<b>Tipalti</b> raises $200M (Hercules Capital) earmarked for AI."},
 {w:"2025", c:"steady", t:"<b>Lasernet</b> (Formpipe) launches new BC connector with 20+ report types."},
 {w:"Sep 2025", c:"ai", t:"<b>Dooap</b> achieves Microsoft Certified Software designation."}
];

const contentIdeas = [
 {type:"AI narrative", score:88,
  title:"Can AI approve invoices yet? The AP reality check for Business Central",
  tease:"Use competitor AI claims as the hook, then show where governance, audit trails and BC-native workflows still matter.",
  reason:"Dooap, Medius and Microsoft are all pushing the agentic AI story hard. Continia can own a more credible angle: AI is valuable, but production AP still depends on traceability, approval control, exception handling and native Business Central context.",
  s:[["Dooap Studio","https://www.prnewswire.com/news-releases/dooap-inc-launches-dooap-studio-putting-agentic-ap-automation-directly-in-the-hands-of-finance-teams-302768534.html"],["Medius AI Advantage","https://www.medius.com/ai-innovation/medius-ai-advantage/"],["Microsoft Expense Agent","https://www.microsoft.com/en-us/dynamics-365/blog/it-professional/2026/04/27/expense-agent-dynamics-365-business-central/"],["Continia Document Capture","https://www.continia.com/solutions/document-capture/"]]},
 {type:"E-invoicing", score:86,
  title:"Peppol panic map: what BC teams must do before France 2026",
  tease:"Turn the mandate pressure into a practical Business Central checklist with Continia Delivery Network as the answer.",
  reason:"E-invoicing is shifting from optional efficiency project to compliance risk. Competitors and connector players are crowding the BC conversation, so a clear mandate-readiness guide gives Continia a timely, searchable content asset.",
  s:[["Continia Delivery Network","https://www.continia.com/use-cases/continia-delivery-network/"],["Built-in e-invoicing access","https://www.continia.com/news/built-in-access-to-e-invoicing-with-continia/"],["Microsoft E-Docs FAQ","https://learn.microsoft.com/en-us/dynamics365/business-central/faq-electronic-invoicing"],["B2Brouter for Dynamics","https://www.b2brouter.net/global/e-invoicing-microsoft-dynamics/"]]},
 {type:"Product demo", score:82,
  title:"From inbox to archive: the 5-step invoice flow inside Business Central",
  tease:"A concrete walkthrough for teams comparing AP automation options and trying to picture the real workflow.",
  reason:"The strongest Continia fit is still practical product education. This idea converts existing AP automation pages into a clean demo narrative: import, OCR, register, approve and archive, with the BC-native flow as the proof point.",
  s:[["AP automation in 5 steps","https://www.continia.com/use-cases/ap-automation-in-5-simple-steps/"],["Document Capture solution","https://www.continia.com/solutions/document-capture/"],["Document Capture docs","https://docs.continia.com/en-us/continia-document-capture/"],["Business functionality","https://docs.continia.com/en-us/continia-document-capture/getting-started/business-functionality"]]},
 {type:"Positioning", score:76,
  title:"Payment-owned AP platforms vs BC-native independence",
  tease:"Explain why ownership and payment-rail incentives should matter when finance teams choose AP automation.",
  reason:"AvidXchange, MineralTree and Tipalti show how much of the AP category is moving toward payment monetisation and financial networks. Continia can contrast that with a focused Business Central-native position without sounding defensive.",
  s:[["AvidXchange acquisition","https://www.avidxchange.com/press-releases/tpg-corpay-complete-acquisition-of-avidxchange/"],["Global Payments + MineralTree","https://investors.globalpayments.com/news-events/press-releases/detail/23/global-payments-agrees-to-acquire-mineraltree-a-leader-in"],["Tipalti AI agents","https://tipalti.com/accounts-payable-software/finance-ai/"],["Continia Document Capture","https://www.continia.com/solutions/document-capture/"]]},
 {type:"Document Output", score:73,
  title:"The hidden risk after invoice approval: output, delivery and audit trail",
  tease:"Broaden the story beyond AP capture by showing what can still go wrong after documents leave Business Central.",
  reason:"Lasernet is visible in the BC-native output space, while Continia Document Output has strong material around automated distribution, protected PDFs, eIDAS and AI-powered translations. This is a useful adjacent content pillar for buyers thinking beyond invoice intake.",
  s:[["Continia Document Output","https://www.continia.com/solutions/document-output/"],["Online access docs","https://docs.continia.com/en-us/continia-document-output/development-and-administration/online/overview"],["Lasernet for BC","https://www.formpipe.com/en/erp-banking/software/lasernet/business-central/"],["Output Profiles","https://docs.continia.com/en-us/continia-document-output/business-functionality/general/output-profiles/"]]}
];

const cardsEl=document.getElementById('cards');
const countLabel=document.getElementById('countLabel');
const searchEl=document.getElementById('search');
if(cardsEl) data.forEach(function(d){
  const col=C[d.stance];
  const card=document.createElement('div');
  card.className='card stance-'+d.stance;
  card.style.setProperty('--c',col);
  card.dataset.stance=d.stance; card.dataset.prox=d.prox;
  card.dataset.search=[d.n,d.o,d.cat,d.head,d.rel,d.str,d.pos,d.ai,d.sc,d.sl,d.prox].join(' ').toLowerCase();
  const src=d.s.map(function(x){return '<a href="'+x[1]+'" target="_blank" rel="noopener">'+x[0]+' ↗</a>';}).join('');
  card.innerHTML=['<div class="ctop" role="button" tabindex="0" aria-expanded="false">','<div class="brand"><div class="name">'+d.n+'</div><div class="owner">'+d.o+'</div><div class="cat">'+d.cat+'</div></div>','<div class="headline">'+d.head+'</div>','<div class="right"><span class="badge">'+d.sl+'</span><span class="prox">Dynamics: <b>'+d.prox+'</b></span></div>','<span class="chev" aria-hidden="true"><span class="carrow">▶</span></span>','</div>','<div class="detail"><div class="din"><div class="grid2">','<div class="field"><div class="ft">Latest / key development</div><p>'+d.rel+'</p></div>','<div class="field"><div class="ft">Strategic move</div><p>'+d.str+'</p></div>','<div class="field"><div class="ft">Positioning</div><p>'+d.pos+'</p></div>','<div class="field"><div class="ft">AI angle</div><p>'+d.ai+'</p></div>','<div class="field"><div class="ft">Scale / status</div><p class="stat">'+d.sc+'</p></div>','</div><div class="sources">'+src+'</div></div></div>'].join('');
  const top=card.querySelector('.ctop');
  const toggle=function(){card.classList.toggle('open');top.setAttribute('aria-expanded',card.classList.contains('open')?'true':'false');};
  top.addEventListener('click',toggle);
  top.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
  cardsEl.appendChild(card);
});
const evEl=document.getElementById('eventsList');
if(evEl) events.forEach(function(e){const row=document.createElement('div');row.className='ev';row.style.setProperty('--c',C[e.c]);row.innerHTML='<div class="when"><span class="d"></span>'+e.w+'</div><div class="what">'+e.t+'</div>';evEl.appendChild(row);});
let fStance='all', fProx='all', q='';
function applyFilter(){let visible=0;document.querySelectorAll('.card').forEach(function(c){const ok=(fStance==='all'||c.dataset.stance===fStance)&&(fProx==='all'||c.dataset.prox===fProx)&&(!q||c.dataset.search.includes(q));c.classList.toggle('hide',!ok);if(ok)visible++;});document.getElementById('noresult').style.display=visible?'none':'block';countLabel.textContent=visible+' visible';}
document.querySelectorAll('.chip').forEach(function(ch){ch.addEventListener('click',function(){const type=ch.dataset.type;document.querySelectorAll('.chip[data-type="'+type+'"]').forEach(function(x){x.classList.remove('active');});ch.classList.add('active');if(type==='stance')fStance=ch.dataset.val;else fProx=ch.dataset.val;applyFilter();});});
if(searchEl) searchEl.addEventListener('input',function(){q=searchEl.value.trim().toLowerCase();applyFilter();});

const contentIdeasList=document.getElementById('contentIdeasList');
if(contentIdeasList){
  contentIdeasList.innerHTML=contentIdeas.map(function(idea,i){
    const sources=idea.s.map(function(x){return '<a href="'+x[1]+'" target="_blank" rel="noopener">'+x[0]+' ↗</a>';}).join('');
    return '<details class="ci-item"'+(i===0?' open':'')+'>'+
      '<summary class="ci-row">'+
        '<span class="ci-type">'+idea.type+'</span>'+
        '<span class="ci-copy"><span class="ci-title">'+idea.title+'</span><span class="ci-tease">'+idea.tease+'</span></span>'+
        '<span class="ci-score">'+idea.score+'%</span>'+
        '<span class="ci-arrow" aria-hidden="true">›</span>'+
      '</summary>'+
      '<div class="ci-detail"><p class="ci-reason">'+idea.reason+'</p><div class="ci-sources">'+sources+'</div></div>'+
    '</details>';
  }).join('');
}

/* ---- LinkedIn engagement comparison: rendered from linkedin-data.js ---- */
(function(){
  if(typeof window.LI_DATA==="undefined") return;
  var D=window.LI_DATA;
  if(!D.companies||!D.companies.length) return;
  var tb=document.getElementById("li-body");
  if(!tb) return;
  function fmtDate(s){var m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var p=String(s).split("-");return m[parseInt(p[1],10)-1]+" "+parseInt(p[2],10)+", "+p[0];}
  var asof=document.getElementById("li-asof");
  if(asof) asof.textContent=(D.source||"LinkedIn")+" · "+(D.windowLabel||"last 10 posts")+" · "+fmtDate(D.captured);
  function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
  var rows=D.companies.map(function(co){
    var posts=co.posts||[], n=posts.length, R=0,C=0,P=0;
    posts.forEach(function(p){R+=p.r||0;C+=p.c||0;P+=p.rp||0;});
    var total=R+C+P;
    return {name:co.name, ours:!!co.ours, posts:posts, n:n, R:R, C:C, P:P, total:total, avg:n?total/n:0};
  });
  rows.sort(function(a,b){return b.total-a.total;});
  var scale=Math.max.apply(null, rows.map(function(r){return r.total;}))||1;
  tb.innerHTML=rows.map(function(r,i){
    var w=r.total===0?0:Math.min(Math.max(r.total/scale*100,0.2),100);
    var barCls=r.total===scale?"hot":"";
    var ours=r.ours?' <span class="ours-badge">Ours</span>':"";
    var trCls="li-row"+(r.ours?" ours":"");
    var posts=r.posts.map(function(p,j){
      return '<div class="li-post">'+
        '<span class="li-pn">'+(j+1)+'</span>'+
        '<div class="li-pt"><b>'+esc(p.t)+'</b><span class="li-ty">'+esc(p.ty||"—")+'</span></div>'+
        '<div class="li-pm"><span><b>'+(p.r||0)+'</b> reactions</span><span><b>'+(p.c||0)+'</b> comments</span><span><b>'+(p.rp||0)+'</b> reposts</span></div>'+
      '</div>';
    }).join("");
    return '<tr class="'+trCls+'" data-li="'+i+'">'+
      '<td>'+(i+1)+'</td>'+
      '<td><div class="channel">'+esc(r.name)+ours+' <span class="li-carrow">›</span></div><div class="handle">Ø '+r.avg.toFixed(1)+'/post · '+r.n+' posts · tap to see them</div></td>'+
      '<td><div class="barline"><div class="bar"><i class="'+barCls+'" style="--w:'+w.toFixed(1)+'%"></i></div><span>'+r.total+'</span></div></td>'+
      '<td class="num"><b>'+r.R+'</b></td>'+
      '<td class="num">'+r.C+'</td>'+
      '<td class="num">'+r.P+'</td>'+
    '</tr>'+
    '<tr class="li-detail" data-li-detail="'+i+'"><td colspan="6"><div class="li-posts">'+posts+'</div></td></tr>';
  }).join("");
  Array.prototype.forEach.call(tb.querySelectorAll(".li-row"),function(row){
    row.addEventListener("click",function(){
      var i=row.getAttribute("data-li");
      var det=tb.querySelector('.li-detail[data-li-detail="'+i+'"]');
      var open=row.classList.toggle("open");
      if(det) det.classList.toggle("open",open);
    });
  });
})();

/* ---- YouTube table: rendered from youtube-data.js (newest snapshot) ---- */
(function(){
  if(typeof window.YT_DATA==="undefined") return;
  var D=window.YT_DATA;
  if(!D.snapshots||!D.snapshots.length) return;
  var snap=D.snapshots[D.snapshots.length-1];
  function fmtDate(s){var m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var p=String(s).split("-");return m[parseInt(p[1],10)-1]+" "+parseInt(p[2],10)+", "+p[0];}
  var asof=document.getElementById("yt-asof");
  if(asof) asof.textContent=(D.source||"Social Blade estimates")+" \u00b7 "+fmtDate(snap.date);
  var rows=D.channels.map(function(ch){return {ch:ch, st:(snap.stats&&snap.stats[ch.name])||{}};});
  /* Scale bars on real performance only \u2014 exclude flagged one-off corrections. */
  var scale=Math.max.apply(null, rows.filter(function(r){return !r.st.flag;}).map(function(r){return Math.abs(r.st.monthlyViews||0);}))||1;
  var hasFlag=false;
  var tb=document.getElementById("yt-body");
  if(!tb) return;
  tb.innerHTML=rows.map(function(r,i){
    var mv=r.st.monthlyViews||0;
    var flagged=!!r.st.flag;
    var w, barCls, mark="";
    if(flagged){
      hasFlag=true;
      w=6;
      barCls=mv<0?"down":"";
      mark=' <sup>*</sup>';
    } else {
      w=mv===0?0:Math.min(Math.max(Math.abs(mv)/scale*100, 0.2), 100);
      var isMax=Math.abs(mv)===scale && mv>0;
      barCls=mv<0?"down":(isMax?"hot":"");
    }
    var spanCls=mv<0?"down":"";
    var ours=r.ch.ours?' <span class="ours-badge">Ours</span>':"";
    var trCls=r.ch.ours?' class="ours"':"";
    return '<tr'+trCls+'>'+
      '<td>'+(i+1)+'</td>'+
      '<td><div class="channel">'+r.ch.name+ours+'</div><div class="handle">'+r.ch.handle+' \u00b7 '+r.ch.totalViews+'</div></td>'+
      '<td class="num"><b>'+(r.st.subs||"\u2014")+'</b></td>'+
      '<td><div class="barline"><div class="bar"><i class="'+barCls+'" style="--w:'+w.toFixed(1)+'%"></i></div><span class="'+spanCls+'">'+(r.st.monthlyViewsLabel||"0")+mark+'</span></div></td>'+
      '<td class="num"><b>'+(r.st.monthlySubs||"0")+'</b></td>'+
      '<td class="num">'+(r.st.earnings||"\u2014")+'</td>'+
    '</tr>';
  }).join("");
  if(hasFlag){
    var fn=document.getElementById("yt-footnote");
    if(fn) fn.innerHTML+=' \u00b7 <b>*</b> a one-time Social Blade recount, not monthly performance \u2014 shown for transparency but excluded from the bar scale.';
  }
})();

/* ---- In-depth Continia upload info: rendered from youtube-data.js (newest snapshot) ---- */
(function(){
  if(typeof window.YT_DATA==="undefined") return;
  var CU=window.YT_DATA.continiaUploads;
  if(!CU||!CU.snapshots||!CU.snapshots.length) return;
  var s=CU.snapshots[CU.snapshots.length-1];
  var asof=document.getElementById("cu-asof");
  function split(lf,sh){var t=lf+sh; var lfp=t?Math.round(lf/t*100):0; return [lfp, t?100-lfp:0];}
  function renderSplit(barId,legId,lf,sh){
    var p=split(lf,sh), lfp=p[0], shp=p[1];
    var bar=document.getElementById(barId);
    if(bar) bar.innerHTML='<i class="lf" style="width:'+lfp+'%"></i><i class="sh" style="width:'+shp+'%"></i>';
    var leg=document.getElementById(legId);
    if(leg) leg.innerHTML=
      '<span class="k"><span class="sw lf"></span>Long-form <b>'+lf+'</b> <span class="pct">· '+lfp+'%</span></span>'+
      '<span class="k"><span class="sw sh"></span>Shorts <b>'+sh+'</b> <span class="pct">· '+shp+'%</span></span>';
  }
  /* Period toggle (7D / 28D / 3M / 1Y / YTD) */
  var ORDER=["7D","28D","3M","1Y","YTD"], P=s.periods;
  function renderPeriod(key){
    var d=P[key]; if(!d) return;
    renderSplit("cu-uploads-bar","cu-uploads-legend",d.longForm.uploads,d.shorts.uploads);
    renderSplit("cu-views-bar","cu-views-legend",d.longForm.views,d.shorts.views);
    if(asof) asof.textContent=(CU.source||"vidIQ")+" · "+key;
    [].forEach.call(document.querySelectorAll("#cu-periods .cu-pd"),function(b){ b.classList.toggle("active",b.dataset.k===key); });
  }
  if(P){
    var avail=ORDER.filter(function(k){return P[k];});
    var wrap=document.getElementById("cu-periods");
    if(wrap){
      wrap.innerHTML=avail.map(function(k){return '<button class="cu-pd" data-k="'+k+'">'+k+'</button>';}).join("");
      wrap.addEventListener("click",function(e){ var b=e.target.closest(".cu-pd"); if(b) renderPeriod(b.dataset.k); });
    }
    renderPeriod(s.defaultPeriod && P[s.defaultPeriod] ? s.defaultPeriod : avail[0]);
  } else if(s.uploads && s.views){
    renderSplit("cu-uploads-bar","cu-uploads-legend",s.uploads.longForm,s.uploads.shorts);
    renderSplit("cu-views-bar","cu-views-legend",s.views.longForm,s.views.shorts);
    if(asof) asof.textContent=(CU.source||"vidIQ")+(s.windowLabel?" · "+s.windowLabel:"");
  }
  function videoRow(v,i,withVph){
    var out=v.outlier?'<span class="cu-outlier">'+v.outlier+'</span>':'—';
    var age=v.age?'<div class="handle">'+v.age+'</div>':'';
    var vph=withVph?'<td class="num">'+(v.vph!=null?v.vph:'—')+'</td>':'';
    return '<tr><td>'+(i+1)+'</td><td><div class="channel">'+v.title+'</div>'+age+'</td>'+
      '<td class="num"><b>'+(v.views!=null?v.views:'—')+'</b></td>'+vph+
      '<td class="num">'+out+'</td></tr>';
  }
  var tb=document.getElementById("cu-recent-body");
  if(tb && s.recent) tb.innerHTML=s.recent.map(function(v,i){return videoRow(v,i,false);}).join("");
  var tp=document.getElementById("cu-top-body");
  if(tp && s.top) tp.innerHTML=s.top.map(function(v,i){return videoRow(v,i,true);}).join("");
})();

/* ---- Video ideas: predicted-performance cards with a 0–100% tick bar ---- */
(function(){
  if(typeof window.YT_DATA==="undefined") return;
  var VI=window.YT_DATA.videoIdeas;
  if(!VI) return;
  var TICKS=72;
  function ticks(score){
    var on=Math.round(Math.max(0,Math.min(100,score))/100*TICKS);
    var out="";
    for(var i=0;i<TICKS;i++){ out+='<i class="'+(i<on?"on":"")+'"></i>'; }
    return out;
  }
  function render(arr,mountId){
    var m=document.getElementById(mountId);
    if(!m||!arr||!arr.length) return;
    m.innerHTML=arr.map(function(idea){
      return '<article class="vi-card">'+
        '<div class="vi-pct">'+idea.score+'%</div>'+
        '<div class="vi-ticks">'+ticks(idea.score)+'</div>'+
        '<h3 class="vi-title">'+idea.title+'</h3>'+
        '<p class="vi-desc">'+idea.desc+'</p>'+
      '</article>';
    }).join("");
  }
  render(VI.longForm,"vi-long-grid");
  render(VI.shortForm,"vi-short-grid");
})();

/* ---- Image search: client-side search over Assets/Linkedin images ---- */
(function(){
  if(typeof window.LINKEDIN_IMAGES==="undefined") return;
  var ALL=window.LINKEDIN_IMAGES, FOLDER="Linkedin images", current=[];
  var grid=document.getElementById("is-grid");
  var meta=document.getElementById("is-meta");
  var input=document.getElementById("is-input");
  var hint=document.getElementById("is-hint");
  if(!grid||!input) return;
  if(hint) hint.textContent=ALL.length+" LinkedIn images";
  function src(f){return "Assets/"+encodeURIComponent(FOLDER)+"/"+encodeURIComponent(f);}
  function title(f){
    var t=f.replace(/\.[^.]+$/,"").replace(/_/g," ").replace(/\bLinked ?In\b/gi,"").replace(/\s{2,}/g," ").trim();
    return t||f;
  }
  function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
  function card(f){
    var t=esc(title(f));
    return '<figure class="is-card" data-file="'+esc(f)+'" title="'+t+'"><img loading="lazy" src="'+src(f)+'" alt="'+t+'"><figcaption class="is-cap">'+t+'</figcaption></figure>';
  }
  function show(q){
    q=(q||"").trim().toLowerCase();
    var list,label;
    if(!q){ list=ALL.slice(0,4); label="Showing the 4 most recent uploads"; }
    else if(q==="all"){ list=ALL.slice(); label="Showing all "+ALL.length+" images"; }
    else {
      list=ALL.filter(function(f){return (f+" "+title(f)).toLowerCase().indexOf(q)>-1;});
      label=list.length+" result"+(list.length===1?"":"s")+' for “'+q+'”';
    }
    current=list;
    meta.textContent=label;
    grid.innerHTML = list.length ? list.map(card).join("") : '<div class="is-empty">No images match — try a different keyword.</div>';
  }
  input.addEventListener("input",function(){show(input.value);});

  /* Photo-box (lightbox): click an image to view it large; arrow keys / ‹ › navigate */
  var lb=document.getElementById("is-lightbox"),
      lbImg=document.getElementById("is-lb-img"),
      lbCap=document.getElementById("is-lb-cap"),
      lbClose=document.getElementById("is-lb-close"),
      lbPrev=document.getElementById("is-lb-prev"),
      lbNext=document.getElementById("is-lb-next"),
      lbIndex=-1;
  function loadLB(){ var f=current[lbIndex]; if(!f) return; lbImg.src=src(f); lbImg.alt=title(f); lbCap.textContent=title(f)+"  ·  "+(lbIndex+1)+" / "+current.length; }
  function openLB(i){ if(!lb||i<0) return; lbIndex=i; loadLB(); lb.classList.add("open"); lb.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden"; }
  function closeLB(){ if(!lb) return; lb.classList.remove("open"); lb.setAttribute("aria-hidden","true"); lbImg.src=""; lbIndex=-1; document.body.style.overflow=""; }
  function navLB(d){ if(lbIndex<0||!current.length) return; lbIndex=(lbIndex+d+current.length)%current.length; loadLB(); }
  grid.addEventListener("click",function(e){ var fig=e.target.closest(".is-card"); if(fig&&fig.dataset.file){ var i=current.indexOf(fig.dataset.file); if(i>-1) openLB(i); } });
  if(lb) lb.addEventListener("click",function(e){ if(e.target===lb) closeLB(); });
  if(lbClose) lbClose.addEventListener("click",closeLB);
  if(lbPrev) lbPrev.addEventListener("click",function(){navLB(-1);});
  if(lbNext) lbNext.addEventListener("click",function(){navLB(1);});
  document.addEventListener("keydown",function(e){
    if(!lb||!lb.classList.contains("open")) return;
    if(e.key==="Escape"||e.keyCode===27){ closeLB(); }
    else if(e.key==="ArrowLeft"||e.keyCode===37){ navLB(-1); }
    else if(e.key==="ArrowRight"||e.keyCode===39){ navLB(1); }
  });

  show("");
})();

/* ---- Newsletter image bank: client-side search over Assets/Newsletter images ---- */
(function(){
  if(typeof window.NEWSLETTER_IMAGES==="undefined") return;
  var ALL=window.NEWSLETTER_IMAGES, FOLDER="Newsletter images", current=[];
  var grid=document.getElementById("ns-grid");
  var meta=document.getElementById("ns-meta");
  var input=document.getElementById("ns-input");
  var hint=document.getElementById("ns-hint");
  if(!grid||!input) return;
  if(hint) hint.textContent=ALL.length+" newsletter images";
  function src(f){return "Assets/"+encodeURIComponent(FOLDER)+"/"+encodeURIComponent(f);}
  function title(f){
    var t=f.replace(/\.[^.]+$/,"").replace(/_/g," ").replace(/\bnewsletter\b/gi,"").replace(/\s{2,}/g," ").trim();
    return t||f;
  }
  function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
  function card(f){
    var t=esc(title(f));
    return '<figure class="is-card" data-file="'+esc(f)+'" title="'+t+'"><img loading="lazy" src="'+src(f)+'" alt="'+t+'"><figcaption class="is-cap">'+t+'</figcaption></figure>';
  }
  function show(q){
    q=(q||"").trim().toLowerCase();
    var list,label;
    if(!q){ list=ALL.slice(0,4); label="Showing the 4 most recent uploads"; }
    else if(q==="all"){ list=ALL.slice(); label="Showing all "+ALL.length+" images"; }
    else {
      list=ALL.filter(function(f){return (f+" "+title(f)).toLowerCase().indexOf(q)>-1;});
      label=list.length+" result"+(list.length===1?"":"s")+' for “'+q+'”';
    }
    current=list;
    meta.textContent=label;
    grid.innerHTML = list.length ? list.map(card).join("") : '<div class="is-empty">No images match — try a different keyword.</div>';
  }
  input.addEventListener("input",function(){show(input.value);});

  var lb=document.getElementById("ns-lightbox"),
      lbImg=document.getElementById("ns-lb-img"),
      lbCap=document.getElementById("ns-lb-cap"),
      lbClose=document.getElementById("ns-lb-close"),
      lbPrev=document.getElementById("ns-lb-prev"),
      lbNext=document.getElementById("ns-lb-next"),
      lbIndex=-1;
  function loadLB(){ var f=current[lbIndex]; if(!f) return; lbImg.src=src(f); lbImg.alt=title(f); lbCap.textContent=title(f)+"  ·  "+(lbIndex+1)+" / "+current.length; }
  function openLB(i){ if(!lb||i<0) return; lbIndex=i; loadLB(); lb.classList.add("open"); lb.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden"; }
  function closeLB(){ if(!lb) return; lb.classList.remove("open"); lb.setAttribute("aria-hidden","true"); lbImg.src=""; lbIndex=-1; document.body.style.overflow=""; }
  function navLB(d){ if(lbIndex<0||!current.length) return; lbIndex=(lbIndex+d+current.length)%current.length; loadLB(); }
  grid.addEventListener("click",function(e){ var fig=e.target.closest(".is-card"); if(fig&&fig.dataset.file){ var i=current.indexOf(fig.dataset.file); if(i>-1) openLB(i); } });
  if(lb) lb.addEventListener("click",function(e){ if(e.target===lb) closeLB(); });
  if(lbClose) lbClose.addEventListener("click",closeLB);
  if(lbPrev) lbPrev.addEventListener("click",function(){navLB(-1);});
  if(lbNext) lbNext.addEventListener("click",function(){navLB(1);});
  document.addEventListener("keydown",function(e){
    if(!lb||!lb.classList.contains("open")) return;
    if(e.key==="Escape"||e.keyCode===27){ closeLB(); }
    else if(e.key==="ArrowLeft"||e.keyCode===37){ navLB(-1); }
    else if(e.key==="ArrowRight"||e.keyCode===39){ navLB(1); }
  });

  show("");
})();

/* ---- YouTube thumbnails bank: client-side search over Assets/Youtube images ---- */
(function(){
  if(typeof window.YOUTUBE_IMAGES==="undefined") return;
  var ALL=window.YOUTUBE_IMAGES, FOLDER="Youtube images", current=[];
  var grid=document.getElementById("ytb-grid");
  var meta=document.getElementById("ytb-meta");
  var input=document.getElementById("ytb-input");
  var hint=document.getElementById("ytb-hint");
  if(!grid||!input) return;
  if(hint) hint.textContent=ALL.length+" YouTube thumbnails";
  function src(f){return "Assets/"+encodeURIComponent(FOLDER)+"/"+encodeURIComponent(f);}
  function title(f){
    var t=f.replace(/\.[^.]+$/,"").replace(/_/g," ").replace(/\b(youtube|thumbnails?)\b/gi,"").replace(/\s{2,}/g," ").trim();
    return t||f;
  }
  function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
  function card(f){
    var t=esc(title(f));
    return '<figure class="is-card" data-file="'+esc(f)+'" title="'+t+'"><img loading="lazy" src="'+src(f)+'" alt="'+t+'"><figcaption class="is-cap">'+t+'</figcaption></figure>';
  }
  function show(q){
    q=(q||"").trim().toLowerCase();
    var list,label;
    if(!q){ list=ALL.slice(0,4); label="Showing the 4 most recent thumbnails"; }
    else if(q==="all"){ list=ALL.slice(); label="Showing all "+ALL.length+" thumbnails"; }
    else {
      list=ALL.filter(function(f){return (f+" "+title(f)).toLowerCase().indexOf(q)>-1;});
      label=list.length+" result"+(list.length===1?"":"s")+' for “'+q+'”';
    }
    current=list;
    meta.textContent=label;
    grid.innerHTML = list.length ? list.map(card).join("") : '<div class="is-empty">No thumbnails match — try a different keyword.</div>';
  }
  input.addEventListener("input",function(){show(input.value);});

  var lb=document.getElementById("ytb-lightbox"),
      lbImg=document.getElementById("ytb-lb-img"),
      lbCap=document.getElementById("ytb-lb-cap"),
      lbClose=document.getElementById("ytb-lb-close"),
      lbPrev=document.getElementById("ytb-lb-prev"),
      lbNext=document.getElementById("ytb-lb-next"),
      lbIndex=-1;
  function loadLB(){ var f=current[lbIndex]; if(!f) return; lbImg.src=src(f); lbImg.alt=title(f); lbCap.textContent=title(f)+"  ·  "+(lbIndex+1)+" / "+current.length; }
  function openLB(i){ if(!lb||i<0) return; lbIndex=i; loadLB(); lb.classList.add("open"); lb.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden"; }
  function closeLB(){ if(!lb) return; lb.classList.remove("open"); lb.setAttribute("aria-hidden","true"); lbImg.src=""; lbIndex=-1; document.body.style.overflow=""; }
  function navLB(d){ if(lbIndex<0||!current.length) return; lbIndex=(lbIndex+d+current.length)%current.length; loadLB(); }
  grid.addEventListener("click",function(e){ var fig=e.target.closest(".is-card"); if(fig&&fig.dataset.file){ var i=current.indexOf(fig.dataset.file); if(i>-1) openLB(i); } });
  if(lb) lb.addEventListener("click",function(e){ if(e.target===lb) closeLB(); });
  if(lbClose) lbClose.addEventListener("click",closeLB);
  if(lbPrev) lbPrev.addEventListener("click",function(){navLB(-1);});
  if(lbNext) lbNext.addEventListener("click",function(){navLB(1);});
  document.addEventListener("keydown",function(e){
    if(!lb||!lb.classList.contains("open")) return;
    if(e.key==="Escape"||e.keyCode===27){ closeLB(); }
    else if(e.key==="ArrowLeft"||e.keyCode===37){ navLB(-1); }
    else if(e.key==="ArrowRight"||e.keyCode===39){ navLB(1); }
  });

  show("");
})();

/* ---- Image compression: upload up to 5 images, compress via the TinyJPG proxy ---- */
(function(){
  /* Paste the deployed Cloudflare Worker URL here (see tinyjpg-proxy/README.md).
     Leave empty until the proxy is deployed — the module shows a friendly note. */
  var PROXY = "https://tinyjpg-proxy.anch-5c7.workers.dev";

  var MAX=5;
  var input=document.getElementById("cmp-input");
  var drop=document.getElementById("cmp-drop");
  var listEl=document.getElementById("cmp-list");
  var actions=document.getElementById("cmp-actions");
  var totalEl=document.getElementById("cmp-total");
  var dlAll=document.getElementById("cmp-dl-all");
  var clearBtn=document.getElementById("cmp-clear");
  var config=document.getElementById("cmp-config");
  if(!input||!drop||!listEl) return;
  var items=[];

  function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
  function fmt(n){ if(n==null||isNaN(n)) return "—"; if(n<1024) return n+" B"; if(n<1048576) return (n/1024).toFixed(1)+" KB"; return (n/1048576).toFixed(2)+" MB"; }
  function dlName(name){ var i=name.lastIndexOf("."); return i>0 ? name.slice(0,i)+"-min"+name.slice(i) : name+"-min"; }

  if(!PROXY && config){ config.innerHTML='⚙️ Compression backend not configured yet — deploy the TinyJPG proxy (see <b>tinyjpg-proxy/README.md</b>) and paste its URL into <b>PROXY</b>.'; config.classList.add("cmp-err"); }

  function handleFiles(fl){
    var files=[].slice.call(fl).filter(function(f){return /^image\/(png|jpe?g|webp)$/i.test(f.type);});
    if(!files.length) return;
    if(files.length>MAX) files=files.slice(0,MAX);
    listEl.innerHTML=""; items=[]; totalEl.textContent="";
    if(!PROXY){ actions.hidden=true; return; }
    files.forEach(addItem);
    actions.hidden=false;
    items.forEach(compress);
  }
  function addItem(f){
    var it={ file:f, name:f.name, inSize:f.size, outSize:null, url:null, status:"queued" };
    var row=document.createElement("div"); row.className="cmp-row";
    row.innerHTML='<img class="cmp-thumb" src="'+URL.createObjectURL(f)+'" alt="">'+
      '<div><div class="cmp-name">'+esc(f.name)+'</div>'+
      '<div class="cmp-meta" data-meta>'+fmt(f.size)+' · <span class="cmp-spin"></span> compressing…</div></div>'+
      '<div class="cmp-right" data-right></div>';
    listEl.appendChild(row); it.row=row; items.push(it);
  }
  function compress(it){
    fetch(PROXY,{ method:"POST", headers:{ "Content-Type":it.file.type||"application/octet-stream", "X-Filename":it.name }, body:it.file })
      .then(function(res){
        if(!res.ok) throw new Error("HTTP "+res.status);
        var outS=parseInt(res.headers.get("X-Output-Size")||"0",10);
        return res.blob().then(function(b){ return { blob:b, outS: outS||b.size }; });
      })
      .then(function(r){
        it.outSize=r.outS; it.url=URL.createObjectURL(r.blob); it.status="done";
        var saved = it.inSize ? Math.max(0, Math.round((1-(it.outSize/it.inSize))*100)) : 0;
        it.row.querySelector("[data-meta]").innerHTML = fmt(it.inSize)+' → <b>'+fmt(it.outSize)+'</b> · <span class="save">−'+saved+'%</span>';
        var a=document.createElement("a"); a.className="cmp-btn"; a.textContent="Download"; a.href=it.url; a.download=dlName(it.name);
        it.row.querySelector("[data-right]").appendChild(a);
        updateTotal();
      })
      .catch(function(e){
        it.status="error";
        var m=it.row.querySelector("[data-meta]"); if(m) m.innerHTML='<span class="cmp-err">Failed — '+esc(e.message||"error")+'</span>';
      });
  }
  function updateTotal(){
    var done=items.filter(function(it){return it.status==="done";});
    if(!done.length){ totalEl.textContent=""; return; }
    var inT=done.reduce(function(a,it){return a+it.inSize;},0);
    var outT=done.reduce(function(a,it){return a+(it.outSize||0);},0);
    var saved=inT?Math.round((1-(outT/inT))*100):0;
    totalEl.textContent=done.length+" done · "+fmt(inT)+" → "+fmt(outT)+" (−"+saved+"%)";
  }
  input.addEventListener("change",function(){ handleFiles(input.files); input.value=""; });
  drop.addEventListener("dragover",function(e){ e.preventDefault(); drop.classList.add("drag"); });
  drop.addEventListener("dragleave",function(){ drop.classList.remove("drag"); });
  drop.addEventListener("drop",function(e){ e.preventDefault(); drop.classList.remove("drag"); if(e.dataTransfer&&e.dataTransfer.files) handleFiles(e.dataTransfer.files); });
  if(dlAll) dlAll.addEventListener("click",function(){
    items.filter(function(it){return it.status==="done"&&it.url;}).forEach(function(it,k){
      setTimeout(function(){ var a=document.createElement("a"); a.href=it.url; a.download=dlName(it.name); document.body.appendChild(a); a.click(); a.remove(); }, k*300);
    });
  });
  if(clearBtn) clearBtn.addEventListener("click",function(){ listEl.innerHTML=""; items=[]; actions.hidden=true; totalEl.textContent=""; });
})();

/* ---- PDF compression: upload up to 5 PDFs, compress via the iLovePDF proxy ----
   Mirrors the image-compression module but posts to a SEPARATE Cloudflare Worker
   (see pdf-proxy/README.md). Leave PROXY_PDF empty until that Worker is deployed
   — the module then shows a friendly "configure backend" note instead of failing. */
(function(){
  /* Paste the deployed pdf-proxy Worker URL here once it's live. */
  var PROXY_PDF = "https://pdf-compressor.anch-5c7.workers.dev";

  var MAX=2;
  var input=document.getElementById("pdfc-input");
  var drop=document.getElementById("pdfc-drop");
  var listEl=document.getElementById("pdfc-list");
  var actions=document.getElementById("pdfc-actions");
  var totalEl=document.getElementById("pdfc-total");
  var dlAll=document.getElementById("pdfc-dl-all");
  var clearBtn=document.getElementById("pdfc-clear");
  var config=document.getElementById("pdfc-config");
  if(!input||!drop||!listEl) return;
  var items=[];

  function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
  function fmt(n){ if(n==null||isNaN(n)) return "—"; if(n<1024) return n+" B"; if(n<1048576) return (n/1024).toFixed(1)+" KB"; return (n/1048576).toFixed(2)+" MB"; }
  function dlName(name){ var i=name.lastIndexOf("."); return i>0 ? name.slice(0,i)+"-min"+name.slice(i) : name+"-min"; }
  var PDF_ICON='<div class="cmp-thumb" style="display:grid;place-items:center"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path></svg></div>';

  if(!PROXY_PDF && config){ config.innerHTML='⚙️ PDF backend not configured yet — deploy the iLovePDF proxy (see <b>pdf-proxy/README.md</b>) and paste its URL into <b>PROXY_PDF</b>.'; config.classList.add("cmp-err"); }

  function handleFiles(fl){
    var files=[].slice.call(fl).filter(function(f){return f.type==="application/pdf"||/\.pdf$/i.test(f.name);});
    if(!files.length) return;
    if(files.length>MAX) files=files.slice(0,MAX);
    listEl.innerHTML=""; items=[]; totalEl.textContent="";
    if(!PROXY_PDF){ actions.hidden=true; return; }
    files.forEach(addItem);
    actions.hidden=false;
    items.forEach(compress);
  }
  function addItem(f){
    var it={ file:f, name:f.name, inSize:f.size, outSize:null, url:null, status:"queued" };
    var row=document.createElement("div"); row.className="cmp-row";
    row.innerHTML=PDF_ICON+
      '<div><div class="cmp-name">'+esc(f.name)+'</div>'+
      '<div class="cmp-meta" data-meta>'+fmt(f.size)+' · <span class="cmp-spin"></span> compressing…</div></div>'+
      '<div class="cmp-right" data-right></div>';
    listEl.appendChild(row); it.row=row; items.push(it);
  }
  function compress(it){
    fetch(PROXY_PDF,{ method:"POST", headers:{ "Content-Type":"application/pdf", "X-Filename":encodeURIComponent(it.name) }, body:it.file })
      .then(function(res){
        if(!res.ok) throw new Error("HTTP "+res.status);
        var outS=parseInt(res.headers.get("X-Output-Size")||"0",10);
        return res.blob().then(function(b){ return { blob:b, outS: outS||b.size }; });
      })
      .then(function(r){
        it.outSize=r.outS; it.url=URL.createObjectURL(r.blob); it.status="done";
        var saved = it.inSize ? Math.max(0, Math.round((1-(it.outSize/it.inSize))*100)) : 0;
        it.row.querySelector("[data-meta]").innerHTML = fmt(it.inSize)+' → <b>'+fmt(it.outSize)+'</b> · <span class="save">−'+saved+'%</span>';
        var a=document.createElement("a"); a.className="cmp-btn"; a.textContent="Download"; a.href=it.url; a.download=dlName(it.name);
        it.row.querySelector("[data-right]").appendChild(a);
        updateTotal();
      })
      .catch(function(e){
        it.status="error";
        var m=it.row.querySelector("[data-meta]"); if(m) m.innerHTML='<span class="cmp-err">Failed — '+esc(e.message||"error")+'</span>';
      });
  }
  function updateTotal(){
    var done=items.filter(function(it){return it.status==="done";});
    if(!done.length){ totalEl.textContent=""; return; }
    var inT=done.reduce(function(a,it){return a+it.inSize;},0);
    var outT=done.reduce(function(a,it){return a+(it.outSize||0);},0);
    var saved=inT?Math.round((1-(outT/inT))*100):0;
    totalEl.textContent=done.length+" done · "+fmt(inT)+" → "+fmt(outT)+" (−"+saved+"%)";
  }
  input.addEventListener("change",function(){ handleFiles(input.files); input.value=""; });
  drop.addEventListener("dragover",function(e){ e.preventDefault(); drop.classList.add("drag"); });
  drop.addEventListener("dragleave",function(){ drop.classList.remove("drag"); });
  drop.addEventListener("drop",function(e){ e.preventDefault(); drop.classList.remove("drag"); if(e.dataTransfer&&e.dataTransfer.files) handleFiles(e.dataTransfer.files); });
  if(dlAll) dlAll.addEventListener("click",function(){
    items.filter(function(it){return it.status==="done"&&it.url;}).forEach(function(it,k){
      setTimeout(function(){ var a=document.createElement("a"); a.href=it.url; a.download=dlName(it.name); document.body.appendChild(a); a.click(); a.remove(); }, k*300);
    });
  });
  if(clearBtn) clearBtn.addEventListener("click",function(){ listEl.innerHTML=""; items=[]; actions.hidden=true; totalEl.textContent=""; });
})();

/* ---- SEO Scanner: fetch a URL via the seo-proxy Worker, run on-page checks ----
   Rules-based, no AI. The Worker returns the page HTML server-side (CORS-safe);
   all analysis happens here in the browser. Leave PROXY_SEO empty until the
   Worker is deployed (see seo-proxy/README.md) — the module shows a config note. */
(function(){
  /* Paste the deployed seo-proxy Worker URL here once it's live. */
  var PROXY_SEO = "https://seo-proxy.anch-5c7.workers.dev";

  var form=document.getElementById("seo-form");
  if(!form) return;
  var input=document.getElementById("seo-url");
  var listEl=document.getElementById("seo-list");
  var sumEl=document.getElementById("seo-summary");
  var config=document.getElementById("seo-config");
  function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
  function base(u){ try{ var p=new URL(u,"https://x/").pathname.split("/").filter(Boolean); return p.length?p[p.length-1]:u; }catch(e){ return u; } }

  var STOP=(function(){ var set=Object.create(null); ("the and for are but not you all any can had her was our out get has him his how man new now old see two way who did its let put say she too use with that this from they will would there theirs their what about which when your have more were been than then them these some into just over also such only other here each because very most much many like got make made onto upon per via your yours itself himself herself ourselves yourself does doing down off once nor not under until while whom both same own being above below after before again further "+
    "og det til som på de med han af ikke der var mig sig men har om min havde ham hun over da fra sin dem man hans hvor eller hvad skal selv her alle vil blev kunne ind når være dog noget ville deres efter ned skulle denne end dette mit også under have dig anden hende mine alt meget sit sine mod disse hvis din nogle hos blive mange bliver hendes været jer sådan").split(/\s+/).forEach(function(w){ if(w) set[w]=1; }); return set; })();

  function buildKeywords(bodyText, ctx){
    var lower=(bodyText||"").toLowerCase();
    var toks=lower.match(/[\p{L}\p{N}]+/gu)||[];
    var total=toks.length||1;
    var freq=Object.create(null), i;
    for(i=0;i<toks.length;i++){ var w=toks[i]; if(w.length>=3 && !STOP[w] && !/^\d+$/.test(w)) freq[w]=(freq[w]||0)+1; }
    var titleL=(ctx.title||"").toLowerCase(), metaL=(ctx.md||"").toLowerCase();
    var h1L=Array.prototype.map.call(ctx.h1s,function(e){return e.textContent;}).join(" ").toLowerCase();
    var urlL=(ctx.url||"").toLowerCase();
    var altsL=Array.prototype.map.call(ctx.imgs,function(e){return e.getAttribute("alt")||"";}).join(" ").toLowerCase();
    var top=Object.keys(freq).sort(function(a,b){return freq[b]-freq[a];}).slice(0,8).map(function(w){
      return { term:w, count:freq[w], density:freq[w]/total*100,
        inTitle:titleL.indexOf(w)>=0, inH1:h1L.indexOf(w)>=0, inMeta:metaL.indexOf(w)>=0, inUrl:urlL.indexOf(w)>=0, inAlt:altsL.indexOf(w)>=0 };
    });
    var grams=Object.create(null), n, j, k;
    for(n=2;n<=3;n++){ for(j=0;j+n<=toks.length;j++){
      var sl=toks.slice(j,j+n);
      if(sl[0].length<3||sl[n-1].length<3||STOP[sl[0]]||STOP[sl[n-1]]) continue;
      var bad=false; for(k=0;k<n;k++){ if(/^\d+$/.test(sl[k])){bad=true;break;} }
      if(bad) continue;
      var g=sl.join(" "); grams[g]=(grams[g]||0)+1;
    }}
    var phrases=Object.keys(grams).filter(function(g){return grams[g]>=2;}).sort(function(a,b){return grams[b]-grams[a];}).slice(0,6).map(function(g){return {term:g,count:grams[g]};});
    return { top:top, phrases:phrases, totalWords:total, title:titleL, meta:metaL, h1:h1L, url:urlL, alts:altsL, text:lower, first100:toks.slice(0,100).join(" ") };
  }

  function renderKw(kw){
    var box=document.getElementById("seo-kw");
    if(!box) return;
    if(!kw||!kw.top||!kw.top.length){ box.innerHTML=""; return; }
    function bdg(ok,label){ return '<span class="kw-badge'+(ok?" on":"")+'">'+label+'</span>'; }
    var rows=kw.top.map(function(k){
      return '<tr><td class="kw-term">'+esc(k.term)+'</td><td class="num">'+k.count+'</td><td class="num">'+k.density.toFixed(1)+'%</td>'+
        '<td class="kw-cov">'+bdg(k.inTitle,"Title")+bdg(k.inH1,"H1")+bdg(k.inMeta,"Meta")+bdg(k.inUrl,"URL")+bdg(k.inAlt,"Alt")+'</td></tr>';
    }).join("");
    var phrases=kw.phrases.map(function(p){ return '<span class="kw-phrase">'+esc(p.term)+' <b>'+p.count+'</b></span>'; }).join("");
    box.innerHTML='<div class="seo-kw-h">Keyword analysis</div>'+
      '<div class="kw-sub">Most-used terms on the page · density = share of all words · green = the term also appears there</div>'+
      '<div class="youtube-wrap"><table class="kw-table"><thead><tr><th>Keyword</th><th class="num">Count</th><th class="num">Density</th><th>Appears in</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+
      (phrases?'<div class="kw-phrases"><div class="kw-sub">Top phrases</div>'+phrases+'</div>':'')+
      '<div class="kw-focus"><div class="kw-sub">Focus keyword check — type a term you want this page to rank for</div>'+
        '<div class="kw-focus-bar"><input id="kw-focus-input" type="text" placeholder="e.g. cash flow, payment automation…" autocomplete="off" spellcheck="false"></div>'+
        '<div class="kw-focus-out" id="kw-focus-out"></div></div>';
    var fi=document.getElementById("kw-focus-input"), fo=document.getElementById("kw-focus-out");
    if(fi) fi.addEventListener("input",function(){ renderFocus(fi.value, kw, fo); });
  }

  function renderFocus(raw, kw, out){
    if(!out) return;
    var term=(raw||"").trim().toLowerCase();
    if(!term){ out.innerHTML=""; return; }
    function cnt(hay,t){ if(!hay) return 0; var n=0,i=0; while((i=hay.indexOf(t,i))>=0){ n++; i+=t.length; } return n; }
    var nWords=term.split(/\s+/).length;
    var occ=cnt(kw.text, term);
    var density=kw.totalWords?(occ*nWords/kw.totalWords*100):0;
    var checks=[["Title",kw.title.indexOf(term)>=0],["Meta description",kw.meta.indexOf(term)>=0],["H1",kw.h1.indexOf(term)>=0],["First 100 words",kw.first100.indexOf(term)>=0],["URL",kw.url.indexOf(term)>=0],["Image alt",kw.alts.indexOf(term)>=0]];
    var note=occ===0?"not found in the page text":(density<0.5?"a bit low — consider using it a little more":(density>2.5?"a bit high — risk of keyword stuffing":"in the healthy 0.5–2.5% range"));
    var chk=checks.map(function(c){ return '<div class="kw-chk '+(c[1]?"ok":"no")+'"><span>'+(c[1]?"✓":"✗")+'</span>'+c[0]+'</div>'; }).join("");
    out.innerHTML='<div class="kw-focus-sum">“'+esc(term)+'” appears <b>'+occ+'×</b> · density <b>'+density.toFixed(1)+'%</b> — '+note+'</div><div class="kw-chks">'+chk+'</div>';
  }

  if(!PROXY_SEO && config){ config.innerHTML='⚙️ SEO backend not configured yet — deploy the proxy (see <b>seo-proxy/README.md</b>) and paste its URL into <b>PROXY_SEO</b>.'; config.classList.add("cmp-err"); }

  var clearBtn=document.getElementById("seo-clear");
  function clearResults(){ sumEl.innerHTML=""; listEl.innerHTML=""; var kb=document.getElementById("seo-kw"); if(kb) kb.innerHTML=""; }
  if(clearBtn) clearBtn.addEventListener("click",function(){ input.value=""; clearResults(); input.focus(); });
  input.addEventListener("input",function(){ if(input.value.trim()==="") clearResults(); });

  form.addEventListener("submit",function(e){
    e.preventDefault();
    var url=(input.value||"").trim();
    if(!url) return;
    if(!/^https?:\/\//i.test(url)) url="https://"+url;
    if(!PROXY_SEO){ sumEl.innerHTML='<span class="cmp-err">SEO backend not configured yet.</span>'; return; }
    sumEl.innerHTML='<span class="cmp-spin"></span> Scanning '+esc(url)+'…';
    listEl.innerHTML=""; var kwBox=document.getElementById("seo-kw"); if(kwBox) kwBox.innerHTML="";
    fetch(PROXY_SEO,{ method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({url:url}) })
      .then(function(r){ if(!r.ok) return r.json().then(function(j){ throw new Error(j.error||("HTTP "+r.status)); },function(){ throw new Error("HTTP "+r.status); }); return r.json(); })
      .then(function(data){ render(analyze(data)); })
      .catch(function(err){ sumEl.innerHTML='<span class="cmp-err">Failed — '+esc(err.message||"error")+'</span>'; });
  });

  function analyze(data){
    var doc=new DOMParser().parseFromString(data.html||"","text/html");
    var F=[];
    function add(sev,title,issue,fix){ F.push({sev:sev,title:title,issue:issue,fix:fix}); }

    if(data.status&&data.status>=400) add("error","Page returned HTTP "+data.status,"The server returned an error status for this URL.","Check the URL is correct and the page is publicly reachable.");

    var metaRobots=(doc.querySelector('meta[name="robots"]')||{}).content||"";
    if(/noindex/i.test((data.robots||"")+" "+metaRobots)) add("error","Page is set to noindex","A robots directive tells search engines NOT to index this page, so it won’t appear in results.","Remove the noindex directive from the robots meta tag / X-Robots-Tag header if this page should rank.");

    var titleEl=doc.querySelector("title");
    var title=titleEl?titleEl.textContent.trim():"";
    if(!title) add("error","Missing &lt;title&gt;","No title tag — the strongest on-page signal and the clickable headline in search results.","Add a unique, descriptive &lt;title&gt; of ~50–60 characters with the main keyword near the front.");
    else if(title.length<30) add("warn","Title is short ("+title.length+" chars)","Short titles waste space in results and may describe the page poorly.","Aim for ~50–60 characters. Current: “"+esc(title)+"”.");
    else if(title.length>60) add("warn","Title is long ("+title.length+" chars)","Titles over ~60 characters get cut off in search results.","Trim to ~50–60 characters. Current: “"+esc(title)+"”.");
    else add("good","Title length is good ("+title.length+" chars)","","");

    var md=((doc.querySelector('meta[name="description"]')||{}).content||"").trim();
    if(!md) add("error","Missing meta description","Search engines auto-pick a snippet, which is usually less compelling than one you write.","Add a meta description of ~120–160 characters that summarises the page and invites the click.");
    else if(md.length<120) add("warn","Meta description is short ("+md.length+" chars)","You’re not using the full snippet space.","Expand to ~120–160 characters.");
    else if(md.length>160) add("warn","Meta description is long ("+md.length+" chars)","Descriptions over ~160 characters get truncated.","Trim to ~120–160 characters.");
    else add("good","Meta description length is good ("+md.length+" chars)","","");

    var h1s=doc.querySelectorAll("h1");
    if(h1s.length===0) add("error","No &lt;h1&gt; heading","The H1 is the main on-page heading; users and search engines rely on it to grasp the topic.","Add exactly one clear &lt;h1&gt; describing the page.");
    else if(h1s.length>1) add("warn",h1s.length+" &lt;h1&gt; headings","Multiple H1s dilute the main-topic signal.","Keep a single &lt;h1&gt; and demote the rest to &lt;h2&gt;/&lt;h3&gt;.");
    else add("good","Exactly one &lt;h1&gt;","","");

    var hs=doc.querySelectorAll("h1,h2,h3,h4,h5,h6"), prev=0, skip=false;
    Array.prototype.forEach.call(hs,function(h){ var l=parseInt(h.tagName.slice(1),10); if(prev&&l>prev+1) skip=true; prev=l; });
    if(skip) add("warn","Heading levels skip","The heading order jumps a level (e.g. an &lt;h2&gt; straight to an &lt;h4&gt;), breaking the document outline.","Keep headings in order — don’t skip levels.");

    var imgs=doc.querySelectorAll("img"), noAlt=[], noDim=0;
    Array.prototype.forEach.call(imgs,function(im){
      var a=im.getAttribute("alt"); if(a===null||a.trim()==="") noAlt.push(im.getAttribute("src")||"");
      if(!im.getAttribute("width")||!im.getAttribute("height")) noDim++;
    });
    if(imgs.length===0) add("info","No images found","Pages with relevant imagery tend to engage better.","Consider adding at least one relevant, optimised image.");
    if(noAlt.length){
      var sample=noAlt.slice(0,5).map(function(s){return base(s)||"(inline)";});
      add("warn",noAlt.length+" of "+imgs.length+" images missing alt text","Alt text describes an image for screen readers and image search — missing it loses accessibility and image SEO.","Add descriptive alt text. Missing on e.g.: "+esc(sample.join(", "))+(noAlt.length>5?" …":"")+".");
    } else if(imgs.length){ add("good","All images have alt text","",""); }
    if(noDim) add("info",noDim+" image(s) without width/height","Images without explicit dimensions cause layout shift (poor CLS / Core Web Vitals).","Add width and height attributes (or CSS aspect-ratio) to reserve space.");

    if(!doc.querySelector('meta[name="viewport"]')) add("error","No viewport meta tag","Without a viewport tag the page renders poorly on mobile — and mobile-friendliness is a ranking factor.","Add &lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"&gt;.");
    else add("good","Mobile viewport set","","");

    var lang=doc.documentElement.getAttribute("lang");
    if(!lang||!lang.trim()) add("warn","No lang attribute on &lt;html&gt;","The page language isn’t declared, affecting accessibility and international SEO.","Set &lt;html lang=\"en\"&gt; (or the correct language code).");

    if(!doc.querySelector('link[rel="canonical"]')) add("info","No canonical link","A canonical tag prevents duplicate-content issues when a page is reachable via multiple URLs.","Add &lt;link rel=\"canonical\" href=\"…\"&gt; pointing to the preferred URL.");

    var ogMissing=["og:title","og:description","og:image"].filter(function(p){ return !doc.querySelector('meta[property="'+p+'"]'); });
    if(ogMissing.length) add("warn","Missing Open Graph tags ("+ogMissing.join(", ")+")","Open Graph tags control how the page looks when shared on LinkedIn/Facebook — missing them gives blank or ugly previews.","Add og:title, og:description and og:image for rich social previews.");
    else add("good","Open Graph tags present","","");

    if(!doc.querySelector('meta[name="twitter:card"]')) add("info","No Twitter/X card tag","Pages without a twitter:card get only a basic preview on X.","Add &lt;meta name=\"twitter:card\" content=\"summary_large_image\"&gt;.");

    if(!doc.querySelector('script[type="application/ld+json"]')) add("info","No structured data (JSON-LD)","Schema.org data can earn rich results (stars, FAQs, breadcrumbs) in search.","Consider adding relevant JSON-LD (Organization, Article, Product, FAQ…).");
    else add("good","Structured data present","","");

    var words=0, b=doc.body?doc.body.cloneNode(true):null, bodyText="";
    if(b){ Array.prototype.forEach.call(b.querySelectorAll("script,style,noscript"),function(n){n.parentNode&&n.parentNode.removeChild(n);}); bodyText=(b.textContent||"").replace(/\s+/g," ").trim(); words=bodyText?bodyText.split(" ").length:0; }
    if(words&&words<300) add("warn","Thin content (~"+words+" words)","Pages with very little text often struggle to rank for competitive terms.","Aim for richer, genuinely useful content (300+ words where it fits the page’s purpose).");
    else if(words) add("good","Content length OK (~"+words+" words)","","");

    var kw=buildKeywords(bodyText, {title:title, md:md, h1s:h1s, imgs:imgs, url:data.finalUrl||""});

    return { findings:F, url:data.finalUrl||"", status:data.status, kw:kw };
  }

  function render(res){
    var order={error:0,warn:1,info:2,good:3}, labels={error:"Error",warn:"Warning",info:"Tip",good:"Good"};
    res.findings.sort(function(a,b){ return order[a.sev]-order[b.sev]; });
    var nE=0,nW=0,nI=0;
    res.findings.forEach(function(f){ if(f.sev==="error")nE++; else if(f.sev==="warn")nW++; else if(f.sev==="info")nI++; });
    var score=Math.max(0,100-nE*15-nW*6-nI*2);
    sumEl.innerHTML='<div class="seo-score"><b>'+score+'</b><span>/100</span></div>'+
      '<div class="seo-counts"><span class="seo-c err">'+nE+' errors</span><span class="seo-c warn">'+nW+' warnings</span><span class="seo-c info">'+nI+' tips</span></div>'+
      '<div class="seo-scanned">'+esc(res.url)+'</div>';
    listEl.innerHTML=res.findings.map(function(f){
      return '<div class="seo-item sev-'+f.sev+'"><span class="seo-sev">'+labels[f.sev]+'</span>'+
        '<div class="seo-b"><div class="seo-t">'+f.title+'</div>'+
        (f.issue?'<div class="seo-i">'+f.issue+'</div>':'')+
        (f.fix?'<div class="seo-f"><b>Fix:</b> '+f.fix+'</div>':'')+'</div></div>';
    }).join("");
    renderKw(res.kw);
  }
})();

/* ---- Left sidebar: built from one source, injected on every page ----
   Index is the home page; Content and Video are sub-pages. Each group header
   links to its page; sub-items link to anchors on that page (same-page when you
   are already there, cross-page otherwise). The current page's group is marked
   active, and a scroll-spy highlights the section you're viewing. */
(function(){
  var mount=document.getElementById("sidebar");
  if(!mount) return;
  var NAV=[
    {page:"index.html", icon:"fa-house", label:"Home", items:[
      {id:"overview", icon:"fa-binoculars", label:"Public competitor insights"},
      {id:"competitors", icon:"fa-people-group", label:"Competitors"}
    ]},
    {page:"content.html", icon:"fa-newspaper", label:"Content", items:[
      {id:"insights", icon:"fa-lightbulb", label:"Strategic Insights"},
      {id:"events", icon:"fa-calendar-days", label:"Key Events"},
      {id:"content-ideas", icon:"fa-pen-nib", label:"Content Ideas"},
      {id:"linkedin-compare", icon:"fa-thumbs-up", label:"LinkedIn Engagement"},
      {id:"image-search", icon:"fa-images", label:"Linkedin image bank"},
      {id:"newsletter-bank", icon:"fa-envelope-open-text", label:"Newsletter image bank"},
      {id:"seo-scan", icon:"fa-magnifying-glass-chart", label:"SEO Scanner"},
      {id:"compress", icon:"fa-compress", label:"Image & PDF compression"}
    ]},
    {page:"video.html", icon:"fa-clapperboard", label:"Video", items:[
      {id:"youtube", icon:"fa-chart-line", label:"YouTube Analysis"},
      {id:"continia-uploads", icon:"fa-magnifying-glass-chart", label:"In-depth Continia"},
      {id:"video-ideas-long", icon:"fa-film", label:"Long-form ideas"},
      {id:"video-ideas-short", icon:"fa-mobile-screen", label:"Short-form ideas"},
      {id:"youtube-bank", icon:"fa-photo-film", label:"Youtube thumbnails bank"}
    ]}
  ];
  var path=(location.pathname.split("/").pop()||"index.html");
  if(path==="") path="index.html";
  function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");}
  var html='<a class="sb-brand" href="index.html"><div class="sb-logo"><img src="Assets/Hourglass.svg" alt=""></div><div><b>Continia</b><span>Marketing Hub</span></div></a><nav class="sb-nav">';
  NAV.forEach(function(g){
    var cur=g.page===path;
    html+='<div class="sb-group'+(cur?" current":"")+'">';
    html+='<a class="sb-head'+(cur?" active":"")+'" href="'+g.page+'"><i class="fa-light '+g.icon+'"></i><span>'+esc(g.label)+'</span></a>';
    html+='<div class="sb-sub">';
    g.items.forEach(function(it){
      var href=(cur?"":g.page)+"#"+it.id;
      html+='<a href="'+href+'" data-anchor="'+it.id+'" data-page="'+g.page+'"><i class="fa-light '+it.icon+'"></i>'+esc(it.label)+'</a>';
    });
    html+='</div></div>';
  });
  html+='</nav>';
  mount.innerHTML=html;

  /* scroll-spy over the current page's sections only */
  var curLinks=[].slice.call(mount.querySelectorAll('.sb-sub a')).filter(function(a){ return a.getAttribute("data-page")===path; });
  var targets=curLinks.map(function(a){ var id=a.getAttribute("data-anchor"); return {id:id, el:document.getElementById(id)}; }).filter(function(t){ return t.el; });
  if(!targets.length) return;
  function setActive(id){ curLinks.forEach(function(a){ a.classList.toggle("active", a.getAttribute("data-anchor")===id); }); }
  /* A click is authoritative: highlight the clicked section immediately and
     briefly lock the scroll-spy so it can't override it mid-scroll. */
  var lockUntil=0;
  curLinks.forEach(function(a){ a.addEventListener("click",function(){ setActive(a.getAttribute("data-anchor")); lockUntil=Date.now()+900; }); });
  function onScroll(){
    if(Date.now()<lockUntil) return;
    var doc=document.documentElement;
    if(window.innerHeight+window.scrollY >= doc.scrollHeight-4){ setActive(targets[targets.length-1].id); return; } /* page bottom → last section */
    var offset=120, cur=null, curTop=-Infinity, minTop=Infinity, first=null;
    targets.forEach(function(t){
      var top=t.el.getBoundingClientRect().top;
      if(top<=offset && top>curTop){ curTop=top; cur=t.id; }
      if(top<minTop){ minTop=top; first=t.id; }
    });
    setActive(cur||first);
  }
  var ticking=false;
  window.addEventListener("scroll",function(){ if(!ticking){ ticking=true; requestAnimationFrame(function(){ onScroll(); ticking=false; }); } }, {passive:true});
  onScroll();
})();

/* ---- Single source of truth for the "Updated" stamp ----
   Set DASHBOARD_UPDATED to the date the page was last refreshed (YYYY-MM-DD).
   Both the topbar and the footer read from it, so they can never drift apart.
   The YouTube/News update routine sets this to today's date on every refresh. */
(function(){
  var DASHBOARD_UPDATED = "2026-06-11";
  var m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var p=String(DASHBOARD_UPDATED).split("-");
  var pretty=m[parseInt(p[1],10)-1]+" "+parseInt(p[2],10)+", "+p[0];
  var top=document.getElementById("lastUpdated"); if(top) top.textContent="Updated "+pretty;
  var ft=document.getElementById("footerDate");   if(ft)  ft.textContent=pretty;
})();

/* ---- Hero banner: fade the video in over the poster jpg once it starts playing ----
   The jpg shows instantly as the .brief background; the video sits on top at
   opacity 0 and crossfades in on the first "playing" event. If neither the mp4
   nor the webm can play (e.g. an old browser), the jpg simply stays. */
(function(){
  var vids=document.querySelectorAll(".brief-bg");
  if(!vids.length) return;
  vids.forEach(function(v){
    function reveal(){ v.classList.add("is-playing"); }
    if(!v.paused && !v.ended && v.readyState>2) reveal();   // already playing before JS ran
    v.addEventListener("playing", reveal);
  });
})();
