import { Navigate } from 'react-router-dom';
import { usePortalAuth } from '../context/PortalAuthContext';
import { useUserAuth } from '../context/UserAuthContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useSalesAuth } from '../context/SalesAuthContext';
import { usePartnerAuth } from '../context/PartnerAuthContext';

/**
 * Universal /dashboard resolver: takes any authenticated user directly to their
 * role's dedicated workspace without manual navigation or guesswork:
 *   • Portal Super Admin → /super-admin/dashboard
 *   • Portal Admin       → /admin/dashboard
 *   • Portal Client      → /client/dashboard
 *   • Internal Admin     → /internal-admin/dashboard
 *   • Sales Rep          → /sales/dashboard
 *   • Partner            → /partner/dashboard
 *   • Customer/User      → /user/dashboard
 *   • Unauthenticated    → /user/login
 */
export default function DashboardRedirect() {
  const { user: portalUser, isLoading: portalLoading } = usePortalAuth();
  const { isLoggedIn: isUserLoggedIn } = useUserAuth();
  const adminAuth = useAdminAuth();
  const salesAuth = useSalesAuth();
  const partnerAuth = usePartnerAuth();

  if (portalLoading) return null;

  if (portalUser) {
    if (portalUser.role === 'SUPER_ADMIN') return <Navigate to="/super-admin/dashboard" replace />;
    if (portalUser.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
    if (portalUser.role === 'CLIENT') return <Navigate to="/client/dashboard" replace />;
  }

  if (adminAuth?.isLoggedIn) return <Navigate to="/internal-admin/dashboard" replace />;
  if (salesAuth?.isLoggedIn) return <Navigate to="/sales/dashboard" replace />;
  if (partnerAuth?.isLoggedIn) return <Navigate to="/partner/dashboard" replace />;
  if (isUserLoggedIn) return <Navigate to="/user/dashboard" replace />;

  return <Navigate to="/user/login" replace />;
}
