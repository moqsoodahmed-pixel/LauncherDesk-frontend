import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../PageHeader';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
import EmptyState from '../EmptyState';
import StatusBadge from '../StatusBadge';
import Pagination from '../Pagination';
import { getInvoices, downloadInvoice, resendInvoiceEmail, saveBlobAsFile } from '../../../services/portal/invoicesApi';
import { formatPaise } from '../../../utils/portal/money';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';

const PAGE_SIZE = 20;

function EmailStatusBadge({ delivery }) {
  const status = delivery?.status || 'NOT_SENT';
  const labels = {
    NOT_SENT: 'Not Sent', QUEUED: 'Queued', SENDING: 'Sending', SENT: 'Sent',
    RETRYING: 'Retrying', FAILED: 'Failed', CANCELLED: 'Cancelled',
  };
  return <StatusBadge status={labels[status] || status} />;
}

/**
 * Shared between Admin ("Invoice Management", read/resend only) and Super
 * Admin ("Invoice Administration", full control) - differentiated purely by
 * `hasPermission`/role checks on the already-existing permission system
 * from Part 1 (VIEW_INVOICE/DOWNLOAD_INVOICE/RESEND_INVOICE are grantable;
 * regenerate/delete are Super-Admin-only at the route level, matching
 * admins.routes.js's own pattern). Admins can never edit/regenerate/delete
 * a generated invoice, per the brief - those buttons simply do not render
 * unless the signed-in user is a Super Admin.
 */
export default function InvoicesListView({ basePath }) {
  const navigate = useNavigate();
  const { hasPermission, user } = useAuth();
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  const [invoices, setInvoices] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [emailStatusFilter, setEmailStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getInvoices({ page, limit: PAGE_SIZE, search: search.trim() || undefined });
      setInvoices(result.items || []);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load invoices.');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    load();
  }, [load]);

  // Status and Email Status filters operate client-side on the current page,
  // same pattern as ClientServicesPage.jsx's category filter - search is the
  // only filter that round-trips to the backend (Part 1's listInvoicesForAdmin
  // only ever supported `search`; no backend change was made for the rest).
  const filtered = useMemo(() => {
    return invoices.filter((inv) => {
      if (statusFilter !== 'ALL' && inv.status !== statusFilter) return false;
      if (emailStatusFilter !== 'ALL' && (inv.emailDelivery?.status || 'NOT_SENT') !== emailStatusFilter) return false;
      return true;
    });
  }, [invoices, statusFilter, emailStatusFilter]);

  async function handleDownload(invoice) {
    setBusyId(invoice.id);
    try {
      const blob = await downloadInvoice(invoice.id);
      saveBlobAsFile(blob, invoice.originalFileName || `${invoice.invoiceNumber}.pdf`);
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not download invoice.' });
    } finally {
      setBusyId(null);
    }
  }

  async function handleResend(invoice) {
    setBusyId(invoice.id);
    try {
      await resendInvoiceEmail(invoice.id);
      setToast({ type: 'success', message: `Invoice email resent to ${invoice.billingSnapshot?.customerEmail}.` });
      load();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not resend invoice email.' });
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <div className="ld-toolbar">
        <PageHeader
          title={isSuperAdmin ? 'Invoice Administration' : 'Invoice Management'}
          subtitle={isSuperAdmin ? 'Full control over every generated invoice.' : 'View, download, and resend generated invoices.'}
        />
      </div>

      {toast && (
        <div className={toast.type === 'error' ? 'ld-err' : 'ld-fp-ok'} style={{ marginBottom: 14 }} onClick={() => setToast(null)}>
          {toast.message}
        </div>
      )}

      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={load} />}

      {!loading && !error && (
        <>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            <input
              className="ld-form-input"
              placeholder="Search invoice #, order, client, email, GST, service…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              style={{ maxWidth: 340 }}
            />
            <select className="ld-form-input" style={{ maxWidth: 160 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="ALL">All Statuses</option>
              <option value="GENERATED">Generated</option>
              <option value="FAILED">Failed</option>
            </select>
            <select className="ld-form-input" style={{ maxWidth: 180 }} value={emailStatusFilter} onChange={(e) => setEmailStatusFilter(e.target.value)}>
              <option value="ALL">All Email Statuses</option>
              <option value="SENT">Sent</option>
              <option value="QUEUED">Queued</option>
              <option value="RETRYING">Retrying</option>
              <option value="FAILED">Failed</option>
              <option value="NOT_SENT">Not Sent</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <EmptyState message={invoices.length === 0 ? 'No invoices have been generated yet.' : 'No invoices match your search/filters.'} />
          ) : (
            <>
              <div className="ld-table-wrap">
                <table className="ld-table">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Order</th>
                      <th>Client</th>
                      <th>Service</th>
                      <th>Total</th>
                      <th>GST</th>
                      <th>Status</th>
                      <th>Email</th>
                      <th>Generated</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((inv) => (
                      <tr key={inv.id}>
                        <td style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 12 }}>
                          <button
                            onClick={() => navigate(`${basePath}/${inv.id}`)}
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 'inherit', fontSize: 'inherit', color: 'var(--ld-primary)' }}
                          >
                            {inv.invoiceNumber}
                          </button>
                          {inv.version > 1 && <span className="ld-phase-note" style={{ marginLeft: 4 }}>v{inv.version}</span>}
                        </td>
                        <td style={{ fontFamily: 'monospace', fontSize: 11.5 }}>{inv.billingSnapshot?.orderCode}</td>
                        <td style={{ fontSize: 12.5 }}>{inv.billingSnapshot?.customerName}</td>
                        <td style={{ fontSize: 12.5 }}>{inv.billingSnapshot?.serviceName}</td>
                        <td style={{ fontWeight: 700 }}>{formatPaise(inv.billingSnapshot?.totalAmountMinor)}</td>
                        <td style={{ fontSize: 12 }}>{formatPaise(inv.billingSnapshot?.gstAmountMinor)}</td>
                        <td><StatusBadge status={inv.status} /></td>
                        <td><EmailStatusBadge delivery={inv.emailDelivery} /></td>
                        <td style={{ fontSize: 11.5, color: 'var(--ld-text-muted)' }}>
                          {new Date(inv.generatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: 6 }}>
                            <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`${basePath}/${inv.id}`)}>
                              View
                            </button>
                            {hasPermission(PERMISSIONS.DOWNLOAD_INVOICE) && (
                              <button className="ld-btn-secondary ld-btn-sm" disabled={busyId === inv.id} onClick={() => handleDownload(inv)}>
                                Download
                              </button>
                            )}
                            {hasPermission(PERMISSIONS.RESEND_INVOICE) && (
                              <button className="ld-btn-primary ld-btn-sm" disabled={busyId === inv.id} onClick={() => handleResend(inv)}>
                                {busyId === inv.id ? '…' : 'Resend'}
                              </button>
                            )}
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
