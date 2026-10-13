/** Disclaimer & Transparency page — all copy lives here so it stays editable in one
 *  place, matching the pattern used by data/agreements.js and data/estamp.js. */

export const TRANSPARENCY_HERO = {
  badge: 'TRANSPARENCY COMMITMENT',
  title: 'Disclaimer & Transparency',
  intro: 'LauncherDesk is dedicated to fostering a trustworthy environment. This page is designed to help our customers, partners, and regulatory bodies fully understand our corporate status, how our platform functions, and how your orders are handled.',
  notice: 'LauncherDesk is not an official Government portal, department, website, or authority, unless expressly stated for a specific authorised arrangement. We have no official affiliation, joint venture, or endorsement from any Government body, Ministry, or regulator.',
}

export const TRANSPARENCY_SECTIONS = [
  { id: 'who-we-are', label: 'Who We Are' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'government-interaction', label: 'Government Interaction' },
  { id: 'ordering-payments', label: 'Ordering & Payments' },
  { id: 'user-responsibility', label: 'User Responsibility' },
  { id: 'corporate-details', label: 'Corporate Details' },
]

export const WHO_WE_ARE = {
  company: {
    title: 'About DutyLaunch Solutions Pvt. Ltd.',
    body: 'LauncherDesk is owned, managed, and operated by DutyLaunch Solutions Private Limited, a company incorporated under the Companies Act, 2013 (CIN: U62099KA2025PTC211509). Our registration details, registered office, and contact profiles are public and accessible below under Corporate Details.',
  },
  platform: {
    title: 'What is LauncherDesk?',
    body: 'LauncherDesk is a technology-enabled facilitation platform that connects you with qualified professionals and licensed service providers to simplify business registration, statutory compliance, e-Stamping, legal documentation, IT services, and other business support workflows. We are not a law firm, chartered accountancy firm, company secretarial firm, or financial advisory institution. All information on the platform is for general informational purposes only.',
  },
}

/** Each step is tagged with who performs it: 'you' | 'team' | 'govt'. */
export const HOW_IT_WORKS_INTRO = 'We charge a transparent professional service fee to assist you through your document and compliance workflow. Here is how the platform works, and who is responsible for each step.'

export const HOW_IT_WORKS_STEPS = [
  { title: 'You place your order', body: 'Select the service you need from our catalogue and complete a secure online payment. You receive an immediate digital invoice.', who: 'you' },
  { title: 'You share your details', body: 'Provide the information and documents needed for your order through your dashboard or our support channels.', who: 'you' },
  { title: 'Our team verifies your documents', body: 'Our documentation and compliance specialists check the accuracy and completeness of everything submitted.', who: 'team' },
  { title: 'Our team prepares your application', body: 'Our professionals draft the application, agreement, or filing to match the applicable state and central regulations.', who: 'team' },
  { title: 'Submission, where required', body: 'Where a statutory filing is involved, our team submits the completed application to the relevant Government portal or authority on your behalf.', who: 'team' },
  { title: 'The Government processes the application', body: 'The respective Government authority (e.g. the Registrar, GST Department, or State e-Stamp authority) reviews and processes the submission.', who: 'govt' },
  { title: 'You receive updates', body: 'Track progress and receive status updates by email, SMS, or WhatsApp as your order moves forward.', who: 'team' },
  { title: 'Delivery', body: 'Once issued, your certificates, approvals, or executed documents are delivered to your dashboard, with physical/courier delivery where applicable.', who: 'team' },
]

export const GOVERNMENT_INTERACTION = {
  heading: 'Who Issues Government Approvals?',
  body: 'All statutory registrations, certificates, approvals, e-Stamps, and credentials are issued exclusively by their respective competent Government authorities (for example the Registrar of Companies, GST Department, Ministry of Corporate Affairs, or the relevant State Stamp/Registration authority). LauncherDesk does not itself exercise governmental or regulatory powers and does not independently issue government registrations, licences, certificates, approvals, or statutory documents unless expressly authorised by the relevant issuing authority.',
  issuedBy: { label: 'ISSUED BY', title: 'Government authorities', body: 'LauncherDesk acts solely as an independent facilitation platform. The relevant authority alone issues the credential, certificate, or approval.' },
  handledBy: { label: 'HANDLED BY', title: "LauncherDesk's team", body: 'When you place an order, our in-house team and authorised vendors, including Chartered Accountants, Company Secretaries, and documentation staff, prepare your data, verify documentation, and file your submission on the relevant Government portal on your behalf, where applicable.' },
  directCallout: 'You are always free to file registrations or procure e-Stamps directly through the official Government websites or authorised counters, for free or by paying only the statutory Government fees. By using LauncherDesk, you choose a facilitation service for professional speed, software convenience, document drafting, and support.',
}

export const ORDERING_PAYMENTS = {
  intro: 'We do not believe in hidden fees. Our checkout breaks your payment down into clearly itemised components before you pay.',
  feeTable: [
    { label: 'Professional Service Fee', body: 'Charged for our documentation, drafting assistance, verification, and platform usage.' },
    { label: 'Goods & Services Tax (GST)', body: 'The statutory 18% tax applicable on our professional service fee.' },
    { label: 'Statutory Government Fees & Stamp Duties', body: 'Charged at actuals, as required by the applicable central or state regulations, and passed through without markup.' },
  ],
  securePayments: { title: 'Secure Payment Processing', body: 'All payments on LauncherDesk are processed through RBI-compliant, 256-bit SSL encrypted payment gateways (such as Razorpay). Payments are collected and processed securely by DutyLaunch Solutions Private Limited.' },
  confidentiality: { title: 'Confidentiality, Privacy & Security', body: 'Your personal details, documents, and uploaded files are stored with industry-standard encryption. We do not sell or rent your data. Access to your file is limited to the compliance specialists assigned to it. See our Privacy Policy for full details.' },
  refunds: { title: 'Refunds & Cancellation', body: 'If drafting or submission work has not yet begun on your order, you are eligible for a refund of our professional fee as per our Cancellation & Refund Policy. Statutory Government fees or stamp duties already deposited on your behalf are non-refundable, as they are paid directly to the relevant authority.' },
}

