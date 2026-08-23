const CHEV = 'm9 18 6-6-6-6'

const PLANS = [
  {
    name: 'STARTER',
    subtitle: 'For founders getting started',
    best: 'First-time founders registering a company and getting the essentials in place.',
    includes: [
      'Company registration (Pvt Ltd or LLP)',
      'GST registration',
      'MSME / Udyam registration',
      'Basic compliance guidance',
      'One named point of contact',
    ],
    pricing: 'Varies by company type and requirements.',
    cta: 'Get a Quote',
    ctaHref: '/company/contact',
    primary: false,
  },
  {
    name: 'GROWTH',
    subtitle: 'For businesses already operating',
    best: 'Established businesses that need ongoing compliance, accounting, technology or marketing support.',
    includes: [
      'Accounting & bookkeeping',
      'GST filing and returns',
      'Income tax filing',
      'ROC / annual compliance',
      'Technology or marketing services (as required)',
      'One named point of contact',
    ],
    pricing: 'Monthly or project-based. Quoted on your actual requirements.',
    cta: 'Get a Quote',
    ctaHref: '/company/contact',
    primary: true,
  },
  {
    name: 'SCALE',
    subtitle: 'For growing businesses',
    best: 'Growing companies that need dedicated support across compliance, technology, marketing and strategic services.',
    includes: [
      'Full compliance support (GST, ROC, income tax, payroll)',
      'Website, branding or technology support',
      'Digital marketing and growth services',
      'Dedicated point of contact with priority response',
      'Strategic guidance and business consulting',
    ],
    pricing: 'Custom, based on scope.',
    cta: 'Talk to Us',
    ctaHref: '/company/contact',
    primary: false,
  },
]

const PRICING_FAQS = [
  {
    q: 'Are there any hidden charges?',
    a: 'No. We provide a clear scope and quote before you proceed. Government fees, professional fees and other applicable charges are explained upfront.',
  },
  {
    q: 'Do you charge government fees separately?',
    a: "Yes, where applicable. Government registration fees and statutory charges are separate from LauncherDesk's professional service fee. These are communicated clearly before you proceed.",
  },
  {
    q: 'Can I start with one service and add more later?',
    a: 'Yes. Many customers start with company registration and return for compliance, accounting, website development or marketing as their business grows.',
  },
]

