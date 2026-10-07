import { useCallback, useEffect, useState } from 'react';
import ConfirmModal from '../ConfirmModal';
import LoadingState from '../LoadingState';
import EmptyState from '../EmptyState';
import { getAdminSessions, revokeAdminSessions } from '../../../services/portal/adminsApi';

export default function SessionsTab({ admin, onToast }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setSessions(await getAdminSessions(admin.id));
    } finally {
      setLoading(false);
    }
  }, [admin.id]);

  useEffect(() => {
    load();
  }, [load]);

  async function revokeAll() {
    setIsSubmitting(true);
    try {
      await revokeAdminSessions(admin.id);
      onToast({ type: 'success', message: 'All sessions revoked.' });
      setConfirmOpen(false);
      load();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not revoke sessions.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      {loading && <LoadingState />}
      {!loading && sessions.length === 0 && <EmptyState message="No active sessions." />}

      {!loading && sessions.length > 0 && (
        <div className="ld-table-wrap" style={{ marginBottom: 16 }}>
          <table className="ld-table">
            <thead>
              <tr>
                <th>IP Address</th>
                <th>User Agent</th>
                <th>Issued</th>
                <th>Expires</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.sessionId}>
                  <td>{s.ipAddress || '—'}</td>
                  <td style={{ maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.userAgent || '—'}</td>
                  <td>{new Date(s.issuedAt).toLocaleString()}</td>
                  <td>{new Date(s.expiresAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {sessions.length > 0 && (
        <button className="ld-btn-danger" onClick={() => setConfirmOpen(true)}>
          Revoke All Sessions
        </button>
      )}

      <ConfirmModal
        open={confirmOpen}
        title="Revoke all sessions?"
        message={`${admin.name} will be signed out everywhere immediately and must log in again.`}
        confirmLabel="Revoke All"
        danger
        isSubmitting={isSubmitting}
        onConfirm={revokeAll}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
