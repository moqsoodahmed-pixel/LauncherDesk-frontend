import { useEffect } from 'react'

const homepageStyles = `
.lc2-section{background:var(--bg-warm);padding:88px 0}
.lc2-inner{display:grid;grid-template-columns:1fr 1.15fr;gap:72px;align-items:start;max-width:1200px;margin:0 auto;padding:0 28px}
.lc2-left{position:sticky;top:92px}
.lc2-left .eyebrow{margin-bottom:14px;display:block}
.lc2-heading{font-size:clamp(26px,3.4vw,44px);font-weight:800;letter-spacing:-.03em;line-height:1.08;margin-bottom:18px}
.lc2-desc{font-size:16px;color:var(--text-2);line-height:1.7;max-width:360px;margin-bottom:28px}
.lc2-list{display:flex;flex-direction:column}
.lc2-item{border-top:1px solid var(--line);overflow:hidden}
.lc2-item:last-child{border-bottom:1px solid var(--line)}
.lc2-trigger{width:100%;background:none;border:0;cursor:pointer;display:grid;grid-template-columns:44px 1fr 28px;align-items:center;gap:12px;padding:20px 4px;text-align:left;transition:background .15s;border-radius:0}
.lc2-trigger:hover{background:rgba(4,125,204,.04)}
.lc2-num{font-family:var(--font);font-weight:800;font-size:14px;color:var(--blue-dark);opacity:.45;transition:opacity .25s,color .25s;line-height:1}
.lc2-name{font-family:var(--font);font-weight:700;font-size:clamp(17px,2vw,21px);color:var(--navy);transition:color .25s;line-height:1}
.lc2-chevron{width:20px;height:20px;stroke:var(--text-3);fill:none;stroke-width:2;transition:transform .28s cubic-bezier(.2,.7,.3,1),stroke .2s;flex:none}
.lc2-item.lc2-open .lc2-trigger{background:rgba(4,125,204,.04)}
.lc2-item.lc2-open .lc2-num{opacity:1;color:var(--blue)}
.lc2-item.lc2-open .lc2-name{color:var(--blue-dark)}
.lc2-item.lc2-open .lc2-chevron{transform:rotate(90deg);stroke:var(--blue)}
.lc2-body{max-height:0;overflow:hidden;transition:max-height .38s cubic-bezier(.2,.7,.3,1),opacity .3s;opacity:0}
.lc2-item.lc2-open .lc2-body{opacity:1}
.lc2-body-inner{padding:0 4px 22px 56px;display:flex;flex-direction:column;gap:10px}
.lc2-body-desc{font-size:14px;color:var(--text-2);line-height:1.65;margin-bottom:4px}
.lc2-chips{display:flex;flex-wrap:wrap;gap:8px}
.lc2-chip{display:inline-flex;align-items:center;gap:7px;font-family:var(--font);font-weight:600;font-size:13px;color:var(--navy);background:#fff;border:1.5px solid var(--line);border-radius:99px;padding:7px 14px;text-decoration:none;transition:border-color .14s,background .14s,color .14s,transform .14s,box-shadow .14s}
.lc2-chip:hover{border-color:var(--blue);color:var(--blue-dark);background:rgba(4,125,204,.06);transform:translateY(-1px);box-shadow:0 4px 12px rgba(4,125,204,.15)}
.lc2-prog{height:2px;background:transparent;position:relative;margin:0 4px}
.lc2-prog-bar{height:100%;width:0;background:linear-gradient(90deg,var(--blue-dark),var(--blue-bright));border-radius:2px;transition:width linear}
.hp-hero-grid{display:grid;grid-template-columns:1.02fr .98fr;gap:52px;align-items:center}
.hp-trust-row{display:flex;gap:22px;margin-top:28px;flex-wrap:wrap}
.hp-trust-item{display:flex;align-items:center;gap:8px;font-size:13.5px;color:var(--text-2)}
.hp-trust-item svg{width:17px;height:17px;stroke:var(--blue)}
.sv-section{padding:88px 0;background:var(--bg);overflow:hidden;position:relative}
.sv-inner{max-width:1200px;margin:0 auto;padding:0 28px}
.sv-head{text-align:center;margin-bottom:52px}
.sv-nodes{position:absolute;inset:0;pointer-events:none}
.sv-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible}
.sv-center{position:relative;z-index:3;width:160px;height:160px;border-radius:50%;background:linear-gradient(135deg,#0b1f36,#1F3C5C);border:2px solid rgba(36,154,226,.35);box-shadow:0 0 0 12px rgba(4,125,204,.07),0 0 0 26px rgba(4,125,204,.04),0 20px 50px rgba(8,76,151,.3);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;flex:none}
.sv-center-brand{font-family:var(--font);font-weight:800;font-size:15px;color:#fff;letter-spacing:-.01em;line-height:1.2}
.sv-center-sub{font-size:10px;color:#7ecef4;margin-top:3px;font-family:var(--font);font-weight:600;letter-spacing:.04em;text-transform:uppercase}
.sv-center::before,.sv-center::after{content:"";position:absolute;inset:-16px;border-radius:50%;border:1px solid rgba(36,154,226,.18);animation:svPulse 3.2s ease-in-out infinite}
.sv-center::after{inset:-30px;animation-delay:1.6s}
@keyframes svPulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.15;transform:scale(1.04)}}
.sv-node{position:absolute;transform:translate(-50%,-50%);pointer-events:auto;display:flex;align-items:center;gap:8px;font-family:var(--font);font-weight:600;font-size:13px;color:var(--navy);background:#fff;border:1.5px solid var(--line);border-radius:99px;padding:9px 16px;box-shadow:var(--sh-sm);cursor:pointer;text-decoration:none;transition:border-color .18s,box-shadow .18s,transform .18s,background .18s,color .18s;white-space:nowrap;z-index:3}
.sv-node svg{width:15px;height:15px;stroke:var(--blue-dark);fill:none;stroke-width:2;flex:none;transition:stroke .18s}
.sv-node:hover{border-color:var(--blue);color:var(--blue-dark);box-shadow:0 6px 20px rgba(4,125,204,.2);transform:translate(-50%,-50%) translateY(-3px);background:rgba(4,125,204,.04)}
.sv-node:hover svg{stroke:var(--blue)}
.sv-thread{stroke:var(--blue);fill:none;stroke-width:1.5;stroke-dasharray:5 6;opacity:.22;animation:svDash 2.2s linear infinite}
.sv-thread-glow{stroke:var(--blue-bright);fill:none;stroke-width:2.5;opacity:0;stroke-dasharray:20 200;stroke-dashoffset:0;animation:svGlowPulse 2.8s ease-in-out infinite}
@keyframes svDash{to{stroke-dashoffset:-44}}
@keyframes svGlowPulse{0%{opacity:0;stroke-dashoffset:0}30%{opacity:.55}70%{opacity:.4}100%{opacity:0;stroke-dashoffset:-220}}
.sv-canvas{position:relative;width:100%;height:520px}
.stat-n{font-family:var(--font);font-weight:800;font-size:clamp(28px,3.6vw,48px);letter-spacing:-.03em;color:var(--navy)}
.stat-l{font-size:14px;color:var(--text-2);margin-top:2px}
.diff-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:32px}
.diff-col{background:#fff;border-radius:16px;padding:26px;box-shadow:var(--sh-sm)}
.diff-col.neg{border-top:3px solid #e53e3e}.diff-col.pos{border-top:3px solid var(--success)}
.diff-col h4{font-size:16px;margin-bottom:14px}
.diff-col.neg h4{color:#c0392b}.diff-col.pos h4{color:var(--success)}
.diff-item{display:flex;gap:10px;align-items:flex-start;font-size:14px;color:var(--text-2);margin-bottom:10px}
.diff-item:last-child{margin-bottom:0}
.diff-ic{flex:none;margin-top:2px}
.roadmap-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:28px}
.roadmap-card{background:#fff;border-radius:14px;padding:20px;box-shadow:var(--sh-sm);position:relative}
.roadmap-badge{display:inline-block;font-size:11px;font-family:var(--font);font-weight:700;padding:3px 9px;border-radius:99px;margin-bottom:10px}
.roadmap-badge.soon{background:rgba(4,125,204,.1);color:var(--blue-dark)}
.roadmap-badge.dev{background:rgba(183,121,31,.12);color:var(--warn)}
.roadmap-badge.future{background:var(--bg-2);color:var(--text-3)}
@media(max-width:960px){.hp-hero-grid{grid-template-columns:1fr;gap:32px}.sv-canvas{height:680px}.sv-center{width:120px;height:120px}.sv-center-brand{font-size:12px}.lc2-section{padding:60px 0}.lc2-inner{gap:36px}.diff-grid{grid-template-columns:1fr}.roadmap-grid{grid-template-columns:1fr 1fr}}
@media(max-width:900px){.lc2-inner{grid-template-columns:1fr;gap:36px}.lc2-left{position:static}}
@media(max-width:640px){.lc2-section{padding:48px 0}.sv-canvas{height:900px}.sv-node{font-size:12px;padding:7px 12px}.hp-trust-row{gap:14px}.roadmap-grid{grid-template-columns:1fr}}
@media(max-width:480px){.sv-canvas{height:1040px}.sv-center{width:100px;height:100px}.sv-center-brand{font-size:11px}.lc2-body-inner{padding:0 4px 18px 44px}.lc2-trigger{grid-template-columns:36px 1fr 24px;gap:8px}}
@media(prefers-reduced-motion:reduce){.sv-thread,.sv-thread-glow,.sv-center::before,.sv-center::after{animation:none!important}.lc2-prog-bar{transition:none!important}}
`

