import { ROLES } from './roles';

/**
 * Per-role navigation menu. Phase 0 shows every route defined in the
 * spec; permission-based hiding of individual items is refined once the
 * real Admin permission-management UI exists (Phase 2).
 */
export const NAVIGATION = {
  [ROLES.SUPER_ADMIN]: [
    { label: 'Dashboard', path: '/super-admin/dashboard' },
    { label: 'Admins', path: '/super-admin/admins' },
    { label: 'Clients', path: '/super-admin/clients' },
    { label: 'Services', path: '/super-admin/services' },
    { label: 'Orders', path: '/super-admin/orders' },
    { label: 'Payments', path: '/super-admin/payments' },
    { label: 'Invoices', path: '/super-admin/invoices' },
    { label: 'KYC', path: '/super-admin/kyc' },
    { label: 'Notifications', path: '/super-admin/notifications' },
    { label: 'Audit Logs', path: '/super-admin/audit-logs' },
    { label: 'Login History', path: '/super-admin/login-history' },
    { label: 'Finance', path: '/super-admin/finance' },
    { label: 'CRM', path: '/super-admin/crm' },
    { label: 'Attention', path: '/super-admin/attention' },
    { label: 'Workflow', path: '/super-admin/workflow' },
    { label: 'Support', path: '/super-admin/support' },
    { label: 'Announcements', path: '/super-admin/announcements' },
    { label: 'Activity', path: '/super-admin/activity' },
    { label: 'Search', path: '/super-admin/search' },
    { label: 'System', path: '/super-admin/system' },
    { label: 'Backup', path: '/super-admin/backup' },
    { label: 'Reports', path: '/super-admin/reports' },
    { label: 'Settings', path: '/super-admin/settings' },
  ],
  [ROLES.ADMIN]: [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Clients', path: '/admin/clients' },
    { label: 'Orders', path: '/admin/orders' },
    { label: 'Invoices', path: '/admin/invoices' },
    { label: 'KYC', path: '/admin/kyc' },
    { label: 'Tasks', path: '/admin/tasks' },
    { label: 'Support', path: '/admin/support' },
    { label: 'Work Queue', path: '/admin/queue' },
    { label: 'SLA Monitor', path: '/admin/sla' },
    { label: 'Search', path: '/admin/search' },
    { label: 'Notifications', path: '/admin/notifications' },
    { label: 'Profile', path: '/admin/profile' },
  ],
  [ROLES.CLIENT]: [
    { label: 'Dashboard', path: '/client/dashboard' },
    { label: 'Services', path: '/client/services' },
    { label: 'My Orders', path: '/client/orders' },
    { label: 'Payments', path: '/client/payments' },
    { label: 'Invoices', path: '/client/invoices' },
    { label: 'Documents', path: '/client/documents' },
    { label: 'Notifications', path: '/client/notifications' },
    { label: 'Support', path: '/client/support' },
    { label: 'Search', path: '/client/search' },
    { label: 'Downloads', path: '/client/downloads' },
    { label: 'Profile', path: '/client/profile' },
  ],
};
