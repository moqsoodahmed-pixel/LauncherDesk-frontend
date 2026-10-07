import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import OrderStatusBadge from '../../../components/portal/order/OrderStatusBadge';
import { getOwnOrders } from '../../../services/portal/clientOrdersApi';
import { formatMoney } from '../../../utils/portal/money';

export default function DownloadsPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  useEffect(() => {
    getOwnOrders({ limit: 100 })
      .then((result) => setOrders(result.items || []))
      .catch((err) => setError(err.response?.data?.message || 'Could not load downloads.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const withInvoice = orders.filter((o) => o.invoiceNumber || ['CONFIRMED', 'PAID'].includes(o.paymentStatus) || o.status === 'COMPLETED');
  const withDocs = orders.filter((o) => o.serviceSnapshot?.requiredDocuments?.length > 0 || o.kycDocuments?.length > 0);

  return (
    <div>
      <div className="ld-toolbar">
        <PageHeader
          title="Downloads Hub"
          subtitle="Tax invoices, documents, receipts, and order records available for download."
        />
        <div className="ld-toolbar-spacer" />
        <button className="ld-btn-secondary" onClick={() => navigate('/client/invoices')}>
          Invoices Directory
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button
          className={`ld-btn-${activeTab === 'ALL' ? 'primary' : 'secondary'} ld-btn-sm`}
          onClick={() => setActiveTab('ALL')}
        >
          All Downloads ({withInvoice.length + withDocs.length})
        </button>
        <button
          className={`ld-btn-${activeTab === 'INVOICES' ? 'primary' : 'secondary'} ld-btn-sm`}
          onClick={() => setActiveTab('INVOICES')}
        >
          Invoices & Receipts ({withInvoice.length})
        </button>
        <button
          className={`ld-btn-${activeTab === 'DOCS' ? 'primary' : 'secondary'} ld-btn-sm`}
          onClick={() => setActiveTab('DOCS')}
        >
          KYC & Service Documents ({withDocs.length})
        </button>
      </div>

      {withInvoice.length === 0 && withDocs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--ld-text-muted)' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>No downloads available yet</div>
          <div style={{ fontSize: 13, marginBottom: 16 }}>Invoices and documents will appear here once your orders are placed and processed.</div>
          <button className="ld-btn-primary" onClick={() => navigate('/client/services')}>
            Browse Services
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Section: Invoices & Receipts */}
          {(activeTab === 'ALL' || activeTab === 'INVOICES') && withInvoice.length > 0 && (
            <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--ld-border)', fontWeight: 700, fontSize: 14, display: 'flex', justifyContent: 'space-between' }}>
                <span>Invoices & Payment Receipts ({withInvoice.length})</span>
                <span style={{ fontSize: 12, color: 'var(--ld-text-muted)', fontWeight: 500 }}>GST Compliant PDF Invoices</span>
              </div>
              {withInvoice.map((order) => {
                const invCode = order.invoiceNumber || order.orderCode || '—';
                return (
                  <div
                    key={order.id}
                    style={{
                      padding: '14px 20px',
                      borderBottom: '1px solid var(--ld-border)',
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      alignItems: 'center',
                      gap: 16,
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--ld-primary)' }}>{invCode}</span>
                        <OrderStatusBadge status={order.paymentStatus || order.status} />
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{order.serviceSnapshot?.name || 'Service Order'}</div>
                      <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginTop: 2 }}>
                        Order: <span style={{ fontFamily: 'monospace' }}>{order.orderCode}</span>
                        {' · '}{formatMoney(order.pricing?.total)}
                        {' · '}{new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className="ld-btn-secondary ld-btn-sm"
                        onClick={() => navigate(`/client/orders/${order.id}`)}
                      >
                        Order Details
                      </button>
                      <button
                        className="ld-btn-primary ld-btn-sm"
                        onClick={() => navigate(`/client/orders/${order.id}/invoice`)}
                        title="Open and print / download invoice PDF"
                      >
                        🧾 View / Print Invoice
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Section: Documents */}
          {(activeTab === 'ALL' || activeTab === 'DOCS') && withDocs.length > 0 && (
            <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--ld-border)', fontWeight: 700, fontSize: 14, display: 'flex', justifyContent: 'space-between' }}>
                <span>KYC & Service Documentation ({withDocs.length})</span>
                <span style={{ fontSize: 12, color: 'var(--ld-text-muted)', fontWeight: 500 }}>Certificates, PAN, Aadhaar & Filings</span>
              </div>
              {withDocs.map((order) => (
                <div
                  key={order.id}
                  style={{
                    padding: '14px 20px',
                    borderBottom: '1px solid var(--ld-border)',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--ld-gold)' }}>{order.orderCode}</span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{order.serviceSnapshot?.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginTop: 2 }}>
                      {order.serviceSnapshot?.requiredDocuments?.length || 0} document requirements configured
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="ld-btn-primary ld-btn-sm"
                      onClick={() => navigate(`/client/orders/${order.id}?tab=kyc`)}
                    >
                      📁 Manage Documents
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
