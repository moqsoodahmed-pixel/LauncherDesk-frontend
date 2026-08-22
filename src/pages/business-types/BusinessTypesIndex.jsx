const CHEV = 'm9 18 6-6-6-6'

const TYPES = [
  { href: '/business-types/ecommerce',    icon: 'M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM20 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z', title: 'E-commerce',          desc: 'Sell online with the right structure, GST, payment gateway and brand protection.' },
  { href: '/business-types/restaurant',   icon: 'M3 2v7c0 1.1.9 2 2 2a2 2 0 0 0 2-2V2M5 2v20M16 2v20M16 12h4c0-4-2-8-4-8',                                                                      title: 'Restaurant & Food',   desc: 'FSSAI, GST and the licences every food business needs before day one.' },
  { href: '/business-types/technology',   icon: 'M4 4h16v16H4zM9 9h6v6H9zM2 9h2M2 15h2M20 9h2M20 15h2M9 2v2M15 2v2M9 20v2M15 20v2',                                                            title: 'Technology / SaaS',   desc: 'Fundraising-ready structure, IP protection and the growth stack investors expect.' },
  { href: '/business-types/consulting',   icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',                                                                 title: 'Consulting',          desc: 'Lean structure, invoicing and compliance for services and consulting firms.' },
  { href: '/business-types/manufacturing',icon: 'M2 21h20M4 21V10l6 4v-4l6 4V7l4 3v11M4 21h16',                                                                                                  title: 'Manufacturing',       desc: 'Licences, GST and compliance built for production and industrial businesses.' },
  { href: '/business-types/retail',       icon: 'M2 7l2-4h16l2 4M4 7v13h16V7M4 7h16',                                                                                                           title: 'Retail',              desc: 'Shop registration, GST and inventory-friendly accounting for physical stores.' },
]

export default function BusinessTypesIndex() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a>
            <svg viewBox="0 0 24 24"><path d={CHEV} /></svg>
            <span className="cur">Business Types</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{ marginTop: 16, display: 'block' }}>Find your journey</span>
          <h1 className="reveal-up in">What kind of business are you building?</h1>
          <p className="lead reveal-up in">Every business type has a different mix of registrations, compliance and growth priorities. Pick yours to see the exact journey.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="wrap">
          <div className="type-grid">
            {TYPES.map((t) => (
              <a key={t.href} className="type-tile reveal-up" href={t.href}>
                <div className="ci">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d={t.icon} />
                  </svg>
                </div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-warm">
        <div className="wrap">
          <div className="final reveal-up">
            <h2>Don't see your business type?</h2>
            <p>Every business is different — talk to us or use the Service Finder and we'll build your roadmap directly.</p>
            <div className="row">
              <a href="/services#finder" className="btn btn-light">Use the Service Finder</a>
              <a href="/company/contact" className="btn btn-ghost-d">Talk to an Expert</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}