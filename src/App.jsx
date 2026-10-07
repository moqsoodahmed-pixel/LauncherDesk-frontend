import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { PortalAuthProvider } from './context/PortalAuthContext'
import { PortalRoute as RoleRoute, WorkspaceStyleSync } from './routes/guards'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { UserAuthProvider } from './context/UserAuthContext'
import { SalesAuthProvider } from './context/SalesAuthContext'
import { PartnerAuthProvider } from './context/PartnerAuthContext'
import { ROLES } from './constants/portal/roles'

// Portal — layout
import DashboardLayout from './layouts/portal/DashboardLayout'
// Portal — shared
import UnauthorizedPage from './pages/portal/UnauthorizedPage'
import PortalNotFoundPage from './pages/portal/NotFoundPage'
import PortalResetPasswordPage from './pages/portal/auth/ResetPasswordPage'
import PortalForgotPasswordPage from './pages/portal/auth/ForgotPasswordPage'
// Portal — Super Admin pages
import SuperAdminDashboardPage from './pages/portal/super-admin/SuperAdminDashboardPage'
import AdminsListPage from './pages/portal/super-admin/AdminsListPage'
import AdminDetailPage from './pages/portal/super-admin/AdminDetailPage'
import SaClientsListPage from './pages/portal/super-admin/ClientsListPage'
import SaClientDetailPage from './pages/portal/super-admin/ClientDetailPage'
import ServicesListPage from './pages/portal/super-admin/ServicesListPage'
import SaServiceDetailPage from './pages/portal/super-admin/ServiceDetailPage'
import SaOrdersListPage from './pages/portal/super-admin/OrdersListPage'
import SaOrderCreatePage from './pages/portal/super-admin/OrderCreatePage'
import SaOrderDetailPage from './pages/portal/super-admin/OrderDetailPage'
import PaymentsListPage from './pages/portal/super-admin/PaymentsListPage'
import InvoicePage from './pages/portal/super-admin/InvoicePage'
import SaKycListPage from './pages/portal/super-admin/KycListPage'
import SaNotificationsPage from './pages/portal/super-admin/NotificationsPage'
import AuditLogsPage from './pages/portal/super-admin/AuditLogsPage'
import LoginHistoryPage from './pages/portal/super-admin/LoginHistoryPage'
import ReportsPage from './pages/portal/super-admin/ReportsPage'
import SettingsPage from './pages/portal/super-admin/SettingsPage'
import WorkflowDashboardPage from './pages/portal/super-admin/WorkflowDashboardPage'
import SupportTicketsPage from './pages/portal/super-admin/SupportTicketsPage'
import SearchPage from './pages/portal/super-admin/SearchPage'
import SystemMonitorPage from './pages/portal/super-admin/SystemMonitorPage'
import FinanceDashboardPage from './pages/portal/super-admin/FinanceDashboardPage'
import PaymentDetailPage from './pages/portal/super-admin/PaymentDetailPage'
import CrmIntelligencePage from './pages/portal/super-admin/CrmIntelligencePage'
import RequiresAttentionPage from './pages/portal/super-admin/RequiresAttentionPage'
import AnnouncementsPage from './pages/portal/super-admin/AnnouncementsPage'
import ActivityTimelinePage from './pages/portal/super-admin/ActivityTimelinePage'
import BackupPage from './pages/portal/super-admin/BackupPage'
// Portal — Admin pages
import AdminDashboardPage from './pages/portal/admin/AdminDashboardPage'
import AdClientsListPage from './pages/portal/admin/ClientsListPage'
import AdClientDetailPage from './pages/portal/admin/ClientDetailPage'
import AdOrdersListPage from './pages/portal/admin/OrdersListPage'
import AdOrderDetailPage from './pages/portal/admin/OrderDetailPage'
import AdOrderCreatePage from './pages/portal/admin/OrderCreatePage'
import AdKycListPage from './pages/portal/admin/KycListPage'
import AdNotificationsPage from './pages/portal/admin/NotificationsPage'
import AdProfilePage from './pages/portal/admin/ProfilePage'
import AdTasksPage from './pages/portal/admin/TasksPage'
import AdSupportPage from './pages/portal/admin/SupportPage'
import AdWorkQueuePage from './pages/portal/admin/WorkQueuePage'
import AdSlaMonitorPage from './pages/portal/admin/SlaMonitorPage'
import AdSearchPage from './pages/portal/admin/AdminSearchPage'
// Portal — Client pages
import ClientDashboardPage from './pages/portal/client/ClientDashboardPage'
import ClProfilePage from './pages/portal/client/ProfilePage'
import ClOrdersListPage from './pages/portal/client/OrdersListPage'
import ClOrderDetailPage from './pages/portal/client/OrderDetailPage'
import ClOrderCreatePage from './pages/portal/client/OrderCreatePage'
import ClServicesListPage from './pages/portal/client/ServicesListPage'
import ClServiceDetailPage from './pages/portal/client/ServiceDetailPage'
import ClDocumentsPage from './pages/portal/client/DocumentsPage'
import ClNotificationsPage from './pages/portal/client/NotificationsPage'
import ClSupportPage from './pages/portal/client/SupportPage'
import ClDownloadsPage from './pages/portal/client/DownloadsPage'
import ClPaymentsPage from './pages/portal/client/PaymentsPage'
import ClSearchPage from './pages/portal/client/ClientSearchPage'
import ClInvoicesPage from './pages/portal/client/InvoicesPage'

