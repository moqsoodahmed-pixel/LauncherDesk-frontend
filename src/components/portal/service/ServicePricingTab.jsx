import { useState } from 'react';
import { updateService } from '../../../services/portal/servicesApi';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';
import { formatMoney } from '../../../utils/portal/money';

export default function ServicePricingTab({ service, onChanged, onToast }) {
  const { hasPermission } = useAuth();
  const canEdit = hasPermission(PERMISSIONS.EDIT_SERVICE);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    basePrice: String(service.pricing?.basePrice ?? 0),
    gstApplicable: service.gstApplicable ?? true,
    gstPercentage: String(service.gstPercentage ?? 18),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function save(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateService(service.id, {
        basePrice: Number(form.basePrice),
        gstApplicable: form.gstApplicable,
        gstPercentage: Number(form.gstPercentage),
      });
      onToast({ type: 'success', message: 'Pricing updated.' });
      setEditing(false);
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not update pricing.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  const { pricing } = service;

  return (
    <div className="ld-panel" style={{ maxWidth: 480 }}>
      {!editing ? (
        <>
          <div className="ld-card-grid">
            <div>
              <div className="ld-card-label">Base Price</div>
              <div className="ld-card-value" style={{ fontSize: 16 }}>
                {formatMoney(pricing?.basePrice)}
              </div>
            </div>
            <div>
              <div className="ld-card-label">Currency</div>
              <div className="ld-card-value" style={{ fontSize: 16 }}>
                {pricing.currency}
              </div>
            </div>
            <div>
              <div className="ld-card-label">GST ({service.gstApplicable ? `${service.gstPercentage ?? ''}%` : 'not applicable'})</div>
              <div className="ld-card-value" style={{ fontSize: 16 }}>
                {formatMoney(pricing?.gstAmount)}
              </div>
            </div>
            <div>
              <div className="ld-card-label">Estimated Total</div>
              <div className="ld-card-value" style={{ fontSize: 18, fontWeight: 700 }}>
                {formatMoney(pricing?.total)}
              </div>
            </div>
          </div>
          <p className="ld-phase-note" style={{ marginTop: 12 }}>
            Informational only - actual order pricing will always be computed server-side (Phase 5), never trusted from the
            frontend.
          </p>
          {canEdit && (
            <button className="ld-btn-secondary" style={{ marginTop: 8 }} onClick={() => setEditing(true)}>
              Edit Pricing
            </button>
          )}
        </>
      ) : (
        <form onSubmit={save}>
          <div className="ld-form-group">
            <label className="ld-form-label">Base Price (₹)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="ld-form-input"
              value={form.basePrice}
              onChange={(e) => setForm({ ...form, basePrice: e.target.value })}
              required
            />
          </div>
          <div className="ld-form-group">
            <label className="ld-form-label">
              <input
                type="checkbox"
                checked={form.gstApplicable}
                onChange={(e) => setForm({ ...form, gstApplicable: e.target.checked })}
                style={{ marginRight: 6 }}
              />
              GST Applicable
            </label>
          </div>
          <div className="ld-form-group">
            <label className="ld-form-label">GST %</label>
            <input
              type="number"
              min="0"
              max="100"
              className="ld-form-input"
              value={form.gstPercentage}
              onChange={(e) => setForm({ ...form, gstPercentage: e.target.value })}
              disabled={!form.gstApplicable}
            />
          </div>
          <div className="ld-row-actions">
            <button type="submit" className="ld-btn-primary" disabled={isSubmitting}>
              Save
            </button>
            <button type="button" className="ld-btn-secondary" onClick={() => setEditing(false)} disabled={isSubmitting}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
