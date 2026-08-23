import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CHEV = 'm9 18 6-6-6-6'
const API_BASE = import.meta.env.VITE_API_URL || 'https://launcherdesk-backend-production.up.railway.app/api'

const REQUIREMENT_OPTIONS = [
  'Company Setup',
  'GST & Compliance',
  'Website / Technology',
  'Accounting & Tax',
  'Marketing & Growth',
  'Legal & IP',
  'International Expansion',
  'Fundraising Support',
  'Something Else',
]

/* ── Roadmap display (shown from finder data) ── */
function RoadmapSummary({ roadmap }) {
  if (!roadmap || !roadmap.plan || roadmap.plan.length === 0) return null
  const priLabel = { hi: 'Now', mid: 'Soon', low: 'Later' }
  const priClass = { hi: 'hi', mid: 'mid', low: 'low' }
  return (
    <div style={{
      background: 'linear-gradient(160deg,#0d2340,#084C97)',
      borderRadius: 16,
      padding: '24px 26px',
      marginBottom: 24,
      color: '#fff',
    }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font)', fontWeight: 800, letterSpacing: '.16em', textTransform: 'uppercase', color: '#7fb4dc', marginBottom: 6 }}>
        Your LauncherDesk Roadmap
      </div>
      <h3 style={{ color: '#fff', fontSize: 18, marginBottom: 4 }}>Here's what your business needs next</h3>
      {roadmap.answers && (
        <div style={{ fontSize: 13, color: '#a9c6dd', marginBottom: 14, lineHeight: 1.6 }}>
          {roadmap.answers.type && <span><b>What you're building:</b> {roadmap.answers.type} &nbsp;·&nbsp; </span>}
          {roadmap.answers.state && <span><b>State:</b> {roadmap.answers.state} &nbsp;·&nbsp; </span>}
          {roadmap.answers.founders && <span><b>Founders:</b> {roadmap.answers.founders} &nbsp;·&nbsp; </span>}
          {roadmap.answers.turnover && <span><b>Turnover:</b> {roadmap.answers.turnover}</span>}
        </div>
      )}
      <div style={{ borderTop: '1px solid rgba(255,255,255,.15)', paddingTop: 14 }}>
        {roadmap.plan.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: i < roadmap.plan.length - 1 ? '1px solid rgba(255,255,255,.08)' : 'none' }}>
            <span style={{
              fontSize: 10.5, fontFamily: 'var(--font)', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase',
              padding: '4px 9px', borderRadius: 7, flex: 'none', marginTop: 2,
              background: item[2] === 'hi' ? '#fdeaea' : item[2] === 'mid' ? '#fff4e0' : 'rgba(255,255,255,.12)',
              color: item[2] === 'hi' ? '#c0392b' : item[2] === 'mid' ? '#b7791f' : '#a9c6dd',
            }}>
              {priLabel[item[2]] || item[2]}
            </span>
            <div>
              <b style={{ fontFamily: 'var(--font)', fontSize: 14.5, color: '#fff', display: 'block' }}>{item[0]}</b>
              <p style={{ fontSize: 13, color: '#a9c6dd', marginTop: 2 }}>{item[1]}</p>
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11.5, color: '#7fb4dc', marginTop: 14, lineHeight: 1.5 }}>
        General guidance based on your answers. A qualified LauncherDesk professional confirms specifics before anything is filed.
      </p>
    </div>
  )
}

