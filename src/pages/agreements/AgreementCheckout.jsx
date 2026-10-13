import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SEO from '../../components/SEO'
import { useUserAuth } from '../../context/UserAuthContext'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { usePortalAuth } from '../../context/PortalAuthContext'
import apiClient, { getAccessToken } from '../../services/portal/apiClient'
import { loadRazorpayScript, armOpenWatchdog } from '../../lib/razorpay'
import { agreementBySlug, AGREEMENT_PRICING, LD_WA } from '../../data/agreements'
import { EStepRail } from '../estamp/estampKit'
import '../estamp/estampKit.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const inr = n => `₹${Number(n).toLocaleString('en-IN')}`

const CSS = `
.agc { background:var(--sec-b, #F8FAFC); min-height:80vh; padding-bottom:80px; }
.agc-wrap { max-width:1480px; margin:0 auto; padding:0 36px; box-sizing:border-box; }
@media (min-width:1025px) { .agc-wrap { max-width:1460px; width:calc(100% - 40px); } }
@media (max-width:1280px) { .agc-wrap { padding:0 20px; } }
@media (max-width:768px) { .agc-wrap { padding:0 14px; } }
.agc-head { background:#fff; border-bottom:1px solid var(--line); padding:22px 0 24px; margin-bottom:22px; }
.agc-crumb { font-size:13.5px; color:var(--text-3); margin-bottom:10px; }
.agc-crumb a { color:var(--text-3); text-decoration:none; } .agc-crumb a:hover { color:var(--blue); }
.agc-head h1 { margin:0; font-size:clamp(24px,3vw,32px); letter-spacing:-.03em; color:var(--navy); font-weight:800; }

.agc-grid { display:grid; grid-template-columns:minmax(0,1fr) 380px; gap:28px; align-items:start; }
.agc-form { background:#fff; border:1px solid var(--line); border-radius:18px; padding:clamp(20px,3vw,32px); }
.agc-form h2 { margin:0 0 4px; font-size:22px; color:var(--navy); letter-spacing:-.02em; }
.agc-form .lead { margin:0 0 24px; color:var(--text-2); font-size:15px; line-height:1.55; }
.agc-f { margin-bottom:20px; }
.agc-f > label { display:block; font-size:14.5px; font-weight:700; color:var(--navy); margin-bottom:8px; }
.agc-f .opt { font-weight:500; color:var(--text-3); }
.agc-in { width:100%; height:50px; box-sizing:border-box; border:1.5px solid var(--line-strong); border-radius:11px; padding:0 14px;
  font-size:15.5px; font-family:inherit; background:#fff; color:var(--navy); outline:none; transition:border-color .15s, box-shadow .15s; }
textarea.agc-in { height:auto; min-height:80px; padding:12px 14px; resize:vertical; line-height:1.5; }
.agc-in:focus { border-color:var(--blue); box-shadow:0 0 0 4px rgba(29,93,184,.12); }
.agc-in.bad { border-color:var(--error); }
.agc-err { color:var(--error); font-size:13px; margin-top:6px; }
.agc-two { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.agc-actions { display:flex; gap:12px; justify-content:space-between; align-items:center; margin-top:26px; padding-top:20px; border-top:1px solid var(--line); }
.agc-btn { height:52px; padding:0 26px; border-radius:12px; font-family:inherit; font-weight:800; font-size:16px; cursor:pointer; border:0;
  display:inline-flex; align-items:center; justify-content:center; gap:8px; text-decoration:none; }
.agc-btn.primary { background:var(--blue); color:#fff; margin-left:auto; }
.agc-btn.primary:hover { background:var(--blue-dark); }
.agc-btn.primary:disabled { opacity:.6; cursor:not-allowed; }
.agc-btn.plain { background:none; color:var(--text-2); padding:0 8px; }
.agc-alert { margin-top:14px; padding:12px 14px; border-radius:10px; font-size:14px; background:var(--error-bg); border:1px solid #FECACA; color:#991B1B; }

.agc-review { border:1.5px solid var(--line-strong); border-radius:14px; padding:16px 18px; margin-bottom:24px; }
.agc-review-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
.agc-review-head h3 { margin:0; font-size:15.5px; color:var(--navy); }
.agc-review-head button { background:none; border:0; color:var(--blue); font-weight:700; font-size:13.5px; cursor:pointer; font-family:inherit; }
.agc-review-dl { margin:0; display:grid; grid-template-columns:1fr auto; gap:8px 14px; font-size:14.5px; }
.agc-review-dl dt { color:var(--text-3); } .agc-review-dl dd { margin:0; text-align:right; font-weight:700; color:var(--navy); }

.agc-aside { position:sticky; top:100px; display:grid; gap:16px; }
.agc-price { background:#fff; border:1px solid var(--line); border-radius:16px; padding:18px 18px 16px; }
.agc-price h3 { margin:0 0 14px; font-size:16px; font-weight:800; color:var(--navy); }
.agc-price dl { margin:0; display:grid; grid-template-columns:1fr auto; gap:10px 12px; font-size:14.5px; align-items:center; }
.agc-price dt { color:var(--text-2); } .agc-price dd { margin:0; text-align:right; font-weight:700; color:var(--navy); }
.agc-price .total { border-top:2px solid var(--navy); padding-top:12px; margin-top:4px; font-size:18px; font-weight:800; color:var(--navy); }
.agc-help-card { border-radius:16px; padding:16px 18px; background:var(--navy); color:#fff; font-size:14px; line-height:1.55; }
.agc-help-card a { color:#fff; font-weight:800; }

.agc-done { text-align:center; padding:12px 0; }
.agc-done .tick { width:68px; height:68px; margin:0 auto 16px; border-radius:50%; background:var(--success-bg); display:grid; place-items:center; }
.agc-done h2 { font-size:26px; }
.agc-done p { color:var(--text-2); line-height:1.65; max-width:52ch; margin:0 auto 22px; }

@media (max-width:860px) { .agc-grid { grid-template-columns:1fr; } .agc-aside { position:static; } }
@media (max-width:520px) { .agc-two { grid-template-columns:1fr; } .agc-actions { flex-direction:column-reverse; } .agc-btn.primary { width:100%; } }
`

