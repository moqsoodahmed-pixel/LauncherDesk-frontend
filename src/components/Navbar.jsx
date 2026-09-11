import { useEffect, useRef, useState, useCallback } from 'react'
import logoImg from '../assets/launcherdesk-logo-transparent.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
import { searchWebsite } from '../data/searchIndex'

const I = {
  rocket: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0',
  chev: 'm6 9 6 6 6-6',
  list: 'M4 6h16M4 12h16M4 18h16',
  wa: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z',
  crm: 'M17 21v-2a4 4 0 0 0-3-3.87M9 21v-2a4 4 0 0 1 3-3.87M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM20 8v6M23 11h-6',
  erp: 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  project: 'M3 3h18v18H3zM9 3v18M15 3v18M9 9h6M9 14h6',
  hr: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6',
  box: 'M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8zm-18-.7 8.7 5 8.7-5M12 22V12',
  clm: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6M14 2v6h6M14 2l6 6M9 13h4M9 17h2M14.5 19.5 17 22l4-4.5',
}

/* ─── Search bar styles injected once ─────────────────────────────────────── */
const SEARCH_STYLES = `
.ld-search-wrap{position:relative;display:flex;align-items:center}
.ld-search-btn{display:flex;align-items:center;justify-content:center;width:38px;height:38px;border:1px solid rgba(255,255,255,.7);border-radius:999px;background:linear-gradient(180deg,rgba(255,255,255,.75),rgba(240,247,255,.55));backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);box-shadow:0 1px 0 rgba(255,255,255,.7) inset,0 2px 8px rgba(15,28,46,.06);cursor:pointer;transition:transform .22s cubic-bezier(.16,1,.3,1),box-shadow .22s ease,background .18s,color .18s;color:#475569;flex-shrink:0}
.ld-search-btn:hover{background:linear-gradient(180deg,rgba(255,255,255,.9),rgba(239,246,255,.85));color:#1D6FE0;transform:scale(1.05);box-shadow:0 1px 0 rgba(255,255,255,.8) inset,0 6px 16px rgba(29,111,224,.20)}
@media (max-width: 640px) {
  .ld-search-btn { width: 34px; height: 34px; }
  .ld-search-btn svg { width: 15px; height: 15px; }
}
.ld-search-overlay{position:fixed;inset:0;z-index:999;background:rgba(10,37,64,.45);backdrop-filter:blur(4px);display:flex;align-items:flex-start;justify-content:center;padding-top:80px;animation:srchIn .15s ease}
@keyframes srchIn{from{opacity:0}to{opacity:1}}
.ld-search-box{background:#fff;border-radius:16px;width:100%;max-width:620px;box-shadow:0 24px 64px rgba(0,0,0,.22);overflow:hidden;animation:srchUp .2s cubic-bezier(.16,1,.3,1)}
@keyframes srchUp{from{transform:translateY(-16px) scale(.97);opacity:0}to{transform:none;opacity:1}}
.ld-search-input-row{display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid #F1F5F9}
.ld-search-input{flex:1;border:none;outline:none;font-size:16px;font-family:inherit;color:#0A2540;background:transparent}
.ld-search-esc{display:flex;align-items:center;justify-content:center;width:26px;height:26px;color:#94A3B8;border:1px solid #E2E8F0;border-radius:6px;background:#F8FAFC;cursor:pointer;flex-shrink:0;padding:0;transition:all .15s}
.ld-search-esc:hover{background:#EFF6FF;color:#1D6FE0;border-color:#BFDBFE}
.ld-search-result{display:flex;align-items:flex-start;gap:12px;padding:12px 20px;cursor:pointer;transition:background .12s;text-decoration:none;color:inherit}
.ld-search-result:hover,.ld-search-result:focus{background:#F8FAFF;outline:none}
.ld-search-result-badge{display:inline-block;font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;background:#EFF6FF;color:#1D6FE0;flex-shrink:0;margin-top:2px;letter-spacing:.04em}
.ld-search-result-title{font-size:13.5px;font-weight:700;color:#0A2540;line-height:1.3;margin-bottom:2px}
.ld-search-result-desc{font-size:12px;color:#64748B;line-height:1.4}
.ld-search-empty{padding:32px 20px;text-align:center;color:#94A3B8;font-size:14px}
.ld-search-hint{padding:16px 20px;font-size:12px;color:#94A3B8;line-height:1.8}
.ld-search-hint-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.ld-search-chip{background:#F1F5F9;border:none;border-radius:20px;padding:4px 12px;font-size:12px;font-weight:600;color:#475569;cursor:pointer;font-family:inherit;transition:background .15s}
.ld-search-chip:hover{background:#EFF6FF;color:#1D6FE0}
`

