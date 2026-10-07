import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import Pagination from '../../../components/portal/Pagination';
import Toast from '../../../components/portal/Toast';
import apiClient from '../../../services/portal/apiClient';
import formatRelativeTime from '../../../utils/portal/formatRelativeTime';

const PRIORITY_COLORS = {
  URGENT:   { bg: '#fee2e2', color: '#b91c1c' },
  HIGH:     { bg: '#fef3c7', color: '#d97706' },
  MEDIUM:   { bg: '#dbeafe', color: '#1d4ed8' },
  LOW:      { bg: '#f3f4f6', color: '#6b7280' },
};

const STATUS_COLORS = {
  OPEN:        { bg: '#fef9c3', color: '#a16207' },
  IN_PROGRESS: { bg: '#dbeafe', color: '#1d4ed8' },
  WAITING:     { bg: '#f3e8ff', color: '#7c3aed' },
  RESOLVED:    { bg: '#dcfce7', color: '#15803d' },
  CLOSED:      { bg: '#f3f4f6', color: '#6b7280' },
};

const STATUSES   = ['OPEN', 'IN_PROGRESS', 'WAITING', 'RESOLVED', 'CLOSED'];
const PRIORITIES = ['URGENT', 'HIGH', 'MEDIUM', 'LOW'];

function Badge({ label, cfg }) {
  const c = cfg || { bg: '#f3f4f6', color: '#374151' };
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: '2px 8px',
      borderRadius: 999, background: c.bg, color: c.color, whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

export default function SupportPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [tickets, setTickets] = useState([]);
  const [meta, setMeta]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');
  const [toast, setToast]   = useState(null);
  const [updating, setUpdating] = useState(null);

  const status   = searchParams.get('status')   || '';
  const priority = searchParams.get('priority') || '';
  const page     = Number(searchParams.get('page') || 1);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = { page, limit: 20 };
      if (status)   params.status   = status;
      if (priority) params.priority = priority;
      const { data } = await apiClient.get('/support/admin/tickets', { params });
      const items = Array.isArray(data.data?.items) ? data.data.items
                  : Array.isArray(data.data)        ? data.data : [];
      setTickets(items);
      setMeta(data.data?.meta || null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tickets.');
    } finally {
      setLoading(false);
    }
  }, [page, status, priority]);

  useEffect(() => { load(); }, [load]);

  function setParam(k, v) {
    const next = new URLSearchParams(searchParams);
    if (v) next.set(k, v); else next.delete(k);
    next.delete('page');
    setSearchParams(next);
  }

  async function updateStatus(ticket, newStatus) {
    setUpdating(ticket._id);
    try {
      await apiClient.patch(`/support/admin/tickets/${ticket._id}`, { status: newStatus });
      setToast({ type: 'success', message: `Ticket moved to ${newStatus.replace(/_/g, ' ')}.` });
      load();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Update failed.' });
    } finally {
      setUpdating(null);
    }
  }

  function nextStatus(current) {
    const flow = { OPEN: 'IN_PROGRESS', IN_PROGRESS: 'RESOLVED', WAITING: 'IN_PROGRESS' };
    return flow[current] || null;
  }

  return (
    <div>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <PageHeader title="Support Tickets" subtitle="Tickets assigned to you." />

      <div className="ld-toolbar" style={{ flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1 }}>
          <select value={status} onChange={(e) => setParam('status', e.target.value)} className="ld-form-input" style={{ width: 'auto' }}>
            <option value="">All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
          </select>
          <select value={priority} onChange={(e) => setParam('priority', e.target.value)} className="ld-form-input" style={{ width: 'auto' }}>
            <option value="">All Priorities</option>
            {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          {(status || priority) && (
            <button className="ld-btn-secondary ld-btn-sm" onClick={() => setSearchParams({})}>Clear</button>
          )}
        </div>
        {meta && <span style={{ fontSize: 13, color: 'var(--ld-text-muted)' }}>{meta.total ?? tickets.length} tickets</span>}
      </div>

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && tickets.length === 0 && <EmptyState message="No tickets assigned to you." />}

      {!loading && !error && tickets.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tickets.map((ticket) => {
            const next = nextStatus(ticket.status);
            return (
              <div
                key={ticket._id}
                style={{
                  background: 'var(--ld-surface)',
                  border: '1px solid var(--ld-border)',
                  borderLeft: `4px solid ${PRIORITY_COLORS[ticket.priority]?.color || '#94a3b8'}`,
                  borderRadius: 8,
                  padding: '14px 18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                      <Badge label={ticket.priority} cfg={PRIORITY_COLORS[ticket.priority]} />
                      <Badge label={ticket.status?.replace(/_/g, ' ')} cfg={STATUS_COLORS[ticket.status]} />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{ticket.subject}</div>
                    {ticket.description && (
                      <div style={{ fontSize: 13, color: 'var(--ld-text-muted)', marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {ticket.description}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--ld-text-muted)', flexWrap: 'wrap' }}>
                      {ticket.ticketCode && <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--ld-primary)' }}>{ticket.ticketCode}</span>}
                      {ticket.client?.name && <span>Client: {ticket.client.name}</span>}
                      <span>{formatRelativeTime(ticket.createdAt)}</span>
                    </div>
                  </div>
                  {next && (
                    <button
                      className="ld-btn-primary ld-btn-sm"
                      disabled={updating === ticket._id}
                      onClick={(e) => { e.stopPropagation(); updateStatus(ticket, next); }}
                    >
                      {updating === ticket._id ? '…' : `→ ${next.replace(/_/g, ' ')}`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <Pagination meta={meta} onPageChange={(p) => setParam('page', String(p))} />
      )}
    </div>
  );
}
