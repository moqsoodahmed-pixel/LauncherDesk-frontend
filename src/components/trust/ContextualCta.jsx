import { Link } from 'react-router-dom'
import { trackCta } from '../../data/cta'

const ARROW = 'M5 12h14M12 5l7 7-7 7'

/**
 * Shared button renderer for ContextualCta — kept outside the component
 * function body (not re-declared on every render).
 *
 * "Ask Sneha" opens the existing AI Assistant widget via the site-wide
 * data-open-ai delegated click handler (AIAssistant.jsx) — no duplicate
 * chatbot logic is created here (Phase 11).
 */
function CtaButton({ children, cls, to, href, askSneha, onClick }) {
  if (askSneha) {
    return (
      <button type="button" data-open-ai="true" className={cls} onClick={onClick}>
        {children}
      </button>
    )
  }
  if (href) {
    const external = /^https?:\/\//.test(href)
    return (
      <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
        className={cls} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={cls} onClick={onClick}>
      {children}
    </Link>
  )
}

/**
 * ContextualCta — small reusable "prompt + button" block (Phase 16).
 *
 * Instead of repeating the same "Get Started" everywhere, each placement
 * passes a short question that matches what the visitor just read and a
 * button whose label matches their intent tier (high/medium/low).
 *
 * `to` for an internal route, or `href` for an external link (WhatsApp, tel).
 */
export default function ContextualCta({
  prompt,
  label,
  to,
  href,
  askSneha,
  intent = 'medium',
  secondaryLabel,
  secondaryTo,
  secondaryHref,
  secondaryAskSneha,
  event,
  className = '',
}) {
  return (
    <div className={`ctx-cta reveal-up ${className}`}>
      {prompt && <span className="ctx-cta-prompt">{prompt}</span>}
      <div className="ctx-cta-btns">
        <CtaButton
          cls={`ctx-cta-btn ctx-cta-btn--${intent}`}
          to={to} href={href} askSneha={askSneha}
          onClick={() => event && trackCta(event)}
        >
          {label}
          {!askSneha && <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ARROW} /></svg>}
        </CtaButton>
        {secondaryLabel && (
          <CtaButton
            cls="ctx-cta-btn ctx-cta-btn--ghost"
            to={secondaryTo} href={secondaryHref} askSneha={secondaryAskSneha}
          >
            {secondaryLabel}
          </CtaButton>
        )}
      </div>
    </div>
  )
}
