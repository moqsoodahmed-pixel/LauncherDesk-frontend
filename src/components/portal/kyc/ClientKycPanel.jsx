import { useCallback, useEffect, useRef, useState } from 'react';
import KycDocStatusBadge from './KycDocStatusBadge';
import KycUploadWidget from './KycUploadWidget';
import KycCommentsPanel from './KycCommentsPanel';
import {
  getOwnOrderKycSummary,
  getOwnOrderKycDocuments,
  uploadOwnKycDocument,
  downloadOwnKycDocument,
  submitOwnKyc,
} from '../../../services/portal/kycApi';
import { MAX_KYC_FILE_SIZE_MB } from '../../../constants/portal/kycStatus';

// Order statuses while a client is expected to still be interacting with
// this panel (uploading / replacing / submitting). Outside these the
// backend will reject uploads anyway, but we avoid even showing the
// controls, mirroring kycState.service.js's assertCanUpload.
const UPLOADABLE_ORDER_STATUSES = ['KYC_PENDING', 'KYC_REJECTED'];

// Upload mechanics (the actual uploadOwnKycDocument call, size/type
// validation, progress, retry) now live in the new, shared
// KycUploadWidget (components/portal/kyc/KycUploadWidget.jsx) rather than
// a bespoke <input type="file"> here - same component the new KYC
// dashboard (KycRequirementsDashboard) uses. This row keeps 100% of its
// original gating logic (mandatory/optional label, which statuses still
// allow upload, the rejection-reason note) and just hands the widget the
// same uploadOwnKycDocument/downloadOwnKycDocument calls it always used.
function DocumentRow({ orderId, doc, onChanged, onToast }) {
  const hasUploadedFile = doc.status !== 'NOT_UPLOADED';

  return (
    <div style={{ padding: '12px 0', borderBottom: '1px solid var(--ld-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <strong>{doc.label}</strong>
          {doc.mandatory === false && <span className="ld-phase-note" style={{ marginLeft: 6 }}>(optional)</span>}
        </div>
        <KycDocStatusBadge status={doc.status} />
      </div>

      {doc.status === 'REJECTED' && doc.rejectionReason && (
        <p className="ld-phase-note" style={{ color: 'var(--ld-danger)', marginTop: 6 }}>
          Rejected: {doc.rejectionReason}
        </p>
      )}

      <div style={{ marginTop: 8 }}>
        <KycUploadWidget
          compact
          hasExisting={hasUploadedFile && !!doc.documentId}
          existingFileName={doc.originalFileName}
          disabled={doc.status === 'VERIFIED'}
          onUpload={(file, onProgress) => uploadOwnKycDocument(orderId, doc.type, file, onProgress)}
          onDownload={doc.documentId ? () => downloadOwnKycDocument(orderId, doc.documentId) : undefined}
          onUploaded={() => {
            onToast({ type: 'success', message: `${doc.label} uploaded.` });
            onChanged();
          }}
        />
      </div>
    </div>
  );
}

/**
 * Client-facing KYC section embedded in pages/client/OrderDetailPage.jsx.
 * Renders nothing when KYC doesn't apply to this order at all.
 */
export default function ClientKycPanel({ order, onOrderChanged, onToast }) {
  const [summary, setSummary] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const mounted = useRef(true);

  useEffect(() => () => { mounted.current = false; }, []);

  const load = useCallback(async () => {
    try {
      const [summaryData, docsData] = await Promise.all([
        getOwnOrderKycSummary(order.id),
        getOwnOrderKycDocuments(order.id),
      ]);
      if (!mounted.current) return;
      setSummary(summaryData);
      setDocuments(docsData);
    } catch {
      if (mounted.current) setSummary({ required: false, status: null, documents: [] });
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [order.id]);

  useEffect(() => {
    load();
  }, [load]);

  function handleChanged() {
    load();
    onOrderChanged?.();
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await submitOwnKyc(order.id);
      onToast({ type: 'success', message: 'KYC submitted for review.' });
      handleChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not submit for review yet.' });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return null;
  if (!summary || !summary.required) return null;

  const docsByType = new Map(documents.map((d) => [d.documentType, d]));
  const rows = summary.documents.map((d) => {
    const uploaded = docsByType.get(d.type);
    return { ...d, documentId: uploaded?.id, originalFileName: uploaded?.originalFileName };
  });

  const canUpload = UPLOADABLE_ORDER_STATUSES.includes(order.status);
  const allMandatoryUploaded = rows.filter((d) => d.mandatory).every((d) => d.status !== 'NOT_UPLOADED');
  const canSubmit = canUpload && allMandatoryUploaded;

  return (
    <div className="ld-panel">
      <div className="ld-permission-group-title">KYC Documents</div>
      <p className="ld-phase-note" style={{ marginTop: -4, marginBottom: 12 }}>
        Accepted formats: PDF, JPG, PNG · Max size {MAX_KYC_FILE_SIZE_MB}MB per file.
      </p>

      {rows.map((doc) => (
        <DocumentRow key={doc.type} orderId={order.id} doc={doc} onChanged={handleChanged} onToast={onToast} />
      ))}

      {canUpload && (
        <div style={{ marginTop: 16 }}>
          <button className="ld-btn-primary" onClick={handleSubmit} disabled={!canSubmit || submitting}>
            {submitting ? 'Submitting…' : 'Submit for Review'}
          </button>
          {!allMandatoryUploaded && (
            <p className="ld-phase-note" style={{ marginTop: 6 }}>
              Upload every required document before submitting.
            </p>
          )}
        </div>
      )}

      <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--ld-border)' }}>
        <KycCommentsPanel orderId={order.id} isClient onToast={onToast} />
      </div>
    </div>
  );
}
