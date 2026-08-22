import { useEffect } from 'react'

/* ── Homepage-specific inline styles (from index.html <style> block) ── */
const homepageStyles = `
.lc2-section{background:var(--bg-warm);padding:88px 0}
.lc2-inner{display:grid;grid-template-columns:1fr 1.15fr;gap:72px;align-items:start;max-width:1200px;margin:0 auto;padding:0 28px}
.lc2-left{position:sticky;top:92px}
.lc2-left .eyebrow{margin-bottom:14px;display:block}
.lc2-heading{font-size:clamp(30px,3.4vw,44px);font-weight:800;letter-spacing:-.03em;line-height:1.08;margin-bottom:18px}
.lc2-desc{font-size:16px;color:var(--text-2);line-height:1.7;max-width:360px;margin-bottom:28px}
.lc2-list{display:flex;flex-direction:column}
.lc2-item{border-top:1px solid var(--line);overflow:hidden}
.lc2-item:last-child{border-bottom:1px solid var(--line)}
.lc2-trigger{width:100%;background:none;border:0;cursor:pointer;display:grid;grid-template-columns:44px 1fr 28px;align-items:center;gap:12px;padding:20px 4px;text-align:left;transition:background .15s;border-radius:0}
.lc2-trigger:hover{background:rgba(4,125,204,.04)}
.lc2-trigger:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
.lc2-num{font-family:var(--font);font-weight:800;font-size:14px;color:var(--blue-dark);opacity:.45;transition:opacity .25s,color .25s;line-height:1}
.lc2-name{font-family:var(--font);font-weight:700;font-size:21px;color:var(--navy);transition:color .25s;line-height:1}
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
@media(max-width:900px){.lc2-inner{grid-template-columns:1fr;gap:36px}.lc2-left{position:static}.lc2-heading{font-size:clamp(26px,5vw,36px)}}
.sv-section{padding:88px 0;background:var(--bg);overflow:hidden;position:relative}
.sv-inner{max-width:1200px;margin:0 auto;padding:0 28px}
.sv-head{text-align:center;margin-bottom:52px}
.sv-wrap{position:relative;display:flex;justify-content:center;align-items:center}
.sv-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible}
.sv-center{position:relative;z-index:3;width:160px;height:160px;border-radius:50%;background:linear-gradient(135deg,#0b1f36,#1F3C5C);border:2px solid rgba(36,154,226,.35);box-shadow:0 0 0 12px rgba(4,125,204,.07),0 0 0 26px rgba(4,125,204,.04),0 20px 50px rgba(8,76,151,.3);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;flex:none}
.sv-center-brand{font-family:var(--font);font-weight:800;font-size:15px;color:#fff;letter-spacing:-.01em;line-height:1.2}
.sv-center-sub{font-size:10px;color:#7ecef4;margin-top:3px;font-family:var(--font);font-weight:600;letter-spacing:.04em;text-transform:uppercase}
.sv-center::before,.sv-center::after{content:"";position:absolute;inset:-16px;border-radius:50%;border:1px solid rgba(36,154,226,.18);animation:svPulse 3.2s ease-in-out infinite}
.sv-center::after{inset:-30px;animation-delay:1.6s}
@keyframes svPulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.15;transform:scale(1.04)}}
.sv-nodes{position:absolute;inset:0;pointer-events:none}
.sv-node{position:absolute;transform:translate(-50%,-50%);pointer-events:auto;display:flex;align-items:center;gap:8px;font-family:var(--font);font-weight:600;font-size:13px;color:var(--navy);background:#fff;border:1.5px solid var(--line);border-radius:99px;padding:9px 16px;box-shadow:var(--sh-sm);cursor:pointer;text-decoration:none;transition:border-color .18s,box-shadow .18s,transform .18s,background .18s,color .18s;white-space:nowrap;z-index:3}
.sv-node svg{width:15px;height:15px;stroke:var(--blue-dark);fill:none;stroke-width:2;flex:none;transition:stroke .18s}
.sv-node:hover{border-color:var(--blue);color:var(--blue-dark);box-shadow:0 6px 20px rgba(4,125,204,.2);transform:translate(-50%,-50%) translateY(-3px);background:rgba(4,125,204,.04)}
.sv-node:hover svg{stroke:var(--blue)}
.sv-thread{stroke:var(--blue);fill:none;stroke-width:1.5;stroke-dasharray:5 6;opacity:.22;animation:svDash 2.2s linear infinite}
.sv-thread-glow{stroke:var(--blue-bright);fill:none;stroke-width:2.5;opacity:0;stroke-dasharray:20 200;stroke-dashoffset:0;animation:svGlowPulse 2.8s ease-in-out infinite}
@keyframes svDash{to{stroke-dashoffset:-44}}
@keyframes svGlowPulse{0%{opacity:0;stroke-dashoffset:0}30%{opacity:.55}70%{opacity:.4}100%{opacity:0;stroke-dashoffset:-220}}
.sv-canvas{position:relative;width:100%;height:520px}
@media(max-width:900px){.sv-canvas{height:680px}.sv-center{width:120px;height:120px}.sv-center-brand{font-size:12px}}
@media(max-width:560px){.sv-canvas{height:900px}.sv-node{font-size:12px;padding:7px 12px}}
@media(prefers-reduced-motion:reduce){.sv-thread,.sv-thread-glow,.sv-center::before,.sv-center::after{animation:none!important}.lc2-prog-bar{transition:none!important}}
.stat-n{font-family:var(--font);font-weight:800;font-size:clamp(32px,3.6vw,48px);letter-spacing:-.03em;color:var(--navy)}
.stat-l{font-size:14px;color:var(--text-2);margin-top:2px}
.stat-pending{font-size:11.5px;color:var(--blue-dark);margin-top:4px;opacity:.7;font-family:var(--font);font-weight:600}
`

