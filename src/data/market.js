/* LauncherDesk Marketplace — catalogue data (ES module) */

export const CATS = [
  { slug:'crm',                name:'CRM',                    icon:'crm',     tag:'Sales & Customers',       blurb:'Track leads, close deals and keep every customer conversation in one pipeline.',  soon:true },
  { slug:'erp',                name:'ERP',                    icon:'erp',     tag:'Run the whole business',  blurb:'Connect finance, sales, purchase and operations on a single system of record.',   soon:true },
  { slug:'project-management', name:'Project Management',     icon:'project', tag:'Plan & ship work',        blurb:'Plan projects, assign tasks and see everything your team is shipping.',            soon:true },
  { slug:'hr-payroll',         name:'HR & Payroll',           icon:'hr',      tag:'People & salaries',       blurb:'From hiring and attendance to payroll, PF, ESI and full-and-final settlements.',  soon:true },
  { slug:'inventory',          name:'Inventory Management',   icon:'box',     tag:'Stock & orders',          blurb:'Manage stock across warehouses, sync orders and never oversell again.',            soon:true },
  { slug:'whatsapp',           name:'WhatsApp Automation',    icon:'wa',      tag:'Bots & broadcasts',       blurb:'Official WhatsApp API — chatbots, broadcasts, catalogues and drip flows.',         soon:true },
  { slug:'clm',                name:'CLM',                    icon:'clm',     tag:'Contracts & e-sign',      blurb:'Draft, negotiate, e-sign and renew contracts without losing a single one.',       soon:false },
]

export const PRODUCTS = [
  /* ── CLM — Doqfy (LauncherDesk collab partner) ─────────── */
  { id:'doqfy', cat:'clm', soon:false, name:'Doqfy', c:'#6B21A8', tagline:'India-ready contract platform — our collab partner', price:'Custom pricing', badge:'Partner',
    desc:'A fast-growing Indian CLM platform built for high-velocity teams. Streamline contract creation, negotiation and signing with a clean, intuitive interface and India-compliant e-sign. LauncherDesk is proud to collaborate with Doqfy.',
    features:['Drag-and-drop contract builder','Aadhaar & OTP-based e-sign','Clause and template library','Real-time collaboration & audit trail'], url:'https://www.doqfy.com/' },
]

/* ── helpers ────────────────────────────────────────────── */
export function catBy(slug)  { return CATS.find(c => c.slug === slug) }
export function prodBy(id)   { return PRODUCTS.find(p => p.id === id) }
export function inCat(slug)  { return PRODUCTS.filter(p => p.cat === slug) }
export function nfmt(n)      { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
export function initials(name) {
  const w = name.replace(/[^A-Za-z0-9 ]/g, ' ').trim().split(/\s+/)
  return w.length >= 2 ? (w[0][0] + w[1][0]).toUpperCase() : name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase()
}
export const FEATURED_BADGES = ['Popular', 'Loved', 'Best value']