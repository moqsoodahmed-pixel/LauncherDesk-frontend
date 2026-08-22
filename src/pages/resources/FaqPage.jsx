const CHEV = 'm9 18 6-6-6-6'
const PLUS = 'M12 5v14M5 12h14'

const FAQS = [
  {
    q: 'Is LauncherDesk a government body?',
    a: "No. LauncherDesk is a private business-services and facilitation platform. We prepare and file on your behalf and connect you with qualified professionals — we don't replace government authorities or independent legal and tax advice where that's required.",
  },
  {
    q: 'How is your pricing structured?',
    a: <>Transparently. We separate our professional fee, the actual government fees, and taxes, so you always know what you're paying for. See <a href="/pricing" style={{color:'var(--blue-dark)',fontWeight:600}}>how pricing works</a>.</>,
  },
  {
    q: 'Do you help after registration?',
    a: "That's the whole point of LauncherDesk. Registration is step one — we stay on for compliance, accounting, IP and growth.",
  },
  {
    q: 'Can the AI give me legal or tax advice?',
    a: <>LauncherDesk AI gives general information and builds you a roadmap. For anything situation-specific, a qualified LauncherDesk professional reviews your case before you act on it. <a href="/ai" style={{color:'var(--blue-dark)',fontWeight:600}}>Learn more about LauncherDesk AI →</a></>,
  },
  {
    q: 'How long does a typical registration take?',
    a: 'It varies by service — a Private Limited Company typically takes 7–14 working days, GST registration 3–7 days, and trademark registration several months end to end. Each service page has exact timelines.',
  },
]

export default function FaqPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <a href="/resources">Resources</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">FAQ</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>Resources / FAQ</span>
          <h1 className="reveal-up in">Frequently asked questions</h1>
          <p className="lead reveal-up in">Straight answers, before you commit to anything.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="wrap">
          <div className="faq">
            {FAQS.map((item, i) => (
              <div key={i} className="faq-i">
                <button className="faq-q">
                  {item.q}
                  <svg viewBox="0 0 24 24" fill="none"><path d={PLUS}/></svg>
                </button>
                <div className="faq-a"><p>{item.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}