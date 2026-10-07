import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../PageHeader';
import LoadingState from '../LoadingState';
import EmptyState from '../EmptyState';
import OrderStatusBadge from './OrderStatusBadge';
import DynamicOrderDetailsForm from './DynamicOrderDetailsForm';
import { getClientServices, getClientService } from '../../../services/portal/clientServicesApi';
import { createOwnOrder } from '../../../services/portal/clientOrdersApi';
import { formatMoney } from '../../../utils/portal/money';

// FILL -> REVIEW -> SUCCESS. Payment is not processed in this phase - the
// review step says so explicitly, and nothing here ever claims a payment
// succeeded.
const STEP = { PICK: 'PICK', FILL: 'FILL', REVIEW: 'REVIEW', SUCCESS: 'SUCCESS' };

export default function ClientOrderCreateForm() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(serviceId ? 'LOADING' : STEP.PICK);
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [createdOrder, setCreatedOrder] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadServiceList = useCallback(async () => {
    const result = await getClientServices();
    setServices(result.items);
  }, []);

  useEffect(() => {
    if (serviceId) {
      getClientService(serviceId)
        .then((svc) => {
          setSelected(svc);
          setStep(STEP.FILL);
        })
        .catch((err) => {
          setError(err.response?.data?.message || 'This service is not available for ordering.');
          setStep(STEP.PICK);
          loadServiceList();
        });
    } else {
      loadServiceList();
    }
  }, [serviceId, loadServiceList]);

  function selectService(svc) {
    setSelected(svc);
    setOrderDetails({});
    setError('');
    setStep(STEP.FILL);
  }

  function goToReview(e) {
    e.preventDefault();
    setStep(STEP.REVIEW);
  }

  async function confirmOrder() {
    setError('');
    setIsSubmitting(true);
    try {
      const order = await createOwnOrder(selected.id, orderDetails);
      setCreatedOrder(order);
      setStep(STEP.SUCCESS);
    } catch (err) {
      const details = err.response?.data?.details;
      setError(details ? details.map((d) => d.message).join(' ') : err.response?.data?.message || 'Could not create order.');
      setStep(STEP.FILL);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (step === 'LOADING') return <LoadingState />;

  if (step === STEP.PICK) {
    return (
      <div>
        <PageHeader title="New Order" subtitle="Choose a service to get started." />
        {error && <div className="ld-form-error">{error}</div>}
        {services.length === 0 ? (
          <EmptyState message="No services are available for self-service ordering yet." />
        ) : (
          <div className="ld-table-wrap">
            <table className="ld-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Category</th>
                  <th>Price (incl. GST)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {services.map((svc) => (
                  <tr key={svc.id}>
                    <td>{svc.name}</td>
                    <td>{svc.category}</td>
                    <td>{formatMoney(svc.pricing?.total)}</td>
                    <td>
                      <button className="ld-btn-primary ld-btn-sm" onClick={() => selectService(svc)}>
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  if (step === STEP.FILL) {
    return (
      <div>
        <button className="ld-btn-secondary ld-btn-sm" style={{ marginBottom: 16 }} onClick={() => navigate('/client/services')}>
          ← Back to Services
        </button>
        <PageHeader title="New Order" subtitle={selected.name} />
        {error && <div className="ld-form-error">{error}</div>}
        <form onSubmit={goToReview}>
          <div className="ld-panel" style={{ marginBottom: 16, maxWidth: 560 }}>
            <div className="ld-permission-group-title">{selected.name}</div>
            <p style={{ fontSize: 13 }}>{formatMoney(selected.pricing?.total)} (incl. GST)</p>
            {selected.description && <p style={{ fontSize: 13, color: 'var(--ld-text-muted)' }}>{selected.description}</p>}
            <DynamicOrderDetailsForm fields={selected.formSchema?.fields} values={orderDetails} onChange={setOrderDetails} />
          </div>
          <button type="submit" className="ld-btn-primary">
            Review Order
          </button>
        </form>
      </div>
    );
  }

  if (step === STEP.REVIEW) {
    const entries = Object.entries(orderDetails || {});
    return (
      <div>
        <PageHeader title="Review Your Order" subtitle="Please confirm the details below before placing your order." />

        <div style={{ display: 'grid', gap: 16, maxWidth: 560 }}>
          <div className="ld-panel">
            <div className="ld-permission-group-title">Service</div>
            <p style={{ fontSize: 14, margin: 0 }}>{selected.name}</p>
          </div>

          {entries.length > 0 && (
            <div className="ld-panel">
              <div className="ld-permission-group-title">Details</div>
              <div className="ld-card-grid">
                {entries.map(([key, value]) => (
                  <div key={key}>
                    <div className="ld-card-label">{key}</div>
                    <div className="ld-card-value" style={{ fontSize: 14 }}>
                      {Array.isArray(value) ? value.join(', ') : String(value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="ld-panel">
            <div className="ld-permission-group-title">Pricing</div>
            <div className="ld-card-grid">
              <div>
                <div className="ld-card-label">Base Amount</div>
                <div className="ld-card-value">{formatMoney(selected.pricing?.basePrice)}</div>
              </div>
              <div>
                <div className="ld-card-label">GST</div>
                <div className="ld-card-value">{selected.gstApplicable ? formatMoney(selected.pricing?.gstAmount) : '—'}</div>
              </div>
              <div>
                <div className="ld-card-label">Total</div>
                <div className="ld-card-value" style={{ fontWeight: 700 }}>
                  {formatMoney(selected.pricing?.total)}
                </div>
              </div>
            </div>
          </div>

          <div className="ld-form-error" style={{ background: '#fef3c7', borderColor: '#fde68a', color: '#92400e' }}>
            Payment is not yet processed online. Your order will be created with payment marked as pending - our team will follow up on
            next steps.
          </div>

          {error && <div className="ld-form-error">{error}</div>}

          <div className="ld-row-actions">
            <button className="ld-btn-primary" onClick={confirmOrder} disabled={isSubmitting}>
              {isSubmitting ? 'Placing Order…' : 'Confirm & Create Order'}
            </button>
            <button className="ld-btn-secondary" onClick={() => setStep(STEP.FILL)} disabled={isSubmitting}>
              Back to Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP.SUCCESS
  return (
    <div>
      <div className="ld-panel" style={{ maxWidth: 480, textAlign: 'center' }}>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Order Created Successfully</div>
        <div style={{ fontFamily: 'monospace', fontSize: 18, margin: '12px 0' }}>{createdOrder.orderCode}</div>

        <div className="ld-card-grid" style={{ textAlign: 'left', marginBottom: 16 }}>
          <div>
            <div className="ld-card-label">Service</div>
            <div className="ld-card-value">{createdOrder.serviceSnapshot.name}</div>
          </div>
          <div>
            <div className="ld-card-label">Total</div>
            <div className="ld-card-value">{formatMoney(createdOrder.pricing?.total)}</div>
          </div>
          <div>
            <div className="ld-card-label">Payment Status</div>
            <div className="ld-card-value">
              <OrderStatusBadge status={createdOrder.paymentStatus} />
            </div>
          </div>
          <div>
            <div className="ld-card-label">Order Status</div>
            <div className="ld-card-value">
              <OrderStatusBadge status={createdOrder.status} />
            </div>
          </div>
          <div>
            <div className="ld-card-label">Created</div>
            <div className="ld-card-value">{new Date(createdOrder.createdAt).toLocaleString()}</div>
          </div>
        </div>

        <div className="ld-row-actions" style={{ justifyContent: 'center' }}>
          <button className="ld-btn-primary" onClick={() => navigate(`/client/orders/${createdOrder.id}`)}>
            View Order
          </button>
          <button className="ld-btn-secondary" onClick={() => navigate('/client/orders')}>
            My Orders
          </button>
          <button className="ld-btn-secondary" onClick={() => navigate('/client/dashboard')}>
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
