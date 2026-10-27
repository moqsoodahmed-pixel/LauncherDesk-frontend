import { useState, useRef } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'https://launcherdesk-backend-production.up.railway.app/api'

const CHEV   = 'm9 18 6-6-6-6'
const CHECK  = 'M20 6 9 17l-5-5'
const WA_PATH = 'M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z'

const JOBS = [
  {
    title: 'Sales Executive', type: 'Full-time', location: 'Koramangala, Bengaluru', dept: 'Sales',
    color: '#EEF2FF', accent: '#1D6FE0',
    about: 'Drive new client acquisition for LauncherDesk business registration, compliance and technology services. You will be the first point of contact for inbound leads and proactively reach out to founders and startups.',
    responsibilities: ['Convert inbound leads from website, WhatsApp and referrals into paying clients','Proactively identify and reach out to startups, founders and SMEs','Understand client requirements and recommend the right LauncherDesk services','Maintain accurate records in the CRM','Achieve monthly and quarterly revenue targets','Coordinate with operations for smooth client onboarding'],
    requirements: ['0–3 years of B2B sales experience, preferably in services or legal-tech','Strong communication in English and Hindi/Kannada','Comfortable with WhatsApp Business, CRM and Google Workspace','Self-motivated with a target-driven mindset','Graduate in any stream; MBA is a plus'],
    perks: ['Fixed salary + performance incentives','Health insurance','Flexible work timings','Fast career growth'],
  },
  {
    title: 'Business Development (BD) Executive', type: 'Full-time', location: 'Koramangala, Bengaluru', dept: 'Business Development',
    color: 'rgba(139, 92, 246, 0.12)', accent: '#8B5CF6',
    about: 'Build strategic partnerships and expand LauncherDesk reach through corporate tie-ups, channel partnerships, co-working spaces, incubators and industry associations.',
    responsibilities: ['Identify and develop B2B partnerships with co-working spaces, incubators and CAs','Build a pipeline of channel partners who refer business to LauncherDesk','Represent LauncherDesk at startup events and networking meetups','Negotiate and close partnership agreements','Track partnership performance and report to management','Work with marketing to create co-branded campaigns'],
    requirements: ['0–3 years in business development or corporate sales','Strong network in the Bengaluru startup ecosystem is a big plus','Excellent presentation and negotiation skills','Experience in B2B services, legal-tech or SaaS preferred','Graduate/MBA from a recognised institution'],
    perks: ['Competitive salary + partnership incentives','Health insurance','Travel allowance','Direct exposure to C-level decisions'],
  },
  {
    title: 'Digital Marketing Executive', type: 'Full-time', location: 'Koramangala, Bengaluru (Hybrid)', dept: 'Marketing',
    color: '#DCFCE7', accent: '#16A34A',
    about: 'Own and grow LauncherDesk digital presence — from SEO and content to paid ads and social media. Help founders discover us when they need us most.',
    responsibilities: ['Plan, create and publish SEO-optimised blog content and service pages','Manage Google Ads campaigns with a focus on ROAS','Run and optimise LinkedIn, Instagram, X and Facebook channels','Manage WhatsApp broadcast campaigns','Track and report on traffic, leads and conversions via GA4 and Search Console','Coordinate with designers for creatives','Identify new digital channels and growth opportunities'],
    requirements: ['0–3 years in digital marketing — SEO, Google Ads, social media','Hands-on with Google Analytics, Search Console, Meta Ads Manager','Strong written English — can write a blog post from scratch','Basic HTML/CSS knowledge and CMS experience is a plus','Graduate in Marketing, Mass Communication or equivalent'],
    perks: ['Competitive salary','Ad budget to experiment with','Hybrid work model','Health insurance'],
  },
  {
    title: 'HR Executive', type: 'Full-time', location: 'Koramangala, Bengaluru', dept: 'Human Resources',
    color: '#FDF4FF', accent: '#7C3AED',
    about: 'Build and maintain a great team at LauncherDesk. Own the full recruitment cycle, onboarding experience, culture initiatives and HR operations for a growing startup.',
    responsibilities: ['Manage end-to-end recruitment — job postings, screening, interviews, offer letters','Onboard new hires and ensure a smooth first-week experience','Maintain employee records, attendance and leave management','Handle payroll inputs and statutory compliance coordination','Drive employee engagement — team events, feedback sessions, recognition','Support performance review cycles and goal-setting'],
    requirements: ['0–3 years in HR — recruitment, onboarding and HR operations','Familiarity with Indian labour laws and statutory requirements (PF, ESI, PT)','Strong interpersonal and communication skills','Experience with ATS or HRMS tools is a plus','MBA/PGDM in HR or BBA with HR specialisation'],
    perks: ['Competitive salary','Health insurance','Opportunity to build HR from ground up','Direct reporting to founders'],
  },
  {
    title: 'Operations Executive', type: 'Full-time', location: 'Koramangala, Bengaluru', dept: 'Operations',
    color: '#F0F9FF', accent: '#0284C7',
    about: 'Keep the engine running. Coordinate service delivery across registrations, compliance filings, IT projects and client requests — ensuring every client gets a smooth, on-time experience.',
    responsibilities: ['Coordinate with clients to collect documents for service delivery','Liaise with CAs, CSs, lawyers and government portals to complete filings','Track all active orders and proactively update clients on status','Maintain project trackers, checklists and SOPs for each service','Identify bottlenecks and propose process improvements','Handle client escalations professionally and resolve quickly'],
    requirements: ['0–3 years in operations, client servicing or project coordination','Detail-oriented with strong follow-through','Comfortable with government portals (MCA, GSTN, IP India) is a big plus','Good written and verbal communication','Graduate in any stream; B.Com or BBA preferred'],
    perks: ['Competitive salary','Health insurance','Structured growth path','Work on 100+ client projects per month'],
  },
  {
    title: 'Legal Executive', type: 'Full-time', location: 'Koramangala, Bengaluru', dept: 'Legal & Compliance',
    color: 'rgba(56, 189, 248, 0.12)', accent: '#0284C7',
    about: 'Lead and manage end-to-end legal drafting, vetting, and execution of business agreements, contracts, MoUs, NDAs, and startup compliance. Coordinate with founders, counsels, and government authorities to ensure rock-solid legal protection and smooth business launches.',
    responsibilities: [
      'Draft, review, and execute commercial contracts, founder agreements, vendor agreements, NDAs, and MoUs',
      'Manage legal agreements workflow, e-stamping, digital execution, and documentation for client businesses',
      'Ensure regulatory and statutory compliance under Indian corporate laws and startup frameworks',
      'Liaise with corporate advocates, company secretaries (CS), and regulatory authorities',
      'Advise internal sales and operations teams on legal terms, disclaimers, and onboarding contracts',
      'Maintain and expand the legal agreement repository, standardized templates, and compliance checklists'
    ],
    requirements: [
      'LL.B / B.A. LL.B degree from a recognized university or law school',
      '0–3 years of experience in contract drafting, legal vetting, corporate legal advisory, or legal operations',
      'Sound understanding of the Indian Contract Act, Companies Act, and commercial legal principles',
      'High attention to detail with strong drafting, vetting, and written English communication skills',
      'Experience with digital contracts, e-stamping portals, or legal-tech platforms is an advantage'
    ],
    perks: ['Competitive salary + performance bonus','Comprehensive health insurance','Direct mentorship from seasoned legal counsels','Rapid career growth in a fast-expanding legal-tech platform'],
  },
  {
    title: 'Accounts Executive', type: 'Full-time', location: 'Koramangala, Bengaluru', dept: 'Finance & Accounts',
    color: '#FFF9C4', accent: '#B45309',
    about: 'Manage day-to-day accounting operations for LauncherDesk — from invoicing and collections to vendor payments, reconciliation and MIS reporting.',
    responsibilities: ['Raise client invoices and track payments and collections','Process vendor payments and maintain accounts payable records','Reconcile bank statements and internal ledgers monthly','Prepare MIS reports — P&L, cash flow and outstanding statements','Assist with monthly GST return preparation and reconciliation','Coordinate with auditors for annual audit support'],
    requirements: ['0–3 years in accounting or finance operations','Proficient in Tally ERP / QuickBooks and MS Excel','Working knowledge of GST, TDS and Indian accounting standards','Accurate, organized and reliable','B.Com / M.Com / CA Inter preferred'],
    perks: ['Competitive salary','Health insurance','CA mentorship available','Exposure to multi-entity accounting'],
  },
]

