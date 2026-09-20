/* Bridges Sneha's guided flow (aiFlows.js) to the REAL LauncherDesk service
   catalog (src/data/services.js — the same content the public service pages
   render) so the category-detail screen and follow-up answers use real
   content instead of a one-line generic description, and never invent
   facts. Where a specific service option has no matching catalog entry we
   simply fall back to the category's own (real, bot-sourced) description —
   never a fabricated one. */

import { SERVICES } from './services'

function stripHtml(str) {
  return typeof str === 'string' ? str.replace(/<[^>]+>/g, '').trim() : str
}

/* "categoryId::Option Label" → services.js slug. Only services with a
   genuinely matching catalog page are mapped — anything not listed here
   falls back to the category description instead of guessing. */
const SLUG_MAP = {
  'company-registration::Private Limited Company': 'private-limited-company-registration',
  'company-registration::LLP': 'llp-registration',
  'company-registration::OPC': 'opc-registration',
  'licences::GST': 'gst-registration',
  'licences::Startup India': 'startup-india-dpiit',
  'licences::MSME / Udyam': 'msme-registration',
  'licences::ISO': 'iso-certification',
  'licences::FSSAI': 'fssai-registration',
  'finance::Bookkeeping': 'accounting',
  'finance::GST Filing': 'gst-registration',
  'finance::Income Tax': 'income-tax-filing',
  'finance::Payroll': 'payroll',
  'tech-it::Website Design': 'website-development',
  'tech-it::Ecommerce Website': 'ecommerce-website',
  'tech-it::Mobile App': 'mobile-app-development',
  'tech-it::CRM': 'crm-setup-lead-management',
  'tech-it::Business Automation': 'business-automation',
  'tech-it::Business Email': 'business-email-hosting',
  'tech-it::WhatsApp Business API': 'whatsapp-business-api',
  'digital-marketing::SEO': 'seo-marketing',
  'digital-marketing::Google Ads': 'google-ads-paid-marketing',
  'digital-marketing::Social Media': 'social-media-management',
  'digital-marketing::Content': 'content-marketing',
  'digital-marketing::Branding': 'branding-logo-design',
  'digital-marketing::Marketing Automation': 'business-automation',
  'digital-marketing::WhatsApp Marketing': 'whatsapp-business-api',
  'legal-ip::Trademark': 'trademark-registration',
  'legal-ip::Copyright': 'copyright-registration',
  'legal-ip::Patent': 'patent-registration',
  'legal-ip::ROC Compliance': 'roc-compliance',
  'legal-ip::Legal Drafting': 'legal-document-support',
  'legal-ip::Legal Notices': 'legal-document-support',
  'legal-ip::Contract Review': 'legal-document-support',
  'international::Overseas Company Registration': 'uae-business-setup',
}

/** Real, catalog-sourced detail for a (category, service) pair — or null if
 *  there's no matching page, in which case callers fall back to the
 *  category's own description text. */
export function getServiceContent(categoryId, serviceLabel) {
  const slug = SLUG_MAP[`${categoryId}::${serviceLabel}`]
  const entry = slug && SERVICES[slug]
  if (!entry) return null

  const benefits = (entry.sections?.benefits?.items || []).slice(0, 3).map(stripHtml)
  const steps = (entry.sections?.process?.steps || []).slice(0, 4).map(s => (typeof s === 'string' ? s : s.title))
  const documents = (entry.sections?.documents?.items || []).slice(0, 5).map(stripHtml)
  const timelineFaq = (entry.sections?.faq?.items || []).find(f => /how long|timeline|turnaround/i.test(f.q))

  return {
    slug,
    lead: entry.lead,
    benefits,
    steps,
    documents: documents.length ? documents : null,
    timelineAnswer: timelineFaq ? timelineFaq.a : null,
  }
}

/* ── Natural-language → (category, specific service) matching ──────
   Lets a free-text request like "I want to start a private limited
   company" land directly on the right service instead of making the
   user click through category → service manually. Every entry's own
   keywords always include its exact label; extra phrasings are added
   only for genuinely distinct ways people ask for that same thing. */
