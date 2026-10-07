import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../PageHeader';
import DynamicOrderDetailsForm from './DynamicOrderDetailsForm';
import { getService } from '../../../services/portal/servicesApi';
import { createOrder } from '../../../services/portal/ordersApi';
import { formatMoney } from '../../../utils/portal/money';

export default function OrderCreateForm({ basePath }) {
  const navigate = useNavigate();

  const [clientId, setClientId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [service, setService] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [notes, setNotes] = useState('');
  const [loadingService, setLoadingService] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadService(e) {
    e.preventDefault();
    setError('');
    setLoadingService(true);
    try {
      const svc = await getService(serviceId.trim());
      setService(svc);
      setOrderDetails({});
    } catch (err) {
      setService(null);
      setError(err.response?.data?.message || 'Could not load that service.');
    } finally {
      setLoadingService(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const order = await createOrder({ clientId: clientId.trim(), serviceId: serviceId.trim(), orderDetails, notes: notes || undefined });
      navigate(`${basePath}/${order.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create order.');
      if (err.response?.data?.details) {
        setError(err.response.data.details.map((d) => d.message).join(' '));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <button className="ld-btn-secondary ld-btn-sm" style={{ marginBottom: 16 }} onClick={() => navigate(basePath)}>
        ← Back to Orders
      </button>
      <PageHeader title="Create Order" subtitle="Create an order on behalf of a client." />

      {error && <div className="ld-form-error">{error}</div>}

      <div className="ld-panel" style={{ marginBottom: 16, maxWidth: 560 }}>
        <div className="ld-form-group">
          <label className="ld-form-label">Client ID</label>
          <input className="ld-form-input" value={clientId} onChange={(e) => setClientId(e.target.value)} placeholder="Client ObjectId" required />
        </div>
        <form onSubmit={loadService} style={{ display: 'flex', gap: 8 }}>
          <div className="ld-form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label className="ld-form-label">Service ID</label>
            <input className="ld-form-input" value={serviceId} onChange={(e) => setServiceId(e.target.value)} placeholder="Service ObjectId" required />
          </div>
          <button type="submit" className="ld-btn-secondary" style={{ alignSelf: 'flex-end' }} disabled={loadingService}>
            {loadingService ? 'Loading…' : 'Load Service'}
          </button>
        </form>
        <p className="ld-phase-note" style={{ marginTop: 8 }}>
          A full client/service picker arrives with later UI polish - paste ids for now (see the Clients/Services list pages for ids).
        </p>
      </div>

      {service && (
        <form onSubmit={handleSubmit}>
          <div className="ld-panel" style={{ marginBottom: 16, maxWidth: 560 }}>
            <div className="ld-permission-group-title">
              {service.name} ({service.serviceCode})
            </div>
            <p style={{ fontSize: 13 }}>
              {formatMoney(service.pricing?.total)} (incl. {service.gstPercentage}% GST)
            </p>
            <DynamicOrderDetailsForm fields={service.formSchema?.fields} values={orderDetails} onChange={setOrderDetails} />
          </div>

          <div className="ld-panel" style={{ marginBottom: 16, maxWidth: 560 }}>
            <div className="ld-form-group">
              <label className="ld-form-label">Internal Notes (optional)</label>
              <textarea className="ld-form-input" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </div>

          <button type="submit" className="ld-btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Creating…' : 'Create Order'}
          </button>
        </form>
      )}
    </div>
  );
}
