import { useState } from 'react'

const imgChair         = '/product-ergonomic-chair.jpg'
const imgNormalTable   = '/product-normal-table.jpg'
const imgElectricTable = '/product-electric-table.jpg'

const S = `
/* ── HERO ── */
.io-hero {
  background: linear-gradient(160deg, #080F1E 0%, #0D1F3C 55%, #162B52 100%);
  padding: clamp(64px,8vw,100px) 0 clamp(52px,6vw,80px);
  position: relative; overflow: hidden;
}
.io-hero::before {
  content:'';position:absolute;inset:0;pointer-events:none;
  background: radial-gradient(800px 600px at 70% -10%,rgba(59,143,239,.22),transparent 60%),
              radial-gradient(400px 400px at 5% 100%,rgba(15,82,192,.18),transparent 60%);
}
.io-inner { max-width:1160px;margin:0 auto;padding:0 28px;position:relative;z-index:1; }
.io-eyebrow {
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(249,115,22,.15);border:1px solid rgba(249,115,22,.3);
  border-radius:99px;padding:5px 14px;
  font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:#fb923c;margin-bottom:20px;
}
.io-hero h1 {
  font-size:clamp(34px,4.8vw,60px);font-weight:900;color:#fff;
  letter-spacing:-.04em;line-height:1.04;margin-bottom:18px;
}
.io-hero h1 span {
  background:linear-gradient(118deg,#fb923c,#f97316);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
}
.io-hero-desc { font-size:17px;color:#9ab5d4;line-height:1.7;max-width:500px;margin-bottom:32px; }
.io-hero-grid { display:grid;grid-template-columns:1.1fr .9fr;gap:64px;align-items:center; }
.io-cta-row { display:flex;gap:12px;flex-wrap:wrap; }
.io-btn-primary {
  display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 28px;
  background:#f97316;color:#fff;font-weight:700;font-size:15px;border-radius:10px;
  text-decoration:none;transition:all .15s;box-shadow:0 8px 24px rgba(249,115,22,.35);border:0;cursor:pointer;font-family:inherit;
}
.io-btn-primary:hover { background:#ea6c0a;transform:translateY(-2px); }
.io-btn-outline {
  display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 24px;
  background:rgba(255,255,255,.08);color:#fff;font-weight:600;font-size:15px;border-radius:10px;
  border:1.5px solid rgba(255,255,255,.2);text-decoration:none;transition:all .15s;
}
.io-btn-outline:hover { background:rgba(255,255,255,.14); }

/* Hero right card */
.io-hero-card {
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  border-radius:20px;padding:28px;backdrop-filter:blur(10px);
}
.io-hero-card h3 { color:#fff;font-size:17px;font-weight:700;margin-bottom:18px; }
.io-hero-feat { display:flex;align-items:flex-start;gap:14px;margin-bottom:16px; }
.io-hero-feat-ic { width:38px;height:38px;border-radius:10px;background:rgba(249,115,22,.15);border:1px solid rgba(249,115,22,.25);display:grid;place-items:center;flex:none; }
.io-hero-feat-ic svg { width:18px;height:18px;stroke:#fb923c;fill:none;stroke-width:2; }
.io-hero-feat-txt b { display:block;color:#fff;font-size:14px;font-weight:700;margin-bottom:3px; }
.io-hero-feat-txt span { font-size:13px;color:#9ab5d4;line-height:1.5; }

/* ── PRODUCTS ── */
.io-products { padding:88px 0;background:var(--sec-orange-bg); }
.io-sec-label { font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--sec-orange-accent);margin-bottom:14px;display:block; }
.io-sec-h2 { font-size:clamp(26px,3.6vw,44px);font-weight:900;letter-spacing:-.04em;color:var(--navy);margin-bottom:8px; }
.io-sec-p { font-size:16px;color:var(--text-2);max-width:560px;line-height:1.7;margin-bottom:52px; }
.io-prod-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
.io-prod-card {
  background:#fff;border-radius:20px;overflow:hidden;
  border:1.5px solid var(--sec-orange-border);
  box-shadow:0 4px 20px rgba(249,115,22,.08);
  transition:transform .2s,box-shadow .2s;
}
.io-prod-card:hover { transform:translateY(-6px);box-shadow:0 16px 40px rgba(249,115,22,.16); }
.io-prod-img { height:200px;overflow:hidden;position:relative; }
.io-prod-img img { width:100%;height:100%;object-fit:cover;transition:transform .4s; }
.io-prod-card:hover .io-prod-img img { transform:scale(1.06); }
.io-prod-badge {
  position:absolute;top:14px;left:14px;
  background:var(--sec-orange-accent);color:#fff;
  font-size:10.5px;font-weight:700;padding:4px 10px;border-radius:99px;letter-spacing:.04em;
}
.io-prod-body { padding:24px; }
.io-prod-body h3 { font-size:17px;font-weight:800;color:var(--navy);margin-bottom:8px; }
.io-prod-body p { font-size:13.5px;color:var(--text-2);line-height:1.6;margin-bottom:16px; }
.io-prod-specs { display:flex;flex-direction:column;gap:6px;margin-bottom:20px; }
.io-prod-spec { display:flex;align-items:center;gap:8px;font-size:13px;color:var(--navy); }
.io-prod-spec svg { width:14px;height:14px;stroke:#059669;fill:none;stroke-width:2.5;flex:none; }
.io-prod-cta {
  display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:700;
  color:var(--sec-orange-accent);text-decoration:none;
}
.io-prod-cta svg { width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2.5; }

/* ── WHY SECTION ── */
.io-why { padding:88px 0;background:var(--sec-teal-bg); }
.io-why-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:48px; }
.io-why-card {
  background:#fff;border-radius:16px;padding:28px;
  border:1.5px solid var(--sec-teal-border);
  transition:border-color .15s,box-shadow .15s;
}
.io-why-card:hover { border-color:var(--sec-teal-accent);box-shadow:0 6px 20px rgba(5,150,105,.12); }
.io-why-ic { width:44px;height:44px;border-radius:10px;background:var(--sec-teal-light);display:grid;place-items:center;margin-bottom:16px; }
.io-why-ic svg { width:20px;height:20px;stroke:var(--sec-teal-accent);fill:none;stroke-width:2; }
.io-why-card h4 { font-size:15px;font-weight:700;color:var(--navy);margin-bottom:8px; }
.io-why-card p { font-size:13.5px;color:var(--text-2);line-height:1.6; }

/* ── PROCESS ── */
.io-process { padding:88px 0;background:var(--sec-purple-bg); }
.io-steps { display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:48px;position:relative; }
.io-steps::before { content:'';position:absolute;top:32px;left:48px;right:48px;height:2px;background:linear-gradient(90deg,var(--sec-purple-accent),var(--blue));z-index:0; }
.io-step { text-align:center;position:relative;z-index:1; }
.io-step-num {
  width:64px;height:64px;border-radius:50%;
  background:linear-gradient(135deg,var(--sec-purple-accent),var(--blue));
  color:#fff;font-size:20px;font-weight:900;display:grid;place-items:center;
  margin:0 auto 16px;box-shadow:0 8px 24px rgba(124,58,237,.35);
}
.io-step h4 { font-size:15px;font-weight:700;color:var(--navy);margin-bottom:8px; }
.io-step p { font-size:13px;color:var(--text-2);line-height:1.6; }

/* ── FAQ ── */
.io-faq { padding:88px 0;background:var(--sec-amber-bg); }
.io-faq-list { max-width:720px;margin:48px auto 0;display:flex;flex-direction:column;gap:0; }
.io-faq-item { border-bottom:1px solid var(--sec-amber-border); }
.io-faq-q {
  width:100%;padding:20px 0;cursor:pointer;background:none;border:0;text-align:left;
  font-family:var(--font);font-size:16px;font-weight:600;color:var(--navy);
  display:flex;justify-content:space-between;align-items:center;gap:16px;
}
.io-faq-q svg { width:20px;height:20px;stroke:var(--sec-amber-accent);fill:none;stroke-width:2.5;flex:none;transition:transform .25s; }
.io-faq-q.open svg { transform:rotate(45deg); }
.io-faq-a { font-size:14.5px;color:var(--text-2);line-height:1.7;overflow:hidden;max-height:0;transition:max-height .35s; }
.io-faq-a-inner { padding-bottom:20px; }

/* ── CTA ── */
.io-cta { padding:88px 0;background:var(--sec-sky-bg); }

/* Responsive */
@media(max-width:900px){
  .io-hero-grid,.io-prod-grid,.io-why-grid,.io-steps{ grid-template-columns:1fr 1fr }
  .io-steps::before{ display:none }
}
@media(max-width:600px){
  .io-prod-grid,.io-why-grid,.io-steps{ grid-template-columns:1fr }
  .io-hero-grid{ grid-template-columns:1fr }
}
`

