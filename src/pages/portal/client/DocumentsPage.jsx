import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import Toast from '../../../components/portal/Toast';
import KycRequirementsDashboard from '../../../components/portal/kyc/KycRequirementsDashboard';
import { getOrders } from '../../../services/portal/ordersApi';

const KYC_ORDER_STATUSES = ['KYC_PENDING', 'KYC_SUBMITTED', 'KYC_VERIFICATION', 'KYC_REJECTED', 'IN_PROGRESS', 'COMPLETED'];

const STATUS_COLORS = {
  KYC_PENDING: { bg: '#fef3c7', color: '#d97706' },
  KYC_SUBMITTED: { bg: '#dbeafe', color: '#1d4ed8' },
  KYC_VERIFICATION: { bg: '#ede9fe', color: '#6d28d9' },
  KYC_REJECTED: { bg: '#fee2e2', color: '#b91c1c' },
  IN_PROGRESS: { bg: '#dcfce7', color: '#15803d' },
  COMPLETED: { bg: '#f0fdf4', color: '#166534' },
};

function StatusBadge({ status }) {
  const style = STATUS_COLORS[status] || { bg: '#f3f4f6', color: '#374151' };
  return (
    <span style={{
      fontSize: 11, background: style.bg, color: style.color,
      padding: '2px 10px', borderRadius: 999, fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap',
    }}>
      {status?.replace(/_/g, ' ')}
    </span>
  );
}

export default function DocumentsPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getOrders({ limit: 100, sortBy: 'createdAt', sortDir: 'desc' });
      // Show orders that have KYC-related statuses or are in a KYC flow
      const filtered = (result.items || []).filter(
        (o) => KYC_ORDER_STATUSES.includes(o.status) || (o.serviceSnapshot?.requiredDocuments?.length > 0)
      );
      setOrders(filtered);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load your documents.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div>
      <PageHeader title="My Documents" subtitle="Upload and track your KYC documents for each order." />

      <KycRequirementsDashboard onToast={setToast} />

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}

      {!loading && !error && orders.length === 0 && (
        <EmptyState message="No orders with document requirements found. Place an order that requires KYC verification to upload documents here." />
      )}

      {!loading && !error && orders.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {orders.map((order) => {
            const kycStatus = order.status;
            const isActionable = ['KYC_PENDING', 'KYC_REJECTED'].includes(kycStatus);
            const isPendingReview = kycStatus === 'KYC_SUBMITTED';

            return (
              <div
                key={order.id}
                style={{
                  background: 'var(--ld-surface)',
                  border: '1px solid var(--ld-border)',
                  borderRadius: 'var(--ld-radius)',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/client/orders/${order.id}?tab=kyc`)}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13, color: 'var(--ld-primary)' }}>
                      {order.orderCode}
                    </span>
                    <StatusBadge status={kycStatus} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                    {order.serviceSnapshot?.name || 'Service'}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ld-text-muted)' }}>
                    Ordered {new Date(order.createdAt).toLocaleDateString()}
                    {order.serviceSnapshot?.requiredDocuments?.length > 0 && (
                      <span> · {order.serviceSnapshot.requiredDocuments.length} document{order.serviceSnapshot.requiredDocuments.length !== 1 ? 's' : ''} required</span>
                    )}
                  </div>
                </div>
                <div>
                  {isActionable && (
                    <button
                      className="ld-btn-primary"
                      onClick={(e) => { e.stopPropagation(); navigate(`/client/orders/${order.id}?tab=kyc`); }}
                    >
                      {kycStatus === 'KYC_REJECTED' ? 'Re-upload Documents' : 'Upload Documents'}
                    </button>
                  )}
                  {isPendingReview && (
                    <span style={{ fontSize: 12, color: '#1d4ed8', fontWeight: 600 }}>
                      Under review
                    </span>
                  )}
                  {!isActionable && !isPendingReview && (
                    <button className="ld-btn-secondary" onClick={(e) => { e.stopPropagation(); navigate(`/client/orders/${order.id}?tab=kyc`); }}>
                      View
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
