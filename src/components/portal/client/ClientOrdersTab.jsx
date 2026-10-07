import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
import EmptyState from '../EmptyState';
import OrderStatusBadge from '../order/OrderStatusBadge';
import Pagination from '../Pagination';
import { getOrders } from '../../../services/portal/ordersApi';
import { formatMoney } from '../../../utils/portal/money';

export default function ClientOrdersTab({ client, basePath }) {
  const navigate = useNavigate();
  const isSuperAdmin = basePath?.includes('super-admin');
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getOrders({ client: client.id, page, limit: 10, sortBy: 'createdAt', sortDir: 'desc' });
      setOrders(result.items);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders.');
    } finally {
      setLoading(false);
    }
  }, [client.id, page]);

  useEffect(() => { load(); }, [load]);

  const ordersBasePath = basePath?.includes('super-admin') ? '/super-admin/orders' : '/admin/orders';

  return (
    <div className="ld-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 16 }}>Orders</h3>
        {meta && <span style={{ fontSize: 13, color: 'var(--ld-text-muted)' }}>{meta.total} total</span>}
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && orders.length === 0 && <EmptyState message="No orders for this client." />}

      {!loading && !error && orders.length > 0 && (
        <>
          <div className="ld-table-wrap">
            <table className="ld-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Invoice #</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`${ordersBasePath}/${order.id}`)}>
                    <td style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: 'var(--ld-primary)' }}>{order.orderCode}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      {order.invoiceNumber ? (
                        <span
                          style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--ld-primary)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                          onClick={() => navigate(`${ordersBasePath}/${order.id}/invoice`)}
                          title="View Invoice"
                        >
                          {order.invoiceNumber}
                        </span>
                      ) : '—'}
                    </td>
                    <td style={{ fontSize: 13 }}>{order.serviceSnapshot?.name || '—'}</td>
                    <td style={{ fontWeight: 600 }}>{formatMoney(order.pricing?.total)}</td>
                    <td><OrderStatusBadge status={order.paymentStatus} /></td>
                    <td><OrderStatusBadge status={order.status} /></td>
                    <td style={{ fontSize: 12 }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination meta={meta} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
