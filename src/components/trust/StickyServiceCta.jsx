import { useEffect, useState } from 'react'
import { trackCta, CTA_EVENTS } from '../../data/cta'

const WA_PATH = 'M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z'

/**
 * StickyServiceCta — Phase 15.
 *
 * A non-intrusive sticky CTA for service pages. It only appears once the
 * visitor has scrolled past the hero (so it never duplicates the hero CTA
 * immediately), can be dismissed for the rest of the visit, and reserves
 * space for itself via a CSS custom property (`--sticky-cta-h`) so the
 * existing Ask Sneha / WhatsApp / Partner-With-Us floating stack (`.fab-stack`)
 * shifts up on mobile instead of being covered — see the
 * `.fab-stack { bottom: calc(20px + var(--sticky-cta-h, 0px)) }` rule added
 * to launcherdesk.css.
 *
 * Uses transform/opacity only for its show/hide transition (no layout shift,
 * no reflow) and respects prefers-reduced-motion via the shared .reveal-up
 * conventions already used across the site.
 */
export default function StickyServiceCta({ title, priceLabel, waMessage }) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const key = 'ld_sticky_cta_dismissed'
    try {
      if (sessionStorage.getItem(key) === '1') setDismissed(true)
    } catch { /* storage may be unavailable — fail open */ }

    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const show = visible && !dismissed
    const root = document.documentElement
    if (show && window.innerWidth <= 760) {
      root.style.setProperty('--sticky-cta-h', '68px')
    } else {
      root.style.setProperty('--sticky-cta-h', '0px')
    }
    return () => root.style.setProperty('--sticky-cta-h', '0px')
  }, [visible, dismissed])

  if (dismissed || !visible) return null

  const dismiss = () => {
    setDismissed(true)
    try { sessionStorage.setItem('ld_sticky_cta_dismissed', '1') } catch { /* noop */ }
  }

  return (
    <div className="sticky-svc-cta" role="complementary" aria-label={`Quick actions for ${title}`}>
      <div className="sticky-svc-cta-inner">
        <div className="sticky-svc-cta-info">
          <span className="sticky-svc-cta-name">{title}</span>
          {priceLabel && <span className="sticky-svc-cta-price">{priceLabel}</span>}
        </div>
        <div className="sticky-svc-cta-btns">
          <a href="#quote-form" className="sticky-svc-cta-btn sticky-svc-cta-btn--primary"
            onClick={() => trackCta(CTA_EVENTS.stickyServiceCta)}>
            Get Exact Quote
          </a>
          <a href={`https://wa.me/918548854859?text=${encodeURIComponent(waMessage || `Hi, I'm interested in ${title}`)}`}
            target="_blank" rel="noopener noreferrer" className="sticky-svc-cta-btn sticky-svc-cta-btn--wa" aria-label="WhatsApp us">
            <svg viewBox="0 0 32 32" width={18} height={18} fill="currentColor" aria-hidden="true"><path d={WA_PATH} /></svg>
          </a>
        </div>
        <button className="sticky-svc-cta-close" onClick={dismiss} aria-label="Dismiss">
          <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  )
}