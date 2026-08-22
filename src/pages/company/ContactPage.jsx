import { useState } from 'react'

const CHEV = 'm9 18 6-6-6-6'
const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan',
  'Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Delhi (NCT)','Jammu & Kashmir','Ladakh','Puducherry','Chandigarh',
  'Andaman & Nicobar Islands','Dadra & Nagar Haveli and Daman & Diu','Lakshadweep',
]

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <form id="contact-form" className="form reveal-up" style={{minWidth:0}} onSubmit={handleSubmit}>
      <h3 style={{fontSize:22,textAlign:'center',marginBottom:22}}>Talk to an Expert</h3>
      {submitted ? (
        <p style={{marginTop:16,textAlign:'center',color:'var(--success)',fontFamily:'var(--font)',fontWeight:600,fontSize:14}}>
          Thanks — your request has been noted. An expert will reach out shortly.
        </p>
      ) : (
        <>
          <div className="field"><input type="text" required placeholder="Name*"/></div>
          <div className="field"><input type="tel" required placeholder="Mobile*"/></div>
          <div className="field"><input type="email" required placeholder="Email*"/></div>
          <div className="field">
            <select required defaultValue="">
              <option value="" disabled>Select State*</option>
              {STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center',background:'var(--navy-2)'}}>Submit</button>
          <label className="form-check">
            <input type="checkbox" defaultChecked/>
            <span>I agree to receive updates and brochure on WhatsApp.</span>
          </label>
          <p className="wa-line form-check" style={{justifyContent:'center',textAlign:'center'}}>
            Or connect instantly: <a href="https://wa.me/918458845859" className="wa-link">WhatsApp Us</a>
          </p>
        </>
      )}
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
          <span className="eyebrow reveal-up in" style={{marginTop:16,display:'block'}}>Contact Us</span>
          <h1 className="reveal-up in">We are <span className="grad-text">LauncherDesk</span></h1>
        </div>
      </header>

      <section className="section-sm">
        <div className="wrap">
          <div className="sec-head reveal-up" style={{marginBottom:30}}>
            <h2 style={{fontSize:'clamp(28px,3.4vw,42px)'}}>Get in Touch with Us</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-info reveal-up">
              <div className="ci-row">
                <span className="ic-box">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <div>
                  <b>Corporate Address</b>
                  <span>DutyLaunch Solutions Private Limited<br/>472/7, 20th L Cross Road, 4th Block,<br/>Koramangala, Bengaluru – 560095, Karnataka, India.</span>
                </div>
              </div>
              <div className="ci-row">
                <span className="ic-box">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <div>
                  <b>Call Us</b>
                  <span><a href="tel:+918458845859" style={{color:'var(--text-2)'}}>+91 84588 45859</a></span>
                </div>
              </div>
              <div className="ci-row" style={{borderBottom:0}}>
                <span className="ic-box">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>
                </span>
                <div>
                  <b>Email Support</b>
                  <span><a href="mailto:contact@launcherdesk.com" style={{color:'var(--text-2)'}}>contact@launcherdesk.com</a></span>
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