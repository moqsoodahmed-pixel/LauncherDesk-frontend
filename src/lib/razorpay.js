// Shared Razorpay checkout helper.
// Any "Pay" button in the app (service pages, digital-marketing plans, etc.)
// should go through this single function so the flow — create order on our
// backend, open the Razorpay modal, verify the signature — is identical
// everywhere instead of being re-implemented (and silently skipped) per page.

import { fmtPaise } from './pricing'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

let scriptPromise = null

// A clear message for the one failure mode that otherwise looks like
// "nothing happens": some mobile networks/apps (ad blockers, privacy DNS,
// certain carrier filters) return an empty 200 OK page instead of actually
// blocking checkout.razorpay.com, so the <script> tag's onload still fires
// — but window.Razorpay is never defined. Without the check below, that
// silently resolves and the Pay button just does nothing with no error.
const BLOCKED_MSG = "Your payment couldn't start because this device or network is blocking Razorpay's secure checkout (checkout.razorpay.com) — this is usually an ad blocker, VPN or private DNS app. Turn it off, or switch to mobile data / a different Wi-Fi, then try again."

export function loadRazorpayScript() {
  if (window.Razorpay) return Promise.resolve()
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    const fail = (msg) => { scriptPromise = null; clearTimeout(timer); reject(new Error(msg)) }
    const timer = setTimeout(() => fail("Razorpay's payment script is taking too long to load. Please check your internet connection and try again."), 15000)
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = () => {
      clearTimeout(timer)
      // onload fires even when a network filter served a harmless 200 page
      // instead of the real script — only a real Razorpay global proves it
      // actually arrived.
      if (typeof window.Razorpay === 'function') resolve()
      else fail(BLOCKED_MSG)
    }
    s.onerror = () => fail('Could not load Razorpay. Check your connection and try again.')
    document.body.appendChild(s)
  })
  return scriptPromise
}

/**
 * Opens the Razorpay checkout modal directly for the given service/amount.
 * Requires the user to be logged in (token) — the backend's create-order
 * and verify endpoints are JWT-protected.
 *
 * @param {object} opts
 * @param {number} opts.amount        Amount in rupees (not paise).
 * @param {string} opts.serviceSlug
 * @param {string} opts.serviceTitle
 * @param {string} opts.token         JWT from useUserAuth().
 * @param {string} [opts.planLabel]   Optional plan name shown in the Razorpay modal description.
 * @param {boolean} [opts.addGst]     true = charge amount + 18% GST (worked out on the server)
 *                                    and show the GST in the Razorpay description.
 * @param {(msg: string) => void} [opts.onSuccess]
 * @param {(msg: string) => void} [opts.onError]
 * @param {() => void} [opts.onDismiss]  Called if the user closes the modal without paying.
 */
export async function openRazorpayCheckout({
  amount,
  serviceSlug,
  serviceTitle,
  token,
  planLabel,
  addGst = false,
  onSuccess = () => {},
  onError = () => {},
  onDismiss = () => {},
}) {
  if (!token) {
    onError('Please log in to continue.')
    return
  }
  try {
    const res = await fetch(`${API_BASE}/payments/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ amount, addGst: !!addGst, serviceSlug: serviceSlug || '', serviceTitle: serviceTitle || '' }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to create order')

    await loadRazorpayScript()

    await new Promise((resolve) => {
      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: 'LauncherDesk',
        description: [
          planLabel ? `${serviceTitle} — ${planLabel}` : serviceTitle,
          data.breakdown?.gstPaise ? `total incl. ${fmtPaise(data.breakdown.gstPaise)} GST (18%)` : '',
        ].filter(Boolean).join(' · '),
        image: '/apple-touch-icon.png',
        theme: { color: '#1D6FE0' },
        handler: async (response) => {
          try {
            const vRes = await fetch(`${API_BASE}/payments/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                serviceSlug: serviceSlug || '',
                serviceTitle: serviceTitle || '',
              }),
            })
            const vData = await vRes.json()
            if (vData.success) onSuccess('✅ Payment successful! Our team will contact you within 1 business day.')
            else onSuccess('⚠️ Payment received but verification pending. Contact support@launcherdesk.com')
          } catch {
            onSuccess('Payment received. Contact support@launcherdesk.com to confirm.')
          }
          resolve()
        },
        modal: { ondismiss: () => { onDismiss(); resolve() } },
      })
      rzp.open()
    })
  } catch (err) {
    onError(`❌ ${err.message || 'Something went wrong. Please try again.'}`)
  }
}

export async function fetchPaymentConfig() {
  try {
    const r = await fetch(`${API_BASE}/payments/config`)
    const d = await r.json()
    return !!d.enabled
  } catch {
    return false
  }
}