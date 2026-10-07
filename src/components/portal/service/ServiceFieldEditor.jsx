import { SERVICE_FORM_FIELD_TYPES, FIELD_TYPES_REQUIRING_OPTIONS } from '../../../constants/portal/serviceFormFieldTypes';

export default function ServiceFieldEditor({ field, onChange, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) {
  const needsOptions = FIELD_TYPES_REQUIRING_OPTIONS.includes(field.type);

  function update(key, value) {
    onChange({ ...field, [key]: value });
  }

  return (
    <div className="ld-panel" style={{ marginBottom: 10 }}>
      <div className="ld-toolbar" style={{ marginBottom: 10 }}>
        <strong style={{ fontSize: 13 }}>Field</strong>
        <div className="ld-toolbar-spacer" />
        <button type="button" className="ld-btn-secondary ld-btn-sm" onClick={onMoveUp} disabled={isFirst}>
          ↑
        </button>
        <button type="button" className="ld-btn-secondary ld-btn-sm" onClick={onMoveDown} disabled={isLast}>
          ↓
        </button>
        <button type="button" className="ld-btn-danger ld-btn-sm" onClick={onRemove}>
          Remove
        </button>
      </div>

      <div className="ld-card-grid">
        <div className="ld-form-group">
          <label className="ld-form-label">Key</label>
          <input className="ld-form-input" value={field.key} onChange={(e) => update('key', e.target.value)} placeholder="businessName" />
        </div>
        <div className="ld-form-group">
          <label className="ld-form-label">Label</label>
          <input className="ld-form-input" value={field.label} onChange={(e) => update('label', e.target.value)} placeholder="Business Name" />
        </div>
        <div className="ld-form-group">
          <label className="ld-form-label">Type</label>
          <select value={field.type} onChange={(e) => update('type', e.target.value)}>
            {SERVICE_FORM_FIELD_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="ld-form-group">
          <label className="ld-form-label">
            <input type="checkbox" checked={!!field.required} onChange={(e) => update('required', e.target.checked)} style={{ marginRight: 6 }} />
            Required
          </label>
        </div>
        <div className="ld-form-group">
          <label className="ld-form-label">
            <input type="checkbox" checked={field.active !== false} onChange={(e) => update('active', e.target.checked)} style={{ marginRight: 6 }} />
            Enabled
          </label>
        </div>
      </div>

      <div className="ld-form-group">
        <label className="ld-form-label">Placeholder</label>
        <input className="ld-form-input" value={field.placeholder || ''} onChange={(e) => update('placeholder', e.target.value || null)} />
      </div>
      <div className="ld-form-group">
        <label className="ld-form-label">Description / Help Text</label>
        <input className="ld-form-input" value={field.description || ''} onChange={(e) => update('description', e.target.value || null)} />
      </div>

      {needsOptions && (
        <div className="ld-form-group">
          <label className="ld-form-label">Options (one per line)</label>
          <textarea
            className="ld-form-input"
            rows={3}
            value={(field.options || []).join('\n')}
            onChange={(e) => update('options', e.target.value.split('\n').map((o) => o.trim()).filter(Boolean))}
          />
        </div>
      )}
    </div>
  );
}
