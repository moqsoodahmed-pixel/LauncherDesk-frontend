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
          { href: '/services/private-limited-company-registration', label: 'Private Limited Company Registration' },
          { href: '/services/llp-registration', label: 'LLP Registration' },
          { href: '/services/opc-registration', label: 'One Person Company Registration' },
        ],
      },
      {
        heading: 'Certifications',
        links: [
          { href: '/services/startup-india-dpiit', label: 'Start-up India Registration' },
          { href: '/services/msme-registration', label: 'MSME Udyam Registration' },
          { href: '/services/iso-certification', label: 'ISO Certification' },
          { href: '/services/gst-registration', label: 'GST Registration' },
          { href: '/services/trademark-registration', label: 'Trademark Registration' },
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
          { href: '/services/website-development', label: 'Website Development Packages' },
          { href: '/services/crm-setup-lead-management', label: 'CRM Website or Portal Development' },
        ],
      },
      {
        heading: 'Mobile Solutions',
        links: [
          { href: '/services/mobile-app-development', label: 'Mobile Application Development' },
          { href: '/services/software-saas-development', label: 'Custom Software Development' },
          { href: '/services/hrms', label: 'HRMS Software Development' },
        ],
      },
      {
        heading: 'AI Automation',
        links: [
          { href: '/services/whatsapp-chatbot', label: 'WhatsApp Chatbot' },
          { href: '/services/ai-voice-agent', label: 'AI Voice Agent' },
          { href: '/services/ai-powered-crm', label: 'AI-Powered CRM' },
          { href: '/services/sms-blasting', label: 'SMS Blasting & Bulk SMS' },
          { href: '/services/email-blasting', label: 'Email Blasting & Campaigns' },
          { href: '/services/whatsapp-business-api', label: 'WhatsApp Business API' },
          { href: '/services/crm-setup-lead-management', label: 'CRM Setup & Integration' },
          { href: '/services/business-automation', label: 'Workflow / Business Automation' },
        ],
      },
      {
        heading: 'Digital Marketing',
        links: [
          { href: '/services/seo-marketing', label: 'SEO & Search Marketing' },
          { href: '/services/content-marketing', label: 'Content Marketing' },
          { href: '/services/ai-search-optimization', label: 'AI Search Optimization' },
          { href: '/services/google-ads-paid-marketing', label: 'Google Ads Management' },
          { href: '/services/meta-instagram-ads', label: 'Meta & Instagram Ads' },
          { href: '/services/youtube-advertising', label: 'YouTube Advertising' },
          { href: '/services/branding-logo-design', label: 'Branding & Logo Design' },
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
          { href: '/market/category?cat=crm', label: 'CRM' },
          { href: '/market/category?cat=erp', label: 'ERP' },
          { href: '/market/category?cat=project-management', label: 'Project Management' },
          { href: '/market/category?cat=hr-payroll', label: 'HR & Payroll' },
          { href: '/market/category?cat=inventory', label: 'Inventory Management' },
          { href: '/market/category?cat=whatsapp', label: 'WhatsApp Automation' },
          { href: '/market/category?cat=clm', label: 'CLM (in collab with Doqfy)' },
        ],
      },
    ],
    footer: { href: '/market', label: 'Browse all software →' },
  },
  {
    key: 'office',
    title: 'Office Setup',
    groups: [
      {
        heading: null,
        links: [
          { href: '/office-restore', label: 'Office Furniture' },
          { href: '/office-restore/individual', label: 'Private Office' },
          { href: '/office-restore/coworking', label: 'Co-working' },
        ],
      },
    ],
  },
]

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
              <div key={g.heading || 'default'}>
                {g.heading && (
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--text-3)', padding: '8px 10px 2px' }}>
                    {g.heading}
                  </div>
                )}
                {g.links.map(l => (
                  <Link key={l.href} to={l.href} onClick={onNavigate}>{l.label}</Link>
                ))}
              </div>
            ))}
            {section.footer && (
              <Link to={section.footer.href} onClick={onNavigate} style={{ fontWeight: 700, color: 'var(--blue)' }}>
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
          <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--navy)' }}>Menu</span>
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
                <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="#1D6FE0" strokeWidth={2} aria-hidden="true">
                  <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <div className="d-user-text">
                  <span className="d-user-name">{activeUser.name || activeUser.companyName || displayName}</span>
                  <span style={{ fontSize: 11, color: '#64748B' }}>{roleLabel}</span>
                </div>
              </div>
              <Link className="d-btn-getstarted" style={{ background: '#F1F5F9', color: 'var(--navy)' }} to={dashboardPath} onClick={onClose}>
                Go to {roleLabel}
              </Link>
              <button
                type="button"
                className="d-btn-getstarted"
                style={{ background: '#FEE2E2', color: '#EF4444', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                onClick={async () => { onClose(); try { await logoutFn() } catch { /* noop */ } navigate('/') }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="d-auth-box">
              <div className="d-btn-row">
                <Link className="d-btn-login" to="/user/login" onClick={onClose}>Login</Link>
                <Link className="d-btn-signup" to="/user/login" state={{ tab: 'register' }} onClick={onClose}>Sign Up</Link>
              </div>
              <a className="d-btn-getstarted btn btn-primary" href="/services#finder" onClick={onClose}>Get Started</a>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