// DOCX lifecycle stages: IDEA → START → BUILD → MANAGE → GROW → EXPAND
const STAGES = [
  {
    num: '01', name: 'IDEA',
    desc: 'You have a business concept. We help you validate the right structure before you commit.',
    chips: [
      { label: 'Pvt Ltd vs LLP comparison', href: '/business-types' },
      { label: 'Business type finder', href: '/business-types' },
      { label: 'Talk to an expert', href: '/company/contact' },
    ]
  },
  {
    num: '02', name: 'START',
    desc: 'Register your company, get GST, protect your brand. Get it right from day one.',
    chips: [
      { label: 'Private Limited Company', href: '/services/private-limited-company-registration' },
      { label: 'LLP Registration', href: '/services/llp-registration' },
      { label: 'OPC Registration', href: '/services/opc-registration' },
      { label: 'GST Registration', href: '/services/gst-registration' },
      { label: 'Startup India / DPIIT', href: '/services/startup-india-dpiit' },
      { label: 'MSME / Udyam', href: '/services/msme-registration' },
      { label: 'Trademark Registration', href: '/services/trademark-registration' },
      { label: 'ISO Certification', href: '/services/iso-certification' },
    ]
  },
  {
    num: '03', name: 'BUILD',
    desc: 'Create your website, technology and brand identity. Build the digital foundation.',
    chips: [
      { label: 'Website Development', href: '/services/website-development' },
      { label: 'E-Commerce Website', href: '/services/ecommerce-website' },
      { label: 'Branding & Logo Design', href: '/services/branding-logo-design' },
      { label: 'Business Email & Hosting', href: '/services/business-email-hosting' },
      { label: 'Software & SaaS Development', href: '/services/software-saas-development' },
      { label: 'Business Automation', href: '/services/business-automation' },
    ]
  },
  {
    num: '04', name: 'MANAGE',
    desc: 'Stay compliant, handle accounting, payroll and legal needs. Keep your business running smoothly.',
    chips: [
      { label: 'Accounting & Bookkeeping', href: '/services/accounting' },
      { label: 'GST Filing & Returns', href: '/services/gst-registration' },
      { label: 'Income Tax Filing', href: '/services/income-tax-filing' },
      { label: 'ROC / Annual Compliance', href: '/services/roc-compliance' },
      { label: 'Payroll Management', href: '/services/payroll' },
      { label: 'Legal Document Support', href: '/services/legal-document-support' },
    ]
  },
  {
    num: '05', name: 'GROW',
    desc: 'Reach customers through marketing, SEO and automation. Grow your revenue.',
    chips: [
      { label: 'SEO & Performance Marketing', href: '/services/digital-marketing' },
      { label: 'Social Media Management', href: '/services/social-media-management' },
      { label: 'WhatsApp Business API', href: '/services/whatsapp-business-api' },
      { label: 'CRM & Lead Management', href: '/services/crm-setup-lead-management' },
      { label: 'Google Ads', href: '/services/google-ads-paid-marketing' },
    ]
  },
  {
    num: '06', name: 'EXPAND',
    desc: 'Raise funding, go international and scale strategically. Take your business to the next stage.',
    chips: [
      { label: 'International Company Setup', href: '/services/uae-business-setup' },
      { label: 'UAE Business Setup', href: '/services/uae-business-setup' },
      { label: 'Fundraising Documentation', href: '/services/fundraising-documentation' },
      { label: 'Business Consulting', href: '/services/business-consulting' },
      { label: 'Strategic Growth Support', href: '/services/business-consulting' },
    ]
  },
]

