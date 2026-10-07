import { useState } from 'react';
import ServiceFieldEditor from './ServiceFieldEditor';
import ServiceFormPreview from './ServiceFormPreview';
import { updateServiceForm } from '../../../services/portal/servicesApi';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';

function newField() {
  return { key: '', label: '', type: 'text', required: false, active: true, order: 0 };
}

export default function ServiceFormBuilderTab({ service, onChanged, onToast }) {
  const { hasPermission } = useAuth();
  const canEdit = hasPermission(PERMISSIONS.EDIT_SERVICE);

  const [fields, setFields] = useState(service.formSchema?.fields || []);
  const [mode, setMode] = useState('edit'); // 'edit' | 'preview'
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(index, next) {
    setFields((f) => f.map((field, i) => (i === index ? next : field)));
  }

  function removeField(index) {
    setFields((f) => f.filter((_, i) => i !== index).map((field, i) => ({ ...field, order: i })));
  }

  function addField() {
    setFields((f) => [...f, { ...newField(), order: f.length }]);
  }

  function move(index, direction) {
    setFields((f) => {
      const next = [...f];
      const target = index + direction;
      if (target < 0 || target >= next.length) return f;
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((field, i) => ({ ...field, order: i }));
    });
  }

  async function save() {
    setIsSubmitting(true);
    try {
      await updateServiceForm(service.id, { fields });
      onToast({ type: 'success', message: 'Form configuration saved.' });
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not save form configuration.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="ld-tabs" style={{ marginBottom: 16, borderBottom: 'none' }}>
        <button className={`ld-tab${mode === 'edit' ? ' active' : ''}`} onClick={() => setMode('edit')}>
          Build
        </button>
        <button className={`ld-tab${mode === 'preview' ? ' active' : ''}`} onClick={() => setMode('preview')}>
          Preview
        </button>
      </div>

      {mode === 'preview' ? (
        <ServiceFormPreview fields={fields} />
      ) : (
        <>
          {fields.length === 0 && <p className="ld-phase-note">No fields configured yet - add one below.</p>}
          {fields.map((field, index) => (
            <ServiceFieldEditor
              key={index}
              field={field}
              onChange={(next) => updateField(index, next)}
              onRemove={() => removeField(index)}
              onMoveUp={() => move(index, -1)}
              onMoveDown={() => move(index, 1)}
              isFirst={index === 0}
              isLast={index === fields.length - 1}
            />
          ))}
          {canEdit && (
            <div className="ld-row-actions" style={{ marginTop: 10 }}>
              <button type="button" className="ld-btn-secondary" onClick={addField}>
                + Add Field
              </button>
              <button type="button" className="ld-btn-primary" onClick={save} disabled={isSubmitting}>
                {isSubmitting ? 'Saving…' : 'Save Form'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
