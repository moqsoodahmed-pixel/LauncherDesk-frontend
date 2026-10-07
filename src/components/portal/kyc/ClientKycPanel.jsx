import { useCallback, useEffect, useRef, useState } from 'react';
import KycDocStatusBadge from './KycDocStatusBadge';
import { triggerBlobDownload } from './kycDownload';
import {
  getOwnOrderKycSummary,
  getOwnOrderKycDocuments,
  uploadOwnKycDocument,
  downloadOwnKycDocument,
  submitOwnKyc,
} from '../../../services/portal/kycApi';
import { ACCEPTED_KYC_FILE_EXTENSIONS, MAX_KYC_FILE_SIZE_BYTES, MAX_KYC_FILE_SIZE_MB } from '../../../constants/portal/kycStatus';

// Order statuses while a client is expected to still be interacting with
// this panel (uploading / replacing / submitting). Outside these the
// backend will reject uploads anyway, but we avoid even showing the
// controls, mirroring kycState.service.js's assertCanUpload.
const UPLOADABLE_ORDER_STATUSES = ['KYC_PENDING', 'KYC_REJECTED'];

function DocumentRow({ orderId, doc, onChanged, onToast }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const hasUploadedFile = doc.status !== 'NOT_UPLOADED';
  const isReplace = doc.status === 'REJECTED';

  async function handleFileChosen(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (file.size > MAX_KYC_FILE_SIZE_BYTES) {
      onToast({ type: 'error', message: `"${file.name}" is too large. Maximum allowed size is ${MAX_KYC_FILE_SIZE_MB}MB.` });
      return;
    }

    setBusy(true);
    try {
      await uploadOwnKycDocument(orderId, doc.type, file);
      onToast({ type: 'success', message: `${doc.label} uploaded.` });
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not upload this document.' });
    } finally {
      setBusy(false);
    }
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      const { blob, fileName } = await downloadOwnKycDocument(orderId, doc.documentId);
      triggerBlobDownload({ blob, fileName: fileName || doc.originalFileName });
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not download this document.' });
    } finally {
      setDownloading(false);
    }
  }

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

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 8, flexWrap: 'wrap' }}>
        {hasUploadedFile && doc.documentId && (
          <button className="ld-btn-secondary ld-btn-sm" onClick={handleDownload} disabled={downloading}>
            {downloading ? 'Downloading…' : 'Download'}
          </button>
        )}

        {doc.status !== 'VERIFIED' && (
          <>
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED_KYC_FILE_EXTENSIONS}
              style={{ display: 'none' }}
              onChange={handleFileChosen}
            />
            <button className="ld-btn-primary ld-btn-sm" onClick={() => inputRef.current?.click()} disabled={busy}>
              {busy ? 'Uploading…' : isReplace ? 'Replace Document' : hasUploadedFile ? 'Re-upload' : 'Upload'}
            </button>
          </>
        )}
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
    </div>
  );
}
