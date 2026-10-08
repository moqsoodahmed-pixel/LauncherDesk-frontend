import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import StatusBadge from '../../../components/portal/StatusBadge';
import { getOwnInvoices, downloadOwnInvoice, saveBlobAsFile } from '../../../services/portal/invoicesApi';
import { formatPaise } from '../../../utils/portal/money';

/**
 * Renders the REAL generated PDF (the exact file Part 1 produced and
 * emailed) inside the page via a browser-native <iframe>, rather than
 * re-drawing the invoice a second time in HTML. This is deliberate: the
 * brief requires the preview use "the exact branding... same logo... same
 * seal... same signature" - showing the actual PDF guarantees that by
 * construction, with zero risk of a second implementation drifting from
 * the canonical template Part 1 built. Print uses the browser's native
 * print dialog on that same embedded PDF - "print directly from the
 * browser using the stored PDF," exactly as specified.
 */
export default function ClientInvoiceViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const [invoice, setInvoice] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // No single-invoice GET exists on the client router (Part 1 only
      // exposes list + download) - the list is small per client, so this
      // finds the one row rather than adding a new backend endpoint for Part 2.
      const { items } = await getOwnInvoices({ limit: 100 });
      const found = items.find((i) => i.id === id);
      if (!found) throw new Error('Invoice not found.');
      setInvoice(found);
      const blob = await downloadOwnInvoice(id);
      setPdfUrl(window.URL.createObjectURL(blob));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Could not load this invoice.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
    return () => {
      if (pdfUrl) window.URL.revokeObjectURL(pdfUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  async function handleDownload() {
    setDownloading(true);
    try {
      const blob = await downloadOwnInvoice(id);
      saveBlobAsFile(blob, invoice?.originalFileName || `${invoice?.invoiceNumber}.pdf`);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not download invoice.');
    } finally {
      setDownloading(false);
    }
  }

  function handlePrint() {
    // Prints the embedded PDF itself (the real stored file), not an HTML
    // re-rendering - the iframe's own content window owns the print job.
    iframeRef.current?.contentWindow?.print();
  }

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!invoice) return null;

  const b = invoice.billingSnapshot;

  return (
    <div>
      <div className="ld-toolbar">
        <PageHeader title={invoice.invoiceNumber} subtitle="Tax invoice preview" />
        <div className="ld-toolbar-spacer" />
        <button className="ld-btn-secondary" onClick={() => navigate('/client/invoices')}>
          Back
        </button>
        <button className="ld-btn-secondary" onClick={handlePrint}>
          Print Invoice
        </button>
        <button className="ld-btn-primary" onClick={handleDownload} disabled={downloading}>
          {downloading ? 'Downloading…' : 'Download PDF'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'start' }} className="ld-invoice-view-grid">
        <div className="ld-panel" style={{ padding: 0, overflow: 'hidden', minHeight: 600 }}>
          {pdfUrl && (
            <iframe
              ref={iframeRef}
              src={pdfUrl}
              title={`Invoice ${invoice.invoiceNumber}`}
              style={{ width: '100%', height: '80vh', border: 'none', display: 'block' }}
            />
          )}
        </div>

        <div className="ld-panel" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div className="ld-card-label">Invoice Status</div>
            <StatusBadge status={invoice.status} />
          </div>
          <div>
            <div className="ld-card-label">Order Information</div>
            <div style={{ fontSize: 13, fontFamily: 'monospace' }}>{b.orderCode}</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{b.serviceName} ({b.serviceCategory})</div>
          </div>
          <div>
            <div className="ld-card-label">Client Information</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{b.customerName}</div>
            <div style={{ fontSize: 12, color: 'var(--ld-text-muted)' }}>{b.customerEmail}</div>
            {b.customerPhone && <div style={{ fontSize: 12, color: 'var(--ld-text-muted)' }}>{b.customerPhone}</div>}
          </div>
          {b.gstNumber && (
            <div>
              <div className="ld-card-label">GST Number</div>
              <div style={{ fontSize: 13, fontFamily: 'monospace' }}>{b.gstNumber}</div>
            </div>
          )}
          <div>
            <div className="ld-card-label">Taxable Amount</div>
            <div style={{ fontSize: 13 }}>{formatPaise(b.unitPriceMinor)}</div>
          </div>
          <div>
            <div className="ld-card-label">GST ({b.gstPercentage}%)</div>
            <div style={{ fontSize: 13 }}>{formatPaise(b.gstAmountMinor)}</div>
          </div>
          <div>
            <div className="ld-card-label">Total Amount</div>
            <div style={{ fontSize: 16, fontWeight: 800 }}>{formatPaise(b.totalAmountMinor)}</div>
          </div>
          <div>
            <div className="ld-card-label">Payment Information</div>
            <div style={{ fontSize: 13 }}>Method: {b.paymentMethod || '—'}</div>
            <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--ld-text-muted)' }}>Ref: {b.transactionId || '—'}</div>
            <div style={{ fontSize: 12, color: 'var(--ld-text-muted)' }}>
              Paid: {b.paidAt ? new Date(b.paidAt).toLocaleString('en-IN') : '—'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
