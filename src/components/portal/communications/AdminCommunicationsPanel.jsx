import { useCallback, useEffect, useState } from 'react';
import CommunicationChannelBadge from './CommunicationChannelBadge';
import CommunicationStatusBadge from './CommunicationStatusBadge';
import { formatCommunicationEvent } from '../../../constants/portal/communicationStatus';
import { getOrderCommunications } from '../../../services/portal/communicationsApi';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';

/**
 * Internal communications visibility panel embedded as a tab in
 * components/order/OrderDetailView.jsx, mirroring how AdminKycPanel.jsx /
 * AdminPaymentPanel.jsx are embedded. Read-only - no create/edit/delete
 * actions, just the delivery log for this order (Phase 9 spec: visibility
 * only, not a campaign/reporting platform).
 */
export default function AdminCommunicationsPanel({ order }) {
  const { hasPermission } = useAuth();
  const canView = hasPermission(PERMISSIONS.VIEW_NOTIFICATIONS);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getOrderCommunications(order.id, { page: 1, limit: 100 });
      setItems(data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load communications for this order.');
    } finally {
      setLoading(false);
    }
  }, [order.id]);

  useEffect(() => {
    if (canView) load();
  }, [canView, load]);

  if (!canView) {
    return (
      <div className="ld-panel">
        <p style={{ margin: 0 }}>You do not have permission to view communications for this order.</p>
      </div>
    );
  }

  return (
    <div className="ld-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="ld-permission-group-title">Communications</div>
        <button className="ld-btn-secondary ld-btn-sm" onClick={load} disabled={loading}>
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      {error && (
        <p className="ld-phase-note" style={{ color: 'var(--ld-danger)' }}>
          {error}
        </p>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="ld-phase-note" style={{ margin: 0 }}>No communications have been sent for this order yet.</p>
      )}

      {items.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table className="ld-table">
            <thead>
              <tr>
                <th>Channel</th>
                <th>Event</th>
                <th>Recipient</th>
                <th>Provider</th>
                <th>Status</th>
                <th>Attempts</th>
                <th>Sent</th>
                <th>Failure Reason</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td><CommunicationChannelBadge channel={item.channel} /></td>
                  <td>{formatCommunicationEvent(item.eventType)}</td>
                  <td>{item.recipient}</td>
                  <td>{item.provider}</td>
                  <td><CommunicationStatusBadge status={item.status} /></td>
                  <td>{item.attemptCount ?? 0}</td>
                  <td>{item.sentAt ? new Date(item.sentAt).toLocaleString('en-IN') : '—'}</td>
                  <td style={{ color: item.failureReason ? 'var(--ld-danger)' : undefined }}>
                    {item.failureReason || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
