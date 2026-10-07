import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import ConfirmModal from '../../../components/portal/ConfirmModal';
import Toast from '../../../components/portal/Toast';
import OrderStatusBadge from '../../../components/portal/order/OrderStatusBadge';
import OrderServiceCard from '../../../components/portal/order/OrderServiceCard';
import OrderPricingCard from '../../../components/portal/order/OrderPricingCard';
import OrderTrackingTimeline from '../../../components/portal/order/OrderTrackingTimeline';
import ClientKycPanel from '../../../components/portal/kyc/ClientKycPanel';
import ClientPaymentPanel from '../../../components/portal/payment/ClientPaymentPanel';
import ClientNotificationsPanel from '../../../components/portal/communications/ClientNotificationsPanel';
import ClientDocRequestsBanner from '../../../components/portal/order/ClientDocRequestsBanner';
import { getOwnOrder, cancelOwnOrder } from '../../../services/portal/clientOrdersApi';
import { CLIENT_CANCELLABLE_STATUSES, TERMINAL_ORDER_STATUSES } from '../../../constants/portal/orderStatus';

// Keep active order tracking reasonably fresh without hammering the API -
// only while the tab is visible and the order isn't already terminal.
const POLL_INTERVAL_MS = 45000;

export default function ClientOrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const orderRef = useRef(null);

  const load = useCallback(
    async (silent = false) => {
      if (!silent) setLoading(true);
      setError('');
      try {
        const data = await getOwnOrder(id);
        setOrder(data);
        orderRef.current = data;
      } catch (err) {
        if (!silent) setError(err.response?.data?.message || 'Could not load this order.');
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    load();
  }, [load]);

  // Auto-refresh while the order is still in flight and the tab is visible.
  useEffect(() => {
    const interval = setInterval(() => {
      const current = orderRef.current;
      if (!current || TERMINAL_ORDER_STATUSES.includes(current.status)) return;
      if (document.visibilityState !== 'visible') return;
      load(true);
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [load]);

  async function confirmCancel() {
    setIsSubmitting(true);
    try {
      await cancelOwnOrder(id, cancelReason);
      setToast({ type: 'success', message: 'Order cancelled.' });
      setCancelOpen(false);
      setCancelReason('');
      load();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not cancel order.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!order) return null;

  const canCancel = CLIENT_CANCELLABLE_STATUSES.includes(order.status);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate('/client/orders')}>
          ← Back to My Orders
        </button>
        <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`/client/orders/${order.id}/invoice`)}>
          🧾 View / Print Invoice
        </button>
        <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`/client/support?orderId=${encodeURIComponent(order.orderCode || order.id)}`)}>
          💬 Contact Support
        </button>
        <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`/client/orders/create/${order.serviceSnapshot?.id || order.service || ''}`)}>
          ↻ Reorder
        </button>
      </div>

      <PageHeader
        title={order.orderCode}
        subtitle={
          <>
            <OrderStatusBadge status={order.status} /> · <OrderStatusBadge status={order.paymentStatus} />
          </>
        }
      />

      <div style={{ display: 'grid', gap: 16 }}>
        <OrderServiceCard serviceSnapshot={order.serviceSnapshot} orderDetails={order.orderDetails} />
        <OrderPricingCard pricing={order.pricing} />

        <div>
          <div className="ld-permission-group-title">Order Tracking</div>
          <OrderTrackingTimeline orderId={order.id} currentStatus={order.status} />
        </div>

        <ClientDocRequestsBanner orderId={order.id || order._id} />

        <ClientPaymentPanel order={order} onOrderChanged={() => load(true)} onToast={setToast} />

        <ClientKycPanel order={order} onOrderChanged={() => load(true)} onToast={setToast} />

        <ClientNotificationsPanel order={order} />

        {canCancel && (
          <div className="ld-panel">
            <button className="ld-btn-danger" onClick={() => setCancelOpen(true)}>
              Cancel Order
            </button>
            <p className="ld-phase-note" style={{ marginTop: 8 }}>
              You can cancel this order until it's assigned to our team. After that, please contact support.
            </p>
          </div>
        )}
      </div>

      <ConfirmModal
        open={cancelOpen}
        title="Cancel this order?"
        message={
          <div>
            <p style={{ marginTop: 0 }}>This is permanent. Please tell us why.</p>
            <textarea
              className="ld-form-input"
              rows={3}
              placeholder="Reason (required)"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
          </div>
        }
        confirmLabel="Cancel Order"
        danger
        isSubmitting={isSubmitting}
        onConfirm={confirmCancel}
        onCancel={() => {
          setCancelOpen(false);
          setCancelReason('');
        }}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
