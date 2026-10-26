import { Link } from 'react-router-dom'
import { REVIEWS, CASE_STUDIES } from '../../data/trust'
import logoAlBarakah from '../../assets/clients/al-barakah.webp'
import logoOfficerestore from '../../assets/clients/officerestore.webp'
import logoOcean from '../../assets/clients/ocean-premium-construction.webp'
import logoJacobella from '../../assets/clients/jacobella.webp'

/**
 * ProofSection — Client Portfolio & Enterprise Engagements.
 *
 * Professional, corporate portfolio structure:
 * 1. Company Logo & Industry Badge
 * 2. Company Name
 * 3. One-line Company Description (Max 10 words)
 * 4. Business Requirement (Max 2 concise lines)
 * 5. Services Delivered (Max 5 factual bullets)
 * 6. Current Engagement Status (Factual service status)
 * 7. Website Verification Link / Status
 *
 * 100% factual & service-oriented: No fabricated stories,
 * no unverifiable metrics, and no imaginary testimonials.
 */

const CLIENTS = [
  {
    name: 'Al Barakah Group of Industries',
    logo: logoAlBarakah,
    url: null, // Pending real URL from business owner
    industry: 'Industrial & Manufacturing',
    businessProfile: 'Multi-state industrial manufacturing and commercial distribution company.',
    requirement: 'Required multi-state corporate compliance, statutory ROC filings and vendor documentation.',
    services: [
      'Company Registration',
      'GST Registration',
      'Trademark Registration',
      'Annual Compliance',
      'Vendor Agreements',
    ],
    status: 'Annual statutory filings and compliance support ongoing.',
  },
  {
    name: 'Officerestore',
    logo: logoOfficerestore,
    url: 'https://officerestore.com/',
    industry: 'Workspace & Commercial Solutions',
    businessProfile: 'Turnkey commercial workspace and enterprise facility solutions provider.',
    requirement: 'Needed trademark protection, commercial service agreements and recurring GST compliance.',
    services: [
      'Trademark Registration',
      'Commercial Agreements (MSAs)',
      'GST Compliance',
      'Annual Corporate Filings',
      'Legal Documentation',
    ],
    status: 'Corporate compliance support and filings maintained.',
  },
  {
    name: 'Ocean Premium Construction',
    logo: logoOcean,
    url: 'https://oceanpremiumconstruction.com/',
    industry: 'Infrastructure & Construction',
    businessProfile: 'Commercial infrastructure development and civil engineering contracting firm.',
    requirement: 'Required business entity incorporation, subcontractor agreements and statutory tax registration.',
    services: [
      'Company Incorporation',
      'Subcontractor Agreements',
      'GST Registration',
      'Statutory Documentation',
      'Vendor Contracts',
    ],
    status: 'Registration completed; corporate documentation maintained.',
  },
  {
    name: 'Jacobella',
    logo: logoJacobella,
    url: 'https://jacobella.com/',
    industry: 'Retail & Consumer Goods',
    businessProfile: 'Direct-to-consumer lifestyle apparel and retail brand.',
    requirement: 'Needed trademark protection across merchandise classes and commercial vendor agreements.',
    services: [
      'Trademark Registration',
      'Commercial Agreements',
      'E-Commerce Compliance',
      'Legal Documentation',
      'Corporate Filings',
    ],
    status: 'Trademark portfolio under active management.',
  },
]

