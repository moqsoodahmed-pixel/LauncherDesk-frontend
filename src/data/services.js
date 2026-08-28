/* All service detail page data — mirrors the original HTML content exactly */

export const SERVICES = {
  'private-limited-company-registration': {
    title: 'Private Limited Company Registration',
    metaTitle: 'Private Limited Company Registration — LauncherDesk',
    metaDesc: 'Register a Private Limited Company in India with LauncherDesk. Overview, eligibility, documents, process, timeline, transparent pricing and Pvt Ltd vs LLP comparison.',
    eyebrow: 'Start your business',
    crumbCategory: 'Start your business',
    lead: "The standard structure for startups that want limited liability, credibility and the ability to raise investment. We handle the entire MCA process end to end.",
    priceCard: { label: 'Professional fee from', price: '₹3,999', sub: '+ government fee & taxes, shown separately' },
    helpCard: { title: 'Need help deciding?', body: "Not sure if Pvt Ltd is right for you? Get a personalised recommendation." },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#benefits', label: 'Benefits' },
      { href: '#eligibility', label: 'Eligibility' },
      { href: '#documents', label: 'Documents' },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#compare', label: 'Pvt Ltd vs LLP' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: {
        heading: 'Overview',
        content: `<p>A Private Limited Company is a separate legal entity registered under the Companies Act, 2013 and incorporated through the MCA's SPICe+ process. It gives founders limited liability, a distinct legal identity, and the structure investors expect — which is why it's the default choice for funded startups.</p><p>LauncherDesk manages every step: name approval, digital signatures, director identification, drafting the MOA and AOA, and filing for incorporation, along with PAN and TAN.</p>`
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
          '<b>Limited liability</b> — founders\' personal assets stay protected.',
          '<b>Fundraising-ready</b> — the structure investors require to hold equity.',
          '<b>Credibility</b> — a registered company builds trust with clients and banks.',
          '<b>Perpetual succession</b> — the company continues independent of its owners.',
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
        content: `<h3>For every director / shareholder</h3><ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> PAN card and Aadhaar</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Identity proof (passport / voter ID / driving licence)</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Address proof (recent bank statement / utility bill)</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Passport-size photograph</li></ul><h3>For the registered office</h3><ul><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Latest utility bill for the premises</li><li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Rent agreement and a No-Objection Certificate from the owner</li></ul>`
      },
      process: {
        heading: 'Step-by-step process',
        steps: [
          { title: 'Digital Signature Certificates (DSC)', body: 'We obtain DSCs for all directors via quick online verification.' },
          { title: 'Name approval', body: 'We check availability and reserve your company name with the MCA.' },
          { title: 'Drafting MOA & AOA', body: 'We prepare your constitutional documents around your business objectives.' },
          { title: 'SPICe+ filing', body: 'We file incorporation forms along with DIN, PAN and TAN applications.' },
          { title: 'Certificate of Incorporation', body: 'The MCA issues your CIN — your company is officially registered.' },
        ]
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
    priceCard: { label: 'Professional fee from', price: '₹1,499', sub: '+ taxes, shown separately' },
    helpCard: { title: 'Not sure if you need GST yet?', body: "It depends on turnover, state and channel — we'll tell you plainly." },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: 'Who needs it' },
      { href: '#benefits', label: 'Benefits' },
      { href: '#eligibility', label: 'Eligibility' },
      { href: '#documents', label: 'Documents' },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>GST (Goods and Services Tax) registration gives your business a GSTIN — the identifier you need to legally collect tax, claim input credit, and sell across state lines or online. LauncherDesk handles both the one-time registration and the ongoing monthly/quarterly return filing that keeps it in good standing.</p>` },
      who: { heading: 'Who needs it', items: ['Businesses crossing the turnover threshold (₹20–40 lakh depending on state and category)', 'Anyone selling on e-commerce marketplaces (Amazon, Flipkart, etc.)', 'Businesses that sell across state borders, regardless of turnover', 'Anyone who wants to claim input tax credit on purchases'] },
      benefits: { heading: 'Key benefits', items: ['<b>Legally sell online and inter-state</b> without restriction.', '<b>Input tax credit</b> — recover GST paid on business purchases.', '<b>Vendor eligibility</b> — many B2B clients only work with GST-registered vendors.'] },
      eligibility: { heading: 'Eligibility', items: ['Any registered business entity — Pvt Ltd, LLP, OPC, Partnership or Proprietorship', 'A valid business address and bank account', 'No minimum turnover required for voluntary registration'] },
      documents: { heading: 'Documents required', items: ['PAN of the business and applicant', 'Proof of business registration (Certificate of Incorporation, Partnership Deed, etc.)', 'Address proof for the principal place of business', 'Bank account statement or cancelled cheque', 'Digital signature (for companies and LLPs)'] },
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Application on the GST portal', body: 'We prepare and submit Form REG-01 with supporting documents.' },
        { title: 'ARN generation & verification', body: 'An Application Reference Number is issued; officer verification may follow.' },
        { title: 'GSTIN issued', body: 'Your 15-digit GST Identification Number is generated on approval.' },
        { title: 'Ongoing return filing', body: 'We take over monthly/quarterly GSTR filing so nothing is missed.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', 'Registration filing plus your chosen return-filing plan'],
        ['Government fee', 'GST registration itself has no government fee'],
        ['Taxes', 'GST on our professional fee, shown separately'],
      ], outro: `Return-filing plans vary by transaction volume, so we quote based on your actual business. <a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'How long does GST registration take?', a: 'Typically 3–7 working days when documents are complete, though officer verification can extend this.' },
        { q: 'What happens if I miss a return?', a: 'Late fees and interest accrue automatically, and repeated misses can lead to GSTIN suspension. This is exactly what our ongoing filing plans prevent.' },
        { q: 'Do I need GST before I start selling?', a: `If you'll sell online, across states, or expect to cross the turnover threshold quickly, it's worth registering upfront. Our <a href="/services#finder" style="color:var(--blue-dark);font-weight:600">Service Finder</a> can confirm for your case.` },
      ]}
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
    priceCard: { label: 'Professional fee from', price: '₹4,999', sub: '+ government fee & taxes, shown separately' },
    helpCard: { title: 'Need help deciding?', body: 'Get a personalised recommendation based on your business.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" }, { href: '#benefits', label: 'Benefits' },
      { href: '#documents', label: 'Documents' }, { href: '#process', label: 'Process' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>A Limited Liability Partnership (LLP) is a hybrid structure: partners get limited liability like a company, but the compliance and cost burden is lighter than a Private Limited Company. It's registered with the MCA under the LLP Act, 2008.</p><p>LauncherDesk handles DSC, DPIN, name approval, drafting the LLP Agreement, and filing incorporation.</p>` },
      who: { heading: "Who it's for", items: ['Two or more partners running a services or professional firm', 'Businesses that want limited liability but don\'t plan to raise VC funding', 'Founders who want lower annual compliance than a Pvt Ltd company'] },
      benefits: { heading: 'Key benefits', items: ['<b>Limited liability</b> — partners\' personal assets are protected.', '<b>Lower compliance</b> — fewer mandatory filings than a company.', '<b>Flexible structure</b> — partners can define profit-sharing in the LLP Agreement.'] },
      documents: { heading: 'Documents / information required', items: ['PAN and Aadhaar of all partners', 'Identity and address proof for each partner', 'Registered office address proof and NOC from the owner', 'Digital Signature Certificate for designated partners'] },
      process: { heading: 'Step-by-step process', steps: [
        { title: 'DSC & DPIN', body: 'We obtain digital signatures and Designated Partner Identification Numbers.' },
        { title: 'Name approval', body: 'We reserve your LLP name with the MCA via RUN-LLP.' },
        { title: 'Incorporation filing', body: 'We file FiLLiP along with subscriber and consent documents.' },
        { title: 'LLP Agreement', body: 'We draft and file the partnership agreement within 30 days of incorporation.' },
        { title: 'Certificate of Incorporation', body: 'The MCA issues your LLPIN — registration is complete.' },
      ]},
      pricing: { heading: 'Transparent pricing', intro: 'Your quote separates professional work, government fees and taxes so you always know what you\'re paying for.', rows: [
        ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
        ['Government fee', 'MCA fee — varies by state and contribution amount'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'How is an LLP different from a Partnership firm?', a: 'An LLP is registered with the MCA and gives partners limited liability; a traditional partnership does not, and partners remain personally liable.' },
        { q: 'Can an LLP raise equity funding?', a: "Not directly — LLPs can't issue shares, so most VC-backed startups choose a Private Limited Company instead." },
        { q: 'How many partners does an LLP need?', a: 'A minimum of two, with no upper limit. At least two must be designated partners.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: '₹3,999', sub: '+ government fee & taxes, shown separately' },
    helpCard: { title: 'Need help deciding?', body: 'Get a personalised recommendation based on your business.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" }, { href: '#benefits', label: 'Benefits' },
      { href: '#documents', label: 'Documents' }, { href: '#process', label: 'Process' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>A One Person Company (OPC) lets a single founder register a company with limited liability — something a proprietorship can't offer. It's a good middle ground between a proprietorship and a full Private Limited Company.</p><p>LauncherDesk manages the nominee appointment, DSC, name approval and incorporation filing.</p>` },
      who: { heading: "Who it's for", items: ['Solo founders who want limited liability from day one', 'Freelancers and consultants formalising into a company', 'Founders not yet ready to bring in co-founders or investors'] },
      benefits: { heading: 'Key benefits', items: ['<b>Limited liability</b> — your personal assets stay protected.', '<b>Single ownership</b> — full control, no need for a co-founder.', '<b>Easier conversion</b> — can convert to a Private Limited Company later as you grow.'] },
      documents: { heading: 'Documents / information required', items: ['PAN and Aadhaar of the sole member and nominee', 'Identity and address proof', 'Registered office address proof and NOC', 'Nominee\'s consent (Form INC-3)'] },
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Nominee appointment', body: 'A nominee is named to take over if the sole member is unable to continue.' },
        { title: 'DSC & name approval', body: 'We obtain your digital signature and reserve the company name.' },
        { title: 'SPICe+ filing', body: 'We file incorporation along with PAN and TAN applications.' },
        { title: 'Certificate of Incorporation', body: 'The MCA issues your CIN and the OPC is registered.' },
      ]},
      pricing: { heading: 'Transparent pricing', intro: "Your quote separates professional work, government fees and taxes so you always know what you're paying for.", rows: [
        ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
        ['Government fee', 'MCA / stamp duty — varies by state'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Can an OPC have more than one shareholder?', a: 'No — by definition an OPC has exactly one member. If you bring on a co-founder, you\'d convert to a Private Limited Company.' },
        { q: 'Is a nominee required?', a: 'Yes, every OPC must name a nominee who can take over in case the sole member is unable to continue.' },
        { q: 'Can I convert my OPC to a Pvt Ltd later?', a: 'Yes, conversion is straightforward once you cross certain turnover or capital thresholds, or voluntarily if you choose to.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ government fee & taxes, shown separately' },
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
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Drafting the Partnership Deed', body: 'We prepare the deed covering profit-sharing, roles and capital contribution.' },
        { title: 'Stamping', body: 'The deed is executed on appropriate stamp paper as per state rules.' },
        { title: 'Registration (optional but recommended)', body: 'We file with the Registrar of Firms for legal recognition.' },
        { title: 'PAN application', body: "We apply for a PAN in the firm's name." },
      ]},
      pricing: { heading: 'Transparent pricing', intro: "Your quote separates professional work, government/stamp fees and taxes so you always know what you're paying for.", rows: [
        ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
        ['Government fee', 'Stamp duty & Registrar of Firms fee — varies by state'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Is registration mandatory for a partnership firm?', a: "Not legally mandatory, but an unregistered firm can't sue third parties to enforce contracts — so we recommend registering." },
        { q: 'Do partners have unlimited liability?', a: 'Yes — unlike an LLP or company, partners are personally liable for the firm\'s debts. If that\'s a concern, an LLP may suit you better.' },
        { q: 'Can a partnership convert to an LLP later?', a: "Yes, and it's a fairly standard conversion path as businesses formalise and grow." },
      ]}
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
    priceCard: { label: 'Professional fee from', price: '₹999', sub: '+ taxes, shown separately' },
    helpCard: { title: 'Need help deciding?', body: 'Get a personalised recommendation based on your business.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" }, { href: '#benefits', label: 'Benefits' },
      { href: '#documents', label: 'Documents' }, { href: '#process', label: 'Process' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>MSME (Udyam) registration classifies your business as a Micro, Small or Medium Enterprise based on investment and turnover, unlocking a range of government benefits designed to support smaller businesses.</p><p>It's one of the fastest registrations we handle — often same-day once documents are ready.</p>` },
      who: { heading: "Who it's for", items: ['Any registered business within the MSME investment/turnover limits', 'Businesses looking for easier, cheaper access to credit', 'Vendors who supply to larger companies or government bodies'] },
      benefits: { heading: 'Key benefits', items: ['<b>Collateral-free loans</b> under priority-sector lending schemes.', '<b>Delayed payment protection</b> — legal recourse if buyers pay late.', '<b>Tender preference</b> and subsidy eligibility on various government schemes.'] },
      documents: { heading: 'Documents / information required', items: ['Aadhaar of the proprietor/partner/director', 'PAN of the business', 'Bank account details', 'Basic business activity details'] },
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Udyam portal application', body: 'We file your application on the Udyam Registration portal.' },
        { title: 'Aadhaar-based verification', body: 'Identity is verified electronically — no physical paperwork.' },
        { title: 'Udyam Certificate issued', body: 'Your registration number and certificate are generated instantly.' },
      ]},
      pricing: { heading: 'Transparent pricing', intro: 'MSME registration is one of the simplest filings we offer.', rows: [
        ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
        ['Government fee', 'No government fee for Udyam registration'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'How long does MSME registration take?', a: "Usually same-day, since it's a self-declared, Aadhaar-verified online process." },
        { q: 'Do I need to renew it?', a: 'No renewal is required, though you should update your Udyam details if your turnover or investment changes classification.' },
        { q: 'Can a company also register, or is it only for proprietorships?', a: 'Any eligible entity — proprietorship, partnership, LLP or company — can register under Udyam.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ government fee & taxes, shown separately' },
    helpCard: { title: 'Need help deciding?', body: 'Get a personalised recommendation based on your business.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" }, { href: '#benefits', label: 'Benefits' },
      { href: '#documents', label: 'Documents' }, { href: '#process', label: 'Process' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>The FSSAI licence is a legal requirement for anyone manufacturing, processing, storing, distributing or selling food, including cloud kitchens and home-based food businesses. The tier you need (Basic, State, or Central) depends on your turnover and scale.</p>` },
      who: { heading: "Who it's for", items: ['Restaurants, cafes and cloud kitchens', 'Packaged food manufacturers and distributors', 'Home bakers and food businesses selling online'] },
      benefits: { heading: 'Key benefits', items: ['<b>Legal requirement</b> — operating without it risks fines and closure.', '<b>Customer trust</b> — the FSSAI logo signals safety compliance.', '<b>Marketplace eligibility</b> — most food delivery and e-commerce platforms require it.'] },
      documents: { heading: 'Documents / information required', items: ['Identity and address proof of the proprietor/partners/directors', 'Proof of premises (rental agreement or ownership document)', 'List of food products/categories', 'Water testing report (for manufacturing units, where applicable)'] },
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Tier assessment', body: 'We determine whether you need Basic, State or Central licensing based on turnover.' },
        { title: 'Application filing', body: 'We prepare and submit your application with supporting documents.' },
        { title: 'Inspection (if applicable)', body: 'Some categories require a premises inspection before approval.' },
        { title: 'Licence issued', body: 'Your FSSAI licence number and certificate are issued.' },
      ]},
      pricing: { heading: 'Transparent pricing', intro: 'Pricing depends on the licence tier and validity period you choose.', rows: [
        ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
        ['Government fee', 'FSSAI fee — varies by tier and licence validity (1–5 years)'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Do home bakers need an FSSAI licence?', a: 'Yes — any food business, including home-based ones selling to the public, needs at least a Basic FSSAI registration.' },
        { q: 'How long is the licence valid?', a: 'Between 1 and 5 years, depending on the period you apply for and pay for.' },
        { q: "What's the difference between Basic, State and Central licences?", a: "It's based on annual turnover — Basic for smaller businesses, State and Central for larger scale or multi-state operations. We'll confirm which applies to you." },
      ]}
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
    priceCard: { label: 'Professional fee from', price: '₹1,999', sub: '+ govt. fee ₹4,500/class for MSME' },
    helpCard: { title: "Not sure your name is free?", body: "We run a proper search before you file anything." },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: 'Who should register' }, { href: '#benefits', label: 'Benefits' },
      { href: '#classes', label: 'Trademark classes' }, { href: '#documents', label: 'Documents' }, { href: '#process', label: 'Process' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>A registered trademark gives you exclusive legal rights to your brand name, logo or tagline within its class — and the ability to act against anyone who copies it. We start every engagement with a proper search so you're not filing on a name you can't defend or won't get.</p>` },
      who: { heading: 'Who should register', items: ['Any business with a name, logo or tagline it plans to build on long-term', 'E-commerce and D2C brands, where copycats are common', 'Startups approaching investors, who often check IP protection'] },
      benefits: { heading: 'Key benefits', items: ['<b>Exclusive rights</b> to use the mark in your registered class nationally.', '<b>Legal recourse</b> against infringement and copycats.', '<b>Brand asset</b> — a registered mark can be licensed, franchised or sold.'] },
      classes: { heading: 'Trademark classes', content: `<p>Trademarks are registered under one or more of 45 classes based on your goods or services — for example Class 25 for clothing, Class 35 for retail and advertising, Class 42 for software. We identify the right class(es) for your business as part of the search.</p>` },
      documents: { heading: 'Documents required', items: ['Logo file (if registering a device mark)', 'Business PAN and registration proof (or identity proof for individuals)', 'Proof of use, if already using the mark (invoices, website, packaging)', 'Signed authorisation (Form TM-48)'] },
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Trademark search', body: 'We check availability and conflicts before you commit to filing.' },
        { title: 'Class selection & filing', body: 'We prepare and file the application under the correct class(es).' },
        { title: 'Examination', body: 'The Registry reviews the application and may raise objections we respond to.' },
        { title: 'Publication & opposition period', body: 'The mark is published in the Trademark Journal for 4 months.' },
        { title: 'Registration', body: 'If unopposed, the registration certificate is issued.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', 'Search, drafting, filing and objection handling'],
        ['Government fee', 'Per class — lower for individuals/startups/MSMEs'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'How long does registration take?', a: "Typically 8–18 months end to end if unopposed, though you can start using the ™ symbol as soon as you file." },
        { q: 'What if someone opposes my mark?', a: 'We handle the response on your behalf during the opposition period — this is included in ongoing support, not a separate scramble.' },
        { q: 'Can I register a logo and name together?', a: "They're usually registered as separate marks for stronger protection, though it depends on your brand strategy — we'll advise on your case." },
      ]}
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
    priceCard: { label: 'Professional fee from', price: '₹4,999', sub: '+ government fee & taxes' },
    helpCard: { title: 'Got an objection notice?', body: 'Share the examination report with us and we will assess your case.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#process', label: 'Process' }, { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>A trademark objection is raised by the Examiner when they find issues with your application — such as similarity to existing marks, lack of distinctiveness or incorrect classification. You have 30 days to file a response. A well-crafted response backed by evidence significantly increases your chances of acceptance.</p><p>LauncherDesk reviews the objection, drafts a legally sound response and files it on your behalf — so your brand stays protected.</p>' },
      who: { heading: "Who it's for", items: [
        'Businesses that received a trademark examination report with objections',
        'Applicants whose trademark was marked as "Objected" on the IP India portal',
        'Brands whose marks were challenged for similarity or descriptiveness',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Review objection report', body: 'We analyse the examination report and identify the grounds of objection.' },
        { title: 'Draft reply with evidence', body: 'Our IP team drafts a strong response citing case law, distinctiveness arguments and supporting evidence.' },
        { title: 'File the response', body: 'The reply is filed with the Trademark Registry within the statutory deadline.' },
        { title: 'Track outcome', body: 'We follow up and keep you updated on the status until the matter is resolved.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', 'From ₹4,999 — includes review, drafting and filing'],
        ['Government fee', 'Nil for objection response'],
        ['Taxes', 'GST shown separately'],
      ]},
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'What happens if I don\'t reply to the objection?', a: 'If you don\'t respond within 30 days, the Registrar may abandon your trademark application.' },
        { q: 'What are common grounds for objection?', a: 'Similarity with existing marks, descriptive nature of the mark, incorrect classification or incomplete application details.' },
        { q: 'Can an objected trademark still get registered?', a: 'Yes — many objected trademarks get accepted after a well-drafted response. The key is providing the right legal arguments and evidence.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: '₹15,999', sub: '+ government fee & taxes' },
    helpCard: { title: 'Not sure if your idea is patentable?', body: 'Share your invention concept and we will assess patentability.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>A patent gives you exclusive rights to your invention for 20 years — preventing others from making, using or selling it without your permission. In India, patents are granted by the Indian Patent Office under the Patents Act, 1970.</p><p>LauncherDesk works with registered patent agents to handle the entire process — from prior art search and drafting to filing and prosecution.</p>' },
      who: { heading: "Who it's for", items: [
        'Inventors and innovators with a new product, process or technology',
        'Startups building proprietary technology or algorithms',
        'Manufacturers with unique production methods or designs',
        'R&D teams that need IP protection before publishing or licensing',
      ]},
      included: { heading: "What's included", items: [
        'Patentability assessment and prior art search',
        'Drafting of patent specification (provisional or complete)',
        'Filing with the Indian Patent Office',
        'Response to examination reports and objections',
        'Prosecution support through to grant',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Initial consultation', body: 'We understand your invention, assess patentability and recommend the right filing strategy.' },
        { title: 'Prior art search', body: 'Search existing patents and publications to check novelty and inventive step.' },
        { title: 'Drafting', body: 'Our patent agents draft the specification, claims and drawings.' },
        { title: 'Filing', body: 'Application filed with the Indian Patent Office — provisional or complete.' },
        { title: 'Examination & prosecution', body: 'We respond to examination reports and office actions on your behalf.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', 'From ₹15,999 — includes search, drafting and filing'],
        ['Government fee', 'Varies by applicant type (individual, startup, company)'],
        ['Taxes', 'GST shown separately'],
      ]},
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'How long does patent registration take?', a: 'The process typically takes 2–5 years from filing to grant, though a provisional application gives you protection from the filing date.' },
        { q: 'What can be patented in India?', a: 'Any new invention involving a product or process that is novel, non-obvious and has industrial application. Software per se is not patentable, but software-driven inventions may be.' },
        { q: 'What is the difference between provisional and complete specification?', a: 'A provisional application establishes your priority date and gives you 12 months to file the complete specification with full claims and details.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: '₹5,999', sub: '+ government fee & taxes' },
    helpCard: { title: 'Need to protect your creative work?', body: 'Tell us what you have created and we will guide you.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Copyright is an automatic right that comes into existence when you create an original work — but registration provides legal evidence of ownership that is essential for enforcement. In India, copyright is registered under the Copyright Act, 1957.</p><p>LauncherDesk handles the full copyright registration process including documentation, filing and follow-up with the Copyright Office.</p>' },
      who: { heading: "Who it's for", items: [
        'Authors, writers and content creators',
        'Musicians, composers and filmmakers',
        'Software developers and SaaS companies',
        'Graphic designers, artists and photographers',
        'Businesses that produce original marketing content or training material',
      ]},
      included: { heading: "What's included", items: [
        'Review and classification of the work',
        'Preparation of application and statement of particulars',
        'Filing with the Copyright Office',
        'Response to any discrepancies raised during examination',
        'Certificate of registration on approval',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Share your work', body: 'You provide the creative work and details about authorship and ownership.' },
        { title: 'Documentation', body: 'We prepare the copyright application and supporting documents.' },
        { title: 'Filing', body: 'Application filed with the Copyright Office.' },
        { title: 'Examination period', body: '30-day mandatory waiting period for objections, then examination.' },
        { title: 'Registration', body: 'Copyright certificate issued upon approval.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', 'From ₹5,999 — includes documentation and filing'],
        ['Government fee', '₹500 per work (literary/artistic) to ₹5,000 (cinematographic)'],
        ['Taxes', 'GST shown separately'],
      ]},
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Is copyright registration mandatory?', a: 'No — copyright exists automatically on creation. But registration provides legal proof of ownership which is essential if you ever need to enforce your rights.' },
        { q: 'How long does copyright protection last?', a: 'In India, copyright lasts for the lifetime of the author plus 60 years. For anonymous works and government works, the term is 60 years from publication.' },
        { q: 'Can I copyright my website content?', a: 'Yes — original website content, code, designs and text can all be copyrighted.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: 'Based on portfolio size' },
    helpCard: { title: 'Have multiple trademarks to manage?', body: 'Tell us about your portfolio and we will create a management plan.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Filing a trademark or patent is only the beginning. IP assets need active management — timely renewals, infringement monitoring, opposition responses and strategic portfolio decisions. Missing a renewal deadline can void your protection entirely.</p><p>LauncherDesk provides ongoing IP management for businesses with one or more registered trademarks, patents or copyrights — so nothing slips through.</p>' },
      who: { heading: "Who it's for", items: [
        'Businesses with registered trademarks that need renewal tracking',
        'Companies with multiple IP assets across different classes or jurisdictions',
        'Brands experiencing infringement or counterfeit issues',
        'Growing companies that need IP strategy alongside business growth',
      ]},
      included: { heading: "What's included", items: [
        'Trademark renewal reminders and filing',
        'IP portfolio audit and strategic review',
        'Infringement monitoring and cease-and-desist notices',
        'Opposition filings against conflicting marks',
        'Annual compliance and status reporting',
        'Advisory on new filings and international expansion',
      ]},
      process: { heading: 'How it works', steps: [
        { title: 'Portfolio audit', body: 'We review all your existing IP assets — trademarks, patents, copyrights — and their current status.' },
        { title: 'Management plan', body: 'We create a renewal calendar, monitoring plan and enforcement strategy.' },
        { title: 'Ongoing management', body: 'Renewals filed on time, infringements flagged, and new filings recommended as your business grows.' },
        { title: 'Quarterly review', body: 'Regular reporting on portfolio status and strategic recommendations.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', 'Custom quote based on portfolio size and services required'],
        ['Government fees', 'Renewal and filing fees as applicable, shown separately'],
        ['Taxes', 'GST shown separately'],
      ]},
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'When does a trademark need to be renewed?', a: 'In India, a trademark is valid for 10 years from the date of application and must be renewed before expiry. We track this and file renewal well in advance.' },
        { q: 'What happens if someone copies my trademark?', a: 'We can issue cease-and-desist notices, file opposition proceedings and support legal enforcement action against infringers.' },
        { q: 'Do I need this if I only have one trademark?', a: 'Even a single trademark needs renewal tracking and monitoring. Our service scales from one mark to hundreds.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ government fee & taxes, shown separately' },
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
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Compliance calendar setup', body: 'We map every filing your entity is subject to across the year.' },
        { title: 'Document collection', body: 'We collect financials and resolutions ahead of each deadline.' },
        { title: 'Filing', body: 'We prepare and file annual returns, financial statements and event-based forms.' },
        { title: 'Confirmation', body: 'You get proof of filing and a clean compliance record.' },
      ]},
      pricing: { heading: 'Transparent pricing', intro: 'Pricing depends on your entity type and filing volume for the year.', rows: [
        ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
        ['Government fee', 'MCA filing fees — vary by form and any delay'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'What happens if I miss a filing?', a: 'Penalties accrue per day of delay and can become substantial — plus your company risks being marked non-compliant or struck off in severe cases.' },
        { q: 'Do inactive companies still need to file?', a: 'Yes — even dormant companies have minimum annual filing obligations until formally closed.' },
        { q: "Can you take over mid-year if I've fallen behind?", a: 'Yes, we regularly help companies catch up on backlogged filings alongside going-forward compliance.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ government fee & taxes, shown separately' },
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
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Onboarding & chart of accounts', body: 'We set up your books structure based on your business.' },
        { title: 'Monthly bookkeeping', body: 'Transactions are recorded and reconciled every month.' },
        { title: 'Financial statements', body: 'We prepare P&L, balance sheet and cash flow statements.' },
        { title: 'Review call', body: 'A short monthly or quarterly review so you understand your numbers.' },
      ]},
      pricing: { heading: 'Transparent pricing', intro: 'Pricing scales with transaction volume — we quote after understanding your business.', rows: [
        ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
        ['Government fee', 'Not applicable — this is a professional service'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Do you also file my taxes?', a: 'Accounting and tax filing are connected but separately scoped — we\'ll bundle them if you need both.' },
        { q: 'Can you clean up a backlog of messy books?', a: "Yes, catch-up bookkeeping is one of our most common starting points." },
        { q: 'What software do you use?', a: "We work with standard cloud accounting tools and can adapt to what you're already using." },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ government fee & taxes, shown separately' },
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
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Payroll setup', body: 'We configure salary structures and statutory registrations (PF/ESI) if not already in place.' },
        { title: 'Monthly processing', body: 'Salaries, deductions and contributions are calculated each cycle.' },
        { title: 'Statutory filing', body: 'PF, ESI and TDS payments and returns are filed on time.' },
        { title: 'Payslips & reports', body: 'Employees get payslips; you get compliance reports.' },
      ]},
      pricing: { heading: 'Transparent pricing', intro: "Pricing is typically per employee, per month — we'll quote based on headcount.", rows: [
        ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
        ['Government fee', 'PF/ESI/PT statutory contributions (pass-through, not a LauncherDesk fee)'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'At what headcount do PF/ESI become mandatory?', a: "PF generally applies once you cross 20 employees; ESI thresholds vary by state and wage level — we'll confirm for your situation." },
        { q: 'Can you run payroll for a single employee?', a: "Yes — we support businesses from their very first hire." },
        { q: 'Do you handle full-and-final settlements?', a: 'Yes, exits and F&F settlements are part of ongoing payroll support.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ government fee & taxes, shown separately' },
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
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Process audit', body: 'We map your current workflows and identify the highest-impact automations.' },
        { title: 'System setup', body: 'We build or configure your website, CRM and automation tools.' },
        { title: 'Integration', body: 'Systems are connected so data flows without manual re-entry.' },
        { title: 'Training & handover', body: 'Your team is trained to use and maintain the new systems.' },
      ]},
      pricing: { heading: 'Transparent pricing', intro: "Scope varies widely — we quote after understanding what you're trying to automate.", rows: [
        ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
        ['Government fee', 'Not applicable — this is a professional/technology service'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Do I need a developer on my team to maintain this?', a: "No — we build with maintainable, no-code-friendly tools wherever possible, and can continue supporting you afterward." },
        { q: 'Can you work with our existing website or CRM?', a: "Yes, we often integrate with and improve existing systems rather than replacing everything." },
        { q: 'How long does a typical automation project take?', a: "It depends on scope — simple workflow automation can take days; a full website + CRM buildout takes longer. We'll give you a timeline upfront." },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ government fee & taxes, shown separately' },
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
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Discovery', body: 'We understand your business, audience and growth goals.' },
        { title: 'Brand & website', body: 'We design or refresh your brand identity and build your website.' },
        { title: 'Launch campaigns', body: 'We set up demand-generation campaigns aligned to your goals.' },
        { title: 'Measure & iterate', body: "We track performance and refine what's working." },
      ]},
      pricing: { heading: 'Transparent pricing', intro: "Scope varies from a single website build to ongoing campaign management — we quote after a discovery call.", rows: [
        ['Professional fee', "LauncherDesk's work: filing, drafting, coordination"],
        ['Government fee', 'Not applicable — this is a professional/technology service'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Do you only work with new businesses?', a: "No — we work with existing businesses looking to refresh their brand or improve underperforming marketing just as often." },
        { q: 'Is website design a one-time project or ongoing?', a: "It can be either — a one-time build, or an ongoing relationship where we maintain and improve it over time." },
        { q: 'Can this be bundled with business automation?', a: "Yes, website, CRM and marketing are often scoped together for a connected growth stack." },
      ]}
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
    priceCard: { label: 'Monthly retainer from', price: '₹14,999/mo', sub: '+ taxes' },
    helpCard: { title: 'Want to rank higher on Google?', body: 'Share your website and target keywords — we will audit and recommend.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Search Engine Optimisation (SEO) is the process of improving your website\'s visibility on Google and other search engines. When done right, it becomes the most cost-effective customer acquisition channel — bringing in qualified leads who are actively searching for what you sell.</p><p>LauncherDesk provides technical SEO, on-page optimisation, content strategy and link building tailored for Indian businesses.</p>' },
      who: { heading: "Who it's for", items: [
        'Businesses with a website that isn\'t generating enough organic traffic',
        'Companies in competitive markets that need to outrank competitors',
        'E-commerce stores that want organic product visibility',
        'Service businesses targeting local search (e.g. "CA firm in Bangalore")',
      ]},
      included: { heading: "What's included", items: [
        'Technical SEO audit and fixes (speed, structure, crawlability)',
        'Keyword research and strategy',
        'On-page SEO (meta tags, headings, internal linking, schema)',
        'Content optimisation and blog strategy',
        'Google Business Profile optimisation (for local SEO)',
        'Monthly performance reports and keyword tracking',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'SEO audit', body: 'We audit your website for technical issues, content gaps and competitive positioning.' },
        { title: 'Keyword strategy', body: 'Research and prioritise keywords based on volume, intent and competition.' },
        { title: 'On-page optimisation', body: 'Implement technical fixes, meta tags, content improvements and schema markup.' },
        { title: 'Content execution', body: 'Publish optimised content targeting your priority keywords.' },
        { title: 'Monthly reporting', body: 'Track rankings, traffic and leads with transparent monthly reports.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Monthly retainer', 'From ₹14,999/month — includes audit, strategy and ongoing optimisation'],
        ['Setup', 'One-time audit and setup included in the first month'],
        ['Taxes', 'GST shown separately'],
      ]},
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'How long does SEO take to show results?', a: 'Typically 3–6 months for meaningful organic traffic improvements. Some quick wins (technical fixes, Google Business Profile) show results within weeks.' },
        { q: 'Do you guarantee first page rankings?', a: 'No legitimate SEO provider can guarantee specific rankings. We focus on sustainable organic growth through best practices.' },
        { q: 'Can you do SEO for a new website?', a: 'Yes — in fact, starting SEO from the beginning is ideal. We can build your website with SEO in mind from day one.' },
      ]}
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
    priceCard: { label: 'Monthly retainer from', price: '₹12,999/mo', sub: '+ taxes' },
    helpCard: { title: 'Need a content strategy?', body: 'Tell us about your business and target audience — we will propose a plan.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Content marketing is the practice of creating and distributing valuable, relevant content to attract and retain your target audience. It builds brand authority, improves SEO and generates leads over time — at a fraction of the cost of paid advertising.</p><p>LauncherDesk creates content strategies and executes them consistently — from keyword-driven blog posts to industry thought leadership.</p>' },
      who: { heading: "Who it's for", items: [
        'B2B companies that need to build thought leadership',
        'Startups that want to educate their market',
        'E-commerce brands that need product-focused content',
        'Service businesses that want to rank for industry keywords',
      ]},
      included: { heading: "What's included", items: [
        'Content strategy and editorial calendar',
        'Keyword-driven blog posts (4–8 per month)',
        'Article and long-form content creation',
        'Content optimisation for SEO',
        'Distribution guidance (social, email, syndication)',
        'Monthly performance reporting',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Strategy session', body: 'We understand your audience, goals and competitive landscape.' },
        { title: 'Content calendar', body: 'Monthly editorial plan with topics, keywords and publishing schedule.' },
        { title: 'Creation', body: 'Our writers produce SEO-optimised, industry-relevant content.' },
        { title: 'Publishing & distribution', body: 'Content published on your platforms and distributed across channels.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Monthly retainer', 'From ₹12,999/month — includes strategy and content creation'],
        ['Taxes', 'GST shown separately'],
      ]},
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Do you write the content or do we?', a: 'We write all content. You review and approve before publishing.' },
        { q: 'What types of content do you create?', a: 'Blog posts, articles, case studies, whitepapers, social media content and email newsletters.' },
        { q: 'How do you ensure content quality?', a: 'Every piece is researched, SEO-optimised and reviewed by editors before delivery.' },
      ]}
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
    priceCard: { label: 'Monthly retainer from', price: '₹7,999/mo', sub: '+ tool costs & taxes' },
    helpCard: { title: 'Want to start email marketing?', body: 'Tell us your audience size and goals — we will recommend the right setup.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>Email marketing remains one of the highest-ROI channels for businesses. It lets you communicate directly with leads and customers — promoting offers, sharing content, nurturing relationships and driving repeat purchases.</p><p>LauncherDesk handles the full stack: platform setup, template design, list management, automation flows and campaign execution.</p>' },
      who: { heading: "Who it's for", items: [
        'E-commerce businesses that need to drive repeat purchases',
        'B2B companies nurturing leads through long sales cycles',
        'Service businesses communicating with existing clients',
        'Startups building and engaging a subscriber base',
      ]},
      included: { heading: "What's included", items: [
        'Email platform setup (Mailchimp, Sendinblue or similar)',
        'Template design matching your brand',
        'Automated drip campaigns and welcome sequences',
        'Newsletter design and sending',
        'List segmentation and management',
        'Open rate, click rate and conversion tracking',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Platform setup', body: 'We set up your email marketing platform and configure DNS for deliverability.' },
        { title: 'Template design', body: 'Branded email templates for campaigns and automated flows.' },
        { title: 'Automation setup', body: 'Welcome sequences, abandoned cart flows and lead nurturing campaigns.' },
        { title: 'Ongoing execution', body: 'Regular campaigns designed, written and sent on schedule.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Monthly retainer', 'From ₹7,999/month — includes design, setup and campaign management'],
        ['Tool costs', 'Email platform subscription billed separately (varies by list size)'],
        ['Taxes', 'GST shown separately'],
      ]},
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Which email platform do you use?', a: 'We work with Mailchimp, Sendinblue, ConvertKit and others. We recommend the best fit based on your audience size and needs.' },
        { q: 'Can you help grow my email list?', a: 'Yes — we can set up opt-in forms, lead magnets and integrations with your website and social channels.' },
        { q: 'How do you avoid spam filters?', a: 'Proper DNS configuration (SPF, DKIM, DMARC), clean list management and best practices in content and sending patterns.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ taxes, shown separately' },
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
      who: { heading: "Who it's for", items: [
        'Newly registered companies that need a business website',
        'Startups launching a product or service and needing a credible online presence',
        'Small businesses with an outdated or non-existent website',
        'Founders who want a website without managing a separate design agency',
      ]},
      types: { heading: 'Types of websites', content: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:12px 0">
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
      included: { heading: "What's included", items: [
        'Requirement discussion and content structure planning',
        'Design — clean, modern, brand-consistent',
        'Mobile-first, fully responsive development',
        'Contact form and WhatsApp integration',
        'Basic SEO setup (meta titles, descriptions, sitemap)',
        'Hosting guidance and domain setup support',
        '1 round of revisions included',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Requirement discussion', body: 'We understand your business, audience and goals before touching a design tool.' },
        { title: 'Content and structure planning', body: 'We plan the page structure and content hierarchy so the site converts.' },
        { title: 'Design mockups', body: 'You see and approve the design before any development begins.' },
        { title: 'Development and testing', body: 'We build and test across devices and browsers.' },
        { title: 'Review and revisions', body: 'One round of revisions included — you confirm everything is right.' },
        { title: 'Launch and handover', body: 'We deploy the site, configure hosting and hand over access.' },
      ]},
      pricing: { heading: 'Transparent pricing', intro: 'Pricing depends on the number of pages, functionality and complexity.', rows: [
        ['Professional fee', "LauncherDesk's work: design, development, launch"],
        ['Government fee', 'Not applicable'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Do I need to provide the content?', a: 'For most projects, yes — you provide the text and key information. LauncherDesk can advise on content structure. Copywriting support is available on request.' },
        { q: 'Will my website be mobile-friendly?', a: 'Yes. All LauncherDesk websites are built mobile-first — designed and developed for mobile devices first, then adapted for desktop.' },
        { q: 'Can you redesign an existing website?', a: 'Yes. If you have an existing website that needs updating or replacing, ask us about website redesign.' },
        { q: 'How long does it take?', a: 'Typically 2–4 weeks from content approval and design sign-off. E-commerce and complex projects take longer.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: '₹9,999', sub: '+ taxes, shown separately' },
    helpCard: { title: 'Not sure if static is right for you?', body: 'Static sites work best when your content doesn\'t change frequently.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>A static website is a fixed-content site that loads extremely fast and costs very little to host. It doesn\'t require a database or CMS — every page is pre-built and served directly to the visitor. This makes it ideal for businesses that need a professional online presence without frequent content updates.</p><p>LauncherDesk builds static websites that are mobile-first, SEO-optimised and designed for conversion — not just aesthetics.</p>' },
      who: { heading: "Who it's for", items: [
        'Consultants, freelancers and professionals who need a credibility-building website',
        'Service businesses with a fixed set of offerings',
        'New businesses that need an online presence quickly',
        'Companies that need a simple landing page or brochure site',
      ]},
      included: { heading: "What's included", items: [
        'Up to 5–7 pages (Home, About, Services, Contact, etc.)',
        'Mobile-first responsive design',
        'Contact form with WhatsApp integration',
        'Basic SEO setup (meta tags, sitemap, schema)',
        'Fast hosting guidance (no server maintenance needed)',
        'SSL certificate setup',
        '1 round of revisions',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Requirement discussion', body: 'We understand your business, audience and what you want the site to achieve.' },
        { title: 'Content planning', body: 'Page structure and content hierarchy planned for conversion.' },
        { title: 'Design & development', body: 'Clean, modern design built with performance in mind.' },
        { title: 'Review & launch', body: 'You review, we revise, then deploy to your domain.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', 'From ₹9,999 for a standard 5-page static site'],
        ['Hosting', 'Near-zero cost — static sites can be hosted free or very cheaply'],
        ['Taxes', 'GST shown separately'],
      ]},
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'What is the difference between static and dynamic?', a: 'Static websites have fixed content that you can\'t update yourself without code changes. Dynamic websites have a CMS (like WordPress) that lets you update content, add blog posts and manage pages without touching code.' },
        { q: 'Can I add a blog later?', a: 'Yes — you can upgrade to a dynamic site later. Starting static keeps costs low while you establish your business.' },
        { q: 'How fast will it load?', a: 'Very fast. Static sites load in under 1 second because there\'s no database or server-side processing.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: '₹19,999', sub: '+ taxes, shown separately' },
    helpCard: { title: 'Need ongoing content updates?', body: 'Dynamic is the right choice if you blog, add case studies or update offerings regularly.' },
    toc: [
      { href: '#overview', label: 'Overview' }, { href: '#who', label: "Who it's for" },
      { href: '#included', label: "What's included" }, { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' }, { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: '<p>A dynamic website is powered by a Content Management System (CMS) like WordPress or a custom-built admin panel. This means you can log in, edit text, add new pages, publish blog posts and upload images — all without developer help.</p><p>LauncherDesk builds dynamic websites that are fast, mobile-first, SEO-friendly and easy for you to manage. We set up the CMS, design the front end, and train you to use it.</p>' },
      who: { heading: "Who it's for", items: [
        'Businesses that publish blogs, news or case studies regularly',
        'Companies with growing service catalogues or portfolios',
        'Teams that need to update content without waiting for a developer',
        'Businesses planning content marketing or SEO campaigns',
      ]},
      included: { heading: "What's included", items: [
        'Custom WordPress or CMS-based website',
        'Admin panel for self-managing content, pages and media',
        'Blog / news section setup',
        'Mobile-first responsive design',
        'Contact forms, WhatsApp integration, social links',
        'SEO setup (meta tags, sitemap, schema, speed optimisation)',
        'CMS training session for your team',
        '1 round of revisions',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Requirement discussion', body: 'We plan the content structure, page types and CMS features you need.' },
        { title: 'Design mockups', body: 'You approve the design before any development begins.' },
        { title: 'Development', body: 'Full CMS build with admin panel, responsive design and SEO.' },
        { title: 'Content upload & training', body: 'We upload initial content and train your team to manage the site.' },
        { title: 'Launch', body: 'Deployed to your domain with hosting configured.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', 'From ₹19,999 — includes design, development, CMS setup and training'],
        ['Hosting', 'Hosting required — we recommend and set up appropriate hosting'],
        ['Taxes', 'GST shown separately'],
      ]},
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Will I be able to update the website myself?', a: 'Yes — that is the core advantage of a dynamic site. We set up a user-friendly CMS and train you to use it.' },
        { q: 'Which CMS do you use?', a: 'Mostly WordPress for its flexibility and ecosystem. For specific needs, we can use custom-built admin panels.' },
        { q: 'Is WordPress secure?', a: 'Yes, when properly maintained. We set up security plugins, backups and update protocols.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ taxes, shown separately' },
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
      who: { heading: "Who it's for", items: [
        'Businesses wanting to sell products directly online',
        'D2C brands looking for their own storefront beyond Amazon and Flipkart',
        'Physical retailers adding an online sales channel',
        'Startups launching a product-based business',
      ]},
      included: { heading: "What's included", items: [
        'Product catalogue setup (up to agreed number of SKUs)',
        'Shopping cart and checkout flow',
        'Payment gateway integration (Razorpay, PayU or similar)',
        'Mobile-first, fully responsive design',
        'GST-compliant invoice generation (where required)',
        'Order management setup',
        'Basic SEO setup for product pages',
        'Admin panel for managing products and orders',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Requirement scoping', body: 'We understand your product range, target customers and business requirements.' },
        { title: 'Platform selection', body: 'We recommend the right platform (Shopify, WooCommerce, custom) for your scale and budget.' },
        { title: 'Design and development', body: 'We design and build the storefront, product pages, cart and checkout.' },
        { title: 'Payment and logistics integration', body: 'Payment gateway, shipping and GST invoice setup.' },
        { title: 'Testing and launch', body: 'Full testing across devices before going live.' },
      ]},
      pricing: { heading: 'Transparent pricing', intro: 'Pricing depends on the number of products, platform choice and required integrations.', rows: [
        ['Professional fee', "LauncherDesk's work: design, development, integrations"],
        ['Platform fees', 'Shopify or other platform subscription — passed through at cost'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Which payment gateway do you integrate?', a: 'We work with Razorpay, PayU, Cashfree and other major Indian payment gateways. We recommend the right one for your business.' },
        { q: 'Do I need GST to run an e-commerce store?', a: 'Yes — GST registration is mandatory for e-commerce businesses. LauncherDesk can handle GST registration as part of the same engagement.' },
        { q: 'Can I manage products myself after launch?', a: 'Yes. We build with platforms that have user-friendly admin panels so you can add, edit and remove products without technical help.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ taxes, shown separately' },
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
      who: { heading: "Who it's for", items: [
        'Newly registered businesses that need a professional brand identity',
        'Startups with a name but no visual brand',
        'Existing businesses with an outdated logo or inconsistent branding',
        'Founders preparing for fundraising who need investor-ready materials',
      ]},
      included: { heading: "What's included", items: [
        'Brand brief discussion (business, audience, preferred style direction)',
        'Logo concepts and design — up to 3 initial directions',
        'Colour palette and typography selection',
        'Business card design',
        'Letterhead template',
        'Brand guide (logo usage, colours, fonts, dos and don\'ts)',
        'Final files in PNG, JPG, SVG and PDF formats',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Brand brief', body: 'We understand your business, audience, values and aesthetic preferences.' },
        { title: 'Initial concepts', body: 'We present 2–3 logo directions for you to review.' },
        { title: 'Refinement', body: 'We refine the chosen direction based on your feedback.' },
        { title: 'System build', body: 'We build the complete brand system — colours, fonts, collateral.' },
        { title: 'Final delivery', body: 'All files delivered in required formats with a brand guide.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', "LauncherDesk's work: design, brand guide, file preparation"],
        ['Government fee', 'Not applicable'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'How many logo concepts will I see?', a: 'Typically 2–3 initial directions. You choose one to refine. We include 2 rounds of revisions.' },
        { q: 'Can I use the logo on my website and packaging?', a: 'Yes. You receive files in all standard formats suitable for digital, print and packaging use.' },
        { q: 'Should I trademark my logo?', a: 'Yes — once you have a logo you are happy with, trademarking it protects your brand legally. LauncherDesk can handle trademark registration through the same team.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ platform subscription costs' },
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
      who: { heading: "Who it's for", items: [
        'Newly registered businesses that need professional email addresses',
        'Founders who want to stop using personal Gmail accounts for business',
        'Companies setting up a new website and needing hosting',
        'Businesses upgrading from free email to professional domain email',
      ]},
      included: { heading: "What's included", items: [
        'Domain registration guidance and support',
        'Google Workspace or equivalent business email setup',
        'Up to 5 email accounts (additional accounts on request)',
        'Website hosting setup and configuration',
        'DNS configuration and domain verification',
        'Email client setup guidance (mobile and desktop)',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Domain selection', body: 'We help you choose and register the right domain for your business.' },
        { title: 'Google Workspace setup', body: 'We configure your business email accounts and admin console.' },
        { title: 'Hosting configuration', body: 'We set up and configure your website hosting environment.' },
        { title: 'DNS and verification', body: 'We handle all DNS records, verification and email authentication (SPF, DKIM).' },
        { title: 'Handover', body: 'We hand over all credentials and walk you through the admin panel.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', "LauncherDesk's work: setup and configuration"],
        ['Platform cost', 'Google Workspace subscription — passed through at cost'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Which email platform do you use?', a: 'We recommend Google Workspace for most businesses — it includes Gmail, Drive, Meet and Calendar in one subscription.' },
        { q: 'What does hosting cost?', a: 'Hosting costs depend on the provider and plan chosen. We recommend and set up the right plan for your website size and traffic.' },
        { q: 'How long does setup take?', a: 'Typically 1–3 working days for email and hosting setup once domain access is confirmed.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: 'Priced after scoping' },
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
      who: { heading: "Who it's for", items: [
        'Startups building a software product or SaaS platform',
        'Businesses that need a custom internal tool, portal or application',
        'Founders who have a software idea but no technical co-founder',
        'Companies outgrowing off-the-shelf software',
      ]},
      included: { heading: "What's included", items: [
        'Requirement scoping and documentation',
        'Technical architecture recommendation',
        'UI/UX design',
        'Frontend and backend development',
        'Testing and quality assurance',
        'Deployment and launch support',
        'Post-launch support (as scoped)',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Scoping call', body: 'We understand your idea, requirements and business context before anything else.' },
        { title: 'Specification and architecture', body: 'We document the full requirement and recommend the right technology stack.' },
        { title: 'UI/UX design', body: 'We design the user interface and get your sign-off before development starts.' },
        { title: 'Development', body: 'We build in sprints with regular check-ins and demos.' },
        { title: 'Testing and QA', body: 'Functional, performance and device testing before release.' },
        { title: 'Launch and handover', body: 'We deploy, document and hand over with ongoing support options.' },
      ]},
      pricing: { heading: 'Transparent pricing', intro: 'Software development is priced after a scoping session — complexity varies significantly.', rows: [
        ['Professional fee', 'Scoped per project — development, design, QA, deployment'],
        ['Infrastructure', 'Hosting and third-party services passed through at cost'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'How long does an MVP take?', a: 'Minimum viable product (MVP) projects typically take 6–12 weeks. Complex platforms take longer. We agree timelines and milestones upfront.' },
        { q: 'What technology do you build with?', a: 'We recommend the right stack for your use case — typically React/Next.js for frontend and Node.js or Python for backend, with cloud hosting on AWS or GCP.' },
        { q: 'Can you take over an existing codebase?', a: 'Yes. We regularly take over and extend existing software projects. We start with a code review before committing to scope.' },
      ]}
    },
    related: [
      { href: '/services/website-development', label: 'Website Development', note: 'Need a website rather than an application?' },
      { href: '/services/business-automation', label: 'Business Automation', note: 'Automate workflows without custom software.' },
      { href: '/services/digital-marketing', label: 'Digital Marketing', note: 'Market your software product.' },
    ]
  },

  'startup-india-dpiit': {
    title: 'Startup India / DPIIT Recognition',
    metaTitle: 'Startup India DPIIT Recognition | Tax Benefits & Schemes | LauncherDesk',
    metaDesc: 'Get your startup officially recognised by DPIIT. Access tax exemptions, government schemes and funding benefits. Application support by LauncherDesk.',
    eyebrow: 'START — Certifications',
    crumbCategory: 'START',
    lead: 'Get your startup officially recognised by DPIIT — unlocking income tax benefits, government scheme access, patent fee rebates and investor credibility.',
    priceCard: { label: 'Professional fee from', price: '₹4,499', sub: '+ taxes, shown separately' },
    helpCard: { title: 'Not sure if you qualify?', body: 'We check eligibility before you apply — free assessment.' },
    toc: [
      { href: '#overview', label: 'Overview' },
      { href: '#who', label: "Who it's for" },
      { href: '#benefits', label: 'Key benefits' },
      { href: '#included', label: "What's included" },
      { href: '#process', label: 'Process' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQs' },
    ],
    sections: {
      overview: { heading: 'Overview', content: `<p>DPIIT (Department for Promotion of Industry and Internal Trade) recognition under the Startup India programme gives eligible startups access to significant government benefits — including income tax exemptions, patent fee rebates, and access to government schemes and funding.</p><p>LauncherDesk handles the eligibility check, Startup India portal setup, documentation and application filing.</p>` },
      who: { heading: "Who it's for", items: [
        'Startups incorporated as a Private Limited Company, LLP or Partnership Firm',
        'Companies less than 10 years old with annual turnover not exceeding ₹100 crores',
        'Startups working toward innovation, development or improvement of products or services',
        'Founders who want tax exemptions, faster patent processing and government scheme access',
      ]},
      benefits: { heading: 'Key benefits of DPIIT recognition', items: [
        'Income tax exemption for 3 consecutive years out of the first 10 years (subject to conditions)',
        'Tax exemption on investments above fair market value',
        '80% rebate on patent filing fees',
        'Self-certification for 6 labour and 3 environmental laws',
        'Access to SIDBI Fund of Funds and government startup schemes',
        'Credibility with investors and enterprise customers',
      ]},
      included: { heading: "What's included", items: [
        'Eligibility check and guidance',
        'Startup India portal profile setup',
        'DPIIT recognition application filing and documentation',
        'Certificate of Recognition (issued by DPIIT on approval)',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Eligibility assessment', body: 'We confirm whether your startup qualifies for DPIIT recognition.' },
        { title: 'Portal setup', body: 'We set up your profile on the Startup India portal.' },
        { title: 'Application and documentation', body: 'We prepare and file the recognition application with supporting documents.' },
        { title: 'DPIIT review', body: 'DPIIT reviews and processes the application.' },
        { title: 'Certificate of Recognition', body: 'Recognition certificate issued and delivered.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', "LauncherDesk's work: eligibility check, filing, coordination"],
        ['Government fee', 'DPIIT recognition has no government filing fee'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'What are the eligibility criteria?', a: 'Your startup must be incorporated as a Pvt Ltd, LLP or registered partnership. It must be less than 10 years from incorporation, with annual turnover not exceeding ₹100 crores. It must be working toward innovation, development or improvement of products, processes or services.' },
        { q: 'Is the tax exemption automatic after recognition?', a: 'DPIIT recognition is needed to apply for tax exemptions, but the exemptions are granted separately by the Income Tax Department. LauncherDesk can help you understand the process.' },
        { q: 'How long does recognition take?', a: 'Typically 2–4 weeks from submission, subject to DPIIT review timelines.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ certification body fees' },
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
      who: { heading: "Who it's for", items: [
        'Businesses that need ISO certification for B2B contracts or government tenders',
        'Companies wanting to demonstrate quality management to enterprise clients',
        'Businesses in manufacturing, technology, healthcare or services sectors',
        'Exporters and businesses seeking international recognition',
      ]},
      standards: { heading: 'Standards we support', content: `<ul>
        <li><b>ISO 9001:2015</b> — Quality Management System. The most widely recognised standard, applicable to any business.</li>
        <li><b>ISO 27001</b> — Information Security Management. Essential for technology, SaaS and data-handling businesses.</li>
        <li><b>ISO 14001</b> — Environmental Management. For businesses with environmental impact obligations.</li>
        <li><b>Other standards</b> — ISO 22000 (food safety), ISO 45001 (occupational health) and others on request.</li>
      </ul>` },
      included: { heading: "What's included", items: [
        'Guidance on selecting the right ISO standard',
        'Documentation support (quality manual, SOPs, process documents)',
        'Gap analysis support',
        'Coordination with accredited certification body',
        'Pre-audit and audit support',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Standard selection', body: 'We confirm the right ISO standard for your business and sector.' },
        { title: 'Gap analysis', body: 'We assess your current processes against the standard requirements.' },
        { title: 'Documentation', body: 'We help prepare the quality manual, SOPs and required documents.' },
        { title: 'Pre-audit preparation', body: 'We prepare your team for the certification audit.' },
        { title: 'Certification audit', body: 'The accredited certification body conducts the audit.' },
        { title: 'Certificate issued', body: 'ISO certificate issued on successful audit completion.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', "LauncherDesk's work: documentation, coordination, audit support"],
        ['Certification body fee', 'Charged by the accredited certification body — varies by standard and scope'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Who issues the ISO certificate?', a: 'ISO certificates are issued by accredited third-party certification bodies, not by LauncherDesk. LauncherDesk coordinates and supports the process.' },
        { q: 'How long does ISO certification take?', a: 'Typically 4–12 weeks from engagement start, depending on your readiness and the standard being pursued.' },
        { q: 'Does ISO certification need to be renewed?', a: 'Yes. ISO certificates are typically valid for 3 years with annual surveillance audits. LauncherDesk can support ongoing renewal.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ taxes, shown separately' },
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
      who: { heading: "Who it's for", items: [
        'Private Limited Companies, LLPs and OPCs that need annual ITR filing',
        'Businesses that want a CA to prepare and file their income tax return',
        'Founders who want basic tax planning guidance alongside their ITR',
        'Companies with backlogged filings that need to get compliant',
      ]},
      included: { heading: "What's included", items: [
        'Income tax return preparation (ITR-6 for companies, ITR-5 for LLPs)',
        'CA review and sign-off',
        'Tax computation and liability calculation',
        'TDS reconciliation (Form 26AS, AIS)',
        'Basic tax planning discussion',
        'Filing on the Income Tax portal before the due date',
        'Acknowledgement and filing confirmation (ITR-V)',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Document collection', body: 'We collect financial statements, bank statements and TDS details.' },
        { title: 'Tax computation', body: 'CA prepares the tax computation and identifies any planning opportunities.' },
        { title: 'ITR preparation', body: 'We prepare the correct ITR form for your entity type.' },
        { title: 'CA review and sign-off', body: 'A Chartered Accountant reviews and digitally signs the return.' },
        { title: 'Filing and acknowledgement', body: 'Return filed on the Income Tax portal. Acknowledgement shared with you.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', "CA preparation, review, filing and coordination"],
        ['Government fee', 'No government fee for ITR filing'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'What is the due date for company ITR filing?', a: 'For companies and LLPs not requiring tax audit: 31 October (extended deadline; verify current year date with your CA). For companies requiring tax audit: 30 November. Due dates are subject to government extension.' },
        { q: 'Does a company with no revenue still need to file?', a: 'Yes. Even a company with zero revenue or a loss must file an annual income tax return. Non-filing attracts penalties.' },
        { q: 'Is a tax audit required?', a: 'Tax audit under Section 44AB is required for companies with turnover above specified thresholds. LauncherDesk will advise whether your company requires a tax audit.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ taxes, shown separately' },
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
      who: { heading: "Who it's for", items: [
        'New companies needing founder and shareholder agreements',
        'Businesses onboarding employees and needing employment contracts',
        'Startups raising funding who need investment and convertible note agreements',
        'Companies entering partnerships or client relationships needing proper contracts',
      ]},
      documents: { heading: 'Documents we cover', content: `<ul>
        <li><b>Founders Agreement</b> — equity split, roles, IP ownership and exit provisions for co-founders</li>
        <li><b>Shareholder Agreement</b> — rights, obligations and governance for company shareholders</li>
        <li><b>NDA / Confidentiality Agreement</b> — protect sensitive business information</li>
        <li><b>Employment Contract</b> — terms, compensation, IP assignment and notice provisions</li>
        <li><b>Freelancer / Consultant Agreement</b> — scope, payment and IP ownership for contractors</li>
        <li><b>Client Service Agreement</b> — terms of service for your customers</li>
        <li><b>Term Sheet / Investment Agreement</b> — for pre-seed and seed fundraising</li>
        <li><b>Vendor / Supplier Agreement</b> — purchase terms and supply conditions</li>
      </ul>` },
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Requirement discussion', body: 'We understand what document you need and the business context.' },
        { title: 'Draft preparation', body: 'A qualified legal professional prepares the document draft.' },
        { title: 'Review and revisions', body: 'You review and we incorporate your feedback.' },
        { title: 'Final delivery', body: 'Final document delivered in Word and PDF formats.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', "Legal professional's drafting and review fee"],
        ['Government fee', 'Stamp duty may apply for certain agreements — advised upfront'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Are these reviewed by actual lawyers?', a: 'Yes. Legal documents through LauncherDesk are prepared and reviewed by qualified advocates or company secretaries as appropriate for the document type.' },
        { q: 'Do agreements need to be stamped?', a: 'Some agreements require stamp duty depending on the state and document type. We advise on stamping requirements for each document.' },
        { q: 'Can you review an agreement someone else has given me?', a: 'Yes. We can coordinate a review and provide comments on agreements drafted by third parties.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ platform fees' },
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
      who: { heading: "Who it's for", items: [
        'Businesses that want to send transactional or marketing messages via WhatsApp at scale',
        'E-commerce businesses that want to send order updates, shipping notifications and promotions',
        'Startups that want to automate customer communication and lead follow-up on WhatsApp',
        'Businesses with a CRM that want WhatsApp integrated into their sales workflow',
      ]},
      included: { heading: "What's included", items: [
        'WhatsApp Business API account setup and verification',
        'Business phone number registration and verification',
        'Meta Business Manager setup',
        'Message template creation and approval',
        'Integration with CRM or helpdesk tool (where applicable)',
        'Basic automation setup — welcome messages, enquiry responses',
        'Team training and handover',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Meta Business Manager setup', body: 'We set up or connect your Meta Business Manager account.' },
        { title: 'API account application', body: 'We apply for WhatsApp Business API access via an approved Business Solution Provider.' },
        { title: 'Phone number verification', body: 'Your business phone number is registered and verified.' },
        { title: 'Template creation', body: 'We create and submit message templates for Meta approval.' },
        { title: 'Integration and automation', body: 'API connected to your CRM or system; basic automations configured.' },
        { title: 'Handover and training', body: 'We hand over the setup with documentation and team training.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', "LauncherDesk's work: setup, integration, training"],
        ['Platform fees', 'WhatsApp conversation fees charged by Meta — depends on message volume'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'What is the difference between WhatsApp Business App and WhatsApp Business API?', a: 'The WhatsApp Business App is free but limited — only one device, no bulk messaging, no CRM integration. The API is for scale: multiple agents, CRM integration, automated messages and broadcasts.' },
        { q: 'How long does approval take?', a: 'WhatsApp Business API setup and verification typically takes 2–4 weeks, subject to Meta approval process and timelines.' },
        { q: 'Does LauncherDesk guarantee API approval?', a: 'Approval decisions are made by Meta, not LauncherDesk. We follow best practices to maximise approval chances and guide you through the process.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ CRM platform subscription' },
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
      who: { heading: "Who it's for", items: [
        'Businesses receiving leads but losing track of follow-ups and conversions',
        'Sales teams that want a structured pipeline management system',
        'Startups moving from spreadsheets to a proper CRM for the first time',
        'Companies that want WhatsApp and website leads to flow into one system',
      ]},
      included: { heading: "What's included", items: [
        'CRM tool selection and recommendation (HubSpot, Zoho CRM, Freshsales or others)',
        'CRM account setup and configuration',
        'Lead pipeline setup and stage definition',
        'Custom fields and data structure setup',
        'Lead capture form integration (website, WhatsApp, landing pages)',
        'Basic automation setup (lead assignment, follow-up reminders)',
        'Team training and handover',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Requirements discussion', body: 'We understand your sales process, team size and lead sources.' },
        { title: 'CRM selection', body: 'We recommend the right CRM platform for your needs and budget.' },
        { title: 'Setup and configuration', body: 'We configure the CRM — pipeline stages, custom fields, user permissions.' },
        { title: 'Integrations', body: 'Website lead forms, WhatsApp and other sources connected to the CRM.' },
        { title: 'Automation setup', body: 'Lead assignment rules, follow-up reminders and basic email sequences configured.' },
        { title: 'Training and handover', body: 'Team trained on the CRM with documentation.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', "LauncherDesk's work: setup, configuration, training"],
        ['CRM subscription', 'HubSpot, Zoho or chosen platform — passed through at cost'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Which CRM do you recommend?', a: 'For most SMEs, Zoho CRM offers the best value. HubSpot is strong for marketing-driven businesses. We recommend after understanding your team size, budget and sales process.' },
        { q: 'How long does CRM setup take?', a: 'Basic CRM setup typically takes 1–2 weeks. More complex configurations with integrations may take 3–4 weeks.' },
        { q: 'Can you migrate data from our existing spreadsheets?', a: 'Yes. We import existing lead and customer data from your spreadsheets or previous CRM as part of the setup.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ ad spend (if applicable)' },
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
      who: { heading: "Who it's for", items: [
        'Businesses that have social media accounts but no consistent content strategy',
        'Startups that want to build brand awareness on Instagram or LinkedIn',
        'Founders who want to outsource social media to a team that understands business',
        'Companies whose social media has gone quiet and needs to restart professionally',
      ]},
      included: { heading: "What's included", items: [
        'Social media strategy and platform selection',
        'Monthly content calendar',
        'Post design and copywriting',
        'Scheduled posting on agreed platforms',
        'Basic community management (responding to comments and messages)',
        'Monthly performance report',
      ]},
      platforms: { heading: 'Platforms we manage', content: `<ul>
        <li><b>Instagram</b> — visual storytelling, Reels, Stories and brand building</li>
        <li><b>LinkedIn</b> — B2B audiences, thought leadership and professional credibility</li>
        <li><b>Facebook</b> — local businesses, community building and broad reach</li>
        <li><b>X (Twitter)</b> — tech, startup and real-time engagement</li>
      </ul><p>We recommend the right platform mix for your audience — not all platforms are right for every business.</p>` },
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Strategy and audit', body: 'We assess your current social media and define a content strategy suited to your business.' },
        { title: 'Content calendar', body: 'Monthly calendar planned and approved before any posts go live.' },
        { title: 'Content creation', body: 'Design and copy for each post, created by our team.' },
        { title: 'Publishing', body: 'Posts scheduled and published at optimal times.' },
        { title: 'Reporting', body: 'Monthly performance report covering reach, engagement and growth.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', "LauncherDesk's work: strategy, content creation, management"],
        ['Ad spend', 'Paid promotion budget — optional, separate from management fee'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'How many posts per month are included?', a: 'Typically 12–16 posts per month across the agreed platforms. Exact frequency is agreed in the content calendar.' },
        { q: 'Do I need to approve posts before they go live?', a: 'Yes. The content calendar is shared with you for review and approval before any posts are published.' },
        { q: 'Can you run paid ads too?', a: 'Yes. Paid social advertising (Instagram, LinkedIn, Facebook) is available as an add-on to organic management.' },
      ]}
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
      who: { heading: "Who it's for", items: [
        'Businesses that want immediate visibility on Google for their services',
        'Startups that want to test a market quickly without waiting for SEO results',
        'Companies running Google Ads that are not performing and want expert management',
        'Businesses with a clear offer and budget ready to invest in paid leads',
      ]},
      included: { heading: "What's included", items: [
        'Campaign strategy and keyword research',
        'Google Ads account setup and campaign creation',
        'Ad copy writing and A/B testing',
        'Conversion tracking setup (form fills, calls, WhatsApp)',
        'Monthly campaign monitoring and bid optimisation',
        'Negative keyword management',
        'Monthly performance report (impressions, clicks, leads, cost per lead)',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Campaign strategy', body: 'We research keywords, competitors and audience targeting before spending a rupee.' },
        { title: 'Account setup', body: 'Google Ads account configured with the right campaign types and settings.' },
        { title: 'Ad creation', body: 'Compelling ad copy written and tested for performance.' },
        { title: 'Conversion tracking', body: 'Tracking set up so we know exactly which ads generate leads.' },
        { title: 'Monthly optimisation', body: 'Ongoing bid adjustments, keyword refinements and ad testing.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Management fee', "LauncherDesk's management work — strategy, setup, optimisation"],
        ['Google Ads budget', 'Your ad spend paid directly to Google — separate from the management fee'],
        ['Taxes', 'GST on the management fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'What is a recommended Google Ads budget for a small business?', a: 'We advise a minimum budget based on your category and competition. Most SMEs start effectively with ₹15,000–50,000 per month in ad spend.' },
        { q: 'How soon will I see results?', a: 'Google Ads campaigns can be live within 1–2 weeks of engagement. Initial lead data is typically available within 4–6 weeks of campaign launch.' },
        { q: 'What is the difference between Google Ads and SEO?', a: 'Google Ads (paid) delivers immediate visibility in exchange for a budget. SEO (organic) builds long-term rankings without ongoing ad spend. They work best together.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ free zone / mainland fees' },
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
      who: { heading: "Who it's for", items: [
        'Indian entrepreneurs and businesses that want a UAE presence',
        'Founders who want to access Middle East and global markets through a UAE entity',
        'Businesses in e-commerce, consulting, technology or trading looking for a UAE base',
        'Indian companies expanding into the GCC region',
      ]},
      included: { heading: "What's included", items: [
        'Free Zone vs Mainland guidance and recommendation',
        'Trade licence application coordination',
        'Shareholder and director documentation support',
        'Registered address / virtual office coordination',
        'Visa eligibility and application guidance (investor/employee visa)',
        'UAE bank account opening guidance',
        'Post-setup compliance and annual renewal guidance',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Consultation and structure recommendation', body: 'We understand your business activity and recommend the right free zone or mainland setup.' },
        { title: 'Document preparation', body: 'We guide you through the documentation required for UAE company formation.' },
        { title: 'Trade licence application', body: 'Application filed with the chosen free zone or mainland authority.' },
        { title: 'Visa and address setup', body: 'Investor visa application, registered address and virtual office coordination.' },
        { title: 'Bank account guidance', body: 'We guide you through UAE business bank account opening requirements.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', "LauncherDesk's coordination and documentation work"],
        ['Free zone / mainland fees', 'Trade licence, registration and visa fees — vary by jurisdiction and activity'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'What is the difference between a Free Zone and Mainland company?', a: 'A Free Zone company can be 100% foreign-owned and is best for international trade and digital services. A Mainland company allows direct trade within the UAE market. We recommend the right structure after understanding your business model.' },
        { q: 'Can I open a UAE bank account as an Indian resident?', a: 'Yes, but UAE bank account opening requires in-person visits for most banks. We guide you on the process and which banks are accessible to non-residents.' },
        { q: 'How long does UAE company setup take?', a: 'Typically 2–4 weeks from document submission, subject to the chosen authority processing timeline.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ taxes, shown separately' },
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
      who: { heading: "Who it's for", items: [
        'Startups raising their first angel round or seed funding',
        'Founders who need a professional pitch deck and financial model for investor conversations',
        'Companies preparing for VC conversations and needing a proper data room',
        'Businesses seeking DPIIT-related government scheme funding',
      ]},
      included: { heading: "What's included", items: [
        'Pitch deck structure and content review',
        'Pitch deck design and final polished version',
        'Financial projections model (3-year P&L, revenue assumptions, burn rate)',
        'Cap table review and basic modelling',
        'Investor data room setup and document checklist',
        'One round of revisions included',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Founder briefing', body: 'We understand your business, traction, funding ask and investor target profile.' },
        { title: 'Pitch deck structure', body: 'We create the narrative flow and content structure before any design.' },
        { title: 'Deck design', body: 'We design a professional, investor-standard pitch deck.' },
        { title: 'Financial model', body: 'We build or review the 3-year financial projection model.' },
        { title: 'Data room setup', body: 'We organise all required documents into a clean investor data room.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', "LauncherDesk's work: deck design, financial model, data room"],
        ['Government fee', 'Not applicable'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'How long does a pitch deck take?', a: 'Typically 2–3 weeks from the founder briefing to final deck.' },
        { q: 'Do you connect us with investors?', a: 'LauncherDesk does not provide introductions to investors as part of this service. We focus on making your documentation investor-ready.' },
        { q: 'What financial projections do investors expect?', a: 'Typically a 3-year P&L forecast, revenue build-up model, burn rate and runway calculation, and unit economics. We build these in a format investors can interrogate.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ taxes, shown separately' },
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
      who: { heading: "Who it's for", items: [
        'Founders who want a structured review of their business and honest advice',
        'Small businesses looking for a growth strategy or operational improvement plan',
        'Startups preparing for fundraising, expansion or a major business decision',
        'Established businesses evaluating new markets or products',
      ]},
      included: { heading: "What's included", items: [
        'Initial business review session (2 hours)',
        'Business model and competitive position analysis',
        'Identification of growth opportunities and operational gaps',
        'Strategic recommendations and prioritised action plan',
        'Follow-up session for Q&A and refinement',
        'Written summary of recommendations delivered after the session',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Pre-session brief', body: 'You share context on your business, current challenges and goals before the session.' },
        { title: 'Business review session', body: 'A structured 2-hour session reviewing your business model, market position and key challenges.' },
        { title: 'Analysis and recommendations', body: 'We analyse the session output and develop specific, actionable recommendations.' },
        { title: 'Recommendations delivery', body: 'Written summary and action plan delivered within 3 working days.' },
        { title: 'Follow-up session', body: 'A 1-hour follow-up to answer questions and refine the plan.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', 'Sessions, analysis and written recommendations'],
        ['Government fee', 'Not applicable'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Who conducts the consulting session?', a: 'Sessions are conducted by experienced business advisors coordinated through LauncherDesk — with backgrounds in operations, finance and growth across Indian startups and SMEs.' },
        { q: 'Is this ongoing or a one-time engagement?', a: 'It begins with a one-time engagement. Many clients continue with a monthly or quarterly advisory retainer after the initial session.' },
        { q: 'Can you help with a specific problem rather than a full review?', a: 'Yes. We can scope a focused session around a specific decision — pricing strategy, team structure, fundraising timing or market entry.' },
      ]}
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: 'Priced after scoping' },
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
      who: { heading: "Who it's for", items: [
        'Businesses that need a customer-facing mobile application',
        'Startups building an app-first product or service',
        'Companies that need an internal mobile tool for their team or field staff',
        'Founders with a mobile app idea looking for a development partner',
      ]},
      included: { heading: "What's included", items: [
        'Requirement scoping and feature list documentation',
        'UI/UX design for iOS and Android',
        'Native or cross-platform development (React Native or Flutter)',
        'Backend API development (where required)',
        'Testing across devices and operating system versions',
        'App Store and Google Play Store submission',
        'Post-launch support (as scoped)',
      ]},
      process: { heading: 'Step-by-step process', steps: [
        { title: 'Scoping and specification', body: 'We define the feature set, user flows and technical requirements.' },
        { title: 'UI/UX design', body: 'Screen-by-screen design with your approval before development begins.' },
        { title: 'Development', body: 'Built in sprints with regular demos and check-ins.' },
        { title: 'Testing', body: 'Device testing, performance testing and bug fixing before submission.' },
        { title: 'App store submission', body: 'Submitted to Apple App Store and Google Play with all required metadata and assets.' },
      ]},
      pricing: { heading: 'Transparent pricing', rows: [
        ['Professional fee', "Scoped per project — design, development, testing, submission"],
        ['Platform fees', 'Apple Developer and Google Play fees — passed through at cost'],
        ['Taxes', 'GST on the professional fee, shown separately'],
      ], outro: `<a href="/pricing" style="color:var(--blue-dark);font-weight:600">See how pricing works →</a>` },
      faq: { heading: 'Frequently asked questions', items: [
        { q: 'Do you build for iOS and Android?', a: 'Yes. We typically build using cross-platform frameworks (React Native or Flutter) so one codebase runs on both iOS and Android, reducing cost and development time.' },
        { q: 'How long does app development take?', a: 'A basic app typically takes 8–16 weeks. More complex applications take longer. Timeline and milestones are agreed in the scoping phase.' },
        { q: 'Who owns the app after development?', a: 'You do. The source code and all assets are handed over to you on project completion.' },
      ]}
    },
    related: [
      { href: '/services/software-saas-development', label: 'SaaS Development', note: 'Build a web app alongside your mobile app.' },
      { href: '/services/website-development', label: 'Website Development', note: 'A website to market your app.' },
      { href: '/services/digital-marketing', label: 'Digital Marketing', note: 'Drive app downloads with digital marketing.' },
    ]
  },


}