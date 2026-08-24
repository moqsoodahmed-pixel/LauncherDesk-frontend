import { useEffect, useRef } from 'react'
import logoImg from '../assets/launcherdesk-logo-transparent.png'
import { Link, useLocation } from 'react-router-dom'

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
          <button className="mp-cat mp-cat--active" data-mp-cat="inc">
            <span className="mp-cat-label">Business Incorporation</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <button className="mp-cat" data-mp-cat="cert">
            <span className="mp-cat-label">Certifications</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <button className="mp-cat" data-mp-cat="ipr">
            <span className="mp-cat-label">IPR &amp; Trademark</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
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
              {/* PAN/TAN Application removed per requirement #6 */}
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
              <SvcLink href="/services/trademark-registration" title="Trademark Objection" desc="Respond to objection notices" />
              <SvcLink href="/services/trademark-registration" title="Patent Registration" desc="Protect your invention" />
              <SvcLink href="/services/trademark-registration" title="Copyright Registration" desc="Protect creative works" />
              <SvcLink href="/services/trademark-registration" title="IP &amp; Trademark Management" desc="Ongoing IP portfolio management" />
            </div>
          </div>
        </div>
      </div>
      <div className="mp-foot-wrap">
        <div className="mp-footer"><a href="/services">View all registrations &amp; services →</a></div>
      </div>
    </div>
  )
}

function MegaIT() {
  return (
    <div className="mega mp-mega">
      <div className="mp-body">
        <div className="mp-left">
          <button className="mp-cat mp-cat--active" data-mp-cat="web">
            <span className="mp-cat-label">Website Development</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <button className="mp-cat" data-mp-cat="mob">
            <span className="mp-cat-label">Mobile Solutions</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <button className="mp-cat" data-mp-cat="mkt">
            <span className="mp-cat-label">Marketing &amp; Sales</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
        <div className="mp-right">
          {/* Each IT service now routes to its own dedicated page slug */}
          <div className="mp-panel mp-panel--active" data-mp-panel="web">
            <div className="mp-panel-head">Website Development</div>
            <div className="mp-svc-grid">
              <SvcLink href="/services/website-development" title="Static Website Development" desc="Fast, lightweight brochure sites" />
              <SvcLink href="/services/website-development" title="Dynamic Website Development" desc="CMS-powered, updatable sites" />
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
                ['Branding &amp; Creative', ['Brand Identity &amp; Strategy','Logo &amp; Visual Design','Marketing Creatives','Presentation &amp; Sales Deck Design']],
                ['Digital Marketing', ['SEO &amp; Search Marketing','Social Media Marketing','Performance Marketing','Content Marketing','Influencer Marketing']],
                ['WhatsApp &amp; Customer Engagement', ['WhatsApp Business API','WhatsApp Automation','WhatsApp Campaigns','Email Marketing','SMS Marketing']],
                ['CRM &amp; Marketing Automation', ['CRM Setup &amp; Integration','Lead Management','Marketing Automation','Workflow Automation','Analytics &amp; Reporting']],
              ].map(([group, items]) => (
                <div key={group} className="mp-grp">
                  <div className="mp-grp-h" dangerouslySetInnerHTML={{__html: group}} />
                  {items.map(item => <SvcLink key={item} href="/services/digital-marketing" title={item} />)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mp-foot-wrap">
        <div className="mp-footer"><a href="/services">View all IT services →</a></div>
      </div>
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
    { slug: 'clm', icon: I.clm, name: 'CLM', desc: 'Contract lifecycle & e-sign' },
  ]
  return (
    <div className="mega mn-market">
      <div className="mn-col">
        <div className="mn-col-h">Software categories</div>
        {cats.map(c => (
          <a key={c.slug} className="mn-li mn-li-ic" href={`/market/category?cat=${c.slug}`}>
            <span className="mn-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={c.icon} />
              </svg>
            </span>
            <span className="mn-tx"><b>{c.name}</b><em>{c.desc}</em></span>
          </a>
        ))}
      </div>
      <div className="mn-all"><a href="/market">Browse all software →</a></div>
    </div>
  )
}

export default function Navbar({ activePage = '' }) {
  const navRef = useRef(null)

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
        mega.style.left = ''
        mega.style.right = ''
        mega.style.transform = ''
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
          if (r.left + mwn > window.innerWidth - 16) {
            mega.style.left = 'auto'
            mega.style.right = '0'
          }
        }
      }

      const onEnter = () => { clearTimeout(t); drops.forEach(x => { if (x !== d) x.classList.remove('open') }); positionMega(); d.classList.add('open') }
      const onLeave = () => { t = setTimeout(() => d.classList.remove('open'), 140) }
      const onBtnClick = e => { e.preventDefault(); const o = d.classList.contains('open'); drops.forEach(x => x.classList.remove('open')); if (!o) { positionMega(); d.classList.add('open') } }

      d.addEventListener('mouseenter', onEnter)
      d.addEventListener('mouseleave', onLeave)
      btn && btn.addEventListener('click', onBtnClick)
      if (mega) {
        mega.addEventListener('mouseenter', () => clearTimeout(t))
        mega.addEventListener('mouseleave', onLeave)
      }
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

  return (
    <header className="site-header" ref={navRef}>
      <div className="header-in">
        <Link to="/" style={{display:'flex',alignItems:'center',textDecoration:'none',flexShrink:0}}>
          <img src={logoImg} alt="LauncherDesk" style={{height:38,width:'auto',display:'block'}} />
        </Link>
        <nav className="main-nav" id="mainNav">
          <div className={`nav-item${activePage === 'registrations' ? ' active' : ''} nav-item--reg`} data-drop="true">
            <button>Registrations <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={I.chev}/></svg></button>
            <MegaRegistrations />
          </div>
          <div className={`nav-item${activePage === 'it-services' ? ' active' : ''} nav-item--wide`} data-drop="true">
            <button>IT Services <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={I.chev}/></svg></button>
            <MegaIT />
          </div>
          <div className={`nav-item${activePage === 'market' ? ' active' : ''}`} data-drop="true">
            <button>Marketplace <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={I.chev}/></svg></button>
            <MegaMarket />
          </div>
          {/* Change 4: Office Setup as regular nav link — same style as others */}
          <div className={`nav-item${activePage === 'office-restore' ? ' active' : ''}`}>
            <a href="/office-restore" className="nav-restore">Office Setup</a>
          </div>
        </nav>
        <div className="header-cta">
          {/* Change 1: "Login" renamed to "Contact Us" */}
          <a className="btn btn-quiet btn-sm" href="/company/contact">Talk to an Expert</a>
          <a className="btn btn-quiet btn-sm nav-login" href="/company/contact">Contact Us</a>
          <a className="btn btn-primary btn-sm" href="/services#finder">Get Started</a>
          <button className="burger" aria-label="Open menu" data-open-drawer="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={I.list} />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}