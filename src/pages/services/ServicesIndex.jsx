import { useEffect } from 'react'

const ARROW = 'M5 12h14M13 6l6 6-6 6'
const WA = 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z'
const SHIELD = 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'

const CATEGORIES = [
  { keywords: 'private limited llp opc partnership startup incorporation', href: '/services/private-limited-company-registration', icon: 'M3 21h18M6 21V7l6-4 6 4v14M10 9h4M10 13h4', title: 'Start your business', desc: 'Private Limited, LLP, OPC, Partnership, Startup India.' },
  { keywords: 'gst msme fssai iec dsc licence registration', href: '/services/gst-registration', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6', title: 'Registrations & licences', desc: 'GST, MSME/Udyam, FSSAI, Import-Export Code, DSC.' },
  { keywords: 'roc compliance annual filing income tax returns', href: '/services/roc-compliance', icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11', title: 'Compliance', desc: 'ROC filing, GST returns, income tax, annual compliance.' },
  { keywords: 'trademark copyright patent ip legal agreements', href: '/services/trademark-registration', icon: SHIELD, title: 'Legal & IP', desc: 'Trademark, copyright, patent, agreements, IP protection.' },
  { keywords: 'accounting bookkeeping payroll tds pf esi', href: '/services/accounting', icon: 'M4 21V10M10 21V4M16 21v-8M22 21H2', title: 'Accounting & payroll', desc: 'Bookkeeping, accounting, payroll, TDS, PF/ESI.' },
  { keywords: 'website crm automation marketing branding growth funding advisory', href: '/services/business-automation', icon: 'M3 3v18h18M7 14l4-4 3 3 5-6', title: 'Growth & funding', desc: 'Website, CRM, automation, marketing, funding readiness.' },
]

const ALL_SERVICES = [
  { href: '/services/private-limited-company-registration', title: 'Private Limited Company', desc: 'The startup standard for limited liability and fundraising.' },
  { href: '/services/llp-registration', title: 'LLP Registration', desc: 'Partner-owned firm with lower compliance overhead.' },
  { href: '/services/opc-registration', title: 'OPC Registration', desc: 'Right-sized structure for a solo founder.' },
  { href: '/services/partnership-registration', title: 'Partnership Firm', desc: 'Simple shared-ownership registration.' },
  { href: '/services/gst-registration', title: 'GST Registration', desc: 'Registration and ongoing return filing.' },
  { href: '/services/msme-registration', title: 'MSME / Udyam', desc: 'Unlock government benefits and easier credit.' },
  { href: '/services/fssai-registration', title: 'FSSAI Registration', desc: 'Mandatory licence for any food business.' },
  { href: '/services/trademark-registration', title: 'Trademark Registration', desc: 'Protect your brand name and logo.' },
  { href: '/services/roc-compliance', title: 'ROC Compliance', desc: 'Annual filings that keep you penalty-free.' },
  { href: '/services/accounting', title: 'Accounting', desc: 'Bookkeeping and financial statements, done right.' },
  { href: '/services/payroll', title: 'Payroll', desc: 'Salary processing, TDS, PF/ESI compliance.' },
  { href: '/services/business-automation', title: 'Business Automation', desc: 'Systems and workflows that scale with you.' },
  { href: '/services/digital-marketing', title: 'Digital Marketing', desc: 'Website, branding and demand generation.' },
]

const FINDER_STEPS = [
  { q: "What are you building?", k: "type", opts: ["Services / Consulting","E-commerce / Online","Retail / Shop","Food & Restaurant","Technology / SaaS","Something else"] },
  { q: "Where will you operate from?", k: "state", opts: ["Karnataka","Maharashtra","Delhi NCR","Tamil Nadu","Another state"] },
  { q: "How many founders?", k: "founders", opts: ["Just me","2–3 founders","4 or more"] },
  { q: "Expected annual turnover?", k: "turnover", opts: ["Under ₹20 lakh","₹20 lakh – ₹1 crore","Over ₹1 crore","Not sure yet"] },
  { q: "Do you plan to hire employees?", k: "hire", opts: ["Yes, soon","Maybe later","No"] },
  { q: "What do you already have?", k: "have", opts: ["Nothing yet","A registered company","GST already","Just an idea"] },
]

function buildRoadmap(ans) {
  const p = []
  const solo = ans.founders === 'Just me'
  if (ans.have !== 'A registered company') p.push(solo ? ['OPC or Proprietorship','Right-sized structure for a single founder starting out.','hi'] : ['Private Limited Company','Best structure for multiple founders and future funding.','hi'])
  if (ans.have !== 'GST already' && (ans.type === 'E-commerce / Online' || ans.turnover === 'Over ₹1 crore' || ans.turnover === '₹20 lakh – ₹1 crore' || ans.state === 'Another state')) p.push(['GST Registration','Required for online sales, inter-state trade, or your turnover band.','hi'])
  if (ans.type === 'Food & Restaurant') p.push(['FSSAI Licence','Mandatory for any food business.','hi'])
  p.push(['MSME / Udyam Registration','Quick to file and unlocks benefits and easier credit.','mid'])
  p.push(['Trademark',(ans.type === 'E-commerce / Online' || ans.type === 'Technology / SaaS') ? "Protect your brand early — it's an asset investors look for." : 'Protect your brand name before you build on it.',(ans.type === 'E-commerce / Online' || ans.type === 'Technology / SaaS') ? 'mid' : 'low'])
  if (ans.hire === 'Yes, soon') p.push(['Payroll & PF/ESI setup','Get employment compliance right from your first hire.','mid'])
  p.push(['Accounting & annual compliance',"Keep books clean and never miss an ROC or tax deadline.",'mid'])
  if (ans.type === 'Technology / SaaS' || ans.type === 'E-commerce / Online') p.push(['Website & growth stack','Get online with a site, CRM and marketing foundation.','low'])
  return p
}

export default function ServicesIndex() {
  /* Search */
  useEffect(() => {
    const s = document.getElementById('svcSearch')
    const list = document.getElementById('svcList')
    const noRes = document.getElementById('noRes')
    if (!s) return
    const handler = () => {
      const q = s.value.toLowerCase().trim()
      let shown = 0
      list.querySelectorAll('[data-svc]').forEach(c => {
        const m = q === '' || c.dataset.svc.includes(q) || c.textContent.toLowerCase().includes(q)
        c.style.display = m ? '' : 'none'
        if (m) shown++
      })
      noRes.style.display = shown ? 'none' : 'block'
    }
    s.addEventListener('input', handler)
    return () => s.removeEventListener('input', handler)
  }, [])

  /* Finder */
  useEffect(() => {
    const main = document.getElementById('finderMain')
    const bar = document.getElementById('finderBar')
    const lbl = document.getElementById('finderStepLbl')
    if (!main) return

    let ans = {}, i = 0

    function chev() {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
    }

    function render() {
      if (i >= FINDER_STEPS.length) return result()
      const s = FINDER_STEPS[i]
      bar.style.width = (i / FINDER_STEPS.length * 100 + 8) + '%'
      lbl.textContent = `Step ${i + 1} of ${FINDER_STEPS.length}`
      let h = `<div class="finder-q reveal-up in">${s.q}</div><div class="finder-opts">`
      s.opts.forEach(o => { h += `<button class="opt" data-v="${o}">${o}${chev()}</button>` })
      h += `</div><div class="finder-nav">${i > 0 ? '<button class="finder-back">← Back</button>' : '<span></span>'}<span class="mut" style="font-size:13px">Free · no signup</span></div>`
      main.innerHTML = h
      main.querySelectorAll('.opt').forEach(b => { b.addEventListener('click', () => { ans[s.k] = b.dataset.v; i++; render() }) })
      const bk = main.querySelector('.finder-back')
      if (bk) bk.addEventListener('click', () => { i--; render() })
    }

    function result() {
      bar.style.width = '100%'
      lbl.textContent = 'Your roadmap is ready'
      const plan = buildRoadmap(ans)
      let h = `<div class="rm reveal-up in"><span class="eyebrow">Your LauncherDesk roadmap</span><h3 style="margin-top:8px">Here's what your business needs next</h3>`
      plan.forEach(p => { h += `<div class="rm-item"><span class="rm-pri ${p[2]}">${p[2] === 'hi' ? 'Now' : p[2] === 'mid' ? 'Soon' : 'Later'}</span><div><b>${p[0]}</b><p>${p[1]}</p></div></div>` })
      h += `<div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap">
        <a href="/company/contact" class="btn btn-primary btn-sm">Get this plan actioned</a>
        <a href="/company/contact" class="btn btn-wa btn-sm" style="justify-content:center">
          <svg class="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="${WA}"/></svg> WhatsApp
        </a>
        <button class="finder-back" id="rs">Start over</button>
      </div>
      <div class="rm-disc">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="${SHIELD}"/></svg>
        General guidance based on your answers. A qualified LauncherDesk professional confirms specifics before anything is filed.
      </div></div>`
      main.innerHTML = h
      const rs = main.querySelector('#rs')
      if (rs) rs.addEventListener('click', () => { ans = {}; i = 0; render() })
    }

    render()
  }, [])

  return (
    <>
      {/* Hero */}
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a>
            <svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
            <span className="cur">Services</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{ marginTop: 16, display: 'block' }}>Service catalog</span>
          <h1 className="reveal-up in">Business services, organized around what you need.</h1>
          <p className="lead reveal-up in">Not a wall of links. Search for a service, browse by stage, or answer a few questions and let us build the roadmap.</p>
          <div className="reveal-up in" style={{ marginTop: 24, maxWidth: 520, position: 'relative' }}>
            <input
              id="svcSearch"
              type="text"
              placeholder="Search services — e.g. GST, trademark, payroll…"
              style={{ width: '100%', border: '1px solid var(--line)', borderRadius: 12, padding: '13px 16px', fontFamily: 'var(--font-body)', fontSize: 15, background: '#fff', boxShadow: 'var(--sh-sm)', outline: 'none' }}
            />
          </div>
        </div>
      </header>

      {/* By category */}
      <section className="section-sm">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">By category</span>
            <h2 style={{ fontSize: 'clamp(26px,3vw,38px)' }}>Six areas, one partner</h2>
          </div>
          <div className="grid-3" id="svcList" style={{ marginTop: 32 }}>
            {CATEGORIES.map(cat => (
              <a key={cat.href} className="card reveal-up" data-svc={cat.keywords} href={cat.href}>
                <div className="ci">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={cat.icon}/>
                  </svg>
                </div>
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
                <span className="arrow">View →</span>
              </a>
            ))}
          </div>
          <p id="noRes" className="mut center" style={{ display: 'none', marginTop: 24 }}>
            No services match that search. Try a broader term, or{' '}
            <a href="/company/contact" style={{ color: 'var(--blue-dark)', fontWeight: 600 }}>ask an expert</a>.
          </p>
        </div>
      </section>

      {/* Browse all */}
      <section className="section-2">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">All services</span>
            <h2 style={{ fontSize: 'clamp(24px,3vw,34px)' }}>Browse every service</h2>
          </div>
          <div className="grid-3" style={{ marginTop: 28 }}>
            {ALL_SERVICES.map(svc => (
              <a key={svc.href} className="card reveal-up" href={svc.href}>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <span className="arrow">View →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Service Finder */}
      <section className="section section-warm" id="finder">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">Service finder</span>
            <h2>Not sure what you need?</h2>
            <p>Answer six quick questions and we'll build your prioritised roadmap — free, before you talk to anyone.</p>
          </div>
          <div className="finder reveal-up" style={{ marginTop: 34 }}>
            <div className="finder-side">
              <span className="eyebrow">Tell us what you're building</span>
              <h2>We'll tell you what comes next.</h2>
              <p>Personalised to your business type, location, size and stage.</p>
              <div className="finder-prog">
                <div className="bar"><i id="finderBar"></i></div>
                <div className="step-lbl" id="finderStepLbl">Step 1 of 6</div>
              </div>
            </div>
            <div className="finder-main" id="finderMain"></div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="wrap">
          <div className="final reveal-up">
            <h2>Prefer to talk it through?</h2>
            <p>A LauncherDesk expert can review your situation and recommend the right services.</p>
            <div className="row">
              <a href="/company/contact" className="btn btn-light">Talk to an Expert</a>
              <button className="btn btn-ghost-d" data-open-ai="true">Ask LauncherDesk AI</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}