import { PERMISSION_GROUPS } from '../../../constants/portal/permissionGroups';

/**
 * Checkbox grid grouped by module, with per-group Select All / Clear.
 * `readOnly` renders it as a reference view (Super Admin's own implicit
 * "everything" set, or anywhere editing shouldn't be offered).
 */
export default function PermissionMatrix({ selected, onChange, readOnly = false }) {
  const selectedSet = new Set(selected);

  function toggle(permission) {
    if (readOnly) return;
    const next = selectedSet.has(permission) ? selected.filter((p) => p !== permission) : [...selected, permission];
    onChange(next);
  }

  function setGroup(groupPermissions, checked) {
    if (readOnly) return;
    const withoutGroup = selected.filter((p) => !groupPermissions.includes(p));
    onChange(checked ? [...withoutGroup, ...groupPermissions] : withoutGroup);
  }

  return (
    <div>
      {PERMISSION_GROUPS.map((group) => {
        const allSelected = group.permissions.every((p) => selectedSet.has(p));
        return (
          <div className="ld-permission-group" key={group.label}>
            <div className="ld-permission-group-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{group.label}</span>
              {!readOnly && (
                <span>
                  <button
                    type="button"
                    className="ld-btn-secondary ld-btn-sm"
                    style={{ marginRight: 6 }}
                    onClick={() => setGroup(group.permissions, true)}
                  >
                    Select all
                  </button>
                  <button type="button" className="ld-btn-secondary ld-btn-sm" onClick={() => setGroup(group.permissions, false)}>
                    Clear
                  </button>
                </span>
              )}
            </div>
            <div className="ld-permission-grid">
              {group.permissions.map((permission) => (
                <label className="ld-permission-item" key={permission}>
                  <input
                    type="checkbox"
                    checked={selectedSet.has(permission)}
                    onChange={() => toggle(permission)}
                    disabled={readOnly}
                  />
                  {permission}
                </label>
              ))}
            </div>
            {allSelected && !readOnly && (
              <span className="ld-phase-note" style={{ display: 'inline-block', marginTop: 4 }}>
                All {group.label.toLowerCase()} permissions granted
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
