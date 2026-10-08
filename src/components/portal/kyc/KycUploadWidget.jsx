import { useRef, useState } from 'react';
import KycFilePreviewModal from './KycFilePreviewModal';
import { triggerBlobDownload } from './kycDownload';
import { ACCEPTED_KYC_FILE_EXTENSIONS, ACCEPTED_KYC_MIME_TYPES, MAX_KYC_FILE_SIZE_BYTES, MAX_KYC_FILE_SIZE_MB } from '../../../constants/portal/kycStatus';

/**
 * Modern drag-and-drop KYC file uploader - a new, reusable component (Task
 * 2) composed both into the new per-business-type dashboard (DocumentsPage)
 * and, as a drop-in replacement for the plain <input type="file"> button,
 * into the existing ClientKycPanel.jsx DocumentRow (the actual upload
 * network call stays exactly the same - uploadOwnKycDocument - only the
 * widget around it changes; see ClientKycPanel.jsx for the reasoning).
 *
 * No drag-drop library was added: package.json has none installed, and
 * native HTML5 DnD events (onDragOver/onDrop) cover the brief's
 * requirements without a new dependency.
 *
 * Covers: drag-and-drop, upload progress, pre-upload preview (image
 * thumbnail / PDF icon), replace, delete, retry-on-failure. Zoom/rotate and
 * the fullscreen preview itself live in KycFilePreviewModal, reused here
 * for the "preview before upload" step.
 */
