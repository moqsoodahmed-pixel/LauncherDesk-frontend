import { useState } from 'react';
import { createClient } from '../../../services/portal/clientsApi';

const EMPTY = { name: '', email: '', phone: '', companyName: '', city: '', state: '' };

export default function CreateClientModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdClient, setCreatedClient] = useState(null);

  if (!open) return null;

  function setField(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const payload = { name: form.name, email: form.email, phone: form.phone };
      if (form.companyName) payload.companyName = form.companyName;
      if (form.city) payload.city = form.city;
      if (form.state) payload.state = form.state;
      const client = await createClient(payload);
      setCreatedClient(client);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create client.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleDone() {
    const client = createdClient;
    setCreatedClient(null);
    setForm(EMPTY);
    onCreated(client);
  }

  // Success state — show generated Business ID prominently
  if (createdClient) {
    return (
      <div className="ld-modal-backdrop" onClick={handleDone}>
        <div className="ld-modal" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
          <div className="ld-modal-title">Client Created</div>
          <div style={{ marginBottom: 20, color: 'var(--ld-text-muted)', fontSize: 14 }}>
            {createdClient.name}
            {createdClient.companyName && ` · ${createdClient.companyName}`}
          </div>
          {createdClient.clientCode && (
            <div style={{
              background: 'var(--ld-bg)',
              border: '2px solid var(--ld-primary)',
              borderRadius: 8,
              padding: '14px 24px',
              marginBottom: 20,
            }}>
              <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                Client ID (auto-generated)
              </div>
              <div style={{ fontSize: 24, fontFamily: 'monospace', fontWeight: 700, color: 'var(--ld-primary)', letterSpacing: '0.1em' }}>
                {createdClient.clientCode}
              </div>
            </div>
          )}
          <div style={{ fontSize: 13, color: 'var(--ld-text-muted)', marginBottom: 20 }}>
            Account is in PENDING status. Assign the client to an Admin and activate from the profile page.
          </div>
          <button className="ld-btn-primary" onClick={handleDone} style={{ width: '100%' }}>
            Open Client Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ld-modal-backdrop" onClick={onClose}>
      <div className="ld-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ld-modal-title">Create Client</div>

        {error && <div className="ld-form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="ld-form-group">
            <label className="ld-form-label">Name</label>
            <input className="ld-form-input" value={form.name} onChange={setField('name')} required autoFocus />
          </div>
          <div className="ld-form-group">
            <label className="ld-form-label">Email</label>
            <input type="email" className="ld-form-input" value={form.email} onChange={setField('email')} required />
          </div>
          <div className="ld-form-group">
            <label className="ld-form-label">Phone</label>
            <input className="ld-form-input" value={form.phone} onChange={setField('phone')} required />
          </div>
          <div className="ld-form-group">
            <label className="ld-form-label">Company (optional)</label>
            <input className="ld-form-input" value={form.companyName} onChange={setField('companyName')} />
          </div>
          <div className="ld-form-group">
            <label className="ld-form-label">City (optional)</label>
            <input className="ld-form-input" value={form.city} onChange={setField('city')} />
          </div>
          <div className="ld-form-group">
            <label className="ld-form-label">State (optional)</label>
            <input className="ld-form-input" value={form.state} onChange={setField('state')} />
          </div>

          <p className="ld-phase-note">
            A Business ID is auto-generated on creation. A login account is created with PENDING status.
          </p>

          <div className="ld-modal-actions">
            <button type="button" className="ld-btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="ld-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating…' : 'Create Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
