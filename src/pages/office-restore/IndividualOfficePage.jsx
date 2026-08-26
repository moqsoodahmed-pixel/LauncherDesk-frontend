import { useState } from 'react'

const S = `
.io-hero{background:linear-gradient(160deg,#080F1E 0%,#0D1F3C 55%,#162B52 100%);padding:clamp(64px,8vw,100px) 0 clamp(52px,6vw,80px);position:relative;overflow:hidden}
.io-hero::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(800px 600px at 70% -10%,rgba(249,115,22,.18),transparent 60%),radial-gradient(400px 400px at 5% 100%,rgba(15,82,192,.15),transparent 60%)}
.io-inner{max-width:1160px;margin:0 auto;padding:0 28px;position:relative;z-index:1}
.io-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(249,115,22,.15);border:1px solid rgba(249,115,22,.3);border-radius:99px;padding:5px 14px;font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fb923c;margin-bottom:20px}
.io-hero h1{font-size:clamp(34px,4.8vw,62px);font-weight:900;color:#fff;letter-spacing:-.04em;line-height:1.04;margin-bottom:18px}
.io-hero h1 span{background:linear-gradient(118deg,#fb923c,#f97316);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.io-hero-desc{font-size:17px;color:#9ab5d4;line-height:1.7;max-width:520px;margin-bottom:32px}
.io-hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:center}
.io-cta-row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:36px}
.io-btn-primary{display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 28px;background:#f97316;color:#fff;font-weight:700;font-size:15px;border-radius:10px;text-decoration:none;transition:all .15s;box-shadow:0 8px 24px rgba(249,115,22,.35);border:0;cursor:pointer;font-family:inherit}
.io-btn-primary:hover{background:#ea6c0a;transform:translateY(-2px)}
.io-btn-outline{display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 24px;background:rgba(255,255,255,.08);color:#fff;font-weight:600;font-size:15px;border-radius:10px;border:1.5px solid rgba(255,255,255,.2);text-decoration:none;transition:all .15s}
.io-btn-outline:hover{background:rgba(255,255,255,.14)}
.io-badges{display:flex;flex-wrap:wrap;gap:10px}
.io-badge{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:99px;padding:7px 14px;font-size:13px;font-weight:600;color:#9ab5d4}
.io-badge svg{width:14px;height:14px;stroke:#34d399;fill:none;stroke-width:2.5;flex:none}

.io-search-bar{padding:20px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:16px;backdrop-filter:blur(10px);display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:10px;align-items:end;margin-top:32px}
.io-search-field label{font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#6da8e0;display:block;margin-bottom:8px}
.io-search-field select,.io-search-field input{width:100%;height:44px;background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.15);border-radius:10px;color:#fff;font-family:var(--font);font-size:14px;padding:0 14px;outline:none;transition:.15s}
.io-search-field select:focus,.io-search-field input:focus{border-color:rgba(249,115,22,.5);background:rgba(255,255,255,.15)}
.io-search-field select option{background:#0D1F3C;color:#fff}
.io-search-btn{height:44px;padding:0 24px;background:#f97316;color:#fff;font-weight:700;font-size:14px;border-radius:10px;border:0;cursor:pointer;white-space:nowrap;font-family:inherit;transition:background .15s}
.io-search-btn:hover{background:#ea6c0a}

.io-types{padding:88px 0;background:var(--sec-orange-bg)}
.io-sec-label{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--sec-orange-accent);margin-bottom:14px;display:block}
.io-sec-h2{font-size:clamp(26px,3.6vw,44px);font-weight:900;letter-spacing:-.04em;color:var(--navy);margin-bottom:8px}
.io-sec-p{font-size:16px;color:var(--text-2);max-width:560px;line-height:1.7;margin-bottom:48px}
.io-types-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.io-type-card{background:#fff;border-radius:20px;padding:28px;border:1.5px solid var(--sec-orange-border);transition:transform .2s,box-shadow .2s,border-color .2s}
.io-type-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(249,115,22,.14);border-color:var(--sec-orange-accent)}
.io-type-ic{width:52px;height:52px;border-radius:14px;background:var(--sec-orange-bg);border:1.5px solid var(--sec-orange-border);display:grid;place-items:center;margin-bottom:18px}
.io-type-ic svg{width:24px;height:24px;stroke:var(--sec-orange-accent);fill:none;stroke-width:2}
.io-type-card h3{font-size:18px;font-weight:800;color:var(--navy);margin-bottom:8px}
.io-type-card p{font-size:14px;color:var(--text-2);line-height:1.6;margin-bottom:18px}
.io-type-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px}
.io-type-tag{font-size:11.5px;font-weight:600;padding:3px 10px;border-radius:99px;background:var(--sec-orange-bg);color:var(--sec-orange-accent);border:1px solid var(--sec-orange-border)}
.io-type-link{display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:700;color:var(--sec-orange-accent);text-decoration:none}
.io-type-link svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2.5}

.io-listings{padding:88px 0;background:var(--sec-teal-bg)}
.io-listings-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px}
.io-listing-card{background:#fff;border-radius:18px;overflow:hidden;border:1.5px solid var(--sec-teal-border);transition:transform .2s,box-shadow .2s}
.io-listing-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(5,150,105,.12)}
.io-listing-img{height:180px;background:linear-gradient(135deg,#EEF2FF,#DBEAFE);display:flex;align-items:center;justify-content:center;position:relative}
.io-listing-img svg{width:48px;height:48px;stroke:#3B8FEF;fill:none;stroke-width:1.2;opacity:.4}
.io-listing-badge{position:absolute;top:12px;left:12px;font-size:10.5px;font-weight:700;padding:4px 10px;border-radius:99px}
.io-listing-badge.avail{background:rgba(5,150,105,.15);color:#059669;border:1px solid rgba(5,150,105,.25)}
.io-listing-badge.premium{background:rgba(249,115,22,.15);color:#f97316;border:1px solid rgba(249,115,22,.25)}
.io-listing-body{padding:20px}
.io-listing-body h4{font-size:15px;font-weight:700;color:var(--navy);margin-bottom:4px}
.io-listing-loc{font-size:12.5px;color:var(--text-2);display:flex;align-items:center;gap:5px;margin-bottom:14px}
.io-listing-loc svg{width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2;flex:none}
.io-listing-stats{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px}
.io-listing-stat{background:var(--bg);border-radius:8px;padding:9px;text-align:center}
.io-listing-stat .n{font-size:13.5px;font-weight:800;color:var(--navy);display:block}
.io-listing-stat .l{font-size:10.5px;color:var(--text-3);text-transform:uppercase;letter-spacing:.05em}
.io-listing-price{font-size:13px;font-weight:700;color:var(--sec-teal-accent);margin-bottom:14px}
.io-listing-cta{display:block;text-align:center;padding:10px;background:var(--sec-teal-light);color:var(--sec-teal-accent);border-radius:8px;font-size:13px;font-weight:700;text-decoration:none;transition:background .15s}
.io-listing-cta:hover{background:var(--sec-teal-border)}

.io-why{padding:88px 0;background:var(--sec-purple-bg)}
.io-why-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;margin-top:48px}
.io-why-feats{display:flex;flex-direction:column;gap:20px}
.io-why-feat{display:flex;gap:16px;align-items:flex-start}
.io-why-feat-ic{width:44px;height:44px;border-radius:12px;background:var(--sec-purple-light);display:grid;place-items:center;flex:none}
.io-why-feat-ic svg{width:20px;height:20px;stroke:var(--sec-purple-accent);fill:none;stroke-width:2}
.io-why-feat h4{font-size:15px;font-weight:700;color:var(--navy);margin-bottom:5px}
.io-why-feat p{font-size:13.5px;color:var(--text-2);line-height:1.6}
.io-why-visual{background:linear-gradient(160deg,#0D1F3C,#080F1E);border-radius:20px;padding:32px}
.io-why-visual h3{color:#fff;font-size:17px;font-weight:700;margin-bottom:20px}
.io-stat-list{display:flex;flex-direction:column;gap:12px}
.io-stat-row-item{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:rgba(255,255,255,.06);border-radius:10px;border:1px solid rgba(255,255,255,.08)}
.io-stat-row-item span{font-size:13.5px;color:#9ab5d4}
.io-stat-row-item b{font-size:15px;font-weight:800;color:#fff}

.io-process{padding:88px 0;background:var(--sec-amber-bg)}
.io-proc-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:48px}
.io-proc-step{background:#fff;border-radius:16px;padding:24px;border:1.5px solid var(--sec-amber-border);text-align:center}
.io-proc-num{width:48px;height:48px;border-radius:50%;background:var(--sec-amber-light);color:var(--sec-amber-accent);font-weight:900;font-size:18px;display:grid;place-items:center;margin:0 auto 16px}
.io-proc-step h4{font-size:14.5px;font-weight:700;color:var(--navy);margin-bottom:8px}
.io-proc-step p{font-size:13px;color:var(--text-2);line-height:1.6}

.io-locs{padding:88px 0;background:var(--sec-sky-bg)}
.io-loc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
.io-loc-card{background:#fff;border-radius:14px;padding:18px 20px;border:1.5px solid var(--sec-sky-border);transition:border-color .15s,box-shadow .15s;cursor:pointer}
.io-loc-card:hover{border-color:var(--sec-sky-accent);box-shadow:0 4px 16px rgba(2,132,199,.1)}
.io-loc-card h4{font-size:14.5px;font-weight:700;color:var(--navy);margin-bottom:4px}
.io-loc-card p{font-size:12.5px;color:var(--text-2)}
.io-loc-card .tag{font-size:11px;font-weight:600;padding:2px 8px;border-radius:99px;background:var(--sec-sky-light);color:var(--sec-sky-accent);margin-top:8px;display:inline-block}

.io-faq-sec{padding:88px 0;background:var(--sec-orange-bg)}
.io-faq-list{max-width:720px;margin:48px auto 0}
.io-faq-item{border-bottom:1px solid var(--sec-orange-border)}
.io-faq-q{width:100%;padding:20px 0;cursor:pointer;background:none;border:0;text-align:left;font-family:var(--font);font-size:16px;font-weight:600;color:var(--navy);display:flex;justify-content:space-between;align-items:center;gap:16px}
.io-faq-q svg{width:20px;height:20px;stroke:var(--sec-orange-accent);fill:none;stroke-width:2.5;flex:none;transition:transform .25s}
.io-faq-q.open svg{transform:rotate(45deg)}
.io-faq-a{font-size:14.5px;color:var(--text-2);line-height:1.7;overflow:hidden;max-height:0;transition:max-height .35s}
.io-faq-a-in{padding-bottom:20px}

.io-cta-fin{padding:88px 0;background:var(--sec-teal-bg)}

@media(max-width:1024px){
  .io-search-bar{grid-template-columns:1fr 1fr;gap:10px}
  .io-search-btn{grid-column:1/-1;width:100%}
  .io-hero-grid{grid-template-columns:1fr 1fr}
  .io-types-grid,.io-listings-grid{grid-template-columns:1fr 1fr}
  .io-why-grid{grid-template-columns:1fr 1fr}
  .io-proc-steps{grid-template-columns:1fr 1fr}
  .io-loc-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:768px){
  .io-search-bar{grid-template-columns:1fr;gap:10px}
  .io-search-btn{width:100%}
  .io-hero-grid{grid-template-columns:1fr}
  .io-types-grid,.io-listings-grid{grid-template-columns:1fr}
  .io-why-grid{grid-template-columns:1fr}
  .io-proc-steps{grid-template-columns:1fr 1fr}
  .io-loc-grid{grid-template-columns:1fr 1fr}
  .io-cta-row{flex-direction:column}
  .io-btn-primary,.io-btn-outline{justify-content:center;width:100%}
  .io-badges{gap:8px}
}
@media(max-width:480px){
  .io-proc-steps,.io-loc-grid{grid-template-columns:1fr}
  .io-sec-h2{font-size:24px}
  .io-inner{padding:0 16px}
}
`

