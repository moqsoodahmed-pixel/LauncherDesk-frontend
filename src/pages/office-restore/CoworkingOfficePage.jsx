import { useState } from 'react'

const imgChair         = '/product-ergonomic-chair.jpg'
const imgNormalTable   = '/product-normal-table.jpg'
const imgElectricTable = '/product-electric-table.jpg'

const S = `
/* ── HERO ── */
.cw-hero {
  background: linear-gradient(160deg, #080F1E 0%, #0A1F3C 55%, #0D2B52 100%);
  padding: clamp(64px,8vw,100px) 0 clamp(52px,6vw,80px);
  position: relative; overflow: hidden;
}
.cw-hero::before {
  content:'';position:absolute;inset:0;pointer-events:none;
  background: radial-gradient(800px 600px at 70% -10%,rgba(5,150,105,.2),transparent 60%),
              radial-gradient(400px 400px at 5% 100%,rgba(6,78,59,.2),transparent 60%);
}
.cw-inner { max-width:1160px;margin:0 auto;padding:0 28px;position:relative;z-index:1; }
.cw-eyebrow {
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(5,150,105,.15);border:1px solid rgba(5,150,105,.3);
  border-radius:99px;padding:5px 14px;
  font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:#34d399;margin-bottom:20px;
}
.cw-hero h1 {
  font-size:clamp(34px,4.8vw,60px);font-weight:900;color:#fff;
  letter-spacing:-.04em;line-height:1.04;margin-bottom:18px;
}
.cw-hero h1 span {
  background:linear-gradient(118deg,#34d399,#059669);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
}
.cw-hero-desc { font-size:17px;color:#9ab5d4;line-height:1.7;max-width:500px;margin-bottom:32px; }
.cw-hero-grid { display:grid;grid-template-columns:1.1fr .9fr;gap:64px;align-items:center; }
.cw-cta-row { display:flex;gap:12px;flex-wrap:wrap; }
.cw-btn-primary {
  display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 28px;
  background:#059669;color:#fff;font-weight:700;font-size:15px;border-radius:10px;
  text-decoration:none;transition:all .15s;box-shadow:0 8px 24px rgba(5,150,105,.35);border:0;cursor:pointer;font-family:inherit;
}
.cw-btn-primary:hover { background:#047857;transform:translateY(-2px); }
.cw-btn-outline {
  display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 24px;
  background:rgba(255,255,255,.08);color:#fff;font-weight:600;font-size:15px;border-radius:10px;
  border:1.5px solid rgba(255,255,255,.2);text-decoration:none;transition:all .15s;
}
.cw-btn-outline:hover { background:rgba(255,255,255,.14); }

/* Hero stats card */
.cw-hero-stats {
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  border-radius:20px;padding:28px;backdrop-filter:blur(10px);
}
.cw-hero-stats h3 { color:#fff;font-size:16px;font-weight:700;margin-bottom:20px; }
.cw-stat-grid { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
.cw-stat-box { background:rgba(255,255,255,.07);border-radius:12px;padding:18px;text-align:center; }
.cw-stat-box .n { font-size:26px;font-weight:900;color:#fff;line-height:1; }
.cw-stat-box .l { font-size:11px;color:#6da8e0;margin-top:4px;text-transform:uppercase;letter-spacing:.06em; }
.cw-chips { display:flex;flex-wrap:wrap;gap:8px;margin-top:18px; }
.cw-chip {
  font-size:11.5px;font-weight:600;padding:5px 12px;border-radius:99px;
  background:rgba(5,150,105,.15);color:#34d399;border:1px solid rgba(5,150,105,.25);
}

/* ── BUNDLES ── */
.cw-bundles { padding:88px 0;background:var(--sec-teal-bg); }
.cw-sec-label { font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--sec-teal-accent);margin-bottom:14px;display:block; }
.cw-sec-h2 { font-size:clamp(26px,3.6vw,44px);font-weight:900;letter-spacing:-.04em;color:var(--navy);margin-bottom:8px; }
.cw-sec-p { font-size:16px;color:var(--text-2);max-width:560px;line-height:1.7;margin-bottom:52px; }
.cw-bundle-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
.cw-bundle-card {
  background:#fff;border-radius:20px;overflow:hidden;
  border:1.5px solid var(--sec-teal-border);
  transition:transform .2s,box-shadow .2s;
}
.cw-bundle-card:hover { transform:translateY(-6px);box-shadow:0 16px 40px rgba(5,150,105,.14); }
.cw-bundle-img { height:200px;overflow:hidden;position:relative; }
.cw-bundle-img img { width:100%;height:100%;object-fit:cover;transition:transform .4s; }
.cw-bundle-card:hover .cw-bundle-img img { transform:scale(1.06); }
.cw-bundle-badge {
  position:absolute;top:14px;left:14px;
  background:var(--sec-teal-accent);color:#fff;
  font-size:10.5px;font-weight:700;padding:4px 10px;border-radius:99px;
}
.cw-bundle-seats {
  position:absolute;top:14px;right:14px;
  background:rgba(0,0,0,.55);color:#fff;
  font-size:10.5px;font-weight:700;padding:4px 10px;border-radius:99px;backdrop-filter:blur(6px);
}
.cw-bundle-body { padding:24px; }
.cw-bundle-body h3 { font-size:17px;font-weight:800;color:var(--navy);margin-bottom:8px; }
.cw-bundle-body p { font-size:13.5px;color:var(--text-2);line-height:1.6;margin-bottom:16px; }
.cw-bundle-items { display:flex;flex-direction:column;gap:6px;margin-bottom:20px; }
.cw-bundle-item { display:flex;align-items:center;gap:8px;font-size:13px;color:var(--navy); }
.cw-bundle-item svg { width:14px;height:14px;stroke:var(--sec-teal-accent);fill:none;stroke-width:2.5;flex:none; }
.cw-bundle-cta {
  display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:700;
  color:var(--sec-teal-accent);text-decoration:none;
}
.cw-bundle-cta svg { width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2.5; }

/* ── FEATURES ── */
.cw-features { padding:88px 0;background:var(--sec-purple-bg); }
.cw-feat-grid { display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;margin-top:48px; }
.cw-feat-list { display:flex;flex-direction:column;gap:20px; }
.cw-feat-item { display:flex;gap:16px;align-items:flex-start; }
.cw-feat-ic { width:44px;height:44px;border-radius:12px;background:var(--sec-purple-light);display:grid;place-items:center;flex:none; }
.cw-feat-ic svg { width:20px;height:20px;stroke:var(--sec-purple-accent);fill:none;stroke-width:2; }
.cw-feat-txt h4 { font-size:15px;font-weight:700;color:var(--navy);margin-bottom:5px; }
.cw-feat-txt p { font-size:13.5px;color:var(--text-2);line-height:1.6; }
.cw-feat-visual {
  background:linear-gradient(160deg,#0D1F3C,#080F1E);
  border-radius:20px;padding:32px;color:#fff;
}
.cw-feat-visual h3 { font-size:18px;font-weight:700;margin-bottom:20px; }
.cw-space-types { display:flex;flex-direction:column;gap:12px; }
.cw-space-type {
  display:flex;align-items:center;gap:14px;padding:14px 16px;
  background:rgba(255,255,255,.06);border-radius:12px;border:1px solid rgba(255,255,255,.08);
}
.cw-space-type-ic { width:36px;height:36px;border-radius:8px;background:rgba(5,150,105,.2);display:grid;place-items:center;flex:none; }
.cw-space-type-ic svg { width:16px;height:16px;stroke:#34d399;fill:none;stroke-width:2; }
.cw-space-type b { display:block;font-size:13.5px;color:#fff;margin-bottom:2px; }
.cw-space-type span { font-size:12px;color:#9ab5d4; }

/* ── PROCESS ── */
.cw-process { padding:88px 0;background:var(--sec-amber-bg); }
.cw-process-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:48px; }
.cw-proc-card {
  background:#fff;border-radius:16px;padding:24px;
  border:1.5px solid var(--sec-amber-border);text-align:center;
}
.cw-proc-num { width:48px;height:48px;border-radius:50%;background:var(--sec-amber-light);color:var(--sec-amber-accent);font-weight:900;font-size:18px;display:grid;place-items:center;margin:0 auto 16px; }
.cw-proc-card h4 { font-size:14px;font-weight:700;color:var(--navy);margin-bottom:8px; }
.cw-proc-card p { font-size:13px;color:var(--text-2);line-height:1.6; }

/* ── FAQ ── */
.cw-faq { padding:88px 0;background:var(--sec-sky-bg); }
.cw-faq-list { max-width:720px;margin:48px auto 0;display:flex;flex-direction:column;gap:0; }
.cw-faq-item { border-bottom:1px solid var(--sec-sky-border); }
.cw-faq-q {
  width:100%;padding:20px 0;cursor:pointer;background:none;border:0;text-align:left;
  font-family:var(--font);font-size:16px;font-weight:600;color:var(--navy);
  display:flex;justify-content:space-between;align-items:center;gap:16px;
}
.cw-faq-q svg { width:20px;height:20px;stroke:var(--sec-sky-accent);fill:none;stroke-width:2.5;flex:none;transition:transform .25s; }
.cw-faq-q.open svg { transform:rotate(45deg); }
.cw-faq-a { font-size:14.5px;color:var(--text-2);line-height:1.7;overflow:hidden;max-height:0;transition:max-height .35s; }
.cw-faq-a-inner { padding-bottom:20px; }

/* ── CTA ── */
.cw-cta-sec { padding:88px 0;background:var(--sec-orange-bg); }

@media(max-width:900px){
  .cw-hero-grid,.cw-bundle-grid,.cw-process-grid{ grid-template-columns:1fr 1fr }
  .cw-feat-grid{ grid-template-columns:1fr }
}
@media(max-width:600px){
  .cw-bundle-grid,.cw-process-grid{ grid-template-columns:1fr }
  .cw-hero-grid{ grid-template-columns:1fr }
}
`

