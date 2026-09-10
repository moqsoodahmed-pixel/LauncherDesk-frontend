import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
import SEO, { serviceSchema, breadcrumbSchema, faqSchema } from './SEO'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const CHEV  = 'm9 18 6-6-6-6'
const ARROW = 'M5 12h14M13 6l6 6-6 6'
const CHECK = 'M20 6 9 17l-5-5'
const WA_PATH = 'M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z'

function ChevSvg() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}} aria-hidden="true"><path d={CHEV}/></svg>
}

function CheckLi({ children }) {
  return (
    <li>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={CHECK}/></svg>
      {/* Static internal data only — never user-generated */}
      <span dangerouslySetInnerHTML={{ __html: children }} />
    </li>
  )
}

function Toc({ items }) {
  const [activeHref, setActiveHref] = useState(items[0]?.href || '')
  useEffect(() => {
    const secs = items.map(item => document.querySelector(item.href)).filter(Boolean)
    if (!secs.length) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) setActiveHref(`#${en.target.id}`) })
    }, { rootMargin: '-20% 0px -70% 0px' })
    secs.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [items])
  return (
    <nav className="toc" aria-label="On this page">
      <h5>On this page</h5>
      {items.map(item => (
        <a key={item.href} href={item.href} className={activeHref === item.href ? 'active' : ''} aria-current={activeHref === item.href ? 'true' : undefined}>
          {item.label}
        </a>
      ))}
    </nav>
  )
}

function SectionContent({ id, data }) {
  if (!data) return null
  if (data.content) return (
    <section id={id}><h2>{data.heading}</h2><div dangerouslySetInnerHTML={{ __html: data.content }} /></section>
  )
  if (data.items) return (
    <section id={id}><h2>{data.heading}</h2><ul>{data.items.map((item, i) => <CheckLi key={i}>{item}</CheckLi>)}</ul>{data.extra && <div dangerouslySetInnerHTML={{ __html: data.extra }} />}</section>
  )
  if (data.steps) return (
    <section id={id}><h2>{data.heading}</h2><div className="timeline">{data.steps.map((step, i) => (<div key={i} className="tl"><span className="dot" aria-hidden="true">{i+1}</span><div><strong>{step.title}</strong><p>{step.body}</p></div></div>))}</div></section>
  )
  if (data.tableHtml) return (
    <section id={id}><h2>{data.heading}</h2><div className="pricebox" dangerouslySetInnerHTML={{ __html: data.tableHtml }} /></section>
  )
  if (data.rows) return (
    <section id={id}>
      <h2>{data.heading}</h2>
      {data.intro && <p>{data.intro}</p>}
      <div className="pricebox">
        <table className="tbl"><thead><tr><th scope="col">Component</th><th scope="col">What it covers</th></tr></thead>
          <tbody>{data.rows.map(([c1,c2],i) => <tr key={i}><td>{c1}</td><td>{c2}</td></tr>)}</tbody>
        </table>
      </div>
      {data.outro && <p style={{marginTop:14}} dangerouslySetInnerHTML={{ __html: data.outro }} />}
    </section>
  )
  return null
}

