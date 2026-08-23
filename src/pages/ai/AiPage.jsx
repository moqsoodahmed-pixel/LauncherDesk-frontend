import { useEffect } from 'react'

const SPARK = 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z'
const ARROW = 'M5 12h14M13 6l6 6-6 6'
const CHEV  = 'm9 18 6-6-6-6'

const CARDS = [
  { icon: 'M11 11a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm10 10-4.3-4.3', title: 'Answers in plain language',  desc: "Ask about GST, structures, trademarks or compliance the way you'd ask a person — no jargon required." },
  { icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11', title: 'Builds a real roadmap', desc: 'Not just an answer — a prioritised sequence of what your specific business needs next.' },
  { icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', title: 'Hands off to an expert', desc: 'The moment your question needs professional judgment, it routes you to a qualified LauncherDesk expert.' },
]

const PROMPTS = [
  { q: 'I want to start a business — where do I begin?',            title: '"Where do I begin?"',              desc: 'Get a starting point based on your business type and stage.' },
  { q: 'Which structure is right for me — Pvt Ltd, LLP or OPC?',   title: '"Which structure is right for me?"', desc: 'Compare Pvt Ltd, LLP and OPC for your specific situation.' },
  { q: 'Do I need GST registration right now?',                     title: '"Do I need GST right now?"',        desc: 'Find out based on your turnover, channel and location.' },
]

export default function AiPage() {
  /* Wire the prompt cards to the AI assistant */
  useEffect(() => {
    const buttons = document.querySelectorAll('[data-ask]')
    const handlers = []
    buttons.forEach(b => {
      const handler = () => {
        if (window.LDAI) {
          window.LDAI.open()
          setTimeout(() => window.LDAI.send(b.dataset.ask), 350)
        }
      }
      b.addEventListener('click', handler)
      handlers.push({ b, handler })
    })
    return () => handlers.forEach(({ b, handler }) => b.removeEventListener('click', handler))
  }, [])

  return (
    <>
      {/* Dark hero — no page-hero class, uses section-dark like the original */}
      <section className="section-dark" style={{padding:'52px 0 80px'}}>
        <div className="wrap">
          <nav className="crumb reveal-up in" style={{color:'#a9c6dd'}}>
            <a href="/" style={{color:'#a9c6dd'}}>Home</a>
            <svg viewBox="0 0 24 24" style={{stroke:'#7fb4dc'}}><path d={CHEV}/></svg>
            <span className="cur" style={{color:'#fff'}}>LauncherDesk AI</span>
          </nav>

          <div className="ai-hero" style={{marginTop:22}}>
            <div className="reveal-up in">
              <span className="eyebrow" style={{color:'#7fb4dc'}}>LauncherDesk AI</span>
              <h1 style={{color:'#fff',fontSize:'clamp(34px,4.4vw,56px)',marginTop:14}}>Smart guidance for your business.</h1>
              <p style={{color:'#a9c6dd',fontSize:18,marginTop:18,maxWidth:520}}>LauncherDesk brings expert guidance and AI assistance together. Ask anything about starting, managing and growing your business — a qualified LauncherDesk professional reviews and acts on your specific situation.</p>
              <div className="hero-cta" style={{marginTop:26}}>
                <button className="btn btn-light" data-open-ai="true">
                  Ask a question{' '}
                  <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={ARROW}/></svg>
                </button>
                <a href="/services#finder" className="btn btn-ghost-d">Use the Service Finder instead</a>
              </div>
            </div>

            {/* Chat mockup */}
            <div className="ai-chat reveal-up in">
              <div className="head">
                <span className="av">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d={SPARK}/></svg>
                </span>
                <div>
                  <b>LauncherDesk AI</b>
                  <small><span style={{width:7,height:7,borderRadius:'50%',background:'#4ade80',display:'inline-block'}}/> Online</small>
                </div>
              </div>
              <div className="bubble u">I want to start an e-commerce business in Karnataka.</div>
              <div className="bubble a">
                Great — for an online seller in Karnataka, here's the order I'd recommend:
                <div className="steps">
                  <div><span className="sn">01</span> Register a Private Limited Company</div>
                  <div><span className="sn">02</span> GST registration — required for online sales</div>
                  <div><span className="sn">03</span> MSME / Udyam for benefits</div>
                  <div><span className="sn">04</span> Trademark your store name</div>
                  <div><span className="sn">05</span> Current account &amp; payment gateway</div>
                </div>
                <div style={{marginTop:12,fontSize:12,color:'#8fb2ce'}}>General information — a LauncherDesk professional will confirm the specifics for your case.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What it does */}
      <section className="section-sm">
        <div className="wrap">
          <div className="sec-head center reveal-up">
            <span className="eyebrow">What it does</span>
            <h2>More than an FAQ bot</h2>
          </div>
          <div className="grid-3" style={{marginTop:30}}>
            {CARDS.map(c => (
              <div key={c.title} className="card reveal-up">
                <div className="ci">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={c.icon}/></svg>
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Try it */}
      <section className="section section-warm">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">Try it</span>
            <h2 style={{fontSize:'clamp(26px,3vw,38px)'}}>Ask about your business</h2>
          </div>
          <div className="grid-3" style={{marginTop:26}}>
            {PROMPTS.map(p => (
              <button
                key={p.q}
                className="card reveal-up"
                style={{textAlign:'left',border:0,cursor:'pointer',fontFamily:'inherit'}}
                data-ask={p.q}
              >
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="arrow">Ask LauncherDesk AI →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Scope disclaimer */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center reveal-up">
            <span className="eyebrow">A note on scope</span>
            <h2>What LauncherDesk AI is — and isn't</h2>
            <p>LauncherDesk AI provides general information and helps identify relevant LauncherDesk services based on what you share. It is not a substitute for qualified legal, tax or financial advice. Situation-specific matters are reviewed by a qualified LauncherDesk professional before any filing or decision is made on your behalf.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section section-2">
        <div className="wrap">
          <div className="final reveal-up">
            <h2>Ask LauncherDesk AI right now.</h2>
            <p>It's free, it's fast, and it hands you to a human the moment you need one.</p>
            <div className="row">
              <button className="btn btn-light" data-open-ai="true">Start a conversation</button>
              <a href="/company/contact" className="btn btn-ghost-d">Talk to an Expert instead</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}