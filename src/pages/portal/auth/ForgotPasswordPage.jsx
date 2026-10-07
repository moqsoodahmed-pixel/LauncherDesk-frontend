import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPasswordRequest } from '../../../services/portal/authApi';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await forgotPasswordRequest(email);
    } finally {
      // Always show the same confirmation, whether or not the email exists.
      setIsSubmitting(false);
      setDone(true);
    }
  }

  return (
    <div className="ld-login-wrapper">
      <div className="ld-login-card">
        <div className="ld-login-brand">LauncherDesk</div>
        <div className="ld-login-subtitle">Forgot password</div>

        {done ? (
          <>
            <div className="ld-panel">
              <p style={{ margin: 0 }}>If an account exists for that email, a reset link has been sent.</p>
            </div>
            <Link to="/user/login" className="ld-btn-primary" style={{ display: 'inline-block', textDecoration: 'none', marginTop: 16 }}>
              Back to Login
            </Link>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="ld-form-group">
              <label className="ld-form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="ld-form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <button type="submit" className="ld-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send reset link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
