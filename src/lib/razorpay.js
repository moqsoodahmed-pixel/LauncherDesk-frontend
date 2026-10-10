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

// Razorpay gives no "modal opened" callback. Its checkout iframe is always
// added to <body> inside `.razorpay-container`, so once that exists the window
// DID open and we must NOT show a "didn't open" error — on mobile the customer
// often spends well over 15-20s inside the modal (switching to a UPI app,
// typing an OTP), and a fixed timer used to fire mid-payment and reset the
// button. Returns a function that cancels the watchdog.
export function armOpenWatchdog(onFail, ms = 15000) {
  const started = Date.now()
  const iv = setInterval(() => {
    if (document.querySelector('.razorpay-container, iframe.razorpay-checkout-frame')) {
      clearInterval(iv)
    } else if (Date.now() - started > ms) {
      clearInterval(iv)
      onFail()
    }
  }, 500)
  return () => clearInterval(iv)
}

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

    // Without a real key, `new window.Razorpay({...})`/`.open()` can fail
    // silently on some mobile browsers instead of throwing — this is the
    // single most-used payment entry point in the app (every "Buy Now" /
    // "Pay" button on the public site goes through here), so this guard
    // covers all of them at once.
    if (!data.keyId) {
      onError('Payment could not be started (missing payment configuration). Please contact support@launcherdesk.com — no amount has been charged.')
      return
    }

    await loadRazorpayScript()

    await new Promise((resolve) => {
      // Watchdog: `handler`/`modal.ondismiss` are the only way this promise
      // normally resolves. If the checkout modal fails to render or respond
      // for any reason (invalid key rejected only internally by the SDK, a
      // mobile webview blocking the iframe, a flaky connection to Razorpay
      // right after the script itself loaded), neither callback ever fires
      // and the button was stuck on "Processing…" forever with no way to
      // retry — this guarantees the UI always recovers.
      let settled = false
      const finish = () => { if (!settled) { settled = true; resolve() } }
      let stopWatch = () => {}
      const startWatch = () => {
        stopWatch = armOpenWatchdog(() => {
          if (!settled) {
            onError('The payment window didn’t open. Please check your connection and try again — no amount has been charged.')
            finish()
          }
        }, 20000)
      }

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
        image: new URL('/apple-touch-icon.png', window.location.origin).href,
        theme: { color: '#1D6FE0' },
        handler: async (response) => {
          stopWatch()
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
          finish()
        },
        modal: { ondismiss: () => { stopWatch(); onDismiss(); finish() } },
      })
      try {
        rzp.open()
        startWatch()
      } catch (openErr) {
        stopWatch()
        onError(`❌ ${openErr?.message || 'Could not open the payment window. Please try again.'}`)
        finish()
      }
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
