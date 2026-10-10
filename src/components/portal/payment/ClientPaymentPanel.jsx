import { useCallback, useEffect, useRef, useState } from 'react';
import { formatPaise } from '../../../utils/portal/money';
import { createOwnPaymentOrder, verifyOwnPayment, reportOwnPaymentFailure, getOwnPayment } from '../../../services/portal/paymentApi';

function loadRazorpayCheckout() {
  // index.html already loads the Razorpay Checkout <script> once for the
  // whole app; window.Razorpay should exist by the time this runs. This
  // guard just protects against a slow/blocked CDN load.
  return typeof window !== 'undefined' && typeof window.Razorpay === 'function';
}

/**
 * Client-facing payment section embedded in pages/client/OrderDetailPage.jsx,
 * mirroring how ClientKycPanel.jsx is embedded. Renders nothing when payment
 * doesn't apply to this order at all (paymentStatus === NOT_REQUIRED).
 */
export default function ClientPaymentPanel({ order, onOrderChanged, onToast }) {
  const [processing, setProcessing] = useState(false);
  const [devNotice, setDevNotice] = useState(false);
  const [payment, setPayment] = useState(null);
  const mounted = useRef(true);

  useEffect(() => () => { mounted.current = false; }, []);

  const loadPayment = useCallback(async () => {
    try {
      const { payment: p } = await getOwnPayment(order.id);
      if (mounted.current) setPayment(p);
    } catch {
      // Non-fatal - the section still renders using order.paymentStatus alone.
    }
  }, [order.id]);

  useEffect(() => {
    if (order.paymentStatus && order.paymentStatus !== 'NOT_REQUIRED') loadPayment();
  }, [order.paymentStatus, loadPayment]);

  const handlePay = useCallback(async () => {
    setDevNotice(false);
    setProcessing(true);
    let settled = false;
    let watchdog = null;
    try {
      const { razorpayOrderId, amount, currency, keyId } = await createOwnPaymentOrder(order.id);

      if (!keyId) {
        // No real Razorpay key configured in this environment (dev
        // fallback provider). Razorpay Checkout cannot open without a
        // real key, and we cannot fabricate a valid signature on the
        // frontend (only the DevelopmentPaymentProvider on the backend
        // knows how to sign a dev attempt). Rather than open a broken
        // widget or fake a success state, tell the user plainly.
        setDevNotice(true);
        setProcessing(false);
        return;
      }

      if (!loadRazorpayCheckout()) {
        onToast({ type: 'error', message: 'Payment checkout could not be loaded. Please check your connection and try again.' });
        setProcessing(false);
        return;
      }

      // Watchdog: `handler`/`modal.ondismiss` are the only way `processing`
      // ever gets reset. If the checkout modal fails to render or respond
      // for any reason (the SDK rejecting an invalid key only internally,
      // a mobile webview blocking the iframe) neither callback fires and
      // the button is stuck on "Opening checkout…" forever with no retry.
      watchdog = setTimeout(() => {
        if (!settled && mounted.current) {
          settled = true;
          onToast({ type: 'error', message: 'The payment window didn’t open. Please check your connection and try again — no amount has been charged.' });
          setProcessing(false);
        }
      }, 20000);

      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        order_id: razorpayOrderId,
        name: 'LauncherDesk',
        description: order.orderCode,
        handler: async (response) => {
          settled = true; clearTimeout(watchdog);
          try {
            await verifyOwnPayment(order.id, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (!mounted.current) return;
            onToast({ type: 'success', message: 'Payment confirmed. Thank you!' });
            onOrderChanged?.();
            loadPayment();
          } catch (err) {
            if (!mounted.current) return;
            onToast({ type: 'error', message: err.response?.data?.message || 'Payment verification failed.' });
            loadPayment();
          } finally {
            if (mounted.current) setProcessing(false);
          }
        },
        modal: {
          ondismiss: async () => {
            settled = true; clearTimeout(watchdog);
            // User closed the checkout without completing it. Not an
            // error worth alarming them over - just record it for
            // bookkeeping and silently refresh so they can try again.
            try {
              await reportOwnPaymentFailure(order.id, razorpayOrderId, 'Checkout dismissed by user.');
            } catch {
              // Best-effort only.
            } finally {
              if (mounted.current) {
                setProcessing(false);
                onOrderChanged?.();
                loadPayment();
              }
            }
          },
        },
      });

      rzp.on('payment.failed', async (resp) => {
        settled = true; clearTimeout(watchdog);
        try {
          await reportOwnPaymentFailure(order.id, razorpayOrderId, resp?.error?.description || 'Payment failed.');
        } catch {
          // Best-effort only.
        } finally {
          if (mounted.current) {
            setProcessing(false);
            onOrderChanged?.();
            loadPayment();
          }
        }
      });

      rzp.open();
    } catch (err) {
      clearTimeout(watchdog);
      if (!mounted.current) return;
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not start payment.' });
      setProcessing(false);
    }
  }, [order.id, order.orderCode, onOrderChanged, onToast]);

  if (!order.paymentStatus || order.paymentStatus === 'NOT_REQUIRED') return null;

  return (
    <div className="ld-panel">
      <div className="ld-permission-group-title">Payment</div>

      {order.paymentStatus === 'PENDING' && (
        <div>
          <p style={{ marginTop: 0 }}>
            Amount due: <strong>{formatPaise(order.pricing?.totalAmountMinor ?? order.pricing?.total * 100)}</strong>
          </p>
          <button className="ld-btn-primary" onClick={handlePay} disabled={processing}>
            {processing ? 'Opening checkout…' : 'Pay Now'}
          </button>
          {devNotice && (
            <p className="ld-phase-note" style={{ marginTop: 10, color: 'var(--ld-danger)' }}>
              Razorpay is not configured in this environment — using development payment simulation. Live checkout
              is unavailable here; a real deployment with Razorpay credentials will let you pay normally.
            </p>
          )}
        </div>
      )}

      {order.paymentStatus === 'FAILED' && (
        <div>
          <p style={{ marginTop: 0, color: 'var(--ld-danger)' }}>
            Your last payment attempt failed{payment?.failureReason ? `: ${payment.failureReason}` : '.'}
          </p>
          <button className="ld-btn-primary" onClick={handlePay} disabled={processing}>
            {processing ? 'Opening checkout…' : 'Try Again'}
          </button>
          {devNotice && (
            <p className="ld-phase-note" style={{ marginTop: 10, color: 'var(--ld-danger)' }}>
              Razorpay is not configured in this environment — using development payment simulation. Live checkout
              is unavailable here.
            </p>
          )}
        </div>
      )}

      {order.paymentStatus === 'PAID' && (
        <div>
          <p style={{ margin: 0, color: 'var(--ld-success, #16a34a)' }}>Payment confirmed.</p>
          <p className="ld-phase-note" style={{ marginTop: 6 }}>
            {payment?.amountPaise != null && <>Amount: {formatPaise(payment.amountPaise)} · </>}
            {payment?.method && <>Method: {payment.method} · </>}
            {payment?.paidAt && <>Paid on {new Date(payment.paidAt).toLocaleString('en-IN')}</>}
          </p>
        </div>
      )}

      {order.paymentStatus === 'REFUNDED' && (
        <div>
          <p style={{ margin: 0 }}>This payment has been refunded.</p>
          <p className="ld-phase-note" style={{ marginTop: 6 }}>
            {payment?.refundAmountPaise != null && <>Amount: {formatPaise(payment.refundAmountPaise)} · </>}
            {payment?.refundedAt && <>Refunded on {new Date(payment.refundedAt).toLocaleString('en-IN')}</>}
          </p>
        </div>
      )}
    </div>
  );
}
