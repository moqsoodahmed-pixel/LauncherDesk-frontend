const CHEV = 'm9 18 6-6-6-6'

const CARDS = [
  { href: '/resources/blog',   icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 13h6M9 17h4', title: 'Blog',   desc: 'Practical articles on registration, compliance and running a business in India.',      cta: 'Read →' },
  { href: '/resources/guides', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z',       title: 'Guides', desc: 'Deep, step-by-step guides on specific registrations and processes.',              cta: 'Read →' },
  { href: '/resources/tools',  icon: 'M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82',                                  title: 'Tools',  desc: 'Calculators and checklists to plan before you talk to anyone.',                  cta: 'Explore →' },
  { href: '/resources/faq',    icon: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01',              title: 'FAQ',    desc: 'Quick answers to the questions we hear most often.',                             cta: 'Read →' },
]

const FEATURED = [
  { cat: 'Registration', title: 'Private Limited vs LLP: which should you choose?',           meta: 'Guide' },
  { cat: 'Compliance',   title: 'The annual compliance calendar every founder should know',    meta: 'Guide' },
  { cat: 'GST',          title: 'Do you actually need GST registration right now?',            meta: 'Article' },
]

export default function ResourcesIndex() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">Resources</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>Knowledge hub</span>
          <h1 className="reveal-up in">Guides, articles and tools for founders.</h1>
          <p className="lead reveal-up in">Straight answers on registration, compliance and growth — written to actually help, not to pad a content calendar.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">Browse by type</span>
            <h2 style={{fontSize:'clamp(26px,3vw,38px)'}}>Where to start</h2>
          </div>
          <div className="grid-3" style={{marginTop:28}}>
            {CARDS.map(c => (
              <a key={c.href} className="card reveal-up" href={c.href}>
                <div className="ci">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={c.icon}/></svg>
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <span className="arrow">{c.cta}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-2">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">Featured</span>
            <h2 style={{fontSize:'clamp(24px,3vw,34px)'}}>Popular topics</h2>
          </div>
          <div className="art-grid reveal-up" style={{marginTop:26}}>
            {FEATURED.map((a, i) => (
              <div key={i} className="art">
                <div className="thumb"></div>
                <div className="body">
                  <span className="cat">{a.cat}</span>
                  <h3>{a.title}</h3>
                  <div className="meta">{a.meta} · <span className="soon">Coming soon</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}