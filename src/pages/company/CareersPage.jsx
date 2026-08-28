import { useState } from 'react'

const CHEV = 'm9 18 6-6-6-6'

const JOBS = [
  {
    title: 'Sales Executive', type: 'Full-time', location: 'Koramangala, Bengaluru', dept: 'Sales',
    color: '#EEF2FF', accent: '#1D6FE0',
    about: 'Drive new client acquisition for LauncherDesk business registration, compliance and technology services. You will be the first point of contact for inbound leads and proactively reach out to founders and startups.',
    responsibilities: ['Convert inbound leads from website, WhatsApp and referrals into paying clients','Proactively identify and reach out to startups, founders and SMEs','Understand client requirements and recommend the right LauncherDesk services','Maintain accurate records in the CRM','Achieve monthly and quarterly revenue targets','Coordinate with operations for smooth client onboarding'],
    requirements: ['1–3 years of B2B sales experience, preferably in services or legal-tech','Strong communication in English and Hindi/Kannada','Comfortable with WhatsApp Business, CRM and Google Workspace','Self-motivated with a target-driven mindset','Graduate in any stream; MBA is a plus'],
    perks: ['Fixed salary + performance incentives','Health insurance','Flexible work timings','Fast career growth'],
  },
  {
    title: 'Business Development (BD) Executive', type: 'Full-time', location: 'Koramangala, Bengaluru', dept: 'Business Development',
    color: '#FFF7ED', accent: '#F97316',
    about: 'Build strategic partnerships and expand LauncherDesk reach through corporate tie-ups, channel partnerships, co-working spaces, incubators and industry associations.',
    responsibilities: ['Identify and develop B2B partnerships with co-working spaces, incubators and CAs','Build a pipeline of channel partners who refer business to LauncherDesk','Represent LauncherDesk at startup events and networking meetups','Negotiate and close partnership agreements','Track partnership performance and report to management','Work with marketing to create co-branded campaigns'],
    requirements: ['2–4 years in business development or corporate sales','Strong network in the Bengaluru startup ecosystem is a big plus','Excellent presentation and negotiation skills','Experience in B2B services, legal-tech or SaaS preferred','Graduate/MBA from a recognised institution'],
    perks: ['Competitive salary + partnership incentives','Health insurance','Travel allowance','Direct exposure to C-level decisions'],
  },
  {
    title: 'Digital Marketing Executive', type: 'Full-time', location: 'Koramangala, Bengaluru (Hybrid)', dept: 'Marketing',
    color: '#DCFCE7', accent: '#16A34A',
    about: 'Own and grow LauncherDesk digital presence — from SEO and content to paid ads and social media. Help founders discover us when they need us most.',
    responsibilities: ['Plan, create and publish SEO-optimised blog content and service pages','Manage Google Ads campaigns with a focus on ROAS','Run and optimise LinkedIn, Instagram, X and Facebook channels','Manage WhatsApp broadcast campaigns','Track and report on traffic, leads and conversions via GA4 and Search Console','Coordinate with designers for creatives','Identify new digital channels and growth opportunities'],
    requirements: ['1–3 years in digital marketing — SEO, Google Ads, social media','Hands-on with Google Analytics, Search Console, Meta Ads Manager','Strong written English — can write a blog post from scratch','Basic HTML/CSS knowledge and CMS experience is a plus','Graduate in Marketing, Mass Communication or equivalent'],
    perks: ['Competitive salary','Ad budget to experiment with','Hybrid work model','Health insurance'],
  },
  {
    title: 'HR Executive', type: 'Full-time', location: 'Koramangala, Bengaluru', dept: 'Human Resources',
    color: '#FDF4FF', accent: '#7C3AED',
    about: 'Build and maintain a great team at LauncherDesk. Own the full recruitment cycle, onboarding experience, culture initiatives and HR operations for a growing startup.',
    responsibilities: ['Manage end-to-end recruitment — job postings, screening, interviews, offer letters','Onboard new hires and ensure a smooth first-week experience','Maintain employee records, attendance and leave management','Handle payroll inputs and statutory compliance coordination','Drive employee engagement — team events, feedback sessions, recognition','Support performance review cycles and goal-setting'],
    requirements: ['1–3 years in HR — recruitment, onboarding and HR operations','Familiarity with Indian labour laws and statutory requirements (PF, ESI, PT)','Strong interpersonal and communication skills','Experience with ATS or HRMS tools is a plus','MBA/PGDM in HR or BBA with HR specialisation'],
    perks: ['Competitive salary','Health insurance','Opportunity to build HR from ground up','Direct reporting to founders'],
  },
  {
    title: 'Operations Executive', type: 'Full-time', location: 'Koramangala, Bengaluru', dept: 'Operations',
    color: '#F0F9FF', accent: '#0284C7',
    about: 'Keep the engine running. Coordinate service delivery across registrations, compliance filings, IT projects and client requests — ensuring every client gets a smooth, on-time experience.',
    responsibilities: ['Coordinate with clients to collect documents for service delivery','Liaise with CAs, CSs, lawyers and government portals to complete filings','Track all active orders and proactively update clients on status','Maintain project trackers, checklists and SOPs for each service','Identify bottlenecks and propose process improvements','Handle client escalations professionally and resolve quickly'],
    requirements: ['1–3 years in operations, client servicing or project coordination','Detail-oriented with strong follow-through','Comfortable with government portals (MCA, GSTN, IP India) is a big plus','Good written and verbal communication','Graduate in any stream; B.Com or BBA preferred'],
    perks: ['Competitive salary','Health insurance','Structured growth path','Work on 100+ client projects per month'],
  },
  {
    title: 'Accounts Executive', type: 'Full-time', location: 'Koramangala, Bengaluru', dept: 'Finance & Accounts',
    color: '#FFF9C4', accent: '#B45309',
    about: 'Manage day-to-day accounting operations for LauncherDesk — from invoicing and collections to vendor payments, reconciliation and MIS reporting.',
    responsibilities: ['Raise client invoices and track payments and collections','Process vendor payments and maintain accounts payable records','Reconcile bank statements and internal ledgers monthly','Prepare MIS reports — P&L, cash flow and outstanding statements','Assist with monthly GST return preparation and reconciliation','Coordinate with auditors for annual audit support'],
    requirements: ['1–3 years in accounting or finance operations','Proficient in Tally ERP / QuickBooks and MS Excel','Working knowledge of GST, TDS and Indian accounting standards','Accurate, organized and reliable','B.Com / M.Com / CA Inter preferred'],
    perks: ['Competitive salary','Health insurance','CA mentorship available','Exposure to multi-entity accounting'],
  },
]

