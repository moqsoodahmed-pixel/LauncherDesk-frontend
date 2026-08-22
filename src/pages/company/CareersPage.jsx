const CHEV = 'm9 18 6-6-6-6'

export default function CareersPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <a href="/company/about">Company</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">Careers</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>Join us</span>
          <h1 className="reveal-up in">Help founders get this right.</h1>
          <p className="lead reveal-up in">We're a small team building the one-desk experience founders keep wishing existed. If that sounds interesting, we'd like to hear from you — even without a specific role open.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">Open roles</span>
            <h2 style={{fontSize:'clamp(24px,3vw,34px)'}}>Current openings</h2>
          </div>
          <div className="grid-3" style={{marginTop:28}}>
            <div className="card reveal-up">
              <h3>No open roles right now</h3>
              <p>We'll list positions here as they open. In the meantime, reach out anyway — we keep good conversations on file.</p>
            </div>
            <div className="card reveal-up">
              <h3>Professional network</h3>
              <p>CAs, company secretaries, lawyers and consultants — we're always open to expanding our partner network.</p>
            </div>
            <div className="card reveal-up">
              <h3>Internships</h3>
              <p>Occasional internship opportunities across operations, content and technology.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-warm">
        <div className="wrap">
          <div className="final reveal-up">
            <h2>Want to introduce yourself?</h2>
            <p>Send us a message and mention what you're interested in — team role, professional network, or internship.</p>
            <div className="row">
              <a href="/company/contact" className="btn btn-light">Get in touch</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
