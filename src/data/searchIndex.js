/* ── LauncherDesk Comprehensive Frontend Search Index ──────────────── */

export const SEARCH_ITEMS = [
  // ── 1. BUSINESS REGISTRATIONS & INCORPORATION ──
  { id: 'pvt-ltd', title: 'Private Limited Company Registration', category: 'Registrations', badge: 'Incorporation', desc: 'Incorporate a Pvt Ltd company — the startup standard for fundraising and limited liability.', path: '/services/private-limited-company-registration', keywords: ['company registration', 'incorporation', 'pvt ltd', 'private limited', 'mca', 'startup', 'director', 'din', 'cin', 'share capital', 'equity'], icon: 'building' },
  { id: 'llp', title: 'LLP Registration (Limited Liability Partnership)', category: 'Registrations', badge: 'Incorporation', desc: 'Flexible partner-owned structure with limited liability and lighter compliance load.', path: '/services/llp-registration', keywords: ['llp', 'limited liability partnership', 'partners', 'partnership agreement', 'incorporation', 'mca'], icon: 'users' },
  { id: 'opc', title: 'One Person Company (OPC) Registration', category: 'Registrations', badge: 'Incorporation', desc: 'Full corporate limited liability and separate legal entity for solo entrepreneurs.', path: '/services/opc-registration', keywords: ['opc', 'one person company', 'solo founder', 'single director', 'incorporation', 'nominee'], icon: 'user' },
  { id: 'partnership', title: 'Partnership Firm Registration', category: 'Registrations', badge: 'Incorporation', desc: 'Simple, lowest-cost registration for small owner-operated businesses and trade firms.', path: '/services/partnership-registration', keywords: ['partnership firm', 'deed', 'partners', 'registration of firms', 'rof', 'unregistered'], icon: 'briefcase' },
  { id: 'gst-reg', title: 'GST Registration & Return Filing', category: 'Compliance & Tax', badge: 'Tax & GST', desc: 'GSTIN number acquisition and ongoing monthly / quarterly return filing.', path: '/services/gst-registration', keywords: ['gst', 'gstin', 'goods and services tax', 'gst filing', 'gstr1', 'gstr3b', 'tax return', 'invoicing'], icon: 'file-text' },
  { id: 'msme', title: 'MSME / Udyam Registration', category: 'Registrations', badge: 'Govt Scheme', desc: 'Unlock collateral-free loans, government subsidies, priority lending and payment protection.', path: '/services/msme-registration', keywords: ['msme', 'udyam', 'small business', 'subsidies', 'government loan', 'priority sector'], icon: 'shield' },
  { id: 'startup-india', title: 'Startup India DPIIT Recognition', category: 'Registrations', badge: 'Govt Scheme', desc: 'Get DPIIT certificate, Section 80-IAC tax holiday eligibility, and angel tax exemption.', path: '/services/startup-india-dpiit', keywords: ['startup india', 'dpiit', 'tax exemption', '80iac', 'angel tax', 'seed fund', 'recognition'], icon: 'award' },
  { id: 'fssai', title: 'FSSAI Food License & Registration', category: 'Registrations', badge: 'Licences', desc: 'Mandatory food safety license for cloud kitchens, restaurants, food manufacturers & traders.', path: '/services/fssai-registration', keywords: ['fssai', 'food license', 'foscos', 'restaurant', 'food business', 'cloud kitchen', 'swiggy', 'zomato'], icon: 'tag' },
  { id: 'iso', title: 'ISO Certification (9001, 27001, 14001)', category: 'Registrations', badge: 'Certifications', desc: 'International quality, security and environmental management standards for enterprise tenders.', path: '/services/iso-certification', keywords: ['iso', 'iso 9001', 'iso 27001', 'quality standards', 'certification', 'audit', 'tender'], icon: 'check-circle' },
  { id: 'trademark', title: 'Trademark Registration & Brand Protection', category: 'IP & Legal', badge: 'Trademark', desc: 'Protect your brand name, logo and tagline across all 45 classes with TM and ® status.', path: '/services/trademark-registration', keywords: ['trademark', 'brand name', 'logo', 'tm', 'brand protection', 'trademark filing', 'class search', 'ipr'], icon: 'shield' },
  { id: 'tm-objection', title: 'Trademark Objection & Examination Reply', category: 'IP & Legal', badge: 'Trademark', desc: 'Professional drafting and legal representation for Trademark Registry examination reports.', path: '/services/trademark-objection', keywords: ['trademark objection', 'hearing', 'examination report', 'reply', 'ip lawyer'], icon: 'alert-triangle' },
  { id: 'patent', title: 'Patent Search & Registration', category: 'IP & Legal', badge: 'IPR', desc: 'Protect your inventions, hardware innovations and proprietary engineering workflows.', path: '/services/patent-registration', keywords: ['patent', 'provisional patent', 'invention', 'hardware', 'ipr', 'prior art'], icon: 'cpu' },
  { id: 'copyright', title: 'Copyright Registration', category: 'IP & Legal', badge: 'IPR', desc: 'Legal protection for software source code, creative designs, books, and artistic works.', path: '/services/copyright-registration', keywords: ['copyright', 'source code', 'software', 'art', 'content', 'design', 'protection'], icon: 'file-text' },
  { id: 'estamp', title: 'E-Stamp Services (Digital Stamp Paper)', category: 'IP & Legal', badge: 'Legal', desc: 'Online e-stamping and legal documentation across Indian states with same-day digital delivery.', path: '/estamp', keywords: ['estamp', 'e-stamp', 'stamp paper', 'agreement', 'affidavit', 'notary', 'nda', 'contract'], icon: 'file' },
  { id: 'roc', title: 'ROC Annual Compliance & Filings', category: 'Compliance & Tax', badge: 'Compliance', desc: 'Annual MCA returns (AOC-4, MGT-7), DIR-3 KYC, board resolutions, and statutory registers.', path: '/services/roc-compliance', keywords: ['roc', 'mca', 'annual compliance', 'aoc4', 'mgt7', 'dir3 kyc', 'agm', 'statutory audit'], icon: 'check-square' },
  { id: 'accounting', title: 'Accounting & Monthly Bookkeeping', category: 'Compliance & Tax', badge: 'Finance', desc: 'Dedicated accountants maintaining books on Zoho, QuickBooks, or Tally with monthly MIS reports.', path: '/services/accounting', keywords: ['accounting', 'bookkeeping', 'zoho books', 'tally', 'mis report', 'ledger', 'balance sheet'], icon: 'dollar-sign' },
  { id: 'payroll', title: 'Payroll Management & PF / ESI / TDS', category: 'Compliance & Tax', badge: 'Finance', desc: 'Salary processing, automated payslips, PF, ESIC, Professional Tax and Form 16 generation.', path: '/services/payroll', keywords: ['payroll', 'salary', 'payslip', 'pf', 'epfo', 'esic', 'tds', 'form 16', 'compensation'], icon: 'users' },
  { id: 'itr', title: 'Income Tax Return (ITR) Filing', category: 'Compliance & Tax', badge: 'Tax', desc: 'Corporate, LLP and founder income tax return filing with maximum deduction optimisation.', path: '/services/income-tax-filing', keywords: ['itr', 'income tax', 'tax filing', 'corporate tax', 'advance tax', 'tax audit', 'form 26as'], icon: 'file-text' },
  { id: 'website-dev', title: 'Website Development & E-Commerce', category: 'Technology & IT', badge: 'IT Services', desc: 'High-converting business websites, custom web apps, and Shopify / WooCommerce stores.', path: '/services/website-development', keywords: ['website', 'web development', 'ecommerce', 'shopify', 'frontend', 'react', 'nextjs', 'store'], icon: 'globe' },
  { id: 'static-web', title: 'Static & Corporate Website Development', category: 'Technology & IT', badge: 'IT Services', desc: 'Ultra-fast, responsive corporate websites designed for speed, credibility and SEO.', path: '/services/static-website', keywords: ['static website', 'corporate site', 'landing page', 'portfolio', 'web design'], icon: 'layout' },
  { id: 'dynamic-web', title: 'Dynamic Website & CMS Development', category: 'Technology & IT', badge: 'IT Services', desc: 'Content-managed dynamic websites with admin panels, blogs, and custom user portals.', path: '/services/dynamic-website', keywords: ['dynamic website', 'cms', 'wordpress', 'web portal', 'backend', 'database'], icon: 'database' },
  { id: 'ecommerce-web', title: 'E-commerce Website & Payment Gateway', category: 'Technology & IT', badge: 'IT Services', desc: 'Full-featured online store with payment gateway (Razorpay, Stripe), product catalogue & inventory.', path: '/services/ecommerce-website', keywords: ['ecommerce website', 'online shop', 'razorpay', 'stripe', 'cart', 'checkout', 'orders'], icon: 'shopping-cart' },
  { id: 'mobile-app', title: 'Mobile Application Development (iOS & Android)', category: 'Technology & IT', badge: 'IT Services', desc: 'Native and Flutter / React Native cross-platform mobile apps built for scale.', path: '/services/mobile-app-development', keywords: ['mobile app', 'ios', 'android', 'react native', 'flutter', 'play store', 'app store'], icon: 'smartphone' },
  { id: 'crm-setup', title: 'CRM Setup & Lead Management Portal', category: 'Technology & IT', badge: 'IT Services', desc: 'Tailored CRM workflows, sales pipelines, lead routing and customer communication systems.', path: '/services/crm-setup-lead-management', keywords: ['crm', 'lead management', 'sales pipeline', 'zoho crm', 'hubspot', 'customer portal'], icon: 'layers' },
  { id: 'automation', title: 'Business Automation & Workflow Integrations', category: 'Technology & IT', badge: 'Automation', desc: 'Connect apps, automate repetitive manual tasks, and build operational efficiency.', path: '/services/business-automation', keywords: ['automation', 'zapier', 'make', 'workflows', 'api', 'integrations', 'efficiency'], icon: 'zap' },
  { id: 'digital-marketing', title: 'Digital Marketing & Growth SEO', category: 'Technology & IT', badge: 'Growth', desc: 'SEO optimization, Google Ads (PPC), Meta ads, social media management and branding.', path: '/services/digital-marketing', keywords: ['digital marketing', 'seo', 'google ads', 'meta ads', 'social media', 'growth', 'ppc', 'branding'], icon: 'trending-up' },
  { id: 'wa-api', title: 'WhatsApp Business API & Chatbots', category: 'Technology & IT', badge: 'IT Services', desc: 'Official Meta WhatsApp Business API for broadcast campaigns, automated notifications & chatbots.', path: '/services/whatsapp-business-api', keywords: ['whatsapp api', 'whatsapp business', 'meta api', 'chatbot', 'broadcast', 'notifications', 'otp'], icon: 'message-circle' },
  { id: 'virtual-office', title: 'Virtual Office Bangalore (GST & Company Registration)', category: 'Office & Spaces', badge: 'Workspace', desc: 'Premium commercial address in Koramangala & Commercial Street for GST and MCA registration with NOC.', path: '/virtual-office', keywords: ['virtual office', 'bangalore', 'gst address', 'company registration address', 'koramangala', 'commercial street', 'noc'], icon: 'map-pin' },
  { id: 'office-restore', title: 'Office Setup & Workspace Restorations', category: 'Office & Spaces', badge: 'Workspace', desc: 'Commercial interior restorations, office furniture, ergonomic setups, and facility management.', path: '/office-restore', keywords: ['office setup', 'workspace', 'office furniture', 'interior', 'ergonomic', 'facility'], icon: 'home' },
  { id: 'coworking', title: 'Coworking Spaces & Dedicated Desks', category: 'Office & Spaces', badge: 'Workspace', desc: 'Flexible coworking desks, private cabins, meeting rooms and shared office infrastructure.', path: '/office-restore/coworking', keywords: ['coworking', 'shared office', 'desk', 'private cabin', 'meeting room'], icon: 'layout' },
  { id: 'biz-ecommerce', title: 'E-commerce Business Setup Journey', category: 'Business Guides', badge: 'Industry', desc: 'End-to-end launch blueprint for online brands: Pvt Ltd, GST, Trademark, Payment Gateway & Store.', path: '/business-types/ecommerce', keywords: ['ecommerce', 'd2c', 'online store', 'shopify', 'gst for ecommerce', 'amazon seller'], icon: 'shopping-bag' },
  { id: 'biz-restaurant', title: 'Restaurant & Cloud Kitchen Journey', category: 'Business Guides', badge: 'Industry', desc: 'FSSAI state/central license, GSTIN, Shop & Establishment and entity setup for food businesses.', path: '/business-types/restaurant', keywords: ['restaurant', 'cloud kitchen', 'food business', 'fssai', 'cafe', 'swiggy', 'zomato'], icon: 'coffee' },
  { id: 'biz-tech', title: 'Technology & SaaS Business Setup', category: 'Business Guides', badge: 'Industry', desc: 'Investor-ready Pvt Ltd incorporation, IP assignment, ESOP pools and cross-border billing.', path: '/business-types/technology', keywords: ['tech startup', 'saas', 'software company', 'investor ready', 'esop', 'ip protection'], icon: 'code' },
  { id: 'biz-consulting', title: 'Consulting & Professional Services Setup', category: 'Business Guides', badge: 'Industry', desc: 'Lightweight LLP / OPC structure, clean professional invoicing, GST and MSME benefits.', path: '/business-types/consulting', keywords: ['consulting', 'agency', 'freelancer', 'opc', 'professional tax', 'gst'], icon: 'briefcase' },
  { id: 'ai-assistant', title: 'LauncherDesk AI Assistant', category: 'Tools & AI', badge: 'AI Powered', desc: 'Get instant business guidance, compliance calendars, structure recommendations and filing advice.', path: '/ai', keywords: ['ai', 'ai assistant', 'chatbot', 'business advisor', 'service finder', 'help'], icon: 'cpu' },
  { id: 'resources-faq', title: 'Frequently Asked Questions (FAQ)', category: 'Resources', badge: 'Help Center', desc: 'Clear answers on incorporation timelines, costs, document requirements, and CA comparisons.', path: '/resources/faq', keywords: ['faq', 'questions', 'timelines', 'pricing questions', 'help', 'support'], icon: 'help-circle' },
  { id: 'contact-page', title: 'Contact Us & Book a Consultation', category: 'Company', badge: 'Support', desc: 'Reach our Bangalore headquarters, talk to an expert or schedule a direct consultation.', path: '/company/contact', keywords: ['contact', 'phone', 'email', 'support', 'bangalore office', 'consultation', 'whatsapp'], icon: 'phone' },
  { id: 'user-dash', title: 'Customer Dashboard', category: 'Dashboard', badge: 'Account', desc: 'View active service progress, assigned professionals, timeline milestones and updates.', path: '/user/dashboard', keywords: ['dashboard', 'my account', 'orders', 'tracking', 'services status'], icon: 'home' },
  { id: 'marketplace-main', title: 'Marketplace — Business Software & SaaS Tools', category: 'Marketplace', badge: 'Software', desc: 'Explore curated software stack: CRM, ERP, HR, Project Management, CLM and WhatsApp API.', path: '/market', keywords: ['marketplace', 'market', 'software', 'saas', 'tools', 'stack', 'business software', 'cloud apps'], icon: 'shopping-bag' },
]

