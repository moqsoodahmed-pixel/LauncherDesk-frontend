import { useState } from 'react';
import PermissionMatrix from './PermissionMatrix';
import { updateAdminPermissions } from '../../../services/portal/adminsApi';

export default function PermissionsTab({ admin, onChanged, onToast }) {
  const [selected, setSelected] = useState(admin.permissions);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dirty = JSON.stringify([...selected].sort()) !== JSON.stringify([...admin.permissions].sort());

  if (admin.role === 'SUPER_ADMIN') {
    return (
      <div className="ld-panel">
        <p style={{ margin: 0 }}>Super Admin implicitly holds every permission. There is nothing to configure here.</p>
      </div>
    );
  }

  async function save() {
    setIsSubmitting(true);
    try {
      await updateAdminPermissions(admin.id, selected);
      onToast({ type: 'success', message: 'Permissions updated.' });
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not update permissions.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="ld-panel" style={{ marginBottom: 16 }}>
        <PermissionMatrix selected={selected} onChange={setSelected} />
      </div>
      <button className="ld-btn-primary" onClick={save} disabled={isSubmitting || !dirty}>
        {isSubmitting ? 'Saving…' : 'Save Permissions'}
      </button>
      {dirty && <span className="ld-phase-note" style={{ marginLeft: 10 }}>Unsaved changes</span>}
    </div>
  );
}