export default function KycUploadWidget({
  existingFileName,
  hasExisting,
  disabled,
  compact = false,
  onUpload, // async (file, onProgress) => void - caller wires the real API call
  onDownload, // async () => ({ blob, fileName }) - caller wires the real API call
  onDelete, // optional async () => void
  onUploaded, // called after a successful upload, so the parent can refetch
  uploadButtonLabel,
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [pendingPreviewUrl, setPendingPreviewUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSource, setPreviewSource] = useState(null); // { blob, mimeType, fileName }

  function validateAndStage(file) {
    if (!file) return;
    setError('');
    if (ACCEPTED_KYC_MIME_TYPES.length && file.type && !ACCEPTED_KYC_MIME_TYPES.includes(file.type)) {
      setError(`"${file.name}" is not an accepted file type. Use PDF, JPG or PNG.`);
      return;
    }
    if (file.size > MAX_KYC_FILE_SIZE_BYTES) {
      setError(`"${file.name}" is too large. Maximum allowed size is ${MAX_KYC_FILE_SIZE_MB}MB.`);
      return;
    }
    if (pendingPreviewUrl) window.URL.revokeObjectURL(pendingPreviewUrl);
    setPendingFile(file);
    setPendingPreviewUrl(file.type.startsWith('image/') ? window.URL.createObjectURL(file) : null);
  }

  function handleInputChange(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    validateAndStage(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (disabled || uploading) return;
    const file = e.dataTransfer.files?.[0];
    validateAndStage(file);
  }

  function cancelPending() {
    if (pendingPreviewUrl) window.URL.revokeObjectURL(pendingPreviewUrl);
    setPendingFile(null);
    setPendingPreviewUrl(null);
    setError('');
    setProgress(0);
  }

  async function doUpload() {
    if (!pendingFile) return;
    setUploading(true);
    setError('');
    try {
      await onUpload(pendingFile, (evt) => {
        if (evt?.total) setProgress(Math.round((evt.loaded / evt.total) * 100));
      });
      cancelPending();
      onUploaded?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. You can retry below.');
    } finally {
      setUploading(false);
    }
  }

  async function handlePreviewPending() {
    setPreviewSource({ blob: pendingFile, mimeType: pendingFile.type, fileName: pendingFile.name });
    setPreviewOpen(true);
  }

  async function handleViewExisting() {
    if (!onDownload) return;
    setDownloading(true);
    try {
      const { blob, fileName, mimeType } = await onDownload();
      setPreviewSource({ blob, mimeType: mimeType || blob.type, fileName: fileName || existingFileName });
      setPreviewOpen(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load this document for preview.');
    } finally {
      setDownloading(false);
    }
  }

  async function handleDownloadExisting() {
    if (!onDownload) return;
    setDownloading(true);
    try {
      const { blob, fileName } = await onDownload();
      triggerBlobDownload({ blob, fileName: fileName || existingFileName });
    } catch (err) {
      setError(err.response?.data?.message || 'Could not download this document.');
    } finally {
      setDownloading(false);
    }
  }

  const isPdfPending = pendingFile && pendingFile.type === 'application/pdf';

  return (
    <div>
      {!pendingFile && (
        <div
          onDragOver={(e) => { e.preventDefault(); if (!disabled && !uploading) setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !disabled && !uploading && inputRef.current?.click()}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => { if (!disabled && (e.key === 'Enter' || e.key === ' ')) inputRef.current?.click(); }}
          style={{
            border: `1.5px dashed ${dragOver ? 'var(--ld-primary)' : 'var(--ld-border)'}`,
            borderRadius: 'var(--ld-radius)',
            padding: compact ? '10px 12px' : '18px 14px',
            textAlign: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            background: dragOver ? 'rgba(99,102,241,0.06)' : 'transparent',
            opacity: disabled ? 0.5 : 1,
            transition: 'all 0.12s ease',
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_KYC_FILE_EXTENSIONS}
            style={{ display: 'none' }}
            onChange={handleInputChange}
            disabled={disabled}
          />
          <div style={{ fontSize: compact ? 12 : 13, color: 'var(--ld-text-muted)' }}>
            {disabled
              ? 'Upload not available right now.'
              : <>Drag &amp; drop a file here, or <span style={{ color: 'var(--ld-primary)', fontWeight: 600 }}>browse</span></>}
          </div>
          {!compact && !disabled && (
            <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginTop: 4 }}>
              PDF, JPG or PNG · up to {MAX_KYC_FILE_SIZE_MB}MB
            </div>
          )}
        </div>
      )}

      {pendingFile && (
        <div style={{ border: '1px solid var(--ld-border)', borderRadius: 'var(--ld-radius)', padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
          {pendingPreviewUrl ? (
            <img src={pendingPreviewUrl} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, cursor: 'pointer' }} onClick={handlePreviewPending} />
          ) : (
            <div onClick={handlePreviewPending} style={{ width: 48, height: 48, borderRadius: 6, background: 'var(--ld-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'pointer', flexShrink: 0 }}>
              {isPdfPending ? '📄' : '📎'}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pendingFile.name}</div>
            <div style={{ fontSize: 11, color: 'var(--ld-text-muted)' }}>{(pendingFile.size / 1024).toFixed(0)} KB</div>
            {uploading && (
              <div style={{ marginTop: 6, height: 5, background: 'var(--ld-border)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'var(--ld-primary)', transition: 'width 0.15s ease' }} />
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            {!uploading && (
              <button type="button" className="ld-btn-secondary ld-btn-sm" onClick={handlePreviewPending}>Preview</button>
            )}
            <button type="button" className="ld-btn-primary ld-btn-sm" onClick={doUpload} disabled={uploading}>
              {uploading ? `Uploading… ${progress}%` : error ? 'Retry Upload' : 'Upload'}
            </button>
            {!uploading && (
              <button type="button" className="ld-btn-secondary ld-btn-sm" onClick={cancelPending}>Cancel</button>
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="ld-phase-note" style={{ color: 'var(--ld-danger)', marginTop: 6 }}>{error}</p>
      )}

      {hasExisting && !pendingFile && onDownload && (
        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          <button type="button" className="ld-btn-secondary ld-btn-sm" onClick={handleViewExisting} disabled={downloading}>
            {downloading ? 'Loading…' : 'View'}
          </button>
          <button type="button" className="ld-btn-secondary ld-btn-sm" onClick={handleDownloadExisting} disabled={downloading}>
            Download
          </button>
          {onDelete && !disabled && (
            <button type="button" className="ld-btn-danger ld-btn-sm" onClick={onDelete}>Delete</button>
          )}
          {!disabled && (
            <span style={{ fontSize: 11, color: 'var(--ld-text-muted)', alignSelf: 'center' }}>
              {uploadButtonLabel || 'Drop or choose a new file above to replace it.'}
            </span>
          )}
        </div>
      )}

      <KycFilePreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        blob={previewSource?.blob}
        mimeType={previewSource?.mimeType}
        fileName={previewSource?.fileName}
      />
    </div>
  );
}
