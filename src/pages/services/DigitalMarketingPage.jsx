import { useState } from 'react'
import { Link } from 'react-router-dom'

const S = `
.dm-hero{background:linear-gradient(155deg,#04091A 0%,#0D1B6E 55%,#1A1070 100%);padding:clamp(64px,8vw,100px) 0 clamp(52px,6vw,80px);position:relative;overflow:hidden}
.dm-hero::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(900px 700px at 75% -5%,rgba(99,102,241,.22),transparent 60%)}
.dm-inner{max-width:1160px;margin:0 auto;padding:0 28px;position:relative;z-index:1}
.dm-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(99,102,241,.18);border:1px solid rgba(99,102,241,.35);border-radius:99px;padding:5px 14px;font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#818CF8;margin-bottom:20px}
.dm-hero h1{font-size:clamp(34px,4.8vw,62px);font-weight:900;color:#fff;letter-spacing:-.04em;line-height:1.04;margin-bottom:18px}
.dm-hero h1 span{background:linear-gradient(118deg,#818CF8,#A78BFA);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.dm-hero-desc{font-size:17px;color:#9ab5d4;line-height:1.7;max-width:540px;margin-bottom:32px}
.dm-hero-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:center}
.dm-cta-row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:28px}
.dm-btn-primary{display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 28px;background:linear-gradient(135deg,#6366F1,#8B5CF6);color:#fff;font-weight:700;font-size:15px;border-radius:10px;text-decoration:none;transition:all .15s;box-shadow:0 8px 24px rgba(99,102,241,.38);border:0;cursor:pointer;font-family:inherit}
.dm-btn-primary:hover{opacity:.9;transform:translateY(-2px)}
.dm-btn-outline{display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 24px;background:rgba(255,255,255,.08);color:#fff;font-weight:600;font-size:15px;border-radius:10px;border:1.5px solid rgba(255,255,255,.2);text-decoration:none;transition:all .15s}
.dm-btn-outline:hover{background:rgba(255,255,255,.14)}
.dm-badges{display:flex;flex-wrap:wrap;gap:10px}
.dm-badge{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:99px;padding:7px 14px;font-size:13px;font-weight:600;color:#9ab5d4}
.dm-badge svg{width:14px;height:14px;stroke:#818CF8;fill:none;stroke-width:2.5;flex:none}

.dm-stats-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:28px;backdrop-filter:blur(10px)}
.dm-stats-card h3{color:#fff;font-size:16px;font-weight:700;margin-bottom:20px}
.dm-stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
.dm-stat-box{background:rgba(255,255,255,.08);border-radius:12px;padding:16px;text-align:center}
.dm-stat-box .n{font-size:26px;font-weight:900;color:#818CF8;line-height:1}
.dm-stat-box .l{font-size:11px;color:#9ab5d4;margin-top:4px;text-transform:uppercase;letter-spacing:.06em}

.dm-services{padding:88px 0;background:var(--sec-teal-bg)}
.dm-serv-cats{display:grid;grid-template-columns:repeat(2,1fr);gap:28px;margin-top:48px}
.dm-cat-card{background:#fff;border-radius:22px;padding:30px;border:1.5px solid var(--sec-teal-border);transition:transform .2s,box-shadow .2s}
.dm-cat-card:hover{transform:translateY(-5px);box-shadow:0 18px 44px rgba(20,184,166,.13)}
.dm-cat-head{display:flex;align-items:center;gap:14px;margin-bottom:20px}
.dm-cat-ic{width:54px;height:54px;border-radius:14px;background:#CCFBF1;display:grid;place-items:center;flex:none}
.dm-cat-ic svg{width:26px;height:26px;stroke:#0D9488;fill:none;stroke-width:2}
.dm-cat-card h3{font-size:18px;font-weight:800;color:var(--navy)}
.dm-cat-card p{font-size:14px;color:var(--text-2);line-height:1.65;margin-bottom:16px}
.dm-cat-items{display:flex;flex-direction:column;gap:8px}
.dm-cat-item{display:flex;align-items:center;gap:9px;font-size:13.5px;font-weight:600;color:var(--navy)}
.dm-cat-item svg{width:14px;height:14px;stroke:#0D9488;fill:none;stroke-width:2.5;flex:none}

.dm-why{padding:88px 0;background:var(--sec-purple-bg)}
.dm-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px}
.dm-why-card{background:#fff;border-radius:18px;padding:28px;border:1.5px solid var(--sec-purple-border);transition:transform .2s,box-shadow .2s}
.dm-why-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(139,92,246,.1)}
.dm-why-ic{width:50px;height:50px;border-radius:13px;background:#EDE9FE;display:grid;place-items:center;margin-bottom:16px}
.dm-why-ic svg{width:22px;height:22px;stroke:#7C3AED;fill:none;stroke-width:2}
.dm-why-card h4{font-size:16px;font-weight:800;color:var(--navy);margin-bottom:8px}
.dm-why-card p{font-size:14px;color:var(--text-2);line-height:1.65}

.dm-process{padding:88px 0;background:var(--sec-orange-bg)}
.dm-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:48px;position:relative}
.dm-steps::before{content:'';position:absolute;top:30px;left:48px;right:48px;height:2px;background:linear-gradient(90deg,#F97316,#FB923C);z-index:0}
.dm-step{text-align:center;position:relative;z-index:1}
.dm-step-num{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#F97316,#FB923C);color:#fff;font-size:18px;font-weight:900;display:grid;place-items:center;margin:0 auto 16px;box-shadow:0 8px 24px rgba(249,115,22,.3)}
.dm-step h4{font-size:14.5px;font-weight:700;color:var(--navy);margin-bottom:8px}
.dm-step p{font-size:13px;color:var(--text-2);line-height:1.6}

.dm-packages{padding:88px 0;background:var(--sec-amber-bg)}
.dm-pkg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px}
.dm-pkg-card{background:#fff;border-radius:20px;padding:28px;border:1.5px solid var(--sec-amber-border);position:relative;transition:transform .2s,box-shadow .2s}
.dm-pkg-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(217,119,6,.1)}
.dm-pkg-card.featured{border-color:#6366F1;box-shadow:0 0 0 2px rgba(99,102,241,.2)}
.dm-pkg-badge{position:absolute;top:16px;right:16px;background:linear-gradient(135deg,#6366F1,#8B5CF6);color:#fff;font-size:10px;font-weight:700;padding:3px 10px;border-radius:99px}
.dm-pkg-card h3{font-size:19px;font-weight:800;color:var(--navy);margin-bottom:6px}
.dm-pkg-price{font-size:28px;font-weight:900;color:#6366F1;margin-bottom:4px}
.dm-pkg-price span{font-size:14px;font-weight:500;color:var(--text-2)}
.dm-pkg-card > p{font-size:13.5px;color:var(--text-2);margin-bottom:20px;line-height:1.6}
.dm-pkg-inc{display:flex;flex-direction:column;gap:8px;margin-bottom:24px}
.dm-pkg-inc-item{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--navy)}
.dm-pkg-inc-item svg{width:14px;height:14px;stroke:#6366F1;fill:none;stroke-width:2.5;flex:none}
.dm-pkg-cta{display:block;text-align:center;padding:12px;background:linear-gradient(135deg,#6366F1,#8B5CF6);color:#fff;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;transition:opacity .15s}
.dm-pkg-cta:hover{opacity:.9}

.dm-faq{padding:88px 0;background:var(--sec-sky-bg)}
.dm-faq-list{max-width:720px;margin:48px auto 0}
.dm-faq-item{border-bottom:1px solid var(--sec-sky-border)}
.dm-faq-q{width:100%;padding:20px 0;cursor:pointer;background:none;border:0;text-align:left;font-family:var(--font);font-size:16px;font-weight:600;color:var(--navy);display:flex;justify-content:space-between;align-items:center;gap:16px}
.dm-faq-q svg{width:20px;height:20px;stroke:var(--sec-sky-accent);fill:none;stroke-width:2.5;flex:none;transition:transform .25s}
.dm-faq-q.open svg{transform:rotate(45deg)}
.dm-faq-a{font-size:14.5px;color:var(--text-2);line-height:1.7;overflow:hidden;max-height:0;transition:max-height .35s}
.dm-faq-a-in{padding-bottom:20px}

@media(max-width:900px){.dm-hero-grid{grid-template-columns:1fr}.dm-serv-cats{grid-template-columns:1fr}.dm-why-grid{grid-template-columns:1fr 1fr}.dm-steps{grid-template-columns:1fr 1fr}.dm-steps::before{display:none}.dm-pkg-grid{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.dm-why-grid,.dm-pkg-grid,.dm-steps{grid-template-columns:1fr}}
`