const CHECK = 'M20 6 9 17l-5-5'
const ARROW = 'M5 12h14M12 5l7 7-7 7'
const PLUS  = 'M12 5v14M5 12h14'

const PRODUCTS = [
  {
    label: 'Seating',
    imgKey: 'chair',
    title: 'Ergonomic High-Back Office Chair',
    desc: 'Premium mesh chair with adjustable lumbar support, headrest and armrests. Designed for all-day individual workstation comfort.',
    specs: ['Ergonomic mesh back & headrest','Adjustable height & tilt','3D adjustable armrests','5-star caster base'],
  },
  {
    label: 'Workstation',
    imgKey: 'normal',
    title: 'Individual Office Workstation Table',
    desc: 'Clean, minimal office desk with pre-laminated board surface and sturdy powder-coated steel frame. Perfect for focused individual work.',
    specs: ['Pre-lam white board top','Powder-coated steel frame','Modular & configurable','Custom sizes available'],
  },
  {
    label: 'Standing Desk',
    imgKey: 'electric',
    title: 'Electric Height-Adjustable Desk',
    desc: 'Motorised sit-stand desk with digital memory panel. Switch between sitting and standing effortlessly throughout your workday.',
    specs: ['Electric motor with digital panel','Memory height presets','Anti-collision safety','Wide white surface top'],
  },
]

