/** Pure UI preview of how the configured form will render. Never submits anything. */
export default function ServiceFormPreview({ fields }) {
  const active = fields.filter((f) => f.active !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (active.length === 0) {
    return <p className="ld-phase-note">No fields configured yet.</p>;
  }

  return (
    <div className="ld-panel">
      {active.map((field) => (
        <div className="ld-form-group" key={field.key}>
          <label className="ld-form-label">
            {field.label}
            {field.required ? ' *' : ''}
          </label>
          {renderPreviewControl(field)}
          {field.description && <span className="ld-phase-note">{field.description}</span>}
        </div>
      ))}
    </div>
  );
}

function renderPreviewControl(field) {
  const common = { className: 'ld-form-input', placeholder: field.placeholder || '', disabled: true };
  switch (field.type) {
    case 'textarea':
      return <textarea {...common} rows={3} />;
    case 'select':
      return (
        <select disabled>
          <option>Select…</option>
          {(field.options || []).map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      );
    case 'multiselect':
      return (
        <select disabled multiple size={Math.min(4, (field.options || []).length || 1)}>
          {(field.options || []).map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      );
    case 'radio':
      return (
        <div>
          {(field.options || []).map((o) => (
            <label key={o} style={{ display: 'block', fontSize: 13 }}>
              <input type="radio" disabled /> {o}
            </label>
          ))}
        </div>
      );
    case 'checkbox':
      return (
        <label style={{ fontSize: 13 }}>
          <input type="checkbox" disabled /> Yes
        </label>
      );
    case 'number':
      return <input type="number" {...common} />;
    case 'date':
      return <input type="date" {...common} />;
    case 'email':
      return <input type="email" {...common} />;
    case 'url':
      return <input type="url" {...common} />;
    case 'phone':
      return <input type="tel" {...common} />;
    default:
      return <input type="text" {...common} />;
  }
}
