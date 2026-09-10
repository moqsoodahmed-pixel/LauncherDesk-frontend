/* Declarative service-qualification flows.
   Each flow is a small graph of steps: {id, ask, type, field, options, next, validate}.
   `next` is either a step id string, a sentinel ('__summary__' / '__menu__' /
   '__diagnose__' / '__switch_<category>__'), or a function (value, answers) => stepId.

   Reconciled against the real LauncherDesk WhatsApp bot (categories.js +
   stateMachine.js + messages.js in the bot repo): every category now
   converges on the SAME generic capture sequence the bot actually uses —
   a category-detail screen ("Need This Service" / "Back to Menu") followed
   by Name → Mobile → Email → Business Name → City → Confirm — instead of
   inventing separate qualifying questions per category (the bot has none).
   The per-category "which service" selection step is kept from the site's
   own catalog (the bot has no button list here either, just descriptive
   text), since that's what lets users pick a specific service, not a
   bot-defined question we're overriding. */

import { CATEGORIES } from './aiCategories'
import { buildServiceDetailText } from './serviceDetails'

export const SUMMARY = '__summary__'
export const MENU = '__menu__'

const req = (label) => (v) => (v && v.trim().length > 0 ? true : `Could you share ${label}? It helps me get this right.`)
const validCity = (v) => (v && v.trim().length >= 2 ? true : "Which city should I note down? (e.g. Bengaluru, Mumbai, Delhi)")
/* Bot only checks length (>= 2 chars) for the name — matched exactly, no extra character-class rule invented. */
const validName = (v) => (v && v.trim().length >= 2 ? true : 'Please enter your full name (at least 2 characters):')
const validMobile = (v) => {
  const digits = (v || '').replace(/\D/g, '').slice(-10)
  return /^[6-9]\d{9}$/.test(digits) ? true : "That doesn't look like a valid 10-digit mobile number — please re-check and enter it again."
}
/* Exact bot EMAIL_REGEX + invalid-email wording. */
const validEmail = (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || '').trim())
  ? true
  : "Hmm, that doesn't look like a valid email. 🤔\n\nPlease re-check and send again.\nExample: name@company.com")

function categoryMeta(id) {
  return CATEGORIES.find(c => c.id === id)
}

/** The bot's category-detail screen: "Need This Service" / "Back to Menu",
 *  fed with the REAL catalog description for the specific service the user
 *  picked (falling back to the category's own real description when there's
 *  no matching catalog page) — never an invented explanation. */
function categoryDetailStep(categoryId, serviceField) {
  const cat = categoryMeta(categoryId)
  return {
    id: 'categoryDetail',
    ask: (answers) => buildServiceDetailText(categoryId, answers[serviceField], cat.label, cat.body),
    type: 'choice',
    field: '_detail',
    options: ['Need This Service', 'Back to Menu'],
    next: (v) => (v === 'Need This Service' ? 'name' : MENU),
  }
}

/** The bot's exact generic lead-capture tail: Name → Mobile → Email → Business → City → Confirm.
 *  Mobile is a necessary web-only addition — the WhatsApp bot gets the phone number for free
 *  from the session, a website chat has no equivalent and still needs it to follow up. */
function genericTail() {
  return {
    name: { id: 'name', ask: 'Please type your full name:', type: 'text', field: 'name', validate: validName, next: 'mobile' },
    mobile: { id: 'mobile', ask: 'And the best mobile number to reach you on?', type: 'text', field: 'mobile', validate: validMobile, next: 'email' },
    email: {
      id: 'email',
      ask: (a) => `Thanks, ${a.name || 'there'}! 📧\n\nWhat's your email address?\n(We'll send a summary of your enquiry.)`,
      type: 'text', field: 'email', validate: validEmail, next: 'business',
    },
    business: {
      id: 'business', ask: "What's your business name?", type: 'text', field: 'businessName',
      quickOptions: ['Not registered yet'], next: 'city',
    },
    city: { id: 'city', ask: 'Which city are you based in? 📍', type: 'text', field: 'city', validate: validCity, next: SUMMARY },
  }
}

const GENERIC_SUMMARY_FIELDS = [
  { label: '👤 Name', field: 'name' },
  { label: '📱 Mobile', field: 'mobile' },
  { label: '📧 Email', field: 'email' },
  { label: '🏢 Business', field: 'businessName' },
  { label: '📍 City', field: 'city' },
]

