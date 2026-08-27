import { useState } from 'react'
import { Link } from 'react-router-dom'

const S = `
.wa-hero{background:linear-gradient(160deg,#04091A 0%,#064E1A 55%,#065F2A 100%);padding:clamp(64px,8vw,100px) 0 clamp(52px,6vw,80px);position:relative;overflow:hidden}
.wa-hero::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(800px 600px at 70% -10%,rgba(37,211,102,.18),transparent 60%)}
.wa-inner{max-width:1160px;margin:0 auto;padding:0 28px;position:relative;z-index:1}
.wa-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(37,211,102,.15);border:1px solid rgba(37,211,102,.3);border-radius:99px;padding:5px 14px;font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#25D366;margin-bottom:20px}
.wa-hero h1{font-size:clamp(34px,4.8vw,62px);font-weight:900;color:#fff;letter-spacing:-.04em;line-height:1.04;margin-bottom:18px}
.wa-hero h1 span{background:linear-gradient(118deg,#25D366,#128C7E);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.wa-hero-desc{font-size:17px;color:#9ab5d4;line-height:1.7;max-width:520px;margin-bottom:32px}
.wa-hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:center}
.wa-cta-row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:28px}
.wa-btn-primary{display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 28px;background:#25D366;color:#fff;font-weight:700;font-size:15px;border-radius:10px;text-decoration:none;transition:all .15s;box-shadow:0 8px 24px rgba(37,211,102,.35);border:0;cursor:pointer;font-family:inherit}
.wa-btn-primary:hover{background:#1da851;transform:translateY(-2px)}
.wa-btn-outline{display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 24px;background:rgba(255,255,255,.08);color:#fff;font-weight:600;font-size:15px;border-radius:10px;border:1.5px solid rgba(255,255,255,.2);text-decoration:none;transition:all .15s}
.wa-btn-outline:hover{background:rgba(255,255,255,.14)}
.wa-badges{display:flex;flex-wrap:wrap;gap:10px}
.wa-badge{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:99px;padding:7px 14px;font-size:13px;font-weight:600;color:#9ab5d4}
.wa-badge svg{width:14px;height:14px;stroke:#25D366;fill:none;stroke-width:2.5;flex:none}

.wa-stats-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:28px;backdrop-filter:blur(10px)}
.wa-stats-card h3{color:#fff;font-size:16px;font-weight:700;margin-bottom:20px}
.wa-stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
.wa-stat-box{background:rgba(255,255,255,.07);border-radius:12px;padding:16px;text-align:center}
.wa-stat-box .n{font-size:24px;font-weight:900;color:#25D366;line-height:1}
.wa-stat-box .l{font-size:11px;color:#9ab5d4;margin-top:4px;text-transform:uppercase;letter-spacing:.06em}
.wa-meta-badge{display:flex;align-items:center;gap:10px;background:rgba(37,211,102,.1);border:1px solid rgba(37,211,102,.2);border-radius:10px;padding:12px 16px}
.wa-meta-badge svg{width:22px;height:22px;flex:none}
.wa-meta-badge span{font-size:13px;color:#9ab5d4}
.wa-meta-badge b{display:block;color:#fff;font-size:14px;font-weight:700}

.wa-features{padding:88px 0;background:var(--sec-teal-bg)}
.wa-feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px}
.wa-feat-card{background:#fff;border-radius:20px;padding:28px;border:1.5px solid var(--sec-teal-border);transition:transform .2s,box-shadow .2s}
.wa-feat-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(5,150,105,.12)}
.wa-feat-ic{width:52px;height:52px;border-radius:14px;background:#DCFCE7;display:grid;place-items:center;margin-bottom:18px}
.wa-feat-ic svg{width:24px;height:24px;stroke:#16A34A;fill:none;stroke-width:2}
.wa-feat-card h3{font-size:17px;font-weight:800;color:var(--navy);margin-bottom:8px}
.wa-feat-card p{font-size:14px;color:var(--text-2);line-height:1.6}

.wa-usecases{padding:88px 0;background:var(--sec-orange-bg)}
.wa-uc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:48px}
.wa-uc-card{background:#fff;border-radius:16px;padding:24px;border:1.5px solid var(--sec-orange-border);display:flex;gap:16px;align-items:flex-start;transition:border-color .15s}
.wa-uc-card:hover{border-color:var(--sec-orange-accent)}
.wa-uc-ic{width:44px;height:44px;border-radius:10px;background:var(--sec-orange-bg);display:grid;place-items:center;flex:none}
.wa-uc-ic svg{width:20px;height:20px;stroke:var(--sec-orange-accent);fill:none;stroke-width:2}
.wa-uc-card h4{font-size:15px;font-weight:700;color:var(--navy);margin-bottom:6px}
.wa-uc-card p{font-size:13.5px;color:var(--text-2);line-height:1.6}

.wa-process{padding:88px 0;background:var(--sec-purple-bg)}
.wa-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:48px;position:relative}
.wa-steps::before{content:'';position:absolute;top:30px;left:48px;right:48px;height:2px;background:linear-gradient(90deg,#25D366,#128C7E);z-index:0}
.wa-step{text-align:center;position:relative;z-index:1}
.wa-step-num{width:60px;height:60px;border-radius:50%;background:#25D366;color:#fff;font-size:18px;font-weight:900;display:grid;place-items:center;margin:0 auto 16px;box-shadow:0 8px 24px rgba(37,211,102,.35)}
.wa-step h4{font-size:14.5px;font-weight:700;color:var(--navy);margin-bottom:8px}
.wa-step p{font-size:13px;color:var(--text-2);line-height:1.6}

.wa-pricing{padding:88px 0;background:var(--sec-amber-bg)}
.wa-price-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px}
.wa-price-card{background:#fff;border-radius:20px;padding:28px;border:1.5px solid var(--sec-amber-border);position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s}
.wa-price-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(217,119,6,.1)}
.wa-price-card.featured{border-color:#25D366;box-shadow:0 0 0 2px rgba(37,211,102,.2)}
.wa-price-badge{position:absolute;top:16px;right:16px;background:#25D366;color:#fff;font-size:10px;font-weight:700;padding:3px 10px;border-radius:99px}
.wa-price-card h3{font-size:19px;font-weight:800;color:var(--navy);margin-bottom:6px}
.wa-price{font-size:28px;font-weight:900;color:#25D366;margin-bottom:4px}
.wa-price span{font-size:14px;font-weight:500;color:var(--text-2)}
.wa-price-card p{font-size:13.5px;color:var(--text-2);margin-bottom:20px;line-height:1.6}
.wa-price-inc{display:flex;flex-direction:column;gap:8px;margin-bottom:24px}
.wa-price-inc-item{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--navy)}
.wa-price-inc-item svg{width:14px;height:14px;stroke:#25D366;fill:none;stroke-width:2.5;flex:none}
.wa-price-cta{display:block;text-align:center;padding:12px;background:#25D366;color:#fff;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;transition:background .15s}
.wa-price-cta:hover{background:#1da851}

.wa-faq{padding:88px 0;background:var(--sec-sky-bg)}
.wa-faq-list{max-width:720px;margin:48px auto 0}
.wa-faq-item{border-bottom:1px solid var(--sec-sky-border)}
.wa-faq-q{width:100%;padding:20px 0;cursor:pointer;background:none;border:0;text-align:left;font-family:var(--font);font-size:16px;font-weight:600;color:var(--navy);display:flex;justify-content:space-between;align-items:center;gap:16px}
.wa-faq-q svg{width:20px;height:20px;stroke:var(--sec-sky-accent);fill:none;stroke-width:2.5;flex:none;transition:transform .25s}
.wa-faq-q.open svg{transform:rotate(45deg)}
.wa-faq-a{font-size:14.5px;color:var(--text-2);line-height:1.7;overflow:hidden;max-height:0;transition:max-height .35s}
.wa-faq-a-in{padding-bottom:20px}

@media(max-width:900px){.wa-hero-grid,.wa-feat-grid,.wa-price-grid{grid-template-columns:1fr 1fr}.wa-steps{grid-template-columns:1fr 1fr}.wa-steps::before{display:none}.wa-uc-grid{grid-template-columns:1fr}}
@media(max-width:600px){.wa-feat-grid,.wa-price-grid,.wa-steps{grid-template-columns:1fr}.wa-hero-grid{grid-template-columns:1fr}.wa-uc-grid{grid-template-columns:1fr}}
`

