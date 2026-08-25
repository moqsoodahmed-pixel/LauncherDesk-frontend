import React, { useEffect } from 'react'

const CHEV  = 'm9 18 6-6-6-6'
const ARROW = 'M5 12h14M13 6l6 6-6 6'
const CHECK = 'M20 6 9 17l-5-5'
const PLUS  = 'M12 5v14M5 12h14'
const MINUS = 'M5 12h14'

/* ── Primitives ── */
function ChevSvg() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><path d={CHEV}/></svg>
}

function CheckLi({ children }) {
  return (
    <li>
      <svg viewBox="0 0 24 24" fill="none"><path d={CHECK}/></svg>
      <span dangerouslySetInnerHTML={{ __html: children }} />
    </li>
  )
}

/* ── TOC ── */
function Toc({ items }) {
  useEffect(() => {
    const links = document.querySelectorAll('.toc a')
    if (!links.length) return
    const secs = Array.from(links).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean)
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(l => l.classList.remove('active'))
          const a = document.querySelector(`.toc a[href="#${en.target.id}"]`)
          if (a) a.classList.add('active')
        }
      })
    }, { rootMargin: '-20% 0px -70% 0px' })
    secs.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [items])

  return (
    <aside className="toc">
      <h5>On this page</h5>
      {items.map(item => (
        <a key={item.href} href={item.href}>{item.label}</a>
      ))}
    </aside>
  )
}

