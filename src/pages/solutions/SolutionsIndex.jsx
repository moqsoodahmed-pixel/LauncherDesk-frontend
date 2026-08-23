const CHEV = 'm9 18 6-6-6-6'

const STAGES = [
  {
    id: 'start', href: '/solutions/business-setup',
    icon: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z',
    stage: 'START', title: 'Set up your business correctly.',
    desc: 'Everything you need to get your business legally established, registered and protected from day one.',
    services: ['Private Limited Company Registration', 'LLP Registration', 'One Person Company (OPC) Registration', 'GST Registration', 'Startup India / DPIIT Recognition', 'MSME / Udyam Registration', 'Trademark Registration', 'ISO Certification'],
    cta: 'Explore all START solutions',
  },
  {
    id: 'build', href: '/solutions/business-setup',
    icon: 'M2 3h20v14H2zM8 21h8M12 17v4',
    stage: 'BUILD', title: 'Create your digital and brand foundation.',
    desc: 'Everything you need to have a professional online presence, working technology and a strong brand identity.',
    services: ['Website Development', 'E-Commerce Website', 'Branding & Logo Design', 'Business Email & Hosting', 'Software & SaaS Development', 'Business Automation'],
    cta: 'Explore all BUILD solutions',
  },
  {
    id: 'manage', href: '/solutions/compliance-management',
    icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
    stage: 'MANAGE', title: 'Keep your business running smoothly.',
    desc: 'Ongoing finance, compliance, HR and legal support so your business stays on track and nothing slips through.',
    services: ['Accounting & Bookkeeping', 'GST Filing & Returns', 'Income Tax Filing', 'ROC / Annual Compliance', 'Payroll Management', 'Legal Document Support'],
    cta: 'Explore all MANAGE solutions',
  },
  {
    id: 'grow', href: '/solutions/business-growth',
    icon: 'M3 3v18h18M7 14l4-4 3 3 5-6',
    stage: 'GROW', title: 'Reach more customers and grow your revenue.',
    desc: 'Marketing, CRM and digital growth services to help your business find new customers and retain existing ones.',
    services: ['SEO & Performance Marketing', 'Social Media Management', 'WhatsApp Business API', 'CRM Setup & Lead Management', 'Google Ads & Paid Marketing'],
    cta: 'Explore all GROW solutions',
  },
  {
    id: 'expand', href: '/solutions/advisory',
    icon: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20',
    stage: 'EXPAND', title: 'Take your business to the next stage.',
    desc: 'Fundraising support, international expansion, business consulting and strategic services for businesses ready to grow bigger.',
    services: ['International Company Setup (UAE, UK, US, Singapore)', 'UAE Business Setup', 'Fundraising Documentation', 'Business Consulting', 'Strategic Growth Support'],
    cta: 'Explore all EXPAND solutions',
  },
]

export default function SolutionsIndex() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a>
            <svg viewBox="0 0 24 24"><path d={CHEV} /></svg>
            <span className="cur">Solutions</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{ marginTop: 16, display: 'block' }}>Organised by business stage</span>
          <h1 className="reveal-up in">Solutions for every stage of your business.</h1>
          <p className="lead reveal-up in">Whether you're registering your first company or scaling your tenth — LauncherDesk helps you find, arrange and coordinate the services your business needs, at every stage.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="wrap">
          {STAGES.map((stage) => (
            <div key={stage.id} style={{marginBottom:48,paddingBottom:48,borderBottom:'1px solid var(--line)'}}>
              <div className="reveal-up" style={{display:'flex',alignItems:'flex-start',gap:20,marginBottom:20}}>
                <div style={{width:52,height:52,borderRadius:14,background:'var(--grad)',display:'grid',placeItems:'center',boxShadow:'var(--sh-blue)',flex:'none'}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{width:26,height:26}}><path d={stage.icon}/></svg>
                </div>
                <div>
                  <div style={{fontFamily:'var(--font)',fontSize:11,fontWeight:800,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--blue)',marginBottom:4}}>{stage.stage}</div>
                  <h2 style={{fontSize:'clamp(20px,2.5vw,28px)',marginBottom:6}}>{stage.title}</h2>
                  <p style={{color:'var(--text-2)',fontSize:15.5}}>{stage.desc}</p>
                </div>
              </div>
              <div className="reveal-up" style={{marginLeft:72,display:'flex',flexWrap:'wrap',gap:10,marginBottom:16}}>
                {stage.services.map(s => (
                  <span key={s} style={{fontSize:13.5,fontFamily:'var(--font)',fontWeight:600,padding:'7px 14px',borderRadius:99,background:'var(--bg)',border:'1px solid var(--line)',color:'var(--navy)'}}>{s}</span>
                ))}
              </div>
              <div style={{marginLeft:72}}>
                <a href={stage.href} className="btn btn-soft btn-sm">{stage.cta} →</a>
              </div>
            </div>
          ))}

          <div className="reveal-up" style={{background:'var(--bg-warm)',borderRadius:18,padding:'32px 36px',marginTop:12}}>
            <h3 style={{fontSize:20,marginBottom:8}}>Not sure which category is right for you?</h3>
            <p style={{color:'var(--text-2)',marginBottom:20}}>Use our service finder and we'll point you to the right starting point — free, no obligation.</p>
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <a href="/services#finder" className="btn btn-primary">Find My Solutions</a>
              <a href="/company/contact" className="btn btn-soft">Talk to an Expert</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}