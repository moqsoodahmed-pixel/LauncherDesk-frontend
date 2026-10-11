import { ESTAMP_FEES, LD_WA } from '../../../data/estamp'

const inr = n => `₹${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`

/** Shared live price sidebar used across every wizard step. */
export default function PriceSummary({ stateName, validDuty, duty, courier, fees, gst, total }) {
  return (
    <>
      <div className="lds-price">
        <h3>Price summary</h3>
        <dl>
          <dt>Stamp duty</dt><dd>{validDuty ? inr(duty) : 'At Actuals'}</dd>
          <dt>Convenience Fee</dt><dd>{inr(ESTAMP_FEES.convenience)}</dd>
          <dt>Procurement Charge</dt><dd>{inr(ESTAMP_FEES.procurement)}</dd>
          {courier > 0 && <><dt>Doorstep delivery</dt><dd>{inr(courier)}</dd></>}
          <dt>GST (18%)</dt><dd>{inr(gst)}</dd>
          <dt>Government Fees</dt><dd>{validDuty ? inr(duty) : 'At Actuals'}</dd>
          <dt className="total">Total payable</dt><dd className="total">{validDuty ? inr(total) : '—'}</dd>
        </dl>
        <p>All taxes included. Final price. The professional fee and government charges are itemised before you pay.</p>
        <p style={{ marginTop: 6 }}>SLA protected. Secure gateway integration.</p>
      </div>
      <div className="lds-docs">
        <h4>Documents required</h4>
        <p>PAN Card <span>(requested after payment, from your Dashboard)</span></p>
      </div>
      <div className="lds-help-card">
        Need help? Talk to our support team.{' '}
        <a href={`https://wa.me/${LD_WA}?text=${encodeURIComponent(`Hi, I have a question about ${stateName || ''} e-Stamp paper.`)}`} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>.
      </div>
    </>
  )
}