export default function PricingPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">Pricing</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>Transparent pricing</span>
          <h1 className="reveal-up in">Transparent pricing. Clear scope.</h1>
          <p className="lead reveal-up in">Every business is different. Choose a plan that matches your stage, or tell us what you need and we'll put together a custom quote.</p>
        </div>
      </header>

      {/* Plans */}
      <section className="section-sm">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">Choose your plan</span>
            <h2 style={{fontSize:'clamp(26px,3vw,38px)'}}>Three plans for every business stage</h2>
          </div>
          <div className="grid-3" style={{marginTop:32}}>
            {PLANS.map(plan => (
              <div key={plan.name} className="card reveal-up" style={{border: plan.primary ? '2px solid var(--blue)' : undefined, position:'relative'}}>
                {plan.primary && <div style={{position:'absolute',top:-14,left:'50%',transform:'translateX(-50%)',background:'var(--grad)',color:'#fff',fontSize:11,fontFamily:'var(--font)',fontWeight:700,padding:'4px 14px',borderRadius:99,letterSpacing:'.06em',whiteSpace:'nowrap'}}>MOST POPULAR</div>}
                <div style={{display:'inline-block',fontSize:10.5,fontFamily:'var(--font)',fontWeight:800,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--blue)',marginBottom:8}}>{plan.name}</div>
                <h3 style={{fontSize:20,marginBottom:6}}>{plan.subtitle}</h3>
                <p style={{fontSize:13.5,color:'var(--text-2)',marginBottom:18,borderBottom:'1px solid var(--line)',paddingBottom:14}}>Best for: {plan.best}</p>
                <div style={{fontSize:12,fontFamily:'var(--font)',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--text-3)',marginBottom:10}}>What's typically included:</div>
                <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:8,marginBottom:18}}>
                  {plan.includes.map(item => (
                    <li key={item} style={{display:'flex',gap:9,alignItems:'flex-start',fontSize:13.5,color:'var(--text)'}}>
                      <svg style={{width:15,height:15,stroke:'var(--success)',fill:'none',strokeWidth:2.5,flex:'none',marginTop:2}} viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p style={{fontSize:13,color:'var(--text-2)',marginBottom:18,fontStyle:'italic'}}>{plan.pricing}</p>
                <a href={plan.ctaHref} className={`btn ${plan.primary ? 'btn-primary' : 'btn-soft'}`} style={{width:'100%',justifyContent:'center'}}>{plan.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom */}
      <section className="section section-warm">
        <div className="wrap">
          <div className="card reveal-up" style={{background:'var(--navy)',color:'#fff',display:'flex',justifyContent:'space-between',alignItems:'center',gap:24,flexWrap:'wrap',padding:'34px 38px'}}>
            <div>
              <div style={{fontSize:11,fontFamily:'var(--font)',fontWeight:800,letterSpacing:'.14em',textTransform:'uppercase',color:'#6da8e0',marginBottom:8}}>CUSTOM REQUIREMENT</div>
              <h3 style={{color:'#fff',fontSize:22,marginBottom:8}}>Need something specific?</h3>
              <p style={{color:'#9ab5d4',maxWidth:520}}>Need a specific service not in the plans above? Or a combination of services tailored to your business? Tell us what you need — we'll put together the right recommendation and a clear quote.</p>
            </div>
            <a className="btn btn-light" style={{flexShrink:0}} href="/company/contact">Get a Custom Quote</a>
          </div>
        </div>
      </section>

      {/* How pricing works */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">How pricing works</span>
            <h2 style={{fontSize:'clamp(26px,3vw,38px)'}}>Three components, always separated</h2>
            <p>We never bundle everything into one padded number. Your quote always shows exactly what goes where.</p>
          </div>
          <div className="grid-3" style={{marginTop:30}}>
            {[
              { icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', title: 'Professional fee', desc: "What you pay LauncherDesk for filing, drafting, coordination and ongoing support." },
              { icon: 'M3 21h18M5 21V10M9 21V10M15 21V10M19 21V10M3 10l9-7 9 7z', title: 'Government fee', desc: 'The actual fee paid to the relevant government authority — varies by state, service and case.' },
              { icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6', title: 'Taxes', desc: 'GST applicable on our professional fee, shown as a clear line item — never hidden in the total.' },
            ].map(c => (
              <div key={c.title} className="card reveal-up">
                <div className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={c.icon}/></svg></div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual services note */}
      <section className="section section-2">
        <div className="wrap">
          <div className="sec-head center reveal-up">
            <span className="eyebrow">Individual services</span>
            <h2>Every service is also available individually</h2>
            <p>Company registration, GST, trademark, website development, accounting and more — visit the relevant service page for details, or enquire directly.</p>
          </div>
          <div className="center" style={{marginTop:24}}>
            <a href="/services" className="btn btn-soft">Browse all services</a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center reveal-up"><span className="eyebrow">Common questions</span><h2>Pricing questions, answered.</h2></div>
          <div className="faq reveal-up" style={{marginTop:32}}>
            {PRICING_FAQS.map((item, i) => (
              <div key={i} className="faq-i">
                <button className="faq-q">{item.q}<svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14"/></svg></button>
                <div className="faq-a"><p>{item.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-2">
        <div className="wrap">
          <div className="final reveal-up">
            <h2>Get a custom quote.</h2>
            <p>Tell us about your business and we'll send an itemised quote — no obligation.</p>
            <div className="row">
              <a href="/company/contact" className="btn btn-light">Talk to an Expert</a>
              <a href="https://wa.me/918548854859?text=Hi%20LauncherDesk%2C%20I'd%20like%20a%20quote%20for%20my%20business." className="btn btn-ghost-d">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}