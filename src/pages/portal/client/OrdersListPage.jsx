import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import OrderStatusBadge from '../../../components/portal/order/OrderStatusBadge';
import Pagination from '../../../components/portal/Pagination';
import { getOwnOrders } from '../../../services/portal/clientOrdersApi';
import { ALL_ORDER_STATUSES, formatOrderStatus } from '../../../constants/portal/orderStatus';
import { ALL_ORDER_PAYMENT_STATUSES } from '../../../constants/portal/orderPaymentStatus';
import { formatMoney } from '../../../utils/portal/money';

export default function ClientOrdersListPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getOwnOrders({ page, limit: 20, search, status, paymentStatus, sortBy: 'createdAt', sortDir: 'desc' });
      setOrders(result.items);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load your orders.');
    } finally {
      setLoading(false);
    }
  }, [page, search, status, paymentStatus]);

  useEffect(() => {
    load();
  }, [load]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    setPage(1);
    load();
  }

  return (
    <div>
      <div className="ld-toolbar">
        <PageHeader title="My Orders" subtitle="Orders you've placed with LauncherDesk." />
        <div className="ld-toolbar-spacer" />
        <button className="ld-btn-primary" onClick={() => navigate('/client/services')}>
          + New Order
        </button>
      </div>

      <div className="ld-toolbar">
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 8 }}>
          <input
            className="ld-form-input"
            placeholder="Search order # or service…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 220 }}
          />
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All statuses</option>
            {ALL_ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {formatOrderStatus(s)}
              </option>
            ))}
          </select>
          <select value={paymentStatus} onChange={(e) => { setPaymentStatus(e.target.value); setPage(1); }}>
            <option value="">All payment statuses</option>
            {ALL_ORDER_PAYMENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {formatOrderStatus(s)}
              </option>
            ))}
          </select>
          <button type="submit" className="ld-btn-secondary">
            Search
          </button>
        </form>
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && orders.length === 0 && (
        <EmptyState message="You haven't placed any orders yet.">
          <button className="ld-btn-primary" style={{ marginTop: 10 }} onClick={() => navigate('/client/services')}>
            Browse Services
          </button>
        </EmptyState>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="ld-table-wrap">
          <table className="ld-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Created</th>
                <th>Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontFamily: 'monospace' }}>{order.orderCode}</td>
                  <td>{order.serviceSnapshot.name}</td>
                  <td>{formatMoney(order.pricing?.total)}</td>
                  <td>
                    <OrderStatusBadge status={order.paymentStatus} />
                  </td>
                  <td>
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(order.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`/client/orders/${order.id}`)}>
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
