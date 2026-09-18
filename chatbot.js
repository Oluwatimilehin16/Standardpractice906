/* ============================================================
   Standard Practice Professional — Shared Chat Widget
   Include this one file on every page:
     <script src="chatbot.js"></script>

   It injects the widget markup, wires up open/close and quick
   replies, and answers from the knowledge base below.

   TO CHANGE WHAT THE BOT SAYS: edit KNOWLEDGE_BASE. Nothing
   else needs to change. Each entry is:
     id       — unique name, used by suggestion chips
     keywords — lowercase trigger words/phrases
     weight   — optional multiplier; use >1 for topics that
                should win when several entries match
     answer   — the reply text (\n\n makes a paragraph break)
     links    — optional [{ label, href }] shown as buttons
     suggest  — optional [ids] shown as follow-up chips
   ============================================================ */

(function () {
  "use strict";

  const EMAIL = "info@standardpracticeprofessional.com";
  const PHONE = "+234-805-606-9623";
  const WHATSAPP = "https://wa.me/2348056069623";

  /* ----------------------------------------------------------
     1. KNOWLEDGE BASE
     Drawn from the actual content of every page on this site.
  ---------------------------------------------------------- */
  const KNOWLEDGE_BASE = [

    /* ---------- Conversational ---------- */
    {
      id: "greeting",
      keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "good day", "howdy", "yo"],
      answer:
        "Hello, and welcome to Standard Practice Professional.\n\n" +
        "I can tell you about our six practice areas, our partners, our offices, our published tax papers, or put you in touch with the right person. What would you like to know?",
      suggest: ["services-overview", "about", "partners", "contact"]
    },
    {
      id: "help",
      keywords: ["help", "what can you do", "what do you know", "options", "menu", "assist me", "who are you", "are you a bot", "are you human", "are you real"],
      answer:
        "I am the Standard Practice assistant — an automated guide to this website.\n\n" +
        "Ask me about: our services (audit, tax, corporate, consulting, actuarial, advisory, accounting), our partners and their credentials, the sectors we serve, our Lagos and Abuja offices, fees, careers, or our published papers on the Nigeria Tax Act.\n\n" +
        "For anything requiring judgement, a partner will always take it from here.",
      suggest: ["services-overview", "tax-reform", "partners", "contact"]
    },
    {
      id: "thanks",
      keywords: ["thank", "thanks", "thank you", "appreciate", "cheers", "much obliged", "nice one"],
      answer: "You are very welcome. Anything else I can help you find?",
      suggest: ["services-overview", "contact", "consultation"]
    },
    {
      id: "bye",
      keywords: ["bye", "goodbye", "see you", "later", "that is all", "thats all", "nothing else"],
      answer:
        "Thank you for stopping by. When you are ready, we are on " + PHONE + " or " + EMAIL + " — we reply within one business day.",
      links: [{ label: "Contact us", href: "contact.html" }]
    },

    /* ---------- Firm overview ---------- */
    {
      id: "about",
      keywords: ["about", "about you", "who are you as a company", "your story", "story", "background", "firm", "company", "history", "tell me about the firm", "what kind of firm"],
      weight: 1.1,
      answer:
        "Standard Practice Professional is a frontline Nigerian professional services firm — a senior firm by design.\n\n" +
        "We bring together seasoned, highly qualified experts across Audit and Assurance, Taxation, Consulting Services, Actuarial Services, Advisory and Accounting Services. Our partners carry over twenty-five years of cumulative experience and more than 700 completed engagements, across agriculture, healthcare, energy, manufacturing, financial services, oil and gas, technology and telecommunications and real estate.\n\n" +
        "Small enough to care, senior enough to help, independent enough to be worth listening to.",
      links: [{ label: "Read our story", href: "about.html" }],
      suggest: ["values", "partners", "experience"]
    },
    {
      id: "values",
      keywords: ["value", "values", "core values", "integrity", "ethics", "ethical", "principles", "what do you stand for", "customer satisfaction", "excellence", "independence", "independent"],
      answer:
        "We hold ourselves to four things, two of which are our stated core values:\n\n" +
        "• Integrity — our first core value. How we work matters as much as what we deliver.\n" +
        "• Customer Satisfaction — our second core value, and the reason clients keep recommending us locally and abroad.\n" +
        "• Excellence — the work is the marketing.\n" +
        "• Independence — we tell you what we think, not what you paid to hear.",
      links: [{ label: "About us", href: "about.html" }],
      suggest: ["mission", "approach", "confidentiality"]
    },
    {
      id: "mission",
      keywords: ["mission", "vision", "purpose", "promise", "why do you exist", "what is your goal", "objective"],
      answer:
        "Mission — to enable organisations to focus on their core business operations, while we efficiently handle the support services necessary for their success.\n\n" +
        "Vision — a West African market where professional advice is a genuine source of competitive advantage, not a checkbox.\n\n" +
        "Promise — senior on every file, honest in every recommendation, present until the work is done.",
      links: [{ label: "About us", href: "about.html" }],
      suggest: ["values", "approach"]
    },
    {
      id: "approach",
      keywords: ["approach", "how do you work", "methodology", "process", "how you work", "engagement model", "way of working", "senior led", "partner led"],
      answer:
        "Discipline over drama, judgement over jargon. Three things define how we run an engagement:\n\n" +
        "• Senior-led, always — partners on the file from diagnostic to hand-over. No pyramid, no proxy. The person in the first meeting is the person in the last one.\n" +
        "• Independent by conviction — we keep our conflict list short and our recommendations honest, even when it is inconvenient.\n" +
        "• Built to sustain — every engagement leaves your organisation more capable than we found it.",
      links: [{ label: "Our approach", href: "index.html#approach" }],
      suggest: ["values", "partners", "consultation"]
    },
    {
      id: "experience",
      keywords: ["experience", "how long", "years", "track record", "how many engagements", "how experienced", "credentials", "qualified", "expertise", "700", "25 years", "how big"],
      answer:
        "Our partners bring over twenty-five years of cumulative experience and have completed more than 700 engagements between them.\n\n" +
        "That work spans agriculture, healthcare, energy, manufacturing, financial services, oil and gas, technology and telecommunications and real estate — with a client base, both local and international, that continues to recommend us.",
      links: [{ label: "Meet the partners", href: "partners.html" }],
      suggest: ["partners", "sectors", "case-studies"]
    },
    {
      id: "sectors",
      keywords: ["sector", "sectors", "industry", "industries", "verticals", "what industries", "who do you serve", "clients you serve", "agriculture", "healthcare", "energy", "manufacturing", "oil and gas", "telecom", "telecommunications", "real estate", "financial services", "banking", "public sector", "non profit", "ngo", "retail"],
      answer:
        "We work across agriculture, healthcare, energy, manufacturing, financial services and banking, oil and gas, technology and telecommunications, and real estate — among others.\n\n" +
        "Our Audit and Assurance practice also covers public sector and government, healthcare and pharmaceuticals, retail and consumer goods, and non-profit and development organisations.",
      links: [{ label: "Our services", href: "services.html" }],
      suggest: ["audit", "experience", "consultation"]
    },
    {
      id: "clients",
      keywords: ["clients", "who are your clients", "client base", "references", "testimonial", "testimonials", "reviews", "trusted by", "case study", "who have you worked with"],
      answer:
        "We rarely publicise our clients — from tier-1 banks to energy majors and family offices, most prefer it that way. When they choose to speak on our behalf, we listen carefully.\n\n" +
        "What we do publish is our thinking: technical papers from our partners on the questions clients are actually bringing us.",
      links: [{ label: "Case studies", href: "case_studies.html" }, { label: "Insights", href: "insight.html" }],
      suggest: ["case-studies", "experience"]
    },

    /* ---------- Services: overview ---------- */
    {
      id: "services-overview",
      keywords: ["service", "services", "practice areas", "practices", "what do you do", "what do you offer", "offer", "offerings", "solutions", "capabilities", "explore services", "full menu", "everything you do"],
      weight: 1.2,
      answer:
        "We run six practices, each led by a senior practitioner:\n\n" +
        "1. Audit and Assurance — independent, rigorous assurance.\n" +
        "2. Taxation — compliant, efficient tax planning and advisory.\n" +
        "3. Corporate Services — registration, compliance and governance.\n" +
        "4. Consulting Services — operational and strategic problem-solving.\n" +
        "5. Actuarial Services — risk and valuation modelling.\n" +
        "6. Advisory — board-level counsel for consequential decisions.\n" +
        "7. Accounting Services — accurate books and reporting.\n\n" +
        "Which one would you like to dig into?",
      links: [{ label: "All services", href: "services.html" }],
      suggest: ["audit", "tax", "corporate", "advisory", "accounting"]
    },

    /* ---------- Audit ---------- */
    {
      id: "audit",
      keywords: ["audit", "audits", "auditing", "assurance", "auditor", "statutory audit", "financial statement audit", "internal control", "internal controls", "external audit", "audit and assurance", "forensic", "forensic audit", "due diligence", "agreed upon procedures", "grant audit", "special purpose audit"],
      weight: 1.15,
      answer:
        "Audit and Assurance — independent, objective insight that strengthens the credibility of your financial and non-financial information.\n\n" +
        "Our core services are:\n" +
        "• Statutory Audits — in compliance with applicable financial reporting standards and regulatory requirements.\n" +
        "• Financial Statement Audits — testing the integrity of your reporting against IFRS and local GAAP.\n" +
        "• Internal Control Reviews — identifying gaps and recommending practical improvements.\n" +
        "• Regulatory Compliance Assurance — for industry-specific laws and complex regulatory environments.\n" +
        "• Special Purpose Audits — due diligence reviews, grant audits, forensic audits and agreed-upon procedures.\n\n" +
        "The methodology is risk-based and focused on areas of highest impact, using data analytics and a robust quality control process — so the audit goes beyond compliance and actually informs decisions.",
      links: [{ label: "Audit and Assurance", href: "audit_assurance.html" }],
      suggest: ["audit-value", "ifrs", "sectors", "consultation"]
    },
    {
      id: "audit-value",
      keywords: ["value of audit", "why audit", "benefit of audit", "audit benefits", "what does an audit give me", "credibility", "risk mitigation", "governance"],
      answer:
        "Five things an audit from us is meant to deliver:\n\n" +
        "• Enhanced credibility — stronger trust with investors, regulators and stakeholders.\n" +
        "• Risk mitigation — financial and operational risks identified proactively.\n" +
        "• Improved governance — stronger internal controls and corporate governance.\n" +
        "• Actionable insights — practical recommendations that drive efficiency and performance.\n" +
        "• Regulatory confidence — compliance with evolving standards and requirements.\n\n" +
        "We work collaboratively with management, maintaining independence while keeping communication open — so the process is efficient and minimally disruptive.",
      links: [{ label: "Audit and Assurance", href: "audit_assurance.html" }],
      suggest: ["audit", "consultation"]
    },

    /* ---------- Tax ---------- */
    {
      id: "tax",
      keywords: ["tax", "taxes", "taxation", "tax service", "tax services", "tax management", "tax planning", "tax advisory", "tax compliance", "tax filing", "filing", "tax position", "tax liability", "optimise tax", "optimize tax", "tax efficient"],
      weight: 1.15,
      answer:
        "Tax Management Services — we simplify Nigerian taxation, keep you compliant, and help optimise your position within the rules.\n\n" +
        "What we cover:\n" +
        "• Tax Planning and Advisory — structuring finances efficiently while staying fully compliant.\n" +
        "• Tax Compliance and Filing — Company Income Tax (CIT), Personal Income Tax (PIT), VAT and Withholding Tax (WHT).\n" +
        "• Tax Audit and Investigation Support — professional representation that protects your interests.\n" +
        "• Payroll Tax Management — PAYE deductions, filing and reporting.\n" +
        "• Tax Registration and Documentation — from Tax Identification Numbers (TIN) to registering with the relevant authorities.\n" +
        "• Advisory on Regulatory Changes — keeping you current on Nigerian tax reform.\n\n" +
        "We serve individuals and professionals, SMEs, startups, corporations and NGOs.",
      links: [{ label: "Taxation practice", href: "taxation.html" }],
      suggest: ["tax-reform", "tax-audit", "vat", "paye"]
    },
    {
      id: "tax-audit",
      keywords: ["tax audit", "tax investigation", "firs", "revenue service", "tax authority", "assessment", "tax assessment", "being audited", "audit notice", "tax dispute", "tax appeal tribunal", "tat", "objection"],
      answer:
        "If a tax authority has come knocking, we provide Tax Audit and Investigation Support — professional representation throughout the process, protecting your interests and dealing with the authority on your behalf.\n\n" +
        "Two things matter enormously here: the burden of proof in a Nigerian tax dispute rests squarely on the taxpayer, and without proper books of account you cannot successfully object to an inflated assessment before the Tax Appeal Tribunal or the federal courts.\n\n" +
        "If you are facing an assessment, call us on " + PHONE + " — this is time-sensitive.",
      links: [{ label: "Taxation practice", href: "taxation.html" }, { label: "Read: Books of Account", href: "case_study_books_of_account.html" }],
      suggest: ["boj", "books-of-account", "contact"]
    },
    {
      id: "vat",
      keywords: ["vat", "value added tax", "cit", "company income tax", "companies income tax", "pit", "personal income tax", "capital gains", "cgt", "corporate tax rate", "30%", "tax rate"],
      answer:
        "Our compliance and filing work covers Company Income Tax (CIT), Personal Income Tax (PIT), VAT and Withholding Tax (WHT), plus payroll tax (PAYE) and the registration that sits underneath all of it.\n\n" +
        "Rates and reliefs shift with each reform cycle, and the Nigeria Tax Act has changed a good deal — so rather than quote a number that may not fit your position, the right next step is a short call with the tax partner.",
      links: [{ label: "Taxation practice", href: "taxation.html" }, { label: "Book a call", href: "contact.html" }],
      suggest: ["tax-reform", "contact"]
    },
    {
      id: "paye",
      keywords: ["paye", "payroll", "payroll tax", "salary", "salaries", "staff tax", "employee tax", "pay slip", "payslip", "remittance"],
      answer:
        "Payroll runs through two of our practices.\n\n" +
        "Under Taxation, we handle Payroll Tax Management — PAYE deductions, filing and reporting, so your employees' taxes are handled correctly.\n\n" +
        "Under Accounting Services, we handle Payroll Management end to end — processing, deductions and statutory compliance, so people are paid accurately and on time.",
      links: [{ label: "Taxation", href: "taxation.html" }, { label: "Accounting Services", href: "accounting_services.html" }],
      suggest: ["accounting", "tax", "consultation"]
    },
    {
      id: "tin",
      keywords: ["tin", "tax identification", "tax id", "tax registration", "register for tax", "tax number"],
      answer:
        "We handle Tax Registration and Documentation — obtaining Tax Identification Numbers (TIN) and registering you with the relevant tax authorities. It is usually the first thing a new entity needs, and we often do it alongside company incorporation.",
      links: [{ label: "Taxation", href: "taxation.html" }, { label: "Corporate Services", href: "corporate_services.html" }],
      suggest: ["corporate", "registration"]
    },

    /* ---------- Tax reform / NTA / NTAA ---------- */
    {
      id: "tax-reform",
      keywords: ["nta", "ntaa", "nigeria tax act", "nigeria tax administration act", "tax reform", "new tax law", "new tax regime", "tax act", "reform", "cita", "companies income tax act", "new tax rules", "tax changes", "what changed"],
      weight: 1.2,
      answer:
        "Nigeria's tax reform is anchored by two statutes: the Nigeria Tax Act (NTA) and the Nigeria Tax Administration Act (NTAA). Between them they repeal CITA, abolish the Excess Dividend Tax, and put record-keeping compliance at the centre of self-assessment.\n\n" +
        "Our partners have published two technical papers on what this means in practice — one on dividend taxation, one on books of account. Both are free to read here.",
      links: [
        { label: "Dividend taxation paper", href: "case_study_dividend_taxation.html" },
        { label: "Books of account paper", href: "case_study_books_of_account.html" }
      ],
      suggest: ["edt", "books-of-account", "tax", "consultation"]
    },
    {
      id: "edt",
      keywords: ["dividend", "dividends", "excess dividend tax", "edt", "section 19", "retained earnings", "distribution", "holdco", "holding company", "franked investment income", "fii", "reic", "finance act 2019", "shareholder", "payout"],
      weight: 1.15,
      answer:
        "The Excess Dividend Tax is gone.\n\n" +
        "Under Section 19 of the old CITA, a dividend paid in a year with no profits — or profits lower than the dividend — was re-characterised as taxable profit and charged Companies Income Tax at 30%. That double-taxed retained earnings, punished holding companies redistributing franked investment income, and even caught tax-exempt profits.\n\n" +
        "The Nigeria Tax Act repeals the mechanism entirely. Section 19 now governs Nigerian dividends received by non-resident persons, where WHT deducted at source under the NTAA is the final tax charge. Dividend classification sits in Section 7 of the NTA.\n\n" +
        "Our full paper walks through the worked example: a ₦200m distribution that would have cost ₦60m in CIT now costs ₦0.",
      links: [{ label: "Read the full paper", href: "case_study_dividend_taxation.html" }],
      suggest: ["wht", "tax-reform", "consultation"]
    },
    {
      id: "books-of-account",
      keywords: ["books of account", "books", "bookkeeping", "book keeping", "record keeping", "records", "section 31", "ledger", "ledgers", "general ledger", "retention", "6 year", "six year", "invoices", "receipts", "audit trail", "e-invoicing", "e invoicing", "section 102", "documentation"],
      weight: 1.15,
      answer:
        "Under Section 31 of the Nigeria Tax Administration Act, every taxable entity or person — including tax-exempt entities — must maintain records and books of account sufficient to ascertain their true tax position.\n\n" +
        "Three obligations worth knowing:\n" +
        "• Records must be kept in English. If kept in another language, you must supply a certified translation by a sworn translator, at your own expense, on request (Section 31(3–4)).\n" +
        "• Financial records, invoices, ledgers and transaction logs must be retained for a minimum of 6 years after the relevant year of assessment (Section 31(5)).\n" +
        "• Digital record-keeping and e-invoicing are formally prioritised under Section 102 of the NTA. Failing to present records on demand triggers administrative fines plus statutory interest.\n\n" +
        "Our full paper sets out the risks and the safeguards.",
      links: [{ label: "Read the full paper", href: "case_study_books_of_account.html" }, { label: "Accounting Services", href: "accounting_services.html" }],
      suggest: ["boj", "accounting", "consultation"]
    },
    {
      id: "boj",
      keywords: ["best of judgment", "best of judgement", "boj", "deemed profit", "rule of thumb", "arbitrary assessment", "bank inflow", "bank inflows", "turnover assessment", "presumptive", "disallowed expenses", "burden of proof", "gross turnover"],
      answer:
        "A Best of Judgment assessment is what happens when you cannot produce proper books.\n\n" +
        "The tax authority rejects the filing and estimates by rule of thumb: every bank credit is treated as taxable turnover (equity injections, inter-company transfers, reimbursements and loans included), expense claims are disallowed for lack of proof, and a presumptive deemed-profit percentage may be applied to the whole turnover.\n\n" +
        "The worked example in our paper: a company with ₦100m in inflows and ₦80m in genuine expenses should be taxed on ₦20m of net profit. Without records, it is taxed on the full ₦100m — and the burden of proof to overturn that sits entirely with the taxpayer.",
      links: [{ label: "Read the full paper", href: "case_study_books_of_account.html" }],
      suggest: ["books-of-account", "tax-audit", "consultation"]
    },
    {
      id: "wht",
      keywords: ["wht", "withholding tax", "withholding", "non resident", "non-resident", "final tax", "section 51", "deducted at source", "at source"],
      answer:
        "Withholding Tax is now where the compliance scrutiny sits.\n\n" +
        "Under the Nigeria Tax Act, WHT deducted at source on dividends paid to non-resident persons is the final tax charge — no further liability, and no refund claim. Section 51 of the NTAA governs remittance, and that remittance discipline is what tax authorities now focus on, rather than re-characterising corporate distributions.\n\n" +
        "We handle WHT as part of tax compliance and filing.",
      links: [{ label: "Dividend taxation paper", href: "case_study_dividend_taxation.html" }, { label: "Taxation", href: "taxation.html" }],
      suggest: ["edt", "tax", "consultation"]
    },

    /* ---------- Corporate services ---------- */
    {
      id: "corporate",
      keywords: ["corporate services", "corporate", "company secretarial", "secretarial", "annual returns", "corporate governance", "governance", "business support", "post incorporation"],
      weight: 1.1,
      answer:
        "Corporate Services — comprehensive support to help businesses in Nigeria establish, operate and grow with confidence, fully compliant with Nigerian law.\n\n" +
        "• Business Registration and Incorporation — from name reservation to final incorporation.\n" +
        "• Corporate Compliance and Governance — regulatory filings, annual returns and governance advisory to keep you in good standing.\n" +
        "• Legal and Advisory Services — contracts, business structuring, partnerships and risk management.\n" +
        "• Tax Advisory and Filing — strategic planning and compliance.\n" +
        "• Business Support Services — company secretarial and administrative support.\n\n" +
        "Startup, SME or established organisation — the solution is shaped to fit.",
      links: [{ label: "Corporate Services", href: "corporate_services.html" }],
      suggest: ["registration", "tin", "advisory"]
    },
    {
      id: "registration",
      keywords: ["register a company", "company registration", "incorporation", "incorporate", "cac", "business registration", "register my business", "name reservation", "set up a company", "start a company", "startup registration", "limited liability"],
      answer:
        "Yes — we handle business registration and incorporation end to end, from name reservation through to final incorporation, and then the post-incorporation work that most people forget: TIN registration, annual returns, statutory filings and company secretarial support.\n\n" +
        "Send us the business name you have in mind and the structure you want, and we will tell you what it takes.",
      links: [{ label: "Corporate Services", href: "corporate_services.html" }, { label: "Get started", href: "contact.html" }],
      suggest: ["corporate", "tin", "contact"]
    },

    /* ---------- Consulting & Actuarial ---------- */
    {
      id: "consulting",
      keywords: ["consulting", "consultancy", "consultant", "consulting services", "management consulting"],
      answer:
        "Consulting Services is one of our six practices, staffed by the same senior team. In practice it overlaps closely with our Advisory work — business strategy and planning, operational improvement, risk and compliance, and corporate restructuring — with economic and market intelligence contributed by our economics partner.\n\n" +
        "Tell us the problem and we will tell you which practice should own it.",
      links: [{ label: "Advisory", href: "advisory.html" }, { label: "All services", href: "services.html" }],
      suggest: ["advisory", "partners", "consultation"]
    },
    {
      id: "actuarial",
      keywords: ["actuarial", "actuary", "actuaries", "pension", "pensions", "insurance", "valuation", "risk modelling", "risk modeling", "reserving"],
      answer:
        "Actuarial Services is one of our six practices — risk and valuation modelling for pensions, insurance and related exposures.\n\n" +
        "Engagements here are scoped case by case, so the fastest route is a short conversation with a partner about what you need valued or modelled.",
      links: [{ label: "All services", href: "services.html" }, { label: "Speak with us", href: "contact.html" }],
      suggest: ["services-overview", "consultation"]
    },

    /* ---------- Advisory ---------- */
    {
      id: "advisory",
      keywords: ["advisory", "advice", "advise", "board", "board level", "strategy", "strategic", "business strategy", "planning", "restructuring", "merger", "mergers", "acquisition", "acquisitions", "m&a", "transformation", "operational improvement", "financial advisory", "investment analysis", "risk advisory", "market entry", "funding strategy"],
      weight: 1.1,
      answer:
        "Advisory — expert guidance and practical solutions for the decisions that shape an organisation's future.\n\n" +
        "• Business Strategy and Planning — clear goals, actionable strategies, roadmaps for sustainable growth.\n" +
        "• Financial Advisory — financial planning, investment analysis and risk management.\n" +
        "• Risk and Compliance Advisory — navigating Nigeria's regulatory requirements while minimising exposure.\n" +
        "• SME and Startup Advisory — business structuring, funding strategies and market entry.\n" +
        "• Corporate Advisory — restructuring, mergers and acquisitions, organisational transformation.\n" +
        "• Operational Improvement — process analysis that increases efficiency and reduces cost.\n\n" +
        "Our process runs Assessment → Identification → Strategy Development → Implementation Support. We stay on for the implementation, not just the diagnosis.",
      links: [{ label: "Advisory practice", href: "advisory.html" }],
      suggest: ["sme", "consulting", "consultation"]
    },
    {
      id: "sme",
      keywords: ["sme", "small business", "startup", "start up", "start-up", "entrepreneur", "founder", "founders", "scale up", "growing business", "new business", "small and medium"],
      answer:
        "A good deal of our work is with SMEs, startups and founders.\n\n" +
        "That typically means: incorporation and registration to get you set up properly, bookkeeping and financial reporting so the numbers are trustworthy, tax registration and compliance so nothing compounds quietly, and SME and Startup Advisory for structuring, funding strategy and market entry.\n\n" +
        "The single most valuable thing a young business can do is separate personal and business accounts and keep proper books from day one — it is what stands between you and a Best of Judgment assessment later.",
      links: [{ label: "Advisory", href: "advisory.html" }, { label: "Accounting Services", href: "accounting_services.html" }],
      suggest: ["books-of-account", "registration", "accounting", "pricing"]
    },

    /* ---------- Accounting ---------- */
    {
      id: "accounting",
      keywords: ["accounting", "accounts", "accountant", "financial reporting", "financial statements", "management accounts", "balance sheet", "profit and loss", "cash flow", "reconciliation", "outsourced accounting", "reporting"],
      weight: 1.1,
      answer:
        "Accounting Services — clarity, control and confidence in your financial operations.\n\n" +
        "• Bookkeeping — accurate, up-to-date records, from daily transactions to maintained ledgers.\n" +
        "• Financial Reporting — detailed statements, profit and loss accounts, balance sheets and cash flow reports.\n" +
        "• Tax Preparation and Compliance — filings, planning and advisory.\n" +
        "• Payroll Management — processing, deductions and statutory compliance.\n" +
        "• Business Advisory — strategic advice beyond the numbers.\n\n" +
        "We support startups, SMEs and established companies across industries.",
      links: [{ label: "Accounting Services", href: "accounting_services.html" }],
      suggest: ["books-of-account", "paye", "ifrs", "consultation"]
    },
    {
      id: "ifrs",
      keywords: ["ifrs", "gaap", "standards", "accounting standards", "financial reporting standards", "compliance standards"],
      answer:
        "Yes — we work to IFRS and local GAAP.\n\n" +
        "Our Financial Statement Audits evaluate the integrity of your reporting against both, and several of our partners specialise in end-to-end IFRS financial reporting and regulatory compliance.",
      links: [{ label: "Audit and Assurance", href: "audit_assurance.html" }, { label: "Our partners", href: "partners.html" }],
      suggest: ["audit", "accounting", "partners"]
    },

    /* ---------- Partners ---------- */
    {
      id: "partners",
      keywords: ["partner", "partners", "team", "people", "who works there", "leadership", "management team", "founders of the firm", "staff", "meet the team", "your team"],
      weight: 1.1,
      answer:
        "Five partners lead the practice, and a partner stays on your file from diagnostic to hand-over:\n\n" +
        "• Idowu Adegboyega, FCA — Lead Consultant and Partner. Internal control, auditing, corporate financial management, strategic tax planning.\n" +
        "• Kolawole Ogunbowale, FCA — Operational Partner and Co-Founder. Finance, taxation, audit, IFRS accounting and regulatory compliance. FCA, CITN, MBA (Lagos Business School).\n" +
        "• Oluwayemisi Kadijat Adeleke, PhD — Consultant and Partner, Economics. Macroeconomics, development economics, sustainable development and industry economic consultation.\n" +
        "• Adenuga Sopeju, FCA — Managing Partner. Financial operations, internal control and audit, IFRS reporting, tax strategy.\n" +
        "• Oluwafunsho Elias-Olasore, ACA — Partner. Financial reporting, audit quality control, regulatory compliance and cross-sector advisory.\n\n" +
        "Ask me about any of them by name.",
      links: [{ label: "Meet the partners", href: "partners.html" }],
      suggest: ["partner-kolawole", "partner-idowu", "partner-adenuga", "consultation"]
    },
    {
      id: "partner-kolawole",
      keywords: ["kolawole", "ogunbowale", "kolawole ogunbowale", "co-founder", "cofounder", "operational partner"],
      answer:
        "Kolawole Ogunbowale, FCA — Operational Partner and Co-Founder.\n\n" +
        "A Chartered Accountant with extensive experience in finance, taxation, audit and accounting practice, driving operational efficiency and financial accuracy across IFRS accounting and regulatory compliance. His work spans audit engagements and assurance, regulatory compliance and reporting, complex financial accounting under IFRS, corporate taxation and advisory, and professional training and practice oversight.\n\n" +
        "He is a Fellow of the Institute of Chartered Accountants of Nigeria (FCA) and of the Chartered Institute of Taxation of Nigeria (CITN), and holds an MBA from Lagos Business School and a B.Sc. in Accounting from Olabisi Onabanjo University.\n\n" +
        "He authored both of the tax papers published on this site.",
      links: [{ label: "Partners", href: "partners.html" }, { label: "His papers", href: "case_studies.html" }],
      suggest: ["tax-reform", "partners", "consultation"]
    },
    {
      id: "partner-idowu",
      keywords: ["idowu", "adegboyega", "idowu adegboyega", "lead consultant"],
      answer:
        "Idowu Adegboyega, FCA — Lead Consultant and Partner.\n\n" +
        "A results-oriented senior financial professional and Fellow of the Institute of Chartered Accountants of Nigeria, with 15 years of comprehensive experience spanning internal control, auditing, corporate financial management and strategic tax planning.\n\n" +
        "His work covers financial management and strategy, internal control and risk audit, financial reporting under IFRS and GAAP, tax management and planning, and accounting advisory and practice management. He holds a master's degree and a B.Sc. in Accounting.",
      links: [{ label: "Partners", href: "partners.html" }],
      suggest: ["partners", "consultation"]
    },
    {
      id: "partner-adenuga",
      keywords: ["adenuga", "sopeju", "adenuga sopeju", "managing partner", "cosco", "shipping", "logistics"],
      answer:
        "Adenuga Sopeju, FCA — Managing Partner.\n\n" +
        "A Fellow of ICAN with over 15 years of experience across internal control, corporate financial management, shipping and logistics accounting, and strategic tax planning. He is currently Deputy Manager of Finance at COSCO SHIPPING Lines.\n\n" +
        "His work covers financial operations and strategy, internal control and audit, end-to-end IFRS financial reporting, tax strategy and compliance, and accounting practice and advisory. He holds an M.Sc. in Accounting from the University of Lagos and a B.Sc. in Accounting from Olabisi Onabanjo University.",
      links: [{ label: "Partners", href: "partners.html" }],
      suggest: ["partners", "consultation"]
    },
    {
      id: "partner-yemisi",
      keywords: ["oluwayemisi", "yemisi", "adeleke", "economics", "economist", "macroeconomics", "phd", "redeemers", "orcid", "research", "sustainable development", "green economy", "remittances"],
      answer:
        "Oluwayemisi Kadijat Adeleke, PhD — Consultant and Partner, Economics.\n\n" +
        "A Senior Lecturer at Redeemer's University and macroeconomics consultant, driving industry economic consultation, sustainable development strategy and operational improvement.\n\n" +
        "Her work covers macroeconomics and financial economics research, development and environmental economics, the sustainable development goals and green economy, industry economic consultation, and governance, migration and remittances analysis. She holds a PhD in Economics as an African Economic Research Consortium Scholar, an M.Sc. in Economics from the University of Ibadan, a B.Sc. in Economics from Covenant University, and is an ACCA Associate Member.",
      links: [{ label: "Partners", href: "partners.html" }],
      suggest: ["partners", "consulting"]
    },
    {
      id: "partner-funsho",
      keywords: ["oluwafunsho", "funsho", "elias-olasore", "elias olasore", "aca", "audit quality", "venture capital"],
      answer:
        "Oluwafunsho Elias-Olasore, ACA — Partner.\n\n" +
        "A Chartered Accountant bringing over 15 years of multidisciplinary experience across financial reporting, audit quality and compliance, IT, business development and strategic consulting across West Africa.\n\n" +
        "Her work spans financial reporting and audit quality control, regulatory compliance and risk management, commercial and market development strategy, business process improvement, and cross-sector advisory across oil and gas, venture capital and healthcare. She is an Associate of the Institute of Chartered Accountants of Nigeria (ACA).",
      links: [{ label: "Partners", href: "partners.html" }],
      suggest: ["partners", "advisory"]
    },

    /* ---------- Practicalities ---------- */
    {
      id: "location",
      keywords: ["location", "locations", "office", "offices", "address", "where are you", "where is your office", "based", "lagos", "abuja", "fadeyi", "ikorodu road", "wuse", "directions", "map", "visit"],
      weight: 1.1,
      answer:
        "We have two Nigerian offices:\n\n" +
        "Lagos — 44 Ikorodu Road, Fadeyi, Lagos, Nigeria.\n" +
        "Abuja — Suit B3, Abuja Shopping Complex, Wuse Zone 3, Abuja, Nigeria.\n\n" +
        "We also have representation across several other Nigerian states, and internationally in the United Kingdom, the United States, Kenya and Ghana.",
      links: [{ label: "Find us", href: "contact.html" }],
      suggest: ["international", "hours", "contact"]
    },
    {
      id: "international",
      keywords: ["international", "abroad", "overseas", "uk", "united kingdom", "usa", "us", "united states", "america", "kenya", "ghana", "foreign", "diaspora", "cross border", "global", "outside nigeria", "other countries"],
      answer:
        "Yes. Beyond Lagos and Abuja we have representation in the United Kingdom, the United States, Kenya and Ghana — five countries in total — and we regularly support clients who find us through local and international recommendation.\n\n" +
        "If you are a foreign entity setting up in Nigeria, or a Nigerian business with obligations abroad, that is well-trodden ground for us.",
      links: [{ label: "About us", href: "about.html" }, { label: "Speak with us", href: "contact.html" }],
      suggest: ["location", "corporate", "consultation"]
    },
    {
      id: "contact",
      keywords: ["contact", "contact you", "get in touch", "phone", "number", "telephone", "call", "call you", "email", "e-mail", "reach", "reach you", "speak to someone", "talk to someone", "enquiry", "inquiry", "message", "write to you"],
      weight: 1.15,
      answer:
        "Here is everything you need:\n\n" +
        "Phone — " + PHONE + "\n" +
        "Email — " + EMAIL + "\n" +
        "Lagos — 44 Ikorodu Road, Fadeyi\n" +
        "Abuja — Suit B3, Abuja Shopping Complex, Wuse Zone 3\n" +
        "Hours — Monday to Friday, 9:00 to 18:00 WAT\n\n" +
        "Send us a note through the contact form and we reply within one business day, with the right partner to have the conversation with.",
      links: [
        { label: "Contact form", href: "contact.html" },
        { label: "Email us", href: "mailto:" + EMAIL },
        { label: "WhatsApp", href: WHATSAPP }
      ],
      suggest: ["hours", "consultation", "location"]
    },
    {
      id: "consultation",
      keywords: ["consultation", "book a consultation", "book", "booking", "appointment", "schedule", "meeting", "meet", "speak with a partner", "talk to a partner", "free consultation", "discovery call", "get started", "next step", "hire you", "engage you", "work with you", "become a client"],
      weight: 1.15,
      answer:
        "The best next step is a short conversation with a partner.\n\n" +
        "Tell us what you are working on through the contact form — name, company, the service you are interested in, and a line or two on the situation. We respond within one business day and put you with the partner who actually fits the engagement, not whoever is free.\n\n" +
        "If it is urgent, call " + PHONE + " or message us on WhatsApp.",
      links: [
        { label: "Book a consultation", href: "contact.html" },
        { label: "WhatsApp us", href: WHATSAPP }
      ],
      suggest: ["pricing", "response-time", "services-overview"]
    },
    {
      id: "whatsapp",
      keywords: ["whatsapp", "whats app", "wa", "chat on whatsapp", "message you", "dm"],
      answer: "You can message us directly on WhatsApp — it is the fastest way to reach the team during business hours.",
      links: [{ label: "Open WhatsApp", href: WHATSAPP }],
      suggest: ["contact", "hours"]
    },
    {
      id: "hours",
      keywords: ["hour", "hours", "opening hours", "business hours", "open", "closing", "when are you open", "what time", "availability", "weekend", "saturday", "sunday", "working days"],
      answer:
        "We are open Monday to Friday, 9:00 to 18:00 WAT.\n\n" +
        "Outside those hours, leave a message through the contact form or email " + EMAIL + " — we reply within one business day.",
      links: [{ label: "Contact us", href: "contact.html" }],
      suggest: ["contact", "response-time"]
    },
    {
      id: "response-time",
      keywords: ["how long to reply", "response time", "how fast", "how quickly", "when will you respond", "turnaround", "reply", "wait"],
      answer:
        "One business day. Every enquiry gets a response within that window, and it comes from — or is routed to — the partner who fits the engagement.",
      links: [{ label: "Send an enquiry", href: "contact.html" }],
      suggest: ["consultation", "contact"]
    },
    {
      id: "pricing",
      keywords: ["price", "prices", "pricing", "cost", "costs", "fee", "fees", "how much", "quote", "rate", "rates", "budget", "charge", "charges", "affordable", "expensive", "payment", "retainer"],
      weight: 1.1,
      answer:
        "Fees depend entirely on scope — the size of the entity, the state of the records, and how much of the work is one-off versus ongoing.\n\n" +
        "Rather than publish a number that would not fit your situation, we quote after a short call. That call is free, it is with a partner, and you will get a clear, transparent quote out of it with no obligation.",
      links: [{ label: "Get a quote", href: "contact.html" }],
      suggest: ["consultation", "contact"]
    },
    {
      id: "confidentiality",
      keywords: ["confidential", "confidentiality", "privacy", "private", "secure", "security", "nda", "data protection", "discreet", "discretion", "conflict of interest", "safe"],
      answer:
        "Absolutely. Integrity is one of our two core values, and every engagement is governed by strict confidentiality and conflict-of-interest protocols.\n\n" +
        "We keep our conflict list deliberately short, and we rarely publicise clients — most prefer it that way. Your financial information is handled with the highest level of security.",
      links: [{ label: "Our values", href: "about.html" }],
      suggest: ["values", "consultation"]
    },

    /* ---------- Careers ---------- */
    {
      id: "careers",
      keywords: ["career", "careers", "job", "jobs", "hiring", "recruitment", "vacancy", "vacancies", "opening", "openings", "apply", "application", "cv", "resume", "internship", "intern", "graduate", "work for you", "join the team", "employment", "position", "role"],
      weight: 1.15,
      answer:
        "We recruit thoughtfully and continuously — there may or may not be a role listed today, but if you are a serious operator we want to talk.\n\n" +
        "How to apply:\n" +
        "1. Email your CV to " + EMAIL + " with the subject line \"Career Enquiry — [Practice Area]\".\n" +
        "2. Add a short note on the practice you are interested in — Audit and Assurance, Taxation, Consulting, Actuarial, Advisory or Accounting — and any role or level in mind.\n" +
        "3. A partner reviews every submission personally. If there is a fit, now or later, we reach out.\n\n" +
        "What we offer: partners who make time for coaching, meaningful equity for senior hires, health, wellness and continuing education stipends, a sabbatical after five years, and a culture built on trust rather than surveillance.",
      links: [{ label: "Careers", href: "careers.html" }, { label: "Email your CV", href: "mailto:" + EMAIL + "?subject=Career%20Enquiry" }],
      suggest: ["about", "values", "contact"]
    },

    /* ---------- Content ---------- */
    {
      id: "case-studies",
      keywords: ["case study", "case studies", "papers", "paper", "publication", "publications", "insight", "insights", "article", "articles", "blog", "research", "reading", "read", "thought leadership", "what have you published"],
      answer:
        "We publish technical papers from our partners on the questions clients are actually bringing us. Two are live right now, both by Kolawole Ogunbowale, FCA:\n\n" +
        "• Evolutionary Analysis of Dividend Taxation in Nigeria: From Section 19 CITA to the Nigeria Tax Act (NTA)\n" +
        "• The Imperative of Keeping Proper Books of Account Under the New Tax Regime: Risks, Statutory Mandates, and Safeguards for Taxpayers\n\n" +
        "Both are free to read in full, tables and worked examples included.",
      links: [
        { label: "Dividend taxation", href: "case_study_dividend_taxation.html" },
        { label: "Books of account", href: "case_study_books_of_account.html" },
        { label: "All insights", href: "insight.html" }
      ],
      suggest: ["edt", "books-of-account", "tax-reform"]
    },
    {
      id: "newsletter",
      keywords: ["newsletter", "subscribe", "mailing list", "updates", "sign up", "signup", "join the list"],
      answer:
        "Drop your work email into the newsletter box at the bottom of any page and we will add you. We send sparingly — new papers and material regulatory changes, nothing else.",
      links: [{ label: "Insights", href: "insight.html" }],
      suggest: ["case-studies", "contact"]
    },
    {
      id: "faq",
      keywords: ["faq", "faqs", "frequently asked", "common questions", "questions"],
      answer: "Our FAQ page answers the questions we get most often — where we are based, what sectors we serve, our services, international clients, our experience, and confidentiality.",
      links: [{ label: "Read the FAQ", href: "faq.html" }],
      suggest: ["services-overview", "location", "contact"]
    }
  ];

  const FALLBACK = {
    answer:
      "I do not have a ready answer for that one.\n\n" +
      "I can help with our services, partners, offices, fees, careers or our published tax papers — or, for anything that needs real judgement, a partner will give you a straight answer within one business day at " + EMAIL + " or " + PHONE + ".",
    links: [
      { label: "Contact a partner", href: "contact.html" },
      { label: "WhatsApp", href: WHATSAPP }
    ],
    suggest: ["services-overview", "tax-reform", "partners", "pricing"]
  };

  /* Labels for the follow-up suggestion chips. */
  const SUGGESTION_LABELS = {
    "services-overview": "Our services",
    "about": "About the firm",
    "values": "Our values",
    "mission": "Mission & vision",
    "approach": "How we work",
    "experience": "Track record",
    "sectors": "Sectors we serve",
    "clients": "Our clients",
    "audit": "Audit & Assurance",
    "audit-value": "Why audit?",
    "tax": "Taxation",
    "tax-audit": "Facing a tax audit",
    "tax-reform": "The new tax regime",
    "vat": "VAT, CIT & PIT",
    "paye": "Payroll & PAYE",
    "tin": "TIN registration",
    "edt": "Excess Dividend Tax",
    "books-of-account": "Books of account",
    "boj": "Best of Judgment",
    "wht": "Withholding Tax",
    "corporate": "Corporate Services",
    "registration": "Register a company",
    "consulting": "Consulting",
    "actuarial": "Actuarial",
    "advisory": "Advisory",
    "sme": "SMEs & startups",
    "accounting": "Accounting Services",
    "ifrs": "IFRS & GAAP",
    "partners": "Our partners",
    "partner-kolawole": "Kolawole Ogunbowale",
    "partner-idowu": "Idowu Adegboyega",
    "partner-adenuga": "Adenuga Sopeju",
    "partner-yemisi": "Oluwayemisi Adeleke",
    "partner-funsho": "Oluwafunsho Elias-Olasore",
    "location": "Our offices",
    "international": "International clients",
    "contact": "Contact details",
    "consultation": "Book a consultation",
    "whatsapp": "WhatsApp",
    "hours": "Opening hours",
    "response-time": "Response time",
    "pricing": "Fees",
    "confidentiality": "Confidentiality",
    "careers": "Careers",
    "case-studies": "Our papers",
    "newsletter": "Newsletter",
    "faq": "FAQ"
  };

  /* ----------------------------------------------------------
     2. MATCHING
     Scored rather than first-match-wins, so "how much does a
     tax audit cost" lands on the fee answer rather than the
     first rule that happens to mention tax.
  ---------------------------------------------------------- */
  const ENTRY_BY_ID = KNOWLEDGE_BASE.reduce((map, entry) => {
    map[entry.id] = entry;
    return map;
  }, {});

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function normalise(message) {
    return " " + String(message)
      .toLowerCase()
      .replace(/[^a-z0-9&@.\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim() + " ";
  }

  function scoreEntry(text, entry) {
    let score = 0;

    entry.keywords.forEach((keyword) => {
      const kw = keyword.toLowerCase();

      if (kw.indexOf(" ") !== -1) {
        // Multi-word phrases are strong signals — weight them by length.
        if (text.indexOf(" " + kw) !== -1) {
          score += 4 + kw.split(" ").length;
        }
        return;
      }

      // Whole-word match, so "tax" does not fire on "taxi".
      if (new RegExp("\\b" + escapeRegExp(kw) + "\\b").test(text)) {
        score += 3;
      } else if (kw.length >= 6 && text.indexOf(kw) !== -1) {
        // Partial match only for long, distinctive words.
        score += 1;
      }
    });

    return score * (entry.weight || 1);
  }

  function findEntry(message) {
    const text = normalise(message);
    if (!text.trim()) return FALLBACK;

    let best = null;
    let bestScore = 0;

    KNOWLEDGE_BASE.forEach((entry) => {
      const score = scoreEntry(text, entry);
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    });

    // Below this, we are guessing — say so instead.
    return bestScore >= 3 ? best : FALLBACK;
  }

  /* ----------------------------------------------------------
     3. WIDGET MARKUP (injected once per page)
  ---------------------------------------------------------- */
  const WIDGET_HTML = [
    '<div class="chat-widget">',
    '  <div class="chat-box" id="chatBox" role="dialog" aria-label="Chat with Standard Practice" aria-modal="false">',
    '    <div class="chat-header">',
    '      <div class="chat-header-info">',
    '        <span class="chat-header-title">Ask Standard</span>',
    '        <span class="chat-header-status">Standard Assistant Online</span>',
    '      </div>',
    '      <button class="chat-close" id="chatClose" aria-label="Close chat">&times;</button>',
    '    </div>',
    '    <div class="chat-body" id="chatBody" role="log" aria-live="polite"></div>',
    '    <form class="chat-input-area" id="chatForm">',
    '      <input type="text" id="chatInput" placeholder="Ask about our services…" autocomplete="off" maxlength="300" aria-label="Type your question" />',
    '      <button type="submit">Send</button>',
    '    </form>',
    '  </div>',
    '',
    '  <button class="chat-trigger" id="chatTrigger" aria-expanded="false" aria-controls="chatBox">',
    '    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
    '      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>',
    '    </svg>',
    '    <span>Ask Standard Practice</span>',
    '  </button>',
    '</div>'
  ].join("\n");

  const WELCOME = {
    answer:
      "Welcome to Standard Practice Professional. I can help you explore our services, read our partners' tax papers, or connect you with the right person.\n\n" +
      "Where would you like to start?",
    suggest: ["services-overview", "tax-reform", "partners", "consultation"],
    links: [{ label: "Chat on WhatsApp", href: WHATSAPP }]
  };

  /* ----------------------------------------------------------
     4. RENDERING
     Everything user-supplied goes in via textContent, and every
     button/link is built as a real DOM node — no innerHTML on
     anything that could carry input.
  ---------------------------------------------------------- */
  function buildBubble(entry, sender) {
    const msg = document.createElement("div");
    msg.className = "chat-msg " + sender;

    const text = document.createElement("span");
    text.textContent = entry.answer;
    msg.appendChild(text);

    const hasLinks = entry.links && entry.links.length;
    const hasSuggestions = entry.suggest && entry.suggest.length;

    if (hasLinks || hasSuggestions) {
      const options = document.createElement("div");
      options.className = "chat-options";

      (entry.links || []).forEach((link) => {
        const a = document.createElement("a");
        a.className = "chat-chip chat-chip-link";
        a.href = link.href;
        a.textContent = link.label;
        if (/^https?:/i.test(link.href)) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
        options.appendChild(a);
      });

      (entry.suggest || []).forEach((id) => {
        const label = SUGGESTION_LABELS[id];
        if (!label || !ENTRY_BY_ID[id]) return;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "chat-chip";
        button.dataset.topic = id;
        button.textContent = label;
        options.appendChild(button);
      });

      if (options.childNodes.length) msg.appendChild(options);
    }

    return msg;
  }

  function scrollToLatest(body) {
    body.scrollTop = body.scrollHeight;
  }

  function appendEntry(body, entry, sender) {
    body.appendChild(buildBubble(entry, sender));
    scrollToLatest(body);
  }

  function appendUserText(body, text) {
    const msg = document.createElement("div");
    msg.className = "chat-msg user";
    msg.textContent = text;
    body.appendChild(msg);
    scrollToLatest(body);
  }

  function showTyping(body) {
    const typing = document.createElement("div");
    typing.className = "chat-msg bot typing";
    typing.setAttribute("aria-label", "Assistant is typing");
    for (let i = 0; i < 3; i++) typing.appendChild(document.createElement("span"));
    body.appendChild(typing);
    scrollToLatest(body);
    return typing;
  }

  /* ----------------------------------------------------------
     5. INIT
  ---------------------------------------------------------- */
  function initChatWidget() {
    if (document.getElementById("chatBox")) return; // never inject twice
    document.body.insertAdjacentHTML("beforeend", WIDGET_HTML);

    const chatBox = document.getElementById("chatBox");
    const chatTrigger = document.getElementById("chatTrigger");
    const chatClose = document.getElementById("chatClose");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatBody = document.getElementById("chatBody");

    appendEntry(chatBody, WELCOME, "bot");

    // Start closed regardless of what the stylesheet assumes.
    chatBox.classList.remove("open", "active");
    chatBox.style.display = "none";

    function openChat() {
      chatBox.classList.add("open");
      chatBox.style.display = "flex";
      chatTrigger.setAttribute("aria-expanded", "true");
      scrollToLatest(chatBody);
      // Skip autofocus on phones so the keyboard does not cover the panel.
      if (window.innerWidth > 640) chatInput.focus();
    }

    function closeChat() {
      chatBox.classList.remove("open");
      chatBox.style.display = "none";
      chatTrigger.setAttribute("aria-expanded", "false");
    }

    let pending = false;

    function respondTo(text) {
      const trimmed = String(text).trim();
      if (!trimmed || pending) return;

      appendUserText(chatBody, trimmed);
      pending = true;

      const typing = showTyping(chatBody);
      setTimeout(() => {
        typing.remove();
        appendEntry(chatBody, findEntry(trimmed), "bot");
        pending = false;
      }, 550);
    }

    function respondToTopic(id) {
      const entry = ENTRY_BY_ID[id];
      if (!entry || pending) return;

      appendUserText(chatBody, SUGGESTION_LABELS[id] || id);
      pending = true;

      const typing = showTyping(chatBody);
      setTimeout(() => {
        typing.remove();
        appendEntry(chatBody, entry, "bot");
        pending = false;
      }, 550);
    }

    chatTrigger.addEventListener("click", () => {
      if (chatBox.classList.contains("open")) closeChat();
      else openChat();
    });

    chatClose.addEventListener("click", closeChat);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && chatBox.classList.contains("open")) closeChat();
    });

    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = chatInput.value;
      chatInput.value = "";
      respondTo(value);
    });

    // Delegated, because chips are created with every new message.
    chatBody.addEventListener("click", (e) => {
      const chip = e.target.closest("[data-topic]");
      if (chip) respondToTopic(chip.dataset.topic);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatWidget);
  } else {
    initChatWidget();
  }
})();