const CHECK = 'M20 6 9 17l-5-5'
const ARROW = 'M5 12h14M12 5l7 7-7 7'
const PLUS  = 'M12 5v14M5 12h14'

const BUNDLES = [
  {
    label: 'Hot Desk Setup', seats: '1–4 seats',
    imgKey: 'normal',
    title: 'Hot Desk Workstation Bundle',
    desc: 'Compact, flexible desks for hot-desking environments. Easy to reconfigure as your team grows.',
    items: ['Standard workstation tables', 'Ergonomic mesh chairs', 'Cable management', 'Modular & reconfigurable'],
  },
  {
    label: 'Team Pods', seats: '4–12 seats',
    imgKey: 'chair',
    title: 'Collaborative Team Pod Setup',
    desc: 'Pod-style seating clusters that encourage collaboration while maintaining individual focus areas.',
    items: ['Cluster desk configurations', 'High-back ergonomic chairs', 'Shared storage units', 'Glass privacy panels'],
  },
  {
    label: 'Premium Co-work', seats: '12+ seats',
    imgKey: 'electric',
    title: 'Premium Co-working Full Setup',
    desc: 'Full co-working space furniture — from reception to workstations to meeting zones. Complete in one order.',
    items: ['Standing & sitting desks', 'Reception furniture', 'Meeting room tables', 'Lounge & breakout seating'],
  },
]