/* ── Lifecycle accordion stages ── */
const STAGES = [
  {
    num: '01', name: 'Start',
    desc: 'Choose the right structure from day one — it shapes liability, funding and how you operate for years.',
    chips: [
      { label: 'Private Limited', href: '/services/private-limited-company-registration' },
      { label: 'LLP', href: '/services/llp-registration' },
      { label: 'OPC', href: '/services/opc-registration' },
      { label: 'Partnership', href: '/services/partnership-registration' },
      { label: 'Section 8 / NGO', href: '/services' },
      { label: 'Dubai Setup', href: '/services' },
    ]
  },
  {
    num: '02', name: 'Structure',
    desc: 'All the registrations, licences and certifications that make your business legally operational.',
    chips: [
      { label: 'GST Registration', href: '/services/gst-registration' },
      { label: 'MSME / Udyam', href: '/services/msme-registration' },
      { label: 'FSSAI', href: '/services/fssai-registration' },
      { label: 'IEC', href: '/services' },
      { label: 'Trade Licence', href: '/services' },
      { label: 'ISO Certification', href: '/services' },
    ]
  },
  {
    num: '03', name: 'Protect',
    desc: 'Secure your brand, IP and legal agreements before competitors or disputes appear.',
    chips: [
      { label: 'Trademark', href: '/services/trademark-registration' },
      { label: 'Copyright', href: '/services' },
      { label: 'Patent', href: '/services' },
      { label: 'Trademark Objection', href: '/services' },
      { label: 'IP Management', href: '/services' },
    ]
  },
  {
    num: '04', name: 'Manage',
    desc: 'Books, payroll and filings handled proactively — so a missed deadline never becomes a penalty.',
    chips: [
      { label: 'Accounting', href: '/services/accounting' },
      { label: 'Payroll', href: '/services/payroll' },
      { label: 'ROC Filing', href: '/services/roc-compliance' },
      { label: 'GST Returns', href: '/services/gst-registration' },
      { label: 'Income Tax', href: '/services/accounting' },
      { label: 'Virtual CFO', href: '/services/accounting' },
    ]
  },
  {
    num: '05', name: 'Grow',
    desc: 'Website, CRM, marketing and automation systems that attract and retain customers at scale.',
    chips: [
      { label: 'Website Development', href: '/services' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'SEO', href: '/services/digital-marketing' },
      { label: 'WhatsApp Marketing', href: '/services/digital-marketing' },
      { label: 'Lead Generation', href: '/services/digital-marketing' },
      { label: 'CRM Setup', href: '/services/digital-marketing' },
    ]
  },
  {
    num: '06', name: 'Scale',
    desc: 'Automation, IT infrastructure and international expansion to take your business to the next level.',
    chips: [
      { label: 'Business Automation', href: '/services/business-automation' },
      { label: 'IT Solutions', href: '/services/business-automation' },
      { label: 'Funding Readiness', href: '/solutions/advisory' },
      { label: 'Advisory', href: '/solutions/advisory' },
      { label: 'Overseas Setup', href: '/services' },
      { label: 'Global Payroll', href: '/services' },
    ]
  },
]

