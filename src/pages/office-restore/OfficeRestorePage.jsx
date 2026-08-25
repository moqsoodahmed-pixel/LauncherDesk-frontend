import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL || 'https://launcherdesk-backend-production.up.railway.app/api'

const imgChair        = '/product-ergonomic-chair.jpg'
const imgNormalTable  = '/product-normal-table.jpg'
const imgElectricTable = '/product-electric-table.jpg'

const CHEV = 'm9 18 6-6-6-6'
const ARROW = 'M5 12h14M13 6l6 6-6 6'
const CHECK = 'M9 11l3 3L22 4'
const SEND = 'M22 2 11 13M22 2l-7 20-4-9-9-4z'

const orStyles = `
.or-hero{padding:64px 0 56px;position:relative;overflow:hidden;background:linear-gradient(160deg,#080F1E 0%,#0D1F3C 60%,#162B52 100%)}
.or-hero::before{content:"";position:absolute;inset:0;background:radial-gradient(900px 500px at 80% -10%,rgba(59,143,239,.28),transparent 60%),radial-gradient(400px 300px at 10% 100%,rgba(15,82,192,.22),transparent 60%);pointer-events:none}
.or-hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:center;position:relative}
.or-eyebrow{font-family:var(--font);font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#6da8e0;margin-bottom:14px}
.or-hero h1{font-size:clamp(36px,4.8vw,62px);font-weight:800;letter-spacing:-.03em;line-height:1.04;color:#fff;margin-bottom:20px}
.or-hero h1 span{background:linear-gradient(118deg,#7ecef4,#3B8FEF);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.or-hero p{font-size:17px;color:#9ab5d4;line-height:1.7;max-width:500px;margin-bottom:32px}
.or-hero-badges{display:flex;gap:20px;flex-wrap:wrap;margin-top:28px}
.or-badge{display:flex;align-items:center;gap:9px;font-size:13px;color:#6da8e0}
.or-badge svg{width:16px;height:16px;stroke:#3B8FEF;fill:none;stroke-width:2;flex:none}
.or-hero-visual-inner{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:28px;box-shadow:0 40px 80px -20px rgba(0,0,0,.4)}
.or-stat-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:rgba(255,255,255,.08);border-radius:12px;overflow:hidden;margin-bottom:20px}
.or-stat{background:#0A1A30;padding:16px;text-align:center}
.or-stat .n{font-family:var(--font);font-weight:800;font-size:26px;color:#fff;letter-spacing:-.02em}
.or-stat .l{font-size:11px;color:#5e7fa0;margin-top:2px;text-transform:uppercase;letter-spacing:.06em}
.or-mini-items{display:flex;flex-direction:column;gap:8px}
.or-mini-item{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.05);border-radius:10px;padding:10px 14px}
.or-mini-ic{width:32px;height:32px;border-radius:8px;background:rgba(36,154,226,.2);display:grid;place-items:center;flex:none}
.or-mini-ic svg{width:16px;height:16px;stroke:#6da8e0;fill:none;stroke-width:2}
.or-mini-txt b{font-family:var(--font);font-size:13.5px;color:#e4eef9;display:block;font-weight:600}
.or-mini-txt span{font-size:11.5px;color:#5e7fa0}
.or-cat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.or-cat{background:#fff;border-radius:18px;border:1px solid var(--line);overflow:hidden;transition:transform .2s,box-shadow .2s}
.or-cat:hover{transform:translateY(-4px);box-shadow:var(--sh)}
.or-cat-vis{height:180px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.or-cat-label{position:absolute;top:12px;left:12px;font-family:var(--font);font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;background:#fff;color:var(--blue-dark);padding:4px 10px;border-radius:99px}
.or-cat-body{padding:22px}
.or-cat-body h3{font-size:18px;margin-bottom:6px}
.or-cat-body p{font-size:13.5px;color:var(--text-2);line-height:1.6;margin-bottom:14px}
.or-cat-specs{display:flex;flex-direction:column;gap:5px}
.or-cat-spec{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:var(--navy)}
.or-cat-spec svg{width:14px;height:14px;stroke:var(--success);fill:none;stroke-width:2.5;flex:none;margin-top:2px}
.or-planner-wrap{display:grid;grid-template-columns:1.1fr .9fr;gap:32px;align-items:start}
.or-form-card{background:#fff;border-radius:20px;padding:32px;box-shadow:var(--sh)}
.or-form-card h3{font-size:22px;margin-bottom:6px}
.or-form-card .sub{font-size:14px;color:var(--text-2);margin-bottom:26px}
.or-field{margin-bottom:20px}
.or-field label{font-family:var(--font);font-weight:600;font-size:13px;color:var(--navy);display:block;margin-bottom:9px}
.or-field label .req{color:var(--blue-dark);margin-left:2px}
.or-select-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.or-sel-btn{border:1.5px solid var(--line);background:var(--bg);border-radius:10px;padding:10px 6px;text-align:center;cursor:pointer;font-family:var(--font);font-weight:600;font-size:13px;color:var(--navy);transition:.14s;line-height:1.2;width:100%}
.or-sel-btn:hover{border-color:var(--blue-bright);background:#fff;color:var(--blue-dark)}
.or-sel-btn.on{border-color:var(--blue);background:rgba(4,125,204,.06);color:var(--blue-dark)}
.or-input{width:100%;height:48px;border:1.5px solid var(--line);border-radius:11px;padding:0 14px;font-family:var(--font-body);font-size:14.5px;color:var(--text);outline:none;background:var(--bg);transition:.15s}
.or-input:focus{border-color:var(--blue-bright);background:#fff;box-shadow:0 0 0 3px rgba(36,154,226,.13)}
.or-check-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.or-check{display:flex;align-items:center;gap:9px;padding:10px 12px;border:1.5px solid var(--line);border-radius:10px;cursor:pointer;transition:.14s;background:var(--bg)}
.or-check:hover{border-color:var(--blue-bright);background:#fff}
.or-check.on{border-color:var(--blue);background:rgba(4,125,204,.06)}
.or-check-box{width:18px;height:18px;border-radius:5px;border:1.5px solid var(--line);display:grid;place-items:center;flex:none;transition:.14s;background:#fff}
.or-check.on .or-check-box{background:var(--blue);border-color:var(--blue)}
.or-check-box svg{width:11px;height:11px;stroke:#fff;fill:none;stroke-width:3}
.or-check span:last-child{font-family:var(--font);font-size:13px;font-weight:500;color:var(--navy)}
.or-contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.or-wa-consent{display:flex;align-items:flex-start;gap:11px;padding:14px;background:rgba(31,170,89,.06);border:1px solid rgba(31,170,89,.2);border-radius:12px;margin-top:6px}
.or-wa-consent input[type=checkbox]{width:17px;height:17px;accent-color:#1faa59;flex:none;margin-top:2px;cursor:pointer}
.or-wa-consent label{font-size:13px;color:var(--text-2);line-height:1.5;cursor:pointer}
.or-submit{width:100%;margin-top:22px}
.or-submit-disc{text-align:center;font-size:12px;color:var(--text-3);margin-top:10px}
.or-summary{background:linear-gradient(165deg,#0D1F3C,#080F1E);border-radius:20px;padding:28px;position:sticky;top:90px;color:#fff}
.or-summary h4{font-size:17px;color:#fff;margin-bottom:6px}
.or-summary .sub{font-size:13px;color:#7494b8;margin-bottom:24px}
.or-sum-row{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid rgba(255,255,255,.07)}
.or-sum-row:last-of-type{border-bottom:0}
.or-sum-row .k{font-size:13px;color:#6da8e0}
.or-sum-row .v{font-family:var(--font);font-weight:700;font-size:14px;color:#fff}
.or-sum-row .v.dim{color:#3d618a;font-weight:500;font-size:13px}
.or-quote-box{background:rgba(29,111,224,.12);border:1px solid rgba(29,111,224,.25);border-radius:14px;padding:18px;margin-top:20px}
.or-quote-box .ql{font-size:12px;color:#6da8e0;text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-bottom:4px}
.or-quote-box .qv{font-family:var(--font);font-weight:800;font-size:22px;color:#3B8FEF}
.or-quote-box .qd{font-size:11.5px;color:#5e7fa0;margin-top:8px;line-height:1.5}
.or-trust-pills{display:flex;gap:7px;margin-top:18px;flex-wrap:wrap}
.or-trust-pill{font-family:var(--font);font-size:11px;font-weight:600;padding:5px 10px;border-radius:99px;background:rgba(255,255,255,.07);color:#7494b8}
.or-flow{display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative}
.or-flow::before{content:"";position:absolute;top:28px;left:calc(12.5%);right:calc(12.5%);height:2px;background:linear-gradient(90deg,var(--blue),var(--blue-bright));opacity:.3;z-index:0}
.or-step{text-align:center;padding:0 16px;position:relative;z-index:1}
.or-step-num{width:56px;height:56px;border-radius:50%;background:var(--grad);color:#fff;display:grid;place-items:center;margin:0 auto 18px;font-family:var(--font);font-weight:800;font-size:20px;box-shadow:var(--sh-blue)}
.or-step h4{font-size:17px;margin-bottom:8px}
.or-step p{font-size:13.5px;color:var(--text-2);line-height:1.6}
.or-success{text-align:center;padding:48px 24px}
.or-success-ic{width:72px;height:72px;border-radius:50%;background:rgba(14,159,110,.12);display:grid;place-items:center;margin:0 auto 20px}
.or-success-ic svg{width:36px;height:36px;stroke:var(--success);fill:none;stroke-width:2}
@media(max-width:960px){
  .or-hero-grid,.or-planner-wrap{grid-template-columns:1fr;gap:28px}
  .or-cat-grid{grid-template-columns:1fr 1fr}
  .or-flow{grid-template-columns:1fr 1fr;gap:28px}
  .or-flow::before{display:none}
  .or-summary{position:static}
  .or-hero h1{font-size:clamp(28px,5vw,48px)}
  .or-hero p{font-size:16px}
}
@media(max-width:768px){
  .or-hero{padding:48px 0 40px}
  .or-hero-visual-inner{padding:20px}
  .or-stat-row{border-radius:10px}
  .or-form-card{padding:22px}
  .or-summary{padding:20px}
}
@media(max-width:600px){
  .or-cat-grid{grid-template-columns:1fr}
  .or-select-grid{grid-template-columns:repeat(2,1fr)}
  .or-check-grid{grid-template-columns:1fr}
  .or-contact-grid{grid-template-columns:1fr}
  .or-flow{grid-template-columns:1fr}
  .or-cat-vis{height:140px}
  .or-hero-badges{gap:12px}
  .or-badge{font-size:12px}
  .or-trust-pills{gap:6px}
}
@media(max-width:400px){
  .or-select-grid{grid-template-columns:1fr 1fr}
  .or-stat-row{grid-template-columns:1fr 1fr}
  .or-step-num{width:44px;height:44px;font-size:16px}
}
`

