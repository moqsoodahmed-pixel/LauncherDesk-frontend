import { useCallback, useEffect, useState } from 'react';
import LoadingState from '../LoadingState';
import EmptyState from '../EmptyState';
import ConfirmModal from '../ConfirmModal';
import Pagination from '../Pagination';
import { assignClientToAdmin, reassignClientToAdmin, unassignClient, getClientAssignmentHistory } from '../../../services/portal/clientsApi';
import { getAdmins } from '../../../services/portal/adminsApi';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';

export default function ClientAssignmentTab({ client, onChanged, onToast }) {
  const { hasPermission } = useAuth();
  const canAssign = hasPermission(PERMISSIONS.ASSIGN_CLIENT);
  const canReassign = hasPermission(PERMISSIONS.REASSIGN_CLIENT);

  const [adminId, setAdminId] = useState('');
  const [admins, setAdmins] = useState([]);
  const [adminsLoading, setAdminsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unassignOpen, setUnassignOpen] = useState(false);

  // 100 is the backend's hard cap (validators/portal/admins.validators.js) -
  // fine for the picker today; a searchable picker is the follow-up once the
  // admin roster outgrows one page.
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const result = await getAdmins({ limit: 100, status: 'ACTIVE' });
        if (isMounted) setAdmins(result.items || []);
      } catch {
        if (isMounted) setAdmins([]);
      } finally {
        if (isMounted) setAdminsLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const currentAdminId = client.assignedAdmin?.id ? String(client.assignedAdmin.id) : null;
  const assignableAdmins = admins.filter((a) => String(a.id) !== currentAdminId);

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
            <div className="ld-card-value" style={{ fontSize: 14 }}>
              {client.assignedAdmin
                ? `${client.assignedAdmin.name}${client.assignedAdmin.adminCode ? ` (${client.assignedAdmin.adminCode})` : ''}`
                : 'Unassigned'}
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
            <select
              className="ld-form-input"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              style={{ width: 280 }}
              required
              disabled={adminsLoading}
            >
              <option value="" disabled>
                {adminsLoading ? 'Loading admins…' : 'Select an admin…'}
              </option>
              {assignableAdmins.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.adminCode || a.role})
                </option>
              ))}
            </select>
            <button type="submit" className="ld-btn-primary" disabled={isSubmitting || !adminId}>
              {client.assignedAdmin ? 'Reassign' : 'Assign'}
            </button>
            {client.assignedAdmin && (
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
