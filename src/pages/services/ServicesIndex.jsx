import { useEffect, useState } from 'react'

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
  // START
  { href: '/services/private-limited-company-registration', title: 'Private Limited Company', desc: 'The startup standard for limited liability and fundraising.' },
  { href: '/services/llp-registration', title: 'LLP Registration', desc: 'Partner-owned firm with lower compliance overhead.' },
  { href: '/services/opc-registration', title: 'OPC Registration', desc: 'Right-sized structure for a solo founder.' },
  { href: '/services/partnership-registration', title: 'Partnership Firm', desc: 'Simple shared-ownership registration.' },
  { href: '/services/gst-registration', title: 'GST Registration', desc: 'Registration and ongoing return filing.' },
  { href: '/services/msme-registration', title: 'MSME / Udyam', desc: 'Unlock government benefits and easier credit.' },
  { href: '/services/fssai-registration', title: 'FSSAI Registration', desc: 'Mandatory licence for any food business.' },
  { href: '/services/trademark-registration', title: 'Trademark Registration', desc: 'Protect your brand name and logo.' },
  { href: '/services/startup-india-dpiit', title: 'Startup India / DPIIT', desc: 'Tax benefits and government scheme access.' },
  { href: '/services/iso-certification', title: 'ISO Certification', desc: 'Quality and security certifications for your business.' },
  // BUILD
  { href: '/services/website-development', title: 'Website Development', desc: 'Mobile-first professional websites for businesses.' },
  { href: '/services/ecommerce-website', title: 'E-Commerce Website', desc: 'Online store with payment gateway and catalogue.' },
  { href: '/services/branding-logo-design', title: 'Branding & Logo Design', desc: 'Logo, colour palette, typography and brand guide.' },
  { href: '/services/business-email-hosting', title: 'Business Email & Hosting', desc: 'Professional email and reliable website hosting.' },
  { href: '/services/software-saas-development', title: 'Software & SaaS Development', desc: 'Custom software, web apps and SaaS products.' },
  { href: '/services/mobile-app-development', title: 'Mobile App Development', desc: 'iOS and Android applications for your business.' },
  { href: '/services/business-automation', title: 'Business Automation', desc: 'CRM, workflows and automation that scale with you.' },
  // MANAGE
  { href: '/services/accounting', title: 'Accounting & Bookkeeping', desc: 'Monthly bookkeeping and financial statements.' },
  { href: '/services/gst-registration', title: 'GST Filing & Returns', desc: 'GSTR-1, GSTR-3B, annual returns — filed on time.' },
  { href: '/services/income-tax-filing', title: 'Income Tax Filing', desc: 'CA-reviewed ITR for companies and LLPs.' },
  { href: '/services/roc-compliance', title: 'ROC / Annual Compliance', desc: 'Annual filings that keep you penalty-free.' },
  { href: '/services/payroll', title: 'Payroll Management', desc: 'Salary processing, TDS, PF/ESI compliance.' },
  { href: '/services/legal-document-support', title: 'Legal Document Support', desc: 'Agreements, NDAs and contracts for your business.' },
  // GROW
  { href: '/services/digital-marketing', title: 'SEO & Performance Marketing', desc: 'Organic growth, keyword strategy and content.' },
  { href: '/services/social-media-management', title: 'Social Media Management', desc: 'Instagram, LinkedIn, Facebook content and posting.' },
  { href: '/services/whatsapp-business-api', title: 'WhatsApp Business API', desc: 'Bulk messaging, automation and CRM integration.' },
  { href: '/services/crm-setup-lead-management', title: 'CRM Setup & Lead Management', desc: 'Pipeline management so no lead falls through.' },
  { href: '/services/google-ads-paid-marketing', title: 'Google Ads & Paid Marketing', desc: 'Managed campaigns that generate real leads.' },
  // EXPAND
  { href: '/services/uae-business-setup', title: 'UAE Business Setup', desc: 'Free zone or mainland company in the UAE.' },
  { href: '/services/fundraising-documentation', title: 'Fundraising Documentation', desc: 'Pitch deck, projections and investor data room.' },
  { href: '/services/business-consulting', title: 'Business Consulting', desc: 'Strategic review and actionable growth plan.' },
]

