import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import StatCard from '../../../components/portal/StatCard';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import { fetchAdminDashboard } from '../../../services/portal/dashboardApi';
import formatRelativeTime from '../../../utils/portal/formatRelativeTime';

const POLL_INTERVAL = 45000;

const ACTION_LABELS = {
  CLIENT_CREATED: 'Client created',
  ORDER_CREATED: 'Order created',
  ORDER_STATUS_CHANGED: 'Order status updated',
  KYC_VERIFIED: 'KYC verified',
  KYC_REJECTED: 'KYC rejected',
  TASK_UPDATED: 'Task updated',
  TASK_COMPLETED: 'Task completed',
};

function SectionHeader({ title }) {
  return (
    <div style={{
      fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em',
      color: 'var(--ld-text-muted)', marginBottom: 10, marginTop: 24,
    }}>
      {title}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  function load(showLoader = false) {
    if (showLoader) setLoading(true);
    setError('');
    fetchAdminDashboard()
      .then(setData)
      .catch((err) => setError(err.response?.data?.message || 'Failed to load dashboard.'))
      .finally(() => { if (showLoader) setLoading(false); });
  }

  useEffect(() => {
    load(true);
    intervalRef.current = setInterval(() => load(false), POLL_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <PageHeader title="My Dashboard" subtitle="Your assigned clients, orders, tasks, and activity" />
        <button className="ld-btn-secondary ld-btn-sm" onClick={() => load(false)} style={{ alignSelf: 'flex-start', marginTop: 2 }}>
          ↻ Refresh
        </button>
      </div>

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} />}

      {data && (
        <>
          {/* SLA alert banner */}
          {data.slaBreached > 0 && (
            <div
              onClick={() => navigate('/admin/sla')}
              style={{
                background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8,
                padding: '10px 16px', marginBottom: 16, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
              }}
            >
              <span style={{ fontSize: 18 }}>⚠️</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#b91c1c' }}>
                {data.slaBreached} SLA breach{data.slaBreached !== 1 ? 'es' : ''} — click to review
              </span>
            </div>
          )}

          {/* Clients */}
          <SectionHeader title="My Clients" />
          <div className="ld-card-grid">
            <StatCard label="Total Clients" value={data.myClients} to="/admin/clients" color="#2952e3" />
            <StatCard label="Active" value={data.activeClients} to="/admin/clients?status=ACTIVE" color="#16a34a" />
            <StatCard label="Pending" value={data.pendingClients} to="/admin/clients?status=PENDING" color="#d97706" />
            <StatCard label="Suspended" value={data.suspendedClients} to="/admin/clients?status=SUSPENDED" color="#dc2626" />
          </div>

          {/* Orders */}
          <SectionHeader title="My Orders" />
          <div className="ld-card-grid">
            <StatCard label="Total Orders" value={data.myOrders} to="/admin/orders" color="#2952e3" />
            <StatCard label="In Progress" value={data.inProgressOrders} to="/admin/orders?status=IN_PROGRESS" color="#d97706" />
            <StatCard label="Pending" value={data.pendingOrders} to="/admin/orders?status=ASSIGNED" color="#0891b2" />
            <StatCard label="Due Today" value={data.ordersDueToday} to="/admin/queue?group=due_today" color="#7c3aed" />
            <StatCard label="Completed" value={data.completedOrders} to="/admin/orders?status=COMPLETED" color="#16a34a" />
            <StatCard label="SLA Breached" value={data.slaBreached} to="/admin/sla" color="#b91c1c" />
          </div>

          {/* KYC */}
          <SectionHeader title="KYC Workspace" />
          <div className="ld-card-grid">
            <StatCard label="Pending Review" value={data.kycPendingCount} to="/admin/kyc?status=UPLOADED" color="#d97706" />
            <StatCard label="Under Review" value={data.kycUnderReviewCount} to="/admin/kyc?status=UNDER_REVIEW" color="#2952e3" />
            <StatCard label="Rejected" value={data.kycRejectedCount} to="/admin/kyc?status=REJECTED" color="#dc2626" />
          </div>

          {/* Tasks */}
          <SectionHeader title="My Tasks" />
          <div className="ld-card-grid">
            <StatCard label="Pending" value={data.taskPending} to="/admin/tasks?status=PENDING" color="#d97706" />
            <StatCard label="In Progress" value={data.taskInProgress} to="/admin/tasks?status=IN_PROGRESS" color="#2952e3" />
            <StatCard label="Overdue" value={data.taskOverdue} to="/admin/tasks?overdue=true" color="#b91c1c" />
            <StatCard label="Completed Today" value={data.taskCompletedToday} to="/admin/tasks?status=COMPLETED" color="#16a34a" />
          </div>

          {/* Support */}
          <SectionHeader title="Support Tickets" />
          <div className="ld-card-grid">
            <StatCard label="Open" value={data.supportOpen} to="/admin/support?status=OPEN" color="#d97706" />
            <StatCard label="In Progress" value={data.supportInProgress} to="/admin/support?status=IN_PROGRESS" color="#2952e3" />
            <StatCard label="Resolved" value={data.supportResolved} to="/admin/support?status=RESOLVED" color="#16a34a" />
          </div>

          {/* Recent Activity */}
          {data.recentActivity?.length > 0 && (
            <>
              <SectionHeader title="Recent Activity" />
              <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 8, overflow: 'hidden' }}>
                {data.recentActivity.map((a, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 16px',
                    borderBottom: i < data.recentActivity.length - 1 ? '1px solid var(--ld-border)' : 'none',
                    fontSize: 13,
                  }}>
                    <span style={{ color: 'var(--ld-text)' }}>{ACTION_LABELS[a.action] || a.action}</span>
                    <span style={{ color: 'var(--ld-text-muted)', fontSize: 12 }}>
                      {a.resourceType} · {formatRelativeTime(a.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div style={{ marginTop: 12, fontSize: 11, color: 'var(--ld-text-muted)' }}>
            Scope: clients={data.dataScope?.clients} · orders={data.dataScope?.orders}
            {data.lastUpdated && ` · Updated ${formatRelativeTime(data.lastUpdated)}`}
          </div>
        </>
      )}
    </div>
  );
}
