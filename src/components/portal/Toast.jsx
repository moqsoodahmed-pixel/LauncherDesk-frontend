import { useEffect } from 'react';

/**
 * Self-dismissing toast — Aurelius glassmorphism style.
 *
 * Supports two call patterns:
 *   <Toast toast={{ type, message }} onClose={fn} />   (legacy object pattern)
 *   <Toast type="success" message="Done" onClose={fn} /> (direct props pattern)
 */
export default function Toast({ toast, type, message, onClose }) {
  // Resolve props from either pattern
  const resolvedType    = toast?.type    ?? type;
  const resolvedMessage = toast?.message ?? message;
  const isVisible       = Boolean(resolvedMessage);

  useEffect(() => {
    if (!isVisible) return undefined;
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [isVisible, resolvedMessage, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`ld-toast ld-toast-${resolvedType === 'error' ? 'error' : 'success'}`}
      role="alert"
      aria-live="polite"
    >
      <span style={{ marginRight: 8 }}>
        {resolvedType === 'error' ? '⊘' : '✓'}
      </span>
      {resolvedMessage}
    </div>
  );
}