// Change 2: removed Retail/Shop & Food/Restaurant; step 2 = text input for state
const FINDER_STEPS = [
  { q: "What are you building?", k: "type", inputType: 'select', opts: ["Services / Consulting", "E-commerce / Online", "Technology / SaaS", "Something else"] },
  { q: "Where will you operate from?", k: "state", inputType: 'text', placeholder: "Type your state (e.g. Karnataka, Maharashtra…)" },
  { q: "How many founders?", k: "founders", inputType: 'select', opts: ["Just me", "2–3 founders", "4 or more"] },
  { q: "Expected annual turnover?", k: "turnover", inputType: 'select', opts: ["Under ₹20 lakh", "₹20 lakh – ₹1 crore", "Over ₹1 crore", "Not sure yet"] },
  { q: "Do you plan to hire employees?", k: "hire", inputType: 'select', opts: ["Yes, soon", "Maybe later", "No"] },
  { q: "What do you already have?", k: "have", inputType: 'select', opts: ["Nothing yet", "A registered company", "GST already", "Just an idea"] },
]

function buildRoadmap(ans) {
  const p = []
  const solo = ans.founders === 'Just me'
  if (ans.have !== 'A registered company') p.push(solo ? ['OPC or Proprietorship', 'Right-sized structure for a single founder starting out.', 'hi'] : ['Private Limited Company', 'Best structure for multiple founders and future funding.', 'hi'])
  if (ans.have !== 'GST already' && (ans.type === 'E-commerce / Online' || ans.turnover === 'Over ₹1 crore' || ans.turnover === '₹20 lakh – ₹1 crore' || (ans.state && ans.state.toLowerCase() !== 'karnataka'))) p.push(['GST Registration', 'Required for online sales, inter-state trade, or your turnover band.', 'hi'])
  p.push(['MSME / Udyam Registration', 'Quick to file and unlocks benefits and easier credit.', 'mid'])
  p.push(['Trademark', (ans.type === 'E-commerce / Online' || ans.type === 'Technology / SaaS') ? "Protect your brand early — it's an asset investors look for." : 'Protect your brand name before you build on it.', (ans.type === 'E-commerce / Online' || ans.type === 'Technology / SaaS') ? 'mid' : 'low'])
  if (ans.hire === 'Yes, soon') p.push(['Payroll & PF/ESI setup', 'Get employment compliance right from your first hire.', 'mid'])
  p.push(['Accounting & annual compliance', "Keep books clean and never miss an ROC or tax deadline.", 'mid'])
  if (ans.type === 'Technology / SaaS' || ans.type === 'E-commerce / Online') p.push(['Website & growth stack', 'Get online with a site, CRM and marketing foundation.', 'low'])
  return p
}