function Stars({ rating = 5 }) {
  const n = Math.round(rating)
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
        <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4m0 4h.01M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" /></svg>
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
          <h2 id="proof-cases-h">Enterprise Trust. Proven Business Outcomes.</h2>
          <p>Discover how businesses across multiple industries rely on LauncherDesk to simplify compliance, strengthen operations and accelerate sustainable growth through expert business solutions.</p>
        </div>
        {items.length > 0 ? (
          <div className="proof-case-grid">
            {items.map(item => <CaseStudyCard key={item.id} item={item} />)}
          </div>
        ) : (
          <>
          <style>{CLIENTS_CSS}</style>
          <div className="proof-clients" role="list" aria-label="Client stories">
            {CLIENTS.map(c => (
              <div key={c.name} role="listitem" className="proof-client-col">
                <article className="proof-corporate-card reveal-up">
                  {/* Top: Corporate Logo and Industry Badge */}
                  <div className="pcc-top">
                    <div className="pcc-logo-wrap">
                      <img src={c.logo} alt={`${c.name} logo`} loading="lazy" />
                    </div>
                    <span className="pcc-badge">{c.industry}</span>
                  </div>

                  {/* Company Name & One-line Company Description */}
                  <div className="pcc-header-block">
                    <h3 className="pcc-name">{c.name}</h3>
                    <p className="pcc-biz-profile">{c.businessProfile}</p>
                  </div>

                  {/* Business Requirement (Factual, 2 lines max) */}
                  <div className="pcc-scope-box">
                    <span className="pcc-scope-label">
                      <svg viewBox="0 0 24 24" width={11} height={11} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                      Business Requirement
                    </span>
                    <p className="pcc-scope-text">{c.requirement}</p>
                  </div>

                  {/* Services Delivered Box (4-5 factual bullets) */}
                  <div className="pcc-highlights-box">
                    <div className="pcc-hl-label">
                      <svg viewBox="0 0 16 16" width={13} height={13} fill="currentColor" aria-hidden="true">
                        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.2 5.3-3.6 4.2a.75.75 0 0 1-1.1 0L4.8 8.6a.75.75 0 1 1 1.1-1l1.1 1.2 3.1-3.6a.75.75 0 1 1 1.1 1.1z" />
                      </svg>
                      Services Delivered
                    </div>
                    <ul className="pcc-hl-list">
                      {c.services.map(s => (
                        <li key={s} className="pcc-hl-item">
                          <svg className="pcc-check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Current Engagement Status */}
                  <div className="pcc-status-box">
                    <span className="pcc-status-dot" aria-hidden="true" />
                    <span className="pcc-status-text">{c.status}</span>
                  </div>

                  {/* Card Footer: Website link or development badge */}
                  <div className="pcc-footer">
                    {c.url ? (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pcc-link"
                        aria-label={`Visit ${c.name} website (opens in a new tab)`}
                      >
                        <span>Visit Website</span>
                        <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </a>
                    ) : (
                      <span className="pcc-tag-pending">
                        <span className="pcc-dot" />
                        Corporate Website in Development
                      </span>
                    )}
                  </div>
                </article>
              </div>
            ))}
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
  max-width: 1360px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  align-items: stretch;
}
.proof-client-col {
  display: flex;
  height: 100%;
}
.proof-corporate-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background: rgba(14, 22, 38, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 20px;
  padding: 24px 22px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.24s ease, border-color 0.24s ease;
  box-sizing: border-box;
  position: relative;
}
.proof-corporate-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.40);
  box-shadow: 0 24px 54px rgba(0, 0, 0, 0.65), 0 0 28px rgba(30, 111, 251, 0.22);
}
.pcc-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}
.pcc-logo-wrap {
  height: 52px;
  width: 90px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 12px;
  padding: 8px 10px;
  box-sizing: border-box;
  flex-shrink: 0;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
.pcc-logo-wrap img {
  max-height: 38px;
  max-width: 100%;
  object-fit: contain;
  border-radius: 4px;
  filter: brightness(1.05);
}
.pcc-badge {
  font-size: 11px;
  font-weight: 700;
  color: #38BDF8;
  background: rgba(56, 189, 248, 0.10);
  border: 1px solid rgba(56, 189, 248, 0.22);
  border-radius: 99px;
  padding: 4px 10px;
  letter-spacing: 0.01em;
  white-space: normal;
  text-align: right;
  line-height: 1.25;
}
.pcc-header-block {
  margin-bottom: 14px;
}
.pcc-name {
  font-size: 16.5px;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0 0 4px;
  line-height: 1.35;
  letter-spacing: -0.01em;
}
.pcc-biz-profile {
  font-size: 12px;
  font-weight: 600;
  color: #38BDF8;
  margin: 0;
  line-height: 1.35;
  letter-spacing: 0.01em;
}
.pcc-scope-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 14px;
}
.pcc-scope-label {
  font-size: 10.5px;
  font-weight: 800;
  color: #38BDF8;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.pcc-scope-text {
  font-size: 12.5px;
  line-height: 1.5;
  color: #CBD5E1;
  margin: 0;
}
.pcc-highlights-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 12px 14px 10px;
  margin-bottom: 14px;
  flex: 1 1 auto;
}
.pcc-hl-label {
  font-size: 10.5px;
  font-weight: 800;
  color: #CBD5E1;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.pcc-hl-label svg {
  color: #38BDF8;
}
.pcc-hl-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
}
.pcc-hl-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  color: #F1F5F9;
  font-weight: 600;
  line-height: 1.35;
}
.pcc-check {
  width: 13px;
  height: 13px;
  color: #10B981;
  flex-shrink: 0;
}
.pcc-status-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 8px 12px;
  margin-bottom: 14px;
}
.pcc-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.45);
  flex-shrink: 0;
}
.pcc-status-text {
  font-size: 11.5px;
  color: #94A3B8;
  font-weight: 500;
  line-height: 1.35;
}
.pcc-footer {
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.pcc-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #38BDF8;
  text-decoration: none;
  transition: color 0.18s ease, transform 0.18s ease;
}
.pcc-link:hover {
  color: #60A5FA;
  transform: translateX(2px);
}
.pcc-tag-pending {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #94A3B8;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 99px;
  padding: 3px 9px;
}
.pcc-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #F59E0B;
}
@media (max-width: 1180px) {
  .proof-clients {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
}
@media (max-width: 680px) {
  .proof-clients {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .proof-corporate-card {
    padding: 20px 18px;
  }
  .pcc-name {
    font-size: 16px;
  }
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