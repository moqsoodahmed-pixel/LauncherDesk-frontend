import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuickActionsPanel from '../../../components/portal/dashboard/QuickActionsPanel';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import PageHeader from '../../../components/portal/PageHeader';
import StatCard from '../../../components/portal/StatCard';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import { fetchSuperAdminDashboard } from '../../../services/portal/dashboardApi';
import { formatMoney } from '../../../utils/portal/money';

const COLORS = ['#D4A574', '#10B981', '#F59E0B', '#F43F5E', '#0891B2', '#6366f1'];
const POLL_INTERVAL = 30000; // 30 seconds

// Build simple chart datasets from the flat dashboard numbers
function buildClientChartData(d) {
  return [
    { name: 'Active', value: d.activeClients ?? 0 },
    { name: 'Suspended', value: d.suspendedClients ?? 0 },
    { name: 'Pending', value: d.pendingClients ?? 0 },
    { name: 'Unassigned', value: d.unassignedClients ?? 0 },
  ];
}

function buildAdminChartData(d) {
  return [
    { name: 'Active', value: d.activeAdmins ?? 0 },
    { name: 'Disabled', value: d.disabledAdmins ?? 0 },
    { name: 'Suspended', value: d.suspendedAdmins ?? 0 },
  ];
}

function buildServiceChartData(d) {
  return [
    { name: 'Active', value: d.activeServices ?? 0 },
    { name: 'Inactive', value: d.inactiveServices ?? 0 },
    { name: 'Completed', value: d.completedServices ?? 0 },
    { name: 'KYC-Enabled', value: d.kycEnabledServices ?? 0 },
  ];
}

function buildOrderChartData(d) {
  return [
    { name: 'Created', value: d.createdOrders ?? 0 },
    { name: 'In Progress', value: d.inProgressOrders ?? 0 },
    { name: 'Completed', value: d.completedOrders ?? 0 },
    { name: 'Cancelled', value: d.cancelledOrders ?? 0 },
    { name: 'Pmt Pending', value: d.paymentPendingOrders ?? 0 },
  ];
}

function buildKycChartData(d) {
  return [
    { name: 'Pending', value: d.kycPending ?? 0 },
    { name: 'Approved', value: d.kycVerified ?? 0 },
    { name: 'Rejected', value: d.kycRejected ?? 0 },
    { name: 'Deleted', value: d.kycDeletionPending ?? 0 },
  ];
}

function buildPaymentChartData(d) {
  return [
    { name: 'Successful', value: d.successfulPayments ?? 0 },
    { name: 'Failed', value: d.failedPayments ?? 0 },
    { name: 'Refunded', value: d.refundedPayments ?? 0 },
  ];
}

function buildRevenueChartData(d) {
  return [
    { name: 'Revenue', value: +(d.revenue ?? 0).toFixed(2) },
    { name: 'Refunded', value: +(d.refundedAmount ?? 0).toFixed(2) },
    { name: 'Pending', value: +(d.paymentPendingValue ?? 0).toFixed(2) },
    { name: 'GST', value: +(d.gstCollected ?? 0).toFixed(2) },
  ];
}

