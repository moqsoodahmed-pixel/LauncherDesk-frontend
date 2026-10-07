import { useState } from 'react';
import PageHeader from '../../../components/portal/PageHeader';
import Toast from '../../../components/portal/Toast';
import { useAuth } from '../../../context/PortalAuthContext';

export default function ProfilePage() {
  const { user, changePassword } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  async function handleChangePassword(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setToast({ type: 'error', message: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 8) {
      setToast({ type: 'error', message: 'New password must be at least 8 characters.' });
      return;
    }
    setLoading(true);
    try {
      await changePassword(oldPassword, newPassword);
      setToast({ type: 'success', message: 'Password updated successfully.' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Failed to update password.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHeader title="My Profile" subtitle="View your account information and update your password." />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 900 }}>
        {/* Account info */}
        <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 'var(--ld-radius)', padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700 }}>Account Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Admin ID', value: user?.adminCode || '—', mono: true },
              { label: 'Full Name', value: user?.name || '—' },
              { label: 'Email Address', value: user?.email || '—' },
              { label: 'Phone', value: user?.phone || '—' },
              { label: 'Department', value: user?.department || '—' },
              { label: 'Role', value: user?.role?.replace(/_/g, ' ') || '—' },
              { label: 'Account Status', value: user?.status || '—' },
            ].map(({ label, value, mono }) => (
              <div key={label}>
                <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, fontFamily: mono ? 'monospace' : undefined, color: mono ? 'var(--ld-primary)' : undefined }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Change password */}
        <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 'var(--ld-radius)', padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700 }}>Change Password</h3>
          <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Current Password</label>
              <input
                type="password"
                className="ld-form-input"
                style={{ width: '100%' }}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>New Password</label>
              <input
                type="password"
                className="ld-form-input"
                style={{ width: '100%' }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Confirm New Password</label>
              <input
                type="password"
                className="ld-form-input"
                style={{ width: '100%' }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <button type="submit" className="ld-btn-primary" disabled={loading} style={{ marginTop: 4 }}>
              {loading ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
