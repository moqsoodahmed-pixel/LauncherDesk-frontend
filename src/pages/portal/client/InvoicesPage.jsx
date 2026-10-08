import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import StatusBadge from '../../../components/portal/StatusBadge';
import Pagination from '../../../components/portal/Pagination';
import { getOwnInvoices, downloadOwnInvoice, saveBlobAsFile } from '../../../services/portal/invoicesApi';
import { formatPaise } from '../../../utils/portal/money';

const PAGE_SIZE = 10;

/** Only Queued/Sending/Sent/Retrying/Failed/Cancelled are ever real here - this
 * system has no Brevo delivery webhook, so Delivered/Bounced/Opened/Clicked
 * (valid in principle) never actually occur and are never shown as if they did. */
function EmailStatusBadge({ delivery }) {
  const status = delivery?.status || 'NOT_SENT';
  const labels = {
    NOT_SENT: 'Not Sent', QUEUED: 'Queued', SENDING: 'Sending', SENT: 'Sent',
    RETRYING: 'Retrying', FAILED: 'Failed', CANCELLED: 'Cancelled',
  };
  return <StatusBadge status={labels[status] || status} />;
}

export default function ClientInvoicesPage() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [downloadingId, setDownloadingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getOwnInvoices({ page, limit: PAGE_SIZE });
      setInvoices(result.items || []);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load your invoices.');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!search.trim()) return invoices;
    const q = search.toLowerCase();
    return invoices.filter(
      (i) =>
        i.invoiceNumber?.toLowerCase().includes(q) ||
        i.billingSnapshot?.orderCode?.toLowerCase().includes(q) ||
        i.billingSnapshot?.serviceName?.toLowerCase().includes(q)
    );
  }, [invoices, search]);

  async function handleDownload(invoice) {
    setDownloadingId(invoice.id);
    try {
      const blob = await downloadOwnInvoice(invoice.id);
      saveBlobAsFile(blob, invoice.originalFileName || `${invoice.invoiceNumber}.pdf`);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not download invoice.');
    } finally {
      setDownloadingId(null);
    }
  }

  return (
    <div>
      <div className="ld-toolbar">
        <PageHeader title="Invoice Center" subtitle="View, download, and print your GST tax invoices." />
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={load} />}

      {!loading && !error && (
        <>
          <div className="ld-toolbar" style={{ marginBottom: 16 }}>
            <input
              className="ld-form-input"
              placeholder="Search by invoice #, order #, or service…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: 360 }}
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState message={search ? 'No invoices match your search.' : 'No invoices yet. An invoice is generated automatically once an order’s payment is confirmed.'}>
              <button className="ld-btn-primary" style={{ marginTop: 12 }} onClick={() => navigate('/client/services')}>
                Browse Services
              </button>
            </EmptyState>
          ) : (
            <>
              <div className="ld-table-wrap">
                <table className="ld-table">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Order ID</th>
                      <th>Service</th>
                      <th>Issue Date</th>
                      <th>Payment Status</th>
                      <th>Invoice Status</th>
                      <th>Total</th>
                      <th>GST</th>
                      <th>Email Status</th>
                      <th>Sent Date</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((inv) => (
                      <tr key={inv.id}>
                        <td>
                          <button
                            onClick={() => navigate(`/client/invoices/${inv.id}`)}
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'monospace', fontWeight: 700, fontSize: 12.5, color: 'var(--ld-primary)' }}
                            title="View invoice"
                          >
                            {inv.invoiceNumber}
                          </button>
                        </td>
                        <td style={{ fontFamily: 'monospace', fontSize: 11.5 }}>{inv.billingSnapshot?.orderCode}</td>
                        <td style={{ fontWeight: 600, fontSize: 13 }}>{inv.billingSnapshot?.serviceName}</td>
                        <td style={{ fontSize: 12, color: 'var(--ld-text-muted)' }}>
                          {new Date(inv.generatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td><StatusBadge status="PAID" /></td>
                        <td><StatusBadge status={inv.status} /></td>
                        <td style={{ fontWeight: 700 }}>{formatPaise(inv.billingSnapshot?.totalAmountMinor)}</td>
                        <td>{formatPaise(inv.billingSnapshot?.gstAmountMinor)} ({inv.billingSnapshot?.gstPercentage}%)</td>
                        <td><EmailStatusBadge delivery={inv.emailDelivery} /></td>
                        <td style={{ fontSize: 12, color: 'var(--ld-text-muted)' }}>
                          {inv.emailDelivery?.sentAt ? new Date(inv.emailDelivery.sentAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: 6 }}>
                            <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`/client/invoices/${inv.id}`)}>
                              View
                            </button>
                            <button
                              className="ld-btn-primary ld-btn-sm"
                              onClick={() => handleDownload(inv)}
                              disabled={downloadingId === inv.id}
                            >
                              {downloadingId === inv.id ? 'Downloading…' : 'Download'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination meta={meta} onPageChange={setPage} />
            </>
          )}
        </>
      )}
    </div>
  );
}