/* ── Styles ── */
const S = `
.ap-overlay{position:fixed;inset:0;background:rgba(10, 14, 20, 0.82);z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}
.ap-modal{background:rgba(22, 27, 34, 0.96);border:1px solid rgba(255,255,255,.08);border-radius:20px;width:100%;max-width:680px;max-height:90vh;overflow-y:auto;box-shadow:0 32px 80px rgba(0,0,0,.75);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)}
.ap-modal-head{padding:24px 28px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;position:sticky;top:0;background:rgba(22, 27, 34, 0.98);z-index:2;border-bottom:1px solid rgba(255,255,255,.08);padding-bottom:18px}
.ap-modal-title{font-size:18px;font-weight:800;color:#FFFFFF}
.ap-modal-sub{font-size:13px;color:#B9C2CF;margin-top:3px}
.ap-close{width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:#FFFFFF;display:grid;place-items:center;cursor:pointer;flex-shrink:0;transition:all .15s}
.ap-close:hover{background:rgba(255,255,255,.12)}
.ap-body{padding:24px 28px 28px;display:flex;flex-direction:column;gap:20px}
.ap-section-title{font-size:14px;font-weight:800;color:#FFFFFF;margin-bottom:14px;display:flex;align-items:center;gap:8px}
.ap-section-title::after{content:'';flex:1;height:1px;background:rgba(255,255,255,.08)}
.ap-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.ap-field{display:flex;flex-direction:column;gap:5px}
.ap-field label{font-size:12px;font-weight:600;color:#B9C2CF}
.ap-field label span{color:#EF4444}
.ap-field input,.ap-field select,.ap-field textarea{border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:0 12px;height:40px;font-size:13.5px;color:#F1F5F9;outline:none;font-family:inherit;background:rgba(16, 23, 34, 0.85);width:100%;box-sizing:border-box;transition:border-color .15s, box-shadow .15s}
.ap-field textarea{height:88px;padding:10px 12px;resize:vertical}
.ap-field input:focus,.ap-field select:focus,.ap-field textarea:focus{border-color:#2196F3;box-shadow:0 0 0 3px rgba(33,150,243,.2)}
.ap-field input::placeholder,.ap-field textarea::placeholder{color:rgba(255,255,255,.3)}
.ap-drop-zone{border:2px dashed rgba(33,150,243,.4);border-radius:10px;padding:20px;text-align:center;cursor:pointer;background:rgba(16, 23, 34, 0.6);transition:border-color .15s,background .15s}
.ap-drop-zone:hover,.ap-drop-zone.drag{border-color:#2196F3;background:rgba(33,150,243,.12)}
.ap-drop-zone p{font-size:13px;color:#2196F3;font-weight:600;margin:0}
.ap-drop-zone small{font-size:11.5px;color:#B9C2CF}
.ap-file-chosen{display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(33,150,243,.15);border:1px solid rgba(33,150,243,.3);border-radius:8px}
.ap-file-chosen span{font-size:13px;font-weight:600;color:#2196F3;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ap-submit{height:50px;border-radius:11px;background:linear-gradient(135deg, #1E88E5 0%, #7C4DFF 100%);color:#fff;font-weight:700;font-size:15px;border:none;cursor:pointer;font-family:inherit;transition:opacity .15s, transform .15s;display:flex;align-items:center;justify-content:center;gap:10px;box-shadow:0 4px 18px rgba(33,150,243,.35)}
.ap-submit:hover{opacity:.95;transform:translateY(-1px)}
.ap-submit:disabled{opacity:.6;cursor:not-allowed}
.ap-success{text-align:center;padding:40px 28px}
.ap-success-ic{width:72px;height:72px;border-radius:50%;background:rgba(37,211,102,.15);display:grid;place-items:center;margin:0 auto 20px}
.ap-err{background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.3);border-radius:8px;padding:10px 14px;font-size:13px;color:#F87171}
@media(max-width:560px){.ap-row{grid-template-columns:1fr}.ap-modal{border-radius:16px}.ap-body,.ap-modal-head{padding-left:18px;padding-right:18px}}
`

