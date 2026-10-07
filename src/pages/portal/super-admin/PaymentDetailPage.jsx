import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import { getPayment } from '../../../services/portal/paymentsAdminApi';

function Row({ label, value, mono, link, onClick }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      padding: '10px 0', borderBottom: '1px solid var(--ld-border)', gap: 16,
    }}>
      <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', minWidth: 180, flexShrink: 0 }}>{label}</div>
      <div style={{
        fontSize: 13, fontWeight: 600, textAlign: 'right',
        fontFamily: mono ? 'monospace' : undefined,
        color: link ? 'var(--ld-primary)' : 'var(--ld-text)',
        cursor: link || onClick ? 'pointer' : undefined,
        wordBreak: 'break-all',
      }} onClick={onClick}>
        {value ?? '—'}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 10, padding: '16px 20px', marginBottom: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: 'var(--ld-primary)' }}>{title}</div>
      {children}
    </div>
  );
}

const STATUS_COLORS = {
  CONFIRMED: { bg: '#dcfce7', color: '#15803d' },
  CREATED: { bg: '#fef9c3', color: '#a16207' },
  FAILED: { bg: '#fee2e2', color: '#b91c1c' },
  REFUNDED: { bg: '#ede9fe', color: '#6d28d9' },
};

function rupees(v) {
  if (v == null) return '—';
  return `₹${Number(v).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function PaymentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try { setPayment(await getPayment(id)); }
    catch (err) { setError(err.response?.data?.message || 'Could not load payment.'); }
    finally { setLoading(false); }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!payment) return null;

  const sc = STATUS_COLORS[payment.status] || { bg: '#f3f4f6', color: '#374151' };

  return (
    <div>
      <button className="ld-btn-secondary ld-btn-sm" style={{ marginBottom: 16 }} onClick={() => navigate('/super-admin/payments')}>
        ← Back to Payments
      </button>

      <PageHeader
        title={payment.paymentCode || 'Payment'}
        subtitle={
          <span style={{
            display: 'inline-block', padding: '3px 12px', borderRadius: 999,
            fontSize: 11, fontWeight: 700, background: sc.bg, color: sc.color,
          }}>
            {payment.status}
          </span>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Client & Order */}
        <Section title="Transaction Reference">
          <Row label="Payment Business ID" value={payment.paymentCode} mono />
          <Row label="Order Business ID" value={payment.orderCode} mono link
            onClick={() => payment.orderId && navigate(`/super-admin/orders/${payment.orderId}`)} />
          <Row label="Invoice Number" value={payment.invoiceNumber} mono link
            onClick={() => payment.orderId && navigate(`/super-admin/orders/${payment.orderId}/invoice`)} />
          <Row label="Client Code" value={payment.clientCode} mono link
            onClick={() => payment.clientId && navigate(`/super-admin/clients/${payment.clientId}`)} />
          <Row label="Client Name" value={payment.clientName} />
          <Row label="Client Email" value={payment.clientEmail} />
          <Row label="Service" value={payment.serviceName} />
          <Row label="Assigned Admin" value={payment.assignedAdminName ? `${payment.assignedAdminName} (${payment.assignedAdminCode})` : null} />
        </Section>

        {/* Financial Breakdown */}
        <Section title="Financial Breakdown">
          <Row label="Original Service Price" value={rupees(payment.originalPriceRupees)} />
          <Row label="Net Amount" value={rupees(payment.netAmountRupees)} />
          <Row label="GST Applicable" value={payment.gstApplicable ? 'Yes' : 'No'} />
          <Row label="GST Amount" value={payment.gstAmountRupees != null ? rupees(payment.gstAmountRupees) : null} />
          <Row label="Refunded Amount" value={payment.refundAmountRupees ? rupees(payment.refundAmountRupees) : '—'} />
          <Row label="Currency" value={payment.currency} />
          <Row label="Attempt Number" value={payment.attemptNumber} />
        </Section>

        {/* Payment Gateway */}
        <Section title="Payment Gateway">
          <Row label="Provider" value={payment.provider} />
          <Row label="Payment Method" value={payment.method?.toUpperCase() || '—'} />
          <Row label="Provider Order ID" value={payment.providerOrderId} mono />
          <Row label="Provider Payment ID" value={payment.providerPaymentId} mono />
          <Row label="Signature Verified" value={payment.signatureVerified ? '✓ Yes' : '✗ No'} />
          <Row label="Captured" value={payment.captured ? 'Yes' : 'No'} />
        </Section>

        {/* Timeline */}
        <Section title="Status Timeline">
          <Row label="Order Status" value={payment.orderStatus} />
          <Row label="Payment Status" value={payment.status} />
          <Row label="Paid At" value={payment.paidAt ? new Date(payment.paidAt).toLocaleString() : '—'} />
          <Row label="Failed At" value={payment.failedAt ? new Date(payment.failedAt).toLocaleString() : '—'} />
          <Row label="Failure Reason" value={payment.failureReason} />
          <Row label="Refunded At" value={payment.refundedAt ? new Date(payment.refundedAt).toLocaleString() : '—'} />
          <Row label="Created At" value={new Date(payment.createdAt).toLocaleString()} />
          <Row label="Updated At" value={new Date(payment.updatedAt).toLocaleString()} />
        </Section>
      </div>

      {/* Quick links */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
        {payment.orderId && (
          <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`/super-admin/orders/${payment.orderId}`)}>
            View Order
          </button>
        )}
        {payment.clientId && (
          <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`/super-admin/clients/${payment.clientId}`)}>
            View Client
          </button>
        )}
        {payment.orderId && payment.invoiceNumber && (
          <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`/super-admin/orders/${payment.orderId}/invoice`)}>
            View Invoice
          </button>
        )}
        <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`/super-admin/audit-logs?resourceId=${id}`)}>
          View Audit Trail
        </button>
      </div>
    </div>
  );
}
