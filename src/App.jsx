import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { PartnerAuthProvider } from './context/PartnerAuthContext'
import { UserAuthProvider } from './context/UserAuthContext'
import { SalesAuthProvider } from './context/SalesAuthContext'
import PartnerLogin from './pages/partner/PartnerLogin'
import PartnerDashboard from './pages/partner/PartnerDashboard'
import UserLoginPage from './pages/user/UserLoginPage'
import ResetPasswordPage from './pages/user/ResetPasswordPage'
// Customer dashboard
import UserLayout from './pages/user/UserLayout'
import UserDashboard from './pages/user/UserDashboard'
import UserServices from './pages/user/UserServices'
import UserServiceDetail from './pages/user/UserServiceDetail'
import UserPayments from './pages/user/UserPayments'
import UserProfile from './pages/user/UserProfile'
// Sales CRM
import SalesLogin from './pages/sales/SalesLogin'
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
import TermsPage from './pages/legal/TermsPage'
import PrivacyPage from './pages/legal/PrivacyPage'
import RefundPage from './pages/legal/RefundPage'
import DisclaimerPage from './pages/legal/DisclaimerPage'
import VirtualOfficePage from './pages/virtual-office/VirtualOfficePage'
import PartnerRegister from './pages/partner/PartnerRegister'
import MarketIndex from './pages/market/MarketIndex'
import CategoryPage from './pages/market/CategoryPage'
import ProductPage from './pages/market/ProductPage'
import { AdminAuthProvider } from './context/AdminAuthContext'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/pages/AdminDashboard'
import AdminContacts from './pages/admin/pages/AdminContacts'
import AdminLeads from './pages/admin/pages/AdminLeads'
import AdminQuotes from './pages/admin/pages/AdminQuotes'
import AdminApplications from './pages/admin/pages/AdminApplications'
import AdminOffice from './pages/admin/pages/AdminOffice'
import AdminSettings from './pages/admin/pages/AdminSettings'
import AdminPartners from './pages/admin/pages/AdminPartners'

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
    <AdminAuthProvider>
      <UserAuthProvider>
        <SalesAuthProvider>
          <PartnerAuthProvider>
            <BrowserRouter>
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
                  <Route path="/virtual-office" element={<VirtualOfficePage />} />
                  <Route path="/partner-register" element={<PartnerRegister />} />
                  <Route path="/legal/terms" element={<TermsPage />} />
                  <Route path="/legal/privacy" element={<PrivacyPage />} />
                  <Route path="/legal/refund" element={<RefundPage />} />
                  <Route path="/legal/disclaimer" element={<DisclaimerPage />} />
                  <Route path="/market" element={<MarketIndex />} />
                  <Route path="/market/category" element={<CategoryPage />} />
                  <Route path="/market/product" element={<ProductPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* ── User auth ── */}
                <Route path="/user/login" element={<UserLoginPage />} />
                <Route path="/user/reset-password" element={<ResetPasswordPage />} />

                {/* ── Customer dashboard ── */}
                <Route path="/user" element={<UserLayout />}>
                  <Route index element={<Navigate to="/user/dashboard" replace />} />
                  <Route path="dashboard" element={<UserDashboard />} />
                  <Route path="services" element={<UserServices />} />
                  <Route path="services/:id" element={<UserServiceDetail />} />
                  <Route path="payments" element={<UserPayments />} />
                  <Route path="profile" element={<UserProfile />} />
                  <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
                </Route>

                {/* ── Partner portal ── */}
                <Route path="/partner/login" element={<PartnerLogin />} />
                <Route path="/partner/dashboard" element={<PartnerDashboard />} />

                {/* ── Admin panel ── */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="contacts" element={<AdminContacts />} />
                  <Route path="leads" element={<AdminLeads />} />
                  <Route path="quotes" element={<AdminQuotes />} />
                  <Route path="applications" element={<AdminApplications />} />
                  <Route path="office" element={<AdminOffice />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="partners" element={<AdminPartners />} />
                  <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                </Route>

                {/* ── Sales CRM ── */}
                <Route path="/sales" element={<SalesLogin />} />
                <Route path="/sales" element={<SalesLayout />}>
                  <Route path="dashboard" element={<SalesDashboard />} />
                  <Route path="enquiries" element={<SalesEnquiries />} />
                  <Route path="leads" element={<SalesLeads />} />
                  <Route path="contacts" element={<SalesContacts />} />
                  <Route path="quotes" element={<SalesQuotes />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </PartnerAuthProvider>
        </SalesAuthProvider>
      </UserAuthProvider>
    </AdminAuthProvider>
  )
}