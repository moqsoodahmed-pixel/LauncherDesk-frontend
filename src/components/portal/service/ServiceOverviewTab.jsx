import { useState } from 'react';
import StatusBadge from '../StatusBadge';
import ConfirmModal from '../ConfirmModal';
import { updateService, updateServiceStatus, archiveService } from '../../../services/portal/servicesApi';
import { ALL_SERVICE_CATEGORIES } from '../../../constants/portal/serviceCategory';
import { SERVICE_STATUS_TRANSITIONS } from '../../../constants/portal/serviceStatus';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';

export default function ServiceOverviewTab({ service, onChanged, onToast }) {
  const { hasPermission } = useAuth();
  const canEdit = hasPermission(PERMISSIONS.EDIT_SERVICE);
  const canDelete = hasPermission(PERMISSIONS.DELETE_SERVICE);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: service.name,
    shortDescription: service.shortDescription || '',
    description: service.description || '',
    category: service.category,
    isPublic: service.isPublic,
    requiresKyc: service.requiresKyc,
    requiresClientDetails: service.requiresClientDetails,
    slaDays: service.slaDays ?? '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusTarget, setStatusTarget] = useState(null);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const nextStatuses = SERVICE_STATUS_TRANSITIONS[service.status] || [];

  async function saveOverview(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateService(service.id, form);
      onToast({ type: 'success', message: 'Service updated.' });
      setEditing(false);
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not update service.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function confirmStatusChange() {
    setIsSubmitting(true);
    try {
      await updateServiceStatus(service.id, statusTarget);
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
      await archiveService(service.id);
      onToast({ type: 'success', message: 'Service archived.' });
      setArchiveOpen(false);
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not archive service.' });
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
              <Field label="Service Code" value={<span style={{ fontFamily: 'monospace' }}>{service.serviceCode}</span>} />
              <Field label="Slug" value={<span style={{ fontFamily: 'monospace' }}>{service.slug}</span>} />
              <Field label="Category" value={service.category} />
              <Field label="Status" value={<StatusBadge status={service.status} />} />
              <Field label="Visibility" value={service.isPublic ? 'Public' : 'Private'} />
              <Field label="Requires KYC" value={service.requiresKyc ? 'Yes' : 'No'} />
              <Field label="Requires Client Details" value={service.requiresClientDetails ? 'Yes' : 'No'} />
              <Field label="SLA (days)" value={service.slaDays ? `${service.slaDays} days` : '—'} />
              <Field label="Created" value={new Date(service.createdAt).toLocaleString()} />
              <Field label="Updated" value={new Date(service.updatedAt).toLocaleString()} />
            </div>
            <div className="ld-form-group" style={{ marginTop: 16 }}>
              <div className="ld-card-label">Short Description</div>
              <div className="ld-card-value" style={{ fontSize: 14 }}>
                {service.shortDescription || '—'}
              </div>
            </div>
            <div className="ld-form-group">
              <div className="ld-card-label">Description</div>
              <div className="ld-card-value" style={{ fontSize: 14, whiteSpace: 'pre-wrap' }}>
                {service.description || '—'}
              </div>
            </div>
            {canEdit && (
              <button className="ld-btn-secondary" onClick={() => setEditing(true)}>
                Edit Overview
              </button>
            )}
          </>
        ) : (
          <form onSubmit={saveOverview}>
            <div className="ld-form-group">
              <label className="ld-form-label">Name</label>
              <input className="ld-form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="ld-form-group">
              <label className="ld-form-label">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {ALL_SERVICE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="ld-form-group">
              <label className="ld-form-label">Short Description</label>
              <input
                className="ld-form-input"
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              />
            </div>
            <div className="ld-form-group">
              <label className="ld-form-label">Description</label>
              <textarea
                className="ld-form-input"
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="ld-form-group">
              <label className="ld-form-label">
                <input
                  type="checkbox"
                  checked={form.isPublic}
                  onChange={(e) => setForm({ ...form, isPublic: e.target.checked })}
                  style={{ marginRight: 6 }}
                />
                Public (visible in the Client Portal catalogue)
              </label>
            </div>
            <div className="ld-form-group">
              <label className="ld-form-label">
                <input
                  type="checkbox"
                  checked={form.requiresKyc}
                  onChange={(e) => setForm({ ...form, requiresKyc: e.target.checked })}
                  style={{ marginRight: 6 }}
                />
                Requires KYC
              </label>
            </div>
            <div className="ld-form-group">
              <label className="ld-form-label">
                <input
                  type="checkbox"
                  checked={form.requiresClientDetails}
                  onChange={(e) => setForm({ ...form, requiresClientDetails: e.target.checked })}
                  style={{ marginRight: 6 }}
                />
                Requires Client Details
              </label>
            </div>
            <div className="ld-form-group">
              <label className="ld-form-label">SLA (days) — 0 or blank = no SLA</label>
              <input
                type="number"
                className="ld-form-input"
                value={form.slaDays}
                min={1}
                max={365}
                placeholder="e.g. 7"
                onChange={(e) => setForm({ ...form, slaDays: e.target.value === '' ? '' : parseInt(e.target.value, 10) || '' })}
              />
            </div>
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

      {canDelete && service.status !== 'ARCHIVED' && (
        <div className="ld-panel">
          <div className="ld-permission-group-title">Danger Zone</div>
          <button className="ld-btn-danger" onClick={() => setArchiveOpen(true)}>
            Archive Service
          </button>
          <p className="ld-phase-note">
            Archiving is terminal - an archived service can never be reactivated. It stops appearing in active selection
            immediately, but historical references are preserved.
          </p>
        </div>
      )}

      <ConfirmModal
        open={!!statusTarget}
        title={`Move this service to ${statusTarget}?`}
        message={
          statusTarget === 'ARCHIVED'
            ? 'This is permanent - the service can never be reactivated afterward.'
            : 'The service will stop appearing in active selection until reactivated.'
        }
        confirmLabel="Confirm"
        danger={statusTarget === 'ARCHIVED'}
        isSubmitting={isSubmitting}
        onConfirm={confirmStatusChange}
        onCancel={() => setStatusTarget(null)}
      />

      <ConfirmModal
        open={archiveOpen}
        title="Archive this service?"
        message="This is permanent - the service can never be reactivated afterward, and it immediately stops appearing in normal selection. Historical references are preserved."
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