export function searchWebsite(query) {
  if (!query || typeof query !== 'string') return []
  const cleanQ = query.trim().toLowerCase()
  if (!cleanQ) return []
  const tokens = cleanQ.split(/\s+/).filter(Boolean)
  const matched = SEARCH_ITEMS.map(item => {
    let score = 0
    const titleLower = item.title.toLowerCase()
    const descLower = item.desc.toLowerCase()
    const catLower = item.category.toLowerCase()
    const badgeLower = (item.badge || '').toLowerCase()
    const idLower = item.id.toLowerCase()
    const pathLower = item.path.toLowerCase()
    if (titleLower === cleanQ || idLower === cleanQ) score += 120
    else if (titleLower.startsWith(cleanQ)) score += 80
    else if (titleLower.includes(cleanQ)) score += 50
    else if (pathLower.includes(cleanQ)) score += 35
    const keywords = (item.keywords || []).map(k => k.toLowerCase())
    if (keywords.includes(cleanQ)) score += 70
    tokens.forEach(tok => {
      if (titleLower.includes(tok)) score += 25
      if (keywords.some(k => k.includes(tok))) score += 20
      if (descLower.includes(tok)) score += 10
      if (catLower.includes(tok)) score += 12
      if (badgeLower.includes(tok)) score += 12
      if (pathLower.includes(tok)) score += 15
    })
    return { ...item, score }
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score)
  const seen = new Set()
  const unique = []
  for (const item of matched) {
    const key = item.path + '::' + item.title
    if (!seen.has(key)) { seen.add(key); unique.push(item) }
  }
  return unique.slice(0, 10)
}