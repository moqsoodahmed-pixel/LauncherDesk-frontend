import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

/* ─────────────────────────────────────────
   FREE DEMO REQUEST — instead of sending visitors straight to the vendor
   site, collect the request so LauncherDesk can arrange the demo.
   Saved through the existing /api/quotes endpoint.
───────────────────────────────────────── */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const DEMO_STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry']

export default function FreeDemoModal({ product, onClose }) {
  const [f, setF] = useState({ name: '', mobile: '', email: '', state: '', company: '' })
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [done, setDone] = useState(false)
  const set = k => e => setF(v => ({ ...v, [k]: e.target.value }))
  const inp = { width: '100%', height: 40, boxSizing: 'border-box', border: '1.5px solid #E2E8F0', borderRadius: 8, padding: '0 12px', fontSize: 14, fontFamily: 'inherit', outline: 'none', background: '#fff', color: '#1C2434' }
  const lbl = { display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 4 }

  async function submit(e) {
    e.preventDefault()
    if (!f.name.trim() || !f.mobile.trim() || !f.email.trim() || !f.state) { setErr('Please fill all required fields.'); return }
    if (!/^\+?[0-9\s\-()]{10,15}$/.test(f.mobile.trim())) { setErr('Please enter a valid mobile number.'); return }
    setBusy(true); setErr('')
    try {
      const r = await fetch(`${API_BASE}/quotes`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.name.trim(), email: f.email.trim(), mobile: f.mobile.trim(), state: f.state,
          serviceSlug: `${product.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-free-demo`,
          serviceTitle: `${product} — Free Demo`, businessType: '',
          additionalInfo: f.company.trim() ? `Company: ${f.company.trim()}` : '',
        }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.message || 'Could not submit your request')
      setDone(true)
    } catch (e2) { setErr(e2.message || 'Something went wrong. Please try again.') }
    finally { setBusy(false) }
  }

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])

  return createPortal(
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(15,28,46,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div role="dialog" aria-modal="true" aria-labelledby="demo-h" onClick={e => e.stopPropagation()}
        style={{ position: 'relative', background: '#fff', borderRadius: 16, width: '100%', maxWidth: 440, maxHeight: '90vh', overflowY: 'auto', padding: '26px 22px 22px', boxShadow: '0 30px 80px rgba(15,28,46,.35)' }}>
        <button type="button" onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 10, right: 10, width: 34, height: 34, borderRadius: '50%', border: 0, background: '#F1F5F9', fontSize: 20, cursor: 'pointer' }}>×</button>
        {done ? (
          <div role="status" style={{ textAlign: 'center', padding: '10px 4px' }}>
            <h3 id="demo-h" style={{ fontSize: 19, fontWeight: 800, color: '#15803D', margin: '0 0 6px' }}>Demo request received!</h3>
            <p style={{ fontSize: 14, color: '#475569', margin: '0 0 16px' }}>Our team will contact you within one business day to schedule your {product} demo.</p>
            <button type="button" onClick={onClose} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <div>
              <h3 id="demo-h" style={{ fontSize: 19, fontWeight: 800, color: '#1E3A6A', margin: 0 }}>Get a free {product} demo</h3>
              <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 6px' }}>Free walkthrough · No commitment</p>
            </div>
            <div><label htmlFor="dm-name" style={lbl}>Full Name *</label><input id="dm-name" style={inp} value={f.name} onChange={set('name')} placeholder="Your name" /></div>
            <div><label htmlFor="dm-mobile" style={lbl}>Mobile *</label><input id="dm-mobile" type="tel" style={inp} value={f.mobile} onChange={set('mobile')} placeholder="+91 98765 43210" /></div>
            <div><label htmlFor="dm-email" style={lbl}>Email *</label><input id="dm-email" type="email" style={inp} value={f.email} onChange={set('email')} placeholder="you@example.com" /></div>
            <div>
              <label htmlFor="dm-state" style={lbl}>State *</label>
              <select id="dm-state" style={{ ...inp, cursor: 'pointer' }} value={f.state} onChange={set('state')}>
                <option value="">Select state…</option>
                {DEMO_STATES.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
            <div><label htmlFor="dm-co" style={lbl}>Company name <span style={{ fontWeight: 400 }}>(optional)</span></label><input id="dm-co" style={inp} value={f.company} onChange={set('company')} placeholder="Your company" /></div>
            {err && <div role="alert" style={{ color: '#DC2626', fontSize: 12.5, background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, padding: '8px 10px' }}>{err}</div>}
            <button type="submit" disabled={busy} className="btn btn-primary" style={{ justifyContent: 'center', opacity: busy ? .7 : 1 }}>{busy ? 'Sending…' : 'Get Free Demo →'}</button>
          </form>
        )}
      </div>
    </div>,
    document.body
  )
}