const CHECK = 'M20 6 9 17l-5-5'
const ARROW = 'M5 12h14M12 5l7 7-7 7'
const PLUS  = 'M12 5v14M5 12h14'
const PIN   = 'M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0'
const BLDG  = 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10'

const OFFICE_TYPES = [
  { icon:'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z', title:'Furnished Private Office', desc:'Fully furnished, ready-to-move-in private office space for your entire team. Plug in and start working on day one.', tags:['Fully furnished','Immediate availability','Utilities included','Flexible lease'], label:'Most Popular' },
  { icon:'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16M12 7h.01', title:'Managed Office Space', desc:'Professionally managed office with dedicated reception, housekeeping, IT support and security included in one monthly bill.', tags:['Managed services','Reception desk','IT support','Security'], label:'Premium' },
  { icon:'M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2', title:'Plug & Play Office', desc:'Completely ready office with furniture, high-speed internet, power backup and access control. Zero setup required.', tags:['Zero setup','High-speed internet','Power backup','Access control'], label:'Ready Now' },
]

const LISTINGS = [
  { title:'Premium Office Space — Koramangala', loc:'4th Block, Koramangala', area:'2,500 Sq Ft', seats:'25 seats', price:'₹85/sq ft/mo', badge:'Premium' },
  { title:'Managed Office — Indiranagar', loc:'100 Ft Road, Indiranagar', area:'1,800 Sq Ft', seats:'18 seats', price:'₹90/sq ft/mo', badge:'Available' },
  { title:'Furnished Office — HSR Layout', loc:'Sector 6, HSR Layout', area:'3,200 Sq Ft', seats:'32 seats', price:'₹75/sq ft/mo', badge:'Available' },
  { title:'Plug & Play Office — MG Road', loc:'MG Road, Central Bangalore', area:'1,200 Sq Ft', seats:'12 seats', price:'₹110/sq ft/mo', badge:'Premium' },
  { title:'Corporate Office Suite — Whitefield', loc:'ITPL Main Road, Whitefield', area:'5,000 Sq Ft', seats:'50 seats', price:'₹65/sq ft/mo', badge:'Available' },
  { title:'Startup Office — BTM Layout', loc:'2nd Stage, BTM Layout', area:'800 Sq Ft', seats:'8 seats', price:'₹70/sq ft/mo', badge:'Available' },
]