const CHECK = 'M20 6 9 17l-5-5'
const PLUS  = 'M12 5v14M5 12h14'
const ARROW = 'M5 12h14M12 5l7 7-7 7'
const WA_PATH = 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'

const FEATURES = [
  { icon:'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', title:'Bulk Messaging', body:'Send promotional, transactional and notification messages to thousands of contacts at once. Template-based, Meta-approved.' },
  { icon:'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18', title:'Automated Flows', body:'Set up automated response flows, order updates, appointment reminders and lead follow-ups — 24/7, no manual effort.' },
  { icon:'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title:'CRM Integration', body:'Connect WhatsApp to your CRM (HubSpot, Zoho, custom). All conversations, leads and customer data in one place.' },
  { icon:'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title:'Official Meta API', body:'Verified green tick, no ban risk. Official Business API through Meta — your messages land in the primary inbox.' },
  { icon:'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z', title:'Multi-Agent Inbox', body:'Multiple team members handle WhatsApp conversations from one shared inbox. Assign, transfer and track chats.' },
  { icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Analytics & Reports', body:'Track message delivery, read rates, response times and campaign performance. Know exactly what is working.' },
]

const USE_CASES = [
  { icon:'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title:'E-commerce Order Updates', body:'Automatically send order confirmation, shipping updates, delivery alerts and return status via WhatsApp.' },
  { icon:'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title:'Appointment Reminders', body:'Reduce no-shows with automated WhatsApp reminders for clinics, consultants, salons and service businesses.' },
  { icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title:'Lead Nurturing', body:'Instantly respond to website leads on WhatsApp. Nurture with sequences, qualify automatically and route to sales.' },
  { icon:'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', title:'Payment Reminders', body:'Send automated payment due alerts, invoice reminders and payment confirmation — reduce outstanding receivables.' },
  { icon:'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z', title:'Customer Support', body:'Handle customer queries, complaints and support requests on WhatsApp with multi-agent inbox and auto-assignment.' },
  { icon:'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z', title:'Marketing Campaigns', body:'Broadcast promotional messages, new launches, festive offers and re-engagement campaigns to opted-in customers.' },
]

const FAQS = [
  { q:'What is WhatsApp Business API?', a:'The official Meta WhatsApp Business API lets businesses send and receive WhatsApp messages at scale — bulk messaging, automation, CRM integration and multi-agent support. Unlike the regular WhatsApp Business app, the API has no device limits, supports automation and is designed for business volume.' },
  { q:'How long does API approval take?', a:'Meta typically takes 2–4 weeks to review and approve your WhatsApp Business account. LauncherDesk handles the complete application, documentation and submission process on your behalf.' },
  { q:'Do customers need to opt in?', a:'Yes. WhatsApp requires customer opt-in (consent) before you can send marketing or promotional messages. Transactional messages like order updates can be sent to existing customers with prior relationship.' },
  { q:'Will I get the green verified tick?', a:'The green tick (verified badge) is applied for separately with Meta after API activation. LauncherDesk helps with the application, though approval depends on Meta\'s criteria (business size, brand recognition).' },
  { q:'What are message templates?', a:'Meta requires pre-approved templates for proactive (outbound) messages. Templates are reviewed and approved by Meta within 24–48 hours. Free-form messaging is available when customers initiate contact.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="wa-faq-item">
      <button className={`wa-faq-q${open?' open':''}`} onClick={() => setOpen(o => !o)}>
        {q}<svg viewBox="0 0 24 24"><path d={PLUS}/></svg>
      </button>
      <div className="wa-faq-a" style={{maxHeight: open ? 300 : 0}}>
        <div className="wa-faq-a-in">{a}</div>
      </div>
    </div>
  )
}

export default function WhatsAppBusinessPage() {
  return (
    <>
      <style>{S}</style>

      {/* HERO */}
      <section className="wa-hero">
        <div className="wa-inner">
          <div className="wa-hero-grid">
            <div className="reveal-up in">
              <div className="wa-eyebrow">
                <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2}><path d={WA_PATH}/></svg>
                WhatsApp Business API
              </div>
              <h1>Automate your business on <span>WhatsApp.</span></h1>
              <p className="wa-hero-desc">Official Meta WhatsApp Business API — bulk messaging, automated flows, CRM integration and multi-agent support. Set up in 2–4 weeks, fully managed by LauncherDesk.</p>
              <div className="wa-cta-row">
                <a href="https://wa.me/918548854859?text=Hi, I'm interested in WhatsApp Business API setup" className="wa-btn-primary" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}><path d={WA_PATH}/></svg>
                  Get Started on WhatsApp
                </a>
                <Link to="/company/contact" className="wa-btn-outline">Request a Demo</Link>
              </div>
              <div className="wa-badges">
                {['Official Meta Partner','Green Tick Support','No Ban Risk','2–4 Week Setup'].map(b => (
                  <div key={b} className="wa-badge"><svg viewBox="0 0 24 24"><path d={CHECK}/></svg>{b}</div>
                ))}
              </div>
            </div>
            <div className="reveal-up in">
              <div className="wa-stats-card">
                <h3>WhatsApp Business at a glance</h3>
                <div className="wa-stat-grid">
                  {[['2B+','Monthly Users'],['98%','Open Rate'],['45%','CTR Avg'],['5x','vs Email ROI']].map(([n,l]) => (
                    <div key={l} className="wa-stat-box"><div className="n">{n}</div><div className="l">{l}</div></div>
                  ))}
                </div>
                <div className="wa-meta-badge">
                  <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="#25D366" strokeWidth={2}><path d={CHECK}/></svg>
                  <div><b>Official Meta Business Solution Provider</b><span>LauncherDesk is an authorised implementation partner</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="wa-features">
        <div className="wa-inner">
          <span style={{fontSize:12,fontWeight:700,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--sec-teal-accent)',display:'block',marginBottom:14}}>What You Get</span>
          <h2 style={{fontSize:'clamp(26px,3.6vw,44px)',fontWeight:900,letterSpacing:'-.04em',color:'var(--navy)',marginBottom:8}}>Everything in one WhatsApp integration</h2>
          <p style={{fontSize:16,color:'var(--text-2)',maxWidth:560,lineHeight:1.7}}>The complete WhatsApp Business API stack — from setup to automation to analytics.</p>
          <div className="wa-feat-grid">
            {FEATURES.map(f => (
              <div key={f.title} className="wa-feat-card reveal-up">
                <div className="wa-feat-ic"><svg viewBox="0 0 24 24"><path d={f.icon}/></svg></div>
                <h3>{f.title}</h3><p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="wa-usecases">
        <div className="wa-inner">
          <div className="sec-head center reveal-up" style={{marginBottom:0}}>
            <span className="eyebrow" style={{color:'var(--sec-orange-accent)'}}>Use Cases</span>
            <h2 style={{marginTop:10}}>Built for every industry</h2>
            <p>WhatsApp automation works for any business that communicates with customers.</p>
          </div>
          <div className="wa-uc-grid">
            {USE_CASES.map(uc => (
              <div key={uc.title} className="wa-uc-card reveal-up">
                <div className="wa-uc-ic"><svg viewBox="0 0 24 24"><path d={uc.icon}/></svg></div>
                <div><h4>{uc.title}</h4><p>{uc.body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="wa-process">
        <div className="wa-inner">
          <div className="sec-head center reveal-up" style={{marginBottom:0}}>
            <span className="eyebrow" style={{color:'#25D366'}}>Process</span>
            <h2 style={{marginTop:10}}>Live in 4 steps</h2>
            <p>LauncherDesk handles the entire setup — you just approve and go live.</p>
          </div>
          <div className="wa-steps">
            {[
              {n:'01',title:'Business Verification',body:'We submit your business details to Meta for WhatsApp Business Account verification.'},
              {n:'02',title:'API Setup',body:'Technical API integration with your systems — CRM, website, e-commerce platform or custom app.'},
              {n:'03',title:'Template Approval',body:'We draft and submit your message templates to Meta. Approval in 24–48 hours.'},
              {n:'04',title:'Go Live',body:'Full testing, team training and go-live. Your WhatsApp automation is ready to run.'},
            ].map(s => (
              <div key={s.n} className="wa-step reveal-up">
                <div className="wa-step-num">{s.n}</div>
                <h4>{s.title}</h4><p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="wa-pricing">
        <div className="wa-inner">
          <div className="sec-head center reveal-up" style={{marginBottom:0}}>
            <span className="eyebrow" style={{color:'var(--sec-amber-accent)'}}>Pricing</span>
            <h2 style={{marginTop:10}}>Transparent pricing</h2>
            <p>No hidden fees. Professional fee + Meta's conversation charges billed separately.</p>
          </div>
          <div className="wa-price-grid">
            {[
              { name:'Starter', price:'₹14,999', per:'/setup', desc:'Perfect for small businesses starting with WhatsApp automation.', items:['API setup & verification','5 message templates','Basic automation flow','Email & WhatsApp support'], featured:false },
              { name:'Business', price:'₹29,999', per:'/setup', desc:'Full-featured setup with CRM integration and multi-agent inbox.', items:['Everything in Starter','CRM integration (HubSpot/Zoho)','Multi-agent inbox setup','10 message templates','Advanced automation flows','Priority support'], featured:true },
              { name:'Enterprise', price:'Custom', per:'', desc:'For high-volume businesses needing custom integrations and dedicated support.', items:['Custom API integrations','Unlimited templates','Dedicated account manager','SLA-based support','Custom analytics dashboard'], featured:false },
            ].map(p => (
              <div key={p.name} className={`wa-price-card${p.featured?' featured':''} reveal-up`}>
                {p.featured && <span className="wa-price-badge">Most Popular</span>}
                <h3>{p.name}</h3>
                <div className="wa-price">{p.price}<span> {p.per}</span></div>
                <p>{p.desc}</p>
                <div className="wa-price-inc">
                  {p.items.map(i => (
                    <div key={i} className="wa-price-inc-item"><svg viewBox="0 0 24 24"><path d={CHECK}/></svg>{i}</div>
                  ))}
                </div>
                <a href="https://wa.me/918548854859?text=Hi, I'm interested in WhatsApp Business API - " className="wa-price-cta" target="_blank" rel="noopener noreferrer">Get Started →</a>
              </div>
            ))}
          </div>
          <p style={{textAlign:'center',fontSize:13,color:'var(--text-2)',marginTop:20}}>+ Meta's conversation charges (₹0.50–₹1 per conversation). + GST on professional fee.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="wa-faq">
        <div className="wa-inner">
          <div className="sec-head center reveal-up"><span className="eyebrow" style={{color:'var(--sec-sky-accent)'}}>FAQ</span><h2 style={{marginTop:10}}>Common questions</h2></div>
          <div className="wa-faq-list">{FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'88px 0',background:'#064E1A'}}>
        <div className="wa-inner">
          <div className="final reveal-up" style={{background:'transparent',color:'#fff'}}>
            <h2 style={{color:'#fff'}}>Ready to automate your business on WhatsApp?</h2>
            <p style={{color:'rgba(255,255,255,.75)'}}>Talk to our WhatsApp API experts — get a demo and custom quote within 24 hours.</p>
            <div className="row">
              <a href="https://wa.me/918548854859?text=Hi, I want to know more about WhatsApp Business API" className="wa-btn-primary" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}><path d={WA_PATH}/></svg>
                Chat on WhatsApp
              </a>
              <Link to="/company/contact" className="wa-btn-outline">Book a Free Demo</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}