/** Deeds & Agreements — service catalogue. Each entry gets its own detail page at /agreements/:slug. */
export const AGREEMENT_SECTIONS = [
  {
    id: 'property-land',
    title: 'Property & Land',
    sub: 'Agreements and deeds for buying, selling, renting or transferring property.',
    items: [
      { slug: 'rent-lease-agreement', title: 'Rent / Lease Agreement' },
      { slug: 'agreement-to-sell', title: 'Agreement to Sell' },
      { slug: 'sale-deed', title: 'Sale Deed' },
      { slug: 'gift-deed', title: 'Gift Deed' },
      { slug: 'commercial-lease-agreement', title: 'Commercial Lease Agreement' },
    ],
  },
  {
    id: 'business',
    title: 'Business Agreements',
    sub: 'Documents for partnerships, franchises, joint ventures and vendor relationships.',
    items: [
      { slug: 'partnership-llp-deed', title: 'Partnership / LLP Deed' },
      { slug: 'franchise-agreement', title: 'Franchise Agreement' },
      { slug: 'joint-venture-agreement', title: 'Joint Venture Agreement' },
      { slug: 'business-transfer-agreement', title: 'Business Transfer Agreement' },
      { slug: 'vendor-supply-agreement', title: 'Vendor / Supply Agreement' },
    ],
  },
  {
    id: 'personal',
    title: 'Personal & Investment',
    sub: 'Agreements for loans, confidentiality, shareholding and personal transactions.',
    items: [
      { slug: 'loan-agreement', title: 'Loan Agreement' },
      { slug: 'non-disclosure-agreement', title: 'Non-Disclosure Agreement' },
      { slug: 'shareholder-agreement', title: 'Shareholder Agreement' },
      { slug: 'startup-investment-agreement', title: 'Startup Investment Agreement' },
      { slug: 'vehicle-sale-agreement', title: 'Vehicle Sale Agreement' },
    ],
  },
]

export const ALL_AGREEMENTS = AGREEMENT_SECTIONS.flatMap(s => s.items.map(it => ({ ...it, sectionId: s.id, sectionTitle: s.title })))
export const agreementBySlug = slug => ALL_AGREEMENTS.find(a => a.slug === slug)

export const AGREEMENT_PRICING = {
  standard: { label: 'Standard', price: 899, docValue: 100 },
  upgraded: { label: 'Upgraded', price: 1499, docValue: 500 },
}

export const AGREEMENT_DOCUMENTS = [
  'PAN Card (both parties)',
  'Aadhaar Card (both parties)',
  'Passport-size photograph (both parties)',
  'Two witnesses’ ID proof, for physical signing',
  'If a party is a Company, LLP or Firm: Certificate of Incorporation, entity PAN, and the authorised signatory’s ID proof',
]

export const LD_WA = '918548854859'
export const waLink = title => `https://wa.me/${LD_WA}?text=${encodeURIComponent(`Hi, I need a ${title} drafted.`)}`

/** Overview copy, templated per agreement title. Kept as one shared template (not hardcoded per page)
 *  so wording stays consistent and is editable in one place. */
export const agreementOverview = title =>
  `A ${title.toLowerCase()} records the terms agreed between the parties in writing, so both sides have a clear, enforceable reference if a dispute arises later. Use it whenever you need the arrangement confirmed on paper, with a government e-Stamp, before either party acts on it.`

/** Purpose — why this document exists, distinct from the general overview above. */
export const agreementPurpose = title =>
  `The purpose of a ${title.toLowerCase()} is to set out, in writing, exactly what each party has agreed to — so neither side can later dispute the terms, timelines or obligations. It protects both parties and gives either one a legal basis to act if the other doesn't hold up their end.`

/** When to use — the practical trigger for needing this document. */
export const agreementWhenToUse = title =>
  `Get a ${title.toLowerCase()} drafted before any money changes hands or possession is handed over — ideally as soon as both parties have agreed on the key terms. Having it signed and e-Stamped upfront avoids disputes later and is often required to register, enforce, or produce the document as evidence.`

export const AGREEMENT_BENEFITS = [
  'Drafted by our documentation team, not a generic template generator',
  'Reviewed for accuracy before it is sent to you',
  'Printed on genuine Government e-Stamp paper',
  'Doorstep delivery of the signed original, if you choose it',
]