/* ─── Search overlay ─────────────────────────────────────────────────────── */
function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleQuery = useCallback(q => {
    setQuery(q)
    setResults(searchWebsite(q))
  }, [])

  const go = useCallback(path => {
    onClose()
    navigate(path)
  }, [onClose, navigate])

  const suggestions = ['Private Limited Registration', 'GST Registration', 'Trademark', 'Virtual Office', 'Payroll']

  return (
    <div className="ld-search-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="ld-search-box" role="dialog" aria-label="Site search" aria-modal="true">
        <div className="ld-search-input-row">
          <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input
            ref={inputRef}
            className="ld-search-input"
            placeholder="Search services, registrations, compliance…"
            value={query}
            onChange={e => handleQuery(e.target.value)}
            aria-label="Search"
            autoComplete="off"
          />
          <button className="ld-search-esc" onClick={onClose} aria-label="Close search">
            <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="ld-search-results">
          {query && results.length === 0 && (
            <div className="ld-search-empty">
              No results for "<strong>{query}</strong>" — try a different keyword.
            </div>
          )}
          {results.map(item => (
            <a key={item.id + item.path} className="ld-search-result" href={item.path}
              onClick={e => { e.preventDefault(); go(item.path) }}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); go(item.path) } }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="ld-search-result-title">{item.title}</div>
                <div className="ld-search-result-desc">{item.desc}</div>
              </div>
              <span className="ld-search-result-badge">{item.badge || item.category}</span>
            </a>
          ))}
          {!query && (
            <div className="ld-search-hint">
              <span style={{ fontWeight: 600, color: '#475569' }}>Quick searches</span>
              <div className="ld-search-hint-row">
                {suggestions.map(s => (
                  <button key={s} className="ld-search-chip" onClick={() => handleQuery(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SvcLink({ href, title, desc }) {
  return (
    <a className="mp-svc" href={href}>
      <span className="mp-svc-name">{title}</span>
      {desc && <span className="mp-svc-desc">{desc}</span>}
    </a>
  )
}

function MegaRegistrations() {
  return (
    <div className="mega mp-mega">
      <div className="mp-body">
        <div className="mp-left">
          <button className="mp-cat mp-cat--active" data-mp-cat="inc"><span className="mp-cat-label">Business Incorporation</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg></button>
          <button className="mp-cat" data-mp-cat="cert"><span className="mp-cat-label">Certifications</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg></button>
          <button className="mp-cat" data-mp-cat="ipr"><span className="mp-cat-label">IPR &amp; Trademark</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg></button>
        </div>
        <div className="mp-right">
          <div className="mp-panel mp-panel--active" data-mp-panel="inc">
            <div className="mp-panel-head">Business Incorporation</div>
            <div className="mp-svc-grid">
              <SvcLink href="/services/private-limited-company-registration" title="Private Limited Company Registration" desc="Incorporate a Pvt Ltd — the startup standard" />
              <SvcLink href="/services/llp-registration" title="LLP Registration" desc="Flexible partner-owned structure" />
              <SvcLink href="/services/opc-registration" title="One Person Company Registration" desc="Full limited liability for a solo founder" />
            </div>
          </div>
          <div className="mp-panel" data-mp-panel="cert">
            <div className="mp-panel-head">Certifications</div>
            <div className="mp-svc-grid">
              <SvcLink href="/services/startup-india-dpiit" title="Start-up India Registration" desc="DPIIT recognition &amp; benefits" />
              <SvcLink href="/services/msme-registration" title="MSME Udyam Registration" desc="Credit access &amp; government benefits" />
              <SvcLink href="/services/iso-certification" title="ISO Certification" desc="International quality standards" />
              <SvcLink href="/services/gst-registration" title="GST Registration" desc="Goods &amp; Services Tax number" />
            </div>
          </div>
          <div className="mp-panel" data-mp-panel="ipr">
            <div className="mp-panel-head">IPR &amp; Trademark</div>
            <div className="mp-svc-grid">
              <SvcLink href="/services/trademark-registration" title="Trademark Registration" desc="Protect your brand name &amp; logo" />
              <SvcLink href="/services/trademark-objection" title="Trademark Objection" desc="Respond to objection notices" />
              <SvcLink href="/services/patent-registration" title="Patent Registration" desc="Protect your invention" />
              <SvcLink href="/services/copyright-registration" title="Copyright Registration" desc="Protect creative works" />
              <SvcLink href="/services/ip-trademark-management" title="IP &amp; Trademark Management" desc="Ongoing IP portfolio management" />
            </div>
          </div>
        </div>
      </div>
      <div className="mp-foot-wrap"><div className="mp-footer"><a href="/services">View all registrations &amp; services →</a></div></div>
    </div>
  )
}

function MegaIT() {
  return (
    <div className="mega mp-mega">
      <div className="mp-body">
        <div className="mp-left">
          <button className="mp-cat mp-cat--active" data-mp-cat="web"><span className="mp-cat-label">Website Development</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg></button>
          <button className="mp-cat" data-mp-cat="mob"><span className="mp-cat-label">Mobile Solutions</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg></button>
          <button className="mp-cat" data-mp-cat="mkt"><span className="mp-cat-label">Marketing &amp; Sales</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg></button>
          <button className="mp-cat" data-mp-cat="s30"><span className="mp-cat-label">Digital Marketing</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg></button>
        </div>
        <div className="mp-right">
          <div className="mp-panel mp-panel--active" data-mp-panel="web">
            <div className="mp-panel-head">Website Development</div>
            <div className="mp-svc-grid">
              <SvcLink href="/services/static-website" title="Static Website Development" desc="Fast, lightweight brochure sites" />
              <SvcLink href="/services/dynamic-website" title="Dynamic Website Development" desc="CMS-powered, updatable sites" />
              <SvcLink href="/services/ecommerce-website" title="E-commerce Website Development" desc="Online store with payment &amp; catalogue" />
              <SvcLink href="/services/crm-setup-lead-management" title="CRM Website or Portal Development" desc="Customer portals &amp; dashboards" />
            </div>
          </div>
          <div className="mp-panel" data-mp-panel="mob">
            <div className="mp-panel-head">Mobile Solutions</div>
            <div className="mp-svc-grid">
              <SvcLink href="/services/mobile-app-development" title="Mobile Application Development" desc="iOS &amp; Android native or hybrid apps" />
              <SvcLink href="/services/software-saas-development" title="Custom Software Development" desc="Bespoke systems &amp; platforms" />
            </div>
          </div>
          <div className="mp-panel" data-mp-panel="mkt">
            <div className="mp-panel-head">Marketing &amp; Sales</div>
            <div className="mp-grp-grid">
              {[
                ['Branding &amp; Creative', [
                  { name: 'Brand Identity &amp; Strategy', href: '/services/branding-logo-design' },
                  { name: 'Logo &amp; Visual Design', href: '/services/branding-logo-design' },
                  { name: 'Marketing Creatives', href: '/services/branding-logo-design' },
                  { name: 'Presentation &amp; Sales Deck Design', href: '/services/branding-logo-design' },
                ]],
                ['Digital Marketing', [
                  { name: 'SEO &amp; Search Marketing', href: '/services/seo-marketing' },
                  { name: 'Social Media Marketing', href: '/services/social-media-management' },
                  { name: 'Performance Marketing', href: '/services/google-ads-paid-marketing' },
                  { name: 'Content Marketing', href: '/services/content-marketing' },
                  { name: 'Influencer Marketing', href: '/services/digital-marketing' },
                ]],
                ['WhatsApp &amp; Customer Engagement', [
                  { name: 'WhatsApp Business API', href: '/services/whatsapp-business-api' },
                  { name: 'WhatsApp Automation', href: '/services/whatsapp-business-api' },
                  { name: 'WhatsApp Campaigns', href: '/services/whatsapp-business-api' },
                  { name: 'Email Marketing', href: '/services/email-marketing' },
                  { name: 'SMS Marketing', href: '/services/digital-marketing' },
                ]],
                ['CRM &amp; Marketing Automation', [
                  { name: 'CRM Setup &amp; Integration', href: '/services/crm-setup-lead-management' },
                  { name: 'Lead Management', href: '/services/crm-setup-lead-management' },
                  { name: 'Marketing Automation', href: '/services/business-automation' },
                  { name: 'Workflow Automation', href: '/services/business-automation' },
                  { name: 'Analytics &amp; Reporting', href: '/services/digital-marketing' },
                ]],
              ].map(([group, items]) => (
                <div key={group} className="mp-grp">
                  <div className="mp-grp-h" dangerouslySetInnerHTML={{ __html: group }} />
                  {items.map(item => <SvcLink key={item.name} href={item.href} title={item.name} />)}
                </div>
              ))}
            </div>
          </div>
          <div className="mp-panel" data-mp-panel="s30">
            <div className="mp-panel-head">Digital Marketing</div>
            <div className="mp-grp-grid">
              {[
                ['AI-Powered SEO', [{ name: 'AI Search Optimization', href: '/digital-marketing' }, { name: 'LLM Visibility & Citations', href: '/digital-marketing' }, { name: 'Technical SEO Audits', href: '/digital-marketing' }, { name: 'Content Strategy & Creation', href: '/digital-marketing' }, { name: 'Local & International SEO', href: '/digital-marketing' }]],
                ['Lead Generation', [{ name: 'Google Ads Management', href: '/digital-marketing' }, { name: 'Meta & Instagram Ads', href: '/digital-marketing' }, { name: 'LinkedIn B2B Campaigns', href: '/digital-marketing' }, { name: 'YouTube Advertising', href: '/digital-marketing' }, { name: 'Remarketing & Retargeting', href: '/digital-marketing' }]],
                ['Social Media', [{ name: 'Social Media Strategy', href: '/digital-marketing' }, { name: 'Content Calendar & Posting', href: '/digital-marketing' }, { name: 'Community Management', href: '/digital-marketing' }, { name: 'Ad Creative Design', href: '/digital-marketing' }, { name: 'Reels & Short-Form Video', href: '/digital-marketing' }]],
                ['Design & Branding', [{ name: 'Brand Identity Design', href: '/digital-marketing' }, { name: 'Logo & Visual Identity', href: '/digital-marketing' }, { name: 'Marketing Collaterals', href: '/digital-marketing' }, { name: 'Packaging Design', href: '/digital-marketing' }, { name: 'Social Media Design', href: '/digital-marketing' }]],
              ].map(([group, items]) => (
                <div key={group} className="mp-grp">
                  <div className="mp-grp-h">{group}</div>
                  {items.map(item => <SvcLink key={item.name} href={item.href} title={item.name} />)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mp-foot-wrap"><div className="mp-footer"><a href="/services">View all IT services →</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="/digital-marketing">View Digital Marketing →</a></div></div>
    </div>
  )
}

function MegaMarket() {
  const cats = [
    { slug: 'crm', icon: I.crm, name: 'CRM', desc: 'Sales & customer pipelines' },
    { slug: 'erp', icon: I.erp, name: 'ERP', desc: 'Run your whole operation' },
    { slug: 'project-management', icon: I.project, name: 'Project Management', desc: 'Plan, track & ship work' },
    { slug: 'hr-payroll', icon: I.hr, name: 'HR & Payroll', desc: 'Hiring, PF/ESI, salaries' },
    { slug: 'inventory', icon: I.box, name: 'Inventory Management', desc: 'Stock, warehouses, orders' },
    { slug: 'whatsapp', icon: I.wa, name: 'WhatsApp Automation', desc: 'Bots, broadcasts & flows' },
    { slug: 'clm', icon: I.clm, name: 'CLM', desc: 'In collab with Doqfy' },
  ]
  return (
    <div className="mega mn-market">
      <div className="mn-col">
        <div className="mn-col-h">Software categories</div>
        {cats.map(c => (
          <a key={c.slug} className="mn-li mn-li-ic" href={`/market/category?cat=${c.slug}`}>
            <span className="mn-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon} /></svg></span>
            <span className="mn-tx"><b>{c.name}</b><em>{c.desc}</em></span>
          </a>
        ))}
      </div>
      <div className="mn-all"><a href="/market">Browse all software →</a></div>
    </div>
  )
}

function LoginDropdown() {
  const { isLoggedIn, user, logout } = useUserAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (isLoggedIn) return (
    <div ref={ref} style={{ position: 'relative' }} className="nav-auth-wrap">
      <button
        onClick={() => setOpen(o => !o)}
        className="nav-acc-btn"
        aria-expanded={open}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          border: '1.5px solid var(--line)', background: '#F8FAFF',
          borderRadius: 999, padding: '0 14px', height: 38,
          fontSize: 13, fontWeight: 700, cursor: 'pointer',
          color: 'var(--navy)', fontFamily: 'inherit'
        }}
      >
        <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="#1D6FE0" strokeWidth={2}>
          <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
        <span>{user?.name?.split(' ')[0] || 'Account'}</span>
        <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 12, boxShadow: '0 12px 36px rgba(0,0,0,.15)', minWidth: 200, overflow: 'hidden', zIndex: 200 }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #F1F5F9', fontSize: 12, color: '#64748B', fontWeight: 600 }}>{user?.email}</div>
          <Link to="/user/dashboard" onClick={() => setOpen(false)} style={{ display: 'block', padding: '11px 16px', fontSize: 13.5, fontWeight: 600, color: 'var(--navy)', textDecoration: 'none', transition: 'background .1s' }} onMouseEnter={e => e.currentTarget.style.background = '#F8FAFF'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>My Services & Dashboard</Link>
          <button onClick={() => { logout(); setOpen(false); navigate('/') }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '11px 16px', fontSize: 13.5, fontWeight: 600, color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', borderTop: '1px solid #F1F5F9' }}>Log Out</button>
        </div>
      )}
    </div>
  )

  return (
    <div ref={ref} style={{ position: 'relative' }} className="nav-auth-wrap">
      <button
        onClick={() => setOpen(o => !o)}
        className="nav-login-btn"
        aria-expanded={open}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          border: '1px solid rgba(255,255,255,.35)',
          background: 'linear-gradient(180deg, #FB923C 0%, #F97316 55%, #EA6C0A 100%)',
          borderRadius: 999, padding: '0 16px', height: 38,
          fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
          color: '#fff', fontFamily: 'inherit', letterSpacing: '.01em',
          boxShadow: '0 1px 0 rgba(255,255,255,.4) inset, 0 4px 14px rgba(249,115,22,.32)',
          transition: 'transform .22s cubic-bezier(.16,1,.3,1),box-shadow .22s,background .18s'
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(180deg, #FDBA74 0%, #F97316 55%, #EA6C0A 100%)'; e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,.5) inset, 0 8px 22px rgba(249,115,22,.42)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(180deg, #FB923C 0%, #F97316 55%, #EA6C0A 100%)'; e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,.4) inset, 0 4px 14px rgba(249,115,22,.32)'; e.currentTarget.style.transform = 'none' }}
      >
        <span>Login</span>
        <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="#fff" strokeWidth={2.5} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 14, boxShadow: '0 12px 36px rgba(0,0,0,.15)', minWidth: 220, overflow: 'hidden', zIndex: 200 }}>
          <Link
            to="/user/login"
            onClick={() => setOpen(false)}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', fontSize: 13.5, fontWeight: 700, color: 'var(--navy)', textDecoration: 'none', borderBottom: '1px solid #F1F5F9', transition: 'background .1s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F8FAFF'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="#1D6FE0" strokeWidth={2} style={{ marginTop: 2, flex: 'none' }}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
            <div>
              <div>Login / Sign Up</div>
              <div style={{ fontSize: 11, color: '#64748B', fontWeight: 500, marginTop: 1 }}>Customer Account &amp; Orders</div>
            </div>
          </Link>
          <Link
            to="/partner/login"
            onClick={() => setOpen(false)}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', fontSize: 13.5, fontWeight: 700, color: 'var(--navy)', textDecoration: 'none', transition: 'background .1s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F8FAFF'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="#F97316" strokeWidth={2} style={{ marginTop: 2, flex: 'none' }}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
            <div>
              <div>Partner Login</div>
              <div style={{ fontSize: 11, color: '#64748B', fontWeight: 500, marginTop: 1 }}>Vendor &amp; Partner Portal</div>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default function Navbar({ activePage = '' }) {
  const navRef = useRef(null)
  const mainNavRef = useRef(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Sliding active-item pill: settle on the active item, glide to whichever is hovered
  const movePillTo = useCallback(el => {
    const nav = mainNavRef.current
    if (!nav || !el) return
    const navRect = nav.getBoundingClientRect()
    const rect = el.getBoundingClientRect()
    setPill({ left: rect.left - navRect.left, width: rect.width, opacity: 1 })
  }, [])

  const restorePill = useCallback(() => {
    const nav = mainNavRef.current
    if (!nav) return
    const activeEl = nav.querySelector('.nav-item.active')
    if (activeEl) movePillTo(activeEl)
    else setPill(p => ({ ...p, opacity: 0 }))
  }, [movePillTo])

  useEffect(() => { restorePill() }, [activePage, restorePill])

  useEffect(() => {
    window.addEventListener('resize', restorePill)
    return () => window.removeEventListener('resize', restorePill)
  }, [restorePill])

  const onNavMouseOver = e => {
    const item = e.target.closest('.nav-item')
    if (item && mainNavRef.current?.contains(item)) movePillTo(item)
  }

  // Close search on route change
  const location = useLocation()
  useEffect(() => { setSearchOpen(false) }, [location.pathname])

  // Prevent body scroll when search is open
  useEffect(() => {
    document.body.style.overflow = searchOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [searchOpen])

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(o => !o) }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const drops = nav.querySelectorAll('.nav-item[data-drop]')

    drops.forEach(d => {
      let t
      const btn = d.querySelector('button')
      const mega = d.querySelector('.mega')

      function positionMega() {
        if (!mega) return
        mega.style.left = ''; mega.style.right = ''; mega.style.transform = ''
        const isWide = mega.classList.contains('mp-mega')
        if (isWide) {
          const vw = window.innerWidth
          const mw = Math.min(mega.offsetWidth || 860, vw - 32)
          const rect = d.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          let l = cx - mw / 2
          if (l < 16) l = 16
          if (l + mw > vw - 16) l = vw - 16 - mw
          mega.style.left = (l - rect.left) + 'px'
        } else {
          const r = d.getBoundingClientRect()
          const mwn = mega ? mega.offsetWidth || 320 : 320
          if (r.left + mwn > window.innerWidth - 16) { mega.style.left = 'auto'; mega.style.right = '0' }
        }
      }

      const onEnter = () => { clearTimeout(t); drops.forEach(x => { if (x !== d) x.classList.remove('open') }); positionMega(); d.classList.add('open') }
      const onLeave = () => { t = setTimeout(() => d.classList.remove('open'), 140) }
      const onBtnClick = e => { e.preventDefault(); const o = d.classList.contains('open'); drops.forEach(x => x.classList.remove('open')); if (!o) { positionMega(); d.classList.add('open') } }

      d.addEventListener('mouseenter', onEnter)
      d.addEventListener('mouseleave', onLeave)
      btn && btn.addEventListener('click', onBtnClick)
      if (mega) { mega.addEventListener('mouseenter', () => clearTimeout(t)); mega.addEventListener('mouseleave', onLeave) }
    })

    const onDocClick = e => { if (!e.target.closest('.nav-item')) drops.forEach(x => x.classList.remove('open')) }
    document.addEventListener('click', onDocClick)

    nav.querySelectorAll('.mp-mega').forEach(mega => {
      const cats = mega.querySelectorAll('.mp-cat')
      const panels = mega.querySelectorAll('.mp-panel')
      const activate = key => {
        cats.forEach(c => c.classList.toggle('mp-cat--active', c.dataset.mpCat === key))
        panels.forEach(p => p.classList.toggle('mp-panel--active', p.dataset.mpPanel === key))
      }
      cats.forEach(c => {
        c.addEventListener('mouseenter', () => activate(c.dataset.mpCat))
        c.addEventListener('click', e => { e.preventDefault(); activate(c.dataset.mpCat) })
      })
    })

    return () => { document.removeEventListener('click', onDocClick) }
  }, [])

  const closeSearch = useCallback(() => setSearchOpen(false), [])

  // Subtle mouse-following glass highlight across the navbar surface
  const onHeaderMouseMove = e => {
    const el = navRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`)
  }
  const onHeaderMouseEnter = () => navRef.current?.classList.add('mouse-glow')
  const onHeaderMouseLeave = () => navRef.current?.classList.remove('mouse-glow')

  return (
    <>
      <style>{SEARCH_STYLES}</style>

      {searchOpen && <SearchOverlay onClose={closeSearch} />}

      <header
        className={`site-header${scrolled ? ' is-scrolled' : ''}`}
        ref={navRef}
        onMouseMove={onHeaderMouseMove}
        onMouseEnter={onHeaderMouseEnter}
        onMouseLeave={onHeaderMouseLeave}
      >
        <div className="header-in">
          <Link to="/" className="nav-logo-link">
            <img src={logoImg} alt="LauncherDesk" className="nav-logo-img" />
          </Link>

          <nav className="main-nav" id="mainNav" ref={mainNavRef} onMouseOver={onNavMouseOver} onMouseLeave={restorePill}>
            <span className="nav-pill" style={{ transform: `translateX(${pill.left}px)`, width: pill.width, opacity: pill.opacity }} aria-hidden="true" />
            <div className={`nav-item${activePage === 'registrations' ? ' active' : ''} nav-item--reg`} data-drop="true">
              <button>Registrations <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={I.chev} /></svg></button>
              <MegaRegistrations />
            </div>
            <div className={`nav-item${activePage === 'it-services' ? ' active' : ''} nav-item--wide`} data-drop="true">
              <button>IT Services <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={I.chev} /></svg></button>
              <MegaIT />
            </div>
            <div className={`nav-item${activePage === 'market' ? ' active' : ''}`} data-drop="true">
              <button>Marketplace <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={I.chev} /></svg></button>
              <MegaMarket />
            </div>
            <div className={`nav-item${activePage === 'office-restore' ? ' active' : ''}`} data-drop="true">
              <button>Office Setup <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={I.chev} /></svg></button>
              <div className="mega" style={{ minWidth: 300, padding: '8px 0' }}>
                <div style={{ padding: '6px 8px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-3)', padding: '4px 10px 8px' }}>Office Setup</div>
                  <SvcLink href="/office-restore" title="Office Furniture & Setup" desc="Custom furniture manufactured & installed" />
                  <SvcLink href="/office-restore/individual" title="Private Office Space" desc="Rent a furnished private office in Bangalore" />
                  <SvcLink href="/office-restore/coworking" title="Co-working Space" desc="Hot desks, cabins & meeting rooms" />
                </div>
              </div>
            </div>
            <div className={`nav-item${activePage === 'virtual-office' ? ' active' : ''}`}>
              <a href="/virtual-office" className="nav-restore">Virtual Office</a>
            </div>
            <div className={`nav-item${activePage === 'estamp' ? ' active' : ''}`}>
              <a href="/estamp" className="nav-restore">E-Stamp</a>
            </div>
          </nav>

          <div className="header-cta">
            {/* ── Search button ── */}
            <button
              className="ld-search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search services (Ctrl+K)"
              title="Search (Ctrl+K)"
            >
              <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            </button>

            <LoginDropdown />
            <a className="btn btn-primary btn-sm hide-mobile" href="/services#finder" style={{ borderRadius: 8, padding: '0 20px', height: 38, fontSize: 13.5 }}>Get Started</a>
            <button className="burger" aria-label="Open menu" data-open-drawer="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={I.list} /></svg>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}