import { useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'https://launcherdesk-backend-production.up.railway.app/api'

const S = `
.es-hero {
  background: linear-gradient(160deg, #080F1E 0%, #0D1F3C 55%, #162B52 100%);
  padding: clamp(64px,8vw,100px) 0 clamp(52px,6vw,80px);
  position: relative; overflow: hidden;
}
.es-hero::before {
  content:'';position:absolute;inset:0;pointer-events:none;
  background: radial-gradient(700px 500px at 70% -10%,rgba(59,143,239,.22),transparent 60%),
              radial-gradient(300px 300px at 10% 100%,rgba(15,82,192,.18),transparent 60%);
}
.es-hero-inner { max-width:1100px;margin:0 auto;padding:0 28px;position:relative;z-index:1;text-align:center; }
.es-badge {
  display:inline-flex;align-items:center;gap:8px;background:rgba(29,111,224,.2);
  border:1px solid rgba(29,111,224,.4);border-radius:99px;padding:6px 16px;
  font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#7ecef4;margin-bottom:22px;
}
.es-hero h1 { font-size:clamp(34px,5vw,62px);font-weight:900;color:#fff;letter-spacing:-.04em;line-height:1.04;margin-bottom:18px; }
.es-hero h1 span { background:linear-gradient(118deg,#7ecef4,#3B8FEF);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent; }
.es-hero p { font-size:clamp(15px,1.8vw,18px);color:#9ab5d4;max-width:580px;margin:0 auto 36px;line-height:1.7; }
.es-hero-cta { display:flex;gap:14px;justify-content:center;flex-wrap:wrap; }
.es-btn-primary {
  display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 28px;
  background:#1D6FE0;color:#fff;font-weight:700;font-size:15px;border-radius:10px;
  text-decoration:none;transition:all .15s;box-shadow:0 8px 24px rgba(29,111,224,.35);border:0;cursor:pointer;font-family:inherit;
}
.es-btn-primary:hover { background:#0F52C0;transform:translateY(-2px); }
.es-btn-secondary {
  display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 24px;
  background:rgba(255,255,255,.1);color:#fff;font-weight:600;font-size:15px;border-radius:10px;
  border:1.5px solid rgba(255,255,255,.2);text-decoration:none;transition:all .15s;cursor:pointer;font-family:inherit;
}
.es-btn-secondary:hover { background:rgba(255,255,255,.18); }

/* What is E-Stamp */
.es-what { padding:80px 0;background:var(--sec-purple-bg); }
.es-inner { max-width:1100px;margin:0 auto;padding:0 28px; }
.es-section-label { font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--blue);margin-bottom:14px;display:block; }
.es-what h2 { font-size:clamp(28px,3.6vw,44px);font-weight:900;letter-spacing:-.04em;color:var(--navy);margin-bottom:16px; }
.es-what-grid { display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;margin-top:48px; }
.es-what-desc { font-size:16px;color:var(--text-2);line-height:1.75; }
.es-what-points { display:flex;flex-direction:column;gap:18px; }
.es-point {
  display:flex;gap:16px;align-items:flex-start;padding:18px 20px;
  border-radius:14px;border:1.5px solid var(--line);background:var(--bg);
}
.es-point-icon { width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#EEF2FF,#DBEAFE);display:grid;place-items:center;flex:none; }
.es-point-icon svg { width:20px;height:20px;stroke:#1D6FE0;fill:none;stroke-width:2; }
.es-point h4 { font-size:14.5px;font-weight:700;color:var(--navy);margin-bottom:3px; }
.es-point p  { font-size:13px;color:var(--text-2);line-height:1.5; }

/* Services grid */
.es-services { padding:80px 0;background:var(--sec-orange-bg); }
.es-services h2 { font-size:clamp(26px,3.4vw,42px);font-weight:900;letter-spacing:-.04em;color:var(--navy);margin-bottom:8px; }
.es-svc-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px; }
.es-svc-card {
  background:#fff;border:1.5px solid var(--line);border-radius:18px;padding:28px;
  transition:border-color .2s,box-shadow .2s,transform .2s;cursor:pointer;
}
.es-svc-card:hover { border-color:var(--blue);box-shadow:0 12px 36px rgba(29,111,224,.14);transform:translateY(-3px); }
.es-svc-icon { width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#EEF2FF,#DBEAFE);display:grid;place-items:center;margin-bottom:16px; }
.es-svc-icon svg { width:26px;height:26px;stroke:#1D6FE0;fill:none;stroke-width:2; }
.es-svc-name { font-size:17px;font-weight:800;color:var(--navy);margin-bottom:8px; }
.es-svc-desc { font-size:13.5px;color:var(--text-2);line-height:1.6;margin-bottom:14px; }
.es-svc-price { font-size:13px;font-weight:700;color:var(--blue);background:var(--bg-2);padding:4px 12px;border-radius:99px;display:inline-block; }

/* How it works */
.es-how { padding:80px 0;background:var(--sec-teal-bg); }
.es-how h2 { font-size:clamp(26px,3.4vw,42px);font-weight:900;letter-spacing:-.04em;color:var(--navy);margin-bottom:8px; }
.es-steps { display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:40px;position:relative; }
.es-steps::before { content:'';position:absolute;top:32px;left:48px;right:48px;height:2px;background:linear-gradient(90deg,var(--blue-dark),var(--blue));z-index:0; }
.es-step { text-align:center;position:relative;z-index:1; }
.es-step-num {
  width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#0F52C0,#1D6FE0);
  display:grid;place-items:center;margin:0 auto 16px;
  font-size:20px;font-weight:900;color:#fff;box-shadow:0 8px 24px rgba(29,111,224,.35);
}
.es-step h4 { font-size:15px;font-weight:800;color:var(--navy);margin-bottom:6px; }
.es-step p  { font-size:13px;color:var(--text-2);line-height:1.5; }

/* Form / CTA */
.es-form-section { padding:80px 0;background:var(--sec-amber-bg); }
.es-form-card {
  background:linear-gradient(160deg,#080F1E,#0F52C0 70%,#1D6FE0);
  border-radius:24px;padding:clamp(40px,5vw,64px);position:relative;overflow:hidden;
}
.es-form-card::before { content:'';position:absolute;inset:0;background:radial-gradient(600px 400px at 80% -20%,rgba(59,143,239,.25),transparent 60%);pointer-events:none; }
.es-form-grid { display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;position:relative; }
.es-form-left h2 { font-size:clamp(26px,3.4vw,42px);font-weight:900;color:#fff;letter-spacing:-.04em;margin-bottom:12px; }
.es-form-left p  { font-size:15px;color:rgba(255,255,255,.75);line-height:1.7;margin-bottom:24px; }
.es-contact-rows { display:flex;flex-direction:column;gap:12px; }
.es-contact-row  { display:flex;align-items:center;gap:12px;color:rgba(255,255,255,.75);font-size:14px; }
.es-contact-row svg { width:18px;height:18px;stroke:#3B8FEF;fill:none;stroke-width:2;flex:none; }
.es-form { display:flex;flex-direction:column;gap:14px; }
.es-form-field { display:flex;flex-direction:column;gap:6px; }
.es-form-label { font-size:12.5px;font-weight:600;color:rgba(255,255,255,.7); }
.es-form-input {
  height:46px;border:1.5px solid rgba(255,255,255,.15);border-radius:10px;
  background:#fff;color:var(--navy);padding:0 16px;font-size:14px;border:1.5px solid var(--line);
  outline:none;font-family:inherit;transition:border-color .15s;
}
.es-form-input::placeholder { color:rgba(255,255,255,.35); }
.es-form-input:focus { border-color:rgba(59,143,239,.6);background:rgba(255,255,255,.12); }
.es-form-select {
  height:46px;border:1.5px solid rgba(255,255,255,.15);border-radius:10px;
  background:#fff;color:var(--navy);padding:0 16px;font-size:14px;border:1.5px solid var(--line);
  outline:none;font-family:inherit;cursor:pointer;
}
.es-form-select option { background:#fff;color:var(--navy); }
.es-form-row { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
.es-submit-btn {
  height:50px;border-radius:10px;background:#fff;color:#0F52C0;
  font-weight:800;font-size:15px;border:0;cursor:pointer;font-family:inherit;
  transition:all .15s;margin-top:4px;
}
.es-submit-btn:hover { background:#F0F7FF;transform:translateY(-1px); }
.es-success { background:rgba(14,159,110,.15);border:1px solid rgba(14,159,110,.3);border-radius:12px;padding:20px;text-align:center;color:#4ADE80;font-weight:600; }

/* Responsive */
@media(max-width:900px){
  .es-what-grid,.es-form-grid{ grid-template-columns:1fr }
  .es-svc-grid{ grid-template-columns:1fr 1fr }
  .es-steps{ grid-template-columns:1fr 1fr }
  .es-steps::before{ display:none }
}
@media(max-width:640px){
  .es-svc-grid,.es-steps{ grid-template-columns:1fr }
  .es-form-row{ grid-template-columns:1fr }
  .es-hero-cta{ flex-direction:column;align-items:center }
}
`

const SERVICES = [
  {
    icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z',
    name:'Rental Agreement',
    desc:'Legally stamped rental/lease agreements for residential and commercial properties across all states.',
    price:'From ₹499',
  },
  {
    icon:'M3 21h18M6 21V7l6-4 6 4v14|M9 22V12h6v10',
    name:'Property Sale Deed',
    desc:'E-stamped sale deeds for property transactions. We handle the stamp duty calculation and franking.',
    price:'From ₹999',
  },
  {
    icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z|M23 21v-2a4 4 0 0 0-3-3.87',
    name:'Partnership Deed',
    desc:'Properly stamped partnership deeds for firm registrations — state-specific stamp duty applied.',
    price:'From ₹799',
  },
  {
    icon:'M9 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3|M14 2H6a2 2 0 0 0-2 2v4',
    name:'Loan Agreement',
    desc:'Stamped loan agreements between individuals or entities — legally enforceable across India.',
    price:'From ₹599',
  },
  {
    icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    name:'Affidavit & Indemnity',
    desc:'Notarised and e-stamped affidavits, indemnity bonds and declarations for legal proceedings.',
    price:'From ₹299',
  },
  {
    icon:'M12 2v20|M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    name:'MOU & Agreement',
    desc:'Memoranda of Understanding, service agreements and business contracts — properly stamped.',
    price:'From ₹699',
  },
]

const STEPS = [
  {num:'01',title:'Share Document',desc:'Upload your document or describe what you need.'},
  {num:'02',title:'We Calculate Duty',desc:'Our team identifies the correct stamp duty for your state.'},
  {num:'03',title:'E-Stamp Applied',desc:'Official e-stamp is generated via SHCIL/state portal.'},
  {num:'04',title:'Delivered to You',desc:'Stamped document delivered digitally — ready to sign.'},
]

export default function EStampPage() {
  const [form, setForm] = useState({ name:'', mobile:'', email:'', service:'', state:'' })
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formErr, setFormErr] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true); setFormErr('')
    try {
      const res = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          mobile:  form.mobile,
          email:   form.email || undefined,
          state:   form.state,
          message: `E-Stamp enquiry — Document: ${form.service}`,
          source:  'estamp-page',
          service: `E-Stamp — ${form.service}`,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Submission failed')
      setSubmitted(true)
    } catch (err) {
      setFormErr(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const STATES = ['Karnataka','Maharashtra','Delhi','Tamil Nadu','Telangana','Gujarat','Rajasthan','Uttar Pradesh','West Bengal','Kerala','Andhra Pradesh','Punjab','Haryana','Madhya Pradesh','Other']
  const SVC_OPTS = ['Rental Agreement','Property Sale Deed','Partnership Deed','Loan Agreement','Affidavit / Indemnity Bond','MOU / Business Agreement','Other Document']

  return (
    <>
      <style>{S}</style>

      {/* Hero */}
      <section className="es-hero">
        <div className="es-hero-inner">
          <div className="es-badge">
            <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M9 12h6m-6 4h6M12 2v4M4.22 4.22l2.83 2.83M2 12h4M4.22 19.78l2.83-2.83M12 18v4M19.78 19.78l-2.83-2.83M22 12h-4M19.78 4.22l-2.83 2.83"/></svg>
            Official E-Stamp Service
          </div>
          <h1>
            We help you to get<br/>
            <span>pan India E-stamps</span>
          </h1>
          <p>Get legally valid e-stamped documents for property, business and personal needs — handled end to end by LauncherDesk. No government portal visits required.</p>
          <div className="es-hero-cta">
            <a href="#get-stamp" className="es-btn-primary">
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 12h6m-6 4h6M12 2v4M4.22 4.22l2.83 2.83"/></svg>
              Get Your E-Stamp
            </a>
            <a href="https://wa.me/918548854859" target="_blank" rel="noopener noreferrer" className="es-btn-secondary">
              <svg viewBox="0 0 32 32" width={20} height={20} fill="currentColor" style={{flexShrink:0}}><path d="M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z"/></svg>
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* What is E-Stamp */}
      <section className="es-what">
        <div className="es-inner">
          <span className="es-section-label">What is E-Stamping?</span>
          <h2>The secure, digital alternative to physical stamp paper.</h2>
          <div className="es-what-grid">
            <p className="es-what-desc">
              E-stamping is the government-authorised method of paying stamp duty electronically. Instead of buying physical stamp paper, a unique certificate is issued by SHCIL (Stock Holding Corporation of India Limited) or the respective state portal — making it tamper-proof, legally valid and instantly verifiable.<br/><br/>
              LauncherDesk handles the entire process — from identifying the right stamp duty amount for your state and document type, to generating and delivering the official e-stamp certificate.
            </p>
            <div className="es-what-points">
              {[
                {icon:'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0',title:'100% Legally Valid',desc:'Accepted by courts, banks, registrars and government bodies across India.'},
                {icon:'M12 15V3|M8 11l4 4 4-4',title:'Delivered Digitally',desc:'No physical stamp paper needed — your stamped document comes directly to you.'},
                {icon:'M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z',title:'Tamper-Proof',desc:'Every e-stamp has a unique certificate number verifiable on the government portal.'},
                {icon:'M12 8v4l3 3|M3.05 11a9 9 0 1 0 .5-3',title:'Fast Turnaround',desc:'Most documents stamped and returned within 2–4 working hours.'},
              ].map(p=>(
                <div key={p.title} className="es-point">
                  <div className="es-point-icon">
                    <svg viewBox="0 0 24 24"><path d={p.icon}/></svg>
                  </div>
                  <div><h4>{p.title}</h4><p>{p.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="es-services">
        <div className="es-inner">
          <span className="es-section-label">What We Stamp</span>
          <h2>Documents we handle.</h2>
          <div className="es-svc-grid">
            {SERVICES.map(s=>(
              <div key={s.name} className="es-svc-card">
                <div className="es-svc-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    {s.icon.split('|').map((p,i)=><path key={i} d={p}/>)}
                  </svg>
                </div>
                <div className="es-svc-name">{s.name}</div>
                <div className="es-svc-desc">{s.desc}</div>
                <span className="es-svc-price">{s.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="es-how">
        <div className="es-inner">
          <span className="es-section-label">The Process</span>
          <h2>How it works.</h2>
          <div className="es-steps">
            {STEPS.map(s=>(
              <div key={s.num} className="es-step">
                <div className="es-step-num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + CTA */}
      <section className="es-form-section" id="get-stamp">
        <div className="es-inner">
          <div className="es-form-card">
            <div className="es-form-grid">
              <div className="es-form-left">
                <h2>Get your document stamped today.</h2>
                <p>Fill in your details and we'll contact you within 2 hours with the exact stamp duty amount and a clear quote.</p>
                <div className="es-contact-rows">
                  <div className="es-contact-row">
                    <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    +91 85488 54859
                  </div>
                  <div className="es-contact-row">
                    <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    contact@launcherdesk.com
                  </div>
                  <div className="es-contact-row">
                    <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    4th Block, Koramangala, Bengaluru – 560095
                  </div>
                </div>
              </div>

              {submitted ? (
                <div className="es-success">
                  <div style={{fontSize:36,marginBottom:12}}>✅</div>
                  <div style={{fontSize:18,fontWeight:800,color:'#fff',marginBottom:8}}>Request received!</div>
                  <div style={{fontSize:14,color:'#9ab5d4'}}>Our team will contact you within 2 hours with stamp duty details and a quote.</div>
                </div>
              ) : (
                <form className="es-form" onSubmit={handleSubmit}>
                  <div className="es-form-row">
                    <div className="es-form-field">
                      <label className="es-form-label">Full Name *</label>
                      <input className="es-form-input" type="text" required placeholder="Your name"
                        value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                    </div>
                    <div className="es-form-field">
                      <label className="es-form-label">Mobile Number *</label>
                      <input className="es-form-input" type="tel" required placeholder="+91 98765 43210"
                        value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})}/>
                    </div>
                  </div>
                  <div className="es-form-field">
                    <label className="es-form-label">Email Address</label>
                    <input className="es-form-input" type="email" placeholder="your@email.com"
                      value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                  </div>
                  <div className="es-form-row">
                    <div className="es-form-field">
                      <label className="es-form-label">Document Type *</label>
                      <select className="es-form-select" required value={form.service} onChange={e=>setForm({...form,service:e.target.value})}>
                        <option value="">Select document</option>
                        {SVC_OPTS.map(s=><option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="es-form-field">
                      <label className="es-form-label">State *</label>
                      <select className="es-form-select" required value={form.state} onChange={e=>setForm({...form,state:e.target.value})}>
                        <option value="">Select state</option>
                        {STATES.map(s=><option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="es-submit-btn" disabled={saving}>
                    {saving ? 'Submitting…' : 'Request E-Stamp Quote →'}
                  </button>
                  {formErr && <p style={{fontSize:13,color:'#FCA5A5',textAlign:'center',marginTop:8}}>{formErr}</p>}
                  <a href="https://doqfy.in/stamping" target="_blank" rel="noopener noreferrer"
                    style={{display:'block',textAlign:'center',marginTop:12,fontSize:13,color:'rgba(255,255,255,.55)',textDecoration:'underline'}}>
                    Or get it directly on Doqfy →
                  </a>
                  <p style={{fontSize:12,color:'rgba(255,255,255,.45)',textAlign:'center'}}>
                    We'll respond within 2 hours · No spam · 100% confidential
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}