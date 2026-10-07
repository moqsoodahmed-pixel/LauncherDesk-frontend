import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
import EmptyState from '../EmptyState';
import Pagination from '../Pagination';
import { getOrders } from '../../../services/portal/ordersApi';

const KYC_STATUS_COLORS = {
  VERIFIED: { bg: '#dcfce7', color: '#15803d' },
  PENDING: { bg: '#fef9c3', color: '#a16207' },
  REJECTED: { bg: '#fee2e2', color: '#b91c1c' },
  REVIEW_STARTED: { bg: '#dbeafe', color: '#1d4ed8' },
};

function KycBadge({ status }) {
  if (!status) return <span style={{ fontSize: 11, color: 'var(--ld-text-muted)' }}>—</span>;
  const style = KYC_STATUS_COLORS[status] || { bg: '#f3f4f6', color: '#374151' };
  return (
    <span style={{ fontSize: 11, background: style.bg, color: style.color, padding: '2px 8px', borderRadius: 999, fontWeight: 600 }}>
      {status}
    </span>
  );
}

export default function ClientKycTab({ client, basePath }) {
  const navigate = useNavigate();
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
      setError(err.response?.data?.message || 'Failed to load KYC data.');
    } finally {
      setLoading(false);
    }
  }, [client.id, page]);

  useEffect(() => { load(); }, [load]);

  const ordersBasePath = basePath?.includes('super-admin') ? '/super-admin/orders' : '/admin/orders';

  return (
    <div className="ld-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 16 }}>KYC & Document Verification</h3>
        {meta && <span style={{ fontSize: 13, color: 'var(--ld-text-muted)' }}>{meta.total} order{meta.total !== 1 ? 's' : ''}</span>}
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && orders.length === 0 && (
        <EmptyState message="No orders found. KYC verification is linked to individual orders." />
      )}

      {!loading && !error && orders.length > 0 && (
        <>
          <div className="ld-table-wrap">
            <table className="ld-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Service</th>
                  <th>Order Status</th>
                  <th>KYC Status</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`${ordersBasePath}/${order.id}?tab=kyc`)}>
                    <td style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: 'var(--ld-primary)' }}>{order.orderCode}</td>
                    <td style={{ fontSize: 13 }}>{order.serviceSnapshot?.name || '—'}</td>
                    <td>
                      <span style={{ fontSize: 11, background: '#f3f4f6', color: '#374151', padding: '2px 8px', borderRadius: 999, fontWeight: 600 }}>
                        {order.status}
                      </span>
                    </td>
                    <td><KycBadge status={order.kycStatus} /></td>
                    <td style={{ fontSize: 12 }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`${ordersBasePath}/${order.id}?tab=kyc`)}>
                        Review KYC
                      </button>
                    </td>
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
