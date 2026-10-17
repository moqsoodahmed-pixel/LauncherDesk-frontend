import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'

export default function DisclaimerPage() {
  return (
    <div className="wrap" style={{ padding: '60px 0 80px' }}>
      <SEO
        title="Disclaimer & Transparency"
        description="LauncherDesk.com is a privately operated, independent technology platform owned and operated by DutyLaunch Solutions Pvt. Ltd. It is not a government website or regulatory authority."
        canonical="/legal/disclaimer"
      />
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <header style={{ marginBottom: 40, paddingBottom: 28, borderBottom: '1px solid var(--line)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 10 }}>Legal</p>
          <h1 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, color: '#FFFFFF', marginBottom: 10 }}>Disclaimer &amp; Transparency</h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-3)' }}>DutyLaunch Solutions Private Limited &nbsp;·&nbsp; CIN: U62099KA2025PTC211509</p>
        </header>

        <article className="legal-body">

          <p><strong>Important Notice:</strong> LauncherDesk.com is a privately operated, independent technology platform owned and operated by <strong>DutyLaunch Solutions Pvt. Ltd.</strong> The platform is not a government website, regulatory authority, or official representative of the Government of India, any State Government, or any government department, unless expressly stated otherwise for a specific authorised arrangement.</p>

          <p>LauncherDesk facilitates access to business setup and registration assistance, statutory and regulatory compliance services, certifications, IT solutions, software products, and other business support services through its platform, service partners, licensed professionals, consultants, and third-party service providers, as applicable.</p>

          <p>Certain services may involve applications, documentation, statutory filings, professional consultations, government fees, or approvals from the relevant authorities. Where applicable, such services are facilitated through authorised professionals, eligible service providers, or official government portals. LauncherDesk does not itself exercise governmental or regulatory powers and does not independently issue government registrations, licences, certificates, approvals, or statutory documents unless expressly authorised by the relevant issuing authority.</p>

          <h2>Third-Party Services &amp; Authorisations</h2>
          <p>The availability, scope, and delivery of certain services may depend on independent third-party providers, government departments, statutory authorities, or external platforms. The respective service provider or issuing authority remains responsible for the services, decisions, documents, approvals, or certificates falling within its legal authority and responsibility.</p>

          <h2>No Guarantee of Approvals or Outcomes</h2>
          <p>LauncherDesk does not guarantee the approval, acceptance, issuance, or completion of any registration, licence, certification, filing, application, or other government or third-party process. Processing times, eligibility requirements, fees, documentation requirements, and outcomes may vary depending on the applicable laws, government procedures, and the decisions of the relevant authorities or service providers.</p>

          <h2>User Responsibility</h2>
          <p>Users are responsible for providing accurate, complete, and up-to-date information and documents, verifying their eligibility and applicable requirements, reviewing the scope and terms of the selected service, and ensuring compliance with applicable laws and regulations. Users are encouraged to verify material requirements and information independently through the relevant official sources or qualified professionals.</p>

          <h2>Limitation of Responsibility</h2>
          <p>To the extent permitted by applicable law, LauncherDesk shall not be responsible for delays, rejections, changes in government procedures, decisions of statutory authorities, or acts or omissions of independent third-party service providers beyond its reasonable control. Nothing in this disclaimer excludes or limits any liability that cannot lawfully be excluded or limited under applicable law.</p>

          <p style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--line)' }}>Use of LauncherDesk.com and its services is subject to our <strong><Link to="/legal/terms">Terms of Use</Link>, <Link to="/legal/privacy">Privacy Policy</Link>, and applicable service-specific terms and conditions</strong>.</p>

          <p>For further information about our platform, service providers, and compliance practices, please refer to our <strong>Transparency &amp; Compliance</strong> information, where available.</p>

          <h2>Contact Us</h2>
          <div className="legal-contact-card">
            <p><strong>Entity:</strong> DutyLaunch Solutions Private Limited</p>
            <p><strong>Brand:</strong> LauncherDesk</p>
            <p><strong>CIN:</strong> U62099KA2025PTC211509</p>
            <p><strong>Registered Office:</strong> 472/7, 20th L Cross Rd, 4th Block, Koramangala, Koramangala VI Bk, Bengaluru, Karnataka – 560095, India</p>
            <p><strong>Email:</strong> <a href="mailto:contact@launcherdesk.com">contact@launcherdesk.com</a></p>
            <p><strong>Grievance Email:</strong> <a href="mailto:grievance@launcherdesk.com">grievance@launcherdesk.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+918548854859">+91 85488 54859</a></p>
            <p><strong>Website:</strong> <a href="https://www.launcherdesk.com" target="_blank" rel="noopener noreferrer">www.launcherdesk.com</a></p>
          </div>
        </article>
      </div>
    </div>
  )
}