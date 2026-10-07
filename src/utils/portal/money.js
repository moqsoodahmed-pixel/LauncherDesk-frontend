/**
 * Formats a major-unit amount safely without crashing on missing/nullable
 * values. A configured zero amount is preserved as ₹0; only genuinely absent
 * values fall back to the caller's display message.
 */
export function formatMoney(value, { fallback = 'Not configured', locale = 'en-IN' } = {}) {
  if (value === null || value === undefined || value === '' || Number.isNaN(Number(value))) return fallback;

  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;

  return `₹${numeric.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

/**
 * Formats an integer paise amount (smallest currency unit, as returned by
 * the payment API) into a rupee display string, e.g. 1416000 -> "₹14,160.00".
 * Order pricing elsewhere in the app (OrderPricingCard, OrderDetailView) is
 * already expressed in whole rupees server-side, so this formatter is only
 * needed for the paise amounts the payment endpoints deal in.
 */
export function formatPaise(paise) {
  return formatMoney(paise == null ? null : Number(paise) / 100, { fallback: '—' });
}
