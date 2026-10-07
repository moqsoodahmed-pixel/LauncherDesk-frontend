/**
 * Global date formatting utility.
 *
 * FIX BUG-SA-08: The Settings page allowed selecting DD/MM/YYYY vs MM/DD/YYYY
 * but the preference was never connected to any actual rendering. Every component
 * used hardcoded toLocaleDateString() calls with different locales/options,
 * ignoring the setting entirely.
 *
 * This utility reads the saved format preference from localStorage (set by
 * SettingsPage when the user saves) and applies it consistently everywhere.
 *
 * Usage:
 *   import { formatDate, formatDateTime } from '../../utils/dateFormat';
 *
 *   formatDate(someIsoString)        // e.g. "05/10/2026" or "10/05/2026"
 *   formatDateTime(someIsoString)    // e.g. "05/10/2026, 14:32"
 *   formatDateShort(someIsoString)   // e.g. "5 Oct 2026"
 *
 * The preference is stored under the key 'ld_date_format' in localStorage.
 * Valid values: 'DD/MM/YYYY' (default, Indian) | 'MM/DD/YYYY' (US) | 'YYYY-MM-DD' (ISO)
 */

const STORAGE_KEY = 'ld_date_format';
const DEFAULT_FORMAT = 'DD/MM/YYYY';

/** Read the current user-selected date format. */
export function getDateFormat() {
    try {
        return localStorage.getItem(STORAGE_KEY) || DEFAULT_FORMAT;
    } catch {
        return DEFAULT_FORMAT;
    }
}

/** Persist a date format choice (called from SettingsPage on save). */
export function saveDateFormat(format) {
    try {
        localStorage.setItem(STORAGE_KEY, format);
    } catch {
        // ignore storage errors
    }
}

/**
 * Format a date value according to the user's saved preference.
 * Accepts: ISO string | Date object | timestamp number | null/undefined.
 * Returns '—' for falsy/invalid values.
 */
export function formatDate(value) {
    if (!value) return '—';
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return '—';

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    const fmt = getDateFormat();
    switch (fmt) {
        case 'MM/DD/YYYY': return `${month}/${day}/${year}`;
        case 'YYYY-MM-DD': return `${year}-${month}-${day}`;
        case 'DD/MM/YYYY':
        default: return `${day}/${month}/${year}`;
    }
}

/**
 * Format a date + time value.
 * Returns '—' for falsy/invalid values.
 */
export function formatDateTime(value) {
    if (!value) return '—';
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return '—';

    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${formatDate(d)}, ${hours}:${minutes}`;
}

/**
 * Short human-readable date, always in "D Mon YYYY" form.
 * Not affected by the format preference — used for invoice dates and
 * places where the format should always be unambiguous.
 */
export function formatDateShort(value) {
    if (!value) return '—';
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Relative time (e.g. "3 minutes ago", "2 days ago").
 * Unchanged by format preference — always in English relative form.
 */
export function formatRelative(value) {
    if (!value) return '—';
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return '—';

    const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    return formatDateShort(d);
}