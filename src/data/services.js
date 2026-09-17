/* All service detail page data — mirrors the original HTML content exactly */

export const SERVICES = {
  'private-limited-company-registration': {
    title: 'Private Limited Company Registration',
    metaTitle: 'Private Limited Company Registration — LauncherDesk',
    metaDesc: 'Register a Private Limited Company in India with LauncherDesk. Overview, eligibility, documents, process, timeline, transparent pricing and Pvt Ltd vs LLP comparison.',
    eyebrow: 'Start your business',
    crumbCategory: 'Start your business',
    lead: "The standard structure for startups that want limited liability, credibility and the ability to raise investment. We handle the entire MCA process end to end.",
    priceCard: { label: 'Starts from', price: '₹4,500*', sub: '' },
    helpCard: { title: 'Need help deciding?', body: "Not sure if Pvt Ltd is right for you? Get a personalised recommendation." },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#benefits', label: 'Benefits' },
      { href: '#eligibility', label: 'Eligibility' },
      { href: '#documents', label: 'Documents' },
      { href: '#deliverables', label: 'Deliverables' },
      { href: '#process', label: 'Process' },
      { href: '#timeline', label: 'Timeline' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#compare', label: 'Pvt Ltd vs LLP' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: {
        heading: 'Overview',
        content: `<p>A Private Limited Company is one of the preferred business structures in India, as it is held privately. Pvt Ltd companies are registered with the Registrar of Companies (RoC) under the Companies Act, 2013, and can be started with a minimum of 2 members, scaling up to 200 shareholders. A Private Limited Company restricts shareholders from publicly trading shares, but still offers multiple benefits over other structures.</p><p>LauncherDesk manages every step: name approval, digital signatures, director identification, drafting the MOA and AOA, and filing for incorporation, along with PAN and TAN.</p>`
      },
      who: {
        heading: 'Who should choose it',
        items: [
          'Startups planning to raise equity funding from angels or VCs',
          'Founders who want personal assets protected from business liability',
          'Businesses that want to offer ESOPs to employees later',
          'Teams of two or more co-founders formalising ownership',
        ],
        extra: `<p>If you're a solo founder testing an idea, an <a href="/services/opc-registration" style="color:var(--blue-dark);font-weight:600">OPC or Proprietorship</a> may fit better — our AI or an expert can help you decide.</p>`
      },
      benefits: {
        heading: 'Key benefits',
        items: [
          '<b>No minimum capital requirement</b> — start your business with any amount, as there is no minimum investment required to register a Private Limited Company.',
          '<b>Separate legal entity</b> — the company can own property, enter into contracts, and face legal proceedings by itself, independent of its owners.',
          '<b>Limited liability protection</b> — your personal assets are not liable for the company\'s liabilities under a Private Limited Company.',
          '<b>Tax benefits</b> — enjoy a reduced corporate tax rate of 25% on turnover below ₹250 crores, compared to 30% for other business structures.',
          '<b>Only 2 members required</b> — start with just 2 members and scale up to a maximum of 200 shareholders as your business grows.',
          '<b>Easier access to funding</b> — raise capital easily by issuing shares or taking loans, as Private Limited Companies are viewed more favourably by investors and financial institutions.',
        ]
      },
      eligibility: {
        heading: 'Eligibility',
        items: [
          'Minimum two directors and two shareholders (can be the same people)',
          'At least one director resident in India',
          'A registered office address in India',
          'No minimum paid-up capital required to start',
        ]
      },
      documents: {
        heading: 'Documents required',
        content: `<h3>For every director / shareholder</h3><ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> PAN of all directors &amp; shareholders</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Identity proof of all directors &amp; shareholders</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Directors' address proof</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Latest passport-size photographs of all directors &amp; shareholders</li></ul><h3>For the registered office</h3><ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Business address proof</li></ul>`
      },
      deliverables: {
        heading: "Final deliverables you'll get",
        content: `<ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Company's Name Approval Letter</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Incorporation Certificate</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> DIN Approval Letter</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Digital Signature Token</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> PAN Card of the Company</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Company Stamp, MOA + AOA</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> TAN/TDS Letter of the Company</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Incorporation kit to help you open a current bank account</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Filing of INC 20A for Commencement of Business</li></ul>`
      },
      process: {
        heading: 'Private Limited Company Registration in 5 easy steps',
        steps: [
          { title: 'Fill up the form', body: 'Once you fill up the enquiry form, one of our advisors will connect with you to understand your requirements.' },
          { title: 'Document collection', body: 'After the detailed call/meeting discussion, you submit the required documents for your company registration procedure, as per the checklist shared by our team.' },
          { title: 'Company name reservation', body: "We proceed with the company's name reservation process — the name should be unique and not already registered with the MCA." },
          { title: 'Professional fees payment', body: 'After reserving your name, you pay the professional fee and our team proceeds with the company registration filing work.' },
          { title: 'Get Certificate of Incorporation', body: 'The MCA reviews your application and provides the Certificate of Incorporation on final approval. Note: the MCA can ask for resubmission or reject the application if any detail is unsatisfactory.' },
        ]
      },
      timeline: {
        heading: 'Time required to register a Private Limited Company',
        content: `<p>Registering a Private Limited Company in India usually takes <b>7–10 days</b>. Here is the detailed time division:</p><table class="tbl"><tr><th>S. No.</th><th>Particulars</th><th>Time Required</th></tr><tr><td>1</td><td>Enquiry &amp; Advisor Call</td><td>1 Day</td></tr><tr><td>2</td><td>Document Collection</td><td>1–2 Days</td></tr><tr><td>3</td><td>Name Reservation</td><td>2–3 Hrs</td></tr><tr><td>4</td><td>Name Approval</td><td>1–2 Days</td></tr><tr><td>5</td><td>Form Filing</td><td>1–2 Days</td></tr><tr><td>6</td><td>MCA Approval</td><td>2–3 Days</td></tr></table>`
      },
      pricing: {
        heading: 'Transparent pricing',
        intro: "We never bundle everything into one padded number. Your quote separates exactly what goes where:",
        rows: [
          ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
          ['Government fee', 'MCA / stamp duty — varies by state & capital'],
          ['Taxes', 'GST on the professional fee, shown separately'],
          ['Optional add-ons', 'GST registration, accounting, trademark, etc.'],
        ],
        outro: `Government fees change by state and authorised capital, so we quote your exact figure up front rather than advertising a low headline price. <a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      compare: {
        heading: 'Private Limited vs LLP',
        tableHtml: `<table class="tbl"><tr><th>&nbsp;</th><th>Private Limited</th><th>LLP</th></tr><tr><td>Best for</td><td>Funded startups</td><td>Partner-run firms</td></tr><tr><td>Raise equity</td><td class="yes">Yes</td><td>Limited</td></tr><tr><td>ESOPs</td><td class="yes">Yes</td><td>No</td></tr><tr><td>Compliance load</td><td>Higher</td><td>Lower</td></tr><tr><td>Limited liability</td><td class="yes">Yes</td><td class="yes">Yes</td></tr></table>`
      },
      faq: {
        heading: 'Frequently asked questions',
        items: [
          { q: 'How long does registration take?', a: 'Typically 7–14 working days once all documents are in order, subject to MCA processing and name-approval times.' },
          { q: 'Can I register from home?', a: "Yes. A residential address can serve as your registered office with the owner's NOC and a utility bill." },
          { q: 'Do I need GST immediately?', a: `Not always — it depends on turnover and whether you sell across states or online. We'll advise based on your business. <a href="/services/gst-registration" style="color:var(--blue-dark);font-weight:600">Learn about GST →</a>` },
        ]
      }
    },
    related: [
      { href: '/services/gst-registration', label: 'GST Registration', note: 'Often needed right after incorporation.' },
      { href: '/services/trademark-registration', label: 'Trademark', note: 'Protect your company name as a brand.' },
      { href: '/business-types/ecommerce', label: 'Starting online?', note: 'See the full e-commerce journey.' },
    ]
  },

  'gst-registration': {
    title: 'GST Registration & Return Filing',
    metaTitle: 'GST Registration & Filing — LauncherDesk',
    metaDesc: 'Register for GST and stay compliant with ongoing return filing. Eligibility, documents, process, timelines and transparent pricing from LauncherDesk.',
    eyebrow: 'Registrations & compliance',
    crumbCategory: 'Registrations & compliance',
    lead: "Register for GST and keep monthly, quarterly and annual returns filed on time — so a missed deadline never becomes a penalty or a blocked input credit.",
    priceCard: { label: 'Total (incl. GST)', price: '₹1,769', sub: 'Professional fee ₹1,499 + GST' },
    helpCard: { title: 'Not sure if you need GST yet?', body: "It depends on turnover, state and channel — we'll tell you plainly." },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: 'Who needs it' },
      { href: '#benefits', label: 'Benefits' },
      { href: '#eligibility', label: 'Eligibility' },
      { href: '#documents', label: 'Documents' },
      { href: '#types', label: 'Registration types' },
      { href: '#process', label: 'Process' },
      { href: '#approach', label: 'Our approach' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>GST (Goods and Services Tax) registration gives your business a GSTIN — the identifier you need to legally collect tax, claim input credit, and sell across state lines or online. LauncherDesk handles both the one-time registration and the ongoing monthly/quarterly return filing that keeps it in good standing.</p>` },
      who: { heading: 'Who needs it', items: ['Businesses crossing the turnover threshold (₹20–40 lakh depending on state and category)', 'Anyone selling on e-commerce marketplaces (Amazon, Flipkart, etc.)', 'Businesses that sell across state borders, regardless of turnover', 'Anyone who wants to claim input tax credit on purchases'] },
      benefits: {
        heading: 'Why register for GST',
        items: [
          '<b>Gaining legal identity &amp; tax structure</b> — registering under GST gives your business a formal identity, essential for operating legally, opening bank accounts, and maintaining credibility.',
          '<b>Collect GST from customers</b> — with a valid GSTIN, you can issue GST-compliant invoices and lawfully collect GST from your clients or customers.',
          '<b>Claim Input Tax Credit (ITC)</b> — GST registration allows you to claim credit for taxes paid on purchases, reducing your overall tax burden and increasing profitability.',
          '<b>Sell across India &amp; platforms</b> — planning to go pan-India or sell via Amazon, Flipkart, Meesho, etc.? GST registration is mandatory for e-commerce operations and interstate trade.',
          '<b>Eligible for tenders &amp; investors</b> — public tenders and institutional investors often require GST-registered businesses. It\'s a compliance badge that unlocks trust and funding.',
          '<b>Trusted by clients &amp; vendors</b> — GST registration signals professionalism and transparency, making it easier to onboard corporate clients, collaborate with vendors, and close bigger deals confidently.',
        ]
      },
      eligibility: { heading: 'Eligibility', items: ['Any registered business entity — Pvt Ltd, LLP, OPC, Partnership or Proprietorship', 'A valid business address and bank account', 'No minimum turnover required for voluntary registration'] },
      documents: {
        heading: 'Must-have documents for GST registration',
        content: `<p>Keep these documents ready for a smooth and speedy GST registration process.</p><ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> PAN of business and promoter</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Aadhaar of directors/owners</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Address proof of business (rent agreement / electricity bill)</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Cancelled cheque / bank statement</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Passport photo</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Business registration proof (if applicable)</li></ul>`
      },
      types: {
        heading: 'All GST registration types, covered',
        content: `<p>We help you choose and apply for the correct GST registration — fast, accurate, and fully compliant.</p><ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>Regular Taxpayer</b> — businesses with turnover above ₹20/₹40 lakh</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>Composition Scheme</b> — small traders or manufacturers with turnover below ₹1.5 crore</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>Casual Taxable Person</b> — pop-up shops, exhibition sellers, seasonal vendors</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>Non-Resident Taxable Person</b> — foreign entities supplying goods/services in India</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>GST Practitioner</b></li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>E-commerce Sellers</b> — anyone selling on marketplaces like Amazon, Flipkart, Shopify</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>Input Service Distributor (ISD)</b> — companies with multiple branches distributing ITC</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>TDS / TCS Deductors</b> — government departments or e-commerce operators deducting/collecting tax</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>UIN Holders</b> — embassies, UN bodies, eligible for GST refunds</li></ul>`
      },
      process: {
        heading: 'Get GST registration done in 5 simple steps',
        steps: [
          { title: 'Speak to our GST experts', body: "No confusing forms, no delays — just expert-led guidance from the start." },
          { title: 'Document collection & preparation', body: 'We help you gather and prepare every required document correctly the first time.' },
          { title: 'Filing application online', body: 'We file your GST registration application on the GST portal.' },
          { title: 'Responding to notices', body: 'If the department raises a query or notice, we handle the response on your behalf.' },
          { title: 'GSTIN number issued', body: 'Your GSTIN is issued and your business is officially GST-registered.' },
        ]
      },
      approach: {
        heading: 'The Startup Movers approach to GST registration',
        steps: [
          { title: 'We understand your business first', body: 'We assess your business model, turnover, and goals to recommend the right GST registration type — no guesswork.' },
          { title: 'Tailored checklist & filing support', body: 'You get a smart checklist, tailored to your entity type, with clear format rules, and handholding till upload is perfect.' },
          { title: 'Dept. notice handling included', body: 'We pre-verify everything, track approvals, and handle departmental queries or REG-03 notices, before you even know they came.' },
          { title: 'Real-time status tracking', body: "You'll know exactly where your GSTIN stands — no chasing, no surprises." },
          { title: 'Post-registration setup & login help', body: 'From getting your GSTIN certificate to setting up your login credentials, e-way bill access, and first-time compliance calendar.' },
          { title: 'Not a bot. But a dedicated partner.', body: "With us, you get expert support, not just automated systems. We're here whenever you need us." },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', 'Registration filing plus your chosen return-filing plan'],
          ['Government fee', 'GST registration itself has no government fee'],
          ['Taxes', 'GST on our professional fee, shown separately'],
        ], outro: `Return-filing plans vary by transaction volume, so we quote based on your actual business. <a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'How long does GST registration take?', a: 'Typically 3–7 working days when documents are complete, though officer verification can extend this.' },
          { q: 'What happens if I miss a return?', a: 'Late fees and interest accrue automatically, and repeated misses can lead to GSTIN suspension. This is exactly what our ongoing filing plans prevent.' },
          { q: 'Do I need GST before I start selling?', a: `If you'll sell online, across states, or expect to cross the turnover threshold quickly, it's worth registering upfront. Our <a href="/services#finder" style="color:var(--blue-dark);font-weight:600">Service Finder</a> can confirm for your case.` },
        ]
      }
    },
    related: [
      { href: '/services/private-limited-company-registration', label: 'Private Limited Company', note: "Start here if you're not registered yet." },
      { href: '/services/msme-registration', label: 'MSME / Udyam', note: 'Quick to add alongside GST.' },
      { href: '/services/accounting', label: 'Accounting', note: 'Keep your books aligned with your filings.' },
    ]
  },

  'llp-registration': {
    title: 'LLP Registration',
    metaTitle: 'LLP Registration — LauncherDesk',
    metaDesc: 'Register a Limited Liability Partnership in India — the structure built for partner-run firms that want limited liability without heavy compliance.',
    eyebrow: 'Start your business',
    crumbCategory: 'Start your business',
    lead: "A partner-owned structure that combines limited liability with lower compliance than a Private Limited Company. Popular with professional and services firms.",
    priceCard: { label: 'Total (incl. GST)', price: '₹10,030', sub: 'Professional fee ₹8,500 + GST' },
    helpCard: { title: 'Need help deciding?', body: 'Get a personalised recommendation based on your business.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" }, { href: '#benefits', label: 'Benefits' },
      { href: '#eligibility', label: 'Prerequisites' }, { href: '#documents', label: 'Documents' }, { href: '#deliverables', label: 'Deliverables' },
      { href: '#process', label: 'Process' }, { href: '#whyus', label: 'Why LauncherDesk' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>A Limited Liability Partnership (LLP) is another popular business structure in India, combining the benefits of both a company and a partnership firm. With the flexibility of a partnership, partners in an LLP enjoy limited liability just like shareholders in a Private Limited Company. LLPs in India are recognised under the Limited Liability Partnership Act, 2008.</p><p>LauncherDesk handles DSC, DPIN, name approval, drafting the LLP Agreement, and filing incorporation.</p>` },
      who: { heading: "Who it's for", items: ['Two or more partners running a services or professional firm', 'Businesses that want limited liability but don\'t plan to raise VC funding', 'Founders who want lower annual compliance than a Pvt Ltd company'] },
      benefits: {
        heading: 'Benefits of Limited Liability Partnership',
        items: [
          '<b>No minimum capital requirement</b> — start your business with any amount, as there\'s no minimum capital required to register an LLP.',
          '<b>Lower registration costs</b> — LLP offers affordable registration at the bare minimum cost in India, so you get legal protections at a low rate.',
          '<b>Limited liability protection</b> — your personal assets/wealth are safe and not liable beyond the contribution you made in the business.',
          '<b>Eliminates double taxation</b> — business profits are taxed only at the partner level, unlike corporations, which face double taxation at both corporate and dividend levels.',
          '<b>Flexibility in management</b> — manage your business directly and efficiently without needing a board of directors.',
          '<b>Fewer compliance requirements</b> — easier to set up and maintain compared to private limited companies.',
        ]
      },
      eligibility: {
        heading: 'Essential prerequisites for LLP',
        items: [
          'Minimum two partners allowed (individual or body corporate)',
          'At least two designated partners are required, with one being an Indian resident',
          'LLP Agreement',
          'LLP Name',
          'Registered Office Address',
          'Digital Signature Certificate',
        ]
      },
      documents: {
        heading: 'Documents required for LLP registration',
        content: `<ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> PAN card or passport (foreign nationals &amp; NRIs)</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Identity proof of all partners</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Partner's address proof</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Business address proof</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Latest passport-size photographs of all partners</li></ul>`
      },
      deliverables: {
        heading: "Final deliverables you'll get",
        content: `<ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> LLP Name Approval Letter</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Incorporation Certificate</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> DIN Approval Letter &amp; Digital Signature Token</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> PAN Card of the LLP &amp; LLP Stamp</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> LLP Agreement</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> TAN/TDS Letter of the LLP</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Incorporation kit to help you open a current bank account</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Filing of Form 3 within 30 days of the LLP being registered</li></ul>`
      },
      process: {
        heading: 'LLP registration in 5 easy steps — get registered in just 10 days',
        steps: [
          { title: 'Fill up the form', body: 'To register your LLP, first fill up the enquiry form and one of our business advisors will contact you to understand your requirements.' },
          { title: 'Submit the documents', body: 'After understanding your requirements, you submit the documents required for your LLP registration process, as per the checklist shared by our team.' },
          { title: "Reserve your LLP's name", body: "After verifying your documents, our team reserves the name for your LLP. Depending on availability, your name gets approved." },
          { title: 'Pay professional fees', body: "After successfully reserving your LLP's name, you pay the professional fees. Our team fills out the registration form for your LLP on the MCA portal." },
          { title: 'Get your LLP registered', body: 'The MCA reviews the application, and on final approval, your LLP gets registered.' },
        ]
      },
      whyus: {
        heading: 'Why choose LauncherDesk?',
        items: [
          '<b>Expert guidance</b> — 12+ years of experience with 150+ experts guiding you every step of the way.',
          '<b>Transparent pricing</b> — all-inclusive pricing with no hidden fees.',
          '<b>Quick turnaround</b> — get your LLP registered in just 10 days.',
          '<b>Comprehensive support</b> — from documents to compliance, we handle it all.',
          '<b>Trusted by 5000+ startups</b> — join a large community of successful businesses.',
          '<b>3+ unicorns produced</b> — we\'ve helped startups grow into billion-dollar businesses.',
        ]
      },
      pricing: {
        heading: 'Transparent pricing', intro: 'Your quote separates professional work, government fees and taxes so you always know what you\'re paying for.', rows: [
          ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
          ['Government fee', 'MCA fee — varies by state and contribution amount'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'How is an LLP different from a Partnership firm?', a: 'An LLP is registered with the MCA and gives partners limited liability; a traditional partnership does not, and partners remain personally liable.' },
          { q: 'Can an LLP raise equity funding?', a: "Not directly — LLPs can't issue shares, so most VC-backed startups choose a Private Limited Company instead." },
          { q: 'How many partners does an LLP need?', a: 'A minimum of two, with no upper limit. At least two must be designated partners.' },
        ]
      }
    },
    related: [
      { href: '/services/private-limited-company-registration', label: 'Private Limited Company', note: "If you're planning to raise investment." },
      { href: '/services/gst-registration', label: 'GST Registration', note: 'Often needed alongside LLP registration.' },
      { href: '/solutions/business-setup', label: 'Business Setup', note: 'See the full setup solution.' },
    ]
  },

  'opc-registration': {
    title: 'OPC Registration',
    metaTitle: 'OPC Registration — LauncherDesk',
    metaDesc: 'Register a One Person Company — the right-sized structure for a solo founder who wants limited liability without bringing in a co-founder.',
    eyebrow: 'Start your business',
    crumbCategory: 'Start your business',
    lead: "Built for solo founders. An OPC gives you the limited liability and credibility of a company structure without needing a second shareholder.",
    priceCard: { label: 'Starts from', price: '₹4,500*', sub: '' },
    helpCard: { title: 'Need help deciding?', body: 'Get a personalised recommendation based on your business.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" }, { href: '#benefits', label: 'Benefits' },
      { href: '#eligibility', label: 'Eligibility' }, { href: '#documents', label: 'Documents' }, { href: '#deliverables', label: 'Deliverables' },
      { href: '#process', label: 'Process' }, { href: '#whyus', label: 'Why LauncherDesk' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>OPC or One Person Company is another business structure registered under the Companies Act, 2013, introduced by the Government. As the name suggests, a One Person Company is established by a single person. This structure offers the benefits of both a Sole Proprietorship and a well-structured Company, and was introduced to promote entrepreneurship and Micro, Small &amp; Medium Enterprises (MSMEs) in India.</p><p>LauncherDesk manages the nominee appointment, DSC, name approval and incorporation filing.</p>` },
      who: { heading: "Who it's for", items: ['Solo founders who want limited liability from day one', 'Freelancers and consultants formalising into a company', 'Founders not yet ready to bring in co-founders or investors'] },
      benefits: {
        heading: 'Benefits of One Person Company Registration',
        items: [
          '<b>Easy availability of funds</b> — attract investment and loans more easily than sole proprietorships, as they are recognized as a separate legal entity.',
          '<b>Simple business structure</b> — unlike other company formats, an OPC requires only a single director and shareholder.',
          '<b>Limited liability protection</b> — your personal liability is limited to the contribution you make, keeping your personal wealth safe.',
          '<b>Continuity in business</b> — the company continues to exist even in the event of the owner\'s demise; ownership can be transferred as per legal provisions.',
          '<b>Flexibility in management</b> — control and manage your business directly and efficiently without needing a board of directors.',
          '<b>Fewer compliance requirements</b> — easier to set up and maintain compared to private limited companies.',
        ]
      },
      eligibility: {
        heading: 'Primary criteria for One Person Company registration',
        items: [
          '<b>One Director</b> — there must be at least one director to register an OPC in India.',
          '<b>Digital Signature Certificate &amp; DIN</b> — it is mandatory to have a DSC and Director Identification Number for the company\'s director.',
          '<b>Appointment of Nominee</b> — a nominee must be appointed to take over the organisation after the promoter\'s incapacity.',
          '<b>No minimum capital</b> — there is no minimum required capital to register an OPC in India.',
          '<b>Registered office address</b> — a registered office address is required, where all mandatory formalities or documents can be delivered.',
          '<b>OPC Name</b> — the name is treated as a business name and must be unique from other registered companies.',
        ]
      },
      documents: {
        heading: 'Documents required for OPC registration',
        content: `<ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> PAN card or passport (foreign nationals &amp; NRIs)</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Owner's identity proof</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Owner's address proof</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Business address proof</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Latest passport-size photographs</li></ul>`
      },
      deliverables: {
        heading: "Final deliverables you'll get",
        content: `<ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> OPC Name Approval Letter</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Incorporation Certificate</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> DIN Approval Letter &amp; Digital Signature Token</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> PAN Card of the OPC &amp; OPC Stamp</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Draft MOA and AOA</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> TAN/TDS Letter of the OPC</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Incorporation kit to help you open a current bank account</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Filing of Form INC-20A within 180 days of incorporation of the OPC</li></ul>`
      },
      process: {
        heading: 'OPC registration process in 5 simple steps — get registered in just 10 days',
        steps: [
          { title: 'Fill up the form', body: 'To register a one-person company, fill up the enquiry form first; one of our business advisors will then connect with you via call or virtual meeting to understand your requirements.' },
          { title: 'Submit documents', body: 'After a detailed discussion, you submit the documents as per the checklist shared by our team.' },
          { title: "Reserve your company's name", body: "After successfully submitting the documents, our team proceeds with your company's name reservation process." },
          { title: 'Pay professional fees', body: 'Once the name is approved, you pay the professional fees and our team completes the filing process for your company registration.' },
          { title: 'Get your company registered', body: "On successful verification by the concerned authority, you'll receive your One Person Company's Incorporation Certificate." },
        ]
      },
      whyus: {
        heading: 'Why choose LauncherDesk?',
        items: [
          '<b>Expert guidance</b> — 11+ years of experience with 120+ experts guiding you every step of the way.',
          '<b>Transparent pricing</b> — all-inclusive pricing with no hidden fees.',
          '<b>Quick turnaround</b> — get your OPC registered in just 10 days.',
          '<b>Comprehensive support</b> — from documents to compliance, we handle it all.',
          '<b>Trusted by 5000+ startups</b> — join a large community of successful businesses.',
          '<b>3+ unicorns produced</b> — we\'ve helped startups grow into billion-dollar businesses.',
        ]
      },
      pricing: {
        heading: 'Transparent pricing', intro: "Your quote separates professional work, government fees and taxes so you always know what you're paying for.", rows: [
          ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
          ['Government fee', 'MCA / stamp duty — varies by state'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Can an OPC have more than one shareholder?', a: 'No — by definition an OPC has exactly one member. If you bring on a co-founder, you\'d convert to a Private Limited Company.' },
          { q: 'Is a nominee required?', a: 'Yes, every OPC must name a nominee who can take over in case the sole member is unable to continue.' },
          { q: 'Can I convert my OPC to a Pvt Ltd later?', a: 'Yes, conversion is straightforward once you cross certain turnover or capital thresholds, or voluntarily if you choose to.' },
        ]
      }
    },
    related: [
      { href: '/services/private-limited-company-registration', label: 'Private Limited Company', note: 'For when you bring on co-founders or investors.' },
      { href: '/services/gst-registration', label: 'GST Registration', note: 'Register once your business is active.' },
      { href: '/services/accounting', label: 'Accounting', note: "Keep your OPC's books compliant." },
    ]
  },

  'partnership-registration': {
    title: 'Partnership Firm Registration',
    metaTitle: 'Partnership Firm Registration — LauncherDesk',
    metaDesc: 'Register a Partnership firm — the simplest way for two or more people to formalise a shared-ownership business.',
    eyebrow: 'Start your business',
    crumbCategory: 'Start your business',
    lead: "The simplest way to formalise a business owned by two or more people, with minimal setup and lower ongoing compliance than a company or LLP.",
    priceCard: { label: 'Starts from', price: 'Custom quote', sub: '' },
    helpCard: { title: 'Need help deciding?', body: 'Get a personalised recommendation based on your business.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" }, { href: '#benefits', label: 'Benefits' },
      { href: '#documents', label: 'Documents' }, { href: '#process', label: 'Process' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>A Partnership Firm is governed by the Indian Partnership Act, 1932. It's quick to set up and suits small, trust-based businesses where partners are comfortable with unlimited personal liability in exchange for simplicity.</p><p>LauncherDesk drafts your Partnership Deed and handles registration with the Registrar of Firms.</p>` },
      who: { heading: "Who it's for", items: ['Small, owner-operated businesses with two or more partners', 'Family businesses and local trades', 'Founders who want the simplest, lowest-cost registration route'] },
      benefits: { heading: 'Key benefits', items: ['<b>Fast and low-cost</b> to set up compared to a company or LLP.', '<b>Minimal ongoing compliance</b> — no mandatory annual filings with the MCA.', '<b>Flexible</b> — partners define terms freely in the Partnership Deed.'] },
      documents: { heading: 'Documents / information required', items: ['PAN and Aadhaar of all partners', 'Identity and address proof for each partner', 'Proof of business address', 'Partnership Deed on stamp paper'] },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Drafting the Partnership Deed', body: 'We prepare the deed covering profit-sharing, roles and capital contribution.' },
          { title: 'Stamping', body: 'The deed is executed on appropriate stamp paper as per state rules.' },
          { title: 'Registration (optional but recommended)', body: 'We file with the Registrar of Firms for legal recognition.' },
          { title: 'PAN application', body: "We apply for a PAN in the firm's name." },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', intro: "Your quote separates professional work, government/stamp fees and taxes so you always know what you're paying for.", rows: [
          ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
          ['Government fee', 'Stamp duty & Registrar of Firms fee — varies by state'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Is registration mandatory for a partnership firm?', a: "Not legally mandatory, but an unregistered firm can't sue third parties to enforce contracts — so we recommend registering." },
          { q: 'Do partners have unlimited liability?', a: 'Yes — unlike an LLP or company, partners are personally liable for the firm\'s debts. If that\'s a concern, an LLP may suit you better.' },
          { q: 'Can a partnership convert to an LLP later?', a: "Yes, and it's a fairly standard conversion path as businesses formalise and grow." },
        ]
      }
    },
    related: [
      { href: '/services/llp-registration', label: 'LLP Registration', note: 'If limited liability matters to you.' },
      { href: '/services/gst-registration', label: 'GST Registration', note: 'Register once you start trading.' },
      { href: '/services/accounting', label: 'Accounting', note: "Keep the firm's books in order." },
    ]
  },

  'msme-registration': {
    title: 'MSME / Udyam Registration',
    metaTitle: 'MSME / Udyam Registration — LauncherDesk',
    metaDesc: 'Register your business under Udyam (MSME) to unlock government benefits, subsidies and easier access to credit.',
    heroBadge: 'msme',
    eyebrow: 'Registrations & compliance',
    crumbCategory: 'Registrations & compliance',
    lead: "A quick registration that unlocks collateral-free loans, subsidies, delayed-payment protection and priority in government tenders.",
    priceCard: { label: 'Total (incl. GST)', price: '₹589', sub: 'Professional fee ₹499 + GST' },
    helpCard: { title: 'Need help deciding?', body: 'Get a personalised recommendation based on your business.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" }, { href: '#benefits', label: 'Benefits' },
      { href: '#whyregister', label: 'Why register' }, { href: '#classification', label: 'Classification' }, { href: '#included', label: 'How we help' },
      { href: '#documents', label: 'Documents' }, { href: '#process', label: 'Process' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>MSME (Udyam) registration classifies your business as a Micro, Small or Medium Enterprise based on investment and turnover, unlocking a range of government benefits designed to support smaller businesses.</p><p>It's one of the fastest registrations we handle — often same-day once documents are ready.</p>` },
      who: {
        heading: "Who should get this registration", content: `<p>Any and every type of business enterprise — from private limited company, public limited company, sole proprietorship, partnership firm to limited liability partnership, Hindu Undivided Family, one-person company, co-operative society and association of persons — can obtain MSME/Udyam Registration.</p>`
      },
      benefits: {
        heading: 'Advantages of MSME registration',
        content: `<ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>Subsidies</b> — the Government of India provides various incentives &amp; subsidies to the MSME sector; only registered entities are eligible for government subsidies.</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>Bank loans</b> — the MSME sector gets ease in applying for government micro business loans and other related schemes, with collateral-free loans and reduced interest rates from banks.</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>Financial support</b> — the government provides financial support for participating in foreign expos to showcase products of registered entities.</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>Govt. tenders</b> — MSMEs get exemptions while applying for government tenders and are even given preference in allocation of government tenders.</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>ISO registration</b> — the government provides reimbursement of the consultation fee paid for obtaining ISO registration.</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>License</b> — various relaxations are provided to MSME while obtaining registrations under different laws and approvals to obtain licenses.</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>Waiver</b> — stamp duty and registration fees are waived in many cases for MSME entities, with subsidy for patent registration, NSIC performance and credit ratings.</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>Payments</b> — the government provides protection against delayed payments to MSME; companies must intimate ROC where payment outstanding to MSME suppliers exceeds 45 days, with a faster dispute-resolution mechanism for MSME.</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> <b>Reservation</b> — various products are reserved for exclusive manufacturing by MSME, and can only be procured from MSME.</li></ul>`
      },
      whyregister: {
        heading: 'Why should you get this registration?',
        content: `<p>MSME/Udyam Registration comes with numerous benefits and various relaxations to take away some burden from growing enterprises, and all eligible enterprises should get themselves registered under MSME/Udyam.</p>`
      },
      classification: {
        heading: 'Your organisation may fall in one of the classifications depending on the below criteria',
        tableHtml: `<table class="tbl"><tr><th>Classification</th><th>Enterprise</th></tr><tr><td>Micro Enterprise</td><td>Up to ₹1 crore of investment in plant &amp; machinery or equipment AND up to ₹5 crore of turnover</td></tr><tr><td>Small Enterprise</td><td>More than ₹1 crore but up to ₹10 crores of investment in plant &amp; machinery AND more than ₹5 crore but up to ₹50 crores of turnover</td></tr><tr><td>Medium Enterprise</td><td>More than ₹10 crore but up to ₹50 crores of investment in plant &amp; machinery AND more than ₹50 crore but up to ₹250 crores of turnover</td></tr></table><h3>Re-registration of existing enterprises</h3><ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> All existing enterprises registered under EM-Part-II or UAM shall register again on the Udyam Registration portal on or after 1 July 2020 till 31 March 2021.</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> All enterprises registered till 30 June 2020 shall be re-classified in accordance with this notification.</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Existing enterprises registered prior to 30 June 2020 shall continue to be valid only for a period up to 31 March 2021.</li></ul><h3>Update of information &amp; transition period in classification</h3><ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> An enterprise having a Udyam Registration Number shall update its information online on the portal, including details of the ITR and GST return for the previous financial year, and such other information as required, on a self-declaration basis.</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Failure to update the relevant information within the prescribed period on the online Udyam Registration portal will render the enterprise liable for suspension of its status.</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Based on the information furnished or gathered from Government sources, including ITR or GST return, the classification of the enterprise will be updated and a communication will be sent to the enterprise about the change in status, if any.</li></ul>`
      },
      included: {
        heading: 'How Startup Movers can help you',
        items: [
          'Obtaining MSME Registration Certificate',
          'Availment of various benefits provided to MSME',
        ]
      },
      documents: {
        heading: 'Documents / details required for MSME registration',
        content: `<h3>Copy of Aadhaar card</h3><ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> In case of Proprietorship — Aadhaar card of the individual</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> In case of Partnership Firm — Aadhaar card of the managing partner</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> In case of HUF — Aadhaar card of the Karta</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> In case of Company/LLP/Cooperative Society/Society/Trust — GSTIN and PAN of the organisation and Aadhaar card of the authorised signatory</li></ul><ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Mobile number &amp; email ID</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> PAN number</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Bank account details &amp; IFSC code</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Business information — partnership deed/MOA &amp; AOA, and a note on business activity of the entity</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Copy of sale &amp; purchase bill</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Details of number of employees</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Details of investment in plant &amp; machinery</li></ul>`
      },
      process: {
        heading: 'Process of MSME registration — there is an online process for MSME registration', steps: [
          { title: 'Register on portal', body: 'The application is filed on the Udyam Registration portal.' },
          { title: 'Fill application form', body: 'Basic business details are filled on the portal for MSME registration.' },
          { title: 'Submission of application', body: 'After filling the necessary details, the application is submitted on the portal.' },
          { title: 'Issuance of certificate', body: 'On successful verification, your MSME/Udyam Registration Certificate is issued.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', intro: 'MSME registration is one of the simplest filings we offer.', rows: [
          ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
          ['Government fee', 'No government fee for Udyam registration'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'How long does MSME registration take?', a: "Usually same-day, since it's a self-declared, Aadhaar-verified online process." },
          { q: 'Do I need to renew it?', a: 'No renewal is required, though you should update your Udyam details if your turnover or investment changes classification.' },
          { q: 'Can a company also register, or is it only for proprietorships?', a: 'Any eligible entity — proprietorship, partnership, LLP or company — can register under Udyam.' },
        ]
      }
    },
    related: [
      { href: '/services/gst-registration', label: 'GST Registration', note: 'Often filed alongside MSME.' },
      { href: '/services/private-limited-company-registration', label: 'Private Limited Company', note: "Register your entity first if you haven't." },
      { href: '/pricing', label: 'Pricing', note: 'See how our pricing works.' },
    ]
  },

  'fssai-registration': {
    title: 'FSSAI Registration & Licence',
    metaTitle: 'FSSAI Registration & Licence — LauncherDesk',
    metaDesc: 'Get your FSSAI food licence — mandatory for any business that manufactures, stores, sells or handles food in India.',
    eyebrow: 'Registrations & compliance',
    crumbCategory: 'Registrations & compliance',
    lead: "Mandatory for any food business — from a home kitchen to a restaurant chain. We identify the right licence tier and file it for you.",
    priceCard: { label: 'Starts from', price: 'Custom quote', sub: '' },
    helpCard: { title: 'Need help deciding?', body: 'Get a personalised recommendation based on your business.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" }, { href: '#benefits', label: 'Benefits' },
      { href: '#whyregister', label: 'Why register' }, { href: '#included', label: 'How we help' },
      { href: '#documents', label: 'Documents' }, { href: '#process', label: 'Process' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>The FSSAI licence is a legal requirement for anyone manufacturing, processing, storing, distributing or selling food, including cloud kitchens and home-based food businesses. The tier you need (Basic, State, or Central) depends on your turnover and scale.</p>` },
      who: { heading: "Who should get this registration", items: ['FSSAI registration is required for everyone starting a food business.', 'It is required for all petty food business operators.'] },
      benefits: {
        heading: 'Advantages of FSSAI registration',
        items: [
          '<b>Ensures quality</b> — it is regarded as a permit which ensures good quality of food in the business.',
          '<b>Customer base</b> — it helps to increase the customer base by giving surety about the quality of food offered; consumers have taken food standards more seriously since the Maggi controversy.',
          '<b>Marketing</b> — it can be used for publicity of a food business\'s superior quality over others, giving an edge over competitors, i.e. food operators operating without a licence.',
          '<b>Validity</b> — the FSSAI logo is seen as a mark of validity; the FSSAI licence helps establish the reputation and qualification of the business.',
          '<b>Expansion of business</b> — businesses can be easily expanded into other areas or outlets using the FSSAI licence.',
          '<b>Bank loans</b> — an FSSAI licence makes it easier for a food operator to get bank loans.',
        ]
      },
      whyregister: {
        heading: 'Why should you get this registration?',
        content: `<p>FSSAI registration offers numerous benefits. It is a legal mandate for all kinds of food businesses, and if they are caught operating a food business without an FSSAI licence, heavy penalties are attracted.</p>`
      },
      included: {
        heading: 'How Startup Movers can help you',
        items: [
          'Eligibility checking',
          'Filing of application',
          'Payment of government fee',
          'Follow up with authorities',
          'Obtaining licence',
        ]
      },
      documents: {
        heading: 'Documents / details required for FSSAI registration',
        content: `<ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Declaration Form</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Authority Letter</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Copy of Purchase Deed (in case of owned property); Copy of Rent Agreement (in case of rented property)</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Food Safety Management System Plan/Certificate</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Copy of Utility Bill (electricity/telephone bill of the premises)</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Copy of Aadhaar Card/Voter ID Card of Proprietor/Partners/Directors</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Nomination Form of persons by the company, along with a copy of the Board Resolution</li></ul><h3>Additional documents required by the manufacturer</h3><ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Details of employees</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Blueprint/layout plan of the processing unit</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> List of equipment and machinery</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> List of food category desired to be manufactured</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Pesticide residues report of water</li></ul>`
      },
      process: {
        heading: 'Process of FSSAI registration', steps: [
          { title: 'Filing of Form A', body: 'Visit the FSSAI website and fill Form A.' },
          { title: 'Payment of fee', body: 'Pay the applicable government fee for your licence tier.' },
          { title: 'Filing of Form B', body: 'Submit Form B along with the required supporting documents.' },
          { title: 'Follow up with authorities', body: 'We track your application and respond to any queries raised by the department.' },
          { title: 'Issuance of certificate', body: 'On approval, your FSSAI licence/certificate is issued.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', intro: 'Pricing depends on the licence tier and validity period you choose.', rows: [
          ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
          ['Government fee', 'FSSAI fee — varies by tier and licence validity (1–5 years)'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Do home bakers need an FSSAI licence?', a: 'Yes — any food business, including home-based ones selling to the public, needs at least a Basic FSSAI registration.' },
          { q: 'How long is the licence valid?', a: 'Between 1 and 5 years, depending on the period you apply for and pay for.' },
          { q: "What's the difference between Basic, State and Central licences?", a: "It's based on annual turnover — Basic for smaller businesses, State and Central for larger scale or multi-state operations. We'll confirm which applies to you." },
        ]
      }
    },
    related: [
      { href: '/services/private-limited-company-registration', label: 'Private Limited Company', note: 'Register your entity before applying.' },
      { href: '/services/gst-registration', label: 'GST Registration', note: 'Usually required alongside FSSAI.' },
      { href: '/business-types/restaurant', label: 'Restaurant & Food businesses', note: 'See the full journey.' },
    ]
  },

  'trademark-registration': {
    title: 'Trademark Registration',
    metaTitle: 'Trademark Registration — LauncherDesk',
    metaDesc: "Protect your brand name and logo with LauncherDesk's trademark registration service — search, filing, classes, timelines and transparent pricing.",
    eyebrow: 'Protect & grow',
    crumbCategory: 'Legal & IP',
    lead: "Your brand name is one of your most valuable assets — and one of the easiest to lose if you don't register it. We search, file and track your trademark through to registration.",
    priceCard: { label: 'Total (incl. GST)', price: '₹4,720', sub: 'Professional fee ₹4,000 + GST' },
    helpCard: { title: "Not sure your name is free?", body: "We run a proper search before you file anything." },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: 'Who can register' }, { href: '#benefits', label: 'Advantages' },
      { href: '#whyregister', label: 'Why register' }, { href: '#howwehelp', label: 'How we help' }, { href: '#classes', label: 'Trademark classes' },
      { href: '#documents', label: 'Documents' }, { href: '#process', label: 'Process' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>A registered trademark gives you exclusive legal rights to your brand name, logo or tagline within its class — and the ability to act against anyone who copies it. We start every engagement with a proper search so you're not filing on a name you can't defend or won't get.</p>` },
      who: {
        heading: 'Who can register',
        items: [
          'A sole proprietor',
          'Partnership firm',
          'Limited Liability Partnership',
          'Any Company',
          'Trust or Society',
          'Any Body Corporate',
        ]
      },
      benefits: {
        heading: 'Advantages of trademark registration',
        items: [
          '<b>Guards the commercial goodwill</b> — a registered owner has the right to create, establish and protect the goodwill of their products or services, and can stop other traders from using the trademark unlawfully.',
          '<b>Legal protection</b> — a registered trademark gives its owner a legal right in case of infringement; not registering may leave the owner without any remedy.',
          '<b>Advertises goods &amp; services</b> — registering a trademark creates a face for the company and its goods and services, helping distinguish the brand and increase brand value.',
          '<b>Creation of an asset</b> — trademark registration creates an intangible asset that can be sold, assigned, franchised or commercially contracted for benefit.',
          '<b>Business expansion</b> — a trademark establishes a connection between customers and your products, helping you build a loyal customer base.',
          '<b>Product differentiation</b> — trademark registrations are distinct to the goods or services they represent, enabling differentiation from competitors\' products.',
        ]
      },
      whyregister: {
        heading: 'Why should you get your trademark registered?',
        items: [
          '<b>Legal ownership of your brand</b> — you need to register your trademark to have solid legal ownership of your brand.',
          '<b>Freedom to operate</b> — if you don\'t register your trademark, it\'s possible (or even likely) that somebody in another country will register a similar name.',
          '<b>Put others on notice of your rights</b> — registering your trademark reduces the likelihood of somebody infringing your rights.',
          '<b>Increase the value of your brand</b> — registered trademarks increase the value of your brand.',
          '<b>Investors value protected IP</b> — investors value companies more highly when they\'ve protected their intellectual property.',
          '<b>Leveraging revenue resources</b> — trademark protection is essential for licensing.',
        ]
      },
      howwehelp: {
        heading: 'How LauncherDesk can help you',
        items: [
          'Search reports',
          'Drafting and filing of trademark application',
          'Dealing with trademark objection and opposition',
        ]
      },
      classes: { heading: 'Trademark classes', content: `<p>Trademarks are registered under one or more of 45 classes based on your goods or services — for example Class 25 for clothing, Class 35 for retail and advertising, Class 42 for software. We identify the right class(es) for your business as part of the search.</p>` },
      documents: {
        heading: 'Documents / details required for trademark registration',
        content: `<ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Nature of business of the applicant</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> The trademark to be applied for — i.e. wordmark, device mark, etc. — along with the logo</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Translation or transliteration of the trademark, if in any language other than English</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> User detail of the trademark — i.e. proposed to be used, or the date of first use (dd/mm/yyyy) if already commercially used</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Brochure of the entity</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Legal status of the applicant — i.e. proprietorship, partnership, individual, HUF, or body corporate</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Name and address of the proprietor/partnership, individual, HUF, or other body corporate</li></ul><h3>Charter documents</h3><ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> For a company — Certificate of Incorporation, MOA and AOA</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> For an LLP — details of partners along with the LLP Agreement</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> For a partnership — the Partnership Deed</li></ul>`
      },
      process: {
        heading: 'Process of issue of trademark',
        steps: [
          { title: 'Collection of basic information', body: 'We collect the details needed to identify the appropriate class for your mark.' },
          { title: 'Trademark search & availability check', body: 'We run a search and prepare a search report for your review, to reduce the chances of the application being objected to, opposed or refused.' },
          { title: 'Filing of trademark application', body: 'We prepare and file the application under the correct class(es).' },
          { title: 'Publication', body: 'The mark is published in the Trademark Journal for the opposition period.' },
          { title: 'Receipt of registration certificate', body: 'If unopposed, the registration certificate is issued.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', 'Search, drafting, filing and objection handling'],
          ['Government fee', 'Per class — lower for individuals/startups/MSMEs'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'How long does registration take?', a: "Typically 8–18 months end to end if unopposed, though you can start using the ™ symbol as soon as you file." },
          { q: 'What if someone opposes my mark?', a: 'We handle the response on your behalf during the opposition period — this is included in ongoing support, not a separate scramble.' },
          { q: 'Can I register a logo and name together?', a: "They're usually registered as separate marks for stronger protection, though it depends on your brand strategy — we'll advise on your case." },
        ]
      }
    },
    related: [
      { href: '/services/private-limited-company-registration', label: 'Private Limited Company', note: 'Register the entity that will own the mark.' },
      { href: '/services/digital-marketing', label: 'Digital Marketing', note: "Build the brand you're protecting." },
      { href: '/business-types/ecommerce', label: 'E-commerce businesses', note: 'Where trademark protection matters most.' },
    ]
  },

  'trademark-objection': {
    title: 'Trademark Objection Response',
    metaTitle: 'Trademark Objection Response — LauncherDesk',
    metaDesc: 'Received a trademark objection? LauncherDesk helps you draft and file a strong response to protect your brand application.',
    eyebrow: 'IPR & Trademark',
    crumbCategory: 'IPR & Trademark',
    lead: 'If your trademark application has been objected to by the Registrar, you need to file a well-drafted response within 30 days. We handle the entire objection response process.',
    priceCard: { label: 'Total (incl. GST)', price: '₹9,440', sub: 'Professional fee ₹8,000 + GST' },
    helpCard: { title: 'Got an objection notice?', body: 'Share the examination report with us and we will assess your case.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#process', label: 'Process' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>A trademark objection is raised by the Examiner when they find issues with your application — such as similarity to existing marks, lack of distinctiveness or incorrect classification. You have 30 days to file a response. A well-crafted response backed by evidence significantly increases your chances of acceptance.</p><p>LauncherDesk reviews the objection, drafts a legally sound response and files it on your behalf — so your brand stays protected.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Businesses that received a trademark examination report with objections',
          'Applicants whose trademark was marked as "Objected" on the IP India portal',
          'Brands whose marks were challenged for similarity or descriptiveness',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Review objection report', body: 'We analyse the examination report and identify the grounds of objection.' },
          { title: 'Draft reply with evidence', body: 'Our IP team drafts a strong response citing case law, distinctiveness arguments and supporting evidence.' },
          { title: 'File the response', body: 'The reply is filed with the Trademark Registry within the statutory deadline.' },
          { title: 'Track outcome', body: 'We follow up and keep you updated on the status until the matter is resolved.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', 'From ₹4,999 — includes review, drafting and filing'],
          ['Government fee', 'Nil for objection response'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'What happens if I don\'t reply to the objection?', a: 'If you don\'t respond within 30 days, the Registrar may abandon your trademark application.' },
          { q: 'What are common grounds for objection?', a: 'Similarity with existing marks, descriptive nature of the mark, incorrect classification or incomplete application details.' },
          { q: 'Can an objected trademark still get registered?', a: 'Yes — many objected trademarks get accepted after a well-drafted response. The key is providing the right legal arguments and evidence.' },
        ]
      }
    },
    related: [
      { href: '/services/trademark-registration', label: 'Trademark Registration', note: 'Apply for a new trademark.' },
      { href: '/services/ip-trademark-management', label: 'IP Management', note: 'Ongoing portfolio protection.' },
    ]
  },

  'patent-registration': {
    title: 'Patent Registration',
    metaTitle: 'Patent Registration India — LauncherDesk',
    metaDesc: 'File a patent application in India with LauncherDesk. Protect your invention with a provisional or complete patent filing.',
    eyebrow: 'IPR & Trademark',
    crumbCategory: 'IPR & Trademark',
    lead: 'Protect your invention with a legally filed patent. We handle patent search, drafting, filing and prosecution — from provisional application to grant.',
    priceCard: { label: 'Starts from', price: 'Custom quote', sub: 'Depends on requirement' },
    helpCard: { title: 'Not sure if your idea is patentable?', body: 'Share your invention concept and we will assess patentability.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>A patent gives you exclusive rights to your invention for 20 years — preventing others from making, using or selling it without your permission. In India, patents are granted by the Indian Patent Office under the Patents Act, 1970.</p><p>LauncherDesk works with registered patent agents to handle the entire process — from prior art search and drafting to filing and prosecution.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Inventors and innovators with a new product, process or technology',
          'Startups building proprietary technology or algorithms',
          'Manufacturers with unique production methods or designs',
          'R&D teams that need IP protection before publishing or licensing',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Patentability assessment and prior art search',
          'Drafting of patent specification (provisional or complete)',
          'Filing with the Indian Patent Office',
          'Response to examination reports and objections',
          'Prosecution support through to grant',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Initial consultation', body: 'We understand your invention, assess patentability and recommend the right filing strategy.' },
          { title: 'Prior art search', body: 'Search existing patents and publications to check novelty and inventive step.' },
          { title: 'Drafting', body: 'Our patent agents draft the specification, claims and drawings.' },
          { title: 'Filing', body: 'Application filed with the Indian Patent Office — provisional or complete.' },
          { title: 'Examination & prosecution', body: 'We respond to examination reports and office actions on your behalf.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', 'From ₹15,999 — includes search, drafting and filing'],
          ['Government fee', 'Varies by applicant type (individual, startup, company)'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'How long does patent registration take?', a: 'The process typically takes 2–5 years from filing to grant, though a provisional application gives you protection from the filing date.' },
          { q: 'What can be patented in India?', a: 'Any new invention involving a product or process that is novel, non-obvious and has industrial application. Software per se is not patentable, but software-driven inventions may be.' },
          { q: 'What is the difference between provisional and complete specification?', a: 'A provisional application establishes your priority date and gives you 12 months to file the complete specification with full claims and details.' },
        ]
      }
    },
    related: [
      { href: '/services/trademark-registration', label: 'Trademark Registration', note: 'Protect your brand alongside your invention.' },
      { href: '/services/copyright-registration', label: 'Copyright Registration', note: 'Protect the creative expression of your work.' },
    ]
  },

  'copyright-registration': {
    title: 'Copyright Registration',
    metaTitle: 'Copyright Registration India — LauncherDesk',
    metaDesc: 'Register your copyright in India. Protect literary, artistic, musical works, software code and creative content with LauncherDesk.',
    eyebrow: 'IPR & Trademark',
    crumbCategory: 'IPR & Trademark',
    lead: 'Copyright registration gives you legal proof of ownership over your creative works — books, music, art, software, films and more. We handle the complete filing process.',
    priceCard: { label: 'Starts from', price: 'Custom quote', sub: 'Depends on requirement' },
    helpCard: { title: 'Need to protect your creative work?', body: 'Tell us what you have created and we will guide you.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Copyright is an automatic right that comes into existence when you create an original work — but registration provides legal evidence of ownership that is essential for enforcement. In India, copyright is registered under the Copyright Act, 1957.</p><p>LauncherDesk handles the full copyright registration process including documentation, filing and follow-up with the Copyright Office.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Authors, writers and content creators',
          'Musicians, composers and filmmakers',
          'Software developers and SaaS companies',
          'Graphic designers, artists and photographers',
          'Businesses that produce original marketing content or training material',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Review and classification of the work',
          'Preparation of application and statement of particulars',
          'Filing with the Copyright Office',
          'Response to any discrepancies raised during examination',
          'Certificate of registration on approval',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Share your work', body: 'You provide the creative work and details about authorship and ownership.' },
          { title: 'Documentation', body: 'We prepare the copyright application and supporting documents.' },
          { title: 'Filing', body: 'Application filed with the Copyright Office.' },
          { title: 'Examination period', body: '30-day mandatory waiting period for objections, then examination.' },
          { title: 'Registration', body: 'Copyright certificate issued upon approval.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', 'From ₹5,999 — includes documentation and filing'],
          ['Government fee', '₹500 per work (literary/artistic) to ₹5,000 (cinematographic)'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Is copyright registration mandatory?', a: 'No — copyright exists automatically on creation. But registration provides legal proof of ownership which is essential if you ever need to enforce your rights.' },
          { q: 'How long does copyright protection last?', a: 'In India, copyright lasts for the lifetime of the author plus 60 years. For anonymous works and government works, the term is 60 years from publication.' },
          { q: 'Can I copyright my website content?', a: 'Yes — original website content, code, designs and text can all be copyrighted.' },
        ]
      }
    },
    related: [
      { href: '/services/trademark-registration', label: 'Trademark Registration', note: 'Protect your brand name too.' },
      { href: '/services/patent-registration', label: 'Patent Registration', note: 'For inventions and processes.' },
    ]
  },

  'ip-trademark-management': {
    title: 'IP & Trademark Management',
    metaTitle: 'IP & Trademark Portfolio Management — LauncherDesk',
    metaDesc: 'Ongoing intellectual property management — trademark renewals, monitoring, enforcement and portfolio strategy with LauncherDesk.',
    eyebrow: 'IPR & Trademark',
    crumbCategory: 'IPR & Trademark',
    lead: 'Your intellectual property needs ongoing management — renewals, monitoring for infringement, enforcement and portfolio strategy. We keep your IP assets protected and up to date.',
    priceCard: { label: 'Starts from', price: '₹1,999*', sub: 'Per class + Govt. fees' },
    helpCard: { title: 'Have multiple trademarks to manage?', body: 'Tell us about your portfolio and we will create a management plan.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Filing a trademark or patent is only the beginning. IP assets need active management — timely renewals, infringement monitoring, opposition responses and strategic portfolio decisions. Missing a renewal deadline can void your protection entirely.</p><p>LauncherDesk provides ongoing IP management for businesses with one or more registered trademarks, patents or copyrights — so nothing slips through.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Businesses with registered trademarks that need renewal tracking',
          'Companies with multiple IP assets across different classes or jurisdictions',
          'Brands experiencing infringement or counterfeit issues',
          'Growing companies that need IP strategy alongside business growth',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Trademark renewal reminders and filing',
          'IP portfolio audit and strategic review',
          'Infringement monitoring and cease-and-desist notices',
          'Opposition filings against conflicting marks',
          'Annual compliance and status reporting',
          'Advisory on new filings and international expansion',
        ]
      },
      process: {
        heading: 'How it works', steps: [
          { title: 'Portfolio audit', body: 'We review all your existing IP assets — trademarks, patents, copyrights — and their current status.' },
          { title: 'Management plan', body: 'We create a renewal calendar, monitoring plan and enforcement strategy.' },
          { title: 'Ongoing management', body: 'Renewals filed on time, infringements flagged, and new filings recommended as your business grows.' },
          { title: 'Quarterly review', body: 'Regular reporting on portfolio status and strategic recommendations.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', 'Custom quote based on portfolio size and services required'],
          ['Government fees', 'Renewal and filing fees as applicable, shown separately'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'When does a trademark need to be renewed?', a: 'In India, a trademark is valid for 10 years from the date of application and must be renewed before expiry. We track this and file renewal well in advance.' },
          { q: 'What happens if someone copies my trademark?', a: 'We can issue cease-and-desist notices, file opposition proceedings and support legal enforcement action against infringers.' },
          { q: 'Do I need this if I only have one trademark?', a: 'Even a single trademark needs renewal tracking and monitoring. Our service scales from one mark to hundreds.' },
        ]
      }
    },
    related: [
      { href: '/services/trademark-registration', label: 'Trademark Registration', note: 'Register a new trademark.' },
      { href: '/services/trademark-objection', label: 'Trademark Objection', note: 'Handle objections to your application.' },
    ]
  },

  'roc-compliance': {
    title: 'ROC & Annual Compliance',
    metaTitle: 'ROC & Annual Compliance — LauncherDesk',
    metaDesc: 'Stay penalty-free with proactive ROC annual filing, board resolutions and statutory compliance for your Private Limited Company or LLP.',
    eyebrow: 'Registrations & compliance',
    crumbCategory: 'Registrations & compliance',
    lead: "Every registered company and LLP has mandatory annual filings — miss them and penalties compound daily. We track deadlines and file on your behalf.",
    priceCard: { label: 'Total (incl. GST)', price: '₹17,700', sub: 'Professional fee ₹15,000 + GST' },
    helpCard: { title: 'Need help deciding?', body: 'Get a personalised recommendation based on your business.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" }, { href: '#benefits', label: 'Benefits' },
      { href: '#documents', label: 'Documents' }, { href: '#process', label: 'Process' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>Registrar of Companies (ROC) compliance covers the mandatory annual filings every Private Limited Company and LLP must complete — annual returns, financial statements, board resolutions and more. Penalties for missing these accrue per day, so proactive tracking matters.</p>` },
      who: { heading: "Who it's for", items: ['Every registered Private Limited Company', 'Every registered LLP', "Founders who've been managing this manually and want it off their plate"] },
      benefits: { heading: 'Key benefits', items: ["<b>Penalty-free</b> — nothing gets missed once it's on our tracker.", '<b>Good standing</b> — keeps your company eligible for loans, tenders and funding rounds.', '<b>One less thing to remember</b> — we notify you ahead of every deadline.'] },
      documents: { heading: 'Documents / information required', items: ['Financial statements for the year', 'Board resolutions and meeting minutes', 'Basic company/LLP registration details', 'Digital Signature Certificate for filing'] },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Compliance calendar setup', body: 'We map every filing your entity is subject to across the year.' },
          { title: 'Document collection', body: 'We collect financials and resolutions ahead of each deadline.' },
          { title: 'Filing', body: 'We prepare and file annual returns, financial statements and event-based forms.' },
          { title: 'Confirmation', body: 'You get proof of filing and a clean compliance record.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', intro: 'Pricing depends on your entity type and filing volume for the year.', rows: [
          ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
          ['Government fee', 'MCA filing fees — vary by form and any delay'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'What happens if I miss a filing?', a: 'Penalties accrue per day of delay and can become substantial — plus your company risks being marked non-compliant or struck off in severe cases.' },
          { q: 'Do inactive companies still need to file?', a: 'Yes — even dormant companies have minimum annual filing obligations until formally closed.' },
          { q: "Can you take over mid-year if I've fallen behind?", a: 'Yes, we regularly help companies catch up on backlogged filings alongside going-forward compliance.' },
        ]
      }
    },
    related: [
      { href: '/services/accounting', label: 'Accounting', note: 'Keep books ready for annual filings.' },
      { href: '/services/private-limited-company-registration', label: 'Private Limited Company', note: 'See what triggered these obligations.' },
      { href: '/solutions/compliance-management', label: 'Compliance Management', note: 'The full compliance solution.' },
    ]
  },

  'accounting': {
    title: 'Accounting & Bookkeeping',
    metaTitle: 'Accounting & Bookkeeping — LauncherDesk',
    metaDesc: 'Outsourced accounting and bookkeeping — accurate books, financial statements and tax-ready records, handled monthly.',
    eyebrow: 'Manage your business',
    crumbCategory: 'Manage your business',
    lead: "Clean, up-to-date books aren't optional — they're what your GST returns, ROC filings and investor conversations all depend on.",
    priceCard: { label: 'Starts from', price: 'Custom quote', sub: 'Depends on requirement' },
    helpCard: { title: 'Need help deciding?', body: 'Get a personalised recommendation based on your business.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" }, { href: '#benefits', label: 'Benefits' },
      { href: '#documents', label: 'Documents' }, { href: '#process', label: 'Process' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>LauncherDesk's accounting service keeps your books current every month — not scrambled together once a year. That means your GST returns, tax filings and ROC compliance are always backed by accurate numbers, and you can pull a financial snapshot whenever you need one.</p>` },
      who: { heading: "Who it's for", items: ['Any registered business that needs monthly bookkeeping', 'Founders who currently manage accounts in spreadsheets or not at all', 'Businesses preparing for fundraising, where clean books matter'] },
      benefits: { heading: 'Key benefits', items: ['<b>Always tax-ready</b> — books stay current, not reconstructed at deadline time.', '<b>Real visibility</b> — know your numbers, not just guess at them.', '<b>Audit-ready</b> — organised records save time and stress at year-end.'] },
      documents: { heading: 'Documents / information required', items: ['Bank statements for the period', 'Sales and purchase invoices', 'Expense receipts', 'Payroll records, if applicable'] },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Onboarding & chart of accounts', body: 'We set up your books structure based on your business.' },
          { title: 'Monthly bookkeeping', body: 'Transactions are recorded and reconciled every month.' },
          { title: 'Financial statements', body: 'We prepare P&L, balance sheet and cash flow statements.' },
          { title: 'Review call', body: 'A short monthly or quarterly review so you understand your numbers.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', intro: 'Pricing scales with transaction volume — we quote after understanding your business.', rows: [
          ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
          ['Government fee', 'Not applicable — this is a professional service'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Do you also file my taxes?', a: 'Accounting and tax filing are connected but separately scoped — we\'ll bundle them if you need both.' },
          { q: 'Can you clean up a backlog of messy books?', a: "Yes, catch-up bookkeeping is one of our most common starting points." },
          { q: 'What software do you use?', a: "We work with standard cloud accounting tools and can adapt to what you're already using." },
        ]
      }
    },
    related: [
      { href: '/services/payroll', label: 'Payroll', note: 'Add payroll to your accounting scope.' },
      { href: '/services/roc-compliance', label: 'ROC Compliance', note: 'Your books feed directly into these filings.' },
      { href: '/services/gst-registration', label: 'GST Registration', note: 'Returns depend on accurate books.' },
    ]
  },

  'payroll': {
    title: 'Payroll Management',
    metaTitle: 'Payroll Management — LauncherDesk',
    metaDesc: 'Salary processing, TDS, PF and ESI compliance handled monthly — accurate payroll without an in-house HR/finance team.',
    eyebrow: 'Manage your business',
    crumbCategory: 'Manage your business',
    lead: "From your first hire onward, payroll compliance gets complex fast. We handle salary processing and the statutory filings that come with it.",
    priceCard: { label: 'Starts from', price: 'Custom quote', sub: '' },
    helpCard: { title: 'Need help deciding?', body: 'Get a personalised recommendation based on your business.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" }, { href: '#benefits', label: 'Benefits' },
      { href: '#documents', label: 'Documents' }, { href: '#process', label: 'Process' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>Payroll isn't just paying salaries — it's TDS deduction, PF and ESI contributions, professional tax and payslip generation, all on strict monthly deadlines. LauncherDesk runs this end to end so employment compliance never becomes a liability.</p>` },
      who: { heading: "Who it's for", items: ['Businesses making their first hire', 'Growing teams that have outgrown manual salary spreadsheets', 'Founders who want statutory compliance handled correctly from day one'] },
      benefits: { heading: 'Key benefits', items: ['<b>Accurate, on-time salaries</b> every month.', '<b>Statutory compliance</b> — PF, ESI, TDS and professional tax handled correctly.', '<b>Payslips & records</b> generated automatically for every employee.'] },
      documents: { heading: 'Documents / information required', items: ['Employee master data (salary structure, PAN, bank details)', 'Attendance and leave records', 'PF/ESI registration details, if already registered', 'Prior payroll history, if switching providers'] },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Payroll setup', body: 'We configure salary structures and statutory registrations (PF/ESI) if not already in place.' },
          { title: 'Monthly processing', body: 'Salaries, deductions and contributions are calculated each cycle.' },
          { title: 'Statutory filing', body: 'PF, ESI and TDS payments and returns are filed on time.' },
          { title: 'Payslips & reports', body: 'Employees get payslips; you get compliance reports.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', intro: "Pricing is typically per employee, per month — we'll quote based on headcount.", rows: [
          ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
          ['Government fee', 'PF/ESI/PT statutory contributions (pass-through, not a LauncherDesk fee)'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'At what headcount do PF/ESI become mandatory?', a: "PF generally applies once you cross 20 employees; ESI thresholds vary by state and wage level — we'll confirm for your situation." },
          { q: 'Can you run payroll for a single employee?', a: "Yes — we support businesses from their very first hire." },
          { q: 'Do you handle full-and-final settlements?', a: 'Yes, exits and F&F settlements are part of ongoing payroll support.' },
        ]
      }
    },
    related: [
      { href: '/services/accounting', label: 'Accounting', note: 'Payroll feeds directly into your books.' },
      { href: '/services/roc-compliance', label: 'ROC Compliance', note: 'Keep your entity compliant as you hire.' },
      { href: '/solutions/business-growth', label: 'Business Growth', note: 'Scaling your team and operations.' },
    ]
  },

  'business-automation': {
    title: 'Business Automation',
    metaTitle: 'Business Automation — LauncherDesk',
    metaDesc: 'Website, CRM and workflow automation that removes manual busywork as your business scales.',
    eyebrow: 'Protect & grow',
    crumbCategory: 'Protect & grow',
    lead: "As you grow, manual processes start costing more than they save. We set up the systems — website, CRM and automation — that scale with you.",
    priceCard: { label: 'Starts from', price: 'Custom quote', sub: '' },
    helpCard: { title: 'Need help deciding?', body: 'Get a personalised recommendation based on your business.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" }, { href: '#benefits', label: 'Benefits' },
      { href: '#documents', label: 'Documents' }, { href: '#process', label: 'Process' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>Business automation covers the operational backbone most growing businesses eventually need: a proper website, a CRM to track leads and customers, and automated workflows that remove repetitive manual work — invoicing, follow-ups, reporting and more.</p>` },
      who: { heading: "Who it's for", items: ['Businesses still running operations out of spreadsheets and WhatsApp', 'Teams spending too much time on repetitive manual tasks', 'Founders ready to formalise sales, support or operations workflows'] },
      benefits: { heading: 'Key benefits', items: ['<b>Time back</b> — automate the repetitive work eating into your week.', '<b>Fewer dropped leads</b> — a CRM means nothing falls through the cracks.', '<b>Scalable systems</b> — built to handle growth, not just today\'s volume.'] },
      documents: { heading: 'Documents / information required', items: ['Overview of your current tools and processes', 'Access to relevant existing systems, where applicable', 'Business goals and priority workflows to automate'] },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Process audit', body: 'We map your current workflows and identify the highest-impact automations.' },
          { title: 'System setup', body: 'We build or configure your website, CRM and automation tools.' },
          { title: 'Integration', body: 'Systems are connected so data flows without manual re-entry.' },
          { title: 'Training & handover', body: 'Your team is trained to use and maintain the new systems.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', intro: "Scope varies widely — we quote after understanding what you're trying to automate.", rows: [
          ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
          ['Government fee', 'Not applicable — this is a professional/technology service'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Do I need a developer on my team to maintain this?', a: "No — we build with maintainable, no-code-friendly tools wherever possible, and can continue supporting you afterward." },
          { q: 'Can you work with our existing website or CRM?', a: "Yes, we often integrate with and improve existing systems rather than replacing everything." },
          { q: 'How long does a typical automation project take?', a: "It depends on scope — simple workflow automation can take days; a full website + CRM buildout takes longer. We'll give you a timeline upfront." },
        ]
      }
    },
    related: [
      { href: '/services/digital-marketing', label: 'Digital Marketing', note: 'Pairs well with a new website and CRM.' },
      { href: '/solutions/automation', label: 'Automation Solutions', note: 'See the broader automation solution.' },
      { href: '/business-types/technology', label: 'Technology / SaaS businesses', note: 'See the tech-specific journey.' },
    ]
  },

  'digital-marketing': {
    title: 'Digital Marketing & Branding',
    metaTitle: 'Digital Marketing & Branding — LauncherDesk',
    metaDesc: 'Website, branding and demand generation to help your business get found and grow — built alongside your legal and compliance foundation.',
    eyebrow: 'Protect & grow',
    crumbCategory: 'Protect & grow',
    lead: "Registration and compliance get you legally ready. Digital marketing gets you actually found — website, branding, and demand generation that fits your stage.",
    priceCard: { label: 'Starts from', price: 'Custom quote', sub: '' },
    helpCard: { title: 'Need help deciding?', body: 'Get a personalised recommendation based on your business.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" }, { href: '#benefits', label: 'Benefits' },
      { href: '#documents', label: 'Documents' }, { href: '#process', label: 'Process' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>Once the legal and compliance foundation is in place, growth is the next problem. Our digital marketing service covers website design, brand identity and demand generation — scoped to where your business actually is, not a one-size-fits-all package.</p>` },
      who: { heading: "Who it's for", items: ['New businesses that need a website and brand identity from scratch', 'Businesses with a website that isn\'t generating leads', 'Founders who want marketing handled by people who also understand their compliance stage'] },
      benefits: { heading: 'Key benefits', items: ['<b>A website that converts</b>, not just exists.', '<b>Consistent branding</b> across your website, social and marketing materials.', '<b>Lead generation</b> — campaigns built around your actual growth goals.'] },
      documents: { heading: 'Documents / information required', items: ['Any existing brand assets (logo, colours, prior materials)', 'Target customer and market details', 'Current website or marketing channels, if any'] },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Discovery', body: 'We understand your business, audience and growth goals.' },
          { title: 'Brand & website', body: 'We design or refresh your brand identity and build your website.' },
          { title: 'Launch campaigns', body: 'We set up demand-generation campaigns aligned to your goals.' },
          { title: 'Measure & iterate', body: "We track performance and refine what's working." },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', intro: "Scope varies from a single website build to ongoing campaign management — we quote after a discovery call.", rows: [
          ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
          ['Government fee', 'Not applicable — this is a professional/technology service'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Do you only work with new businesses?', a: "No — we work with existing businesses looking to refresh their brand or improve underperforming marketing just as often." },
          { q: 'Is website design a one-time project or ongoing?', a: "It can be either — a one-time build, or an ongoing relationship where we maintain and improve it over time." },
          { q: 'Can this be bundled with business automation?', a: "Yes, website, CRM and marketing are often scoped together for a connected growth stack." },
        ]
      }
    },
    related: [
      { href: '/services/business-automation', label: 'Business Automation', note: 'Pairs well with a new website and CRM.' },
      { href: '/services/trademark-registration', label: 'Trademark Registration', note: "Protect the brand you're building." },
      { href: '/solutions/business-growth', label: 'Business Growth', note: 'The full growth solution.' },
    ]
  },

  'seo-marketing': {
    title: 'SEO & Search Marketing',
    metaTitle: 'SEO & Search Marketing Services India | LauncherDesk',
    metaDesc: 'Organic search growth, keyword strategy, on-page SEO and content optimisation for Indian businesses. Get found on Google.',
    eyebrow: 'GROW — Marketing',
    crumbCategory: 'GROW',
    lead: 'Get found on Google by the people searching for exactly what you offer. We build and execute SEO strategies that drive organic traffic and qualified leads.',
    priceCard: { label: 'Monthly retainer from', price: '₹14,999/month', sub: '+ taxes' },
    helpCard: { title: 'Want to rank higher on Google?', body: 'Share your website and target keywords — we will audit and recommend.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Search Engine Optimisation (SEO) is the process of improving your website\'s visibility on Google and other search engines. When done right, it becomes the most cost-effective customer acquisition channel — bringing in qualified leads who are actively searching for what you sell.</p><p>LauncherDesk provides technical SEO, on-page optimisation, content strategy and link building tailored for Indian businesses.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Businesses with a website that isn\'t generating enough organic traffic',
          'Companies in competitive markets that need to outrank competitors',
          'E-commerce stores that want organic product visibility',
          'Service businesses targeting local search (e.g. "CA firm in Bangalore")',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Technical SEO audit and fixes (speed, structure, crawlability)',
          'Keyword research and strategy',
          'On-page SEO (meta tags, headings, internal linking, schema)',
          'Content optimisation and blog strategy',
          'Google Business Profile optimisation (for local SEO)',
          'Monthly performance reports and keyword tracking',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'SEO audit', body: 'We audit your website for technical issues, content gaps and competitive positioning.' },
          { title: 'Keyword strategy', body: 'Research and prioritise keywords based on volume, intent and competition.' },
          { title: 'On-page optimisation', body: 'Implement technical fixes, meta tags, content improvements and schema markup.' },
          { title: 'Content execution', body: 'Publish optimised content targeting your priority keywords.' },
          { title: 'Monthly reporting', body: 'Track rankings, traffic and leads with transparent monthly reports.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Monthly retainer', 'From ₹14,999/month — includes audit, strategy and ongoing optimisation'],
          ['Setup', 'One-time audit and setup included in the first month'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'How long does SEO take to show results?', a: 'Typically 3–6 months for meaningful organic traffic improvements. Some quick wins (technical fixes, Google Business Profile) show results within weeks.' },
          { q: 'Do you guarantee first page rankings?', a: 'No legitimate SEO provider can guarantee specific rankings. We focus on sustainable organic growth through best practices.' },
          { q: 'Can you do SEO for a new website?', a: 'Yes — in fact, starting SEO from the beginning is ideal. We can build your website with SEO in mind from day one.' },
        ]
      }
    },
    related: [
      { href: '/services/content-marketing', label: 'Content Marketing', note: 'Fuel your SEO with strategic content.' },
      { href: '/services/google-ads-paid-marketing', label: 'Google Ads', note: 'Combine organic with paid for faster results.' },
      { href: '/services/website-development', label: 'Website Development', note: 'Need a website to optimise?' },
    ]
  },

  'content-marketing': {
    title: 'Content Marketing',
    metaTitle: 'Content Marketing Services India | LauncherDesk',
    metaDesc: 'Strategic content marketing for Indian businesses. Blog posts, articles, whitepapers and thought leadership content that drives traffic and builds authority.',
    eyebrow: 'GROW — Marketing',
    crumbCategory: 'GROW',
    lead: 'Build authority, drive organic traffic and generate leads with a strategic content marketing plan — blog posts, articles, case studies and thought leadership executed consistently.',
    priceCard: { label: 'Monthly retainer from', price: '₹12,999/month', sub: '+ taxes' },
    helpCard: { title: 'Need a content strategy?', body: 'Tell us about your business and target audience — we will propose a plan.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Content marketing is the practice of creating and distributing valuable, relevant content to attract and retain your target audience. It builds brand authority, improves SEO and generates leads over time — at a fraction of the cost of paid advertising.</p><p>LauncherDesk creates content strategies and executes them consistently — from keyword-driven blog posts to industry thought leadership.</p>' },
      who: {
        heading: "Who it's for", items: [
          'B2B companies that need to build thought leadership',
          'Startups that want to educate their market',
          'E-commerce brands that need product-focused content',
          'Service businesses that want to rank for industry keywords',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Content strategy and editorial calendar',
          'Keyword-driven blog posts (4–8 per month)',
          'Article and long-form content creation',
          'Content optimisation for SEO',
          'Distribution guidance (social, email, syndication)',
          'Monthly performance reporting',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Strategy session', body: 'We understand your audience, goals and competitive landscape.' },
          { title: 'Content calendar', body: 'Monthly editorial plan with topics, keywords and publishing schedule.' },
          { title: 'Creation', body: 'Our writers produce SEO-optimised, industry-relevant content.' },
          { title: 'Publishing & distribution', body: 'Content published on your platforms and distributed across channels.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Monthly retainer', 'From ₹12,999/month — includes strategy and content creation'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Do you write the content or do we?', a: 'We write all content. You review and approve before publishing.' },
          { q: 'What types of content do you create?', a: 'Blog posts, articles, case studies, whitepapers, social media content and email newsletters.' },
          { q: 'How do you ensure content quality?', a: 'Every piece is researched, SEO-optimised and reviewed by editors before delivery.' },
        ]
      }
    },
    related: [
      { href: '/services/seo-marketing', label: 'SEO & Search Marketing', note: 'Content + SEO work best together.' },
      { href: '/services/social-media-management', label: 'Social Media', note: 'Distribute your content on social platforms.' },
    ]
  },

  'email-marketing': {
    title: 'Email Marketing',
    metaTitle: 'Email Marketing Services India | LauncherDesk',
    metaDesc: 'Email marketing setup, automation and campaigns for Indian businesses. Newsletter design, drip campaigns and engagement tracking.',
    eyebrow: 'GROW — Marketing',
    crumbCategory: 'GROW',
    lead: 'Reach your audience directly in their inbox. We set up email marketing systems, design templates, create drip campaigns and help you nurture leads at scale.',
    priceCard: { label: 'Monthly retainer from', price: '₹7,999/month', sub: '+ tool costs & taxes' },
    helpCard: { title: 'Want to start email marketing?', body: 'Tell us your audience size and goals — we will recommend the right setup.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Email marketing remains one of the highest-ROI channels for businesses. It lets you communicate directly with leads and customers — promoting offers, sharing content, nurturing relationships and driving repeat purchases.</p><p>LauncherDesk handles the full stack: platform setup, template design, list management, automation flows and campaign execution.</p>' },
      who: {
        heading: "Who it's for", items: [
          'E-commerce businesses that need to drive repeat purchases',
          'B2B companies nurturing leads through long sales cycles',
          'Service businesses communicating with existing clients',
          'Startups building and engaging a subscriber base',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Email platform setup (Mailchimp, Sendinblue or similar)',
          'Template design matching your brand',
          'Automated drip campaigns and welcome sequences',
          'Newsletter design and sending',
          'List segmentation and management',
          'Open rate, click rate and conversion tracking',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Platform setup', body: 'We set up your email marketing platform and configure DNS for deliverability.' },
          { title: 'Template design', body: 'Branded email templates for campaigns and automated flows.' },
          { title: 'Automation setup', body: 'Welcome sequences, abandoned cart flows and lead nurturing campaigns.' },
          { title: 'Ongoing execution', body: 'Regular campaigns designed, written and sent on schedule.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Monthly retainer', 'From ₹7,999/month — includes design, setup and campaign management'],
          ['Tool costs', 'Email platform subscription billed separately (varies by list size)'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Which email platform do you use?', a: 'We work with Mailchimp, Sendinblue, ConvertKit and others. We recommend the best fit based on your audience size and needs.' },
          { q: 'Can you help grow my email list?', a: 'Yes — we can set up opt-in forms, lead magnets and integrations with your website and social channels.' },
          { q: 'How do you avoid spam filters?', a: 'Proper DNS configuration (SPF, DKIM, DMARC), clean list management and best practices in content and sending patterns.' },
        ]
      }
    },
    related: [
      { href: '/services/whatsapp-business-api', label: 'WhatsApp Business API', note: 'Combine email with WhatsApp outreach.' },
      { href: '/services/crm-setup-lead-management', label: 'CRM Setup', note: 'Feed email leads into your pipeline.' },
    ]
  },

  'website-development': {
    title: 'Website Development',
    metaTitle: 'Website Development for Startups & Businesses | LauncherDesk',
    metaDesc: 'Professional website development for startups and small businesses in India. Mobile-first, fast, conversion-focused. Static, dynamic and e-commerce websites.',
    eyebrow: 'BUILD — Technology',
    crumbCategory: 'BUILD',
    lead: 'Get a professional, fast, mobile-first website that represents your business correctly — designed for conversion, not just aesthetics.',
    priceCard: { label: 'Starts from', price: '₹5,999*', sub: '+ GST' },
    helpCard: { title: 'Not sure what type of site you need?', body: 'Tell us about your business and we will recommend the right approach.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#types', label: 'Types of websites' },
      { href: '#included', label: "What's included" },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>A professional website is the foundation of your business's online presence. LauncherDesk delivers mobile-first, fast-loading websites built for real business goals — enquiries, leads and conversions — not just visual design.</p><p>We handle everything from content structure and design to development, SEO setup and launch — so you can focus on running your business.</p>` },
      who: {
        heading: "Who it's for", items: [
          'Newly registered companies that need a business website',
          'Startups launching a product or service and needing a credible online presence',
          'Small businesses with an outdated or non-existent website',
          'Founders who want a website without managing a separate design agency',
        ]
      },
      types: {
        heading: 'Types of websites', content: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:12px 0">
        <div style="padding:20px;border:1px solid var(--line);border-radius:14px;background:var(--bg)">
          <b style="font-size:15px;color:var(--navy);display:block;margin-bottom:6px">Business / Company Website</b>
          <p style="font-size:14px;color:var(--text-2);line-height:1.6;margin:0">For professionals, consultants and service businesses. Clean, fast, credibility-building.</p>
        </div>
        <div style="padding:20px;border:1px solid var(--line);border-radius:14px;background:var(--bg)">
          <b style="font-size:15px;color:var(--navy);display:block;margin-bottom:6px">Startup / Product Website</b>
          <p style="font-size:14px;color:var(--text-2);line-height:1.6;margin:0">For tech, SaaS or product-based startups. Built to capture leads and communicate value.</p>
        </div>
        <div style="padding:20px;border:1px solid var(--line);border-radius:14px;background:var(--bg)">
          <b style="font-size:15px;color:var(--navy);display:block;margin-bottom:6px">E-commerce Website</b>
          <p style="font-size:14px;color:var(--text-2);line-height:1.6;margin:0">For businesses selling products online. Includes product catalogue, cart and payment integration.</p>
        </div>
        <div style="padding:20px;border:1px solid var(--line);border-radius:14px;background:var(--bg)">
          <b style="font-size:15px;color:var(--navy);display:block;margin-bottom:6px">CRM / Customer Portal</b>
          <p style="font-size:14px;color:var(--text-2);line-height:1.6;margin:0">For businesses needing login-based dashboards or client portals.</p>
        </div>
      </div>` },
      included: {
        heading: "What's included", items: [
          'Requirement discussion and content structure planning',
          'Design — clean, modern, brand-consistent',
          'Mobile-first, fully responsive development',
          'Contact form and WhatsApp integration',
          'Basic SEO setup (meta titles, descriptions, sitemap)',
          'Hosting guidance and domain setup support',
          '1 round of revisions included',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Requirement discussion', body: 'We understand your business, audience and goals before touching a design tool.' },
          { title: 'Content and structure planning', body: 'We plan the page structure and content hierarchy so the site converts.' },
          { title: 'Design mockups', body: 'You see and approve the design before any development begins.' },
          { title: 'Development and testing', body: 'We build and test across devices and browsers.' },
          { title: 'Review and revisions', body: 'One round of revisions included — you confirm everything is right.' },
          { title: 'Launch and handover', body: 'We deploy the site, configure hosting and hand over access.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', intro: 'Pricing depends on the number of pages, functionality and complexity.', rows: [
          ['Professional fee', "LauncherDesk's work: design, development, launch"],
          ['Government fee', 'Not applicable'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Do I need to provide the content?', a: 'For most projects, yes — you provide the text and key information. LauncherDesk can advise on content structure. Copywriting support is available on request.' },
          { q: 'Will my website be mobile-friendly?', a: 'Yes. All LauncherDesk websites are built mobile-first — designed and developed for mobile devices first, then adapted for desktop.' },
          { q: 'Can you redesign an existing website?', a: 'Yes. If you have an existing website that needs updating or replacing, ask us about website redesign.' },
          { q: 'How long does it take?', a: 'Typically 2–4 weeks from content approval and design sign-off. E-commerce and complex projects take longer.' },
        ]
      }
    },
    related: [
      { href: '/services/branding-logo-design', label: 'Branding & Logo Design', note: 'Build a brand identity alongside your website.' },
      { href: '/services/digital-marketing', label: 'Digital Marketing', note: 'Drive traffic to your new website.' },
      { href: '/services/business-automation', label: 'Business Automation', note: 'Add CRM and workflows to your website.' },
    ]
  },

  'static-website': {
    title: 'Static Website Development',
    metaTitle: 'Static Website Development India | LauncherDesk',
    metaDesc: 'Fast, lightweight static websites for businesses. Brochure sites, landing pages and portfolio websites. Mobile-first, SEO-ready.',
    eyebrow: 'BUILD — Technology',
    crumbCategory: 'BUILD',
    lead: 'A clean, fast, lightweight website that presents your business professionally — perfect for service businesses, consultants and professionals who need a credible online presence without complexity.',
    priceCard: { label: 'Starts from', price: '₹4,999*', sub: '' },
    helpCard: { title: 'Not sure if static is right for you?', body: 'Static sites work best when your content doesn\'t change frequently.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>A static website is a fixed-content site that loads extremely fast and costs very little to host. It doesn\'t require a database or CMS — every page is pre-built and served directly to the visitor. This makes it ideal for businesses that need a professional online presence without frequent content updates.</p><p>LauncherDesk builds static websites that are mobile-first, SEO-optimised and designed for conversion — not just aesthetics.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Consultants, freelancers and professionals who need a credibility-building website',
          'Service businesses with a fixed set of offerings',
          'New businesses that need an online presence quickly',
          'Companies that need a simple landing page or brochure site',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Up to 5–7 pages (Home, About, Services, Contact, etc.)',
          'Mobile-first responsive design',
          'Contact form with WhatsApp integration',
          'Basic SEO setup (meta tags, sitemap, schema)',
          'Fast hosting guidance (no server maintenance needed)',
          'SSL certificate setup',
          '1 round of revisions',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Requirement discussion', body: 'We understand your business, audience and what you want the site to achieve.' },
          { title: 'Content planning', body: 'Page structure and content hierarchy planned for conversion.' },
          { title: 'Design & development', body: 'Clean, modern design built with performance in mind.' },
          { title: 'Review & launch', body: 'You review, we revise, then deploy to your domain.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', 'From ₹9,999 for a standard 5-page static site'],
          ['Hosting', 'Near-zero cost — static sites can be hosted free or very cheaply'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'What is the difference between static and dynamic?', a: 'Static websites have fixed content that you can\'t update yourself without code changes. Dynamic websites have a CMS (like WordPress) that lets you update content, add blog posts and manage pages without touching code.' },
          { q: 'Can I add a blog later?', a: 'Yes — you can upgrade to a dynamic site later. Starting static keeps costs low while you establish your business.' },
          { q: 'How fast will it load?', a: 'Very fast. Static sites load in under 1 second because there\'s no database or server-side processing.' },
        ]
      }
    },
    related: [
      { href: '/services/dynamic-website', label: 'Dynamic Website', note: 'Need a CMS to update content yourself?' },
      { href: '/services/branding-logo-design', label: 'Branding & Logo Design', note: 'Build your brand identity first.' },
      { href: '/services/digital-marketing', label: 'Digital Marketing', note: 'Drive traffic to your new site.' },
    ]
  },

  'dynamic-website': {
    title: 'Dynamic Website Development',
    metaTitle: 'Dynamic Website Development India | LauncherDesk',
    metaDesc: 'CMS-powered dynamic websites for businesses. WordPress, custom CMS, blog-ready and self-manageable. Built by LauncherDesk.',
    eyebrow: 'BUILD — Technology',
    crumbCategory: 'BUILD',
    lead: 'A CMS-powered website you can update yourself — add blog posts, edit pages, upload images and manage content without touching code. Built for businesses that need ongoing content flexibility.',
    priceCard: { label: 'Starts from', price: '₹25,000*', sub: '' },
    helpCard: { title: 'Need ongoing content updates?', body: 'Dynamic is the right choice if you blog, add case studies or update offerings regularly.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>A dynamic website is powered by a Content Management System (CMS) like WordPress or a custom-built admin panel. This means you can log in, edit text, add new pages, publish blog posts and upload images — all without developer help.</p><p>LauncherDesk builds dynamic websites that are fast, mobile-first, SEO-friendly and easy for you to manage. We set up the CMS, design the front end, and train you to use it.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Businesses that publish blogs, news or case studies regularly',
          'Companies with growing service catalogues or portfolios',
          'Teams that need to update content without waiting for a developer',
          'Businesses planning content marketing or SEO campaigns',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Custom WordPress or CMS-based website',
          'Admin panel for self-managing content, pages and media',
          'Blog / news section setup',
          'Mobile-first responsive design',
          'Contact forms, WhatsApp integration, social links',
          'SEO setup (meta tags, sitemap, schema, speed optimisation)',
          'CMS training session for your team',
          '1 round of revisions',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Requirement discussion', body: 'We plan the content structure, page types and CMS features you need.' },
          { title: 'Design mockups', body: 'You approve the design before any development begins.' },
          { title: 'Development', body: 'Full CMS build with admin panel, responsive design and SEO.' },
          { title: 'Content upload & training', body: 'We upload initial content and train your team to manage the site.' },
          { title: 'Launch', body: 'Deployed to your domain with hosting configured.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', 'From ₹19,999 — includes design, development, CMS setup and training'],
          ['Hosting', 'Hosting required — we recommend and set up appropriate hosting'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Will I be able to update the website myself?', a: 'Yes — that is the core advantage of a dynamic site. We set up a user-friendly CMS and train you to use it.' },
          { q: 'Which CMS do you use?', a: 'Mostly WordPress for its flexibility and ecosystem. For specific needs, we can use custom-built admin panels.' },
          { q: 'Is WordPress secure?', a: 'Yes, when properly maintained. We set up security plugins, backups and update protocols.' },
        ]
      }
    },
    related: [
      { href: '/services/static-website', label: 'Static Website', note: 'Don\'t need a CMS? Go lightweight.' },
      { href: '/services/ecommerce-website', label: 'E-Commerce Website', note: 'Need to sell products online?' },
      { href: '/services/seo-marketing', label: 'SEO & Search Marketing', note: 'Get found on Google.' },
    ]
  },

  'ecommerce-website': {
    title: 'E-Commerce Website Development',
    metaTitle: 'E-Commerce Website Development India | LauncherDesk',
    metaDesc: 'Build a professional online store in India. Product catalogue, payment gateway, mobile-first design and GST-ready invoicing. Delivered by LauncherDesk.',
    eyebrow: 'BUILD — Technology',
    crumbCategory: 'BUILD',
    lead: 'Get a fully-functional online store — product catalogue, cart, payment gateway and mobile-first design — built for Indian businesses and ready to sell from day one.',
    priceCard: { label: 'Starts from', price: '₹20,000*', sub: '' },
    helpCard: { title: 'Selling on Amazon or Flipkart too?', body: 'We can build your own storefront alongside marketplace presence.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>An e-commerce website lets you sell products directly to customers online — with full control over your brand, pricing and customer relationship. LauncherDesk builds e-commerce stores that are fast, mobile-first and connected to Indian payment gateways.</p><p>We handle the entire process: product structure, design, development, payment gateway integration and launch — including GST-compliant invoice setup where required.</p>` },
      who: {
        heading: "Who it's for", items: [
          'Businesses wanting to sell products directly online',
          'D2C brands looking for their own storefront beyond Amazon and Flipkart',
          'Physical retailers adding an online sales channel',
          'Startups launching a product-based business',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Product catalogue setup (up to agreed number of SKUs)',
          'Shopping cart and checkout flow',
          'Payment gateway integration (Razorpay, PayU or similar)',
          'Mobile-first, fully responsive design',
          'GST-compliant invoice generation (where required)',
          'Order management setup',
          'Basic SEO setup for product pages',
          'Admin panel for managing products and orders',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Requirement scoping', body: 'We understand your product range, target customers and business requirements.' },
          { title: 'Platform selection', body: 'We recommend the right platform (Shopify, WooCommerce, custom) for your scale and budget.' },
          { title: 'Design and development', body: 'We design and build the storefront, product pages, cart and checkout.' },
          { title: 'Payment and logistics integration', body: 'Payment gateway, shipping and GST invoice setup.' },
          { title: 'Testing and launch', body: 'Full testing across devices before going live.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', intro: 'Pricing depends on the number of products, platform choice and required integrations.', rows: [
          ['Professional fee', "LauncherDesk's work: design, development, integrations"],
          ['Platform fees', 'Shopify or other platform subscription — passed through at cost'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Which payment gateway do you integrate?', a: 'We work with Razorpay, PayU, Cashfree and other major Indian payment gateways. We recommend the right one for your business.' },
          { q: 'Do I need GST to run an e-commerce store?', a: 'Yes — GST registration is mandatory for e-commerce businesses. LauncherDesk can handle GST registration as part of the same engagement.' },
          { q: 'Can I manage products myself after launch?', a: 'Yes. We build with platforms that have user-friendly admin panels so you can add, edit and remove products without technical help.' },
        ]
      }
    },
    related: [
      { href: '/services/gst-registration', label: 'GST Registration', note: 'Required for e-commerce — often done together.' },
      { href: '/services/trademark-registration', label: 'Trademark Registration', note: 'Protect your brand before you scale.' },
      { href: '/services/digital-marketing', label: 'Digital Marketing', note: 'Drive traffic to your new store.' },
    ]
  },

  'branding-logo-design': {
    title: 'Branding & Logo Design',
    metaTitle: 'Branding & Logo Design for Startups India | LauncherDesk',
    metaDesc: 'Professional logo and brand identity design for startups and businesses in India. Logo, colour palette, typography and brand guide by LauncherDesk.',
    eyebrow: 'BUILD — Branding',
    crumbCategory: 'BUILD',
    lead: 'Build a brand identity that represents your business correctly — with a professional logo, consistent visual language and a brand guide your team can use.',
    priceCard: { label: 'Total (incl. GST)', price: '₹4,130', sub: 'Professional fee ₹3,500 + GST' },
    helpCard: { title: 'Already have a logo?', body: 'We can refresh and extend an existing identity, or start from scratch.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>Your brand identity is how your business looks and feels to the world — logo, colours, typography and the visual language across all touchpoints. A strong brand builds credibility, trust and recognition from day one.</p><p>LauncherDesk delivers complete brand identity packages: from the logo concept through to colour palette, typography, brand guide and key collateral.</p>` },
      who: {
        heading: "Who it's for", items: [
          'Newly registered businesses that need a professional brand identity',
          'Startups with a name but no visual brand',
          'Existing businesses with an outdated logo or inconsistent branding',
          'Founders preparing for fundraising who need investor-ready materials',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Brand brief discussion (business, audience, preferred style direction)',
          'Logo concepts and design — up to 3 initial directions',
          'Colour palette and typography selection',
          'Business card design',
          'Letterhead template',
          'Brand guide (logo usage, colours, fonts, dos and don\'ts)',
          'Final files in PNG, JPG, SVG and PDF formats',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Brand brief', body: 'We understand your business, audience, values and aesthetic preferences.' },
          { title: 'Initial concepts', body: 'We present 2–3 logo directions for you to review.' },
          { title: 'Refinement', body: 'We refine the chosen direction based on your feedback.' },
          { title: 'System build', body: 'We build the complete brand system — colours, fonts, collateral.' },
          { title: 'Final delivery', body: 'All files delivered in required formats with a brand guide.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', "LauncherDesk's work: design, brand guide, file preparation"],
          ['Government fee', 'Not applicable'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'How many logo concepts will I see?', a: 'Typically 2–3 initial directions. You choose one to refine. We include 2 rounds of revisions.' },
          { q: 'Can I use the logo on my website and packaging?', a: 'Yes. You receive files in all standard formats suitable for digital, print and packaging use.' },
          { q: 'Should I trademark my logo?', a: 'Yes — once you have a logo you are happy with, trademarking it protects your brand legally. LauncherDesk can handle trademark registration through the same team.' },
        ]
      }
    },
    related: [
      { href: '/services/website-development', label: 'Website Development', note: 'Build your site using your new brand identity.' },
      { href: '/services/trademark-registration', label: 'Trademark Registration', note: 'Protect the logo you just created.' },
      { href: '/services/digital-marketing', label: 'Digital Marketing', note: 'Put your brand to work across digital channels.' },
    ]
  },

  'business-email-hosting': {
    title: 'Business Email & Hosting Setup',
    metaTitle: 'Business Email & Hosting Setup India | Google Workspace | LauncherDesk',
    metaDesc: 'Set up professional business email (name@yourdomain.com) and website hosting in India. Google Workspace, domain registration and hosting configuration.',
    eyebrow: 'BUILD — Technology',
    crumbCategory: 'BUILD',
    lead: 'Get your business online with a professional email address, domain and reliable hosting — set up correctly from the start.',
    priceCard: { label: 'Starts from', price: 'Custom quote', sub: '+ platform subscription costs' },
    helpCard: { title: 'Still using Gmail for business?', body: 'A professional email builds trust with clients and suppliers immediately.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>A professional business email — name@yourbusiness.com — is one of the simplest credibility signals for any company. Paired with reliable hosting, it forms the foundation of your online presence.</p><p>LauncherDesk sets up your domain, configures Google Workspace or equivalent business email, and ensures your hosting is correctly configured and connected.</p>` },
      who: {
        heading: "Who it's for", items: [
          'Newly registered businesses that need professional email addresses',
          'Founders who want to stop using personal Gmail accounts for business',
          'Companies setting up a new website and needing hosting',
          'Businesses upgrading from free email to professional domain email',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Domain registration guidance and support',
          'Google Workspace or equivalent business email setup',
          'Up to 5 email accounts (additional accounts on request)',
          'Website hosting setup and configuration',
          'DNS configuration and domain verification',
          'Email client setup guidance (mobile and desktop)',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Domain selection', body: 'We help you choose and register the right domain for your business.' },
          { title: 'Google Workspace setup', body: 'We configure your business email accounts and admin console.' },
          { title: 'Hosting configuration', body: 'We set up and configure your website hosting environment.' },
          { title: 'DNS and verification', body: 'We handle all DNS records, verification and email authentication (SPF, DKIM).' },
          { title: 'Handover', body: 'We hand over all credentials and walk you through the admin panel.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', "LauncherDesk's work: setup and configuration"],
          ['Platform cost', 'Google Workspace subscription — passed through at cost'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Which email platform do you use?', a: 'We recommend Google Workspace for most businesses — it includes Gmail, Drive, Meet and Calendar in one subscription.' },
          { q: 'What does hosting cost?', a: 'Hosting costs depend on the provider and plan chosen. We recommend and set up the right plan for your website size and traffic.' },
          { q: 'How long does setup take?', a: 'Typically 1–3 working days for email and hosting setup once domain access is confirmed.' },
        ]
      }
    },
    related: [
      { href: '/services/website-development', label: 'Website Development', note: 'Build your site once hosting is ready.' },
      { href: '/services/branding-logo-design', label: 'Branding & Logo Design', note: 'Build a complete professional presence.' },
      { href: '/services/business-automation', label: 'Business Automation', note: 'Automate email responses and workflows.' },
    ]
  },

  'software-saas-development': {
    title: 'Custom Software & SaaS Development',
    metaTitle: 'Custom Software & SaaS Development India | LauncherDesk',
    metaDesc: 'Custom software, web application and SaaS product development for startups and businesses in India. Requirement scoping, development and launch support.',
    eyebrow: 'BUILD — Technology',
    crumbCategory: 'BUILD',
    lead: 'Build the software your business needs — from a custom internal tool to a full SaaS product — with a clear process, honest timelines and experienced development support.',
    priceCard: { label: 'Total (incl. GST)', price: '₹10,619', sub: 'Professional fee ₹8,999 + GST' },
    helpCard: { title: 'Have a software idea?', body: 'Start with a scoping conversation — no commitment required.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>Custom software is the difference between a business that runs on workarounds and one that runs on systems built for it. Whether you need a customer portal, an internal operations tool or a full SaaS platform, LauncherDesk coordinates the design, development and delivery.</p>` },
      who: {
        heading: "Who it's for", items: [
          'Startups building a software product or SaaS platform',
          'Businesses that need a custom internal tool, portal or application',
          'Founders who have a software idea but no technical co-founder',
          'Companies outgrowing off-the-shelf software',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Requirement scoping and documentation',
          'Technical architecture recommendation',
          'UI/UX design',
          'Frontend and backend development',
          'Testing and quality assurance',
          'Deployment and launch support',
          'Post-launch support (as scoped)',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Scoping call', body: 'We understand your idea, requirements and business context before anything else.' },
          { title: 'Specification and architecture', body: 'We document the full requirement and recommend the right technology stack.' },
          { title: 'UI/UX design', body: 'We design the user interface and get your sign-off before development starts.' },
          { title: 'Development', body: 'We build in sprints with regular check-ins and demos.' },
          { title: 'Testing and QA', body: 'Functional, performance and device testing before release.' },
          { title: 'Launch and handover', body: 'We deploy, document and hand over with ongoing support options.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', intro: 'Software development is priced after a scoping session — complexity varies significantly.', rows: [
          ['Professional fee', 'Scoped per project — development, design, QA, deployment'],
          ['Infrastructure', 'Hosting and third-party services passed through at cost'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'How long does an MVP take?', a: 'Minimum viable product (MVP) projects typically take 6–12 weeks. Complex platforms take longer. We agree timelines and milestones upfront.' },
          { q: 'What technology do you build with?', a: 'We recommend the right stack for your use case — typically React/Next.js for frontend and Node.js or Python for backend, with cloud hosting on AWS or GCP.' },
          { q: 'Can you take over an existing codebase?', a: 'Yes. We regularly take over and extend existing software projects. We start with a code review before committing to scope.' },
        ]
      }
    },
    related: [
      { href: '/services/website-development', label: 'Website Development', note: 'Need a website rather than an application?' },
      { href: '/services/business-automation', label: 'Business Automation', note: 'Automate workflows without custom software.' },
      { href: '/services/digital-marketing', label: 'Digital Marketing', note: 'Market your software product.' },
    ]
  },

  'hrms': {
    title: 'HRMS — HR Management System',
    metaTitle: 'HRMS Software for Startups & SMEs | Payroll, Attendance & Leave | LauncherDesk',
    metaDesc: 'Get a complete HR Management System set up for your business — employee database, attendance, leave, payroll and self-service, all in one platform.',
    eyebrow: 'BUILD — Technology',
    crumbCategory: 'BUILD',
    lead: 'Run HR from one place instead of spreadsheets and WhatsApp groups — employee records, attendance, leave, payroll and self-service, set up and configured for how your team actually works.',
    priceCard: { label: 'Price', price: '₹18,000', sub: '+ GST' },
    helpCard: { title: 'Not sure what you need yet?', body: 'Tell us your team size and current process — we\'ll recommend the right setup.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>An HRMS (HR Management System) brings employee records, attendance, leave and payroll into one platform — replacing scattered spreadsheets, chat-group approvals and manual salary calculations. As a team grows past a handful of people, HR run informally starts costing real time every month and creates compliance risk around PF, ESI and TDS.</p><p>LauncherDesk sets up and configures an HRMS suited to your team size and processes — employee onboarding, attendance and leave policies, payroll rules and a self-service portal — so HR runs on a system rather than on memory.</p>` },
      who: {
        heading: "Who it's for", items: [
          'Startups and SMEs moving off spreadsheets for HR and payroll',
          'Businesses with 10+ employees where manual attendance/leave tracking has become unreliable',
          'Companies that want employees to self-serve payslips, leave requests and documents',
          'Founders who want PF, ESI and TDS calculated correctly and on time, every month',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Employee database and document storage',
          'Attendance and leave management, with policy configuration',
          'Payroll processing — salary structures, payslips, PF/ESI/TDS',
          'Employee self-service portal (leave, payslips, documents)',
          'Onboarding and offboarding workflows',
          'Reports and dashboards for HR and management',
          'Setup, data migration and admin training',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Requirement call', body: 'We understand your team size, current HR process and what you want automated first.' },
          { title: 'Platform setup', body: 'We configure the HRMS — company structure, departments, roles and access.' },
          { title: 'Policy configuration', body: 'Attendance, leave and payroll rules are set up to match your actual policies.' },
          { title: 'Data migration', body: 'Existing employee and payroll data is migrated in, checked and validated.' },
          { title: 'Training and go-live', body: 'We train your HR team and employees on self-service, then go live.' },
          { title: 'Ongoing support', body: 'Support for configuration changes as your team and policies evolve.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', intro: 'One flat setup fee covers configuration for your team — ongoing platform costs, if any, are shown separately.', rows: [
          ['Professional fee', 'HRMS setup, configuration, data migration and training'],
          ['Platform cost', 'Any per-user software subscription, passed through at cost'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'How long does HRMS setup take?', a: 'Typically 1–2 weeks depending on team size and how much historical data needs migrating.' },
          { q: 'Does this include payroll processing every month, or just the setup?', a: 'This covers the setup and configuration. Ongoing monthly payroll processing is available separately — see our Payroll Management service.' },
          { q: 'Can it handle PF, ESI and TDS correctly?', a: 'Yes — payroll rules are configured for statutory compliance (PF, ESI, TDS) based on your team\'s structure.' },
          { q: 'Will my employees be able to see their own payslips and apply for leave?', a: 'Yes, the self-service portal lets employees view payslips, apply for leave and access their documents directly.' },
        ]
      }
    },
    related: [
      { href: '/services/payroll', label: 'Payroll Management', note: 'Ongoing monthly payroll processing.' },
      { href: '/services/business-automation', label: 'Business Automation', note: 'Automate workflows beyond HR.' },
      { href: '/services/crm-setup-lead-management', label: 'CRM Setup & Integration', note: 'Bring the same discipline to sales.' },
    ]
  },

  'startup-india-dpiit': {
    title: 'Startup India / DPIIT Recognition',
    metaTitle: 'Startup India DPIIT Recognition | Tax Benefits & Schemes | LauncherDesk',
    metaDesc: 'Get your startup officially recognised by DPIIT. Access tax exemptions, government schemes and funding benefits. Application support by LauncherDesk.',
    eyebrow: 'START — Certifications',
    crumbCategory: 'START',
    lead: 'Get your startup officially recognised by DPIIT — unlocking income tax benefits, government scheme access, patent fee rebates and investor credibility.',
    priceCard: { label: 'Total (incl. GST)', price: '₹4,956', sub: 'Professional fee ₹4,200 + GST' },
    helpCard: { title: 'Not sure if you qualify?', body: 'We check eligibility before you apply — free assessment.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#benefits', label: 'Key benefits' },
      { href: '#whyregister', label: 'Why register' },
      { href: '#included', label: "What's included" },
      { href: '#documents', label: 'Documents' },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>A startup is an entity in the first stages of its operations — a business model that aims to meet a marketplace need by offering an innovative product, process or service. Under the Startup India Action Plan, a startup that meets the definition prescribed under the relevant notification is eligible to apply for recognition under the programme.</p><p>LauncherDesk handles the eligibility check, Startup India portal setup, documentation and application filing.</p>` },
      who: {
        heading: "Who should get this registration", items: [
          'Registered as a Private Limited Company, Partnership Firm or LLP',
          'Turnover should be less than ₹100 crores in any of the previous financial years',
          'An entity is considered a startup up to 10 years from the date of its incorporation',
          'Should be working towards innovation/improvement of existing products, services and processes, with the potential to generate employment/create wealth — an entity formed by splitting up or reconstruction of an existing business shall not be considered a "startup"',
        ]
      },
      benefits: {
        heading: 'Advantages of startup registration', items: [
          '<b>Self-certification</b> — startups are allowed to self-certify compliance for 6 Labour Laws and 3 Environmental Laws through a simple online procedure.',
          '<b>Patent filing</b> — startups get an 80% rebate on filing patents vis-à-vis other companies, helping pare costs in the initial formative years.',
          '<b>Income-tax exemption</b> — eligible startups can be exempted from paying income tax for 3 consecutive financial years out of their first ten years since incorporation.',
          '<b>Angel tax exemption</b> — startups are eligible for tax exemption under Section 56(2)(viib) of the Income Tax Act.',
          '<b>Easy winding up</b> — startups with a simple debt structure, or those meeting certain specified income criteria, can be wound up within 90 days of filing an application for insolvency under the Insolvency and Bankruptcy Code, 2016.',
          '<b>Exemption from EMD</b> — DPIIT-recognised startups are exempted from submitting Earnest Money Deposit (EMD) or bid security while filing government tenders.',
        ]
      },
      whyregister: {
        heading: 'Why should you get this registration?',
        items: [
          'Self-certification',
          'Exemption from income-tax, angel tax',
          'Reduced fee for patent &amp; trademark, etc.',
        ]
      },
      included: {
        heading: "How LauncherDesk can help you", items: [
          'Recognition under the Startup India Scheme',
          'Availing tax exemption under Section 80-IAC',
          'Availing tax exemption under Section 56 (Angel Tax)',
        ]
      },
      documents: {
        heading: 'Documents / details required for startup registration',
        content: `<ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Self-certified copy of audited statements since inception of the entity</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Self-certified copy of income tax returns</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Copy of PAN card of the entity</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Note on business model</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Copy of COI, MOA &amp; AOA</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> PAN &amp; Aadhaar of directors</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> MSME Registration Certificate, if any</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Details of number of employees</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Details of IPR, if any</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Details of funding received by the entity</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Email ID &amp; mobile number for registration</li></ul>`
      },
      process: {
        heading: 'Process of startup registration', steps: [
          { title: 'Register on the portal', body: 'The startup is required to register by creating an account on the Startup India portal.' },
          { title: 'Filing of application', body: 'Basic details need to be filled on the portal for applying for recognition under the Startup India scheme.' },
          { title: 'Submission of application', body: 'After filling in the necessary details, the application needs to be submitted on the portal.' },
          { title: 'Issuance of certificate', body: 'On satisfying the requirements, the recognition certificate is issued by the DPIIT.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', "LauncherDesk's work: eligibility check, filing, coordination"],
          ['Government fee', 'DPIIT recognition has no government filing fee'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'What are the eligibility criteria?', a: 'Your startup must be incorporated as a Pvt Ltd, LLP or registered partnership. It must be less than 10 years from incorporation, with annual turnover not exceeding ₹100 crores. It must be working toward innovation, development or improvement of products, processes or services.' },
          { q: 'Is the tax exemption automatic after recognition?', a: 'DPIIT recognition is needed to apply for tax exemptions, but the exemptions are granted separately by the Income Tax Department. LauncherDesk can help you understand the process.' },
          { q: 'How long does recognition take?', a: 'Typically 2–4 weeks from submission, subject to DPIIT review timelines.' },
        ]
      }
    },
    related: [
      { href: '/services/private-limited-company-registration', label: 'Private Limited Company', note: 'Register the right entity first.' },
      { href: '/services/msme-registration', label: 'MSME / Udyam', note: 'Quick to add alongside DPIIT recognition.' },
      { href: '/services/accounting', label: 'Accounting', note: 'Keep books investor-ready post-recognition.' },
    ]
  },

  'iso-certification': {
    title: 'ISO Certification',
    metaTitle: 'ISO Certification in India | ISO 9001, 27001 & More | LauncherDesk',
    metaDesc: 'Get ISO certified for your business in India. ISO 9001:2015, ISO 27001, ISO 14001 and other standards. Coordination support for audit and certification.',
    eyebrow: 'START — Certifications',
    crumbCategory: 'START',
    lead: 'Get your business ISO certified — with guidance on the right standard, documentation support and certification body coordination.',
    priceCard: { label: 'Total (incl. GST)', price: '₹2,950', sub: 'Professional fee ₹2,500 + GST' },
    helpCard: { title: 'Not sure which ISO standard you need?', body: 'We help you identify the right standard for your business and sector.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#standards', label: 'Standards we support' },
      { href: '#included', label: "What's included" },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>ISO certification demonstrates that your business meets internationally recognised standards for quality, security, environmental management or other operational areas. It is often required for enterprise contracts, government tenders and international business.</p><p>LauncherDesk coordinates the documentation, gap analysis, pre-audit preparation and certification body engagement — so you achieve certification with clear guidance throughout.</p>` },
      who: {
        heading: "Who it's for", items: [
          'Businesses that need ISO certification for B2B contracts or government tenders',
          'Companies wanting to demonstrate quality management to enterprise clients',
          'Businesses in manufacturing, technology, healthcare or services sectors',
          'Exporters and businesses seeking international recognition',
        ]
      },
      standards: {
        heading: 'Standards we support', content: `<ul>
        <li><b>ISO 9001:2015</b> — Quality Management System. The most widely recognised standard, applicable to any business.</li>
        <li><b>ISO 27001</b> — Information Security Management. Essential for technology, SaaS and data-handling businesses.</li>
        <li><b>ISO 14001</b> — Environmental Management. For businesses with environmental impact obligations.</li>
        <li><b>Other standards</b> — ISO 22000 (food safety), ISO 45001 (occupational health) and others on request.</li>
      </ul>` },
      included: {
        heading: "What's included", items: [
          'Guidance on selecting the right ISO standard',
          'Documentation support (quality manual, SOPs, process documents)',
          'Gap analysis support',
          'Coordination with accredited certification body',
          'Pre-audit and audit support',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Standard selection', body: 'We confirm the right ISO standard for your business and sector.' },
          { title: 'Gap analysis', body: 'We assess your current processes against the standard requirements.' },
          { title: 'Documentation', body: 'We help prepare the quality manual, SOPs and required documents.' },
          { title: 'Pre-audit preparation', body: 'We prepare your team for the certification audit.' },
          { title: 'Certification audit', body: 'The accredited certification body conducts the audit.' },
          { title: 'Certificate issued', body: 'ISO certificate issued on successful audit completion.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', "LauncherDesk's work: documentation, coordination, audit support"],
          ['Certification body fee', 'Charged by the accredited certification body — varies by standard and scope'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Who issues the ISO certificate?', a: 'ISO certificates are issued by accredited third-party certification bodies, not by LauncherDesk. LauncherDesk coordinates and supports the process.' },
          { q: 'How long does ISO certification take?', a: 'Typically 4–12 weeks from engagement start, depending on your readiness and the standard being pursued.' },
          { q: 'Does ISO certification need to be renewed?', a: 'Yes. ISO certificates are typically valid for 3 years with annual surveillance audits. LauncherDesk can support ongoing renewal.' },
        ]
      }
    },
    related: [
      { href: '/services/startup-india-dpiit', label: 'Startup India / DPIIT', note: 'Another certification that builds credibility.' },
      { href: '/services/msme-registration', label: 'MSME / Udyam', note: 'Often pursued alongside ISO certification.' },
      { href: '/services/private-limited-company-registration', label: 'Private Limited Company', note: 'Register the right entity first.' },
    ]
  },

  'income-tax-filing': {
    title: 'Business Income Tax Filing',
    metaTitle: 'Business Income Tax Filing India | ITR for Companies & LLPs | LauncherDesk',
    metaDesc: 'Income tax return filing for companies, LLPs and businesses in India. ITR preparation, CA review, tax planning and filing by the due date.',
    eyebrow: 'MANAGE — Compliance',
    crumbCategory: 'MANAGE',
    lead: 'File your business income tax return accurately and on time — with CA-reviewed preparation, tax planning guidance and end-to-end support.',
    priceCard: { label: 'Total (incl. GST)', price: '₹17,700', sub: 'Professional fee ₹15,000 + GST' },
    helpCard: { title: 'Missed a previous filing?', body: 'We can help you file backlogged returns and get compliant.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>Every registered company and LLP in India must file an annual income tax return — regardless of whether the business made a profit. Late filing attracts penalties and interest; missing it creates problems for future compliance and fundraising.</p><p>LauncherDesk coordinates CA-reviewed income tax preparation and filing, including tax computation, TDS reconciliation and form selection.</p>` },
      who: {
        heading: "Who it's for", items: [
          'Private Limited Companies, LLPs and OPCs that need annual ITR filing',
          'Businesses that want a CA to prepare and file their income tax return',
          'Founders who want basic tax planning guidance alongside their ITR',
          'Companies with backlogged filings that need to get compliant',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Income tax return preparation (ITR-6 for companies, ITR-5 for LLPs)',
          'CA review and sign-off',
          'Tax computation and liability calculation',
          'TDS reconciliation (Form 26AS, AIS)',
          'Basic tax planning discussion',
          'Filing on the Income Tax portal before the due date',
          'Acknowledgement and filing confirmation (ITR-V)',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Document collection', body: 'We collect financial statements, bank statements and TDS details.' },
          { title: 'Tax computation', body: 'CA prepares the tax computation and identifies any planning opportunities.' },
          { title: 'ITR preparation', body: 'We prepare the correct ITR form for your entity type.' },
          { title: 'CA review and sign-off', body: 'A Chartered Accountant reviews and digitally signs the return.' },
          { title: 'Filing and acknowledgement', body: 'Return filed on the Income Tax portal. Acknowledgement shared with you.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', "CA preparation, review, filing and coordination"],
          ['Government fee', 'No government fee for ITR filing'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'What is the due date for company ITR filing?', a: 'For companies and LLPs not requiring tax audit: 31 October (extended deadline; verify current year date with your CA). For companies requiring tax audit: 30 November. Due dates are subject to government extension.' },
          { q: 'Does a company with no revenue still need to file?', a: 'Yes. Even a company with zero revenue or a loss must file an annual income tax return. Non-filing attracts penalties.' },
          { q: 'Is a tax audit required?', a: 'Tax audit under Section 44AB is required for companies with turnover above specified thresholds. LauncherDesk will advise whether your company requires a tax audit.' },
        ]
      }
    },
    related: [
      { href: '/services/accounting', label: 'Accounting', note: 'Clean books are needed before ITR filing.' },
      { href: '/services/gst-registration', label: 'GST Filing & Returns', note: 'Often filed alongside income tax.' },
      { href: '/services/roc-compliance', label: 'ROC Compliance', note: 'Annual compliance for companies and LLPs.' },
    ]
  },

  'legal-document-support': {
    title: 'Legal Document Support',
    metaTitle: 'Legal Document Support for Businesses India | LauncherDesk',
    metaDesc: 'Business agreements, NDAs, employment contracts, shareholder agreements and legal document drafting and review for startups and SMEs in India.',
    eyebrow: 'MANAGE — Legal',
    crumbCategory: 'MANAGE',
    lead: 'Get the business agreements and legal documents your company needs — drafted correctly, reviewed by qualified professionals and delivered through one coordinated team.',
    priceCard: { label: 'Starts from', price: '₹999*', sub: 'Depends on document type' },
    helpCard: { title: 'Need a specific agreement?', body: 'Tell us what you need — we can coordinate most standard business documents.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#documents', label: 'Documents we cover' },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>Running a business without proper legal documentation creates risk — from unprotected intellectual property to disputed agreements and employee disputes. LauncherDesk coordinates legal document drafting and review through qualified professionals, covering the agreements most businesses need at each stage of growth.</p>` },
      who: {
        heading: "Who it's for", items: [
          'New companies needing founder and shareholder agreements',
          'Businesses onboarding employees and needing employment contracts',
          'Startups raising funding who need investment and convertible note agreements',
          'Companies entering partnerships or client relationships needing proper contracts',
        ]
      },
      documents: {
        heading: 'Documents we cover', content: `<ul>
        <li><b>Founders Agreement</b> — equity split, roles, IP ownership and exit provisions for co-founders</li>
        <li><b>Shareholder Agreement</b> — rights, obligations and governance for company shareholders</li>
        <li><b>NDA / Confidentiality Agreement</b> — protect sensitive business information</li>
        <li><b>Employment Contract</b> — terms, compensation, IP assignment and notice provisions</li>
        <li><b>Freelancer / Consultant Agreement</b> — scope, payment and IP ownership for contractors</li>
        <li><b>Client Service Agreement</b> — terms of service for your customers</li>
        <li><b>Term Sheet / Investment Agreement</b> — for pre-seed and seed fundraising</li>
        <li><b>Vendor / Supplier Agreement</b> — purchase terms and supply conditions</li>
      </ul>` },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Requirement discussion', body: 'We understand what document you need and the business context.' },
          { title: 'Draft preparation', body: 'A qualified legal professional prepares the document draft.' },
          { title: 'Review and revisions', body: 'You review and we incorporate your feedback.' },
          { title: 'Final delivery', body: 'Final document delivered in Word and PDF formats.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', "Legal professional's drafting and review fee"],
          ['Government fee', 'Stamp duty may apply for certain agreements — advised upfront'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Are these reviewed by actual lawyers?', a: 'Yes. Legal documents through LauncherDesk are prepared and reviewed by qualified advocates or company secretaries as appropriate for the document type.' },
          { q: 'Do agreements need to be stamped?', a: 'Some agreements require stamp duty depending on the state and document type. We advise on stamping requirements for each document.' },
          { q: 'Can you review an agreement someone else has given me?', a: 'Yes. We can coordinate a review and provide comments on agreements drafted by third parties.' },
        ]
      }
    },
    related: [
      { href: '/services/trademark-registration', label: 'Trademark Registration', note: 'Protect IP alongside legal agreements.' },
      { href: '/services/private-limited-company-registration', label: 'Company Registration', note: 'Get the entity right before the agreements.' },
      { href: '/services/payroll', label: 'Payroll Management', note: 'Employment contracts + payroll through one team.' },
    ]
  },

  'whatsapp-business-api': {
    title: 'WhatsApp Business API Setup',
    metaTitle: 'WhatsApp Business API Setup India | Bulk Messaging & CRM | LauncherDesk',
    metaDesc: 'Set up the WhatsApp Business API for your business in India. Send bulk messages, automate customer notifications and integrate WhatsApp with your CRM.',
    eyebrow: 'GROW — Marketing',
    crumbCategory: 'GROW',
    lead: 'Use WhatsApp to reach and communicate with your customers at scale — through the official WhatsApp Business API, properly configured for your business.',
    priceCard: { label: 'Total (incl. GST)', price: '₹3,540', sub: 'Professional fee ₹3,000 + GST' },
    helpCard: { title: 'Using the free WhatsApp Business App?', body: 'The API unlocks bulk messaging, automation and CRM integration the app cannot do.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>The WhatsApp Business API is the official, scalable version of WhatsApp for businesses — allowing you to send transactional messages, marketing broadcasts, automated notifications and customer support messages to thousands of contacts, integrated with your CRM or helpdesk.</p><p>LauncherDesk handles the Meta Business Manager setup, API account verification, phone number registration and basic automation configuration.</p>` },
      who: {
        heading: "Who it's for", items: [
          'Businesses that want to send transactional or marketing messages via WhatsApp at scale',
          'E-commerce businesses that want to send order updates, shipping notifications and promotions',
          'Startups that want to automate customer communication and lead follow-up on WhatsApp',
          'Businesses with a CRM that want WhatsApp integrated into their sales workflow',
        ]
      },
      included: {
        heading: "What's included", items: [
          'WhatsApp Business API account setup and verification',
          'Business phone number registration and verification',
          'Meta Business Manager setup',
          'Message template creation and approval',
          'Integration with CRM or helpdesk tool (where applicable)',
          'Basic automation setup — welcome messages, enquiry responses',
          'Team training and handover',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Meta Business Manager setup', body: 'We set up or connect your Meta Business Manager account.' },
          { title: 'API account application', body: 'We apply for WhatsApp Business API access via an approved Business Solution Provider.' },
          { title: 'Phone number verification', body: 'Your business phone number is registered and verified.' },
          { title: 'Template creation', body: 'We create and submit message templates for Meta approval.' },
          { title: 'Integration and automation', body: 'API connected to your CRM or system; basic automations configured.' },
          { title: 'Handover and training', body: 'We hand over the setup with documentation and team training.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', "LauncherDesk's work: setup, integration, training"],
          ['Platform fees', 'WhatsApp conversation fees charged by Meta — depends on message volume'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'What is the difference between WhatsApp Business App and WhatsApp Business API?', a: 'The WhatsApp Business App is free but limited — only one device, no bulk messaging, no CRM integration. The API is for scale: multiple agents, CRM integration, automated messages and broadcasts.' },
          { q: 'How long does approval take?', a: 'WhatsApp Business API setup and verification typically takes 2–4 weeks, subject to Meta approval process and timelines.' },
          { q: 'Does LauncherDesk guarantee API approval?', a: 'Approval decisions are made by Meta, not LauncherDesk. We follow best practices to maximise approval chances and guide you through the process.' },
        ]
      }
    },
    related: [
      { href: '/services/crm-setup-lead-management', label: 'CRM Setup', note: 'Integrate WhatsApp with your sales pipeline.' },
      { href: '/services/digital-marketing', label: 'Digital Marketing', note: 'Combine WhatsApp with SEO and social media.' },
      { href: '/services/business-automation', label: 'Business Automation', note: 'Automate your full customer journey.' },
    ]
  },

  'crm-setup-lead-management': {
    title: 'CRM Setup & Lead Management',
    metaTitle: 'CRM Setup & Lead Management for SMEs India | LauncherDesk',
    metaDesc: 'CRM setup, pipeline configuration and lead management for startups and SMEs in India. HubSpot, Zoho CRM, Freshsales and custom solutions.',
    eyebrow: 'GROW — Marketing',
    crumbCategory: 'GROW',
    lead: 'Stop losing leads in spreadsheets. Get a working CRM that tracks every enquiry, manages follow-ups and shows you exactly where your sales pipeline stands.',
    priceCard: { label: 'Starts from', price: '₹25,000*', sub: '' },
    helpCard: { title: 'Using spreadsheets to track leads?', body: 'A properly set-up CRM pays for itself quickly in recovered leads.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>A CRM (Customer Relationship Management) system is the backbone of any business that generates leads and needs to convert them into customers. Without a CRM, leads fall through the cracks, follow-ups are missed and there is no visibility on sales performance.</p><p>LauncherDesk sets up the right CRM for your business size and sales process — configured, populated with your leads and integrated with your website and WhatsApp.</p>` },
      who: {
        heading: "Who it's for", items: [
          'Businesses receiving leads but losing track of follow-ups and conversions',
          'Sales teams that want a structured pipeline management system',
          'Startups moving from spreadsheets to a proper CRM for the first time',
          'Companies that want WhatsApp and website leads to flow into one system',
        ]
      },
      included: {
        heading: "What's included", items: [
          'CRM tool selection and recommendation (HubSpot, Zoho CRM, Freshsales or others)',
          'CRM account setup and configuration',
          'Lead pipeline setup and stage definition',
          'Custom fields and data structure setup',
          'Lead capture form integration (website, WhatsApp, landing pages)',
          'Basic automation setup (lead assignment, follow-up reminders)',
          'Team training and handover',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Requirements discussion', body: 'We understand your sales process, team size and lead sources.' },
          { title: 'CRM selection', body: 'We recommend the right CRM platform for your needs and budget.' },
          { title: 'Setup and configuration', body: 'We configure the CRM — pipeline stages, custom fields, user permissions.' },
          { title: 'Integrations', body: 'Website lead forms, WhatsApp and other sources connected to the CRM.' },
          { title: 'Automation setup', body: 'Lead assignment rules, follow-up reminders and basic email sequences configured.' },
          { title: 'Training and handover', body: 'Team trained on the CRM with documentation.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', "LauncherDesk's work: setup, configuration, training"],
          ['CRM subscription', 'HubSpot, Zoho or chosen platform — passed through at cost'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Which CRM do you recommend?', a: 'For most SMEs, Zoho CRM offers the best value. HubSpot is strong for marketing-driven businesses. We recommend after understanding your team size, budget and sales process.' },
          { q: 'How long does CRM setup take?', a: 'Basic CRM setup typically takes 1–2 weeks. More complex configurations with integrations may take 3–4 weeks.' },
          { q: 'Can you migrate data from our existing spreadsheets?', a: 'Yes. We import existing lead and customer data from your spreadsheets or previous CRM as part of the setup.' },
        ]
      }
    },
    related: [
      { href: '/services/whatsapp-business-api', label: 'WhatsApp Business API', note: 'Integrate WhatsApp leads into your CRM.' },
      { href: '/services/digital-marketing', label: 'Digital Marketing', note: 'Generate the leads your CRM will manage.' },
      { href: '/services/business-automation', label: 'Business Automation', note: 'Automate follow-ups and customer journeys.' },
    ]
  },

  'social-media-management': {
    title: 'Social Media Management',
    metaTitle: 'Social Media Management for Business India | LauncherDesk',
    metaDesc: 'Social media management for startups and SMEs in India. Instagram, LinkedIn, Facebook and X content strategy, design, posting and community management.',
    eyebrow: 'GROW — Marketing',
    crumbCategory: 'GROW',
    lead: 'Build a consistent, professional social media presence that represents your brand, reaches your audience and grows over time — without you managing it yourself.',
    priceCard: { label: 'Total (incl. GST)', price: '₹9,440', sub: 'Professional fee ₹8,000 + GST' },
    helpCard: { title: 'Not sure which platforms to be on?', body: 'We help you identify the right platforms for your business and audience.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" },
      { href: '#platforms', label: 'Platforms' },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>Social media is where your potential customers spend time — and a professional, consistent presence builds brand trust before they ever visit your website. LauncherDesk manages your social media end to end: strategy, content creation, scheduling, posting and basic community management.</p>` },
      who: {
        heading: "Who it's for", items: [
          'Businesses that have social media accounts but no consistent content strategy',
          'Startups that want to build brand awareness on Instagram or LinkedIn',
          'Founders who want to outsource social media to a team that understands business',
          'Companies whose social media has gone quiet and needs to restart professionally',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Social media strategy and platform selection',
          'Monthly content calendar',
          'Post design and copywriting',
          'Scheduled posting on agreed platforms',
          'Basic community management (responding to comments and messages)',
          'Monthly performance report',
        ]
      },
      platforms: {
        heading: 'Platforms we manage', content: `<ul>
        <li><b>Instagram</b> — visual storytelling, Reels, Stories and brand building</li>
        <li><b>LinkedIn</b> — B2B audiences, thought leadership and professional credibility</li>
        <li><b>Facebook</b> — local businesses, community building and broad reach</li>
        <li><b>X (Twitter)</b> — tech, startup and real-time engagement</li>
      </ul><p>We recommend the right platform mix for your audience — not all platforms are right for every business.</p>` },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Strategy and audit', body: 'We assess your current social media and define a content strategy suited to your business.' },
          { title: 'Content calendar', body: 'Monthly calendar planned and approved before any posts go live.' },
          { title: 'Content creation', body: 'Design and copy for each post, created by our team.' },
          { title: 'Publishing', body: 'Posts scheduled and published at optimal times.' },
          { title: 'Reporting', body: 'Monthly performance report covering reach, engagement and growth.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', "LauncherDesk's work: strategy, content creation, management"],
          ['Ad spend', 'Paid promotion budget — optional, separate from management fee'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'How many posts per month are included?', a: 'Typically 12–16 posts per month across the agreed platforms. Exact frequency is agreed in the content calendar.' },
          { q: 'Do I need to approve posts before they go live?', a: 'Yes. The content calendar is shared with you for review and approval before any posts are published.' },
          { q: 'Can you run paid ads too?', a: 'Yes. Paid social advertising (Instagram, LinkedIn, Facebook) is available as an add-on to organic management.' },
        ]
      }
    },
    related: [
      { href: '/services/digital-marketing', label: 'SEO & Digital Marketing', note: 'Combine social with organic search.' },
      { href: '/services/branding-logo-design', label: 'Branding & Logo Design', note: 'Build the brand identity behind your content.' },
      { href: '/services/crm-setup-lead-management', label: 'CRM Setup', note: 'Capture social leads into your CRM.' },
    ]
  },

  'google-ads-paid-marketing': {
    title: 'Google Ads & Paid Marketing',
    metaTitle: 'Google Ads & Paid Marketing for Businesses India | LauncherDesk',
    metaDesc: 'Google Ads setup and management for startups and businesses in India. Search ads, lead generation campaigns, monthly optimisation and performance reporting.',
    eyebrow: 'GROW — Marketing',
    crumbCategory: 'GROW',
    lead: 'Get your business in front of the right customers on Google — with properly set up, managed and optimised paid campaigns that generate real leads.',
    priceCard: { label: 'Management fee from', price: 'Custom quote', sub: '+ your Google Ads budget (separate)' },
    helpCard: { title: 'Running Google Ads yourself?', body: 'Poorly managed campaigns spend budget without results — let us take it over.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>Google Ads puts your business at the top of search results when potential customers are actively looking for what you offer. Unlike SEO, results are immediate — but poorly managed campaigns can burn budget without delivering leads.</p><p>LauncherDesk sets up, manages and continuously optimises your Google Ads campaigns — targeting the right keywords, writing effective ads and making data-driven adjustments each month.</p>` },
      who: {
        heading: "Who it's for", items: [
          'Businesses that want immediate visibility on Google for their services',
          'Startups that want to test a market quickly without waiting for SEO results',
          'Companies running Google Ads that are not performing and want expert management',
          'Businesses with a clear offer and budget ready to invest in paid leads',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Campaign strategy and keyword research',
          'Google Ads account setup and campaign creation',
          'Ad copy writing and A/B testing',
          'Conversion tracking setup (form fills, calls, WhatsApp)',
          'Monthly campaign monitoring and bid optimisation',
          'Negative keyword management',
          'Monthly performance report (impressions, clicks, leads, cost per lead)',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Campaign strategy', body: 'We research keywords, competitors and audience targeting before spending a rupee.' },
          { title: 'Account setup', body: 'Google Ads account configured with the right campaign types and settings.' },
          { title: 'Ad creation', body: 'Compelling ad copy written and tested for performance.' },
          { title: 'Conversion tracking', body: 'Tracking set up so we know exactly which ads generate leads.' },
          { title: 'Monthly optimisation', body: 'Ongoing bid adjustments, keyword refinements and ad testing.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Management fee', "LauncherDesk's management work — strategy, setup, optimisation"],
          ['Google Ads budget', 'Your ad spend paid directly to Google — separate from the management fee'],
          ['Taxes', 'GST on the management fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'What is a recommended Google Ads budget for a small business?', a: 'We advise a minimum budget based on your category and competition. Most SMEs start effectively with ₹15,000–50,000 per month in ad spend.' },
          { q: 'How soon will I see results?', a: 'Google Ads campaigns can be live within 1–2 weeks of engagement. Initial lead data is typically available within 4–6 weeks of campaign launch.' },
          { q: 'What is the difference between Google Ads and SEO?', a: 'Google Ads (paid) delivers immediate visibility in exchange for a budget. SEO (organic) builds long-term rankings without ongoing ad spend. They work best together.' },
        ]
      }
    },
    related: [
      { href: '/services/digital-marketing', label: 'SEO & Digital Marketing', note: 'Combine paid and organic for full coverage.' },
      { href: '/services/crm-setup-lead-management', label: 'CRM Setup', note: 'Capture paid leads into a managed pipeline.' },
      { href: '/services/website-development', label: 'Website Development', note: 'Ads need a converting landing page.' },
    ]
  },

  'uae-business-setup': {
    title: 'UAE Business Setup',
    metaTitle: 'UAE Business Setup from India | Dubai Free Zone Company | LauncherDesk',
    metaDesc: 'Set up a business in the UAE from India. Dubai free zone or mainland company registration, trade licence, visa support and bank account guidance.',
    eyebrow: 'EXPAND — International',
    crumbCategory: 'EXPAND',
    lead: 'Establish your business in the UAE — with clear guidance on the right free zone or mainland structure, trade licence, visa options and operational setup.',
    priceCard: { label: 'Starts from', price: 'Custom quote', sub: '+ free zone / mainland fees' },
    helpCard: { title: 'Not sure which UAE free zone is right?', body: 'We recommend based on your business activity, budget and visa needs.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>The UAE is one of the most popular international destinations for Indian entrepreneurs — offering 100% foreign ownership in free zones, strategic access to Middle East and global markets, and a well-established business infrastructure.</p><p>LauncherDesk coordinates UAE company setup from India — free zone or mainland, trade licence, visa guidance and bank account opening support — through our UAE partner network.</p>` },
      who: {
        heading: "Who it's for", items: [
          'Indian entrepreneurs and businesses that want a UAE presence',
          'Founders who want to access Middle East and global markets through a UAE entity',
          'Businesses in e-commerce, consulting, technology or trading looking for a UAE base',
          'Indian companies expanding into the GCC region',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Free Zone vs Mainland guidance and recommendation',
          'Trade licence application coordination',
          'Shareholder and director documentation support',
          'Registered address / virtual office coordination',
          'Visa eligibility and application guidance (investor/employee visa)',
          'UAE bank account opening guidance',
          'Post-setup compliance and annual renewal guidance',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Consultation and structure recommendation', body: 'We understand your business activity and recommend the right free zone or mainland setup.' },
          { title: 'Document preparation', body: 'We guide you through the documentation required for UAE company formation.' },
          { title: 'Trade licence application', body: 'Application filed with the chosen free zone or mainland authority.' },
          { title: 'Visa and address setup', body: 'Investor visa application, registered address and virtual office coordination.' },
          { title: 'Bank account guidance', body: 'We guide you through UAE business bank account opening requirements.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', "LauncherDesk's coordination and documentation work"],
          ['Free zone / mainland fees', 'Trade licence, registration and visa fees — vary by jurisdiction and activity'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'What is the difference between a Free Zone and Mainland company?', a: 'A Free Zone company can be 100% foreign-owned and is best for international trade and digital services. A Mainland company allows direct trade within the UAE market. We recommend the right structure after understanding your business model.' },
          { q: 'Can I open a UAE bank account as an Indian resident?', a: 'Yes, but UAE bank account opening requires in-person visits for most banks. We guide you on the process and which banks are accessible to non-residents.' },
          { q: 'How long does UAE company setup take?', a: 'Typically 2–4 weeks from document submission, subject to the chosen authority processing timeline.' },
        ]
      }
    },
    related: [
      { href: '/services/fundraising-documentation', label: 'Fundraising Documentation', note: 'UAE entities often used for international fundraising.' },
      { href: '/services/private-limited-company-registration', label: 'Indian Company Registration', note: 'Keep your Indian entity alongside UAE entity.' },
      { href: '/services/business-consulting', label: 'Business Consulting', note: 'Strategic guidance on international expansion.' },
    ]
  },

  'fundraising-documentation': {
    title: 'Fundraising Documentation for Startups',
    metaTitle: 'Fundraising Documentation for Startups India | Pitch Deck & Projections | LauncherDesk',
    metaDesc: 'Investor-ready fundraising documentation for Indian startups. Pitch decks, financial projections, cap table modelling and investor data room preparation.',
    eyebrow: 'EXPAND — Fundraising',
    crumbCategory: 'EXPAND',
    lead: 'Prepare the documentation investors expect — pitch deck, financial projections, cap table and data room — coordinated through one team that understands early-stage fundraising.',
    priceCard: { label: 'Total (incl. GST)', price: '₹14,160', sub: 'Professional fee ₹12,000 + GST' },
    helpCard: { title: 'Preparing for an investor meeting?', body: 'A well-prepared pitch deck and data room makes the difference.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>Raising funding requires more than a great idea — investors expect a structured pitch deck, credible financial projections, a clean cap table and an organised data room. Poorly prepared fundraising documentation signals inexperience and slows down deals.</p><p>LauncherDesk coordinates investor-ready fundraising documentation through experienced professionals who understand what early-stage investors look for.</p><p><strong>Disclaimer:</strong> LauncherDesk does not provide SEBI-regulated investment banking or securities advisory services. This service covers documentation and preparation support only. Fundraising outcomes and investor decisions are outside LauncherDesk's control.</p>` },
      who: {
        heading: "Who it's for", items: [
          'Startups raising their first angel round or seed funding',
          'Founders who need a professional pitch deck and financial model for investor conversations',
          'Companies preparing for VC conversations and needing a proper data room',
          'Businesses seeking DPIIT-related government scheme funding',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Pitch deck structure and content review',
          'Pitch deck design and final polished version',
          'Financial projections model (3-year P&L, revenue assumptions, burn rate)',
          'Cap table review and basic modelling',
          'Investor data room setup and document checklist',
          'One round of revisions included',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Founder briefing', body: 'We understand your business, traction, funding ask and investor target profile.' },
          { title: 'Pitch deck structure', body: 'We create the narrative flow and content structure before any design.' },
          { title: 'Deck design', body: 'We design a professional, investor-standard pitch deck.' },
          { title: 'Financial model', body: 'We build or review the 3-year financial projection model.' },
          { title: 'Data room setup', body: 'We organise all required documents into a clean investor data room.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', "LauncherDesk's work: deck design, financial model, data room"],
          ['Government fee', 'Not applicable'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'How long does a pitch deck take?', a: 'Typically 2–3 weeks from the founder briefing to final deck.' },
          { q: 'Do you connect us with investors?', a: 'LauncherDesk does not provide introductions to investors as part of this service. We focus on making your documentation investor-ready.' },
          { q: 'What financial projections do investors expect?', a: 'Typically a 3-year P&L forecast, revenue build-up model, burn rate and runway calculation, and unit economics. We build these in a format investors can interrogate.' },
        ]
      }
    },
    related: [
      { href: '/services/startup-india-dpiit', label: 'Startup India / DPIIT', note: 'DPIIT recognition strengthens your investor story.' },
      { href: '/services/accounting', label: 'Accounting', note: 'Clean historical financials support your projections.' },
      { href: '/services/business-consulting', label: 'Business Consulting', note: 'Strategic guidance alongside fundraising prep.' },
    ]
  },

  'business-consulting': {
    title: 'Business Consulting',
    metaTitle: 'Business Consulting for Startups & SMEs India | LauncherDesk',
    metaDesc: 'Strategic business consulting for founders and small businesses in India. Business review, growth strategy, operational planning and advisory support.',
    eyebrow: 'EXPAND — Strategy',
    crumbCategory: 'EXPAND',
    lead: 'Get strategic clarity on your business — with an honest review, specific recommendations and an action plan you can actually execute.',
    priceCard: { label: 'Starts from', price: 'Custom quote', sub: '' },
    helpCard: { title: 'Facing a big business decision?', body: 'A structured consultation helps you think it through with experienced support.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>Every founder hits moments where an outside perspective is more valuable than another internal meeting — a fundraising decision, a new market entry, an operational problem that keeps recurring. LauncherDesk's business consulting service gives you structured thinking time with experienced advisors who understand the Indian startup and SME environment.</p>` },
      who: {
        heading: "Who it's for", items: [
          'Founders who want a structured review of their business and honest advice',
          'Small businesses looking for a growth strategy or operational improvement plan',
          'Startups preparing for fundraising, expansion or a major business decision',
          'Established businesses evaluating new markets or products',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Initial business review session (2 hours)',
          'Business model and competitive position analysis',
          'Identification of growth opportunities and operational gaps',
          'Strategic recommendations and prioritised action plan',
          'Follow-up session for Q&A and refinement',
          'Written summary of recommendations delivered after the session',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Pre-session brief', body: 'You share context on your business, current challenges and goals before the session.' },
          { title: 'Business review session', body: 'A structured 2-hour session reviewing your business model, market position and key challenges.' },
          { title: 'Analysis and recommendations', body: 'We analyse the session output and develop specific, actionable recommendations.' },
          { title: 'Recommendations delivery', body: 'Written summary and action plan delivered within 3 working days.' },
          { title: 'Follow-up session', body: 'A 1-hour follow-up to answer questions and refine the plan.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', 'Sessions, analysis and written recommendations'],
          ['Government fee', 'Not applicable'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Who conducts the consulting session?', a: 'Sessions are conducted by experienced business advisors coordinated through LauncherDesk — with backgrounds in operations, finance and growth across Indian startups and SMEs.' },
          { q: 'Is this ongoing or a one-time engagement?', a: 'It begins with a one-time engagement. Many clients continue with a monthly or quarterly advisory retainer after the initial session.' },
          { q: 'Can you help with a specific problem rather than a full review?', a: 'Yes. We can scope a focused session around a specific decision — pricing strategy, team structure, fundraising timing or market entry.' },
        ]
      }
    },
    related: [
      { href: '/services/fundraising-documentation', label: 'Fundraising Documentation', note: 'Combine consulting with fundraising prep.' },
      { href: '/services/uae-business-setup', label: 'UAE Business Setup', note: 'Strategic expansion to the UAE.' },
      { href: '/services/business-automation', label: 'Business Automation', note: 'Execute operational improvements with systems.' },
    ]
  },

  'mobile-app-development': {
    title: 'Mobile Application Development',
    metaTitle: 'Mobile App Development India | iOS & Android | LauncherDesk',
    metaDesc: 'Professional iOS and Android mobile application development for startups and businesses in India. Native and hybrid app development with full project coordination.',
    eyebrow: 'BUILD — Technology',
    crumbCategory: 'BUILD',
    lead: 'Build a mobile application that works — for your customers or your team — with clear scope, honest timelines and professional delivery from start to app store.',
    priceCard: { label: 'Starts from', price: 'Custom quote', sub: 'Depends on requirement' },
    helpCard: { title: 'Have a mobile app idea?', body: 'Start with a scoping conversation — we help you understand what is actually needed.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>A well-built mobile application can be the difference between a business that is hard to reach and one that is always in your customer's pocket. LauncherDesk coordinates mobile app development — from requirement scoping and UI design through to development, testing and App Store/Play Store submission.</p>` },
      who: {
        heading: "Who it's for", items: [
          'Businesses that need a customer-facing mobile application',
          'Startups building an app-first product or service',
          'Companies that need an internal mobile tool for their team or field staff',
          'Founders with a mobile app idea looking for a development partner',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Requirement scoping and feature list documentation',
          'UI/UX design for iOS and Android',
          'Native or cross-platform development (React Native or Flutter)',
          'Backend API development (where required)',
          'Testing across devices and operating system versions',
          'App Store and Google Play Store submission',
          'Post-launch support (as scoped)',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Scoping and specification', body: 'We define the feature set, user flows and technical requirements.' },
          { title: 'UI/UX design', body: 'Screen-by-screen design with your approval before development begins.' },
          { title: 'Development', body: 'Built in sprints with regular demos and check-ins.' },
          { title: 'Testing', body: 'Device testing, performance testing and bug fixing before submission.' },
          { title: 'App store submission', body: 'Submitted to Apple App Store and Google Play with all required metadata and assets.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Professional fee', "Scoped per project — design, development, testing, submission"],
          ['Platform fees', 'Apple Developer and Google Play fees — passed through at cost'],
          ['Taxes', 'GST on the professional fee, shown separately'],
        ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>`
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Do you build for iOS and Android?', a: 'Yes. We typically build using cross-platform frameworks (React Native or Flutter) so one codebase runs on both iOS and Android, reducing cost and development time.' },
          { q: 'How long does app development take?', a: 'A basic app typically takes 8–16 weeks. More complex applications take longer. Timeline and milestones are agreed in the scoping phase.' },
          { q: 'Who owns the app after development?', a: 'You do. The source code and all assets are handed over to you on project completion.' },
        ]
      }
    },
    related: [
      { href: '/services/software-saas-development', label: 'SaaS Development', note: 'Build a web app alongside your mobile app.' },
      { href: '/services/website-development', label: 'Website Development', note: 'A website to market your app.' },
      { href: '/services/digital-marketing', label: 'Digital Marketing', note: 'Drive app downloads with digital marketing.' },
    ]
  },

  // ── AI-Powered SEO sub-services ─────────────────────────────────────────────

  'ai-search-optimization': {
    title: 'AI Search Optimization',
    metaTitle: 'AI Search Optimization Services India | LauncherDesk',
    metaDesc: 'Optimize your website for AI-powered search engines including Google SGE, Bing AI and ChatGPT search. Get cited in AI-generated answers.',
    eyebrow: 'GROW — SEO',
    crumbCategory: 'GROW',
    lead: 'Get your business found in AI-generated search results — Google SGE, Bing Copilot and ChatGPT search. We optimize your content to appear as a cited source in AI answers.',
    priceCard: { label: 'Monthly retainer from', price: '₹18,999/month', sub: '+ taxes' },
    helpCard: { title: 'Want to appear in AI search?', body: 'Share your website URL and we will audit your AI search visibility.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Artificial intelligence is changing how people search for information. Google\'s Search Generative Experience (SGE), Bing Copilot and ChatGPT now answer questions directly — and they cite sources. If your website isn\'t structured to be cited by AI, you\'re invisible to the next generation of search.</p><p>LauncherDesk\'s AI Search Optimization service restructures your content, technical setup and authority signals so AI search engines choose your website as a trusted source.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Businesses whose customers use AI assistants to research products and services',
          'Companies in competitive niches where traditional SEO is saturated',
          'B2B brands that want to appear when buyers research solutions',
          'E-commerce stores losing traffic to AI-generated product summaries',
        ]
      },
      included: {
        heading: "What's included", items: [
          'AI search visibility audit (SGE, Bing AI, ChatGPT)',
          'Entity optimization — making your brand a recognized entity',
          'Structured data and schema markup implementation',
          'Content restructuring for AI citation eligibility',
          'E-E-A-T signal building (Experience, Expertise, Authority, Trust)',
          'Monthly AI search appearance tracking and reporting',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'AI visibility audit', body: 'We test how your brand appears (or doesn\'t) in AI-generated search answers.' },
          { title: 'Entity and authority setup', body: 'Register your brand as a knowledge entity with structured data and authoritative citations.' },
          { title: 'Content optimization', body: 'Rewrite and restructure content to match AI citation patterns.' },
          { title: 'Schema implementation', body: 'Add rich structured data that AI systems use to understand and cite your content.' },
          { title: 'Monthly tracking', body: 'Monitor AI appearances, citations and resulting traffic improvements.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Monthly retainer', 'From ₹18,999/month — includes audit, optimization and tracking'],
          ['Setup', 'Initial entity setup and schema implementation in month one'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'How is AI SEO different from regular SEO?', a: 'Traditional SEO focuses on ranking on the results page. AI SEO focuses on being cited inside AI-generated answers — a newer and increasingly important channel.' },
          { q: 'How long before we appear in AI search results?', a: 'Entity signals typically take 4–8 weeks to propagate. Content citations can appear sooner if your content quality is high.' },
          { q: 'Do you cover Google SGE, Bing and ChatGPT?', a: 'Yes — we optimize for all major AI search surfaces including Google SGE, Bing Copilot and ChatGPT browsing.' },
        ]
      }
    },
    related: [
      { href: '/services/seo-marketing', label: 'SEO & Search Marketing', note: 'Traditional organic search to complement AI SEO.' },
      { href: '/services/content-marketing', label: 'Content Marketing', note: 'High-quality content is the foundation of AI citations.' },
      { href: '/services/technical-seo-audits', label: 'Technical SEO Audits', note: 'Fix the technical issues AI search penalises.' },
    ]
  },

  'llm-visibility-citations': {
    title: 'LLM Visibility & Citations',
    metaTitle: 'LLM Visibility & Brand Citations | LauncherDesk',
    metaDesc: 'Get your business cited and recommended by ChatGPT, Claude, Gemini and other large language models. Build your LLM brand presence.',
    eyebrow: 'GROW — SEO',
    crumbCategory: 'GROW',
    lead: 'When users ask ChatGPT, Claude or Gemini for recommendations, does your business come up? We build the signals that make LLMs choose your brand.',
    priceCard: { label: 'Monthly retainer from', price: '₹22,999/month', sub: '+ taxes' },
    helpCard: { title: 'Ask an AI about your brand', body: 'Test it yourself — ask ChatGPT about your service category. If you don\'t appear, we can fix that.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Large Language Models (LLMs) like ChatGPT, Claude and Gemini are trained on web data and increasingly used as recommendation engines. When someone asks "what is the best company registration service in India?" — LLMs generate an answer. Your goal is to be in that answer.</p><p>LauncherDesk builds the citation footprint, authority signals and brand mentions across the web that LLMs use to identify and recommend businesses.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Businesses in service industries where buyers use AI for recommendations',
          'B2B companies where decision-makers research vendors via AI assistants',
          'Brands wanting to build AI-era authority ahead of competitors',
          'Companies already investing in SEO and looking for the next frontier',
        ]
      },
      included: {
        heading: "What's included", items: [
          'LLM brand mention audit across ChatGPT, Claude, Gemini',
          'Citation source identification and gap analysis',
          'Wikipedia and knowledge graph presence building',
          'High-authority publication placement (press, directories, reviews)',
          'Brand mention campaign across relevant web sources',
          'Monthly LLM appearance testing and reporting',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'LLM audit', body: 'We systematically test how each major LLM responds to queries about your brand and category.' },
          { title: 'Citation gap analysis', body: 'Identify which authoritative sources the LLM trusts that currently don\'t mention your brand.' },
          { title: 'Authority building', body: 'Place your brand in high-trust publications, directories and review platforms LLMs cite.' },
          { title: 'Knowledge graph entry', body: 'Build your structured entity presence so LLMs recognise your brand as a real, established entity.' },
          { title: 'Monitoring', body: 'Test LLM responses monthly and track improvements in brand mentions and recommendations.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Monthly retainer', 'From ₹22,999/month'],
          ['Minimum commitment', '3 months for meaningful LLM signal propagation'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Can you guarantee we appear in ChatGPT answers?', a: 'No provider can guarantee LLM outputs — they change with model updates. We build the underlying signals that make your brand more likely to be cited.' },
          { q: 'How long does it take?', a: 'LLMs are retrained periodically. Meaningful improvements typically take 3–6 months as new citations propagate through training data.' },
          { q: 'Which LLMs do you optimize for?', a: 'ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google), Perplexity and Bing Copilot.' },
        ]
      }
    },
    related: [
      { href: '/services/ai-search-optimization', label: 'AI Search Optimization', note: 'Complement LLM visibility with AI search presence.' },
      { href: '/services/seo-marketing', label: 'SEO & Search Marketing', note: 'Traditional SEO remains the foundation.' },
      { href: '/services/content-marketing', label: 'Content Marketing', note: 'More high-quality content means more citation opportunities.' },
    ]
  },

  'technical-seo-audits': {
    title: 'Technical SEO Audits',
    metaTitle: 'Technical SEO Audit Services India | LauncherDesk',
    metaDesc: 'Comprehensive technical SEO audits identifying site speed, crawlability, indexation and Core Web Vitals issues. Actionable fixes for Indian businesses.',
    eyebrow: 'GROW — SEO',
    crumbCategory: 'GROW',
    lead: 'A broken technical foundation kills SEO results regardless of how good your content is. We audit every technical layer of your website and give you a prioritized fix list.',
    priceCard: { label: 'One-time audit from', price: '₹12,999', sub: '+ taxes' },
    helpCard: { title: 'Not sure if your site has issues?', body: 'Share your URL and we will run a free mini-audit within 24 hours.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Technical SEO is the foundation that makes everything else work. You can have the best content in the world, but if Google can\'t crawl your pages, your site loads slowly, or you have duplicate content issues — none of that content will rank.</p><p>LauncherDesk conducts comprehensive technical SEO audits covering over 150 checkpoints and delivers a prioritized action plan your development team can execute immediately.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Businesses whose SEO results have plateaued despite good content',
          'Companies that recently launched or redesigned a website',
          'E-commerce stores with large product catalogues and indexation issues',
          'Businesses experiencing sudden traffic drops',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Crawlability and indexation audit (robots.txt, sitemap, noindex)',
          'Core Web Vitals analysis (LCP, FID, CLS)',
          'Page speed and performance audit (mobile and desktop)',
          'Duplicate content and canonicalization issues',
          'Broken links and redirect chain analysis',
          'Structured data / schema markup review',
          'Mobile usability audit',
          'Prioritized fix recommendations report',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Crawl and data collection', body: 'We crawl your entire website using professional tools to collect technical data.' },
          { title: 'Analysis', body: 'Identify issues across 150+ technical SEO checkpoints.' },
          { title: 'Prioritization', body: 'Rank issues by impact — High / Medium / Low — so you fix the most important things first.' },
          { title: 'Report delivery', body: 'Detailed report with specific fix instructions for each issue.' },
          { title: 'Implementation support', body: 'Optional: we implement the fixes for you or guide your developers.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Audit (up to 500 pages)', '₹12,999 — report delivered within 5 business days'],
          ['Audit (500–5,000 pages)', '₹24,999'],
          ['Implementation support', 'Available as add-on — quoted separately'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'How long does the audit take?', a: 'Standard audits are delivered within 5 business days. Rush delivery available.' },
          { q: 'Will you fix the issues or just report them?', a: 'The base audit includes the report. We offer an implementation add-on where our team fixes the issues directly.' },
          { q: 'Do I need to share backend access?', a: 'We only need your website URL and Google Search Console access (read-only). No backend credentials required.' },
        ]
      }
    },
    related: [
      { href: '/services/seo-marketing', label: 'SEO & Search Marketing', note: 'Ongoing SEO management after the audit.' },
      { href: '/services/website-development', label: 'Website Development', note: 'Need a technically sound website built from scratch?' },
      { href: '/services/ai-search-optimization', label: 'AI Search Optimization', note: 'Optimize beyond traditional search.' },
    ]
  },

  'local-international-seo': {
    title: 'Local & International SEO',
    metaTitle: 'Local & International SEO Services India | LauncherDesk',
    metaDesc: 'Dominate local search in your city and expand internationally. Google Maps optimization, local citations and multi-region SEO for Indian businesses.',
    eyebrow: 'GROW — SEO',
    crumbCategory: 'GROW',
    lead: 'Rank #1 in your city or expand globally — our local and international SEO strategies put your business in front of customers wherever they are searching.',
    priceCard: { label: 'Monthly retainer from', price: '₹16,999/month', sub: '+ taxes' },
    helpCard: { title: 'Where are your customers?', body: 'Tell us your target locations and we will map an SEO strategy to reach them.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Local SEO helps businesses appear in location-based searches — "CA firm in Koramangala" or "company registration in Bangalore". International SEO expands your presence to target customers across cities, states or countries.</p><p>LauncherDesk builds and executes both local and international SEO strategies — from Google Business Profile management to multi-language, multi-region site structures.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Service businesses targeting customers in specific cities or areas',
          'Retail and restaurant businesses that depend on local discovery',
          'Companies expanding from one city to multiple cities across India',
          'Businesses targeting customers in other countries (UAE, USA, UK, Singapore)',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Google Business Profile setup and optimization',
          'Local citation building (directories, review sites)',
          'Location page creation and optimization',
          'Local keyword research and targeting',
          'Review generation strategy',
          'International hreflang setup (for multi-country targeting)',
          'Monthly local rankings and Google Maps tracking',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Location audit', body: 'Assess current local search visibility across target locations.' },
          { title: 'Google Business Profile', body: 'Fully optimize your GBP listing with photos, services, posts and Q&A.' },
          { title: 'Citation building', body: 'List your business consistently across authoritative Indian directories.' },
          { title: 'Location pages', body: 'Create and optimize dedicated pages for each target city or region.' },
          { title: 'Review strategy', body: 'Implement a system for generating and managing customer reviews.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Local SEO (1 city)', 'From ₹16,999/month'],
          ['Multi-city (2–5 cities)', 'From ₹28,999/month'],
          ['International SEO', 'From ₹34,999/month — quoted based on target regions'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Do I need a physical address to do local SEO?', a: 'For Google Business Profile you need a verifiable business address. Virtual offices work for this purpose.' },
          { q: 'How long before I appear on Google Maps?', a: 'GBP optimization improvements typically show within 4–8 weeks. Citation building effects take 2–3 months.' },
          { q: 'Can you help us rank in UAE or USA?', a: 'Yes — we offer international SEO with hreflang, geo-targeting and region-specific content strategies.' },
        ]
      }
    },
    related: [
      { href: '/services/seo-marketing', label: 'SEO & Search Marketing', note: 'Full organic search strategy.' },
      { href: '/services/google-ads-paid-marketing', label: 'Google Ads', note: 'Complement local SEO with targeted local ads.' },
      { href: '/virtual-office', label: 'Virtual Office', note: 'Get a Bangalore address for local SEO.' },
    ]
  },

  // ── Lead Generation ──────────────────────────────────────────────────────────

  'meta-instagram-ads': {
    title: 'Meta & Instagram Ads',
    metaTitle: 'Meta & Instagram Ads Management India | LauncherDesk',
    metaDesc: 'Facebook and Instagram advertising for Indian businesses. Targeted Meta Ads campaigns that drive leads, sales and brand awareness.',
    eyebrow: 'GROW — Paid Ads',
    crumbCategory: 'GROW',
    lead: 'Reach your ideal customers on Facebook and Instagram with precision-targeted Meta Ads campaigns — awareness, leads, retargeting and sales, all managed by certified experts.',
    priceCard: { label: 'Management fee from', price: '₹14,999/month', sub: '+ ad spend + taxes' },
    helpCard: { title: 'Ready to advertise on Meta?', body: 'Share your business goals and budget — we will propose a campaign structure.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>With over 450 million users in India, Facebook and Instagram are among the most powerful advertising platforms available to Indian businesses. Meta\'s advertising platform allows precise targeting by interest, behavior, location, demographics and lookalike audiences.</p><p>LauncherDesk manages your Meta Ads campaigns end-to-end — from creative strategy and audience building to campaign optimization and monthly reporting.</p>' },
      who: {
        heading: "Who it's for", items: [
          'B2C businesses looking to generate leads and sales',
          'E-commerce brands wanting to drive product sales and retarget visitors',
          'Service businesses targeting specific demographics in specific cities',
          'Startups building brand awareness with limited budgets',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Campaign strategy and audience research',
          'Ad creative (copy, design and video direction)',
          'Meta Pixel setup and conversion tracking',
          'A/B testing of creatives and audiences',
          'Retargeting campaign setup',
          'Budget optimization and bid management',
          'Monthly performance reports with ROAS tracking',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Strategy and setup', body: 'Define campaign objectives, audiences and creative direction.' },
          { title: 'Pixel and tracking', body: 'Set up Meta Pixel and conversion events for accurate measurement.' },
          { title: 'Campaign launch', body: 'Launch campaigns with multiple ad sets and creative variations.' },
          { title: 'Optimization', body: 'Weekly optimization of budgets, bids and audiences based on performance data.' },
          { title: 'Reporting', body: 'Monthly reports covering impressions, clicks, leads, cost per result and ROAS.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Management fee', 'From ₹14,999/month (separate from your ad spend)'],
          ['Minimum ad spend', '₹20,000/month recommended for meaningful results'],
          ['Creative production', 'Included in management fee (copy + static design)'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Do you manage the ad spend or just strategy?', a: 'We manage both — strategy, execution and optimization. Ad spend is billed separately directly to your Meta account.' },
          { q: 'What results can I expect?', a: 'Results vary by industry and budget. We set realistic benchmarks in month one and optimize to improve them every month.' },
          { q: 'Do you create the ad designs and copy?', a: 'Yes — static ad design and copy writing is included. Video production is available as an add-on.' },
        ]
      }
    },
    related: [
      { href: '/services/google-ads-paid-marketing', label: 'Google Ads', note: 'Combine Meta and Google for full funnel coverage.' },
      { href: '/services/social-media-management', label: 'Social Media Management', note: 'Organic social to complement your paid campaigns.' },
      { href: '/services/branding-logo-design', label: 'Branding & Design', note: 'Strong branding improves ad performance.' },
    ]
  },

  'linkedin-b2b-campaigns': {
    title: 'LinkedIn B2B Campaigns',
    metaTitle: 'LinkedIn B2B Advertising India | LauncherDesk',
    metaDesc: 'LinkedIn advertising for B2B lead generation in India. Sponsored content, InMail and lead gen forms targeting decision-makers by job title and industry.',
    eyebrow: 'GROW — Paid Ads',
    crumbCategory: 'GROW',
    lead: 'Reach CEOs, founders and procurement managers directly on LinkedIn with B2B campaigns that generate qualified leads from India\'s professional network.',
    priceCard: { label: 'Management fee from', price: '₹18,999/month', sub: '+ ad spend + taxes' },
    helpCard: { title: 'Targeting B2B decision-makers?', body: 'Tell us your ICP — we will show you exactly how to reach them on LinkedIn.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>LinkedIn is the only platform where you can target professionals specifically by job title, company size, industry and seniority. For B2B businesses, this precision targeting makes LinkedIn the highest-quality lead generation channel — even if costs per click are higher than other platforms.</p><p>LauncherDesk manages LinkedIn ad campaigns with a focus on cost-per-lead efficiency — from sponsored content and lead gen forms to InMail and retargeting campaigns.</p>' },
      who: {
        heading: "Who it's for", items: [
          'B2B software and SaaS companies targeting businesses in India',
          'Professional services firms (CA, legal, consulting, HR) targeting companies',
          'IT services and outsourcing companies reaching decision-makers',
          'Startups targeting enterprise clients and procurement teams',
        ]
      },
      included: {
        heading: "What's included", items: [
          'LinkedIn Campaign Manager setup and management',
          'Audience targeting by job title, industry, company size and seniority',
          'Sponsored Content (single image, carousel, video)',
          'Lead Gen Form campaigns (native forms with pre-filled data)',
          'Message Ads (InMail) campaigns',
          'LinkedIn Insight Tag and conversion tracking setup',
          'Monthly reporting with cost per lead and pipeline metrics',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'ICP definition', body: 'Define your ideal customer profile — titles, industries, company sizes.' },
          { title: 'Campaign structure', body: 'Build campaigns targeting different audience segments with tailored messaging.' },
          { title: 'Creative and copy', body: 'Develop ad copy and visuals optimized for professional audiences.' },
          { title: 'Lead Gen Forms', body: 'Set up native LinkedIn Lead Gen Forms for maximum conversion rates.' },
          { title: 'Optimization and reporting', body: 'Bi-weekly optimization and monthly reports with pipeline quality assessment.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Management fee', 'From ₹18,999/month'],
          ['Minimum ad spend', '₹30,000/month (LinkedIn CPCs are higher but quality is better)'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Why is LinkedIn advertising more expensive than Facebook?', a: 'LinkedIn\'s B2B targeting precision commands a premium. The leads are typically higher quality and closer to purchase decisions.' },
          { q: 'What industries work best on LinkedIn?', a: 'IT/software, professional services, HR, finance, manufacturing and education perform particularly well.' },
          { q: 'How many leads can I expect?', a: 'This varies by industry and offer. We set benchmark CPL targets in the first month and optimize from there.' },
        ]
      }
    },
    related: [
      { href: '/services/google-ads-paid-marketing', label: 'Google Ads', note: 'Capture high-intent B2B searches on Google.' },
      { href: '/services/content-marketing', label: 'Content Marketing', note: 'Thought leadership content to support your LinkedIn campaigns.' },
      { href: '/services/social-media-management', label: 'Social Media Management', note: 'Organic LinkedIn presence alongside paid campaigns.' },
    ]
  },

  'youtube-advertising': {
    title: 'YouTube Advertising',
    metaTitle: 'YouTube Advertising Services India | LauncherDesk',
    metaDesc: 'YouTube video advertising for Indian businesses. TrueView, bumper ads and YouTube Shorts campaigns managed by LauncherDesk to drive awareness and leads.',
    eyebrow: 'GROW — Paid Ads',
    crumbCategory: 'GROW',
    lead: 'Reach India\'s 500 million YouTube viewers with targeted video ads — from skippable TrueView campaigns to YouTube Shorts ads — all managed by LauncherDesk.',
    priceCard: { label: 'Management fee from', price: '₹12,999/month', sub: '+ ad spend + taxes' },
    helpCard: { title: 'Have a video ready to promote?', body: 'Share it and we will set up a YouTube campaign targeting your ideal audience.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>YouTube is India\'s largest video platform and the second largest search engine globally. Video advertising on YouTube allows you to reach highly targeted audiences — by interest, search behavior, demographics and even competitor channels.</p><p>LauncherDesk manages YouTube advertising campaigns across all formats — skippable in-stream, non-skippable, bumper ads and YouTube Shorts — with full setup, optimization and reporting.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Businesses with video content ready to promote',
          'Brands wanting to build awareness at lower CPMs than television',
          'E-commerce companies showcasing products through video demos',
          'Ed-tech, FMCG and service businesses with strong visual stories',
        ]
      },
      included: {
        heading: "What's included", items: [
          'YouTube campaign setup in Google Ads',
          'Audience targeting (interests, keywords, placements, remarketing)',
          'All ad format management (TrueView, bumper, Shorts)',
          'Video creative guidance and optimization',
          'Bid and budget optimization',
          'Brand lift and view-through conversion tracking',
          'Monthly performance reports',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Strategy and audience', body: 'Define campaign objectives and build target audience segments.' },
          { title: 'Campaign setup', body: 'Configure YouTube campaigns with correct targeting, bidding and ad formats.' },
          { title: 'Creative review', body: 'Review your video assets for platform fit and suggest edits if needed.' },
          { title: 'Launch and optimize', body: 'Monitor view rates, click-through rates and conversion metrics weekly.' },
          { title: 'Monthly reporting', body: 'Comprehensive report covering views, reach, frequency and leads generated.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Management fee', 'From ₹12,999/month'],
          ['Minimum ad spend', '₹15,000/month for meaningful reach'],
          ['Video production', 'Available as an add-on — quoted separately'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Do I need a video to run YouTube ads?', a: 'Yes — you need at least one video asset. We can refer you to our video production partners or guide your team on creating effective ad videos.' },
          { q: 'Can I target by language?', a: 'Yes — we can target Hindi, Kannada, Tamil, Telugu and other regional languages alongside English.' },
          { q: 'What video length works best?', a: 'For TrueView skippable ads, the first 5 seconds are critical. We recommend a 30-60 second core ad with a shorter 6-second bumper version.' },
        ]
      }
    },
    related: [
      { href: '/services/meta-instagram-ads', label: 'Meta & Instagram Ads', note: 'Complement YouTube with social video ads.' },
      { href: '/services/google-ads-paid-marketing', label: 'Google Ads', note: 'Combine video with search ads for full funnel.' },
      { href: '/services/content-marketing', label: 'Content Marketing', note: 'Video content strategy support.' },
    ]
  },

  'remarketing-retargeting': {
    title: 'Remarketing & Retargeting',
    metaTitle: 'Remarketing & Retargeting Services India | LauncherDesk',
    metaDesc: 'Re-engage website visitors who didn\'t convert with targeted remarketing campaigns across Google, Meta, LinkedIn and YouTube.',
    eyebrow: 'GROW — Paid Ads',
    crumbCategory: 'GROW',
    lead: 'Most visitors leave without converting. Remarketing brings them back — targeting people who already know you with the right message at the right time.',
    priceCard: { label: 'Management fee from', price: '₹10,999/month', sub: '+ ad spend + taxes' },
    helpCard: { title: 'Losing visitors who don\'t convert?', body: 'We set up remarketing campaigns that follow up with warm prospects across platforms.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>The average website converts only 2–3% of visitors. Remarketing lets you re-engage the other 97% — people who have already visited your website, viewed a product, or engaged with your ads — with targeted messages designed to bring them back and convert.</p><p>LauncherDesk sets up and manages remarketing campaigns across Google Display, Meta, LinkedIn and YouTube — with audience segmentation, creative tailored to each stage and frequency capping to avoid ad fatigue.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Any business running paid or organic traffic to their website',
          'E-commerce stores with cart abandonment issues',
          'Service businesses with long consideration cycles',
          'B2B companies wanting to stay top-of-mind with prospects',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Pixel and tag setup (Google, Meta, LinkedIn)',
          'Audience segmentation (homepage visitors, product viewers, cart abandoners)',
          'Remarketing campaigns across Google Display, Meta, YouTube',
          'Sequenced ad creative — different messages for different funnel stages',
          'Frequency capping to prevent ad fatigue',
          'Conversion tracking and attribution setup',
          'Monthly optimization and reporting',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Pixel implementation', body: 'Install tracking pixels on your website for each platform.' },
          { title: 'Audience building', body: 'Create segmented audiences based on pages visited, time on site and actions taken.' },
          { title: 'Campaign setup', body: 'Launch remarketing campaigns with audience-specific creative and messaging.' },
          { title: 'Creative sequencing', body: 'Set up sequential messaging — different ads for first visit, repeated visit, cart abandoner.' },
          { title: 'Optimization', body: 'Monitor frequency, CTR and conversion rates and adjust weekly.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Management fee', 'From ₹10,999/month (often added to existing campaign management)'],
          ['Minimum ad spend', '₹10,000/month across remarketing campaigns'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Do I need existing traffic for remarketing to work?', a: 'Yes — you need at least 500–1,000 monthly visitors to build effective remarketing audiences.' },
          { q: 'Isn\'t remarketing annoying to users?', a: 'Done badly, yes. Done well — with frequency caps and relevant messaging — remarketing is one of the most effective ad formats.' },
          { q: 'Which platforms should I remarket on?', a: 'We recommend starting with Google Display and Meta, then adding YouTube and LinkedIn based on where your audience spends time.' },
        ]
      }
    },
    related: [
      { href: '/services/google-ads-paid-marketing', label: 'Google Ads', note: 'Run search ads alongside remarketing.' },
      { href: '/services/meta-instagram-ads', label: 'Meta & Instagram Ads', note: 'Social remarketing to website visitors.' },
      { href: '/services/technical-seo-audits', label: 'Technical SEO', note: 'Improve the landing page users return to.' },
    ]
  },

  // ── Social Media ─────────────────────────────────────────────────────────────

  'content-calendar-posting': {
    title: 'Content Calendar & Posting',
    metaTitle: 'Social Media Content Calendar & Posting Service | LauncherDesk',
    metaDesc: 'Done-for-you social media content calendar and posting service. Consistent publishing on Instagram, LinkedIn, Facebook and X for Indian businesses.',
    eyebrow: 'GROW — Social Media',
    crumbCategory: 'GROW',
    lead: 'Never run out of things to post. We build your monthly content calendar, write the captions, design the visuals and publish on schedule — consistently, every month.',
    priceCard: { label: 'Monthly retainer from', price: '₹11,999/month', sub: '+ taxes' },
    helpCard: { title: 'Inconsistent posting?', body: 'We handle your entire content calendar end-to-end. Tell us your platforms.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Consistent social media presence builds trust, grows followers and keeps your brand top-of-mind. The biggest challenge for most businesses is consistency — coming up with ideas, creating content and posting regularly across multiple platforms.</p><p>LauncherDesk takes this entirely off your plate. We plan, create and post content on your behalf — with a monthly content calendar you approve in advance.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Small businesses and startups that want a professional social presence',
          'Founders who know they should post but don\'t have time',
          'Companies with inconsistent posting histories',
          'Businesses launching on social media for the first time',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Monthly content calendar (15–30 posts per month)',
          'Caption writing in your brand voice',
          'Static graphic design for each post',
          'Hashtag research and optimization',
          'Scheduling and posting on approved platforms',
          'Instagram, LinkedIn, Facebook and X (Twitter) coverage',
          'Monthly analytics summary',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Brand onboarding', body: 'We understand your brand voice, audience and content preferences.' },
          { title: 'Monthly content plan', body: 'Deliver the content calendar for the month for your review and approval.' },
          { title: 'Design and copywriting', body: 'Create all visuals and captions based on the approved plan.' },
          { title: 'Approval', body: 'You review and approve (or request edits) before anything goes live.' },
          { title: 'Scheduling and publishing', body: 'We schedule and publish posts at optimal times on each platform.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Starter (15 posts/month, 2 platforms)', 'From ₹11,999/month'],
          ['Growth (25 posts/month, 4 platforms)', 'From ₹18,999/month'],
          ['Pro (30+ posts + reels, all platforms)', 'From ₹28,999/month'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Do I get to review posts before they go live?', a: 'Yes — we share the full monthly content calendar for approval before scheduling anything.' },
          { q: 'Which platforms do you cover?', a: 'Instagram, LinkedIn, Facebook and X (Twitter). YouTube Shorts available as an add-on.' },
          { q: 'Do you write in Hindi or regional languages?', a: 'Yes — we create content in English and Hindi. Regional language support is available on request.' },
        ]
      }
    },
    related: [
      { href: '/services/social-media-management', label: 'Social Media Management', note: 'Full social media management including community and strategy.' },
      { href: '/services/reels-short-form-video', label: 'Reels & Short-Form Video', note: 'Add video content to your posting plan.' },
      { href: '/services/branding-logo-design', label: 'Branding & Design', note: 'Ensure your social visuals match your brand identity.' },
    ]
  },

  'community-management': {
    title: 'Community Management',
    metaTitle: 'Social Media Community Management India | LauncherDesk',
    metaDesc: 'Professional social media community management — responding to comments, DMs and reviews on behalf of your brand across all platforms.',
    eyebrow: 'GROW — Social Media',
    crumbCategory: 'GROW',
    lead: 'Never miss a customer comment or DM again. We monitor and respond to your social media community on your behalf — building relationships and protecting your brand reputation.',
    priceCard: { label: 'Monthly retainer from', price: '₹8,999/month', sub: '+ taxes' },
    helpCard: { title: 'Missing customer messages?', body: 'Tell us your platforms and response expectations — we\'ll handle it.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Social media community management is the practice of actively monitoring and engaging with your audience across all platforms — responding to comments, handling DMs, addressing negative reviews and fostering positive conversations.</p><p>LauncherDesk provides professional community managers who respond on your behalf within agreed timelines, in your brand voice, across Instagram, LinkedIn, Facebook and Google Reviews.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Businesses with active social media accounts that are struggling to keep up with engagement',
          'Brands that have received negative reviews or comments needing professional handling',
          'E-commerce businesses with high volumes of customer queries via social media',
          'Companies that want to build community and loyalty with their audience',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Daily monitoring of all social media accounts',
          'Comment and DM responses (within 4 hours, business hours)',
          'Google Reviews and Facebook reviews management',
          'Brand mention monitoring and alerts',
          'Negative comment escalation protocol',
          'Weekly engagement report',
          'Monthly community health summary',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Brand voice documentation', body: 'We document your brand voice, FAQs and escalation protocols.' },
          { title: 'Platform access setup', body: 'Secure, limited access to your social accounts for monitoring and responding.' },
          { title: 'Active monitoring', body: 'Daily monitoring with response within agreed SLA (4 hours in business hours).' },
          { title: 'Escalation handling', body: 'Complex queries and negative comments escalated to you with recommended responses.' },
          { title: 'Weekly reporting', body: 'Engagement metrics, response rate and sentiment summary each week.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Basic (2 platforms, 6-hour response SLA)', 'From ₹8,999/month'],
          ['Standard (4 platforms, 4-hour SLA)', 'From ₹14,999/month'],
          ['Pro (all platforms + Google Reviews, 2-hour SLA)', 'From ₹22,999/month'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Will responses sound like a robot or a real person?', a: 'All responses are written by human community managers in your brand voice — not AI-generated templates.' },
          { q: 'What happens with complex queries or complaints?', a: 'We have an escalation protocol — complex issues are flagged to you immediately with our recommended response.' },
          { q: 'Do you cover Google Reviews?', a: 'Yes — Google Business Profile review responses are included in Standard and Pro plans.' },
        ]
      }
    },
    related: [
      { href: '/services/social-media-management', label: 'Social Media Management', note: 'Full social media management including posting.' },
      { href: '/services/content-calendar-posting', label: 'Content Calendar & Posting', note: 'Add consistent posting to your community management.' },
    ]
  },

  'ad-creative-design': {
    title: 'Ad Creative Design',
    metaTitle: 'Ad Creative Design Services India | LauncherDesk',
    metaDesc: 'High-converting ad creative design for digital campaigns — Google Display, Meta, LinkedIn, YouTube thumbnails and banner ads for Indian businesses.',
    eyebrow: 'GROW — Design',
    crumbCategory: 'GROW',
    lead: 'Great targeting with poor creative wastes your ad budget. We design high-converting ad creatives that stop the scroll, communicate clearly and drive clicks.',
    priceCard: { label: 'Monthly package from', price: '₹9,999/month', sub: '+ taxes' },
    helpCard: { title: 'Need ad creatives?', body: 'Share your brand guidelines and campaign objectives — we\'ll design for your platforms.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Ad creative is the single biggest lever in paid advertising performance. The same audience targeted with different creatives can produce wildly different results. Strong creative communicates your value proposition instantly, creates emotional connection and drives action.</p><p>LauncherDesk designs ad creatives for all digital platforms — Meta, Google Display, LinkedIn, YouTube thumbnails — with A/B testing variations built in from the start.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Businesses running paid campaigns who need professional creative',
          'Marketing teams that lack in-house design resources',
          'Companies whose ads are underperforming due to poor creative quality',
          'Brands launching new campaigns and needing multiple creative variations',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Up to 20 ad creatives per month (static)',
          'All standard sizes for Meta, Google Display and LinkedIn',
          'A/B testing variations (2 versions of each concept)',
          'Brand-aligned design with your logo, colours and fonts',
          'Ad copy review and headline optimization',
          'Source files delivered (PSD, Figma, AI)',
          'Unlimited revision rounds within scope',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Creative brief', body: 'We understand your campaign objectives, audience and key messages.' },
          { title: 'Concept development', body: 'Design 2–3 creative concepts with different visual approaches.' },
          { title: 'A/B variations', body: 'Produce multiple size variations and A/B test versions of approved concepts.' },
          { title: 'Review and revisions', body: 'Client review with revision rounds until approved.' },
          { title: 'Delivery', body: 'Final files delivered in all required formats and sizes, ready to upload.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Starter (10 creatives/month)', 'From ₹9,999/month'],
          ['Growth (20 creatives/month + copy)', 'From ₹16,999/month'],
          ['Pro (30+ creatives + animated GIFs)', 'From ₹24,999/month'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Do you provide the copy or just the design?', a: 'Ad copy (headline and body text) review is included. We can also write the copy from scratch in Growth and Pro plans.' },
          { q: 'How long does delivery take?', a: 'First batch delivered within 5 business days. Monthly refresh delivered within 3 days.' },
          { q: 'Can you create animated ads?', a: 'Yes — animated GIFs and HTML5 banners are available on Pro plans.' },
        ]
      }
    },
    related: [
      { href: '/services/meta-instagram-ads', label: 'Meta & Instagram Ads', note: 'Run your ad creatives with our campaign management.' },
      { href: '/services/branding-logo-design', label: 'Branding & Design', note: 'Ensure your brand identity is solid before running ads.' },
      { href: '/services/reels-short-form-video', label: 'Reels & Short-Form Video', note: 'Add video ads to your creative mix.' },
    ]
  },

  'reels-short-form-video': {
    title: 'Reels & Short-Form Video',
    metaTitle: 'Reels & Short-Form Video Production India | LauncherDesk',
    metaDesc: 'Instagram Reels, YouTube Shorts and short-form video content production for Indian businesses. Script, edit and optimize vertical video content.',
    eyebrow: 'GROW — Social Media',
    crumbCategory: 'GROW',
    lead: 'Short-form video is the highest-reach content format on every platform. We produce Instagram Reels, YouTube Shorts and TikTok-style videos that grow your audience organically.',
    priceCard: { label: 'Monthly package from', price: '₹14,999/month', sub: '+ taxes' },
    helpCard: { title: 'Ready to start making Reels?', body: 'Tell us your brand and goals — we\'ll plan a short-form video strategy for you.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Instagram Reels and YouTube Shorts consistently get 3–5x more organic reach than static posts. Short-form video is the most powerful free growth channel available to businesses today — if you use it consistently with high-quality content.</p><p>LauncherDesk handles the entire short-form video production process — from scriptwriting and shot lists to editing, captions, music and publishing — so you can focus on appearing on camera (or not, if you prefer faceless content).</p>' },
      who: {
        heading: "Who it's for", items: [
          'Brands wanting to grow their Instagram or YouTube audience organically',
          'Founders who want to build personal brand through short-form video',
          'E-commerce businesses showcasing products through video',
          'Service businesses that want to explain their offerings in an engaging format',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Monthly content plan with video topics and scripts',
          'Shot list and filming guidance (or we source footage)',
          'Professional video editing with captions, music and effects',
          'Platform-optimized format (9:16 vertical for Reels/Shorts)',
          'Thumbnail design for YouTube Shorts',
          'Hashtag and description optimization',
          'Scheduling and publishing',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Content strategy', body: 'Define video content pillars, topics and target audience for your short-form content.' },
          { title: 'Script and storyboard', body: 'Write scripts for each video optimized for retention and engagement.' },
          { title: 'Filming guidance', body: 'Provide shot lists and filming briefs — you film with your phone, or we source B-roll.' },
          { title: 'Editing', body: 'Professional editing with captions, music, transitions and graphics.' },
          { title: 'Publish and analyze', body: 'Schedule and publish, then analyze performance to improve the next batch.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Starter (4 videos/month)', 'From ₹14,999/month (you film, we edit)'],
          ['Growth (8 videos/month)', 'From ₹24,999/month'],
          ['Pro (12+ videos, script to publish)', 'From ₹38,999/month'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Do I need to appear on camera?', a: 'No — faceless content (screen recordings, B-roll, text-based videos) works well and we can produce it without you on camera.' },
          { q: 'What equipment do I need for filming?', a: 'A modern smartphone is sufficient. We provide lighting and audio recommendations to maximize quality.' },
          { q: 'Which platforms do you publish on?', a: 'Instagram Reels, YouTube Shorts and Facebook Reels. TikTok available if you have a business account.' },
        ]
      }
    },
    related: [
      { href: '/services/content-calendar-posting', label: 'Content Calendar & Posting', note: 'Combine video with static content for a complete social presence.' },
      { href: '/services/youtube-advertising', label: 'YouTube Advertising', note: 'Promote your best videos with paid YouTube ads.' },
      { href: '/services/social-media-management', label: 'Social Media Management', note: 'Full social media management to complement your video content.' },
    ]
  },

  // ── Design & Branding ────────────────────────────────────────────────────────

  'marketing-collaterals': {
    title: 'Marketing Collaterals',
    metaTitle: 'Marketing Collateral Design India | LauncherDesk',
    metaDesc: 'Professional marketing collateral design — brochures, flyers, pitch decks, letterheads, business cards and promotional materials for Indian businesses.',
    eyebrow: 'BUILD — Branding',
    crumbCategory: 'BUILD',
    lead: 'Professional marketing collaterals that represent your brand consistently — from business cards and brochures to pitch decks and event materials, all designed to impress.',
    priceCard: { label: 'Project from', price: '₹7,999', sub: '+ taxes, based on scope' },
    helpCard: { title: 'Need marketing materials?', body: 'Share what you need and we will quote within 24 hours.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Every physical and digital touchpoint is an opportunity to reinforce your brand. Professional marketing collaterals — brochures, pitch decks, one-pagers, letterheads — signal credibility and consistency to prospects, clients and investors.</p><p>LauncherDesk designs marketing collaterals that are consistent with your brand identity, print-ready and designed for their specific purpose — whether that\'s closing a sales deal or leaving an impression at a trade show.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Businesses that need professional marketing materials for sales and pitching',
          'Startups preparing for investor meetings and fundraising',
          'Companies attending trade shows, events or exhibitions',
          'Service businesses needing brochures and one-pagers for clients',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Brochures (bi-fold, tri-fold, corporate)',
          'Flyers and leaflets',
          'Pitch decks and investor presentations',
          'One-pagers and company profiles',
          'Business cards and letterheads',
          'Email signatures',
          'Event banners and roll-up displays',
          'Print-ready files (PDF, AI, PSD)',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Brief and brand review', body: 'Understand the collateral purpose, audience and brand guidelines.' },
          { title: 'Content collection', body: 'Gather all text, images and specifications needed.' },
          { title: 'Design', body: 'Create the collateral with 2 initial design directions.' },
          { title: 'Review and revisions', body: 'Client feedback with revision rounds until approved.' },
          { title: 'Final delivery', body: 'Print-ready files and digital versions delivered.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Business card + letterhead', 'From ₹7,999'],
          ['Brochure (tri-fold)', 'From ₹12,999'],
          ['Pitch deck (15 slides)', 'From ₹18,999'],
          ['Company profile (8 pages)', 'From ₹24,999'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Do you handle printing?', a: 'We deliver print-ready files. We can connect you with quality printing vendors in Bangalore.' },
          { q: 'Can you match our existing brand identity?', a: 'Yes — if you have brand guidelines (logo, colours, fonts), we design within that framework.' },
          { q: 'How long does design take?', a: 'Business cards: 2 days. Brochures: 4–5 days. Pitch decks: 7–10 days.' },
        ]
      }
    },
    related: [
      { href: '/services/branding-logo-design', label: 'Branding & Logo Design', note: 'Get your brand identity created first.' },
      { href: '/services/packaging-design', label: 'Packaging Design', note: 'Product packaging design for physical goods.' },
      { href: '/services/website-development', label: 'Website Development', note: 'Extend your brand identity to your website.' },
    ]
  },

  'packaging-design': {
    title: 'Packaging Design',
    metaTitle: 'Product Packaging Design India | LauncherDesk',
    metaDesc: 'Professional product packaging design for Indian businesses — boxes, labels, pouches and retail packaging that stands out on shelf and online.',
    eyebrow: 'BUILD — Branding',
    crumbCategory: 'BUILD',
    lead: 'Packaging is your product\'s first impression. We design packaging that stands out on shelf, communicates quality and reflects your brand — ready for print and production.',
    priceCard: { label: 'Project from', price: '₹14,999', sub: '+ taxes, based on scope' },
    helpCard: { title: 'Launching a physical product?', body: 'Share your product details and we will design packaging that sells.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>In a retail environment — physical or online — packaging is the first thing a customer sees. Great packaging communicates brand values, builds trust, and can be the deciding factor between your product and a competitor\'s.</p><p>LauncherDesk designs packaging for physical products across all categories — food and beverage, cosmetics, electronics accessories, apparel and more — delivering print-ready artwork compliant with Indian regulatory requirements.</p>' },
      who: {
        heading: "Who it's for", items: [
          'D2C brands launching physical products for the first time',
          'FMCG brands redesigning or refreshing existing packaging',
          'E-commerce sellers who want premium unboxing experiences',
          'Food businesses (cloud kitchens, packaged foods, beverages) needing FSSAI-compliant labels',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Packaging concept design (box, label, pouch, sleeve)',
          'Front, back and side panel design',
          'Regulatory content layout (ingredients, nutritional info, barcodes)',
          'FSSAI label compliance check (for food products)',
          'Print-ready artwork in CMYK with bleed and crop marks',
          'Dieline/structural template sourcing or creation',
          '2 design concepts with revision rounds',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Product and brand brief', body: 'Understand the product, target customer, retail context and brand personality.' },
          { title: 'Structural template', body: 'Source or create the dieline/structural template for your packaging format.' },
          { title: 'Design concepts', body: 'Create 2 distinct design directions for client review.' },
          { title: 'Refinement', body: 'Develop chosen concept through revision rounds.' },
          { title: 'Print-ready delivery', body: 'Final artwork delivered in print-ready format with all technical specifications.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Label design (single product)', 'From ₹14,999'],
          ['Box packaging design', 'From ₹22,999'],
          ['Full packaging system (box + label + insert)', 'From ₹38,999'],
          ['FSSAI compliance review', 'Included for food products'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Do you handle FSSAI label compliance?', a: 'Yes — we ensure your food packaging includes all mandatory FSSAI information in the correct format.' },
          { q: 'Can you work with our existing printer?', a: 'Yes — we deliver artwork that meets any printer\'s specifications.' },
          { q: 'Do you provide 3D mockups?', a: 'Yes — we provide photorealistic 3D renders of your packaging for presentations and e-commerce listings.' },
        ]
      }
    },
    related: [
      { href: '/services/branding-logo-design', label: 'Branding & Logo Design', note: 'Get your brand identity right before packaging design.' },
      { href: '/services/marketing-collaterals', label: 'Marketing Collaterals', note: 'Extend your brand across all marketing materials.' },
      { href: '/services/ecommerce-website', label: 'E-commerce Website', note: 'Sell your packaged product online.' },
    ]
  },

  'social-media-design': {
    title: 'Social Media Design',
    metaTitle: 'Social Media Design Services India | LauncherDesk',
    metaDesc: 'Professional social media design — Instagram posts, stories, LinkedIn banners, Facebook covers and social media templates for Indian businesses.',
    eyebrow: 'GROW — Design',
    crumbCategory: 'GROW',
    lead: 'Visually consistent, professionally designed social media graphics that make your brand look premium across Instagram, LinkedIn, Facebook and X.',
    priceCard: { label: 'Monthly package from', price: '₹8,999/month', sub: '+ taxes' },
    helpCard: { title: 'Want better-looking social media?', body: 'Share your profiles and brand colours — we\'ll show you what\'s possible.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Visual consistency across social media builds brand recognition and trust. When every post looks like it belongs to the same brand — same colours, typography, style — your profile looks professional and credible.</p><p>LauncherDesk creates social media design templates and monthly content graphics that keep your brand visually consistent across all platforms, without you needing to open a design tool.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Businesses whose social media looks inconsistent or unprofessional',
          'Marketing teams that need a steady supply of designed graphics',
          'Founders who want their Instagram or LinkedIn to look premium',
          'Brands launching on social media and setting the visual tone',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Brand-consistent social media templates (Canva, Figma or PSD)',
          'Monthly batch of designed posts (15–25 per month)',
          'Instagram feed posts, stories and highlight covers',
          'LinkedIn post graphics and banners',
          'Facebook cover photos and event banners',
          'Twitter/X header and post graphics',
          'All files delivered for easy editing',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Brand style review', body: 'Review your logo, colours, fonts and existing content to define the visual direction.' },
          { title: 'Template creation', body: 'Design a set of reusable templates for each content type and platform.' },
          { title: 'Monthly production', body: 'Produce that month\'s specific graphics using approved templates.' },
          { title: 'Delivery', body: 'Files delivered ready to post — or we post them for you with the Content Calendar service.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Template set (10 templates)', 'From ₹14,999 one-time'],
          ['Monthly graphics (15 posts)', 'From ₹8,999/month'],
          ['Monthly graphics (25 posts)', 'From ₹14,999/month'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Can I edit the templates myself?', a: 'Yes — we deliver editable Canva or Figma templates you can update in-house.' },
          { q: 'Do you post on my behalf or just deliver files?', a: 'We deliver files by default. Combine with our Content Calendar & Posting service for full management.' },
          { q: 'What formats do you design for?', a: 'Instagram (1:1, 4:5, 9:16 stories), LinkedIn (1200×627 and 1:1), Facebook (1200×630) and X/Twitter (1600×900).' },
        ]
      }
    },
    related: [
      { href: '/services/content-calendar-posting', label: 'Content Calendar & Posting', note: 'Combine design with posting management.' },
      { href: '/services/branding-logo-design', label: 'Branding & Logo Design', note: 'Get a complete brand identity first.' },
      { href: '/services/ad-creative-design', label: 'Ad Creative Design', note: 'Extend your social designs to paid ad campaigns.' },
    ]
  },

  // ── AI Automation — new services ────────────────────────────────────────────

  'whatsapp-chatbot': {
    title: 'WhatsApp Chatbot',
    metaTitle: 'WhatsApp Chatbot Development India | LauncherDesk',
    metaDesc: 'AI-powered WhatsApp chatbots for Indian businesses — automated customer support, lead qualification, appointment booking and order tracking on WhatsApp.',
    eyebrow: 'AUTOMATE — AI',
    crumbCategory: 'AUTOMATE',
    lead: 'Deploy an intelligent WhatsApp chatbot that handles customer queries, qualifies leads and books appointments 24/7 — without a human agent.',
    priceCard: { label: 'Setup from', price: '₹24,999', sub: '+ monthly retainer + taxes' },
    helpCard: { title: 'Want a bot on WhatsApp?', body: 'Tell us your use case — support, sales or booking — and we will design the right flow.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>WhatsApp has over 500 million users in India and is the primary communication channel for most customers. A WhatsApp chatbot lets you automate conversations at scale — answering FAQs, qualifying leads, collecting contact details, booking appointments and sending order updates — all without a human agent.</p><p>LauncherDesk builds AI-powered WhatsApp chatbots on the official Meta WhatsApp Business API — reliable, scalable and compliant with WhatsApp policies.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Service businesses receiving high volumes of repetitive customer queries',
          'E-commerce businesses needing automated order tracking and support',
          'Education and healthcare businesses needing appointment scheduling',
          'Real estate and financial services needing lead qualification at scale',
        ]
      },
      included: {
        heading: "What's included", items: [
          'WhatsApp Business API setup and verification',
          'Chatbot flow design (conversation maps for your use cases)',
          'AI-powered natural language understanding',
          'Lead capture and CRM integration',
          'Appointment booking flow (optional)',
          'Handover to human agent when needed',
          'Analytics dashboard — messages, leads, resolution rate',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Use case definition', body: 'Map the exact conversations the bot needs to handle.' },
          { title: 'Flow design', body: 'Design conversation flows with decision trees and AI fallbacks.' },
          { title: 'Build and integrate', body: 'Build the bot and integrate with your CRM and systems.' },
          { title: 'Testing', body: 'Comprehensive testing across all conversation paths.' },
          { title: 'Launch and monitor', body: 'Go live with ongoing monitoring and optimisation.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Setup (bot build + API)', 'From ₹24,999 one-time'],
          ['Monthly retainer', 'From ₹8,999/month — hosting, monitoring, updates'],
          ['WhatsApp conversation fees', 'Passed through at Meta rates (approx ₹0.58–₹0.89 per conversation)'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Does this use the official WhatsApp API?', a: 'Yes — we use the official Meta WhatsApp Business API. No unofficial tools that risk account bans.' },
          { q: 'Can the bot hand over to a human?', a: 'Yes — when the bot cannot handle a query, it escalates to a live agent seamlessly.' },
          { q: 'What languages does the bot support?', a: 'English and Hindi by default. Regional languages (Kannada, Tamil, Telugu) available as add-ons.' },
        ]
      }
    },
    related: [
      { href: '/services/whatsapp-business-api', label: 'WhatsApp Business API', note: 'The API foundation the chatbot runs on.' },
      { href: '/services/ai-powered-crm', label: 'AI-Powered CRM', note: 'Connect chatbot leads directly to your CRM.' },
      { href: '/services/crm-setup-lead-management', label: 'CRM Setup', note: 'Manage chatbot-generated leads.' },
    ]
  },

  'ai-voice-agent': {
    title: 'AI Voice Agent',
    metaTitle: 'AI Voice Agent for Business India | LauncherDesk',
    metaDesc: 'AI-powered voice agents that handle inbound and outbound calls for Indian businesses — customer support, appointment booking, lead qualification and reminders.',
    eyebrow: 'AUTOMATE — AI',
    crumbCategory: 'AUTOMATE',
    lead: 'An AI voice agent that answers calls, books appointments, qualifies leads and handles customer queries — available 24/7, in English and Hindi, at a fraction of the cost of a human agent.',
    priceCard: { label: 'Setup from', price: '₹34,999', sub: '+ per-minute usage + taxes' },
    helpCard: { title: 'Want AI on your phone lines?', body: 'Tell us your call volume and use case — we will design the right voice agent.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>AI voice agents are replacing traditional IVR systems and call centre agents for routine calls. They understand natural language, handle complex conversations, book appointments, qualify leads and transfer to human agents when needed — all in real time.</p><p>LauncherDesk deploys AI voice agents for inbound support, outbound lead follow-up, appointment reminders and payment reminders — with Indian language support and seamless CRM integration.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Healthcare clinics needing appointment scheduling and reminders',
          'Real estate and financial services for lead follow-up calls',
          'E-commerce businesses for order tracking and support',
          'Service businesses receiving high inbound call volumes',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Voice agent design and script development',
          'Natural language understanding in English and Hindi',
          'Inbound call handling (24/7 availability)',
          'Outbound call campaigns (lead follow-up, reminders)',
          'CRM and calendar integration',
          'Call recording and transcription',
          'Analytics — call volume, resolution rate, transfer rate',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Call flow design', body: 'Map all inbound and outbound conversation scenarios.' },
          { title: 'Voice and language setup', body: 'Configure voice, language and accent preferences.' },
          { title: 'Integration', body: 'Connect to your phone system, CRM and calendar.' },
          { title: 'Testing', body: 'Extensive testing with real call scenarios.' },
          { title: 'Launch', body: 'Go live with monitoring and continuous improvement.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Setup', 'From ₹34,999 one-time'],
          ['Monthly retainer', 'From ₹12,999/month — hosting and monitoring'],
          ['Usage', 'Per-minute pricing — quoted based on volume'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Does it sound like a real person?', a: 'Modern AI voice agents are highly natural-sounding. We use premium text-to-speech engines with Indian English accents.' },
          { q: 'Can it handle complex queries?', a: 'Simple to moderately complex queries — yes. For complex issues it escalates to a human agent.' },
          { q: 'Which languages does it support?', a: 'English and Hindi. Regional language support (Kannada, Tamil, Telugu) available.' },
        ]
      }
    },
    related: [
      { href: '/services/whatsapp-chatbot', label: 'WhatsApp Chatbot', note: 'Complement voice with WhatsApp automation.' },
      { href: '/services/crm-setup-lead-management', label: 'CRM Setup', note: 'Capture every call as a CRM lead.' },
      { href: '/services/business-automation', label: 'Workflow Automation', note: 'Automate follow-ups after calls.' },
    ]
  },

  'sms-blasting': {
    title: 'SMS Blasting & Bulk SMS',
    metaTitle: 'Bulk SMS Service India | LauncherDesk',
    metaDesc: 'Bulk SMS and SMS blasting service for Indian businesses — promotional SMS, transactional alerts, OTPs and DLT-compliant messaging across India.',
    eyebrow: 'AUTOMATE — Messaging',
    crumbCategory: 'AUTOMATE',
    lead: 'Reach thousands of customers instantly with targeted bulk SMS campaigns — DLT-registered, TRAI-compliant and delivered with 98% open rates.',
    priceCard: { label: 'Per SMS from', price: '₹0.12', sub: '+ DLT registration + taxes' },
    helpCard: { title: 'Need bulk SMS?', body: 'Tell us your monthly volume and use case — we will set up your DLT account and campaigns.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>SMS has a 98% open rate — higher than email, WhatsApp or any other channel. Bulk SMS is one of the most cost-effective ways to reach customers with promotions, appointment reminders, OTPs, payment alerts and event notifications.</p><p>LauncherDesk provides end-to-end bulk SMS services — DLT registration, sender ID setup, template approval and campaign management — fully compliant with TRAI regulations.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Retail and e-commerce businesses running promotional campaigns',
          'Healthcare providers sending appointment reminders',
          'Financial services sending payment and account alerts',
          'Any business needing high-delivery transactional notifications',
        ]
      },
      included: {
        heading: "What's included", items: [
          'DLT registration (mandatory for Indian SMS)',
          'Sender ID and template approval',
          'Bulk SMS platform setup and access',
          'Contact list management and segmentation',
          'Promotional and transactional SMS campaigns',
          'Delivery reports and analytics',
          'API integration for automated triggers',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'DLT registration', body: 'Register your business on the DLT platform (mandatory for all commercial SMS in India).' },
          { title: 'Sender ID and templates', body: 'Set up your brand sender ID and get message templates approved.' },
          { title: 'Platform setup', body: 'Configure the bulk SMS platform and upload your contact lists.' },
          { title: 'Campaign launch', body: 'Schedule and send your first campaign with real-time delivery tracking.' },
          { title: 'Reporting', body: 'Detailed delivery reports — sent, delivered, failed — per campaign.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Transactional SMS', 'From ₹0.12/SMS'],
          ['Promotional SMS', 'From ₹0.10/SMS'],
          ['DLT registration', '₹4,999 one-time (mandatory)'],
          ['Platform setup', '₹2,999 one-time'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'What is DLT registration and why do I need it?', a: 'DLT (Distributed Ledger Technology) registration is mandatory for all commercial SMS in India as per TRAI regulations. Without it, messages will be blocked.' },
          { q: 'What is the difference between promotional and transactional SMS?', a: 'Promotional SMS are marketing messages (restricted to non-DND numbers, 9am–9pm). Transactional SMS are service alerts (OTPs, booking confirmations) — can be sent anytime.' },
          { q: 'How fast is delivery?', a: 'Transactional SMS are typically delivered within 3–5 seconds. Promotional campaigns depend on volume but usually within minutes.' },
        ]
      }
    },
    related: [
      { href: '/services/email-blasting', label: 'Email Blasting', note: 'Combine SMS with email for multi-channel campaigns.' },
      { href: '/services/whatsapp-chatbot', label: 'WhatsApp Chatbot', note: 'Add WhatsApp automation alongside SMS.' },
      { href: '/services/whatsapp-business-api', label: 'WhatsApp Business API', note: 'Higher engagement than SMS with WhatsApp.' },
    ]
  },

  'email-blasting': {
    title: 'Email Blasting & Email Campaigns',
    metaTitle: 'Bulk Email Marketing Service India | LauncherDesk',
    metaDesc: 'Professional email blasting and email marketing campaigns for Indian businesses — newsletters, promotional emails, drip campaigns and transactional emails.',
    eyebrow: 'AUTOMATE — Messaging',
    crumbCategory: 'AUTOMATE',
    lead: 'Send thousands of targeted emails with professional designs, automated drip sequences and detailed analytics — all managed by LauncherDesk.',
    priceCard: { label: 'Monthly from', price: '₹4,999/month', sub: '+ taxes, based on list size' },
    helpCard: { title: 'Have an email list?', body: 'Share your list size and campaign goals — we will design the right email strategy.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Email marketing delivers the highest ROI of any digital marketing channel — an average of ₹3,600 returned for every ₹100 spent. Whether you need bulk promotional blasts, automated drip sequences or transactional emails, email marketing is an essential revenue channel.</p><p>LauncherDesk manages the entire email marketing operation — list management, template design, sending infrastructure, deliverability and analytics.</p>' },
      who: {
        heading: "Who it's for", items: [
          'E-commerce businesses nurturing customers with promotions and updates',
          'B2B companies running drip campaigns to prospects',
          'SaaS and subscription businesses sending onboarding and retention emails',
          'Any business with an email list that is not being fully utilized',
        ]
      },
      included: {
        heading: "What's included", items: [
          'Email platform setup (Brevo / Mailchimp / SendGrid)',
          'List cleaning and segmentation',
          'HTML email template design (mobile-responsive)',
          'Campaign copywriting',
          'Bulk email blasting with delivery optimization',
          'Automated drip sequence setup',
          'Open rate, click rate and conversion analytics',
          'Spam score testing and deliverability optimization',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'List audit and cleanup', body: 'Clean your email list — remove invalid addresses, duplicates and unsubscribes.' },
          { title: 'Platform and domain setup', body: 'Configure your email platform with proper DNS (SPF, DKIM, DMARC) for maximum deliverability.' },
          { title: 'Template design', body: 'Design mobile-responsive email templates matching your brand.' },
          { title: 'Campaign planning', body: 'Plan your campaign calendar — blasts, drip sequences, triggers.' },
          { title: 'Send and optimize', body: 'Send campaigns and optimize based on open rates, click rates and conversions.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Up to 5,000 subscribers', 'From ₹4,999/month'],
          ['5,000–25,000 subscribers', 'From ₹8,999/month'],
          ['25,000–100,000 subscribers', 'From ₹14,999/month'],
          ['Template design', 'From ₹4,999 one-time per template'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'What email platform do you use?', a: 'We work with Brevo (formerly Sendinblue), Mailchimp, SendGrid and others — whichever fits your needs and budget.' },
          { q: 'How do you ensure emails do not go to spam?', a: 'We set up proper authentication (SPF, DKIM, DMARC), warm up sending domains, clean lists regularly and follow best practices.' },
          { q: 'Can you build automated sequences?', a: 'Yes — welcome sequences, abandoned cart flows, re-engagement campaigns and custom drip sequences are all included.' },
        ]
      }
    },
    related: [
      { href: '/services/sms-blasting', label: 'SMS Blasting', note: 'Combine email with SMS for multi-channel reach.' },
      { href: '/services/whatsapp-chatbot', label: 'WhatsApp Chatbot', note: 'Add WhatsApp to your messaging mix.' },
      { href: '/services/content-marketing', label: 'Content Marketing', note: 'Create the content that fills your email campaigns.' },
    ]
  },

  'ai-powered-crm': {
    title: 'AI-Powered CRM',
    metaTitle: 'AI-Powered CRM Setup India | LauncherDesk',
    metaDesc: 'AI-powered CRM implementation for Indian businesses — smart lead scoring, automated follow-ups, pipeline forecasting and AI insights built into your CRM.',
    eyebrow: 'AUTOMATE — AI',
    crumbCategory: 'AUTOMATE',
    lead: 'A CRM that works for you — with AI lead scoring, automated follow-up sequences, deal forecasting and intelligent insights that help your team close more deals.',
    priceCard: { label: 'Setup from', price: '₹29,999', sub: '+ CRM subscription + taxes' },
    helpCard: { title: 'Want an AI-powered CRM?', body: 'Share your sales process and team size — we will recommend and implement the right CRM.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Traditional CRMs store data. AI-powered CRMs act on it — scoring leads by likelihood to convert, recommending the next best action, automating follow-up sequences and forecasting revenue with machine learning accuracy.</p><p>LauncherDesk implements and configures AI-powered CRM systems (HubSpot, Zoho CRM, Salesforce) with AI features enabled — so your sales team spends time selling, not on data entry.</p>' },
      who: {
        heading: "Who it's for", items: [
          'Sales teams that generate more leads than they can manually follow up',
          'Businesses with long sales cycles needing intelligent nurturing',
          'Companies with existing CRMs that are not being used to full potential',
          'Startups building a scalable sales operation from day one',
        ]
      },
      included: {
        heading: "What's included", items: [
          'CRM platform selection and setup (HubSpot / Zoho / Salesforce)',
          'AI lead scoring configuration',
          'Automated follow-up sequence setup',
          'Pipeline and deal stage customization',
          'Email and WhatsApp integration',
          'AI-powered revenue forecasting setup',
          'Team training and onboarding',
          'Dashboard and reporting configuration',
        ]
      },
      process: {
        heading: 'Step-by-step process', steps: [
          { title: 'Sales process audit', body: 'Map your current lead-to-close process and identify automation opportunities.' },
          { title: 'CRM selection', body: 'Recommend the right CRM platform based on team size, budget and requirements.' },
          { title: 'Setup and configuration', body: 'Configure pipelines, stages, AI scoring models and automation rules.' },
          { title: 'Integration', body: 'Connect your website, WhatsApp, email and existing tools.' },
          { title: 'Training and handover', body: 'Train your team and hand over a fully operational AI CRM.' },
        ]
      },
      pricing: {
        heading: 'Transparent pricing', rows: [
          ['Setup and configuration', 'From ₹29,999 one-time'],
          ['CRM subscription', 'HubSpot / Zoho / Salesforce — passed through at platform rates'],
          ['Monthly support', 'From ₹6,999/month — ongoing optimization and support'],
          ['Taxes', 'GST shown separately'],
        ]
      },
      faq: {
        heading: 'Frequently asked questions', items: [
          { q: 'Which CRM do you recommend?', a: 'For most Indian SMBs: Zoho CRM (best value). For growth-stage startups: HubSpot. For enterprise: Salesforce. We recommend after understanding your needs.' },
          { q: 'Can you migrate data from our existing CRM?', a: 'Yes — data migration from spreadsheets or other CRM systems is included in the setup.' },
          { q: 'How is AI lead scoring set up?', a: 'We define scoring criteria based on your historical data and ideal customer profile — the AI then scores every new lead automatically.' },
        ]
      }
    },
    related: [
      { href: '/services/crm-setup-lead-management', label: 'CRM Setup & Lead Management', note: 'Standard CRM setup without AI features.' },
      { href: '/services/whatsapp-chatbot', label: 'WhatsApp Chatbot', note: 'Feed chatbot leads directly into your CRM.' },
      { href: '/services/business-automation', label: 'Workflow Automation', note: 'Automate beyond the CRM with full workflow automation.' },
    ]
  }

}