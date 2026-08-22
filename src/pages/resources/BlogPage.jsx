const CHEV = 'm9 18 6-6-6-6'

const ARTICLES = [
  { cat: 'Registration', title: 'Private Limited vs LLP: which should you choose?' },
  { cat: 'Compliance',   title: 'The annual compliance calendar every founder should know' },
  { cat: 'GST',          title: 'Do you actually need GST registration right now?' },
  { cat: 'Trademark',    title: 'Why founders wait too long to trademark their brand' },
  { cat: 'E-commerce',   title: "The e-commerce founder's registration checklist" },
  { cat: 'Funding',      title: 'What investors actually check in your compliance record' },
]

export default function BlogPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <a href="/resources">Resources</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">Blog</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>Resources / Blog</span>
          <h1 className="reveal-up in">The LauncherDesk Blog</h1>
          <p className="lead reveal-up in">Practical, no-fluff articles on registration, compliance and growth — written as we publish them, not backfilled with filler.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="wrap">
          <div className="art-grid">
            {ARTICLES.map((a, i) => (
              <div key={i} className="art reveal-up">
                <div className="thumb"></div>
                <div className="body">
                  <span className="cat">{a.cat}</span>
                  <h3>{a.title}</h3>
                  <div className="meta">By LauncherDesk Team · <span className="soon">Coming soon</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}