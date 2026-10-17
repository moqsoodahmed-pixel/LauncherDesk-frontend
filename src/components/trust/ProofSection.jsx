import { Link } from 'react-router-dom'
import { REVIEWS, CASE_STUDIES } from '../../data/trust'
import logoAlBarakah from '../../assets/clients/al-barakah.webp'
import logoOfficerestore from '../../assets/clients/officerestore.webp'
import logoOcean from '../../assets/clients/ocean-premium-construction.webp'
import logoJacobella from '../../assets/clients/jacobella.webp'

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

/* Clients shown in "Real Businesses. Real Work." */
const CLIENTS = [
  {
    name: 'Al Barakah Group of Industries',
    logo: logoAlBarakah,
    url: null, // Pending real URL from business owner
  },
  {
    name: 'Officerestore',
    logo: logoOfficerestore,
    url: 'https://officerestore.com/',
  },
  {
    name: 'Ocean Premium Construction',
    logo: logoOcean,
    url: 'https://oceanpremiumconstruction.com/',
  },
  {
    name: 'Jacobella',
    logo: logoJacobella,
    url: 'https://jacobella.com/',
  },
]

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
          {item.source ? `Verified: ${item.source}` : 'Verified review'}
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
          <>
          <style>{CLIENTS_CSS}</style>
          <div className="proof-clients" role="list" aria-label="Client stories">
            {CLIENTS.map(c => {
              if (!c.url) {
                return (
                  <div key={c.name} role="listitem">
                    {/* Al Barakah has NO confirmed real website yet: non-clickable placeholder */}
                    <div
                      className="client-card client-card--pending proof-client reveal-up"
                      aria-label={`${c.name} - website coming soon`}
                    >
                      <span className="proof-client-logo">
                        <img src={c.logo} alt={`${c.name} logo`} loading="lazy" />
                      </span>
                      <span className="client-name proof-client-name">{c.name}</span>
                      <span className="badge-pending">Website coming soon</span>
                    </div>
                  </div>
                )
              }
              return (
                <div key={c.name} role="listitem">
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${c.name}'s website (opens in a new tab)`}
                    className="client-card proof-client reveal-up"
                  >
                    <span className="proof-client-logo">
                      <img src={c.logo} alt={`${c.name} logo`} loading="lazy" />
                    </span>
                    <span className="client-name proof-client-name">{c.name}</span>
                  </a>
                </div>
              )
            })}
          </div>
          </>
        )}
      </div>
    </section>
  )
}

const CLIENTS_CSS = `
.proof-clients {
  margin: 0 auto;
  padding: 0;
  max-width: 1100px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.client-card,
.proof-client {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: rgba(14, 22, 38, 0.70);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 20px;
  padding: 24px 20px;
  text-decoration: none;
  min-height: 180px;
  min-width: 44px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease, border-color 0.22s ease;
  outline: none;
  box-sizing: border-box;
  height: 100%;
  cursor: pointer;
}
.client-card:hover,
.proof-client:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: rgba(56, 189, 248, 0.45);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.65), 0 0 24px rgba(30, 111, 251, 0.25);
}
.client-card:focus-visible {
  outline: 2px solid #38BDF8;
  outline-offset: 4px;
}
.client-card--pending {
  cursor: default !important;
}
.client-card--pending:hover {
  transform: none !important;
  border-color: rgba(255, 255, 255, 0.14) !important;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45) !important;
}
.proof-client-logo {
  height: 90px;
  width: 100%;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 12px;
  box-sizing: border-box;
}
.proof-client-logo img {
  max-height: 70px;
  max-width: 100%;
  object-fit: contain;
  border-radius: 6px;
  filter: brightness(1.05);
}
.client-name,
.proof-client-name {
  font-size: 15px;
  font-weight: 700;
  color: #F8FAFC;
  text-align: center;
  line-height: 1.35;
}
.badge-pending {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  color: #94A3B8;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 999px;
  padding: 3px 12px;
  letter-spacing: 0.02em;
}
@media (max-width: 860px) {
  .proof-clients { grid-template-columns: repeat(2, 1fr); gap: 16px; }
}
@media (max-width: 480px) {
  .proof-clients { grid-template-columns: 1fr; gap: 14px; }
  .proof-client-logo { height: 90px; }
  .proof-client-logo img { max-height: 70px; }
}
`

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