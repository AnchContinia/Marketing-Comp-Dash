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
};