// ── React-controlled finder (avoids innerHTML hacks) ──
function ServiceFinder() {
  const [step, setStep] = useState(0)
  const [ans, setAns] = useState({})
  const [stateInput, setStateInput] = useState('')
  const [done, setDone] = useState(false)
  const [plan, setPlan] = useState([])

  const total = FINDER_STEPS.length
  const progress = done ? 100 : (step / total * 100 + 8)
  const cur = FINDER_STEPS[step]

  function advance(newAns) {
    const nextStep = step + 1
    if (nextStep >= total) {
      setPlan(buildRoadmap(newAns))
      setDone(true)
    } else {
      setStep(nextStep)
    }
  }

  function handleSelect(value) {
    const newAns = { ...ans, [cur.k]: value }
    setAns(newAns)
    advance(newAns)
  }

  function handleTextNext() {
    if (!stateInput.trim()) return
    const newAns = { ...ans, [cur.k]: stateInput.trim() }
    setAns(newAns)
    advance(newAns)
  }

  function handleBack() {
    if (done) { setDone(false); setStep(total - 1); return }
    if (step > 0) setStep(step - 1)
  }

  function handleStartOver() {
    setStep(0); setAns({}); setStateInput(''); setDone(false); setPlan([])
  }

  return (
    <div className="finder reveal-up" style={{ marginTop: 34 }}>
      {/* Left side */}
      <div className="finder-side">
        <span className="eyebrow">Tell us what you're building</span>
        <h2>We'll tell you what comes next.</h2>
        <p>Personalised to your business type, location, size and stage.</p>
        <div className="finder-prog">
          <div className="bar">
            <i style={{ display: 'block', height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#249AE2,#7fe0a8)', transition: 'width .4s' }}></i>
          </div>
          <div className="step-lbl">{done ? 'Your roadmap is ready' : `Step ${step + 1} of ${total}`}</div>
        </div>
      </div>

      {/* Right main */}
      <div className="finder-main">
        {done ? (
          <div className="rm">
            <span className="eyebrow">Your LauncherDesk roadmap</span>
            <h3 style={{ marginTop: 8 }}>Here's what your business needs next</h3>
            {plan.map((p, idx) => (
              <div key={idx} className="rm-item">
                <span className={`rm-pri ${p[2]}`}>{p[2] === 'hi' ? 'Now' : p[2] === 'mid' ? 'Soon' : 'Later'}</span>
                <div><b>{p[0]}</b><p>{p[1]}</p></div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  try {
                    sessionStorage.setItem('ld_finder_roadmap', JSON.stringify({ plan, answers: ans }))
                  } catch(e) {}
                  window.location.href = '/company/contact'
                }}
              >
                Get this plan actioned
              </button>
              <a href="https://wa.me/918458845859" className="btn btn-wa btn-sm" style={{ justifyContent: 'center' }}>
                <svg className="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={WA}/></svg> WhatsApp
              </a>
              <button className="finder-back" onClick={handleStartOver}>Start over</button>
            </div>
            <div className="rm-disc">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={SHIELD}/></svg>
              General guidance based on your answers. A qualified LauncherDesk professional confirms specifics before anything is filed.
            </div>
          </div>
        ) : (
          <div>
            <div className="finder-q">{cur.q}</div>
            {cur.inputType === 'text' ? (
              /* Change 2: free-text input for state */
              <div style={{ marginTop: 20 }}>
                <input
                  type="text"
                  value={stateInput}
                  onChange={e => setStateInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && stateInput.trim()) handleTextNext() }}
                  placeholder={cur.placeholder}
                  autoFocus
                  style={{ width: '100%', border: '1.5px solid var(--line)', borderRadius: 12, padding: '14px 18px', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text)', outline: 'none', background: 'var(--bg)', transition: '.15s' }}
                />
                <div className="finder-nav" style={{ marginTop: 16 }}>
                  {step > 0 ? <button className="finder-back" onClick={handleBack}>← Back</button> : <span></span>}
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleTextNext}
                    disabled={!stateInput.trim()}
                    style={{ opacity: stateInput.trim() ? 1 : 0.5, cursor: stateInput.trim() ? 'pointer' : 'not-allowed' }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            ) : (
              /* Select options */
              <div>
                <div className="finder-opts">
                  {cur.opts.map(o => (
                    <button key={o} className="opt" onClick={() => handleSelect(o)}>
                      {o}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                    </button>
                  ))}
                </div>
                <div className="finder-nav">
                  {step > 0 ? <button className="finder-back" onClick={handleBack}>← Back</button> : <span></span>}
                  <span className="mut" style={{ fontSize: 13 }}>Free · no signup</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
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
          <h1 className="reveal-up in">Business solutions for every stage.</h1>
          <p className="lead reveal-up in">Whether you're registering your first company or scaling your tenth — find, arrange and coordinate the services your business needs, at every stage.</p>
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
            <span className="eyebrow">Organised by stage</span>
            <h2 style={{ fontSize: 'clamp(26px,3vw,38px)' }}>START · BUILD · MANAGE · GROW · EXPAND</h2>
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

      {/* Service Finder — fully React-controlled */}
      <section className="section section-warm" id="finder">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">Service finder</span>
            <h2>Not sure what you need?</h2>
            <p>Answer six quick questions and we'll build your prioritised roadmap — free, before you talk to anyone.</p>
          </div>
          <ServiceFinder />
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="wrap">
          <div className="final reveal-up">
            <h2>Not sure where to start?</h2>
            <p>Tell us about your business. We'll understand your requirement and guide you on the right starting point — no obligation.</p>
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