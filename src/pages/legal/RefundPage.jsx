export default function RefundPage() {
  return (
    <div className="wrap" style={{ padding: '60px 0 80px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 40, paddingBottom: 28, borderBottom: '1px solid var(--line)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 10 }}>Legal</p>
          <h1 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, color: 'var(--navy)', marginBottom: 10 }}>Cancellation &amp; Refund Policy</h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-3)' }}>Effective Date: 28 August 2026 &nbsp;·&nbsp; DutyLaunch Solutions Private Limited &nbsp;·&nbsp; CIN: U62099KA2025PTC211509</p>
        </div>

        <div className="legal-body">

          <h2>1. Scope &amp; Application</h2>
          <p>This Cancellation &amp; Refund Policy applies to all Services offered by LauncherDesk through the Platform. By placing an order or engaging the Company's Services, you agree to the terms of this policy. This policy should be read in conjunction with our Terms of Use.</p>

          <h2>2. Refund Philosophy</h2>
          <p>We are committed to fairness, transparency, and client satisfaction. Our goal is to deliver exceptional service. However, we recognise that circumstances may change, and this policy is designed to be clear and equitable to both you and the Company, while acknowledging the operational costs, professional effort, and non-recoverable government and third-party fees incurred in delivering our Services.</p>

          <h2>3. Cooling-Off Period</h2>
          <p>You are eligible for a <strong>full refund</strong> of the Company's professional service fees (excluding non-refundable components listed in Section 4) if you cancel your Engagement within <strong>24 hours</strong> of making payment, provided that:</p>
          <ul>
            <li>Work has not commenced as defined in the Terms of Use; AND</li>
            <li>No Government Fees or third-party costs have been incurred or paid on your behalf; AND</li>
            <li>No documents have been filed with any government or regulatory authority on your behalf.</li>
          </ul>

          <h2>4. Non-Refundable Components</h2>
          <p>The following fees, charges, and costs are strictly <strong>non-refundable</strong> under any circumstances once incurred, paid, or processed on your behalf:</p>
          <ul>
            <li><strong>All Government Fees:</strong> Including but not limited to MCA filing fees, ROC charges, stamp duty, e-Stamp duty charges, trademark application/renewal fees, GST registration fees, state government fees, FSSAI licence fees, and any other statutory or regulatory charges.</li>
            <li><strong>Digital Signature Certificate (DSC):</strong> Once a DSC is issued in your name by the certifying authority, it cannot be cancelled, transferred, or refunded.</li>
            <li><strong>Third-Party Consumable Costs:</strong> Notarisation charges, apostille fees, authentication charges, courier/shipping charges, and any other expenses paid to third parties on your behalf.</li>
            <li><strong>Payment Gateway Transaction Charges:</strong> Processing fees charged by payment gateways (typically 1–3% of the transaction value), which are non-recoverable.</li>
            <li><strong>e-Stamp Papers:</strong> Once an e-Stamp is generated and issued by the authorised SHCIL centre or state vendor, it cannot be cancelled, returned, refunded, or exchanged under any circumstances, irrespective of whether it has been used.</li>
            <li><strong>Office Furniture &amp; Equipment:</strong> Once an order has been confirmed with the vendor and the product has been dispatched for delivery, the order cannot be cancelled. Returns, if accepted by the vendor, may attract restocking charges (typically 15–25%) and reverse logistics costs.</li>
            <li><strong>Foreign Authority Fees:</strong> Fees paid to foreign regulatory authorities, overseas registered agents, or international legal/accounting professionals for International Expansion Services.</li>
            <li><strong>Marketplace Vendor Fees:</strong> Third-party software subscription or licence fees once activated or provisioned by the Marketplace vendor.</li>
            <li><strong>Expedited/Rush Processing Charges:</strong> Any premium charged for expedited or priority processing.</li>
          </ul>

          <h2>5. Pro-Rata / Partial Refunds (After Work Commences)</h2>
          <p>If you wish to cancel after the 24-hour cooling-off period or after work has commenced, a partial refund may be considered at the Company's discretion, calculated on a pro-rata basis as follows:</p>
          <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 12, padding: '20px 24px', margin: '16px 0' }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>Refund Amount = Total Amount Paid − (A + B + C)</p>
            <ul style={{ marginTop: 12, marginBottom: 0 }}>
              <li><strong>A</strong> = All non-refundable Government Fees and third-party costs already incurred (as listed in Section 4).</li>
              <li><strong>B</strong> = A proportionate service fee for the work already completed, calculated based on the man-hours spent and the standard professional rate for the relevant service component.</li>
              <li><strong>C</strong> = An administrative processing fee of 10% of the professional service fee or ₹500, whichever is higher.</li>
            </ul>
            <p style={{ marginTop: 12, marginBottom: 0, fontSize: 13, color: 'var(--text-3)', fontStyle: 'italic' }}>Example: You paid ₹15,000 for a service. You cancel after the Company purchased a DSC (₹2,500), paid MCA filing fees (₹1,500), and spent 3 hours on consultation, document review, and drafting (valued at ₹3,000 at standard rates). Administrative fee: ₹1,500 (10% of ₹15,000). Your refund: ₹15,000 − (₹2,500 + ₹1,500 + ₹3,000 + ₹1,500) = ₹6,500.</p>
          </div>
          <p>The Company will provide a written breakdown of all deductions upon request.</p>

          <h2>6. Situations Where Cancellation &amp; Refund Are Not Possible</h2>
          <p>No cancellation or refund (full or partial) shall be processed in the following circumstances:</p>
          <ul>
            <li>After the final submission or upload of your application, form, or documents to any government or regulatory authority.</li>
            <li>After a registration, licence, or certification has been successfully issued or approved by the relevant authority.</li>
            <li>For time-sensitive, expedited, or rush services that have already been initiated or delivered.</li>
            <li>For services availed under special promotions, offers, bundles, or discounts explicitly marked as 'non-refundable' or 'no cancellation' at the time of purchase.</li>
            <li>Where the Engagement has been deemed abandoned due to your non-responsiveness for 45 calendar days.</li>
            <li>For e-Stamp papers once generated and issued, regardless of use.</li>
            <li>For office furniture and equipment already delivered, installed, or in transit, unless the product is demonstrably defective.</li>
            <li>For completed IT/technology deliverables (websites, applications, designs) that have been reviewed and approved by you, or where your review period has expired without objection.</li>
            <li>For completed financial projections, pitch decks, or advisory deliverables that have been delivered to you.</li>
          </ul>

          <h2>7. How to Request a Cancellation or Refund</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '16px 0' }}>
            {[
              { step: '1', title: 'Submit Your Request', body: 'Email a written cancellation/refund request to contact@launcherdesk.com with the subject line: "Cancellation & Refund Request — [Your Name / Entity Name / Order Reference]". You may also message us on WhatsApp at +91 85488 54859.' },
              { step: '2', title: 'Provide Required Details', body: 'Your request must include: (a) your registered full name; (b) registered email address and phone number; (c) order/Engagement reference number or invoice number; (d) service(s) availed; (e) detailed reason for cancellation/refund; and (f) preferred refund method.' },
              { step: '3', title: 'Acknowledgement', body: 'We will acknowledge receipt of your request within 1 Working Day via email.' },
              { step: '4', title: 'Review & Decision', body: 'Our team will review your request, verify the work status and costs incurred, and communicate a final decision with a detailed breakdown within 5 Working Days of receiving all necessary information.' },
              { step: '5', title: 'Processing', body: 'Approved refunds will be processed to the original payment method (or an agreed alternative) within 7–10 Working Days from the date of the refund decision. Bank processing times may cause additional delays of 3–5 business days.' },
            ].map(s => (
              <div key={s.step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 20px', background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 12 }}>
                <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15 }}>{s.step}</div>
                <div>
                  <p style={{ fontWeight: 700, marginBottom: 4, color: 'var(--navy)' }}>{s.title}</p>
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <h2>8. Service Deficiency, Quality Issues &amp; Rework</h2>
          <p>If you are dissatisfied with the quality of our Services, you may raise a written complaint to us, clearly describing the issue in detail. Our team will review the matter in good faith and, at its sole discretion, may offer one or more of the following remedies:</p>
          <ul>
            <li>Corrective action to address the specific issue.</li>
            <li>Rework or revision at no additional cost (within a reasonable scope).</li>
            <li>A service credit towards future Engagements.</li>
            <li>A partial refund, where appropriate.</li>
          </ul>
          <p>Claims for service deficiency must be raised within 30 days of delivery of the relevant deliverable.</p>

          <h2>9. Chargebacks and Disputed Payments</h2>
          <p>If you initiate a chargeback or payment dispute with your bank or payment provider without first raising the matter with us through the process described in Section 7, the Company reserves the right to: (a) suspend all active Engagements and withhold deliverables; (b) contest the chargeback with supporting documentation; and (c) pursue appropriate legal remedies.</p>

          <h2>10. Escalation &amp; Grievance Redressal</h2>
          <p>If you are not satisfied with the resolution provided by our support team, you may escalate the matter to our Grievance Officer at <a href="mailto:grievance@launcherdesk.com">grievance@launcherdesk.com</a>. A senior member of our team will review your case independently and respond with a final resolution within 5 Working Days.</p>

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