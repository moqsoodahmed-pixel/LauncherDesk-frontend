import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import Toast from '../../../components/portal/Toast';
import { listAdminTickets, getAdminTicketStats, getAdminTicket, replyAsAdmin, updateTicket } from '../../../services/portal/supportApi';
import apiClient from '../../../services/portal/apiClient';

const STATUS_COLORS = {
  OPEN:     { background: '#eff6ff', color: '#1d4ed8' },
  WAITING:  { background: '#fefce8', color: '#854d0e' },
  RESOLVED: { background: '#f0fdf4', color: '#166534' },
  CLOSED:   { background: '#f1f5f9', color: '#64748b' },
};

const PRIORITY_COLORS = {
  LOW:    '#94a3b8',
  MEDIUM: '#2563eb',
  HIGH:   '#d97706',
  URGENT: '#dc2626',
};

const ALL_STATUSES = ['OPEN', 'WAITING', 'RESOLVED', 'CLOSED'];
const ALL_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

export default function SupportTicketsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('ticket');

  const [tickets, setTickets] = useState([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('OPEN');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyBody, setReplyBody] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [assigningTo, setAssigningTo] = useState(false);
  const [toast, setToast] = useState(null);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [result, ticketStats] = await Promise.all([
        listAdminTickets({
          status: statusFilter || undefined,
          priority: priorityFilter || undefined,
          search: searchQuery || undefined,
          limit: 50,
        }),
        getAdminTicketStats(),
      ]);
      setTickets(result.tickets || []);
      setTotal(result.total || 0);
      setStats(ticketStats);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load tickets.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, priorityFilter, searchQuery]);

  const loadDetail = useCallback(async (id) => {
    setLoadingDetail(true);
    try {
      setSelectedTicket(await getAdminTicket(id));
    } catch {
      setSelectedTicket(null);
    } finally {
      setLoadingDetail(false);
    }
  }, []);

  // Load admins list once for assignment dropdown
  useEffect(() => {
    apiClient.get('/admins?limit=100').then(({ data }) => {
      const items = Array.isArray(data.data) ? data.data : (data.data?.items || []);
      setAdmins(items.map((a) => ({ id: a.id || a._id, name: a.name, code: a.adminCode })));
    }).catch(() => {});
  }, []);

  useEffect(() => { loadTickets(); }, [loadTickets]);
  useEffect(() => { if (selectedId) loadDetail(selectedId); }, [selectedId, loadDetail]);

  function selectTicket(id) {
    setSearchParams((p) => { const n = new URLSearchParams(p); n.set('ticket', id); return n; }, { replace: true });
  }

  function clearDetail() {
    setSearchParams((p) => { const n = new URLSearchParams(p); n.delete('ticket'); return n; }, { replace: true });
    setSelectedTicket(null);
    setReplyBody('');
  }

  async function handleReply(e) {
    e.preventDefault();
    if (!replyBody.trim()) return;
    setSendingReply(true);
    try {
      await replyAsAdmin(selectedTicket.id, replyBody);
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

  async function handleStatusChange(newStatus) {
    setUpdatingStatus(true);
    try {
      await updateTicket(selectedTicket.id, { status: newStatus });
      setToast({ type: 'success', message: `Ticket marked as ${newStatus}.` });
      loadDetail(selectedTicket.id);
      loadTickets();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not update status.' });
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handlePriorityChange(newPriority) {
    setUpdatingStatus(true);
    try {
      await updateTicket(selectedTicket.id, { priority: newPriority });
      setToast({ type: 'success', message: `Priority set to ${newPriority}.` });
      loadDetail(selectedTicket.id);
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not update priority.' });
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handleAssign(adminId) {
    setAssigningTo(true);
    try {
      await updateTicket(selectedTicket.id, { assignedTo: adminId || null });
      setToast({ type: 'success', message: adminId ? 'Ticket assigned.' : 'Assignment removed.' });
      loadDetail(selectedTicket.id);
      loadTickets();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not assign.' });
    } finally {
      setAssigningTo(false);
    }
  }

  // ── Detail View ────────────────────────────────────────────────────────────
  if (selectedId) {
    if (loadingDetail && !selectedTicket) return <LoadingState />;
    if (!selectedTicket) return (
      <div>
        <button className="ld-btn-secondary ld-btn-sm" style={{ marginBottom: 16 }} onClick={clearDetail}>← Back to Tickets</button>
        <ErrorState message="Ticket not found." />
      </div>
    );

    const isOpen = selectedTicket.status === 'OPEN' || selectedTicket.status === 'WAITING';

    return (
      <div>
        {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
        <button className="ld-btn-secondary ld-btn-sm" style={{ marginBottom: 16 }} onClick={clearDetail}>← Back to Tickets</button>

        {/* Header */}
        <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 10, padding: '16px 20px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13, color: 'var(--ld-primary)' }}>{selectedTicket.ticketCode}</span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 999, ...STATUS_COLORS[selectedTicket.status] }}>
                  {selectedTicket.status}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, color: PRIORITY_COLORS[selectedTicket.priority] }}>
                  ● {selectedTicket.priority}
                </span>
                {selectedTicket.assignedTo && (
                  <span style={{ fontSize: 11, color: 'var(--ld-text-muted)', background: 'var(--ld-bg)', padding: '2px 8px', borderRadius: 999, border: '1px solid var(--ld-border)' }}>
                    Assigned to: {selectedTicket.assignedTo.name}
                  </span>
                )}
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{selectedTicket.subject}</div>
              {selectedTicket.clientName && (
                <div style={{ fontSize: 13, color: 'var(--ld-text-muted)' }}>
                  Client:{' '}
                  <span
                    onClick={() => navigate(`/super-admin/clients/${selectedTicket.clientId}`)}
                    style={{ color: 'var(--ld-primary)', cursor: 'pointer', fontWeight: 600 }}
                  >
                    {selectedTicket.clientName}{selectedTicket.clientCode ? ` (${selectedTicket.clientCode})` : ''}
                  </span>
                </div>
              )}
              {selectedTicket.orderId && (
                <div style={{ fontSize: 13, color: 'var(--ld-text-muted)', marginTop: 2 }}>
                  Order:{' '}
                  <span
                    onClick={() => navigate(`/super-admin/orders/${selectedTicket.orderId}`)}
                    style={{ color: 'var(--ld-primary)', cursor: 'pointer', fontWeight: 600 }}
                  >
                    {selectedTicket.orderCode || selectedTicket.orderId}
                  </span>
                </div>
              )}
              <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginTop: 4 }}>
                Created: {new Date(selectedTicket.createdAt).toLocaleString()}
              </div>
            </div>

            {/* Actions panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 200 }}>
              {/* Status actions */}
              {isOpen && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button className="ld-btn-secondary ld-btn-sm" onClick={() => handleStatusChange('RESOLVED')} disabled={updatingStatus}>
                    Mark Resolved
                  </button>
                  <button className="ld-btn-secondary ld-btn-sm" onClick={() => handleStatusChange('CLOSED')} disabled={updatingStatus}>
                    Close
                  </button>
                </div>
              )}
              {selectedTicket.status === 'RESOLVED' && (
                <button className="ld-btn-secondary ld-btn-sm" onClick={() => handleStatusChange('CLOSED')} disabled={updatingStatus}>
                  Close Ticket
                </button>
              )}
              {selectedTicket.status === 'CLOSED' && (
                <button className="ld-btn-secondary ld-btn-sm" onClick={() => handleStatusChange('OPEN')} disabled={updatingStatus}>
                  Reopen
                </button>
              )}

              {/* Priority escalation */}
              <div>
                <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginBottom: 4 }}>Escalate Priority</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {ALL_PRIORITIES.map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePriorityChange(p)}
                      disabled={updatingStatus || selectedTicket.priority === p}
                      style={{
                        fontSize: 10, padding: '2px 8px', borderRadius: 999, border: '1px solid',
                        borderColor: PRIORITY_COLORS[p], color: selectedTicket.priority === p ? '#fff' : PRIORITY_COLORS[p],
                        background: selectedTicket.priority === p ? PRIORITY_COLORS[p] : 'transparent',
                        cursor: selectedTicket.priority === p ? 'default' : 'pointer', fontWeight: 700,
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assign to admin */}
              <div>
                <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginBottom: 4 }}>Assign To</div>
                <select
                  className="ld-form-input"
                  style={{ fontSize: 12, width: '100%' }}
                  value={selectedTicket.assignedTo?.id || ''}
                  onChange={(e) => handleAssign(e.target.value)}
                  disabled={assigningTo}
                >
                  <option value="">— Unassigned —</option>
                  {admins.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}{a.code ? ` (${a.code})` : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Conversation timeline */}
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, color: 'var(--ld-text-muted)' }}>
          Conversation ({selectedTicket.messages?.length || 0} messages)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {(selectedTicket.messages || []).map((msg, i) => (
            <div key={msg.id || i} style={{
              padding: '12px 16px',
              background: msg.senderType === 'ADMIN' ? '#f0fdf4' : '#eff6ff',
              border: '1px solid var(--ld-border)',
              borderRadius: 8,
              maxWidth: '80%',
              alignSelf: msg.senderType === 'ADMIN' ? 'flex-end' : 'flex-start',
            }}>
              <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginBottom: 4, fontWeight: 600 }}>
                {msg.senderType === 'ADMIN' ? `Admin — ${msg.senderName || 'Staff'}` : `Client — ${msg.senderName || 'Client'}`}
                {' · '}{new Date(msg.createdAt).toLocaleString()}
              </div>
              <div style={{ fontSize: 14, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{msg.body}</div>
            </div>
          ))}
          {(selectedTicket.messages?.length === 0) && (
            <div style={{ fontSize: 13, color: 'var(--ld-text-muted)', padding: 16 }}>No messages yet.</div>
          )}
        </div>

        {/* Reply */}
        {selectedTicket.status !== 'CLOSED' && (
          <form onSubmit={handleReply} style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 8, padding: 16 }}>
            <div className="ld-form-group">
              <label className="ld-form-label">Reply to Client</label>
              <textarea
                className="ld-form-input"
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                rows={4}
                style={{ resize: 'vertical' }}
                placeholder="Type your response…"
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button type="submit" className="ld-btn-primary" disabled={sendingReply || !replyBody.trim()}>
                {sendingReply ? 'Sending…' : 'Send Reply'}
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  // ── List View ──────────────────────────────────────────────────────────────
  return (
    <div>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <PageHeader title="Support Tickets" subtitle="Manage all customer support tickets." />

      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Open', value: stats.open, color: '#1d4ed8' },
            { label: 'Waiting', value: stats.waiting, color: '#d97706' },
            { label: 'Resolved', value: stats.resolved, color: '#166534' },
            { label: 'Total', value: stats.total, color: 'var(--ld-text)' },
          ].map((s) => (
            <div key={s.label} style={{
              background: 'var(--ld-surface)', border: '1px solid var(--ld-border)',
              borderRadius: 8, padding: '12px 16px', cursor: 'pointer',
            }} onClick={() => setStatusFilter(s.label === 'Total' ? '' : s.label.toUpperCase())}>
              <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', textTransform: 'uppercase' }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => setStatusFilter('')} className={!statusFilter ? 'ld-btn-primary ld-btn-sm' : 'ld-btn-secondary ld-btn-sm'}>All</button>
          {ALL_STATUSES.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={statusFilter === s ? 'ld-btn-primary ld-btn-sm' : 'ld-btn-secondary ld-btn-sm'}>{s}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => setPriorityFilter('')} className={!priorityFilter ? 'ld-btn-primary ld-btn-sm' : 'ld-btn-secondary ld-btn-sm'}>Any Priority</button>
          {ALL_PRIORITIES.map((p) => (
            <button key={p} onClick={() => setPriorityFilter(p)} className={priorityFilter === p ? 'ld-btn-primary ld-btn-sm' : 'ld-btn-secondary ld-btn-sm'}
              style={{ color: PRIORITY_COLORS[p] }}>
              {p}
            </button>
          ))}
        </div>
        <input
          className="ld-form-input"
          style={{ marginLeft: 'auto', width: 220, fontSize: 13 }}
          placeholder="Search by subject…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && loadTickets()}
        />
      </div>

      {loading ? <LoadingState /> : error ? <ErrorState message={error} /> : (
        <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--ld-border)', fontWeight: 700, fontSize: 14 }}>
            {statusFilter || 'All'} Tickets ({total})
          </div>
          {tickets.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: 'var(--ld-text-muted)', fontSize: 13 }}>No tickets found.</div>
          ) : tickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => selectTicket(ticket.id)}
              style={{
                padding: '14px 20px', borderBottom: '1px solid var(--ld-border)',
                display: 'grid', gridTemplateColumns: '1fr auto',
                alignItems: 'center', gap: 16, cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--ld-bg)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '')}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999, ...STATUS_COLORS[ticket.status] }}>{ticket.status}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: PRIORITY_COLORS[ticket.priority] }}>● {ticket.priority}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--ld-text-muted)' }}>{ticket.ticketCode}</span>
                  {ticket.assignedTo && (
                    <span style={{ fontSize: 10, color: 'var(--ld-text-muted)', background: 'var(--ld-bg)', padding: '1px 6px', borderRadius: 999, border: '1px solid var(--ld-border)' }}>
                      → {ticket.assignedTo.name}
                    </span>
                  )}
                </div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{ticket.subject}</div>
                <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginTop: 3 }}>
                  {ticket.clientName && <span>{ticket.clientName} · </span>}
                  {ticket.messageCount} message{ticket.messageCount !== 1 ? 's' : ''} ·{' '}
                  {new Date(ticket.lastActivity).toLocaleDateString()}
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', textAlign: 'right' }}>
                {new Date(ticket.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
