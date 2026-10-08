import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../StatusBadge';
import { getOwnInvoiceByOrder, downloadOwnInvoice, saveBlobAsFile } from '../../../services/portal/invoicesApi';

/**
 * Order Details page requirement: "Invoice Available / Download PDF / View
 * Invoice / Email Sent / Email Delivered / Payment Date." Renders nothing
 * (not even an empty-state panel) until an invoice actually exists, since
 * most orders won't have one yet (only payment-confirmed ones do) - this
 * avoids cluttering every order's page with a perpetual "no invoice" box.
 */
export default function OrderInvoicePanel({ orderId }) {
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let active = true;
    getOwnInvoiceByOrder(orderId)
      .then((inv) => { if (active) setInvoice(inv); })
      .catch(() => { if (active) setInvoice(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [orderId]);

  if (loading || !invoice) return null;

  async function handleDownload() {
    setDownloading(true);
    try {
      const blob = await downloadOwnInvoice(invoice.id);
      saveBlobAsFile(blob, invoice.originalFileName || `${invoice.invoiceNumber}.pdf`);
    } finally {
      setDownloading(false);
    }
  }

  // This system has no Brevo delivery webhook (see Part 1/Part 2 reports) -
  // "Email Delivered" is never actually distinguishable from "Email Sent"
  // here, so it is shown honestly as the same real SENT status rather than
  // implying a delivery confirmation that was never actually received.
  const emailSent = ['SENT', 'DELIVERED'].includes(invoice.emailDelivery?.status);

  return (
    <div className="ld-panel">
      <div className="ld-permission-group-title">Invoice</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginBottom: 10 }}>
        <div>
          <span className="ld-card-label">Invoice</span>{' '}
          <StatusBadge status="Available" />
          <span style={{ marginLeft: 8, fontFamily: 'monospace', fontSize: 12.5 }}>{invoice.invoiceNumber}</span>
        </div>
        <div>
          <span className="ld-card-label">Email</span>{' '}
          <StatusBadge status={emailSent ? 'Sent' : (invoice.emailDelivery?.status || 'Not Sent')} />
        </div>
        <div>
          <span className="ld-card-label">Payment Date</span>{' '}
          <span style={{ fontSize: 12.5 }}>
            {invoice.billingSnapshot?.paidAt ? new Date(invoice.billingSnapshot.paidAt).toLocaleDateString('en-IN') : '—'}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`/client/invoices/${invoice.id}`)}>
          View Invoice
        </button>
        <button className="ld-btn-primary ld-btn-sm" onClick={handleDownload} disabled={downloading}>
          {downloading ? 'Downloading…' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
}
