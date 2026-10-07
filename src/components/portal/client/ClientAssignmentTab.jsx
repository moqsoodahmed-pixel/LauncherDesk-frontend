import { useCallback, useEffect, useState } from 'react';
import LoadingState from '../LoadingState';
import EmptyState from '../EmptyState';
import ConfirmModal from '../ConfirmModal';
import Pagination from '../Pagination';
import { assignClientToAdmin, reassignClientToAdmin, unassignClient, getClientAssignmentHistory } from '../../../services/portal/clientsApi';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';

export default function ClientAssignmentTab({ client, onChanged, onToast }) {
  const { hasPermission } = useAuth();
  const canAssign = hasPermission(PERMISSIONS.ASSIGN_CLIENT);
  const canReassign = hasPermission(PERMISSIONS.REASSIGN_CLIENT);

  const [adminId, setAdminId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unassignOpen, setUnassignOpen] = useState(false);

  const [history, setHistory] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getClientAssignmentHistory(client.id, { page, limit: 10 });
      setHistory(result.items);
      setMeta(result.meta);
    } finally {
      setLoading(false);
    }
  }, [client.id, page]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  async function handleAssign(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const fn = client.assignedAdmin ? reassignClientToAdmin : assignClientToAdmin;
      await fn(client.id, adminId.trim());
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
      await unassignClient(client.id);
      onToast({ type: 'success', message: 'Client unassigned.' });
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
            <div className="ld-card-label">Currently Assigned Admin</div>
            <div className="ld-card-value" style={{ fontSize: 14, fontFamily: client.assignedAdmin ? 'monospace' : 'inherit' }}>
              {client.assignedAdmin || 'Unassigned'}
            </div>
          </div>
          <div>
            <div className="ld-card-label">Assigned Since</div>
            <div className="ld-card-value" style={{ fontSize: 14 }}>
              {client.assignedAt ? new Date(client.assignedAt).toLocaleString() : '—'}
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
              {client.assignedAdmin ? 'Reassign' : 'Assign'}
            </button>
            {client.assignedAdmin && (
              <button type="button" className="ld-btn-danger" onClick={() => setUnassignOpen(true)} disabled={isSubmitting}>
                Unassign
              </button>
            )}
          </form>
        )}
        <p className="ld-phase-note" style={{ marginTop: 8 }}>
          Full Admin picker arrives alongside the Admin Management UI integration - paste an Admin&apos;s id for now.
        </p>
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
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h._id}>
                  <td style={{ whiteSpace: 'nowrap' }}>{new Date(h.createdAt).toLocaleString()}</td>
                  <td>{h.action}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{h.previousAdmin || '—'}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{h.newAdmin || '—'}</td>
                  <td>{h.reason || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination meta={meta} onPageChange={setPage} />
        </div>
      )}

      <ConfirmModal
        open={unassignOpen}
        title="Unassign this client?"
        message="The client will have no responsible Admin until reassigned."
        confirmLabel="Unassign"
        danger
        isSubmitting={isSubmitting}
        onConfirm={confirmUnassign}
        onCancel={() => setUnassignOpen(false)}
      />
    </div>
  );
}
