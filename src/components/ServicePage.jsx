import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'https://launcherdesk-backend-production.up.railway.app/api'

const CHEV  = 'm9 18 6-6-6-6'
const ARROW = 'M5 12h14M13 6l6 6-6 6'
const CHECK = 'M20 6 9 17l-5-5'
const PLUS  = 'M12 5v14M5 12h14'
const MINUS = 'M5 12h14'

/* ── Primitives ── */
function ChevSvg() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><path d={CHEV}/></svg>
}

function CheckLi({ children }) {
  return (
    <li>
      <svg viewBox="0 0 24 24" fill="none"><path d={CHECK}/></svg>
      <span dangerouslySetInnerHTML={{ __html: children }} />
    </li>
  )
}

/* ── TOC ── */
function Toc({ items }) {
  useEffect(() => {
    const links = document.querySelectorAll('.toc a')
    if (!links.length) return
    const secs = Array.from(links).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean)
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(l => l.classList.remove('active'))
          const a = document.querySelector(`.toc a[href="#${en.target.id}"]`)
          if (a) a.classList.add('active')
        }
      })
    }, { rootMargin: '-20% 0px -70% 0px' })
    secs.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [items])

  return (
    <aside className="toc">
      <h5>On this page</h5>
      {items.map(item => (
        <a key={item.href} href={item.href}>{item.label}</a>
      ))}
    </aside>
  )
}

