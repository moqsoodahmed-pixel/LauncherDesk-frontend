import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { GOVT_FEE_BREAKDOWN } from '../data/registrationPlans'
import { calcBreakdown, fmtPaise, parseRupees, GST_RATE } from '../lib/pricing'
import { loadRazorpayScript } from '../lib/razorpay'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const SLUG = 'trademark-registration'
const MAX_CLASSES = 10
// Must match the server (backend: src/config/planPrices.js → TRADEMARK.professionalFeePerClass).
const PROFESSIONAL_FEE_PER_CLASS = false

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
]

const CSS = `
.tmk-overlay { position:fixed; inset:0; z-index:10000; background:rgba(15,28,46,.55); display:flex; align-items:center; justify-content:center; padding:16px; }
.tmk-box { position:relative; background:#fff; border-radius:18px; width:100%; max-width:920px; max-height:94vh; overflow-y:auto; box-shadow:0 30px 80px rgba(15,28,46,.35); }
.tmk-close { position:absolute; top:12px; right:12px; width:36px; height:36px; border-radius:50%; border:0; background:#F1F5F9; color:#334155; font-size:20px; line-height:1; cursor:pointer; z-index:2; }
.tmk-grid { display:grid; grid-template-columns:1.1fr .9fr; }
.tmk-form { padding:30px 28px; }
.tmk-summary { padding:30px 26px; background:#F5F8FF; border-left:1px solid var(--line); border-radius:0 18px 18px 0; }
.tmk-title { font-size:21px; font-weight:800; color:var(--navy); margin:0 0 4px; letter-spacing:-.01em; padding-right:30px; }
.tmk-sub { font-size:13.5px; color:var(--text-3); margin:0 0 18px; line-height:1.5; }
.tmk-field { margin-bottom:14px; }
.tmk-label { display:block; font-size:12.5px; font-weight:700; color:var(--text-2); margin-bottom:6px; }
.tmk-opt { font-weight:600; color:var(--text-3); }
.tmk-input { width:100%; box-sizing:border-box; padding:12px 13px; border:1.5px solid #D5DEEC; border-radius:10px; font:inherit; font-size:15px; color:var(--navy); background:#fff; outline:none; transition:border-color .15s, box-shadow .15s; }
.tmk-input:focus { border-color:var(--blue); box-shadow:0 0 0 3px rgba(29,111,224,.15); }
.tmk-input.tmk-bad { border-color:#DC2626; }
.tmk-err { color:#DC2626; font-size:12px; margin-top:4px; }
.tmk-pills { display:flex; flex-wrap:wrap; gap:8px; }
.tmk-pill { border:1.5px solid #D5DEEC; background:#fff; color:var(--text-2); border-radius:12px; padding:10px 14px; font:inherit; font-size:13px; font-weight:700; cursor:pointer; text-align:left; line-height:1.35; flex:1 1 180px; }
.tmk-pill small { display:block; font-weight:600; font-size:11.5px; opacity:.85; margin-top:2px; }
.tmk-pill[aria-pressed="true"] { background:var(--blue); border-color:var(--blue); color:#fff; }
.tmk-row2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.tmk-step { display:inline-flex; align-items:center; border:1.5px solid #D5DEEC; border-radius:10px; overflow:hidden; background:#fff; }
.tmk-step button { width:42px; height:44px; border:0; background:#F8FAFC; font-size:20px; font-weight:700; color:var(--navy); cursor:pointer; }
.tmk-step button:disabled { opacity:.4; cursor:not-allowed; }
.tmk-step output { min-width:46px; text-align:center; font-size:16px; font-weight:800; color:var(--navy); }
.tmk-hint { font-size:12px; color:var(--text-3); margin-top:6px; line-height:1.45; }
.tmk-phone { display:flex; gap:8px; }
.tmk-cc { flex:none; padding:12px 12px; border:1.5px solid #D5DEEC; border-radius:10px; background:#F8FAFC; font-size:15px; font-weight:700; color:var(--text-2); }
.tmk-check { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:var(--text-2); line-height:1.45; margin:4px 0 18px; cursor:pointer; }
.tmk-check input { margin-top:3px; width:16px; height:16px; accent-color:var(--blue); }
.tmk-pay { width:100%; padding:15px; border:0; border-radius:12px; background:linear-gradient(180deg,#2F7BEA 0%,#1D6FE0 100%); color:#fff; font:inherit; font-size:16px; font-weight:800; cursor:pointer; box-shadow:0 10px 22px rgba(29,111,224,.3); transition:transform .15s, opacity .15s; }
.tmk-pay:hover:not(:disabled) { transform:translateY(-1px); }
.tmk-pay:disabled { opacity:.7; cursor:not-allowed; }
.tmk-secure { text-align:center; font-size:12px; color:var(--text-3); margin-top:10px; }
.tmk-alert { margin-bottom:14px; padding:10px 12px; border-radius:8px; font-size:13px; line-height:1.5; background:#FEF2F2; border:1px solid #FECACA; color:#B91C1C; }
.tmk-s-title { font-size:12px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; color:var(--text-3); margin:0 0 4px; }
.tmk-s-plan { font-size:17px; font-weight:800; color:var(--navy); margin:0 0 4px; line-height:1.3; }
.tmk-s-meta { font-size:13px; color:var(--text-3); margin:0 0 16px; }
.tmk-row { display:flex; justify-content:space-between; gap:12px; padding:9px 0; font-size:14px; color:var(--text-2); border-bottom:1px solid #E3EAF6; }
.tmk-row b { color:var(--navy); white-space:nowrap; }
.tmk-row small { display:block; font-size:11.5px; color:var(--text-3); margin-top:2px; }
.tmk-total { display:flex; justify-content:space-between; align-items:baseline; padding:14px 0 4px; font-size:15px; font-weight:800; color:var(--navy); }
.tmk-total span:last-child { font-size:24px; letter-spacing:-.02em; }
.tmk-later { margin-top:14px; padding:12px 13px; border-radius:10px; background:#fff; border:1px dashed #B9C8E6; }
.tmk-later .tmk-row { border:0; padding:2px 0; }
.tmk-later p { margin:6px 0 0; font-size:12px; color:var(--text-3); line-height:1.5; }
.tmk-all { margin-top:10px; padding-top:8px; border-top:1px solid #E3EAF6; display:flex; justify-content:space-between; font-size:12.5px; color:var(--text-3); }
.tmk-all b { color:var(--navy); }
.tmk-terms { margin-top:14px; font-size:12.5px; color:var(--text-2); }
.tmk-terms summary { cursor:pointer; font-weight:800; color:var(--navy); font-size:13px; }
.tmk-terms ul { margin:8px 0 0; padding-left:18px; display:flex; flex-direction:column; gap:5px; line-height:1.5; }
.tmk-done { padding:44px 28px; text-align:center; }
.tmk-tick { width:56px; height:56px; border-radius:50%; background:#DCFCE7; color:#16A34A; display:flex; align-items:center; justify-content:center; margin:0 auto 14px; font-size:28px; }
.tmk-order { display:inline-block; margin:10px 0 16px; padding:8px 14px; border-radius:8px; background:#EEF4FF; color:var(--navy); font-weight:800; font-size:14px; }
@media (max-width: 760px) {
  .tmk-grid { grid-template-columns:1fr; }
  .tmk-summary { order:-1; border-left:0; border-bottom:1px solid var(--line); border-radius:18px 18px 0 0; padding:24px 22px 18px; }
  .tmk-form { padding:22px; }
  .tmk-row2 { grid-template-columns:1fr; }
}
`