/** The LauncherDesk-approved Disclaimer & Transparency legal text, reproduced in full,
 *  without altering its legal meaning. Structured into the headings it was supplied under. */
export const USER_RESPONSIBILITY = {
  importantNotice: 'LauncherDesk.com is a privately operated, independent technology platform owned and operated by DutyLaunch Solutions Pvt. Ltd. The platform is not a government website, regulatory authority, or official representative of the Government of India, any State Government, or any government department, unless expressly stated otherwise for a specific authorised arrangement.\n\nLauncherDesk facilitates access to business setup and registration assistance, statutory and regulatory compliance services, certifications, IT solutions, software products, and other business support services through its platform, service partners, licensed professionals, consultants, and third-party service providers, as applicable.\n\nCertain services may involve applications, documentation, statutory filings, professional consultations, government fees, or approvals from the relevant authorities. Where applicable, such services are facilitated through authorised professionals, eligible service providers, or official government portals. LauncherDesk does not itself exercise governmental or regulatory powers and does not independently issue government registrations, licences, certificates, approvals, or statutory documents unless expressly authorised by the relevant issuing authority.',
  thirdParty: {
    title: 'Third-Party Services & Authorisations',
    body: 'The availability, scope, and delivery of certain services may depend on independent third-party providers, government departments, statutory authorities, or external platforms. The respective service provider or issuing authority remains responsible for the services, decisions, documents, approvals, or certificates falling within its legal authority and responsibility.',
  },
  noGuarantee: {
    title: 'No Guarantee of Approvals or Outcomes',
    body: 'LauncherDesk does not guarantee the approval, acceptance, issuance, or completion of any registration, licence, certification, filing, application, or other government or third-party process. Processing times, eligibility requirements, fees, documentation requirements, and outcomes may vary depending on the applicable laws, government procedures, and the decisions of the relevant authorities or service providers.',
  },
  userResponsibility: {
    title: 'User Responsibility',
    body: 'Users are responsible for providing accurate, complete, and up-to-date information and documents, verifying their eligibility and applicable requirements, reviewing the scope and terms of the selected service, and ensuring compliance with applicable laws and regulations. Users are encouraged to verify material requirements and information independently through the relevant official sources or qualified professionals.',
  },
  limitation: {
    title: 'Limitation of Responsibility',
    body: 'To the extent permitted by applicable law, LauncherDesk shall not be responsible for delays, rejections, changes in government procedures, decisions of statutory authorities, or acts or omissions of independent third-party service providers beyond its reasonable control. Nothing in this disclaimer excludes or limits any liability that cannot lawfully be excluded or limited under applicable law.',
  },
  closing: 'Use of LauncherDesk.com and its services is subject to our Terms of Use, Privacy Policy, and applicable service-specific terms and conditions. For further information about our platform, service providers, and compliance practices, please refer to this Transparency & Compliance page.',
}

export const CORPORATE_DETAILS = {
  intro: 'In accordance with applicable corporate laws and compliance requirements, we list our official registration particulars below:',
  legalIdentity: [
    ['Parent Entity', 'DutyLaunch Solutions Private Limited'],
    ['Brand', 'LauncherDesk'],
    ['CIN', 'U62099KA2025PTC211509'],
    ['Registered Office', '472/7, 20th L Cross Rd, 4th Block, Koramangala, Koramangala VI Bk, Bengaluru, Karnataka – 560095, India'],
  ],
  contacts: [
    ['Grievance Officer', 'grievance@launcherdesk.com'],
    ['Legal Team', 'contact@launcherdesk.com'],
    ['Corporate Helpdesk', 'support@launcherdesk.com'],
    ['Phone', '+91 85488 54859'],
  ],
}

export const TRANSPARENCY_FAQS = [
  ['Is LauncherDesk a government website?', 'No. LauncherDesk is a privately operated, independent technology platform. It is not affiliated with, endorsed by, or representative of the Government of India or any State Government or authority, except where expressly stated for a specific authorised arrangement.'],
  ['Can I complete these filings myself, directly with the Government?', 'Yes. You are always free to file registrations or procure e-Stamps directly through the official Government portals, for free or by paying only the statutory fees. LauncherDesk is a facilitation service for those who want drafting support, document verification, and a faster, guided process.'],
  ['Does LauncherDesk guarantee my application will be approved?', 'No. Approval, timelines, and outcomes are entirely at the discretion of the relevant Government authority. LauncherDesk facilitates the process diligently but has no control over government decisions or processing times.'],
  ['Are government fees and stamp duties refundable?', 'No. Once a statutory Government fee or stamp duty has been deposited on your behalf, it is non-refundable, as it is paid directly to the relevant authority. Our professional fee may be refundable if work has not yet begun. Please refer to our Cancellation & Refund Policy.'],
]
