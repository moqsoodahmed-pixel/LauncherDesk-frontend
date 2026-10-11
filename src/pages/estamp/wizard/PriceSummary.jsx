import { ESTAMP_FEES, getConvenienceFee, LD_WA } from '../../../data/estamp'

const inr = n => `₹${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`

/** Shared live price sidebar used across every wizard step. */
export default function PriceSummary({ stateName, docType, validDuty, duty, convenience, courier, fees, gst, total }) {
  const convFee = convenience !== undefined ? convenience : (validDuty ? getConvenienceFee(duty) : 0)
  return (
    <>
      <div className="lds-price">
        <h3>Price summary</h3>
        {docType && (
          <div
            className="lds-price-doc"
            title={docType}
            style={{ fontSize: 12.5, color: '#64748B', margin: '-4px 0 12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {docType}
          </div>
        )}
        <dl>
          <dt>Convenience Fee</dt><dd>{inr(convFee)}</dd>
          <dt>Procurement Charge</dt><dd>{inr(ESTAMP_FEES.procurement)}</dd>
          {courier > 0 && <><dt>Doorstep delivery</dt><dd>{inr(courier)}</dd></>}
          <dt>GST (18%)</dt><dd>{inr(gst)}</dd>
          <dt>Government Fees</dt>
          <dd>
            <span
              className="lds-price-badge-actuals"
              style={{
                display: 'inline-block',
                background: '#FEF3C7',
                color: '#92400E',
                fontSize: 12,
                fontWeight: 700,
                padding: '2px 10px',
                borderRadius: 9999,
                lineHeight: 1.4,
              }}
            >
              At Actuals
            </span>
          </dd>
          <dt className="total">Total payable</dt>
          <dd className="total">{validDuty ? inr(total) : '—'}</dd>
        </dl>
        <p style={{ margin: '14px 0 0', fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>
          All taxes included • Final price
        </p>
        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>
          The professional fee and government charges are itemized before you pay.
        </p>
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

