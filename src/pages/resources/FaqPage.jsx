import React from 'react'

const CHEV = 'm9 18 6-6-6-6'
const PLUS = 'M12 5v14M5 12h14'

function FaqGroup({ section, faqs }) {
  const [showAll, setShowAll] = React.useState(false)
  const visible = showAll ? faqs : faqs.slice(0, 4)
  const hasMore = faqs.length > 4
  return (
    <div style={{marginBottom:44}}>
      <h2 style={{fontSize:20,fontWeight:700,color:'var(--blue-dark)',marginBottom:4,letterSpacing:'-.01em'}}>{section}</h2>
      <div className="faq" style={{maxWidth:'none',marginTop:0}}>
        {visible.map((item, i) => (
          <div key={i} className="faq-i">
            <div className="faq-q">
              {item.q}
              <svg viewBox="0 0 24 24" fill="none"><path d={PLUS}/></svg>
            </div>
            <div className="faq-a"><p>{item.a}</p></div>
          </div>
        ))}
      </div>
      {hasMore && !showAll && (
        <div style={{marginTop:16}}>
          <button onClick={() => setShowAll(true)} style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'0 20px', height:40, borderRadius:8,
            background:'var(--blue)', color:'#fff', fontWeight:700,
            fontSize:13.5, border:'none', cursor:'pointer',
            boxShadow:'0 4px 14px rgba(29,111,224,.25)',
          }}>
            View more
            <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      )}
    </div>
  )
}

const FAQS = [
  // About LauncherDesk
  {
    section: 'About LauncherDesk',
    q: 'What is LauncherDesk?',
    a: 'LauncherDesk is a business services facilitation platform that helps founders and businesses access and coordinate essential business services through one team. We cover company registration, compliance, technology, finance, marketing and growth — across the full business lifecycle.',
  },
  {
    section: 'About LauncherDesk',
    q: 'Is LauncherDesk a government organisation?',
    a: 'No. LauncherDesk is a private business services facilitation platform operated by DutyLaunch Solutions Private Limited. Government registrations, statutory filings and government approvals are made by the relevant government authorities — not by LauncherDesk.',
  },
  {
    section: 'About LauncherDesk',
    q: 'Where is LauncherDesk based?',
    a: 'We are based in Koramangala, Bengaluru, Karnataka. We support businesses across India.',
  },
  {
    section: 'About LauncherDesk',
    q: 'Are you a consultancy or a platform?',
    a: 'Both. Today, LauncherDesk operates as a managed service — you get a team that coordinates everything for you. We are also building a technology platform (dashboard, compliance calendar, document vault) that will be available to customers in the future.',
  },
  // Services & Process
  {
    section: 'Services & Process',
    q: 'What services does LauncherDesk offer?',
    a: 'We support business registration, GST and compliance, trademark and IP, website and technology development, accounting and bookkeeping, payroll, legal document support, digital marketing, SEO, social media, CRM setup, WhatsApp Business API, international company setup and fundraising documentation.',
  },
  {
    section: 'Services & Process',
    q: 'Do I need to manage multiple vendors through LauncherDesk?',
    a: "No. That is the point. LauncherDesk coordinates with the relevant professionals and service providers on your behalf. You deal with one team and one point of contact.",
  },
  {
    section: 'Services & Process',
    q: 'How quickly can you register my company?',
    a: 'Private Limited Company registration typically takes 7–10 working days from the time all required documents are submitted. LLP registration typically takes 10–14 working days. OPC registration typically takes 7–10 working days. These are estimates — government processing timelines can vary.',
  },
  {
    section: 'Services & Process',
    q: 'Do you directly provide all services, or do you use partners?',
    a: 'LauncherDesk facilitates and coordinates business services. Where a service requires a licensed professional (such as a Chartered Accountant, Company Secretary or Advocate), the relevant professional performs that service. Government registrations and statutory approvals are processed through the relevant authorities. LauncherDesk coordinates and manages the overall process.',
  },
  {
    section: 'Services & Process',
    q: 'Can an existing business use LauncherDesk?',
    a: 'Yes. You do not need to be a new company. Existing businesses use LauncherDesk for compliance, accounting, tax, technology, marketing and other ongoing requirements.',
  },
  {
    section: 'Services & Process',
    q: 'Do you work with businesses outside Bengaluru?',
    a: 'Yes. We support businesses across India, subject to the availability and applicability of specific services in each location.',
  },
  // Pricing
  {
    section: 'Pricing',
    q: 'How much does it cost?',
    a: 'Pricing varies by service and requirement. We provide a clear, upfront quote before you proceed. There are no hidden charges. Government fees and statutory charges are disclosed separately.',
  },
  {
    section: 'Pricing',
    q: 'Are there any hidden fees?',
    a: 'No. We provide complete transparency on what is included and what it costs before any engagement begins. Government fees, professional fees and other applicable charges are explained in full.',
  },
  {
    section: 'Pricing',
    q: 'Can I start with one service and add more later?',
    a: 'Yes. Many customers start with company registration and return for compliance, accounting, website development or marketing as their business grows.',
  },
  // Getting Started
  {
    section: 'Getting Started',
    q: 'How do I get started?',
    a: 'The easiest way is to WhatsApp us at +91 85488 54859 or fill in the contact form on our Contact page. Tell us what you need — we\'ll understand your requirement and guide you on the next step. No obligation.',
  },
  {
    section: 'Getting Started',
    q: 'What information do I need to provide?',
    a: 'Start with your name, business name (if applicable), what you need, and your contact details. Your LauncherDesk contact will guide you on any specific documents or information required once they understand your requirement.',
  },
]

// Group FAQs by section
const grouped = FAQS.reduce((acc, faq) => {
  if (!acc[faq.section]) acc[faq.section] = []
  acc[faq.section].push(faq)
  return acc
}, {})

export default function FaqPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <a href="/resources">Resources</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">FAQ</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>Frequently asked questions</span>
          <h1 className="reveal-up in">Questions we get asked most often.</h1>
          <p className="lead reveal-up in">Everything worth knowing before you reach out. Still have a question? A real person will answer.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="wrap">
          {Object.entries(grouped).map(([section, faqs]) => (
            <FaqGroup key={section} section={section} faqs={faqs} />
          ))}

          <div style={{marginTop:40,background:'var(--bg-warm)',borderRadius:16,padding:'28px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
            <div>
              <h3 style={{fontSize:18,marginBottom:6}}>Still have a question?</h3>
              <p style={{color:'var(--text-2)',fontSize:14.5}}>A real person will answer — not a bot.</p>
            </div>
            <a href="https://wa.me/918548854859?text=Hi%20LauncherDesk%2C%20I%20have%20a%20question%20about%20your%20services." className="btn btn-primary">
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}