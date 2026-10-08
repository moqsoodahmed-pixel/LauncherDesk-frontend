import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../PageHeader';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
import StatusBadge from '../StatusBadge';
import ConfirmModal from '../ConfirmModal';
import {
  getInvoices,
  downloadInvoice,
  resendInvoiceEmail,
  regenerateInvoice,
  deleteInvoice,
  getInvoiceVersions,
  getInvoiceAuditLog,
  saveBlobAsFile,
} from '../../../services/portal/invoicesApi';
import { formatPaise } from '../../../utils/portal/money';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';

export default function InvoiceDetailView({ basePath }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const { hasPermission, user } = useAuth();
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  const [invoice, setInvoice] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [versions, setVersions] = useState([]);
  const [auditLog, setAuditLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [busy, setBusy] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [regenerateOpen, setRegenerateOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // No single-invoice GET exists on the admin router either (Part 1
      // only exposes list/download/resend/regenerate/delete by id) - found
      // via the list, same approach as the Client preview page.
      const { items } = await getInvoices({ limit: 100, search: id });
      let found = items.find((i) => i.id === id);
      if (!found) {
        // Fall back to an unfiltered page in case the id search didn't
        // surface it (e.g. a superseded, non-current version).
        const all = await getInvoices({ limit: 100 });
        found = all.items.find((i) => i.id === id);
      }
      if (!found) throw new Error('Invoice not found.');
      setInvoice(found);

      const blob = await downloadInvoice(id);
      setPdfUrl(window.URL.createObjectURL(blob));

      if (isSuperAdmin) {
        const [v, a] = await Promise.all([
          getInvoiceVersions(found.order).catch(() => []),
          getInvoiceAuditLog(found.order).catch(() => ({ items: [] })),
        ]);
        setVersions(v);
        setAuditLog(a.items || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Could not load this invoice.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isSuperAdmin]);

  useEffect(() => {
    load();
    return () => {
      if (pdfUrl) window.URL.revokeObjectURL(pdfUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  async function handleDownload() {
    setBusy(true);
    try {
      const blob = await downloadInvoice(id);
      saveBlobAsFile(blob, invoice?.originalFileName || `${invoice?.invoiceNumber}.pdf`);
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not download invoice.' });
    } finally {
      setBusy(false);
    }
  }

  function handlePrint() {
    iframeRef.current?.contentWindow?.print();
  }

  async function handleResend() {
    setBusy(true);
    try {
      await resendInvoiceEmail(id);
      setToast({ type: 'success', message: `Invoice email resent to ${invoice.billingSnapshot?.customerEmail}.` });
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not resend invoice email.' });
    } finally {
      setBusy(false);
    }
  }

  async function confirmRegenerate() {
    setBusy(true);
    try {
      const next = await regenerateInvoice(id);
      setRegenerateOpen(false);
      setToast({ type: 'success', message: `Regenerated as ${next.invoiceNumber} (v${next.version}).` });
      navigate(`${basePath}/${next.id}`, { replace: true });
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not regenerate invoice.' });
      setRegenerateOpen(false);
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete() {
    setBusy(true);
    try {
      await deleteInvoice(id);
      navigate(basePath, { replace: true });
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not delete invoice.' });
      setDeleteOpen(false);
      setBusy(false);
    }
  }

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!invoice) return null;

  const b = invoice.billingSnapshot;

  return (
    <div>
      <div className="ld-toolbar">
        <PageHeader title={`${invoice.invoiceNumber} ${invoice.version > 1 ? `(v${invoice.version})` : ''}`} subtitle="Invoice metadata, delivery status, and history." />
        <div className="ld-toolbar-spacer" />
        <button className="ld-btn-secondary" onClick={() => navigate(basePath)}>Back</button>
        <button className="ld-btn-secondary" onClick={handlePrint}>Print</button>
        {hasPermission(PERMISSIONS.DOWNLOAD_INVOICE) && (
          <button className="ld-btn-secondary" onClick={handleDownload} disabled={busy}>Download PDF</button>
        )}
        {hasPermission(PERMISSIONS.RESEND_INVOICE) && (
          <button className="ld-btn-secondary" onClick={handleResend} disabled={busy}>Resend Email</button>
        )}
        {isSuperAdmin && (
          <button className="ld-btn-secondary" onClick={() => setRegenerateOpen(true)} disabled={busy}>Regenerate</button>
        )}
        {isSuperAdmin && (
          <button className="ld-btn-danger" onClick={() => setDeleteOpen(true)} disabled={busy}>Delete</button>
        )}
      </div>

      {toast && (
        <div className={toast.type === 'error' ? 'ld-err' : 'ld-fp-ok'} style={{ marginBottom: 14 }} onClick={() => setToast(null)}>
          {toast.message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
        <div className="ld-panel" style={{ padding: 0, overflow: 'hidden', minHeight: 600 }}>
          {pdfUrl && (
            <iframe ref={iframeRef} src={pdfUrl} title={invoice.invoiceNumber} style={{ width: '100%', height: '80vh', border: 'none', display: 'block' }} />
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="ld-panel">
            <div className="ld-permission-group-title">Invoice Metadata</div>
            <div style={{ fontSize: 12.5, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div>Order: <span style={{ fontFamily: 'monospace' }}>{b.orderCode}</span></div>
              <div>Service: {b.serviceName} ({b.serviceCategory})</div>
              <div>Client: {b.customerName} ({b.customerEmail})</div>
              <div>Total: <strong>{formatPaise(b.totalAmountMinor)}</strong></div>
              <div>GST ({b.gstPercentage}%): {formatPaise(b.gstAmountMinor)}</div>
              <div>Payment: {b.paymentMethod || '—'} · Ref {b.transactionId || '—'}</div>
              <div>File: {invoice.originalFileName} ({Math.round(invoice.sizeBytes / 1024)} KB)</div>
              <div>Checksum (SHA-256): <span style={{ fontFamily: 'monospace', fontSize: 10.5, wordBreak: 'break-all' }}>{invoice.checksum}</span></div>
              <div>Storage: {invoice.storageProvider}</div>
              <div>Generated: {new Date(invoice.generatedAt).toLocaleString('en-IN')} by {invoice.generatedBy}</div>
            </div>
          </div>

          <div className="ld-panel">
            <div className="ld-permission-group-title">Email Delivery</div>
            <StatusBadge status={invoice.emailDelivery?.status || 'NOT_SENT'} />
            <div style={{ fontSize: 11.5, color: 'var(--ld-text-muted)', marginTop: 6 }}>
              {invoice.emailDelivery?.sentAt ? `Sent ${new Date(invoice.emailDelivery.sentAt).toLocaleString('en-IN')}` : 'Not sent yet'}
              {invoice.emailDelivery?.attemptCount ? ` · ${invoice.emailDelivery.attemptCount} attempt(s)` : ''}
            </div>
            {invoice.emailDelivery?.failureReason && (
              <div style={{ fontSize: 11.5, color: 'var(--ld-danger)', marginTop: 4 }}>{invoice.emailDelivery.failureReason}</div>
            )}
          </div>

          {isSuperAdmin && versions.length > 0 && (
            <div className="ld-panel">
              <div className="ld-permission-group-title">Version History</div>
              {versions.map((v) => (
                <div key={v.id} style={{ fontSize: 12, padding: '4px 0', borderBottom: '1px solid var(--ld-border)' }}>
                  <button
                    onClick={() => navigate(`${basePath}/${v.id}`)}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'monospace', color: v.id === id ? 'var(--ld-text-muted)' : 'var(--ld-primary)' }}
                    disabled={v.id === id}
                  >
                    {v.invoiceNumber} (v{v.version}) {v.id === id && '— current view'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {isSuperAdmin && (
            <div className="ld-panel">
              <div className="ld-permission-group-title">Audit Log</div>
              {auditLog.length === 0 ? (
                <div className="ld-phase-note">No audit entries for this order yet.</div>
              ) : (
                <div style={{ maxHeight: 220, overflowY: 'auto' }}>
                  {auditLog.map((a) => (
                    <div key={a._id || a.id} style={{ fontSize: 11, padding: '4px 0', borderBottom: '1px solid var(--ld-border)' }}>
                      <strong>{a.action}</strong>
                      <div style={{ color: 'var(--ld-text-muted)' }}>{new Date(a.createdAt).toLocaleString('en-IN')}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        open={regenerateOpen}
        title="Regenerate this invoice?"
        message="A new PDF will be generated from the order's current data and superseded as the new current version. The old version is kept, never deleted."
        confirmLabel="Regenerate"
        isSubmitting={busy}
        onConfirm={confirmRegenerate}
        onCancel={() => setRegenerateOpen(false)}
      />
      <ConfirmModal
        open={deleteOpen}
        title="Delete this invoice?"
        message="This permanently removes the stored PDF and its metadata record. This cannot be undone."
        confirmLabel="Delete"
        danger
        isSubmitting={busy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}