const WHY_FEATS = [
  { icon:'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title:'Zero Brokerage Fee', body:'We help you find the right private office space at zero brokerage. Transparent pricing, no hidden charges.' },
  { icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title:'Verified Listings Only', body:'Every office listing is physically verified by our team for quality, infrastructure and legal compliance.' },
  { icon:'M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z', title:'Flexible Lease Terms', body:'Short-term and long-term lease options. Monthly, quarterly or annual — we negotiate the best terms for you.' },
  { icon:'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z', title:'End-to-End Support', body:'From shortlisting to final agreement — our advisors handle site visits, negotiations and documentation.' },
]

const LOCATIONS = [
  { name:'Koramangala', sub:'Startups & tech hub', tag:'High demand' },
  { name:'Indiranagar', sub:'Vibrant work culture', tag:'Premium' },
  { name:'HSR Layout', sub:'Fast-growing startup zone', tag:'Affordable' },
  { name:'MG Road', sub:'Central business district', tag:'CBD' },
  { name:'Whitefield', sub:'IT park cluster', tag:'Enterprise' },
  { name:'Marathahalli', sub:'Mid-market offices', tag:'Value pick' },
  { name:'Electronic City', sub:'Tech company hub', tag:'IT hub' },
  { name:'Hebbal', sub:'North Bangalore rising', tag:'Growing' },
]

const FAQS = [
  { q:'What is an individual/private office space?', a:'A private office is a dedicated, self-contained office unit rented exclusively by your company. Unlike co-working, you have full privacy, your own entrance (or floor), and no shared workspace with other businesses.' },
  { q:'What is the minimum lease term?', a:'Most private offices in Bangalore have a minimum lease of 6–12 months. We also have options with shorter 3-month leases for startups needing flexibility.' },
  { q:'Is furniture and internet included?', a:'For fully furnished and managed offices — yes. Furniture, high-speed internet, power backup and utilities are typically included. For bare or warm-shell offices, these are separate costs.' },
  { q:'How do you charge for your service?', a:'LauncherDesk charges zero brokerage to tenants. Our advisory service is completely free for businesses looking for office space.' },
  { q:'How quickly can I move in?', a:'Fully furnished and plug & play offices can be ready in 1–5 working days. Managed offices may take 1–2 weeks for setup and agreement.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="io-faq-item">
      <button className={`io-faq-q${open?' open':''}`} onClick={() => setOpen(o => !o)}>
        {q}<svg viewBox="0 0 24 24"><path d={PLUS}/></svg>
      </button>
      <div className="io-faq-a" style={{maxHeight: open ? 300 : 0}}>
        <div className="io-faq-a-in">{a}</div>
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
              <div className="io-eyebrow">Office Space · Private & Individual</div>
              <h1>Your own office.<br/><span>Your own space.</span></h1>
              <p className="io-hero-desc">Find fully furnished private office spaces, managed offices and plug & play suites across Bangalore. Zero brokerage. Move in ready.</p>
              <div className="io-cta-row">
                <a href="#listings" className="io-btn-primary">Browse Spaces <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}><path d={ARROW}/></svg></a>
                <a href="/company/contact" className="io-btn-outline">Talk to an Advisor</a>
              </div>
              <div className="io-badges">
                {['Zero brokerage','Verified listings','Flexible lease','Pan Bangalore'].map(b => (
                  <div key={b} className="io-badge"><svg viewBox="0 0 24 24"><path d={CHECK}/></svg>{b}</div>
                ))}
              </div>
            </div>
            <div className="reveal-up in" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',borderRadius:16,padding:28,backdropFilter:'blur(10px)',width:'100%'}}>
                <div style={{fontSize:13,fontWeight:700,color:'#6da8e0',marginBottom:16,letterSpacing:'.06em',textTransform:'uppercase'}}>Quick Search</div>
                <div style={{display:'flex',flexDirection:'column',gap:12}}>
                  {[['Location',['Koramangala','Indiranagar','HSR Layout','MG Road','Whitefield','Electronic City','Hebbal','Marathahalli']],
                    ['Office Type',['Furnished Office','Managed Office','Plug & Play','Bare Shell']],
                    ['Team Size',['1–5 seats','6–15 seats','16–30 seats','31–50 seats','50+ seats']]
                  ].map(([label, opts]) => (
                    <div key={label}>
                      <label style={{fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#6da8e0',display:'block',marginBottom:6}}>{label}</label>
                      <select style={{width:'100%',height:42,background:'rgba(255,255,255,.1)',border:'1.5px solid rgba(255,255,255,.15)',borderRadius:10,color:'#fff',fontFamily:'var(--font)',fontSize:14,padding:'0 12px',outline:'none'}}>
                        <option style={{background:'#0D1F3C'}}>Select {label.toLowerCase()}</option>
                        {opts.map(o=><option key={o} style={{background:'#0D1F3C'}}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  <button className="io-search-btn" style={{width:'100%',marginTop:4}} onClick={() => document.getElementById('listings')?.scrollIntoView({behavior:'smooth'})}>Search Spaces →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICE TYPES */}
      <section className="io-types" id="types">
        <div className="io-inner">
          <span className="io-sec-label">Office Types</span>
          <h2 className="io-sec-h2">Find the right private office</h2>
          <p className="io-sec-p">Every business is different. Choose the office type that fits your team size, budget and work style.</p>
          <div className="io-types-grid">
            {OFFICE_TYPES.map(t => (
              <div key={t.title} className="io-type-card reveal-up">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
                  <div className="io-type-ic"><svg viewBox="0 0 24 24"><path d={t.icon}/></svg></div>
                  <span style={{fontSize:10.5,fontWeight:700,padding:'3px 10px',borderRadius:99,background:'var(--sec-orange-bg)',color:'var(--sec-orange-accent)',border:'1px solid var(--sec-orange-border)'}}>{t.label}</span>
                </div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
                <div className="io-type-tags">{t.tags.map(tag=><span key={tag} className="io-type-tag">{tag}</span>)}</div>
                <a href="/company/contact" className="io-type-link">Enquire now <svg viewBox="0 0 24 24"><path d={ARROW}/></svg></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LISTINGS */}
      <section className="io-listings" id="listings">
        <div className="io-inner">
          <span className="io-sec-label" style={{color:'var(--sec-teal-accent)'}}>Available Spaces</span>
          <h2 className="io-sec-h2">Private offices in Bangalore</h2>
          <p className="io-sec-p">Shortlisted, verified private office spaces ready for immediate occupation. Contact us for a site visit.</p>
          <div className="io-listings-grid">
            {LISTINGS.map(l => (
              <div key={l.title} className="io-listing-card reveal-up">
                <div className="io-listing-img">
                  <svg viewBox="0 0 24 24"><path d={BLDG}/></svg>
                  <span className={`io-listing-badge ${l.badge==='Premium'?'premium':'avail'}`}>{l.badge}</span>
                </div>
                <div className="io-listing-body">
                  <h4>{l.title}</h4>
                  <div className="io-listing-loc"><svg viewBox="0 0 24 24"><path d={PIN}/></svg>{l.loc}</div>
                  <div className="io-listing-stats">
                    <div className="io-listing-stat"><span className="n">{l.area}</span><span className="l">Area</span></div>
                    <div className="io-listing-stat"><span className="n">{l.seats}</span><span className="l">Capacity</span></div>
                  </div>
                  <div className="io-listing-price">From {l.price}</div>
                  <a href="/company/contact" className="io-listing-cta">Schedule a Visit →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="io-why">
        <div className="io-inner">
          <span className="io-sec-label" style={{color:'var(--sec-purple-accent)'}}>Why LauncherDesk</span>
          <h2 className="io-sec-h2">Find your perfect office — free</h2>
          <div className="io-why-grid">
            <div className="io-why-feats">
              {WHY_FEATS.map(f => (
                <div key={f.title} className="io-why-feat reveal-up">
                  <div className="io-why-feat-ic"><svg viewBox="0 0 24 24"><path d={f.icon}/></svg></div>
                  <div><h4>{f.title}</h4><p>{f.body}</p></div>
                </div>
              ))}
            </div>
            <div className="io-why-visual reveal-up">
              <h3>Typical office metrics — Bangalore</h3>
              <div className="io-stat-list">
                {[['Avg rent (Koramangala)','₹80–100/sq ft/mo'],['Avg rent (Whitefield)','₹60–75/sq ft/mo'],['Minimum lease term','6–12 months'],['Move-in time (furnished)','1–5 days'],['Typical team size','5–50 seats'],['Brokerage fee','Zero']].map(([l,v]) => (
                  <div key={l} className="io-stat-row-item"><span>{l}</span><b>{v}</b></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="io-process">
        <div className="io-inner">
          <div className="sec-head center reveal-up" style={{marginBottom:0}}>
            <span className="eyebrow" style={{color:'var(--sec-amber-accent)'}}>How it works</span>
            <h2 style={{marginTop:10}}>From inquiry to move-in</h2>
            <p>Our advisors handle every step of finding and securing your private office space.</p>
          </div>
          <div className="io-proc-steps">
            {[
              {n:'01',title:'Share Your Requirement',body:'Tell us your location, team size and budget. We shortlist options within 24 hours.'},
              {n:'02',title:'Site Visits Arranged',body:'We schedule visits to pre-verified shortlisted offices — at your convenience.'},
              {n:'03',title:'Negotiate & Finalise',body:'Our team negotiates the best lease terms and rent on your behalf.'},
              {n:'04',title:'Move In',body:'Agreement signed, keys in hand. Furnished offices are move-in ready immediately.'},
            ].map(s => (
              <div key={s.n} className="io-proc-step reveal-up">
                <div className="io-proc-num">{s.n}</div>
                <h4>{s.title}</h4><p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="io-locs">
        <div className="io-inner">
          <div className="sec-head center reveal-up" style={{marginBottom:0}}>
            <span className="eyebrow" style={{color:'var(--sec-sky-accent)'}}>Locations</span>
            <h2 style={{marginTop:10}}>Private offices across Bangalore</h2>
            <p>We have verified private office listings across all major business districts.</p>
          </div>
          <div className="io-loc-grid">
            {LOCATIONS.map(l => (
              <div key={l.name} className="io-loc-card reveal-up">
                <h4>{l.name}</h4><p>{l.sub}</p>
                <span className="tag">{l.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="io-faq-sec">
        <div className="io-inner">
          <div className="sec-head center reveal-up"><span className="eyebrow" style={{color:'var(--sec-orange-accent)'}}>FAQ</span><h2 style={{marginTop:10}}>Common questions</h2></div>
          <div className="io-faq-list">{FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
        </div>
      </section>

      {/* CTA */}
      <section className="io-cta-fin">
        <div className="io-inner">
          <div className="final reveal-up">
            <h2>Looking for a private office in Bangalore?</h2>
            <p>Share your requirement — our advisors will shortlist options and arrange site visits at zero brokerage.</p>
            <div className="row">
              <a href="/company/contact" className="btn btn-light">Talk to an Advisor</a>
              <a href={`https://wa.me/918548854859?text=Hi, I'm looking for a private office space in Bangalore`} className="btn btn-ghost-d" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}