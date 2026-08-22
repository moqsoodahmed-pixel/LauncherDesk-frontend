const CHEV = 'm9 18 6-6-6-6'

const CARDS = [
  { href: '/solutions/business-setup',         id: 'setup',      icon: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z', title: 'Business Setup',          desc: "Structure and incorporate the right entity for how you'll operate and grow." },
  { href: '/solutions/compliance-management',  id: 'compliance', icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',                                                                                                                                                                           title: 'Compliance Management', desc: "GST, ROC, tax and payroll deadlines — tracked and filed so nothing slips." },
  { href: '/solutions/business-growth',        id: 'growth',     icon: 'M3 3v18h18M7 14l4-4 3 3 5-6',                                                                                                                                                                                                                          title: 'Business Growth',       desc: "Website, branding and demand generation to help you get found and grow." },
  { href: '/solutions/automation',             id: 'automation', icon: 'M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82',                                                                                                                                                                               title: 'Business Automation',   desc: "CRM, workflows and systems that remove manual work as you scale." },
  { href: '/solutions/advisory',               id: 'advisory',   icon: 'M3 21h18M5 21V10M9 21V10M15 21V10M19 21V10M3 10l9-7 9 7z',                                                                                                                                                                                            title: 'Business Advisory',     desc: "Funding readiness, expansion planning and strategic guidance." },
]

export default function SolutionsIndex() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a>
            <svg viewBox="0 0 24 24"><path d={CHEV} /></svg>
            <span className="cur">Solutions</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{ marginTop: 16, display: 'block' }}>Grouped by outcome</span>
          <h1 className="reveal-up in">Solutions, not just services.</h1>
          <p className="lead reveal-up in">Services are the individual filings. Solutions are the outcome you're actually after — a business that's set up right, compliant, automated, growing, or well-advised.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="wrap">
          <div className="grid-3">
            {CARDS.map((card) => (
              <a key={card.id} className="card reveal-up" href={card.href} id={card.id}>
                <div className="ci">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={card.icon} />
                  </svg>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <span className="arrow">Explore →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-warm">
        <div className="wrap">
          <div className="final reveal-up">
            <h2>Not sure which solution fits?</h2>
            <p>Tell us what you're building and we'll map it to the right combination.</p>
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