function FaqSection({ data }) {
  const [openIdx, setOpenIdx] = useState(null)
  const [showAll, setShowAll] = useState(false)
  if (!data) return null
  const items   = showAll ? data.items : data.items.slice(0, 5)
  const hasMore = data.items.length > 5
  const toggle  = i => setOpenIdx(prev => prev === i ? null : i)
  return (
    <section id="faq">
      <h2>{data.heading}</h2>
      <div className="faq-list">
        {items.map((item, i) => {
          const isOpen   = openIdx === i
          const answerId = `faq-answer-${i}`
          const btnId    = `faq-btn-${i}`
          return (
            <div key={i} className="faq-item">
              <button id={btnId} aria-expanded={isOpen} aria-controls={answerId}
                onClick={() => toggle(i)}
                style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,padding:'18px 0',borderBottom:'1px solid var(--line)',cursor:'pointer',background:'transparent',border:'none',borderBottom:'1px solid var(--line)',textAlign:'left',fontFamily:'inherit'}}>
                <span style={{fontSize:16,fontWeight:600,color:'var(--navy)',lineHeight:1.4}}>{item.q}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke={isOpen?'var(--blue)':'var(--text-3)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{width:20,height:20,flexShrink:0,transition:'transform .25s, stroke .15s',transform:isOpen?'rotate(45deg)':'none'}}>
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </button>
              <div id={answerId} role="region" aria-labelledby={btnId} hidden={!isOpen} style={{display:isOpen?'block':'none',padding:'14px 0 20px'}}>
                <p style={{color:'var(--text-2)',fontSize:15,lineHeight:1.7}} dangerouslySetInnerHTML={{ __html: item.a }} />
              </div>
            </div>
          )
        })}
      </div>
      {hasMore && !showAll && (
        <div style={{textAlign:'center',marginTop:24}}>
          <button onClick={() => setShowAll(true)} style={{display:'inline-flex',alignItems:'center',gap:8,padding:'0 24px',height:44,borderRadius:9,background:'var(--blue)',color:'#fff',fontWeight:700,fontSize:14,border:'none',cursor:'pointer',boxShadow:'0 4px 14px rgba(29,111,224,.3)',fontFamily:'inherit'}}>
            View more FAQs
            <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      )}
    </section>
  )
}

