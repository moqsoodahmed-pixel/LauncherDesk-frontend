import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import StatCard from '../../../components/portal/StatCard';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import Pagination from '../../../components/portal/Pagination';
import { listPayments } from '../../../services/portal/paymentsAdminApi';
import { exportToCsv } from '../../../utils/portal/exportCsv';
import { fetchSuperAdminDashboard } from '../../../services/portal/dashboardApi';
import { formatMoney } from '../../../utils/portal/money';

const STATUS_COLORS = {
  CONFIRMED: { bg: '#dcfce7', color: '#15803d' },
  CREATED: { bg: '#fef9c3', color: '#a16207' },
  FAILED: { bg: '#fee2e2', color: '#b91c1c' },
  REFUNDED: { bg: '#ede9fe', color: '#6d28d9' },
};

function PaymentBadge({ status }) {
  const style = STATUS_COLORS[status] || { bg: '#f3f4f6', color: '#374151' };
  return (
    <span style={{
      fontSize: 11, background: style.bg, color: style.color,
      padding: '2px 10px', borderRadius: 999, fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.04em',
    }}>
      {status?.replace(/_/g, ' ')}
    </span>
  );
}

const PAYMENT_STATUSES = ['CREATED', 'CONFIRMED', 'FAILED', 'REFUNDED'];

