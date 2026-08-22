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
          <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>About Us</span>
          <h1 className="reveal-up in">Your Complete <span className="grad-text">360°</span> Business Solution Partner</h1>
        </div>
      </header>

      <section className="section-sm">
        <div className="wrap" style={{maxWidth:900}}>
          <h2 className="reveal-up" style={{fontSize:'clamp(26px,3.4vw,40px)',fontWeight:800,letterSpacing:'-.03em'}}>Your Complete <span className="grad-text">360° Business Solution</span> Partner</h2>
          <p className="mut reveal-up" style={{marginTop:18,fontSize:16,lineHeight:1.75}}>LauncherDesk is a business services facilitation platform designed to support startups, founders, and growing companies by simplifying access to essential operational services. We assist businesses by coordinating with independent third-party professionals and service providers across areas such as company incorporation, compliance support, documentation, finance, HR, technology enablement, and other operational needs. Our role is limited to acting as a coordination and support layer to help founders navigate processes more efficiently and with better clarity.</p>
          <p className="mut reveal-up" style={{marginTop:16,fontSize:16,lineHeight:1.75}}>LauncherDesk does not act as a regulatory authority, approving body, or certifying agency. All registrations, filings, approvals, and outcomes are carried out by the respective third-party service providers and/or government or statutory authorities, in accordance with applicable laws and regulations.</p>
          <p className="mut reveal-up" style={{marginTop:16,fontSize:16,lineHeight:1.75}}>The platform is owned and operated by its partners and management team, who bring experience across legal operations, compliance coordination, and business support functions. LauncherDesk has been built to reduce friction for founders by offering structured assistance, transparent processes, and reliable execution support—without assuming control over regulated or outcome-based activities.</p>
          <p className="mut reveal-up" style={{marginTop:16,fontSize:16,lineHeight:1.75}}>Our focus is to assist, facilitate, support, and coordinate, enabling founders to focus on building and scaling their businesses while we help simplify service discovery and execution.</p>
        </div>
      </section>

      <section className="section" style={{paddingTop:10}}>
        <div className="wrap">
          <div className="grid-3">
            <div className="card reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20"/></svg></div>
              <h3>Complete 360° Solutions</h3>
              <p>Everything your business needs in one place—registration, compliance, IT, HR, finance, and operations—all through a single point of contact.</p>
            </div>
            <div className="card reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
              <h3>Integrated Platform</h3>
              <p>Seamless coordination across all services ensures faster execution, consistent quality, and better outcomes—no more managing multiple vendors.</p>
            </div>
            <div className="card reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg></div>
              <h3>Scalable &amp; Growth-Focused</h3>
              <p>Our solutions are built to grow with you—from startup to scale-up, we provide the right support at every stage of your business journey.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-warm" id="why">
        <div className="wrap">
          <div className="sec-head center reveal-up"><span className="eyebrow">Why choose us</span><h2>Why Choose Us?</h2></div>
          <div className="value-grid" style={{marginTop:32}}>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg></div>
              <h3>Complete 360° Business Solutions</h3>
              <p>From registration and compliance to IT, HR, finance, and operations—we provide everything your business needs through one integrated platform. No more managing multiple vendors or consultants.</p>
            </div>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/><path d="M19 8v6M22 11h-6"/></svg></div>
              <h3>One Point of Contact</h3>
              <p>Experience seamless coordination across all services through a single point of contact. Whether you need company registration, payroll processing, or website development—we handle it all.</p>
            </div>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
              <h3>Integrated Platform Approach</h3>
              <p>All our services work together seamlessly, ensuring faster execution, consistent quality, and better outcomes. Our integrated approach eliminates communication gaps and keeps everything aligned with your business goals.</p>
            </div>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M3 3v18h18M7 14l4-4 3 3 5-6"/></svg></div>
              <h3>Proven Track Record</h3>
              <p>With over 1,700 clients served and 4,400+ projects delivered across all service categories, we've built a solid reputation for comprehensive, high-quality execution that grows with your business.</p>
            </div>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg></div>
              <h3>Scalable &amp; Growth-Focused</h3>
              <p>Our solutions are designed to grow with you—from startup to scale-up. We provide the right support at every stage, ensuring your business has everything it needs to succeed, now and in the future.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="final reveal-up">
            <h2>Want to work with us?</h2>
            <p>Whether as a customer or as part of our professional network, we'd like to hear from you.</p>
            <div className="row">
              <a href="/company/contact#contact-form" className="btn btn-light">Contact us</a>
              <a href="/company/careers" className="btn btn-ghost-d">See careers →</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}