import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import Toast from '../../../components/portal/Toast';
import { listMyTickets, createTicket, getMyTicket, replyToMyTicket } from '../../../services/portal/supportApi';

const STATUS_COLORS = {
  OPEN: { background: '#eff6ff', color: '#1d4ed8' },
  WAITING: { background: '#fefce8', color: '#854d0e' },
  RESOLVED: { background: '#f0fdf4', color: '#166534' },
  CLOSED: { background: '#f1f5f9', color: '#64748b' },
};

const PRIORITY_COLORS = {
  LOW: '#94a3b8',
  MEDIUM: '#2563eb',
  HIGH: '#d97706',
  URGENT: '#dc2626',
};

export default function SupportPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get('ticket');
  const orderIdParam = searchParams.get('orderId');

  const [tickets, setTickets] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ subject: '', body: '' });
  const [submitting, setSubmitting] = useState(false);
  const [replyBody, setReplyBody] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [toast, setToast] = useState(null);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await listMyTickets({ limit: 50 });
      setTickets(result.tickets);
      setTotal(result.total);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load tickets.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadDetail = useCallback(async (id) => {
    setLoadingDetail(true);
    try {
      const ticket = await getMyTicket(id);
      setSelectedTicket(ticket);
    } catch {
      setSelectedTicket(null);
    } finally {
      setLoadingDetail(false);
    }
  }, []);

  useEffect(() => { loadTickets(); }, [loadTickets]);
  useEffect(() => { if (selectedId) loadDetail(selectedId); }, [selectedId, loadDetail]);

  useEffect(() => {
    if (orderIdParam) {
      setForm((prev) => ({
        ...prev,
        subject: `Support Request: Order #${orderIdParam}`,
      }));
      setShowCreate(true);
    }
  }, [orderIdParam]);

  function selectTicket(id) {
    const params = new URLSearchParams(searchParams);
    params.set('ticket', id);
    navigate(`?${params.toString()}`, { replace: true });
  }

  function clearDetail() {
    const params = new URLSearchParams(searchParams);
    params.delete('ticket');
    navigate(`?${params.toString()}`, { replace: true });
    setSelectedTicket(null);
  }

  async function handleCreate(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const ticket = await createTicket({ subject: form.subject, body: form.body });
      setToast({ type: 'success', message: `Ticket ${ticket.ticketCode} created.` });
      setShowCreate(false);
      setForm({ subject: '', body: '' });
      loadTickets();
      selectTicket(ticket.id);
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not create ticket.' });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReply(e) {
    e.preventDefault();
    if (!replyBody.trim()) return;
    setSendingReply(true);
    try {
      await replyToMyTicket(selectedTicket.id, replyBody);
      setReplyBody('');
      setToast({ type: 'success', message: 'Reply sent.' });
      loadDetail(selectedTicket.id);
      loadTickets();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not send reply.' });
    } finally {
      setSendingReply(false);
    }
  }

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  // Detail view
  if (selectedId && selectedTicket) {
    return (
      <div>
        <button className="ld-btn-secondary ld-btn-sm" style={{ marginBottom: 16 }} onClick={clearDetail}>
          ← Back to Support
        </button>
        <PageHeader
          title={selectedTicket.subject}
          subtitle={
            <span>
              <span style={{ fontFamily: 'monospace', marginRight: 8 }}>{selectedTicket.ticketCode}</span>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 4, marginRight: 8,
                ...STATUS_COLORS[selectedTicket.status],
              }}>
                {selectedTicket.status}
              </span>
              <span style={{ fontSize: 11, color: PRIORITY_COLORS[selectedTicket.priority] }}>● {selectedTicket.priority}</span>
            </span>
          }
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {selectedTicket.messages.map((msg) => (
            <div key={msg.id} style={{
              padding: '12px 16px',
              background: msg.senderType === 'CLIENT' ? '#eff6ff' : 'var(--ld-surface)',
              border: '1px solid var(--ld-border)',
              borderRadius: 8,
              alignSelf: msg.senderType === 'CLIENT' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
            }}>
              <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginBottom: 4, fontWeight: 600 }}>
                {msg.senderType === 'CLIENT' ? 'You' : `Support — ${msg.senderName || 'Team'}`}
                {' · '}{new Date(msg.createdAt).toLocaleString()}
              </div>
              <div style={{ fontSize: 14, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{msg.body}</div>
            </div>
          ))}
        </div>

        {selectedTicket.status !== 'CLOSED' && (
          <form onSubmit={handleReply} style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 8, padding: 16 }}>
            <div className="ld-form-group">
              <label className="ld-form-label">Your Reply</label>
              <textarea
                className="ld-form-input"
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                rows={4}
                style={{ resize: 'vertical' }}
                placeholder="Type your message…"
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="ld-btn-primary" disabled={sendingReply || !replyBody.trim()}>
                {sendingReply ? 'Sending…' : 'Send Reply'}
              </button>
            </div>
          </form>
        )}

        {selectedTicket.status === 'CLOSED' && (
          <div style={{ background: '#f1f5f9', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#64748b' }}>
            This ticket is closed. Create a new ticket if you need further assistance.
          </div>
        )}

        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Support Center"
        subtitle="Create a ticket and our team will respond within 24 hours."
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: 'var(--ld-text-muted)' }}>{total} ticket{total !== 1 ? 's' : ''} total</span>
        <button className="ld-btn-primary" onClick={() => setShowCreate((v) => !v)}>
          {showCreate ? 'Cancel' : '+ New Ticket'}
        </button>
      </div>

      {showCreate && (
        <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 8, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Create Support Ticket</div>
          <form onSubmit={handleCreate}>
            <div className="ld-form-group">
              <label className="ld-form-label">Subject</label>
              <input
                className="ld-form-input"
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                required
                autoFocus
                placeholder="Briefly describe your issue"
              />
            </div>
            <div className="ld-form-group">
              <label className="ld-form-label">Message</label>
              <textarea
                className="ld-form-input"
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                rows={4}
                required
                style={{ resize: 'vertical' }}
                placeholder="Describe the issue in detail…"
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button type="button" className="ld-btn-secondary" onClick={() => setShowCreate(false)} disabled={submitting}>Cancel</button>
              <button type="submit" className="ld-btn-primary" disabled={submitting}>
                {submitting ? 'Creating…' : 'Submit Ticket'}
              </button>
            </div>
          </form>
        </div>
      )}

      {tickets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--ld-text-muted)' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🎧</div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>No tickets yet</div>
          <div style={{ fontSize: 13 }}>Create a ticket if you need help with an order or account issue.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => selectTicket(ticket.id)}
              style={{
                background: 'var(--ld-surface)',
                border: '1px solid var(--ld-border)',
                borderRadius: 8,
                padding: '14px 18px',
                cursor: 'pointer',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 12,
                alignItems: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--ld-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--ld-border)')}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 4,
                    ...STATUS_COLORS[ticket.status],
                  }}>
                    {ticket.status}
                  </span>
                  <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ld-text-muted)' }}>{ticket.ticketCode}</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{ticket.subject}</div>
                <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginTop: 3 }}>
                  {ticket.messageCount} message{ticket.messageCount !== 1 ? 's' : ''} ·{' '}
                  Last activity: {new Date(ticket.lastActivity).toLocaleDateString()}
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', textAlign: 'right' }}>
                {new Date(ticket.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
