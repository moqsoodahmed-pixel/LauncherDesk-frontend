import { useState } from 'react';
import { createAdmin } from '../../../services/portal/adminsApi';

export default function CreateAdminModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', department: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdAdmin, setCreatedAdmin] = useState(null);

  if (!open) return null;

  function setField(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const payload = { name: form.name, email: form.email, password: form.password };
      if (form.phone) payload.phone = form.phone;
      if (form.department) payload.department = form.department;
      const admin = await createAdmin(payload);
      setCreatedAdmin(admin);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create admin.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleDone() {
    onCreated(createdAdmin);
    setCreatedAdmin(null);
    setForm({ name: '', email: '', phone: '', department: '', password: '' });
  }

  // Success state — show generated admin code prominently
  if (createdAdmin) {
    return (
      <div className="ld-modal-backdrop" onClick={handleDone}>
        <div className="ld-modal" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
          <div className="ld-modal-title">Admin Created</div>
          <div style={{ marginBottom: 20, color: 'var(--ld-text-muted)', fontSize: 14 }}>
            {createdAdmin.name} ({createdAdmin.email})
          </div>
          {createdAdmin.adminCode && (
            <div style={{
              background: 'var(--ld-bg)',
              border: '2px solid var(--ld-primary)',
              borderRadius: 8,
              padding: '14px 24px',
              marginBottom: 20,
            }}>
              <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                Admin ID (auto-generated)
              </div>
              <div style={{ fontSize: 24, fontFamily: 'monospace', fontWeight: 700, color: 'var(--ld-primary)', letterSpacing: '0.1em' }}>
                {createdAdmin.adminCode}
              </div>
            </div>
          )}
          <div style={{ fontSize: 13, color: 'var(--ld-text-muted)', marginBottom: 20 }}>
            No permissions or client access are granted yet — assign them from the admin profile.
          </div>
          <button className="ld-btn-primary" onClick={handleDone} style={{ width: '100%' }}>
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ld-modal-backdrop" onClick={onClose}>
      <div className="ld-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ld-modal-title">Create Admin</div>

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
            <label className="ld-form-label">Phone (optional)</label>
            <input className="ld-form-input" value={form.phone} onChange={setField('phone')} />
          </div>
          <div className="ld-form-group">
            <label className="ld-form-label">Department (optional)</label>
            <input className="ld-form-input" value={form.department} onChange={setField('department')} />
          </div>
          <div className="ld-form-group">
            <label className="ld-form-label">Temporary password</label>
            <input
              type="password"
              className="ld-form-input"
              value={form.password}
              onChange={setField('password')}
              required
              minLength={8}
            />
            <span className="ld-phase-note">At least 8 characters, with a letter and a number.</span>
          </div>

          <div className="ld-modal-actions">
            <button type="button" className="ld-btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="ld-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating…' : 'Create Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
