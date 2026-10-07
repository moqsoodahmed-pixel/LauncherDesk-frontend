import { useCallback, useEffect, useState } from 'react';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import Toast from '../../../components/portal/Toast';
import { getSettings, updateSetting } from '../../../services/portal/settingsApi';
import { saveDateFormat } from '../../../utils/portal/dateFormat';

const GROUP_ORDER = [
  'Company', 'Branding', 'Invoice', 'Password Policy',
  'Security', 'Upload Rules', 'Email', 'Notifications',
  'Feature Flags', 'System',
];

function SettingRow({ setting, onSave }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function startEdit() {
    setValue(String(setting.value ?? ''));
    setError('');
    setEditing(true);
  }

  async function save() {
    setSaving(true);
    setError('');
    try {
      let parsed = value;
      if (setting.type === 'number') {
        parsed = Number(value);
        if (isNaN(parsed)) { setError('Must be a number.'); setSaving(false); return; }
      } else if (setting.type === 'boolean') {
        parsed = value === 'true';
      }
      await onSave(setting.key, parsed);
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save setting.');
    } finally {
      setSaving(false);
    }
  }

  function renderValue(v, type) {
    if (type === 'boolean') return v ? 'Enabled' : 'Disabled';
    return String(v ?? '—');
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr auto',
      alignItems: 'center',
      padding: '12px 20px',
      borderBottom: '1px solid var(--ld-border)',
      gap: 12,
    }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{setting.label}</div>
        {setting.description && (
          <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginTop: 2 }}>{setting.description}</div>
        )}
        {setting.isDefault && (
          <span style={{ fontSize: 10, color: '#92400e', background: '#fef3c7', padding: '1px 6px', borderRadius: 4, fontWeight: 600 }}>DEFAULT</span>
        )}
      </div>

      <div>
        {editing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {setting.type === 'boolean' ? (
              <select
                className="ld-form-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{ width: '100%', fontSize: 13 }}
                autoFocus
              >
                <option value="true">Enabled</option>
                <option value="false">Disabled</option>
              </select>
            ) : (
              <input
                className="ld-form-input"
                type={setting.type === 'number' ? 'number' : 'text'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{ width: '100%', fontSize: 13 }}
                autoFocus
                onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEditing(false); }}
              />
            )}
            {error && <span style={{ fontSize: 11, color: '#dc2626' }}>{error}</span>}
          </div>
        ) : (
          <span style={{ fontSize: 13, fontWeight: 600, fontFamily: setting.type === 'number' ? 'monospace' : undefined }}>
            {renderValue(setting.value, setting.type)}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', minWidth: 120 }}>
        {editing ? (
          <>
            <button className="ld-btn-primary ld-btn-sm" onClick={save} disabled={saving}>
              {saving ? '…' : 'Save'}
            </button>
            <button className="ld-btn-secondary ld-btn-sm" onClick={() => setEditing(false)} disabled={saving}>
              Cancel
            </button>
          </>
        ) : (
          <button className="ld-btn-secondary ld-btn-sm" onClick={startEdit}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setSettings(await getSettings());
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load settings.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleSave(key, value) {
    await updateSetting(key, value);

    // FIX BUG-SA-08: When the date_format setting is saved, persist it to
    // localStorage so the global dateFormat.js utility picks it up immediately.
    // Previously the setting was saved to the DB but never read by any component.
    if (key === 'date_format') {
      saveDateFormat(value);
    }

    setToast({ type: 'success', message: `${settings[key]?.label || key} updated.` });
    setSettings((prev) => ({
      ...prev,
      [key]: { ...prev[key], value, isDefault: false },
    }));
  }

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!settings) return null;

  const REQUIRED_SETTINGS = ['company_name', 'company_address', 'company_email', 'company_phone', 'company_gst_number', 'company_website'];
  const completedCount = REQUIRED_SETTINGS.filter(k => {
    const s = settings[k];
    return s && !s.isDefault && s.value !== '';
  }).length;
  const completionPct = Math.round((completedCount / REQUIRED_SETTINGS.length) * 100);
  const isSetupComplete = completionPct === 100;

  // Group settings
  const grouped = {};
  for (const s of Object.values(settings)) {
    const g = s.group || 'Other';
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(s);
  }

  const groupOrder = GROUP_ORDER.filter((g) => grouped[g]);
  const extras = Object.keys(grouped).filter((g) => !GROUP_ORDER.includes(g));

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Enterprise platform configuration. Every change is audited and takes effect immediately."
      />

      <div style={{
        background: isSetupComplete ? '#dcfce7' : '#fef9c3',
        border: `1px solid ${isSetupComplete ? '#bbf7d0' : '#fde047'}`,
        borderRadius: 10, padding: '14px 20px', marginBottom: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: isSetupComplete ? '#166534' : '#92400e' }}>
            {isSetupComplete ? '✓ Company Setup Complete' : `Company Setup ${completionPct}% Complete`}
          </div>
          <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginTop: 2 }}>
            {isSetupComplete
              ? 'All required company settings are configured.'
              : `Fill in: ${REQUIRED_SETTINGS.filter(k => !settings?.[k] || settings[k].isDefault || !settings[k].value).map(k => settings?.[k]?.label || k).join(', ')}`}
          </div>
        </div>
        <div style={{
          width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
          border: `4px solid ${isSetupComplete ? '#16a34a' : '#d97706'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 800, color: isSetupComplete ? '#16a34a' : '#d97706',
        }}>
          {completionPct}%
        </div>
      </div>

      {[...groupOrder, ...extras].map((group) => (
        <div key={group} style={{
          background: 'var(--ld-surface)',
          border: '1px solid var(--ld-border)',
          borderRadius: 'var(--ld-radius)',
          marginBottom: 20,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '12px 20px',
            borderBottom: '1px solid var(--ld-border)',
            fontWeight: 700,
            fontSize: 14,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span>{group}</span>
            <span style={{ fontSize: 11, color: 'var(--ld-text-muted)', fontWeight: 400 }}>
              {grouped[group].length} setting{grouped[group].length !== 1 ? 's' : ''}
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr auto',
            padding: '8px 20px 4px',
            fontSize: 11,
            color: 'var(--ld-text-muted)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            <span>Setting</span>
            <span>Value</span>
            <span style={{ minWidth: 120 }}></span>
          </div>

          {grouped[group].map((s) => (
            <SettingRow key={s.key} setting={s} onSave={handleSave} />
          ))}
        </div>
      ))}

      <div style={{
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: 'var(--ld-radius)',
        padding: '12px 18px',
        fontSize: 12,
        color: '#166534',
      }}>
        Every setting change creates an audit log entry. Changes take effect immediately — no restart required.
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}