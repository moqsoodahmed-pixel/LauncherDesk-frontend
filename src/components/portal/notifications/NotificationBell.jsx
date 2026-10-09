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
  const prevUnreadRef = useRef(0);

  const fetchUnreadCount = useCallback(async () => {
    if (!user) return;
    try {
      const { unreadCount: count } = await getUnreadCount();
      // Play sound when new unread notifications arrive (count increased)
      if (count > prevUnreadRef.current && prevUnreadRef.current !== undefined && !isMuted()) {
        playNotificationSound();
      }
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
            if (count > prevUnreadRef.current && prevUnreadRef.current !== undefined && !isMuted()) {
              playNotificationSound();
            }
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
          // SSE failed — fall back to polling and retry SSE in 60s. Tracked so
          // the effect cleanup can cancel it; otherwise an unmount during the
          // 60s window (e.g. logout, navigating away) left this fire anyway
          // and call connectSSE() on a dead effect instance, opening a new
          // EventSource/interval that nothing could ever clean up again.
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
    } catch {
      // Toast-less: the panel is small and transient; a failed mark-all
      // just leaves badges as-is and the user can retry.
    }
  }

  async function handleNotificationClick(notification) {
    if (!notification.isRead) {
      try {
        await markNotificationRead(notification.id);
        setItems((prev) => prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)));
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch {
        // Navigate anyway - marking read failing shouldn't block the user.
      }
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
              background: 'var(--ld-danger)',
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
            top: 'calc(100% + 8px)',
            right: 0,
            width: 340,
            maxHeight: 440,
            overflowY: 'auto',
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: 'var(--ld-glass-border)',
            borderRadius: 'var(--ld-radius-lg)',
            boxShadow: 'var(--ld-shadow-lg)',
            zIndex: 150,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderBottom: '1px solid var(--ld-border)',
              gap: 8,
            }}
          >
            <strong style={{ fontSize: 13 }}>Notifications {unreadCount > 0 && <span style={{ color: 'var(--ld-primary)', fontSize: 11 }}>({unreadCount})</span>}</strong>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <button
                type="button"
                className="ld-btn-secondary ld-btn-sm"
                title={muted ? 'Unmute sounds' : 'Mute sounds'}
                onClick={() => { const next = !muted; setMutedState(next); setMuted(next); }}
                style={{ fontSize: 14, padding: '2px 6px' }}
              >
                {muted ? '🔇' : '🔔'}
              </button>
              <button type="button" className="ld-btn-secondary ld-btn-sm" onClick={handleMarkAllRead} disabled={unreadCount === 0}>
                Mark all read
              </button>
            </div>
          </div>
          {/* View all link */}
          <div style={{ padding: '6px 14px', borderBottom: '1px solid var(--ld-gold-border)', background: 'rgba(212,165,116,0.05)' }}>
            <button
              type="button"
              style={{ fontSize: 12, color: 'var(--ld-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}
              onClick={() => { setOpen(false); navigate(`/${user?.role?.toLowerCase().replace('_', '-')}/notifications`); }}
            >
              View all notifications →
            </button>
          </div>

          {loading && <div className="ld-loading-state" style={{ padding: 20 }}>Loading…</div>}
          {!loading && error && <div className="ld-error-state" style={{ padding: 20 }}>{error}</div>}
          {!loading && !error && items.length === 0 && (
            <div className="ld-empty-state" style={{ padding: 20 }}>No notifications yet.</div>
          )}

          {!loading &&
            !error &&
            items.map((notification) => {
              const colors = getSeverityColors(notification.severity);
              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => handleNotificationClick(notification)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: notification.isRead ? 'transparent' : 'rgba(212,165,116,0.07)',
                    border: 'none',
                    borderLeft: `3px solid ${colors.fg}`,
                    borderBottom: '1px solid var(--ld-border)',
                    padding: '10px 14px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: notification.isRead ? 400 : 700, color: 'var(--ld-text)' }}>
                    {notification.title || formatNotificationEvent(notification.type)}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginTop: 2 }}>{notification.message}</div>
                  <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginTop: 4 }}>
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
