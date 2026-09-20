export default function PrivacyPage() {
  return (
    <div className="wrap" style={{ padding: '60px 0 80px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 40, paddingBottom: 28, borderBottom: '1px solid var(--line)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 10 }}>Legal</p>
          <h1 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, color: 'var(--navy)', marginBottom: 10 }}>Privacy Policy</h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-3)' }}>Effective Date: 28 August 2026 &nbsp;·&nbsp; DutyLaunch Solutions Private Limited &nbsp;·&nbsp; CIN: U62099KA2025PTC211509</p>
        </div>

        <div className="legal-body">

          <p>DutyLaunch Solutions Private Limited, operating under the brand name "LauncherDesk" ("Company", "we", "our", "us"), is committed to protecting the privacy, confidentiality, and security of all personal data of individuals who access our Platform and use our Services. This Privacy Policy describes how we collect, use, process, store, share, and protect your personal data in compliance with:</p>
          <ul>
            <li>The Information Technology Act, 2000 and the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.</li>
            <li>The Digital Personal Data Protection Act, 2023 ("DPDP Act") and rules framed thereunder.</li>
            <li>Other applicable Indian and international data protection laws.</li>
          </ul>
          <p>By accessing the Platform or providing your personal data to us, you consent to the collection, use, and processing of your data as described in this Privacy Policy.</p>

          <h2>1. Data We Collect</h2>
          <h3>1.1 Information You Provide Directly</h3>
          <ul>
            <li><strong>Identity Data:</strong> Full name, date of birth, father's/spouse's name, gender, PAN, Aadhaar number, DIN, DPIN, passport details, voter ID, driving licence, and photographs.</li>
            <li><strong>Contact Data:</strong> Email address, mobile/telephone number(s), postal/residential address, WhatsApp number, and alternate contact details.</li>
            <li><strong>Business Data:</strong> Company/firm/LLP name, CIN/LLPIN, GSTIN, nature of business, incorporation documents, MOA/AOA/LLP Agreement, partnership deeds, financial statements, board/partner resolutions, share certificates, and other corporate records.</li>
            <li><strong>Service Data:</strong> Documents, forms, applications, declarations, affidavits, and information required for delivering the specific Services you have engaged.</li>
            <li><strong>Payment Data:</strong> Payment method preferences, UPI IDs, transaction reference numbers, invoice records, and billing information. We do not store full credit/debit card numbers; card payments are processed through PCI-DSS compliant third-party payment gateways.</li>
            <li><strong>Communication Data:</strong> Records of your communications with us via email, phone, WhatsApp, chat, or the Platform's contact/enquiry forms, including consultation notes, instructions, and feedback.</li>
            <li><strong>e-Stamping Data:</strong> State, denomination, purpose, beneficiary details, and related transaction information for e-Stamp procurement.</li>
            <li><strong>Marketplace Data:</strong> Software preferences, tool requirements, evaluation notes, and vendor interaction history.</li>
          </ul>
          <h3>1.2 Information Collected Automatically</h3>
          <ul>
            <li><strong>Technical Data:</strong> IP address, browser type and version, operating system, device type, screen resolution, unique device identifiers, and mobile network information.</li>
            <li><strong>Usage Data:</strong> Pages visited, features used, time spent on pages, click patterns, scroll depth, referral URLs, search queries used within the Platform, navigation paths, and session duration.</li>
            <li><strong>Cookie Data:</strong> Information collected through cookies, web beacons, pixel tags, local storage, and similar tracking technologies (see Section 4 below).</li>
            <li><strong>Location Data:</strong> Approximate geographic location derived from your IP address or device settings. We do not collect precise GPS location data unless you explicitly enable it.</li>
          </ul>
          <h3>1.3 Information from Third Parties</h3>
          <ul>
            <li>Professionals (CAs, CSs, Advocates) engaged for your Engagement may share service updates, compliance statuses, filing confirmations, or completed documents.</li>
            <li>Government portals and regulatory databases may provide application status updates, approval/rejection notices, and compliance records.</li>
            <li>Payment gateway providers share transaction confirmation, settlement, and dispute details.</li>
            <li>Analytics and advertising partners may share aggregated or pseudonymised usage and interaction data.</li>
          </ul>

          <h2>2. Purpose and Legal Basis for Processing</h2>
          <ul>
            <li><strong>Service Delivery</strong> (Contractual necessity): To process your orders, deliver Services, coordinate with Professionals and vendors, file applications with regulatory authorities, procure e-Stamps, facilitate office setup, and communicate progress updates and deliverables.</li>
            <li><strong>Legal and Regulatory Compliance</strong> (Legal obligation): To comply with applicable laws, regulations, court orders, and governmental requests, including maintaining records under the Companies Act 2013, Income Tax Act 1961, GST Act, FEMA, PMLA, and the DPDP Act.</li>
            <li><strong>Legitimate Business Interests</strong> (Legitimate interest): To improve the Platform, analyse usage patterns, troubleshoot technical issues, detect and prevent fraud and abuse, enhance security, conduct internal audits, and develop new features.</li>
            <li><strong>Marketing and Promotions</strong> (Consent): To send promotional communications, newsletters, product announcements, offers, and service recommendations, where you have provided consent. You may withdraw consent and opt out at any time.</li>
          </ul>

          <h2>3. Data Sharing and Disclosure</h2>
          <p>We share your personal data only to the extent necessary, with appropriate contractual safeguards, and <strong>never</strong> for the purpose of selling your data:</p>
          <ul>
            <li><strong>Professionals</strong> (CAs, CSs, Advocates, Tax Consultants, IT Developers): Your relevant information and documents are shared with assigned Professionals for the delivery of your engaged Services, under appropriate confidentiality obligations.</li>
            <li><strong>Government &amp; Regulatory Authorities:</strong> As required for filing applications, registrations, returns, e-Stamp procurement, or compliance on your behalf (e.g., MCA, CBDT, GST Network, SHCIL, Trademark Registry, RBI, state stamp authorities, DPIIT, FSSAI).</li>
            <li><strong>Technology Service Providers:</strong> Cloud hosting providers, payment gateway processors, CRM and helpdesk systems, email and communication service providers, analytics platforms, and customer support tools that process data on our behalf under appropriate data processing agreements.</li>
            <li><strong>Marketplace Vendors:</strong> If you choose to engage with a software vendor through LauncherMart, your contact details and service requirements will be shared with the selected vendor to facilitate the transaction, with your prior awareness.</li>
            <li><strong>e-Stamp Vendors:</strong> For e-Stamp procurement, necessary transaction details are shared with authorised SHCIL centres or state-authorised e-Stamping vendors.</li>
            <li><strong>International Partners:</strong> For overseas company setup services, relevant personal and business data is shared with foreign registered agents, overseas CAs/CSs/attorneys, and foreign regulatory filing systems, as necessary for service delivery.</li>
            <li><strong>Legal Requirements:</strong> Where required by law, regulation, legal process, subpoena, or governmental request; to enforce our Terms; to protect the rights, property, safety, or security of the Company, its users, or the public; or to detect, prevent, or address fraud, security, or technical issues.</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, consolidation, reorganisation, or sale of all or substantially all of the Company's assets, your data may be transferred to the successor entity.</li>
          </ul>
          <p>We do not sell, rent, lease, or trade your personal data to any third party for their independent marketing or advertising purposes.</p>

          <h2>4. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar technologies on the Platform for the following purposes:</p>
          <ul>
            <li><strong>Strictly Necessary Cookies:</strong> Required for the Platform to function correctly, including session management, security tokens, load balancing, and fraud prevention. These cannot be disabled without affecting Platform functionality.</li>
            <li><strong>Performance &amp; Analytics Cookies:</strong> Help us understand how visitors interact with the Platform by collecting anonymised and aggregated usage data. These do not personally identify you.</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences, settings, and choices to enhance your experience and reduce repetitive inputs.</li>
            <li><strong>Advertising &amp; Marketing Cookies:</strong> Used by advertising partners (e.g., Google Ads, Meta/Facebook Pixel, LinkedIn Insight Tag) to deliver relevant advertisements, track campaign effectiveness, and build audience profiles for remarketing purposes.</li>
          </ul>
          <p>You can manage your cookie preferences through your browser settings or through our cookie consent banner. Disabling certain cookies may affect the functionality and performance of the Platform.</p>

          <h2>5. Data Security</h2>
          <p>We implement robust technical and organisational security measures to protect your personal data, including:</p>
          <ul>
            <li>Encryption of data in transit using TLS 1.2+ / SSL protocols and encryption of sensitive personal data at rest using industry-standard encryption algorithms.</li>
            <li>Strict access controls, role-based permissions, principle of least privilege, and multi-factor authentication for internal systems and databases.</li>
            <li>Regular security audits, vulnerability assessments, and third-party penetration testing.</li>
            <li>Mandatory employee and contractor training on data protection, information security, and confidentiality obligations.</li>
            <li>Secure, redundant data backup procedures and documented disaster recovery and business continuity protocols.</li>
            <li>Incident response procedures for prompt detection, containment, and notification of any data breach, in accordance with the DPDP Act.</li>
          </ul>
          <p>While we take all commercially reasonable precautions, no method of electronic storage or transmission over the internet is 100% secure.</p>

          <h2>6. Data Retention</h2>
          <ul>
            <li><strong>Engagement Records and Service Data:</strong> Retained for a minimum of 8 years from the date of completion of the Engagement.</li>
            <li><strong>Identity Documents and KYC Records:</strong> Retained as required by applicable anti-money laundering, tax, and regulatory compliance obligations.</li>
            <li><strong>Financial and Tax Records:</strong> Retained for a minimum of 8 years from the end of the relevant financial year.</li>
            <li><strong>Marketing Preferences and Consent Records:</strong> Retained until you withdraw consent, unsubscribe, or request deletion.</li>
            <li><strong>Technical and Analytics Data:</strong> Retained in anonymised or pseudonymised form for up to 3 years.</li>
            <li><strong>Communication Records:</strong> Retained for a minimum of 3 years from the date of communication.</li>
          </ul>

          <h2>7. Your Rights Under the DPDP Act</h2>
          <ul>
            <li><strong>Right to Access:</strong> You may request confirmation of whether we process your personal data and obtain a summary of such data and the processing activities.</li>
            <li><strong>Right to Correction:</strong> You may request correction, updating, or completion of inaccurate, incomplete, or outdated personal data held by us.</li>
            <li><strong>Right to Erasure:</strong> You may request deletion of your personal data, subject to our legal, regulatory, and contractual retention obligations.</li>
            <li><strong>Right to Withdraw Consent:</strong> Where processing is based on your consent, you may withdraw consent at any time by contacting us.</li>
            <li><strong>Right to Grievance Redressal:</strong> You may raise a complaint or grievance with our Grievance Officer. If unsatisfied, you may approach the Data Protection Board of India.</li>
            <li><strong>Right to Nominate:</strong> You may nominate another individual to exercise your data rights in the event of your death or incapacity.</li>
          </ul>
          <p>To exercise any of these rights, please write to us at <a href="mailto:contact@launcherdesk.com">contact@launcherdesk.com</a> or to our Grievance Officer at <a href="mailto:grievance@launcherdesk.com">grievance@launcherdesk.com</a>. We will acknowledge your request within 48 hours and respond substantively within 30 days.</p>

          <h2>8. Children's Privacy</h2>
          <p>The Platform and Services are intended for individuals who are at least 18 years of age. We do not knowingly collect, process, or store personal data from children under 18. If we become aware that we have inadvertently collected personal data from a child without verifiable parental consent, we will take prompt steps to delete such data.</p>

          <h2>9. Cross-Border Data Transfers</h2>
          <p>For International Expansion Services, Marketplace vendor integrations, and certain technology infrastructure, your personal data may be transferred to, stored in, or processed in jurisdictions outside India, including the UAE, United States, United Kingdom, Singapore, and the European Union. Such transfers are made only to the extent necessary for service delivery and are subject to appropriate contractual data protection safeguards and compliance with the DPDP Act.</p>

          <h2>10. Grievance Officer / Data Protection Officer</h2>
          <div className="legal-contact-card">
            <p><strong>Name:</strong> Moqsood Ahmed</p>
            <p><strong>Designation:</strong> Grievance Officer / Data Protection Officer</p>
            <p><strong>Email:</strong> <a href="mailto:grievance@launcherdesk.com">grievance@launcherdesk.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+918548854859">+91 85488 54859</a></p>
            <p><strong>Address:</strong> 472/7, 20th L Cross Rd, 4th Block, Koramangala, Koramangala VI Bk, Bengaluru, Karnataka – 560095, India</p>
          </div>
          <p>The Grievance Officer shall acknowledge your grievance within 48 hours and address your concerns within 30 days of receipt.</p>

          <h2>11. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time to reflect changes in our data practices, technology, legal and regulatory requirements, or business operations. The updated policy will be posted on the Platform with a revised effective date. Material changes will be notified through a prominent notice on the Platform or via email.</p>

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
          <p style={{ marginTop: 24, fontSize: 13, color: 'var(--text-3)' }}>Last updated: 28 August 2026 &nbsp;·&nbsp; © 2026 DutyLaunch Solutions Private Limited. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}