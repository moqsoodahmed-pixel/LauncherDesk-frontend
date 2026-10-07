export default function StatusBadge({ status }) {
  return <span className={`ld-badge ld-badge-${String(status).toLowerCase()}`}>{status}</span>;
}
