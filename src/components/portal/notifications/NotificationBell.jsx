import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/PortalAuthContext';
import { getNotifications, getUnreadCount, markNotificationRead, markAllNotificationsRead } from '../../../services/portal/notificationsApi';
import { formatNotificationEvent, getSeverityColors } from '../../../constants/portal/notificationEvents';
import formatRelativeTime from '../../../utils/portal/formatRelativeTime';
import { getAccessToken } from '../../../services/portal/apiClient';
import { PORTAL_API_BASE } from '../../../config/api';

const POLL_INTERVAL_MS = 45000;
const MUTE_KEY = 'ld_notif_muted';

/** Build the SSE URL with the current access token as a query param (EventSource cannot set headers). */
function buildSseUrl() {
  const token = getAccessToken();
  // SSE lives under the Portal mount on the shared backend: /api/portal/sse
  return token ? `${PORTAL_API_BASE}/sse?token=${encodeURIComponent(token)}` : null;
}

function isMuted() {
  try { return localStorage.getItem(MUTE_KEY) === '1'; } catch { return false; }
}
function setMuted(val) {
  try { localStorage.setItem(MUTE_KEY, val ? '1' : '0'); } catch {}
}

/** Plays a soft notification chime via the Web Audio API — no external file needed. */
function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.15);
    gainNode.gain.setValueAtTime(0.18, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
    oscillator.onended = () => ctx.close();
  } catch {
    // Browser may block AudioContext without user gesture — fail silently.
  }
}

