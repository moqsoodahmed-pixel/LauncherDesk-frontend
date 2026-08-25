import { useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const CATEGORIES = [
  'CRM','ERP','Project Management','HR & Payroll','Inventory Management',
  'WhatsApp Automation','CLM / Contract Management','Accounting & Finance',
  'E-commerce Tools','Cybersecurity','Cloud & Hosting','Marketing Tools',
  'Legal Tech','EdTech','HealthTech','Other',
]

const S = `
.pr-bg { background: var(--bg); min-height: 100vh; }

/* Hero */
.pr-hero {
  background: linear-gradient(160deg,#080F1E 0%,#0D1F3C 55%,#162B52 100%);
  padding: clamp(56px,7vw,88px) 0 clamp(44px,5vw,68px);
  position: relative; overflow: hidden; text-align: center;
}
.pr-hero::before {
  content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(700px 500px at 60% -10%,rgba(59,143,239,.2),transparent 60%);
}
.pr-hero-inner { max-width:700px;margin:0 auto;padding:0 28px;position:relative;z-index:1; }
.pr-badge {
  display:inline-flex;align-items:center;gap:8px;background:rgba(29,111,224,.18);
  border:1px solid rgba(29,111,224,.35);border-radius:99px;padding:5px 14px;
  font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:#7ecef4;margin-bottom:20px;
}
.pr-hero h1 { font-size:clamp(30px,4.5vw,54px);font-weight:900;color:#fff;letter-spacing:-.04em;line-height:1.04;margin-bottom:16px; }
.pr-hero p  { font-size:16px;color:#9ab5d4;line-height:1.7; }

/* Benefits strip */
.pr-benefits { background:#fff;border-bottom:1px solid var(--line);padding:28px 0; }
.pr-benefits-inner { max-width:1100px;margin:0 auto;padding:0 28px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px; }
.pr-benefit { display:flex;align-items:flex-start;gap:12px; }
.pr-benefit-icon { width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#EEF2FF,#DBEAFE);display:grid;place-items:center;flex:none; }
.pr-benefit-icon svg { width:20px;height:20px;stroke:#1D6FE0;fill:none;stroke-width:2; }
.pr-benefit h4 { font-size:14px;font-weight:700;color:var(--navy);margin-bottom:3px; }
.pr-benefit p  { font-size:12.5px;color:var(--text-2);line-height:1.5; }

/* Form section */
.pr-form-section { padding:64px 0 80px; }
.pr-form-inner   { max-width:760px;margin:0 auto;padding:0 28px; }
.pr-form-card    { background:#fff;border-radius:20px;border:1.5px solid var(--line);padding:40px 44px;box-shadow:0 4px 24px rgba(13,31,60,.07); }
.pr-form-title   { font-size:22px;font-weight:800;color:var(--navy);margin-bottom:6px; }
.pr-form-sub     { font-size:14px;color:var(--text-2);margin-bottom:32px; }

.pr-form { display:flex;flex-direction:column;gap:20px; }
.pr-section-head { font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--blue);margin-bottom:-4px;margin-top:8px;padding-bottom:8px;border-bottom:1px solid var(--line); }
.pr-row    { display:grid;grid-template-columns:1fr 1fr;gap:16px; }
.pr-field  { display:flex;flex-direction:column;gap:6px; }
.pr-field.full { grid-column:1/-1; }
.pr-label  { font-size:12.5px;font-weight:600;color:#374151; }
.pr-input  {
  height:44px;border:1.5px solid #E2E8F0;border-radius:9px;padding:0 14px;
  font-size:14px;color:var(--navy);outline:none;font-family:inherit;
  transition:border-color .15s;background:#F8FAFC;
}
.pr-input:focus { border-color:#1D6FE0;background:#fff;box-shadow:0 0 0 3px rgba(29,111,224,.1); }
.pr-select {
  height:44px;border:1.5px solid #E2E8F0;border-radius:9px;padding:0 14px;
  font-size:14px;color:var(--navy);outline:none;font-family:inherit;
  transition:border-color .15s;background:#F8FAFC;cursor:pointer;
}
.pr-select:focus { border-color:#1D6FE0;background:#fff; }
.pr-textarea {
  border:1.5px solid #E2E8F0;border-radius:9px;padding:12px 14px;
  font-size:14px;color:var(--navy);outline:none;font-family:inherit;
  transition:border-color .15s;background:#F8FAFC;resize:vertical;min-height:90px;width:100%;
}
.pr-textarea:focus { border-color:#1D6FE0;background:#fff;box-shadow:0 0 0 3px rgba(29,111,224,.1); }

/* Cat checkboxes */
.pr-cats { display:flex;flex-wrap:wrap;gap:8px;margin-top:4px; }
.pr-cat  {
  display:flex;align-items:center;gap:6px;padding:6px 14px;border-radius:99px;
  border:1.5px solid #E2E8F0;background:#F8FAFC;cursor:pointer;
  font-size:13px;font-weight:600;color:var(--text-2);transition:all .13s;user-select:none;
}
.pr-cat input { display:none; }
.pr-cat.checked { border-color:#1D6FE0;background:#EEF2FF;color:#1D6FE0; }

/* File upload */
.pr-upload {
  border:2px dashed #E2E8F0;border-radius:10px;padding:24px;text-align:center;
  cursor:pointer;transition:border-color .15s,background .15s;background:#F8FAFC;
}
.pr-upload:hover { border-color:#1D6FE0;background:#EEF2FF; }
.pr-upload input { display:none; }
.pr-upload-text { font-size:13.5px;color:var(--text-2); }
.pr-upload-text span { color:#1D6FE0;font-weight:600; }

/* Submit */
.pr-submit {
  height:52px;border-radius:11px;background:#1D6FE0;color:#fff;
  font-weight:800;font-size:15.5px;border:0;cursor:pointer;font-family:inherit;
  transition:all .15s;box-shadow:0 6px 20px rgba(29,111,224,.35);
}
.pr-submit:hover { background:#0F52C0;transform:translateY(-2px);box-shadow:0 10px 28px rgba(29,111,224,.45); }
.pr-submit:disabled { opacity:.6;cursor:not-allowed;transform:none; }

/* Success */
.pr-success {
  text-align:center;padding:48px 32px;
}
.pr-success-icon { font-size:56px;margin-bottom:18px; }
.pr-success h2   { font-size:26px;font-weight:900;color:var(--navy);margin-bottom:10px; }
.pr-success p    { font-size:15px;color:var(--text-2);line-height:1.7;max-width:480px;margin:0 auto; }
.pr-success-cta  { margin-top:28px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap; }

/* Existing partners strip */
.pr-partners { background:#fff;padding:56px 0; }
.pr-partners-inner { max-width:1100px;margin:0 auto;padding:0 28px; }
.pr-partners h2 { font-size:22px;font-weight:800;color:var(--navy);margin-bottom:24px; }
.pr-partner-card {
  display:flex;align-items:center;gap:16px;padding:18px 22px;
  border:1.5px solid var(--line);border-radius:14px;background:#F8FAFC;
}
.pr-partner-logo {
  width:52px;height:52px;border-radius:12px;font-size:17px;font-weight:800;
  color:#fff;display:grid;place-items:center;flex:none;background:#6B21A8;
}
.pr-partner-name { font-size:17px;font-weight:800;color:var(--navy);margin-bottom:3px; }
.pr-partner-cat  { font-size:12px;font-weight:600;color:var(--blue);background:var(--bg-2);padding:2px 9px;border-radius:99px;display:inline-block; }
.pr-partner-desc { font-size:13px;color:var(--text-2);margin-top:4px; }
.pr-partner-badge{ font-size:11px;font-weight:700;padding:3px 9px;border-radius:99px;background:rgba(107,33,168,.12);color:#6B21A8;border:1px solid rgba(107,33,168,.2);margin-left:auto;flex:none; }

@media(max-width:768px){
  .pr-benefits-inner { grid-template-columns:1fr 1fr }
  .pr-form-card { padding:28px 20px }
  .pr-row { grid-template-columns:1fr }
}
@media(max-width:480px){
  .pr-benefits-inner { grid-template-columns:1fr }
}
`

export default function PartnerRegister() {
  const [form, setForm] = useState({
    companyName:'', contactName:'', email:'', mobile:'', website:'',
    city:'', state:'', foundedYear:'', teamSize:'',
    categories:[], productName:'', tagline:'', description:'',
    pricing:'', integrations:'', whyPartner:'',
    logoFile:null, logoName:'',
  })
  const [saving,   setSaving]   = useState(false)
  const [done,     setDone]     = useState(false)
  const [error,    setError]    = useState('')

  const set = (k, v) => setForm(f => ({...f, [k]:v}))

  const toggleCat = (cat) => {
    set('categories', form.categories.includes(cat)
      ? form.categories.filter(c=>c!==cat)
      : [...form.categories, cat]
    )
  }

  const handleLogo = (e) => {
    const file = e.target.files[0]
    if (file) { set('logoFile', file); set('logoName', file.name) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.categories.length === 0) { setError('Please select at least one service category.'); return }
    setSaving(true); setError('')
    try {
      const body = {
        companyName:  form.companyName,
        contactName:  form.contactName,
        email:        form.email,
        mobile:       form.mobile,
        website:      form.website,
        city:         form.city,
        state:        form.state,
        foundedYear:  form.foundedYear,
        teamSize:     form.teamSize,
        categories:   form.categories,
        productName:  form.productName,
        tagline:      form.tagline,
        description:  form.description,
        pricing:      form.pricing,
        integrations: form.integrations,
        whyPartner:   form.whyPartner,
      }
      const res = await fetch(`${API}/partners`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Submission failed')
      setDone(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const SIZES = ['1–10','11–50','51–200','201–500','500+']
  const STATES = ['Karnataka','Maharashtra','Delhi','Tamil Nadu','Telangana','Gujarat','Rajasthan','Uttar Pradesh','West Bengal','Andhra Pradesh','Kerala','Punjab','Haryana','Other']

  return (
    <div className="pr-bg">
      <style>{S}</style>

      {/* Hero */}
      <section className="pr-hero">
        <div className="pr-hero-inner">
          <div className="pr-badge">
            <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Partner Programme
          </div>
          <h1>List your product on LauncherDesk Marketplace.</h1>
          <p>Join India's most trusted business services platform. Get discovered by 10,000+ founders and businesses across India — actively searching for software to run their operations.</p>
        </div>
      </section>

      {/* Benefits strip */}
      <div className="pr-benefits">
        <div className="pr-benefits-inner">
          {[
            {icon:'M18 20V10|M12 20V4|M6 20v-6',title:'Qualified Leads',desc:'Reach founders already set up by LauncherDesk — the highest-intent buyers.'},
            {icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',title:'Trusted Placement',desc:'Get listed beside India\'s most-used business tools. Our endorsement matters.'},
            {icon:'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0',title:'Vetted & Verified',desc:'We verify every partner — so your listing carries our quality badge.'},
            {icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',title:'Co-marketing',desc:'Joint content, WhatsApp campaigns and expert recommendations to your ideal customers.'},
          ].map(b=>(
            <div key={b.title} className="pr-benefit">
              <div className="pr-benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  {b.icon.split('|').map((p,i)=><path key={i} d={p}/>)}
                </svg>
              </div>
              <div>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Existing partners */}
      <div className="pr-partners">
        <div className="pr-partners-inner">
          <h2>Current Partners</h2>
          <div className="pr-partner-card">
            <div className="pr-partner-logo">DQ</div>
            <div style={{flex:1}}>
              <div className="pr-partner-name">Doqfy</div>
              <span className="pr-partner-cat">CLM / Contract Management</span>
              <div className="pr-partner-desc">India-ready contract lifecycle platform — fast creation, negotiation, Aadhaar e-sign and real-time collaboration.</div>
            </div>
            <span className="pr-partner-badge">Active Partner</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="pr-form-section">
        <div className="pr-form-inner">
          {done ? (
            <div className="pr-form-card">
              <div className="pr-success">
                <div className="pr-success-icon">🎉</div>
                <h2>Application received!</h2>
                <p>
                  Thank you for applying to partner with LauncherDesk. Our team will review your application and get back to you within <strong>2–3 business days</strong>.<br/><br/>
                  If approved, your product will be listed in the LauncherDesk Marketplace and shown to thousands of founders across India.
                </p>
                <div className="pr-success-cta">
                  <a href="/market" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'0 22px',height:46,borderRadius:9,background:'var(--blue)',color:'#fff',fontWeight:700,fontSize:14,textDecoration:'none'}}>View Marketplace</a>
                  <a href="/" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'0 22px',height:46,borderRadius:9,border:'1.5px solid var(--line)',color:'var(--text)',fontWeight:600,fontSize:14,textDecoration:'none'}}>Back to Home</a>
                </div>
              </div>
            </div>
          ) : (
            <div className="pr-form-card">
              <div className="pr-form-title">Partner Application</div>
              <div className="pr-form-sub">Fill in your details and we'll review your application within 2–3 business days.</div>

              <form className="pr-form" onSubmit={handleSubmit}>

                {/* Company info */}
                <div className="pr-section-head">Company Information</div>
                <div className="pr-row">
                  <div className="pr-field">
                    <label className="pr-label">Company Name *</label>
                    <input className="pr-input" required placeholder="Acme Technologies Pvt Ltd" value={form.companyName} onChange={e=>set('companyName',e.target.value)}/>
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Website URL *</label>
                    <input className="pr-input" required type="url" placeholder="https://yourproduct.com" value={form.website} onChange={e=>set('website',e.target.value)}/>
                  </div>
                </div>
                <div className="pr-row">
                  <div className="pr-field">
                    <label className="pr-label">City *</label>
                    <input className="pr-input" required placeholder="Bengaluru" value={form.city} onChange={e=>set('city',e.target.value)}/>
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">State *</label>
                    <select className="pr-select" required value={form.state} onChange={e=>set('state',e.target.value)}>
                      <option value="">Select state</option>
                      {STATES.map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="pr-row">
                  <div className="pr-field">
                    <label className="pr-label">Founded Year</label>
                    <input className="pr-input" placeholder="e.g. 2019" value={form.foundedYear} onChange={e=>set('foundedYear',e.target.value)}/>
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Team Size</label>
                    <select className="pr-select" value={form.teamSize} onChange={e=>set('teamSize',e.target.value)}>
                      <option value="">Select team size</option>
                      {SIZES.map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Contact */}
                <div className="pr-section-head">Point of Contact</div>
                <div className="pr-row">
                  <div className="pr-field">
                    <label className="pr-label">Contact Name *</label>
                    <input className="pr-input" required placeholder="Rahul Sharma" value={form.contactName} onChange={e=>set('contactName',e.target.value)}/>
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Mobile *</label>
                    <input className="pr-input" required type="tel" placeholder="+91 98765 43210" value={form.mobile} onChange={e=>set('mobile',e.target.value)}/>
                  </div>
                </div>
                <div className="pr-row">
                  <div className="pr-field full">
                    <label className="pr-label">Business Email *</label>
                    <input className="pr-input" required type="email" placeholder="rahul@yourcompany.com" value={form.email} onChange={e=>set('email',e.target.value)}/>
                  </div>
                </div>

                {/* Product */}
                <div className="pr-section-head">Your Product</div>
                <div className="pr-row">
                  <div className="pr-field">
                    <label className="pr-label">Product / Tool Name *</label>
                    <input className="pr-input" required placeholder="e.g. Doqfy" value={form.productName} onChange={e=>set('productName',e.target.value)}/>
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Tagline *</label>
                    <input className="pr-input" required placeholder="e.g. India-ready contract platform" value={form.tagline} onChange={e=>set('tagline',e.target.value)}/>
                  </div>
                </div>
                <div className="pr-field full">
                  <label className="pr-label">Product Description *</label>
                  <textarea className="pr-textarea" required placeholder="Describe what your product does, who it's for and what makes it different (100–300 words)."
                    value={form.description} onChange={e=>set('description',e.target.value)} rows={4}/>
                </div>
                <div className="pr-field full">
                  <label className="pr-label">Service Categories * (select all that apply)</label>
                  <div className="pr-cats">
                    {CATEGORIES.map(cat=>(
                      <label key={cat} className={`pr-cat${form.categories.includes(cat)?' checked':''}`} onClick={()=>toggleCat(cat)}>
                        <input type="checkbox" readOnly checked={form.categories.includes(cat)}/>
                        {cat}
                      </label>
                    ))}
                  </div>
                  {error && error.includes('category') && <span style={{fontSize:12.5,color:'#DC2626',marginTop:4}}>{error}</span>}
                </div>
                <div className="pr-row">
                  <div className="pr-field">
                    <label className="pr-label">Pricing Model</label>
                    <input className="pr-input" placeholder="e.g. SaaS, ₹999/mo · Free trial · Custom" value={form.pricing} onChange={e=>set('pricing',e.target.value)}/>
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Key Integrations</label>
                    <input className="pr-input" placeholder="e.g. Zoho, Slack, WhatsApp" value={form.integrations} onChange={e=>set('integrations',e.target.value)}/>
                  </div>
                </div>
                <div className="pr-field full">
                  <label className="pr-label">Why do you want to partner with LauncherDesk?</label>
                  <textarea className="pr-textarea" placeholder="Tell us your goals, target customers and how this partnership would work." rows={3}
                    value={form.whyPartner} onChange={e=>set('whyPartner',e.target.value)}/>
                </div>

                {error && !error.includes('category') && (
                  <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:9,padding:'12px 16px',fontSize:13.5,color:'#DC2626'}}>{error}</div>
                )}

                <button type="submit" className="pr-submit" disabled={saving}>
                  {saving ? 'Submitting…' : 'Submit Partner Application →'}
                </button>
                <p style={{fontSize:12,color:'var(--text-3)',textAlign:'center',marginTop:-8}}>
                  We review every application within 2–3 business days. No spam, ever.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}