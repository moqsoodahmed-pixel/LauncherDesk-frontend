import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
import { REGISTRATION_PLANS } from '../data/registrationPlans'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const CHECK_D = 'M20 6 9 17l-5-5'
const CROSS_D = 'M18 6 6 18M6 6l12 12'

const TIER_EMOJI = { Basic: '📦', Standard: '⭐', Premium: '🚀' }

/*
  Design notes (kept here so future edits don't reintroduce old bugs):
  - The "Most Popular" ribbon is rendered IN NORMAL FLOW as the first child of
    the card (not position:absolute with a negative offset) — nothing to clip.
  - All three cards reserve the SAME header height whether or not they have a
    ribbon (see .rpp-ribbon / .rpp-ribbon-spacer, both a fixed 40px tall) —
    that's what keeps "BASIC" / "STANDARD" / "PREMIUM" and every row below
    them lined up at the same y-position instead of the Standard card's
    content starting lower than the other two.
  - The grid uses align-items:stretch so all three cards match height too.
  - Hover "focus" effect is done with React state (not CSS :hover) so it's
    reliable cross-browser: the hovered card lifts/scales up, the other two
    ease back slightly (not too far), all three animate smoothly via the
    shared `transition` on .rpp-card. This only engages on devices with a
    real pointer (mouse/trackpad) via the hover/pointer check below — on
    touch devices (phone/tablet) cards just sit at their normal resting
    scale, which is what you want on a device with no real "hover".
  - This component does NOT reuse the global ".card" class, so its layout
    can't be affected by that class's overflow/hover rules (or vice versa).
  - This section renders full-width, above the 3-column TOC/body/aside
    layout (see ServicePage.jsx), which is what avoids the card/price
    overflow that happened when it was squeezed into a narrow column.
*/
const S = `
.rpp-wrap { margin: clamp(40px, 6vw, 64px) 0; }
.rpp-head { text-align:center; max-width:700px; margin:0 auto 16px; }
.rpp-eyebrow { display:inline-block; font-size:23px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:var(--blue); margin-bottom:14px; }
.rpp-head h2 { font-size:clamp(24px,3.6vw,36px); font-weight:900; color:var(--navy); letter-spacing:-.025em; line-height:1.25; }
.rpp-head p { font-size:15.5px; color:var(--text-2); line-height:1.7; margin-top:14px; }
.rpp-divider { width:56px; height:4px; border-radius:99px; background:var(--grad); margin:26px auto clamp(32px,5vw,52px); }

.rpp-grid { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:clamp(24px,2.4vw,36px); align-items:stretch; }

.rpp-card {
  position:relative;
  display:flex;
  flex-direction:column;
  background:#fff;
  border:1.5px solid var(--line);
  border-radius:20px;
  box-shadow:0 2px 10px rgba(15,28,46,.05);
  transition:transform .38s cubic-bezier(.16,1,.3,1), box-shadow .38s ease, border-color .3s ease;
  overflow:hidden;       /* safe here: the ribbon/spacer is inside the box, nothing to clip */
  will-change:transform;
}

.rpp-card--basic { border-color:rgba(100,116,139,.45); }
.rpp-card--standard.rpp-card--primary { border-color:#4F46E5; border-width:2px; }
.rpp-card--premium { border-color:rgba(249,115,22,.45); }

/* Same fixed height on every card's header strip — ribbon on Standard,
   invisible spacer of identical height on Basic/Premium — so all the rows
   below (icon, price, features, button) line up across all three cards. */
.rpp-ribbon, .rpp-ribbon-spacer { height:40px; display:flex; align-items:center; justify-content:center; }
.rpp-ribbon { background:linear-gradient(90deg,#1E3A8A 0%,#4338CA 55%,#6D28D9 100%); color:#fff; font-size:12px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; gap:6px; }
.rpp-ribbon-spacer { background:transparent; }

.rpp-body { padding:clamp(28px,3vw,40px) clamp(24px,2.6vw,32px) clamp(26px,2.8vw,34px); display:flex; flex-direction:column; flex:1; }

.rpp-tier-row { display:flex; align-items:center; gap:12px; margin-bottom:24px; }
.rpp-tier-icon { display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:10px; flex:none; font-size:17px; background:var(--bg-2); }
.rpp-tier-icon--basic { background:rgba(100,116,139,.16); }
.rpp-tier-icon--standard { background:rgba(79,70,229,.16); }
.rpp-tier-icon--premium { background:rgba(249,115,22,.16); }
.rpp-tier { font-size:13.5px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:var(--text-2); }

.rpp-price-row { display:flex; align-items:baseline; gap:10px; flex-wrap:wrap; margin-bottom:28px; padding-bottom:26px; border-bottom:1px solid var(--line); }
.rpp-price { font-size:clamp(28px,3.2vw,38px); font-weight:900; color:var(--navy); letter-spacing:-.02em; }
.rpp-price-note { font-size:13.5px; color:var(--text-3); font-weight:600; }

.rpp-features-h { font-size:12px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; color:var(--text-3); margin-bottom:18px; }
.rpp-features { list-style:none; display:flex; flex-direction:column; gap:16px; margin-bottom:32px; flex:1; }
.rpp-feature { display:flex; align-items:flex-start; gap:12px; font-size:14.5px; line-height:1.55; }
.rpp-feature-icon { display:flex; align-items:center; justify-content:center; width:21px; height:21px; border-radius:50%; flex:none; margin-top:1px; }
.rpp-feature--yes .rpp-feature-icon { background:rgba(29,93,184,.10); }
.rpp-feature--no .rpp-feature-icon { background:var(--bg-2); }
.rpp-feature--no { color:var(--text-3); text-decoration:line-through; opacity:.7; }
.rpp-feature--yes { color:var(--text-2); }

.rpp-cta { display:block; width:100%; text-align:center; padding:16px; border-radius:12px; font-weight:700; font-size:15px; border:none; cursor:pointer; font-family:inherit; transition:opacity .15s, transform .15s, box-shadow .2s ease; margin-top:auto; color:#fff; }
.rpp-cta:disabled { cursor:not-allowed; opacity:.75; }
.rpp-cta--basic { background:linear-gradient(180deg,#475569 0%,#334155 100%); box-shadow:0 8px 20px rgba(51,65,85,.28); }
.rpp-cta--basic:hover:not(:disabled) { box-shadow:0 12px 26px rgba(51,65,85,.36); }
.rpp-cta--standard { background:linear-gradient(180deg,#4F46E5 0%,#4338CA 60%,#3730A3 100%); box-shadow:0 10px 24px rgba(79,70,229,.34); }
.rpp-cta--standard:hover:not(:disabled) { box-shadow:0 14px 30px rgba(79,70,229,.42); }
.rpp-cta--premium { background:linear-gradient(180deg,#FB923C 0%,#F97316 60%,#EA580C 100%); box-shadow:0 10px 24px rgba(249,115,22,.32); }
.rpp-cta--premium:hover:not(:disabled) { box-shadow:0 14px 30px rgba(249,115,22,.4); }
.rpp-cta:hover:not(:disabled) { transform:translateY(-2px); }
.rpp-cta:active:not(:disabled) { transform:translateY(0) scale(.98); }
.rpp-cta-msg { margin-top:10px; padding:10px 12px; border-radius:8px; font-size:12.5px; line-height:1.5; }

@media (max-width:960px) {
  .rpp-grid { grid-template-columns:1fr 1fr; }
}
@media (max-width:640px) {
  .rpp-grid { grid-template-columns:1fr; }
}
`

