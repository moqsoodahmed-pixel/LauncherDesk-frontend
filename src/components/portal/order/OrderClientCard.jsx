export default function OrderClientCard({ clientSnapshot }) {
  return (
    <div className="ld-panel">
      <div className="ld-card-grid">
        <Field label="Client ID" value={<span style={{ fontFamily: 'monospace' }}>{clientSnapshot.clientCode}</span>} />
        <Field label="Name" value={clientSnapshot.name} />
        <Field label="Company" value={clientSnapshot.companyName || '—'} />
        <Field label="Email" value={clientSnapshot.email} />
        <Field label="Phone" value={clientSnapshot.phone || '—'} />
      </div>
      <p className="ld-phase-note" style={{ marginTop: 10 }}>
        Snapshot taken at order creation - the client's current profile may since have changed.
      </p>
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
