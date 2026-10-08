import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../StatusBadge';
import { getInvoiceByOrder, downloadInvoice, saveBlobAsFile } from '../../../services/portal/invoicesApi';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';

/** Admin/Super Admin Order Details: the staff-facing twin of OrderInvoicePanel.jsx (Client). */
export default function AdminOrderInvoicePanel({ orderId, basePath }) {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let active = true;
    getInvoiceByOrder(orderId)
      .then((inv) => { if (active) setInvoice(inv); })
      .catch(() => { if (active) setInvoice(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [orderId]);

  if (loading) return null;
  if (!hasPermission(PERMISSIONS.VIEW_INVOICE)) {
    return <div className="ld-panel"><p className="ld-phase-note">You do not have permission to view invoices.</p></div>;
  }
  if (!invoice) {
    return <div className="ld-panel"><p className="ld-phase-note">No invoice has been generated for this order yet - one is created automatically once payment is confirmed.</p></div>;
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      const blob = await downloadInvoice(invoice.id);
      saveBlobAsFile(blob, invoice.originalFileName || `${invoice.invoiceNumber}.pdf`);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="ld-panel">
      <div className="ld-permission-group-title">Invoice</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginBottom: 10 }}>
        <div>
          <span className="ld-card-label">Invoice</span>{' '}
          <span style={{ fontFamily: 'monospace', fontSize: 12.5 }}>{invoice.invoiceNumber}</span>
        </div>
        <div>
          <span className="ld-card-label">Email</span>{' '}
          <StatusBadge status={invoice.emailDelivery?.status || 'NOT_SENT'} />
        </div>
        <div>
          <span className="ld-card-label">Payment Date</span>{' '}
          <span style={{ fontSize: 12.5 }}>
            {invoice.billingSnapshot?.paidAt ? new Date(invoice.billingSnapshot.paidAt).toLocaleDateString('en-IN') : '—'}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`${basePath}/${invoice.id}`)}>
          View Invoice
        </button>
        {hasPermission(PERMISSIONS.DOWNLOAD_INVOICE) && (
          <button className="ld-btn-primary ld-btn-sm" onClick={handleDownload} disabled={downloading}>
            {downloading ? 'Downloading…' : 'Download PDF'}
          </button>
        )}
      </div>
    </div>
  );
}
