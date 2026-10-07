import { useCallback, useEffect, useState } from 'react';
import { getDocRequests, createDocRequest, updateDocRequest } from '../../../services/portal/ordersApi';

const DOCUMENT_TYPES = [
  'AADHAAR', 'PAN', 'PASSPORT', 'DRIVING_LICENSE', 'VOTER_ID',
  'UTILITY_BILL', 'BANK_STATEMENT', 'RENT_AGREEMENT',
  'GST_CERTIFICATE', 'BUSINESS_REGISTRATION', 'COMPANY_CERTIFICATE',
  'CANCELLED_CHEQUE', 'INCOME_PROOF', 'PHOTO', 'SIGNATURE',
  'RENTAL_AGREEMENT', 'OTHER',
];

const STATUS_COLORS = {
  PENDING: { bg: '#fffbeb', color: '#92400e', border: '#fde68a' },
  FULFILLED: { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' },
  CANCELLED: { bg: '#f9fafb', color: '#6b7280', border: '#e5e7eb' },
};

export default function DocRequestPanel({ order }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ documentType: '', label: '', instructions: '' });
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try { setRequests(await getDocRequests(order._id)); }
    catch { setError('Failed to load document requests.'); }
    finally { setLoading(false); }
  }, [order._id]);

  useEffect(() => { load(); }, [load]);

  async function submit() {
    if (!form.documentType || !form.label.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      const req = await createDocRequest(order._id, form);
      setRequests((prev) => [req, ...prev]);
      setForm({ documentType: '', label: '', instructions: '' });
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create request.');
    } finally { setSubmitting(false); }
  }

  async function markStatus(reqId, status) {
    try {
      const updated = await updateDocRequest(order._id, reqId, status);
      setRequests((prev) => prev.map((r) => r._id === reqId ? updated : r));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update request.');
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: 'var(--ld-text-muted)' }}>
          Request specific documents from the client. They will be notified via dashboard.
        </div>
        <button className="ld-btn-primary ld-btn-sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Request Document'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Document Type *</label>
              <select
                value={form.documentType}
                onChange={(e) => setForm({ ...form, documentType: e.target.value })}
                style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid var(--ld-border)', fontSize: 13 }}
              >
                <option value="">Select type…</option>
                {DOCUMENT_TYPES.map((t) => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Label *</label>
              <input
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                placeholder="e.g. Upload your PAN Card"
                style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid var(--ld-border)', fontSize: 13, boxSizing: 'border-box' }}
              />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Instructions (optional)</label>
            <textarea
              value={form.instructions}
              onChange={(e) => setForm({ ...form, instructions: e.target.value })}
              placeholder="Any specific instructions for the client…"
              rows={2}
              style={{ width: '100%', resize: 'vertical', padding: '7px 10px', borderRadius: 6, border: '1px solid var(--ld-border)', fontSize: 13, boxSizing: 'border-box' }}
            />
          </div>
          {error && <div style={{ color: '#dc2626', fontSize: 12, marginBottom: 8 }}>{error}</div>}
          <button
            className="ld-btn-primary ld-btn-sm"
            onClick={submit}
            disabled={submitting || !form.documentType || !form.label.trim()}
          >
            {submitting ? 'Sending…' : 'Send Request'}
          </button>
        </div>
      )}

      {loading && <div style={{ color: 'var(--ld-text-muted)', fontSize: 13 }}>Loading requests…</div>}
      {!loading && requests.length === 0 && (
        <div style={{ color: 'var(--ld-text-muted)', fontSize: 13, textAlign: 'center', padding: '32px 0' }}>
          No document requests yet.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {requests.map((req) => {
          const sc = STATUS_COLORS[req.status] || STATUS_COLORS.PENDING;
          return (
            <div key={req._id} style={{
              background: 'var(--ld-surface)', border: '1px solid var(--ld-border)',
              borderRadius: 8, padding: '12px 14px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{
                      padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                      background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                    }}>{req.status}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#2952e3' }}>
                      {req.documentType?.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{req.label}</div>
                  {req.instructions && (
                    <div style={{ fontSize: 12, color: 'var(--ld-text-muted)' }}>{req.instructions}</div>
                  )}
                  <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginTop: 6 }}>
                    Requested by {req.requestedBy?.name || 'Staff'} · {new Date(req.createdAt).toLocaleString()}
                  </div>
                  {req.linkedKycDocument && (
                    <div style={{ fontSize: 11, color: '#166534', marginTop: 4 }}>
                      Linked to document v{req.linkedKycDocument.version} — {req.linkedKycDocument.status}
                    </div>
                  )}
                </div>
                {req.status === 'PENDING' && (
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0, marginLeft: 10 }}>
                    <button
                      className="ld-btn-sm"
                      style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', borderRadius: 6, padding: '3px 10px', cursor: 'pointer', fontSize: 12 }}
                      onClick={() => markStatus(req._id, 'FULFILLED')}
                    >Fulfill</button>
                    <button
                      className="ld-btn-sm"
                      style={{ background: '#f9fafb', color: '#6b7280', border: '1px solid #e5e7eb', borderRadius: 6, padding: '3px 10px', cursor: 'pointer', fontSize: 12 }}
                      onClick={() => markStatus(req._id, 'CANCELLED')}
                    >Cancel</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
