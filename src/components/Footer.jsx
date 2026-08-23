import { Link } from 'react-router-dom'

const ROCKET = 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0'

function Fl({ href, children }) {
  return <a className="fl" href={href} dangerouslySetInnerHTML={{ __html: children }} />
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-cols">
          {/* Col 1 — Brand + description */}
          <div>
            <Link className="brand" to="/">
              <span className="mk">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={ROCKET} />
                </svg>
              </span>
              <span className="txt">Launcher<b>Desk</b></span>
            </Link>
            <p style={{marginTop:10,fontSize:13,color:'#6da8e0',fontWeight:700,letterSpacing:'.04em'}}>Your Business HQ. Launch. Manage. Grow.</p>
            <p className="foot-desc">LauncherDesk helps founders and businesses access, coordinate and manage the services they need — from company registration and compliance to technology, finance, marketing and growth.</p>
          </div>

          {/* Col 2 — START */}
          <div>
            <h5>START</h5>
            <Fl href="/services/private-limited-company-registration">Private Limited Company Registration</Fl>
            <Fl href="/services/llp-registration">LLP Registration</Fl>
            <Fl href="/services/opc-registration">One Person Company Registration</Fl>
          </div>

          {/* Col 3 — BUILD & MANAGE */}
          <div>
            <h5>BUILD &amp; MANAGE</h5>
            <Fl href="/services/website-development">Website Development</Fl>
            <Fl href="/services/branding-logo-design">Branding &amp; Logo Design</Fl>
            <Fl href="/services/accounting">Accounting &amp; Bookkeeping</Fl>
          </div>

          {/* Col 4 — GROW & EXPAND */}
          <div>
            <h5>GROW &amp; EXPAND</h5>
            <Fl href="/services/digital-marketing">SEO &amp; Performance Marketing</Fl>
            <Fl href="/services/social-media-management">Social Media Management</Fl>
            <Fl href="/services/whatsapp-business-api">WhatsApp Business API</Fl>
          </div>

          {/* Col 5 — Company + Contact */}
          <div>
            <h5>Company</h5>
            <Fl href="/company/about">About Us</Fl>
            <Fl href="/company/contact">Contact Us</Fl>
            <Fl href="/pricing">Pricing</Fl>
            <Fl href="/resources">Resources / Blog</Fl>
            <Fl href="/resources/faq">FAQ</Fl>
            <div style={{marginTop:18}}>
              <h5>Contact</h5>
              <div style={{display:'flex',flexDirection:'column',gap:6,marginTop:8}}>
                <a href="tel:+918548854859" className="fl">+91 85488 54859</a>
                <a href="mailto:contact@launcherdesk.com" className="fl">contact@launcherdesk.com</a>
                <span style={{fontSize:13,color:'#5e7fa0',lineHeight:1.55}}>4th Block, Koramangala,<br/>Bengaluru – 560095</span>
              </div>
            </div>
          </div>
        </div>

        <div className="foot-bottom" style={{flexDirection:'column',alignItems:'flex-start',gap:12}}>
          <p style={{fontSize:11.5,color:'#3d618a',lineHeight:1.7,maxWidth:900}}>
            LauncherDesk is a business services facilitation platform operated by DutyLaunch Solutions Private Limited. LauncherDesk facilitates access to business services and may coordinate with relevant professionals, partners and service providers. Where a service requires a licensed professional, statutory filing or government approval, the relevant professional or authority remains responsible for the applicable filing, decision or approval. Timelines and outcomes may vary based on the relevant authority, professional and customer documentation. LauncherDesk does not act as a regulatory authority and does not guarantee registrations, approvals or outcomes.
          </p>
          <div style={{display:'flex',justifyContent:'space-between',width:'100%',flexWrap:'wrap',gap:10}}>
            <span>© {year} LauncherDesk · DutyLaunch Solutions Private Limited · All rights reserved.</span>
            <span style={{color:'#3d618a'}}>Made in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  )
}