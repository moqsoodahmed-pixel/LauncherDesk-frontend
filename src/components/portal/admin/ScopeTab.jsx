import { useState } from 'react';
import { updateAdminScope } from '../../../services/portal/adminsApi';
import { CLIENT_SCOPE_OPTIONS, ORDER_SCOPE_OPTIONS } from '../../../constants/portal/dataScopes';

export default function ScopeTab({ admin, onChanged, onToast }) {
  const [clients, setClients] = useState(admin.dataScope.clients);
  const [orders, setOrders] = useState(admin.dataScope.orders);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dirty = clients !== admin.dataScope.clients || orders !== admin.dataScope.orders;

  if (admin.role === 'SUPER_ADMIN') {
    return (
      <div className="ld-panel">
        <p style={{ margin: 0 }}>Super Admin always has unrestricted access to all clients and orders.</p>
      </div>
    );
  }

  async function save() {
    setIsSubmitting(true);
    try {
      await updateAdminScope(admin.id, { clients, orders });
      onToast({ type: 'success', message: 'Data scope updated.' });
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not update data scope.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="ld-panel" style={{ maxWidth: 480 }}>
      <div className="ld-form-group">
        <label className="ld-form-label">Client visibility</label>
        <select value={clients} onChange={(e) => setClients(e.target.value)}>
          {CLIENT_SCOPE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <p className="ld-phase-note">
          {clients === 'ALL_CLIENTS' ? 'Sees every client in the system.' : 'Sees only clients assigned to them.'}
        </p>
      </div>
      <div className="ld-form-group">
        <label className="ld-form-label">Order visibility</label>
        <select value={orders} onChange={(e) => setOrders(e.target.value)}>
          {ORDER_SCOPE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <p className="ld-phase-note">
          {orders === 'ALL_ORDERS' ? 'Sees every order in the system.' : 'Sees only orders assigned to them.'}
        </p>
      </div>
      <button className="ld-btn-primary" onClick={save} disabled={isSubmitting || !dirty}>
        {isSubmitting ? 'Saving…' : 'Save Data Scope'}
      </button>
    </div>
  );
}
