export default function EmptyState({ message = 'Nothing here yet.', children }) {
  return (
    <div className="ld-empty-state">
      <div style={{ fontSize: 32, marginBottom: 10, opacity: 0.4 }}>◎</div>
      <div style={{ fontWeight: 600, marginBottom: children ? 12 : 0 }}>{message}</div>
      {children}
    </div>
  );
}
