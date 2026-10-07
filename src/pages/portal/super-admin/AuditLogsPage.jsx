import { Fragment, useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../context/PortalAuthContext';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import Pagination from '../../../components/portal/Pagination';
import { getAuditLogs } from '../../../services/portal/auditLogsApi';
import { PERMISSIONS } from '../../../constants/portal/permissions';

function parseUserAgent(ua) {
  if (!ua) return { browser: '—', os: '—', device: '—' };

  let browser = 'Unknown';
  if (/Edg\//.test(ua)) browser = `Edge ${(ua.match(/Edg\/([0-9.]+)/) || [])[1] || ''}`.trim();
  else if (/OPR\//.test(ua)) browser = `Opera ${(ua.match(/OPR\/([0-9.]+)/) || [])[1] || ''}`.trim();
  else if (/Chrome\//.test(ua)) browser = `Chrome ${(ua.match(/Chrome\/([0-9.]+)/) || [])[1] || ''}`.trim();
  else if (/Firefox\//.test(ua)) browser = `Firefox ${(ua.match(/Firefox\/([0-9.]+)/) || [])[1] || ''}`.trim();
  else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) browser = `Safari ${(ua.match(/Version\/([0-9.]+)/) || [])[1] || ''}`.trim();

  let os = 'Unknown';
  if (/Windows NT 10/.test(ua)) os = 'Windows 10/11';
  else if (/Windows NT 6\.3/.test(ua)) os = 'Windows 8.1';
  else if (/Windows NT 6\.1/.test(ua)) os = 'Windows 7';
  else if (/Mac OS X ([0-9_]+)/.test(ua)) os = `macOS ${(ua.match(/Mac OS X ([0-9_]+)/) || [])[1]?.replace(/_/g, '.') || ''}`.trim();
  else if (/Android ([0-9.]+)/.test(ua)) os = `Android ${(ua.match(/Android ([0-9.]+)/) || [])[1] || ''}`.trim();
  else if (/iPhone OS ([0-9_]+)/.test(ua)) os = `iOS ${(ua.match(/iPhone OS ([0-9_]+)/) || [])[1]?.replace(/_/g, '.') || ''}`.trim();
  else if (/Linux/.test(ua)) os = 'Linux';

  let device = 'Desktop';
  if (/Mobile|Android|iPhone|iPad/.test(ua)) device = /iPad/.test(ua) ? 'Tablet' : 'Mobile';

  return { browser, os, device };
}

/**
 * Read-only audit trail viewer. Gated on VIEW_AUDIT_LOGS, same
 * client-side pattern as AdminKycPanel/AdminPaymentPanel - the router
 * already restricts this route to Super Admin, this is a second,
 * defense-in-depth check for conditionally rendering content.
 */
export default function AuditLogsPage() {
  const { hasPermission } = useAuth();
  const canView = hasPermission(PERMISSIONS.VIEW_AUDIT_LOGS);

  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const [filters, setFilters] = useState({ action: '', resourceType: '', actor: '', dateFrom: '', dateTo: '' });
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    if (!canView) return;
    setLoading(true);
    setError('');
    try {
      const result = await getAuditLogs({ ...appliedFilters, page, limit: 25 });
      setItems(result.data);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load audit logs.');
    } finally {
      setLoading(false);
    }
  }, [canView, appliedFilters, page]);

  useEffect(() => {
    load();
  }, [load]);

  function handleFilterSubmit(e) {
    e.preventDefault();
    setPage(1);
    setAppliedFilters(filters);
  }

  function handleFilterChange(field, value) {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }

  if (!canView) {
    return (
      <div>
        <PageHeader title="Audit Logs" subtitle="Immutable record of system activity." />
        <ErrorState message="You do not have permission to view audit logs." />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Audit Logs" subtitle="Immutable record of who did what, when." />

      <form className="ld-toolbar" onSubmit={handleFilterSubmit}>
        <input
          className="ld-form-input"
          placeholder="Action (e.g. ORDER_CREATED)"
          value={filters.action}
          onChange={(e) => handleFilterChange('action', e.target.value)}
          style={{ width: 200 }}
        />
        <input
          className="ld-form-input"
          placeholder="Resource type"
          value={filters.resourceType}
          onChange={(e) => handleFilterChange('resourceType', e.target.value)}
          style={{ width: 160 }}
        />
        <input
          className="ld-form-input"
          placeholder="Actor (user id)"
          value={filters.actor}
          onChange={(e) => handleFilterChange('actor', e.target.value)}
          style={{ width: 200 }}
        />
        <input
          className="ld-form-input"
          type="date"
          value={filters.dateFrom}
          onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
        />
        <input
          className="ld-form-input"
          type="date"
          value={filters.dateTo}
          onChange={(e) => handleFilterChange('dateTo', e.target.value)}
        />
        <button type="submit" className="ld-btn-secondary">
          Apply
        </button>
      </form>

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} />}
      {!loading && !error && items.length === 0 && <EmptyState message="No audit log entries match these filters." />}

      {!loading && !error && items.length > 0 && (
        <div className="ld-table-wrap">
          <table className="ld-table">
            <thead>
              <tr>
                <th>When</th>
                <th>Actor</th>
                <th>Action</th>
                <th>Resource</th>
                <th>IP / Location</th>
                <th>Browser / OS</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {items.map((log) => {
                const ua = parseUserAgent(log.userAgent);
                return (
                <Fragment key={log.id}>
                  <tr>
                    <td style={{ whiteSpace: 'nowrap', fontSize: 12 }}>{new Date(log.createdAt).toLocaleString()}</td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{log.actor?.name || log.actorRole || 'System'}</div>
                      {log.actor?.email && <div style={{ fontSize: 11, color: 'var(--ld-text-muted)' }}>{log.actor.email}</div>}
                    </td>
                    <td>
                      <span style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 600,
                        background: 'var(--ld-bg)',
                        fontFamily: 'monospace',
                        letterSpacing: '0.03em',
                      }}>
                        {log.action}
                      </span>
                    </td>
                    <td style={{ fontSize: 12 }}>
                      <div style={{ fontWeight: 600 }}>{log.resourceType || '—'}</div>
                      {log.resourceId && <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--ld-text-muted)' }}>{log.resourceId}</div>}
                    </td>
                    <td style={{ fontSize: 12 }}>
                      <div style={{ fontFamily: 'monospace', fontWeight: 600 }}>{log.ipAddress || '—'}</div>
                    </td>
                    <td style={{ fontSize: 12 }}>
                      <div>{ua.browser}</div>
                      <div style={{ color: 'var(--ld-text-muted)', fontSize: 11 }}>{ua.os} · {ua.device}</div>
                    </td>
                    <td>
                      <button
                        className="ld-btn-secondary ld-btn-sm"
                        onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                      >
                        {expandedId === log.id ? 'Hide' : 'View'}
                      </button>
                    </td>
                  </tr>
                  {expandedId === log.id && (
                    <tr>
                      <td colSpan={7} style={{ background: 'var(--ld-bg)', padding: 0 }}>
                        <div style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 12 }}>
                            <InfoChip label="IP Address" value={log.ipAddress || '—'} mono />
                            <InfoChip label="Browser" value={ua.browser} />
                            <InfoChip label="OS" value={ua.os} />
                            <InfoChip label="Device" value={ua.device} />
                            <InfoChip label="Actor Role" value={log.actorRole || '—'} />
                            <InfoChip label="Timestamp" value={new Date(log.createdAt).toISOString()} mono />
                          </div>
                          {log.userAgent && (
                            <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginBottom: 10, wordBreak: 'break-all' }}>
                              <strong>User Agent:</strong> {log.userAgent}
                            </div>
                          )}
                          <pre
                            style={{
                              margin: 0,
                              fontSize: 12,
                              whiteSpace: 'pre-wrap',
                              wordBreak: 'break-word',
                              background: 'var(--ld-surface)',
                              padding: 12,
                              borderRadius: 'var(--ld-radius)',
                              border: '1px solid var(--ld-border)',
                            }}
                          >
                            {JSON.stringify(log.metadata || {}, null, 2)}
                          </pre>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
                );
              })}
            </tbody>
          </table>
          <Pagination meta={meta} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}

function InfoChip({ label, value, mono }) {
  return (
    <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 6, padding: '6px 10px' }}>
      <div style={{ fontSize: 10, color: 'var(--ld-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 600, fontFamily: mono ? 'monospace' : undefined }}>{value}</div>
    </div>
  );
}
