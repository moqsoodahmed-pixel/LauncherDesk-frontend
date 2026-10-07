import { useState } from 'react';
import ConfirmModal from '../ConfirmModal';
import { updateOrderStatus, cancelOrder, closeOrder, updateOrderPriority } from '../../../services/portal/ordersApi';
import { ORDER_STATUS_TRANSITIONS, formatOrderStatus } from '../../../constants/portal/orderStatus';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';

const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'URGENT'];

export default function OrderActionsPanel({ order, onChanged, onToast }) {
  const { hasPermission } = useAuth();
  const canUpdateStatus = hasPermission(PERMISSIONS.UPDATE_ORDER_STATUS);
  const canCancel = hasPermission(PERMISSIONS.CANCEL_ORDER);
  const canClose = hasPermission(PERMISSIONS.CLOSE_ORDER);

  const [statusTarget, setStatusTarget] = useState(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priority, setPriority] = useState(order.priority || 'MEDIUM');
  const [prioritySaving, setPrioritySaving] = useState(false);

  const nextStatuses = (ORDER_STATUS_TRANSITIONS[order.status] || []).filter((s) => s !== 'CANCELLED');
  const canCancelNow = canCancel && (ORDER_STATUS_TRANSITIONS[order.status] || []).includes('CANCELLED');
  const canCloseNow = canClose && order.status === 'KYC_DELETION_PENDING';

  async function confirmStatusChange() {
    setIsSubmitting(true);
    try {
      await updateOrderStatus(order.id, statusTarget);
      onToast({ type: 'success', message: `Status changed to ${statusTarget}.` });
      setStatusTarget(null);
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not change status.' });
      setStatusTarget(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function confirmCancel() {
    setIsSubmitting(true);
    try {
      await cancelOrder(order.id, cancelReason);
      onToast({ type: 'success', message: 'Order cancelled.' });
      setCancelOpen(false);
      setCancelReason('');
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not cancel order.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleClose() {
    setIsSubmitting(true);
    try {
      await closeOrder(order.id);
      onToast({ type: 'success', message: 'Order closed.' });
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not close order.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function savePriority(p) {
    setPriority(p);
    setPrioritySaving(true);
    try {
      await updateOrderPriority(order.id || order._id, p);
      onToast({ type: 'success', message: `Priority set to ${p}.` });
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not update priority.' });
    } finally { setPrioritySaving(false); }
  }

  if (!canUpdateStatus && !canCancelNow && !canCloseNow) {
    return (
      <div className="ld-panel">
        <p style={{ margin: 0 }}>No actions available for this order with your current permissions.</p>
      </div>
    );
  }

  return (
    <div className="ld-panel">
      {canUpdateStatus && nextStatuses.length > 0 && (
        <>
          <div className="ld-permission-group-title">Change Status</div>
          <div className="ld-row-actions" style={{ marginBottom: 12 }}>
            {nextStatuses.map((s) => (
              <button key={s} className="ld-btn-secondary ld-btn-sm" onClick={() => setStatusTarget(s)}>
                Move to {formatOrderStatus(s)}
              </button>
            ))}
          </div>
        </>
      )}

      {canUpdateStatus && (
        <div style={{ marginBottom: 16 }}>
          <div className="ld-permission-group-title">Order Priority</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {PRIORITIES.map((p) => (
              <button
                key={p}
                className={priority === p ? 'ld-btn-primary ld-btn-sm' : 'ld-btn-secondary ld-btn-sm'}
                onClick={() => savePriority(p)}
                disabled={prioritySaving}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {canCloseNow && (
        <button className="ld-btn-primary" style={{ marginRight: 8 }} onClick={handleClose} disabled={isSubmitting}>
          Close Order
        </button>
      )}

      {canCancelNow && (
        <button className="ld-btn-danger" onClick={() => setCancelOpen(true)}>
          Cancel Order
        </button>
      )}

      <ConfirmModal
        open={!!statusTarget}
        title={`Move this order to ${formatOrderStatus(statusTarget)}?`}
        message="This records a status history entry and cannot be undone directly - only forward (or via cancellation, where still allowed)."
        confirmLabel="Confirm"
        isSubmitting={isSubmitting}
        onConfirm={confirmStatusChange}
        onCancel={() => setStatusTarget(null)}
      />

      <ConfirmModal
        open={cancelOpen}
        title="Cancel this order?"
        message={
          <div>
            <p style={{ marginTop: 0 }}>This is permanent. Please provide a reason.</p>
            <textarea
              className="ld-form-input"
              rows={3}
              placeholder="Cancellation reason (required)"
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
    </div>
  );
}
