export default function OrderServiceCard({ serviceSnapshot, orderDetails }) {
  const entries = Object.entries(orderDetails || {});

  return (
    <div className="ld-panel">
      <div className="ld-card-grid" style={{ marginBottom: entries.length > 0 ? 16 : 0 }}>
        <Field label="Service Code" value={<span style={{ fontFamily: 'monospace' }}>{serviceSnapshot.serviceCode}</span>} />
        <Field label="Name" value={serviceSnapshot.name} />
        <Field label="Category" value={serviceSnapshot.category} />
        <Field label="Requires KYC" value={serviceSnapshot.requiresKyc ? 'Yes' : 'No'} />
      </div>

      {entries.length > 0 && (
        <>
          <div className="ld-permission-group-title">Submitted Order Details</div>
          <div className="ld-card-grid">
            {entries.map(([key, value]) => (
              <Field key={key} label={key} value={Array.isArray(value) ? value.join(', ') : String(value)} />
            ))}
          </div>
        </>
      )}

      <p className="ld-phase-note" style={{ marginTop: 10 }}>
        Service snapshot taken at order creation - the service's current configuration may since have changed.
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