const WA_PATH = 'M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z'

function JobCard({ job }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background:'#fff', border:`1.5px solid ${open?job.accent:'var(--line)'}`, borderRadius:16, overflow:'hidden', transition:'border-color .2s,box-shadow .2s', boxShadow: open?`0 8px 32px ${job.accent}20`:'0 2px 8px rgba(13,31,60,.06)' }}>
      <div style={{ padding:'24px 24px 20px', display:'flex', alignItems:'flex-start', gap:16 }}>
        <div style={{ width:48,height:48,borderRadius:12,background:job.color,display:'grid',placeItems:'center',flexShrink:0 }}>
          <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke={job.accent} strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12,flexWrap:'wrap' }}>
            <div>
              <h3 style={{ fontSize:17,fontWeight:800,color:'var(--navy)',marginBottom:6 }}>{job.title}</h3>
              <div style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
                <span style={{ fontSize:12,fontWeight:600,padding:'3px 10px',borderRadius:99,background:job.color,color:job.accent }}>{job.dept}</span>
                <span style={{ fontSize:12,color:'var(--text-2)',display:'flex',alignItems:'center',gap:4 }}>
                  <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {job.location}
                </span>
                <span style={{ fontSize:12,color:'var(--text-2)',display:'flex',alignItems:'center',gap:4 }}>
                  <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  {job.type}
                </span>
              </div>
            </div>
            <button onClick={()=>setOpen(o=>!o)} style={{ display:'inline-flex',alignItems:'center',gap:6,padding:'9px 18px',borderRadius:9,fontWeight:700,fontSize:13.5,background:open?job.accent:'#F8FAFF',color:open?'#fff':job.accent,border:`1.5px solid ${job.accent}`,cursor:'pointer',fontFamily:'inherit',transition:'all .15s',flexShrink:0 }}>
              {open?'Close':'View Details'}
              <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} style={{ transform:open?'rotate(180deg)':'none',transition:'transform .2s' }}><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div style={{ padding:'0 24px 24px',borderTop:`1px solid ${job.color}` }}>
          <p style={{ fontSize:14.5,color:'var(--text-2)',lineHeight:1.7,margin:'20px 0 24px' }}>{job.about}</p>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:24 }}>
            {[['Responsibilities',job.responsibilities],['Requirements',job.requirements]].map(([label,items])=>(
              <div key={label}>
                <h4 style={{ fontSize:14,fontWeight:700,color:'var(--navy)',marginBottom:12,display:'flex',alignItems:'center',gap:6 }}>
                  <span style={{ width:6,height:6,borderRadius:'50%',background:job.accent,display:'inline-block' }}/>
                  {label}
                </h4>
                <ul style={{ listStyle:'none',display:'flex',flexDirection:'column',gap:8 }}>
                  {items.map(r=>(
                    <li key={r} style={{ display:'flex',gap:8,fontSize:13.5,color:'var(--text)',lineHeight:1.5,alignItems:'flex-start' }}>
                      <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke={job.accent} strokeWidth={2.5} style={{ flexShrink:0,marginTop:2 }}><path d="M20 6 9 17l-5-5"/></svg>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ background:job.color,borderRadius:10,padding:'14px 18px',marginBottom:20 }}>
            <div style={{ fontSize:12,fontWeight:700,color:job.accent,letterSpacing:'.06em',textTransform:'uppercase',marginBottom:8 }}>What we offer</div>
            <div style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
              {job.perks.map(p=><span key={p} style={{ fontSize:12.5,fontWeight:600,padding:'4px 12px',borderRadius:99,background:'#fff',color:job.accent,border:`1px solid ${job.accent}30` }}>{p}</span>)}
            </div>
          </div>
          <div style={{ display:'flex',gap:12,flexWrap:'wrap' }}>
            <a href={`mailto:contact@launcherdesk.com?subject=Application: ${job.title}&body=Hi LauncherDesk Team,%0D%0A%0D%0AI would like to apply for the ${job.title} position.%0D%0A%0D%0AName:%0D%0AExperience:%0D%0ALinkedIn:%0D%0A%0D%0APlease find my resume attached.`}
              style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'11px 22px',background:job.accent,color:'#fff',borderRadius:10,fontWeight:700,fontSize:14,textDecoration:'none' }}>
              Apply via Email →
            </a>
            <a href={`https://wa.me/918548854859?text=Hi, I'd like to apply for the ${job.title} role at LauncherDesk.`} target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'11px 20px',background:'#25D366',color:'#fff',borderRadius:10,fontWeight:700,fontSize:14,textDecoration:'none' }}>
              <svg viewBox="0 0 32 32" width={18} height={18} fill="currentColor"><path d={WA_PATH}/></svg>
              Apply on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CareersPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
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
            <a href="mailto:contact@launcherdesk.com" className="btn btn-outline-white">Email your profile</a>
          </div>
        </div>
      </header>

      <section className="section-sm" style={{background:'#F8FAFF'}}>
        <div className="wrap">
          <div className="sec-head center reveal-up" style={{marginBottom:40}}>
            <span className="eyebrow">Why LauncherDesk</span>
            <h2 style={{fontSize:'clamp(24px,3vw,34px)'}}>Why people love working here</h2>
          </div>
          <div className="grid-4 reveal-up">
            {[['🚀','Real impact','Every service helps a founder start, grow or protect their business.'],['📈','Fast growth','We\'re scaling quickly — grow with the company and take on real responsibility.'],['🤝','Small, great team','Work directly with founders. No bureaucracy. Your ideas are heard from day one.'],['📍','Koramangala HQ','Prime Bengaluru location in the heart of the startup ecosystem.']].map(([i,t,d])=>(
              <div key={t} className="card" style={{textAlign:'center'}}>
                <div style={{fontSize:32,marginBottom:12}}>{i}</div>
                <h3 style={{fontSize:16,fontWeight:700,color:'var(--navy)',marginBottom:8}}>{t}</h3>
                <p style={{fontSize:13.5,color:'var(--text-2)',lineHeight:1.6}}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm" id="openings">
        <div className="wrap">
          <div className="sec-head reveal-up" style={{marginBottom:32}}>
            <span className="eyebrow">Open roles</span>
            <h2 style={{fontSize:'clamp(24px,3vw,34px)'}}>Current openings — {JOBS.length} positions</h2>
            <p style={{marginTop:8,color:'var(--text-2)'}}>All roles are based in Koramangala, Bengaluru. Click any role to see full details and apply.</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {JOBS.map(job=><JobCard key={job.title} job={job}/>)}
          </div>
        </div>
      </section>

      <section className="section section-warm">
        <div className="wrap">
          <div className="final reveal-up">
            <h2>Don't see the right role?</h2>
            <p>Send us your profile anyway. We're always open to meeting sharp people — even before a specific role opens up.</p>
            <div className="row">
              <a href="mailto:contact@launcherdesk.com?subject=Open Application — LauncherDesk" className="btn btn-light">Email your CV</a>
              <a href="https://wa.me/918548854859?text=Hi, I'd like to explore career opportunities at LauncherDesk." target="_blank" rel="noopener noreferrer" className="btn btn-ghost-d">WhatsApp us</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}