const FEATURES = [
  { icon:'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z', title:'Flexible Configurations', body:'Hot desks, pod clusters, open benching — we design and build for any co-working layout.' },
  { icon:'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', title:'Scalable as You Grow', body:'Start with 5 seats and expand to 50. Modular furniture that grows with your membership.' },
  { icon:'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title:'Durable for High-Use', body:'Co-working gets heavy use. We use commercial-grade materials rated for multi-shift daily use.' },
  { icon:'M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z', title:'Brand-Matched Finishes', body:'Match your co-working brand identity — custom laminate colours, fabric tones and frame finishes.' },
]

const SPACE_TYPES = [
  { icon:'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2', label:'Hot Desking', sub:'Flexible open seating for drop-in members' },
  { icon:'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8z', label:'Team Pods', sub:'Collaborative clusters for dedicated teams' },
  { icon:'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z', label:'Private Cabins', sub:'Enclosed offices for focused work' },
  { icon:'M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z', label:'Meeting Rooms', sub:'Conference tables and boardroom setups' },
]

const FAQS = [
  { q:'Do you handle full co-working space fit-outs?', a:'Yes — from reception to workstations to meeting rooms. We manage the entire furniture procurement and installation for co-working spaces of any size.' },
  { q:'What is the minimum order for a co-working setup?', a:'There is no strict minimum. We work with spaces from 5 seats to 200+ seats. Contact us with your seat count and we will provide a full proposal.' },
  { q:'Can you match our brand colours and identity?', a:'Absolutely. We offer custom laminate finishes, fabric colour options and powder-coat shades so your furniture matches your brand perfectly.' },
  { q:'How long does a full co-working fit-out take?', a:'Typically 3–6 weeks from design sign-off to installation, depending on size and customisation. We provide a detailed timeline at the proposal stage.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="cw-faq-item">
      <button className={`cw-faq-q${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
        {q}
        <svg viewBox="0 0 24 24"><path d={PLUS}/></svg>
      </button>
      <div className="cw-faq-a" style={{ maxHeight: open ? 200 : 0 }}>
        <div className="cw-faq-a-inner">{a}</div>
      </div>
    </div>
  )
}

export default function CoworkingOfficePage() {
  return (
    <>
      <style>{S}</style>

      {/* HERO */}
      <section className="cw-hero">
        <div className="cw-inner">
          <div className="cw-hero-grid">
            <div className="reveal-up in">
              <div className="cw-eyebrow">Office Setup · Co-working Space</div>
              <h1>Furniture for <span>shared spaces.</span></h1>
              <p className="cw-hero-desc">Hot desks, team pods, meeting rooms and reception — complete co-working space furniture designed, manufactured and installed across India.</p>
              <div className="cw-cta-row">
                <a href="#bundles" className="cw-btn-primary">
                  View Bundles
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}><path d={ARROW}/></svg>
                </a>
                <a href="/office-restore#planner" className="cw-btn-outline">Get a Free Quote</a>
              </div>
            </div>
            <div className="reveal-up in">
              <div className="cw-hero-stats">
                <h3>LauncherDesk Co-working Stats</h3>
                <div className="cw-stat-grid">
                  {[['15+','Projects Done'],['20+','States Covered'],['Free','Layout Design'],['100%','Custom Built']].map(([n,l]) => (
                    <div key={l} className="cw-stat-box"><div className="n">{n}</div><div className="l">{l}</div></div>
                  ))}
                </div>
                <div className="cw-chips">
                  {['Hot Desks','Team Pods','Meeting Rooms','Reception','Lounge Areas'].map(c => (
                    <span key={c} className="cw-chip">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUNDLES */}
      <section className="cw-bundles" id="bundles">
        <div className="cw-inner">
          <span className="cw-sec-label">Furniture Bundles</span>
          <h2 className="cw-sec-h2">Co-working space packages</h2>
          <p className="cw-sec-p">Pre-designed bundles for different co-working setups — all fully customisable to your space and brand.</p>
          <div className="cw-bundle-grid">
            {BUNDLES.map(b => {
              const img = b.imgKey === 'chair' ? imgChair : b.imgKey === 'normal' ? imgNormalTable : imgElectricTable
              return (
                <div key={b.title} className="cw-bundle-card reveal-up">
                  <div className="cw-bundle-img">
                    <img src={img} alt={b.title} />
                    <span className="cw-bundle-badge">{b.label}</span>
                    <span className="cw-bundle-seats">{b.seats}</span>
                  </div>
                  <div className="cw-bundle-body">
                    <h3>{b.title}</h3>
                    <p>{b.desc}</p>
                    <div className="cw-bundle-items">
                      {b.items.map(item => (
                        <div key={item} className="cw-bundle-item">
                          <svg viewBox="0 0 24 24"><path d={CHECK}/></svg>{item}
                        </div>
                      ))}
                    </div>
                    <a href="/office-restore#planner" className="cw-bundle-cta">
                      Get a quote <svg viewBox="0 0 24 24"><path d={ARROW}/></svg>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="cw-features">
        <div className="cw-inner">
          <span className="cw-sec-label" style={{color:'var(--sec-purple-accent)'}}>Why LauncherDesk</span>
          <h2 className="cw-sec-h2" style={{marginBottom:0}}>Built for co-working scale</h2>
          <div className="cw-feat-grid">
            <div className="cw-feat-list">
              {FEATURES.map(f => (
                <div key={f.title} className="cw-feat-item reveal-up">
                  <div className="cw-feat-ic">
                    <svg viewBox="0 0 24 24"><path d={f.icon}/></svg>
                  </div>
                  <div className="cw-feat-txt">
                    <h4>{f.title}</h4>
                    <p>{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="cw-feat-visual reveal-up">
              <h3>Space types we furnish</h3>
              <div className="cw-space-types">
                {SPACE_TYPES.map(st => (
                  <div key={st.label} className="cw-space-type">
                    <div className="cw-space-type-ic">
                      <svg viewBox="0 0 24 24"><path d={st.icon}/></svg>
                    </div>
                    <div><b>{st.label}</b><span>{st.sub}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="cw-process">
        <div className="cw-inner">
          <div className="sec-head center reveal-up" style={{marginBottom:0}}>
            <span className="eyebrow" style={{color:'var(--sec-amber-accent)'}}>Process</span>
            <h2 style={{marginTop:10}}>How we deliver your co-working setup</h2>
          </div>
          <div className="cw-process-grid">
            {[
              { n:'01', title:'Inquiry & Site Details', body:'Share your floor plan, seat count and layout preferences. We review and respond within 24 hours.' },
              { n:'02', title:'Free Layout Design', body:'Our team creates a custom co-working layout — multiple options, free of charge, before any commitment.' },
              { n:'03', title:'Customise & Confirm', body:'Pick finishes, colours and configurations. We send a detailed quote. Manufacturing starts on sign-off.' },
              { n:'04', title:'Install & Hand Over', body:'Full delivery, assembly, cable management and site cleanup. Your co-working space is ready to open.' },
            ].map(s => (
              <div key={s.n} className="cw-proc-card reveal-up">
                <div className="cw-proc-num">{s.n}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="cw-faq">
        <div className="cw-inner">
          <div className="sec-head center reveal-up">
            <span className="eyebrow" style={{color:'var(--sec-sky-accent)'}}>FAQ</span>
            <h2 style={{marginTop:10}}>Common questions</h2>
          </div>
          <div className="cw-faq-list">
            {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cw-cta-sec">
        <div className="cw-inner">
          <div className="final reveal-up">
            <h2>Ready to furnish your co-working space?</h2>
            <p>Get a free layout plan and full quote — no commitment required.</p>
            <div className="row">
              <a href="/office-restore#planner" className="btn btn-light">Get Free Layout & Quote</a>
              <a href="/company/contact" className="btn btn-ghost-d">Talk to an Expert</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}