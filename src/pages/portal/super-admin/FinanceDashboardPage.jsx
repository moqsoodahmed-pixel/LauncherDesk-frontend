import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import { getFinanceDashboard, getRevenueTrend, getPaymentMethods } from '../../../services/portal/financeApi';

function rupees(v) {
  if (v == null) return '—';
  return `₹${Number(v).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function StatCard({ label, value, sub, color }) {
  return (
    <div style={{
      background: 'var(--ld-surface)', border: '1px solid var(--ld-border)',
      borderRadius: 10, padding: '18px 20px',
      borderLeft: color ? `4px solid ${color}` : undefined,
    }}>
      <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ld-text)' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

const PERIOD_LABELS = { today: 'Today', week: 'This Week', month: 'This Month', all: 'All Time' };
const PERIOD_KEYS = ['today', 'week', 'month', 'all'];
const PIE_COLORS = ['#D4A574', '#10B981', '#F59E0B', '#F43F5E', '#0891B2', '#6366f1'];

export default function FinanceDashboardPage() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('month');
  const [dashboard, setDashboard] = useState(null);
  const [trend, setTrend] = useState([]);
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [d, t, m] = await Promise.all([
        getFinanceDashboard(),
        getRevenueTrend(12),
        getPaymentMethods(),
      ]);
      setDashboard(d);
      setTrend(t);
      setMethods(m);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load finance data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!dashboard) return null;

  const p = dashboard[period] || {};
  const statusBreakdown = dashboard.statusBreakdown || [];
  const gstBreakdown = dashboard.gstBreakdown || [];

  return (
    <div>
      <PageHeader title="Finance Control Center" subtitle="Revenue, payments, GST, refunds — consolidated view" />

      {/* Period selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {PERIOD_KEYS.map((k) => (
          <button
            key={k}
            className={period === k ? 'ld-btn-primary ld-btn-sm' : 'ld-btn-secondary ld-btn-sm'}
            onClick={() => setPeriod(k)}
          >
            {PERIOD_LABELS[k]}
          </button>
        ))}
        <button className="ld-btn-secondary ld-btn-sm" style={{ marginLeft: 'auto' }} onClick={load}>
          Refresh
        </button>
      </div>

      {/* Top KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        <StatCard label="Gross Revenue" value={rupees(p.grossRevenue)} color="#6366f1" />
        <StatCard label="Net Revenue (After Refunds)" value={rupees(p.netRevenue)} color="#10b981" />
        <StatCard label="GST Collected" value={rupees(p.gstCollected)} color="#f59e0b" />
        <StatCard label="Refunds Issued" value={rupees(p.refundsIssued)} sub={`${p.refundCount || 0} transactions`} color="#ef4444" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <StatCard label="Confirmed Payments" value={p.confirmedCount || 0} />
        <StatCard label="Pending Payments" value={p.pendingCount || 0} />
        <StatCard label="Failed Payments" value={p.failedCount || 0} />
        <StatCard label="Avg Order Value" value={rupees(p.avgOrderValue)} />
      </div>

      {/* Revenue Trend */}
      <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 10, padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Revenue Trend (12 Months)</div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={trend} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--ld-border)" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v) => rupees(v)} />
            <Area type="monotone" dataKey="grossRevenue" stroke="#6366f1" fill="url(#revGrad)" name="Gross Revenue" />
            <Area type="monotone" dataKey="netRevenue" stroke="#10b981" fill="none" strokeDasharray="4 2" name="Net Revenue" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Payment Status Breakdown */}
        <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 10, padding: '16px 20px' }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Payment Status Breakdown</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusBreakdown} dataKey="totalRupees" nameKey="_id" cx="50%" cy="50%" outerRadius={70} label={({ _id, percent }) => `${_id} ${(percent * 100).toFixed(0)}%`}>
                {statusBreakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => rupees(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods */}
        <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 10, padding: '16px 20px' }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Payment Methods</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={methods} layout="vertical" margin={{ left: 40, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--ld-border)" />
              <XAxis type="number" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="_id" tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => rupees(v)} />
              <Bar dataKey="totalRupees" fill="#6366f1" name="Revenue" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GST Breakdown */}
      {gstBreakdown.length > 0 && (
        <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 10, padding: '16px 20px', marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>GST Breakdown by Service</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--ld-bg)' }}>
                {['Service', 'Orders', 'Base Amount', 'GST Amount', 'Total'].map((h) => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, fontSize: 11, color: 'var(--ld-text-muted)', borderBottom: '1px solid var(--ld-border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gstBreakdown.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--ld-border)' }}>
                  <td style={{ padding: '9px 12px', fontWeight: 600 }}>{row.serviceName || row._id}</td>
                  <td style={{ padding: '9px 12px' }}>{row.orderCount}</td>
                  <td style={{ padding: '9px 12px' }}>{rupees(row.baseAmount)}</td>
                  <td style={{ padding: '9px 12px', color: '#f59e0b', fontWeight: 600 }}>{rupees(row.gstAmount)}</td>
                  <td style={{ padding: '9px 12px', fontWeight: 700 }}>{rupees((row.baseAmount || 0) + (row.gstAmount || 0))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Quick links */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate('/super-admin/payments')}>
          All Payments
        </button>
        <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate('/super-admin/orders')}>
          All Orders
        </button>
        <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate('/super-admin/reports')}>
          Reports
        </button>
      </div>
    </div>
  );
}
