import { useCallback, useEffect, useState } from 'react';
import LoadingState from '../LoadingState';
import EmptyState from '../EmptyState';
import ConfirmModal from '../ConfirmModal';
import { assignOrder, reassignOrder, unassignOrder, getOrderAssignmentHistory } from '../../../services/portal/ordersApi';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';

export default function OrderAssignmentPanel({ order, onChanged, onToast }) {
  const { hasPermission } = useAuth();
  const canAssign = hasPermission(PERMISSIONS.ASSIGN_ORDER);
  const canReassign = hasPermission(PERMISSIONS.REASSIGN_ORDER);

  const [adminId, setAdminId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unassignOpen, setUnassignOpen] = useState(false);

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getOrderAssignmentHistory(order.id);
      setHistory(result.items);
    } finally {
      setLoading(false);
    }
  }, [order.id]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  async function handleAssign(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const fn = order.assignedAdmin?.id ? reassignOrder : assignOrder;
      await fn(order.id, adminId.trim());
      setAdminId('');
      onToast({ type: 'success', message: 'Assignment updated.' });
      onChanged();
      loadHistory();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not update assignment.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function confirmUnassign() {
    setIsSubmitting(true);
    try {
      await unassignOrder(order.id);
      onToast({ type: 'success', message: 'Order unassigned.' });
      setUnassignOpen(false);
      onChanged();
      loadHistory();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not unassign.' });
      setUnassignOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="ld-panel" style={{ marginBottom: 16 }}>
        <div className="ld-card-grid" style={{ marginBottom: 16 }}>
          <div>
            <div className="ld-card-label">Assigned Admin</div>
            <div className="ld-card-value" style={{ fontSize: 14 }}>
              {order.assignedAdmin
                ? (
                  <span>
                    {order.assignedAdmin.name}
                    {order.assignedAdmin.adminCode && (
                      <span style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginLeft: 6, fontFamily: 'monospace' }}>
                        {order.assignedAdmin.adminCode}
                      </span>
                    )}
                  </span>
                )
                : <span style={{ color: '#d97706' }}>Unassigned</span>
              }
            </div>
          </div>
          <div>
            <div className="ld-card-label">Assigned Since</div>
            <div className="ld-card-value" style={{ fontSize: 14 }}>
              {order.assignedAt ? new Date(order.assignedAt).toLocaleString() : '—'}
            </div>
          </div>
        </div>

        {(canAssign || canReassign) && (
          <form onSubmit={handleAssign} style={{ display: 'flex', gap: 8 }}>
            <input
              className="ld-form-input"
              placeholder="Admin ID"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              style={{ width: 280 }}
              required
            />
            <button type="submit" className="ld-btn-primary" disabled={isSubmitting}>
              {order.assignedAdmin?.id ? 'Reassign' : 'Assign'}
            </button>
            {order.assignedAdmin?.id && (
              <button type="button" className="ld-btn-danger" onClick={() => setUnassignOpen(true)} disabled={isSubmitting}>
                Unassign
              </button>
            )}
          </form>
        )}
      </div>

      <div className="ld-permission-group-title">Assignment History</div>
      {loading && <LoadingState />}
      {!loading && history.length === 0 && <EmptyState message="No assignment changes recorded yet." />}
      {!loading && history.length > 0 && (
        <div className="ld-table-wrap">
          <table className="ld-table">
            <thead>
              <tr>
                <th>When</th>
                <th>Action</th>
                <th>Previous Admin</th>
                <th>New Admin</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h._id}>
                  <td style={{ whiteSpace: 'nowrap' }}>{new Date(h.createdAt).toLocaleString()}</td>
                  <td>{h.action}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{h.previousAdmin || '—'}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{h.newAdmin || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        open={unassignOpen}
        title="Unassign this order?"
        message="The order will have no responsible Admin until reassigned."
        confirmLabel="Unassign"
        danger
        isSubmitting={isSubmitting}
        onConfirm={confirmUnassign}
        onCancel={() => setUnassignOpen(false)}
      />
    </div>
  );
}
