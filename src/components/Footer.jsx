import { Link } from 'react-router-dom'
import logoImg from '../assets/launcherdesk-logo-transparent.png'
import msmeImg from '../assets/MSME_logo.png'
import startupIndiaImg from '../assets/startupindia.png'

const WA_PATH = 'M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z'

const SOCIALS = [
  { href:'https://www.instagram.com/launcherdesk?igsh=MWxleG1ubm9kNW4xbw==', label:'Instagram', path:'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z|M17.5 6.5h.01|M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z' },
  { href:'https://x.com/LauncherDesk', label:'X', path:'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.259 5.631zM17.11 20.89h1.833L7.05 4.126H5.099z' },
  { href:'https://www.facebook.com/share/181iGTzpPf/', label:'Facebook', path:'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { href:'https://www.linkedin.com/in/launcher-desk-9251923a3', label:'LinkedIn', path:'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z|M2 9h4v12H2z|M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
]

const NAV_COLS = [
  { title: 'Company', links: [['About Us','/company/about'],['Contact Us','/company/contact'],['Careers','/company/careers'],['Pricing','/pricing'],['Resources','/resources'],['FAQ','/resources/faq']] },
  { title: 'Services', links: [['Company Registration','/services/private-limited-company-registration'],['GST Registration','/services/gst-registration'],['Trademark','/services/trademark-registration'],['ROC Compliance','/services/roc-compliance'],['Website Development','/services'],['Digital Marketing','/services']] },
  { title: 'Legal', links: [['Terms of Use','/legal/terms'],['Privacy Policy','/legal/privacy'],['Cancellation & Refund','/legal/refund'],['Disclaimer','/legal/disclaimer']] },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background:'#0D1B2E', color:'#9ab5d4' }}>

      {/* ── MAIN BODY ── */}
      <div className="wrap" style={{ padding:'56px 24px 0' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr 1.1fr 1fr', gap:'40px 32px' }}>

          {/* Col 1 — Brand */}
          <div>
            <Link to="/" style={{ display:'inline-flex', textDecoration:'none', marginBottom:16 }}>
              <img src={logoImg} alt="LauncherDesk" style={{ height:46, width:'auto', filter:'brightness(0) invert(1)' }} />
            </Link>
            <p style={{ fontSize:12,fontWeight:700,color:'#F97316',letterSpacing:'.04em',marginBottom:8 }}>
              Your Business HQ. Launch. Manage. Grow.
            </p>
            <p style={{ fontSize:13,color:'#5e7fa0',lineHeight:1.75,marginBottom:20 }}>
              LauncherDesk helps founders and businesses access, coordinate and manage the services they need — from registration and compliance to technology, finance, marketing and growth.
            </p>
            {/* Socials */}
            <div style={{ display:'flex', gap:8, marginBottom:20 }}>
              {SOCIALS.map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ width:34,height:34,borderRadius:8,background:'rgba(255,255,255,.07)',display:'grid',placeItems:'center',transition:'background .15s,transform .15s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(29,111,224,.3)'; e.currentTarget.style.transform='translateY(-2px)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,.07)'; e.currentTarget.style.transform='none' }}>
                  <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="#9ab5d4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    {s.path.split('|').map((p,i)=><path key={i} d={p}/>)}
                  </svg>
                </a>
              ))}
            </div>
            {/* Made in India */}
            <div style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'8px 14px',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.07)',borderRadius:10 }}>
              <span style={{ fontSize:16 }}>🇮🇳</span>
              <div>
                <div style={{ fontSize:11.5,fontWeight:700,letterSpacing:'.04em' }}>
                  <span style={{ color:'#FF9933' }}>Proudly </span>
                  <span style={{ color:'#fff' }}>Made in </span>
                  <span style={{ color:'#138808' }}>India</span>
                </div>
                <div style={{ fontSize:11,color:'#5e7fa0' }}>Built for Indian founders</div>
              </div>
            </div>
          </div>

          {/* Nav cols */}
          {NAV_COLS.map(col=>(
            <div key={col.title}>
              <h5 style={{ fontSize:11,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#6da8e0',marginBottom:16 }}>{col.title}</h5>
              {col.links.map(([label,href])=>(
                <a key={href} href={href} style={{ display:'block',fontSize:13.5,color:'#5e7fa0',marginBottom:10,textDecoration:'none',transition:'color .15s' }}
                  onMouseEnter={e=>e.currentTarget.style.color='#fff'}
                  onMouseLeave={e=>e.currentTarget.style.color='#5e7fa0'}>
                  {label}
                </a>
              ))}
            </div>
          ))}

        </div>

        {/* ── CONTACT + ADDRESSES BAR ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:24, margin:'40px 0 0', padding:'28px 0', borderTop:'1px solid rgba(255,255,255,.07)', borderBottom:'1px solid rgba(255,255,255,.07)' }}>
          {/* Contact */}
          <div>
            <div style={{ fontSize:11,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#6da8e0',marginBottom:14 }}>Contact</div>
            <a href="tel:+918548854859" style={{ display:'flex',alignItems:'center',gap:8,fontSize:14,color:'#9ab5d4',textDecoration:'none',marginBottom:10,transition:'color .15s' }}
              onMouseEnter={e=>e.currentTarget.style.color='#fff'} onMouseLeave={e=>e.currentTarget.style.color='#9ab5d4'}>
              <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.1 6.1l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +91 85488 54859
            </a>
            <a href="mailto:contact@launcherdesk.com" style={{ display:'flex',alignItems:'center',gap:8,fontSize:13.5,color:'#9ab5d4',textDecoration:'none',marginBottom:16,transition:'color .15s' }}
              onMouseEnter={e=>e.currentTarget.style.color='#fff'} onMouseLeave={e=>e.currentTarget.style.color='#9ab5d4'}>
              <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              contact@launcherdesk.com
            </a>
            <div style={{ display:'flex',gap:8 }}>
              <a href="https://wa.me/918548854859" target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex',alignItems:'center',gap:6,padding:'8px 14px',background:'#25D366',color:'#fff',borderRadius:8,fontWeight:700,fontSize:12.5,textDecoration:'none' }}>
                <svg viewBox="0 0 32 32" width={14} height={14} fill="currentColor"><path d={WA_PATH}/></svg>
                WhatsApp
              </a>
              <a href="mailto:contact@launcherdesk.com"
                style={{ display:'inline-flex',alignItems:'center',gap:6,padding:'8px 14px',background:'rgba(255,255,255,.08)',color:'#9ab5d4',borderRadius:8,fontWeight:600,fontSize:12.5,textDecoration:'none',border:'1px solid rgba(255,255,255,.1)' }}>
                Email us
              </a>
            </div>
          </div>

          {/* Registered address */}
          <div>
            <div style={{ fontSize:11,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#6da8e0',marginBottom:14 }}>Registered Office</div>
            <div style={{ display:'flex',gap:10,alignItems:'flex-start' }}>
              <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="#6da8e0" strokeWidth={2} style={{ flexShrink:0, marginTop:2 }}><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span style={{ fontSize:13,color:'#5e7fa0',lineHeight:1.7 }}>
                472/7, 20th L Cross Road<br/>
                4th Block, Koramangala<br/>
                Bengaluru – 560095
              </span>
            </div>
          </div>

          {/* Corporate address */}
          <div>
            <div style={{ fontSize:11,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#6da8e0',marginBottom:14 }}>Corporate Office</div>
            <div style={{ display:'flex',gap:10,alignItems:'flex-start',marginBottom:10 }}>
              <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="#6da8e0" strokeWidth={2} style={{ flexShrink:0, marginTop:2 }}><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span style={{ fontSize:13,color:'#5e7fa0',lineHeight:1.7 }}>
                #63, Office No. 224 & 225, 2nd Floor<br/>
                The Plazzo Mall, Ibrahim Sahib St<br/>
                Off Commercial Street, Bengaluru – 560001
              </span>
            </div>
            <a href="https://maps.app.goo.gl/BCNfdV7j5PEBkYrM6" target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex',alignItems:'center',gap:5,fontSize:12.5,fontWeight:600,color:'#7ecef4',textDecoration:'none' }}>
              <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>
              Open on Google Maps →
            </a>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div style={{ padding:'20px 0 28px' }}>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16,marginBottom:16 }}>
            {/* Badges */}
            <div style={{ display:'flex',alignItems:'center',gap:16,flexWrap:'wrap' }}>
              <img src={msmeImg} alt="MSME Registered" style={{ height:36,width:'auto',filter:'brightness(0) invert(1)',opacity:.75 }} />
              <img src={startupIndiaImg} alt="DPIIT Startup India" style={{ height:32,width:'auto',opacity:.85 }} />
            </div>
            {/* Legal links */}
            <div style={{ display:'flex',gap:20,flexWrap:'wrap' }}>
              {[['Terms','/legal/terms'],['Privacy','/legal/privacy'],['Refund Policy','/legal/refund'],['Disclaimer','/legal/disclaimer']].map(([l,h])=>(
                <a key={h} href={h} style={{ fontSize:12,color:'#3d618a',textDecoration:'none',transition:'color .15s' }}
                  onMouseEnter={e=>e.currentTarget.style.color='#6da8e0'}
                  onMouseLeave={e=>e.currentTarget.style.color='#3d618a'}>{l}</a>
              ))}
            </div>
          </div>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12 }}>
            <p style={{ fontSize:12,color:'#3d618a',lineHeight:1.6,maxWidth:700,margin:0 }}>
              LauncherDesk is operated by DutyLaunch Solutions Pvt. Ltd. Services may involve licensed professionals, statutory filings, or government approvals. Timelines and outcomes may vary. LauncherDesk is not a regulatory authority and does not guarantee approvals or registrations.
            </p>
            <span style={{ fontSize:12,color:'#3d618a',whiteSpace:'nowrap' }}>
              © {year} DutyLaunch Solutions Pvt. Ltd.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
          footer > div > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
        @media(max-width:600px){
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}