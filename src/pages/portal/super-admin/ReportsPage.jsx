import { useCallback, useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import PageHeader from '../../../components/portal/PageHeader';
import StatCard from '../../../components/portal/StatCard';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import Pagination from '../../../components/portal/Pagination';
import ReportDateRangeFilter from '../../../components/portal/reports/ReportDateRangeFilter';
import { triggerBlobDownload } from '../../../components/portal/kyc/kycDownload';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';
import { ORDER_STATUS_LABELS } from '../../../constants/portal/orderStatus';
import { formatMoney } from '../../../utils/portal/money';
import {
  getOverview,
  getOrders,
  getRevenue,
  getServices,
  getClients,
  getAdmins,
  getKyc,
  exportOrders,
  exportRevenue,
  exportServices,
} from '../../../services/portal/reportsApi';

// Small categorical palette built from the existing design tokens
// (--ld-primary/success/warning/danger) plus two extra hues, reused across
// every chart on this page rather than invented per-chart.
const CHART_COLORS = ['#D4A574', '#10B981', '#F59E0B', '#F43F5E', '#0891B2', '#6366f1'];

function money(value) {
  return formatMoney(value, { fallback: '—' });
}

function ChartPanel({ title, children, empty }) {
  return (
    <div className="ld-panel" style={{ marginBottom: 20 }}>
      <h3 style={{ margin: '0 0 12px', fontSize: 15 }}>{title}</h3>
      {empty ? <EmptyState message="No data for this period." /> : <div style={{ width: '100%', height: 280 }}>{children}</div>}
    </div>
  );
}

export default function ReportsPage() {
  const { hasPermission } = useAuth();
  const canView = hasPermission(PERMISSIONS.VIEW_REPORTS);
  const canExport = hasPermission(PERMISSIONS.EXPORT_REPORTS);

  const [range, setRange] = useState({ period: 'LAST_30_DAYS', from: '', to: '' });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [overview, setOverview] = useState(null);
  const [orders, setOrders] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [kyc, setKyc] = useState(null);

  const [servicesSort, setServicesSort] = useState('orderCount');
  const [services, setServices] = useState(null);
  const [servicesLoading, setServicesLoading] = useState(true);

  const [admins, setAdmins] = useState(null);
  const [adminsLoading, setAdminsLoading] = useState(true);

  const [clientsPage, setClientsPage] = useState(1);
  const [clients, setClients] = useState(null);
  const [clientsLoading, setClientsLoading] = useState(true);

  const [exporting, setExporting] = useState('');
  const [toast, setToast] = useState('');

  const loadMain = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [ov, ord, rev, ky] = await Promise.all([
        getOverview(range),
        getOrders(range),
        getRevenue(range),
        getKyc(range),
      ]);
      setOverview(ov.data);
      setOrders(ord.data);
      setRevenue(rev.data);
      setKyc(ky.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load reports.');
    } finally {
      setLoading(false);
    }
  }, [range]);

  const loadServices = useCallback(async () => {
    setServicesLoading(true);
    try {
      const result = await getServices({ ...range, sort: servicesSort });
      setServices(result.data);
    } catch {
      setServices(null);
    } finally {
      setServicesLoading(false);
    }
  }, [range, servicesSort]);

  const loadAdmins = useCallback(async () => {
    setAdminsLoading(true);
    try {
      const result = await getAdmins(range);
      setAdmins(result.data);
    } catch {
      setAdmins(null);
    } finally {
      setAdminsLoading(false);
    }
  }, [range]);

  const loadClients = useCallback(async () => {
    setClientsLoading(true);
    try {
      const result = await getClients({ ...range, page: clientsPage, limit: 10 });
      setClients(result.data);
    } catch {
      setClients(null);
    } finally {
      setClientsLoading(false);
    }
  }, [range, clientsPage]);

  useEffect(() => {
    if (!canView) return;
    loadMain();
  }, [canView, loadMain]);

  useEffect(() => {
    if (!canView) return;
    loadServices();
  }, [canView, loadServices]);

  useEffect(() => {
    if (!canView) return;
    loadAdmins();
  }, [canView, loadAdmins]);

  useEffect(() => {
    if (!canView) return;
    loadClients();
  }, [canView, loadClients]);

  useEffect(() => {
    setClientsPage(1);
  }, [range]);

  async function handleExport(kind) {
    setExporting(kind);
    setToast('');
    try {
      const fn = { orders: exportOrders, revenue: exportRevenue, services: exportServices }[kind];
      const extra = kind === 'services' ? { sort: servicesSort } : {};
      const { blob, fileName } = await fn({ ...range, ...extra });
      triggerBlobDownload({ blob, fileName });
    } catch (err) {
      setToast(err.response?.data?.message || 'Export failed.');
    } finally {
      setExporting('');
    }
  }

  if (!canView) {
    return (
      <div>
        <PageHeader title="Reports" subtitle="Analytics & reporting" />
        <ErrorState message="You do not have permission to view reports." />
      </div>
    );
  }

  const byStatusData = orders
    ? Object.entries(orders.breakdowns.byStatus || {})
        .filter(([, count]) => count > 0)
        .map(([status, count]) => ({ name: ORDER_STATUS_LABELS[status] || status, value: count }))
    : [];

  const byServiceData = revenue?.breakdowns?.byService || [];
  const servicesRows = services?.breakdowns?.services || [];
  const adminsRows = admins?.breakdowns?.admins || [];
  const clientsRows = clients?.breakdowns?.clients || [];

  return (
    <div>
      <PageHeader title="Reports" subtitle="Platform analytics across clients, orders, revenue and operations." />

      <ReportDateRangeFilter value={range} onChange={setRange} />

      {toast && <ErrorState message={toast} />}

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} />}

      {!loading && !error && overview && (
        <>
          <div className="ld-card-grid" style={{ margin: '16px 0' }}>
            <StatCard label="Total Orders" value={overview.summary.totalOrders} />
            <StatCard label="Revenue (Paid)" value={money(overview.summary.paidRevenue?.amount)} />
            <StatCard label="Pending Payments" value={money(overview.summary.pendingPaymentAmount?.amount)} />
            <StatCard label="Completed Orders" value={overview.summary.completedOrders} />
            <StatCard label="Active Clients" value={overview.summary.activeClients} />
            <StatCard label="KYC Pending" value={overview.summary.kycPending} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <ChartPanel title="Orders Over Time" empty={!orders?.series?.length}>
              <ResponsiveContainer>
                <LineChart data={orders?.series || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--ld-border)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="created" name="Created" stroke={CHART_COLORS[0]} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="completed" name="Completed" stroke={CHART_COLORS[1]} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="cancelled" name="Cancelled" stroke={CHART_COLORS[3]} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartPanel>

            <ChartPanel title="Revenue Over Time" empty={!revenue?.series?.length}>
              <ResponsiveContainer>
                <BarChart data={revenue?.series || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--ld-border)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => money(v)} />
                  <Bar dataKey="amount" name="Revenue" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartPanel>

            <ChartPanel title="Orders by Status" empty={!byStatusData.length}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={byStatusData} dataKey="value" nameKey="name" outerRadius={100} label={({ name, value }) => `${name}: ${value}`}>
                    {byStatusData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartPanel>

            <ChartPanel title="Revenue by Service" empty={!byServiceData.length}>
              <ResponsiveContainer>
                <BarChart data={byServiceData} layout="vertical" margin={{ left: 24 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--ld-border)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="serviceName" tick={{ fontSize: 11 }} width={120} />
                  <Tooltip formatter={(v) => money(v)} />
                  <Bar dataKey="amount" name="Revenue" fill={CHART_COLORS[4]} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartPanel>
          </div>

          {kyc?.summary && (
            <div className="ld-panel" style={{ margin: '0 0 20px' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 15 }}>KYC Status</h3>
              <div className="ld-card-grid">
                <StatCard label="Pending" value={kyc.summary.kycPending} />
                <StatCard label="Submitted" value={kyc.summary.kycSubmitted} />
                <StatCard label="In Verification" value={kyc.summary.kycInVerification} />
                <StatCard label="Rejected" value={kyc.summary.kycRejected} />
                <StatCard label="Documents Verified" value={kyc.summary.documentsVerified} />
                <StatCard label="Documents Rejected" value={kyc.summary.documentsRejected} />
                <StatCard
                  label="Avg Verification Time"
                  value={kyc.summary.averageVerificationHours != null ? `${kyc.summary.averageVerificationHours}h` : '—'}
                />
              </div>
            </div>
          )}

          {/* Services table */}
          <div className="ld-panel" style={{ marginBottom: 20 }}>
            <div className="ld-toolbar">
              <h3 style={{ margin: 0, fontSize: 15 }}>Top Services</h3>
              <div className="ld-toolbar-spacer" />
              <select className="ld-form-input" value={servicesSort} onChange={(e) => setServicesSort(e.target.value)}>
                <option value="orderCount">Sort by Order Count</option>
                <option value="revenue">Sort by Revenue</option>
                <option value="completions">Sort by Completions</option>
              </select>
              {canExport && (
                <button className="ld-btn-secondary ld-btn-sm" disabled={exporting === 'services'} onClick={() => handleExport('services')}>
                  {exporting === 'services' ? 'Exporting…' : 'Export CSV'}
                </button>
              )}
            </div>

            {servicesLoading && <LoadingState />}
            {!servicesLoading && servicesRows.length === 0 && <EmptyState message="No service activity for this period." />}
            {!servicesLoading && servicesRows.length > 0 && (
              <div className="ld-table-wrap">
                <table className="ld-table">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Code</th>
                      <th>Total Orders</th>
                      <th>Completed</th>
                      <th>Cancelled</th>
                      <th>Pending</th>
                      <th>Revenue</th>
                      <th>Avg Order Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicesRows.map((s) => (
                      <tr key={s.serviceId || s.serviceName}>
                        <td>{s.serviceName}</td>
                        <td>{s.serviceCode || '—'}</td>
                        <td>{s.totalOrders}</td>
                        <td>{s.completedOrders}</td>
                        <td>{s.cancelledOrders}</td>
                        <td>{s.pendingOrders}</td>
                        <td>{money(s.revenue)}</td>
                        <td>{money(s.averageOrderValue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Orders / revenue export row */}
          {canExport && (
            <div className="ld-toolbar" style={{ marginBottom: 20 }}>
              <button className="ld-btn-secondary ld-btn-sm" disabled={exporting === 'orders'} onClick={() => handleExport('orders')}>
                {exporting === 'orders' ? 'Exporting…' : 'Export Orders CSV'}
              </button>
              <button className="ld-btn-secondary ld-btn-sm" disabled={exporting === 'revenue'} onClick={() => handleExport('revenue')}>
                {exporting === 'revenue' ? 'Exporting…' : 'Export Revenue CSV'}
              </button>
              <button className="ld-btn-secondary ld-btn-sm" onClick={() => window.print()}>
                Print / Save PDF
              </button>
            </div>
          )}

          {/* Admin operational metrics */}
          <div className="ld-panel" style={{ marginBottom: 20 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 15 }}>Admin Operational Metrics</h3>
            {adminsLoading && <LoadingState />}
            {!adminsLoading && adminsRows.length === 0 && <EmptyState message="No admin activity for this period." />}
            {!adminsLoading && adminsRows.length > 0 && (
              <div className="ld-table-wrap">
                <table className="ld-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Assigned Orders</th>
                      <th>Completed</th>
                      <th>Cancelled</th>
                      <th>Open</th>
                      <th>KYC Verified</th>
                      <th>KYC Rejected</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminsRows.map((a) => (
                      <tr key={a.adminId}>
                        <td>{a.name}</td>
                        <td>{a.email}</td>
                        <td>{a.assignedOrders}</td>
                        <td>{a.completedOrders}</td>
                        <td>{a.cancelledOrders}</td>
                        <td>{a.openOrders}</td>
                        <td>{a.kycVerified}</td>
                        <td>{a.kycRejected}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Client breakdown */}
          <div className="ld-panel" style={{ marginBottom: 20 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 15 }}>Client Breakdown</h3>
            {clientsLoading && <LoadingState />}
            {!clientsLoading && clientsRows.length === 0 && <EmptyState message="No clients match this period." />}
            {!clientsLoading && clientsRows.length > 0 && (
              <>
                <div className="ld-table-wrap">
                  <table className="ld-table">
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Company</th>
                        <th>Code</th>
                        <th>Total Orders</th>
                        <th>Completed</th>
                        <th>Pending</th>
                        <th>Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientsRows.map((c) => (
                        <tr key={c.clientId}>
                          <td>{c.name}</td>
                          <td>{c.companyName || '—'}</td>
                          <td>{c.clientCode}</td>
                          <td>{c.totalOrders}</td>
                          <td>{c.completedOrders}</td>
                          <td>{c.pendingOrders}</td>
                          <td>{money(c.revenue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  meta={{ page: clients.meta?.page || clientsPage, totalPages: Math.ceil((clients.summary?.totalClients || 0) / (clients.meta?.limit || 10)), total: clients.summary?.totalClients }}
                  onPageChange={setClientsPage}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
