import { useCallback, useEffect, useState } from 'react';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import StatusBadge from '../../../components/portal/StatusBadge';
import Toast from '../../../components/portal/Toast';
import { useAuth } from '../../../context/PortalAuthContext';
import { getOwnClientProfile, updateOwnClientProfile } from '../../../services/portal/clientsApi';

const EDITABLE_FIELDS = [
  ['name', 'Name'],
  ['companyName', 'Company'],
  ['phone', 'Phone'],
  ['alternatePhone', 'Alternate Phone'],
  ['address', 'Address'],
  ['city', 'City'],
  ['state', 'State'],
  ['postalCode', 'Postal Code'],
  ['gstNumber', 'GST Number'],
  ['panNumber', 'PAN Number'],
];

export default function ClientProfilePage() {
  const { changePassword } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [pwSubmitting, setPwSubmitting] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getOwnClientProfile();
      setProfile(data);
      setForm(Object.fromEntries(EDITABLE_FIELDS.map(([key]) => [key, data[key] || ''])));
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load your profile.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const changes = {};
      for (const [key] of EDITABLE_FIELDS) {
        if (form[key] !== (profile[key] || '')) changes[key] = form[key] || null;
      }
      await updateOwnClientProfile(changes);
      setToast({ type: 'success', message: 'Profile updated.' });
      setEditing(false);
      load();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not update profile.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <PageHeader title="My Profile" subtitle="Your account and company information." />

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}

      {!loading && !error && profile && (
        <div className="ld-panel">
          {!editing ? (
            <>
              <div className="ld-card-grid">
                <Field label="Client ID" value={<span style={{ fontFamily: 'monospace' }}>{profile.clientCode}</span>} />
                <Field label="Email" value={profile.email} />
                <Field label="Status" value={<StatusBadge status={profile.status} />} />
                {EDITABLE_FIELDS.map(([key, label]) => (
                  <Field key={key} label={label} value={profile[key] || '—'} />
                ))}
              </div>
              <button className="ld-btn-secondary" style={{ marginTop: 16 }} onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSave}>
              {EDITABLE_FIELDS.map(([key, label]) => (
                <div className="ld-form-group" key={key}>
                  <label className="ld-form-label">{label}</label>
                  <input
                    className="ld-form-input"
                    value={form[key] || ''}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
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
      )}

      {/* Change Password */}
      <div className="ld-panel" style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: showPw ? 16 : 0 }}>
          <div className="ld-permission-group-title" style={{ margin: 0 }}>Change Password</div>
          <button className="ld-btn-secondary ld-btn-sm" onClick={() => setShowPw((v) => !v)}>
            {showPw ? 'Cancel' : 'Change'}
          </button>
        </div>
        {showPw && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (pwForm.next !== pwForm.confirm) {
                setToast({ type: 'error', message: 'New passwords do not match.' });
                return;
              }
              if (pwForm.next.length < 8) {
                setToast({ type: 'error', message: 'Password must be at least 8 characters.' });
                return;
              }
              setPwSubmitting(true);
              try {
                await changePassword(pwForm.current, pwForm.next);
                setToast({ type: 'success', message: 'Password changed successfully.' });
                setPwForm({ current: '', next: '', confirm: '' });
                setShowPw(false);
              } catch (err) {
                setToast({ type: 'error', message: err.response?.data?.message || 'Could not change password.' });
              } finally {
                setPwSubmitting(false);
              }
            }}
          >
            {[
              { key: 'current', label: 'Current Password' },
              { key: 'next',    label: 'New Password' },
              { key: 'confirm', label: 'Confirm New Password' },
            ].map(({ key, label }) => (
              <div className="ld-form-group" key={key}>
                <label className="ld-form-label">{label}</label>
                <input
                  className="ld-form-input"
                  type="password"
                  value={pwForm[key]}
                  onChange={(e) => setPwForm((f) => ({ ...f, [key]: e.target.value }))}
                  required
                />
              </div>
            ))}
            <div className="ld-row-actions">
              <button type="submit" className="ld-btn-primary" disabled={pwSubmitting}>
                {pwSubmitting ? 'Updating…' : 'Update Password'}
              </button>
            </div>
          </form>
        )}
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
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