// Existing app imports
import PartnerDashboard from './pages/partner/PartnerDashboard'
import UserLoginPage from './pages/user/UserLoginPage'
import DashboardRedirect from './routes/DashboardRedirect'
import ResetPasswordPage from './pages/user/ResetPasswordPage'
import UserLayout from './pages/user/UserLayout'
import UserDashboard from './pages/user/UserDashboard'
import UserServices from './pages/user/UserServices'
import UserServiceDetail from './pages/user/UserServiceDetail'
import UserPayments from './pages/user/UserPayments'
import UserInvoices from './pages/user/UserInvoices'
import UserSupport from './pages/user/UserSupport'
import UserProfile from './pages/user/UserProfile'
import SalesLayout from './pages/sales/SalesLayout'
import SalesDashboard from './pages/sales/SalesDashboard'
import SalesEnquiries from './pages/sales/SalesEnquiries'
import SalesLeads from './pages/sales/SalesLeads'
import SalesContacts from './pages/sales/SalesContacts'
import SalesQuotes from './pages/sales/SalesQuotes'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ServicesIndex from './pages/services/ServicesIndex'
import ServiceDetailPage from './pages/services/ServiceDetailPage'
import DigitalMarketingPage from './pages/services/DigitalMarketingPage'
import SolutionsIndex from './pages/solutions/SolutionsIndex'
import SolutionDetailPage from './pages/solutions/SolutionDetailPage'
import BusinessTypesIndex from './pages/business-types/BusinessTypesIndex'
import BusinessTypeDetailPage from './pages/business-types/BusinessTypeDetailPage'
import AboutPage from './pages/company/AboutPage'
import CareersPage from './pages/company/CareersPage'
import ContactPage from './pages/company/ContactPage'
import WhyPage from './pages/company/WhyPage'
import ResourcesIndex from './pages/resources/ResourcesIndex'
import BlogPage from './pages/resources/BlogPage'
import GuidesPage from './pages/resources/GuidesPage'
import ToolsPage from './pages/resources/ToolsPage'
import FaqPage from './pages/resources/FaqPage'
import PricingPage from './pages/pricing/PricingPage'
import AiPage from './pages/ai/AiPage'
import OfficeRestorePage from './pages/office-restore/OfficeRestorePage'
import IndividualOfficePage from './pages/office-restore/IndividualOfficePage'
import CoworkingOfficePage from './pages/office-restore/CoworkingOfficePage'
import EStampPage from './pages/estamp/EStampPage'
import EStampStatePage from './pages/estamp/EStampStatePage'
import TermsPage from './pages/legal/TermsPage'
import PrivacyPage from './pages/legal/PrivacyPage'
import RefundPage from './pages/legal/RefundPage'
import DisclaimerPage from './pages/legal/DisclaimerPage'
import VirtualOfficePage from './pages/virtual-office/VirtualOfficePage'
import PartnerRegister from './pages/partner/PartnerRegister'
import SalesQuotationRedirect from './pages/SalesQuotationRedirect'
import MarketIndex from './pages/market/MarketIndex'
import CategoryPage from './pages/market/CategoryPage'
import ProductPage from './pages/market/ProductPage'
// Legacy internal admin (website operations panel)
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/pages/AdminDashboard'
import AdminOrders from './pages/admin/pages/AdminOrders'
import AdminNotifications from './pages/admin/pages/AdminNotifications'
import AdminTickets from './pages/admin/pages/AdminTickets'
import AdminContacts from './pages/admin/pages/AdminContacts'
import AdminLeads from './pages/admin/pages/AdminLeads'
import AdminQuotes from './pages/admin/pages/AdminQuotes'
import AdminApplications from './pages/admin/pages/AdminApplications'
import AdminOffice from './pages/admin/pages/AdminOffice'
import AdminSettings from './pages/admin/pages/AdminSettings'
import AdminPartners from './pages/admin/pages/AdminPartners'
import AdminChats from './pages/admin/pages/AdminChats'

