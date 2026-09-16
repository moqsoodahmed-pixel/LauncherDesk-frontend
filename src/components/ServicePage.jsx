import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
import SEO, { serviceSchema, breadcrumbSchema, faqSchema } from './SEO'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const CHEV = 'm9 18 6-6-6-6'
const ARROW = 'M5 12h14M13 6l6 6-6 6'
const CHECK = 'M20 6 9 17l-5-5'
const WA_PATH = 'M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z'

function ChevSvg() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }} aria-hidden="true"><path d={CHEV} /></svg>
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
      {items.filter(i => i.href !== '#pricing').map(item => (
        <a key={item.href} href={item.href} className={activeHref === item.href ? 'active' : ''} aria-current={activeHref === item.href ? 'true' : undefined}>
          {item.label}
        </a>
      ))}
    </nav>
  )
}

/* ── Section renderer — each section type gets its own visual treatment ── */
function SectionContent({ id, data }) {
  if (!data) return null
  if (id === 'pricing') return null   // pricing table removed

  /* ── OVERVIEW — clean prose with a left accent bar ── */
  if (data.content) return (
    <section id={id} style={{ marginBottom: 48 }}>
      <SectionHeading>{data.heading}</SectionHeading>
      <div style={{
        borderLeft: '3px solid var(--blue)', paddingLeft: 20,
        color: 'var(--text-2)', fontSize: 15.5, lineHeight: 1.8,
      }} dangerouslySetInnerHTML={{ __html: data.content }} />
    </section>
  )

  /* ── BULLET LIST sections (who, benefits, eligibility, included, classes) ── */
  if (data.items) return (
    <section id={id} style={{ marginBottom: 48 }}>
      <SectionHeading>{data.heading}</SectionHeading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.items.slice(0, 6).map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 14,
            background: '#fff', borderRadius: 12,
            border: '1px solid var(--line)',
            padding: '14px 16px',
            boxShadow: '0 1px 4px rgba(15,28,46,0.04)',
            transition: 'border-color .18s, box-shadow .18s, transform .18s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(29,93,184,0.25)'
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(29,93,184,0.09)'
              e.currentTarget.style.transform = 'translateX(3px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--line)'
              e.currentTarget.style.boxShadow = '0 1px 4px rgba(15,28,46,0.04)'
              e.currentTarget.style.transform = 'translateX(0)'
            }}
          >
            {/* Numbered badge */}
            <span style={{
              width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
              background: 'var(--brand-50)', border: '1.5px solid var(--brand-100)',
              color: 'var(--blue)', fontWeight: 800, fontSize: 11,
              display: 'grid', placeItems: 'center', fontFamily: 'var(--font)',
              marginTop: 1,
            }}>{i + 1}</span>
            <span style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-2)' }}
              dangerouslySetInnerHTML={{ __html: item }} />
          </div>
        ))}
      </div>
      {data.extra && <div style={{ marginTop: 16, fontSize: 14, color: 'var(--text-2)' }} dangerouslySetInnerHTML={{ __html: data.extra }} />}
    </section>
  )

  /* ── PROCESS (steps) — visual timeline with connecting line ── */
  if (data.steps) return (
    <section id={id} style={{ marginBottom: 48 }}>
      <SectionHeading>{data.heading}</SectionHeading>
      <div style={{ position: 'relative', paddingLeft: 4 }}>
        {/* Vertical connecting line */}
        <div style={{
          position: 'absolute', left: 19, top: 32, bottom: 32,
          width: 2, background: 'linear-gradient(180deg, var(--blue), transparent)',
          borderRadius: 2, zIndex: 0,
        }} aria-hidden="true" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {data.steps.slice(0, 6).map((step, i) => (
            <div key={i} style={{
              display: 'flex', gap: 16, alignItems: 'flex-start',
              background: '#fff', borderRadius: 12,
              border: '1px solid var(--line)',
              padding: '16px 18px 16px 0',
              position: 'relative', zIndex: 1,
              transition: 'border-color .18s, box-shadow .18s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(29,93,184,0.28)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(29,93,184,0.10)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--line)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Step number circle */}
              <span style={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, var(--blue-dark), var(--blue))',
                color: '#fff', fontWeight: 900, fontSize: 13,
                display: 'grid', placeItems: 'center', fontFamily: 'var(--font)',
                marginLeft: 0, boxShadow: '0 4px 12px rgba(29,93,184,0.30)',
              }}>{i + 1}</span>
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: 4 }}>
                  {step.title}
                </strong>
                <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.65, margin: 0 }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  /* ── COMPARE table (Pvt Ltd vs LLP etc.) ── */
  if (data.tableHtml) return (
    <section id={id} style={{ marginBottom: 48 }}>
      <SectionHeading>{data.heading}</SectionHeading>
      <div style={{
        background: '#fff', borderRadius: 14, overflow: 'hidden',
        border: '1px solid var(--line)',
        boxShadow: '0 2px 12px rgba(15,28,46,0.06)',
      }} dangerouslySetInnerHTML={{ __html: data.tableHtml }} />
    </section>
  )

  /* pricing rows — removed, return null */
  if (data.rows) return null

  return null
}

