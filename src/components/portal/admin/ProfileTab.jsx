import { useState } from 'react';
import StatusBadge from '../StatusBadge';
import ConfirmModal from '../ConfirmModal';
import { updateAdmin, resetAdminPassword } from '../../../services/portal/adminsApi';

export default function ProfileTab({ admin, onChanged, onToast }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: admin.name, phone: admin.phone || '', department: admin.department || '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [resetPassword, setResetPassword] = useState('');

  async function saveProfile(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateAdmin(admin.id, { name: form.name, phone: form.phone || null, department: form.department || null });
      onToast({ type: 'success', message: 'Profile updated.' });
      setEditing(false);
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not update profile.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function doReset() {
    setIsSubmitting(true);
    try {
      await resetAdminPassword(admin.id, { mode: 'SET_PASSWORD', newPassword: resetPassword });
      onToast({ type: 'success', message: 'Password reset. All of this admin\'s sessions were revoked.' });
      setResetOpen(false);
      setResetPassword('');
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not reset password.' });
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
              {admin.adminCode && (
                <Field
                  label="Admin ID"
                  value={
                    <span style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 700, color: 'var(--ld-primary)', letterSpacing: '0.05em' }}>
                      {admin.adminCode}
                    </span>
                  }
                />
              )}
              <Field label="Name" value={admin.name} />
              <Field label="Email" value={admin.email} />
              <Field label="Phone" value={admin.phone || '—'} />
              <Field label="Department" value={admin.department || '—'} />
              <Field label="Role" value={admin.role} />
              <Field label="Status" value={<StatusBadge status={admin.status} />} />
              <Field label="Last Login" value={admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'Never'} />
              <Field label="Created" value={new Date(admin.createdAt).toLocaleString()} />
              <Field label="Updated" value={new Date(admin.updatedAt).toLocaleString()} />
            </div>
            <button className="ld-btn-secondary" style={{ marginTop: 16 }} onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={saveProfile}>
            <div className="ld-form-group">
              <label className="ld-form-label">Name</label>
              <input className="ld-form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="ld-form-group">
              <label className="ld-form-label">Phone</label>
              <input className="ld-form-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="ld-form-group">
              <label className="ld-form-label">Department</label>
              <input className="ld-form-input" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
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

      <div className="ld-panel">
        <div className="ld-permission-group-title">Security</div>
        <button className="ld-btn-secondary" onClick={() => setResetOpen(true)}>
          Force Password Reset
        </button>
      </div>

      <ConfirmModal
        open={resetOpen}
        title="Set a new password for this admin?"
        message={
          <div>
            <p style={{ marginTop: 0 }}>All of this admin&apos;s active sessions will be revoked. They will need to sign in again with the new password.</p>
            <input
              type="password"
              className="ld-form-input"
              placeholder="New password (min 8 chars, letter + number)"
              value={resetPassword}
              onChange={(e) => setResetPassword(e.target.value)}
              minLength={8}
            />
          </div>
        }
        confirmLabel="Reset Password"
        danger
        isSubmitting={isSubmitting}
        onConfirm={doReset}
        onCancel={() => {
          setResetOpen(false);
          setResetPassword('');
        }}
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
