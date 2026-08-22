import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const CHEV = 'm9 18 6-6-6-6'
const ARROW = 'M5 12h14M13 6l6 6-6 6'
const CHECK = 'M20 6 9 17l-5-5'
const PLUS = 'M12 5v14M5 12h14'

/* ── Shared primitives ── */
function ChevSvg() {
  return <svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
}

function CheckLi({ children }) {
  return (
    <li>
      <svg viewBox="0 0 24 24" fill="none"><path d={CHECK}/></svg>
      <span dangerouslySetInnerHTML={{ __html: children }} />
    </li>
  )
}

/* ── TOC with scrollspy ── */
function Toc({ items }) {
  useEffect(() => {
    const links = document.querySelectorAll('.toc a')
    if (!links.length) return
    const secs = Array.from(links)
      .map(a => document.querySelector(a.getAttribute('href')))
      .filter(Boolean)
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id))
        }
      })
    }, { rootMargin: '-30% 0px -60% 0px' })
    secs.forEach(s => spy.observe(s))
    return () => spy.disconnect()
  }, [])

  return (
    <aside className="toc">
      <h5>On this page</h5>
      {items.map((item, i) => (
        <a key={item.href} href={item.href} className={i === 0 ? 'active' : ''}>{item.label}</a>
      ))}
    </aside>
  )
}

/* ── Section renderers ── */
function SectionContent({ id, data }) {
  if (!data) return null

  /* Raw HTML section (overview, classes) */
  if (data.content) {
    return (
      <section id={id}>
        <h2>{data.heading}</h2>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </section>
    )
  }

  /* List section */
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

  /* Timeline section */
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

  /* Compare table (raw HTML) */
  if (data.tableHtml) {
    return (
      <section id={id}>
        <h2>{data.heading}</h2>
        <div className="pricebox" dangerouslySetInnerHTML={{ __html: data.tableHtml }} />
      </section>
    )
  }

  /* Pricing section */
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

  /* FAQ section */
  if (data.items && !data.content) return null // handled above
  return null
}

function FaqSection({ data }) {
  if (!data) return null
  return (
    <section id="faq">
      <h2>{data.heading}</h2>
      <div className="faq" style={{ maxWidth: 'none' }}>
        {data.items.map((item, i) => (
          <div key={i} className="faq-i">
            <button className="faq-q">
              {item.q}
              <svg viewBox="0 0 24 24" fill="none"><path d={PLUS}/></svg>
            </button>
            <div className="faq-a">
              <p dangerouslySetInnerHTML={{ __html: item.a }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Related services strip ── */
function RelatedServices({ items }) {
  return (
    <section className="section section-warm">
      <div className="wrap">
        <div className="sec-head reveal-up">
          <span className="eyebrow">Keep going</span>
          <h2 style={{ fontSize: 'clamp(24px,3vw,34px)' }}>Related services</h2>
        </div>
        <div className="related reveal-up" style={{ marginTop: 26 }}>
          {items.map(item => (
            <a key={item.href} href={item.href}>
              <b>
                {item.label}
                <svg style={{ width: 18, height: 18, stroke: 'var(--blue)' }} viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d={ARROW}/>
                </svg>
              </b>
              <span>{item.note}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Aside cards ── */
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

/* ── Main exported template ── */
export default function ServicePage({ svc }) {
  const { title, eyebrow, crumbCategory, lead, toc, sections, related, priceCard, helpCard } = svc

  /* Ensure FAQ accordion works after mount */
  useEffect(() => {
    const qs = document.querySelectorAll('.faq-q')
    const handlers = []
    qs.forEach(q => {
      const handler = () => {
        const a = q.nextElementSibling
        const open = q.classList.contains('open')
        q.classList.toggle('open', !open)
        if (a) a.style.maxHeight = open ? null : a.scrollHeight + 'px'
      }
      q.addEventListener('click', handler)
      handlers.push({ q, handler })
    })
    return () => handlers.forEach(({ q, handler }) => q.removeEventListener('click', handler))
  }, [title])

  /* Section render order follows toc */
  const sectionOrder = toc.map(t => t.href.replace('#', ''))

  return (
    <>
      {/* Page Hero */}
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a>
            <ChevSvg />
            <a href="/services">Services</a>
            <ChevSvg />
            <span>{crumbCategory}</span>
            <ChevSvg />
            <span className="cur">{title}</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{ marginTop: 16, display: 'block' }}>{eyebrow}</span>
          <h1 className="reveal-up in">{title}</h1>
          <p className="lead reveal-up in">{lead}</p>
          <div className="hero-cta reveal-up in">
            <a href="/company/contact" className="btn btn-primary">
              Get Started{' '}
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={ARROW}/>
              </svg>
            </a>
            <a href="/company/contact" className="btn btn-soft">Talk to an Expert</a>
          </div>
        </div>
      </header>

      {/* Body */}
      <section className="section-sm">
        <div className="wrap">
          <div className="svc-layout">
            <Toc items={toc} />

            <div className="svc-body">
              {sectionOrder.map(id => {
                if (id === 'faq') return <FaqSection key="faq" data={sections.faq} />
                return <SectionContent key={id} id={id} data={sections[id]} />
              })}
            </div>

            <ServiceAside priceCard={priceCard} helpCard={helpCard} />
          </div>
        </div>
      </section>

      {/* Related */}
      {related && <RelatedServices items={related} />}
    </>
  )
}
