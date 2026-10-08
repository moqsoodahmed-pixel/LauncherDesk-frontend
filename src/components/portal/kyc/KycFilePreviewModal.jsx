import { useEffect, useMemo, useState } from 'react';

/**
 * Fullscreen preview modal shared by the new KycUploadWidget (pre-upload
 * local File preview) and anywhere an already-uploaded document's
 * downloaded Blob needs a bigger look. Reuses the app's existing
 * ld-modal-backdrop/ld-modal classes (see components/portal/ConfirmModal.jsx)
 * for visual consistency rather than inventing a new modal chrome.
 *
 * PDF handling: embedded via an <iframe> pointed at a blob: URL (the
 * browser's native PDF viewer) rather than opening a new tab - this app has
 * no existing "view PDF in a new tab" pattern to match (grepped for
 * `window.open`, none found), and an inline embed keeps the viewer inside
 * the same fullscreen surface as the image path below, with one explicit
 * "Open in a new tab" link underneath as a fallback for the rare browser
 * that can't render a PDF in an iframe.
 *
 * Image handling: zoom (+/-/reset) and rotate (90° steps) via CSS
 * transforms on the <img>, no library.
 */
export default function KycFilePreviewModal({ open, onClose, blob, mimeType, fileName }) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const objectUrl = useMemo(() => {
    if (!open || !blob) return null;
    return window.URL.createObjectURL(blob);
  }, [open, blob]);

  useEffect(() => {
    if (!open) return undefined;
    setZoom(1);
    setRotation(0);
    return () => {
      if (objectUrl) window.URL.revokeObjectURL(objectUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, objectUrl]);

  useEffect(() => {
    if (!open) return undefined;
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose?.();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open || !objectUrl) return null;

  const resolvedMime = mimeType || blob?.type || '';
  const isPdf = resolvedMime === 'application/pdf';
  const isImage = resolvedMime.startsWith('image/');

  return (
    <div className="ld-modal-backdrop" onClick={onClose} style={{ zIndex: 400 }}>
      <div
        className="ld-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ width: 'min(92vw, 860px)', maxWidth: '92vw', maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div className="ld-modal-title" style={{ marginBottom: 0, wordBreak: 'break-all' }}>{fileName || 'Document preview'}</div>
          <button type="button" className="ld-btn-secondary ld-btn-sm" onClick={onClose}>Close ✕</button>
        </div>

        {isImage && (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
              <button type="button" className="ld-btn-secondary ld-btn-sm" onClick={() => setZoom((z) => Math.max(0.25, +(z - 0.25).toFixed(2)))}>− Zoom</button>
              <button type="button" className="ld-btn-secondary ld-btn-sm" onClick={() => setZoom((z) => Math.min(4, +(z + 0.25).toFixed(2)))}>+ Zoom</button>
              <button type="button" className="ld-btn-secondary ld-btn-sm" onClick={() => setRotation((r) => (r - 90 + 360) % 360)}>⟲ Rotate</button>
              <button type="button" className="ld-btn-secondary ld-btn-sm" onClick={() => setRotation((r) => (r + 90) % 360)}>⟳ Rotate</button>
              <button type="button" className="ld-btn-secondary ld-btn-sm" onClick={() => { setZoom(1); setRotation(0); }}>Reset</button>
              <span style={{ fontSize: 12, color: 'var(--ld-text-muted)', alignSelf: 'center' }}>{Math.round(zoom * 100)}%</span>
            </div>
            <div
              style={{
                flex: 1,
                overflow: 'auto',
                background: '#0f172a0d',
                borderRadius: 'var(--ld-radius)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 320,
              }}
            >
              <img
                src={objectUrl}
                alt={fileName || 'Document preview'}
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  transition: 'transform 0.15s ease',
                  maxWidth: zoom <= 1 ? '100%' : 'none',
                  maxHeight: zoom <= 1 ? '70vh' : 'none',
                }}
              />
            </div>
          </>
        )}

        {isPdf && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <iframe
              src={objectUrl}
              title={fileName || 'PDF preview'}
              style={{ width: '100%', height: '70vh', border: '1px solid var(--ld-border)', borderRadius: 'var(--ld-radius)' }}
            />
            <a href={objectUrl} target="_blank" rel="noreferrer" style={{ fontSize: 12, alignSelf: 'flex-start' }}>
              Open in a new tab ↗
            </a>
          </div>
        )}

        {!isImage && !isPdf && (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--ld-text-muted)' }}>
            <p>No inline preview available for this file type.</p>
            <a href={objectUrl} download={fileName || 'document'} className="ld-btn-primary ld-btn-sm">
              Download to view
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
