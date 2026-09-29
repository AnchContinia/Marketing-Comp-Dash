/* continia-knowledge.js — the Continia knowledge base behind knowledge.html.
 *
 * Two knowledge portals are the source of truth for everything in this file:
 *   docs.continia.com   wins on functionality, dependencies, formats, versions, dates
 *   continia.com        wins on positioning, headline claims, customer numbers
 * When the two disagree, that split decides. When this file disagrees with either,
 * the live page wins and this file is wrong — fix it here, don't work around it.
 *
 * Every entry carries an s:[["label","url"]] array, same convention as the
 * competitor cards in dashboard.js. Nothing goes in without a source.
 *
 * Verified 2026-09-23.
 */
window.CK_DATA = {
  verified: "2026-09-23",

  /* ---- The two portals, and the rule for using them ------------------- */
  portals: [
    {
      name: "Continia Docs",
      host: "docs.continia.com",
      url: "https://docs.continia.com/en-us/",
      role: "Functionality",
      what: "Product documentation per solution. Each solution has New and Planned, Getting Started, Setting Up, Business Functionality and Development and Administration sections, plus release plans, detailed changelogs, supported banks and country e-invoicing guides. This is the portal to check a feature, a dependency, a supported format or version, or an end-of-support date against.",
      wins: "Wins on functionality, dependencies, supported versions, formats, banks and dates.",
      s: [["Continia Docs (en-us)", "https://docs.continia.com/en-us/"], ["Document Capture docs", "https://docs.continia.com/en-us/continia-document-capture/"]]
    },
    {
      name: "continia.com",
      host: "www.continia.com",
      url: "https://www.continia.com/solutions/",
      role: "Messaging",
      what: "The public website: one product page per solution with the one-liner, the headline claims, the customer proof points and the pricing model. This is the portal to check how a thing is said publicly — the exact wording of a claim, the numbers Continia puts its name on, and which solutions are shown as sellable.",
      wins: "Wins on positioning, headline claims, customer numbers and testimonials.",
      s: [["Solutions overview", "https://www.continia.com/solutions/"], ["Pricing", "https://www.continia.com/pricing/"]]
    }
  ],

  /* ---- Fact-check rules, in the order to apply them -------------------- */
  rules: [
    {t: "Every claim traces to one of the two portals", d: "A product claim, feature, name, number, date or dependency that cannot be pointed at a page on docs.continia.com or continia.com does not go into an asset. No exceptions for things that sound obviously true."},
    {t: "Docs for function, continia.com for message", d: "When the two disagree, follow Docs for what the product does and continia.com for how it is described. Flag the disagreement so the website can be corrected — the module count on the solutions overview page is a live example."},
    {t: "Re-read the live page for anything dated", d: "End-of-sale dates, end-of-support dates, release names, supported Business Central versions and e-invoicing mandates move. Check the page even when this knowledge base has an answer."},
    {t: "Legacy is not a selling point", d: "Payment Management, OPplus and Dynamo Pay still exist for existing customers. They never appear in new marketing material as current products — name the successor and the migration path instead."},
    {t: "Attribute the percentages", d: "The 95% / 80% / 10+ hours / two-thirds figures are website product-page claims presented as customers' results. Use them with that framing, not as measured benchmarks."}
  ],

  /* ---- Key terms: the capabilities Continia's own pages lead with -------
     Not a popularity measure - the site has no usage data and nobody's search
     behaviour has been measured. Each one is a named capability, module or
     component that docs.continia.com and/or the product page on continia.com
     puts in a heading or a feature block, read 2026-09-23. `w` records where,
     so the list can be re-checked rather than re-guessed. Ordered by solution,
     matching the order of the page below. */
  keyTerms: [
    {t:"OCR",                  w:"Document Capture product page \u2014 \u201cIntelligent OCR\u201d"},
    {t:"Order Matching",       w:"Document Capture module, on the product page and in Docs"},
    {t:"Advanced Capture",     w:"Document Capture module, on the product page and in Docs"},
    {t:"per diem",             w:"Expense Management module; Docs organises a setup section around it"},
    {t:"mileage",              w:"Expense Management module; Docs organises a setup section around it"},
    {t:"receipt scanning",     w:"Expense Management product page \u2014 \u201cAI-powered receipt scanning\u201d"},
    {t:"credit card",          w:"Expense Management module \u2014 Credit Card Transactions"},
    {t:"email templates",      w:"Document Output product page \u2014 lead feature"},
    {t:"remittance advice",    w:"Document Output and Continia Banking product pages"},
    {t:"eSeal",                w:"Document Output Security module \u2014 eIDAS eSeal certification"},
    {t:"direct debit",         w:"Continia Banking Essential; also the core of Collection Management"},
    {t:"bank reconciliation",  w:"Continia Banking product page \u2014 \u201cReliable reconciliations\u201d"},
    {t:"payment approval",     w:"Continia Banking Security module"},
    {t:"Associations",         w:"Continia Finance specialized module"},
    {t:"Treasury",             w:"Continia Finance specialized module"},
    {t:"Factoring",            w:"Continia Finance specialized module"},
    {t:"Betalingsservice",     w:"Collection Management \u2014 Mastercard Betalingsservice"},
    {t:"Peppol",               w:"Carried by Document Capture, Document Output and the Delivery Network"},
    {t:"eDocuments",           w:"Named component shared by Document Capture and Document Output"},
    {t:"Secure Archive",       w:"Named component shared by Document Capture and Expense Management"},
    {t:"Web Approval Portal",  w:"Named component shared by Document Capture and Expense Management"}
  ],

  /* ---- Company-level proof points -------------------------------------- */
  company: {
    points: [
      {v: "21,000+", l: "customers worldwide"},
      {v: "2,000+", l: "Microsoft partners"},
      {v: "30+", l: "years in business"},
      {v: "ISO 27001", l: "certified"}
    ],
    notes: [
      "\"Built Inside\" is Continia's positioning term for solutions embedded directly in Business Central rather than bolted on as an external platform.",
      "Free 30-day trial of every solution from Microsoft Marketplace (AppSource) with full functionality; set-up is described as under 15 minutes from download.",
      "The Continia Finance Essential module is free forever and needs no trial.",
      "Business Central online is licensed \"Use & Pay\" — invoiced monthly on usage and activated modules. On-premises is a purchase or subscription licence through the Dynamics partner.",
      "The partner is the customer's single point of support contact; partners use PartnerZone.",
      "Two releases a year, named by year and half: R1 in spring (BC wave 1) and R2 in autumn (BC wave 2), e.g. \"2026 R1\". BC version mapping used in Docs: v26 = 2025 wave 1, v27 = 2025 wave 2, v28 = 2026 wave 1."
    ],
    s: [["Solutions overview", "https://www.continia.com/solutions/"], ["Pricing", "https://www.continia.com/pricing/"], ["Continia Learn", "https://learn.continia.com/"], ["Status page", "https://status.continia.com/"]]
  },

  /* ---- Solutions -------------------------------------------------------- */
  solutions: [
    {
      id: "ck-document-capture",
      name: "Document Capture",
      status: "active",
      area: "Accounts payable",
      markets: "Global",
      release: "2026 R1",
      one: "Automate your Accounts Payable workflow — from receiving invoices to posting and archiving them — without leaving Business Central.",
      what: "Document Capture receives purchase invoices, credit memos and other documents as PDF or XML, reads them with OCR and AI-enhanced line recognition, registers them in Business Central, matches them against purchase orders and receipts, routes them through approval, and stores the originals in a secure archive linked to the posted transaction. Documents arrive through dedicated Continia email addresses, drag-and-drop, scanners, or e-delivery networks via the Continia Delivery Network.",
      claims: "Website product page, framed as customers' results: save 10+ hours weekly with AI invoice processing, 95% accuracy with automatic three-way matching, 80% faster invoice processing, two-thirds cost reduction on manual tasks, ROI from day one.",
      modules: [
        {n: "Essential", p: [
          "OCR header recognition (invoice number, dates, totals) and configurable template fields.",
          "Batch registration, manual split and merge, drag-and-drop.",
          "Fraud check on changed bank account, VAT and phone details.",
          "All major XML formats out of the box: PEPPOL BIS 3, OIOUBL, UBL, EHF, Svefaktura, ebInterface, XRechnung, ZUGFeRD, Finvoice, PINT Billing, PINT A-NZ Billing, SimplerInvoicing, UTS and more.",
          "Continia Delivery Network and Continia eDocuments, including auto-send, self-billing, embedded PDFs and \"Peppol First\" e-partner onboarding.",
          "Full document archive with Navigate, export for audits, Secure Archive.",
          "Split amounts by dimension, deferral codes, G/L lines without a vendor account.",
          "Company identification for multi-company inboxes; Multi Entity Management (Binary Stream) support.",
          "GDPR clean-up, duplicate transaction check against Expense Management, VAT rounding auto-correction.",
          "Create vendors and customers directly from PDFs and XMLs.",
          "Azure Blob storage with Entra ID, SAS or Shared Key authentication."
        ]},
        {n: "Advanced Capture", p: [
          "AI-enhanced line recognition transferred to purchase lines.",
          "AI-assisted sales document processing and quick customer creation.",
          "Automatic line calculation and line item price checks.",
          "Automated split and merge of multi-invoice PDFs.",
          "Item charges, item tracking (lot, serial, expiry), prepayments.",
          "Create and update purchase orders from vendor order confirmations; update receipts from delivery notes.",
          "Process other document types: sales orders, contracts, delivery notes, receipts, attachments to vendors, customers and employees."
        ]},
        {n: "Order Matching", p: [
          "Automatic match to purchase orders, receipts, return orders and return shipments.",
          "Match on totals, or line-by-line — line-by-line requires Advanced Capture.",
          "Match across units of measure, variance handling, serial number match.",
          "One-to-many and many-to-one matching.",
          "Highlight purchase order changes in price, cost or delivery date."
        ]},
        {n: "Document Approval", p: [
          "Web Approval Portal for approvers without a full Business Central licence — a Business Central Team Member licence is the minimum per approver.",
          "Approval of purchase and return orders, unlimited approval flows, four-eyes approval, forced approval.",
          "Automated approval within thresholds — requires Order Matching.",
          "Approval sharing, out of office, forwarding, documents on hold, user-specific approver lists.",
          "Permissions by account and dimension, full audit trail, purchase allocations, intercompany fields.",
          "Cross-company approval dashboard and highlighted relevant lines in the portal."
        ]},
        {n: "Purchase Contracts", p: [
          "Central management of contracts, subscriptions and recurring costs.",
          "Register invoices as contract invoices; auto-approve recurring invoices within limits.",
          "Renewal overview, scheduled review cycles, email reminders.",
          "Purchase Contract Intelligence detects patterns in recurring invoices and suggests creating a contract."
        ]}
      ],
      compliance: [
        "Country-specific e-invoicing guides in Docs for Australia, Austria, Belgium, Canada, Denmark, Finland, France, Germany, Iceland, Ireland, Netherlands, New Zealand, Norway, Poland, Portugal, Spain, Sweden, UK and US.",
        "Networks through CDN include Peppol, NemHandel (Denmark) and KSeF (Poland).",
        "French e-invoicing is mandatory from 1 September 2026 — already in force. Continia is positioned as an accredited platform (\"plateforme agréée\") with its own landing page and Docs section.",
        "Danish Bookkeeping Act requirements (digital vouchers, secure archiving) are covered.",
        "Localizations include Italian, Czech, Finnish, Polish, Portuguese and Swiss QR-bill integration."
      ],
      links: [
        "Expense Management — dual processing of purchase invoices without double posting, duplicate warnings.",
        "Continia Banking — payment pre-validation before document approval, automatic transfer of payment references.",
        "Document Output — shared eDocuments framework across inbound and outbound.",
        "Business Central sustainability feature — carbon accounting on purchase documents."
      ],
      terms: ["AP automation", "OCR", "three-way matching", "order matching", "Advanced Capture", "purchase invoice", "approval", "Web Approval Portal", "Purchase Contracts", "Peppol", "XRechnung", "ZUGFeRD", "OIOUBL", "KSeF", "NemHandel", "Secure Archive", "fraud check", "e-invoicing"],
      s: [["Docs — Document Capture", "https://docs.continia.com/en-us/continia-document-capture/"], ["Docs — Business functionality", "https://docs.continia.com/en-us/continia-document-capture/business-functionality/"], ["Docs — New and planned", "https://docs.continia.com/en-us/continia-document-capture/new-and-planned/"], ["Product page", "https://www.continia.com/solutions/document-capture/"]]
    },

    {
      id: "ck-expense-management",
      name: "Expense Management",
      status: "active",
      area: "Travel & expense",
      markets: "Global",
      release: "2026 R1 on the website; Docs already list a 2026 R2 changelog",
      one: "Simplify employee expense reporting in Business Central and get a real-time overview of employee spending.",
      what: "Employees capture receipts, mileage and per diems from their phone or browser. The expense is routed through approval and posted straight to G/L accounts and dimensions in Business Central. Corporate credit card transactions import automatically and match against receipts.",
      claims: "Website product page, framed as customers' results: pay, scan and submit an expense in under 30 seconds; unlimited expense users at no extra cost; faster approvals through a dedicated web platform.",
      surfaces: [
        "Continia Expense Mobile App — iOS and Android. AI-powered receipt scanning with autofill, expense reports, mileage, per diems, push notifications, templates, Microsoft Intune support for managed roll-out.",
        "Continia Expense Portal — browser-based, no installation, same capabilities as the app plus drag-and-drop receipts.",
        "Continia Web Approval Portal — cross-company approvals for managers without a Business Central login.",
        "Business Central — finance team review, posting, reimbursement, setup and reporting."
      ],
      modules: [
        {n: "Essential", p: [
          "Expense Mobile App and Expense Portal.",
          "AI Receipt Scanner with autofill, multi-VAT recognition, ISO country mapping, and email-to-PDF conversion of forwarded receipts.",
          "Expense Agent — an assistant inside the Expense App and Portal, new in 2026. Check Docs for its current scope before describing it.",
          "Expense reports grouping expenses, mileage and per diems per trip, project or period.",
          "Approval workflows, pre-approval of expense reports, bulk approval in Business Central.",
          "Cash Advance expense type.",
          "Configurable fields, field dependencies, templates, distribution codes for auto-allocation.",
          "Post in document currency per user; multi-currency mileage rates.",
          "Standard dimension handling and automatic dimension correction on intermediate accounts.",
          "Secure Archive and automatic archiving.",
          "eInvoicing support for expenses linked to e-documents.",
          "Integration with Document Capture (dual invoice processing, image-to-PDF conversion) and with Microsoft Sustainability."
        ]},
        {n: "Credit Card Transactions", p: [
          "Automatic import from major card providers; documented feeds include American Express, Mastercard, Visa and Eurocard, plus manual and custom file import.",
          "Automatic matching, auto-generated expenses from transactions, missing-receipt reminders.",
          "Agreement activation wizard, preserved bank descriptions, configurable posting descriptions.",
          "Post to existing business vendors when using corporate cards."
        ]},
        {n: "Mileage", p: [
          "Google Maps integration with via points, GPS capture, route view in Business Central.",
          "Templates for recurring routes, attachment rules.",
          "UK mileage VAT calculation; Danish 60-day rule; home-to-office deduction."
        ]},
        {n: "Per Diem", p: [
          "Rate setup and calculation in Business Central, multi-country trips, allowances, taxable rates.",
          "Assign per diems to projects by destination.",
          "Local rules: German three-month rule, Danish 12-month rule, Norwegian per diem rules.",
          "Enhanced monthly travel expense statement for tax reporting (German market)."
        ]},
        {n: "Purchase Contracts", p: [
          "The same contract concept as in Document Capture, applied to recurring expenses.",
          "Auto-approve expenses linked to a contract, renewal reminders, contract archive."
        ]}
      ],
      compliance: [
        "Localizations called out in Docs: Australia (GST split), Canada (sales tax), Denmark, Germany, Norway, United Kingdom, United States, plus Polish and Portuguese localizations."
      ],
      terms: ["expense", "expenses", "receipt scanning", "mileage", "per diem", "credit card", "corporate card", "Expense App", "Expense Portal", "Expense Agent", "cash advance", "reimbursement", "Intune"],
      s: [["Docs — Expense Management", "https://docs.continia.com/en-us/continia-expense-management/"], ["Product page", "https://www.continia.com/solutions/expense-management/"]]
    },

    {
      id: "ck-document-output",
      name: "Document Output",
      status: "active",
      area: "Accounts receivable",
      markets: "Global",
      release: "2026 R1",
      one: "Automate and customize your document distribution. Send and manage your outgoing documents easily.",
      what: "Document Output handles everything Business Central sends out — invoices, credit memos, statements, reminders, remittance advices and reports — by email, print or electronic delivery. The recipient's preference decides the channel and format, templates decide the look, and everything is logged. It connects directly to the Continia Delivery Network so sales invoices and credit memos go out as validated XML e-documents over Peppol and NemHandel without a third-party operator.",
      modules: [
        {n: "Essential", p: [
          "Recipient setup, merge fields, merge tables of posted lines, header and line attachments.",
          "30+ ready-made email templates and 10+ merge table styles; copy template lines; template variants driven by dimensions such as customer type or language.",
          "AI Assistant for translating email templates into multiple languages and suggesting tone and clarity improvements.",
          "Time-limited signatures and campaigns for seasonal messaging.",
          "Email jobs and background sending via job queue; automated statement distribution calendar.",
          "PDF merge, PDF background images (first, content and last page), password protection, digital signing.",
          "Document Output Service for printing and file download, also from Business Central cloud.",
          "Continia Delivery Network and Continia eDocuments for outbound e-invoices: embed PDFs and attachments in XML, resend e-billing documents, check partner e-document capabilities, \"Peppol First\" onboarding, fall back to email when the recipient is not on the network.",
          "Auto-send remittance advice, one email per vendor.",
          "Embedded payment links in email bodies.",
          "Line-level file engine (PDF, Word, Excel per template line).",
          "Role Center tiles for documents that need attention.",
          "Full audit log stored in database, file system or Azure Blob; log preservation security.",
          "Extension App Builder / AL Extension Builder to add Document Output features to custom or standard modules."
        ]},
        {n: "Security", p: [
          "eIDAS-compliant eSeal certification of PDFs.",
          "PDF password protection and third-party certificate signing."
        ]}
      ],
      compliance: [
        "Country e-invoicing guides mirror those of Document Capture.",
        "French e-invoicing, mandatory from 1 September 2026: sending flows, the eReporting framework and scenario flows are documented.",
        "Formats include Peppol BIS 3 (incl. the AU/NZ variant), OIOUBL, ZUGFeRD, Factur-X and NemHandel.",
        "Danish Bookkeeping Act compliance guide."
      ],
      terms: ["document distribution", "email templates", "outgoing invoices", "statements", "reminders", "remittance advice", "eSeal", "eIDAS", "Factur-X", "PDF", "e-delivery", "Peppol", "print"],
      s: [["Docs — Document Output", "https://docs.continia.com/en-us/continia-document-output/"], ["Product page", "https://www.continia.com/solutions/document-output/"]]
    },

    {
      id: "ck-banking",
      name: "Continia Banking",
      status: "active",
      area: "Banking",
      markets: "Global",
      release: "2026 R1",
      one: "Streamline payments and secure your financial operations directly within your Business Central.",
      what: "Continia Banking connects Business Central directly to the bank. It creates and exports payments, receives real-time status feedback, imports statements and cash receipts, reconciles them against ledger entries, handles direct debit, and protects the payment flow with approval workflows and bank account verification. It also imports and reconciles payouts from payment service providers such as Klarna and PayPal. It is the successor to both Payment Management (Nordics, Benelux, UK, US) and OPplus (DACH); migration tools move data from both.",
      claims: "Website product page, framed as customers' results: up to 95% automatic match rate in reconciliation, direct bank communication, built-in payment fraud prevention.",
      modules: [
        {n: "Essential", p: [
          "Standard payment flow (quick, by line or summarized) and advanced payment flow (per-recipient control, partial payments, discounts).",
          "Payment suggestion templates; pay all vendors, customers and employees from one journal across banks and currencies.",
          "Transaction-ID-based reconciliation, payment reference autofill (OCR lines), payment reference rules with check digit validation.",
          "Advanced payment validation, and pre-validation together with Document Capture.",
          "Import bank statements into the Payment Reconciliation Journal or Bank Account Reconciliation; rule-based reconciliation with search rules, split rules, merge rules, related party rules and proposal application rules.",
          "CSV Ports for any bank or PSP file, ZIP import, CAMT.053/054 handling.",
          "Direct debit processing and direct debit returns.",
          "Payment service provider support (Klarna, PayPal and custom PSPs) with fee transparency and ready-made templates.",
          "Autofill bank details from IBAN, alternative payee (e.g. factoring companies), automatic payment splitting.",
          "Tax and social security payment allocation, G accounts, regulatory reporting (incl. Z4), AML compliance criteria.",
          "Multi-currency payments from one bank account; split payment suggestions across several orderer accounts.",
          "Multi-level payment discounts in payment suggestions — requires the Continia Finance module of the same name.",
          "Works with Continia Finance Associations to settle linked customer and vendor entries.",
          "Remittance advice by email, manually, on posting or via job queue."
        ]},
        {n: "Direct Communication", p: [
          "Send payments and receive statements without saving files locally.",
          "Real-time payment status; bank error codes handled inside Business Central; resend after correction.",
          "Fully automated imports of cash receipts, statements and status updates.",
          "Shared bank authentication across companies in the same environment."
        ]},
        {n: "Security", p: [
          "Payment approval workflows: single line or batch, amount thresholds, required number of approvers, approve / reject / delegate.",
          "Field restriction during approval to protect IBAN, SWIFT, account, name and address.",
          "Bank account verification — any new or changed bank details must be re-verified before payment, with batch approval and region-specific validation."
        ]}
      ],
      compliance: [
        "Direct integrations and aggregator routes documented in Docs include Nordea, Danske Bank, SEB, Swedbank and Sparbankerna, DNB, Handelsbanken, Rabobank, ABN Amro, Bank Connect banks, Eika Alliance and other Norwegian banks via Tietoevry, plus the aggregators BANKSapi (EBICS and PSD2 for DACH), konfipay, Yapily, AccessPay and Bizcuit. The current full list is the Supported banks page in Docs — quote that, not this paragraph.",
        "Localizations called out in Docs: Norway (KID references, reconciliation report), Finland (payment references), Netherlands (G accounts), plus DACH via BANKSapi and konfipay."
      ],
      terms: ["payments", "bank reconciliation", "direct debit", "CAMT", "IBAN", "SWIFT", "payment approval", "bank account verification", "PSP", "Klarna", "PayPal", "EBICS", "PSD2", "remittance", "KID", "statement import"],
      s: [["Docs — Continia Banking", "https://docs.continia.com/en-us/continia-banking/"], ["Product page", "https://www.continia.com/solutions/banking/"]]
    },

    {
      id: "ck-finance",
      name: "Continia Finance",
      status: "active",
      area: "Core finance",
      markets: "Global",
      release: "2025 R2 on the website; Docs list a 2026 R1 changelog",
      one: "Optimize your financial processes and ease the burden of core accounting tasks.",
      what: "A set of focused modules that add capabilities missing from standard Business Central. The Essential module is free forever; eight specialized modules can be added as needed, each with a 30-day trial. Continia Finance is also the successor to the OPplus finance modules, with field-mapping references per module for the migration.",
      modules: [
        {n: "Essential (free forever)", p: [
          "Maintain the original currency code and amount on G/L entries.",
          "Ledger entry comments.",
          "VAT key codes and Check VAT keys to prevent wrong VAT postings.",
          "Fast Posting codes — templates triggered by keywords in journals.",
          "Balance confirmation letters for customers and vendors.",
          "Extended application and payment discount handling in journals.",
          "Dimensions on system-generated entries.",
          "Colored report hyperlinks and zebra striping for readability.",
          "CSV Ports."
        ]},
        {n: "Associations", p: ["Group several customers or vendors into one entity; apply and reconcile open entries across the group; link customers and vendors; extended reminders."]},
        {n: "G/L Open Entries", p: ["Extend the open/closed principle to G/L accounts; track payments in progress and interim postings; automatic application."]},
        {n: "Extended Financial Reports", p: ["G/L account groups, extended ledger entry lists, extended trial balance and total balance, VAT entries overview, cash book journal, multilingual chart of accounts."]},
        {n: "Extended Fixed Assets", p: ["Fixed asset templates, quantities on one asset, partial disposal, dimensions, additional reports."]},
        {n: "Installments", p: ["Split sales and purchase documents, and journal lines, into installment plans using templates."]},
        {n: "Multi-level Payment Discounts", p: ["Tiered discounts with several payment dates on one invoice; integrated with Continia Banking payment suggestions."]},
        {n: "Treasury", p: ["Centralized liquidity data across companies: bank balances, G/L, customers, vendors and related entries."]},
        {n: "Factoring", p: ["Create factoring proposals, allocate customers to factoring companies and generate data files. Added in 2025 R1."]}
      ],
      compliance: [
        "Available in the US and Canada with a Dutch localization, and in English in Norway, Sweden, Belgium, Italy, Czechia, Slovakia, Hungary, Poland, Serbia and Bulgaria."
      ],
      terms: ["finance modules", "Essential", "Associations", "G/L open entries", "trial balance", "fixed assets", "installments", "payment discounts", "treasury", "factoring", "VAT keys", "fast posting", "balance confirmation"],
      s: [["Docs — Continia Finance", "https://docs.continia.com/en-us/continia-finance/"], ["Product page", "https://www.continia.com/solutions/finance/"]]
    },

    {
      id: "ck-collection-management",
      name: "Collection Management",
      status: "active",
      area: "Accounts receivable",
      markets: "Denmark only",
      release: "—",
      one: "Collect your outstanding receivables from customers instantly.",
      what: "Collection Management lets Danish companies run direct debit and card-based collection from Business Central. Each customer's preferred collection method is stored and applied automatically when an order, invoice or credit memo is created. Agreements, changes, cancellations and payment statuses are exchanged with the bank or collection provider straight from Business Central. Available for Business Central and Dynamics NAV; the documentation is primarily in Danish.",
      modules: [
        {n: "Supported collection services", p: [
          "Mastercard Betalingsservice",
          "Mastercard Leverandørservice",
          "Danske Bank Collection Service",
          "Worldline (Bambora)",
          "SEPA Direct Debit Core/B2B, via Danske Bank",
          "Nordea"
        ]},
        {n: "Points used in messaging", p: [
          "One provider for all receivables, regardless of collection method.",
          "Works for B2B, B2C or both with the same workflow.",
          "Agreement and payment status overview directly in Business Central.",
          "The bank runs the collection and advising; Business Central receives the status."
        ]}
      ],
      compliance: ["Denmark only. Do not present it as available in other markets — this is one of the easiest facts to get wrong."],
      terms: ["collection", "direct debit", "Betalingsservice", "Leverandørservice", "Bambora", "Worldline", "SEPA", "receivables", "Denmark"],
      s: [["Docs — Collection Management (da-dk)", "https://docs.continia.com/da-dk/continia-collection-management/"], ["Product page", "https://www.continia.com/solutions/collection-management/"]]
    },

    {
      id: "ck-opplus",
      name: "OPplus",
      status: "legacy",
      area: "Banking / finance",
      markets: "DACH",
      release: "No further development",
      one: "All-in-one payment and finance solution for the DACH region.",
      what: "Payment import and export, G/L open entries, extended lists and reports, trial balance and VAT, extended fixed assets, associations, installments, multiple payment discount, treasury and factoring — for the DACH region. Its functionality now lives on in Continia Banking (payments) and Continia Finance (the finance modules). Migration tools and field-mapping references are in Docs.",
      eol: [
        "The product page carries the banner: \"OPplus is being discontinued — plan your migration now. Support for OPplus will end on 30 September 2027. Its functionality now lives on in two modern successor solutions for Business Central: Continia Banking and Continia Finance.\"",
        "End of support: 30 September 2027, as stated on the product page on 23 September 2026.",
        "End of new sales: 1 October 2026 — verify against the current Docs page before quoting it, the website banner states only the support date.",
        "Successors: Continia Banking for payments, Continia Finance for the finance modules."
      ],
      terms: ["OPplus", "DACH", "legacy", "discontinued", "migration", "end of support", "Germany", "Austria", "Switzerland"],
      s: [["Product page (discontinuation banner)", "https://www.continia.com/solutions/opplus/"], ["Docs — OPplus", "https://docs.continia.com/en-us/continia-opplus/"], ["Docs — Continia Banking (successor)", "https://docs.continia.com/en-us/continia-banking/"]]
    },

    {
      id: "ck-payment-management",
      name: "Payment Management",
      status: "legacy",
      area: "Banking",
      markets: "Europe, UK, US",
      release: "No further development",
      one: "Automate your vendor payments and bank reconciliations.",
      what: "Vendor payments, cash receipts, bank reconciliation (Statement Intelligence), payment approval and PSP import, with strong bank coverage in the Nordics, Benelux, UK and US. Replaced by Continia Banking.",
      eol: [
        "The product page states: \"Effective October 1, 2025, Payment Management will no longer be available for purchase or use in new installations. Moving forward, all payment-related functionality will be provided through Continia Banking.\"",
        "End of new sales: 1 October 2025. Support is phased out toward 1 April 2027 (R1 2027) — quote the current date from Docs, not from memory.",
        "Successor: Continia Banking. The migration tool is documented for BC27 and higher. UK customers are directed to their Partner Account Manager for transition guidance.",
        "Watch out: continia.com/solutions still lists Payment Management in the overview grid and the footer. Being listed there does not make it sellable — do not put it in new material."
      ],
      terms: ["Payment Management", "legacy", "end of sale", "Statement Intelligence", "migration", "Continia Banking"],
      s: [["Product page", "https://www.continia.com/solutions/payment-management/"], ["Docs — Payment Management", "https://docs.continia.com/en-us/continia-payment-management/"], ["Docs — Continia Banking (successor)", "https://docs.continia.com/en-us/continia-banking/"]]
    },

    {
      id: "ck-dynamo-pay",
      name: "Dynamo Pay",
      status: "discontinued",
      area: "Banking / finance",
      markets: "DACH",
      release: "No further development",
      one: "German-market payments, G/L open items and customer/vendor netting.",
      what: "A German-market solution for payments, G/L open items and customer/vendor netting. New sales were discontinued on 1 October 2025. It is no longer supported, gets no further development, and is not supported on BC27 or later.",
      eol: [
        "New sales discontinued: 1 October 2025.",
        "No longer supported, no further development.",
        "Not supported on Business Central v27 or later.",
        "Nothing about Dynamo Pay belongs in new marketing material."
      ],
      terms: ["Dynamo Pay", "discontinued", "netting", "DACH", "Germany", "BC27"],
      s: [["Docs — Dynamo Pay", "https://docs.continia.com/en-us/dynamo-pay/"]]
    }
  ],

  /* ---- Shared platform components --------------------------------------- */
  platform: [
    {
      id: "ck-cdn",
      name: "Continia Delivery Network (CDN)",
      what: "Continia's own access point to the e-delivery networks. Used inbound by Document Capture and outbound by Document Output, so a customer needs no third-party operator.",
      p: [
        "Access to Peppol (including the AU/NZ and NL activations), NemHandel and KSeF.",
        "Validates documents before sending and returns real-time status.",
        "A test environment is available for sandboxes."
      ],
      terms: ["CDN", "Delivery Network", "Peppol", "NemHandel", "KSeF", "access point"],
      s: [["Docs — Document Capture", "https://docs.continia.com/en-us/continia-document-capture/"], ["Docs — Document Output", "https://docs.continia.com/en-us/continia-document-output/"]]
    },
    {
      id: "ck-edocuments",
      name: "Continia eDocuments",
      what: "The framework for sending and receiving structured XML business documents through CDN.",
      p: [
        "Covers e-billing (invoices, credit memos) and e-ordering (orders, order responses).",
        "Supports self-billing, embedded PDFs, \"Peppol First\" e-partner onboarding and capability checks on customers and vendors.",
        "OIOUBL 3.0, PINT, FA(3) Poland, EHF orders Norway and French CII are among the formats added in 2025–2026.",
        "Docs has an educational page on formats and networks."
      ],
      terms: ["eDocuments", "XML", "e-billing", "e-ordering", "self-billing", "OIOUBL", "PINT", "CII"],
      s: [["Docs — Document Capture", "https://docs.continia.com/en-us/continia-document-capture/"], ["Docs — Document Output", "https://docs.continia.com/en-us/continia-document-output/"]]
    },
    {
      id: "ck-wap",
      name: "Continia Web Approval Portal",
      what: "A browser-based approval tool used by Document Capture and Expense Management, so approvers do not need to work inside Business Central.",
      p: [
        "Approve purchase documents, expenses, sales documents and contracts from any device with internet access.",
        "Cross-company dashboard, document counters per type, out-of-office copied across companies.",
        "Requires at least a Business Central Team Member licence per approver — this is the dependency most often left out of copy."
      ],
      terms: ["Web Approval Portal", "WAP", "approval", "Team Member licence", "approver"],
      s: [["Docs — Document Capture", "https://docs.continia.com/en-us/continia-document-capture/"], ["Docs — Expense Management", "https://docs.continia.com/en-us/continia-expense-management/"]]
    },
    {
      id: "ck-secure-archive",
      name: "Secure Archive",
      what: "Tamper-proof storage of original bookkeeping documents, available in Document Capture and Expense Management.",
      p: [
        "Stores originals with checksum verification and flags documents changed after approval.",
        "Supports registration to purchase journals.",
        "Certified as audit-proof archiving in Germany — the certification is German, do not generalize it to other countries.",
        "Used to meet the Danish Bookkeeping Act's digital voucher requirements."
      ],
      terms: ["Secure Archive", "archiving", "audit-proof", "GoBD", "Bookkeeping Act", "checksum"],
      s: [["Docs — Document Capture", "https://docs.continia.com/en-us/continia-document-capture/"], ["Docs — Expense Management", "https://docs.continia.com/en-us/continia-expense-management/"]]
    },
    {
      id: "ck-purchase-contracts",
      name: "Purchase Contracts",
      what: "Management of recurring costs, subscriptions and contracts. Sold as a module in both Document Capture and Expense Management.",
      p: [
        "Central register of contracts, subscriptions and recurring costs with renewal overview and email reminders.",
        "Invoices and expenses can be auto-approved within contract limits.",
        "Purchase Contract Intelligence spots patterns in recurring invoices and suggests creating a contract."
      ],
      terms: ["Purchase Contracts", "subscriptions", "recurring costs", "renewals", "Contract Intelligence"],
      s: [["Docs — Document Capture", "https://docs.continia.com/en-us/continia-document-capture/"], ["Docs — Expense Management", "https://docs.continia.com/en-us/continia-expense-management/"]]
    },
    {
      id: "ck-foundation",
      name: "Technical foundation",
      what: "The shared apps and services every solution sits on.",
      p: [
        "Continia Core is a prerequisite app for all solutions.",
        "Continia Solution Management handles activation and modules; on-premises uses licences and granules.",
        "Continia Online is the cloud service layer — OCR, mobile app sync, CDN and credit card feeds.",
        "Continia Hub is the in-app assistance hub, present in all active solutions; Continia Notifications carries in-app alerts about releases and service issues.",
        "All solutions support Business Central online and on-premises. Older FOB (C/AL) versions still exist for NAV and BC14 and are documented under the upgrade compatibility matrix per solution.",
        "Azure Blob Storage is the standard cloud file store, with Entra ID, SAS or Shared Key authentication.",
        "Continia supports the Business Central Universal Code Initiative."
      ],
      terms: ["Continia Core", "Solution Management", "Continia Online", "Continia Hub", "Notifications", "Azure Blob", "Entra ID", "Universal Code", "on-premises", "FOB", "C/AL"],
      s: [["Docs (en-us)", "https://docs.continia.com/en-us/"], ["Status page", "https://status.continia.com/"]]
    }
  ],

  /* ---- Third-party tools -------------------------------------------------
     A deliberate exception to the two-portal rule. That rule governs claims
     about CONTINIA, and docs.continia.com has nothing to say about a Dutch
     image compressor. These entries are sourced from each vendor's own trust,
     security and privacy pages instead, and every row says what the vendor
     states rather than what we assume. Compliance posture moves - re-read the
     linked pages before relying on a row in a customer conversation.

     Four fixed rows per tool (iso / gdpr / ai / keep) so the cards compare
     like for like, then what it is good at, what it is not, and the specific
     thing that catches people out. Read 2026-09-24. */
  thirdParty: [
    {
      id: "ck3-swisstransfer",
      name: "SwissTransfer",
      host: "swisstransfer.com",
      url: "https://www.swisstransfer.com/en",
      what: "Free large-file transfer. Up to 50 GB per transfer, links live for up to 30 days, no account needed.",
      use: "Sending a video cut, a print-ready PDF or an asset pack that will not go through email or Teams.",
      badges: ["ISO 27001", "Swiss hosting", "No account"],
      rows: [
        {k: "ISO 27001", v: "Yes, at the operator. Infomaniak has been certified ISO 27001 since June 2018 and lists the current 2022 edition, alongside ISO 9001 (2022), ISO 14001 and ISO 50001 (both 2015) and B Corp (2025)."},
        {k: "GDPR & jurisdiction", v: "Swiss company, own data centres in Geneva and Zurich, and it does not outsource operations - support included. Switzerland holds an EU adequacy decision, so an EU-to-Switzerland transfer needs no extra safeguards, and Infomaniak offers an Article 28 DPA."},
        {k: "EU AI Act", v: "Out of scope. The transfer flow contains no AI system, so neither the provider nor the deployer duties attach. Infomaniak sells separate \u201csovereign AI\u201d services; those are a different product and a separate assessment."},
        {k: "What happens to the file", v: "Encrypted in transit through an AES-GCM tunnel and stored with double encryption (LUKS plus AES-256) in TIER III+ data centres. The transfer expires after the period you pick, up to 30 days."}
      ],
      good: [
        "The strongest jurisdiction of the four - Swiss law, Swiss metal, outside US and Chinese reach.",
        "No account, so nothing to provision and no shadow-IT sign-up trail.",
        "50 GB in one link kills the \u201csplit it into five emails\u201d problem."
      ],
      bad: [
        "A transfer link is a bearer token: anyone holding the URL can download, with no identity check.",
        "The free tier gives you no record of who actually downloaded.",
        "Retention is a ceiling you set up front, not a delete button you press later."
      ],
      watch: "Set a password on anything that is not already public, and send the link and the password by different routes. Never paste a transfer link into a public or client-wide channel - it is the URL, not the recipient, that grants access.",
      s: [
        ["SwissTransfer", "https://www.swisstransfer.com/en"],
        ["Infomaniak \u2014 certifications", "https://www.infomaniak.com/en/certifications"],
        ["Infomaniak \u2014 SwissTransfer data security", "https://www.infomaniak.com/en/support/faq/1755/understanding-swisstransfer-data-security"],
        ["Infomaniak \u2014 GDPR", "https://www.infomaniak.com/en/legal/general-data-protection-regulation"]
      ]
    },
    {
      id: "ck3-tinyjpg",
      name: "TinyJPG / TinyPNG",
      host: "tinyjpg.com",
      url: "https://tinyjpg.com/",
      what: "JPEG and PNG compression. Drop an image in the browser, or call the Tinify API.",
      use: "Already wired in: the Content page's image compressor calls the Tinify API through our own Cloudflare Worker, so the API key never reaches the browser.",
      badges: ["!No ISO 27001", "EU company", "48 h"],
      rows: [
        {k: "ISO 27001", v: "None published. Tinify states no ISO 27001 certificate and no external audit report, which makes it the thinnest assurance of the four - what you have is their own word."},
        {k: "GDPR & jurisdiction", v: "Tinify B.V. is established in Hoevelaken, the Netherlands, so it sits under EU law by default. It states it is \u201cGDPR ready and compliant\u201d and publishes a data processing agreement at tinify.com/dpa. Processing runs on Google Cloud."},
        {k: "EU AI Act", v: "Out of scope. Lossy image compression is not an AI system, so no provider or deployer duty arises."},
        {k: "What happens to the file", v: "Uploaded images are stored, optimised and deleted within 48 hours. Request logs, which hold the IP address and a fingerprint of the file, are deleted within 31 days."}
      ],
      good: [
        "EU establishment and an off-the-shelf DPA, so the paperwork exists if procurement asks.",
        "The data it touches is one image and one IP address - a small blast radius.",
        "The API is stable enough to sit behind our own proxy, which is exactly how we use it."
      ],
      bad: [
        "No certification and no public audit: the security claim rests entirely on self-declaration.",
        "48 hours is a long window for an image you would call confidential.",
        "The free web tool has no account, so there is no route to demand early deletion."
      ],
      watch: "Compress finished, already-approved artwork. An unreleased campaign visual, a customer logo under embargo or a screenshot with personal data in it should not go through a free web tool - and note that our Worker hides the API key, not the image: the file still travels to Tinify.",
      s: [
        ["TinyJPG", "https://tinyjpg.com/"],
        ["Tinify \u2014 terms of service", "https://tinify.com/terms"],
        ["Tinify \u2014 data processing agreement", "https://tinify.com/dpa"]
      ]
    },
    {
      id: "ck3-ilovepdf",
      name: "iLovePDF",
      host: "ilovepdf.com",
      url: "https://www.ilovepdf.com/",
      what: "PDF toolbox - merge, split, compress, convert, OCR and sign.",
      use: "Already wired in: the Content page's PDF compressor drives the iLovePDF API through a second Cloudflare Worker, with the key held as an encrypted secret.",
      badges: ["!ISO 27001 \u2014 check edition", "EU company", "2 h"],
      rows: [
        {k: "ISO 27001", v: "Certified, but read the edition. Their own security page names ISO/IEC 27001:2017, renewed in 2023. The 2022 edition replaced it and every pre-2022 certificate lapsed on 31 October 2025, so ask for the current certificate and its scope before leaning on it."},
        {k: "GDPR & jurisdiction", v: "An EU company, based in Spain, stating full GDPR compliance with access, rectification and erasure rights. The server region is not stated anywhere public - the security page says only \u201ccloud infrastructure partnerships\u201d - so ask directly if data residency is a requirement."},
        {k: "EU AI Act", v: "Out of scope for the tools we use. Merging, compressing and OCR are not AI systems. If an AI-labelled feature is used later, that is a separate call: it makes us a deployer, and the Article 4 AI-literacy duty has applied to providers and deployers of any risk tier since 2 February 2025."},
        {k: "What happens to the file", v: "Files are encrypted and permanently deleted within two hours of processing. The exception is signed documents, kept up to five years to meet legal requirements."}
      ],
      good: [
        "A genuine certification behind it, which is more than TinyJPG offers.",
        "Two hours is the tightest deletion window of the four.",
        "A documented API, which is why it could be put behind our own proxy."
      ],
      bad: [
        "The published certificate names a superseded edition of the standard.",
        "No stated server region, so data residency cannot be evidenced from public material.",
        "The five-year retention on signed documents is a completely different regime from the two-hour rule."
      ],
      watch: "The two-hour promise does not cover the signature tool. If you use iLovePDF Sign, you have handed a document to a five-year retention, so route anything with contract or personal data in it through legal first.",
      s: [
        ["iLovePDF", "https://www.ilovepdf.com/"],
        ["iLovePDF \u2014 security", "https://www.ilovepdf.com/help/security"],
        ["iLovePDF \u2014 ISO 27001 certification", "https://www.ilovepdf.com/blog/iso-27001-ilovepdf-certification"],
        ["iLovePDF \u2014 legal", "https://www.ilovepdf.com/help/legal"]
      ]
    },
    {
      id: "ck3-smallpdf",
      name: "Smallpdf (Flatten PDF)",
      host: "smallpdf.com",
      url: "https://smallpdf.com/flatten-pdf",
      what: "PDF toolbox. The linked tool flattens a PDF so form fields, annotations and layers become fixed page content.",
      use: "Flattening a filled form or an annotated proof before it is sent out, so the recipient cannot edit the fields.",
      badges: ["ISO 27001", "Swiss company", "1 h"],
      rows: [
        {k: "ISO 27001", v: "Certified, with annual audits, and it also states GDPR, CCPA, nFADP and eIDAS compliance. Of the four this is the broadest set of claims."},
        {k: "GDPR & jurisdiction", v: "Smallpdf AG, Steinstrasse 21, 8003 Z\u00fcrich, Switzerland - Swiss law plus the EU adequacy decision. Its privacy notice is written against the revised FADP, the GDPR and the CCPA together."},
        {k: "EU AI Act", v: "Relevant, unlike the other three - Smallpdf ships AI features. Its privacy notice states user files are not used to train models and that nothing is persistently stored unless you save the result; AWS Bedrock is used for internal analytics only, not user-facing AI, and high-risk AI processing goes through a DPIA. Flattening itself involves no AI. Using an AI feature would make us a deployer and pull in the Article 4 AI-literacy duty, in force since 2 February 2025."},
        {k: "What happens to the file", v: "Through an account, files are deleted within one hour unless you save them to file storage; files you save and then delete go within about 14 days. Transfers run over TLS."}
      ],
      good: [
        "Swiss jurisdiction and ISO 27001 together, which is the strongest pairing here.",
        "An explicit, written no-training commitment - rare and worth having on record.",
        "nFADP, CCPA and eIDAS are named as well, so it survives a procurement questionnaire."
      ],
      bad: [
        "The one-hour rule is written for the account path; the anonymous path is less clearly documented.",
        "File storage is opt-in but, once on, it extends retention well past that hour.",
        "The free flow pushes hard toward creating an account."
      ],
      watch: "Flattening is not redaction. It fixes how the page looks - it does not reliably strip what sits underneath, so text hidden behind a black box or held in metadata can survive. To remove content, redact it with a tool built for that, then flatten.",
      s: [
        ["Smallpdf \u2014 Flatten PDF", "https://smallpdf.com/flatten-pdf"],
        ["Smallpdf \u2014 trust center", "https://smallpdf.com/trust-center"],
        ["Smallpdf \u2014 privacy notice", "https://smallpdf.com/privacy"]
      ]
    }
  ],

  /* ---- Naming: the exact forms ------------------------------------------ */
  naming: [
    {ok: "Document Capture", no: "DC (external), Continia Document Capture 365"},
    {ok: "Expense Management", no: "EM (external), Expense Manager"},
    {ok: "Document Output", no: "DO (external)"},
    {ok: "Continia Banking", no: "Banking on its own, Continia Bank"},
    {ok: "Continia Finance", no: "Finance on its own"},
    {ok: "Collection Management", no: "Collections"},
    {ok: "OPplus", no: "OPPlus, OP Plus, Opplus"},
    {ok: "Continia Delivery Network (CDN)", no: "Continia Network"},
    {ok: "Continia eDocuments", no: "e-Documents, E-documents"},
    {ok: "Continia Web Approval Portal", no: "Approval Portal, WAP (external)"},
    {ok: "Continia Expense Mobile App (or Continia Expense App)", no: "the app"},
    {ok: "Continia Expense Portal", no: "Web Portal"},
    {ok: "Secure Archive", no: "Secure archiving (as a product name)"},
    {ok: "Business Central (BC)", no: "Dynamics 365 BC, D365BC in customer copy"}
  ],

  /* ---- Facts that are easy to get wrong ---------------------------------- */
  gotchas: [
    {t: "Continia Finance has eight specialized modules", d: "Plus the free Essential module. The solutions overview page on continia.com still says \"7 specialized modules\" — verified wrong on 23 September 2026. The Continia Finance product page and Docs both list eight. Use eight, and flag the overview page.", s: [["Solutions overview (says 7)", "https://www.continia.com/solutions/"], ["Finance product page (lists 8)", "https://www.continia.com/solutions/finance/"]]},
    {t: "Collection Management is Denmark only", d: "Not a Nordic product, not a European one. Denmark.", s: [["Docs — Collection Management", "https://docs.continia.com/da-dk/continia-collection-management/"]]},
    {t: "The Web Approval Portal needs a BC Team Member licence", d: "As a minimum, per approver. \"No Business Central licence needed\" is wrong; \"no full Business Central licence needed\" is right.", s: [["Docs — Document Capture", "https://docs.continia.com/en-us/continia-document-capture/"]]},
    {t: "Line-by-line order matching requires Advanced Capture", d: "And automated approval within thresholds requires Order Matching. Module dependencies inside Document Capture are the most common source of an over-promise.", s: [["Docs — Document Capture", "https://docs.continia.com/en-us/continia-document-capture/"]]},
    {t: "Multi-level payment discounts need the Continia Finance module", d: "The feature appears in Continia Banking payment suggestions, but it requires the Continia Finance module of the same name.", s: [["Docs — Continia Banking", "https://docs.continia.com/en-us/continia-banking/"]]},
    {t: "Secure Archive's audit-proof certification is German", d: "It is certified as audit-proof archiving in Germany. Do not generalize the certification to other countries.", s: [["Docs — Document Capture", "https://docs.continia.com/en-us/continia-document-capture/"]]},
    {t: "Expense users do not add cost", d: "Expense Management is priced so that adding expense users does not increase cost. The exact phrasing moves — check the current price sheet before repeating it word for word.", s: [["Pricing", "https://www.continia.com/pricing/"]]},
    {t: "\"Continia Sustainability\" links to nothing", d: "The entry in the website FAQ is a dead link. Verify the product's status before referencing it anywhere.", s: [["continia.com", "https://www.continia.com/"]]},
    {t: "Quote legacy dates from the live page", d: "Payment Management, OPplus and Dynamo Pay each have their own end-of-sale and end-of-support dates, and they have already moved once. On 23 September 2026 the OPplus page said support ends 30 September 2027 — a day earlier than the 1 October 2027 date carried in older internal material.", s: [["OPplus product page", "https://www.continia.com/solutions/opplus/"], ["Payment Management product page", "https://www.continia.com/solutions/payment-management/"]]},
    {t: "French e-invoicing is already mandatory", d: "Mandatory from 1 September 2026 — in force, not upcoming. Copy written in the future tense is out of date.", s: [["Docs — Document Capture", "https://docs.continia.com/en-us/continia-document-capture/"]]},
    {t: "Percentages are customers' results, not benchmarks", d: "95%, 80%, 10+ hours and the two-thirds cost reduction come from continia.com product pages and are presented as what customers achieve. Keep that framing.", s: [["Document Capture product page", "https://www.continia.com/solutions/document-capture/"]]},
    {t: "Docs describes the latest online version", d: "For on-premises or older versions a documented feature may not exist. Say which version you are writing for when the audience is on-prem.", s: [["Docs (en-us)", "https://docs.continia.com/en-us/"]]}
  ]
,

  /* ---------- AI model assessment ----------
     The second documented exception to the two-portals rule, for the same
     reason as the 3rd party tools: docs.continia.com has nothing to say about
     which model writes a better subject line. Two kinds of claim live here and
     they are sourced separately - a benchmark score comes from Artificial
     Analysis, a price comes from the vendor's own pricing page, and the two are
     never mixed. Every score was read off the live AA page on `captured`, and
     every list price was re-checked against Anthropic, OpenAI and Google the
     same day; all three matched AA to the cent.

     A model missing from a role's leaderboard was NOT tested on that
     evaluation - AA runs different rosters per benchmark (Harvey and
     AnalystAgent are seven models, EnterpriseOps ten, the Intelligence Index
     twenty-four). Absence is not a low score, and the `roster` field on each
     role says how many models the number covers. */
  ai: {
    captured: "2026-09-29",
    indexName: "Artificial Analysis Intelligence Index v4.3.2",
    indexNote: "Ten evaluations averaged: AA-Briefcase v1.1, GDPval-AA v2.1, AutomationBench-AA, Terminal-Bench 4.0, SciCode, Humanity's Last Exam, GDP.pdf, CritPt, AA-Omniscience and AA-LCR v1.1. Higher is better; the whole scale currently tops out at 58.",

    /* The table below is one entry in its own right, so it carries its own
       sources: the scores from AA, the prices from each vendor directly. */
    modelsSrc: [
      ["Artificial Analysis — Models","https://artificialanalysis.ai/models"],
      ["Anthropic — API pricing","https://www.anthropic.com/pricing"],
      ["OpenAI — API pricing","https://developers.openai.com/api/docs/pricing"],
      ["Google — Gemini API pricing","https://ai.google.dev/gemini-api/docs/pricing"]
    ],

    /* Twelve models, not the 679 AA tracks: the three frontier families plus
       the cheap tiers and the two open-weight leaders that actually win a role
       below. Prices are list per 1M tokens - batch halves them, a cache hit is
       the third column. */
    models: [
      {id:"aim-opus55", name:"Claude Opus 5.5", vendor:"Anthropic", ii:58, speed:93, ctx:"1M", pcache:0.20, pin:4, pout:20, task:5.98,
       note:"Top of the Intelligence Index and of the Finance & Accounting Index. The default for anything where being wrong is expensive."},
      {id:"aim-sonnet55", name:"Claude Sonnet 5.5", vendor:"Anthropic", ii:56, speed:139, ctx:"1M", pcache:0.20, pin:2, pout:10, task:null,
       note:"Two index points below Opus at half the price and 1.5x the speed. The workhorse pick for most desks."},
      {id:"aim-fable51", name:"Claude Fable 5.1", vendor:"Anthropic", ii:53, speed:69, ctx:"1M", pcache:0.25, pin:10, pout:50, task:7.63,
       note:"The most expensive model on this list and the strongest on spreadsheets and on knowledge accuracy. Slow, dense output that needs an editing pass."},
      {id:"aim-astra", name:"GPT-6 Astra", vendor:"OpenAI", ii:53, speed:59, ctx:"1M", pcache:1.00, pin:10, pout:50, task:3.26,
       note:"OpenAI's flagship. Best in the set on document reasoning and on research workflows; the slowest of the frontier three."},
      {id:"aim-sol", name:"GPT-6 Sol", vendor:"OpenAI", ii:48, speed:79, ctx:"872k", pcache:0.20, pin:2, pout:10, task:null,
       note:"Priced identically to Sonnet 5.5 and eight index points behind it. Worth having as a second opinion, not as the default."},
      {id:"aim-luna", name:"GPT-6 Luna", vendor:"OpenAI", ii:37, speed:146, ctx:"1M", pcache:0.01, pin:0.10, pout:0.50, task:0.07,
       note:"The cheapest useful model here - 40x cheaper per task than Opus. For bulk mechanical text where a human reads the output anyway."},
      {id:"aim-gem38", name:"Gemini 3.8 Flash", vendor:"Google", ii:41, speed:239, ctx:"1M", pcache:0.08, pin:0.75, pout:3.75, task:1.24,
       note:"Fastest of the capable models and the best of them at reading images relative to price. Its price is introductory - see the watch-outs."},
      {id:"aim-gemlite", name:"Gemini 3.5 Flash-Lite", vendor:"Google", ii:22, speed:320, ctx:"1M", pcache:0.03, pin:0.30, pout:2.50, task:null,
       note:"The fastest model AA measures at this tier. Classification and routing only - the index score is too low for anything customer-facing."},
      {id:"aim-grok47", name:"Grok 4.7", vendor:"xAI", ii:46, speed:74, ctx:"500k", pcache:0.50, pin:2, pout:6, task:3.74,
       note:"Mid-pack on intelligence, cheaper output than Sonnet, and one of the few models that refuses rather than guesses (71% non-hallucination)."},
      {id:"aim-kimik3", name:"Kimi K3", vendor:"Moonshot (open weights)", ii:44, speed:null, ctx:"1M", pcache:0.30, pin:3, pout:15, task:null,
       note:"Wins two of the roles below outright - legal criterion pass rate and long-context reasoning - and the weights are public."},
      {id:"aim-glm53", name:"GLM-5.3", vendor:"Z.ai (open weights)", ii:45, speed:87, ctx:"1M", pcache:0.26, pin:1.40, pout:4.40, task:2.01,
       note:"Frontier-adjacent index score at a fifth of Opus's output price. The cheapest way to buy a 45."},
      {id:"aim-dsv41", name:"DeepSeek V4.1 Flash", vendor:"DeepSeek (open weights)", ii:39, speed:217, ctx:"1M", pcache:0.01, pin:0.30, pout:1.20, task:0.27,
       note:"Fast and nearly free, and third on SaaS-workflow automation. Also the worst model here on hallucination (4% non-hallucination) - never unsupervised."}
    ],

    /* One entry per job-to-be-done, each backed by a single named AA
       evaluation so the claim can be checked rather than believed. `top` is
       read straight off that evaluation's chart. */
    roles: [
      {id:"air-writing", side:"marketing", label:"Long-form writing & editorial", bench:"AA-Briefcase v1.1 (Elo)", roster:"24 models",
       what:"Agentic knowledge work: research a brief, produce the document, get graded on rubric pass rate plus analytical quality and presentation.",
       top:[["Claude Opus 5.5",1822],["Claude Sonnet 5.5",1811],["Claude Fable 5.1",1678],["Grok 4.7",1657],["Qwen3.8 Max",1626]],
       read:"AA measures whether the document is right, not whether it reads well - no public benchmark scores prose. On rubric pass rate Opus and Sonnet tie at 66% with Fable at 59%, while the writing-specific reviews put Fable ahead on raw sentence quality at 5x Sonnet's price. Draft on Sonnet, escalate to Fable only when the voice is the deliverable.",
       s:[["Artificial Analysis — AA-Briefcase","https://artificialanalysis.ai/models"],["Best AI for writing, Sep 2026","https://www.buildmvpfast.com/articles/best-llms-2026-guide/content-writing-ai"]]},

      {id:"air-realwork", side:"both", label:"Real-world work tasks", bench:"GDPval-AA v2.1", roster:"24 models",
       what:"Tasks drawn from real occupations, graded by professionals in those occupations. The closest thing to \"can it do the job\".",
       top:[["Claude Opus 5.5",67],["Claude Sonnet 5.5",67],["Claude Fable 5.1",62],["Grok 4.7",60],["Muse Spark 1.3",59]],
       read:"Opus and Sonnet are level here, which is the strongest argument for Sonnet as the house default: the same real-world result at half the price and 1.5x the speed.",
       s:[["Artificial Analysis — GDPval-AA","https://artificialanalysis.ai/models"]]},

      {id:"air-automation", side:"both", label:"SaaS workflow automation", bench:"AutomationBench-AA", roster:"24 models",
       what:"Driving real SaaS tools end to end - the shape of work an agent does inside HubSpot, Monday or a CMS.",
       top:[["Claude Sonnet 5.5",71],["Claude Opus 5.5",70],["DeepSeek V4.1 Flash",69],["GPT-6 Astra",68],["Grok 4.7",66]],
       read:"The one leaderboard where Sonnet beats Opus, and where an open-weight model at $0.30/$1.20 lands within two points of both. For high-volume mechanical automation the price gap is the whole argument.",
       s:[["Artificial Analysis — AutomationBench-AA","https://artificialanalysis.ai/models"]]},

      {id:"air-coding", side:"rest", label:"Agentic coding & terminal use", bench:"Terminal-Bench 4.0", roster:"24 models",
       what:"Multi-step work in a real terminal: read the repo, change it, run it, fix what broke.",
       top:[["Claude Sonnet 5.5",64],["Claude Opus 5.5",60],["GPT-6 Astra",59],["Claude Fable 5.1",52],["GPT-6 Sol",44]],
       read:"Sonnet leads and the field falls away fast - fifth place is a third below first. This is the role with the widest spread on the page, so the model choice matters more here than anywhere else.",
       s:[["Artificial Analysis — Terminal-Bench 4.0","https://artificialanalysis.ai/models"]]},

      {id:"air-scicode", side:"rest", label:"Writing correct code", bench:"SciCode", roster:"24 models",
       what:"Scientific and numerical programming - correctness of the code itself rather than the agent loop around it.",
       top:[["Claude Opus 5.5",67],["Claude Fable 5.1",63],["Claude Sonnet 5.5",61],["MiMo-V2.6-Pro",61],["Kimi K3",59]],
       read:"Order flips versus the terminal benchmark: Opus writes the more correct code, Sonnet runs the better agent loop. Use Sonnet to do the work and Opus to review the hard function.",
       s:[["Artificial Analysis — SciCode","https://artificialanalysis.ai/models"]]},

      {id:"air-docs", side:"marketing", label:"Reading documents & PDFs", bench:"GDP.pdf", roster:"24 models",
       what:"Professional document reasoning, scored all-pass: every question about the document has to be right, not most of them.",
       top:[["GPT-6 Astra",31],["Muse Spark 1.3",27],["Claude Opus 5.5",26],["Claude Fable 5.1",26],["Claude Sonnet 5.5",26]],
       read:"The lowest ceiling on this page - the best model gets under a third of documents fully right. Treat any model summary of a PDF as a first pass that a person still has to check against the source.",
       s:[["Artificial Analysis — GDP.pdf","https://artificialanalysis.ai/models"]]},

      {id:"air-accuracy", side:"both", label:"Knowledge accuracy", bench:"AA-Omniscience Accuracy", roster:"24 models",
       what:"How often the model knows the answer at all, across a broad factual set.",
       top:[["Claude Fable 5.1",67],["Claude Opus 5.5",66],["GPT-6 Astra",63],["Gemini 3.8 Flash",55],["GPT-6 Sol",54]],
       read:"Read this row together with the next one. Knowing more and admitting ignorance are separate skills, and the models that top this list sit near the bottom of the one below.",
       s:[["Artificial Analysis — AA-Omniscience","https://artificialanalysis.ai/models"]]},

      {id:"air-halluc", side:"both", label:"Refusing to make things up", bench:"AA-Omniscience Non-Hallucination Rate", roster:"24 models",
       what:"One minus the hallucination rate: how often the model says it does not know instead of inventing an answer.",
       top:[["MiniMax-M3",82],["K2 Horizon 375B",74],["GLM-5.3-Flash",72],["Qwen3.8 Max",71],["Grok 4.7",71]],
       read:"The inversion that matters most for marketing: Opus 5.5 scores 41% here, Fable 5.1 scores 27% and DeepSeek V4.1 Flash scores 4%. The best writers are the most confident liars. Every number, date, customer count and product name in a draft gets checked against docs.continia.com before it ships.",
       s:[["Artificial Analysis — AA-Omniscience","https://artificialanalysis.ai/models"]]},

      {id:"air-longctx", side:"both", label:"Long-context reasoning", bench:"AA-LCR v1.1", roster:"24 models",
       what:"Reasoning across a context window large enough to hold a year of documents, not just retrieving a sentence from it.",
       top:[["Kimi K3",89],["Step 5 Preview",88],["MiMo-V2.6-Pro",86],["Claude Fable 5.1",85],["Claude Opus 5.5",85]],
       read:"The flattest leaderboard here - everything from first to twentieth sits between 89% and 79%. Context length is no longer the differentiator it was; pick on price and speed for this job.",
       s:[["Artificial Analysis — AA-LCR v1.1","https://artificialanalysis.ai/models"]]},

      {id:"air-legal", side:"rest", label:"Legal work", bench:"Harvey LAB-AA (criterion pass rate)", roster:"7 models only",
       what:"Agentic legal tasks scored against the criteria a lawyer would apply, built with Harvey.",
       top:[["Kimi K3",95],["Claude Sonnet 5.5",93],["Claude Fable 5.1",93],["Claude Opus 5.5",91],["MiniMax-M3",88]],
       read:"Only seven models have been run, so this is a short list rather than a ranking of the field - GPT-6 and Gemini are simply absent, not beaten. A high criterion pass rate is not legal advice and does not make a model a lawyer.",
       s:[["Artificial Analysis — Harvey LAB-AA","https://artificialanalysis.ai/models"]]},

      {id:"air-sheets", side:"both", label:"Spreadsheets & quantitative analysis", bench:"AA-AnalystAgent", roster:"7 models only",
       what:"Quantitative analysis across spreadsheets and documents - the analyst's job, not the writer's.",
       top:[["Claude Fable 5.1",57],["GPT-6 Astra",51],["Kimi K3",39],["Inkling",24],["Mistral Medium 3.5",13]],
       read:"The one role where the most expensive model is also the clearly right one, and the gap to third place is 18 points. Seven-model roster, so read it as \"of the models tested\".",
       s:[["Artificial Analysis — AA-AnalystAgent","https://artificialanalysis.ai/models"]]},

      {id:"air-finance", side:"rest", label:"Finance & accounting", bench:"Artificial Analysis Finance & Accounting Index", roster:"24 models",
       what:"A seven-evaluation composite weighted toward finance and accounting work. The closest public index to what Continia's own customers do all day.",
       top:[["Claude Opus 5.5",61],["Claude Sonnet 5.5",57],["Claude Fable 5.1",56],["GPT-6 Astra",55],["Grok 4.7",52]],
       read:"Same order as the general index, slightly wider gaps. Worth citing internally: the domain our products serve is one where the frontier models are measurably ahead of the cheap tiers.",
       s:[["Artificial Analysis — Finance & Accounting Index","https://artificialanalysis.ai/models"]]},

      {id:"air-visual", side:"marketing", label:"Reading images & layouts", bench:"MMMU-Pro", roster:"15 models",
       what:"Visual reasoning over charts, diagrams and mixed image-and-text pages.",
       top:[["Claude Opus 5.5",88],["GPT-6 Astra",87],["Gemini 3.8 Flash",86],["GPT-6 Sol",83],["Qwen3.8 Max",83]],
       read:"Two points separate first from third, and third costs a fifth as much per output token. For checking a layout, reading a competitor's screenshot or captioning a chart, Gemini 3.8 Flash is the sane default. None of these models generate images - they read them.",
       s:[["Artificial Analysis — MMMU-Pro","https://artificialanalysis.ai/models"]]},

      {id:"air-research", side:"rest", label:"Research workflows", bench:"Terminal-Bench-Science 0.1", roster:"18 models",
       what:"Agentic scientific research run in a terminal: find the data, process it, reach a defensible answer.",
       top:[["GPT-6 Astra",63],["Claude Opus 5.5",59],["Claude Sonnet 5.5",53],["Claude Fable 5.1",43],["GPT-6 Sol",30]],
       read:"The steepest cliff on the page - sixth place is 12%. Below the top four there is effectively nothing, so this is not a job to hand to a budget tier.",
       s:[["Artificial Analysis — Terminal-Bench-Science","https://artificialanalysis.ai/models"]]},

      {id:"air-bizops", side:"rest", label:"Business operations", bench:"EnterpriseOps-Gym-AA", roster:"10 models, no frontier tier",
       what:"Agentic business operations: multi-step back-office processes with tools and state.",
       top:[["Kimi K3",45],["Qwen3.8 27B",44],["Gemini 3.5 Flash-Lite",42],["Inkling",38],["GLM-5.3",36]],
       read:"AA has not yet run Claude, GPT-6 or Gemini 3.8 on this one, so the leaderboard is a tour of the cheap and open-weight tiers. Useful as a floor, not as a recommendation - revisit when the roster fills out.",
       s:[["Artificial Analysis — EnterpriseOps-Gym-AA","https://artificialanalysis.ai/models"]]},

      {id:"air-devops", side:"rest", label:"Incident root-cause analysis", bench:"ITBench-AA", roster:"11 models",
       what:"Kubernetes incident diagnosis: read the cluster state and say what actually broke.",
       top:[["Gemini 3.8 Flash",53],["GLM-5.3-Flash",51],["Claude Fable 5.1",50],["GPT-6 Sol",49],["GPT-6 Astra",49]],
       read:"The only leaderboard here that a Google model tops, and it tops it at $0.75/$3.75. Opus 5.5 sits tenth of eleven at 38% - a reminder that the general index does not predict every role.",
       s:[["Artificial Analysis — ITBench-AA","https://artificialanalysis.ai/models"]]},

      {id:"air-tools", side:"both", label:"Tool use", bench:"τ³-Banking", roster:"16 models",
       what:"Agentic tool calling against a banking API: pick the right call, with the right arguments, in the right order.",
       top:[["Muse Spark 1.3",51],["GLM-5.3",50],["Qwen3.8 27B",48],["Qwen3.8 Max",48],["Claude Fable 5.1",47]],
       read:"Tight and low: the whole field sits between 51% and 14%, and the frontier names are mid-table. Any automation that calls a real API needs a confirmation step regardless of which model drives it.",
       s:[["Artificial Analysis — τ³-Banking","https://artificialanalysis.ai/models"]]}
    ],

    /* Two sides of one toggle. Each card names a first choice, a cheaper
       choice that is defensible, and the thing that goes wrong - always tied
       back to one of the roles above so the pick is checkable. */
    depts: [
      {id:"aid-content", side:"marketing", icon:"fa-pen-nib", name:"Content & copy",
       jobs:"Blogs, product pages, newsletters, campaign copy, translation passes, editing.",
       pick:{m:"Claude Sonnet 5.5", why:"Level with Opus on real-world work tasks (67%) and top of the writing-adjacent leaderboards, at $2/$10 per 1M."},
       value:{m:"Claude Fable 5.1", why:"Only when the voice is the deliverable - the strongest raw prose in the set, at $10/$50 and 69 tokens/s. Reserve it for the final pass on a hero asset."},
       careful:"Fable 5.1 hallucinates more than anything else on this page (27% non-hallucination). Every product name, number and date goes back through docs.continia.com before it ships - that rule already exists on this site and it exists because of exactly this.",
       s:[["Artificial Analysis — Models","https://artificialanalysis.ai/models"],["Anthropic — API pricing","https://www.anthropic.com/pricing"]]},

      {id:"aid-video", side:"marketing", icon:"fa-clapperboard", name:"Video",
       jobs:"Scripts, hooks, subtitle cleanup, cutting a webinar into shorts, transcript summaries.",
       pick:{m:"Claude Sonnet 5.5", why:"Script work is writing work - same leaderboards, same reasoning as the content desk."},
       value:{m:"Gemini 3.8 Flash", why:"239 tokens/s and $0.75/$3.75 per 1M with a 1M context: the right tool for chewing through a two-hour transcript before a person reads it."},
       careful:"Gemini 3.8 Flash is on introductory pricing until 31 December 2026. From 1 January 2027 it is $1.50/$7.50 - double. Anything budgeted on today's rate needs re-costing before the new year.",
       s:[["Artificial Analysis — Models","https://artificialanalysis.ai/models"],["Google — Gemini API pricing","https://ai.google.dev/gemini-api/docs/pricing"]]},

      {id:"aid-graphics", side:"marketing", icon:"fa-palette", name:"Graphics & design",
       jobs:"Reading a layout back, alt text, checking a chart against its data, judging a competitor's screenshot.",
       pick:{m:"Claude Opus 5.5", why:"Top of MMMU-Pro at 88% when the judgement has to hold up."},
       value:{m:"Gemini 3.8 Flash", why:"86% on the same benchmark at a fifth of the output price and 2.5x the speed. The default for volume."},
       careful:"None of these models draw. They read images and describe them - image generation is a separate tool and a separate compliance question. Alt text written by a model still gets a human read: it describes what is in the frame, not what the image is doing in the page.",
       s:[["Artificial Analysis — MMMU-Pro","https://artificialanalysis.ai/models"],["Google — Gemini API pricing","https://ai.google.dev/gemini-api/docs/pricing"]]},

      {id:"aid-mktdata", side:"marketing", icon:"fa-chart-column", name:"Data & reporting",
       jobs:"LinkedIn and YouTube trawls, campaign readouts, competitor tables, the CSVs behind this dashboard.",
       pick:{m:"Claude Fable 5.1", why:"57% on AA-AnalystAgent, 18 points clear of third place. The one role where the priciest model is unambiguously the right one."},
       value:{m:"GPT-6 Astra", why:"51% on the same benchmark at the same $10/$50 but with a cheaper cost per completed task ($3.26 vs $7.63)."},
       careful:"AA-AnalystAgent has only been run on seven models, so this ranking covers a short list rather than the field. And a model reading a spreadsheet is still doing arithmetic in prose - the archive rule applies: save the outgoing data before anything replaces it.",
       s:[["Artificial Analysis — AA-AnalystAgent","https://artificialanalysis.ai/models"]]},

      {id:"aid-seo", side:"marketing", icon:"fa-magnifying-glass-chart", name:"SEO & web",
       jobs:"Meta titles and descriptions, schema, internal linking, bulk alt text, CMS updates.",
       pick:{m:"Claude Sonnet 5.5", why:"Tops AutomationBench-AA at 71% - the benchmark that measures driving a SaaS tool end to end, which is what a CMS pass is."},
       value:{m:"GPT-6 Luna", why:"$0.10/$0.50 per 1M and $0.07 per completed index task, roughly 1/85th of Opus. For a thousand meta descriptions that a person will skim anyway, the quality gap is not worth 85x."},
       careful:"Luna scores 37 on the intelligence index. It is fine for mechanical text against a clear template and wrong for anything that states a fact about a product.",
       s:[["Artificial Analysis — AutomationBench-AA","https://artificialanalysis.ai/models"],["OpenAI — API pricing","https://developers.openai.com/api/docs/pricing"]]},

      {id:"aid-social", side:"marketing", icon:"fa-comments", name:"Social & community",
       jobs:"LinkedIn posts, comment replies, repurposing a blog into a carousel, monitoring competitor pages.",
       pick:{m:"Claude Sonnet 5.5", why:"Same writing case as the content desk, and fast enough at 139 tokens/s to sit in a drafting loop."},
       value:{m:"Gemini 3.8 Flash", why:"For volume classification and triage of what comes back - sorting comments, tagging posts, first-pass summaries of a trawl."},
       careful:"Social copy is where an invented statistic travels furthest and fastest. The hallucination row applies hardest here: nothing with a number in it goes out without a source.",
       s:[["Artificial Analysis — Models","https://artificialanalysis.ai/models"]]},

      {id:"aid-legal", side:"rest", icon:"fa-scale-balanced", name:"Legal & contracts",
       jobs:"First-pass review of partner agreements and DPAs, clause comparison, plain-language summaries.",
       pick:{m:"Claude Sonnet 5.5", why:"93% criterion pass rate on Harvey LAB-AA, one point off the leader, at a fifth of Fable's price."},
       value:{m:"Kimi K3", why:"95%, the highest score recorded on that benchmark, with open weights and $3/$15 pricing."},
       careful:"Only seven models have been run on Harvey LAB-AA, and a criterion pass rate is not legal advice. Nothing a model says about a contract is a substitute for counsel, and no signed agreement or personal data goes into a consumer tier.",
       s:[["Artificial Analysis — Harvey LAB-AA","https://artificialanalysis.ai/models"],["Anthropic — API pricing","https://www.anthropic.com/pricing"]]},

      {id:"aid-dev", side:"rest", icon:"fa-code", name:"Developers",
       jobs:"Writing and reviewing code, agentic refactors, test generation, reading an unfamiliar repo.",
       pick:{m:"Claude Sonnet 5.5", why:"Tops Terminal-Bench 4.0 at 64% - the widest first-to-fifth spread of any role here, so the choice matters."},
       value:{m:"Claude Opus 5.5", why:"Not cheaper, but the right escalation: it beats Sonnet on SciCode (67% vs 61%), so Sonnet does the work and Opus reviews the hard function."},
       careful:"Sonnet wins the agent loop, Opus writes the more correct code. Picking one for both jobs gives up a few points either way.",
       s:[["Artificial Analysis — Terminal-Bench 4.0","https://artificialanalysis.ai/models"],["Artificial Analysis — SciCode","https://artificialanalysis.ai/models"]]},

      {id:"aid-data", side:"rest", icon:"fa-database", name:"Data & BI",
       jobs:"Reporting, reconciliations, model-assisted analysis of exports, ad-hoc questions against a spreadsheet.",
       pick:{m:"Claude Fable 5.1", why:"57% on AA-AnalystAgent, the quantitative-analysis benchmark, ahead of everything else tested."},
       value:{m:"GPT-6 Astra", why:"51% on the same benchmark, and a lower cost per completed task."},
       careful:"Seven-model roster. And the general intelligence index does not predict this role - check the leaderboard, not the headline score.",
       s:[["Artificial Analysis — AA-AnalystAgent","https://artificialanalysis.ai/models"]]},

      {id:"aid-research", side:"rest", icon:"fa-flask", name:"Research",
       jobs:"Market and competitor research, literature passes, synthesising a stack of long documents.",
       pick:{m:"GPT-6 Astra", why:"63% on Terminal-Bench-Science, four points clear of Opus and the top of a very steep leaderboard."},
       value:{m:"Kimi K3", why:"89% on AA-LCR, the best long-context reasoning measured, for the jobs that are mostly about holding a lot of text at once."},
       careful:"Sixth place on the research benchmark scores 12%. There is no cheap tier for this job - below the top four the results are not usable.",
       s:[["Artificial Analysis — Terminal-Bench-Science","https://artificialanalysis.ai/models"],["Artificial Analysis — AA-LCR v1.1","https://artificialanalysis.ai/models"]]},

      {id:"aid-hr", side:"rest", icon:"fa-users", name:"HR & people",
       jobs:"Job ads, interview guides, policy drafts, onboarding material, internal comms.",
       pick:{m:"Claude Sonnet 5.5", why:"Level with Opus on GDPval-AA (67%), the benchmark graded by people who do the occupations being tested."},
       value:{m:"GPT-6 Sol", why:"Same $2/$10 price as Sonnet with a different house style - useful as a second opinion on tone, not as the default."},
       careful:"No employee data, candidate data or anything else personal goes into a consumer tier. This is the department where the tool choice is a GDPR question before it is a quality question.",
       s:[["Artificial Analysis — GDPval-AA","https://artificialanalysis.ai/models"],["OpenAI — API pricing","https://developers.openai.com/api/docs/pricing"]]},

      {id:"aid-mgmt", side:"rest", icon:"fa-chess-king", name:"Management",
       jobs:"Board material, business cases, budget narratives, reading a long report before a decision.",
       pick:{m:"Claude Opus 5.5", why:"Top of both indices that matter here - 58 on the Intelligence Index and 61 on the Finance & Accounting Index - and top of AA-Briefcase at 1822 Elo."},
       value:{m:"Claude Sonnet 5.5", why:"57 on the Finance & Accounting Index for half the price. The gap is four points; the price gap is 2x."},
       careful:"The document-reading ceiling is low: the best model gets under a third of PDFs fully right on GDP.pdf. A model summary of a long report is a first pass, never the thing you decide on.",
       s:[["Artificial Analysis — Finance & Accounting Index","https://artificialanalysis.ai/models"],["Artificial Analysis — GDP.pdf","https://artificialanalysis.ai/models"]]},

      {id:"aid-itops", side:"rest", icon:"fa-server", name:"IT & operations",
       jobs:"Incident triage, log reading, runbook drafting, back-office process automation.",
       pick:{m:"Gemini 3.8 Flash", why:"Tops ITBench-AA at 53% - the only leaderboard on this page a Google model wins, and it wins it at $0.75/$3.75."},
       value:{m:"GLM-5.3", why:"Open weights, 45 on the intelligence index, $1.40/$4.40 - the cheapest way to buy a frontier-adjacent score for internal tooling."},
       careful:"Opus 5.5 sits tenth of eleven on ITBench-AA at 38%. Reaching for the most expensive model by reflex is the wrong move in this department.",
       s:[["Artificial Analysis — ITBench-AA","https://artificialanalysis.ai/models"],["Google — Gemini API pricing","https://ai.google.dev/gemini-api/docs/pricing"]]},

      {id:"aid-finance", side:"rest", icon:"fa-coins", name:"Finance & accounting",
       jobs:"Reconciliations, month-end narrative, invoice and document handling, cost analysis.",
       pick:{m:"Claude Opus 5.5", why:"61 on the Finance & Accounting Index, four clear of second. The domain our own products serve."},
       value:{m:"Claude Sonnet 5.5", why:"57 on the same index at half the price."},
       careful:"A model doing arithmetic is doing it in prose, not in a calculator. Every figure it produces gets checked against the system of record before it enters a report.",
       s:[["Artificial Analysis — Finance & Accounting Index","https://artificialanalysis.ai/models"]]}
    ],

    watch: [
      {t:"Gemini 3.8 Flash doubles on 1 January 2027", d:"Its $0.75/$3.75 per 1M is introductory pricing through 31 December 2026. Standard pricing is $1.50/$7.50. Anything costed on today's rate needs re-costing before the new year.",
       s:[["Google — Gemini API pricing","https://ai.google.dev/gemini-api/docs/pricing"]]},
      {t:"The best writers are the worst at admitting ignorance", d:"Claude Opus 5.5 scores 41% on non-hallucination, Fable 5.1 27% and DeepSeek V4.1 Flash 4%, while models nobody would use for copy sit at 70-82%. Fluency and factual caution are inversely related in the current generation, which is why the source rule on this page is not optional.",
       s:[["Artificial Analysis — AA-Omniscience","https://artificialanalysis.ai/models"]]},
      {t:"A missing model was not tested, not beaten", d:"Artificial Analysis runs different rosters per evaluation: 24 models on the Intelligence Index, 18 on Terminal-Bench-Science, 16 on tool use, 15 on MMMU-Pro, 11 on ITBench, 10 on EnterpriseOps and 7 on both Harvey LAB-AA and AA-AnalystAgent. Every role above states its roster size for that reason.",
       s:[["Artificial Analysis — Models","https://artificialanalysis.ai/models"]]},
      {t:"These are list prices, not what you pay", d:"Batch processing halves input and output at all three vendors, and a cache hit costs the third column - 3% to 10% of input. A workload that reuses a long system prompt is dramatically cheaper than the headline rate suggests.",
       s:[["Anthropic — API pricing","https://www.anthropic.com/pricing"],["OpenAI — API pricing","https://developers.openai.com/api/docs/pricing"],["Google — Gemini API pricing","https://ai.google.dev/gemini-api/docs/pricing"]]},
      {t:"Model names and scores move monthly", d:"The Intelligence Index was at v4.3.2 when this was captured and the leaderboard changed twice in the preceding month. Re-read the live page before repeating a ranking in a customer or partner conversation - the same rule the rest of this page applies to dated facts.",
       s:[["Artificial Analysis — Models","https://artificialanalysis.ai/models"]]}
    ]
  }
};
