import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PageHeader from '../PageHeader';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
import OrderStatusBadge from './OrderStatusBadge';
import Toast from '../Toast';
import OrderClientCard from './OrderClientCard';
import OrderServiceCard from './OrderServiceCard';
import OrderPricingCard from './OrderPricingCard';
import OrderAssignmentPanel from './OrderAssignmentPanel';
import OrderActionsPanel from './OrderActionsPanel';
import OrderStatusTimeline from './OrderStatusTimeline';
import OrderActivityTab from './OrderActivityTab';
import AdminKycPanel from '../kyc/AdminKycPanel';
import AdminPaymentPanel from '../payment/AdminPaymentPanel';
import AdminOrderInvoicePanel from '../invoice/AdminOrderInvoicePanel';
import AdminCommunicationsPanel from '../communications/AdminCommunicationsPanel';
import OrderTasksPanel from './OrderTasksPanel';
import InternalNotesPanel from './InternalNotesPanel';
import DocRequestPanel from './DocRequestPanel';
import PriorityBadge from './PriorityBadge';
import SlaIndicator from './SlaIndicator';
import { getOrder, getOrderStatusHistory } from '../../../services/portal/ordersApi';
import { formatMoney } from '../../../utils/portal/money';

const TABS = ['Overview', 'Assignment', 'KYC', 'Payment', 'Invoice', 'Communications', 'Tasks', 'Doc Requests', 'Notes', 'Status Timeline', 'Activity'];

export default function OrderDetailView({ basePath }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const tabParam = searchParams.get('tab');
  const initialTab = TABS.find((t) => t.toLowerCase() === tabParam?.toLowerCase()) || 'Overview';

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState(initialTab);
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setOrder(await getOrder(id));
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load this order.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!order) return null;

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
        <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(basePath)}>
          ← Back to Orders
        </button>
        {order.invoiceNumber && (
          <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`${basePath}/${id}/invoice`)}>
            🧾 View Invoice
          </button>
        )}
      </div>

      <PageHeader
        title={order.orderCode}
        subtitle={
          <>
            <OrderStatusBadge status={order.status} /> · <OrderStatusBadge status={order.paymentStatus} /> · {formatMoney(order.pricing?.total)}
            {order.priority && <> · <PriorityBadge priority={order.priority} /></>}
            {order.slaDeadline && <> · <SlaIndicator slaDeadline={order.slaDeadline} slaStatus={order.slaStatus} /></>}
          </>
        }
      />

      <div className="ld-tabs">
        {TABS.map((t) => (
          <button key={t} className={`ld-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div style={{ display: 'grid', gap: 16 }}>
          <OrderClientCard clientSnapshot={order.clientSnapshot} />
          <OrderServiceCard serviceSnapshot={order.serviceSnapshot} orderDetails={order.orderDetails} />
          <OrderPricingCard pricing={order.pricing} invoiceNumber={order.invoiceNumber} />
          <OrderActionsPanel order={order} onChanged={load} onToast={setToast} />
        </div>
      )}
      {tab === 'Assignment' && <OrderAssignmentPanel order={order} onChanged={load} onToast={setToast} />}
      {tab === 'KYC' && <AdminKycPanel order={order} onOrderChanged={load} onToast={setToast} />}
      {tab === 'Payment' && <AdminPaymentPanel order={order} onOrderChanged={load} onToast={setToast} />}
      {tab === 'Invoice' && (
        <AdminOrderInvoicePanel
          orderId={order.id}
          basePath={basePath.replace('/orders', '/invoices')}
        />
      )}
      {tab === 'Communications' && <AdminCommunicationsPanel order={order} />}
      {tab === 'Tasks' && <OrderTasksPanel order={order} basePath={basePath} />}
      {tab === 'Doc Requests' && <DocRequestPanel order={order} />}
      {tab === 'Notes' && <InternalNotesPanel order={order} />}
      {tab === 'Status Timeline' && <OrderStatusTimeline orderId={order.id} fetchHistory={getOrderStatusHistory} />}
      {tab === 'Activity' && <OrderActivityTab order={order} />}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
