import { useCallback, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import { getClientServices } from '../../../services/portal/clientServicesApi';
import { getOwnOrders } from '../../../services/portal/clientOrdersApi';
import { formatMoney } from '../../../utils/portal/money';

const PAGE_SIZE = 9;

export default function ClientServicesPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [purchasedServiceIds, setPurchasedServiceIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [svcResult, ordersResult] = await Promise.all([
        getClientServices({ limit: 100 }),
        getOwnOrders({ limit: 100 }).catch(() => ({ items: [] })),
      ]);

      setServices(svcResult.items || []);

      // Identify already purchased services from active or completed orders
      const purchased = new Set();
      (ordersResult.items || []).forEach((order) => {
        if (order.status !== 'CANCELLED') {
          if (order.serviceSnapshot?.id) purchased.add(order.serviceSnapshot.id);
          if (order.service) purchased.add(order.service.toString());
          if (order.serviceSnapshot?.name) purchased.add(order.serviceSnapshot.name.toLowerCase());
        }
      });
      setPurchasedServiceIds(purchased);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load services.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Extract distinct categories
  const categories = useMemo(() => {
    const set = new Set();
    services.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    return ['ALL', ...Array.from(set).sort()];
  }, [services]);

  // Filtered services
  const filtered = useMemo(() => {
    return services.filter((svc) => {
      if (category !== 'ALL' && svc.category !== category) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = svc.name?.toLowerCase().includes(q);
        const matchCat = svc.category?.toLowerCase().includes(q);
        const matchDesc = svc.shortDescription?.toLowerCase().includes(q) || svc.description?.toLowerCase().includes(q);
        if (!matchName && !matchCat && !matchDesc) return false;
      }
      return true;
    });
  }, [services, category, search]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  function isPurchased(svc) {
    return (
      purchasedServiceIds.has(svc.id) ||
      purchasedServiceIds.has(svc._id) ||
      (svc.name && purchasedServiceIds.has(svc.name.toLowerCase()))
    );
  }

  return (
    <div>
      <div className="ld-toolbar">
        <PageHeader title="Services" subtitle="Browse LauncherDesk service offerings and start an order." />
        <div className="ld-toolbar-spacer" />
        <button className="ld-btn-secondary" onClick={() => navigate('/client/orders')}>
          My Orders
        </button>
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={load} />}

      {!loading && !error && (
        <>
          {/* Controls: Search & Category tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                className="ld-form-input"
                placeholder="Search services by name, category, or keyword…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                style={{ maxWidth: 360 }}
              />
              {search && (
                <button
                  className="ld-btn-secondary ld-btn-sm"
                  onClick={() => {
                    setSearch('');
                    setPage(1);
                  }}
                >
                  Clear Search
                </button>
              )}
            </div>

            {/* Category pills */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setPage(1);
                  }}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: category === cat ? 'var(--ld-primary)' : 'var(--ld-border)',
                    background: category === cat ? 'var(--ld-primary)' : 'var(--ld-surface)',
                    color: category === cat ? '#fff' : 'var(--ld-text)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {cat === 'ALL' ? 'All Services' : cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState message={search || category !== 'ALL' ? 'No services found matching your criteria.' : 'No services are currently available.'}>
              {(search || category !== 'ALL') && (
                <button
                  className="ld-btn-secondary"
                  style={{ marginTop: 10 }}
                  onClick={() => {
                    setSearch('');
                    setCategory('ALL');
                    setPage(1);
                  }}
                >
                  Reset Filters
                </button>
              )}
            </EmptyState>
          ) : (
            <>
              <div className="ld-card-grid">
                {paginated.map((svc) => {
                  const purchased = isPurchased(svc);
                  return (
                    <div className="ld-panel" key={svc.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                          <span className="ld-card-label">{svc.category}</span>
                          {purchased && (
                            <span
                              className="ld-badge"
                              style={{
                                background: '#dcfce7',
                                color: '#15803d',
                                cursor: 'pointer',
                                fontSize: 10.5,
                                fontWeight: 700,
                              }}
                              onClick={() => navigate('/client/orders')}
                              title="Click to view your orders"
                            >
                              ✓ Already Purchased
                            </span>
                          )}
                        </div>

                        <div style={{ fontSize: 16, fontWeight: 700, margin: '4px 0 8px' }}>{svc.name}</div>
                        {svc.shortDescription && (
                          <p style={{ fontSize: 13, color: 'var(--ld-text-muted)', margin: '0 0 10px', lineHeight: 1.4 }}>
                            {svc.shortDescription}
                          </p>
                        )}

                        <div style={{ fontSize: 14, marginBottom: 6 }}>
                          Starting at <strong>{formatMoney(svc.pricing?.total)}</strong>
                          {svc.gstApplicable && <span className="ld-phase-note"> (incl. {svc.gstPercentage}% GST)</span>}
                        </div>

                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                          {svc.requiresKyc && (
                            <button
                              onClick={() => navigate('/client/documents')}
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                              }}
                              title="Requires KYC — click to review document requirements"
                            >
                              <span className="ld-badge ld-badge-pending">Requires KYC</span>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="ld-row-actions" style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--ld-border)' }}>
                        <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`/client/services/${svc.id}`)}>
                          View Details
                        </button>
                        {purchased ? (
                          <button
                            className="ld-btn-secondary ld-btn-sm"
                            onClick={() => navigate('/client/orders')}
                            title="View your existing order"
                          >
                            My Orders
                          </button>
                        ) : null}
                        <button className="ld-btn-primary ld-btn-sm" onClick={() => navigate(`/client/orders/create/${svc.id}`)}>
                          {purchased ? 'Reorder' : 'Start Order'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 24 }}>
                  <button
                    className="ld-btn-secondary ld-btn-sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </button>
                  <span style={{ fontSize: 13, color: 'var(--ld-text-muted)', fontWeight: 600 }}>
                    Page {page} of {totalPages} ({filtered.length} services)
                  </span>
                  <button
                    className="ld-btn-secondary ld-btn-sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