function tierClass(tier) {
  return tier.toLowerCase()
}

function PlanGetStartedButton({ svc, plan }) {
  const { isLoggedIn, token } = useUserAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [payEnabled, setPayEnabled] = useState(null)

  const numericPrice = parseFloat(String(plan.price || '').replace(/[₹,*]/g, ''))
  const hasPrice = !isNaN(numericPrice) && numericPrice > 0

  useEffect(() => {
    if (!hasPrice) return
    fetch(`${API_BASE}/payments/config`)
      .then(r => r.json())
      .then(d => setPayEnabled(d.enabled))
      .catch(() => setPayEnabled(false))
  }, [hasPrice])

  async function handleClick() {
    // Not logged in → send to the login page, then back here afterwards.
    if (!isLoggedIn) {
      navigate('/user/login', { state: { from: location.pathname, tab: 'login' } })
      return
    }
    // Logged in → go straight into the payment flow for this specific plan.
    if (!hasPrice) { navigate('/company/contact'); return }
    if (payEnabled === null) return
    if (!payEnabled) { navigate('/company/contact'); return }

    setLoading(true); setMsg('')
    try {
      const res = await fetch(`${API_BASE}/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          amount: numericPrice,
          serviceSlug: `${svc.slug}-${plan.tier.toLowerCase()}`,
          serviceTitle: `${svc.title} — ${plan.tier} Plan`,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to create order')
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script')
          s.src = 'https://checkout.razorpay.com/v1/checkout.js'
          s.onload = resolve; s.onerror = reject
          document.body.appendChild(s)
        })
      }
      await new Promise((resolve) => {
        const rzp = new window.Razorpay({
          key: data.keyId, amount: data.amount, currency: data.currency, order_id: data.orderId,
          name: 'LauncherDesk', description: `${svc.title} — ${plan.tier} Plan`, image: '/launcherdesk-logo-transparent.png',
          theme: { color: '#1D6FE0' },
          handler: async (response) => {
            try {
              const vRes = await fetch(`${API_BASE}/payments/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  serviceSlug: `${svc.slug}-${plan.tier.toLowerCase()}`,
                  serviceTitle: `${svc.title} — ${plan.tier} Plan`,
                }),
              })
              const vData = await vRes.json()
              setMsg(vData.success ? '✅ Payment successful! Our team will contact you within 1 business day.' : '⚠️ Payment received but verification pending. Contact support@launcherdesk.com')
            } catch { setMsg('Payment received. Contact support@launcherdesk.com to confirm.') }
            resolve()
          },
          modal: { ondismiss: () => { setLoading(false); resolve() } },
        })
        rzp.open()
      })
    } catch (err) {
      setMsg(`❌ ${err.message || 'Something went wrong. Please try again.'}`)
    } finally {
      setLoading(false)
    }
  }

  const isSuccess = msg.startsWith('✅'), isFail = msg.startsWith('❌')
  const label = loading ? 'Processing…' : isLoggedIn ? `Pay ${plan.price} →` : 'Get Started'

  return (
    <div style={{ marginTop: 'auto' }}>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        aria-busy={loading}
        className={`rpp-cta rpp-cta--${tierClass(plan.tier)}`}
      >
        {label}
      </button>
      {msg && (
        <div role="status" aria-live="polite" className="rpp-cta-msg" style={{
          background: isSuccess ? '#DCFCE7' : isFail ? '#FEF2F2' : '#FEF9C3',
          border: `1px solid ${isSuccess ? '#BBF7D0' : isFail ? '#FECACA' : '#FDE68A'}`,
          color: isSuccess ? '#166534' : isFail ? '#DC2626' : '#854D0E',
        }}>{msg}</div>
      )}
    </div>
  )
}

