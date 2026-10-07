import { useCallback, useEffect, useState } from 'react';
import LoadingState from '../LoadingState';
import EmptyState from '../EmptyState';
import ConfirmModal from '../ConfirmModal';
import Pagination from '../Pagination';
import { getAdminClients, assignClient, unassignClient } from '../../../services/portal/adminsApi';

// The full Client Management module (search/browse clients) lands in
// Phase 3. Until then, assignment works by Client ID - the minimum needed
// to prepare the Admin <-> Client relationship now.
export default function ClientsTab({ admin, onChanged, onToast }) {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [clientId, setClientId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unassignTarget, setUnassignTarget] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getAdminClients(admin.id, { page, limit: 20 });
      setItems(result.items);
      setMeta(result.meta);
    } finally {
      setLoading(false);
    }
  }, [admin.id, page]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAssign(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await assignClient(admin.id, clientId.trim());
      setClientId('');
      onToast({ type: 'success', message: 'Client assigned.' });
      load();
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not assign client.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function confirmUnassign() {
    setIsSubmitting(true);
    try {
      await unassignClient(admin.id, unassignTarget.id);
      onToast({ type: 'success', message: 'Client unassigned.' });
      setUnassignTarget(null);
      load();
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not unassign client.' });
      setUnassignTarget(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (admin.role === 'SUPER_ADMIN') {
    return (
      <div className="ld-panel">
        <p style={{ margin: 0 }}>Super Admin already has access to every client - assignment is not applicable.</p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleAssign} className="ld-toolbar">
        <input
          className="ld-form-input"
          placeholder="Client ID to assign"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          style={{ width: 280 }}
          required
        />
        <button type="submit" className="ld-btn-primary" disabled={isSubmitting}>
          Assign Client
        </button>
      </form>
      <p className="ld-phase-note" style={{ marginTop: -8, marginBottom: 16 }}>
        A full client picker arrives with the Client Management module (Phase 3). Assigning a client already linked to another
        admin reassigns it here.
      </p>

      {loading && <LoadingState />}
      {!loading && items.length === 0 && <EmptyState message="No clients assigned to this admin yet." />}

      {!loading && items.length > 0 && (
        <div className="ld-table-wrap">
          <table className="ld-table">
            <thead>
              <tr>
                <th>Client Code</th>
                <th>Name</th>
                <th>Company</th>
                <th>Status</th>
                <th>Assigned</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((client) => (
                <tr key={client.id}>
                  <td>{client.clientCode}</td>
                  <td>{client.name}</td>
                  <td>{client.companyName || '—'}</td>
                  <td>{client.status}</td>
                  <td>{client.assignedAt ? new Date(client.assignedAt).toLocaleDateString() : '—'}</td>
                  <td>
                    <button className="ld-btn-danger ld-btn-sm" onClick={() => setUnassignTarget(client)}>
                      Unassign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination meta={meta} onPageChange={setPage} />
        </div>
      )}

      <ConfirmModal
        open={!!unassignTarget}
        title="Unassign this client?"
        message={`${unassignTarget?.name} will no longer be assigned to ${admin.name}.`}
        confirmLabel="Unassign"
        danger
        isSubmitting={isSubmitting}
        onConfirm={confirmUnassign}
        onCancel={() => setUnassignTarget(null)}
      />
    </div>
  );
}