/* ── Connected services nodes ── */
const SV_NODES = [
  { href: '/services/private-limited-company-registration', label: 'Business Registration', icon: 'M3 21h18M6 21V7l6-4 6 4v14' },
  { href: '/services/gst-registration', label: 'GST & Compliance', icon: 'M9 11l3 3L22 4' },
  { href: '/services/accounting', label: 'Accounting & Tax', icon: 'M3 3v18h18M7 14l4-4 3 3 5-6' },
  { href: '/services/trademark-registration', label: 'Trademark & IP', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { href: '/services', label: 'IT Services', icon: 'M2 3h20v14H2zM8 21h8M12 17v4' },
  { href: '/services', label: 'Website Development', icon: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z' },
  { href: '/services/digital-marketing', label: 'Marketing & Growth', icon: 'M23 6l-9.5 9.5-5-5L1 18' },
  { href: '/office-restore', label: 'Office Setup', icon: 'M3 21h18M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14M9 21v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4' },
]



/* ── Lifecycle Accordion (React-controlled) ── */
function LifecycleAccordion() {
  const STAGE_MS = 3200
  const RESUME_MS = 7000

  useEffect(() => {
    const items = document.querySelectorAll('.lc2-item')
    const lcSection = document.getElementById('lcSection')
    if (!items.length || !lcSection) return

    let activeIdx = 0
    let timer = null
    let resumeT = null
    let paused = false
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches

    function startProg(idx, bar) {
      if (!bar) return
      bar.style.transition = 'none'
      bar.style.width = '0%'
      void bar.offsetWidth
      bar.style.transition = `width ${STAGE_MS}ms linear`
      bar.style.width = '100%'
    }
    function stopProg(idx, bar) {
      if (bar) { bar.style.transition = 'none'; bar.style.width = '0%' }
    }

    function openItem(idx) {
      items.forEach((item, i) => {
        const btn = item.querySelector('.lc2-trigger')
        const body = item.querySelector('.lc2-body')
        const prog = item.querySelector('.lc2-prog-bar')
        if (i === idx) {
          item.classList.add('lc2-open')
          btn.setAttribute('aria-expanded', 'true')
          body.style.maxHeight = body.scrollHeight + 'px'
          if (!reduced) startProg(i, prog)
        } else {
          item.classList.remove('lc2-open')
          btn.setAttribute('aria-expanded', 'false')
          body.style.maxHeight = '0'
          stopProg(i, prog)
        }
      })
      activeIdx = idx
    }

    function scheduleNext() {
      clearTimeout(timer)
      if (paused || reduced) return
      timer = setTimeout(() => {
        const next = (activeIdx + 1) % items.length
        openItem(next)
        scheduleNext()
      }, STAGE_MS)
    }

    items.forEach((item, i) => {
      const btn = item.querySelector('.lc2-trigger')
      btn.addEventListener('click', () => {
        paused = true
        clearTimeout(timer)
        clearTimeout(resumeT)
        openItem(i)
        resumeT = setTimeout(() => { paused = false; scheduleNext() }, RESUME_MS)
      })
    })

    openItem(0)

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { scheduleNext(); obs.unobserve(e.target) } })
    }, { threshold: 0.2 })
    obs.observe(lcSection)

    return () => { clearTimeout(timer); clearTimeout(resumeT); obs.disconnect() }
  }, [])

  return (
    <section className="lc2-section" id="lcSection">
      <div className="lc2-inner">
        <div className="lc2-left reveal-up">
          <span className="eyebrow">The whole lifecycle</span>
          <h2 className="lc2-heading">One partner. Every stage of business.</h2>
          <p className="lc2-desc">From first idea to full-scale expansion — one team, one dashboard, one point of contact.</p>
          <a href="/services" className="btn btn-primary">
            Browse all services <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
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

/* ── Connected Services Visualization ── */
function ConnectedServices() {
  useEffect(() => {
    const canvas = document.getElementById('svCanvas')
    const svgEl = document.getElementById('svSvg')
    const nodesEl = document.getElementById('svNodes')
    if (!canvas || !svgEl || !nodesEl) return

    const nodes = nodesEl.querySelectorAll('.sv-node')
    const N = nodes.length

    function placeNodes() {
      const W = canvas.offsetWidth || 800
      const H = canvas.offsetHeight || 520
      const cx = W / 2, cy = H / 2
      let rx = Math.min(W * 0.42, 320)
      let ry = Math.min(H * 0.40, 200)
      const isMobile = W < 580
      const isTablet = W < 900
      const positions = []

      if (isMobile) {
        const cols = 2, nodeW = 148, nodeH = 42, gapX = 10, gapY = 12
        const rows = Math.ceil(N / cols)
        const totalH = rows * (nodeH + gapY) - gapY
        const startY = cy - totalH / 2 + 90
        for (let i = 0; i < N; i++) {
          const col = i % cols, row = Math.floor(i / cols)
          positions.push({ x: cx + (col - 0.5) * (nodeW + gapX), y: startY + row * (nodeH + gapY) })
        }
        canvas.style.height = (startY + totalH + 60) + 'px'
      } else {
        if (isTablet) { rx = W * 0.38; ry = H * 0.38 }
        for (let i = 0; i < N; i++) {
          const a = (i / N) * 2 * Math.PI - Math.PI / 2
          positions.push({ x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) })
        }
      }

      nodes.forEach((node, i) => {
        node.style.left = positions[i].x + 'px'
        node.style.top = positions[i].y + 'px'
      })

      svgEl.setAttribute('viewBox', `0 0 ${W} ${H}`)
      svgEl.innerHTML = ''
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
      defs.innerHTML = '<linearGradient id="svGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#084C97"/><stop offset="100%" stop-color="#249AE2"/></linearGradient>'
      svgEl.appendChild(defs)

      nodes.forEach((node, i) => {
        const px = positions[i].x, py = positions[i].y
        const dx = px - cx, dy = py - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const perpX = -dy / dist * dist * 0.25
        const perpY = dx / dist * dist * 0.25
        const cpx = (cx + px) / 2 + perpX
        const cpy = (cy + py) / 2 + perpY
        const d = `M${cx},${cy} Q${cpx},${cpy} ${px},${py}`

        const thread = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        thread.setAttribute('d', d)
        thread.setAttribute('class', 'sv-thread')
        thread.style.animationDelay = (i * 0.28) + 's'
        svgEl.appendChild(thread)

        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        glow.setAttribute('d', d)
        glow.setAttribute('class', 'sv-thread-glow')
        glow.setAttribute('pathLength', '220')
        glow.style.animationDelay = (i * 0.35 + 0.6) + 's'
        glow.style.animationDuration = (2.4 + i * 0.18) + 's'
        svgEl.appendChild(glow)
      })
    }

    placeNodes()
    let resizeT
    const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(placeNodes, 120) }
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize); clearTimeout(resizeT) }
  }, [])

  return (
    <section className="sv-section section">
      <div className="sv-inner">
        <div className="sv-head sec-head center reveal-up">
          <span className="eyebrow">One platform. Every service.</span>
          <h2 style={{ fontSize: 'clamp(26px,3.2vw,40px)', marginTop: 10 }}>LauncherDesk connects your entire business.</h2>
          <p style={{ marginTop: 12, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>Every service, every category — accessible from a single accountable partner.</p>
        </div>
        <div className="sv-canvas reveal-up" id="svCanvas">
          <svg className="sv-svg" id="svSvg" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid meet" aria-hidden="true"></svg>
          <div className="sv-center" id="svCenter" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            <div className="sv-center-brand">LauncherDesk</div>
            <div className="sv-center-sub">Business Platform</div>
          </div>
          <div className="sv-nodes" id="svNodes">
            {SV_NODES.map((n, i) => (
              <a key={i} className="sv-node" href={n.href} data-sv-idx={i}>
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

/* ── Stats Section ── */
const LD_STATS = { businesses: '500+', services: '2,000+', cities: '25+', years: '8+' }
const STAT_LABELS = { businesses: 'Businesses served', services: 'Services delivered', cities: 'Cities covered', years: 'Years of experience' }

function StatsSection() {
  const hasStats = !!LD_STATS
  return (
    <section className="section section-2" id="statsSection">
      <div className="wrap">
        <div className="sec-head reveal-up">
          <span className="eyebrow">Proof, not promises</span>
          <h2>Built on real numbers.</h2>
        </div>
        <div className="proof reveal-up" style={{ marginTop: 34 }} id="statsGrid">
          {hasStats
            ? Object.entries(LD_STATS).map(([k, v]) => (
                <div key={k}>
                  <div className="stat-n">{v}</div>
                  <div className="stat-l">{STAT_LABELS[k]}</div>
                </div>
              ))
            : Object.keys(STAT_LABELS).map(k => (
                <div key={k}>
                  <div className="stat-n" style={{ fontSize: 28, color: 'var(--text-3)', opacity: 0.35 }}>—</div>
                  <div className="stat-l">{STAT_LABELS[k]}</div>
                  <div className="stat-pending">Coming soon</div>
                </div>
              ))
          }
        </div>
      </div>
    </section>
  )
}



export default function HomePage() {
  return (
    <>
      <style>{homepageStyles}</style>

      {/* HERO */}
      <header className="page-hero">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1.02fr .98fr', gap: 52, alignItems: 'center' }}>
          <div className="reveal-up in">
            <span className="eyebrow">One desk · Every stage</span>
            <h1>Everything your business needs. <span className="grad-text">From first idea to full-scale growth.</span></h1>
            <p className="lead">Start, structure, comply, protect and grow — with one accountable partner instead of five vendors. Tell us what you're building and we'll show you exactly what comes next.</p>
            <div className="hero-cta">
              <a href="/services#finder" className="btn btn-primary">Get Started <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
              <a href="/company/contact" className="btn btn-soft">Talk to an Expert</a>
              <a href="/services" className="btn btn-quiet">Explore Services →</a>
            </div>
            <div style={{ display: 'flex', gap: 22, marginTop: 28, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--text-2)' }}>
                <svg style={{ width: 17, height: 17, stroke: 'var(--blue)' }} viewBox="0 0 24 24" fill="none" strokeWidth="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Transparent, unbundled pricing
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--text-2)' }}>
                <svg style={{ width: 17, height: 17, stroke: 'var(--blue)' }} viewBox="0 0 24 24" fill="none" strokeWidth="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                Support that continues after you pay
              </div>
            </div>
          </div>

          {/* Command Center Card */}
          <div className="cc reveal-up in">
            <div className="float float-1">
              <span className="fi fi-green"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg></span>
              <span><b>GST Filing</b><small>Completed</small></span>
            </div>
            <div className="float float-2">
              <span className="fi fi-amber"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>
              <span><b>Trademark</b><small>In progress</small></span>
            </div>
            <div className="cc-panel">
              <div className="cc-head">
                <span className="t">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
                  Business Command Center
                </span>
                <span className="cc-live"><span className="pd"></span> Live</span>
              </div>
              <div className="cc-health">
                <div className="lbl">Business health</div>
                <div className="num" data-count="98">0<span>%</span></div>
                <div className="cc-bar"><i data-fill="98"></i></div>
              </div>
              <div className="cc-metrics">
                <div className="cc-metric"><div className="k">Compliance</div><div className="v ok"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Up to date</div></div>
                <div className="cc-metric"><div className="k">Tasks</div><div className="v pr"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg> 3 due</div></div>
                <div className="cc-metric"><div className="k">Services</div><div className="v inf"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> 6 active</div></div>
                <div className="cc-metric"><div className="k">Advisor</div><div className="v ok"><svg viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Available</div></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* WHAT WE DO */}
      <section className="section-sm">
        <div className="wrap sec-head center reveal-up">
          <span className="eyebrow">What LauncherDesk does</span>
          <h2 style={{ fontSize: 'clamp(24px,3vw,36px)' }}>We replace the scramble of managing a CA, a lawyer, a registration agent and an agency — with one team and one dashboard.</h2>
        </div>
      </section>

      {/* LIFECYCLE ACCORDION */}
      <LifecycleAccordion />

      {/* CONNECTED SERVICES */}
      <ConnectedServices />

      {/* WHERE TO START */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal-up"><span className="eyebrow">Where to start</span><h2>Pick the area you need help with.</h2></div>
          <div className="grid-3 svc-cats" style={{ marginTop: 36 }}>
            <a className="card reveal-up" href="/services/private-limited-company-registration">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M6 21V7l6-4 6 4v14M10 9h4M10 13h4"/></svg></div>
              <h3>Start your business</h3>
              <p>Incorporate the right entity, structured for how you'll actually operate.</p>
              <span className="arrow">Explore →</span>
            </a>
            <a className="card reveal-up" href="/services/gst-registration">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div>
              <h3>Registrations &amp; compliance</h3>
              <p>GST, licences, ROC and tax filings handled proactively — no penalties.</p>
              <span className="arrow">Explore →</span>
            </a>
            <a className="card reveal-up" href="/services/trademark-registration">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <h3>Protect &amp; grow</h3>
              <p>Trademark and IP, plus the website, CRM and marketing to scale.</p>
              <span className="arrow">Explore →</span>
            </a>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="section section-dark">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow" style={{ color: '#7fb4dc' }}>The product behind the service</span>
            <h2>One business. One operating view.</h2>
            <p>Every registration, deadline, document and advisor conversation in a single place.</p>
          </div>
          <div className="dash reveal-up">
            <div className="dash-top"><span className="dots"><i></i><i></i><i></i></span> app.launcherdesk.com / overview</div>
            <div className="dash-body">
              <div className="dash-cell">
                <div className="k">Business overview</div>
                <div className="dash-list">
                  <div className="row"><b>Incorporation</b><span className="tag g">Complete</span></div>
                  <div className="row"><b>GST</b><span className="tag g">Active</span></div>
                  <div className="row"><b>Trademark</b><span className="tag a">In progress</span></div>
                  <div className="row"><b>Annual compliance</b><span className="tag b">3 tasks</span></div>
                </div>
              </div>
              <div className="dash-cell">
                <div className="k">Documents secured</div>
                <div className="big" data-count="24">0</div>
                <div className="v inf" style={{ marginTop: 12 }}>
                  <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Encrypted vault
                </div>
              </div>
              <div className="dash-cell">
                <div className="k">Next deadline</div>
                <div className="v pr" style={{ marginTop: 8 }}>
                  <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  GST — 12 days
                </div>
                <div className="k" style={{ marginTop: 20 }}>AI manager</div>
                <div className="v inf" style={{ marginTop: 8 }}>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10z"/></svg>
                  Online
                </div>
              </div>
            </div>
          </div>
          <div className="center" style={{ marginTop: 30, position: 'relative' }}>
            <a href="/ai" className="btn btn-light">See how LauncherDesk AI works →</a>
          </div>
        </div>
      </section>

      {/* WHY SWITCH */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">Why founders switch</span>
            <h2>Stop managing five different vendors.</h2>
            <p>One team, one dashboard, one point of contact — and we stay on long after the paperwork is filed.</p>
          </div>
          <div className="grid-3" style={{ marginTop: 34 }}>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <h3>One accountable partner</h3>
              <p>Every stage of your business under one roof — no finger-pointing between vendors.</p>
            </div>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></div>
              <h3>Transparent pricing</h3>
              <p>Professional fee, government fee and taxes shown separately. No surprises.</p>
            </div>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div>
              <h3>Proactive compliance</h3>
              <p>We watch the deadlines so a missed filing never becomes a penalty.</p>
            </div>
          </div>
          <div className="center" style={{ marginTop: 28 }}>
            <a href="/company/why-launcherdesk" className="btn btn-quiet">Why LauncherDesk →</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <StatsSection />

      {/* FINAL CTA */}
      <section className="section">
        <div className="wrap">
          <div className="final reveal-up">
            <h2>Tell us about your business.</h2>
            <p>We'll tell you exactly what you need — and take it off your plate.</p>
            <div className="row">
              <a href="/services#finder" className="btn btn-light">Get Started</a>
              <a href="/company/contact" className="btn btn-ghost-d">Talk to an Expert</a>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
