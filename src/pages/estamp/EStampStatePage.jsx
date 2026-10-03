import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SEO from '../../components/SEO'
import { useUserAuth } from '../../context/UserAuthContext'
import { loadRazorpayScript } from '../../lib/razorpay'
import { stateBySlug, DOC_TYPES, DENOMINATIONS, MAX_DUTY, ESTAMP_FEES, GST_RATE, LD_WA } from '../../data/estamp'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const CSS = `
.ess { background:linear-gradient(180deg,#F7FAFF 0%,#EEF4FC 100%); min-height:80vh; padding:clamp(28px,4vw,48px) 0 72px; }
.ess-wrap { max-width:1180px; margin:0 auto; padding:0 24px; }
.ess-crumb { display:flex; gap:8px; align-items:center; font-size:13.5px; color:var(--text-3); margin-bottom:18px; flex-wrap:wrap; }
.ess-crumb a { color:var(--text-3); text-decoration:none; } .ess-crumb a:hover { color:var(--blue); }
.ess-head { text-align:center; margin-bottom:10px; }
.ess-head h1 { font-size:clamp(26px,3.6vw,40px); font-weight:900; color:var(--navy); letter-spacing:-.03em; margin:0; }
.ess-head .script { font-size:clamp(18px,2.4vw,26px); font-weight:700; color:var(--navy); margin-top:4px; }
.ess-guide { text-align:center; font-size:14.5px; color:var(--text-2); margin:12px auto 28px; max-width:760px; line-height:1.6; }
.ess-guide b { color:var(--navy); }
.ess-grid { display:grid; grid-template-columns:1.15fr .85fr; gap:24px; align-items:start;
  background:#fff; border:1px solid var(--line); border-radius:22px; padding:18px; box-shadow:0 24px 60px -24px rgba(15,28,46,.18); }
.ess-card { border:1px solid var(--line); border-radius:16px; padding:clamp(18px,3vw,28px); background:#FCFDFF; }
.ess-step-label { font-size:14px; color:var(--text-2); margin-bottom:10px; }
.ess-step-label b { color:var(--navy); }
.ess-bar { height:24px; border-radius:8px; background:#EEF2F7; overflow:hidden; margin-bottom:24px; }
.ess-bar span { display:flex; align-items:center; justify-content:flex-end; height:100%; padding-right:10px; box-sizing:border-box;
  background:linear-gradient(90deg,var(--blue-dark),var(--blue)); color:#fff; font-size:12px; font-weight:700; transition:width .35s ease; }
.ess-field { margin-bottom:18px; }
.ess-field label { display:block; font-size:14.5px; font-weight:600; color:var(--navy); margin-bottom:7px; letter-spacing:.01em; }
.ess-field label i { color:#DC2626; font-style:normal; margin-left:3px; }
.ess-field label small { font-weight:400; color:var(--text-3); }
.ess-in { width:100%; height:48px; box-sizing:border-box; border:1.5px solid var(--line-strong,#CBD5E1); border-radius:10px; padding:0 14px;
  font-size:15px; font-family:inherit; background:#fff; color:var(--navy); outline:none; transition:border-color .15s, box-shadow .15s; }
textarea.ess-in { height:auto; min-height:84px; padding:12px 14px; resize:vertical; }
.ess-in:focus { border-color:var(--blue); box-shadow:0 0 0 4px rgba(29,111,224,.12); }
.ess-in.bad { border-color:#DC2626; }
.ess-err { color:#DC2626; font-size:12.5px; margin-top:5px; }
.ess-chips { display:flex; flex-wrap:wrap; gap:8px; }
.ess-chip { height:40px; padding:0 14px; border-radius:10px; border:1.5px solid var(--line-strong,#CBD5E1); background:#fff; font-weight:700;
  font-size:14px; color:var(--navy); cursor:pointer; font-family:inherit; }
.ess-chip.on { border-color:var(--blue); background:var(--brand-50); color:var(--blue-dark); }
.ess-radio { display:grid; gap:10px; }
.ess-radio label { display:flex; gap:12px; align-items:flex-start; border:1.5px solid var(--line-strong,#CBD5E1); border-radius:12px; padding:12px 14px;
  cursor:pointer; font-weight:600; color:var(--navy); font-size:14.5px; margin:0; background:#fff; }
.ess-radio label.on { border-color:var(--blue); background:var(--brand-50); }
.ess-radio input { margin-top:3px; accent-color:var(--blue); }
.ess-radio small { display:block; font-weight:400; color:var(--text-3); margin-top:2px; }
.ess-check { display:flex; gap:10px; align-items:flex-start; font-size:14.5px; color:var(--navy); cursor:pointer; }
.ess-check input { margin-top:3px; width:17px; height:17px; accent-color:var(--blue); }
.ess-row2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.ess-nav { display:flex; justify-content:space-between; gap:12px; margin-top:8px; }
.ess-btn { height:50px; padding:0 26px; border-radius:11px; font-weight:700; font-size:15.5px; font-family:inherit; cursor:pointer; border:0;
  display:inline-flex; align-items:center; justify-content:center; gap:8px; text-decoration:none; }
.ess-btn-primary { background:linear-gradient(135deg,var(--blue-dark),var(--blue)); color:#fff; box-shadow:0 8px 20px rgba(29,93,184,.25); margin-left:auto; }
.ess-btn-primary:disabled { opacity:.65; cursor:not-allowed; }
.ess-btn-ghost { background:#fff; color:var(--navy); border:1.5px solid var(--line-strong,#CBD5E1); }
.ess-summary { border:1px solid var(--line); border-radius:12px; overflow:hidden; margin:6px 0 18px; }
.ess-summary div { display:flex; justify-content:space-between; gap:12px; padding:10px 14px; font-size:14px; color:var(--text-2); border-top:1px solid var(--line); }
.ess-summary div:first-child { border-top:0; }
.ess-summary div b { color:var(--navy); text-align:right; }
.ess-summary .total { background:var(--brand-50); font-size:16px; color:var(--navy); font-weight:800; }
.ess-msg { margin-top:12px; padding:10px 12px; border-radius:8px; font-size:13.5px; line-height:1.5; }
.ess-msg.err { background:#FEF2F2; border:1px solid #FECACA; color:#B91C1C; }
.ess-done { text-align:center; padding:12px 4px; }
.ess-done .tick { width:64px; height:64px; border-radius:50%; margin:0 auto 14px; display:grid; place-items:center; background:#DCFCE7; }
.ess-done h2 { color:var(--navy); margin:0 0 8px; font-size:24px; }
.ess-done p { color:var(--text-2); line-height:1.65; margin:0 0 18px; }

.ess-side { border:2px solid rgba(29,111,224,.35); border-radius:16px; padding:clamp(18px,3vw,26px); background:#fff; display:flex; flex-direction:column; gap:14px; }
.ess-side-btn { display:flex; align-items:center; justify-content:center; text-align:center; gap:8px; min-height:52px; padding:10px 18px; border-radius:12px;
  color:#fff; font-weight:700; font-size:15px; text-decoration:none; line-height:1.35; }
.ess-side-btn.orange { background:linear-gradient(135deg,#F97316,#FB923C); }
.ess-side-btn.blue { background:linear-gradient(135deg,var(--blue-dark),#4F46E5); }
.ess-side h4 { text-align:center; margin:10px 0 2px; font-size:13px; letter-spacing:.14em; color:var(--text-3); font-weight:700; }
.ess-side h3 { text-align:center; margin:0 0 6px; font-size:21px; color:var(--navy); font-weight:900; }
.ess-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
.ess-3 div { text-align:center; font-size:12.5px; color:var(--text-2); line-height:1.4; }
.ess-3 span { width:56px; height:56px; border-radius:50%; margin:0 auto 8px; display:grid; place-items:center; color:#fff; }
.ess-3 div:nth-child(1) span { background:linear-gradient(135deg,#1E3A8A,#2563EB); }
.ess-3 div:nth-child(2) span { background:linear-gradient(135deg,#D97706,#FBBF24); }
.ess-3 div:nth-child(3) span { background:linear-gradient(135deg,#1D4ED8,#3B82F6); }
.ess-3 svg { width:26px; height:26px; stroke:#fff; }
.ess-side-note { background:var(--brand-50); border:1px solid var(--brand-100); border-radius:12px; padding:12px 14px; font-size:13.5px; color:var(--text-2); line-height:1.6; }
.ess-side-note b { color:var(--navy); }

.ess-gate { position:fixed; inset:0; z-index:9999; background:rgba(15,28,46,.45); backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);
  display:flex; align-items:center; justify-content:center; padding:16px; }
.ess-gate-box { width:100%; max-width:460px; background:rgba(255,255,255,.96); border:1px solid rgba(255,255,255,.7); border-radius:24px;
  padding:28px 26px 22px; box-shadow:0 40px 90px rgba(15,28,46,.35); }
.ess-gate-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
.ess-gate-top img { height:34px; }
.ess-gate-tag { font-size:12.5px; font-weight:600; color:var(--text-2); border:1px solid var(--line); border-radius:99px; padding:6px 12px; background:#fff; }
.ess-gate h2 { margin:0 0 6px; font-size:24px; color:var(--navy); font-weight:900; letter-spacing:-.02em; }
.ess-gate p { margin:0 0 20px; color:var(--text-2); font-size:15px; }
.ess-gate .ess-btn { width:100%; margin:0 0 10px; }
.ess-gate-back { display:block; text-align:center; margin-top:8px; font-size:14px; color:var(--text-3); text-decoration:none; }

@media (max-width:900px) { .ess-grid { grid-template-columns:1fr; } }
@media (max-width:520px) { .ess-row2 { grid-template-columns:1fr; } .ess-nav { flex-direction:column-reverse; } .ess-btn { width:100%; } }
`