function MiniDoughnut({ data }) {
  const filtered = data.filter((d) => d.value > 0);
  const display = filtered.length > 0 ? filtered : data;
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={display}
          cx="50%"
          cy="45%"
          innerRadius={52}
          outerRadius={78}
          dataKey="value"
          paddingAngle={2}
        >
          {display.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip formatter={(val, name) => [val, name]} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          formatter={(value) => <span style={{ color: '#374151' }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

function MiniBar({ data, color = '#D4A574' }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e3e6ee" />
        <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
        <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function SuperAdminDashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [sysHealth, setSysHealth] = useState(null);
  const intervalRef = useRef(null);

  async function load(showLoader = false) {
    if (showLoader) setLoading(true);
    setError('');
    try {
      const [result, healthRes] = await Promise.allSettled([
        fetchSuperAdminDashboard(),
        import('../../../services/portal/apiClient').then(m => m.default.get('/health/modules')),
      ]);
      if (result.status === 'fulfilled') setData(result.value);
      else setError(result.reason?.response?.data?.message || 'Failed to load dashboard.');
      if (healthRes.status === 'fulfilled') setSysHealth(healthRes.value.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard.');
    } finally {
      if (showLoader) setLoading(false);
    }
  }

  useEffect(() => {
    load(true);
    intervalRef.current = setInterval(() => load(false), POLL_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <PageHeader title="Super Admin Dashboard" subtitle="Platform-wide overview — auto-refreshes every 30 s" />
        <button className="ld-btn-secondary ld-btn-sm" onClick={() => load(false)} style={{ alignSelf: 'flex-start', marginTop: 2 }}>
          ↻ Refresh
        </button>
      </div>
      {data?.lastUpdated && (
        <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginBottom: 16 }}>
          Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
        </div>
      )}

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}

      {data && (
        <>
          {/* ── REVENUE RECOVERY BANNER ── */}
          {data && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(212,165,116,0.12) 0%, rgba(184,134,79,0.06) 100%)',
              border: '1px solid var(--ld-gold-border)',
              borderRadius: 'var(--ld-radius-lg)',
              padding: '20px 28px',
              marginBottom: 24,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 20,
              alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--ld-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>MRR</div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>₹{(data.mrr || 0).toLocaleString('en-IN')}</div>
                <div style={{ fontSize: 11, color: 'var(--ld-text-muted)' }}>This Month Revenue</div>
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--ld-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>ARR (Projected)</div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>₹{(data.arr || 0).toLocaleString('en-IN')}</div>
                <div style={{ fontSize: 11, color: 'var(--ld-text-muted)' }}>MRR × 12</div>
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--ld-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>GST Collected</div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>₹{(data.gstCollectedMonth || 0).toLocaleString('en-IN')}</div>
                <div style={{ fontSize: 11, color: 'var(--ld-text-muted)' }}>This Month</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, color: 'var(--ld-text-muted)', marginBottom: 4 }}>System Status</div>
                {sysHealth ? (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px',
                    borderRadius: 999, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                    background: sysHealth.data?.allHealthy ? '#dcfce7' : '#fee2e2',
                    border: `1px solid ${sysHealth.data?.allHealthy ? '#bbf7d0' : '#fca5a5'}`,
                    color: sysHealth.data?.allHealthy ? '#166534' : '#b91c1c',
                  }} onClick={() => navigate('/super-admin/system')}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                    {sysHealth.data?.allHealthy ? 'All Systems OK' : 'System Alert'}
                  </span>
                ) : null}
              </div>
            </div>
          )}

          {/* ── QUICK ACTIONS ── */}
          <div style={{ marginBottom: 24 }}>
            <QuickActionsPanel />
          </div>
          {/* ── CLIENT OVERVIEW ── */}
          <section className="ld-dashboard-section">
            <h2 className="ld-section-title">Client Overview</h2>
            <div className="ld-card-grid">
              <StatCard label="Total Clients" value={data.totalClients} to="/super-admin/clients" color="#D4A574" icon="▦" />
              <StatCard label="Active Clients" value={data.activeClients} to="/super-admin/clients?status=ACTIVE" color="#10B981" icon="◉" />
              <StatCard label="Suspended Clients" value={data.suspendedClients} to="/super-admin/clients?status=SUSPENDED" color="#F43F5E" icon="⊘" />
              <StatCard label="Pending Clients" value={data.pendingClients} to="/super-admin/clients?status=PENDING" color="#F59E0B" icon="◎" />
              <StatCard label="Unassigned Clients" value={data.unassignedClients} to="/super-admin/clients" color="#0891B2" icon="⊕" />
            </div>
            <div className="ld-chart-row">
              <div className="ld-chart-panel">
                <div className="ld-chart-title">Active vs Suspended vs Pending</div>
                <MiniDoughnut data={buildClientChartData(data)} />
              </div>
              <div className="ld-chart-panel">
                <div className="ld-chart-title">Client Status Distribution</div>
                <MiniBar data={buildClientChartData(data)} color="#2952e3" />
              </div>
            </div>
          </section>

          {/* ── ADMIN OVERVIEW ── */}
          <section className="ld-dashboard-section">
            <h2 className="ld-section-title">Admin Overview</h2>
            <div className="ld-card-grid">
              <StatCard label="Total Admins" value={data.totalAdmins} color="#D4A574" icon="◉" />
              <StatCard label="Active Admins" value={data.activeAdmins} to="/super-admin/admins?status=ACTIVE" color="#10B981" icon="◎" />
              <StatCard label="Disabled Admins" value={data.disabledAdmins} to="/super-admin/admins?status=DISABLED" color="#F43F5E" icon="⊘" />
              <StatCard label="Suspended Admins" value={data.suspendedAdmins} to="/super-admin/admins?status=SUSPENDED" color="#F59E0B" icon="⊙" />
              <StatCard label="Active Sessions" value={data.adminsWithActiveSessions} to="/super-admin/admins?status=ACTIVE" color="#0891B2" icon="⊕" />
            </div>
            <div className="ld-chart-row">
              <div className="ld-chart-panel">
                <div className="ld-chart-title">Active vs Disabled vs Suspended</div>
                <MiniDoughnut data={buildAdminChartData(data)} />
              </div>
              <div className="ld-chart-panel">
                <div className="ld-chart-title">Admin Status Distribution</div>
                <MiniBar data={buildAdminChartData(data)} color="#16a34a" />
              </div>
            </div>
          </section>

          {/* ── SERVICE OVERVIEW ── */}
          <section className="ld-dashboard-section">
            <h2 className="ld-section-title">Service Overview</h2>
            <div className="ld-card-grid">
              <StatCard label="Total Services" value={data.totalServices} color="#2952e3" />
              <StatCard label="Active Services" value={data.activeServices} to="/super-admin/services?status=ACTIVE" color="#16a34a" />
              <StatCard label="Inactive Services" value={data.inactiveServices} to="/super-admin/services?status=INACTIVE" color="#d97706" />
              <StatCard label="Completed Services" value={data.completedServices} to="/super-admin/services?status=COMPLETED" color="#7c3aed" />
              <StatCard label="KYC-Enabled Services" value={data.kycEnabledServices} to="/super-admin/services" color="#0891b2" />
              <StatCard label="Public Services" value={data.publicServices} to="/super-admin/services" color="#6b7280" />
            </div>
            <div className="ld-chart-row">
              <div className="ld-chart-panel">
                <div className="ld-chart-title">Service Status Distribution</div>
                <MiniDoughnut data={buildServiceChartData(data)} />
              </div>
              <div className="ld-chart-panel">
                <div className="ld-chart-title">Active vs Completed</div>
                <MiniBar data={buildServiceChartData(data)} color="#7c3aed" />
              </div>
            </div>
          </section>

          {/* ── ORDER OVERVIEW ── */}
          <section className="ld-dashboard-section">
            <h2 className="ld-section-title">Order Overview</h2>
            <div className="ld-card-grid">
              <StatCard label="Total Orders" value={data.totalOrders} to="/super-admin/orders" color="#2952e3" />
              <StatCard label="Today's Orders" value={data.todayOrders} to="/super-admin/orders" color="#0891b2" />
              <StatCard label="This Week" value={data.weekOrders} to="/super-admin/orders" color="#7c3aed" />
              <StatCard label="This Month" value={data.monthOrders} to="/super-admin/orders" color="#16a34a" />
              <StatCard label="In Progress" value={data.inProgressOrders} to="/super-admin/orders?status=IN_PROGRESS" color="#d97706" />
              <StatCard label="Assigned" value={data.assignedOrders} to="/super-admin/orders?status=ASSIGNED" color="#2952e3" />
              <StatCard label="Completed" value={data.completedOrders} to="/super-admin/orders?status=COMPLETED" color="#16a34a" />
              <StatCard label="Cancelled" value={data.cancelledOrders} to="/super-admin/orders?status=CANCELLED" color="#dc2626" />
              <StatCard label="Payment Pending" value={data.paymentPendingOrders} to="/super-admin/orders?status=PAYMENT_PENDING" color="#d97706" />
              <StatCard label="Closed" value={data.closedOrders} to="/super-admin/orders?status=CLOSED" color="#6b7280" />
            </div>
            <div className="ld-chart-row">
              <div className="ld-chart-panel">
                <div className="ld-chart-title">Order Status Distribution</div>
                <MiniDoughnut data={buildOrderChartData(data)} />
              </div>
              <div className="ld-chart-panel">
                <div className="ld-chart-title">Orders by Stage</div>
                <MiniBar data={buildOrderChartData(data)} color="#d97706" />
              </div>
            </div>
          </section>

          {/* ── FINANCIAL OVERVIEW ── */}
          <section className="ld-dashboard-section">
            <h2 className="ld-section-title">Financial Overview</h2>
            <div className="ld-card-grid">
              <StatCard label="Total Revenue (₹)" value={formatMoney(data.revenue)} to="/super-admin/payments?status=CONFIRMED" color="#16a34a" />
              <StatCard label="Today's Revenue (₹)" value={formatMoney(data.todayRevenue)} to="/super-admin/payments" color="#0891b2" />
              <StatCard label="Weekly Revenue (₹)" value={formatMoney(data.weeklyRevenue)} to="/super-admin/payments" color="#7c3aed" />
              <StatCard label="Monthly Revenue (₹)" value={formatMoney(data.monthlyRevenue)} to="/super-admin/payments" color="#2952e3" />
              <StatCard label="Net Revenue (₹)" value={formatMoney(data.netRevenue)} to="/super-admin/payments?status=CONFIRMED" color="#16a34a" />
              <StatCard label="GST Collected (₹)" value={formatMoney(data.gstCollected)} to="/super-admin/payments?status=CONFIRMED" color="#0891b2" />
              <StatCard label="Pending Value (₹)" value={formatMoney(data.paymentPendingValue)} to="/super-admin/payments?status=CREATED" color="#d97706" />
              <StatCard label="Refunded (₹)" value={formatMoney(data.refundedAmount)} to="/super-admin/payments?status=REFUNDED" color="#dc2626" />
              <StatCard label="Successful Payments" value={data.successfulPayments} to="/super-admin/payments?status=CONFIRMED" color="#16a34a" />
              <StatCard label="Failed Payments" value={data.failedPayments} to="/super-admin/payments?status=FAILED" color="#dc2626" />
              <StatCard label="Refunded Payments" value={data.refundedPayments} to="/super-admin/payments?status=REFUNDED" color="#7c3aed" />
              <StatCard label="Avg. Transaction (₹)" value={formatMoney(data.avgTransactionValue)} color="#6b7280" />
            </div>
            <div className="ld-chart-row">
              <div className="ld-chart-panel">
                <div className="ld-chart-title">Payment Status Distribution</div>
                <MiniDoughnut data={buildPaymentChartData(data)} />
              </div>
              <div className="ld-chart-panel">
                <div className="ld-chart-title">Revenue vs Refunds vs Pending</div>
                <MiniBar data={buildRevenueChartData(data)} color="#16a34a" />
              </div>
            </div>
          </section>

          {/* ── KYC OVERVIEW ── */}
          <section className="ld-dashboard-section">
            <h2 className="ld-section-title">KYC Overview</h2>
            <div className="ld-card-grid">
              <StatCard label="KYC Pending" value={data.kycPending} to="/super-admin/kyc?status=UPLOADED" color="#d97706" />
              <StatCard label="KYC Submitted" value={data.kycSubmitted} to="/super-admin/kyc?status=UPLOADED" color="#0891b2" />
              <StatCard label="Under KYC Review" value={data.kycUnderVerification} to="/super-admin/orders?status=KYC_VERIFICATION" color="#2952e3" />
              <StatCard label="KYC Approved" value={data.kycVerified} to="/super-admin/kyc?status=VERIFIED" color="#16a34a" />
              <StatCard label="KYC Rejected" value={data.kycRejected} to="/super-admin/kyc?status=REJECTED" color="#dc2626" />
              <StatCard label="Orders in KYC Flow" value={data.kycDeletionPending} to="/super-admin/kyc" color="#7c3aed" />
            </div>
            <div className="ld-chart-row">
              <div className="ld-chart-panel">
                <div className="ld-chart-title">KYC Status Distribution</div>
                <MiniDoughnut data={buildKycChartData(data)} />
              </div>
              <div className="ld-chart-panel">
                <div className="ld-chart-title">Approval vs Rejection</div>
                <MiniBar data={buildKycChartData(data)} color="#dc2626" />
              </div>
            </div>
          </section>
          {/* ── WORKFLOW & SUPPORT QUEUES ── */}
          {(data.workflowStats || data.ticketStats) && (
            <section className="ld-dashboard-section">
              <h2 className="ld-section-title">Operations Queues</h2>
              <div className="ld-card-grid">
                {data.workflowStats && (
                  <>
                    <StatCard label="Open Tasks" value={data.workflowStats.open} to="/super-admin/workflow" color="#d97706" />
                    <StatCard label="Tasks In Progress" value={data.workflowStats.inProgress} to="/super-admin/workflow" color="#2952e3" />
                    <StatCard label="Overdue Tasks" value={data.workflowStats.overdue} to="/super-admin/workflow" color="#dc2626" />
                    <StatCard label="Tasks Due Today" value={data.workflowStats.dueToday} to="/super-admin/workflow" color="#7c3aed" />
                  </>
                )}
                {data.ticketStats && (
                  <>
                    <StatCard label="Open Tickets" value={data.ticketStats.open} to="/super-admin/support" color="#0891b2" />
                    <StatCard label="Waiting Tickets" value={data.ticketStats.waiting} to="/super-admin/support" color="#d97706" />
                    <StatCard label="Resolved Tickets" value={data.ticketStats.resolved} to="/super-admin/support" color="#16a34a" />
                    <StatCard label="Total Tickets" value={data.ticketStats.total} to="/super-admin/support" color="#6b7280" />
                  </>
                )}
              </div>
            </section>
          )}

          {/* ── RECENT ACTIVITY ── */}
          {data.recentActivity && data.recentActivity.length > 0 && (
            <section className="ld-dashboard-section">
              <h2 className="ld-section-title">Recent Activity</h2>
              <div style={{ background: 'var(--ld-glass-bg)', backdropFilter: 'var(--ld-glass-blur)', WebkitBackdropFilter: 'var(--ld-glass-blur)', border: 'var(--ld-glass-border)', borderRadius: 'var(--ld-radius-lg)', overflow: 'hidden', boxShadow: 'var(--ld-shadow-sm)' }}>
                {data.recentActivity.map((log, i) => (
                  <div key={log._id || i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    padding: '12px 16px',
                    borderBottom: i < data.recentActivity.length - 1 ? '1px solid var(--ld-border)' : 'none',
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      background: '#eff6ff', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: 14,
                    }}>
                      {log.action?.startsWith('CREATE') ? '➕' :
                       log.action?.startsWith('UPDATE') ? '✏️' :
                       log.action?.startsWith('DELETE') ? '🗑️' :
                       log.action?.includes('LOGIN') ? '🔑' : '📋'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>
                        {log.performedBy?.name || 'System'}
                        <span style={{ color: 'var(--ld-text-muted)', fontWeight: 400 }}> · {log.action}</span>
                      </div>
                      {log.description && (
                        <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {log.description}
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', flexShrink: 0, paddingTop: 2 }}>
                      {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
                <div style={{ padding: '10px 16px', textAlign: 'center', display: 'flex', gap: 16, justifyContent: 'center' }}>
                  <span onClick={() => navigate('/super-admin/audit-logs')} style={{ fontSize: 12, color: 'var(--ld-primary)', cursor: 'pointer', fontWeight: 600 }}>
                    Full Audit Log →
                  </span>
                  <span onClick={() => navigate('/super-admin/activity')} style={{ fontSize: 12, color: 'var(--ld-primary)', cursor: 'pointer', fontWeight: 600 }}>
                    Activity Timeline →
                  </span>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
