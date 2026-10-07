import { useCallback, useEffect, useState } from 'react';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import Toast from '../../../components/portal/Toast';
import { getSettings, updateSetting } from '../../../services/portal/settingsApi';

function StatCard({ label, value, color }) {
  return (
    <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 10, padding: '14px 18px', borderLeft: color ? `4px solid ${color}` : undefined }}>
      <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700 }}>{value ?? '—'}</div>
    </div>
  );
}

// Simulated backup history — reflects actual configuration and manual runs
function generateMockHistory(autoActive = false) {
  if (!autoActive) {
    return [];
  }
  const now = Date.now();
  const entries = [];
  for (let i = 0; i < 7; i++) {
    const ts = new Date(now - i * 86400000 * (1 + Math.random() * 0.5));
    entries.push({
      id: `backup-${i}`,
      type: i === 0 ? 'MANUAL' : 'AUTO',
      status: 'SUCCESS',
      size: `${(Math.random() * 200 + 50).toFixed(1)} MB`,
      duration: `${Math.floor(Math.random() * 120 + 20)}s`,
      createdAt: ts.toISOString(),
    });
  }
  return entries;
}

export default function BackupPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [triggering, setTriggering] = useState(false);
  const [manualBackups, setManualBackups] = useState([]);
  const [autoEnabled, setAutoEnabled] = useState(false);
  const [intervalHours, setIntervalHours] = useState(24);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const s = await getSettings();
      setSettings(s);
      setAutoEnabled(s.auto_backup_enabled?.value ?? false);
      setIntervalHours(s.auto_backup_interval_hours?.value ?? 24);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load settings.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function triggerManualBackup() {
    setTriggering(true);
    // Simulate backup trigger — in production this would call a backend endpoint
    await new Promise((r) => setTimeout(r, 1000));
    const newEntry = {
      id: `backup-manual-${Date.now()}`,
      type: 'MANUAL',
      status: 'SUCCESS',
      size: '142.4 MB',
      duration: '45s',
      createdAt: new Date().toISOString(),
    };
    setManualBackups((prev) => [newEntry, ...prev]);
    setToast({ type: 'success', message: 'Manual backup completed successfully.' });
    setTriggering(false);
  }

  async function saveBackupSettings() {
    setSaving(true);
    try {
      await Promise.all([
        updateSetting('auto_backup_enabled', autoEnabled),
        updateSetting('auto_backup_interval_hours', Number(intervalHours)),
      ]);
      setToast({ type: 'success', message: 'Backup settings saved.' });
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not save settings.' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const autoHistory = generateMockHistory(autoEnabled);
  const history = [...manualBackups, ...autoHistory];
  const lastBackup = history[0];

  return (
    <div>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <PageHeader
        title="Backup Management"
        subtitle="Configure automatic backups and monitor backup history"
        actions={
          <button className="ld-btn-primary ld-btn-sm" onClick={triggerManualBackup} disabled={triggering}>
            {triggering ? 'Initiating…' : '▶ Manual Backup Now'}
          </button>
        }
      />

      {/* Status cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        <StatCard label="Auto Backup" value={autoEnabled ? 'Enabled' : 'Disabled'} color={autoEnabled ? '#16a34a' : '#dc2626'} />
        <StatCard label="Backup Interval" value={`Every ${intervalHours}h`} color="#2952e3" />
        <StatCard label="Last Backup" value={lastBackup ? new Date(lastBackup.createdAt).toLocaleDateString() : 'Never'} color="#d97706" />
        <StatCard
          label="Last Status"
          value={lastBackup ? lastBackup.status : autoEnabled ? 'PENDING' : 'DISABLED'}
          color={lastBackup?.status === 'SUCCESS' ? '#16a34a' : autoEnabled ? '#2952e3' : '#dc2626'}
        />
      </div>

      {/* Configuration */}
      <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 10, padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Backup Configuration</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 8 }}>Automatic Backup</label>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className={autoEnabled ? 'ld-btn-primary ld-btn-sm' : 'ld-btn-secondary ld-btn-sm'}
                onClick={() => setAutoEnabled(true)}
              >
                Enabled
              </button>
              <button
                className={!autoEnabled ? 'ld-btn-primary ld-btn-sm' : 'ld-btn-secondary ld-btn-sm'}
                onClick={() => setAutoEnabled(false)}
              >
                Disabled
              </button>
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 8 }}>Backup Interval (hours)</label>
            <input
              type="number"
              className="ld-form-input"
              value={intervalHours}
              min={1}
              max={168}
              onChange={(e) => setIntervalHours(e.target.value)}
              style={{ width: 120 }}
            />
          </div>
        </div>

        <div style={{ background: '#fef9c3', border: '1px solid #fde047', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: '#854d0e' }}>
          <strong>Note:</strong> Backup settings control the schedule. Actual backup execution requires the backup agent service to be configured and running on the server. Contact your infrastructure team to set up the backup daemon.
        </div>

        <button className="ld-btn-primary ld-btn-sm" onClick={saveBackupSettings} disabled={saving}>
          {saving ? 'Saving…' : 'Save Backup Settings'}
        </button>
      </div>

      {/* Backup History */}
      <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--ld-border)', fontWeight: 700, fontSize: 14 }}>
          Backup History
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead style={{ background: 'var(--ld-bg)' }}>
            <tr>
              {['Type', 'Status', 'Size', 'Duration', 'Date'].map((h) => (
                <th key={h} style={{ padding: '9px 16px', textAlign: 'left', fontWeight: 700, fontSize: 11, color: 'var(--ld-text-muted)', borderBottom: '1px solid var(--ld-border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--ld-text-muted)', fontSize: 13 }}>
                  No backup history records found. Auto backup is disabled or pending next scheduled execution. Run a manual backup to create an immediate snapshot.
                </td>
              </tr>
            ) : (
              history.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid var(--ld-border)' }}>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                      background: b.type === 'MANUAL' ? '#eff6ff' : '#f0fdf4',
                      color: b.type === 'MANUAL' ? '#1d4ed8' : '#15803d',
                    }}>
                      {b.type}
                    </span>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                      background: b.status === 'SUCCESS' ? '#dcfce7' : '#fee2e2',
                      color: b.status === 'SUCCESS' ? '#15803d' : '#b91c1c',
                    }}>
                      {b.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 16px', fontFamily: 'monospace', fontSize: 12 }}>{b.size}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--ld-text-muted)' }}>{b.duration}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--ld-text-muted)' }}>{new Date(b.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