/* ── Shared section heading with animated underline ── */
function SectionHeading({ children }) {
  return (
    <h2 style={{
      fontSize: 'clamp(20px,2.4vw,27px)', fontWeight: 800,
      letterSpacing: '-.02em', color: 'var(--navy)',
      marginBottom: 20, paddingBottom: 12,
      borderBottom: '2px solid var(--brand-50)',
      position: 'relative',
    }}>
      {children}
      <span style={{
        position: 'absolute', left: 0, bottom: -2,
        width: 40, height: 2,
        background: 'linear-gradient(90deg, var(--blue), var(--blue-bright))',
        borderRadius: 2, display: 'block',
      }} aria-hidden="true" />
    </h2>
  )
}

function FaqSection({ data }) {
  const [openIdx, setOpenIdx] = useState(null)
  const [showAll, setShowAll] = useState(false)
  if (!data) return null
  const items = showAll ? data.items : data.items.slice(0, 4)
  const hasMore = data.items.length > 4
  const toggle = i => setOpenIdx(prev => prev === i ? null : i)
  return (
    <section id="faq" style={{ marginBottom: 48 }}>
      <SectionHeading>{data.heading}</SectionHeading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item, i) => {
          const isOpen = openIdx === i
          const answerId = `faq-answer-${i}`
          const btnId = `faq-btn-${i}`
          return (
            <div key={i} style={{
              background: '#fff', borderRadius: 12,
              border: `1.5px solid ${isOpen ? 'rgba(29,93,184,0.30)' : 'var(--line)'}`,
              boxShadow: isOpen ? '0 6px 20px rgba(29,93,184,0.10)' : '0 1px 4px rgba(15,28,46,0.04)',
              overflow: 'hidden', transition: 'border-color .2s, box-shadow .2s',
            }}>
              <button id={btnId} aria-expanded={isOpen} aria-controls={answerId}
                onClick={() => toggle(i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', gap: 16,
                  padding: '16px 18px', cursor: 'pointer',
                  background: isOpen ? 'rgba(239,246,255,0.6)' : 'transparent',
                  border: 'none', textAlign: 'left', fontFamily: 'inherit',
                  transition: 'background .15s',
                }}>
                <span style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.4 }}>
                  {item.q}
                </span>
                <span style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: isOpen ? 'var(--blue)' : 'var(--brand-50)',
                  border: `1.5px solid ${isOpen ? 'var(--blue)' : 'var(--brand-100)'}`,
                  display: 'grid', placeItems: 'center',
                  transition: 'background .2s, transform .25s',
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                }}>
                  <svg viewBox="0 0 24 24" fill="none"
                    stroke={isOpen ? '#fff' : 'var(--blue)'}
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true" style={{ width: 13, height: 13 }}>
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
              <div id={answerId} role="region" aria-labelledby={btnId}
                hidden={!isOpen}
                style={{ display: isOpen ? 'block' : 'none', padding: '0 18px 18px' }}>
                <p style={{ color: 'var(--text-2)', fontSize: 14.5, lineHeight: 1.75, margin: 0 }}
                  dangerouslySetInnerHTML={{ __html: item.a }} />
              </div>
            </div>
          )
        })}
      </div>
      {hasMore && !showAll && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={() => setShowAll(true)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '0 24px', height: 44, borderRadius: 9,
            background: 'var(--blue)', color: '#fff', fontWeight: 700,
            fontSize: 14, border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(29,111,224,.3)', fontFamily: 'inherit',
          }}>
            View more FAQs
            <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </section>
  )
}