/** Key features — what the service itself includes, distinct from Benefits (why it helps you). */
export const AGREEMENT_FEATURES = [
  'Lawyer-reviewed clause library, not a generic online template',
  'Editable draft — request changes before it is finalised',
  'Correct Government e-Stamp duty applied for your state',
  'Digital copy delivered to your dashboard, with physical delivery optional',
]

/** Eligibility — who can use this service / what's needed to qualify, templated per agreement. */
export const agreementEligibility = title =>
  [
    `Both parties to the ${title.toLowerCase()} must be 18 years or older and legally competent to enter into a contract.`,
    'Valid government-issued ID (PAN and Aadhaar) is required for every named party.',
    'If a party is a company, LLP or firm, its Certificate of Incorporation and an authorised signatory are required.',
  ]

export const AGREEMENT_PROCESS = [
  ['Share your details', 'Tell us the parties, dates and terms over WhatsApp.'],
  ['We draft it', 'Our documentation team prepares the agreement for your review.'],
  ['You review it', 'Check every detail and request changes before anything is finalised.'],
  ['e-Stamp and delivery', 'We print it on e-Stamp paper and deliver it to your door, if chosen.'],
]

export const agreementFaqs = title => [
  [`Is this ${title.toLowerCase()} legally valid?`, 'Yes. Once printed on Government e-Stamp paper and signed by both parties, it is legally valid and admissible as evidence, the same as a physical stamp paper agreement.'],
  ['How long does drafting take?', 'Most agreements are drafted and ready for your review within 24 to 48 hours of sharing your details.'],
  ['Can I request changes after seeing the draft?', 'Yes. You review the full draft before it is finalised and can request changes at no extra cost.'],
]

/** Other items in the same sub-category, for "Related agreements" — excludes the current one. */
export const relatedAgreements = (slug, limit = 3) => {
  const current = agreementBySlug(slug)
  if (!current) return []
  const section = AGREEMENT_SECTIONS.find(s => s.id === current.sectionId)
  return (section?.items || []).filter(i => i.slug !== slug).slice(0, limit)
}

const B = '_______________'

/** Sample draft previews — clause-by-clause, matching the structure of a real rent/lease agreement.
 *  Blank fields are shown as underscores, exactly as a live draft preview would, until the order is paid for. */
