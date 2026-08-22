const CHEV = 'm9 18 6-6-6-6'

export default function ToolsPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <a href="/resources">Resources</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">Tools</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>Resources / Tools</span>
          <h1 className="reveal-up in">Free tools for founders</h1>
          <p className="lead reveal-up in">The fastest tool we have today is the Service Finder — a few questions in, a full roadmap out.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="wrap">
          <div className="grid-3">
            <a className="card reveal-up" href="/services#finder">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></div>
              <h3>Service Finder</h3>
              <p>Answer six questions, get a prioritised roadmap for your business.</p>
              <span className="arrow">Use it now →</span>
            </a>
            <div className="card reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/></svg></div>
              <h3>Entity Comparison Tool</h3>
              <p>Compare Pvt Ltd, LLP, OPC and Partnership side by side.</p>
              <span className="soon">Coming soon</span>
            </div>
            <div className="card reveal-up">
              <div className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg></div>
              <h3>Compliance Calendar</h3>
              <p>See every filing deadline that applies to your entity type.</p>
              <span className="soon">Coming soon</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
