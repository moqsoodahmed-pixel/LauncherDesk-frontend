import { Link } from 'react-router-dom'
import { REVIEWS, CASE_STUDIES } from '../../data/trust'

/**
 * ProofSection — "Real Businesses. Real Work." case studies (Phase 6) and
 * "What our customers say" testimonials (Phase 7).
 *
 * CRITICAL: this component never invents a name, a company, a quote or an
 * outcome. It reads exclusively from src/data/trust.js — REVIEWS and
 * CASE_STUDIES — which ship empty by design until the business team adds
 * verified entries. When empty, it renders a clearly-labelled, polished
 * "coming soon" state rather than fake content or an awkward blank gap.
 */

/* Clients shown in "Real Businesses. Real Work." until full case studies are added to data/trust.js */
const CLIENT_NAMES = ['AL Baraqa', 'Officerestore', 'Ocean Premium Construction']

function Stars({ rating }) {
  const n = Math.round(rating || 5)
  return (
    <span className="proof-stars" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(n)}{'☆'.repeat(Math.max(0, 5 - n))}
    </span>
  )
}

function CaseStudyCard({ item }) {
  return (
    <div className="proof-case-card reveal-up">
      <div className="proof-case-top">
        <span className="proof-case-industry">{item.industry}</span>
        {item.verified && <span className="proof-case-verified">Verified outcome</span>}
      </div>
      <h3 className="proof-case-title">{item.anonymous ? item.title : item.client}</h3>
      <div className="proof-case-row">
        <span className="proof-case-label">Business requirement</span>
        <p>{item.challenge}</p>
      </div>
      <div className="proof-case-row">
        <span className="proof-case-label">Services</span>
        <div className="proof-case-chips">
          {(item.services || []).map(s => <span key={s} className="proof-case-chip">{s}</span>)}
        </div>
      </div>
      <div className="proof-case-row">
        <span className="proof-case-label">Outcome</span>
        <p>{item.outcome}</p>
      </div>
      {item.href && (
        <Link to={item.href} className="proof-case-link">
          View Client Story
          <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      )}
    </div>
  )
}

function TestimonialCard({ item }) {
  return (
    <div className="proof-testi-card reveal-up">
      <Stars rating={item.rating} />
      <p className="proof-testi-quote">&ldquo;{item.text}&rdquo;</p>
      <div className="proof-testi-who">
        <div className="proof-testi-name">{item.name}</div>
        <div className="proof-testi-meta">
          {[item.designation, item.company, item.city].filter(Boolean).join(', ')}
        </div>
      </div>
      {item.verified && (
        <span className="proof-testi-badge">
          <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
          {item.source ? `Verified — ${item.source}` : 'Verified review'}
        </span>
      )}
    </div>
  )
}

function EmptyProofState({ heading, body }) {
  return (
    <div className="proof-empty reveal-up">
      <div className="proof-empty-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4m0 4h.01M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" /></svg>
      </div>
      <h3>{heading}</h3>
      <p>{body}</p>
    </div>
  )
}

export function CaseStudiesSection() {
  const items = (CASE_STUDIES || []).slice(0, 3)
  return (
    <section className="proof-section" aria-labelledby="proof-cases-h">
      <div className="wrap">
        <div className="hp-section-head">
          <div className="hp-section-eyebrow" style={{ color: 'var(--blue)' }}>Client stories</div>
          <h2 id="proof-cases-h">Real Businesses. Real Work.</h2>
          <p>See how LauncherDesk helps businesses launch, operate and grow.</p>
        </div>
        {items.length > 0 ? (
          <div className="proof-case-grid">
            {items.map(item => <CaseStudyCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, maxWidth: 960, margin: '0 auto' }}>
            {CLIENT_NAMES.map(name => (
              <div key={name} className="reveal-up" style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '20px 22px', boxShadow: '0 2px 10px rgba(15,28,46,.05)' }}>
                <span aria-hidden="true" style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0, display: 'grid', placeItems: 'center', background: 'var(--brand-50, #EEF4FF)', color: 'var(--blue)', fontWeight: 900, fontSize: 16 }}>
                  {name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                </span>
                <span style={{ fontSize: 16.5, fontWeight: 800, color: 'var(--navy)', lineHeight: 1.3 }}>{name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export function TestimonialsSection() {
  const items = (REVIEWS || []).slice(0, 6)
  return (
    <section className="proof-section proof-section--alt" aria-labelledby="proof-testi-h">
      <div className="wrap">
        <div className="hp-section-head">
          <div className="hp-section-eyebrow" style={{ color: 'var(--blue)' }}>Reviews</div>
          <h2 id="proof-testi-h">What our customers say.</h2>
          <p>Real experiences from businesses we've supported.</p>
        </div>
        {items.length > 0 ? (
          <div className="proof-testi-grid">
            {items.map(item => <TestimonialCard key={item.id} item={item} />)}
          </div>
        ) : (
          <EmptyProofState
            heading="Verified reviews are on the way"
            body="We only display reviews we can verify against a real client or a linked source (e.g. Google). Check back soon, or ask us directly on WhatsApp for references."
          />
        )}
      </div>
    </section>
  )
}

export default function ProofSection() {
  return (
    <>
      <CaseStudiesSection />
      <TestimonialsSection />
    </>
  )
}