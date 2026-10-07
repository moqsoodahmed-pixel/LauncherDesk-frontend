import { useState } from 'react';
import { createService } from '../../../services/portal/servicesApi';
import { ALL_SERVICE_CATEGORIES } from '../../../constants/portal/serviceCategory';

const EMPTY = { name: '', serviceCode: '', category: 'OTHER', basePrice: '', gstPercentage: '18', shortDescription: '' };

export default function CreateServiceModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!open) return null;

  function setField(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const service = await createService({
        name: form.name,
        serviceCode: form.serviceCode,
        category: form.category,
        basePrice: Number(form.basePrice),
        gstPercentage: Number(form.gstPercentage),
        shortDescription: form.shortDescription || undefined,
      });
      onCreated(service);
      setForm(EMPTY);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create service.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="ld-modal-backdrop" onClick={onClose}>
      <div className="ld-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ld-modal-title">Create Service</div>

        {error && <div className="ld-form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="ld-form-group">
            <label className="ld-form-label">Service Name</label>
            <input className="ld-form-input" value={form.name} onChange={setField('name')} required autoFocus />
          </div>
          <div className="ld-form-group">
            <label className="ld-form-label">Service Code</label>
            <input
              className="ld-form-input"
              value={form.serviceCode}
              onChange={(e) => setForm((f) => ({ ...f, serviceCode: e.target.value.toUpperCase() }))}
              placeholder="e.g. WABOT"
              required
            />
            <span className="ld-phase-note">Uppercase letters, numbers, underscore or hyphen. Cannot be changed later.</span>
          </div>
          <div className="ld-form-group">
            <label className="ld-form-label">Category</label>
            <select value={form.category} onChange={setField('category')}>
              {ALL_SERVICE_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="ld-form-group">
            <label className="ld-form-label">Base Price (₹)</label>
            <input type="number" min="0" step="0.01" className="ld-form-input" value={form.basePrice} onChange={setField('basePrice')} required />
          </div>
          <div className="ld-form-group">
            <label className="ld-form-label">GST %</label>
            <input type="number" min="0" max="100" className="ld-form-input" value={form.gstPercentage} onChange={setField('gstPercentage')} />
          </div>
          <div className="ld-form-group">
            <label className="ld-form-label">Short Description (optional)</label>
            <input className="ld-form-input" value={form.shortDescription} onChange={setField('shortDescription')} />
          </div>

          <div className="ld-modal-actions">
            <button type="button" className="ld-btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="ld-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating…' : 'Create Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
