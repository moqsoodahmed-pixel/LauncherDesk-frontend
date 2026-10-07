import { PERMISSIONS } from './permissions';

/**
 * Groups permissions for the Permission Matrix UI. Purely a presentation
 * concern - the backend (backend/src/validators/admins.validators.js)
 * remains the authority on which permission strings actually exist.
 */
export const PERMISSION_GROUPS = [
  {
    label: 'Clients',
    permissions: [
      PERMISSIONS.VIEW_CLIENT,
      PERMISSIONS.CREATE_CLIENT,
      PERMISSIONS.EDIT_CLIENT,
      PERMISSIONS.DELETE_CLIENT,
      PERMISSIONS.ASSIGN_CLIENT,
      PERMISSIONS.REASSIGN_CLIENT,
    ],
  },
  {
    label: 'Orders',
    permissions: [
      PERMISSIONS.VIEW_ORDER,
      PERMISSIONS.CREATE_ORDER,
      PERMISSIONS.EDIT_ORDER,
      PERMISSIONS.ASSIGN_ORDER,
      PERMISSIONS.REASSIGN_ORDER,
      PERMISSIONS.UPDATE_ORDER_STATUS,
      PERMISSIONS.CLOSE_ORDER,
      PERMISSIONS.CANCEL_ORDER,
    ],
  },
  {
    label: 'KYC',
    permissions: [PERMISSIONS.VIEW_KYC, PERMISSIONS.VERIFY_KYC, PERMISSIONS.REJECT_KYC, PERMISSIONS.DOWNLOAD_KYC, PERMISSIONS.DELETE_KYC],
  },
  {
    label: 'Payments',
    permissions: [PERMISSIONS.VIEW_PAYMENT, PERMISSIONS.VIEW_PAYMENT_DETAILS, PERMISSIONS.REFUND_PAYMENT],
  },
  {
    label: 'Services',
    permissions: [PERMISSIONS.VIEW_SERVICE, PERMISSIONS.CREATE_SERVICE, PERMISSIONS.EDIT_SERVICE, PERMISSIONS.DELETE_SERVICE],
  },
  {
    label: 'Administration',
    permissions: [
      PERMISSIONS.VIEW_ADMINS,
      PERMISSIONS.CREATE_ADMIN,
      PERMISSIONS.EDIT_ADMIN,
      PERMISSIONS.DISABLE_ADMIN,
      PERMISSIONS.MANAGE_ADMIN_PERMISSIONS,
      PERMISSIONS.ASSIGN_ADMIN_CLIENTS,
    ],
  },
  {
    label: 'Reports',
    permissions: [PERMISSIONS.VIEW_REPORTS, PERMISSIONS.EXPORT_REPORTS],
  },
  {
    label: 'Audit',
    permissions: [PERMISSIONS.VIEW_AUDIT_LOGS],
  },
  {
    label: 'Settings',
    permissions: [PERMISSIONS.VIEW_SETTINGS, PERMISSIONS.MANAGE_SETTINGS],
  },
  {
    label: 'Notifications',
    permissions: [PERMISSIONS.VIEW_NOTIFICATIONS],
  },
];
