import { Link } from 'react-router-dom'
import logoImg from '../assets/launcherdesk-logo-footer.png'
import msmeImg from '../assets/msme-logo.png'

const ROCKET = 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0'

function Fl({ href, children }) {
  return <a className="fl" href={href} dangerouslySetInnerHTML={{ __html: children }} />
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="wrap">

        {/* ── Top row: Logo + nav cols ── */}
        <div className="foot-cols">

          {/* Col 1 — Brand */}
          <div className="foot-brand">
            <Link to="/" style={{display:'inline-flex',textDecoration:'none'}}>
              <img src={logoImg} alt="LauncherDesk" style={{height:50,width:'auto',display:'block'}} />
            </Link>
            <p style={{marginTop:10,fontSize:12.5,color:'#6da8e0',fontWeight:700,letterSpacing:'.04em'}}>Your Business HQ. Launch. Manage. Grow.</p>
            <p className="foot-desc">LauncherDesk helps founders and businesses access, coordinate and manage the services they need — from registration and compliance to technology, finance, marketing and growth.</p>
          </div>

          {/* Col 2 — Company */}
          <div>
            <h5>Company</h5>
            <Fl href="/company/about">About Us</Fl>
            <Fl href="/company/contact">Contact Us</Fl>
            <Fl href="/pricing">Pricing</Fl>
            <Fl href="/resources">Resources / Blog</Fl>
            <Fl href="/resources/faq">FAQ</Fl>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h5>Contact</h5>
            <a href="tel:+918548854859" className="fl">+91 85488 54859</a>
            <a href="mailto:contact@launcherdesk.com" className="fl">contact@launcherdesk.com</a>
          </div>

          {/* Col 4 — Addresses */}
          <div>
            <h5>Addresses</h5>
            <div style={{marginBottom:16}}>
              <div style={{fontSize:10.5,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#6da8e0',marginBottom:5}}>Registered</div>
              <span style={{fontSize:13,color:'#5e7fa0',lineHeight:1.65}}>472/7, 20th L Cross Rd,<br/>4th Block, Koramangala,<br/>Bangalore – 560095</span>
            </div>
            <div>
              <div style={{fontSize:10.5,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#6da8e0',marginBottom:5}}>Corporate</div>
              <span style={{fontSize:13,color:'#5e7fa0',lineHeight:1.65}}>#63, Office No. 224 & 225, 2nd Floor,<br/>The Plazzo Mall, Ibrahim Sahib St,<br/>Off Commercial Street, Bangalore – 560001</span>
            </div>
          </div>
        </div>

        {/* ── Social + CTA row ── */}
        <div className="foot-social-row">
          <div>
            <div className="foot-social-label">Connect with us</div>
            <div style={{display:'flex',gap:10,marginTop:12}}>
              {[
                {href:'https://www.instagram.com/launcherdesk?igsh=MWxleG1ubm9kNW4xbw==',label:'Instagram',
                 path:'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z|M17.5 6.5h.01|M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z'},
                {href:'https://x.com/LauncherDesk',label:'X',
                 path:'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.259 5.631zM17.11 20.89h1.833L7.05 4.126H5.099z'},
                {href:'https://www.facebook.com/share/181iGTzpPf/',label:'Facebook',
                 path:'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'},
                {href:'https://www.linkedin.com/in/launcher-desk-9251923a3?utm_source=share_via&utm_content=profile&utm_medium=member_android',label:'LinkedIn',
                 path:'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z|M2 9h4v12H2z|M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'},
              ].map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="foot-social-btn"
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(29,111,224,.25)';e.currentTarget.style.transform='translateY(-2px)'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.07)';e.currentTarget.style.transform='none'}}
                >
                  <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="#9ab5d4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    {s.path.split('|').map((p,i)=><path key={i} d={p}/>)}
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
            <a href="https://wa.me/918458845859" target="_blank" rel="noopener noreferrer" className="foot-cta-btn foot-cta-wa">WhatsApp</a>
            <a href="mailto:contact@launcherdesk.com" className="foot-cta-btn foot-cta-email">Email us</a>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="foot-bottom">
          <p style={{fontSize:11.5,color:'#3d618a',lineHeight:1.7,maxWidth:760,margin:0}}>
            LauncherDesk is a business services facilitation platform operated by DutyLaunch Solutions Private Limited. Services may involve licensed professionals, statutory filings or government approvals. Timelines and outcomes may vary. LauncherDesk does not act as a regulatory authority and does not guarantee registrations or approvals.
          </p>
          <div style={{display:'flex',justifyContent:'space-between',width:'100%',flexWrap:'wrap',gap:12,alignItems:'center',marginTop:16}}>
            <span style={{fontSize:12,color:'#3d618a'}}>© {year} LauncherDesk · DutyLaunch Solutions Private Limited · All rights reserved.</span>
            <div style={{display:'flex',alignItems:'center',gap:14}}>
              <img src={msmeImg} alt="MSME" style={{height:40,width:'auto',display:'block',filter:'brightness(1.1)'}} />
              <span style={{fontSize:13,color:'#3d618a'}}>Made in India 🇮🇳</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}