const CHECK = 'M20 6 9 17l-5-5'
const PLUS  = 'M12 5v14M5 12h14'

const SERVICES = [
  {
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'AI-Powered SEO',
    desc: 'Rank higher on Google and get found by AI-driven search engines (ChatGPT, Perplexity, Gemini). We build authority, not just backlinks.',
    items: ['AI Search Optimization (AEO)', 'LLM Visibility & Citations', 'Technical SEO Audits', 'Content Strategy & Creation', 'Local & International SEO'],
  },
  {
    icon: 'M3 3v18h18M7 14l4-4 3 3 5-6',
    title: 'Lead Generation & Paid Ads',
    desc: 'Performance-driven campaigns that bring qualified leads and measurable ROI — not just impressions.',
    items: ['Google Ads Management', 'Meta & Instagram Ads', 'LinkedIn B2B Campaigns', 'YouTube Advertising', 'Remarketing & Retargeting'],
  },
  {
    icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1M15 3H7a2 2 0 00-2 2v6a2 2 0 002 2h8l4 4V5a2 2 0 00-2-2z',
    title: 'Social Media Marketing',
    desc: 'Build a following that converts. Strategy, content creation, community management and paid social — all in one place.',
    items: ['Social Media Strategy & Audit', 'Content Calendar & Posting', 'Community Management', 'Ad Creative Design', 'Reels & Short-Form Video'],
  },
  {
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    title: 'Design & Branding',
    desc: 'Visual identity that positions your business professionally — from logo to every touchpoint customers see.',
    items: ['Brand Identity Design', 'Logo & Visual Identity', 'Marketing Collaterals', 'Packaging Design', 'Social Media Design'],
  },
]

