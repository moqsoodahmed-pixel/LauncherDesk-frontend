import StatusBadge from '../StatusBadge';

export default function ClientAuthTab({ client }) {
  if (!client.authAccount) {
    return (
      <div className="ld-panel">
        <p style={{ margin: 0 }}>No login account is linked to this client yet.</p>
      </div>
    );
  }

  const { email, status, lastLogin } = client.authAccount;

  return (
    <div className="ld-panel">
      <div className="ld-card-grid">
        <div>
          <div className="ld-card-label">Login Email</div>
          <div className="ld-card-value" style={{ fontSize: 14 }}>
            {email}
          </div>
        </div>
        <div>
          <div className="ld-card-label">Account Status</div>
          <div className="ld-card-value">
            <StatusBadge status={status} />
          </div>
        </div>
        <div>
          <div className="ld-card-label">Last Login</div>
          <div className="ld-card-value" style={{ fontSize: 14 }}>
            {lastLogin ? new Date(lastLogin).toLocaleString() : 'Never'}
          </div>
        </div>
      </div>
      <p className="ld-phase-note" style={{ marginTop: 12 }}>
        Account status is kept in sync with the Client's own status (see Profile tab) - it cannot be changed independently.
      </p>
    </div>
  );
}
