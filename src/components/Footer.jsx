import { Link } from 'react-router-dom'
import logoImg from '../assets/launcherdesk-logo-transparent.png'
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
        <div className="foot-cols">
          {/* Col 1 — Brand + description */}
          <div>
            <Link to="/" style={{display:'inline-flex',textDecoration:'none'}}>
              <img src={logoImg} alt="LauncherDesk" style={{height:42,width:'auto',display:'block'}} />
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

        {/* Social connections */}
        <div style={{borderTop:'1px solid rgba(255,255,255,.07)',paddingTop:28,marginBottom:28,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:20}}>
          <div>
            <div style={{fontSize:12,fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:'#6da8e0',marginBottom:14}}>Connect with us</div>
            <div style={{display:'flex',gap:10}}>
              {[
                {href:'https://www.instagram.com/launcherdesk?igsh=MWxleG1ubm9kNW4xbw==',label:'Instagram',
                 path:'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z|M17.5 6.5h.01|M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z'},
                {href:'https://x.com/LauncherDesk',label:'X (Twitter)',
                 path:'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.259 5.631zM17.11 20.89h1.833L7.05 4.126H5.099z'},
                {href:'https://www.facebook.com/share/181iGTzpPf/',label:'Facebook',
                 path:'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'},
                {href:'https://www.linkedin.com/in/launcher-desk-9251923a3?utm_source=share_via&utm_content=profile&utm_medium=member_android',label:'LinkedIn',
                 path:'16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z|M2 9h4v12H2z|M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'},
              ].map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{width:40,height:40,borderRadius:10,background:'rgba(255,255,255,.07)',border:'1px solid rgba(255,255,255,.1)',display:'grid',placeItems:'center',transition:'background .15s,transform .15s',textDecoration:'none'}}
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
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            {[
              {l:'WhatsApp',h:'https://wa.me/918458845859',bg:'rgba(37,211,102,.15)',c:'#25D366',border:'rgba(37,211,102,.3)'},
              {l:'Email us',h:'mailto:contact@launcherdesk.com',bg:'rgba(29,111,224,.15)',c:'#7ecef4',border:'rgba(29,111,224,.3)'},
            ].map(b=>(
              <a key={b.l} href={b.h} target="_blank" rel="noopener noreferrer"
                style={{display:'inline-flex',alignItems:'center',gap:8,padding:'8px 16px',borderRadius:8,background:b.bg,border:`1px solid ${b.border}`,color:b.c,fontSize:13,fontWeight:600,textDecoration:'none'}}>
                {b.l}
              </a>
            ))}
          </div>
        </div>
        <div className="foot-bottom" style={{flexDirection:'column',alignItems:'flex-start',gap:12}}>
          <p style={{fontSize:11.5,color:'#3d618a',lineHeight:1.7,maxWidth:900}}>
            LauncherDesk is a business services facilitation platform operated by DutyLaunch Solutions Private Limited. LauncherDesk facilitates access to business services and may coordinate with relevant professionals, partners and service providers. Where a service requires a licensed professional, statutory filing or government approval, the relevant professional or authority remains responsible for the applicable filing, decision or approval. Timelines and outcomes may vary based on the relevant authority, professional and customer documentation. LauncherDesk does not act as a regulatory authority and does not guarantee registrations, approvals or outcomes.
          </p>
          <div style={{display:'flex',justifyContent:'space-between',width:'100%',flexWrap:'wrap',gap:10,alignItems:'center'}}>
            <span>© {year} LauncherDesk · DutyLaunch Solutions Private Limited · All rights reserved.</span>
            <div style={{display:'flex',alignItems:'center',gap:16}}>
              <img src={msmeImg} alt="MSME – Micro, Small &amp; Medium Enterprises" style={{height:44,width:'auto',display:'block',filter:'brightness(1.1)'}} />
              <span style={{color:'#3d618a'}}>Made in India 🇮🇳</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}