const WHY = [
  { icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title:'Results-First Approach', body:'Every campaign is tied to a measurable KPI — leads, sales, or brand growth. No vanity metrics.' },
  { icon:'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', title:'AI-Powered Strategies', body:'We integrate AI tools for keyword research, content creation, ad optimization and audience targeting.' },
  { icon:'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', title:'Transparent Reporting', body:'Monthly reports with plain-language insights — exactly what is working, what is not, and what is next.' },
  { icon:'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title:'Dedicated Account Manager', body:'One point of contact who knows your business, your goals and your campaigns inside out.' },
  { icon:'M13 10V3L4 14h7v7l9-11h-7z', title:'Fast Execution', body:'Campaigns live in days, not weeks. We move quickly and optimize in real-time as data comes in.' },
  { icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Full-Funnel Coverage', body:'From awareness to conversion to retention — we cover every stage of the customer journey.' },
]

const FAQS = [
  { q:'How long before I see results from digital marketing?', a:'SEO typically shows meaningful results in 3–6 months as authority builds. Paid ads (Google, Meta) deliver traffic from day one. Social media growth varies by industry, but consistent posting shows traction within 4–8 weeks.' },
  { q:'Do you work with small businesses and startups?', a:'Yes. Our packages are designed for startups and growing businesses. We scale effort and spend to match your budget, not the other way around.' },
  { q:'Can I choose only specific services?', a:'Absolutely. You can start with one channel — say, just SEO or just Google Ads — and expand over time. We do not lock you into bundles you do not need.' },
  { q:'How are campaigns reported?', a:'You get a monthly performance report covering key metrics, what changed and what is planned next. We also share weekly quick updates for paid ad campaigns so you always know where your budget is going.' },
  { q:'Will you create content for us?', a:'Yes. Our team handles copywriting, graphic design, video scripts and ad creatives. You approve everything before it goes live.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="dm-faq-item">
      <button className={`dm-faq-q${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
        {q}<svg viewBox="0 0 24 24"><path d={PLUS} /></svg>
      </button>
      <div className="dm-faq-a" style={{ maxHeight: open ? 300 : 0 }}>
        <div className="dm-faq-a-in">{a}</div>
      </div>
    </div>
  )
}

export default function DigitalMarketingPage() {
  return (
    <>
      <style>{S}</style>

      {/* HERO */}
      <section className="dm-hero">
        <div className="dm-inner">
          <div className="dm-hero-grid">
            <div className="reveal-up in">
              <nav style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                <Link to="/" style={{ color: '#9ab5d4', fontSize: 13, textDecoration: 'none' }}>Home</Link>
                <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="#9ab5d4" strokeWidth={2}><path d="m9 18 6-6-6-6" /></svg>
                <Link to="/services" style={{ color: '#9ab5d4', fontSize: 13, textDecoration: 'none' }}>Services</Link>
                <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="#9ab5d4" strokeWidth={2}><path d="m9 18 6-6-6-6" /></svg>
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>Digital Marketing</span>
              </nav>
              <div className="dm-eyebrow">
                <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 3v18h18M7 14l4-4 3 3 5-6" /></svg>
                Digital Marketing
              </div>
              <h1>Grow your business with <span>data-driven marketing.</span></h1>
              <p className="dm-hero-desc">SEO, paid ads, social media, branding and more — all under one roof. LauncherDesk builds campaigns that bring qualified traffic and convert it into real revenue.</p>
              <div className="dm-cta-row">
                <Link to="/company/contact" className="dm-btn-primary">
                  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Get a Free Strategy Call
                </Link>
                <a href="https://wa.me/918548854859?text=Hi, I'm interested in Digital Marketing services from LauncherDesk" className="dm-btn-outline" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </div>
              <div className="dm-badges">
                {['AI-Powered SEO', 'Google & Meta Ads', 'Social Media', 'Branding & Design'].map(b => (
                  <div key={b} className="dm-badge"><svg viewBox="0 0 24 24"><path d={CHECK} /></svg>{b}</div>
                ))}
              </div>
            </div>
            <div className="reveal-up in">
              <div className="dm-stats-card">
                <h3>Digital marketing at a glance</h3>
                <div className="dm-stat-grid">
                  {[['5x', 'Avg. ROI on Paid Ads'], ['3.5x', 'More Leads via SEO'], ['68%', 'Businesses use Social'], ['92%', 'Online before buying']].map(([n, l]) => (
                    <div key={l} className="dm-stat-box"><div className="n">{n}</div><div className="l">{l}</div></div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(99,102,241,.12)', border: '1px solid rgba(99,102,241,.25)', borderRadius: 10, padding: '12px 16px' }}>
                  <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="#818CF8" strokeWidth={2}><path d={CHECK} /></svg>
                  <div>
                    <b style={{ display: 'block', color: '#fff', fontSize: 14, fontWeight: 700 }}>Fully managed by LauncherDesk</b>
                    <span style={{ fontSize: 13, color: '#9ab5d4' }}>Strategy · Execution · Reporting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="dm-services">
        <div className="dm-inner">
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--sec-teal-accent)', display: 'block', marginBottom: 14 }}>What We Do</span>
          <h2 style={{ fontSize: 'clamp(26px,3.6vw,44px)', fontWeight: 900, letterSpacing: '-.04em', color: 'var(--navy)', marginBottom: 8 }}>All digital marketing channels, one team</h2>
          <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 580, lineHeight: 1.7 }}>From search to social to brand — LauncherDesk covers every channel that brings customers to your door.</p>
          <div className="dm-serv-cats">
            {SERVICES.map(s => (
              <div key={s.title} className="dm-cat-card reveal-up">
                <div className="dm-cat-head">
                  <div className="dm-cat-ic"><svg viewBox="0 0 24 24"><path d={s.icon} /></svg></div>
                  <h3>{s.title}</h3>
                </div>
                <p>{s.desc}</p>
                <div className="dm-cat-items">
                  {s.items.map(item => (
                    <div key={item} className="dm-cat-item">
                      <svg viewBox="0 0 24 24"><path d={CHECK} /></svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="dm-why">
        <div className="dm-inner">
          <div className="sec-head center reveal-up" style={{ marginBottom: 0 }}>
            <span className="eyebrow" style={{ color: 'var(--sec-purple-accent)' }}>Why LauncherDesk</span>
            <h2 style={{ marginTop: 10 }}>Marketing that earns its keep</h2>
            <p>We are accountable to outcomes — not hours spent or posts published.</p>
          </div>
          <div className="dm-why-grid">
            {WHY.map(w => (
              <div key={w.title} className="dm-why-card reveal-up">
                <div className="dm-why-ic"><svg viewBox="0 0 24 24"><path d={w.icon} /></svg></div>
                <h4>{w.title}</h4>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="dm-process">
        <div className="dm-inner">
          <div className="sec-head center reveal-up" style={{ marginBottom: 0 }}>
            <span className="eyebrow" style={{ color: 'var(--sec-orange-accent)' }}>How It Works</span>
            <h2 style={{ marginTop: 10 }}>From brief to live campaign in 4 steps</h2>
            <p>A clear process so you always know where things stand.</p>
          </div>
          <div className="dm-steps">
            {[
              { n: '01', title: 'Discovery & Audit', body: 'We audit your current presence, competitors and market to find the highest-impact opportunities.' },
              { n: '02', title: 'Strategy & Planning', body: 'A tailored marketing plan covering channels, budget allocation, content and KPIs — approved by you.' },
              { n: '03', title: 'Launch & Execute', body: 'Campaigns go live. Content is created, ads are set up and SEO work starts in parallel.' },
              { n: '04', title: 'Optimize & Report', body: 'We track, test and improve every week. Monthly reports keep you in the loop.' },
            ].map(s => (
              <div key={s.n} className="dm-step reveal-up">
                <div className="dm-step-num">{s.n}</div>
                <h4>{s.title}</h4><p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="dm-packages">
        <div className="dm-inner">
          <div className="sec-head center reveal-up" style={{ marginBottom: 0 }}>
            <span className="eyebrow" style={{ color: 'var(--sec-amber-accent)' }}>Packages</span>
            <h2 style={{ marginTop: 10 }}>Plans for every growth stage</h2>
            <p>Start with the right plan. Scale as your business grows.</p>
          </div>
          <div className="dm-pkg-grid">
            {[
              {
                name: 'Starter', price: '₹14,999', per: '/month', featured: false,
                desc: 'For businesses just getting started with digital marketing.',
                items: ['SEO Audit & On-Page Fixes', '2 Social Platforms Managed', '8 Posts Per Month', 'Monthly Performance Report', 'Email Support'],
              },
              {
                name: 'Growth', price: '₹29,999', per: '/month', featured: true,
                desc: 'Full-funnel marketing for businesses ready to scale leads and revenue.',
                items: ['Everything in Starter', 'Google Ads Management (up to ₹50k spend)', 'Meta Ads Campaign', '16 Posts + 4 Reels / Month', 'Content & Ad Creatives', 'Bi-weekly Strategy Calls'],
              },
              {
                name: 'Pro', price: 'Custom', per: '', featured: false,
                desc: 'Enterprise-grade marketing for high-growth companies with aggressive targets.',
                items: ['Everything in Growth', 'Dedicated Account Manager', 'LinkedIn B2B Campaigns', 'Full Brand & Design Support', 'Custom Analytics Dashboard', 'Priority SLA'],
              },
            ].map(p => (
              <div key={p.name} className={`dm-pkg-card${p.featured ? ' featured' : ''} reveal-up`}>
                {p.featured && <span className="dm-pkg-badge">Most Popular</span>}
                <h3>{p.name}</h3>
                <div className="dm-pkg-price">{p.price}<span> {p.per}</span></div>
                <p>{p.desc}</p>
                <div className="dm-pkg-inc">
                  {p.items.map(i => (
                    <div key={i} className="dm-pkg-inc-item">
                      <svg viewBox="0 0 24 24"><path d={CHECK} /></svg>{i}
                    </div>
                  ))}
                </div>
                <Link to="/company/contact" className="dm-pkg-cta">Get Started →</Link>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-2)', marginTop: 20 }}>+ GST applicable. Ad spend billed separately. Custom plans available on request.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="dm-faq">
        <div className="dm-inner">
          <div className="sec-head center reveal-up">
            <span className="eyebrow" style={{ color: 'var(--sec-sky-accent)' }}>FAQ</span>
            <h2 style={{ marginTop: 10 }}>Common questions</h2>
          </div>
          <div className="dm-faq-list">
            {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '88px 0', background: 'linear-gradient(155deg,#04091A 0%,#0D1B6E 60%,#1A1070 100%)' }}>
        <div className="dm-inner">
          <div className="final reveal-up" style={{ background: 'transparent', color: '#fff' }}>
            <h2 style={{ color: '#fff' }}>Ready to grow your business online?</h2>
            <p style={{ color: 'rgba(255,255,255,.75)' }}>Book a free 30-minute strategy call with our marketing team — no commitment, just a clear plan.</p>
            <div className="row">
              <Link to="/company/contact" className="dm-btn-primary">Book a Free Strategy Call</Link>
              <a href="https://wa.me/918548854859?text=Hi, I want to know more about Digital Marketing from LauncherDesk" className="dm-btn-outline" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}