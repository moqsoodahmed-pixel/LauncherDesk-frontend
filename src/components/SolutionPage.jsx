const CHEV = 'm9 18 6-6-6-6'

function ChevSvg() {
  return <svg viewBox="0 0 24 24"><path d={CHEV} /></svg>
}

export default function SolutionPage({ sol }) {
  const { title, lead, cards, cta } = sol

  return (
    <>
      {/* Hero */}
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><ChevSvg />
            <a href="/solutions">Solutions</a><ChevSvg />
            <span className="cur">{title}</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{ marginTop: 16, display: 'block' }}>Solution</span>
          <h1 className="reveal-up in">{title}</h1>
          <p className="lead reveal-up in">{lead}</p>
          <div className="hero-cta reveal-up in">
            <a href="/company/contact" className="btn btn-primary">Get Started</a>
            <a href="/company/contact" className="btn btn-soft">Talk to an Expert</a>
          </div>
        </div>
      </header>

      {/* Cards grid */}
      <section className="section-sm">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">What's included</span>
            <h2 style={{ fontSize: 'clamp(26px,3vw,38px)' }}>Services in this solution</h2>
          </div>
          <div className="grid-3" style={{ marginTop: 28 }}>
            {cards.map((card) => (
              <a key={card.title} className="card reveal-up" href={card.href}>
                <div className="ci">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={card.icon} />
                  </svg>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <span className="arrow">View →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="section section-warm">
        <div className="wrap">
          <div className="final reveal-up">
            <h2>{cta.h2}</h2>
            <p>{cta.p}</p>
            <div className="row">
              <a href="/company/contact" className="btn btn-light">Talk to an Expert</a>
              <button className="btn btn-ghost-d" data-open-ai="true">Ask LauncherDesk AI</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