/* ── Business Registration ───────────────────────────────────────── */
const companyRegistration = {
  id: 'company-registration',
  label: 'Business Registration',
  entry: 'businessType',
  summaryFields: [{ label: '🎯 Service', field: 'businessType' }, ...GENERIC_SUMMARY_FIELDS],
  steps: {
    businessType: {
      id: 'businessType', ask: 'What would you like to register?', type: 'choice', field: 'businessType',
      options: ['Private Limited Company', 'LLP', 'OPC', 'Section 8 Company (NGO)', 'Trust / Society', 'Nidhi Company', 'Overseas Company Setup', 'Not Sure'],
      next: (v) => (v === 'Not Sure' ? '__diagnose__' : 'categoryDetail'),
    },
    categoryDetail: categoryDetailStep('company-registration', 'businessType'),
    ...genericTail(),
  },
}

/* ── Licenses & Certifications ───────────────────────────────────── */
const licences = {
  id: 'licences',
  label: 'Licenses & Certifications',
  entry: 'service',
  summaryFields: [{ label: '🎯 Service', field: 'service' }, ...GENERIC_SUMMARY_FIELDS],
  steps: {
    service: {
      id: 'service', ask: 'Which service do you need?', type: 'choice', field: 'service',
      options: ['GST', 'Startup India', 'MSME / Udyam', 'ISO', 'FSSAI', 'IEC', 'Trade License', 'Factory License', 'Other'],
      next: 'categoryDetail',
    },
    categoryDetail: categoryDetailStep('licences', 'service'),
    ...genericTail(),
  },
}

/* ── Finance & Accounts ─────────────────────────────────────────── */
const finance = {
  id: 'finance',
  label: 'Finance & Accounts',
  entry: 'service',
  summaryFields: [{ label: '🎯 Service', field: 'service' }, ...GENERIC_SUMMARY_FIELDS],
  steps: {
    service: {
      id: 'service', ask: 'Which service do you need?', type: 'choice', field: 'service',
      options: ['Bookkeeping', 'GST Filing', 'Income Tax', 'Payroll', 'TDS Compliance', 'Auditing', 'Virtual CFO'],
      next: 'categoryDetail',
    },
    categoryDetail: categoryDetailStep('finance', 'service'),
    ...genericTail(),
  },
}

/* ── IT Services ────────────────────────────────────────────────── */
const techIt = {
  id: 'tech-it',
  label: 'IT Services',
  entry: 'service',
  summaryFields: [{ label: '🎯 Service', field: 'service' }, ...GENERIC_SUMMARY_FIELDS],
  steps: {
    service: {
      id: 'service', ask: 'What do you need?', type: 'choice', field: 'service',
      options: ['Website Design', 'Ecommerce Website', 'Mobile App', 'ERP', 'CRM', 'Business Automation', 'Business Email', 'Cloud Hosting', 'WhatsApp Business API'],
      next: 'categoryDetail',
    },
    categoryDetail: categoryDetailStep('tech-it', 'service'),
    ...genericTail(),
  },
}

/* ── Digital Marketing (website-only — not a bot category; same generic capture) ── */
const digitalMarketing = {
  id: 'digital-marketing',
  label: 'Digital Marketing',
  entry: 'service',
  summaryFields: [{ label: '🎯 Service', field: 'service' }, ...GENERIC_SUMMARY_FIELDS],
  steps: {
    service: {
      id: 'service', ask: 'What do you need help with?', type: 'choice', field: 'service',
      options: ['SEO', 'Google Ads', 'Meta Ads', 'Social Media', 'Content', 'Branding', 'Lead Generation', 'WhatsApp Marketing', 'Marketing Automation', 'Other'],
      next: 'categoryDetail',
    },
    categoryDetail: categoryDetailStep('digital-marketing', 'service'),
    ...genericTail(),
  },
}

