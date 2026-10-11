import { useState } from 'react'
import { ESTAMP_FEES } from '../../../data/estamp'

const inr = n => `₹${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`

export default function ReviewPayStep({
  f, set, errs, inCls, Err, st, docLabel, duty, validDuty, total, onEdit, pay, paying, payErr, payStage,
}) {
  const [coupon, setCoupon] = useState('')
  const [couponMsg, setCouponMsg] = useState('')
  const applyCoupon = () => {
    if (!coupon.trim()) return
    setCouponMsg("Coupons aren't available yet. The full price is shown below.")
  }

  return (
    <>
      <h2>Review your order</h2>
      <p className="lead">Check the details, choose delivery and apply a coupon, then continue to payment.</p>

      <div className="lds-review">
        <div className="lds-review-head">
          <h3>Order details</h3>
          <button type="button" className="lds-btn plain" onClick={() => onEdit(3)}>Edit</button>
        </div>
        <dl className="lds-review-dl">
          <dt>State</dt><dd>{st.name}</dd>
          <dt>Article</dt><dd>{docLabel || '—'}</dd>
          <dt>First Party</dt><dd>{f.firstParty || '—'}</dd>
          <dt>Second Party</dt><dd>{f.secondParty || '—'}</dd>
          <dt>Government Stamp Duty</dt><dd>{validDuty ? inr(duty) : '—'}</dd>
        </dl>
      </div>

      <h3 className="lds-section-h">Contact details</h3>
      <div className="lds-two">
        <div className="lds-f"><label htmlFor="nm">Full name</label>
          <input id="nm" className={inCls('name')} value={f.name} onChange={set('name')} autoComplete="name" /><Err k="name" /></div>
        <div className="lds-f"><label htmlFor="mb">Mobile number</label>
          <input id="mb" className={inCls('mobile')} type="tel" value={f.mobile} onChange={set('mobile')} placeholder="98765 43210" autoComplete="tel" /><Err k="mobile" /></div>
      </div>
      <div className="lds-two">
        <div className="lds-f"><label htmlFor="em">Email address</label>
          <input id="em" className={inCls('email')} type="email" value={f.email} onChange={set('email')} autoComplete="email" /><Err k="email" /></div>
        <div className="lds-f"><label htmlFor="cs">State / Region</label>
          <input id="cs" className={inCls('contactState')} value={f.contactState} onChange={set('contactState')} /><Err k="contactState" /></div>
      </div>
      <div className="lds-two">
        <div className="lds-f"><label htmlFor="cc">City</label>
          <input id="cc" className={inCls('contactCity')} value={f.contactCity} onChange={set('contactCity')} /><Err k="contactCity" /></div>
        <div className="lds-f"><label htmlFor="bn">Business name <span className="lds-optional">(optional)</span></label>
          <input id="bn" className="lds-in" value={f.businessName} onChange={set('businessName')} placeholder="e.g. Acme Corporation Private Limited" /></div>
      </div>
      <div className="lds-two">
        <div className="lds-f"><label htmlFor="ar">Agent referral code <span className="lds-optional">(optional)</span></label>
          <input id="ar" className="lds-in" value={f.agentReferralCode} onChange={set('agentReferralCode')} placeholder="Optional agent coupon" /></div>
        <div />
      </div>
      <div className="lds-f">
        <label htmlFor="si">Special requests or instructions <span className="lds-optional">(optional)</span></label>
        <textarea id="si" className="lds-in" value={f.specialInstructions} onChange={set('specialInstructions')} maxLength={500}
          placeholder="Provide any custom instructions for our filing department" />
      </div>

      <h3 className="lds-section-h">Delivery</h3>
      <label className="lds-print">
        <input type="checkbox" checked={f.delivery === 'courier'} onChange={e => set('delivery')({ target: { type: 'text', value: e.target.checked ? 'courier' : 'email' } })} />
        <span><b>Doorstep delivery</b> {ESTAMP_FEES.courier > 0 && <span className="lds-extra">+{inr(ESTAMP_FEES.courier)} + GST</span>}
          <small>Scan copy by email always included; the original stamp paper is also couriered to your address.</small>
        </span>
      </label>
      {f.delivery === 'courier' && (
        <>
          <div className="lds-f">
            <label htmlFor="ad">Delivery address</label>
            <textarea id="ad" className={inCls('address')} value={f.address} onChange={set('address')} maxLength={300} placeholder="House or flat, street, area" autoComplete="street-address" />
            <Err k="address" />
          </div>
          <div className="lds-two">
            <div className="lds-f"><label htmlFor="ci">City</label>
              <input id="ci" className={inCls('city')} value={f.city} onChange={set('city')} autoComplete="address-level2" /><Err k="city" /></div>
            <div className="lds-f"><label htmlFor="pin">PIN code</label>
              <input id="pin" className={inCls('pincode')} inputMode="numeric" maxLength={6} value={f.pincode} onChange={set('pincode')} autoComplete="postal-code" /><Err k="pincode" /></div>
          </div>
        </>
      )}

      <div className="lds-f">
        <label htmlFor="coupon">Coupon code <span className="lds-optional">(optional)</span></label>
        <div style={{ display: 'flex', gap: 10 }}>
          <input id="coupon" className="lds-in" value={coupon} onChange={e => { setCoupon(e.target.value); setCouponMsg('') }} placeholder="Enter code" />
          <button type="button" className="lds-btn outline" style={{ height: 50 }} onClick={applyCoupon}>Apply</button>
        </div>
        {couponMsg && <div className="lds-help">{couponMsg}</div>}
      </div>

      <div className="lds-actions">
        <button type="button" className="lds-btn plain" onClick={() => onEdit(4)}>Back</button>
        <button type="button" className="lds-btn primary" onClick={pay} disabled={paying} aria-busy={paying}>
          {paying ? 'Opening payment…' : `Pay ${inr(total)}`}
        </button>
      </div>
      {payErr && <div className="lds-alert" role="alert">{payErr}</div>}
      {paying && payStage && <div className="lds-alert" style={{ background: '#EEF4FF', color: '#1D3A8A', borderColor: '#C7D8FF' }}>{payStage}</div>}
    </>
  )
}