const WHY = [
  { icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title:'Built for Individual Productivity', body:'Every product is designed around the needs of a single occupant — ergonomics, focus, and personal workflow.' },
  { icon:'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', title:'Manufactured to Your Specs', body:'Custom dimensions, finishes and frame colours. We build to your exact space and style requirements.' },
  { icon:'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title:'Delivered & Assembled On-Site', body:'Our crew handles delivery, full assembly and cable management. Your workspace is ready to use from day one.' },
]

const STEPS = [
  { n:'01', title:'Submit Requirement', body:'Tell us your space dimensions, preferred products and quantity. We respond within 24 hours.' },
  { n:'02', title:'Free Layout Design', body:'Our design team creates a 2D layout plan for your individual workspace — free of charge, no commitment.' },
  { n:'03', title:'Customise & Order', body:'Confirm specifications, finishes and sizing. Manufacturing begins after your final sign-off.' },
  { n:'04', title:'Deliver & Set Up', body:'We deliver, assemble and set up your complete individual office furniture on-site across India.' },
]

const FAQS = [
  { q:'Can I order just one desk or chair?', a:'Yes. We accept orders from a single piece upward. Individual office setups are our specialty — no minimum order quantity.' },
  { q:'How long does delivery take?', a:'Typically 10–18 working days from order confirmation, depending on your location and customisation requirements.' },
  { q:'Can I choose custom colours and finishes?', a:'Absolutely. You can specify laminate colour, frame powder-coat shade, fabric colour and more.' },
  { q:'Do you cover my city?', a:'We deliver and install across all major Indian cities — Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Pune and more.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="io-faq-item">
      <button className={`io-faq-q${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
        {q}
        <svg viewBox="0 0 24 24"><path d={PLUS}/></svg>
      </button>
      <div className="io-faq-a" style={{ maxHeight: open ? 200 : 0 }}>
        <div className="io-faq-a-inner">{a}</div>
      </div>
    </div>
  )
}

export default function IndividualOfficePage() {
  return (
    <>
      <style>{S}</style>

      {/* HERO */}
      <section className="io-hero">
        <div className="io-inner">
          <div className="io-hero-grid">
            <div className="reveal-up in">
              <div className="io-eyebrow">Office Setup · Individual Workspace</div>
              <h1>Furniture built for <span>your desk.</span></h1>
              <p className="io-hero-desc">Ergonomic chairs, custom workstation tables and height-adjustable desks — designed and manufactured for individual office setups across India.</p>
              <div className="io-cta-row">
                <a href="#products" className="io-btn-primary">
                  Browse Products
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}><path d={ARROW}/></svg>
                </a>
                <a href="/office-restore#planner" className="io-btn-outline">Get a Free Quote</a>
              </div>
            </div>
            <div className="reveal-up in">
              <div className="io-hero-card">
                <h3>What's included</h3>
                {[
                  { icon:'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', label:'Free 2D Layout Design', sub:'Customised to your space before any order' },
                  { icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', label:'100% Custom Manufacturing', sub:'Size, colour, finish — all to your spec' },
                  { icon:'M5 12h14M12 5l7 7-7 7', label:'Delivered & Assembled', sub:'End-to-end setup at your location' },
                  { icon:'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', label:'Pan India Coverage', sub:'20+ states, all major cities' },
                ].map(f => (
                  <div key={f.label} className="io-hero-feat">
                    <div className="io-hero-feat-ic">
                      <svg viewBox="0 0 24 24"><path d={f.icon}/></svg>
                    </div>
                    <div className="io-hero-feat-txt">
                      <b>{f.label}</b>
                      <span>{f.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="io-products" id="products">
        <div className="io-inner">
          <span className="io-sec-label">Our Range</span>
          <h2 className="io-sec-h2">Individual office furniture</h2>
          <p className="io-sec-p">Every piece manufactured to order — custom sizes, finishes and colours for your personal workspace.</p>
          <div className="io-prod-grid">
            {PRODUCTS.map(p => {
              const img = p.imgKey === 'chair' ? imgChair : p.imgKey === 'normal' ? imgNormalTable : imgElectricTable
              return (
                <div key={p.title} className="io-prod-card reveal-up">
                  <div className="io-prod-img">
                    <img src={img} alt={p.title} />
                    <span className="io-prod-badge">{p.label}</span>
                  </div>
                  <div className="io-prod-body">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="io-prod-specs">
                      {p.specs.map(s => (
                        <div key={s} className="io-prod-spec">
                          <svg viewBox="0 0 24 24"><path d={CHECK}/></svg>{s}
                        </div>
                      ))}
                    </div>
                    <a href="/office-restore#planner" className="io-prod-cta">
                      Get a quote <svg viewBox="0 0 24 24"><path d={ARROW}/></svg>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="io-why">
        <div className="io-inner">
          <span className="io-sec-label" style={{color:'var(--sec-teal-accent)'}}>Why LauncherDesk</span>
          <h2 className="io-sec-h2">Everything handled for you</h2>
          <p className="io-sec-p">From design to delivery — we manage the entire individual office furniture project so you can focus on work.</p>
          <div className="io-why-grid">
            {WHY.map(w => (
              <div key={w.title} className="io-why-card reveal-up">
                <div className="io-why-ic">
                  <svg viewBox="0 0 24 24"><path d={w.icon}/></svg>
                </div>
                <h4>{w.title}</h4>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="io-process">
        <div className="io-inner">
          <div className="sec-head center reveal-up" style={{marginBottom:0}}>
            <span className="eyebrow" style={{color:'var(--sec-purple-accent)'}}>How it works</span>
            <h2 style={{marginTop:10}}>From inquiry to installed</h2>
            <p>A simple 4-step process — we handle everything.</p>
          </div>
          <div className="io-steps">
            {STEPS.map(s => (
              <div key={s.n} className="io-step reveal-up">
                <div className="io-step-num">{s.n}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="io-faq">
        <div className="io-inner">
          <div className="sec-head center reveal-up">
            <span className="eyebrow" style={{color:'var(--sec-amber-accent)'}}>FAQ</span>
            <h2 style={{marginTop:10}}>Common questions</h2>
          </div>
          <div className="io-faq-list">
            {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="io-cta">
        <div className="io-inner">
          <div className="final reveal-up">
            <h2>Ready to set up your individual workspace?</h2>
            <p>Get a free layout plan and custom quote — no commitment required.</p>
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