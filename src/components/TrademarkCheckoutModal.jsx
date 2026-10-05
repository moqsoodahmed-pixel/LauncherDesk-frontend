import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { GOVT_FEE_BREAKDOWN } from '../data/registrationPlans'
import { calcBreakdown, fmtPaise, parseRupees, GST_RATE } from '../lib/pricing'
import { loadRazorpayScript } from '../lib/razorpay'
import { TRADEMARK_CLASSES, POPULAR_CLASSES } from '../data/trademarkClasses'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const SLUG = 'trademark-registration'
// Must match the server (backend: src/config/planPrices.js → TRADEMARK.maxClasses).
const MAX_CLASSES = 45
// Must match the server (backend: src/config/planPrices.js → TRADEMARK.professionalFeePerClass).
const PROFESSIONAL_FEE_PER_CLASS = false
// Must match the server (backend: src/config/planPrices.js → TRADEMARK.collectGovtFeeOnline).
// true = the government fee is part of the Razorpay amount; false = fee + GST only.
const COLLECT_GOVT_FEE_ONLINE = true
// Brand logo upload: PDF only. Must match the server (backend: src/middleware/trademarkLogo.js → MAX_MB).
const LOGO_MAX_MB = 5

const CITIES = [
  'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
  'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar',
  'Navi Mumbai', 'Allahabad', 'Ranchi', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur',
  'Kota', 'Guwahati', 'Chandigarh', 'Thiruvananthapuram', 'Kochi', 'Mysuru', 'Mangaluru', 'Noida', 'Gurugram', 'Bhubaneswar',
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
.tmk-picker { border:1.5px solid #D5DEEC; border-radius:12px; overflow:hidden; background:#fff; }
.tmk-picker.tmk-bad { border-color:#DC2626; }
.tmk-pk-top { padding:10px; border-bottom:1px solid #E3EAF6; background:#FAFCFF; }
.tmk-pk-top .tmk-input { padding:10px 12px; font-size:14px; }
.tmk-tabs { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
.tmk-tab { border:1.5px solid #D5DEEC; background:#fff; color:var(--text-2); border-radius:999px; padding:5px 11px; font:inherit; font-size:12px; font-weight:700; cursor:pointer; }
.tmk-tab[aria-pressed="true"] { background:var(--navy); border-color:var(--navy); color:#fff; }
.tmk-pop { display:flex; flex-wrap:wrap; align-items:center; gap:6px; margin-top:8px; font-size:12px; color:var(--text-3); }
.tmk-pop button { border:0; background:#EEF4FF; color:var(--blue); border-radius:6px; padding:4px 8px; font:inherit; font-size:12px; font-weight:700; cursor:pointer; }
.tmk-pop button[aria-pressed="true"] { background:var(--blue); color:#fff; }
.tmk-cls-list { max-height:260px; overflow-y:auto; display:grid; grid-template-columns:1fr 1fr; gap:6px; padding:8px; }
.tmk-cls { display:flex; gap:9px; align-items:flex-start; text-align:left; padding:8px 9px; border:1.5px solid #E3EAF6; border-radius:9px; background:#fff; font:inherit; color:var(--navy); cursor:pointer; }
.tmk-cls:hover { border-color:#B9C8E6; }
.tmk-cls[aria-pressed="true"] { border-color:var(--blue); background:#F2F7FF; }
.tmk-cls-n { flex:none; width:28px; height:28px; border-radius:7px; background:#EEF2F8; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; }
.tmk-cls[aria-pressed="true"] .tmk-cls-n { background:var(--blue); color:#fff; }
.tmk-cls-t { font-size:12.5px; font-weight:700; line-height:1.35; }
.tmk-cls-k { display:block; font-size:11px; font-weight:500; color:var(--text-3); margin-top:2px; }
.tmk-cls-empty { grid-column:1/-1; padding:16px; text-align:center; font-size:13px; color:var(--text-3); }
.tmk-chosen { padding:10px 12px; border-top:1px solid #E3EAF6; background:#FAFCFF; font-size:13px; color:var(--text-2); }
.tmk-chips { display:flex; flex-wrap:wrap; gap:6px; margin-top:6px; }
.tmk-chip { display:inline-flex; align-items:center; gap:4px; background:#EEF4FF; color:var(--navy); border-radius:999px; padding:3px 4px 3px 10px; font-size:12px; font-weight:700; }
.tmk-chip button { border:0; background:transparent; color:var(--navy); font-size:15px; line-height:1; padding:0 5px; cursor:pointer; }
.tmk-chosen .tmk-check { margin:8px 0 0; font-size:12.5px; }
.tmk-drop { display:flex; align-items:center; gap:12px; padding:14px; border:1.5px dashed #B9C8E6; border-radius:10px; background:#FAFCFF; cursor:pointer; transition:border-color .15s, background .15s; }
.tmk-drop:hover, .tmk-drop.tmk-over { border-color:var(--blue); background:#F2F7FF; }
.tmk-drop.tmk-bad { border-color:#DC2626; }
.tmk-drop input { position:absolute; width:1px; height:1px; opacity:0; }
.tmk-drop:focus-within { outline:2px solid var(--blue); outline-offset:2px; }
.tmk-drop-ic { flex:none; width:40px; height:40px; border-radius:10px; background:#EEF4FF; color:var(--blue); display:flex; align-items:center; justify-content:center; }
.tmk-drop-t { font-size:13.5px; font-weight:700; color:var(--navy); }
.tmk-drop-s { font-size:12px; color:var(--text-3); margin-top:2px; }
.tmk-file { display:flex; align-items:center; gap:10px; padding:11px 12px; border:1.5px solid var(--blue); border-radius:10px; background:#F2F7FF; }
.tmk-file-ic { flex:none; width:34px; height:40px; border-radius:6px; background:#DC2626; color:#fff; font-size:10px; font-weight:800; display:flex; align-items:center; justify-content:center; }
.tmk-file-n { flex:1; min-width:0; font-size:13px; font-weight:700; color:var(--navy); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.tmk-file-n small { display:block; font-weight:500; color:var(--text-3); }
.tmk-file button { flex:none; border:0; background:transparent; color:#B91C1C; font:inherit; font-size:12.5px; font-weight:700; cursor:pointer; padding:6px; }
.tmk-gst-row { background:#FFF7E6; margin:0 -8px; padding:9px 8px; border-radius:8px; border-bottom-color:transparent; }
.tmk-incl { margin:4px 0 0; font-size:12.5px; font-weight:700; color:#15803D; }
.tmk-pay small { display:block; font-size:12px; font-weight:600; opacity:.9; margin-top:2px; }
.tmk-tick { width:56px; height:56px; border-radius:50%; background:#DCFCE7; color:#16A34A; display:flex; align-items:center; justify-content:center; margin:0 auto 14px; font-size:28px; }
.tmk-order { display:inline-block; margin:10px 0 16px; padding:8px 14px; border-radius:8px; background:#EEF4FF; color:var(--navy); font-weight:800; font-size:14px; }
@media (max-width: 760px) {
  .tmk-grid { grid-template-columns:1fr; }
  .tmk-summary { order:-1; border-left:0; border-bottom:1px solid var(--line); border-radius:18px 18px 0 0; padding:24px 22px 18px; }
  .tmk-form { padding:22px; }
  .tmk-row2 { grid-template-columns:1fr; }
  .tmk-cls-list { grid-template-columns:1fr; }
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

/*
  Opens from "Proceed to Pay" on the trademark page. The customer picks the
  applicant type and chooses their classes from all 45 (this sets the government
  fee), enters their details and city, then pays in one go through Razorpay:
  professional fee + 18% GST (on the fee only) + government fee.
*/
export default function TrademarkCheckoutModal({ svc, onClose }) {
  const cfg = GOVT_FEE_BREAKDOWN[SLUG]
  const categories = cfg?.categories || []
  const terms = cfg?.terms || []
  const baseFee = parseRupees(svc?.priceCard?.price)

  const [f, setF] = useState({ name: '', email: '', mobile: '', city: '', brand: '', whatsapp: false })
  const [applicant, setApplicant] = useState(categories[0]?.key || 'small')
  const [picked, setPicked] = useState([])          // chosen class numbers, e.g. [9, 25, 35]
  const [unsure, setUnsure] = useState(false)       // "let the expert choose" = billed as 1 class
  const [clsFilter, setClsFilter] = useState('all') // all | goods | services | selected
  const [clsQuery, setClsQuery] = useState('')
  const [logo, setLogo] = useState(null)            // optional brand logo (PDF File)
  const [dragOver, setDragOver] = useState(false)
  const classes = picked.length || (unsure ? 1 : 0)
  const [errs, setErrs] = useState({})
  const [busy, setBusy] = useState(false)
  const [alert, setAlert] = useState('')
  const [done, setDone] = useState(null)
  const firstRef = useRef(null)

  const visibleClasses = useMemo(() => {
    const q = clsQuery.trim().toLowerCase()
    return TRADEMARK_CLASSES.filter(c => {
      if (clsFilter === 'goods' && c.n > 34) return false
      if (clsFilter === 'services' && c.n < 35) return false
      if (clsFilter === 'selected' && !picked.includes(c.n)) return false
      if (!q) return true
      return String(c.n) === q || `${c.t} ${c.k}`.toLowerCase().includes(q)
    })
  }, [clsQuery, clsFilter, picked])

  function pickLogo(file) {
    if (!file) return
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name)
    let err
    if (!isPdf) err = 'Please upload your logo as a PDF file'
    else if (file.size > LOGO_MAX_MB * 1024 * 1024) err = `Logo PDF must be under ${LOGO_MAX_MB} MB`
    if (err) { setLogo(null); setErrs(p => ({ ...p, logo: err })); return }
    setLogo(file)
    setErrs(p => ({ ...p, logo: undefined }))
  }

  function toggleClass(n) {
    setPicked(p => {
      if (p.includes(n)) return p.filter(x => x !== n)
      if (p.length >= MAX_CLASSES) return p
      return [...p, n].sort((a, b) => a - b)
    })
    setUnsure(false)
    if (errs.classes) setErrs(p => ({ ...p, classes: undefined }))
  }

  const cat = categories.find(c => c.key === applicant) || categories[0]
  const perClass = cat?.rows?.[0]?.amount || 0
  const govtPaise = perClass * classes * 100
  const { feePaise, gstPaise } = useMemo(
    () => calcBreakdown(baseFee * (PROFESSIONAL_FEE_PER_CLASS ? classes : 1)),
    [baseFee, classes]
  )
  // GST is charged on the professional fee only; the government fee is added as-is.
  const totalPaise = feePaise + gstPaise + (COLLECT_GOVT_FEE_ONLINE ? govtPaise : 0)

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
    if (classes < 1) v.classes = 'Choose at least one class, or tick "Not sure" below the list'
    if (errs.logo) v.logo = errs.logo
    setErrs(v); setAlert('')
    if (Object.keys(v).length) return
    setBusy(true)
    const mobile = '+91' + cleanPhone(f.mobile)
    try {
      const fields = {
        name: f.name.trim(), email: f.email.trim(), mobile, city: f.city.trim(),
        applicantType: applicant, classes, classNumbers: picked, expertToChoose: unsure && !picked.length,
        brandName: f.brand.trim(), whatsappOptIn: f.whatsapp,
      }
      // The order details always go as plain JSON. The logo is sent as a separate step below,
      // so a problem with the logo can never stop the payment.
      const res = await fetch(`${API_BASE}/payments/checkout/trademark/create-order`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fields),
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
      // Optional logo: attach it to this order. If it fails the customer can still pay and
      // upload the logo later from their dashboard (it is on the post-payment document list).
      let logoSaved = !logo
      if (logo) {
        try {
          if (!data.logoToken) throw new Error('logo upload not available')
          const fd = new FormData()
          fd.append('razorpayOrderId', data.orderId)
          fd.append('token', data.logoToken)
          fd.append('logo', logo, logo.name)
          const lr = await fetch(`${API_BASE}/payments/checkout/trademark/logo`, { method: 'POST', body: fd })
          logoSaved = lr.ok
        } catch { logoSaved = false }
      }
      await loadRazorpayScript()
      await new Promise(resolve => {
        const rzp = new window.Razorpay({
          key: data.keyId, amount: data.amount, currency: data.currency, order_id: data.orderId,
          name: 'LauncherDesk',
          description: `${svc.title} — ${classes} ${classes === 1 ? 'class' : 'classes'} · total incl. ${fmtPaise(gstPaise)} GST (18%)`,
          image: '/apple-touch-icon.png',
          prefill: { name: f.name.trim(), email: f.email.trim(), contact: mobile },
          notes: { city: f.city.trim(), classes: picked.join(', ') || 'expert to choose', gstIncluded: fmtPaise(gstPaise) },
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
              setDone({ ok: !!vd.success, orderNumber: vd.orderNumber, logoMissed: !logoSaved })
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
                ? `Thank you! A confirmation will be sent to ${f.email}. Our team will call you on +91 ${cleanPhone(f.mobile)} within 1 business day to confirm your brand and ${picked.length > 1 ? 'classes' : 'class'}.`
                : 'We got your payment but could not confirm it on screen. Please contact support@launcherdesk.com with your email and we will confirm it for you.'}
            </p>
            {done.logoMissed && (
              <p className="tmk-sub" style={{ maxWidth: 440, margin: '-6px auto 18px' }}>
                Your logo could not be uploaded, but your payment is safe. Our team will ask you to share the logo PDF, or you can upload it from your dashboard.
              </p>
            )}
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
                <span className="tmk-label" id="tmk-cls-l">
                  Choose your trademark classes <span className="tmk-opt">(45 classes: 1–34 goods, 35–45 services)</span>
                </span>
                <div className={`tmk-picker${errs.classes ? ' tmk-bad' : ''}`} role="group" aria-labelledby="tmk-cls-l">
                  <div className="tmk-pk-top">
                    <input className="tmk-input" type="search" value={clsQuery} onChange={e => setClsQuery(e.target.value)}
                      placeholder="Search by product or service, e.g. clothing, software, restaurant" aria-label="Search classes" />
                    <div className="tmk-tabs">
                      {[['all', 'All 45'], ['goods', 'Goods (1–34)'], ['services', 'Services (35–45)'], ['selected', `Selected (${picked.length})`]].map(([k, l]) => (
                        <button key={k} type="button" className="tmk-tab" aria-pressed={clsFilter === k} onClick={() => setClsFilter(k)}>{l}</button>
                      ))}
                    </div>
                    <div className="tmk-pop">
                      <span>Popular:</span>
                      {POPULAR_CLASSES.map(({ n, label }) => (
                        <button key={n} type="button" aria-pressed={picked.includes(n)} onClick={() => toggleClass(n)}>{n} · {label}</button>
                      ))}
                    </div>
                  </div>
                  <div className="tmk-cls-list">
                    {visibleClasses.length ? visibleClasses.map(c => (
                      <button key={c.n} type="button" className="tmk-cls" aria-pressed={picked.includes(c.n)} onClick={() => toggleClass(c.n)}>
                        <span className="tmk-cls-n">{c.n}</span>
                        <span className="tmk-cls-t">{c.t}<span className="tmk-cls-k">{c.k}</span></span>
                      </button>
                    )) : (
                      <div className="tmk-cls-empty">
                        {clsFilter === 'selected' ? 'You have not chosen any class yet.' : `No class matches "${clsQuery}". Try another word, or tick "Not sure" below.`}
                      </div>
                    )}
                  </div>
                  <div className="tmk-chosen">
                    {picked.length
                      ? `${picked.length} ${picked.length === 1 ? 'class' : 'classes'} selected`
                      : unsure ? 'Our expert will pick the right class for you.' : 'No class selected yet.'}
                    {picked.length > 0 && (
                      <div className="tmk-chips">
                        {picked.map(n => (
                          <span key={n} className="tmk-chip">
                            Class {n}
                            <button type="button" onClick={() => toggleClass(n)} aria-label={`Remove class ${n}`}>×</button>
                          </span>
                        ))}
                      </div>
                    )}
                    <label className="tmk-check">
                      <input type="checkbox" checked={unsure} onChange={e => {
                        setUnsure(e.target.checked)
                        if (e.target.checked) setPicked([])
                        if (errs.classes) setErrs(p => ({ ...p, classes: undefined }))
                      }} />
                      <span>Not sure which class? Let our expert choose during the search (billed as 1 class).</span>
                    </label>
                  </div>
                </div>
                {errs.classes && <div className="tmk-err">{errs.classes}</div>}
              </div>

              {input('name', 'Full name', { ref: firstRef, type: 'text', autoComplete: 'name', placeholder: 'Add your full name' })}
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
                  <label className="tmk-label" htmlFor="tmk-city">City</label>
                  <input id="tmk-city" className={`tmk-input${errs.city ? ' tmk-bad' : ''}`} value={f.city} onChange={set('city')}
                    type="text" list="tmk-cities" autoComplete="address-level2" placeholder="Choose or type your city"
                    aria-invalid={!!errs.city} aria-describedby={errs.city ? 'tmk-city-e' : undefined} />
                  <datalist id="tmk-cities">{CITIES.map(c => <option key={c} value={c} />)}</datalist>
                  {errs.city && <div className="tmk-err" id="tmk-city-e">{errs.city}</div>}
                </div>
              </div>
              {input('brand', 'Brand name to register', { type: 'text', maxLength: 120, placeholder: 'e.g. Acme Foods' }, true)}

              <div className="tmk-field">
                <span className="tmk-label" id="tmk-logo-l">Upload logo <span className="tmk-opt">(optional, PDF only)</span></span>
                {logo ? (
                  <div className="tmk-file">
                    <span className="tmk-file-ic" aria-hidden="true">PDF</span>
                    <span className="tmk-file-n">{logo.name}<small>{logo.size < 1024 * 1024 ? `${Math.max(1, Math.round(logo.size / 1024))} KB` : `${(logo.size / 1024 / 1024).toFixed(1)} MB`} · ready to upload</small></span>
                    <button type="button" onClick={() => setLogo(null)} aria-label={`Remove ${logo.name}`}>Remove</button>
                  </div>
                ) : (
                  <label
                    className={`tmk-drop${dragOver ? ' tmk-over' : ''}${errs.logo ? ' tmk-bad' : ''}`}
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={e => { e.preventDefault(); setDragOver(false); pickLogo(e.dataTransfer.files?.[0]) }}
                  >
                    <input type="file" accept="application/pdf,.pdf" aria-labelledby="tmk-logo-l"
                      aria-describedby={errs.logo ? 'tmk-logo-e' : undefined}
                      onChange={e => { pickLogo(e.target.files?.[0]); e.target.value = '' }} />
                    <span className="tmk-drop-ic" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 16V4M7 9l5-5 5 5" /><path d="M20 16v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3" /></svg>
                    </span>
                    <span>
                      <span className="tmk-drop-t">Click to upload or drag your logo here</span>
                      <span className="tmk-drop-s" style={{ display: 'block' }}>PDF only, up to {LOGO_MAX_MB} MB. Skip this if you are registering only the brand name.</span>
                    </span>
                  </label>
                )}
                {errs.logo && <div className="tmk-err" id="tmk-logo-e">{errs.logo}</div>}
              </div>

              <label className="tmk-check">
                <input type="checkbox" checked={f.whatsapp} onChange={set('whatsapp')} />
                <span>Send me order updates on WhatsApp</span>
              </label>

              <button type="submit" className="tmk-pay" disabled={busy} aria-busy={busy}>
                {busy ? 'Opening secure payment…' : classes < 1 ? 'Choose a class to continue' : (
                  <>Pay {fmtPaise(totalPaise)} securely<small>Includes {fmtPaise(gstPaise)} GST (18%) · opens Razorpay</small></>
                )}
              </button>
              <div className="tmk-secure">🔒 Payments are processed by Razorpay — UPI, cards, net banking &amp; wallets</div>
            </form>

            <aside className="tmk-summary" aria-label="Order summary">
              <p className="tmk-s-title">Order summary</p>
              <p className="tmk-s-plan">{svc.title}</p>
              <p className="tmk-s-meta">
                {classes} {classes === 1 ? 'class' : 'classes'}
                {picked.length > 0 && ` (${picked.join(', ')})`}
                {!picked.length && unsure && ' (expert to choose)'} · {cat?.label}
              </p>

              <div className="tmk-row"><span>Professional fee</span><b>{fmtPaise(feePaise)}</b></div>
              <div className="tmk-row tmk-gst-row"><span>GST @ {Math.round(GST_RATE * 100)}%<small>Added on professional fee only</small></span><b>{fmtPaise(gstPaise)}</b></div>
              <div className="tmk-row">
                <span>Government fee<small>{fmtPaise(perClass * 100)} × {classes} {classes === 1 ? 'class' : 'classes'} · IP India, Form TM-A e-filing · no GST</small></span>
                <b>{fmtPaise(govtPaise)}</b>
              </div>
              <div className="tmk-total"><span>Total payable</span><span>{fmtPaise(totalPaise)}</span></div>
              <p className="tmk-incl">✓ Includes {fmtPaise(gstPaise)} GST (18%)</p>
              <p className="tmk-hint" style={{ marginTop: 6 }}>
                {COLLECT_GOVT_FEE_ONLINE
                  ? 'Includes all taxes and the government fee. You pay once, securely, on the next step.'
                  : 'Government fee is paid separately when we file your application.'}
              </p>

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