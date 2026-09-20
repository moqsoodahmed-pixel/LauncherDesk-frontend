import { COMPANY_METRICS, TRUST_BADGES } from '../../data/company'

/**
 * TrustBar — compact, honest hero trust strip (Phase 2 / Phase 3).
 *
 * Reads only from the single centralized source (company.js COMPANY_METRICS /
 * TRUST_BADGES) so numbers can never drift out of sync with the rest of the
 * site. Any metric that is `null` (not yet verified) is simply not rendered —
 * this component never fabricates a rating, a client count or a review count.
 *
 * Renders nothing if there is genuinely no verified signal yet, rather than
 * showing an empty/awkward bar.
 */
export default function TrustBar({ className = '' }) {
  const items = []

  if (COMPANY_METRICS.serviceCategories) {
    items.push({ id: 'categories', value: `${COMPANY_METRICS.serviceCategories}+`, label: 'Service categories' })
  }
  if (COMPANY_METRICS.businessesLaunched) {
    items.push({ id: 'businesses', value: `${COMPANY_METRICS.businessesLaunched}+`, label: 'Businesses launched' })
  }
  if (COMPANY_METRICS.clientsServed) {
    items.push({ id: 'clients', value: `${COMPANY_METRICS.clientsServed}+`, label: 'Businesses served' })
  }
  if (COMPANY_METRICS.yearsOperating) {
    items.push({ id: 'years', value: `${COMPANY_METRICS.yearsOperating}+`, label: 'Years operating' })
  }
  if (COMPANY_METRICS.satisfactionRate) {
    items.push({ id: 'satisfaction', value: `${COMPANY_METRICS.satisfactionRate}%`, label: 'Client satisfaction' })
  }
  if (COMPANY_METRICS.rating && COMPANY_METRICS.reviewCount) {
    items.push({ id: 'rating', value: `${COMPANY_METRICS.rating}/5`, label: `From ${COMPANY_METRICS.reviewCount}+ verified reviews`, stars: true })
  }

  // Always-true structural facts (not a "metric" that needs verification —
  // this is simply how the service is delivered).
  items.push({ id: 'contact', value: '1', label: 'Single point of contact' })

  const badges = (TRUST_BADGES || []).filter(b => b.verified)

  if (items.length <= 1 && badges.length === 0) return null

  return (
    <div className={`trust-bar reveal-up in ${className}`} role="group" aria-label="Trust signals">
      <div className="trust-bar-items">
        {items.map(it => (
          <div key={it.id} className="trust-bar-item">
            {it.stars && (
              <span className="trust-bar-stars" aria-hidden="true">★★★★★</span>
            )}
            <span className="trust-bar-value">{it.value}</span>
            <span className="trust-bar-label">{it.label}</span>
          </div>
        ))}
        {badges.map(b => (
          <div key={b.id} className="trust-bar-item trust-bar-badge">
            <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="trust-bar-label">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
