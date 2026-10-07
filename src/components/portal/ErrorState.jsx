export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="ld-error-state">
      <div style={{ fontSize: 28, marginBottom: 8, opacity: 0.7 }}>⊘</div>
      <div style={{ fontWeight: 600, marginBottom: onRetry ? 12 : 0 }}>{message}</div>
      {onRetry && (
        <button
          className="ld-btn-secondary ld-btn-sm"
          onClick={onRetry}
          style={{ marginTop: 12 }}
        >
          Try again
        </button>
      )}
    </div>
  );
}
