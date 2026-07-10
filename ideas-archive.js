/* =========================================================================
   IDEAS ARCHIVE — retired Content Ideas + Video Ideas (append-only).

   The LIVE site does NOT read this file. It only preserves earlier idea sets
   so a good idea is never lost when the live lists are refreshed. Newest
   snapshot first. To reuse an idea, copy its object back into the live list:
     - Content Ideas  -> contentIdeas[] in dashboard.js
     - Video Ideas    -> YT_DATA.videoIdeas.{longForm,shortForm} in youtube-data.js

   Each snapshot:
     retired   the date this set was replaced on the live site (YYYY-MM-DD)
     label     human note on which refresh this set belonged to
     contentIdeas / videoIdeas   verbatim copies of the retired live data
   ========================================================================= */

window.IDEAS_ARCHIVE = {
  snapshots: [
    {
          "retired": "2026-07-10",
          "label": "Set active through the 2026-06-29 refresh (replaced by the Jul 10 data-driven refresh).",
          "contentIdeas": [
                {
                      "type": "AI narrative",
                      "score": 88,
                      "fmt": [
                            "Blog",
                            "Webpage",
                            "Social"
                      ],
                      "title": "Can AI approve invoices yet? The AP reality check for Business Central",
                      "tease": "Use competitor AI claims as the hook, then show where governance, audit trails and BC-native workflows still matter.",
                      "reason": "Dooap, Medius, Tungsten (TotalAgility 2026.2) and even Microsoft are all pushing the agentic AI story hard — and Truvio's new TruvioSense now adds LLM invoice-coding suggestions on top of ML. Continia can own a more credible angle: AI is valuable, but production AP still depends on traceability, approval control, exception handling and native Business Central context.",
                      "s": [
                            [
                                  "Dooap Studio",
                                  "https://www.prnewswire.com/news-releases/dooap-inc-launches-dooap-studio-putting-agentic-ap-automation-directly-in-the-hands-of-finance-teams-302768534.html"
                            ],
                            [
                                  "Truvio: What's New",
                                  "https://truvio.com/whats-new"
                            ],
                            [
                                  "Microsoft Expense Agent",
                                  "https://www.microsoft.com/en-us/dynamics-365/blog/it-professional/2026/04/27/expense-agent-dynamics-365-business-central/"
                            ],
                            [
                                  "Continia Document Capture",
                                  "https://www.continia.com/solutions/document-capture/"
                            ]
                      ]
                },
                {
                      "type": "E-invoicing",
                      "score": 86,
                      "fmt": [
                            "Blog",
                            "Webpage",
                            "Newsletter"
                      ],
                      "title": "Mandate map 2026: France, the UAE and ViDA — what BC teams must do",
                      "tease": "Turn the wave of new mandates into a practical Business Central readiness checklist with Continia Delivery Network as the answer.",
                      "reason": "E-invoicing is going global and compliance-critical at once: France's mandate hits large and mid-size firms in September 2026, the UAE begins its rollout on 1 July 2026 (with accredited providers like Pagero already listed), and the EU's ViDA reforms loom behind them. A clear, BC-focused mandate-readiness guide is a timely, searchable asset that positions Continia against the connector crowd.",
                      "s": [
                            [
                                  "Continia Delivery Network",
                                  "https://www.continia.com/use-cases/continia-delivery-network/"
                            ],
                            [
                                  "Built-in e-invoicing access",
                                  "https://www.continia.com/news/built-in-access-to-e-invoicing-with-continia/"
                            ],
                            [
                                  "UAE pre-approved providers",
                                  "https://europe.thomsonreuters.com/newsroom/pagero-part-of-thomson-reuters-listed-as-pre-approved-e-invoicing-service-provider-in-the-uae"
                            ],
                            [
                                  "Microsoft E-Docs FAQ",
                                  "https://learn.microsoft.com/en-us/dynamics365/business-central/faq-electronic-invoicing"
                            ]
                      ]
                },
                {
                      "type": "Product demo",
                      "score": 82,
                      "fmt": [
                            "Video",
                            "Webpage",
                            "Webinar"
                      ],
                      "title": "From inbox to archive: the 5-step invoice flow inside Business Central",
                      "tease": "A concrete walkthrough for teams comparing AP automation options and trying to picture the real workflow.",
                      "reason": "The strongest Continia fit is still practical product education. This idea converts existing AP automation pages into a clean demo narrative: import, OCR, register, approve and archive, with the BC-native flow as the proof point.",
                      "s": [
                            [
                                  "AP automation in 5 steps",
                                  "https://www.continia.com/use-cases/ap-automation-in-5-simple-steps/"
                            ],
                            [
                                  "Document Capture solution",
                                  "https://www.continia.com/solutions/document-capture/"
                            ],
                            [
                                  "Document Capture docs",
                                  "https://docs.continia.com/en-us/continia-document-capture/"
                            ],
                            [
                                  "Business functionality",
                                  "https://docs.continia.com/en-us/continia-document-capture/getting-started/business-functionality"
                            ]
                      ]
                },
                {
                      "type": "Analytics",
                      "score": 79,
                      "fmt": [
                            "Blog",
                            "Social",
                            "Newsletter"
                      ],
                      "title": "Beyond approval: turning Business Central invoice data into spend intelligence",
                      "tease": "Competitors now market captured AP data as executive insight — show how BC + Continia data already powers spend visibility, natively.",
                      "reason": "Stampli's Deep Finance (Mar 2026) reframes captured invoice data as 'consultant-grade executive spend intelligence' — a sign the category is moving from processing to insight (and Stampli just raised $61M from Blackstone to push it). Continia can meet this by showing how Document Capture data lives natively in Business Central and feeds dimensions, reporting and Power BI — insight without leaving the ERP.",
                      "s": [
                            [
                                  "Stampli Deep Finance",
                                  "https://www.prnewswire.com/news-releases/stampli-launches-deep-finance-turning-invoice-data-into-executive-spend-intelligence-302729234.html"
                            ],
                            [
                                  "Stampli $61M raise",
                                  "https://financialit.net/news/fundraising-news/stampli-secures-61m-advanced-ai-powered-ap-automation"
                            ],
                            [
                                  "Continia Document Capture",
                                  "https://www.continia.com/solutions/document-capture/"
                            ],
                            [
                                  "Document Capture docs",
                                  "https://docs.continia.com/en-us/continia-document-capture/"
                            ]
                      ]
                },
                {
                      "type": "Positioning",
                      "score": 76,
                      "fmt": [
                            "Blog",
                            "Social"
                      ],
                      "title": "Payment-owned AP platforms vs BC-native independence",
                      "tease": "Explain why ownership and payment-rail incentives should matter when finance teams choose AP automation.",
                      "reason": "AvidXchange, MineralTree and Tipalti show how much of the AP category is moving toward payment monetisation and financial networks, while Stampli's fresh $61M Blackstone round funds more of the same. Continia can contrast that with a focused Business Central-native position without sounding defensive.",
                      "s": [
                            [
                                  "AvidXchange acquisition",
                                  "https://www.avidxchange.com/press-releases/tpg-corpay-complete-acquisition-of-avidxchange/"
                            ],
                            [
                                  "Global Payments + MineralTree",
                                  "https://investors.globalpayments.com/news-events/press-releases/detail/23/global-payments-agrees-to-acquire-mineraltree-a-leader-in"
                            ],
                            [
                                  "Stampli $61M raise",
                                  "https://financialit.net/news/fundraising-news/stampli-secures-61m-advanced-ai-powered-ap-automation"
                            ],
                            [
                                  "Continia Document Capture",
                                  "https://www.continia.com/solutions/document-capture/"
                            ]
                      ]
                },
                {
                      "type": "Document Output",
                      "score": 73,
                      "fmt": [
                            "Blog",
                            "Webpage"
                      ],
                      "title": "The hidden risk after invoice approval: output, delivery and audit trail",
                      "tease": "Broaden the story beyond AP capture by showing what can still go wrong after documents leave Business Central.",
                      "reason": "Lasernet — now independent as Lasernet Group and live on BC AppSource with Azure AI mapping — is visible in the BC-native output space, while Continia Document Output has strong material around automated distribution, protected PDFs, eIDAS and AI-powered translations. This is a useful adjacent content pillar for buyers thinking beyond invoice intake.",
                      "s": [
                            [
                                  "Continia Document Output",
                                  "https://www.continia.com/solutions/document-output/"
                            ],
                            [
                                  "Online access docs",
                                  "https://docs.continia.com/en-us/continia-document-output/development-and-administration/online/overview"
                            ],
                            [
                                  "Lasernet Group on AppSource",
                                  "https://www.lasernetgroup.com/news-blogs/bc-connector-now-on-appsource"
                            ],
                            [
                                  "Output Profiles",
                                  "https://docs.continia.com/en-us/continia-document-output/business-functionality/general/output-profiles/"
                            ]
                      ]
                },
                {
                      "type": "Analyst signal",
                      "score": 87,
                      "fmt": [
                            "Blog",
                            "Webpage",
                            "Newsletter"
                      ],
                      "title": "The Forrester Wave 2026 is out — how Business Central buyers should read it",
                      "tease": "Use the new AP Invoice Automation Wave as the hook, then reframe selection around production performance — accuracy, exception handling, compliance — not agentic marketing.",
                      "reason": "Forrester published The Forrester Wave: AP Invoice Automation Software, Q2 2026 (June 15-16), evaluating 15 enterprise APIA vendors — Basware was named a Leader — and argues AI is moving AP from automation toward autonomous, real-time control. None of the evaluated names are Business Central-native, which is the opening: a clear-eyed readout that translates Forrester's own criteria (e-invoicing compliance, fraud/risk, exception handling, process monitoring) into what actually matters for a BC finance team choosing an embedded solution.",
                      "s": [
                            [
                                  "Forrester Wave announcement",
                                  "https://www.forrester.com/blogs/announcing-the-forrester-wave-accounts-payable-invoice-automation-software-q2-2026/"
                            ],
                            [
                                  "Basware named a Leader",
                                  "https://www.basware.com/en/resources/the-forrester-wave-accounts-payable-invoice-automation-software-q2-2026"
                            ],
                            [
                                  "Continia Document Capture",
                                  "https://www.continia.com/solutions/document-capture/"
                            ]
                      ]
                },
                {
                      "type": "Original research",
                      "score": 84,
                      "fmt": [
                            "Report",
                            "Blog",
                            "Social"
                      ],
                      "title": "The Business Central Finance AI Readiness Report",
                      "tease": "Run Continia's own short survey of BC finance teams on AI adoption, trust and blockers — then publish the numbers as an ownable, repeatable asset.",
                      "reason": "Rillion's Nordic AI Finance Report (250 CFOs) was one of its highest-engagement campaigns and seeded weeks of follow-on posts — its headline that 'AI usage has spread faster than trust' is exactly the tension BC finance teams feel. Original data travels on LinkedIn far better than product posts, yet no BC-native vendor owns a finance-AI research franchise. A BC-specific readiness survey gives Continia credible, quotable numbers and a recurring content engine.",
                      "s": [
                            [
                                  "Rillion AI in Finance report",
                                  "https://www.rillion.com/blog/finance-labs/ai-in-finance-report/"
                            ],
                            [
                                  "Forrester Wave announcement",
                                  "https://www.forrester.com/blogs/announcing-the-forrester-wave-accounts-payable-invoice-automation-software-q2-2026/"
                            ],
                            [
                                  "Continia Document Capture",
                                  "https://www.continia.com/solutions/document-capture/"
                            ]
                      ]
                },
                {
                      "type": "Trust & security",
                      "score": 81,
                      "fmt": [
                            "Blog",
                            "Webpage",
                            "Social"
                      ],
                      "title": "ISO 27001, eIDAS and the audit trail: the AP automation due-diligence checklist",
                      "tease": "Turn security and compliance credentials into a buyer's checklist — the exact angle that just earned Continia its biggest LinkedIn moment.",
                      "reason": "Continia's 'We're ISO 27001 certified' post was by far its top-performing recent post (187 reactions — roughly 3x its next best), a clear signal that certification, trust and data security resonate with the BC finance audience. With AP data increasingly flowing through third-party payment networks, a checklist piece (ISO 27001, eIDAS sealing, Peppol-certified delivery, audit trail, data residency) positions Continia's Trust Center and Delivery Network as proof rather than marketing.",
                      "s": [
                            [
                                  "Continia Trust Center",
                                  "https://www.continia.com/legal/trust-center/data-security/"
                            ],
                            [
                                  "Continia Delivery Network",
                                  "https://www.continia.com/news/continia-delivery-network/"
                            ],
                            [
                                  "Continia Document Capture",
                                  "https://www.continia.com/solutions/document-capture/"
                            ]
                      ]
                },
                {
                      "type": "Product demo",
                      "score": 77,
                      "fmt": [
                            "Video",
                            "Social",
                            "Webpage"
                      ],
                      "title": "Approve invoices from your phone: mobile AP in Business Central",
                      "tease": "A short, visual walkthrough of approving on the go — answering a workflow competitors are actively marketing.",
                      "reason": "Qvalia's 'now available on iPhone and Android — approve invoices in seconds' post drew strong engagement (42 reactions, 5 comments, above its baseline), showing mobile approval is a concrete, demo-able benefit buyers react to. Continia can tell the same story inside Business Central with its approval workflow and web/mobile approval — keeping the proof BC-native instead of a separate app.",
                      "s": [
                            [
                                  "Qvalia (LinkedIn)",
                                  "https://www.linkedin.com/company/qvalia/"
                            ],
                            [
                                  "Continia Document Capture",
                                  "https://www.continia.com/solutions/document-capture/"
                            ],
                            [
                                  "Document Capture docs",
                                  "https://docs.continia.com/en-us/continia-document-capture/"
                            ]
                      ]
                },
                {
                      "type": "Event marketing",
                      "score": 74,
                      "fmt": [
                            "Social",
                            "Video",
                            "Newsletter"
                      ],
                      "title": "Turn Elevate and DynamicsMinds into a content engine",
                      "tease": "Systematise event recaps into a repeatable pre/during/post series — consistently the highest-engagement content across the whole competitor set.",
                      "reason": "Across the LinkedIn capture, event posts dominate engagement: Continia's DynamicsMinds recap (92) and Elevate tour stops (60, 49) were among its best, and rivals see the same — Yavrio's DynamicsMinds posts (105, 81), Dooap's wrap-up (69), Stampli's Sage Future day one (91). That is a format insight, not a one-off: a planned template for every Continia event (Elevate, Directions, Community Summit) turns presence into a reliable engagement stream.",
                      "s": [
                            [
                                  "Continia (LinkedIn)",
                                  "https://www.linkedin.com/company/continia-software-a-s/"
                            ],
                            [
                                  "Yavrio (LinkedIn)",
                                  "https://www.linkedin.com/company/yavrio/"
                            ],
                            [
                                  "Dooap (LinkedIn)",
                                  "https://www.linkedin.com/company/dooap/"
                            ]
                      ]
                },
                {
                      "type": "Social format",
                      "score": 70,
                      "fmt": [
                            "Social",
                            "Video"
                      ],
                      "title": "'Before vs after': a short-form AP transformation series",
                      "tease": "Borrow the punchy comparison format that's outperforming for BC-native rivals and apply it to the Continia invoice flow.",
                      "reason": "Yavrio's 'Finance teams BEFORE vs AFTER' and its quick visual posts pulled outsized reactions (40-100+), and the broader pattern shows snappy, outcome-led visuals beat dense product copy on LinkedIn. A recurring before/after series — manual chase vs Continia capture-approve-archive in BC — is cheap to produce, on-brand, and built for the feed rather than the blog.",
                      "s": [
                            [
                                  "Yavrio (LinkedIn)",
                                  "https://www.linkedin.com/company/yavrio/"
                            ],
                            [
                                  "Continia (LinkedIn)",
                                  "https://www.linkedin.com/company/continia-software-a-s/"
                            ],
                            [
                                  "AP automation in 5 steps",
                                  "https://www.continia.com/use-cases/ap-automation-in-5-simple-steps/"
                            ]
                      ]
                }
          ],
          "videoIdeas": {
                "longForm": [
                      {
                            "score": 82,
                            "title": "End-to-end AP automation in Business Central",
                            "desc": "Follow one invoice from PDF capture and OCR through coding, the approval portal and payment — the full flow in a single demo. Matches the channel's top-performing how-tos."
                      },
                      {
                            "score": 74,
                            "title": "e-Invoicing & Peppol before the 2026 mandates",
                            "desc": "A step-by-step compliance walkthrough tied to the France and Belgium 2026 mandates, showing how to get a Business Central setup Peppol-ready. High, recurring EU search demand."
                      },
                      {
                            "score": 63,
                            "title": "Continia vs native BC AI agents (2026 Wave 1)",
                            "desc": "A comparison of what Continia automates versus BC's new GA AI agents, helping AP teams decide what to hand to which tool. Rides the AI theme but is more niche and dates faster."
                      },
                      {
                            "score": 78,
                            "title": "Document Capture deep-dive: OCR templates that actually stick",
                            "desc": "A hands-on build of capture templates for messy real-world invoices — multi-line, multi-currency, recurring vendors. Plays directly to the channel's proven product-demo strength."
                      },
                      {
                            "score": 70,
                            "title": "Building your approval workflow from scratch",
                            "desc": "A practical setup tour of the Continia approval portal — routing rules, delegation, mobile sign-off and the audit trail behind each step. Evergreen onboarding content with steady search demand."
                      },
                      {
                            "score": 67,
                            "title": "Why BC-native beats a bolt-on AP tool",
                            "desc": "A grounded explainer on what 'embedded in Business Central' really buys finance teams versus payment-owned rivals — no data sync, one ledger, one audit trail. Reinforces the neutral, focused positioning."
                      }
                ],
                "shortForm": [
                      {
                            "score": 79,
                            "title": "One invoice, three approvals, zero chasing",
                            "desc": "A 30-second before/after cut showing an invoice stuck in email versus the same approval moving cleanly through Continia. Strong visual hook for finance teams."
                      },
                      {
                            "score": 71,
                            "title": "Peppol readiness in 20 seconds",
                            "desc": "Turn the 2026 e-invoicing deadline into a quick checklist: receive, validate, approve and archive inside Business Central. Timely, practical and easy to repurpose."
                      },
                      {
                            "score": 66,
                            "title": "AI is helpful, but your AP flow still matters",
                            "desc": "A fast myth-vs-reality clip: AI can suggest and extract, but clean approval rules and audit trails are what make AP automation production-ready."
                      },
                      {
                            "score": 75,
                            "title": "Approve an invoice from your phone in 10 seconds",
                            "desc": "A single-take mobile screen-grab of a manager approving on the go — no laptop, no VPN, no chasing. Punchy proof point that demos the value instantly."
                      },
                      {
                            "score": 69,
                            "title": "3 invoice fields OCR should be reading for you",
                            "desc": "A quick tip clip pointing at vendor, amount and due date being captured automatically instead of keyed by hand. Educational, repurposable and easy to series."
                      },
                      {
                            "score": 64,
                            "title": "The hidden cost of one lost invoice",
                            "desc": "A snappy stat-led hook on duplicate payments and late fees, landing on Continia's audit trail as the fix. Pattern-interrupt opener built for the LinkedIn feed."
                      }
                ]
          }
    }
  ]
};