function cleanPhone(raw) {
  let d = String(raw || '').replace(/\D/g, '')
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2)
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1)
  return d
}

function validate(f) {
  const e = {}
  if (!f.name.trim()) e.name = 'Please enter your name'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address'
  if (!/^[6-9]\d{9}$/.test(cleanPhone(f.mobile))) e.mobile = 'Enter a valid 10-digit mobile number'
  if (!f.state) e.state = 'Please select your state'
  return e
}

/*
  Opens from "+ Govt fee" on the trademark page. The customer picks the applicant
  type and number of classes (this sets the government fee), enters their details
  and state, then pays the LauncherDesk fee + 18% GST through Razorpay.
  The government fee is shown but paid separately, so it is not charged here.
*/
export default function TrademarkCheckoutModal({ svc, onClose }) {
  const cfg = GOVT_FEE_BREAKDOWN[SLUG]
  const categories = cfg?.categories || []
  const terms = cfg?.terms || []
  const baseFee = parseRupees(svc?.priceCard?.price)

  const [f, setF] = useState({ name: '', email: '', mobile: '', state: '', brand: '', whatsapp: false })
  const [applicant, setApplicant] = useState(categories[0]?.key || 'small')
  const [classes, setClasses] = useState(1)
  const [errs, setErrs] = useState({})
  const [busy, setBusy] = useState(false)
  const [alert, setAlert] = useState('')
  const [done, setDone] = useState(null)
  const firstRef = useRef(null)

  const cat = categories.find(c => c.key === applicant) || categories[0]
  const perClass = cat?.rows?.[0]?.amount || 0
  const govtPaise = perClass * classes * 100
  const { feePaise, gstPaise, totalPaise } = useMemo(
    () => calcBreakdown(baseFee * (PROFESSIONAL_FEE_PER_CLASS ? classes : 1)),
    [baseFee, classes]
  )

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape' && !busy) onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstRef.current?.focus()
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose, busy])

  const set = k => e => {
    const v = k === 'whatsapp' ? e.target.checked : e.target.value
    setF(p => ({ ...p, [k]: v }))
    if (errs[k]) setErrs(p => ({ ...p, [k]: undefined }))
  }

  async function pay(e) {
    e.preventDefault()
    const v = validate(f)
    setErrs(v); setAlert('')
    if (Object.keys(v).length) return
    setBusy(true)
    const mobile = '+91' + cleanPhone(f.mobile)
    try {
      const res = await fetch(`${API_BASE}/payments/checkout/trademark/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.name.trim(), email: f.email.trim(), mobile, state: f.state,
          applicantType: applicant, classes, brandName: f.brand.trim(), whatsappOptIn: f.whatsapp,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.fields) setErrs(p => ({ ...p, ...data.fields }))
        throw new Error(data.message || 'Could not start the payment')
      }
      // Safety net: never open payment for an amount different from what the customer saw.
      if (data.breakdown && data.breakdown.totalPaise !== totalPaise) {
        throw new Error('The price on this page is out of date. Please refresh the page and try again.')
      }
      await loadRazorpayScript()
      await new Promise(resolve => {
        const rzp = new window.Razorpay({
          key: data.keyId, amount: data.amount, currency: data.currency, order_id: data.orderId,
          name: 'LauncherDesk', description: `${svc.title} — ${classes} ${classes === 1 ? 'class' : 'classes'}`,
          image: '/launcherdesk-logo-transparent.png',
          prefill: { name: f.name.trim(), email: f.email.trim(), contact: mobile },
          notes: { state: f.state },
          theme: { color: '#1D6FE0' },
          handler: async response => {
            try {
              const vr = await fetch(`${API_BASE}/payments/checkout/verify`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              })
              const vd = await vr.json()
              setDone({ ok: !!vd.success, orderNumber: vd.orderNumber })
            } catch {
              setDone({ ok: false })
            }
            resolve()
          },
          modal: { ondismiss: () => resolve() },
        })
        rzp.on('payment.failed', r => setAlert(r?.error?.description || 'The payment did not go through. You can try again.'))
        rzp.open()
      })
    } catch (err) {
      setAlert(err.message || 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const input = (k, label, props = {}, optional = false) => (
    <div className="tmk-field">
      <label className="tmk-label" htmlFor={`tmk-${k}`}>{label}{optional && <span className="tmk-opt"> (optional)</span>}</label>
      <input id={`tmk-${k}`} className={`tmk-input${errs[k] ? ' tmk-bad' : ''}`} value={f[k]} onChange={set(k)}
        aria-invalid={!!errs[k]} aria-describedby={errs[k] ? `tmk-${k}-e` : undefined} {...props} />
      {errs[k] && <div className="tmk-err" id={`tmk-${k}-e`}>{errs[k]}</div>}
    </div>
  )

  return createPortal(
    <div className="tmk-overlay" role="presentation" onClick={() => { if (!busy) onClose() }}>
      <style>{CSS}</style>
      <div className="tmk-box" role="dialog" aria-modal="true" aria-labelledby="tmk-title" onClick={e => e.stopPropagation()}>
        <button type="button" className="tmk-close" onClick={onClose} disabled={busy} aria-label="Close">×</button>

        {done ? (
          <div className="tmk-done">
            <div className="tmk-tick" aria-hidden="true">{done.ok ? '✓' : '!'}</div>
            <h3 className="tmk-title" id="tmk-title" style={{ padding: 0 }}>{done.ok ? 'Payment successful' : 'Payment received'}</h3>
            {done.orderNumber && <div className="tmk-order">Order {done.orderNumber}</div>}
            <p className="tmk-sub" style={{ maxWidth: 440, margin: '0 auto 18px' }}>
              {done.ok
                ? `Thank you! A confirmation will be sent to ${f.email}. Our team will call you on +91 ${cleanPhone(f.mobile)} within 1 business day to confirm your brand, class and the government fee.`
                : 'We got your payment but could not confirm it on screen. Please contact support@launcherdesk.com with your email and we will confirm it for you.'}
            </p>
            <button type="button" className="tmk-pay" style={{ maxWidth: 220 }} onClick={onClose}>Done</button>
          </div>
        ) : (
          <div className="tmk-grid">
            <form className="tmk-form" onSubmit={pay} noValidate>
              <h3 className="tmk-title" id="tmk-title">Start your trademark registration</h3>
              <p className="tmk-sub">Tell us about the applicant and your details. You pay securely at the last step.</p>
              {alert && <div className="tmk-alert" role="alert">{alert}</div>}

              <div className="tmk-field">
                <span className="tmk-label" id="tmk-app-l">Who is applying?</span>
                <div className="tmk-pills" role="group" aria-labelledby="tmk-app-l">
                  {categories.map(c => (
                    <button key={c.key} type="button" className="tmk-pill" aria-pressed={c.key === applicant} onClick={() => setApplicant(c.key)}>
                      {c.label}<small>Govt fee {fmtPaise((c.rows?.[0]?.amount || 0) * 100)} per class</small>
                    </button>
                  ))}
                </div>
              </div>

              <div className="tmk-field">
                <span className="tmk-label" id="tmk-cls-l">Number of classes</span>
                <div className="tmk-step" role="group" aria-labelledby="tmk-cls-l">
                  <button type="button" onClick={() => setClasses(c => Math.max(1, c - 1))} disabled={classes <= 1} aria-label="Fewer classes">−</button>
                  <output aria-live="polite">{classes}</output>
                  <button type="button" onClick={() => setClasses(c => Math.min(MAX_CLASSES, c + 1))} disabled={classes >= MAX_CLASSES} aria-label="More classes">+</button>
                </div>
                <div className="tmk-hint">Not sure? Keep 1 — we check the right class(es) for your business during the search.</div>
              </div>

              {input('name', 'Full name', { ref: firstRef, type: 'text', autoComplete: 'name', placeholder: 'As on your PAN / ID' })}
              {input('email', 'Email address', { type: 'email', autoComplete: 'email', inputMode: 'email', placeholder: 'you@gmail.com' })}
              <div className="tmk-row2">
                <div className="tmk-field">
                  <label className="tmk-label" htmlFor="tmk-mobile">Mobile number</label>
                  <div className="tmk-phone">
                    <span className="tmk-cc" aria-hidden="true">+91</span>
                    <input id="tmk-mobile" className={`tmk-input${errs.mobile ? ' tmk-bad' : ''}`} value={f.mobile} onChange={set('mobile')}
                      type="tel" autoComplete="tel-national" inputMode="numeric" placeholder="98765 43210" maxLength={15}
                      aria-invalid={!!errs.mobile} aria-describedby={errs.mobile ? 'tmk-mobile-e' : undefined} />
                  </div>
                  {errs.mobile && <div className="tmk-err" id="tmk-mobile-e">{errs.mobile}</div>}
                </div>
                <div className="tmk-field">
                  <label className="tmk-label" htmlFor="tmk-state">State</label>
                  <select id="tmk-state" className={`tmk-input${errs.state ? ' tmk-bad' : ''}`} value={f.state} onChange={set('state')}
                    autoComplete="address-level1" aria-invalid={!!errs.state} aria-describedby={errs.state ? 'tmk-state-e' : undefined}>
                    <option value="">Select your state</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errs.state && <div className="tmk-err" id="tmk-state-e">{errs.state}</div>}
                </div>
              </div>
              {input('brand', 'Brand name to register', { type: 'text', maxLength: 120, placeholder: 'e.g. Acme Foods' }, true)}

              <label className="tmk-check">
                <input type="checkbox" checked={f.whatsapp} onChange={set('whatsapp')} />
                <span>Send me order updates on WhatsApp</span>
              </label>

              <button type="submit" className="tmk-pay" disabled={busy} aria-busy={busy}>
                {busy ? 'Opening secure payment…' : `Pay ${fmtPaise(totalPaise)} securely`}
              </button>
              <div className="tmk-secure">🔒 Payments are processed by Razorpay — UPI, cards, net banking &amp; wallets</div>
            </form>

            <aside className="tmk-summary" aria-label="Order summary">
              <p className="tmk-s-title">Order summary</p>
              <p className="tmk-s-plan">{svc.title}</p>
              <p className="tmk-s-meta">{classes} {classes === 1 ? 'class' : 'classes'} · {cat?.label}</p>

              <div className="tmk-row"><span>Professional fee</span><b>{fmtPaise(feePaise)}</b></div>
              <div className="tmk-row"><span>GST @ {Math.round(GST_RATE * 100)}%<small>On professional fee only</small></span><b>{fmtPaise(gstPaise)}</b></div>
              <div className="tmk-total"><span>Pay now</span><span>{fmtPaise(totalPaise)}</span></div>

              <div className="tmk-later">
                <div className="tmk-row">
                  <span>Government fee<small>{fmtPaise(perClass * 100)} × {classes} {classes === 1 ? 'class' : 'classes'} · IP India, Form TM-A e-filing</small></span>
                  <b>{fmtPaise(govtPaise)}</b>
                </div>
                <p>Not charged today. It is paid separately when we file your application, and GST does not apply to it.</p>
                <div className="tmk-all"><span>Estimated overall total</span><b>{fmtPaise(totalPaise + govtPaise)}</b></div>
              </div>

              {terms.length > 0 && (
                <details className="tmk-terms">
                  <summary>Terms &amp; Conditions</summary>
                  <ul>{terms.map(t => <li key={t}>{t}</li>)}</ul>
                </details>
              )}
            </aside>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}