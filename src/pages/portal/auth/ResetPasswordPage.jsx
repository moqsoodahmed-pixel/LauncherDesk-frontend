import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPasswordRequest } from '../../../services/portal/authApi';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPasswordRequest(token, newPassword);
      setDone(true);
      setTimeout(() => navigate('/user/login', { replace: true }), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not reset password. The link may have expired.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="ld-login-wrapper">
      <div className="ld-login-card">
        <div className="ld-login-brand">LauncherDesk</div>
        <div className="ld-login-subtitle">Reset password</div>

        {!token && <div className="ld-form-error">This reset link is missing its token.</div>}
        {error && <div className="ld-form-error">{error}</div>}

        {done ? (
          <div className="ld-panel">
            <p style={{ margin: 0 }}>Password reset. Redirecting to login…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="ld-form-group">
              <label className="ld-form-label" htmlFor="newPassword">
                New password
              </label>
              <input
                id="newPassword"
                type="password"
                className="ld-form-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="ld-form-group">
              <label className="ld-form-label" htmlFor="confirmPassword">
                Confirm new password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="ld-form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <button type="submit" className="ld-btn-primary" disabled={isSubmitting || !token}>
              {isSubmitting ? 'Resetting…' : 'Reset password'}
            </button>
          </form>
        )}
        <Link to="/user/login" style={{ display: 'inline-block', marginTop: 16 }}>
          Back to Login
        </Link>
      </div>
    </div>
  );
}
