import { useState } from 'react'

const S = `
.cw-hero{background:linear-gradient(160deg,#080F1E 0%,#051A12 55%,#082918 100%);padding:clamp(64px,8vw,100px) 0 clamp(52px,6vw,80px);position:relative;overflow:hidden}
.cw-hero::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(800px 600px at 70% -10%,rgba(5,150,105,.22),transparent 60%),radial-gradient(400px 400px at 5% 100%,rgba(6,78,59,.18),transparent 60%)}
.cw-inner{max-width:1160px;margin:0 auto;padding:0 28px;position:relative;z-index:1}
.cw-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(5,150,105,.15);border:1px solid rgba(5,150,105,.3);border-radius:99px;padding:5px 14px;font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#34d399;margin-bottom:20px}
.cw-hero h1{font-size:clamp(34px,4.8vw,62px);font-weight:900;color:#fff;letter-spacing:-.04em;line-height:1.04;margin-bottom:18px}
.cw-hero h1 span{background:linear-gradient(118deg,#34d399,#059669);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.cw-hero-desc{font-size:17px;color:#9ab5d4;line-height:1.7;max-width:520px;margin-bottom:32px}
.cw-hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:center}
.cw-cta-row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:36px}
.cw-btn-primary{display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 28px;background:#059669;color:#fff;font-weight:700;font-size:15px;border-radius:10px;text-decoration:none;transition:all .15s;box-shadow:0 8px 24px rgba(5,150,105,.35);border:0;cursor:pointer;font-family:inherit}
.cw-btn-primary:hover{background:#047857;transform:translateY(-2px)}
.cw-btn-outline{display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 24px;background:rgba(255,255,255,.08);color:#fff;font-weight:600;font-size:15px;border-radius:10px;border:1.5px solid rgba(255,255,255,.2);text-decoration:none;transition:all .15s}
.cw-btn-outline:hover{background:rgba(255,255,255,.14)}
.cw-badges{display:flex;flex-wrap:wrap;gap:10px}
.cw-badge{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:99px;padding:7px 14px;font-size:13px;font-weight:600;color:#9ab5d4}
.cw-badge svg{width:14px;height:14px;stroke:#34d399;fill:none;stroke-width:2.5;flex:none}

.cw-pricing-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:28px;backdrop-filter:blur(10px)}
.cw-pricing-card h3{color:#fff;font-size:16px;font-weight:700;margin-bottom:20px}
.cw-plan-grid{display:flex;flex-direction:column;gap:10px}
.cw-plan-row{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:rgba(255,255,255,.06);border-radius:10px;border:1px solid rgba(255,255,255,.08)}
.cw-plan-name{font-size:13px;font-weight:600;color:#9ab5d4}
.cw-plan-price{font-size:15px;font-weight:800;color:#34d399}
.cw-plan-hint{font-size:10.5px;color:#6da8e0;margin-top:2px}

.cw-seats{padding:88px 0;background:var(--sec-teal-bg)}
.cw-sec-label{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--sec-teal-accent);margin-bottom:14px;display:block}
.cw-sec-h2{font-size:clamp(26px,3.6vw,44px);font-weight:900;letter-spacing:-.04em;color:var(--navy);margin-bottom:8px}
.cw-sec-p{font-size:16px;color:var(--text-2);max-width:560px;line-height:1.7;margin-bottom:48px}
.cw-seat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.cw-seat-card{background:#fff;border-radius:20px;padding:32px;border:1.5px solid var(--sec-teal-border);transition:transform .2s,box-shadow .2s,border-color .2s;position:relative;overflow:hidden}
.cw-seat-card.popular::before{content:'Most Popular';position:absolute;top:16px;right:-28px;background:var(--sec-teal-accent);color:#fff;font-size:10px;font-weight:700;padding:5px 40px;transform:rotate(35deg);letter-spacing:.05em}
.cw-seat-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(5,150,105,.14);border-color:var(--sec-teal-accent)}
.cw-seat-ic{width:52px;height:52px;border-radius:14px;background:var(--sec-teal-light);display:grid;place-items:center;margin-bottom:20px}
.cw-seat-ic svg{width:24px;height:24px;stroke:var(--sec-teal-accent);fill:none;stroke-width:2}
.cw-seat-card h3{font-size:20px;font-weight:900;color:var(--navy);margin-bottom:6px}
.cw-seat-price{font-size:26px;font-weight:900;color:var(--sec-teal-accent);margin-bottom:4px}
.cw-seat-price span{font-size:14px;font-weight:500;color:var(--text-2)}
.cw-seat-card p{font-size:14px;color:var(--text-2);line-height:1.6;margin-bottom:20px}
.cw-seat-inc{display:flex;flex-direction:column;gap:8px;margin-bottom:24px}
.cw-seat-inc-item{display:flex;align-items:center;gap:8px;font-size:13.5px;color:var(--navy)}
.cw-seat-inc-item svg{width:15px;height:15px;stroke:var(--sec-teal-accent);fill:none;stroke-width:2.5;flex:none}
.cw-seat-cta{display:block;text-align:center;padding:12px;background:var(--sec-teal-accent);color:#fff;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;transition:background .15s}
.cw-seat-cta:hover{background:#047857}

.cw-spaces{padding:88px 0;background:var(--sec-purple-bg)}
.cw-spaces-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:48px}
.cw-space-card{background:#fff;border-radius:18px;padding:28px;border:1.5px solid var(--sec-purple-border);transition:transform .2s,box-shadow .2s}
.cw-space-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(124,58,237,.12)}
.cw-space-head{display:flex;align-items:flex-start;gap:16px;margin-bottom:16px}
.cw-space-ic{width:48px;height:48px;border-radius:12px;background:var(--sec-purple-light);display:grid;place-items:center;flex:none}
.cw-space-ic svg{width:22px;height:22px;stroke:var(--sec-purple-accent);fill:none;stroke-width:2}
.cw-space-head h3{font-size:17px;font-weight:800;color:var(--navy);margin-bottom:4px}
.cw-space-head p{font-size:13.5px;color:var(--text-2)}
.cw-space-list{display:flex;flex-direction:column;gap:7px;margin-bottom:18px}
.cw-space-item{display:flex;align-items:center;gap:8px;font-size:13.5px;color:var(--navy)}
.cw-space-item svg{width:14px;height:14px;stroke:var(--sec-purple-accent);fill:none;stroke-width:2.5;flex:none}
.cw-space-from{font-size:13px;font-weight:700;color:var(--sec-purple-accent)}

.cw-amenities{padding:88px 0;background:var(--sec-amber-bg)}
.cw-amen-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:48px}
.cw-amen-card{background:#fff;border-radius:14px;padding:22px;border:1.5px solid var(--sec-amber-border);text-align:center;transition:border-color .15s}
.cw-amen-card:hover{border-color:var(--sec-amber-accent)}
.cw-amen-ic{width:48px;height:48px;border-radius:12px;background:var(--sec-amber-light);display:grid;place-items:center;margin:0 auto 14px}
.cw-amen-ic svg{width:22px;height:22px;stroke:var(--sec-amber-accent);fill:none;stroke-width:2}
.cw-amen-card h4{font-size:14px;font-weight:700;color:var(--navy);margin-bottom:4px}
.cw-amen-card p{font-size:12.5px;color:var(--text-2);line-height:1.5}

.cw-locs{padding:88px 0;background:var(--sec-sky-bg)}
.cw-loc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
.cw-loc-card{background:#fff;border-radius:14px;padding:18px 20px;border:1.5px solid var(--sec-sky-border);transition:border-color .15s,box-shadow .15s;cursor:pointer}
.cw-loc-card:hover{border-color:var(--sec-sky-accent);box-shadow:0 4px 16px rgba(2,132,199,.1)}
.cw-loc-card h4{font-size:14.5px;font-weight:700;color:var(--navy);margin-bottom:4px}
.cw-loc-card p{font-size:12.5px;color:var(--text-2)}
.cw-loc-tag{font-size:11px;font-weight:600;padding:2px 8px;border-radius:99px;background:var(--sec-sky-light);color:var(--sec-sky-accent);margin-top:8px;display:inline-block}

.cw-faq-sec{padding:88px 0;background:var(--sec-orange-bg)}
.cw-faq-list{max-width:720px;margin:48px auto 0}
.cw-faq-item{border-bottom:1px solid var(--sec-orange-border)}
.cw-faq-q{width:100%;padding:20px 0;cursor:pointer;background:none;border:0;text-align:left;font-family:var(--font);font-size:16px;font-weight:600;color:var(--navy);display:flex;justify-content:space-between;align-items:center;gap:16px}
.cw-faq-q svg{width:20px;height:20px;stroke:var(--sec-orange-accent);fill:none;stroke-width:2.5;flex:none;transition:transform .25s}
.cw-faq-q.open svg{transform:rotate(45deg)}
.cw-faq-a{font-size:14.5px;color:var(--text-2);line-height:1.7;overflow:hidden;max-height:0;transition:max-height .35s}
.cw-faq-a-in{padding-bottom:20px}

.cw-cta-fin{padding:88px 0;background:var(--sec-teal-bg)}

@media(max-width:900px){.cw-hero-grid,.cw-seat-grid,.cw-spaces-grid,.cw-amen-grid,.cw-loc-grid{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.cw-seat-grid,.cw-spaces-grid,.cw-amen-grid,.cw-loc-grid{grid-template-columns:1fr}.cw-hero-grid{grid-template-columns:1fr}}
`