const WS_OPTS  = ['10','20','30','50','75','100']
const CH_OPTS  = ['10','20','30','50','75','100']
const TL_OPTS  = ['2 weeks','3 weeks','4 weeks','6+ weeks']
const DELIVERABLES = ['Floor Mats / Carpet Tiles','Mobile Drawer Pedestals','Cupboards & Cabinets','Conference Table','Reception Desk','Partitions']
const STATES = ['Andhra Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','Uttarakhand','West Bengal','Other']

const CATS = [
  { label:'Seating', img: null, imgKey:'chair', title:'Ergonomic High-Back Office Chair', desc:'Premium high-back mesh office chair with adjustable headrest, lumbar support and pneumatic height adjustment. Designed for all-day comfort in professional work environments.', specs:['Ergonomic mesh back & headrest','Adjustable height & tilt mechanism','3D adjustable armrests','5-star caster base'] },
  { label:'Workstations', img: null, imgKey:'normal', title:'Standard Office Workstation Table', desc:'Clean, minimal white office table with a durable pre-laminated board surface and powder-coated metal frame. Ideal for individual workstations and compact office setups.', specs:['Durable pre-lam white board top','Powder-coated metal frame','Modular, easy to configure','Available in multiple sizes'] },
  { label:'Height-Adjust', img: null, imgKey:'electric', title:'Electric Height-Adjustable Standing Desk', desc:'Motorised sit-stand desk with a digital control panel. Effortlessly adjusts from sitting to standing height to promote better posture and wellbeing throughout the workday.', specs:['Electric motor with digital control','Memory presets for height positions','Wide white surface top','Anti-collision safety system'] },
]

