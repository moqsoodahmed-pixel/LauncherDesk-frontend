const CHEV = 'm9 18 6-6-6-6'

const STEPS = [
  { title: 'One named point of contact', body: "No more coordinating between a CA, a lawyer, a registration agent and an agency. One team owns the outcome, end to end. You'll know exactly who to reach." },
  { title: 'End-to-end support', body: "We don't disappear after incorporation — compliance, protection and growth are part of the same relationship. We stay on as long as your business needs us." },
  { title: 'Transparent process', body: 'Professional fees, government fees and taxes are always shown separately. No bundled numbers, no surprise add-ons. You know exactly what you\'re paying for before you commit.' },
  { title: 'We ask the right questions', body: 'Your contact takes the time to understand your business, your stage and your specific requirement. We recommend the right solution — not just the obvious one.' },
  { title: 'Clear scope and pricing before you commit', body: 'Before anything starts, you know exactly what is included, what it will cost and how long it will take. Honest scope, upfront. No hidden charges, no vague timelines.' },
  { title: 'Proactive compliance', body: 'We track deadlines ahead of time instead of reacting once a penalty has already started accruing. Nothing gets missed because we own the calendar.' },
  { title: 'Business guidance, not just filing', body: "We tell you what you actually need for your stage and business type — not a generic package. If something isn't right for you, we'll tell you that too." },
  { title: 'Technology-backed', body: "A growing technology platform backs the human team — compliance calendar, document vault and service tracking are coming soon, so your business management keeps getting simpler." },
  { title: 'One relationship that grows with your business', body: "We're built for businesses that grow with us over years — from first registration to funding and beyond. The same team, the same point of contact, the same accountability." },
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
          <h1 className="reveal-up in">One team. One outcome. No finger-pointing.</h1>
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
            <p>Tell us about your business and we'll show you exactly what we'd do differently.</p>
            <div className="row">
              <a href="/company/contact" className="btn btn-light">Talk to an Expert</a>
              <a href="https://wa.me/918458845859?text=Hi%20LauncherDesk%2C%20I'd%20like%20to%20understand%20how%20you%20work." className="btn btn-ghost-d">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}