const STEPS = [{ t: 'Your Details' }, { t: 'Review & Pay' }]
const EMPTY = { name: '', mobile: '', email: '', city: '', firstParty: '', secondParty: '', specialInstructions: '' }

export default function AgreementCheckout() {
  const { slug } = useParams()
  const [params] = useSearchParams()
  const agreement = agreementBySlug(slug)
  const tier = params.get('tier') === 'upgraded' ? 'upgraded' : 'standard'
  const pricing = AGREEMENT_PRICING[tier]

  const { token, user } = useUserAuth()
  const adminAuth = useAdminAuth()
  const { user: portalUser } = usePortalAuth()
  const usingPortal = !!portalUser
  const navigate = useNavigate()
  const location = useLocation()
  const formRef = useRef(null)

  const [f, setF] = useState(EMPTY)
  const [step, setStep] = useState(1)
  const [errs, setErrs] = useState({})
  const [paying, setPaying] = useState(false)
  const [payErr, setPayErr] = useState('')
  const [payStage, setPayStage] = useState('')
  const payStageRef = useRef('')
  useEffect(() => { payStageRef.current = payStage }, [payStage])
  const [done, setDone] = useState(null)

  useEffect(() => { loadRazorpayScript().catch(() => { /* retried on Pay */ }) }, [])

  useEffect(() => {
    const activeUser = portalUser || user
    if (!activeUser) return
    setF(v => ({ ...v, name: v.name || activeUser.name || '', email: v.email || activeUser.email || '', mobile: v.mobile || activeUser.phone || activeUser.mobile || '' }))
  }, [user, portalUser])

  if (!agreement) return <Navigate to="/agreements" replace />
  const { title } = agreement
  const gstPaise = Math.round(pricing.price * 100 * 0.18)
  const total = pricing.price + gstPaise / 100

  const set = k => e => {
    setF(v => ({ ...v, [k]: e.target.value }))
    setErrs(x => (x[k] ? { ...x, [k]: undefined } : x))
  }

  function validate() {
    const e = {}
    if (!f.name.trim()) e.name = 'Enter your name.'
    if (!/^\+?[0-9\s-]{10,14}$/.test(f.mobile.trim())) e.mobile = 'Enter a 10-digit mobile number.'
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Enter a valid email address.'
    if (!f.city.trim()) e.city = 'Enter your city.'
    if (!f.firstParty.trim()) e.firstParty = 'Enter the first party\'s name.'
    if (!f.secondParty.trim()) e.secondParty = 'Enter the second party\'s name, or NIL if there isn\'t one.'
    setErrs(e)
    return !Object.keys(e).length
  }

  const goTo = n => { setErrs({}); setStep(n); formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  const next = () => { if (validate()) goTo(2) }

  async function pay() {
    if (!validate()) return
    setPaying(true); setPayErr(''); setPayStage('1/3 Creating your order…')
    const payload = {
      agreementSlug: slug, tier,
      firstParty: f.firstParty.trim(), secondParty: f.secondParty.trim(),
      name: f.name.trim(), email: f.email.trim(), mobile: f.mobile.trim(), city: f.city.trim(),
      specialInstructions: f.specialInstructions.trim(),
    }
    try {
      const getActiveToken = () => {
        try {
          return (
            (typeof getAccessToken === 'function' ? getAccessToken() : null) ||
            localStorage.getItem('portal_access_token') ||
            token ||
            localStorage.getItem('ld_user_token') ||
            adminAuth?.token ||
            localStorage.getItem('ld_admin_token') ||
            null
          )
        } catch { return null }
      }
      const activeToken = getActiveToken()

      const tryCreateOrder = async (useAuth = true) => {
        const headers = { 'Content-Type': 'application/json' }
        if (useAuth && activeToken) headers.Authorization = `Bearer ${activeToken}`
        const res = await fetch(`${API_BASE}/payments/checkout/agreement/create-order`, {
          signal: AbortSignal.timeout ? AbortSignal.timeout(25000) : undefined,
          method: 'POST', headers, body: JSON.stringify(payload),
        })
        const d = await res.json().catch(() => ({}))
        if (!res.ok) {
          const err = new Error((d.fields && Object.values(d.fields)[0]) || d.message || "We couldn't create your order. Check the details and try again.")
          err.response = { status: res.status, data: d }
          throw err
        }
        return d
      }

      let data
      try {
        data = await tryCreateOrder(!!activeToken)
      } catch (orderErr) {
        if (orderErr?.response?.status === 401 && activeToken) {
          setPayStage('1/3 Connecting to checkout…')
          data = await tryCreateOrder(false)
        } else throw orderErr
      }

      setPayStage('2/3 Order created. Loading secure checkout…')
      if (!data.keyId) {
        setPayErr('Payment could not be started (missing payment configuration). Please contact support@launcherdesk.com. No amount has been charged.')
        return
      }

      await loadRazorpayScript()
      setPayStage('3/3 Opening checkout…')
      const bodyOverflow = document.body.style.overflow
      document.body.style.overflow = ''

      await new Promise(resolve => {
        let settled = false
        const finish = () => { if (!settled) { settled = true; document.body.style.overflow = bodyOverflow; resolve() } }
        let stopWatch = () => { }
        const rzpOptions = {
          key: data.keyId, amount: data.amount, currency: data.currency, order_id: data.orderId,
          name: 'LauncherDesk', description: `${title} — ${pricing.label} Plan`, image: new URL('/apple-touch-icon.png', window.location.origin).href,
          prefill: { name: f.name, email: f.email, contact: f.mobile }, theme: { color: '#1D5DB8' },
          modal: { ondismiss: () => { stopWatch(); finish() }, confirm_close: true, animation: true, escape: true },
          handler: async response => {
            stopWatch()
            try {
              const verifyHeaders = { 'Content-Type': 'application/json', ...(activeToken ? { Authorization: `Bearer ${activeToken}` } : {}) }
              const vr = await fetch(`${API_BASE}/payments/checkout/verify`, { method: 'POST', headers: verifyHeaders, body: JSON.stringify(response) }).catch(() => null)
              let v = vr ? await vr.json().catch(() => ({})) : null
              if (!v?.success) {
                if (usingPortal) {
                  const pvr = await apiClient.post('/payments/verify', response, { baseURL: API_BASE }).catch(() => null)
                  if (pvr?.data?.success) v = pvr.data
                } else {
                  v = await fetch(`${API_BASE}/payments/verify`, { method: 'POST', headers: verifyHeaders, body: JSON.stringify(response) }).then(r => r.json()).catch(() => ({}))
                }
              }
              if (v?.success) setDone({ orderNumber: v.orderNumber || data.orderNumber, ldOrderId: v.ldOrderId || data.ldOrderId })
              else setPayErr(v?.message || "Payment received. We're confirming it and will email you shortly.")
            } catch {
              setPayErr("Payment received. We're confirming it and will email you shortly. You don't need to pay again.")
            }
            finish()
          },
        }
        const rzp = new window.Razorpay(rzpOptions)
        rzp.on?.('payment.failed', r => { stopWatch(); setPayErr(r?.error?.description || "The payment didn't go through. No money was taken; you can try again."); finish() })
        try {
          rzp.open()
          stopWatch = armOpenWatchdog(() => {
            if (!settled) { setPayErr('The payment window didn’t open. Please check your connection and try again. No amount has been charged.'); finish() }
          }, 15000)
        } catch (openErr) {
          setPayErr(openErr?.message || 'Could not open the payment window. Please try again.')
          finish()
        }
      })
    } catch (err) {
      const timedOut = err?.code === 'ECONNABORTED' || err?.name === 'TimeoutError' || err?.name === 'AbortError'
      const base = timedOut
        ? "We couldn't reach our server from this device (timed out). Check your internet or try mobile data / another Wi-Fi."
        : (err?.response?.data?.message || err.message || 'Something went wrong. Please try again.')
      setPayErr(`${base} [stopped at: ${payStageRef.current || 'start'}]`)
    } finally {
      setPaying(false); setPayStage('')
    }
  }

  const Err = ({ k }) => (errs[k] ? <div className="agc-err" role="alert">{errs[k]}</div> : null)
  const inCls = k => `agc-in${errs[k] ? ' bad' : ''}`

  return (
    <>
      <SEO title={`${title} — Checkout`} description={`Get your ${title.toLowerCase()} drafted and e-Stamped.`} canonical={`/agreements/${slug}/checkout`} />
      <style>{CSS}</style>
      <div className="agc">
        <header className="agc-head">
          <div className="agc-wrap">
            <nav className="agc-crumb" aria-label="Breadcrumb"><Link to="/">Home</Link> / <Link to="/agreements">Deeds &amp; Agreements</Link> / <Link to={`/agreements/${slug}`}>{title}</Link> / Checkout</nav>
            <h1>{title} — {pricing.label} Plan</h1>
          </div>
        </header>

        <div className="agc-wrap">
          {!done && <EStepRail steps={STEPS} step={step} maxStep={step} done={!!done} onGoTo={n => n < step && goTo(n)} />}

          <div className="agc-grid">
            <section className="agc-form" ref={formRef} style={{ scrollMarginTop: 100 }} aria-live="polite">
              {done ? (
                <div className="agc-done">
                  <div className="tick"><svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></div>
                  <h2>Order placed</h2>
                  <p>
                    {done.orderNumber && <>Your order number is <b>{done.orderNumber}</b>. </>}
                    We've emailed your receipt and tax invoice. Our documentation team will start drafting your {title.toLowerCase()} and send it to you for review.
                  </p>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {done.ldOrderId && <Link to={`/user/services/${done.ldOrderId}`} className="agc-btn primary" style={{ marginLeft: 0 }}>View my order</Link>}
                    <Link to="/agreements" className="agc-btn plain">Order another agreement</Link>
                  </div>
                </div>
              ) : step === 1 ? (
                <>
                  <h2>Your details</h2>
                  <p className="lead">These go on your order and the draft. Names below are printed on the document exactly as typed.</p>
                  <div className="agc-two">
                    <div className="agc-f">
                      <label htmlFor="fp">First party</label>
                      <input id="fp" className={inCls('firstParty')} value={f.firstParty} onChange={set('firstParty')} placeholder="e.g. landlord, seller" />
                      <Err k="firstParty" />
                    </div>
                    <div className="agc-f">
                      <label htmlFor="sp">Second party</label>
                      <input id="sp" className={inCls('secondParty')} value={f.secondParty} onChange={set('secondParty')} placeholder="e.g. tenant, buyer, or NIL" />
                      <Err k="secondParty" />
                    </div>
                  </div>
                  <div className="agc-f">
                    <label htmlFor="name">Your name</label>
                    <input id="name" className={inCls('name')} value={f.name} onChange={set('name')} autoComplete="name" />
                    <Err k="name" />
                  </div>
                  <div className="agc-two">
                    <div className="agc-f">
                      <label htmlFor="mobile">Mobile number</label>
                      <input id="mobile" className={inCls('mobile')} value={f.mobile} onChange={set('mobile')} autoComplete="tel" />
                      <Err k="mobile" />
                    </div>
                    <div className="agc-f">
                      <label htmlFor="email">Email</label>
                      <input id="email" type="email" className={inCls('email')} value={f.email} onChange={set('email')} autoComplete="email" />
                      <Err k="email" />
                    </div>
                  </div>
                  <div className="agc-f">
                    <label htmlFor="city">City</label>
                    <input id="city" className={inCls('city')} value={f.city} onChange={set('city')} />
                    <Err k="city" />
                  </div>
                  <div className="agc-f">
                    <label htmlFor="si">Special instructions <span className="opt">(optional)</span></label>
                    <textarea id="si" className="agc-in" value={f.specialInstructions} onChange={set('specialInstructions')} placeholder="Anything our documentation team should know" />
                  </div>
                  <div className="agc-actions">
                    <button type="button" className="agc-btn primary" onClick={next}>Continue to review</button>
                  </div>
                </>
              ) : (
                <>
                  <h2>Review &amp; pay</h2>
                  <p className="lead">Check everything below, then pay securely to confirm your order.</p>
                  <div className="agc-review">
                    <div className="agc-review-head"><h3>Agreement</h3><button type="button" onClick={() => goTo(1)}>Edit</button></div>
                    <dl className="agc-review-dl">
                      <dt>Document</dt><dd>{title}</dd>
                      <dt>Plan</dt><dd>{pricing.label}</dd>
                      <dt>First party</dt><dd>{f.firstParty}</dd>
                      <dt>Second party</dt><dd>{f.secondParty}</dd>
                    </dl>
                  </div>
                  <div className="agc-review">
                    <div className="agc-review-head"><h3>Contact</h3><button type="button" onClick={() => goTo(1)}>Edit</button></div>
                    <dl className="agc-review-dl">
                      <dt>Name</dt><dd>{f.name}</dd>
                      <dt>Mobile</dt><dd>{f.mobile}</dd>
                      <dt>Email</dt><dd>{f.email}</dd>
                      <dt>City</dt><dd>{f.city}</dd>
                    </dl>
                  </div>
                  {payErr && <div className="agc-alert" role="alert">{payErr}</div>}
                  <div className="agc-actions">
                    <button type="button" className="agc-btn plain" onClick={() => goTo(1)}>Back</button>
                    <button type="button" className="agc-btn primary" onClick={pay} disabled={paying}>
                      {paying ? (payStage || 'Processing…') : `Pay ${inr(total)}`}
                    </button>
                  </div>
                </>
              )}
            </section>

            <aside className="agc-aside" aria-label="Price summary">
              <div className="agc-price">
                <h3>Price summary</h3>
                <dl>
                  <dt>{pricing.label} drafting fee</dt><dd>{inr(pricing.price)}</dd>
                  <dt>GST (18%)</dt><dd>{inr(gstPaise / 100)}</dd>
                  <dt className="total">Total payable</dt><dd className="total">{inr(total)}</dd>
                </dl>
              </div>
              <div className="agc-help-card">
                Need help? Talk to our support team.{' '}
                <a href={`https://wa.me/${LD_WA}?text=${encodeURIComponent(`Hi, I have a question about my ${title} order.`)}`} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>.
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
