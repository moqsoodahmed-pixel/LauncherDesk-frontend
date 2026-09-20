const CHEV = 'm9 18 6-6-6-6'

export default function AboutPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">About Us</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>About LauncherDesk</span>
          <h1 className="reveal-up in">Your Complete <span className="grad-text">360°</span> Business Solution Partner</h1>
          <p className="lead reveal-up in">LauncherDesk is a business services facilitation platform designed to support startups, founders and growing companies by coordinating with independent third-party professionals and service providers across incorporation, compliance, documentation, finance, HR, technology and operations.</p>
        </div>
      </header>

      {/* Opening body */}
      <section className="section-sm">
        <div className="wrap" style={{maxWidth:900}}>
          <p className="mut reveal-up" style={{fontSize:16,lineHeight:1.75}}>LauncherDesk assists businesses by coordinating with independent third-party professionals and service providers across areas such as company incorporation, compliance support, documentation, finance, HR, technology enablement, and other operational needs. Our role is limited to acting as a coordination and support layer to help founders navigate processes more efficiently and with better clarity.</p>
          <p className="mut reveal-up" style={{marginTop:16,fontSize:16,lineHeight:1.75}}>LauncherDesk does not act as a regulatory authority, approving body, or certifying agency. All registrations, filings, approvals, and outcomes are carried out by the respective third-party service providers and/or government or statutory authorities, in accordance with applicable laws and regulations.</p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section section-warm">
        <div className="wrap">
          <div className="grid-3">
            <div className="card reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <h3>Complete 360° Solutions</h3>
              <p>Everything your business needs in one place — registration, compliance, IT, HR, finance and operations — all through a single point of contact.</p>
            </div>
            <div className="card reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M1 6l11 6 11-6M1 12l11 6 11-6"/></svg></div>
              <h3>Integrated Platform</h3>
              <p>Seamless coordination across all services ensures faster execution, consistent quality and better outcomes — no more managing multiple vendors.</p>
            </div>
            <div className="card reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg></div>
              <h3>Scalable & Growth-Focused</h3>
              <p>Our solutions are built to grow with you — from startup to scale-up, we provide the right support at every stage of your business journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal-up"><span className="eyebrow">Why choose us</span><h2>Why Choose LauncherDesk?</h2></div>
          <div className="value-grid" style={{marginTop:32}}>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
              <h3>Complete 360° Business Solutions</h3>
              <p>From registration and compliance to IT, HR, finance and operations — we provide everything your business needs through one integrated platform. No more managing multiple vendors or consultants.</p>
            </div>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></div>
              <h3>One Point of Contact</h3>
              <p>Experience seamless coordination across all services through a single point of contact. Whether you need company registration, payroll processing or website development — we handle it all.</p>
            </div>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/><path d="M19 8v6M22 11h-6"/></svg></div>
              <h3>Integrated Platform Approach</h3>
              <p>All our services work together seamlessly, ensuring faster execution, consistent quality and better outcomes. Our integrated approach eliminates communication gaps and keeps everything aligned with your business goals.</p>
            </div>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
              <h3>Proven Track Record</h3>
              <p>Over 1,700 clients served and 4,400+ projects delivered across all service categories — we've built a solid reputation for comprehensive, high-quality execution that grows with your business.</p>
            </div>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M3 3v18h18M7 14l4-4 3 3 5-6"/></svg></div>
              <h3>Scalable & Growth-Focused</h3>
              <p>Our solutions are designed to grow with you — from startup to scale-up. We provide the right support at every stage, ensuring your business has everything it needs to succeed, now and in the future.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="section section-warm" id="who-we-are">
        <div className="wrap">
          <div className="sec-head reveal-up"><span className="eyebrow">Who we are</span><h2>About DutyLaunch Solutions Private Limited</h2></div>
          <div style={{maxWidth:820,marginTop:20}}>
            <p className="mut reveal-up" style={{fontSize:15.5,lineHeight:1.75}}>LauncherDesk is a product of DutyLaunch Solutions Private Limited, based in Koramangala, Bengaluru. We serve founders, startups, small businesses and growing companies across India.</p>
            <div className="reveal-up" style={{marginTop:20,display:'flex',flexDirection:'column',gap:10}}>
              <div style={{display:'flex',gap:12,alignItems:'center',fontSize:14.5,color:'var(--text-2)'}}>
                <strong style={{color:'var(--navy)',minWidth:60}}>CIN:</strong>
                <span>U62099KA2025PTC211509</span>
              </div>
              <div style={{display:'flex',gap:12,alignItems:'flex-start',fontSize:14.5,color:'var(--text-2)'}}>
                <strong style={{color:'var(--navy)',minWidth:60}}>Address:</strong>
                <span>472/7, 20th L Cross Road, 4th Block, Koramangala, Bengaluru – 560095, Karnataka, India</span>
              </div>
              <div style={{display:'flex',gap:12,alignItems:'center',fontSize:14.5,color:'var(--text-2)'}}>
                <strong style={{color:'var(--navy)',minWidth:60}}>Phone:</strong>
                <a href="tel:+918548854859" style={{color:'var(--text-2)'}}>+91 85488 54859</a>
              </div>
              <div style={{display:'flex',gap:12,alignItems:'center',fontSize:14.5,color:'var(--text-2)'}}>
                <strong style={{color:'var(--navy)',minWidth:60}}>Email:</strong>
                <a href="mailto:contact@launcherdesk.com" style={{color:'var(--text-2)'}}>contact@launcherdesk.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="final reveal-up">
            <h2>Get in touch with us.</h2>
            <p>Whether as a customer or as part of our professional network, we'd like to hear from you.</p>
            <div className="row">
              <a href="/company/contact" className="btn btn-light">Contact Us</a>
              <a href="/solutions" className="btn btn-ghost-d">Explore Solutions →</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}