const CHEV = 'm9 18 6-6-6-6'

const COMPONENTS = [
  { icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', title: 'Professional fee', desc: "What you pay LauncherDesk for filing, drafting, coordination and ongoing support." },
  { icon: 'M3 21h18M5 21V10M9 21V10M15 21V10M19 21V10M3 10l9-7 9 7z',       title: 'Government fee',   desc: 'The actual fee paid to the MCA, GST department or relevant authority — varies by state and case.' },
  { icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6', title: 'Taxes', desc: 'GST applicable on our professional fee, shown as a clear line item — never hidden in the total.' },
]

const BY_CATEGORY = [
  { href: '/services',                    title: 'Business Setup',  desc: 'Private Limited, LLP, OPC, Partnership — professional fee varies by entity type.' },
  { href: '/services',                    title: 'Compliance',      desc: 'GST returns, ROC filing, accounting and payroll — priced by transaction volume.' },
  { href: '/services/trademark-registration', title: 'Legal & IP',  desc: 'Trademark search and filing — professional fee plus per-class government fee.' },
  { href: '/solutions/business-growth',   title: 'Growth',          desc: 'Website, branding and marketing — scoped after a discovery call.' },
  { href: '/solutions/automation',        title: 'Automation',      desc: 'CRM and workflow systems — priced by scope and complexity.' },
  { href: '/company/contact',             title: 'Not sure?',       desc: "Talk to an expert and we'll put together an itemised quote for your exact case.", cta: 'Get a quote →' },
]

export default function PricingPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">Pricing</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>Transparent pricing</span>
          <h1 className="reveal-up in">No bundled numbers. No surprise add-ons.</h1>
          <p className="lead reveal-up in">Every quote separates our professional fee from actual government fees and taxes — so you know exactly what you're paying for and why.</p>
        </div>
      </header>

      {/* Three components */}
      <section className="section-sm">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">How pricing works</span>
            <h2 style={{fontSize:'clamp(26px,3vw,38px)'}}>Three components, always separated</h2>
          </div>
          <div className="grid-3" style={{marginTop:30}}>
            {COMPONENTS.map(c => (
              <div key={c.title} className="card reveal-up">
                <div className="ci">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={c.icon}/></svg>
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By category */}
      <section className="section section-warm">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">By category</span>
            <h2 style={{fontSize:'clamp(26px,3vw,38px)'}}>Explore pricing by category</h2>
          </div>
          <div className="grid-3" style={{marginTop:30}}>
            {BY_CATEGORY.map(c => (
              <a key={c.title} className="card reveal-up" href={c.href}>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <span className="arrow">{c.cta || 'See services →'}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why no flat prices */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center reveal-up">
            <span className="eyebrow">Why we don't publish flat prices</span>
            <h2>Because government fees genuinely vary</h2>
            <p>Government fees depend on your state, authorised capital, licence tier and other case-specific factors. Rather than advertise a low headline number that doesn't hold up at checkout, we quote your exact figure upfront — broken into the three components above.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-2">
        <div className="wrap">
          <div className="final reveal-up">
            <h2>Get a custom quote.</h2>
            <p>Tell us about your business and we'll send an itemised quote — no obligation.</p>
            <div className="row">
              <a href="/company/contact" className="btn btn-light">Talk to an Expert</a>
              <a href="/services#finder" className="btn btn-ghost-d">Use the Service Finder</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}