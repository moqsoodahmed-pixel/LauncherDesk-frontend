import { useState } from 'react'

const CHEV = 'm9 18 6-6-6-6'

const REQUIREMENT_OPTIONS = [
  'Company Setup',
  'GST & Compliance',
  'Website / Technology',
  'Accounting & Tax',
  'Marketing & Growth',
  'Legal & IP',
  'International Expansion',
  'Fundraising Support',
  'Something Else',
]

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="form reveal-up" style={{minWidth:0,textAlign:'center',padding:'48px 32px'}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" style={{width:52,height:52,margin:'0 auto 20px'}}><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        <h3 style={{fontSize:22,marginBottom:12}}>Thank you.</h3>
        <p style={{color:'var(--text-2)',maxWidth:380,margin:'0 auto 20px'}}>Your requirement has been received. We will be in touch within one business day. For faster response, WhatsApp us at +91 84588 45859.</p>
        <a href="https://wa.me/918458845859?text=Hi%20LauncherDesk%2C%20I%20just%20submitted%20an%20enquiry%20and%20wanted%20to%20follow%20up." className="btn btn-wa" style={{display:'inline-flex',margin:'0 auto'}}>
          Chat on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form id="contact-form" className="form reveal-up" style={{minWidth:0}} onSubmit={handleSubmit}>
      <h3 style={{fontSize:22,marginBottom:6}}>Start a requirement</h3>
      <p style={{fontSize:14,color:'var(--text-2)',marginBottom:22}}>We'll respond within one business day. For faster response, use WhatsApp.</p>
      <div className="field"><input type="text" required placeholder="Name*"/></div>
      <div className="field"><input type="tel" required placeholder="Mobile number*"/></div>
      <div className="field"><input type="email" placeholder="Email address"/></div>
      <div className="field"><input type="text" placeholder="Business name (if applicable)"/></div>
      <div className="field">
        <select defaultValue="">
          <option value="" disabled>What do you need help with?</option>
          {REQUIREMENT_OPTIONS.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div className="field">
        <textarea placeholder="Tell us more about your requirement (optional)" style={{minHeight:90}}></textarea>
      </div>
      <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>Send My Requirement</button>
      <label className="form-check" style={{marginTop:14}}>
        <input type="checkbox" defaultChecked/>
        <span>I agree to receive updates on WhatsApp from LauncherDesk.</span>
      </label>
    </form>
  )
}

export default function ContactPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">Contact Us</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>Get in touch</span>
          <h1 className="reveal-up in">Tell us what your business needs.</h1>
          <p className="lead reveal-up in">Whether you're starting a company, managing compliance, building technology or looking to grow — start with a conversation. We'll do the rest.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-info reveal-up">
              {/* WhatsApp */}
              <div className="ci-row">
                <span className="ic-box">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" stroke="var(--blue-dark)"/></svg>
                </span>
                <div>
                  <b>WhatsApp (fastest response)</b>
                  <span><a href="https://wa.me/918458845859?text=Hi%20LauncherDesk%2C%20I'd%20like%20to%20get%20help%20with%20my%20business.%20Where%20do%20I%20start%3F" style={{color:'var(--blue-dark)',fontWeight:700}}>+91 84588 45859</a></span>
                  <span style={{fontSize:13,color:'var(--text-3)',display:'block',marginTop:2}}>We usually respond within minutes during business hours.</span>
                </div>
              </div>
              {/* Phone */}
              <div className="ci-row">
                <span className="ic-box">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <div>
                  <b>Phone</b>
                  <span><a href="tel:+918458845859" style={{color:'var(--text-2)'}}>+91 84588 45859</a></span>
                  <span style={{fontSize:13,color:'var(--text-3)',display:'block',marginTop:2}}>Speak directly with a member of our team.</span>
                </div>
              </div>
              {/* Email */}
              <div className="ci-row">
                <span className="ic-box">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>
                </span>
                <div>
                  <b>Email</b>
                  <span><a href="mailto:contact@launcherdesk.com" style={{color:'var(--text-2)'}}>contact@launcherdesk.com</a></span>
                </div>
              </div>
              {/* Office */}
              <div className="ci-row" style={{borderBottom:0}}>
                <span className="ic-box">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <div>
                  <b>Office</b>
                  <span>4th Block, Koramangala, Bengaluru – 560095, Karnataka, India.</span>
                  <span style={{fontSize:12.5,color:'var(--text-3)',display:'block',marginTop:4}}>DutyLaunch Solutions Private Limited</span>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}