function RelatedServices({ items }) {
  return (
    <section className="section-sm">
      <div className="wrap">
        <h2 style={{fontSize:'clamp(24px,3vw,34px)'}}>Related services</h2>
        <div className="related reveal-up" style={{marginTop:26}}>
          {items.map(item => (
            <Link key={item.href} to={item.href} className="card">
              <h3 style={{fontSize:17,marginBottom:8}}>{item.label}</h3>
              <p style={{fontSize:14,color:'var(--text-2)',marginBottom:12}}>{item.note}</p>
              <span className="arrow" style={{color:'var(--blue)',fontWeight:600,fontSize:14}}>Learn more</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

const STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry']

function QuoteForm({ svc }) {
  const [form, setForm]     = useState({ name:'', mobile:'', email:'', state:'', info:'' })
  const [loading, setLoading] = useState(false)
  const [done, setDone]     = useState(false)
  const [err, setErr]       = useState('')
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const inp = {border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 12px',fontSize:13.5,color:'#1C2434',outline:'none',fontFamily:'inherit',background:'#fff',width:'100%',height:38,boxSizing:'border-box'}
  const lbl = {fontSize:12,fontWeight:600,color:'#64748B',display:'block',marginBottom:4}

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()||!form.mobile.trim()||!form.email.trim()||!form.state) { setErr('Please fill all required fields.'); return }
    if (!/^\+?[0-9\s\-()\u00B7]{10,15}$/.test(form.mobile.trim())) { setErr('Please enter a valid mobile number.'); return }
    setLoading(true); setErr('')
    const slug = svc.slug || window.location.pathname.split('/').filter(Boolean).pop() || 'general'
    try {
      const res  = await fetch(`${API_BASE}/quotes`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name:form.name.trim(), email:form.email.trim(), mobile:form.mobile.trim(), state:form.state, serviceSlug:slug, serviceTitle:svc.title||'', businessType:'', additionalInfo:form.info.trim() }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Submission failed')
      setDone(true)
    } catch(e) { setErr(e.message || 'Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  if (done) return (
    <div style={{background:'#F0FDF4',border:'1.5px solid #BBF7D0',borderRadius:12,padding:'20px 18px',textAlign:'center'}} role="status">
      <svg viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" style={{width:36,height:36,margin:'0 auto 10px'}} aria-hidden="true"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
      <div style={{fontWeight:700,color:'#15803D',fontSize:15,marginBottom:4}}>Request received!</div>
      <div style={{fontSize:13,color:'#166534'}}>Our expert will contact you within one business day.</div>
    </div>
  )

  return (
    <div style={{background:'#fff',border:'1.5px solid #E2E8F0',borderRadius:14,padding:'20px 18px',boxShadow:'0 4px 16px rgba(0,0,0,.06)'}}>
      <div style={{fontSize:14,fontWeight:800,color:'#1C2434',marginBottom:4}}>Get an exact quote</div>
      <div style={{fontSize:12.5,color:'#64748B',marginBottom:16}}>Free consultation · No commitment</div>
      <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:11}} noValidate>
        <div><label htmlFor="qf-name" style={lbl}>Full Name *</label><input id="qf-name" style={inp} value={form.name} onChange={set('name')} placeholder="Your name" required aria-required="true"/></div>
        <div><label htmlFor="qf-mobile" style={lbl}>Mobile *</label><input id="qf-mobile" style={inp} type="tel" value={form.mobile} onChange={set('mobile')} placeholder="+91 98765 43210" required aria-required="true"/></div>
        <div><label htmlFor="qf-email" style={lbl}>Email *</label><input id="qf-email" style={inp} type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required aria-required="true"/></div>
        <div>
          <label htmlFor="qf-state" style={lbl}>State *</label>
          <select id="qf-state" style={{...inp,height:38,cursor:'pointer'}} value={form.state} onChange={set('state')} required aria-required="true">
            <option value="">Select state…</option>
            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div><label htmlFor="qf-info" style={lbl}>Additional info <span style={{fontWeight:400}}>(optional)</span></label><textarea id="qf-info" style={{...inp,height:64,padding:'8px 12px',resize:'vertical'}} value={form.info} onChange={set('info')} placeholder="Anything we should know?"/></div>
        {err && <div role="alert" style={{color:'#DC2626',fontSize:12.5,background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:6,padding:'8px 10px'}}>{err}</div>}
        <button type="submit" disabled={loading} style={{height:42,borderRadius:9,background:'#1D6FE0',color:'#fff',fontWeight:700,fontSize:14,border:'none',cursor:loading?'not-allowed':'pointer',opacity:loading?.7:1,fontFamily:'inherit'}}>
          {loading ? 'Sending…' : 'Request Quote →'}
        </button>
        <p style={{fontSize:11,color:'#94A3B8',textAlign:'center',margin:0}}>
          By submitting, you agree to our <Link to="/legal/privacy" style={{color:'#1D6FE0'}}>Privacy Policy</Link>.
        </p>
      </form>
    </div>
  )
}

function BuyNowButton({ svc, priceCard }) {
  const { isLoggedIn, token } = useUserAuth()
  const navigate = useNavigate()
  const [loading, setLoading]       = useState(false)
  const [msg, setMsg]               = useState('')
  const [payEnabled, setPayEnabled] = useState(null)

  const rawPrice     = priceCard?.price || ''
  const numericPrice = parseFloat(rawPrice.replace(/[₹,]/g, ''))
  const hasPrice     = !isNaN(numericPrice) && numericPrice > 0

  useEffect(() => {
    if (!hasPrice) return
    fetch(`${API_BASE}/payments/config`).then(r => r.json()).then(d => setPayEnabled(d.enabled)).catch(() => setPayEnabled(false))
  }, [hasPrice])

  if (!hasPrice || payEnabled === null) return null

  if (!payEnabled) return (
    <div style={{marginTop:10}}>
      <Link to="/company/contact" style={{display:'block',width:'100%',textAlign:'center',padding:'12px',borderRadius:10,background:'rgba(255,255,255,.15)',color:'#fff',fontWeight:700,fontSize:14,textDecoration:'none',border:'1px solid rgba(255,255,255,.25)'}}>
        Request a Quote →
      </Link>
    </div>
  )

  async function handleBuy() {
    if (!isLoggedIn) { navigate('/user/login', { state: { from: window.location.pathname, tab: 'login' } }); return }
    setLoading(true); setMsg('')
    try {
      const res  = await fetch(`${API_BASE}/payments/create-order`, { method:'POST', headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`}, body: JSON.stringify({ amount:numericPrice, serviceSlug:svc.slug||'', serviceTitle:svc.title }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to create order')
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => { const s = document.createElement('script'); s.src='https://checkout.razorpay.com/v1/checkout.js'; s.onload=resolve; s.onerror=reject; document.body.appendChild(s) })
      }
      await new Promise((resolve) => {
        const rzp = new window.Razorpay({
          key: data.keyId, amount: data.amount, currency: data.currency, order_id: data.orderId,
          name: 'LauncherDesk', description: svc.title, image: '/launcherdesk-logo-transparent.png',
          theme: { color: '#1D6FE0' },
          handler: async (response) => {
            try {
              const vRes  = await fetch(`${API_BASE}/payments/verify`, { method:'POST', headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`}, body: JSON.stringify({ razorpay_order_id:response.razorpay_order_id, razorpay_payment_id:response.razorpay_payment_id, razorpay_signature:response.razorpay_signature, serviceSlug:svc.slug||'', serviceTitle:svc.title }) })
              const vData = await vRes.json()
              setMsg(vData.success ? '✅ Payment successful! Our team will contact you within 1 business day.' : '⚠️ Payment received but verification pending. Contact support@launcherdesk.com')
            } catch { setMsg('Payment received. Contact support@launcherdesk.com to confirm.') }
            resolve()
          },
          modal: { ondismiss: () => { setLoading(false); resolve() } },
        })
        rzp.open()
      })
    } catch (err) { setMsg(`❌ ${err.message || 'Something went wrong. Please try again.'}`) }
    finally { setLoading(false) }
  }

  const isSuccess = msg.startsWith('✅'), isFail = msg.startsWith('❌')
  return (
    <div style={{marginTop:10}}>
      <button onClick={handleBuy} disabled={loading} aria-busy={loading} style={{display:'block',width:'100%',textAlign:'center',padding:'12px',borderRadius:10,background:loading?'#94A3B8':'rgba(255,255,255,.15)',color:'#fff',fontWeight:700,fontSize:14,border:'1px solid rgba(255,255,255,.3)',cursor:loading?'not-allowed':'pointer',fontFamily:'inherit',transition:'background .15s'}}>
        {loading ? 'Processing…' : isLoggedIn ? `Pay ₹${numericPrice.toLocaleString('en-IN')} →` : '🔒 Login to Pay'}
      </button>
      {msg && <div role="status" aria-live="polite" style={{marginTop:10,padding:'10px 12px',borderRadius:8,background:isSuccess?'#DCFCE7':isFail?'#FEF2F2':'#FEF9C3',border:`1px solid ${isSuccess?'#BBF7D0':isFail?'#FECACA':'#FDE68A'}`,fontSize:12.5,color:isSuccess?'#166534':isFail?'#DC2626':'#854D0E',lineHeight:1.5}}>{msg}</div>}
    </div>
  )
}