const ENTITY_ROUTES = {
  SUPER_ADMIN: {
    Order: '/super-admin/orders',
    Client: '/super-admin/clients',
    KycDocument: '/super-admin/orders',
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

/**
 * Notification bell + dropdown, mounted in the shared DashboardLayout
 * header so it's available to all three roles. Polls the unread count
 * (visibility-aware, stops on logout/unmount) rather than opening a
 * socket - per the Phase 10 design, notifications are polling-only.
 */
export default function NotificationBell() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [muted, setMutedState] = useState(isMuted);

  const rootRef = useRef(null);
  const prevUnreadRef = useRef(null);
  const isInitialFetchRef = useRef(true);

  const fetchUnreadCount = useCallback(async () => {
    if (!user) return;
    try {
      const { unreadCount: count } = await getUnreadCount();
      // Play sound ONLY when new notifications arrive on subsequent updates, never on initial mount or login
      if (!isInitialFetchRef.current && prevUnreadRef.current !== null && count > prevUnreadRef.current && !isMuted()) {
        playNotificationSound();
      }
      isInitialFetchRef.current = false;
      prevUnreadRef.current = count;
      setUnreadCount(count);
    } catch {
      // Silent - the bell just won't update the badge this cycle.
    }
  }, [user]);

  // Real-time via SSE; falls back to 45s polling if SSE is unavailable.
  useEffect(() => {
    if (!user) {
      setUnreadCount(0);
      return undefined;
    }

    fetchUnreadCount();

    let es = null;
    let intervalId = null;
    let retryTimeoutId = null;
    let sseAlive = false;

    function startPolling() {
      if (intervalId) return;
      intervalId = setInterval(() => {
        if (document.visibilityState === 'visible') fetchUnreadCount();
      }, POLL_INTERVAL_MS);
    }

    function stopPolling() {
      if (intervalId) { clearInterval(intervalId); intervalId = null; }
    }

    function connectSSE() {
      const url = buildSseUrl();
      if (!url) { startPolling(); return; }
      try {
        es = new EventSource(url);
        es.addEventListener('unread_count', (e) => {
          try {
            const payload = JSON.parse(e.data);
            const count = payload.unreadCount ?? 0;
            if (!isInitialFetchRef.current && prevUnreadRef.current !== null && count > prevUnreadRef.current && !isMuted()) {
              playNotificationSound();
            }
            isInitialFetchRef.current = false;
            prevUnreadRef.current = count;
            setUnreadCount(count);
          } catch { /* ignore parse errors */ }
        });
        es.addEventListener('notification', () => {
          // New notification arrived — refresh dropdown if open
          fetchUnreadCount();
        });
        es.onopen = () => { sseAlive = true; stopPolling(); };
        es.onerror = () => {
          sseAlive = false;
          es?.close();
          es = null;
          startPolling();
          retryTimeoutId = setTimeout(() => { retryTimeoutId = null; if (user) connectSSE(); }, 60000);
        };
      } catch {
        startPolling();
      }
    }

    connectSSE();

    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        fetchUnreadCount();
        if (!sseAlive && !intervalId) startPolling();
      } else if (!sseAlive) {
        stopPolling();
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      es?.close();
      stopPolling();
      if (retryTimeoutId) { clearTimeout(retryTimeoutId); retryTimeoutId = null; }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user, fetchUnreadCount]);

  // Close the dropdown on outside click.
  useEffect(() => {
    if (!open) return undefined;
    function handleClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const loadRecent = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getNotifications({ page: 1, limit: 10 });
      setItems(result.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  }, []);

  function toggleOpen() {
    const next = !open;
    setOpen(next);
    if (next) loadRecent();
  }

  async function handleMarkAllRead() {
    try {
      await markAllNotificationsRead();
      setItems((prev) => prev.map((n) => ({ ...n, isRead: true, readAt: new Date().toISOString() })));
      setUnreadCount(0);
    } catch {}
  }

  async function handleNotificationClick(notification) {
    if (!notification.isRead) {
      try {
        await markNotificationRead(notification.id);
        setItems((prev) => prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)));
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch {}
    }
    setOpen(false);
    const { relatedResourceType, relatedResourceId } = notification;
    if (relatedResourceId && relatedResourceType) {
      const roleRoutes = ENTITY_ROUTES[user?.role] || {};
      const prefix = roleRoutes[relatedResourceType];
      if (prefix) navigate(`${prefix}/${relatedResourceId}`);
    }
  }

  if (!user) return null;

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <button
        type="button"
        className="ld-logout-btn"
        onClick={toggleOpen}
        aria-label="Notifications"
        style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6 }}
      >
        <span aria-hidden="true">🔔</span>
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: -6,
              right: -6,
              background: 'var(--ld-danger, #EF4444)',
              color: '#fff',
              borderRadius: 999,
              fontSize: 10,
              fontWeight: 700,
              padding: '1px 5px',
              minWidth: 16,
              textAlign: 'center',
              lineHeight: '14px',
            }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            right: 0,
            width: 360,
            maxWidth: 'calc(100vw - 24px)',
            maxHeight: 460,
            overflowY: 'auto',
            background: 'rgba(11, 17, 32, 0.96)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: 16,
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.65), 0 0 24px rgba(30, 111, 251, 0.20)',
            zIndex: 200,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(255, 255, 255, 0.02)',
              gap: 8,
            }}
          >
            <strong style={{ fontSize: 13.5, fontWeight: 700, color: '#F8FAFC' }}>
              Notifications {unreadCount > 0 && <span style={{ color: '#38BDF8', fontSize: 12, fontWeight: 800 }}>({unreadCount})</span>}
            </strong>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <button
                type="button"
                title={muted ? 'Unmute sounds' : 'Mute sounds'}
                onClick={() => { const next = !muted; setMutedState(next); setMuted(next); }}
                style={{
                  fontSize: 13,
                  padding: '3px 8px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  color: '#CBD5E1',
                  borderRadius: 8,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {muted ? '🔇' : '🔔'}
              </button>
              <button
                type="button"
                onClick={handleMarkAllRead}
                disabled={unreadCount === 0}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: 8,
                  background: unreadCount > 0 ? 'rgba(56, 189, 248, 0.16)' : 'rgba(255, 255, 255, 0.04)',
                  border: unreadCount > 0 ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: unreadCount > 0 ? '#38BDF8' : '#64748B',
                  cursor: unreadCount > 0 ? 'pointer' : 'default',
                  transition: 'all .15s',
                }}
              >
                Mark all read
              </button>
            </div>
          </div>

          {/* View all link */}
          <div style={{ padding: '8px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(56, 189, 248, 0.06)' }}>
            <button
              type="button"
              style={{
                fontSize: 12.5,
                color: '#38BDF8',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
              onClick={() => { setOpen(false); navigate(`/${user?.role?.toLowerCase().replace('_', '-')}/notifications`); }}
            >
              View all notifications →
            </button>
          </div>

          {loading && (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: '#94A3B8', fontSize: 13 }}>
              Loading…
            </div>
          )}
          {!loading && error && (
            <div style={{ padding: '20px 16px', textAlign: 'center', color: '#F87171', fontSize: 13 }}>
              {error}
            </div>
          )}
          {!loading && !error && items.length === 0 && (
            <div style={{ padding: '28px 16px', textAlign: 'center', color: '#64748B', fontSize: 13 }}>
              No notifications yet.
            </div>
          )}

          {!loading &&
            !error &&
            items.map((notification) => {
              const colors = getSeverityColors(notification.severity);
              const isUnread = !notification.isRead;
              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => handleNotificationClick(notification)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: isUnread ? 'rgba(30, 111, 251, 0.08)' : 'transparent',
                    border: 'none',
                    borderLeft: `3.5px solid ${isUnread ? (colors.fg || '#38BDF8') : 'transparent'}`,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    transition: 'background .15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'; }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isUnread ? 'rgba(30, 111, 251, 0.08)' : 'transparent';
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: isUnread ? 700 : 500, color: isUnread ? '#FFFFFF' : '#CBD5E1', marginBottom: 2 }}>
                    {notification.title || formatNotificationEvent(notification.type)}
                  </div>
                  <div style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.45, marginBottom: 4 }}>
                    {notification.message}
                  </div>
                  <div style={{ fontSize: 10.5, color: '#64748B', fontWeight: 600 }}>
                    {formatRelativeTime(notification.createdAt)}
                  </div>
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
}
