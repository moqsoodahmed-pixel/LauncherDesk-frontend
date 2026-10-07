export default function Pagination({ meta, onPageChange }) {
  if (!meta || meta.totalPages <= 1) return null;
  const { page, totalPages, total } = meta;

  return (
    <div className="ld-pagination">
      <span style={{ fontSize: 12, color: 'var(--ld-text-muted)' }}>
        Page {page} of {totalPages}
        {total != null && ` · ${total} total`}
      </span>
      <button
        className="ld-btn-secondary ld-btn-sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        ← Prev
      </button>
      <button
        className="ld-btn-secondary ld-btn-sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next →
      </button>
    </div>
  );
}
