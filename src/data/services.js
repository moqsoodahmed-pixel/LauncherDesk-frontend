/* All service detail page data — mirrors the original HTML content exactly */

export const SERVICES = {
  'private-limited-company-registration': {
    title: 'Private Limited Company Registration',
    metaTitle: 'Private Limited Company Registration — LauncherDesk',
    metaDesc: 'Register a Private Limited Company in India with LauncherDesk. Overview, eligibility, documents, process, timeline, transparent pricing and Pvt Ltd vs LLP comparison.',
    eyebrow: 'Start your business',
    crumbCategory: 'Start your business',
    lead: "The standard structure for startups that want limited liability, credibility and the ability to raise investment. We handle the entire MCA process end to end.",
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ government fee & taxes, shown separately' },
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ taxes, shown separately' },
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ government fee & taxes, shown separately' },
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ government fee & taxes, shown separately' },
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
    eyebrow: 'Registrations & compliance',
    crumbCategory: 'Registrations & compliance',
    lead: "A quick registration that unlocks collateral-free loans, subsidies, delayed-payment protection and priority in government tenders.",
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ government fee & taxes, shown separately' },
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
    priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ government fee & taxes, shown separately' },
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
}
