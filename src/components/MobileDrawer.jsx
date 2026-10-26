import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
import { usePortalAuth } from '../context/PortalAuthContext'
import { useAdminAuth } from '../context/AdminAuthContext'
import { useSalesAuth } from '../context/SalesAuthContext'
import { usePartnerAuth } from '../context/PartnerAuthContext'

/**
 * Mobile/tablet navigation drawer.
 *
 * The header's main nav (`.main-nav`) is hidden below 1120px (see
 * launcherdesk.css) and replaced by a burger button — but until this
 * component existed, that burger button had no click handler anywhere in
 * the app and no drawer component ever rendered, so on any phone or tablet
 * the entire primary navigation (Start a Business / IT Services /
 * Marketplace / Office Setup / Virtual Office / E-Stamp) was completely
 * unreachable. The `.scrim`/`.drawer`/`.d-*` styles already existed in
 * launcherdesk.css, fully built, just never consumed by any component.
 */
const SECTIONS = [
  {
    key: 'reg',
    title: 'Start a Business',
    groups: [
      {
        heading: 'Business Incorporation',
        links: [
          { href: '/services/private-limited-company-registration', label: 'Private Limited Company Registration', desc: 'Incorporate a Pvt Ltd, the startup standard' },
          { href: '/services/llp-registration', label: 'LLP Registration', desc: 'Flexible partner-owned structure' },
          { href: '/services/opc-registration', label: 'One Person Company Registration', desc: 'Full limited liability for a solo founder' },
        ],
      },
      {
        heading: 'Certifications',
        links: [
          { href: '/services/startup-india-dpiit', label: 'Start-up India Registration', desc: 'DPIIT recognition & benefits' },
          { href: '/services/msme-registration', label: 'MSME Udyam Registration', desc: 'Credit access & government benefits' },
          { href: '/services/iso-certification', label: 'ISO Certification', desc: 'International quality standards' },
          { href: '/services/gst-registration', label: 'GST Registration', desc: 'Goods & Services Tax number' },
          { href: '/services/trademark-registration', label: 'Trademark Registration', desc: 'Protect your brand name & logo' },
        ],
      },
    ],
    footer: { href: '/services', label: 'View all registrations & services →' },
  },
  {
    key: 'it',
    title: 'IT Services',
    groups: [
      {
        heading: 'Website Development',
        links: [
          { href: '/services/website-development', label: 'Website Development Packages', desc: 'Static, dynamic & e-commerce websites' },
          { href: '/services/crm-setup-lead-management', label: 'CRM Website or Portal Development', desc: 'Customer portals & dashboards' },
        ],
      },
      {
        heading: 'Mobile Solutions',
        links: [
          { href: '/services/mobile-app-development', label: 'Mobile Application Development', desc: 'iOS & Android native or hybrid apps' },
          { href: '/services/software-saas-development', label: 'Custom Software Development', desc: 'Bespoke systems & platforms' },
          { href: '/services/hrms', label: 'HRMS Software Development', desc: 'HR, attendance, leave & payroll in one system' },
        ],
      },
      {
        heading: 'AI Automation',
        links: [
          { href: '/services/whatsapp-chatbot', label: 'WhatsApp Chatbot', desc: 'Conversational AI for customer service' },
          { href: '/services/ai-voice-agent', label: 'AI Voice Agent', desc: 'Intelligent incoming & outgoing calling' },
          { href: '/services/ai-powered-crm', label: 'AI-Powered CRM', desc: 'Smart sales pipeline & automated leads' },
          { href: '/services/sms-blasting', label: 'SMS Blasting & Bulk SMS', desc: 'Targeted high-volume SMS outreach' },
          { href: '/services/email-blasting', label: 'Email Blasting & Campaigns', desc: 'High-deliverability newsletters & outreach' },
          { href: '/services/whatsapp-business-api', label: 'WhatsApp Business API', desc: 'Official verified business broadcast' },
          { href: '/services/crm-setup-lead-management', label: 'CRM Setup & Integration', desc: 'Customized lead capture & pipeline' },
          { href: '/services/business-automation', label: 'Workflow / Business Automation', desc: 'End-to-end process automation' },
        ],
      },
      {
        heading: 'Digital Marketing',
        links: [
          { href: '/services/seo-marketing', label: 'SEO & Search Marketing', desc: 'Rank higher on Google organic search' },
          { href: '/services/content-marketing', label: 'Content Marketing', desc: 'Engaging content & thought leadership' },
          { href: '/services/ai-search-optimization', label: 'AI Search Optimization', desc: 'Visibility on ChatGPT, Gemini & Perplexity' },
          { href: '/services/google-ads-paid-marketing', label: 'Google Ads Management', desc: 'High-intent search & display campaigns' },
          { href: '/services/meta-instagram-ads', label: 'Meta & Instagram Ads', desc: 'Targeted Instagram & Facebook ads' },
          { href: '/services/youtube-advertising', label: 'YouTube Advertising', desc: 'Video ads & channel audience growth' },
          { href: '/services/branding-logo-design', label: 'Branding & Logo Design', desc: 'Brand identity, logos & guidelines' },
        ],
      },
    ],
    footer: { href: '/services', label: 'View all IT services →' },
  },
  {
    key: 'market',
    title: 'Marketplace',
    groups: [
      {
        heading: 'Software categories',
        links: [
          { href: '/market/category?cat=crm', label: 'CRM', desc: 'Sales & customer pipelines' },
          { href: '/market/category?cat=erp', label: 'ERP', desc: 'Run your whole operation' },
          { href: '/market/category?cat=project-management', label: 'Project Management', desc: 'Plan, track & ship work' },
          { href: '/market/category?cat=hr-payroll', label: 'HR & Payroll', desc: 'Hiring, PF/ESI, salaries' },
          { href: '/market/category?cat=inventory', label: 'Inventory Management', desc: 'Stock, warehouses, orders' },
          { href: '/market/category?cat=whatsapp', label: 'WhatsApp Automation', desc: 'Bots, broadcasts & flows' },
          { href: '/market/category?cat=clm', label: 'CLM', desc: 'Contracts & e-sign' },
        ],
      },
    ],
    footer: { href: '/market', label: 'Browse all software →' },
  },
  {
    key: 'agreements',
    title: 'Deeds & Agreements',
    groups: [
      {
        heading: 'Property & Land',
        links: [
          { href: '/agreements/rent-lease-agreement', label: 'Rent / Lease Agreement', desc: 'Standard residential & commercial lease' },
          { href: '/agreements/agreement-to-sell', label: 'Agreement to Sell', desc: 'Property purchase terms & conditions' },
          { href: '/agreements/sale-deed', label: 'Sale Deed', desc: 'Conveyance & ownership transfer' },
          { href: '/agreements/gift-deed', label: 'Gift Deed', desc: 'Voluntary property transfer' },
        ],
      },
      {
        heading: 'Business Agreements',
        links: [
          { href: '/agreements/partnership-llp-deed', label: 'Partnership / LLP Deed', desc: 'Partnership terms & profit sharing' },
          { href: '/agreements/franchise-agreement', label: 'Franchise Agreement', desc: 'Franchise licensing & operating terms' },
          { href: '/agreements/joint-venture-agreement', label: 'Joint Venture Agreement', desc: 'Strategic JV rights & governance' },
          { href: '/agreements/vendor-supply-agreement', label: 'Vendor / Supply Agreement', desc: 'Supply chain & procurement contract' },
        ],
      },
      {
        heading: 'Personal & Investment',
        links: [
          { href: '/agreements/loan-agreement', label: 'Loan Agreement', desc: 'Secured or unsecured lending terms' },
          { href: '/agreements/non-disclosure-agreement', label: 'Non-Disclosure Agreement', desc: 'NDA confidentiality protection' },
          { href: '/agreements/shareholder-agreement', label: 'Shareholder Agreement', desc: 'Equity rights & investor protection' },
          { href: '/agreements/vehicle-sale-agreement', label: 'Vehicle Sale Agreement', desc: 'Vehicle transfer & sale agreement' },
        ],
      },
    ],
    footer: { href: '/agreements', label: 'View all Deeds & Agreements →' },
  },
  {
    key: 'office',
    title: 'Office Setup',
    groups: [
      {
        heading: null,
        links: [
          { href: '/office-restore', label: 'Office Furniture', desc: 'Ergonomic workstations & desks' },
          { href: '/office-restore/individual', label: 'Private Office', desc: 'Dedicated cabins & managed suites' },
          { href: '/office-restore/coworking', label: 'Co-working', desc: 'Flexible shared desk spaces' },
        ],
      },
    ],
  },
]

