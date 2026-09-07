import { useEffect } from 'react'

const SITE_NAME = 'LauncherDesk'
const SITE_URL  = 'https://www.launcherdesk.com'
const DEFAULT_OG = `${SITE_URL}/og-default.png`

export default function SEO({ title, description, canonical, image, noindex = false, jsonLd }) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Your Business HQ | Launch. Manage. Grow.`

  const metaDesc = description ||
    'LauncherDesk helps founders and businesses with company registration, GST, compliance, trademark, accounting, website development and growth — one platform, one point of contact.'

  const canonicalUrl = canonical
    ? (canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical}`)
    : SITE_URL

  const ogImage = image
    ? (image.startsWith('http') ? image : `${SITE_URL}${image}`)
    : DEFAULT_OG

  useEffect(() => {
    document.title = fullTitle

    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const m = selector.match(/\[([^=]+)="([^"]+)"\]/)
        if (m) el.setAttribute(m[1], m[2])
        document.head.appendChild(el)
      }
      el.setAttribute(attr, value)
    }

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el) }
      el.setAttribute('href', href)
    }

    setMeta('meta[name="description"]',         'content', metaDesc)
    setMeta('meta[name="robots"]',              'content', noindex ? 'noindex,nofollow' : 'index,follow')
    setLink('canonical', canonicalUrl)
    setMeta('meta[property="og:title"]',        'content', fullTitle)
    setMeta('meta[property="og:description"]',  'content', metaDesc)
    setMeta('meta[property="og:url"]',          'content', canonicalUrl)
    setMeta('meta[property="og:image"]',        'content', ogImage)
    setMeta('meta[property="og:type"]',         'content', 'website')
    setMeta('meta[property="og:site_name"]',    'content', SITE_NAME)
    setMeta('meta[name="twitter:card"]',        'content', 'summary_large_image')
    setMeta('meta[name="twitter:title"]',       'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', metaDesc)
    setMeta('meta[name="twitter:image"]',       'content', ogImage)

    const scriptId = 'ld-json-seo'
    let script = document.getElementById(scriptId)
    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      const content = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)
      if (!script) { script = document.createElement('script'); script.id = scriptId; script.type = 'application/ld+json'; document.head.appendChild(script) }
      script.textContent = content
    } else if (script) {
      script.remove()
    }

    return () => {
      document.title = `${SITE_NAME} — Your Business HQ | Launch. Manage. Grow.`
      const r = document.querySelector('meta[name="robots"]')
      if (r) r.setAttribute('content', 'index,follow')
    }
  }, [fullTitle, metaDesc, canonicalUrl, ogImage, noindex, jsonLd])

  return null
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type':    'Organization',
  name:       'LauncherDesk',
  legalName:  'DutyLaunch Solutions Private Limited',
  url:        'https://www.launcherdesk.com',
  logo:       'https://www.launcherdesk.com/launcherdesk-logo-transparent.png',
  sameAs: ['https://www.instagram.com/launcherdesk','https://x.com/LauncherDesk','https://www.facebook.com/share/181iGTzpPf/'],
  address: { '@type': 'PostalAddress', streetAddress: '472/7, 20th L Cross Rd, 4th Block, Koramangala', addressLocality: 'Bengaluru', addressRegion: 'Karnataka', postalCode: '560095', addressCountry: 'IN' },
  contactPoint: { '@type': 'ContactPoint', telephone: '+91-85488-54859', contactType: 'customer service', areaServed: 'IN' },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type':    'WebSite',
  name:       'LauncherDesk',
  url:        'https://www.launcherdesk.com',
  description: 'Business services platform for Indian startups and SMBs.',
}

export function serviceSchema(svc, slug) {
  return {
    '@context': 'https://schema.org',
    '@type':    'Service',
    name:       svc.title,
    description: svc.lead || svc.metaDesc,
    url:        `https://www.launcherdesk.com/services/${slug}`,
    provider:   { '@type': 'Organization', name: 'LauncherDesk', url: 'https://www.launcherdesk.com' },
    areaServed: { '@type': 'Country', name: 'India' },
    serviceType: svc.category || 'Business Service',
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem', position: idx + 1, name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://www.launcherdesk.com${item.url}`,
    })),
  }
}

export function faqSchema(faqs) {
  if (!faqs || !faqs.length) return null
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') },
    })),
  }
}
