/** Renders real, editable inputs from a Service's formSchema - the actual
 * order-creation form, as opposed to ServiceFormBuilderTab's non-submitting
 * preview. The backend re-validates everything regardless of what this
 * renders. */
export default function DynamicOrderDetailsForm({ fields, values, onChange }) {
  const active = (fields || []).filter((f) => f.active !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (active.length === 0) {
    return <p className="ld-phase-note">This service has no additional details to fill in.</p>;
  }

  function set(key, value) {
    onChange({ ...values, [key]: value });
  }

  return (
    <div>
      {active.map((field) => (
        <div className="ld-form-group" key={field.key}>
          <label className="ld-form-label">
            {field.label}
            {field.required ? ' *' : ''}
          </label>
          {renderControl(field, values[field.key], (v) => set(field.key, v))}
          {field.description && <span className="ld-phase-note">{field.description}</span>}
        </div>
      ))}
    </div>
  );
}

function renderControl(field, value, set) {
  const common = {
    className: 'ld-form-input',
    placeholder: field.placeholder || '',
    required: !!field.required,
  };

  switch (field.type) {
    case 'textarea':
      return <textarea {...common} rows={3} value={value || ''} onChange={(e) => set(e.target.value)} />;
    case 'select':
      return (
        <select value={value || ''} onChange={(e) => set(e.target.value)} required={field.required}>
          <option value="">Select…</option>
          {(field.options || []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    case 'multiselect':
      return (
        <select
          multiple
          value={value || []}
          onChange={(e) => set(Array.from(e.target.selectedOptions, (o) => o.value))}
          size={Math.min(4, (field.options || []).length || 1)}
        >
          {(field.options || []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    case 'radio':
      return (
        <div>
          {(field.options || []).map((o) => (
            <label key={o} style={{ display: 'block', fontSize: 13 }}>
              <input type="radio" name={field.key} checked={value === o} onChange={() => set(o)} /> {o}
            </label>
          ))}
        </div>
      );
    case 'checkbox':
      return (
        <label style={{ fontSize: 13 }}>
          <input type="checkbox" checked={!!value} onChange={(e) => set(e.target.checked)} /> Yes
        </label>
      );
    case 'number':
      return <input type="number" {...common} min={field.min ?? undefined} max={field.max ?? undefined} value={value ?? ''} onChange={(e) => set(e.target.value === '' ? '' : Number(e.target.value))} />;
    case 'date':
      return <input type="date" {...common} value={value || ''} onChange={(e) => set(e.target.value)} />;
    case 'email':
      return <input type="email" {...common} value={value || ''} onChange={(e) => set(e.target.value)} />;
    case 'url':
      return <input type="url" {...common} value={value || ''} onChange={(e) => set(e.target.value)} />;
    case 'phone':
      return <input type="tel" {...common} value={value || ''} onChange={(e) => set(e.target.value)} />;
    default:
      return <input type="text" {...common} value={value || ''} onChange={(e) => set(e.target.value)} />;
  }
}