function rupees(val) {
  if (val == null) return '—';
  return `₹${Number(val).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function PaymentsListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [payments, setPayments] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [method, setMethod] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const debounceRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await listPayments({ page, limit: 20, search, status, method, dateFrom, dateTo, sortBy, sortDir });
      setPayments(result.items);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load payments.');
    } finally {
      setLoading(false);
    }
  }, [page, search, status, method, dateFrom, dateTo, sortBy, sortDir]);

  function handleSort(col) {
    if (sortBy === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(col);
      setSortDir('asc');
    }
    setPage(1);
  }

  function SortTh({ col, children }) {
    const active = sortBy === col;
    return (
      <th onClick={() => handleSort(col)} style={{ cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}>
        {children} {active ? (sortDir === 'asc' ? '↑' : '↓') : <span style={{ opacity: 0.35 }}>↕</span>}
      </th>
    );
  }

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    fetchSuperAdminDashboard().then(setStats).catch(() => {});
  }, []);

  useEffect(() => {
    const params = {};
    if (status) params.status = status;
    if (method) params.method = method;
    if (search) params.search = search;
    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;
    if (page > 1) params.page = String(page);
    setSearchParams(params, { replace: true });
  }, [status, method, search, dateFrom, dateTo, page, setSearchParams]);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setPage(1);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {}, 350);
  }

  function clearFilters() {
    setSearch(''); setStatus(''); setMethod(''); setDateFrom(''); setDateTo(''); setPage(1);
  }

  const hasFilter = search || status || method || dateFrom || dateTo;

  function handleExportCsv() {
    exportToCsv('payments', payments, [
      { label: 'Payment #', value: r => r.paymentCode || r.paymentId || '' },
      { label: 'Order #', value: r => r.orderCode || '' },
      { label: 'Client', value: r => r.clientName || r.clientCode || '' },
      { label: 'Amount (₹)', value: r => r.amount || '' },
      { label: 'Status', value: r => r.status || '' },
      { label: 'Method', value: r => r.method || '' },
      { label: 'Date', value: r => r.paidAt ? new Date(r.paidAt).toLocaleDateString() : '' },
    ]);
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <PageHeader title="Payments" subtitle="Enterprise payment records — all transactions across the platform." />
        <button className="ld-btn-secondary ld-btn-sm" onClick={handleExportCsv} style={{ marginTop: 4, flexShrink: 0 }}>↓ CSV</button>
      </div>

      {/* ── Summary Cards ── */}
      <div className="ld-card-grid" style={{ marginBottom: 24 }}>
        <StatCard label="Total Revenue" value={formatMoney(stats?.revenue)} color="#16a34a" to="/super-admin/payments?status=CONFIRMED" />
        <StatCard label="Today's Revenue" value={formatMoney(stats?.todayRevenue)} color="#0891b2" to="/super-admin/payments" />
        <StatCard label="Weekly Revenue" value={formatMoney(stats?.weeklyRevenue)} color="#7c3aed" to="/super-admin/payments" />
        <StatCard label="Monthly Revenue" value={formatMoney(stats?.monthlyRevenue)} color="#2952e3" to="/super-admin/payments" />
        <StatCard label="Yearly Revenue" value={formatMoney(stats?.yearlyRevenue)} color="#16a34a" to="/super-admin/payments" />
        <StatCard label="Net Revenue" value={formatMoney(stats?.netRevenue)} color="#16a34a" to="/super-admin/payments" />
        <StatCard label="GST Collected" value={formatMoney(stats?.gstCollected)} color="#0891b2" />
        <StatCard label="Pending Payments" value={stats?.paymentPendingOrders} color="#d97706" to="/super-admin/payments?status=CREATED" />
        <StatCard label="Successful" value={stats?.successfulPayments} color="#16a34a" to="/super-admin/payments?status=CONFIRMED" />
        <StatCard label="Failed" value={stats?.failedPayments} color="#dc2626" to="/super-admin/payments?status=FAILED" />
        <StatCard label="Refunded" value={stats?.refundedPayments} color="#7c3aed" to="/super-admin/payments?status=REFUNDED" />
        <StatCard label="Total Refund Amount" value={formatMoney(stats?.refundedAmount)} color="#dc2626" to="/super-admin/payments?status=REFUNDED" />
        <StatCard label="Avg. Transaction" value={formatMoney(stats?.avgTransactionValue)} color="#6b7280" />
        <StatCard label="Pending Value" value={formatMoney(stats?.paymentPendingValue)} color="#d97706" to="/super-admin/payments?status=CREATED" />
      </div>

      {/* ── Filters ── */}
      <div className="ld-toolbar" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1 }}>
          <input
            className="ld-form-input"
            placeholder="Search payment ID, transaction ID, order ID…"
            value={search}
            onChange={handleSearchChange}
            style={{ width: 300 }}
          />
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All statuses</option>
            {PAYMENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={method} onChange={(e) => { setMethod(e.target.value); setPage(1); }}>
            <option value="">All methods</option>
            {['card', 'upi', 'netbanking', 'wallet', 'emi'].map((m) => <option key={m} value={m}>{m.toUpperCase()}</option>)}
          </select>
          <input className="ld-form-input" type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setPage(1); }} title="From date" style={{ width: 140 }} />
          <input className="ld-form-input" type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value); setPage(1); }} title="To date" style={{ width: 140 }} />
          {hasFilter && <button className="ld-btn-secondary ld-btn-sm" onClick={clearFilters}>Clear</button>}
        </div>
        <div style={{ fontSize: 13, color: 'var(--ld-text-muted)', alignSelf: 'center' }}>
          {meta ? `${meta.total} record${meta.total !== 1 ? 's' : ''}` : ''}
        </div>
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && payments.length === 0 && <EmptyState message="No payment records found." />}

      {!loading && !error && payments.length > 0 && (
        <div className="ld-table-wrap">
          <table className="ld-table">
            <thead>
              <tr>
                <SortTh col="paymentCode">Payment ID</SortTh>
                <th>Order / Invoice</th>
                <SortTh col="order.clientSnapshot.name">Client</SortTh>
                <th>Service</th>
                <th>Assigned Admin</th>
                <SortTh col="amount">Amount</SortTh>
                <th>GST</th>
                <SortTh col="netAmount">Net Paid</SortTh>
                <th>Refunded</th>
                <th>Gateway</th>
                <th>Transaction ID</th>

                <SortTh col="method">Method</SortTh>
                <SortTh col="status">Status</SortTh>
                <SortTh col="paidAt">Payment Date</SortTh>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/super-admin/payments/${p.id}`)}>
                  <td style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 700, color: 'var(--ld-primary)', whiteSpace: 'nowrap' }}>
                    {p.paymentCode || '—'}
                  </td>
                  <td style={{ fontSize: 11 }} onClick={(e) => e.stopPropagation()}>
                    <div
                      style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--ld-primary)', cursor: p.orderId ? 'pointer' : 'default' }}
                      onClick={() => p.orderId && navigate(`/super-admin/orders/${p.orderId}`)}
                    >{p.orderCode || '—'}</div>
                    {p.invoiceNumber && (
                      <div
                        style={{ color: 'var(--ld-primary)', marginTop: 2, cursor: 'pointer', textDecoration: 'underline', fontFamily: 'monospace' }}
                        onClick={() => p.orderId && navigate(`/super-admin/orders/${p.orderId}/invoice`)}
                      >{p.invoiceNumber}</div>
                    )}
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div
                      style={{ fontWeight: 600, fontSize: 12, cursor: p.clientId ? 'pointer' : 'default', color: p.clientId ? 'var(--ld-primary)' : undefined }}
                      onClick={() => p.clientId && navigate(`/super-admin/clients/${p.clientId}`)}
                    >{p.clientName || '—'}</div>
                    {p.clientCode && <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--ld-text-muted)' }}>{p.clientCode}</div>}
                  </td>
                  <td style={{ fontSize: 12 }}>{p.serviceName || '—'}</td>
                  <td style={{ fontSize: 12 }}>
                    {p.assignedAdminName ? (
                      <div>
                        <div style={{ fontWeight: 600 }}>{p.assignedAdminName}</div>
                        {p.assignedAdminCode && <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--ld-text-muted)' }}>{p.assignedAdminCode}</div>}
                      </div>
                    ) : <span style={{ color: 'var(--ld-text-muted)' }}>—</span>}
                  </td>
                  <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{rupees(p.netAmountRupees)}</td>
                  <td style={{ fontSize: 12, color: 'var(--ld-text-muted)', whiteSpace: 'nowrap' }}>
                    {p.gstApplicable ? rupees(p.gstAmountRupees) : '—'}
                  </td>
                  <td style={{ fontWeight: 700, color: '#16a34a', whiteSpace: 'nowrap' }}>{rupees(p.netAmountRupees)}</td>
                  <td style={{ fontSize: 12, color: p.refundAmountRupees ? '#dc2626' : 'var(--ld-text-muted)', whiteSpace: 'nowrap' }}>
                    {p.refundAmountRupees ? rupees(p.refundAmountRupees) : '—'}
                  </td>
                  <td style={{ fontSize: 11, color: 'var(--ld-text-muted)' }}>{p.provider || '—'}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 10, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.providerPaymentId || '—'}
                  </td>
                  <td style={{ fontSize: 11, textTransform: 'uppercase' }}>{p.method || '—'}</td>
                  <td><PaymentBadge status={p.status} /></td>
                  <td style={{ fontSize: 11, whiteSpace: 'nowrap' }}>
                    {p.paidAt ? new Date(p.paidAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : '—'}
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="ld-row-actions">
                      <button
                        className="ld-btn-secondary ld-btn-sm"
                        onClick={() => navigate(`/super-admin/payments/${p.id}`)}
                      >
                        Detail
                      </button>
                      <button
                        className="ld-btn-secondary ld-btn-sm"
                        onClick={() => navigate(`/super-admin/orders/${p.orderId}`)}
                      >
                        Order
                      </button>
                      {p.clientCode && (
                        <button
                          className="ld-btn-secondary ld-btn-sm"
                          onClick={() => navigate(`/super-admin/clients?search=${p.clientCode}`)}
                        >
                          Client
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination meta={meta} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
