import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
  return (
    <div className="ld-login-wrapper">
      <div className="ld-login-card" style={{ textAlign: 'center' }}>
        <div className="ld-login-brand">403</div>
        <div className="ld-login-subtitle">You do not have permission to view this page.</div>
        <Link to="/login" className="ld-btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
          Back to Login
        </Link>
      </div>
    </div>
  );
}