const DRAFT_KEY = slug => `ld_estamp_draft_${slug}`
const inr = n => `₹${Number(n || 0).toLocaleString('en-IN')}`
const EMPTY = {
  firstParty: '', secondParty: '', payer: '',
  docType: '', purpose: '', consideration: '', duty: '', customDuty: '', print: false,
  delivery: 'email', name: '', mobile: '', email: '', address: '', city: '', pincode: '',
}

function loadDraft(slug) {
  try { const d = JSON.parse(localStorage.getItem(DRAFT_KEY(slug)) || 'null'); return d && typeof d === 'object' ? { ...EMPTY, ...d } : null } catch { return null }
}

export default function EStampStatePage() {
  const { state: slug } = useParams()
  const st = stateBySlug(slug)
  const [params] = useSearchParams()
  const { isLoggedIn, token, user } = useUserAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [f, setF] = useState(() => ({ ...EMPTY, print: params.get('print') === '1', ...(loadDraft(slug) || {}) }))
  const [step, setStep] = useState(1)
  const [errs, setErrs] = useState({})
  const [paying, setPaying] = useState(false)
  const [payErr, setPayErr] = useState('')
  const [done, setDone] = useState(null)

  // keep the draft so nothing is lost when the customer goes to log in
  useEffect(() => { try { localStorage.setItem(DRAFT_KEY(slug), JSON.stringify(f)) } catch { /* storage unavailable */ } }, [f, slug])
  // prefill contact details from the account
  useEffect(() => {
    if (!user) return
    setF(v => ({ ...v, name: v.name || user.name || '', email: v.email || user.email || '', mobile: v.mobile || user.phone || '' }))
  }, [user])

  const duty = f.duty === 'custom' ? Number(f.customDuty) : Number(f.duty)
  const courier = f.delivery === 'courier' ? ESTAMP_FEES.courier : 0
  const gst = Math.round((ESTAMP_FEES.service + courier) * GST_RATE * 100) / 100
  const total = useMemo(() => Math.round(((Number.isFinite(duty) ? duty : 0) + ESTAMP_FEES.service + courier + gst) * 100) / 100, [duty, courier, gst])

  if (!st) return <Navigate to="/estamp" replace />

  const set = k => e => setF(v => ({ ...v, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const goLogin = tab => navigate('/user/login', { state: { from: location.pathname + location.search, tab } })

  function validate(s) {
    const e = {}
    if (s === 1) {
      if (!f.firstParty.trim()) e.firstParty = 'Enter the first party name'
      if (!f.secondParty.trim()) e.secondParty = 'Enter the second party name, or NIL'
      if (!f.payer) e.payer = 'Select who pays the stamp duty'
    }
    if (s === 2) {
      if (!f.docType) e.docType = 'Select the document type'
      if (!f.purpose.trim()) e.purpose = 'Briefly describe the purpose'
      if (!f.duty) e.duty = 'Choose the stamp duty value'
      else if (!(duty >= 1 && duty <= MAX_DUTY && Number.isInteger(duty))) e.duty = `Enter a whole amount between ₹1 and ${inr(MAX_DUTY)}`
      if (f.consideration && !(Number(f.consideration) >= 0)) e.consideration = 'Enter a valid amount'
    }
    if (s === 3) {
      if (!f.name.trim()) e.name = 'Enter your name'
      if (!/^\+?[0-9\s-]{10,14}$/.test(f.mobile.trim())) e.mobile = 'Enter a valid mobile number'
      if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Enter a valid email'
      if (f.delivery === 'courier') {
        if (!f.address.trim()) e.address = 'Enter the delivery address'
        if (!f.city.trim()) e.city = 'Enter the city'
        if (!/^\d{6}$/.test(f.pincode.trim())) e.pincode = 'Enter a 6-digit PIN code'
      }
    }
    setErrs(e)
    return !Object.keys(e).length
  }
  const next = () => { if (validate(step)) { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) } }
  const back = () => { setErrs({}); setStep(s => s - 1) }

  async function pay() {
    if (!validate(3)) return
    if (!isLoggedIn) { goLogin('login'); return }
    setPaying(true); setPayErr('')
    try {
      // 1. Ask the server to price the order (it recalculates everything) and create it
      const res = await fetch(`${API_BASE}/payments/checkout/estamp/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          state: st.slug, stateName: st.name,
          firstParty: f.firstParty.trim(), secondParty: f.secondParty.trim(), payer: f.payer,
          documentType: f.docType, purpose: f.purpose.trim(), consideration: f.consideration,
          stampDuty: duty, printDocument: !!f.print, delivery: f.delivery,
          name: f.name.trim(), email: f.email.trim(), mobile: f.mobile.trim(),
          ...(f.delivery === 'courier' ? { address: f.address.trim(), city: f.city.trim(), pincode: f.pincode.trim() } : {}),
        }),
      })
      const data = await res.json()
      if (res.status === 401) { goLogin('login'); return }
      if (!res.ok) {
        const fieldMsg = data.fields ? Object.values(data.fields)[0] : ''
        throw new Error(fieldMsg || data.message || 'Could not create your order')
      }

      // 2. Open Razorpay with the server's amount
      await loadRazorpayScript()
      await new Promise(resolve => {
        const rzp = new window.Razorpay({
          key: data.keyId, amount: data.amount, currency: data.currency, order_id: data.orderId,
          name: 'LauncherDesk', description: `e-Stamp Paper — ${st.name}`, image: '/launcherdesk-logo-transparent.png',
          prefill: { name: f.name, email: f.email, contact: f.mobile },
          theme: { color: '#1D6FE0' },
          handler: async response => {
            // 3. Confirm the payment with the server
            try {
              const v = await fetch(`${API_BASE}/payments/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(response),
              }).then(r => r.json())
              if (v.success) {
                try { localStorage.removeItem(DRAFT_KEY(slug)) } catch { /* ignore */ }
                setDone({ orderNumber: v.orderNumber || data.orderNumber, ldOrderId: v.ldOrderId || data.ldOrderId })
              } else setPayErr(v.message || 'Payment received but verification is pending. Our team will confirm shortly.')
            } catch {
              setPayErr('Payment received. Our team will confirm it shortly — you don’t need to pay again.')
            }
            resolve()
          },
          modal: { ondismiss: resolve },
        })
        rzp.on?.('payment.failed', r => setPayErr(r?.error?.description || 'Payment failed. Please try again.'))
        rzp.open()
      })
    } catch (err) {
      setPayErr(err.message || 'Something went wrong. Please try again.')
    } finally {
      setPaying(false)
    }
  }

  const pct = Math.round((step / 3) * 100)
  const Err = ({ k }) => errs[k] ? <div className="ess-err" role="alert">{errs[k]}</div> : null

  return (
    <>
      <SEO title={`e-Stamp Paper ${st.name} — Buy Online`} description={`Buy non-judicial e-Stamp paper for ${st.name} online. Fill the form, pay securely and get the scan copy by email, with doorstep delivery available.`} canonical={`/estamp/${st.slug}`} />
      <style>{CSS}</style>

      <section className="ess">
        <div className="ess-wrap">
          <nav className="ess-crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link> › <Link to="/estamp">E-Stamp</Link> › <span>{st.name}</span>
          </nav>
          <div className="ess-head">
            <h1>e-Stamp Paper of {st.name}</h1>
            {st.script && <div className="script" lang="und">{st.script}</div>}
          </div>
          <p className="ess-guide">
            Choose the stamp duty value as per <b>{st.name} Government guidelines</b>. Not sure of the right amount?
            Our team checks every order before purchase and will call you if anything needs changing.
          </p>

          <div className="ess-grid">
            {/* ── Form ── */}
            <div className="ess-card">
              {done ? (
                <div className="ess-done" role="status">
                  <div className="tick"><svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></div>
                  <h2>Payment successful!</h2>
                  <p>Your e-Stamp order {done.orderNumber ? <b>{done.orderNumber}</b> : null} has been placed. We’ve emailed your payment confirmation and invoice.
                    Our team will verify the details and email you the scan copy{f.delivery === 'courier' ? ', then courier the original to you' : ''}.</p>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {done.ldOrderId && <Link to={`/user/services/${done.ldOrderId}`} className="ess-btn ess-btn-primary" style={{ marginLeft: 0 }}>Track my order</Link>}
                    <Link to="/estamp" className="ess-btn ess-btn-ghost">Buy another e-Stamp</Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="ess-step-label">Step {step} of 3 — <b>{['', 'Party details', 'e-Stamp details', 'Delivery & payment'][step]}</b></div>
                  <div className="ess-bar" aria-hidden="true"><span style={{ width: `${pct}%` }}>{pct}%</span></div>

                  {step === 1 && (
                    <>
                      <div className="ess-field">
                        <label htmlFor="fp">First Party Name<i>*</i></label>
                        <input id="fp" className={`ess-in${errs.firstParty ? ' bad' : ''}`} value={f.firstParty} onChange={set('firstParty')} placeholder="Enter the name of the First Party" />
                        <Err k="firstParty" />
                      </div>
                      <div className="ess-field">
                        <label htmlFor="sp">Second Party Name<i>*</i></label>
                        <input id="sp" className={`ess-in${errs.secondParty ? ' bad' : ''}`} value={f.secondParty} onChange={set('secondParty')} placeholder="If there is no Second Party then write NIL" />
                        <Err k="secondParty" />
                      </div>
                      <div className="ess-field">
                        <label htmlFor="payer">Select who pays stamp duty<i>*</i></label>
                        <select id="payer" className={`ess-in${errs.payer ? ' bad' : ''}`} value={f.payer} onChange={set('payer')}>
                          <option value="">— Select —</option>
                          <option value="First Party">First Party</option>
                          <option value="Second Party">Second Party</option>
                        </select>
                        <Err k="payer" />
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="ess-field">
                        <label htmlFor="dt">Document type<i>*</i></label>
                        <select id="dt" className={`ess-in${errs.docType ? ' bad' : ''}`} value={f.docType} onChange={set('docType')}>
                          <option value="">— Select —</option>
                          {DOC_TYPES.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <Err k="docType" />
                      </div>
                      <div className="ess-field">
                        <label htmlFor="pu">Purpose / description<i>*</i></label>
                        <textarea id="pu" className={`ess-in${errs.purpose ? ' bad' : ''}`} value={f.purpose} onChange={set('purpose')} placeholder="e.g. Rent agreement for flat no. 12, Koramangala, Bengaluru" maxLength={500} />
                        <Err k="purpose" />
                      </div>
                      <div className="ess-field">
                        <label>Stamp duty value<i>*</i></label>
                        <div className="ess-chips">
                          {DENOMINATIONS.map(d => (
                            <button type="button" key={d} className={`ess-chip${String(f.duty) === String(d) ? ' on' : ''}`} onClick={() => setF(v => ({ ...v, duty: String(d) }))}>{inr(d)}</button>
                          ))}
                          <button type="button" className={`ess-chip${f.duty === 'custom' ? ' on' : ''}`} onClick={() => setF(v => ({ ...v, duty: 'custom' }))}>Other amount</button>
                        </div>
                        {f.duty === 'custom' && (
                          <input className={`ess-in${errs.duty ? ' bad' : ''}`} style={{ marginTop: 10 }} type="number" min="1" max={MAX_DUTY} step="1" inputMode="numeric"
                            value={f.customDuty} onChange={set('customDuty')} placeholder="Enter stamp duty amount (₹)" aria-label="Custom stamp duty amount" />
                        )}
                        <Err k="duty" />
                      </div>
                      <div className="ess-field">
                        <label htmlFor="cp">Consideration amount <small>(optional — e.g. deposit or deal value, ₹)</small></label>
                        <input id="cp" className={`ess-in${errs.consideration ? ' bad' : ''}`} type="number" min="0" inputMode="numeric" value={f.consideration} onChange={set('consideration')} placeholder="0" />
                        <Err k="consideration" />
                      </div>
                      <div className="ess-field">
                        <label className="ess-check">
                          <input type="checkbox" checked={f.print} onChange={set('print')} />
                          <span><b>Print my document on this e-Stamp paper</b><br /><small style={{ color: 'var(--text-3)' }}>After payment, you’ll upload your document from your dashboard and we print it on the stamp.</small></span>
                        </label>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="ess-field">
                        <label>Delivery<i>*</i></label>
                        <div className="ess-radio">
                          <label className={f.delivery === 'email' ? 'on' : ''}>
                            <input type="radio" name="dl" value="email" checked={f.delivery === 'email'} onChange={set('delivery')} />
                            <span>Scan copy on email<small>Fastest — usually within a few hours</small></span>
                          </label>
                          <label className={f.delivery === 'courier' ? 'on' : ''}>
                            <input type="radio" name="dl" value="courier" checked={f.delivery === 'courier'} onChange={set('delivery')} />
                            <span>Scan copy on email + original by courier{ESTAMP_FEES.courier ? ` (+${inr(ESTAMP_FEES.courier)})` : ''}<small>Delivered to your doorstep</small></span>
                          </label>
                        </div>
                      </div>
                      {f.delivery === 'courier' && (
                        <>
                          <div className="ess-field">
                            <label htmlFor="ad">Delivery address<i>*</i></label>
                            <textarea id="ad" className={`ess-in${errs.address ? ' bad' : ''}`} value={f.address} onChange={set('address')} placeholder="House / flat, street, area" maxLength={300} />
                            <Err k="address" />
                          </div>
                          <div className="ess-row2">
                            <div className="ess-field"><label htmlFor="ci">City<i>*</i></label>
                              <input id="ci" className={`ess-in${errs.city ? ' bad' : ''}`} value={f.city} onChange={set('city')} /><Err k="city" /></div>
                            <div className="ess-field"><label htmlFor="pin">PIN code<i>*</i></label>
                              <input id="pin" className={`ess-in${errs.pincode ? ' bad' : ''}`} inputMode="numeric" maxLength={6} value={f.pincode} onChange={set('pincode')} /><Err k="pincode" /></div>
                          </div>
                        </>
                      )}
                      <div className="ess-row2">
                        <div className="ess-field"><label htmlFor="nm">Your name<i>*</i></label>
                          <input id="nm" className={`ess-in${errs.name ? ' bad' : ''}`} value={f.name} onChange={set('name')} /><Err k="name" /></div>
                        <div className="ess-field"><label htmlFor="mb">Mobile<i>*</i></label>
                          <input id="mb" className={`ess-in${errs.mobile ? ' bad' : ''}`} type="tel" value={f.mobile} onChange={set('mobile')} placeholder="+91 98765 43210" /><Err k="mobile" /></div>
                      </div>
                      <div className="ess-field"><label htmlFor="em">Email for the scan copy<i>*</i></label>
                        <input id="em" className={`ess-in${errs.email ? ' bad' : ''}`} type="email" value={f.email} onChange={set('email')} /><Err k="email" /></div>

                      <div className="ess-summary" aria-label="Order summary">
                        <div><span>State</span><b>{st.name}</b></div>
                        <div><span>Document</span><b>{f.docType}</b></div>
                        <div><span>Parties</span><b>{f.firstParty} / {f.secondParty}</b></div>
                        <div><span>Stamp duty</span><b>{inr(duty)}</b></div>
                        {ESTAMP_FEES.service > 0 && <div><span>Service fee</span><b>{inr(ESTAMP_FEES.service)}</b></div>}
                        {courier > 0 && <div><span>Courier</span><b>{inr(courier)}</b></div>}
                        {gst > 0 && <div><span>GST (18% on fees)</span><b>{inr(gst)}</b></div>}
                        <div className="total"><span>Total payable</span><b>{inr(total)}</b></div>
                      </div>
                    </>
                  )}

                  <div className="ess-nav">
                    {step > 1 && <button type="button" className="ess-btn ess-btn-ghost" onClick={back}>Back</button>}
                    {step < 3
                      ? <button type="button" className="ess-btn ess-btn-primary" onClick={next}>Next</button>
                      : <button type="button" className="ess-btn ess-btn-primary" onClick={pay} disabled={paying} aria-busy={paying}>
                          {paying ? 'Processing…' : `Proceed to Pay ${inr(total)}`}
                        </button>}
                  </div>
                  {payErr && <div className="ess-msg err" role="alert">{payErr}</div>}
                </>
              )}
            </div>

            {/* ── Side panel ── */}
            <aside className="ess-side">
              <a className="ess-side-btn orange" href={`https://wa.me/${LD_WA}?text=${encodeURIComponent(`Hi, I need ${st.name} e-Stamp paper urgently.`)}`} target="_blank" rel="noopener noreferrer">
                Need it urgently? Chat with us on WhatsApp
              </a>
              <Link className="ess-side-btn blue" to="/company/contact">Request bulk e-Stamping / API integration</Link>
              <h4>3 STEPS TO</h4>
              <h3>Get e-Stamp Paper</h3>
              <div className="ess-3">
                <div><span><svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 13h6M9 17h6" /></svg></span>Fill the form with all required details</div>
                <div><span><svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a4 4 0 0 0 0-8" /></svg></span>Review details &amp; make payment</div>
                <div><span><svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /><path d="m22 6-10 7L2 6" /></svg></span>e-Stamp paper emailed / delivered</div>
              </div>
              <div className="ess-side-note">
                <b>Your details are safe.</b> We use them only to issue your e-Stamp. Payments are processed securely by Razorpay.
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Login required ── */}
      {!isLoggedIn && !done && (
        <div className="ess-gate" role="dialog" aria-modal="true" aria-labelledby="gate-h">
          <div className="ess-gate-box">
            <div className="ess-gate-top">
              <img src="/launcherdesk-logo-transparent.png" alt="LauncherDesk" />
              <span className="ess-gate-tag">Login required</span>
            </div>
            <h2 id="gate-h">Continue to LauncherDesk</h2>
            <p>Login or create an account to order your {st.name} e-Stamp paper. We’ll bring you right back here.</p>
            <button type="button" className="ess-btn ess-btn-primary" style={{ marginLeft: 0 }} onClick={() => goLogin('login')}>Login</button>
            <button type="button" className="ess-btn ess-btn-ghost" onClick={() => goLogin('register')}>Create an account</button>
            <Link to="/estamp" className="ess-gate-back">← Back to all states</Link>
          </div>
        </div>
      )}
    </>
  )
}