function ServiceAside({ priceCard, helpCard, svc }) {
  const hasPrice = priceCard.price && priceCard.price !== 'Custom quote'
  const waMsg    = encodeURIComponent(`Hi, I'm interested in ${svc.title}`)
  return (
    <aside className="svc-aside">
      <div style={{background:'linear-gradient(135deg,#1A2F4E 0%,#1D6FE0 100%)',borderRadius:16,padding:'24px 20px',color:'#fff',marginBottom:16,boxShadow:'0 8px 32px rgba(29,111,224,.25)'}}>
        <div style={{fontSize:12,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(255,255,255,.6)',marginBottom:8}}>{priceCard.label}</div>
        {hasPrice ? (
          <>
            <div style={{fontSize:42,fontWeight:900,color:'#fff',lineHeight:1,marginBottom:4}}>{priceCard.price}</div>
            <div style={{fontSize:12.5,color:'rgba(255,255,255,.65)',marginBottom:16}}>{priceCard.sub}</div>
            <div style={{background:'rgba(255,255,255,.1)',borderRadius:8,padding:'8px 12px',fontSize:12,color:'rgba(255,255,255,.8)',marginBottom:16}}>⚡ Govt. fees billed separately &amp; shown upfront</div>
          </>
        ) : (
          <>
            <div style={{fontSize:28,fontWeight:900,color:'#fff',lineHeight:1,marginBottom:4}}>Custom Quote</div>
            <div style={{fontSize:12.5,color:'rgba(255,255,255,.65)',marginBottom:16}}>{priceCard.sub}</div>
          </>
        )}
        {/* CTA hierarchy: Expert first, then WhatsApp, then Pay */}
        <Link to="/company/contact" style={{display:'block',textAlign:'center',padding:'12px',borderRadius:10,background:'#F97316',color:'#fff',fontWeight:700,fontSize:14,textDecoration:'none',marginBottom:10}}>
          Talk to an Expert →
        </Link>
        <a href={`https://wa.me/918548854859?text=${waMsg}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp us about ${svc.title}`} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'11px',borderRadius:10,background:'#25D366',color:'#fff',fontWeight:700,fontSize:14,textDecoration:'none',marginBottom:4}}>
          <svg viewBox="0 0 32 32" width={18} height={18} fill="currentColor" aria-hidden="true"><path d={WA_PATH}/></svg>
          WhatsApp Us
        </a>
        <BuyNowButton svc={svc} priceCard={priceCard} />
      </div>
      <div style={{marginBottom:16}}><QuoteForm svc={svc} /></div>
      <div className="help-card">
        <h4>{helpCard.title}</h4>
        <p>{helpCard.body}</p>
        <button className="btn btn-soft" data-open-ai="true" style={{width:'100%',marginBottom:8,justifyContent:'center'}}>Ask LauncherDesk AI</button>
        <Link to="/company/contact" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>Talk to an Expert</Link>
      </div>
    </aside>
  )
}