/* ── Legal & Compliance ───────────────────────────────────────────── */
const legalIp = {
  id: 'legal-ip',
  label: 'Legal & Compliance',
  entry: 'service',
  summaryFields: [{ label: '🎯 Service', field: 'service' }, ...GENERIC_SUMMARY_FIELDS],
  steps: {
    service: {
      id: 'service', ask: 'What do you need help with?', type: 'choice', field: 'service',
      options: ['Legal Drafting', 'Trademark', 'Copyright', 'Patent', 'ROC Compliance', 'Labour Law', 'Legal Notices', 'Contract Review', 'Other'],
      next: 'categoryDetail',
    },
    categoryDetail: categoryDetailStep('legal-ip', 'service'),
    ...genericTail(),
  },
}

/* ── International Expansion ─────────────────────────────────────── */
const international = {
  id: 'international',
  label: 'International Expansion',
  entry: 'need',
  summaryFields: [{ label: '🎯 Service', field: 'need' }, ...GENERIC_SUMMARY_FIELDS],
  steps: {
    need: {
      id: 'need', ask: 'What do you need help with?', type: 'choice', field: 'need',
      options: ['Overseas Company Registration', 'IEC', 'Cross-Border Compliance', 'International Tax', 'Foreign Subsidiary', 'Business Visa', 'Bank Account', 'Other'],
      next: 'categoryDetail',
    },
    categoryDetail: categoryDetailStep('international', 'need'),
    ...genericTail(),
  },
}

/* ── Office Setup Solutions ──────────────────────────────────────── */
const officeSetup = {
  id: 'office-setup',
  label: 'Office Setup Solutions',
  entry: 'need',
  summaryFields: [{ label: '🎯 Service', field: 'need' }, ...GENERIC_SUMMARY_FIELDS],
  steps: {
    need: {
      id: 'need', ask: 'What do you need?', type: 'choice', field: 'need',
      options: ['Virtual Office Address', 'Refurbished Office Furniture', 'Workspace Setup'],
      next: 'categoryDetail',
    },
    categoryDetail: categoryDetailStep('office-setup', 'need'),
    ...genericTail(),
  },
}

/* ── Business Software / Marketplace (website-only) ──────────────── */
const marketplace = {
  id: 'marketplace',
  label: 'Business Software / Marketplace',
  entry: 'mode',
  summaryFields: [{ label: '🎯 Looking for', field: 'mode' }, ...GENERIC_SUMMARY_FIELDS],
  steps: {
    mode: {
      id: 'mode', ask: 'Are you looking for software or do you want to list your software?', type: 'choice', field: 'mode',
      options: ['Find the Right Tool', 'List My Software'],
      next: 'categoryDetail',
    },
    categoryDetail: categoryDetailStep('marketplace', 'mode'),
    ...genericTail(),
  },
}

/* ── E-Stamp (website-only) ──────────────────────────────────────── */
const estamp = {
  id: 'estamp',
  label: 'E-Stamp',
  entry: 'type',
  summaryFields: [{ label: '🎯 Service', field: 'type' }, ...GENERIC_SUMMARY_FIELDS],
  steps: {
    type: {
      id: 'type', ask: 'What type of E-Stamp service do you need?', type: 'choice', field: 'type',
      options: ['New E-Stamp', 'E-Stamp for Agreement', 'Business / Commercial Document', 'Not Sure'],
      next: (v) => (v === 'Not Sure' ? '__diagnose__' : 'categoryDetail'),
    },
    categoryDetail: categoryDetailStep('estamp', 'type'),
    ...genericTail(),
  },
}

/* ── Talk to an Expert ────────────────────────────────────────────
   The bot hands this straight to a human with zero questions — the
   website still needs a name + number to have someone follow up with,
   which the bot gets for free from the WhatsApp session. */
const expert = {
  id: 'expert',
  label: 'Talk to an Expert',
  entry: 'name',
  isExpert: true,
  summaryFields: [{ label: '👤 Name', field: 'name' }, { label: '📱 Mobile', field: 'mobile' }],
  steps: {
    name: { id: 'name', ask: 'Please type your full name:', type: 'text', field: 'name', validate: validName, next: 'mobile' },
    mobile: { id: 'mobile', ask: 'And the best mobile number to reach you on?', type: 'text', field: 'mobile', validate: validMobile, next: SUMMARY },
  },
}

export const FLOWS = {
  'company-registration': companyRegistration,
  licences,
  finance,
  'tech-it': techIt,
  'digital-marketing': digitalMarketing,
  'legal-ip': legalIp,
  international,
  'office-setup': officeSetup,
  marketplace,
  estamp,
  expert,
}
