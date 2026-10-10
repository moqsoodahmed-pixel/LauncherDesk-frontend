import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { GOVT_FEE_BREAKDOWN } from '../data/registrationPlans'
import { calcBreakdown, fmtPaise, parseRupees, GST_RATE } from '../lib/pricing'
import { loadRazorpayScript } from '../lib/razorpay'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const CITIES = [
  'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
  'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar',
  'Navi Mumbai', 'Allahabad', 'Ranchi', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur',
  'Kota', 'Guwahati', 'Chandigarh', 'Thiruvananthapuram', 'Kochi', 'Mysuru', 'Mangaluru', 'Noida', 'Gurugram', 'Bhubaneswar',
]

const CSS = `
.ckm-overlay { position:fixed; inset:0; z-index:10000; background:rgba(15,28,46,.55); display:flex; align-items:center; justify-content:center; padding:16px; }
.ckm-box { position:relative; background:#fff; border-radius:18px; width:100%; max-width:880px; max-height:94vh; overflow-y:auto; box-shadow:0 30px 80px rgba(15,28,46,.35); }
.ckm-close { position:absolute; top:12px; right:12px; width:36px; height:36px; border-radius:50%; border:0; background:#F1F5F9; color:#334155; font-size:20px; line-height:1; cursor:pointer; z-index:2; }
.ckm-grid { display:grid; grid-template-columns:1.1fr .9fr; }
.ckm-form { padding:30px 28px; }
.ckm-summary { padding:30px 26px; background:#F5F8FF; border-left:1px solid var(--line); border-radius:0 18px 18px 0; }
.ckm-title { font-size:21px; font-weight:800; color:var(--navy); margin:0 0 4px; letter-spacing:-.01em; }
.ckm-sub { font-size:13.5px; color:var(--text-3); margin:0 0 20px; line-height:1.5; }
.ckm-field { margin-bottom:14px; }
.ckm-label { display:block; font-size:12.5px; font-weight:700; color:var(--text-2); margin-bottom:6px; }
.ckm-input { width:100%; box-sizing:border-box; padding:12px 13px; border:1.5px solid #D5DEEC; border-radius:10px; font:inherit; font-size:15px; color:var(--navy); background:#fff; outline:none; transition:border-color .15s, box-shadow .15s; }
.ckm-input:focus { border-color:var(--blue); box-shadow:0 0 0 3px rgba(29,111,224,.15); }
.ckm-input.ckm-bad { border-color:#DC2626; }
.ckm-err { color:#DC2626; font-size:12px; margin-top:4px; }
.ckm-phone { display:flex; gap:8px; }
.ckm-cc { flex:none; padding:12px 12px; border:1.5px solid #D5DEEC; border-radius:10px; background:#F8FAFC; font-size:15px; font-weight:700; color:var(--text-2); }
.ckm-check { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:var(--text-2); line-height:1.45; margin:4px 0 18px; cursor:pointer; }
.ckm-check input { margin-top:3px; width:16px; height:16px; accent-color:var(--blue); }
.ckm-pay { width:100%; padding:15px; border:0; border-radius:12px; background:linear-gradient(180deg,#2F7BEA 0%,#1D6FE0 100%); color:#fff; font:inherit; font-size:16px; font-weight:800; cursor:pointer; box-shadow:0 10px 22px rgba(29,111,224,.3); transition:transform .15s, opacity .15s; }
.ckm-pay:hover:not(:disabled) { transform:translateY(-1px); }
.ckm-pay:disabled { opacity:.7; cursor:not-allowed; }
.ckm-secure { text-align:center; font-size:12px; color:var(--text-3); margin-top:10px; }
.ckm-alert { margin-bottom:14px; padding:10px 12px; border-radius:8px; font-size:13px; line-height:1.5; background:#FEF2F2; border:1px solid #FECACA; color:#B91C1C; }
.ckm-s-title { font-size:12px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; color:var(--text-3); margin:0 0 4px; }
.ckm-s-plan { font-size:17px; font-weight:800; color:var(--navy); margin:0 0 16px; line-height:1.3; }
.ckm-row { display:flex; justify-content:space-between; gap:12px; padding:9px 0; font-size:14px; color:var(--text-2); border-bottom:1px solid #E3EAF6; }
.ckm-row b { color:var(--navy); white-space:nowrap; }
.ckm-row small { display:block; font-size:11.5px; color:var(--text-3); margin-top:2px; }
.ckm-total { display:flex; justify-content:space-between; align-items:baseline; padding:14px 0 4px; font-size:15px; font-weight:800; color:var(--navy); }
.ckm-total span:last-child { font-size:24px; letter-spacing:-.02em; }
.ckm-later { margin-top:14px; padding:12px 13px; border-radius:10px; background:#fff; border:1px dashed #B9C8E6; }
.ckm-later .ckm-row { border:0; padding:2px 0; }
.ckm-later p { margin:6px 0 0; font-size:12px; color:var(--text-3); line-height:1.5; }
.ckm-done { padding:44px 28px; text-align:center; }
.ckm-done .ckm-tick { width:56px; height:56px; border-radius:50%; background:#DCFCE7; color:#16A34A; display:flex; align-items:center; justify-content:center; margin:0 auto 14px; font-size:28px; }
.ckm-done .ckm-order { display:inline-block; margin:10px 0 16px; padding:8px 14px; border-radius:8px; background:#EEF4FF; color:var(--navy); font-weight:800; font-size:14px; }
@media (max-width: 760px) {
  .ckm-grid { grid-template-columns:1fr; }
  .ckm-summary { order:-1; border-left:0; border-bottom:1px solid var(--line); border-radius:18px 18px 0 0; padding:24px 22px 18px; }
  .ckm-form { padding:22px; }
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
  if (!f.city.trim()) e.city = 'Please choose or type your city'
  return e
}

export default function CheckoutModal({ svc, plan, onClose }) {
  const { feePaise, gstPaise, totalPaise } = useMemo(() => calcBreakdown(parseRupees(plan.price)), [plan.price])
  const [f, setF] = useState({ name: '', email: '', mobile: '', city: '', whatsapp: false })
  const [errs, setErrs] = useState({})
  const [busy, setBusy] = useState(false)
  const [alert, setAlert] = useState('')
  const [done, setDone] = useState(null)
  const firstRef = useRef(null)

  // Government fee — shown for information. It is not part of the online payment.
  const govtRows = GOVT_FEE_BREAKDOWN[svc.slug]?.rows || []
  const govtKnown = govtRows.length > 0 && govtRows.every(r => typeof r.amount === 'number')
  const govtTotal = govtRows.reduce((a, r) => a + (r.amount || 0), 0)

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
      const res = await fetch(`${API_BASE}/payments/checkout/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug: svc.slug, tier: plan.tier,
          name: f.name.trim(), email: f.email.trim(), mobile, city: f.city.trim(), whatsappOptIn: f.whatsapp,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.fields) setErrs(p => ({ ...p, ...data.fields }))
        throw new Error(data.message || 'Could not start the payment')
      }
      if (!data.keyId) {
        setAlert('Payment could not be started (missing payment configuration). Please contact support@launcherdesk.com — no amount has been charged.')
        setBusy(false)
        return
      }

      await loadRazorpayScript()
      await new Promise(resolve => {
        // Watchdog — if the checkout modal never calls back (invalid key
        // rejected only internally by the SDK, a mobile webview blocking
        // the iframe, etc.) the button would otherwise stay stuck on its
        // "processing" state forever with no way to retry.
        let settled = false
        const finish = () => { if (!settled) { settled = true; resolve() } }
        const watchdog = setTimeout(() => {
          if (!settled) { setAlert('The payment window didn’t open. Please check your connection and try again — no amount has been charged.'); finish() }
        }, 20000)

        const rzp = new window.Razorpay({
          key: data.keyId, amount: data.amount, currency: data.currency, order_id: data.orderId,
          name: 'LauncherDesk', description: `${svc.title} — ${plan.tier} Plan`,
          image: '/apple-touch-icon.png',
          prefill: { name: f.name.trim(), email: f.email.trim(), contact: mobile },
          notes: { city: f.city.trim() },
          theme: { color: '#1D6FE0' },
          handler: async response => {
            clearTimeout(watchdog)
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
            finish()
          },
          modal: { ondismiss: () => { clearTimeout(watchdog); finish() } },
        })
        rzp.on('payment.failed', r => { clearTimeout(watchdog); setAlert(r?.error?.description || 'The payment did not go through. You can try again.') })
        try {
          rzp.open()
        } catch (openErr) {
          clearTimeout(watchdog)
          setAlert(openErr?.message || 'Could not open the payment window. Please try again.')
          finish()
        }
      })
    } catch (err) {
      setAlert(err.message || 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const field = (k, label, props = {}) => (
    <div className="ckm-field">
      <label className="ckm-label" htmlFor={`ckm-${k}`}>{label}</label>
      <input id={`ckm-${k}`} className={`ckm-input${errs[k] ? ' ckm-bad' : ''}`} value={f[k]} onChange={set(k)}
        aria-invalid={!!errs[k]} aria-describedby={errs[k] ? `ckm-${k}-e` : undefined} {...props} />
      {errs[k] && <div className="ckm-err" id={`ckm-${k}-e`}>{errs[k]}</div>}
    </div>
  )

  return createPortal(
    <div className="ckm-overlay" role="presentation" onClick={() => { if (!busy) onClose() }}>
      <style>{CSS}</style>
      <div className="ckm-box" role="dialog" aria-modal="true" aria-labelledby="ckm-title" onClick={e => e.stopPropagation()}>
        <button type="button" className="ckm-close" onClick={onClose} disabled={busy} aria-label="Close">×</button>

        {done ? (
          <div className="ckm-done">
            <div className="ckm-tick" aria-hidden="true">{done.ok ? '✓' : '!'}</div>
            <h3 className="ckm-title" id="ckm-title">{done.ok ? 'Payment successful' : 'Payment received'}</h3>
            {done.orderNumber && <div className="ckm-order">Order {done.orderNumber}</div>}
            <p className="ckm-sub" style={{ maxWidth: 420, margin: '0 auto 18px' }}>
              {done.ok
                ? `Thank you! A confirmation will be sent to ${f.email}. Our team will contact you on +91 ${cleanPhone(f.mobile)} within 1 business day.`
                : 'We got your payment but could not confirm it on screen. Please contact support@launcherdesk.com with your email and we will confirm it for you.'}
            </p>
            <button type="button" className="ckm-pay" style={{ maxWidth: 220 }} onClick={onClose}>Done</button>
          </div>
        ) : (
          <div className="ckm-grid">
            <form className="ckm-form" onSubmit={pay} noValidate>
              <h3 className="ckm-title" id="ckm-title">Almost there — your details</h3>
              <p className="ckm-sub">We use these to set up your order and keep you updated. No account or password needed.</p>
              {alert && <div className="ckm-alert" role="alert">{alert}</div>}

              {field('name', 'Full name', { ref: firstRef, type: 'text', autoComplete: 'name', placeholder: 'Add your full name' })}
              {field('email', 'Email address', { type: 'email', autoComplete: 'email', inputMode: 'email', placeholder: 'you@gmail.com' })}
              <div className="ckm-field">
                <label className="ckm-label" htmlFor="ckm-mobile">Mobile number</label>
                <div className="ckm-phone">
                  <span className="ckm-cc" aria-hidden="true">+91</span>
                  <input id="ckm-mobile" className={`ckm-input${errs.mobile ? ' ckm-bad' : ''}`} value={f.mobile} onChange={set('mobile')}
                    type="tel" autoComplete="tel-national" inputMode="numeric" placeholder="98765 43210" maxLength={15}
                    aria-invalid={!!errs.mobile} aria-describedby={errs.mobile ? 'ckm-mobile-e' : undefined} />
                </div>
                {errs.mobile && <div className="ckm-err" id="ckm-mobile-e">{errs.mobile}</div>}
              </div>
              {field('city', 'City', { type: 'text', list: 'ckm-cities', autoComplete: 'address-level2', placeholder: 'Choose or type your city' })}
              <datalist id="ckm-cities">{CITIES.map(c => <option key={c} value={c} />)}</datalist>

              <label className="ckm-check">
                <input type="checkbox" checked={f.whatsapp} onChange={set('whatsapp')} />
                <span>Send me order updates on WhatsApp</span>
              </label>

              <button type="submit" className="ckm-pay" disabled={busy} aria-busy={busy}>
                {busy ? 'Opening secure payment…' : `Pay ${fmtPaise(totalPaise)} securely`}
              </button>
              <div className="ckm-secure">🔒 Payments are processed by Razorpay — UPI, cards, net banking &amp; wallets</div>
            </form>

            <aside className="ckm-summary" aria-label="Order summary">
              <p className="ckm-s-title">Order summary</p>
              <p className="ckm-s-plan">{svc.title}<br /><span style={{ fontWeight: 600, color: 'var(--text-3)', fontSize: 14 }}>{plan.tier} plan</span></p>

              <div className="ckm-row"><span>Professional fee</span><b>{fmtPaise(feePaise)}</b></div>
              <div className="ckm-row"><span>GST @ {Math.round(GST_RATE * 100)}%<small>On professional fee only</small></span><b>{fmtPaise(gstPaise)}</b></div>
              <div className="ckm-total"><span>Pay now</span><span>{fmtPaise(totalPaise)}</span></div>

              <div className="ckm-later">
                <div className="ckm-row">
                  <span>Government fee<small>Not charged today</small></span>
                  <b>{govtKnown ? fmtPaise(govtTotal * 100) : 'At actual'}</b>
                </div>
                <p>Government charges are paid separately, at actual, after your expert consultation. GST does not apply to them.</p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}