const SERVICE_ENTRIES = [
  { categoryId: 'company-registration', service: 'Private Limited Company', keywords: ['private limited company', 'private limited', 'pvt ltd', 'pvt. ltd', 'start a private limited company', 'register private limited', 'incorporate a private limited'] },
  { categoryId: 'company-registration', service: 'LLP', keywords: ['llp', 'limited liability partnership'] },
  { categoryId: 'company-registration', service: 'OPC', keywords: ['opc', 'one person company'] },
  { categoryId: 'company-registration', service: 'Section 8 Company (NGO)', keywords: ['section 8', 'ngo registration', 'non profit company'] },
  { categoryId: 'company-registration', service: 'Trust / Society', keywords: ['trust registration', 'society registration'] },
  { categoryId: 'company-registration', service: 'Nidhi Company', keywords: ['nidhi company'] },
  { categoryId: 'company-registration', service: 'Overseas Company Setup', keywords: ['overseas company setup', 'set up a company abroad'] },

  { categoryId: 'licences', service: 'GST', keywords: ['gst registration', 'gst number', 'need gst', 'get gst', 'gstin'] },
  { categoryId: 'licences', service: 'Startup India', keywords: ['startup india', 'dpiit recognition', 'dpiit'] },
  { categoryId: 'licences', service: 'MSME / Udyam', keywords: ['msme registration', 'udyam registration', 'udyam'] },
  { categoryId: 'licences', service: 'ISO', keywords: ['iso certification', 'iso 9001'] },
  { categoryId: 'licences', service: 'FSSAI', keywords: ['fssai registration', 'food license', 'fssai license'] },
  { categoryId: 'licences', service: 'IEC', keywords: ['iec code', 'import export code'] },
  { categoryId: 'licences', service: 'Trade License', keywords: ['trade license'] },
  { categoryId: 'licences', service: 'Factory License', keywords: ['factory license'] },

  { categoryId: 'finance', service: 'Bookkeeping', keywords: ['bookkeeping', 'handle my accounts', 'manage my accounts', 'accounting help', 'someone to handle my accounts', 'day to day accounting'] },
  { categoryId: 'finance', service: 'GST Filing', keywords: ['gst filing', 'gst returns', 'file my gst'] },
  { categoryId: 'finance', service: 'Income Tax', keywords: ['income tax return', 'itr filing', 'file my taxes', 'tax filing'] },
  { categoryId: 'finance', service: 'Payroll', keywords: ['payroll', 'salary processing', 'run payroll'] },
  { categoryId: 'finance', service: 'TDS Compliance', keywords: ['tds compliance', 'tds filing'] },
  { categoryId: 'finance', service: 'Auditing', keywords: ['auditing', 'statutory audit'] },
  { categoryId: 'finance', service: 'Virtual CFO', keywords: ['virtual cfo', 'cfo services'] },

  { categoryId: 'tech-it', service: 'Website Design', keywords: ['website design', 'website for my business', 'need a website', 'build a website', 'want a website', 'build my website'] },
  { categoryId: 'tech-it', service: 'Ecommerce Website', keywords: ['ecommerce website', 'e-commerce website', 'online store'] },
  { categoryId: 'tech-it', service: 'Mobile App', keywords: ['mobile app', 'android app', 'ios app', 'build an app'] },
  { categoryId: 'tech-it', service: 'ERP', keywords: ['erp system', 'erp software'] },
  { categoryId: 'tech-it', service: 'CRM', keywords: ['crm setup', 'crm software', 'lead management system'] },
  { categoryId: 'tech-it', service: 'Business Automation', keywords: ['business automation', 'automate my workflow'] },
  { categoryId: 'tech-it', service: 'Business Email', keywords: ['business email', 'company email hosting'] },
  { categoryId: 'tech-it', service: 'Cloud Hosting', keywords: ['cloud hosting', 'server hosting'] },
  { categoryId: 'tech-it', service: 'WhatsApp Business API', keywords: ['whatsapp business api', 'whatsapp api'] },

  { categoryId: 'digital-marketing', service: 'SEO', keywords: ['seo', 'search engine optimisation', 'search engine optimization', 'rank on google'] },
  { categoryId: 'digital-marketing', service: 'Google Ads', keywords: ['google ads', 'ppc campaign'] },
  { categoryId: 'digital-marketing', service: 'Meta Ads', keywords: ['meta ads', 'facebook ads', 'instagram ads'] },
  { categoryId: 'digital-marketing', service: 'Social Media', keywords: ['social media marketing', 'manage my social media'] },
  { categoryId: 'digital-marketing', service: 'Content', keywords: ['content marketing', 'content writing'] },
  { categoryId: 'digital-marketing', service: 'Branding', keywords: ['branding', 'logo design'] },
  { categoryId: 'digital-marketing', service: 'Lead Generation', keywords: ['lead generation', 'generate leads'] },
  { categoryId: 'digital-marketing', service: 'WhatsApp Marketing', keywords: ['whatsapp marketing'] },
  { categoryId: 'digital-marketing', service: 'Marketing Automation', keywords: ['marketing automation'] },

  { categoryId: 'legal-ip', service: 'Trademark', keywords: ['trademark registration', 'trademark my brand', 'register a trademark', 'protect my brand name'] },
  { categoryId: 'legal-ip', service: 'Copyright', keywords: ['copyright registration'] },
  { categoryId: 'legal-ip', service: 'Patent', keywords: ['patent registration', 'file a patent'] },
  { categoryId: 'legal-ip', service: 'ROC Compliance', keywords: ['roc compliance', 'roc filing', 'annual roc'] },
  { categoryId: 'legal-ip', service: 'Labour Law', keywords: ['labour law', 'labour compliance'] },
  { categoryId: 'legal-ip', service: 'Legal Notices', keywords: ['legal notice', 'send a legal notice'] },
  { categoryId: 'legal-ip', service: 'Legal Drafting', keywords: ['legal drafting', 'draft an agreement'] },
  { categoryId: 'legal-ip', service: 'Contract Review', keywords: ['contract review', 'review my contract'] },

  { categoryId: 'international', service: 'Overseas Company Registration', keywords: ['overseas company registration', 'expand internationally', 'set up abroad'] },
  { categoryId: 'international', service: 'IEC', keywords: ['iec code', 'import export code'] },
  { categoryId: 'international', service: 'Foreign Subsidiary', keywords: ['foreign subsidiary'] },

  { categoryId: 'office-setup', service: 'Virtual Office Address', keywords: ['virtual office', 'virtual office address'] },
  { categoryId: 'office-setup', service: 'Refurbished Office Furniture', keywords: ['office furniture', 'refurbished furniture'] },
  { categoryId: 'office-setup', service: 'Workspace Setup', keywords: ['workspace setup', 'coworking space'] },

  { categoryId: 'estamp', service: 'New E-Stamp', keywords: ['e-stamp', 'estamp', 'stamp paper'] },
]

