export default function LoadingState({ label = 'Loading…' }) {
  return (
    <div className="ld-loading-state" aria-label={label}>
      <span style={{ color: 'var(--ld-text-muted)', fontSize: 13 }}>{label}</span>
    </div>
  );
}
