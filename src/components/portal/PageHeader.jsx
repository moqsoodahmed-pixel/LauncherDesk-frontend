/**
 * Page-level header — Aurelius style.
 * Wraps the main page title + subtitle with optional right-side actions.
 */
export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div style={{
      marginBottom: 22,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16,
    }}>
      <div>
        <h1 style={{
          fontSize: 26,
          fontWeight: 900,
          margin: 0,
          letterSpacing: '-0.03em',
          color: 'var(--ld-text)',
          lineHeight: 1.15,
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{
            margin: '5px 0 0',
            color: 'var(--ld-text-muted)',
            fontSize: 13,
            fontWeight: 500,
          }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignItems: 'center' }}>
          {actions}
        </div>
      )}
    </div>
  );
}