/** Best (category, specific service) match for free text, or null. */
export function matchService(text, excludeCategoryId = null) {
  const t = text.toLowerCase()
  let best = null
  let bestScore = 0
  for (const entry of SERVICE_ENTRIES) {
    if (entry.categoryId === excludeCategoryId) continue
    let score = 0
    for (const kw of entry.keywords) {
      if (t.includes(kw)) score = Math.max(score, kw.split(' ').length)
    }
    if (score > bestScore) { bestScore = score; best = entry }
  }
  return bestScore > 0 ? best : null
}

/** Concise, real-content service explanation for the category-detail screen. */
export function buildServiceDetailText(categoryId, serviceLabel, categoryLabel, categoryBody) {
  const content = getServiceContent(categoryId, serviceLabel)
  if (!content) {
    // No catalog page for this specific option — use the category's own real description.
    return `*${serviceLabel || categoryLabel}*\n\n${categoryBody}`
  }
  const parts = [`*${serviceLabel}*`, content.lead]
  if (content.benefits.length) {
    parts.push(`What LauncherDesk helps with:\n${content.benefits.map(b => `• ${b}`).join('\n')}`)
  }
  if (content.steps.length) {
    parts.push(`How it works:\n${content.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`)
  }
  return parts.join('\n\n')
}
