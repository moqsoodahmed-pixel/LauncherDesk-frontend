import { Link } from 'react-router-dom'
import { WHY_CHOOSE_LAUNCHERDESK } from '../../data/trust'

/**
 * WhyChooseGrid — compact "Why choose LauncherDesk?" tile grid (Phase 14).
 * Reused on service pages; homepage keeps its own richer hp-why layout but
 * pulls from the same WHY_CHOOSE_LAUNCHERDESK data (Phase 25 — one source).
 */
export default function WhyChooseGrid({ heading = 'Why choose LauncherDesk?', items = WHY_CHOOSE_LAUNCHERDESK, compact = true }) {
  const list = compact ? items.slice(0, 6) : items
  return (
    <section className="why-grid-section" aria-labelledby="why-grid-h">
      <h2 id="why-grid-h" className="why-grid-heading">{heading}</h2>
      <div className="why-grid">
        {list.map(f => (
          <div key={f.id} className="why-grid-tile reveal-up">
            <span className="why-grid-check" aria-hidden="true">
              <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </span>
            <div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
              {f.href && (
                // Plain <a> for hash-anchor targets (e.g. "/#how-it-works"):
                // <Link> only swaps the route, it never scrolls to the
                // fragment, so it would look like the button does nothing.
                f.href.includes('#') ? (
                  <a href={f.href} className="why-grid-link">
                    {f.cta || 'Learn more'}
                    <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </a>
                ) : (
                  <Link to={f.href} className="why-grid-link">
                    {f.cta || 'Learn more'}
                    <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}