function DrawerSubsection({ group, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!group.heading) {
    return (
      <div className="d-subsec-plain">
        {group.links.map(l => (
          <Link key={l.href} to={l.href} onClick={onNavigate} className="d-subsec-link">
            <span className="d-link-title">{l.label}</span>
            {l.desc && <span className="d-link-desc">{l.desc}</span>}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className={`d-subsec${isOpen ? ' open' : ''}`}>
      <button
        type="button"
        className="d-subsec-btn"
        onClick={() => setIsOpen(o => !o)}
        aria-expanded={isOpen}
      >
        <span>{group.heading}</span>
        <svg
          className="d-subsec-chev"
          viewBox="0 0 24 24"
          width={16}
          height={16}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div className="d-subsec-body-wrapper">
        <div className="d-subsec-body-inner">
          <div className="d-subsec-body">
            {group.links.map(l => (
              <Link key={l.href} to={l.href} onClick={onNavigate} className="d-subsec-link">
                <span className="d-link-title">{l.label}</span>
                {l.desc && <span className="d-link-desc">{l.desc}</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DrawerSection({ section, isOpen, onToggle, onNavigate }) {
  return (
    <div className={`d-section${isOpen ? ' open' : ''}`}>
      <button type="button" className="d-sec-btn" onClick={onToggle} aria-expanded={isOpen}>
        <span>{section.title}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div className="d-sec-body-wrapper">
        <div className="d-sec-body-inner">
          <div className="d-sec-body">
            {section.groups.map(g => (
              <DrawerSubsection key={g.heading || 'default'} group={g} onNavigate={onNavigate} />
            ))}
            {section.footer && (
              <Link to={section.footer.href} onClick={onNavigate} className="d-sec-footer-link">
                {section.footer.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MobileDrawer({ open, onClose }) {
  const [openKey, setOpenKey] = useState(null)

  const { isLoggedIn: isUserLoggedIn, user: normalUser, logout: logoutUser } = useUserAuth()
  const { user: portalUser, logout: logoutPortal } = usePortalAuth()
  const adminAuth = useAdminAuth()
  const salesAuth = useSalesAuth()
  const partnerAuth = usePartnerAuth()
  const navigate = useNavigate()

  // Lock background scroll while the drawer is open (same convention as
  // the search overlay elsewhere in Navbar.jsx).
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Resolve the active logged-in account across all role sessions —
  // mirrors LoginDropdown's resolution in Navbar.jsx exactly, so the
  // drawer never disagrees with the header about who's logged in.
  let activeUser = null
  let roleLabel = 'Client Portal'
  let dashboardPath = '/client/dashboard'
  let logoutFn = logoutUser

  if (portalUser) {
    activeUser = portalUser
    logoutFn = logoutPortal
    if (portalUser.role === 'SUPER_ADMIN') { dashboardPath = '/super-admin/dashboard'; roleLabel = 'Super Admin Portal' }
    else if (portalUser.role === 'ADMIN') { dashboardPath = '/admin/dashboard'; roleLabel = 'Admin Portal' }
    else { dashboardPath = '/client/dashboard'; roleLabel = 'Client Portal' }
  } else if (adminAuth?.isLoggedIn && adminAuth?.user) {
    activeUser = adminAuth.user
    if (adminAuth.user.role === 'super_admin' || adminAuth.user.email === 'moqsood@launcherdesk.com') { dashboardPath = '/super-admin/dashboard'; roleLabel = 'Super Admin Portal' }
    else { dashboardPath = '/admin/dashboard'; roleLabel = 'Admin Portal' }
    logoutFn = adminAuth.logout
  } else if (salesAuth?.isLoggedIn && salesAuth?.user) {
    activeUser = salesAuth.user; dashboardPath = '/sales/dashboard'; roleLabel = 'Sales CRM'; logoutFn = salesAuth.logout
  } else if (partnerAuth?.isLoggedIn && partnerAuth?.partner) {
    activeUser = partnerAuth.partner; dashboardPath = '/partner/dashboard'; roleLabel = 'Partner Portal'; logoutFn = partnerAuth.logout
  } else if (isUserLoggedIn && normalUser) {
    activeUser = normalUser; dashboardPath = '/client/dashboard'; roleLabel = 'Client Portal'; logoutFn = logoutUser
  }

  const displayName = activeUser ? (activeUser.name || activeUser.contactName || activeUser.companyName || 'Account').split(' ')[0] : ''

  return (
    <>
      <div className={`scrim${open ? ' on' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`drawer${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Main menu">
        <div className="d-top">
          <span style={{ fontWeight: 800, fontSize: 15, color: '#FFFFFF' }}>Menu</span>
          <button type="button" className="x" onClick={onClose} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="d-nav">
          {SECTIONS.map(section => (
            <DrawerSection
              key={section.key}
              section={section}
              isOpen={openKey === section.key}
              onToggle={() => setOpenKey(k => (k === section.key ? null : section.key))}
              onNavigate={onClose}
            />
          ))}
          <Link className="d-link" to="/virtual-office" onClick={onClose}>Virtual Office</Link>
          <Link className="d-link" to="/estamp" onClick={onClose}>E-Stamp</Link>
        </nav>

        <div className="d-actions">
          {activeUser ? (
            <div className="d-user-box">
              <div className="d-user-info">
                <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="#2196F3" strokeWidth={2} aria-hidden="true">
                  <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <div className="d-user-text">
                  <span className="d-user-name" style={{ color: '#FFFFFF' }}>{activeUser.name || activeUser.companyName || displayName}</span>
                  <span style={{ fontSize: 11, color: '#B9C2CF' }}>{roleLabel}</span>
                </div>
              </div>
              <Link className="d-btn-getstarted" style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.12)' }} to={dashboardPath} onClick={onClose}>
                Go to {roleLabel}
              </Link>
              <button
                type="button"
                className="d-btn-getstarted"
                style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#F87171', border: '1px solid rgba(239, 68, 68, 0.25)', cursor: 'pointer', fontFamily: 'inherit' }}
                onClick={async () => { onClose(); try { await logoutFn() } catch { /* noop */ } navigate('/') }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="d-auth-box">
              <a className="d-btn-getstarted btn btn-primary" href="/services#finder" onClick={onClose}>Get Started</a>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}