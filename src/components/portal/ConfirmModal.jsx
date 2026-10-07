/**
 * Blocking confirmation for sensitive actions (disable admin, revoke
 * sessions, reassign a client, ...). The backend remains authoritative
 * either way - this only prevents an accidental click.
 */
export default function ConfirmModal({ open, title, message, confirmLabel = 'Confirm', danger = false, isSubmitting = false, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="ld-modal-backdrop" onClick={onCancel}>
      <div className="ld-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ld-modal-title">{title}</div>
        <div className="ld-modal-body">{message}</div>
        <div className="ld-modal-actions">
          <button type="button" className="ld-btn-secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </button>
          <button
            type="button"
            className={danger ? 'ld-btn-danger' : 'ld-btn-primary'}
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Working…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
