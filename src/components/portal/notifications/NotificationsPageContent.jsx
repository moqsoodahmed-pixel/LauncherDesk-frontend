import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/PortalAuthContext';
import PageHeader from '../PageHeader';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
import EmptyState from '../EmptyState';
import Pagination from '../Pagination';
import Toast from '../Toast';
import { getNotifications, markNotificationRead, markAllNotificationsRead, archiveNotification, archiveAllReadNotifications } from '../../../services/portal/notificationsApi';
import { formatNotificationEvent, getSeverityColors } from '../../../constants/portal/notificationEvents';
import formatRelativeTime from '../../../utils/portal/formatRelativeTime';

const ENTITY_ROUTES = {
  SUPER_ADMIN: {
    Order: '/super-admin/orders',
    Client: '/super-admin/clients',
    KycDocument: '/super-admin/orders',
    User: '/super-admin/admins',
  },
  ADMIN: {
    Order: '/admin/orders',
    Client: '/admin/clients',
    KycDocument: '/admin/orders',
  },
  CLIENT: {
    Order: '/client/orders',
    KycDocument: '/client/orders',
  },
};

const SEVERITY_FILTER_OPTIONS = [
  { value: '', label: 'All severities' },
  { value: 'SUCCESS', label: 'Success' },
  { value: 'WARNING', label: 'Warning' },
  { value: 'ERROR', label: 'Error' },
  { value: 'INFO', label: 'Info' },
];

export default function NotificationsPageContent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const [unreadOnly, setUnreadOnly] = useState(false);
  const [archivedOnly, setArchivedOnly] = useState(false);
  const [severity, setSeverity] = useState('');
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = { page, limit: 20 };
      if (unreadOnly) params.isRead = false;
      if (archivedOnly) params.isArchived = true;
      if (severity) params.severity = severity;
      const result = await getNotifications(params);
      setItems(result.data);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  }, [page, unreadOnly, archivedOnly, severity]);

  useEffect(() => { load(); }, [load]);

  async function handleMarkAllRead() {
    try {
      const { modifiedCount } = await markAllNotificationsRead();
      setToast({ type: 'success', message: `Marked ${modifiedCount} notification(s) read.` });
      load();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not mark all read.' });
    }
  }

  async function handleArchiveOne(e, notification) {
    e.stopPropagation();
    try {
      await archiveNotification(notification.id);
      setItems((prev) => prev.filter((n) => n.id !== notification.id));
      setToast({ type: 'success', message: 'Notification archived.' });
    } catch {
      setToast({ type: 'error', message: 'Could not archive.' });
    }
  }

  async function handleArchiveAllRead() {
    try {
      const { modifiedCount } = await archiveAllReadNotifications();
      setToast({ type: 'success', message: `Archived ${modifiedCount} read notification(s).` });
      load();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not archive.' });
    }
  }

  async function handleMarkOneRead(e, notification) {
    e.stopPropagation();
    if (notification.isRead) return;
    try {
      await markNotificationRead(notification.id);
      setItems((prev) => prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)));
    } catch {
      // silent
    }
  }

  async function handleRowClick(notification) {
    if (!notification.isRead) {
      try {
        await markNotificationRead(notification.id);
        setItems((prev) => prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)));
      } catch {}
    }
    const { relatedResourceType, relatedResourceId } = notification;
    if (relatedResourceId && relatedResourceType) {
      const roleRoutes = ENTITY_ROUTES[user?.role] || {};
      const prefix = roleRoutes[relatedResourceType];
      if (prefix) navigate(`${prefix}/${relatedResourceId}`);
    }
  }

  const unreadCount = items.filter((n) => !n.isRead).length;

  return (
    <div>
      <PageHeader title="Notifications" subtitle="System-generated alerts about orders, KYC, payments, and account activity." />

      <div className="ld-toolbar" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1, alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={(e) => { setUnreadOnly(e.target.checked); setArchivedOnly(false); setPage(1); }}
            />
            Unread only
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
            <input
              type="checkbox"
              checked={archivedOnly}
              onChange={(e) => { setArchivedOnly(e.target.checked); setUnreadOnly(false); setPage(1); }}
            />
            Archived
          </label>
          <select value={severity} onChange={(e) => { setSeverity(e.target.value); setPage(1); }}>
            {SEVERITY_FILTER_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {(unreadOnly || archivedOnly || severity) && (
            <button className="ld-btn-secondary ld-btn-sm" onClick={() => { setUnreadOnly(false); setArchivedOnly(false); setSeverity(''); setPage(1); }}>
              Clear
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {meta && <span style={{ fontSize: 13, color: 'var(--ld-text-muted)' }}>{meta.total} total</span>}
          <button className="ld-btn-secondary" onClick={handleMarkAllRead}>
            Mark all read
          </button>
          <button className="ld-btn-secondary" onClick={handleArchiveAllRead}>
            Archive read
          </button>
        </div>
      </div>

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} />}
      {!loading && !error && items.length === 0 && <EmptyState message="No notifications to show." />}

      {!loading && !error && items.length > 0 && (
        <div className="ld-table-wrap">
          <table className="ld-table">
            <thead>
              <tr>
                <th style={{ width: 20 }}></th>
                <th>Title</th>
                <th>Message</th>
                <th>Severity</th>
                <th>Type</th>
                <th>When</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((notification) => {
                const colors = getSeverityColors(notification.severity);
                return (
                  <tr
                    key={notification.id}
                    onClick={() => handleRowClick(notification)}
                    style={{
                      cursor: 'pointer',
                      background: notification.isRead ? 'transparent' : '#f7f9ff',
                    }}
                  >
                    <td style={{ borderLeft: `3px solid ${colors.fg}` }}>
                      {!notification.isRead && <span title="Unread" style={{ color: colors.fg, fontSize: 8 }}>●</span>}
                    </td>
                    <td style={{ fontWeight: notification.isRead ? 400 : 700, fontSize: 13 }}>
                      {notification.title || formatNotificationEvent(notification.type)}
                    </td>
                    <td style={{ fontSize: 13 }}>{notification.message}</td>
                    <td>
                      <span style={{
                        fontSize: 11,
                        background: colors.bg,
                        color: colors.fg,
                        padding: '2px 8px',
                        borderRadius: 999,
                        fontWeight: 700,
                      }}>
                        {notification.severity || 'DEFAULT'}
                      </span>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--ld-text-muted)' }}>{formatNotificationEvent(notification.type)}</td>
                    <td style={{ fontSize: 12 }} title={new Date(notification.createdAt).toLocaleString()}>
                      {formatRelativeTime(notification.createdAt)}
                    </td>
                    <td onClick={(e) => e.stopPropagation()} style={{ display: 'flex', gap: 6 }}>
                      {!notification.isRead && (
                        <button
                          className="ld-btn-secondary ld-btn-sm"
                          onClick={(e) => handleMarkOneRead(e, notification)}
                        >
                          Mark read
                        </button>
                      )}
                      {!notification.isArchived && (
                        <button
                          className="ld-btn-secondary ld-btn-sm"
                          onClick={(e) => handleArchiveOne(e, notification)}
                          title="Archive this notification"
                        >
                          Archive
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination meta={meta} onPageChange={setPage} />
        </div>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
