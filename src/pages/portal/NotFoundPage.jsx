import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="ld-login-wrapper">
      <div className="ld-login-card" style={{ textAlign: 'center' }}>
        <div className="ld-login-brand">404</div>
        <div className="ld-login-subtitle">Page not found.</div>
        <Link to="/login" className="ld-btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