export default function RegistrationPricingPlans({ svc }) {
  const data = svc?.slug ? REGISTRATION_PLANS[svc.slug] : null
  const [hovered, setHovered] = useState(null)
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    // Only enable the "focus one, recede the others" effect on devices with
    // a real pointer (mouse/trackpad). On touch devices there's no hover
    // concept, so cards just stay at their normal resting size — this is
    // what keeps the effect feeling right on mobile/tablet instead of a
    // card getting "stuck" popped-out after a tap.
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setCanHover(mq.matches)
    const onChange = () => setCanHover(mq.matches)
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange)
    return () => { mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange) }
  }, [])

  if (!data) return null

  return (
    <section id="pricing-plans" style={{ marginBottom: 8 }}>
      <style>{S}</style>
      <div className="rpp-wrap">
        <div className="rpp-head">
          <span className="rpp-eyebrow">🏷️ Pricing plans</span>
          <h2>{data.heading}</h2>
          <p>Compare what's included at each level and pick the plan that matches how much support you need.</p>
        </div>
        <div className="rpp-divider" />
        <div className="rpp-grid" onMouseLeave={() => canHover && setHovered(null)}>
          {data.plans.map(plan => {
            const isHovered = canHover && hovered === plan.tier
            const isReceded = canHover && hovered !== null && hovered !== plan.tier
            const transform = isHovered
              ? 'translateY(-14px) scale(1.045)'
              : isReceded
                ? 'translateY(2px) scale(0.965)'
                : 'translateY(0) scale(1)'
            const boxShadow = isHovered
              ? (plan.primary
                  ? '0 28px 60px rgba(15,28,46,.20), 0 6px 20px rgba(79,70,229,.22)'
                  : '0 22px 48px rgba(15,28,46,.16)')
              : plan.primary
                ? '0 20px 48px rgba(15,28,46,.13), 0 4px 16px rgba(79,70,229,.14)'
                : '0 2px 10px rgba(15,28,46,.05)'
            return (
              <div
                key={plan.tier}
                className={`rpp-card rpp-card--${tierClass(plan.tier)}${plan.primary ? ' rpp-card--primary' : ''}`}
                onMouseEnter={() => canHover && setHovered(plan.tier)}
                style={{ transform, boxShadow, zIndex: isHovered ? 5 : 1 }}
              >
                {plan.primary ? (
                  <div className="rpp-ribbon">⭐ Most Popular</div>
                ) : (
                  <div className="rpp-ribbon-spacer" aria-hidden="true" />
                )}
                <div className="rpp-body">
                  <div className="rpp-tier-row">
                    <span className={`rpp-tier-icon rpp-tier-icon--${tierClass(plan.tier)}`} aria-hidden="true">{TIER_EMOJI[plan.tier] || '📦'}</span>
                    <span className="rpp-tier">{plan.tier}</span>
                  </div>
                  <div className="rpp-price-row">
                    <span className="rpp-price">{plan.price}</span>
                    {plan.priceNote && <span className="rpp-price-note">{plan.priceNote}</span>}
                  </div>
                  <div className="rpp-features-h">What you'll get</div>
                  <ul className="rpp-features">
                    {plan.features.map(f => (
                      <li key={f.text} className={`rpp-feature ${f.included ? 'rpp-feature--yes' : 'rpp-feature--no'}`}>
                        <span className="rpp-feature-icon">
                          <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke={f.included ? 'var(--blue)' : 'var(--text-3)'} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d={f.included ? CHECK_D : CROSS_D} />
                          </svg>
                        </span>
                        <span>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <PlanGetStartedButton svc={svc} plan={plan} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}