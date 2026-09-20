/**
 * trust.js — LauncherDesk trust signal data
 *
 * IMPORTANT: Do NOT invent experts, reviews, case studies, or client logos.
 * This file defines the data schema and holds only approved content.
 *
 * To add real data: populate the arrays below with approved information only.
 */

export const EXPERTS = [
  // Add real expert profiles here when approved by management.
  // Required fields: id, name, designation, qualification, experience, expertise[], services[], bio, photo, linkedin, memberships[], verified
]

export const REVIEWS = [
  // Add only verified Google Business reviews or written testimonials with source URLs.
  // Required fields: id, name, company, city, rating, text, date, source, sourceUrl, verified
]

export const CASE_STUDIES = [
  // Add real or approved-anonymised client stories only.
  // Required fields: id, title, client, industry, location, challenge, services[], timeline, outcome, quote, anonymous
]

export const CLIENT_LOGOS = [
  // Add only where logo usage permission has been obtained.
  // Required fields: id, name, logo, url, permission
]

/**
 * WHY_CHOOSE_LAUNCHERDESK — Phase 5/14 differentiator content.
 * Every line here must be a claim already true of how LauncherDesk actually
 * operates (see ServicePage/QuoteForm/Ask Sneha functionality) — no numeric
 * guarantees, no "best in India" style claims.
 */
export const WHY_CHOOSE_LAUNCHERDESK = [
  {
    id: 'contact', num: '01', title: 'One Point of Contact',
    desc: 'Registration, compliance, finance, technology and growth coordinated through one team.',
    cta: 'See How It Works', href: '/#how-it-works',
  },
  {
    id: 'pricing', num: '02', title: 'Transparent Pricing',
    desc: 'Professional fees, government fees and GST clearly presented where applicable.',
    cta: 'View Pricing', href: '/pricing',
  },
  {
    id: 'execution', num: '03', title: 'End-to-End Execution',
    desc: 'From documents and filing through coordination and follow-up.',
    cta: 'See Our Process', href: '/#how-it-works',
  },
  {
    id: 'support', num: '04', title: 'Ongoing Support',
    desc: "Support doesn't have to stop after registration.",
    cta: 'Explore Compliance', href: '/solutions/compliance-management',
  },
  {
    id: 'digital', num: '05', title: 'Digital-First Process',
    desc: 'Simple digital interaction and service coordination.',
    cta: 'Explore Services', href: '/services',
  },
  {
    id: 'growth', num: '06', title: 'Business Growth Support',
    desc: 'Technology, marketing and business services under one ecosystem.',
    cta: 'Explore Growth Services', href: '/solutions/business-growth',
  },
]

export const FEATURED_PARTNERS = [
  {
    id:       'doqfy',
    name:     'Doqfy',
    tagline:  'India-ready contract platform — our collab partner',
    category: 'CLM',
    url:      'https://doqfy.in/',
    logo:     '/doqfy-logo.png',
    badge:    'Partner',
  },
]