export default function ServicePage({ svc }) {
  const { title, eyebrow, crumbCategory, lead, toc, sections, related, priceCard, helpCard, slug } = svc
  const sectionOrder = toc.map(t => t.href.replace('#',''))
  const schemas = [
    serviceSchema(svc, slug),
    breadcrumbSchema([{name:'Home',url:'/'},{name:'Services',url:'/services'},{name:crumbCategory,url:'/services'},{name:title,url:`/services/${slug}`}]),
    sections.faq ? faqSchema(sections.faq.items) : null,
  ].filter(Boolean)

  return (
    <>
      <SEO title={svc.metaTitle?.replace(' | LauncherDesk','') || title} description={svc.metaDesc} canonical={`/services/${slug}`} jsonLd={schemas} />
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in" aria-label="Breadcrumb">
            <Link to="/">Home</Link><ChevSvg />
            <Link to="/services">Services</Link><ChevSvg />
            <span>{crumbCategory}</span><ChevSvg />
            <span className="cur" aria-current="page">{title}</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>{eyebrow}</span>
          <h1 className="reveal-up in">{title}</h1>
          <p className="lead reveal-up in">{lead}</p>
          <div className="hero-cta reveal-up in">
            <Link to="/company/contact" className="btn btn-primary">
              Talk to an Expert{' '}
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ARROW}/></svg>
            </Link>
          </div>
        </div>
      </header>
      <section className="section-sm" style={{overflow:'visible'}}>
        <div className="wrap" style={{overflow:'visible'}}>
          <div className="svc-layout" style={{overflow:'visible'}}>
            <div className="svc-toc-col"><Toc items={toc} /></div>
            <main className="svc-body">
              {sectionOrder.map(id => id === 'faq' ? <FaqSection key="faq" data={sections.faq} /> : <SectionContent key={id} id={id} data={sections[id]} />)}
              <div style={{marginTop:32,padding:'14px 16px',borderRadius:10,background:'#F8FAFC',border:'1px solid var(--line)',fontSize:12.5,color:'var(--text-3)',lineHeight:1.6}}>
                <strong style={{color:'var(--text-2)'}}>Please note:</strong> LauncherDesk assists with preparation and submission of applications. Final approval and processing timelines are determined by the relevant government authority and may vary based on document completeness and authority workload. We do not guarantee approvals or specific government processing timelines.
              </div>
            </main>
            <div className="svc-aside-col"><ServiceAside priceCard={priceCard} helpCard={helpCard} svc={svc} /></div>
          </div>
        </div>
      </section>
      {related && related.length > 0 && <RelatedServices items={related} />}
    </>
  )
}