/* ── Apply Modal ── */
function ApplyModal({ job, onClose }) {
  const fileRef = useRef()
  const [form, setForm] = useState({
    firstName:'', lastName:'', email:'', confirmEmail:'',
    phone:'', city:'', experience:'', education:'',
    currentCompany:'', linkedIn:'', coverLetter:'',
  })
  const [resume, setResume]   = useState(null)
  const [drag, setDrag]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)
  const [err, setErr]         = useState('')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleFile = (file) => {
    if (!file) return
    const ext = file.name.split('.').pop().toLowerCase()
    if (!['pdf','doc','docx'].includes(ext)) { setErr('Only PDF, DOC or DOCX files accepted.'); return }
    if (file.size > 10 * 1024 * 1024) { setErr('File size must be under 10 MB.'); return }
    setErr(''); setResume(file)
  }

  const handleDrop = (e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      setErr('Please fill all required fields.'); return
    }
    if (form.email !== form.confirmEmail) {
      setErr('Emails do not match.'); return
    }
    setLoading(true); setErr('')
    try {
      const fd = new FormData()
      fd.append('firstName',      form.firstName)
      fd.append('lastName',       form.lastName)
      fd.append('email',          form.email)
      fd.append('phone',          form.phone)
      fd.append('city',           form.city)
      fd.append('role',           job.title)
      fd.append('experience',     form.experience)
      fd.append('education',      form.education)
      fd.append('currentCompany', form.currentCompany)
      fd.append('linkedIn',       form.linkedIn)
      fd.append('coverLetter',    form.coverLetter)
      if (resume) fd.append('resume', resume)

      const res = await fetch(`${API_BASE}/applications`, { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Submission failed')
      setDone(true)
    } catch (ex) {
      setErr(ex.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ap-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <style>{S}</style>
      <div className="ap-modal" role="dialog" aria-modal="true">

        {/* Header */}
        <div className="ap-modal-head">
          <div>
            <div className="ap-modal-title">Apply — {job.title}</div>
            <div className="ap-modal-sub">
              <span style={{display:'inline-flex',alignItems:'center',gap:4}}>
                <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {job.location} · {job.type}
              </span>
            </div>
          </div>
          <button className="ap-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {done ? (
          <div className="ap-success">
            <div className="ap-success-ic">
              <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="#16A34A" strokeWidth={2.5}><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <h3 style={{fontSize:20,fontWeight:800,color:'#FFFFFF',marginBottom:10}}>Application Submitted!</h3>
            <p style={{fontSize:15,color:'var(--text-2)',lineHeight:1.7,maxWidth:380,margin:'0 auto 24px'}}>
              Thank you for applying! Our HR team will review your application and reach out within <strong>3–5 business days</strong>. A confirmation has been sent to your email.
            </p>
            <button onClick={onClose} style={{padding:'12px 32px',background:'linear-gradient(135deg, #1E88E5 0%, #7C4DFF 100%)',color:'#fff',border:'none',borderRadius:10,fontWeight:700,fontSize:14,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 4px 16px rgba(30, 136, 229, 0.35)'}}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ap-body">

            {/* Resume upload at top like reference */}
            <div>
              <div className="ap-section-title">Resume / CV</div>
              {resume ? (
                <div className="ap-file-chosen">
                  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="#1D6FE0" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
                  <span>{resume.name}</span>
                  <button type="button" onClick={() => setResume(null)} style={{background:'none',border:'none',cursor:'pointer',color:'#64748B',flexShrink:0}}>
                    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              ) : (
                <div
                  className={`ap-drop-zone${drag?' drag':''}`}
                  onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={handleDrop}
                  onClick={() => fileRef.current?.click()}
                >
                  <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="#3B82F6" strokeWidth={1.5} style={{margin:'0 auto 8px',display:'block'}}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                  <p><span style={{color:'#1D6FE0',textDecoration:'underline',cursor:'pointer'}}>Choose a file</span> or drop it here</p>
                  <small>PDF, DOC, DOCX · Max 10 MB</small>
                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{display:'none'}} onChange={(e) => handleFile(e.target.files[0])} />
                </div>
              )}
            </div>

            {/* Personal Information */}
            <div>
              <div className="ap-section-title">Personal Information</div>
              <p style={{fontSize:12.5,color:'#64748B',marginBottom:14}}>Fields marked with <span style={{color:'#EF4444'}}>*</span> are required.</p>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <div className="ap-row">
                  <div className="ap-field">
                    <label>First name <span>*</span></label>
                    <input value={form.firstName} onChange={set('firstName')} placeholder="First name" required />
                  </div>
                  <div className="ap-field">
                    <label>Last name <span>*</span></label>
                    <input value={form.lastName} onChange={set('lastName')} placeholder="Last name" required />
                  </div>
                </div>
                <div className="ap-row">
                  <div className="ap-field">
                    <label>Email <span>*</span></label>
                    <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required />
                  </div>
                  <div className="ap-field">
                    <label>Confirm email <span>*</span></label>
                    <input type="email" value={form.confirmEmail} onChange={set('confirmEmail')} placeholder="Confirm your email" required />
                  </div>
                </div>
                <div className="ap-row">
                  <div className="ap-field">
                    <label>City <span>*</span></label>
                    <input value={form.city} onChange={set('city')} placeholder="Your city" required />
                  </div>
                  <div className="ap-field">
                    <label>Phone number <span>*</span></label>
                    <div style={{display:'flex',gap:8}}>
                      <div style={{display:'flex',alignItems:'center',padding:'0 10px',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,background:'rgba(10,16,28,0.65)',fontSize:13,fontWeight:600,color:'#94A3B8',gap:5,flexShrink:0}}>
                        🇮🇳 +91
                      </div>
                      <input style={{flex:1,border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,padding:'0 12px',height:40,fontSize:13.5,color:'#F1F5F9',outline:'none',fontFamily:'inherit',background:'rgba(10,16,28,0.65)'}} type="tel" value={form.phone} onChange={set('phone')} placeholder="98765 43210" required />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div>
              <div className="ap-section-title">Experience</div>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <div className="ap-row">
                  <div className="ap-field">
                    <label>Years of experience</label>
                    <select value={form.experience} onChange={set('experience')}>
                      <option value="">Select…</option>
                      <option>Fresher (0 years)</option>
                      <option>Less than 1 year</option>
                      <option>1 year</option>
                      <option>2 years</option>
                      <option>3 years</option>
                      <option>4+ years</option>
                    </select>
                  </div>
                  <div className="ap-field">
                    <label>Current company (if any)</label>
                    <input value={form.currentCompany} onChange={set('currentCompany')} placeholder="Company name or 'Fresher'" />
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="ap-section-title">Education</div>
              <div className="ap-field">
                <label>Highest qualification</label>
                <input value={form.education} onChange={set('education')} placeholder="e.g. B.Com, MBA, B.Tech" />
              </div>
            </div>

            {/* Additional */}
            <div>
              <div className="ap-section-title">Additional Details</div>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <div className="ap-field">
                  <label>LinkedIn profile URL</label>
                  <input type="url" value={form.linkedIn} onChange={set('linkedIn')} placeholder="https://linkedin.com/in/yourname" />
                </div>
                <div className="ap-field">
                  <label>Cover letter / Why do you want to join LauncherDesk?</label>
                  <textarea value={form.coverLetter} onChange={set('coverLetter')} placeholder="Tell us a bit about yourself and why this role interests you…" />
                </div>
              </div>
            </div>

            {err && <div className="ap-err">{err}</div>}

            {/* Submit */}
            <button type="submit" disabled={loading} className="ap-submit">
              {loading ? (
                <>
                  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} style={{animation:'spin 1s linear infinite'}}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                  Submitting…
                </>
              ) : 'Submit Application →'}
            </button>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </form>
        )}
      </div>
    </div>
  )
}