const FAQS = [
  { q:'Do you design space layout maps before ordering?', a:'Yes. Once you submit your initial inquiry, our architecture and design team creates a custom 2D layout option based on your office space coordinates — free of charge, before any commitment. You\'ll receive a minimum of 2–3 layout options to choose from.' },
  { q:'Can we request custom sizes and colours?', a:'Absolutely. All furniture is manufactured to order. You can specify exact dimensions, laminate finishes, fabric colours, metal powder-coat shades, and panel configurations to match your brand identity or interior design brief.' },
  { q:'Do you offer installation and setup?', a:'Yes — end-to-end. Our trained installation crew handles unloading, assembly, cable management and final placement. We also dispose of all packaging material, leaving your office clean and ready to use.' },
  { q:'What areas do you cover for setup?', a:'We cover all major metropolitan areas and Tier 2 cities across India, including Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Pune, Ahmedabad, Kolkata, and more. For other locations, contact us and we\'ll arrange logistics.' },
]

function SelBtn({ value, selected, onClick, children }) {
  return <button className={`or-sel-btn${selected ? ' on' : ''}`} onClick={() => onClick(value)}>{children}</button>
}

function CheckItem({ value, checked, onChange }) {
  return (
    <label className={`or-check${checked ? ' on' : ''}`} onClick={() => onChange(value, !checked)}>
      <span className="or-check-box">
        {checked && <svg viewBox="0 0 24 24"><path d={CHECK}/></svg>}
      </span>
      <span>{value}</span>
    </label>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-i">
      <button className={`faq-q${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
        {q}
        <svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14"/></svg>
      </button>
      <div className="faq-a" style={{ maxHeight: open ? 300 : 0, overflow: 'hidden', transition: 'max-height .35s' }}>
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function OfficeRestorePage() {
  const [ws,          setWs]          = useState(null)
  const [ch,          setCh]          = useState(null)
  const [state,       setState]       = useState('')
  const [timeline,    setTimeline]    = useState(null)
  const [extras,      setExtras]      = useState([])
  const [lookingFor,  setLookingFor]  = useState('')
  const [name,        setName]        = useState('')
  const [email,       setEmail]       = useState('')
  const [mobile,      setMobile]      = useState('')
  const [company,     setCompany]     = useState('')
  const [waConsent,   setWaConsent]   = useState(true)
  const [submitted,   setSubmitted]   = useState(false)
  const [error,       setError]       = useState('')
  const [saving,      setSaving]      = useState(false)

  useEffect(() => { document.title = 'Office Setup — Furniture & Workspace Solutions · LauncherDesk' }, [])

  function toggleExtra(val, checked) {
    setExtras(prev => checked ? [...prev, val] : prev.filter(e => e !== val))
  }

  async function handleSubmit() {
    if (!lookingFor)   return setError('Please select what you are looking for.')
    if (!ws)           return setError('Please select the number of workstations needed.')
    if (!ch)           return setError('Please select the number of ergonomic chairs needed.')
    if (!state)        return setError('Please select your delivery state.')
    if (!timeline)     return setError('Please select your setup timeline.')
    if (!name.trim())  return setError('Please enter your contact name.')
    if (!email.trim()) return setError('Please enter your corporate email.')
    if (!mobile.trim())return setError('Please enter your mobile number.')
    setError('')
    setSaving(true)
    try {
      const message = [
        `Looking for: ${lookingFor}`,
        `Workstations: ${ws}`,
        `Chairs: ${ch}`,
        `State: ${state}`,
        `Timeline: ${timeline}`,
        extras.length ? `Extras: ${extras.join(', ')}` : '',
        company ? `Company: ${company}` : '',
      ].filter(Boolean).join(' | ')

      const res = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, mobile, state,
          message,
          source:  'office-setup',
          service: `Office Setup — ${lookingFor}`,
          whatsappOptin: waConsent,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Submission failed')
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <style>{orStyles}</style>

      {/* HERO */}
      <section className="or-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in" style={{ marginBottom: 28 }}>
            <a href="/" style={{ color: '#5e7fa0' }}>Home</a>
            <svg viewBox="0 0 24 24" style={{ stroke: '#3d618a' }}><path d={CHEV}/></svg>
            <span className="cur" style={{ color: '#9ab5d4' }}>Office Setup</span>
          </nav>
          <div className="or-hero-grid">
            <div className="reveal-up in">
              <div className="or-eyebrow">Office Setup · Furniture &amp; Workspace Solutions</div>
              <h1>Design a workspace that <span>works for your business.</span></h1>
              <p>From workstations and ergonomic seating to storage and complete office setup — tell us what you need and we'll turn it into a practical, professional workspace plan, delivered and installed at your site.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#planner" className="btn btn-primary">
                  Get a Free Design Layout &amp; Quote
                  <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={ARROW}/></svg>
                </a>
                <a href="/company/contact" className="btn btn-ghost-d">
                  <svg className="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/></svg>
                  WhatsApp Layout
                </a>
              </div>
              <div className="or-hero-badges">
                <div className="or-badge"><svg viewBox="0 0 24 24"><path d={CHECK}/></svg>100% Customised to your layout plans</div>
                <div className="or-badge"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Delivered &amp; set up on-site</div>
                <div className="or-badge"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>Free space layout design</div>
              </div>
            </div>
            <div className="reveal-up in">
              <div className="or-hero-visual-inner">
                <div className="or-stat-row">
                  <div className="or-stat"><div className="n">15+</div><div className="l">Projects</div></div>
                  <div className="or-stat"><div className="n">20+</div><div className="l">States</div></div>
                  <div className="or-stat"><div className="n">Free</div><div className="l">Layout</div></div>
                </div>
                <div className="or-mini-items">
                  {[
                    { icon: 'M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6M4 11h16M6 11v7h12v-7M9 18v3M15 18v3', title: 'Workstations & Seating', sub: 'Ergonomic, durable, pro-grade' },
                    { icon: 'M3 21h18M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14M9 21v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4', title: 'Storage & Cabinets', sub: 'Heavy-duty, custom configurations' },
                    { icon: 'M3 3h18v18H3zM9 3v18M3 9h6M3 15h6', title: 'Conference & Reception', sub: 'Lobby to boardroom, complete' },
                    { icon: 'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.5M22 12A10 10 0 0 0 12 2v10z', title: 'Floor Mats & Partitions', sub: 'Carpet tiles, dividers, full setup' },
                  ].map(item => (
                    <div key={item.title} className="or-mini-item">
                      <div className="or-mini-ic"><svg viewBox="0 0 24 24"><path d={item.icon}/></svg></div>
                      <div className="or-mini-txt"><b>{item.title}</b><span>{item.sub}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE */}
      <section className="section-sm">
        <div className="wrap">
          <div className="sec-head center reveal-up" style={{ marginBottom: 36 }}>
            <span className="eyebrow">Product Catalogue</span>
            <h2 style={{ fontSize: 'clamp(26px,3.2vw,40px)', marginTop: 10 }}>Our furniture range — manufactured &amp; installed</h2>
            <p>Three core products, custom-built and delivered to your office.</p>
          </div>
          <div className="or-cat-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {CATS.map(cat => {
              const imgSrc = cat.imgKey==='chair'?imgChair:cat.imgKey==='normal'?imgNormalTable:imgElectricTable
              return (
              <div key={cat.title} className="or-cat reveal-up" style={{ overflow:'hidden', background:'#fff', border:'1.5px solid var(--line)' }}>
                <div style={{ width:'100%', height:220, overflow:'hidden', background:'#f8fafc', position:'relative' }}>
                  <img src={imgSrc} alt={cat.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform .35s' }}
                    onMouseEnter={e=>e.target.style.transform='scale(1.04)'}
                    onMouseLeave={e=>e.target.style.transform='scale(1)'} />
                  <span style={{ position:'absolute', top:12, left:12, background:'var(--blue)', color:'#fff', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:99, letterSpacing:'.04em' }}>{cat.label}</span>
                </div>
                <div className="or-cat-body">
                  <h3>{cat.title}</h3>
                  <p>{cat.desc}</p>
                  <div className="or-cat-specs">
                    {cat.specs.map(s => (
                      <div key={s} className="or-cat-spec">
                        <svg viewBox="0 0 24 24"><path d={CHECK}/></svg>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* PLANNER */}
      <section className="section section-warm" id="planner">
        <div className="wrap">
          <div className="sec-head reveal-up" style={{ marginBottom: 32 }}>
            <span className="eyebrow">Workspace Planner</span>
            <h2 style={{ fontSize: 'clamp(26px,3.2vw,40px)', marginTop: 10 }}>Configure your office layout</h2>
            <p>Select the required furniture components. Our spatial design team will reach out with layout proposals.</p>
          </div>
          <div className="or-planner-wrap">
            {/* Form */}
            <div className="or-form-card">
              {submitted ? (
                <div className="or-success">
                  <div className="or-success-ic">
                    <svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                  </div>
                  <h3>Layout request submitted!</h3>
                  <p style={{ color: 'var(--text-2)', marginTop: 10, maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>Our workspace design team will review your requirements and send you a layout proposal within 1–2 business days.</p>
                  <a href="/company/contact" className="btn btn-soft" style={{ marginTop: 22, display: 'inline-flex' }}>Contact us directly</a>
                </div>
              ) : (
                <>
                  <div className="or-field">
                    <label>Looking for <span className="req">*</span></label>
                    <select className="or-input" value={lookingFor} onChange={e => setLookingFor(e.target.value)}>
                      <option value="">Select category</option>
                      <option value="Office Furniture & Interior">Office Furniture &amp; Interior</option>
                      <option value="Co-working Space">Co-working Space</option>
                      <option value="Individual Office">Individual Office</option>
                    </select>
                  </div>
                  <div className="or-field">
                    <label>Workstations Needed <span className="req">*</span></label>
                    <div className="or-select-grid">
                      {WS_OPTS.map(v => <SelBtn key={v} value={v} selected={ws === v} onClick={setWs}>{v} Seats</SelBtn>)}
                    </div>
                  </div>
                  <div className="or-field">
                    <label>Ergonomic Chairs Needed <span className="req">*</span></label>
                    <div className="or-select-grid">
                      {CH_OPTS.map(v => <SelBtn key={v} value={v} selected={ch === v} onClick={setCh}>{v} Chairs</SelBtn>)}
                    </div>
                  </div>
                  <div className="or-field">
                    <label>Delivery State / Location <span className="req">*</span></label>
                    <select className="or-input" value={state} onChange={e => setState(e.target.value)}>
                      <option value="">Select State</option>
                      {STATES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="or-field">
                    <label>Setup Timeline <span className="req">*</span></label>
                    <div className="or-select-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
                      {TL_OPTS.map(v => <SelBtn key={v} value={v} selected={timeline === v} onClick={setTimeline}>{v}</SelBtn>)}
                    </div>
                  </div>
                  <div className="or-field">
                    <label>Additional Elements</label>
                    <div className="or-check-grid">
                      {DELIVERABLES.map(d => (
                        <CheckItem key={d} value={d} checked={extras.includes(d)} onChange={toggleExtra} />
                      ))}
                    </div>
                  </div>
                  <div className="or-field">
                    <label>Your Delivery &amp; Contact Details</label>
                    <div className="or-contact-grid">
                      <input className="or-input" type="text"  placeholder="Contact Name"   value={name}    onChange={e => setName(e.target.value)} />
                      <input className="or-input" type="email" placeholder="Corporate Email" value={email}   onChange={e => setEmail(e.target.value)} />
                      <input className="or-input" type="tel"   placeholder="Mobile Number"  value={mobile}  onChange={e => setMobile(e.target.value)} />
                      <input className="or-input" type="text"  placeholder="Company Name"   value={company} onChange={e => setCompany(e.target.value)} />
                    </div>
                  </div>
                  <div className="or-wa-consent">
                    <input type="checkbox" id="orWA" checked={waConsent} onChange={e => setWaConsent(e.target.checked)} />
                    <label htmlFor="orWA">I agree to receive space planning updates and layout proposals on WhatsApp from LauncherDesk Office Setup.</label>
                  </div>
                  {error && <p style={{ color: 'var(--error, #e53e3e)', fontSize: 13, marginTop: 10 }}>{error}</p>}
                  <button className="btn btn-primary or-submit" onClick={handleSubmit} disabled={saving}>
                    {saving ? 'Submitting…' : 'Submit Layout Request'}
                    {!saving && <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={SEND}/></svg>}
                  </button>
                  <div className="or-submit-disc">Free consultation · No payment required to submit</div>
                </>
              )}
            </div>

            {/* Summary panel */}
            <div className="or-summary">
              <h4>Workspace Configuration</h4>
              <div className="sub">Live summary based on your selections</div>
              <div className="or-sum-row"><span className="k">Looking for</span><span className={`v${lookingFor ? '' : ' dim'}`}>{lookingFor || 'Not selected'}</span></div>
              <div className="or-sum-row"><span className="k">Workstations</span><span className="v">{ws ? `${ws} Seats` : '—'}</span></div>
              <div className="or-sum-row"><span className="k">Ergonomic Chairs</span><span className="v">{ch ? `${ch} Chairs` : '—'}</span></div>
              <div className="or-sum-row"><span className="k">Other Elements</span><span className="v">{extras.length ? extras.join(', ') : 'None selected'}</span></div>
              <div className="or-sum-row"><span className="k">State / Location</span><span className={`v${state ? '' : ' dim'}`}>{state || 'Not selected'}</span></div>
              <div className="or-sum-row"><span className="k">Timeline</span><span className="v">{timeline || '—'}</span></div>
              <div className="or-quote-box">
                <div className="ql">Estimated Quote</div>
                <div className="qv">Custom Quote</div>
                <div className="qd">Final pricing depends on layout, material, quantities, delivery location and installation requirements.</div>
              </div>
              <div className="or-trust-pills">
                <span className="or-trust-pill">Free Design Layout</span>
                <span className="or-trust-pill">Quality Guaranteed</span>
                <span className="or-trust-pill">Pan-India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="section section-dark">
        <div className="wrap">
          <div className="sec-head center reveal-up" style={{ marginBottom: 52 }}>
            <span className="eyebrow" style={{ color: '#6da8e0' }}>Process</span>
            <h2 style={{ color: '#fff', fontSize: 'clamp(26px,3.2vw,40px)', marginTop: 10 }}>End-to-End Workflow</h2>
            <p style={{ color: '#9ab5d4' }}>How LauncherDesk manages your corporate furniture procurement and layout execution.</p>
          </div>
          <div className="or-flow">
            {[
              { n:'01', title:'Request & Consult', body:'Submit your requirements online. Our consultation team reviews and responds within 24 hours with clarifying questions and initial ideas.' },
              { n:'02', title:'Layout Design', body:'Our spatial design team creates a custom 2D layout plan based on your space coordinates — free of charge, before you commit.' },
              { n:'03', title:'Customise & Manufacture', body:'Select finishes, colours, and quantities. Manufacturing begins only after your sign-off on the layout and final pricing proposal.' },
              { n:'04', title:'Delivery & Setup', body:'LauncherDesk coordinates logistics and installation. We deliver, unpack, assemble and complete the full setup at your site.' },
            ].map(step => (
              <div key={step.n} className="or-step reveal-up">
                <div className="or-step-num">{step.n}</div>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-sm">
        <div className="wrap">
          <div className="sec-head center reveal-up" style={{ marginBottom: 36 }}>
            <span className="eyebrow">FAQ</span>
            <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', marginTop: 10 }}>Frequently Asked Questions</h2>
            <p>Common questions about our customisation, delivery and setup services.</p>
          </div>
          <div className="faq">
            {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="wrap">
          <div className="final reveal-up">
            <h2>Ready to design your workspace?</h2>
            <p>Get a free layout plan and custom quote — no commitment required.</p>
            <div className="row">
              <a href="#planner" className="btn btn-light">Get Free Layout &amp; Quote</a>
              <a href="/company/contact" className="btn btn-ghost-d">
                <svg className="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}