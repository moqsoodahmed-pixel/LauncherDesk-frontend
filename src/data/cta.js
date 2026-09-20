/**
 * cta.js — LauncherDesk CTA design system
 *
 * Centralizes CTA copy, intent tiers and analytics event names so the same
 * "Get Exact Quote" / "Talk to Our Expert" / "Ask Sneha" vocabulary is reused
 * everywhere instead of ad-hoc button labels.
 *
 * Intent tiers (Phase 16 — contextual CTA system):
 *   HIGH   — visitor is ready to transact (quote, registration, pay/login)
 *   MEDIUM — visitor wants human reassurance before committing
 *   LOW    — visitor is still exploring / self-serve discovery
 */

export const CTA_LABELS = {
  // High intent
  getExactQuote:    'Get Exact Quote',
  startRegistration: 'Start Registration',
  payOrLogin:        'Pay / Login to Pay',

  // Medium intent
  talkToExpert:      'Talk to Our Expert',
  bookConsultation:  'Book a Consultation',

  // Low intent
  exploreServices:   'Explore Services',
  buildRoadmap:      'Build My Roadmap',
  askSneha:          'Ask Sneha',
  viewGuide:         'View Guide',
  viewClientStory:   'View Client Story',

  // Utility
  whatsapp:          'WhatsApp Us',
  chatOnWhatsapp:    'Chat on WhatsApp',
}

export const CTA_INTENT = {
  HIGH:   'high',
  MEDIUM: 'medium',
  LOW:    'low',
}

/** Short, always-true reassurance microcopy — never numeric guarantees. */
export const CTA_MICROCOPY = {
  freeGuidance:        'Free initial guidance',
  noObligation:        'No obligation',
  transparentPricing:  'Transparent pricing — no hidden fees',
  teamWillRespond:     'Our team responds personally — no call centre',
}

/**
 * Analytics event names for CTA clicks.
 * Wired only where the project already tracks events (see AIAssistant/QuoteForm
 * submit handlers) — this file does NOT install a new analytics platform, it
 * just gives every important CTA a stable, distinguishable name to log under.
 */
export const CTA_EVENTS = {
  heroWhatsapp:        'cta_hero_whatsapp',
  heroExploreServices: 'cta_hero_explore_services',
  getExactQuote:       'cta_get_exact_quote',
  talkToExpert:        'cta_talk_to_expert',
  buildRoadmap:        'cta_build_roadmap',
  askSneha:            'cta_ask_sneha',
  startRegistration:   'cta_start_registration',
  clientStory:         'cta_client_story',
  stickyServiceCta:    'cta_sticky_service',
  faqAskSneha:         'cta_faq_ask_sneha',
  faqTalkToExpert:     'cta_faq_talk_to_expert',
}

/** Fire a CTA analytics event only if the project's own tracker is present. */
export function trackCta(eventName, extra) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, extra || {})
    } else if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...extra })
    }
  } catch {
    /* analytics must never break the UI */
  }
}