import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import { getOrder } from '../../../services/portal/ordersApi';

function n(v) { return Number(v || 0); }
function fmt(v) { return n(v).toFixed(2); }

const FONT = '"Roboto", Arial, Helvetica, sans-serif';

const PRINT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');

@page { size: A4; margin: 0; }

@media print {
  /* Reset the entire document */
  html, body {
    width: 210mm !important;
    height: 297mm !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    background: #fff !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Kill the application shell — sidebar, header, buttons, everything */
  .ld-sidebar,
  .ld-header,
  .inv-no-print,
  nav, aside, header {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    overflow: hidden !important;
  }

  /* Strip layout wrappers so the invoice can fill the page */
  .ld-app-shell,
  .ld-main,
  .ld-content,
  #root,
  #root > * {
    display: block !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    max-width: none !important;
    min-height: 0 !important;
    height: auto !important;
    overflow: visible !important;
    background: none !important;
    border: none !important;
    box-shadow: none !important;
  }

  /* The invoice itself — fixed overlay fills the A4 page exactly */
  .inv-page {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 210mm !important;
    height: 297mm !important;
    margin: 0 !important;
    padding: 0 !important;
    box-shadow: none !important;
    border: none !important;
    z-index: 999999 !important;
    overflow: hidden !important;
    background-size: 210mm 297mm !important;
    page-break-after: avoid !important;
    page-break-inside: avoid !important;
  }
}
`;

export default function InvoicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isClient = location.pathname.startsWith('/client');
  const isAdmin = location.pathname.startsWith('/admin');
  const backOrderPath = isClient ? `/client/orders/${id}` : isAdmin ? `/admin/orders/${id}` : `/super-admin/orders/${id}`;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setOrder(await getOrder(id)); }
    catch (e) { setError(e.response?.data?.message || 'Could not load invoice.'); }
    finally { setLoading(false); }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!order) return null;

  const client = order.clientSnapshot || {};
  const service = order.serviceSnapshot || {};
  const pricing = order.pricing || {};

  const base = n(pricing.baseAmount ?? pricing.baseAmountMinor / 100);
  const gstApply = !!pricing.gstApplicable;
  const gstPct = n(pricing.gstPercentage || 18);
  const gstTotal = gstApply ? n(pricing.gstAmount ?? pricing.gstAmountMinor / 100) : 0;
  const sgst = gstApply ? +(gstTotal / 2).toFixed(2) : 0;
  const cgst = gstApply ? +(gstTotal / 2).toFixed(2) : 0;
  const taxable = gstApply ? base : 0;
  const grand = n(pricing.total ?? pricing.totalAmount ?? pricing.totalAmountMinor / 100 ?? base + gstTotal);

  const sacCode = service.sacCode || '998213';
  const invDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const clientName = client.name || client.companyName || '—';
  const clientCo = client.companyName && client.name ? client.companyName : '';
  const invNumber = order.invoiceNumber || '—';

  const thS = (extra = {}) => ({
    padding: '4pt 5pt', fontSize: '7.5pt', fontWeight: 700,
    border: '0.5pt solid #999', textAlign: 'center',
    fontFamily: FONT, lineHeight: 1.25, verticalAlign: 'middle', ...extra,
  });
  const tdS = (extra = {}) => ({
    padding: '4pt 5pt', fontSize: '8pt',
    border: '0.5pt solid #999', fontFamily: FONT,
    verticalAlign: 'top', lineHeight: 1.3, ...extra,
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />

      <div className="inv-no-print" style={{
        display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center', fontFamily: FONT,
      }}>
        <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(backOrderPath)}>
          &larr; Back to Order
        </button>
        <button className="ld-btn-primary" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>

      {/* ═══ A4 PAGE — letterhead background + data overlay ═══ */}
      <div className="inv-page" style={{
        width: '210mm',
        height: '297mm',
        margin: '0 auto',
        backgroundImage: 'url(/letterhead-bg.png)',
        backgroundSize: '210mm 297mm',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top left',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: FONT,
        color: '#111',
        boxShadow: '0 2px 20px rgba(0,0,0,0.15)',
        boxSizing: 'border-box',
      }}>
        {/* Data layer — positioned to clear header and footer from letterhead */}
        <div style={{
          position: 'absolute',
          top: '30mm',
          left: '13mm',
          right: '10mm',
          bottom: '37mm',
          display: 'flex',
          flexDirection: 'column',
        }}>

          {/* Tax Invoice */}
          <div style={{
            textAlign: 'center', fontWeight: 700, fontSize: '14pt',
            marginTop: '18mm', marginBottom: '5mm',
          }}>Tax Invoice</div>

          {/* Sold By | Invoice Number */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', marginBottom: '2mm',
          }}>
            <div style={{ fontSize: '9pt', fontWeight: 700 }}>Sold By: LAUNCHERDESK</div>
            <div style={{
              border: '1pt dashed #aaa', borderRadius: '1.5pt',
              padding: '2pt 8pt', fontSize: '9pt', whiteSpace: 'nowrap',
            }}>
              <strong>Invoice Number</strong> # {invNumber}
            </div>
          </div>

          {/* Horizontal rule */}
          <div style={{ borderTop: '0.5pt solid #bbb', marginBottom: '3mm' }} />

          {/* Invoice Date | Bill To */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', marginBottom: '5mm',
          }}>
            <div style={{ fontSize: '9pt' }}>
              <strong>Invoice Date:</strong> {invDate}
            </div>
            <div style={{ fontSize: '9pt', textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>Bill To</div>
              <div style={{ fontWeight: 700, fontSize: '10pt' }}>{clientName}</div>
              {clientCo && <div style={{ fontSize: '8pt', color: '#333' }}>{clientCo}</div>}
            </div>
          </div>

          {/* Total items */}
          <div style={{ fontSize: '8pt', marginBottom: '3mm' }}>Total items: 1</div>

          {/* ── Table ────────────────────────────────────────── */}
          <table style={{
            width: '100%', borderCollapse: 'collapse',
            tableLayout: 'fixed', fontSize: '8pt',
          }}>
            <colgroup>
              <col style={{ width: '12%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '5%' }} />
              <col style={{ width: '11%' }} />
              <col style={{ width: '11%' }} />
              <col style={{ width: '11%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '8%' }} />
              <col style={{ width: '12%' }} />
            </colgroup>
            <thead>
              <tr>
                <th style={thS({ textAlign: 'left' })}>Product</th>
                <th style={thS({ textAlign: 'left' })}>Title</th>
                <th style={thS()}>Qty</th>
                <th style={thS()}>Gross<br />Amount {'₹'}</th>
                <th style={thS()}>Discounts<br />/Coupons {'₹'}</th>
                <th style={thS()}>Taxable<br />Value {'₹'}</th>
                <th style={thS()}>SGST<br />/UTGST<br />{'₹'}</th>
                <th style={thS()}>CGST<br />{'₹'}</th>
                <th style={thS()}>Total {'₹'}</th>
              </tr>
            </thead>
            <tbody>
              {/* Service row */}
              <tr>
                <td style={tdS({ fontSize: '7.5pt', color: '#333' })}>SAC: {sacCode}</td>
                <td style={tdS({ fontWeight: 700 })}>{service.name || 'Professional Service'}</td>
                <td style={tdS({ textAlign: 'center' })}>1</td>
                <td style={tdS({ textAlign: 'right' })}>{fmt(base)}</td>
                <td style={tdS({ textAlign: 'right' })}>0.00</td>
                <td style={tdS({ textAlign: 'right' })}>{gstApply ? fmt(taxable) : '0.00'}</td>
                <td style={tdS({ textAlign: 'right' })}>{gstApply ? '' : '0.00'}</td>
                <td style={tdS({ textAlign: 'right' })}>{gstApply ? '' : '0.00'}</td>
                <td style={tdS({ textAlign: 'right' })}>{fmt(base)}</td>
              </tr>

              {/* GST row */}
              {gstApply && (
                <tr>
                  <td style={tdS()} />
                  <td style={tdS({ fontSize: '7.5pt' })}>
                    <strong>GST @ {gstPct}%</strong><br />
                    <span style={{ fontSize: '6.5pt', color: '#444' }}>
                      SGST/UTGST {gstPct / 2}% + CGST {gstPct / 2}% on {'₹'}{fmt(taxable)}
                    </span>
                  </td>
                  <td style={tdS()} /><td style={tdS()} /><td style={tdS()} /><td style={tdS()} />
                  <td style={tdS({ textAlign: 'right' })}>{fmt(sgst)}</td>
                  <td style={tdS({ textAlign: 'right' })}>{fmt(cgst)}</td>
                  <td style={tdS({ textAlign: 'right' })}>{fmt(gstTotal)}</td>
                </tr>
              )}

              {/* Total row */}
              <tr>
                <td style={thS({ textAlign: 'center' })}>Total</td>
                <td style={tdS()} />
                <td style={thS({ textAlign: 'center' })}>1</td>
                <td style={thS({ textAlign: 'right' })}>{fmt(base)}</td>
                <td style={thS({ textAlign: 'right' })}>0.00</td>
                <td style={thS({ textAlign: 'right' })}>{fmt(taxable)}</td>
                <td style={thS({ textAlign: 'right' })}>{fmt(sgst)}</td>
                <td style={thS({ textAlign: 'right' })}>{fmt(cgst)}</td>
                <td style={thS({ textAlign: 'right' })}>{fmt(grand)}</td>
              </tr>
            </tbody>
          </table>

          {/* ── Grand Total + Seal — right-stacked ─────────── */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4mm' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: '6mm',
                justifyContent: 'flex-end', marginBottom: '2mm',
              }}>
                <span style={{ fontSize: '10pt', fontWeight: 700 }}>Grand Total</span>
                <span style={{ fontSize: '14pt', fontWeight: 900 }}>{'₹'} {fmt(grand)}</span>
              </div>
              <div style={{ fontSize: '7.5pt', fontWeight: 700, marginBottom: '2mm' }}>
                DUTYLAUNCH SOLUTIONS PVT. LTD.
              </div>
              <img
                src="/dutylaunch-seal.png"
                alt="Seal and Signature"
                style={{ height: '22mm', objectFit: 'contain', display: 'block', marginLeft: 'auto' }}
              />
              <div style={{ fontSize: '7pt', color: '#444', marginTop: '2mm' }}>
                Authorized Signatory
              </div>
            </div>
          </div>

          {/* E. & O.E. */}
          <div style={{
            borderTop: '0.75pt dashed #bbb', marginTop: '6mm', paddingTop: '3mm',
            textAlign: 'right', fontSize: '8pt', color: '#444',
          }}>
            <strong style={{ fontStyle: 'italic' }}>E. &amp; O.E.</strong>&nbsp;&nbsp;&nbsp;page 1 of 1
          </div>

        </div>{/* end data layer */}
      </div>{/* end inv-page */}
    </>
  );
}