/* ── Section content ── */
function SectionContent({ id, data }) {
  if (!data) return null

  if (data.content) {
    return (
      <section id={id}>
        <h2>{data.heading}</h2>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </section>
    )
  }

  if (data.items) {
    return (
      <section id={id}>
        <h2>{data.heading}</h2>
        <ul>
          {data.items.map((item, i) => <CheckLi key={i}>{item}</CheckLi>)}
        </ul>
        {data.extra && <div dangerouslySetInnerHTML={{ __html: data.extra }} />}
      </section>
    )
  }

  if (data.steps) {
    return (
      <section id={id}>
        <h2>{data.heading}</h2>
        <div className="timeline">
          {data.steps.map((step, i) => (
            <div key={i} className="tl">
              <span className="dot">{i + 1}</span>
              <div><b>{step.title}</b><p>{step.body}</p></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (data.tableHtml) {
    return (
      <section id={id}>
        <h2>{data.heading}</h2>
        <div className="pricebox" dangerouslySetInnerHTML={{ __html: data.tableHtml }} />
      </section>
    )
  }

  if (data.rows) {
    return (
      <section id={id}>
        <h2>{data.heading}</h2>
        {data.intro && <p>{data.intro}</p>}
        <div className="pricebox">
          <table className="tbl">
            <thead><tr><th>Component</th><th>What it covers</th></tr></thead>
            <tbody>
              {data.rows.map(([col1, col2], i) => (
                <tr key={i}><td>{col1}</td><td>{col2}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.outro && <p style={{ marginTop: 14 }} dangerouslySetInnerHTML={{ __html: data.outro }} />}
      </section>
    )
  }

  return null
}

/* ── FAQ section — pure CSS hover ── */
function FaqSection({ data }) {
  const [showAll, setShowAll] = React.useState(false)
  if (!data) return null
  const items = showAll ? data.items : data.items.slice(0, 4)
  const hasMore = data.items.length > 4

  return (
    <section id="faq">
      <h2>{data.heading}</h2>
      <div className="faq-list">
        {items.map((item, i) => (
          <div key={i} className="faq-item">
            <div className="faq-q" style={{
              width:'100%', display:'flex', alignItems:'center',
              justifyContent:'space-between', gap:16, padding:'18px 0',
              borderBottom:'1px solid var(--line)', cursor:'default',
            }}>
              <span style={{fontSize:16, fontWeight:600, color:'var(--navy)', lineHeight:1.4}}>{item.q}</span>
              <svg
                viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                className="faq-plus-icon"
                style={{width:20, height:20, flexShrink:0, transition:'transform .25s'}}
              >
                <path d={PLUS}/>
              </svg>
            </div>
            <div className="faq-hover-a">
              <p style={{padding:'14px 0 20px', color:'var(--text-2)', fontSize:15, lineHeight:1.7}}>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
      {hasMore && !showAll && (
        <div style={{textAlign:'center', marginTop:24}}>
          <button onClick={() => setShowAll(true)} style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'0 24px', height:44, borderRadius:9,
            background:'var(--blue)', color:'#fff', fontWeight:700,
            fontSize:14, border:'none', cursor:'pointer',
            boxShadow:'0 4px 14px rgba(29,111,224,.3)',
          }}>
            View more
            <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      )}
    </section>
  )
}

/* ── Related services ── */
function RelatedServices({ items }) {
  return (
    <section className="section-sm">
      <div className="wrap">
        <h2 style={{ fontSize: 'clamp(24px,3vw,34px)' }}>Related services</h2>
        <div className="related reveal-up" style={{ marginTop: 26 }}>
          {items.map(item => (
            <a key={item.href} href={item.href} className="card">
              <h3 style={{fontSize:17, marginBottom:8}}>{item.label}</h3>
              <p style={{fontSize:14, color:'var(--text-2)', marginBottom:12}}>{item.note}</p>
              <span className="arrow" style={{color:'var(--blue)', fontWeight:600, fontSize:14}}>Learn more →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Aside ── */
function ServiceAside({ priceCard, helpCard }) {
  return (
    <aside className="svc-aside">
      <div className="price-card">
        <div className="k">{priceCard.label}</div>
        <div className="from">{priceCard.price}</div>
        <small>{priceCard.sub}</small>
        <a href="/company/contact" className="btn btn-light">Get your exact quote</a>
      </div>
      <div className="help-card">
        <h4>{helpCard.title}</h4>
        <p>{helpCard.body}</p>
        <button className="btn btn-soft" data-open-ai="true">Ask LauncherDesk AI</button>
        <a className="btn btn-primary" href="/company/contact">Talk to an Expert</a>
      </div>
    </aside>
  )
}

/* ── Main ── */
export default function ServicePage({ svc }) {
  const { title, eyebrow, crumbCategory, lead, toc, sections, related, priceCard, helpCard } = svc
  const sectionOrder = toc.map(t => t.href.replace('#', ''))

  return (
    <>
      {/* Hero */}
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><ChevSvg />
            <a href="/services">Services</a><ChevSvg />
            <span>{crumbCategory}</span><ChevSvg />
            <span className="cur">{title}</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{ marginTop: 16, display: 'block' }}>{eyebrow}</span>
          <h1 className="reveal-up in">{title}</h1>
          <p className="lead reveal-up in">{lead}</p>
          <div className="hero-cta reveal-up in">
            <a href="/company/contact" className="btn btn-primary">
              Talk to an Expert{' '}
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={ARROW}/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* 3-col sticky layout */}
      <section className="section-sm" style={{overflow:"visible"}}>
        <div className="wrap" style={{overflow:"visible"}}>
          <div className="svc-layout" style={{overflow:"visible"}}>

            {/* LEFT — sticky TOC */}
            <div className="svc-toc-col">
              <Toc items={toc} />
            </div>

            {/* MIDDLE — scrollable content */}
            <div className="svc-body">
              {sectionOrder.map(id => {
                if (id === 'faq') return <FaqSection key="faq" data={sections.faq} />
                return <SectionContent key={id} id={id} data={sections[id]} />
              })}
            </div>

            {/* RIGHT — sticky aside */}
            <div className="svc-aside-col">
              <ServiceAside priceCard={priceCard} helpCard={helpCard} />
            </div>

          </div>
        </div>
      </section>

      {related && related.length > 0 && <RelatedServices items={related} />}
    </>
  )
}