const CHEV = 'm9 18 6-6-6-6'

// DOCX Section H: Starter Article Briefs
const ARTICLES = [
  { cat: 'Registration', title: 'How to Register a Private Limited Company in India — Step by Step', href: '/resources/blog' },
  { cat: 'Registration', title: 'LLP vs Private Limited Company — Which Is Right for Your Business?', href: '/resources/blog' },
  { cat: 'GST & Compliance', title: 'GST Compliance Checklist for Startups in India', href: '/resources/blog' },
  { cat: 'Registration', title: 'What Do You Need to Do in the First 90 Days After Registering Your Company?', href: '/resources/blog' },
  { cat: 'Startup India', title: 'What Is DPIIT Startup Recognition and Should Your Startup Apply?', href: '/resources/blog' },
  { cat: 'Trademark', title: 'Trademark Registration in India — What Founders Need to Know', href: '/resources/blog' },
  { cat: 'Compliance', title: "The Founder's Guide to Managing GST, ROC and Income Tax Compliance", href: '/resources/blog' },
  { cat: 'International', title: 'Setting Up a Business in the UAE from India — What You Need to Know', href: '/resources/blog' },
  { cat: 'MSME', title: 'How to Register Your Business as an MSME in India', href: '/resources/blog' },
  { cat: 'Marketing', title: 'WhatsApp Business API vs WhatsApp Business App — Which Does Your Business Need?', href: '/resources/blog' },
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
          <p className="lead reveal-up in">Practical, no-fluff articles on registration, compliance and growth — written for first-time founders in plain English.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="wrap">
          <div className="art-grid">
            {ARTICLES.map((a, i) => (
              <a key={i} className="art reveal-up" href={a.href} style={{textDecoration:'none'}}>
                <div className="thumb" style={{background:'linear-gradient(135deg,#102A43,#047DCC)'}}></div>
                <div className="body">
                  <span className="cat">{a.cat}</span>
                  <h3>{a.title}</h3>
                  <div className="meta">LauncherDesk Team · <span className="soon">Coming soon</span></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}