const SV_NODES = [
  { href: '/services/private-limited-company-registration', label: 'Company Registration', icon: 'M3 21h18M6 21V7l6-4 6 4v14' },
  { href: '/services/gst-registration', label: 'GST & Compliance', icon: 'M9 11l3 3L22 4' },
  { href: '/services/trademark-registration', label: 'Trademark & IP', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { href: '/services/website-development', label: 'Website Development', icon: 'M2 3h20v14H2zM8 21h8M12 17v4' },
  { href: '/services/digital-marketing', label: 'Marketing & SEO', icon: 'M23 6l-9.5 9.5-5-5L1 18' },
]

function LifecycleAccordion() {
  const STAGE_MS = 3200, RESUME_MS = 7000
  useEffect(() => {
    const items = document.querySelectorAll('.lc2-item')
    const lcSection = document.getElementById('lcSection')
    if (!items.length || !lcSection) return
    let activeIdx = 0, timer = null, resumeT = null, paused = false
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    function startProg(idx, bar) { if (!bar) return; bar.style.transition = 'none'; bar.style.width = '0%'; void bar.offsetWidth; bar.style.transition = `width ${STAGE_MS}ms linear`; bar.style.width = '100%' }
    function stopProg(idx, bar) { if (bar) { bar.style.transition = 'none'; bar.style.width = '0%' } }
    function openItem(idx) {
      items.forEach((item, i) => {
        const btn = item.querySelector('.lc2-trigger'), body = item.querySelector('.lc2-body'), prog = item.querySelector('.lc2-prog-bar')
        if (i === idx) { item.classList.add('lc2-open'); btn.setAttribute('aria-expanded','true'); body.style.maxHeight = body.scrollHeight + 'px'; if (!reduced) startProg(i, prog) }
        else { item.classList.remove('lc2-open'); btn.setAttribute('aria-expanded','false'); body.style.maxHeight = '0'; stopProg(i, prog) }
      })
      activeIdx = idx
    }
    function scheduleNext() { clearTimeout(timer); if (paused || reduced) return; timer = setTimeout(() => { openItem((activeIdx + 1) % items.length); scheduleNext() }, STAGE_MS) }
    items.forEach((item, i) => { const btn = item.querySelector('.lc2-trigger'); btn.addEventListener('click', () => { paused = true; clearTimeout(timer); clearTimeout(resumeT); openItem(i); resumeT = setTimeout(() => { paused = false; scheduleNext() }, RESUME_MS) }) })
    openItem(0)
    const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { scheduleNext(); obs.unobserve(e.target) } }) }, { threshold: 0.2 })
    obs.observe(lcSection)
    return () => { clearTimeout(timer); clearTimeout(resumeT); obs.disconnect() }
  }, [])

  return (
    <section className="lc2-section" id="lcSection">
      <div className="lc2-inner">
        <div className="lc2-left reveal-up">
          <span className="eyebrow">Your whole business journey</span>
          <h2 className="lc2-heading">One platform. Every stage.</h2>
          <p className="lc2-desc">Most businesses need support across every stage. LauncherDesk is built for all of them — from first idea to international expansion.</p>
          <a href="/company/contact" className="btn btn-primary">
            Find my starting point <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
        <div className="lc2-list reveal-up" id="lcList" role="list">
          {STAGES.map((stage, i) => (
            <div key={stage.num} className={`lc2-item${i === 0 ? ' lc2-open' : ''}`} role="listitem">
              <div className="lc2-prog"><div className="lc2-prog-bar" id={`lcProg${i}`}></div></div>
              <button className="lc2-trigger" aria-expanded={i === 0 ? 'true' : 'false'} aria-controls={`lcBody${i}`} id={`lcBtn${i}`}>
                <span className="lc2-num">{stage.num}</span>
                <span className="lc2-name">{stage.name}</span>
                <svg className="lc2-chevron" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
              </button>
              <div className="lc2-body" id={`lcBody${i}`} style={i === 0 ? {} : { maxHeight: 0 }} role="region" aria-labelledby={`lcBtn${i}`}>
                <div className="lc2-body-inner">
                  <p className="lc2-body-desc">{stage.desc}</p>
                  <div className="lc2-chips">
                    {stage.chips.map(c => <a key={c.label} className="lc2-chip" href={c.href}>{c.label}</a>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ConnectedServices() {
  useEffect(() => {
    const canvas = document.getElementById('svCanvas'), svgEl = document.getElementById('svSvg'), nodesEl = document.getElementById('svNodes')
    if (!canvas || !svgEl || !nodesEl) return
    const nodes = nodesEl.querySelectorAll('.sv-node'), N = nodes.length
    function placeNodes() {
      const W = canvas.offsetWidth || 800, H = canvas.offsetHeight || 520, cx = W/2, cy = H/2
      let rx = Math.min(W * 0.42, 320), ry = Math.min(H * 0.40, 200)
      const isMobile = W < 580, isTablet = W < 900, positions = []
      if (isMobile) {
        const cols = 2, nodeW = 148, nodeH = 42, gapX = 10, gapY = 12, rows = Math.ceil(N / cols), totalH = rows * (nodeH + gapY) - gapY, startY = cy - totalH / 2 + 90
        for (let i = 0; i < N; i++) { const col = i % cols, row = Math.floor(i / cols); positions.push({ x: cx + (col - 0.5) * (nodeW + gapX), y: startY + row * (nodeH + gapY) }) }
        canvas.style.height = (startY + totalH + 60) + 'px'
      } else {
        if (isTablet) { rx = W * 0.38; ry = H * 0.38 }
        for (let i = 0; i < N; i++) { const a = (i / N) * 2 * Math.PI - Math.PI / 2; positions.push({ x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) }) }
      }
      nodes.forEach((node, i) => { node.style.left = positions[i].x + 'px'; node.style.top = positions[i].y + 'px' })
      svgEl.setAttribute('viewBox', `0 0 ${W} ${H}`); svgEl.innerHTML = ''
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
      defs.innerHTML = '<linearGradient id="svGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#084C97"/><stop offset="100%" stop-color="#249AE2"/></linearGradient>'
      svgEl.appendChild(defs)
      nodes.forEach((node, i) => {
        const px = positions[i].x, py = positions[i].y, dx = px - cx, dy = py - cy, dist = Math.sqrt(dx*dx+dy*dy)
        const perpX = -dy/dist*dist*0.25, perpY = dx/dist*dist*0.25, cpx = (cx+px)/2+perpX, cpy = (cy+py)/2+perpY
        const d = `M${cx},${cy} Q${cpx},${cpy} ${px},${py}`
        const thread = document.createElementNS('http://www.w3.org/2000/svg', 'path'); thread.setAttribute('d',d); thread.setAttribute('class','sv-thread'); thread.style.animationDelay = (i*0.28)+'s'; svgEl.appendChild(thread)
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'path'); glow.setAttribute('d',d); glow.setAttribute('class','sv-thread-glow'); glow.setAttribute('pathLength','220'); glow.style.animationDelay = (i*0.35+0.6)+'s'; glow.style.animationDuration = (2.4+i*0.18)+'s'; svgEl.appendChild(glow)
      })
    }
    placeNodes(); let resizeT
    const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(placeNodes, 120) }
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize); clearTimeout(resizeT) }
  }, [])

  return (
    <section className="sv-section section">
      <div className="sv-inner">
        <div className="sv-head sec-head center reveal-up">
          <span className="eyebrow">One platform. Every service.</span>
          <h2 style={{ fontSize: 'clamp(22px,3.2vw,40px)', marginTop: 10 }}>Everything your business needs, coordinated for you.</h2>
          <p style={{ marginTop: 12, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>One team. One platform. Every service — from registration and compliance to technology, marketing and international expansion.</p>
        </div>
        <div className="sv-canvas reveal-up" id="svCanvas">
          <svg className="sv-svg" id="svSvg" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid meet" aria-hidden="true"></svg>
          <div className="sv-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            <div className="sv-center-brand">LauncherDesk</div>
            <div className="sv-center-sub">Business HQ</div>
          </div>
          <div className="sv-nodes" id="svNodes">
            {SV_NODES.map((n, i) => (
              <a key={i} className="sv-node" href={n.href}>
                <svg viewBox="0 0 24 24"><path d={n.icon}/></svg>
                {n.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// DOCX stats: "200+ Businesses Supported · 15+ Solution Categories · 1 Named Point of Contact · Bengaluru-based Team"
const LD_STATS = [
  { n: '20+', l: 'Businesses Launched' },
  { n: '15+', l: 'Service Categories' },
  { n: '1',   l: 'Point of Contact' },
  { n: 'BLR',  l: 'Bengaluru-based Team' },
]

function StatsSection() {
  return (
    <section className="section section-2">
      <div className="wrap">
        <div className="sec-head center reveal-up">
          <span className="eyebrow">Trusted by founders across India</span>
          <h2>Trusted by businesses across India.</h2>
        </div>
        <div className="proof reveal-up" style={{ marginTop: 34 }}>
          {LD_STATS.map(s => (
            <div key={s.n}>
              <div className="stat-n">{s.n}</div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="center reveal-up" style={{ marginTop: 28, display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['MSME Registered', 'Startup India Recognised', 'ISO 9001:2015 Certified'].map(b => (
            <span key={b} style={{ fontSize: 12.5, fontFamily: 'var(--font)', fontWeight: 700, padding: '6px 14px', borderRadius: 99, background: 'rgba(4,125,204,.08)', color: 'var(--blue-dark)', letterSpacing: '.03em' }}>{b}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function DifferenceSection() {
  return (
    <section className="section section-warm">
      <div className="wrap">
        <div className="sec-head reveal-up">
          <span className="eyebrow">The LauncherDesk difference</span>
          <h2>One desk beats five vendors.</h2>
          <p>The usual way means five vendors, five invoices, five logins — and nobody actually owns the outcome. LauncherDesk changes that.</p>
        </div>
        <div className="diff-grid reveal-up">
          <div className="diff-col neg">
            <h4>❌ Without LauncherDesk</h4>
            {[
              'Five vendors, five invoices, five logins',
              'Nobody actually owns the outcome',
              'You repeat your story to every consultant',
              'Deadlines slip through the cracks',
              'Multiple coordination headaches — every time',
            ].map(t => (
              <div key={t} className="diff-item">
                <svg className="diff-ic" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" width="16" height="16"><path d="M18 6 6 18M6 6l12 12"/></svg>
                <span>{t}</span>
              </div>
            ))}
          </div>
          <div className="diff-col pos">
            <h4>✅ With LauncherDesk</h4>
            {[
              'One point of contact for everything',
              'We coordinate across all services and professionals',
              'You tell us once — we handle the rest',
              'Proactive updates so nothing is missed',
              'One relationship that grows with your business',
            ].map(t => (
              <div key={t} className="diff-item">
                <svg className="diff-ic" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" width="16" height="16"><path d="M20 6 9 17l-5-5"/></svg>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="center" style={{ marginTop: 28 }}>
          <a href="/company/contact" className="btn btn-primary">Talk to LauncherDesk</a>
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    { n: '01', title: 'Tell us what you need.', body: 'One conversation with a single point of contact — no call centres, no runaround.' },
    { n: '02', title: 'Get a clear plan & quote.', body: 'Honest timelines and upfront pricing, so you always know what happens next.' },
    { n: '03', title: 'We handle the paperwork.', body: 'Filings, follow-ups and coordination across every service — done for you.' },
    { n: '04', title: 'Stay supported as you grow.', body: 'Ongoing compliance and support so nothing slips through the cracks.' },
  ]
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head center reveal-up">
          <span className="eyebrow">Simple from day one</span>
          <h2>One conversation. We take it from there.</h2>
        </div>
        <div className="steps3 reveal-up" style={{ marginTop: 36, gridTemplateColumns: 'repeat(4,1fr)', alignItems: 'stretch' }}>
          {steps.map(s => (
            <div key={s.n} className="hstep" style={{ paddingTop: 36, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ fontFamily: 'var(--font)', fontWeight: 800, fontSize: 15, color: 'var(--blue)', position: 'absolute', top: 0, left: 0 }}>{s.n}</div>
              <h3 style={{ fontSize: 18 }}>{s.title}</h3>
              <p style={{ flex: 1 }}>{s.body}</p>
              <div className="ln" style={{ marginTop: 'auto' }}></div>
            </div>
          ))}
        </div>
        <div className="center" style={{ marginTop: 32 }}>
          <a href="/company/contact" className="btn btn-primary">Get Started</a>
        </div>
      </div>
    </section>
  )
}

function PlatformRoadmapSection() {
  const features = [
    { label: 'Coming Soon', cls: 'soon', title: 'Business Dashboard', desc: 'See the full status of your business in one place.' },
    { label: 'Coming Soon', cls: 'soon', title: 'Compliance Calendar', desc: 'Stay ahead of GST, ROC, tax and renewal deadlines.' },
    { label: 'Coming Soon', cls: 'soon', title: 'Document Vault', desc: 'Store and access important business documents securely.' },
    { label: 'In Development', cls: 'dev', title: 'Service Tracking', desc: 'Know the real-time status of every request.' },
    { label: 'Future', cls: 'future', title: 'Business Marketplace', desc: 'Discover CRM, accounting, HRMS and marketing tools.' },
    { label: 'Future', cls: 'future', title: 'AI Business Assistant', desc: 'Get proactive guidance on what your business needs next.' },
  ]
  return (
    <section className="section section-2">
      <div className="wrap">
        <div className="sec-head reveal-up">
          <span className="eyebrow">We're building something bigger</span>
          <h2>LauncherDesk is evolving.</h2>
          <p>From a coordinated service team into a full technology platform for Indian businesses. One desk. A smarter business experience.</p>
        </div>
        <div className="roadmap-grid reveal-up">
          {features.map(f => (
            <div key={f.title} className="roadmap-card">
              <span className={`roadmap-badge ${f.cls}`}>{f.label}</span>
              <h3 style={{ fontSize: 16, marginBottom: 6 }}>{f.title}</h3>
              <p style={{ fontSize: 13.5, color: 'var(--text-2)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <style>{homepageStyles}</style>

      {/* HERO — DOCX H1: "Your Business HQ." Subheadline: "Launch. Manage. Grow. — from one desk." */}
      <header className="page-hero">
        <div className="wrap">
          <div className="hp-hero-grid">
            <div className="reveal-up in">
              <span className="eyebrow">For Startups · Small Businesses · Growing Companies</span>
              <h1>Register your company in days — <span className="grad-text">then run it all from one desk.</span></h1>
              <p className="lead">From Private Limited, LLP and OPC registration to GST, compliance, IT and finance — LauncherDesk gets your business incorporated and keeps it running, with a complete 360° solution through a single point of contact.</p>
              <div className="hero-cta">
                <a href="/company/contact" className="btn btn-primary">Chat on WhatsApp <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
                <a href="/services" className="btn btn-soft">Explore Services</a>
              </div>
              <div className="hp-trust-row">
                <div className="hp-trust-item">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  20+ businesses launched · 15+ service categories
                </div>
                <div className="hp-trust-item">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                  One point of contact
                </div>
              </div>
            </div>

            {/* Command Center visual */}
            <div className="cc reveal-up in">
              <div className="float float-1">
                <span className="fi fi-green"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg></span>
                <span><b>GST Filing</b><small>Completed on time</small></span>
              </div>
              <div className="float float-2">
                <span className="fi fi-amber"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>
                <span><b>Trademark</b><small>In progress</small></span>
              </div>
              <div className="cc-panel">
                <div className="cc-head">
                  <span className="t">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
                    Business HQ — Overview
                  </span>
                  <span className="cc-live"><span className="pd"></span> Active</span>
                </div>
                <div className="cc-health">
                  <div className="lbl">Business compliance health</div>
                  <div className="num" data-count="98">0<span>%</span></div>
                  <div className="cc-bar"><i data-fill="98"></i></div>
                </div>
                <div className="cc-metrics">
                  <div className="cc-metric"><div className="k">Compliance</div><div className="v ok"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Up to date</div></div>
                  <div className="cc-metric"><div className="k">Filings</div><div className="v pr"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg> 3 due soon</div></div>
                  <div className="cc-metric"><div className="k">Services</div><div className="v inf"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> 6 active</div></div>
                  <div className="cc-metric"><div className="k">Advisor</div><div className="v ok"><svg viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Available</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SOLUTIONS OVERVIEW */}
      <section className="section-sm">
        <div className="wrap">
          <div className="sec-head center reveal-up">
            <span className="eyebrow">Register your business</span>
            <h2>Incorporation is just the start. We run the whole business.</h2>
          </div>
          <div className="grid-3" style={{ marginTop: 36 }}>
            <a className="card reveal-up" href="/services/private-limited-company-registration">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M6 21V7l6-4 6 4v14M10 9h4M10 13h4"/></svg></div>
              <h3>Company Registration</h3>
              <p>Private Limited, LLP and OPC options. Private Limited is India's most popular structure for funded, high-growth startups.</p>
              <span className="arrow">Explore START →</span>
            </a>
            <a className="card reveal-up" href="/services/website-development">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h20v14H2zM8 21h8M12 17v4"/></svg></div>
              <h3>Licences & Certifications</h3>
              <p>GST, MSME, FSSAI, Startup India, ISO and all the registrations your business needs.</p>
              <span className="arrow">Explore BUILD →</span>
            </a>
            <a className="card reveal-up" href="/services/accounting">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div>
              <h3>Finance & Accounts</h3>
              <p>Accounting, bookkeeping, GST returns, payroll and annual compliance — handled monthly.</p>
              <span className="arrow">Explore MANAGE →</span>
            </a>
            <a className="card reveal-up" href="/services/digital-marketing">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 6l-9.5 9.5-5-5L1 18"/></svg></div>
              <h3>Tax & Compliance</h3>
              <p>ROC filing, income tax, GST compliance — tracked and filed before deadlines become penalties.</p>
              <span className="arrow">Explore GROW →</span>
            </a>
            <a className="card reveal-up" href="/services/uae-business-setup">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20"/></svg></div>
              <h3>IT & Technology</h3>
              <p>Website, e-commerce, mobile apps, CRM, automation and custom software.</p>
              <span className="arrow">Explore EXPAND →</span>
            </a>
            <a className="card reveal-up" href="/company/contact">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
              <h3>Sales & Marketing</h3>
              <p>SEO, social media, Google Ads, WhatsApp API, branding and demand generation.</p>
              <span className="arrow">Talk to us →</span>
            </a>
          </div>
        </div>
      </section>

      {/* LIFECYCLE ACCORDION */}
      <LifecycleAccordion />

      {/* DIFFERENCE */}
      <DifferenceSection />

      {/* HOW IT WORKS */}
      <HowItWorksSection />

      {/* CONNECTED SERVICES VISUAL */}
      <ConnectedServices />

      {/* STATS / TRUST */}
      <StatsSection />

      {/* PLATFORM ROADMAP */}
      <PlatformRoadmapSection />

      {/* FINAL CTA */}
      <section className="section">
        <div className="wrap">
          <div className="final reveal-up">
            <h2>Ready to get everything under one roof?</h2>
            <p>One chat is all it takes. Tell us what you need and we'll handle the rest — honestly, and on time.</p>
            <div className="row">
              <a href="https://wa.me/918458845859?text=Hi%20LauncherDesk%2C%20I'd%20like%20to%20get%20help%20with%20my%20business.%20Where%20do%20I%20start%3F" className="btn btn-light">Chat on WhatsApp</a>
              <a href="tel:+918458845859" className="btn btn-ghost-d">Call Us — +91 84588 45859</a>
              <a href="/company/contact" className="btn btn-ghost-d">Get Started Online</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}