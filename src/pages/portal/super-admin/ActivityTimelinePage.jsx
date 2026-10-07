import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import apiClient from '../../../services/portal/apiClient';

const POLL_INTERVAL = 30000;

const ACTION_ICONS = {
  CLIENT_CREATED: '👤',
  CLIENT_UPDATED: '✏️',
  ORDER_CREATED: '📋',
  ORDER_STATUS_CHANGED: '🔄',
  PAYMENT_CONFIRMED: '💳',
  PAYMENT_CREATED: '💰',
  INVOICE_GENERATED: '🧾',
  KYC_SUBMITTED: '📄',
  KYC_VERIFIED: '✅',
  KYC_REJECTED: '❌',
  ADMIN_CREATED: '🧑‍💼',
  SERVICE_CREATED: '⚙️',
  SETTING_UPDATED: '🔧',
  SUPPORT_TICKET_CREATED: '🎫',
  SUPPORT_TICKET_RESOLVED: '✔️',
  USER_LOGIN: '🔐',
  DOC_REQUESTED: '📎',
  NOTE_CREATED: '📝',
  TASK_COMPLETED: '☑️',
};

function icon(action) {
  return ACTION_ICONS[action] || '📌';
}

function TimelineDot({ action }) {
  const ico = icon(action);
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      background: 'var(--ld-bg)', border: '2px solid var(--ld-border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 16, flexShrink: 0, zIndex: 1,
    }}>
      {ico}
    </div>
  );
}

