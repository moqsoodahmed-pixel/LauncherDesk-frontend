import { useCallback, useEffect, useState } from 'react';
import ConfirmModal from '../ConfirmModal';
import { formatPaise } from '../../../utils/portal/money';
import { getOrderPayment, refundOrderPayment } from '../../../services/portal/paymentApi';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';

function Field({ label, value }) {
  if (value === null || value === undefined || value === '') return null;
  return (
    <div>
      <div className="ld-card-label">{label}</div>
      <div className="ld-card-value" style={{ fontSize: 15 }}>{value}</div>
    </div>
  );
}

/**
 * Internal payment section embedded as a tab in
 * components/order/OrderDetailView.jsx, mirroring AdminKycPanel.jsx.
 */
export default function AdminPaymentPanel({ order, onOrderChanged, onToast }) {
  const { hasPermission } = useAuth();
  const canView = hasPermission(PERMISSIONS.VIEW_PAYMENT) || hasPermission(PERMISSIONS.VIEW_PAYMENT_DETAILS);
  const canRefund = hasPermission(PERMISSIONS.REFUND_PAYMENT);

  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refundOpen, setRefundOpen] = useState(false);
  const [refundReason, setRefundReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getOrderPayment(order.id);
      setPaymentStatus(data.paymentStatus);
      setPayment(data.payment);
    } catch {
      setPaymentStatus(order.paymentStatus);
      setPayment(null);
    } finally {
      setLoading(false);
    }
  }, [order.id, order.paymentStatus]);

  useEffect(() => {
    if (canView) load();
    else setLoading(false);
  }, [canView, load]);

  async function confirmRefund() {
    setIsSubmitting(true);
    try {
      await refundOrderPayment(order.id, refundReason.trim() || undefined);
      onToast({ type: 'success', message: 'Payment refunded.' });
      setRefundOpen(false);
      setRefundReason('');
      load();
      onOrderChanged?.();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not refund this payment.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!canView) {
    return (
      <div className="ld-panel">
        <p style={{ margin: 0 }}>You do not have permission to view payment details for this order.</p>
      </div>
    );
  }

  if (loading) return null;

  if (!paymentStatus || paymentStatus === 'NOT_REQUIRED') {
    return (
      <div className="ld-panel">
        <p style={{ margin: 0 }}>Payment is not required for this order.</p>
      </div>
    );
  }

  const canRefundNow = canRefund && paymentStatus === 'PAID' && payment?.status === 'CONFIRMED';

  return (
    <div className="ld-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="ld-permission-group-title">Payment</div>
        {canRefundNow && (
          <button className="ld-btn-danger ld-btn-sm" onClick={() => setRefundOpen(true)}>
            Refund
          </button>
        )}
      </div>

      {!payment && <p style={{ marginTop: 0 }}>No payment attempt recorded yet.</p>}

      {payment && (
        <div className="ld-card-grid" style={{ marginTop: 8 }}>
          {payment.paymentCode && (
            <div style={{ gridColumn: '1 / -1', marginBottom: 4 }}>
              <div className="ld-card-label">Payment ID</div>
              <div style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 700, color: 'var(--ld-primary)', letterSpacing: '0.06em' }}>
                {payment.paymentCode}
              </div>
            </div>
          )}
          <Field label="Status" value={paymentStatus} />
          <Field label="Attempt Status" value={payment.status} />
          <Field label="Amount" value={formatPaise(payment.amountPaise)} />
          <Field label="Currency" value={payment.currency} />
          <Field label="Provider" value={payment.provider} />
          <Field label="Provider Order ID" value={payment.providerOrderId} />
          <Field label="Provider Payment ID" value={payment.providerPaymentId} />
          <Field label="Method" value={payment.method} />
          <Field label="Attempt #" value={payment.attemptNumber} />
          <Field label="Paid At" value={payment.paidAt ? new Date(payment.paidAt).toLocaleString('en-IN') : null} />
          <Field label="Failed At" value={payment.failedAt ? new Date(payment.failedAt).toLocaleString('en-IN') : null} />
          <Field label="Failure Reason" value={payment.failureReason} />
          <Field label="Refunded At" value={payment.refundedAt ? new Date(payment.refundedAt).toLocaleString('en-IN') : null} />
          <Field
            label="Refund Amount"
            value={payment.refundAmountPaise ? formatPaise(payment.refundAmountPaise) : null}
          />
        </div>
      )}

      <ConfirmModal
        open={refundOpen}
        title="Refund this payment?"
        message={
          <div>
            <p style={{ marginTop: 0 }}>This issues a full refund of the confirmed payment. Optionally, note why.</p>
            <textarea
              className="ld-form-input"
              rows={3}
              placeholder="Reason (optional)"
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
            />
          </div>
        }
        confirmLabel="Refund Payment"
        danger
        isSubmitting={isSubmitting}
        onConfirm={confirmRefund}
        onCancel={() => {
          setRefundOpen(false);
          setRefundReason('');
        }}
      />
    </div>
  );
}
