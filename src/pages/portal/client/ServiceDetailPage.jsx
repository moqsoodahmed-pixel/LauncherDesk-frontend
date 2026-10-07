import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import { getClientService } from '../../../services/portal/clientServicesApi';
import { formatMoney } from '../../../utils/portal/money';

export default function ClientServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setService(await getClientService(id));
    } catch (err) {
      setError(err.response?.data?.message || 'This service is not available.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!service) return null;

  return (
    <div>
      <button className="ld-btn-secondary ld-btn-sm" style={{ marginBottom: 16 }} onClick={() => navigate('/client/services')}>
        ← Back to Services
      </button>

      <PageHeader title={service.name} subtitle={service.category} />

      <div className="ld-panel" style={{ marginBottom: 16, maxWidth: 640 }}>
        {service.description && <p style={{ fontSize: 14 }}>{service.description}</p>}

        <div className="ld-card-grid" style={{ marginTop: 12 }}>
          <div>
            <div className="ld-card-label">Base Price</div>
            <div className="ld-card-value" style={{ fontSize: 16 }}>
              {formatMoney(service.pricing?.basePrice)}
            </div>
          </div>
          <div>
            <div className="ld-card-label">GST</div>
            <div className="ld-card-value" style={{ fontSize: 16 }}>
              {service.gstApplicable ? `${service.gstPercentage}% (${formatMoney(service.pricing?.gstAmount)})` : 'Not applicable'}
            </div>
          </div>
          <div>
            <div className="ld-card-label">Total</div>
            <div className="ld-card-value" style={{ fontSize: 18, fontWeight: 700 }}>
              {formatMoney(service.pricing?.total)}
            </div>
          </div>
          <div>
            <div className="ld-card-label">Requires KYC</div>
            <div className="ld-card-value">{service.requiresKyc ? 'Yes' : 'No'}</div>
          </div>
          <div>
            <div className="ld-card-label">Requires Your Details</div>
            <div className="ld-card-value">{service.requiresClientDetails ? 'Yes' : 'No'}</div>
          </div>
        </div>
      </div>

      <button className="ld-btn-primary" onClick={() => navigate(`/client/orders/create/${service.id}`)}>
        Start Order
      </button>
    </div>
  );
}