/* ── Contact form ── */
function ContactForm({ roadmap }) {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [requirement, setRequirement] = useState('')
  const [message, setMessage] = useState('')
  const [waConsent, setWaConsent] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !mobile.trim()) { setError('Name and mobile are required.'); return }
    setLoading(true)
    setError('')

    // Build message — include roadmap if available
    let fullMessage = message
    if (roadmap && roadmap.plan && roadmap.plan.length > 0) {
      const roadmapText = roadmap.plan.map(p => `${p[2] === 'hi' ? 'Now' : p[2] === 'mid' ? 'Soon' : 'Later'}: ${p[0]} — ${p[1]}`).join('\n')
      const answersText = roadmap.answers
        ? `Type: ${roadmap.answers.type || '-'}, State: ${roadmap.answers.state || '-'}, Founders: ${roadmap.answers.founders || '-'}, Turnover: ${roadmap.answers.turnover || '-'}`
        : ''
      fullMessage = `[FINDER ANSWERS]\n${answersText}\n\n[RECOMMENDED ROADMAP]\n${roadmapText}\n\n[ADDITIONAL MESSAGE]\n${message}`
    }

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          mobile: mobile.trim(),
          email: email.trim() || undefined,
          state: (roadmap?.answers?.state) || 'Not specified',
          message: fullMessage,
          whatsappOptin: waConsent,
          source: roadmap ? 'service-finder' : 'contact-page',
          service: requirement || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Submission failed')
      // Clear finder data from session storage
      sessionStorage.removeItem('ld_finder_roadmap')
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      // Still mark as submitted even on network errors for UX
      sessionStorage.removeItem('ld_finder_roadmap')
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="form" style={{ minWidth: 0, textAlign: 'center', padding: '48px 32px' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" style={{ width: 52, height: 52, margin: '0 auto 20px' }}>
          <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
        <h3 style={{ fontSize: 22, marginBottom: 12 }}>Thank you for filling in!</h3>
        <p style={{ color: 'var(--text-2)', maxWidth: 380, margin: '0 auto 8px' }}>Our expert will contact you soon.</p>
        <p style={{ color: 'var(--text-3)', maxWidth: 380, margin: '0 auto 24px', fontSize: 13.5 }}>
          For faster response, WhatsApp us at +91 85488 54859.
        </p>
        <a
          href="https://wa.me/918548854859?text=Hi%20LauncherDesk%2C%20I%20just%20submitted%20an%20enquiry%20and%20wanted%20to%20follow%20up."
          className="btn btn-wa"
          style={{ display: 'inline-flex', margin: '0 auto' }}
        >
          Chat on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="form reveal-up" style={{ minWidth: 0 }} id="contact-form">
      {/* Roadmap summary displayed above form */}
      <RoadmapSummary roadmap={roadmap} />

      <h3 style={{ fontSize: 22, marginBottom: 6 }}>Tell us about your requirement</h3>
      <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 22 }}>We'll respond within one business day. For faster response, use WhatsApp.</p>

      <form onSubmit={handleSubmit}>
        <div className="field"><input type="text" required placeholder="Name*" value={name} onChange={e => setName(e.target.value)} /></div>
        <div className="field"><input type="tel" required placeholder="Mobile number*" value={mobile} onChange={e => setMobile(e.target.value)} /></div>
        <div className="field"><input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} /></div>
        <div className="field">
          <select value={requirement} onChange={e => setRequirement(e.target.value)} defaultValue="">
            <option value="" disabled>What do you need help with?</option>
            {REQUIREMENT_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="field">
          <textarea
            placeholder="Tell us more about your requirement (optional)"
            style={{ minHeight: 90 }}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        {error && <p style={{ color: '#e53e3e', fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
          disabled={loading}
        >
          {loading ? 'Sending…' : 'Send My Requirement'}
        </button>
        <label className="form-check" style={{ marginTop: 14 }}>
          <input type="checkbox" checked={waConsent} onChange={e => setWaConsent(e.target.checked)} />
          <span>I agree to receive updates on WhatsApp from LauncherDesk.</span>
        </label>
      </form>
    </div>
  )
}

export default function ContactPage() {
  // Change 5: Read finder roadmap from sessionStorage if coming from service finder
  const [roadmap, setRoadmap] = useState(null)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('ld_finder_roadmap')
      if (stored) {
        setRoadmap(JSON.parse(stored))
      }
    } catch (e) { /* ignore */ }
  }, [])

  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">Contact Us</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{ marginTop: 16, display: 'block' }}>Get in touch</span>
          <h1 className="reveal-up in">Tell us what your business needs.</h1>
          <p className="lead reveal-up in">Whether you're starting a company, managing compliance, building technology or looking to grow — start with a conversation. We'll do the rest.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-info reveal-up">
              <div className="ci-row">
                <span className="ic-box">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" stroke="var(--blue-dark)"/></svg>
                </span>
                <div>
                  <b>WhatsApp (fastest response)</b>
                  <span><a href="https://wa.me/918548854859?text=Hi%20LauncherDesk%2C%20I'd%20like%20to%20get%20help%20with%20my%20business." style={{ color: 'var(--blue-dark)', fontWeight: 700 }}>+91 85488 54859</a></span>
                  <span style={{ fontSize: 13, color: 'var(--text-3)', display: 'block', marginTop: 2 }}>We usually respond within minutes during business hours.</span>
                </div>
              </div>
              <div className="ci-row">
                <span className="ic-box">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <div>
                  <b>Phone</b>
                  <span><a href="tel:+918548854859" style={{ color: 'var(--text-2)' }}>+91 85488 54859</a></span>
                  <span style={{ fontSize: 13, color: 'var(--text-3)', display: 'block', marginTop: 2 }}>Speak directly with a member of our team.</span>
                </div>
              </div>
              <div className="ci-row">
                <span className="ic-box">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>
                </span>
                <div>
                  <b>Email</b>
                  <span><a href="mailto:contact@launcherdesk.com" style={{ color: 'var(--text-2)' }}>contact@launcherdesk.com</a></span>
                </div>
              </div>
              <div className="ci-row" style={{ borderBottom: 0 }}>
                <span className="ic-box">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <div>
                  <b>Office</b>
                  <span>4th Block, Koramangala, Bengaluru – 560095, Karnataka, India.</span>
                  <span style={{ fontSize: 12.5, color: 'var(--text-3)', display: 'block', marginTop: 4 }}>DutyLaunch Solutions Private Limited</span>
                </div>
              </div>
            </div>
            <ContactForm roadmap={roadmap} />
          </div>
        </div>
      </section>
    </>
  )
}