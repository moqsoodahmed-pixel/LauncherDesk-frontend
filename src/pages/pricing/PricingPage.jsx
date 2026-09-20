import { useEffect } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
import { SERVICES } from '../../data/services'

const CHEV = 'm9 18 6-6-6-6'

const DEFAULT_PLANS = [
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

function getDigitalMarketingPlans(serviceSlug) {
  const svc = SERVICES[serviceSlug]
  const svcTitle = svc?.title || 'Digital Marketing'
  
  // Extract items from included or benefits if available
  let rawItems = []
  if (svc?.sections?.included?.items && svc.sections.included.items.length > 0) {
    rawItems = svc.sections.included.items.map(it => it.replace(/<[^>]*>?/gm, '').split(/[\(\—\-]/)[0].trim())
  } else if (svc?.sections?.benefits?.items && svc.sections.benefits.items.length > 0) {
    rawItems = svc.sections.benefits.items.map(it => it.replace(/<[^>]*>?/gm, '').split(/[\(\—\-]/)[0].trim())
  }

  const starterItems = rawItems.length >= 3
    ? [
        rawItems[0],
        rawItems[1] || 'Core Strategy & Setup',
        'Monthly Performance & Keyword Report',
        'Dedicated Account Manager',
        'Email & WhatsApp Support',
      ]
    : [
        'Core Marketing & SEO Audit',
        'Targeted Keyword & Content Setup',
        'Monthly Analytics & Progress Report',
        'Dedicated Account Manager',
        'Standard Email & Chat Support',
      ]

  const growthItems = rawItems.length >= 4
    ? [
        `Everything in Starter (${svcTitle})`,
        rawItems[2] || 'Advanced Campaign Scaling',
        rawItems[3] || 'Continuous A/B Testing & Optimization',
        'Priority SLA & Weekly Progress Review',
        'Dedicated Senior Strategist',
      ]
    : [
        'Everything in Starter pack',
        'Full Multi-Channel Campaign Optimization',
        'Bi-Weekly Review & Performance Scaling',
        'Priority Response & Dedicated Senior Manager',
        'Custom ROI & Conversion Tracking',
      ]

  return [
    {
      name: 'STARTER',
      subtitle: `Essential ${svcTitle}`,
      best: `Early-stage businesses and startups seeking predictable, high-impact growth for ${svcTitle}.`,
      includes: starterItems,
      amount: 4999,
      period: '/month',
      pricing: '₹4,999/mo',
      badge: 'Starter fit',
      cta: 'Pay ₹4,999',
      ctaHref: '/company/contact',
      primary: false,
    },
    {
      name: 'GROWTH',
      subtitle: `Advanced ${svcTitle}`,
      best: `Growing businesses and scaling brands looking for comprehensive, full-funnel ${svcTitle} execution.`,
      includes: growthItems,
      amount: 6999,
      period: '/month',
      pricing: '₹6,999/mo',
      badge: 'Advanced fit',
      cta: 'Pay ₹6,999',
      ctaHref: '/company/contact',
      primary: false, // User specified: remove Most Popular from growth
    },
  ]
}

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
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoggedIn } = useUserAuth()

  const isDM = searchParams.get('cat') === 'dm'
  const serviceSlug = searchParams.get('service') || ''

  const activePlans = isDM ? getDigitalMarketingPlans(serviceSlug) : DEFAULT_PLANS
  const gridClass = isDM ? 'grid-2' : 'grid-3'

  useEffect(() => {
    const scrollToTarget = () => {
      if (window.location.hash) {
        const el = document.querySelector(window.location.hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else if (isDM) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    scrollToTarget()
    const t1 = setTimeout(scrollToTarget, 100)
    const t2 = setTimeout(scrollToTarget, 300)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [isDM])

  function handlePlanAction(plan) {
    if (!isLoggedIn) {
      navigate('/user/login', { state: { from: `${location.pathname}${location.search}${location.hash}`, tab: 'login' } })
    } else {
      navigate(plan.ctaHref || '/company/contact')
    }
  }

  return (
    <>
      {!isDM && (
        <header className="page-hero">
          <div className="wrap">
            <nav className="crumb reveal-up in">
              <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
              <span className="cur">Pricing</span>
            </nav>
            <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>
              Transparent pricing
            </span>
            <h1 className="reveal-up in">
              Transparent pricing. Clear scope.
            </h1>
            <p className="lead reveal-up in">
              Every business is different. Choose a plan that matches your stage, or tell us what you need and we'll put together a custom quote.
            </p>
          </div>
        </header>
      )}

      {/* Plans */}
      <section id="plans" className="section-sm" style={{ scrollMarginTop: 80, paddingTop: isDM ? 'clamp(32px, 5vw, 60px)' : undefined }}>
        <div className="wrap">
          {isDM && (
            <nav className="crumb reveal-up in" style={{ marginBottom: 20 }}>
              <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
              <a href="/digital-marketing">Digital Marketing</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
              <span className="cur">Monthly Plans</span>
            </nav>
          )}
          <div className="sec-head reveal-up in">
            <span className="eyebrow">Choose your plan</span>
            <h2 style={{fontSize:'clamp(26px,3vw,38px)'}}>
              {isDM ? 'Monthly plans tailored to your growth' : 'Three plans for every business stage'}
            </h2>
            {isDM && (
              <p style={{ color: 'var(--text-2)', fontSize: 'clamp(14px, 1.4vw, 16px)', marginTop: 8 }}>
                Affordable monthly performance marketing plans tailored to your business goals. Starter pack at ₹4,999/mo and Growth pack at ₹6,999/mo.
              </p>
            )}
          </div>
          <div className={gridClass} style={{
            marginTop: 32,
            maxWidth: isDM ? 860 : undefined,
            marginInline: isDM ? 'auto' : undefined,
            alignItems: 'stretch',
          }}>
            {activePlans.map(plan => {
              const buttonText = !isLoggedIn ? 'Login to Pay' : (plan.cta || `Pay ₹${plan.amount?.toLocaleString('en-IN') || plan.name}`)

              return (
                <div key={plan.name} className="card reveal-up in" style={{
                  border: plan.primary ? '1.5px solid var(--blue)' : undefined,
                  position: 'relative',
                  overflow: 'visible',
                  transform: plan.primary ? 'translateY(-8px)' : undefined,
                  boxShadow: plan.primary ? '0 20px 48px rgba(29,93,184,.16), 0 4px 16px rgba(15,28,46,.05)' : undefined,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  boxSizing: 'border-box',
                }}>
                  {plan.primary && <div style={{position:'absolute',top:-14,left:'50%',transform:'translateX(-50%)',background:'var(--grad)',color:'#fff',fontSize:11,fontFamily:'var(--font)',fontWeight:700,padding:'4px 14px',borderRadius:99,letterSpacing:'.06em',whiteSpace:'nowrap',boxShadow:'0 4px 14px rgba(29,93,184,.3)',zIndex:2}}>MOST POPULAR</div>}
                  
                  {/* Card top bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{fontSize:10.5,fontFamily:'var(--font)',fontWeight:800,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--blue)'}}>{plan.name}</div>
                    {isDM && plan.badge && (
                      <span style={{
                        fontSize: 11,
                        fontFamily: 'var(--font)',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: 99,
                        background: 'rgba(29,93,184,0.08)',
                        color: 'var(--blue)',
                        letterSpacing: '.02em'
                      }}>
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <h3 style={{fontSize:21,fontWeight:800,marginBottom:12,color:'var(--navy)',minHeight: isDM ? 54 : undefined}}>{plan.subtitle}</h3>

                  {/* Top Price Section (Sample style adapted to LauncherDesk theme) */}
                  {isDM && plan.amount ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 4,
                      marginBottom: 16,
                      paddingBottom: 16,
                      borderBottom: '1px solid var(--line)'
                    }}>
                      <span style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: 'var(--navy)',
                        fontFamily: 'var(--font)',
                        lineHeight: 1,
                      }}>
                        ₹
                      </span>
                      <span style={{
                        fontSize: 'clamp(34px, 3.6vw, 42px)',
                        fontWeight: 900,
                        letterSpacing: '-.03em',
                        color: 'var(--navy)',
                        fontFamily: 'var(--font)',
                        lineHeight: 1,
                      }}>
                        {plan.amount.toLocaleString('en-IN')}
                      </span>
                      <span style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: 'var(--text-3)',
                        marginLeft: 2,
                        fontFamily: 'var(--font)',
                      }}>
                        {plan.period || '/month'}
                      </span>
                    </div>
                  ) : null}

                  <p style={{fontSize:13.5,color:'var(--text-2)',marginBottom:18,borderBottom: isDM ? 'none' : '1px solid var(--line)',paddingBottom: isDM ? 0 : 14,minHeight: isDM ? 60 : undefined}}>Best for: {plan.best}</p>
                  
                  <div style={{fontSize:12,fontFamily:'var(--font)',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--text-3)',marginBottom:10}}>What's typically included:</div>
                  <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:8,marginBottom:24,flexGrow:1}}>
                    {plan.includes.map(item => (
                      <li key={item} style={{display:'flex',gap:9,alignItems:'flex-start',fontSize:13.5,color:'var(--text)',lineHeight:1.45}}>
                        <svg style={{width:15,height:15,stroke:'var(--success)',fill:'none',strokeWidth:2.5,flex:'none',marginTop:2}} viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {!isDM && (
                    <div style={{
                      marginTop: 'auto',
                      paddingTop: 16,
                      borderTop: '1px solid var(--line)',
                      marginBottom: 16,
                      fontSize: 13,
                      color: 'var(--text-2)',
                      fontStyle: 'italic',
                    }}>
                      {plan.pricing}
                    </div>
                  )}

                  <div style={{ marginTop: 'auto', paddingTop: isDM ? 12 : 0 }}>
                    <button
                      type="button"
                      onClick={() => handlePlanAction(plan)}
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: 14.5,
                        padding: '13px 16px',
                        borderRadius: 10,
                        textAlign: 'center',
                        boxShadow: '0 4px 14px rgba(29,93,184,.25)',
                      }}
                    >
                      {buttonText}
                    </button>
                  </div>
                </div>
              )
            })}
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
              <a href="/company/contact" className="btn btn-light">Talk to Our Expert</a>
              <a href="https://wa.me/918548854859?text=Hi%20LauncherDesk%2C%20I'd%20like%20a%20quote%20for%20my%20business." className="btn btn-ghost-d">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}