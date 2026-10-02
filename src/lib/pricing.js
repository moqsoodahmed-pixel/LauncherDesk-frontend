// Shared fee maths. Amounts are kept in paise (integers) so GST never drifts.
// The server does the same calculation (backend: src/config/planPrices.js)
// and is what actually decides the amount charged.
export const GST_RATE = 0.18

export function parseRupees(price) {
  const n = parseFloat(String(price || '').replace(/[₹,*\s]/g, ''))
  return Number.isFinite(n) ? n : 0
}

export function calcBreakdown(feeRupees) {
  const feePaise = Math.round(feeRupees * 100)
  const gstPaise = Math.round(feePaise * GST_RATE)
  return { feePaise, gstPaise, totalPaise: feePaise + gstPaise }
}

// 589882 → "₹5,898.82", 500000 → "₹5,000"
export function fmtPaise(paise) {
  const rupees = paise / 100
  const whole = Number.isInteger(rupees)
  return '₹' + rupees.toLocaleString('en-IN', { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2 })
}