function NotFound() {
  return (
    <div className="wrap" style={{ padding: '80px 0', textAlign: 'center' }}>
      <h1>Page not found</h1>
      <p className="mut" style={{ marginTop: 12 }}>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 28, display: 'inline-flex' }}>Go home</Link>
    </div>
  )
}

export default function App() {
  return (
    <PortalAuthProvider>
      <AdminAuthProvider>
        <UserAuthProvider>
          <SalesAuthProvider>
            <PartnerAuthProvider>
              <BrowserRouter>
                <WorkspaceStyleSync />
                <Routes>
                  {/* ── Public website ── */}
                  <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<ServicesIndex />} />
                    <Route path="/services/:slug" element={<ServiceDetailPage />} />
                    <Route path="/digital-marketing" element={<DigitalMarketingPage />} />
                    <Route path="/solutions" element={<SolutionsIndex />} />
                    <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
                    <Route path="/business-types" element={<BusinessTypesIndex />} />
                    <Route path="/business-types/:slug" element={<BusinessTypeDetailPage />} />
                    <Route path="/company/about" element={<AboutPage />} />
                    <Route path="/careers" element={<CareersPage />} />
                    <Route path="/company/careers" element={<Navigate to="/careers" replace />} />
                    <Route path="/company/contact" element={<ContactPage />} />
                    <Route path="/company/why-launcherdesk" element={<WhyPage />} />
                    <Route path="/resources" element={<ResourcesIndex />} />
                    <Route path="/resources/blog" element={<BlogPage />} />
                    <Route path="/resources/guides" element={<GuidesPage />} />
                    <Route path="/resources/tools" element={<ToolsPage />} />
                    <Route path="/resources/faq" element={<FaqPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/ai" element={<AiPage />} />
                    <Route path="/office-restore" element={<OfficeRestorePage />} />
                    <Route path="/office-restore/individual" element={<IndividualOfficePage />} />
                    <Route path="/office-restore/coworking" element={<CoworkingOfficePage />} />
                    <Route path="/estamp" element={<EStampPage />} />
                    <Route path="/estamp/:state" element={<EStampStatePage />} />
                    <Route path="/virtual-office" element={<VirtualOfficePage />} />
                    <Route path="/partner-register" element={<PartnerRegister />} />
                    <Route path="/legal/terms" element={<TermsPage />} />
                    <Route path="/legal/privacy" element={<PrivacyPage />} />
                    <Route path="/legal/refund" element={<RefundPage />} />
                    <Route path="/legal/disclaimer" element={<DisclaimerPage />} />
                    <Route path="/market" element={<MarketIndex />} />
                    <Route path="/market/category" element={<CategoryPage />} />
                    <Route path="/market/product" element={<ProductPage />} />
                    <Route path="/salesQuotation" element={<SalesQuotationRedirect />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  {/* ── THE login (every role). Old per-role login URLs point here. ── */}
                  <Route path="/user/login" element={<UserLoginPage />} />
                  <Route path="/login" element={<Navigate to="/user/login" replace />} />
                  <Route path="/admin/login" element={<Navigate to="/user/login" replace />} />
                  <Route path="/super-admin/login" element={<Navigate to="/user/login" replace />} />
                  <Route path="/partner/login" element={<Navigate to="/user/login" replace />} />
                  <Route path="/user/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/dashboard" element={<DashboardRedirect />} />

                  {/* ── Client dashboard (redirects legacy /user routes straight to Portal Client) ── */}
                  <Route path="/user/dashboard" element={<Navigate to="/client/dashboard" replace />} />
                  <Route path="/user/services" element={<Navigate to="/client/services" replace />} />
                  <Route path="/user/payments" element={<Navigate to="/client/payments" replace />} />
                  <Route path="/user/invoices" element={<Navigate to="/client/invoices" replace />} />
                  <Route path="/user/support" element={<Navigate to="/client/support" replace />} />
                  <Route path="/user/profile" element={<Navigate to="/client/profile" replace />} />
                  <Route path="/user/*" element={<Navigate to="/client/dashboard" replace />} />
                  <Route path="/user" element={<Navigate to="/client/dashboard" replace />} />

                  {/* ── Partner portal ── */}
                  <Route path="/partner/dashboard" element={<PartnerDashboard />} />

                  {/* ── Legacy internal admin panel redirects straight to Portal Admin ── */}
                  <Route path="/internal-admin/*" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/internal-admin" element={<Navigate to="/admin/dashboard" replace />} />

                  {/* ── Sales CRM ── */}
                  <Route path="/sales" element={<SalesLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<SalesDashboard />} />
                    <Route path="enquiries" element={<SalesEnquiries />} />
                    <Route path="leads" element={<SalesLeads />} />
                    <Route path="contacts" element={<SalesContacts />} />
                    <Route path="quotes" element={<SalesQuotes />} />
                  </Route>

                  {/* ── Portal: Super Admin ── */}
                  <Route
                    path="/super-admin"
                    element={<RoleRoute allow={[ROLES.SUPER_ADMIN]}><DashboardLayout /></RoleRoute>}
                  >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<SuperAdminDashboardPage />} />
                    <Route path="admins" element={<AdminsListPage />} />
                    <Route path="admins/:id" element={<AdminDetailPage />} />
                    <Route path="clients" element={<SaClientsListPage />} />
                    <Route path="clients/:id" element={<SaClientDetailPage />} />
                    <Route path="services" element={<ServicesListPage />} />
                    <Route path="services/:id" element={<SaServiceDetailPage />} />
                    <Route path="orders" element={<SaOrdersListPage />} />
                    <Route path="orders/create" element={<SaOrderCreatePage />} />
                    <Route path="orders/:id" element={<SaOrderDetailPage />} />
                    <Route path="orders/:id/invoice" element={<InvoicePage />} />
                    <Route path="payments" element={<PaymentsListPage />} />
                    <Route path="payments/:id" element={<PaymentDetailPage />} />
                    <Route path="kyc" element={<SaKycListPage />} />
                    <Route path="notifications" element={<SaNotificationsPage />} />
                    <Route path="audit-logs" element={<AuditLogsPage />} />
                    <Route path="login-history" element={<LoginHistoryPage />} />
                    <Route path="reports" element={<ReportsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="workflow" element={<WorkflowDashboardPage />} />
                    <Route path="support" element={<SupportTicketsPage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="system" element={<SystemMonitorPage />} />
                    <Route path="finance" element={<FinanceDashboardPage />} />
                    <Route path="crm" element={<CrmIntelligencePage />} />
                    <Route path="attention" element={<RequiresAttentionPage />} />
                    <Route path="announcements" element={<AnnouncementsPage />} />
                    <Route path="activity" element={<ActivityTimelinePage />} />
                    <Route path="backup" element={<BackupPage />} />
                  </Route>

                  {/* ── Portal: Admin ── */}
                  <Route
                    path="/admin"
                    element={<RoleRoute allow={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}><DashboardLayout /></RoleRoute>}
                  >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboardPage />} />
                    <Route path="clients" element={<AdClientsListPage />} />
                    <Route path="clients/:id" element={<AdClientDetailPage />} />
                    <Route path="orders" element={<AdOrdersListPage />} />
                    <Route path="orders/create" element={<AdOrderCreatePage />} />
                    <Route path="orders/:id" element={<AdOrderDetailPage />} />
                    <Route path="orders/:id/invoice" element={<InvoicePage />} />
                    <Route path="kyc" element={<AdKycListPage />} />
                    <Route path="tasks" element={<AdTasksPage />} />
                    <Route path="support" element={<AdSupportPage />} />
                    <Route path="queue" element={<AdWorkQueuePage />} />
                    <Route path="sla" element={<AdSlaMonitorPage />} />
                    <Route path="search" element={<AdSearchPage />} />
                    <Route path="notifications" element={<AdNotificationsPage />} />
                    <Route path="profile" element={<AdProfilePage />} />
                  </Route>

                  {/* ── Portal: Client ── */}
                  <Route
                    path="/client"
                    element={<RoleRoute allow={[ROLES.CLIENT]}><DashboardLayout /></RoleRoute>}
                  >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<ClientDashboardPage />} />
                    <Route path="profile" element={<ClProfilePage />} />
                    <Route path="services" element={<ClServicesListPage />} />
                    <Route path="services/:id" element={<ClServiceDetailPage />} />
                    <Route path="orders" element={<ClOrdersListPage />} />
                    <Route path="orders/create" element={<ClOrderCreatePage />} />
                    <Route path="orders/create/:serviceId" element={<ClOrderCreatePage />} />
                    <Route path="orders/:id" element={<ClOrderDetailPage />} />
                    <Route path="orders/:id/invoice" element={<InvoicePage />} />
                    <Route path="invoices" element={<ClInvoicesPage />} />
                    <Route path="documents" element={<ClDocumentsPage />} />
                    <Route path="notifications" element={<ClNotificationsPage />} />
                    <Route path="support" element={<ClSupportPage />} />
                    <Route path="payments" element={<ClPaymentsPage />} />
                    <Route path="search" element={<ClSearchPage />} />
                    <Route path="downloads" element={<ClDownloadsPage />} />
                  </Route>

                  {/* ── Portal legacy redirects (old /portal/* bookmarks) ── */}
                  <Route path="/portal/super-admin/*" element={<Navigate to="/super-admin/dashboard" replace />} />
                  <Route path="/portal/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/portal/client/*" element={<Navigate to="/client/dashboard" replace />} />
                  <Route path="/portal/login" element={<Navigate to="/user/login" replace />} />
                  <Route path="/portal/*" element={<Navigate to="/user/login" replace />} />

                  {/* ── Portal standalone pages (original Portal UI) ── */}
                  <Route path="/unauthorized" element={<UnauthorizedPage />} />
                  <Route path="/reset-password" element={<PortalResetPasswordPage />} />   {/* link in Portal reset emails */}
                  <Route path="/forgot-password" element={<PortalForgotPasswordPage />} />
                  {/* Unknown Portal URLs get the Portal's own 404, as in the original app */}
                  <Route path="/super-admin/*" element={<PortalNotFoundPage />} />
                  <Route path="/admin/*" element={<PortalNotFoundPage />} />
                  <Route path="/client/*" element={<PortalNotFoundPage />} />
                </Routes>
              </BrowserRouter>
            </PartnerAuthProvider>
          </SalesAuthProvider>
        </UserAuthProvider>
      </AdminAuthProvider>
    </PortalAuthProvider>
  )
}
