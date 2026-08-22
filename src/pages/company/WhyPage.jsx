const CHEV = 'm9 18 6-6-6-6'

const STEPS = [
  { title: 'One accountable partner',     body: 'No more coordinating between a CA, a lawyer, a registration agent and an agency. One team owns the outcome, end to end.' },
  { title: 'End-to-end support',          body: "We don't disappear after incorporation — compliance, protection and growth are part of the same relationship." },
  { title: 'Transparent process',         body: 'Professional fees, government fees and taxes are always shown separately. No bundled numbers, no surprise add-ons.' },
  { title: 'Digital-first experience',    body: 'Your business status, documents and deadlines live in one dashboard — not scattered across email threads and WhatsApp.' },
  { title: 'Proactive compliance',        body: 'We track deadlines ahead of time instead of reacting once a penalty has already started accruing.' },
  { title: 'Business guidance, not just filing', body: "We tell you what you actually need for your stage and business type — not a generic package." },
  { title: 'Technology-backed',           body: 'LauncherDesk AI and a real dashboard back up the human team, not the other way around.' },
  { title: 'Long-term support',           body: "We're built for businesses that grow with us over years — from first registration to funding and beyond." },
]

export default function WhyPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <a href="/company/about">Company</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">Why LauncherDesk</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>Why founders switch</span>
          <h1 className="reveal-up in">One partner. No finger-pointing.</h1>
          <p className="lead reveal-up in">Every founder eventually hits the same wall — a scattered stack of vendors who don't talk to each other. Here's specifically what changes when you switch to LauncherDesk.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="wrap">
          {STEPS.map((step, i) => (
            <div key={i} className="journey-step reveal-up">
              <div className="jn">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-warm">
        <div className="wrap">
          <div className="final reveal-up">
            <h2>See it for yourself.</h2>
            <p>Tell us about your business and compare it to how you're managing things today.</p>
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
