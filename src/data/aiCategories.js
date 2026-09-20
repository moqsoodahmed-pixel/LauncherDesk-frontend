/* Top-level service categories Sneha guides users through.
   Labels, ordering and `body` description text are reconciled against the
   real LauncherDesk WhatsApp bot (src/config/categories.js in the bot repo) —
   the first 7 + "Talk to an Expert" match the bot's MENU_ROWS/CATEGORIES
   exactly. Digital Marketing, Marketplace and E-Stamp are website-only
   sections the bot doesn't define — kept because they're real site
   services, routed through the same generic bot-style capture flow.
   `keywords` are used for free-text intent matching (menu selection,
   "not sure" diagnosis, and mid-flow topic-switch detection). */

export const CATEGORIES = [
  {
    id: 'company-registration',
    label: 'Business Registration',
    body: 'Private Limited, LLP, OPC, Section 8 (NGO), Trust/Society, Nidhi Company, Overseas Company Setup',
    keywords: ['company registration', 'business registration', 'pvt ltd', 'private limited', 'llp', 'opc', 'one person company', 'partnership firm', 'proprietorship', 'ngo', 'trust', 'society', 'nidhi company', 'section 8', 'incorporate', 'incorporation', 'register a company', 'register my company', 'new company', 'start a company', 'start my business', 'overseas setup'],
  },
  {
    id: 'licences',
    label: 'Licenses & Certifications',
    body: 'GST, Startup India, MSME/Udyam, ISO, FSSAI, IEC, Trade License, Factory License',
    keywords: ['licence', 'license', 'gst registration', 'startup india', 'dpiit', 'msme', 'udyam', 'fssai', 'iso certification', 'iec code', 'trade license', 'factory license'],
  },
  {
    id: 'finance',
    label: 'Finance & Accounts',
    body: 'Bookkeeping, GST Filing, Income Tax, Payroll, TDS Compliance, Auditing, Virtual CFO',
    keywords: ['accounting', 'bookkeeping', 'payroll', 'income tax', 'itr filing', 'tds', 'audit', 'auditing', 'cfo', 'virtual cfo', 'gst filing', 'tax filing', 'finance', 'accounts'],
  },
  {
    id: 'tech-it',
    label: 'IT Services',
    body: 'Website Design, E-commerce, Digital Marketing, Business Email, ERP, Cloud Hosting',
    keywords: ['website', 'ecommerce', 'e-commerce', 'mobile app', 'erp', 'crm', 'business automation', 'business email', 'cloud hosting', 'whatsapp business api', 'app development', 'software development'],
  },
  {
    id: 'legal-ip',
    label: 'Legal & Compliance',
    body: 'Legal Drafting, Trademark, Copyright, Patent, ROC Compliance, Labour Law, Legal Notices',
    keywords: ['trademark', 'copyright', 'patent', 'ip management', 'legal drafting', 'legal notice', 'contract review', 'roc compliance', 'roc filing', 'labour law', 'labour compliance', 'annual filing'],
  },
  {
    id: 'digital-marketing',
    label: 'Digital Marketing',
    body: 'SEO, Google Ads, Meta Ads, Social Media, Content, Branding, Lead Generation, WhatsApp Marketing, Marketing Automation',
    keywords: ['seo', 'google ads', 'meta ads', 'instagram ads', 'social media', 'content marketing', 'branding', 'lead generation', 'whatsapp marketing', 'marketing automation', 'digital marketing', 'youtube advertising', 'linkedin b2b'],
  },
  {
    id: 'international',
    label: 'International Expansion',
    body: 'Overseas Company Registration, IEC, Cross-Border Compliance, International Tax, Foreign Subsidiary',
    keywords: ['international business', 'international expansion', 'overseas company', 'expansion', 'foreign subsidiary', 'cross border', 'cross-border compliance', 'abroad', 'export import', 'international tax', 'iec'],
  },
  {
    id: 'office-setup',
    label: 'Office Setup Solutions',
    body: 'Virtual Office Address, Refurbished Office Furniture, Workspace Setup',
    keywords: ['virtual office', 'private office', 'coworking', 'co-working', 'office furniture', 'office setup', 'workspace setup', 'dedicated desk', 'hot desk', 'meeting room'],
  },
  {
    id: 'marketplace',
    label: 'Business Software / Marketplace',
    body: 'Find business software or list your own product — CRM, ERP, Project Management, HR & Payroll, Inventory, WhatsApp Automation, CLM',
    keywords: ['software', 'marketplace', 'list my software', 'find software', 'project management tool', 'hr payroll tool', 'clm', 'inventory software'],
  },
  {
    id: 'estamp',
    label: 'E-Stamp',
    body: 'New E-Stamp, E-Stamp for Agreements, Business/Commercial Documents',
    keywords: ['e-stamp', 'estamp', 'stamp paper', 'stamp duty'],
  },
  {
    id: 'expert',
    label: 'Talk to an Expert',
    body: 'Connect directly with our team',
    keywords: ['talk to an expert', 'speak to someone', 'human', 'call me', 'expert help'],
  },
]

export const OUT_OF_SCOPE_KEYWORDS = [
  'weather', 'cricket', 'football', 'politics', 'election', 'movie', 'song', 'recipe', 'cook',
  'joke', 'riddle', 'homework', 'maths problem', 'write code', 'write a poem', 'who is the prime minister',
  'capital of', 'love story', 'astrology', 'horoscope', 'ipl', 'stock market tip', 'lottery',
]

export function findCategory(id) {
  return CATEGORIES.find(c => c.id === id) || null
}

/** Score every category against free text and return the best match (or null). */
export function matchCategory(text, excludeId = null) {
  const t = text.toLowerCase()
  let best = null
  let bestScore = 0
  for (const cat of CATEGORIES) {
    if (cat.id === excludeId) continue
    let score = 0
    for (const kw of cat.keywords) {
      if (t.includes(kw)) score += kw.split(' ').length
    }
    if (score > bestScore) { bestScore = score; best = cat }
  }
  return bestScore > 0 ? best : null
}
