import { useState } from 'react';
import { updateRequiredDocuments } from '../../../services/portal/servicesApi';
import { ALL_DOCUMENT_TYPES } from '../../../constants/portal/documentTypes';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';

function newDocument() {
  return { documentType: ALL_DOCUMENT_TYPES[0], label: '', mandatory: true };
}

export default function ServiceDocumentsTab({ service, onChanged, onToast }) {
  const { hasPermission } = useAuth();
  const canEdit = hasPermission(PERMISSIONS.EDIT_SERVICE);

  const [docs, setDocs] = useState(service.requiredDocuments || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update(index, patch) {
    setDocs((d) => d.map((doc, i) => (i === index ? { ...doc, ...patch } : doc)));
  }

  function remove(index) {
    setDocs((d) => d.filter((_, i) => i !== index));
  }

  async function save() {
    setIsSubmitting(true);
    try {
      await updateRequiredDocuments(service.id, docs);
      onToast({ type: 'success', message: 'Required documents saved.' });
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not save required documents.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      {docs.length === 0 && <p className="ld-phase-note">No documents required yet.</p>}

      {docs.map((doc, index) => (
        <div className="ld-panel" style={{ marginBottom: 10 }} key={index}>
          <div className="ld-card-grid">
            <div className="ld-form-group">
              <label className="ld-form-label">Document Type</label>
              <select value={doc.documentType} onChange={(e) => update(index, { documentType: e.target.value })}>
                {ALL_DOCUMENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="ld-form-group">
              <label className="ld-form-label">Label</label>
              <input className="ld-form-input" value={doc.label} onChange={(e) => update(index, { label: e.target.value })} />
            </div>
            <div className="ld-form-group">
              <label className="ld-form-label">
                <input
                  type="checkbox"
                  checked={doc.mandatory !== false}
                  onChange={(e) => update(index, { mandatory: e.target.checked })}
                  style={{ marginRight: 6 }}
                />
                Mandatory
              </label>
            </div>
          </div>
          <button type="button" className="ld-btn-danger ld-btn-sm" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}

      {canEdit && (
        <div className="ld-row-actions" style={{ marginTop: 10 }}>
          <button type="button" className="ld-btn-secondary" onClick={() => setDocs((d) => [...d, newDocument()])}>
            + Add Document Requirement
          </button>
          <button type="button" className="ld-btn-primary" onClick={save} disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Save Documents'}
          </button>
        </div>
      )}

      <p className="ld-phase-note" style={{ marginTop: 10 }}>
        Document upload and verification are implemented in the KYC phase - this only configures what will be required.
      </p>
    </div>
  );
}
