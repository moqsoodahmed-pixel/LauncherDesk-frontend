import { useState } from 'react';
import StatusBadge from '../StatusBadge';
import ConfirmModal from '../ConfirmModal';
import { updateClient, updateClientStatus, archiveClient } from '../../../services/portal/clientsApi';
import { CLIENT_STATUS_TRANSITIONS } from '../../../constants/portal/clientStatusTransitions';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';

const EDITABLE_FIELDS = [
  ['name', 'Name'],
  ['companyName', 'Company'],
  ['phone', 'Phone'],
  ['alternatePhone', 'Alternate Phone'],
  ['address', 'Address'],
  ['city', 'City'],
  ['state', 'State'],
  ['country', 'Country'],
  ['postalCode', 'Postal Code'],
  ['gstNumber', 'GST Number'],
  ['panNumber', 'PAN Number'],
  ['notes', 'Internal Notes'],
];

export default function ClientProfileTab({ client, onChanged, onToast }) {
  const { hasPermission } = useAuth();
  const canEdit = hasPermission(PERMISSIONS.EDIT_CLIENT);
  const canDelete = hasPermission(PERMISSIONS.DELETE_CLIENT);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(Object.fromEntries(EDITABLE_FIELDS.map(([key]) => [key, client[key] || ''])));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusTarget, setStatusTarget] = useState(null);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const nextStatuses = CLIENT_STATUS_TRANSITIONS[client.status] || [];

  async function saveProfile(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const changes = {};
      for (const [key] of EDITABLE_FIELDS) {
        if (form[key] !== (client[key] || '')) changes[key] = form[key] || null;
      }
      await updateClient(client.id, changes);
      onToast({ type: 'success', message: 'Client updated.' });
      setEditing(false);
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not update client.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function confirmStatusChange() {
    setIsSubmitting(true);
    try {
      await updateClientStatus(client.id, statusTarget);
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

  async function confirmArchive() {
    setIsSubmitting(true);
    try {
      await archiveClient(client.id);
      onToast({ type: 'success', message: 'Client archived.' });
      setArchiveOpen(false);
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not archive client.' });
      setArchiveOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="ld-panel" style={{ marginBottom: 16 }}>
        {!editing ? (
          <>
            <div className="ld-card-grid">
              <Field label="Client ID" value={<span style={{ fontFamily: 'monospace' }}>{client.clientCode}</span>} />
              <Field label="Email" value={client.email} />
              <Field label="Status" value={<StatusBadge status={client.status} />} />
              {EDITABLE_FIELDS.map(([key, label]) => (
                <Field key={key} label={label} value={client[key] || '—'} />
              ))}
              <Field label="Last Activity" value={client.lastActivityAt ? new Date(client.lastActivityAt).toLocaleString() : '—'} />
              <Field label="Created" value={new Date(client.createdAt).toLocaleString()} />
              <Field label="Updated" value={new Date(client.updatedAt).toLocaleString()} />
            </div>
            {canEdit && (
              <button className="ld-btn-secondary" style={{ marginTop: 16 }} onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            )}
          </>
        ) : (
          <form onSubmit={saveProfile}>
            {EDITABLE_FIELDS.map(([key, label]) => (
              <div className="ld-form-group" key={key}>
                <label className="ld-form-label">{label}</label>
                {key === 'notes' ? (
                  <textarea
                    className="ld-form-input"
                    rows={3}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                ) : (
                  <input className="ld-form-input" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                )}
              </div>
            ))}
            <div className="ld-row-actions">
              <button type="submit" className="ld-btn-primary" disabled={isSubmitting}>
                Save
              </button>
              <button type="button" className="ld-btn-secondary" onClick={() => setEditing(false)} disabled={isSubmitting}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {canEdit && nextStatuses.length > 0 && (
        <div className="ld-panel" style={{ marginBottom: 16 }}>
          <div className="ld-permission-group-title">Change Status</div>
          <div className="ld-row-actions">
            {nextStatuses.map((s) => (
              <button key={s} className="ld-btn-secondary ld-btn-sm" onClick={() => setStatusTarget(s)}>
                Move to {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {canDelete && client.status !== 'ARCHIVED' && (
        <div className="ld-panel">
          <div className="ld-permission-group-title">Danger Zone</div>
          <button className="ld-btn-danger" onClick={() => setArchiveOpen(true)}>
            Archive Client
          </button>
          <p className="ld-phase-note">Archiving is a soft delete - the record and its history are preserved.</p>
        </div>
      )}

      <ConfirmModal
        open={!!statusTarget}
        title={`Move this client to ${statusTarget}?`}
        message={
          statusTarget === 'SUSPENDED' || statusTarget === 'INACTIVE'
            ? 'The linked login account will be blocked from signing in immediately.'
            : statusTarget === 'ACTIVE'
            ? 'The linked login account will be able to sign in again.'
            : 'This changes the client status.'
        }
        confirmLabel="Confirm"
        danger={statusTarget === 'SUSPENDED' || statusTarget === 'INACTIVE'}
        isSubmitting={isSubmitting}
        onConfirm={confirmStatusChange}
        onCancel={() => setStatusTarget(null)}
      />

      <ConfirmModal
        open={archiveOpen}
        title="Archive this client?"
        message="The client's login account will be blocked and the record marked ARCHIVED. This does not delete any data and can be reviewed later."
        confirmLabel="Archive"
        danger
        isSubmitting={isSubmitting}
        onConfirm={confirmArchive}
        onCancel={() => setArchiveOpen(false)}
      />
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="ld-card-label">{label}</div>
      <div className="ld-card-value" style={{ fontSize: 14 }}>
        {value}
      </div>
    </div>
  );
}
