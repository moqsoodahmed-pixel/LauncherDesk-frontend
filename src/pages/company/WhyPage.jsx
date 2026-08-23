const CHEV = 'm9 18 6-6-6-6'

const STEPS = [
  { title: 'Complete 360° Business Solutions', body: 'From registration and compliance to IT, HR, finance and operations — we provide everything your business needs through one integrated platform. No more managing multiple vendors or consultants.' },
  { title: 'One Point of Contact', body: 'Experience seamless coordination across all services through a single point of contact. Whether you need company registration, payroll processing or website development — we handle it all.' },
  { title: 'Integrated Platform Approach', body: 'All our services work together seamlessly, ensuring faster execution, consistent quality and better outcomes. Our integrated approach eliminates communication gaps and keeps everything aligned with your business goals.' },
  { title: 'Proven Track Record', body: 'With over 1,700 clients served and 4,400+ projects delivered across all service categories, we have built a solid reputation for comprehensive, high-quality execution that grows with your business.' },
  { title: 'Scalable & Growth-Focused', body: 'Our solutions are designed to grow with you — from startup to scale-up. We provide the right support at every stage, ensuring your business has everything it needs to succeed, now and in the future.' },
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
          <h1 className="reveal-up in">Why choose <span className="grad-text">LauncherDesk?</span></h1>
          <p className="lead reveal-up in">One desk for your entire business — registration, compliance, IT, finance, legal and marketing — through a single integrated platform and one point of contact.</p>
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