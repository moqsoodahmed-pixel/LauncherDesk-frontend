import { useCallback, useEffect, useRef, useState } from 'react';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import Pagination from '../../../components/portal/Pagination';
import { getAuditLogs } from '../../../services/portal/auditLogsApi';

const LOGIN_ACTIONS = ['LOGIN_SUCCESS', 'LOGIN_FAILED', 'LOGOUT', 'LOGOUT_ALL'];

function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: 'var(--ld-surface)', border: '1px solid var(--ld-border)',
      borderRadius: 10, padding: '16px 20px',
      borderTop: color ? `3px solid ${color}` : undefined,
    }}>
      <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800 }}>{value ?? '—'}</div>
    </div>
  );
}

function parseUserAgent(ua = '') {
  let browser = 'Unknown';
  let os = 'Unknown';
  let device = 'Desktop';

  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/Chrome/i.test(ua)) browser = 'Chrome';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';
  else if (/Safari/i.test(ua)) browser = 'Safari';
  else if (/Opera|OPR/i.test(ua)) browser = 'Opera';

  if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Mac OS X/i.test(ua)) os = 'macOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad/i.test(ua)) os = 'iOS';
  else if (/Linux/i.test(ua)) os = 'Linux';

  if (/Mobi|Android/i.test(ua)) device = 'Mobile';
  else if (/Tablet|iPad/i.test(ua)) device = 'Tablet';

  return { browser, os, device };
}

function ActionBadge({ action }) {
  const style = {
    LOGIN_SUCCESS: { bg: '#dcfce7', color: '#15803d' },
    LOGIN_FAILED: { bg: '#fee2e2', color: '#b91c1c' },
    LOGOUT: { bg: '#f3f4f6', color: '#374151' },
    LOGOUT_ALL: { bg: '#fef9c3', color: '#a16207' },
  }[action] || { bg: '#f3f4f6', color: '#374151' };

  return (
    <span style={{
      fontSize: 11, background: style.bg, color: style.color,
      padding: '2px 8px', borderRadius: 999, fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.04em',
    }}>
      {action?.replace(/_/g, ' ')}
    </span>
  );
}

export default function LoginHistoryPage() {
  const [logs, setLogs] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ monthLogins: null, failedAttempts: null, uniqueIps: null });

  const [search, setSearch] = useState('');
  const [action, setAction] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);
  const debounceRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getAuditLogs({
        page,
        limit: 25,
        action: action || LOGIN_ACTIONS.join(','),
        search,
        dateFrom,
        dateTo,
        sortBy: 'createdAt',
        sortDir: 'desc',
      });
      setLogs(result.items || result.data || []);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load login history.');
    } finally {
      setLoading(false);
    }
  }, [page, search, action, dateFrom, dateTo]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    Promise.all([
      getAuditLogs({ action: 'LOGIN_SUCCESS', dateFrom: monthStart.toISOString(), limit: 1 }),
      getAuditLogs({ action: 'LOGIN_FAILED', limit: 1 }),
      getAuditLogs({ action: LOGIN_ACTIONS.join(','), limit: 100 }),
    ]).then(([successRes, failedRes, allRes]) => {
      const allLogs = allRes?.data || allRes?.items || [];
      const ips = new Set(allLogs.map((l) => l.ipAddress || l.metadata?.ipAddress || l.metadata?.ip || l.ip).filter(Boolean));
      setStats({
        monthLogins: successRes?.meta?.total ?? 0,
        failedAttempts: failedRes?.meta?.total ?? 0,
        uniqueIps: ips.size,
      });
    }).catch(() => {});
  }, []);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setPage(1);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {}, 350);
  }

  const hasFilter = search || action || dateFrom || dateTo;

  return (
    <div>
      <PageHeader title="Login History" subtitle="All authentication events across the platform — logins, failures, and logouts." />

      {/* Summary Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Logins This Month" value={stats.monthLogins} color="#10b981" />
        <StatCard label="Failed Attempts" value={stats.failedAttempts} color="#ef4444" />
        <StatCard label="Unique IP Addresses" value={stats.uniqueIps} color="#6366f1" />
      </div>

      <div className="ld-toolbar" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1 }}>
          <input
            className="ld-form-input"
            placeholder="Search user, IP address…"
            value={search}
            onChange={handleSearchChange}
            style={{ width: 240 }}
          />
          <select value={action} onChange={(e) => { setAction(e.target.value); setPage(1); }}>
            <option value="">All events</option>
            {LOGIN_ACTIONS.map((a) => <option key={a} value={a}>{a.replace(/_/g, ' ')}</option>)}
          </select>
          <input className="ld-form-input" type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setPage(1); }} title="From date" style={{ width: 140 }} />
          <input className="ld-form-input" type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value); setPage(1); }} title="To date" style={{ width: 140 }} />
          {hasFilter && (
            <button className="ld-btn-secondary ld-btn-sm" onClick={() => { setSearch(''); setAction(''); setDateFrom(''); setDateTo(''); setPage(1); }}>
              Clear
            </button>
          )}
        </div>
        {meta && <span style={{ fontSize: 13, color: 'var(--ld-text-muted)', alignSelf: 'center' }}>{meta.total} events</span>}
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && logs.length === 0 && <EmptyState message="No login events found." />}

      {!loading && !error && logs.length > 0 && (
        <div className="ld-table-wrap">
          <table className="ld-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>User</th>
                <th>Role</th>
                <th>IP Address</th>
                <th>Browser</th>
                <th>OS</th>
                <th>Device</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => {
                const ua = parseUserAgent(log.userAgent || log.metadata?.userAgent || '');
                const ip = log.ipAddress || log.metadata?.ipAddress || '—';
                return (
                  <tr key={log.id || log._id}>
                    <td><ActionBadge action={log.action} /></td>
                    <td style={{ fontSize: 13 }}>
                      <div style={{ fontWeight: 600 }}>{log.actorName || log.actor?.name || '—'}</div>
                      <div style={{ fontSize: 11, color: 'var(--ld-text-muted)' }}>{log.actorEmail || log.actor?.email || ''}</div>
                    </td>
                    <td style={{ fontSize: 12 }}>{log.actorRole || '—'}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{ip}</td>
                    <td style={{ fontSize: 12 }}>{ua.browser}</td>
                    <td style={{ fontSize: 12 }}>{ua.os}</td>
                    <td style={{ fontSize: 12 }}>{ua.device}</td>
                    <td style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
                      {log.createdAt ? new Date(log.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'medium' }) : '—'}
                    </td>
                  </tr>
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
