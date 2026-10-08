/**
 * Minimal pulsing placeholder primitive. No existing generic skeleton
 * component was found anywhere under components/portal/ or components/ui/
 * (only the plain text-based LoadingState), so this is a new, small,
 * reusable one matching the app's existing surface/border tokens
 * (var(--ld-surface), var(--ld-border)) rather than introducing a new
 * design language. Pure CSS animation, no dependency.
 */
export default function Skeleton({ width = '100%', height = 14, radius = 6, style }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width,
        height,
        borderRadius: radius,
        background: 'linear-gradient(90deg, var(--ld-border) 25%, var(--ld-surface) 50%, var(--ld-border) 75%)',
        backgroundSize: '200% 100%',
        animation: 'ld-skeleton-pulse 1.4s ease-in-out infinite',
        ...style,
      }}
    />
  );
}

/** A row of card-shaped skeletons, for KYC document grids/tables while loading. */
export function SkeletonCards({ count = 4, height = 92 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            border: '1px solid var(--ld-border)',
            borderRadius: 'var(--ld-radius)',
            padding: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <Skeleton width="40%" height={13} />
          <Skeleton width="70%" height={height - 40} />
        </div>
      ))}
      <style>{`
        @keyframes ld-skeleton-pulse {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