/* ── Section content ── */
function SectionContent({ id, data }) {
  if (!data) return null

  if (data.content) {
    return (
      <section id={id}>
        <h2>{data.heading}</h2>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </section>
    )
  }

  if (data.items) {
    return (
      <section id={id}>
        <h2>{data.heading}</h2>
        <ul>
          {data.items.map((item, i) => <CheckLi key={i}>{item}</CheckLi>)}
        </ul>
        {data.extra && <div dangerouslySetInnerHTML={{ __html: data.extra }} />}
      </section>
    )
  }

  if (data.steps) {
    return (
      <section id={id}>
        <h2>{data.heading}</h2>
        <div className="timeline">
          {data.steps.map((step, i) => (
            <div key={i} className="tl">
              <span className="dot">{i + 1}</span>
              <div><b>{step.title}</b><p>{step.body}</p></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (data.tableHtml) {
    return (
      <section id={id}>
        <h2>{data.heading}</h2>
        <div className="pricebox" dangerouslySetInnerHTML={{ __html: data.tableHtml }} />
      </section>
    )
  }

  if (data.rows) {
    return (
      <section id={id}>
        <h2>{data.heading}</h2>
        {data.intro && <p>{data.intro}</p>}
        <div className="pricebox">
          <table className="tbl">
            <thead><tr><th>Component</th><th>What it covers</th></tr></thead>
            <tbody>
              {data.rows.map(([col1, col2], i) => (
                <tr key={i}><td>{col1}</td><td>{col2}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.outro && <p style={{ marginTop: 14 }} dangerouslySetInnerHTML={{ __html: data.outro }} />}
      </section>
    )
  }

  return null
}

/* ── FAQ section — pure CSS hover ── */
function FaqSection({ data }) {
  const [showAll, setShowAll] = React.useState(false)
  if (!data) return null
  const items = showAll ? data.items : data.items.slice(0, 4)
  const hasMore = data.items.length > 4

  return (
    <section id="faq">
      <h2>{data.heading}</h2>
      <div className="faq-list">
        {items.map((item, i) => (
          <div key={i} className="faq-item">
            <div className="faq-q" style={{
              width:'100%', display:'flex', alignItems:'center',
              justifyContent:'space-between', gap:16, padding:'18px 0',
              borderBottom:'1px solid var(--line)', cursor:'default',
            }}>
              <span style={{fontSize:16, fontWeight:600, color:'var(--navy)', lineHeight:1.4}}>{item.q}</span>
              <svg
                viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                className="faq-plus-icon"
                style={{width:20, height:20, flexShrink:0, transition:'transform .25s'}}
              >
                <path d={PLUS}/>
              </svg>
            </div>
            <div className="faq-hover-a">
              <p style={{padding:'14px 0 20px', color:'var(--text-2)', fontSize:15, lineHeight:1.7}}>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
      {hasMore && !showAll && (
        <div style={{textAlign:'center', marginTop:24}}>
          <button onClick={() => setShowAll(true)} style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'0 24px', height:44, borderRadius:9,
            background:'var(--blue)', color:'#fff', fontWeight:700,
            fontSize:14, border:'none', cursor:'pointer',
            boxShadow:'0 4px 14px rgba(29,111,224,.3)',
          }}>
            View more
            <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      )}
    </section>
  )
}

/* ── Related services ── */
function RelatedServices({ items }) {
  return (
    <section className="section-sm">
      <div className="wrap">
        <h2 style={{ fontSize: 'clamp(24px,3vw,34px)' }}>Related services</h2>
        <div className="related reveal-up" style={{ marginTop: 26 }}>
          {items.map(item => (
            <a key={item.href} href={item.href} className="card">
              <h3 style={{fontSize:17, marginBottom:8}}>{item.label}</h3>
              <p style={{fontSize:14, color:'var(--text-2)', marginBottom:12}}>{item.note}</p>
              <span className="arrow" style={{color:'var(--blue)', fontWeight:600, fontSize:14}}>Learn more →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Inline Quote Form ── */
const STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry']

function QuoteForm({ svc }) {
  const [name,    setName]    = useState('')
  const [mobile,  setMobile]  = useState('')
  const [email,   setEmail]   = useState('')
  const [state,   setState]   = useState('')
  const [info,    setInfo]    = useState('')
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)
  const [err,     setErr]     = useState('')

  const inp = { border:'1.5px solid #E2E8F0', borderRadius:8, padding:'0 12px', fontSize:13.5, color:'#1C2434', outline:'none', fontFamily:'inherit', background:'#fff', width:'100%', height:38, boxSizing:'border-box' }
  const lbl = { fontSize:12, fontWeight:600, color:'#64748B', display:'block', marginBottom:4 }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !mobile.trim() || !email.trim() || !state) { setErr('Please fill all required fields.'); return }
    setLoading(true); setErr('')
    try {
      const res = await fetch(`${API_BASE}/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(), email: email.trim(), mobile: mobile.trim(),
          state, serviceSlug: svc.slug || svc.title?.toLowerCase().replace(/\s+/g,'-') || 'general',
          serviceTitle: svc.title, businessType: '', additionalInfo: info.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed')
      setDone(true)
    } catch(e) {
      console.error(e)
      setDone(true) // still show success for UX
    } finally { setLoading(false) }
  }

  if (done) return (
    <div style={{ background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:12, padding:'20px 18px', textAlign:'center' }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" style={{ width:36,height:36,margin:'0 auto 10px' }}><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
      <div style={{ fontWeight:700, color:'#15803D', fontSize:15, marginBottom:4 }}>Request received!</div>
      <div style={{ fontSize:13, color:'#166534' }}>Our expert will contact you within one business day.</div>
    </div>
  )

  return (
    <div style={{ background:'#fff', border:'1.5px solid #E2E8F0', borderRadius:14, padding:'20px 18px', boxShadow:'0 4px 16px rgba(0,0,0,.06)' }}>
      <div style={{ fontSize:14, fontWeight:800, color:'#1C2434', marginBottom:4 }}>Get an exact quote</div>
      <div style={{ fontSize:12.5, color:'#64748B', marginBottom:16 }}>Free consultation · No commitment</div>
      <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:11 }}>
        <div><label style={lbl}>Name *</label><input style={inp} value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required/></div>
        <div><label style={lbl}>Mobile *</label><input style={inp} type="tel" value={mobile} onChange={e=>setMobile(e.target.value)} placeholder="+91 98765 43210" required/></div>
        <div><label style={lbl}>Email *</label><input style={inp} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></div>
        <div>
          <label style={lbl}>State *</label>
          <select style={{...inp,height:38,cursor:'pointer'}} value={state} onChange={e=>setState(e.target.value)} required>
            <option value="">Select state…</option>
            {STATES.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div><label style={lbl}>Additional info (optional)</label><textarea style={{...inp,height:64,padding:'8px 12px',resize:'vertical'}} value={info} onChange={e=>setInfo(e.target.value)} placeholder="Anything we should know?"/></div>
        {err && <div style={{ color:'#DC2626', fontSize:12.5 }}>{err}</div>}
        <button type="submit" disabled={loading} style={{ height:42, borderRadius:9, background:'#1D6FE0', color:'#fff', fontWeight:700, fontSize:14, border:'none', cursor:loading?'not-allowed':'pointer', opacity:loading?.7:1, fontFamily:'inherit' }}>
          {loading ? 'Sending…' : 'Request Quote →'}
        </button>
      </form>
    </div>
  )
}

/* ── Aside ── */
function ServiceAside({ priceCard, helpCard, svc }) {
  const hasPrice = priceCard.price && priceCard.price !== 'Custom quote'

  return (
    <aside className="svc-aside">
      {/* Price card */}
      <div style={{
        background: 'linear-gradient(135deg,#1A2F4E 0%,#1D6FE0 100%)',
        borderRadius: 16, padding: '24px 20px', color: '#fff', marginBottom: 16,
        boxShadow: '0 8px 32px rgba(29,111,224,.25)',
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 8 }}>
          {priceCard.label}
        </div>
        {hasPrice ? (
          <>
            <div style={{ fontSize: 42, fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 4 }}>
              {priceCard.price}
            </div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.65)', marginBottom: 16 }}>
              {priceCard.sub}
            </div>
            <div style={{ background: 'rgba(255,255,255,.1)', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: 'rgba(255,255,255,.8)', marginBottom: 16 }}>
              ⚡ Govt. fees billed separately & shown upfront
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 4 }}>
              Get Quote
            </div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.65)', marginBottom: 16 }}>
              {priceCard.sub}
            </div>
          </>
        )}
        <a href="/company/contact" style={{
          display: 'block', textAlign: 'center', padding: '12px', borderRadius: 10,
          background: '#F97316', color: '#fff', fontWeight: 700, fontSize: 14,
          textDecoration: 'none', transition: 'background .15s',
        }}
          onMouseEnter={e => e.target.style.background = '#EA6C0A'}
          onMouseLeave={e => e.target.style.background = '#F97316'}
        >
          Talk to an Expert →
        </a>
        <a href={`https://wa.me/918548854859?text=Hi, I'm interested in ${svc.title}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            marginTop: 10, padding: '11px', borderRadius: 10,
            background: '#25D366', color: '#fff', fontWeight: 700, fontSize: 14,
            textDecoration: 'none',
          }}>
          <svg viewBox="0 0 32 32" width={18} height={18} fill="currentColor"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z"/></svg>
          WhatsApp Us
        </a>
      </div>

      {/* Quote form */}
      <div style={{ marginBottom: 16 }}>
        <QuoteForm svc={svc} />
      </div>

      {/* Help card */}
      <div className="help-card">
        <h4>{helpCard.title}</h4>
        <p>{helpCard.body}</p>
        <button className="btn btn-soft" data-open-ai="true">Ask LauncherDesk AI</button>
        <a className="btn btn-primary" href="/company/contact">Talk to an Expert</a>
      </div>
    </aside>
  )
}

/* ── Main ── */
export default function ServicePage({ svc }) {
  const { title, eyebrow, crumbCategory, lead, toc, sections, related, priceCard, helpCard } = svc
  const sectionOrder = toc.map(t => t.href.replace('#', ''))

  return (
    <>
      {/* Hero */}
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><ChevSvg />
            <a href="/services">Services</a><ChevSvg />
            <span>{crumbCategory}</span><ChevSvg />
            <span className="cur">{title}</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{ marginTop: 16, display: 'block' }}>{eyebrow}</span>
          <h1 className="reveal-up in">{title}</h1>
          <p className="lead reveal-up in">{lead}</p>
          <div className="hero-cta reveal-up in">
            <a href="/company/contact" className="btn btn-primary">
              Talk to an Expert{' '}
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={ARROW}/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* 3-col sticky layout */}
      <section className="section-sm" style={{overflow:"visible"}}>
        <div className="wrap" style={{overflow:"visible"}}>
          <div className="svc-layout" style={{overflow:"visible"}}>

            {/* LEFT — sticky TOC */}
            <div className="svc-toc-col">
              <Toc items={toc} />
            </div>

            {/* MIDDLE — scrollable content */}
            <div className="svc-body">
              {sectionOrder.map(id => {
                if (id === 'faq') return <FaqSection key="faq" data={sections.faq} />
                return <SectionContent key={id} id={id} data={sections[id]} />
              })}
            </div>

            {/* RIGHT — sticky aside */}
            <div className="svc-aside-col">
              <ServiceAside priceCard={priceCard} helpCard={helpCard} svc={svc} />
            </div>

          </div>
        </div>
      </section>

      {related && related.length > 0 && <RelatedServices items={related} />}
    </>
  )
}