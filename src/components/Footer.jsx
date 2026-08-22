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
          <div>
            <Link className="brand" to="/">
              <span className="mk">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={ROCKET} />
                </svg>
              </span>
              <span className="txt">Launcher<b>Desk</b></span>
            </Link>
            <p className="foot-desc">One desk for your whole business — from first registration to funding.</p>
          </div>
          <div>
            <h5>Registrations</h5>
            <Fl href="/services/private-limited-company-registration">Company Registration</Fl>
            <Fl href="/services/llp-registration">LLP Registration</Fl>
            <Fl href="/services/gst-registration">GST Registration</Fl>
            <Fl href="/services/trademark-registration">Trademark &amp; IP</Fl>
          </div>
          <div>
            <h5>IT Services</h5>
            <Fl href="/services">Website Development</Fl>
            <Fl href="/services">Mobile Solutions</Fl>
            <Fl href="/services/digital-marketing">Marketing &amp; Sales</Fl>
          </div>
          <div>
            <h5>Marketing &amp; Sales</h5>
            <Fl href="/services/digital-marketing">Branding &amp; Creative</Fl>
            <Fl href="/services/digital-marketing">Digital Marketing</Fl>
            <Fl href="/services/digital-marketing">WhatsApp &amp; Engagement</Fl>
            <Fl href="/services/digital-marketing">CRM &amp; Automation</Fl>
          </div>
          <div>
            <h5>Company</h5>
            <Fl href="/company/about">About Us</Fl>
            <Fl href="/company/contact">Contact Us</Fl>
            <Fl href="/office-restore">Office Setup</Fl>
            <Fl href="/company/careers">Careers</Fl>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {year} LauncherDesk. A private business-services &amp; facilitation platform — not a government body, and not a substitute for qualified professional advice where required.</span>
          <span>Made in India</span>
        </div>
      </div>
    </footer>
  )
}
