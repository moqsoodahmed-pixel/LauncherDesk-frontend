const CHEV = 'm9 18 6-6-6-6'

const GUIDES = [
  { href: '/services/private-limited-company-registration', title: 'Guide: Incorporating a Private Limited Company', desc: 'The full SPICe+ process, documents and timeline explained.' },
  { href: '/services/gst-registration',                     title: 'Guide: GST Registration Step by Step',          desc: "Who needs it, what's required, and how returns work." },
  { href: '/services/trademark-registration',               title: 'Guide: Registering Your Trademark',             desc: 'Search, classes, filing and the opposition period explained.' },
]

export default function GuidesPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <a href="/resources">Resources</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">Guides</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>Resources / Guides</span>
          <h1 className="reveal-up in">Step-by-step guides</h1>
          <p className="lead reveal-up in">Deeper, structured walkthroughs of specific registrations and processes — the detail behind each service page.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="wrap">
          <div className="grid-3">
            {GUIDES.map(g => (
              <a key={g.href} className="card reveal-up" href={g.href}>
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
                <span className="arrow">Read the service page →</span>
              </a>
            ))}
          </div>
          <p className="mut center" style={{marginTop:28}}>
            More standalone guides are on the way. In the meantime, every{' '}
            <a href="/services" style={{color:'var(--blue-dark)',fontWeight:600}}>service page</a>{' '}
            includes a full step-by-step breakdown.
          </p>
        </div>
      </section>
    </>
  )
}