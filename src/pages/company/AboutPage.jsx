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
          <h1 className="reveal-up in">We believe running a business should be simpler.</h1>
          <p className="lead reveal-up in">Starting and running a business in India means navigating multiple registrations, compliance deadlines, tax requirements, vendor relationships and government processes — often with different consultants for each one. LauncherDesk was created to change that.</p>
        </div>
      </header>

      {/* Opening body */}
      <section className="section-sm">
        <div className="wrap" style={{maxWidth:900}}>
          <p className="mut reveal-up" style={{fontSize:16,lineHeight:1.75}}>We bring the services a business needs together in one place, coordinate them through one accountable team, and work with you from your first registration to your next growth milestone.</p>
          <p className="mut reveal-up" style={{marginTop:16,fontSize:16,lineHeight:1.75}}>We are a Bengaluru-based business services facilitation platform — built for founders, run by people who understand what it takes to build a business in India.</p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section section-warm">
        <div className="wrap">
          <div className="grid-3">
            <div className="card reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <h3>Our Mission</h3>
              <p>To make business services easier to discover, access and manage — so founders can focus on building their business, not coordinating vendors.</p>
            </div>
            <div className="card reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M1 6l11 6 11-6M1 12l11 6 11-6"/></svg></div>
              <h3>Our Vision</h3>
              <p>To become the business lifecycle platform Indian founders and SMEs use to launch, manage and grow — from their first registration to their next funding round.</p>
            </div>
            <div className="card reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg></div>
              <h3>What We're Building</h3>
              <p>Today we coordinate business services through an experienced team. Tomorrow — a business dashboard, compliance calendar, document vault and business marketplace for every Indian founder.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal-up"><span className="eyebrow">What we believe</span><h2>Five things we stand for.</h2></div>
          <div className="value-grid" style={{marginTop:32}}>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
              <h3>Simple beats complicated</h3>
              <p>We make business services accessible without the jargon.</p>
            </div>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></div>
              <h3>Transparency builds trust</h3>
              <p>We tell you exactly what is included, what it costs and what will happen.</p>
            </div>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/><path d="M19 8v6M22 11h-6"/></svg></div>
              <h3>One relationship is better than five vendors</h3>
              <p>We own the coordination so you don't have to.</p>
            </div>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
              <h3>Technology should remove friction</h3>
              <p>We are building tools that make business management simpler over time.</p>
            </div>
            <div className="value reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M3 3v18h18M7 14l4-4 3 3 5-6"/></svg></div>
              <h3>Businesses should spend more time growing</h3>
              <p>Less time coordinating vendors, more time building the business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="section section-warm" id="who-we-are">
        <div className="wrap">
          <div className="sec-head reveal-up"><span className="eyebrow">Who we are</span><h2>DutyLaunch Solutions Private Limited</h2></div>
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
                <a href="tel:+918458845859" style={{color:'var(--text-2)'}}>+91 84588 45859</a>
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