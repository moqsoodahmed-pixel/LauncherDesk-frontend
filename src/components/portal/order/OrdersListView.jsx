import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../PageHeader';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
import EmptyState from '../EmptyState';
import OrderStatusBadge from './OrderStatusBadge';
import Pagination from '../Pagination';
import { getOrders } from '../../../services/portal/ordersApi';
import { ALL_ORDER_STATUSES } from '../../../constants/portal/orderStatus';
import { ALL_ORDER_PAYMENT_STATUSES } from '../../../constants/portal/orderPaymentStatus';
import { exportToCsv } from '../../../utils/portal/exportCsv';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';
import { formatMoney } from '../../../utils/portal/money';

export default function OrdersListView({ basePath, title, subtitle }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { hasPermission } = useAuth();

  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [paymentStatus, setPaymentStatus] = useState('');
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
      const result = await getOrders({ page, limit: 20, search, status, paymentStatus, dateFrom, dateTo, sortBy, sortDir });
      setOrders(result.items);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders.');
    } finally {
      setLoading(false);
    }
  }, [page, search, status, paymentStatus, dateFrom, dateTo, sortBy, sortDir]);

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

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const params = {};
    if (status) params.status = status;
    if (paymentStatus) params.paymentStatus = paymentStatus;
    if (search) params.search = search;
    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;
    if (page > 1) params.page = String(page);
    setSearchParams(params, { replace: true });
  }, [status, paymentStatus, search, dateFrom, dateTo, page, setSearchParams]);

  function handleSearchChange(e) {
    const val = e.target.value;
    setSearch(val);
    setPage(1);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {}, 350);
  }

  function clearFilters() {
    setSearch('');
    setStatus('');
    setPaymentStatus('');
    setDateFrom('');
    setDateTo('');
    setPage(1);
  }

  const hasActiveFilter = search || status || paymentStatus || dateFrom || dateTo;

  function handleExportCsv() {
    exportToCsv('orders', orders, [
      { label: 'Order #', value: r => r.orderCode },
      { label: 'Invoice #', value: r => r.invoiceNumber || '' },
      { label: 'Client', value: r => r.clientName || r.clientCode || '' },
      { label: 'Service', value: r => r.serviceName || '' },
      { label: 'Amount (₹)', value: r => r.pricing?.totalAmount || r.amount || '' },
      { label: 'Payment Status', value: r => r.paymentStatus || '' },
      { label: 'Status', value: r => r.status || '' },
      { label: 'Created', value: r => r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '' },
    ]);
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <PageHeader title={title} subtitle={subtitle} />
        <button className="ld-btn-secondary ld-btn-sm" onClick={handleExportCsv} style={{ marginTop: 4, flexShrink: 0 }}>↓ CSV</button>
      </div>

      <div className="ld-toolbar" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1 }}>
          <input
            className="ld-form-input"
            placeholder="Search order #, client, service…"
            value={search}
            onChange={handleSearchChange}
            style={{ width: 240 }}
          />
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All statuses</option>
            {ALL_ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select value={paymentStatus} onChange={(e) => { setPaymentStatus(e.target.value); setPage(1); }}>
            <option value="">All payment statuses</option>
            {ALL_ORDER_PAYMENT_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <input
            className="ld-form-input"
            type="date"
            value={dateFrom}
            onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
            title="From date"
            style={{ width: 140 }}
          />
          <input
            className="ld-form-input"
            type="date"
            value={dateTo}
            onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
            title="To date"
            style={{ width: 140 }}
          />
          {hasActiveFilter && (
            <button className="ld-btn-secondary ld-btn-sm" onClick={clearFilters}>
              Clear
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {meta && <span style={{ fontSize: 13, color: 'var(--ld-text-muted)' }}>{meta.total} order{meta.total !== 1 ? 's' : ''}</span>}
          {hasPermission(PERMISSIONS.CREATE_ORDER) && (
            <button className="ld-btn-primary" onClick={() => navigate(`${basePath}/create`)}>
              + Create Order
            </button>
          )}
        </div>
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && orders.length === 0 && <EmptyState message="No data found." />}

      {!loading && !error && orders.length > 0 && (
        <div className="ld-table-wrap">
          <table className="ld-table">
            <thead>
              <tr>
                <SortTh col="orderCode">Order #</SortTh>
                <th>Invoice #</th>
                <SortTh col="clientSnapshot.name">Client</SortTh>
                <th>Service</th>
                <SortTh col="pricing.total">Amount</SortTh>
                <SortTh col="paymentStatus">Payment</SortTh>
                <SortTh col="status">Status</SortTh>
                <th>Assigned</th>
                <SortTh col="createdAt">Created</SortTh>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`${basePath}/${order.id}`)}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: 'var(--ld-primary)' }}>{order.orderCode}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    {order.invoiceNumber ? (
                      <span
                        style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--ld-primary)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                        onClick={() => navigate(`${basePath}/${order.id}/invoice`)}
                        title="View Invoice"
                      >
                        {order.invoiceNumber}
                      </span>
                    ) : '—'}
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div
                      style={{ fontWeight: 600, fontSize: 13, cursor: order.client ? 'pointer' : 'default', color: order.client ? 'var(--ld-primary)' : undefined }}
                      onClick={() => order.client && navigate(`${basePath.replace('/orders', '')}/clients/${order.client}`)}
                    >
                      {order.clientSnapshot?.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', fontFamily: 'monospace' }}>{order.clientSnapshot?.clientCode}</div>
                  </td>
                  <td style={{ fontSize: 13 }}>{order.serviceSnapshot?.name}</td>
                  <td style={{ fontWeight: 600 }}>{formatMoney(order.pricing?.total)}</td>
                  <td><OrderStatusBadge status={order.paymentStatus} /></td>
                  <td><OrderStatusBadge status={order.status} /></td>
                  <td onClick={(e) => e.stopPropagation()}>
                    {order.assignedAdmin ? (
                      <div
                        style={{ cursor: basePath?.includes('super-admin') ? 'pointer' : 'default' }}
                        onClick={() => basePath?.includes('super-admin') && order.assignedAdmin?.id && navigate(`/super-admin/admins/${order.assignedAdmin.id}`)}
                      >
                        <div style={{ fontSize: 12, fontWeight: 600, color: basePath?.includes('super-admin') ? 'var(--ld-primary)' : undefined }}>{order.assignedAdmin.name}</div>
                        {order.assignedAdmin.adminCode && (
                          <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ld-text-muted)' }}>{order.assignedAdmin.adminCode}</div>
                        )}
                      </div>
                    ) : (
                      <span style={{ fontSize: 11, background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: 999, fontWeight: 600 }}>
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td style={{ fontSize: 12 }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`${basePath}/${order.id}`)}>
                      View
                    </button>
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
