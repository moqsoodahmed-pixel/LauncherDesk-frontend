import { useCallback, useEffect, useState } from 'react';
import PageHeader from '../../../components/portal/PageHeader';
import apiClient from '../../../services/portal/apiClient';
import { getWorkflowStats } from '../../../services/portal/tasksApi';
import { getAdminTicketStats } from '../../../services/portal/supportApi';

function StatusDot({ ok }) {
  return (
    <span style={{
      display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
      background: ok ? '#16a34a' : '#dc2626', marginRight: 8, flexShrink: 0,
    }} />
  );
}

function MonitorCard({ title, children }) {
  return (
    <div style={{
      background: 'var(--ld-surface)', border: '1px solid var(--ld-border)',
      borderRadius: 10, padding: '16px 20px', marginBottom: 16,
    }}>
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>{title}</div>
      {children}
    </div>
  );
}

function Row({ label, value, ok }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 0', borderBottom: '1px solid var(--ld-border)', fontSize: 13,
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {ok !== undefined && <StatusDot ok={ok} />}
        <span style={{ color: 'var(--ld-text-muted)' }}>{label}</span>
      </div>
      <span style={{ fontWeight: 600 }}>{value ?? '—'}</span>
    </div>
  );
}

export default function SystemMonitorPage() {
  const [health, setHealth] = useState(null);
  const [workflow, setWorkflow] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [modules, setModules] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const load = useCallback(async () => {
    try {
      const [healthRes, wf, tk, modRes] = await Promise.allSettled([
        apiClient.get('/health'),
        getWorkflowStats(),
        getAdminTicketStats(),
        apiClient.get('/health/modules'),
      ]);
      if (healthRes.status === 'fulfilled') setHealth(healthRes.value.data);
      if (wf.status === 'fulfilled') setWorkflow(wf.value);
      if (tk.status === 'fulfilled') setTickets(tk.value);
      if (modRes.status === 'fulfilled') setModules(modRes.value.data);
      setLastUpdated(new Date());
    } catch {
      // partial failures handled per-item above
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, [load]);

  const apiOk = !!health?.success;
  const now = new Date();
  const serverTime = lastUpdated ? lastUpdated.toLocaleTimeString() : '—';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <PageHeader
          title="System Monitor"
          subtitle="Live platform health and queue status. Refreshes every 30 seconds."
        />
        <button className="ld-btn-secondary ld-btn-sm" onClick={load} style={{ marginTop: 4 }}>
          ↻ Refresh
        </button>
      </div>

      {lastUpdated && (
        <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginBottom: 16 }}>
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}

      {loading && !health && (
        <div style={{ color: 'var(--ld-text-muted)', fontSize: 13 }}>Loading system status…</div>
      )}

      {modules && (
        <div style={{
          background: modules.data?.allHealthy ? '#dcfce7' : '#fee2e2',
          border: `1px solid ${modules.data?.allHealthy ? '#bbf7d0' : '#fca5a5'}`,
          borderRadius: 8, padding: '10px 16px', marginBottom: 16,
          color: modules.data?.allHealthy ? '#166534' : '#b91c1c',
          fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span>{modules.data?.allHealthy ? '🟢' : '🔴'}</span>
          {modules.data?.allHealthy ? 'All Systems Operational' : 'System Health Issue Detected — Review Platform Modules'}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <MonitorCard title="API & Connectivity">
          <Row label="API Status" value={apiOk ? 'Operational' : 'Unreachable'} ok={apiOk} />
          <Row label="API Response" value={health?.message || '—'} ok={apiOk} />
          <Row label="Server Time" value={health?.data?.timestamp ? new Date(health.data.timestamp).toLocaleTimeString() : serverTime} ok={apiOk} />
          <Row label="Client Time" value={now.toLocaleTimeString()} />
        </MonitorCard>

        <MonitorCard title="Workflow Queue">
          <Row label="Open Tasks" value={workflow?.open ?? '—'} ok={workflow ? workflow.open < 100 : undefined} />
          <Row label="In Progress" value={workflow?.inProgress ?? '—'} />
          <Row label="Overdue Tasks" value={workflow?.overdue ?? '—'} ok={workflow ? workflow.overdue === 0 : undefined} />
          <Row label="Due Today" value={workflow?.dueToday ?? '—'} />
        </MonitorCard>

        <MonitorCard title="Support Queue">
          <Row label="Open Tickets" value={tickets?.open ?? '—'} ok={tickets ? tickets.open < 50 : undefined} />
          <Row label="Waiting (Client Reply)" value={tickets?.waiting ?? '—'} />
          <Row label="Resolved" value={tickets?.resolved ?? '—'} ok />
          <Row label="Total Tickets" value={tickets?.total ?? '—'} />
        </MonitorCard>

        <MonitorCard title="Platform Modules">
          {modules ? Object.values(modules.data?.modules || {}).map(mod => (
            <Row
              key={mod.label}
              label={mod.label}
              value={mod.warning || mod.status}
              ok={mod.healthy}
            />
          )) : <Row label="Loading..." value="—" />}
        </MonitorCard>
      </div>

      {workflow?.teamBreakdown && Object.keys(workflow.teamBreakdown).length > 0 && (
        <MonitorCard title="Active Tasks by Team">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {Object.entries(workflow.teamBreakdown).map(([team, count]) => (
              <div key={team} style={{
                background: 'var(--ld-bg)', border: '1px solid var(--ld-border)',
                borderRadius: 8, padding: '8px 14px', textAlign: 'center', minWidth: 100,
              }}>
                <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginBottom: 2 }}>{team}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--ld-primary)' }}>{count}</div>
              </div>
            ))}
          </div>
        </MonitorCard>
      )}

      <div style={{
        background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8,
        padding: '12px 16px', fontSize: 12, color: '#166534', marginTop: 8,
      }}>
        System monitor shows real-time queue health from live database counts. All modules are managed by the application server — no external infrastructure monitoring required.
      </div>
    </div>
  );
}