function timeLabel(dt) {
  const d = new Date(dt);
  const now = new Date();
  const diffMs = now - d;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h ago`;
  return d.toLocaleString();
}

function groupByDate(entries) {
  const groups = [];
  let currentDate = '';
  for (const e of entries) {
    const dateStr = new Date(e.createdAt).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    if (dateStr !== currentDate) {
      currentDate = dateStr;
      groups.push({ type: 'date', label: dateStr });
    }
    groups.push({ type: 'entry', data: e });
  }
  return groups;
}

export default function ActivityTimelinePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('timeline');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionFilter, setActionFilter] = useState('');
  const intervalRef = useRef(null);
  const LIMIT = 50;

  // Audit Logs tab state
  const [auditLogs, setAuditLogs] = useState([]);
  const [auditMeta, setAuditMeta] = useState(null);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditError, setAuditError] = useState('');
  const [auditPage, setAuditPage] = useState(1);

  const loadAuditLogs = useCallback(async (pg = 1) => {
    setAuditLoading(true);
    setAuditError('');
    try {
      const { data } = await apiClient.get(`/audit-logs?page=${pg}&limit=25&sortBy=createdAt&sortDir=desc`);
      const rows = data.data?.logs || data.data || [];
      const tot = data.data?.total || data.meta?.total || rows.length;
      setAuditLogs(rows);
      setAuditMeta({ total: tot, page: pg, pages: Math.ceil(tot / 25) });
      setAuditPage(pg);
    } catch (err) {
      setAuditError(err.response?.data?.message || 'Could not load audit logs.');
    } finally {
      setAuditLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'audit') loadAuditLogs(1);
  }, [activeTab, loadAuditLogs]);

  const load = useCallback(async (pg = 1, replace = true) => {
    if (pg === 1) setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: pg, limit: LIMIT });
      if (actionFilter) params.set('action', actionFilter);
      const { data } = await apiClient.get(`/audit-logs?${params}`);
      const rows = data.data?.logs || data.data || [];
      const tot = data.data?.total || data.meta?.total || rows.length;
      setEntries((prev) => (replace ? rows : [...prev, ...rows]));
      setTotal(tot);
      setPage(pg);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load activity.');
    } finally {
      setLoading(false);
    }
  }, [actionFilter]);

  useEffect(() => {
    load(1, true);
    intervalRef.current = setInterval(() => load(1, true), POLL_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [load]);

  function linkFor(entry) {
    const rt = entry.resourceType?.toLowerCase();
    const id = entry.resourceId;
    if (!id) return null;
    if (rt === 'order') return `/super-admin/orders/${id}`;
    if (rt === 'client') return `/super-admin/clients/${id}`;
    if (rt === 'user' || rt === 'admin') return `/super-admin/admins/${id}`;
    if (rt === 'payment') return `/super-admin/payments/${id}`;
    if (rt === 'kycdocument' || rt === 'kyc') return `/super-admin/kyc`;
    if (rt === 'supportticket') return `/super-admin/support`;
    return null;
  }

  const grouped = groupByDate(entries);
  const hasMore = entries.length < total;

  return (
    <div>
      <PageHeader
        title="Company Activity Timeline"
        subtitle="Live feed of all platform events — refreshes every 30 seconds"
        actions={
          <button className="ld-btn-secondary ld-btn-sm" onClick={() => load(1, true)}>Refresh</button>
        }
      />

      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 20, borderBottom: '1px solid var(--ld-border)', paddingBottom: 0 }}>
        {[
          { key: 'timeline', label: 'Activity Timeline' },
          { key: 'audit', label: 'Audit Logs' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '9px 20px', border: 'none', cursor: 'pointer',
              background: 'transparent', fontWeight: 600, fontSize: 13,
              fontFamily: 'inherit',
              color: activeTab === tab.key ? 'var(--ld-gold)' : 'var(--ld-text-muted)',
              borderBottom: activeTab === tab.key ? '2px solid var(--ld-gold)' : '2px solid transparent',
              marginBottom: -1,
              transition: 'all 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Audit Logs Tab */}
      {activeTab === 'audit' && (
        <div>
          {auditLoading ? (
            <LoadingState />
          ) : auditError ? (
            <ErrorState message={auditError} />
          ) : (
            <>
              <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead style={{ background: 'var(--ld-bg)' }}>
                    <tr>
                      <th style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 700, fontSize: 11, color: 'var(--ld-text-muted)', borderBottom: '1px solid var(--ld-border)' }}>When</th>
                      <th style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 700, fontSize: 11, color: 'var(--ld-text-muted)', borderBottom: '1px solid var(--ld-border)' }}>Actor</th>
                      <th style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 700, fontSize: 11, color: 'var(--ld-text-muted)', borderBottom: '1px solid var(--ld-border)' }}>Action</th>
                      <th style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 700, fontSize: 11, color: 'var(--ld-text-muted)', borderBottom: '1px solid var(--ld-border)' }}>Resource</th>
                      <th style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 700, fontSize: 11, color: 'var(--ld-text-muted)', borderBottom: '1px solid var(--ld-border)' }}>IP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.length === 0 && (
                      <tr><td colSpan={5} style={{ padding: 32, textAlign: 'center', color: 'var(--ld-text-muted)' }}>No audit logs found.</td></tr>
                    )}
                    {auditLogs.map((log) => (
                      <tr key={log._id || log.id} style={{ borderBottom: '1px solid var(--ld-border)' }}>
                        <td style={{ padding: '9px 14px', color: 'var(--ld-text-muted)', fontSize: 11, whiteSpace: 'nowrap' }}>
                          {new Date(log.createdAt).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '9px 14px', fontWeight: 600 }}>
                          {log.actor?.name || log.actorName || 'System'}
                          {log.actor?.role && (
                            <div style={{ fontSize: 10, color: 'var(--ld-text-muted)', fontWeight: 400 }}>{log.actor.role}</div>
                          )}
                        </td>
                        <td style={{ padding: '9px 14px' }}>
                          <span style={{
                            display: 'inline-block', padding: '2px 8px', borderRadius: 4,
                            background: 'var(--ld-bg)', fontSize: 11, fontFamily: 'monospace', fontWeight: 600,
                          }}>
                            {log.action}
                          </span>
                        </td>
                        <td style={{ padding: '9px 14px', fontSize: 11, color: 'var(--ld-text-muted)' }}>
                          {log.resourceType && <span style={{ fontWeight: 600, color: 'var(--ld-text)' }}>{log.resourceType}</span>}
                          {log.resourceId && <span style={{ marginLeft: 4, fontFamily: 'monospace', fontSize: 10 }}>#{String(log.resourceId).slice(-6)}</span>}
                        </td>
                        <td style={{ padding: '9px 14px', fontFamily: 'monospace', fontSize: 11 }}>
                          {log.metadata?.ip || log.ip || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {auditMeta && auditMeta.pages > 1 && (
                <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                  {Array.from({ length: Math.min(auditMeta.pages, 8) }, (_, i) => i + 1).map((p) => (
                    <button key={p} className={p === auditPage ? 'ld-btn-primary ld-btn-sm' : 'ld-btn-secondary ld-btn-sm'} onClick={() => loadAuditLogs(p)}>
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Activity Timeline Tab */}
      {activeTab === 'timeline' && <>

      {/* Action filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          className="ld-form-input"
          placeholder="Filter by action (e.g. ORDER_CREATED)..."
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          style={{ width: 280, fontSize: 13 }}
          onKeyDown={(e) => e.key === 'Enter' && load(1, true)}
        />
        {actionFilter && (
          <button className="ld-btn-secondary ld-btn-sm" onClick={() => { setActionFilter(''); }}>Clear</button>
        )}
        <span style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginLeft: 'auto' }}>{total} total events</span>
      </div>

      {loading && entries.length === 0 ? <LoadingState /> : error ? <ErrorState message={error} /> : (
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 17, top: 0, bottom: 0, width: 2,
            background: 'var(--ld-border)', zIndex: 0,
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {grouped.map((item, i) => {
              if (item.type === 'date') {
                return (
                  <div key={`date-${i}`} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '16px 0 8px',
                    position: 'relative', zIndex: 1,
                  }}>
                    <div style={{
                      width: 36, height: 24, borderRadius: 12,
                      background: 'var(--ld-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ld-primary)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      {item.label}
                    </div>
                  </div>
                );
              }

              const e = item.data;
              const link = linkFor(e);
              return (
                <div key={e._id || e.id || i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '8px 0', position: 'relative', zIndex: 1,
                }}>
                  <TimelineDot action={e.action} />
                  <div style={{
                    flex: 1, background: 'var(--ld-surface)', border: '1px solid var(--ld-border)',
                    borderRadius: 8, padding: '10px 14px', minWidth: 0,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>
                          {e.action?.replace(/_/g, ' ')}
                          {link && (
                            <span
                              style={{ marginLeft: 8, fontSize: 11, color: 'var(--ld-primary)', cursor: 'pointer', fontWeight: 400 }}
                              onClick={() => navigate(link)}
                            >
                              View →
                            </span>
                          )}
                        </div>
                        {e.metadata?.description && (
                          <div style={{ fontSize: 12, color: 'var(--ld-text-muted)' }}>{e.metadata.description}</div>
                        )}
                        <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginTop: 4, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                          {(e.actor?.name || e.actorName) && <span>By: <strong>{e.actor?.name || e.actorName}</strong></span>}
                          {e.actorRole && <span style={{ textTransform: 'uppercase', letterSpacing: '0.4px' }}>{e.actorRole}</span>}
                          {e.resourceType && <span>{e.resourceType}</span>}
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', flexShrink: 0, textAlign: 'right' }}>
                        {timeLabel(e.createdAt)}<br />
                        <span style={{ fontSize: 10 }}>{new Date(e.createdAt).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <button className="ld-btn-secondary ld-btn-sm" onClick={() => load(page + 1, false)}>
                Load More
              </button>
            </div>
          )}

          {entries.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--ld-text-muted)', fontSize: 14 }}>
              No activity found.
            </div>
          )}
        </div>
      )}
      </>}
    </div>
  );
}