export const DRAFT_PREVIEWS = {
  'rent-lease-agreement': {
    docTitle: 'RENT AGREEMENT (Residential Rent Agreement)',
    intro: [
      `Executed on Government e-Stamp Paper — Certificate No.: ${B}`,
      `This Rent Agreement is made and executed on this ${B} at ${B}, ${B}.`,
    ],
    parties: [
      `BETWEEN`,
      `FIRST PARTY (LANDLORD): ${B}, son/daughter/spouse of ${B}, holding Aadhaar Card, residing at ${B}.`,
      `AND`,
      `SECOND PARTY (TENANT): ${B}, son/daughter/spouse of ${B}, holding Aadhaar Card, residing at ${B}.`,
    ],
    whereas: `WHEREAS the Landlord is the absolute owner and is in peaceful possession of the residential property situated at ${B}. The Landlord has agreed to let out the said premises to the Tenant exclusively for residential purposes, and the Tenant has agreed to take the said premises on rent upon the terms herein.`,
    clauses: [
      ['Monthly Rent', `The Tenant agrees to pay a monthly rent of ${B} to the Landlord, payable on or before the ${B} day of every calendar month, without demand or reminder, through any mutually agreed lawful mode of payment.`],
      ['Security Deposit', `The Tenant has paid a refundable security deposit of ${B} to the Landlord. The deposit is interest-free and shall be refunded at the time of vacating, after adjusting any lawful dues or damages.`],
      ['Duration of Tenancy', `This tenancy is granted for a fixed period of 11 months, commencing from ${B} and ending on ${B}, unless terminated earlier under this Agreement. Renewal requires the mutual written consent of both parties.`],
      ['Purpose of Tenancy', `The Tenant shall use the rented premises strictly for lawful residential purposes only, and shall not use the premises for any other purpose without the Landlord's prior written consent.`],
      ['Lock-in Period', `This Agreement carries no lock-in period; either party may terminate it per the Notice of Termination clause below.`],
      ['Utilities and Maintenance', `Electricity and water charges, and routine maintenance, are covered as agreed between the parties. The Tenant shall use all utilities responsibly.`],
      ['Possession', `The Landlord delivers peaceful and vacant possession of the premises to the Tenant on the commencement date. The Tenant confirms having inspected the premises and accepts its present condition.`],
      ['Alterations and Structural Changes', `The Tenant shall not make any permanent structural alteration without the Landlord's prior written consent, though reasonable temporary fixtures may be installed and removed on vacating.`],
      ['Subletting and Transfer', `The Tenant shall not sub-let, assign, transfer, or part with possession of the premises without the Landlord's prior written consent. Unauthorised subletting is a material breach entitling termination.`],
      ['Inspection of Premises', `The Landlord, or an authorised representative, may inspect the premises during reasonable hours with reasonable prior notice, to verify condition, carry out repairs, or comply with statutory requirements.`],
      ['Repairs and Maintenance', `The Tenant shall attend to minor day-to-day upkeep from ordinary use. Major structural repairs remain the Landlord's responsibility, unless caused by the Tenant's negligence or misuse.`],
      ['Damage to Property', `The Tenant shall exercise reasonable care and, in the event of damage caused by the Tenant, shall restore the premises or reimburse the actual cost of repairs. Normal wear and tear is excluded.`],
      ['Cleanliness and Peaceful Enjoyment', `The Tenant shall keep the premises in a clean, hygienic condition and shall not cause nuisance to neighbouring occupants. The Landlord shall ensure the Tenant's peaceful possession, subject to compliance with this Agreement.`],
      ['Illegal or Prohibited Activities', `The Tenant shall not use the premises for any unlawful or anti-social activity, nor store hazardous or prohibited substances except those ordinarily required for domestic use.`],
      ['Notice of Termination', `Either party may terminate this Agreement before expiry by giving the other party 30 days' prior written notice. During the notice period the Tenant shall continue paying rent and complying with all obligations.`],
      ['Default', `If the Tenant fails to pay rent on time, materially breaches any provision, or uses the premises unlawfully, the Landlord may take appropriate legal action, including termination. The Tenant may likewise seek lawful remedies if the Landlord defaults on their obligations.`],
      ['Renewal of Tenancy', `Upon expiry of the initial term, this Agreement may be renewed only by mutual written consent, on terms (including any revised rent) agreed between the parties at that time.`],
      ['Compliance with Laws', `The Tenant shall comply with all applicable central, state, municipal and local authority laws, rules and directions relating to the occupation and use of the premises.`],
      ['Indemnity', `The Tenant shall indemnify the Landlord against loss, damage or claim arising from a breach of this Agreement or unlawful acts by the Tenant. The Landlord shall similarly indemnify the Tenant against claims arising solely from defects in title.`],
      ['Governing Law and Jurisdiction', `This Agreement is governed by the applicable laws of ${B} and the Republic of India. Disputes are subject to the exclusive jurisdiction of the competent courts at ${B}.`],
      ['Entire Agreement', `This Agreement constitutes the complete understanding between the Landlord and the Tenant. No amendment is valid unless made in writing and accepted by both parties.`],
      ['Electronic Execution', `The parties agree that this Agreement may be executed electronically, with the same legal validity and enforceability as a manually signed Agreement, subject to applicable law.`],
      ['Declaration by the Landlord', `The Landlord declares that they are the lawful owner and in peaceful possession of the premises, have full legal authority to let it out, and that it is free from any encumbrance adversely affecting this tenancy.`],
      ['Declaration by the Tenant', `The Tenant declares that they have inspected the premises, found them suitable, and shall use them strictly for the stated purpose, pay the agreed rent, and peacefully hand over vacant possession on expiry or lawful termination.`],
      ['Severability', `If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.`],
    ],
    execution: [
      `ELECTRONIC EXECUTION`,
      `FIRST PARTY (LANDLORD): ${B}`,
      `SECOND PARTY (TENANT): ${B}`,
    ],
  },
}
