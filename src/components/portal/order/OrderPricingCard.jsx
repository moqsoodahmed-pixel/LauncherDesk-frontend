import { formatMoney } from '../../../utils/portal/money';

export default function OrderPricingCard({ pricing, invoiceNumber }) {
  return (
    <div className="ld-panel">
      {invoiceNumber && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid var(--ld-border)' }}>
          <div className="ld-card-label" style={{ margin: 0 }}>Invoice No.</div>
          <span style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: 'var(--ld-primary)', letterSpacing: '0.06em' }}>
            {invoiceNumber}
          </span>
        </div>
      )}
      <div className="ld-card-grid">
        <div>
          <div className="ld-card-label">Base Amount</div>
          <div className="ld-card-value" style={{ fontSize: 16 }}>
            {formatMoney(pricing?.baseAmount)}
          </div>
        </div>
        <div>
          <div className="ld-card-label">GST ({pricing?.gstApplicable ? `${pricing?.gstPercentage ?? 0}%` : 'not applicable'})</div>
          <div className="ld-card-value" style={{ fontSize: 16 }}>
            {formatMoney(pricing?.gstAmount)}
          </div>
        </div>
        <div>
          <div className="ld-card-label">Total</div>
          <div className="ld-card-value" style={{ fontSize: 18, fontWeight: 700 }}>
            {formatMoney(pricing?.total)}
          </div>
        </div>
      </div>
      <p className="ld-phase-note" style={{ marginTop: 10 }}>
        Fixed at order creation — later changes to the service's price never affect this order.
      </p>
    </div>
  );
}