const CHECK = 'M20 6 9 17l-5-5'
const ARROW = 'M5 12h14M12 5l7 7-7 7'
const PLUS  = 'M12 5v14M5 12h14'

const SEAT_PLANS = [
  {
    title:'Hot Desk', price:'₹5,999', per:'/month', desc:'A flexible desk in our open co-working area. No fixed seat — ideal for freelancers and remote workers.',
    includes:['Access to open workspace','High-speed Wi-Fi','Unlimited coffee & tea','Printing (50 pages/mo)','Community events'],
    popular: false,
    icon:'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  },
  {
    title:'Dedicated Desk', price:'₹8,999', per:'/month', desc:'Your own fixed desk, always available. Store your things and personalise your space — your second office.',
    includes:['Fixed dedicated desk','Lockable storage pedestal','High-speed Wi-Fi','Unlimited coffee & tea','Meeting room credits (5 hrs/mo)','Printing (100 pages/mo)'],
    popular: true,
    icon:'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6',
  },
  {
    title:'Private Cabin', price:'₹22,999', per:'/month', desc:'A fully enclosed private cabin for your team of 2–6. The privacy of an office with all co-working amenities.',
    includes:['Enclosed private cabin','2–6 seats','Dedicated high-speed internet','Meeting room credits (10 hrs/mo)','Unlimited coffee & tea','Printing (200 pages/mo)','Reception & mail handling'],
    popular: false,
    icon:'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z',
  },
]

const SPACE_TYPES = [
  {
    icon:'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2', title:'Open Co-working Area', desc:'Energetic shared workspace perfect for focused individual work alongside a community of professionals.',
    items:['Hot desks & dedicated desks','Community bulletin board','Daily and monthly passes','Networking with fellow members'],
    from:'From ₹299/day',
  },
  {
    icon:'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z', title:'Private Office Cabins', desc:'Fully enclosed, lockable cabin offices for teams of 2–10. All the benefits of co-working, with privacy.',
    items:['Enclosed lockable office','Custom branding allowed','Dedicated internet line','Available furnished'],
    from:'From ₹22,999/month',
  },
  {
    icon:'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title:'Meeting Rooms', desc:'Professional meeting rooms bookable by the hour. AV equipment, whiteboard and video call setup included.',
    items:['HD display & projector','Video conferencing setup','Whiteboard & stationery','Tea/coffee for guests'],
    from:'From ₹499/hour',
  },
  {
    icon:'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', title:'Event & Training Space', desc:'Configurable hall for workshops, training sessions, team offsites and corporate events.',
    items:['Capacity up to 40 pax','AV & projection setup','Configurable layout','Catering coordination'],
    from:'From ₹2,999/half-day',
  },
]

const AMENITIES = [
  { icon:'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0', title:'High-Speed Wi-Fi', desc:'Dedicated fibre line, 200Mbps+ uplink' },
  { icon:'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18', title:'Meeting Rooms', desc:'Bookable rooms with AV equipment' },
  { icon:'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title:'Community Events', desc:'Networking, workshops & socials' },
  { icon:'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z', title:'Printing & Scanning', desc:'Colour printing & document scanning' },
  { icon:'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title:'24/7 Access', desc:'Round-the-clock keycard access' },
  { icon:'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', title:'Reception & Mail', desc:'Dedicated reception & mail handling' },
  { icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title:'Business Address', desc:'Official business address & GST use' },
  { icon:'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3', title:'Pantry & Beverages', desc:'Unlimited tea, coffee & filtered water' },
]

const LOCATIONS = [
  {name:'Koramangala',sub:'Startup & tech cluster',tag:'High demand'},
  {name:'Indiranagar',sub:'Vibrant work culture',tag:'Premium'},
  {name:'HSR Layout',sub:'Growing startup zone',tag:'Affordable'},
  {name:'MG Road',sub:'Central business district',tag:'CBD'},
  {name:'JP Nagar',sub:'South Bangalore hub',tag:'Value'},
  {name:'Marathahalli',sub:'IT corridor',tag:'IT hub'},
  {name:'Malleshwaram',sub:'North core location',tag:'North BLR'},
  {name:'Electronic City',sub:'Tech company zone',tag:'Enterprise'},
]

const FAQS = [
  {q:'What is a co-working space?',a:'A co-working space is a shared professional workspace where individuals and teams from different companies work in the same environment. You pay for a desk or cabin — not an entire office — and share amenities like meeting rooms, reception, pantry and high-speed internet.'},
  {q:'Who is co-working suitable for?',a:'Co-working is ideal for freelancers, remote workers, startups, small teams, consultants, and companies that want a professional office without the overhead of a dedicated lease.'},
  {q:'Can I use the address for GST and company registration?',a:'Yes. Our co-working address can be used as your registered business address for GST registration, ROC filings and bank accounts.'},
  {q:'Is there a deposit required?',a:'Most plans require a refundable security deposit of 1–2 months. This is fully refunded when you exit the space.'},
  {q:'Can I bring my team to a co-working space?',a:'Absolutely. Our private cabin options are designed for teams of 2–10 people, giving you the privacy of a dedicated office with all co-working amenities included.'},
  {q:'What is included in the monthly plan?',a:'Plans include your desk/cabin, high-speed Wi-Fi, unlimited tea and coffee, meeting room credits, printing allowance, 24/7 access and community events. Details vary by plan.'},
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="cw-faq-item">
      <button className={`cw-faq-q${open?' open':''}`} onClick={() => setOpen(o => !o)}>
        {q}<svg viewBox="0 0 24 24"><path d={PLUS}/></svg>
      </button>
      <div className="cw-faq-a" style={{maxHeight: open ? 300 : 0}}>
        <div className="cw-faq-a-in">{a}</div>
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
              <div className="cw-eyebrow">Co-working Space · Bangalore</div>
              <h1>Work from a space that <span>works for you.</span></h1>
              <p className="cw-hero-desc">Hot desks, dedicated desks and private cabins in prime Bangalore locations. Daily, monthly and team plans available. No long leases required.</p>
              <div className="cw-cta-row">
                <a href="#plans" className="cw-btn-primary">View Plans <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}><path d={ARROW}/></svg></a>
                <a href="/company/contact" className="cw-btn-outline">Book a Tour</a>
              </div>
              <div className="cw-badges">
                {['Prime locations','Daily & monthly plans','Business address included','Fully amenitised'].map(b => (
                  <div key={b} className="cw-badge"><svg viewBox="0 0 24 24"><path d={CHECK}/></svg>{b}</div>
                ))}
              </div>
            </div>
            <div className="reveal-up in">
              <div className="cw-pricing-card">
                <h3>Co-working plans at a glance</h3>
                <div className="cw-plan-grid">
                  {[
                    {name:'Day Pass',price:'₹299/day',hint:'Walk in anytime'},
                    {name:'Hot Desk (Monthly)',price:'₹5,999/mo',hint:'Flexible open seating'},
                    {name:'Dedicated Desk',price:'₹8,999/mo',hint:'Your own fixed desk'},
                    {name:'Private Cabin (2 seats)',price:'₹22,999/mo',hint:'Enclosed team office'},
                    {name:'Meeting Room',price:'₹499/hr',hint:'Bookable by the hour'},
                  ].map(p => (
                    <div key={p.name} className="cw-plan-row">
                      <div><div className="cw-plan-name">{p.name}</div><div className="cw-plan-hint">{p.hint}</div></div>
                      <div className="cw-plan-price">{p.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP PLANS */}
      <section className="cw-seats" id="plans">
        <div className="cw-inner">
          <span className="cw-sec-label">Membership Plans</span>
          <h2 className="cw-sec-h2">Pick the right plan for you</h2>
          <p className="cw-sec-p">Flexible co-working plans from a single desk to a private team cabin. All plans include amenities, Wi-Fi and community access.</p>
          <div className="cw-seat-grid">
            {SEAT_PLANS.map(p => (
              <div key={p.title} className={`cw-seat-card${p.popular?' popular':''} reveal-up`}>
                <div className="cw-seat-ic"><svg viewBox="0 0 24 24"><path d={p.icon}/></svg></div>
                <h3>{p.title}</h3>
                <div className="cw-seat-price">{p.price}<span> {p.per}</span></div>
                <p>{p.desc}</p>
                <div className="cw-seat-inc">
                  {p.includes.map(i => (
                    <div key={i} className="cw-seat-inc-item"><svg viewBox="0 0 24 24"><path d={CHECK}/></svg>{i}</div>
                  ))}
                </div>
                <a href="/company/contact" className="cw-seat-cta">Get Started →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPACE TYPES */}
      <section className="cw-spaces">
        <div className="cw-inner">
          <span className="cw-sec-label" style={{color:'var(--sec-purple-accent)'}}>Space Types</span>
          <h2 className="cw-sec-h2">What's available at our co-working centres</h2>
          <p className="cw-sec-p">From open hot desks to private meeting rooms — every type of workspace in one building.</p>
          <div className="cw-spaces-grid">
            {SPACE_TYPES.map(s => (
              <div key={s.title} className="cw-space-card reveal-up">
                <div className="cw-space-head">
                  <div className="cw-space-ic"><svg viewBox="0 0 24 24"><path d={s.icon}/></svg></div>
                  <div><h3>{s.title}</h3><p>{s.desc}</p></div>
                </div>
                <div className="cw-space-list">
                  {s.items.map(i => (
                    <div key={i} className="cw-space-item"><svg viewBox="0 0 24 24"><path d={CHECK}/></svg>{i}</div>
                  ))}
                </div>
                <div className="cw-space-from">{s.from}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="cw-amenities">
        <div className="cw-inner">
          <div className="sec-head center reveal-up" style={{marginBottom:0}}>
            <span className="eyebrow" style={{color:'var(--sec-amber-accent)'}}>Amenities</span>
            <h2 style={{marginTop:10}}>Everything included, always</h2>
            <p>All co-working plans include access to our full amenity stack — no hidden extras.</p>
          </div>
          <div className="cw-amen-grid">
            {AMENITIES.map(a => (
              <div key={a.title} className="cw-amen-card reveal-up">
                <div className="cw-amen-ic"><svg viewBox="0 0 24 24"><path d={a.icon}/></svg></div>
                <h4>{a.title}</h4><p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="cw-locs">
        <div className="cw-inner">
          <div className="sec-head center reveal-up" style={{marginBottom:0}}>
            <span className="eyebrow" style={{color:'var(--sec-sky-accent)'}}>Locations</span>
            <h2 style={{marginTop:10}}>Co-working centres across Bangalore</h2>
            <p>Prime locations across Bangalore's top business districts — close to metro, cafes and amenities.</p>
          </div>
          <div className="cw-loc-grid">
            {LOCATIONS.map(l => (
              <div key={l.name} className="cw-loc-card reveal-up">
                <h4>{l.name}</h4><p>{l.sub}</p>
                <span className="cw-loc-tag">{l.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="cw-faq-sec">
        <div className="cw-inner">
          <div className="sec-head center reveal-up"><span className="eyebrow" style={{color:'var(--sec-orange-accent)'}}>FAQ</span><h2 style={{marginTop:10}}>Common questions</h2></div>
          <div className="cw-faq-list">{FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
        </div>
      </section>

      {/* CTA */}
      <section className="cw-cta-fin">
        <div className="cw-inner">
          <div className="final reveal-up">
            <h2>Ready to work from a great space?</h2>
            <p>Book a free tour of our co-working centre — walk in, see the space, pick your desk.</p>
            <div className="row">
              <a href="/company/contact" className="btn btn-light">Book a Free Tour</a>
              <a href={`https://wa.me/918548854859?text=Hi, I'm interested in co-working space in Bangalore`} className="btn btn-ghost-d" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}