function RelatedServices({ items }) {
  return (
    <section className="section-sm" style={{ background: 'var(--sec-b)' }}>
      <div className="wrap">
        <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', marginBottom: 28 }}>Related services</h2>
        <div className="related reveal-up" style={{ marginTop: 0 }}>
          {items.map(item => (
            <Link key={item.href} to={item.href} className="card">
              <h3 style={{ fontSize: 16, marginBottom: 6 }}>{item.label}</h3>
              <p style={{ fontSize: 13.5, color: 'var(--text-2)', marginBottom: 12 }}>{item.note}</p>
              <span className="arrow" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: 13.5 }}>Learn more</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

const STATES = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry']

function QuoteForm({ svc }) {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', state: '', info: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const inp = { border: '1.5px solid #E2E8F0', borderRadius: 8, padding: '0 12px', fontSize: 13.5, color: '#1C2434', outline: 'none', fontFamily: 'inherit', background: '#fff', width: '100%', height: 38, boxSizing: 'border-box' }
  const lbl = { fontSize: 12, fontWeight: 600, color: '#64748B', display: 'block', marginBottom: 4 }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.mobile.trim() || !form.email.trim() || !form.state) { setErr('Please fill all required fields.'); return }
    if (!/^\+?[0-9\s\-()·]{10,15}$/.test(form.mobile.trim())) { setErr('Please enter a valid mobile number.'); return }
    setLoading(true); setErr('')
    const slug = svc.slug || window.location.pathname.split('/').filter(Boolean).pop() || 'general'
    try {
      const res = await fetch(`${API_BASE}/quotes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), mobile: form.mobile.trim(), state: form.state, serviceSlug: slug, serviceTitle: svc.title || '', businessType: '', additionalInfo: form.info.trim() }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Submission failed')
      setDone(true)
    } catch (e) { setErr(e.message || 'Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  if (done) return (
    <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: 12, padding: '20px 18px', textAlign: 'center' }} role="status">
      <svg viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" style={{ width: 36, height: 36, margin: '0 auto 10px' }} aria-hidden="true"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
      <div style={{ fontWeight: 700, color: '#15803D', fontSize: 15, marginBottom: 4 }}>Request received!</div>
      <div style={{ fontSize: 13, color: '#166534' }}>Our expert will contact you within one business day.</div>
    </div>
  )

  return (
    <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: '20px 18px', boxShadow: '0 4px 16px rgba(0,0,0,.06)' }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: '#1C2434', marginBottom: 4 }}>Get an exact quote</div>
      <div style={{ fontSize: 12.5, color: '#64748B', marginBottom: 16 }}>Free consultation · No commitment</div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 11 }} noValidate>
        <div><label htmlFor="qf-name" style={lbl}>Full Name *</label><input id="qf-name" style={inp} value={form.name} onChange={set('name')} placeholder="Your name" required aria-required="true" /></div>
        <div><label htmlFor="qf-mobile" style={lbl}>Mobile *</label><input id="qf-mobile" style={inp} type="tel" value={form.mobile} onChange={set('mobile')} placeholder="+91 98765 43210" required aria-required="true" /></div>
        <div><label htmlFor="qf-email" style={lbl}>Email *</label><input id="qf-email" style={inp} type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required aria-required="true" /></div>
        <div>
          <label htmlFor="qf-state" style={lbl}>State *</label>
          <select id="qf-state" style={{ ...inp, height: 38, cursor: 'pointer' }} value={form.state} onChange={set('state')} required aria-required="true">
            <option value="">Select state…</option>
            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div><label htmlFor="qf-info" style={lbl}>Additional info <span style={{ fontWeight: 400 }}>(optional)</span></label><textarea id="qf-info" style={{ ...inp, height: 64, padding: '8px 12px', resize: 'vertical' }} value={form.info} onChange={set('info')} placeholder="Anything we should know?" /></div>
        {err && <div role="alert" style={{ color: '#DC2626', fontSize: 12.5, background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, padding: '8px 10px' }}>{err}</div>}
        <button type="submit" disabled={loading} style={{ height: 42, borderRadius: 9, background: '#1D6FE0', color: '#fff', fontWeight: 700, fontSize: 14, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? .7 : 1, fontFamily: 'inherit' }}>
          {loading ? 'Sending…' : 'Request Quote →'}
        </button>
        <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', margin: 0 }}>
          By submitting, you agree to our <Link to="/legal/privacy" style={{ color: '#1D6FE0' }}>Privacy Policy</Link>.
        </p>
      </form>
    </div>
  )
}

function BuyNowButton({ svc, priceCard }) {
  const { isLoggedIn, token } = useUserAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [payEnabled, setPayEnabled] = useState(null)

  const rawPrice = priceCard?.price || ''
  const numericPrice = parseFloat(rawPrice.replace(/[₹,*]/g, ''))
  const hasPrice = !isNaN(numericPrice) && numericPrice > 0

  useEffect(() => {
    if (!hasPrice) return
    fetch(`${API_BASE}/payments/config`)
      .then(r => r.json())
      .then(d => setPayEnabled(d.enabled))
      .catch(() => setPayEnabled(false))
  }, [hasPrice])

  if (!hasPrice) return null

  const btnLabel = loading ? 'Processing…' : isLoggedIn ? `Pay ₹${numericPrice.toLocaleString('en-IN')} →` : 'Login to Pay'

  async function handleBuy() {
    if (!isLoggedIn) { navigate('/user/login', { state: { from: location.pathname, tab: 'login' } }); return }
    if (payEnabled === null) return
    if (!payEnabled) { navigate('/company/contact'); return }
    setLoading(true); setMsg('')
    try {
      const res = await fetch(`${API_BASE}/payments/create-order`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ amount: numericPrice, serviceSlug: svc.slug || '', serviceTitle: svc.title }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to create order')
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => { const s = document.createElement('script'); s.src = 'https://checkout.razorpay.com/v1/checkout.js'; s.onload = resolve; s.onerror = reject; document.body.appendChild(s) })
      }
      await new Promise((resolve) => {
        const rzp = new window.Razorpay({
          key: data.keyId, amount: data.amount, currency: data.currency, order_id: data.orderId,
          name: 'LauncherDesk', description: svc.title, image: '/launcherdesk-logo-transparent.png',
          theme: { color: '#1D6FE0' },
          handler: async (response) => {
            try {
              const vRes = await fetch(`${API_BASE}/payments/verify`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature, serviceSlug: svc.slug || '', serviceTitle: svc.title }) })
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
    <div style={{ marginTop: 10 }}>
      <button onClick={handleBuy} disabled={loading} aria-busy={loading} style={{ display: 'block', width: '100%', textAlign: 'center', padding: '12px', borderRadius: 10, background: loading ? '#94A3B8' : 'rgba(255,255,255,.15)', color: '#fff', fontWeight: 700, fontSize: 14, border: '1px solid rgba(255,255,255,.3)', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'background .15s' }}>
        {btnLabel}
      </button>
      {msg && <div role="status" aria-live="polite" style={{ marginTop: 10, padding: '10px 12px', borderRadius: 8, background: isSuccess ? '#DCFCE7' : isFail ? '#FEF2F2' : '#FEF9C3', border: `1px solid ${isSuccess ? '#BBF7D0' : isFail ? '#FECACA' : '#FDE68A'}`, fontSize: 12.5, color: isSuccess ? '#166534' : isFail ? '#DC2626' : '#854D0E', lineHeight: 1.5 }}>{msg}</div>}
    </div>
  )
}

const REGISTRATION_SLUGS = new Set(['private-limited-company-registration', 'llp-registration', 'opc-registration', 'partnership-registration', 'startup-india-dpiit', 'msme-registration', 'iso-certification', 'gst-registration', 'fssai-registration', 'trademark-registration', 'trademark-objection', 'patent-registration', 'copyright-registration', 'ip-trademark-management', 'roc-compliance', 'income-tax-filing', 'uae-business-setup'])

function isRegistrationService(svc) {
  if (!svc) return false
  if (REGISTRATION_SLUGS.has(svc.slug)) return true
  const eyebrow = (svc.eyebrow || '').toLowerCase()
  const crumb = (svc.crumbCategory || '').toLowerCase()
  const title = (svc.title || '').toLowerCase()
  if (eyebrow.includes('start your business') || eyebrow.includes('registrations') || eyebrow.includes('ipr & trademark') || eyebrow.includes('certifications')) return true
  if (crumb.includes('start your business') || crumb.includes('registrations') || crumb.includes('legal & ip') || crumb.includes('ipr & trademark')) return true
  if (title.includes('registration') || title.includes('incorporation') || title.includes('trademark') || title.includes('patent') || title.includes('copyright')) return true
  return false
}

const IT_SLUGS = new Set([
  'website-development',
  'static-website',
  'dynamic-website',
  'ecommerce-website',
  'business-email-hosting',
  'software-saas-development',
  'mobile-app-development',
  'whatsapp-chatbot',
  'ai-voice-agent',
  'sms-blasting',
  'email-blasting',
  'ai-powered-crm',
  'business-automation',
])

function isITService(svc) {
  if (!svc) return false
  if (IT_SLUGS.has(svc.slug)) return true
  const eyebrow = (svc.eyebrow || '').toLowerCase()
  const crumb = (svc.crumbCategory || '').toLowerCase()
  if (eyebrow.includes('technology') || eyebrow.includes('automate') || eyebrow.includes('ai') || eyebrow.includes('messaging')) return true
  if (crumb.includes('build') || crumb.includes('automate')) return true
  return false
}

const DIGITAL_MARKETING_SLUGS = new Set([
  'seo-marketing',
  'content-marketing',
  'technical-seo-audits',
  'local-international-seo',
  'ai-search-optimization',
  'google-ads-paid-marketing',
  'meta-instagram-ads',
  'linkedin-b2b-campaigns',
  'youtube-advertising',
  'remarketing-retargeting',
  'social-media-management',
  'content-calendar-posting',
  'community-management',
  'reels-short-form-video',
  'branding-logo-design',
  'ad-creative-design',
  'social-media-design',
  'marketing-collaterals',
  'packaging-design',
  'digital-marketing',
])

function isDigitalMarketingService(svc) {
  if (!svc) return false
  if (DIGITAL_MARKETING_SLUGS.has(svc.slug)) return true
  const eyebrow = (svc.eyebrow || '').toLowerCase()
  const crumb = (svc.crumbCategory || '').toLowerCase()
  if (eyebrow.includes('digital marketing') || crumb.includes('digital marketing')) return true
  return false
}

function formatDigitalMarketingPrice(rawPrice) {
  if (!rawPrice || rawPrice.toLowerCase().includes('custom')) return 'Custom quote'
  let clean = rawPrice.trim()
  clean = clean.replace(/\/month$/i, '/mo').replace(/\/mo$/i, '/mo')
  if (!clean.toLowerCase().includes('/mo')) {
    clean = `${clean}/mo`
  }
  return clean
}

function getServiceHighlights(svc) {
  if (!svc) return []
  // Try to grab items from sections.included or sections.benefits or sections.pricing
  if (svc.sections?.included?.items && svc.sections.included.items.length > 0) {
    return svc.sections.included.items.slice(0, 4).map(it => it.replace(/<[^>]*>?/gm, '').split(/[\(\—\-]/)[0].trim())
  }
  if (svc.sections?.benefits?.items && svc.sections.benefits.items.length > 0) {
    return svc.sections.benefits.items.slice(0, 4).map(it => it.replace(/<[^>]*>?/gm, '').split(/[\(\—\-]/)[0].trim())
  }
  return [
    'Dedicated Account Manager',
    'Custom Growth Strategy',
    'Transparent Monthly Reporting',
    '100% Performance-Driven'
  ]
}

const EXCLUDED_GOVT_SERVICES = new Set([
  'iso-certification',
  'msme-registration',
  'private-limited-company-registration',
  'gst-registration',
])

function ServiceAside({ priceCard, helpCard, svc }) {
  const navigate = useNavigate()
  const isDM = isDigitalMarketingService(svc)
  const hasPrice = priceCard.price && priceCard.price !== 'Custom quote'
  const waMsg = encodeURIComponent(`Hi, I'm interested in ${svc.title}`)
  const showGovtFeeBadge = !isDM && isRegistrationService(svc) && !EXCLUDED_GOVT_SERVICES.has(svc?.slug)

  // Label: "CHOOSE PLAN" for Digital Marketing, else existing priceCard.label
  const boxLabel = isDM ? 'CHOOSE PLAN' : priceCard.label

  const displayedPrice = priceCard.price

  function handleMonthlyPlansClick() {
    const targetService = svc?.slug || ''
    navigate(`/pricing?cat=dm&service=${encodeURIComponent(targetService)}#plans`)
  }

  const dmHighlights = isDM ? getServiceHighlights(svc) : []

  return (
    <aside className="svc-aside">
      {/* Blue pricing card */}
      <div style={{ background: 'linear-gradient(135deg,#1A2F4E 0%,#1D6FE0 100%)', borderRadius: 16, padding: '24px 20px', color: '#fff', marginBottom: 16, boxShadow: '0 8px 32px rgba(29,111,224,.25)' }}>
        {isDM ? (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: '#93C5FD', marginBottom: 4 }}>CHOOSE PLAN</div>
            <div style={{ fontSize: 'clamp(20px,3.8vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>
              Choose your monthly plan below
            </div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 8 }}>{boxLabel}</div>
            {hasPrice ? (
              <>
                <div style={{ fontSize: 'clamp(24px,4.5vw,38px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 4, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{displayedPrice}</div>
                <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.65)', marginBottom: showGovtFeeBadge ? 16 : 20 }}>{priceCard.sub}</div>
                {showGovtFeeBadge && (
                  <div style={{ background: 'rgba(255,255,255,.1)', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: 'rgba(255,255,255,.8)', marginBottom: 16 }}>⚡ Govt. fees billed separately &amp; shown upfront</div>
                )}
              </>
            ) : (
              <>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 4 }}>Custom Quote</div>
                <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.65)', marginBottom: 16 }}>{priceCard.sub}</div>
              </>
            )}
          </>
        )}
        <Link to="/company/contact" style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: 10, background: '#F97316', color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none', marginBottom: 10 }}>
          Talk to an Expert →
        </Link>
        <a href={`https://wa.me/918548854859?text=${waMsg}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp us about ${svc.title}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px', borderRadius: 10, background: '#25D366', color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none', marginBottom: 4 }}>
          <svg viewBox="0 0 32 32" width={18} height={18} fill="currentColor" aria-hidden="true"><path d={WA_PATH} /></svg>
          WhatsApp Us
        </a>
        {isDM ? (
          <div style={{ marginTop: 10 }}>
            <button
              onClick={handleMonthlyPlansClick}
              style={{
                display: 'block', width: '100%', textAlign: 'center',
                padding: '12px', borderRadius: 10,
                background: 'rgba(255,255,255,.15)',
                color: '#fff', fontWeight: 700, fontSize: 14,
                border: '1px solid rgba(255,255,255,.3)',
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'background .15s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.25)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.15)' }}
            >
              Monthly Plans
            </button>

            {/* Service points according to price/plan below monthly plans */}
            {dmHighlights.length > 0 && (
              <div style={{
                marginTop: 16,
                paddingTop: 14,
                borderTop: '1px solid rgba(255,255,255,.18)'
              }}>
                <div style={{
                  fontSize: 11,
                  fontFamily: 'var(--font)',
                  fontWeight: 800,
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,.7)',
                  marginBottom: 10
                }}>
                  Key Service Highlights:
                </div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8
                }}>
                  {dmHighlights.map((pt, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      fontSize: 12.5,
                      color: 'rgba(255,255,255,.9)',
                      lineHeight: 1.45
                    }}>
                      <svg style={{ width: 14, height: 14, stroke: '#38BDF8', fill: 'none', strokeWidth: 2.5, flex: 'none', marginTop: 2 }} viewBox="0 0 24 24">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <BuyNowButton svc={svc} priceCard={priceCard} />
        )}
      </div>
      <div style={{ marginBottom: 16 }}><QuoteForm svc={svc} /></div>
      <div className="help-card">
        <h4>{helpCard.title}</h4>
        <p>{helpCard.body}</p>
        <button className="btn btn-soft" data-open-ai="true" style={{ width: '100%', marginBottom: 8, justifyContent: 'center' }}>Ask Sneha</button>
        <Link to="/company/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Talk to an Expert</Link>
      </div>
    </aside>
  )
}

/* ── Homepage-style stat pills shown on hero, tailored per service category ── */
function getTrustPills(svc) {
  if (svc?.slug === 'iso-certification') {
    return ['100% Digital', 'Dedicated Manager', 'Transparent Pricing', 'Globally Certified']
  }
  if (EXCLUDED_GOVT_SERVICES.has(svc?.slug)) {
    return ['100% Digital', 'Dedicated Manager', 'Transparent Pricing', 'Verified Experts']
  }
  if (isRegistrationService(svc)) {
    return ['100% Digital', 'Dedicated Manager', 'Transparent Pricing', 'Govt. Compliant']
  }
  if (isITService(svc)) {
    return ['100% Digital', 'Dedicated Manager', 'Transparent Pricing', 'Production Ready']
  }
  if (isDigitalMarketingService(svc)) {
    return ['100% Digital', 'Dedicated Manager', 'Transparent Pricing', 'ROI Driven']
  }
  return ['100% Digital', 'Dedicated Manager', 'Transparent Pricing', 'Verified Experts']
}

/* ── Dynamic Category Icon Selector for Service Subsections ── */
function getServiceSubIcon(category = '', title = '') {
  const t = `${category} ${title}`.toLowerCase()
  if (t.includes('seo') || t.includes('marketing') || t.includes('growth') || t.includes('ads') || t.includes('content') || t.includes('social')) {
    // Trend / Growth icon
    return (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    )
  }
  if (t.includes('web') || t.includes('app') || t.includes('software') || t.includes('tech') || t.includes('saas') || t.includes('automate') || t.includes('email') || t.includes('hosting')) {
    // Device / Web icon
    return (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  }
  if (t.includes('trademark') || t.includes('patent') || t.includes('copyright') || t.includes('legal') || t.includes('ip') || t.includes('agreement') || t.includes('iso')) {
    // Shield / Legal icon
    return (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  }
  if (t.includes('tax') || t.includes('gst') || t.includes('accounting') || t.includes('payroll') || t.includes('roc') || t.includes('compliance') || t.includes('audit') || t.includes('income')) {
    // Document / Compliance icon
    return (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    )
  }
  // Company / Startup setup icon
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M6 21V7l6-4 6 4v14M10 9h4M10 13h4" />
    </svg>
  )
}

/* ── Service-specific animated related content showcase ── */
function ServiceHeroVisual({ svc }) {
  const { title, eyebrow, crumbCategory, related, sections, priceCard } = svc
  const relItems = related && related.length > 0 ? related.slice(0, 3) : []

  // Extract clean deliverable highlight pills from service data or sensible defaults
  const deliverablePills = sections?.included?.items && sections.included.items.length > 0
    ? sections.included.items.slice(0, 3).map(it => it.replace(/<[^>]*>?/gm, '').split(/[\(\—\-]/)[0].trim())
    : ['Dedicated RM', '100% Digital Process', 'Transparent SLA']

  // Clean concise top floating price badge text
  const shortPrice = priceCard?.price ? priceCard.price.split(/[\+\*\(]/)[0].trim() : null
  const floatTopText = shortPrice ? `From ${shortPrice}` : 'Fast-Track SLA'

  return (
    <div className="svc-hero-visual reveal-up in" aria-label={`${title} related ecosystem`}>
      <div className="svc-visual-glow" aria-hidden="true" />

      {/* Floating accent badge top-right */}
      <div className="svc-float-badge svc-float-badge--top">
        <span style={{ color: '#F59E0B' }} aria-hidden="true">⚡</span>
        <span>{floatTopText}</span>
      </div>

      <div className="svc-visual-card">
        {/* Header with live pulse */}
        <div className="svc-visual-header">
          <div className="svc-visual-badge" title={eyebrow || `${crumbCategory} Solution`}>
            <span className="svc-visual-live-dot" aria-hidden="true" />
            <span>{eyebrow || `${crumbCategory} Solution`}</span>
          </div>
          <span className="svc-visual-meta">Verified Service</span>
        </div>

        {/* Section title */}
        <div className="svc-visual-section-label">
          <span>Connected Solutions</span>
          <span>{relItems.length} Related</span>
        </div>

        {/* List of related solutions tailored to this content */}
        <div className="svc-rel-list">
          {relItems.map((item, idx) => (
            <Link key={item.href || idx} to={item.href} className="svc-rel-card" title={item.label}>
              <div className="svc-rel-left">
                <div className="svc-rel-icon" aria-hidden="true">
                  {getServiceSubIcon(crumbCategory, item.label)}
                </div>
                <div className="svc-rel-info">
                  <div className="svc-rel-title">{item.label}</div>
                  <div className="svc-rel-note">{item.note || 'Explore connected solutions'}</div>
                </div>
              </div>
              <svg className="svc-rel-arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Key deliverables footer */}
        <div className="svc-deliv-wrap">
          {deliverablePills.map((pill, idx) => (
            <span key={idx} className="svc-deliv-pill">
              ✓ {pill}
            </span>
          ))}
        </div>
      </div>

      {/* Floating accent badge bottom-left */}
      <div className="svc-float-badge svc-float-badge--bot">
        {svc?.slug === 'iso-certification' ? (
          <>
            <span style={{ color: '#10B981' }}>🛡️</span>
            <span>Accredited & ISO Certified</span>
          </>
        ) : EXCLUDED_GOVT_SERVICES.has(svc?.slug) ? (
          <>
            <span style={{ color: '#10B981' }}>🛡️</span>
            <span>100% Verified & Secure</span>
          </>
        ) : isRegistrationService(svc) ? (
          <>
            <span style={{ color: '#10B981' }}>🛡️</span>
            <span>100% Compliant & Secure</span>
          </>
        ) : isITService(svc) ? (
          <>
            <span style={{ color: '#10B981' }}>⚡</span>
            <span>Modern & High Performance</span>
          </>
        ) : isDigitalMarketingService(svc) ? (
          <>
            <span style={{ color: '#10B981' }}>📈</span>
            <span>Targeted & Results Driven</span>
          </>
        ) : (
          <>
            <span style={{ color: '#10B981' }}>🛡️</span>
            <span>Verified & Reliable</span>
          </>
        )}
      </div>
    </div>
  )
}

export default function ServicePage({ svc }) {
  const { title, eyebrow, crumbCategory, lead, toc, sections, related, priceCard, helpCard, slug } = svc
  /* Filter pricing section from TOC and section order */
  const filteredToc = toc.filter(t => t.href !== '#pricing')
  const sectionOrder = filteredToc.map(t => t.href.replace('#', ''))
  const schemas = [
    serviceSchema(svc, slug),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: crumbCategory, url: '/services' }, { name: title, url: `/services/${slug}` }]),
    sections.faq ? faqSchema(sections.faq.items) : null,
  ].filter(Boolean)

  return (
    <>
      <SEO title={svc.metaTitle?.replace(' | LauncherDesk', '') || title} description={svc.metaDesc} canonical={`/services/${slug}`} jsonLd={schemas} />

      {/* ── Hero ── */}
      <header className="page-hero" style={{
        background: 'linear-gradient(180deg, #FBFDFF 0%, #F3F8FF 55%, #EEF5FF 100%)',
        borderBottom: '1px solid var(--line)',
        paddingTop: 'clamp(28px,4vw,48px)',
        paddingBottom: 'clamp(28px,4vw,48px)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(700px 500px at 80% -10%, rgba(43,114,212,.10), transparent 65%), radial-gradient(500px 400px at 5% 105%, rgba(43,114,212,.07), transparent 60%)'
        }} />
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="svc-hero-grid">
            <div className="svc-hero-content">
              <nav className="crumb reveal-up in" aria-label="Breadcrumb" style={{ marginBottom: 14 }}>
                <Link to="/">Home</Link><ChevSvg />
                <Link to="/services">Services</Link><ChevSvg />
                <span>{crumbCategory}</span><ChevSvg />
                <span className="cur" aria-current="page">{title}</span>
              </nav>
              {/* Eyebrow — CSS ::before on .page-hero .eyebrow adds the dot automatically */}
              <span className="eyebrow reveal-up in" style={{ marginBottom: 16 }}>{eyebrow}</span>
              <h1 className="reveal-up in" style={{ fontSize: 'clamp(23px, 4.8vw, 48px)', fontWeight: 900, letterSpacing: '-.04em', lineHeight: 1.08, color: 'var(--navy)', margin: '14px 0 16px', maxWidth: 640, overflowWrap: 'break-word', wordBreak: 'normal' }}>
                {title}
              </h1>
              <p className="reveal-up in" style={{ fontSize: 'clamp(14px,1.5vw,16px)', color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 560, marginBottom: 24 }}>
                {lead}
              </p>
              <div className="hero-cta reveal-up in" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
                <Link to="/company/contact" className="btn btn-primary">
                  Talk to an Expert{' '}
                  <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ARROW} /></svg>
                </Link>
                <a href={`https://wa.me/918548854859?text=${encodeURIComponent(`Hi, I'm interested in ${title}`)}`} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ fontWeight: 700, boxShadow: '0 4px 14px rgba(37,211,102,.3)' }}>
                  <svg viewBox="0 0 32 32" width={18} height={18} fill="currentColor" aria-hidden="true"><path d={WA_PATH} /></svg>
                  WhatsApp Us
                </a>
              </div>
              <div className="svc-trust-pills reveal-up in">
                {getTrustPills(svc).map(t => (
                  <div key={t} className="svc-trust-pill">
                    <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="var(--blue)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={CHECK} /></svg>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="svc-hero-visual-col">
              <ServiceHeroVisual svc={svc} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Body — 3-column layout ── */}
      <section className="section-sm" style={{ overflow: 'visible' }}>
        <div className="wrap" style={{ overflow: 'visible' }}>
          <div className="svc-layout" style={{ overflow: 'visible' }}>
            <div className="svc-toc-col"><Toc items={filteredToc} /></div>
            <main className="svc-body">
              {sectionOrder.map(id =>
                id === 'faq'
                  ? <FaqSection key="faq" data={sections.faq} />
                  : <SectionContent key={id} id={id} data={sections[id]} />
              )}
              {isRegistrationService(svc) && svc?.slug !== 'iso-certification' && (
                <div style={{ marginTop: 28, padding: '12px 16px', borderRadius: 10, background: '#F8FAFC', border: '1px solid var(--line)', fontSize: 12.5, color: 'var(--text-3)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--text-2)' }}>Please note:</strong> LauncherDesk assists with preparation and submission. Final approval depends on the government authority and may vary by document completeness and workload.
                </div>
              )}
            </main>
            <div className="svc-aside-col"><ServiceAside priceCard={priceCard} helpCard={helpCard} svc={svc} /></div>
          </div>
        </div>
      </section>

      {related && related.length > 0 && <RelatedServices items={related} />}
    </>
  )
}