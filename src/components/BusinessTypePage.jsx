const CHEV = 'm9 18 6-6-6-6'
const ARROW = 'M5 12h14M13 6l6 6-6 6'

function ChevSvg() {
  return <svg viewBox="0 0 24 24"><path d={CHEV} /></svg>
}

export default function BusinessTypePage({ bt }) {
  const { crumbLabel, h1, lead, journeyH2, steps, cta, related } = bt

  return (
    <>
      {/* Hero */}
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><ChevSvg />
            <a href="/business-types">Business Types</a><ChevSvg />
            <span className="cur">{crumbLabel}</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{ marginTop: 16, display: 'block' }}>Business type</span>
          <h1 className="reveal-up in">{h1}</h1>
          <p className="lead reveal-up in">{lead}</p>
          <div className="hero-cta reveal-up in">
            <a href="/company/contact" className="btn btn-primary">
              Get Started{' '}
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={ARROW} />
              </svg>
            </a>
            <a href="/services#finder" className="btn btn-soft">Use the Service Finder</a>
          </div>
        </div>
      </header>

      {/* Journey steps */}
      <section className="section-sm">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">Your journey</span>
            <h2 style={{ fontSize: 'clamp(26px,3vw,38px)' }}>{journeyH2}</h2>
          </div>
          <div style={{ marginTop: 20 }}>
            {steps.map((step, i) => (
              <div key={i} className="journey-step">
                <div className="jn">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <a className="svc-link" href={step.href}>Learn more →</a>
                </div>
              </div>
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

      {/* Other business types */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">Other business types</span>
            <h2 style={{ fontSize: 'clamp(24px,3vw,34px)' }}>Explore other journeys</h2>
          </div>
          <div className="related reveal-up" style={{ marginTop: 26 }}>
            {related.map((item) => (
              <a key={item.href} href={item.href}>
                <b>
                  {item.label}{' '}
                  <svg style={{ width: 18, height: 18, stroke: 'var(--blue)' }} viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d={ARROW} />
                  </svg>
                </b>
                <span>{item.note}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}