/* ── Job Card ── */
function JobCard({ job }) {
  const [open,    setOpen]    = useState(false)
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      {showForm && <ApplyModal job={job} onClose={() => setShowForm(false)} />}
      <div className="job-card-wrapper" style={{ background:'rgba(14, 22, 38, 0.70)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', border:`1.5px solid ${open?job.accent:'rgba(255, 255, 255, 0.08)'}`, borderRadius:16, overflow:'hidden', transition:'border-color .2s,box-shadow .2s', boxShadow: open?`0 8px 32px ${job.accent}30`:'0 4px 20px rgba(0,0,0,.25)' }}>
        <div style={{ padding:'24px 24px 20px', display:'flex', alignItems:'flex-start', gap:16 }}>
          <div style={{ width:48,height:48,borderRadius:12,background:job.color,display:'grid',placeItems:'center',flexShrink:0 }}>
            <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke={job.accent} strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12,flexWrap:'wrap' }}>
              <div>
                <h3 style={{ fontSize:17,fontWeight:800,color:'#FFFFFF',marginBottom:6 }}>{job.title}</h3>
                <div style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
                  <span style={{ fontSize:12,fontWeight:600,padding:'3px 10px',borderRadius:99,background:job.color,color:job.accent,border:`1px solid ${job.accent}40` }}>{job.dept}</span>
                  <span style={{ fontSize:12,color:'#94A3B8',display:'flex',alignItems:'center',gap:4 }}>
                    <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {job.location}
                  </span>
                  <span style={{ fontSize:12,color:'#94A3B8',display:'flex',alignItems:'center',gap:4 }}>
                    <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    {job.type}
                  </span>
                </div>
              </div>
              <button onClick={() => setOpen(o => !o)} style={{ display:'inline-flex',alignItems:'center',gap:6,padding:'9px 18px',borderRadius:9,fontWeight:700,fontSize:13.5,background:open?job.accent:'rgba(255,255,255,0.06)',color:open?'#fff':job.accent,border:`1.5px solid ${job.accent}`,cursor:'pointer',fontFamily:'inherit',transition:'all .15s',flexShrink:0 }}>
                {open ? 'Close' : 'View Details'}
                <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} style={{ transform:open?'rotate(180deg)':'none',transition:'transform .2s' }}><path d="m6 9 6 6 6-6"/></svg>
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div style={{ padding:'0 24px 24px', borderTop:`1px solid rgba(255,255,255,0.08)` }}>
            <p style={{ fontSize:14.5,color:'#94A3B8',lineHeight:1.7,margin:'20px 0 24px' }}>{job.about}</p>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:24 }}>
              {[['Responsibilities', job.responsibilities], ['Requirements', job.requirements]].map(([label, items]) => (
                <div key={label}>
                  <h4 style={{ fontSize:14,fontWeight:700,color:'#FFFFFF',marginBottom:12,display:'flex',alignItems:'center',gap:6 }}>
                    <span style={{ width:6,height:6,borderRadius:'50%',background:job.accent,display:'inline-block' }} />
                    {label}
                  </h4>
                  <ul style={{ listStyle:'none',display:'flex',flexDirection:'column',gap:8,padding:0,margin:0 }}>
                    {items.map(r => (
                      <li key={r} style={{ display:'flex',gap:8,fontSize:13.5,color:'#CBD5E1',lineHeight:1.5,alignItems:'flex-start' }}>
                        <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke={job.accent} strokeWidth={2.5} style={{ flexShrink:0,marginTop:2 }}><path d={CHECK}/></svg>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Perks */}
            <div style={{ background:job.color,borderRadius:10,padding:'14px 18px',marginBottom:20,border:`1px solid ${job.accent}30` }}>
              <div style={{ fontSize:12,fontWeight:700,color:job.accent,letterSpacing:'.06em',textTransform:'uppercase',marginBottom:8 }}>What we offer</div>
              <div style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
                {job.perks.map(p => (
                  <span key={p} style={{ fontSize:12.5,fontWeight:600,padding:'4px 12px',borderRadius:99,background:'rgba(10, 16, 28, 0.7)',color:'#FFFFFF',border:`1px solid ${job.accent}40` }}>{p}</span>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div style={{ display:'flex',gap:12,flexWrap:'wrap' }}>
              <button
                onClick={() => setShowForm(true)}
                style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'11px 22px',background:job.accent,color:'#fff',borderRadius:10,fontWeight:700,fontSize:14,border:'none',cursor:'pointer',fontFamily:'inherit',boxShadow:`0 4px 14px ${job.accent}40` }}
              >
                Apply Now →
              </button>
              <a
                href={`https://wa.me/918548854859?text=Hi, I'd like to apply for the ${job.title} role at LauncherDesk.`}
                target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'11px 20px',background:'#25D366',color:'#fff',borderRadius:10,fontWeight:700,fontSize:14,textDecoration:'none' }}
              >
                <svg viewBox="0 0 32 32" width={18} height={18} fill="currentColor"><path d={WA_PATH}/></svg>
                Apply on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

/* ── Page ── */
export default function CareersPage() {
  return (
    <>
      <style>{`
        .careers-container {
          width: min(1420px, calc(100% - 36px)) !important;
          max-width: 1420px !important;
          margin: 0 auto !important;
          padding: 0 14px !important;
          box-sizing: border-box !important;
        }
        @media (min-width: 900px) and (max-width: 1280px) {
          .careers-container {
            width: min(1420px, calc(100% - 20px)) !important;
            padding: 0 10px !important;
          }
        }
        @media (max-width: 899px) {
          .careers-container {
            width: 100% !important;
            padding: 0 16px !important;
          }
        }
        .job-card-wrapper {
          transition: transform .22s cubic-bezier(0.16, 1, 0.3, 1), border-color .2s, box-shadow .2s;
        }
        .job-card-wrapper:hover {
          transform: translateY(-2px);
          border-color: rgba(56, 189, 248, 0.35) !important;
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.5) !important;
        }
        #openings {
          scroll-margin-top: 110px;
        }
      `}</style>

      <header className="page-hero" style={{ paddingTop: 'clamp(84px, 8vw, 108px)' }}>
        <div className="careers-container">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:14,height:14}}><path d={CHEV}/></svg>
            <a href="/company/about">Company</a>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:14,height:14}}><path d={CHEV}/></svg>
            <span className="cur">Careers</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>Join us</span>
          <h1 className="reveal-up in">Help founders get this right.</h1>
          <p className="lead reveal-up in">We're a Bengaluru-based team building the one-desk experience founders keep wishing existed. We're growing and looking for sharp, driven people who want to make a real difference.</p>
          <div className="hero-cta reveal-up in">
            <a href="#openings" className="btn btn-primary">View Open Roles →</a>
            <a href="mailto:hr@launcherdesk.com" className="btn btn-outline-white">Email your profile</a>
          </div>
        </div>
      </header>

      <section className="section-sm" id="openings">
        <div className="careers-container">
          <div className="sec-head reveal-up" style={{marginBottom:32}}>
            <span className="eyebrow">Open roles</span>
            <h2 style={{fontSize:'clamp(24px,3vw,34px)'}}>Current openings — {JOBS.length} positions</h2>
            <p style={{marginTop:8,color:'var(--text-2)'}}>All roles are based in Koramangala, Bengaluru. Click any role to see full details and apply.</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {JOBS.map(job => <JobCard key={job.title} job={job} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'transparent', padding: '48px 0 80px' }}>
        <div className="careers-container">
          <div className="final reveal-up">
            <h2>Don't see the right role?</h2>
            <p>Send us your profile anyway. We're always open to meeting sharp people — even before a specific role opens up.</p>
            <div className="row" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
              <a
                href="mailto:hr@launcherdesk.com?subject=Open Application — LauncherDesk"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', borderRadius: 10, fontWeight: 700, fontSize: 14.5, textDecoration: 'none', boxShadow: '0 4px 18px rgba(33,150,243,.35)' }}
              >
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email your CV
              </a>
              <a
                href="https://wa.me/918548854859?text=Hi, I'd like to explore career opportunities at LauncherDesk."
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14.5, background: '#25D366', color: '#FFFFFF', textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,211,102,0.35)', transition: 'all .15s' }}
              >
                <svg viewBox="0 0 32 32" width={18} height={18} fill="currentColor"><path d={WA_PATH}/></svg>
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}