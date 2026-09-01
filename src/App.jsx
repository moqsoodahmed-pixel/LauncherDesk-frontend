import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PartnerAuthProvider } from './context/PartnerAuthContext'
import { UserAuthProvider }    from './context/UserAuthContext'
import { SalesAuthProvider }   from './context/SalesAuthContext'
import PartnerLogin     from './pages/partner/PartnerLogin'
import PartnerDashboard from './pages/partner/PartnerDashboard'
import UserLoginPage    from './pages/user/UserLoginPage'
// Sales CRM
import SalesLogin     from './pages/sales/SalesLogin'
import SalesLayout    from './pages/sales/SalesLayout'
import SalesDashboard from './pages/sales/SalesDashboard'
import SalesLeads     from './pages/sales/SalesLeads'
import SalesContacts  from './pages/sales/SalesContacts'
import SalesQuotes    from './pages/sales/SalesQuotes'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
// Services
import ServicesIndex from './pages/services/ServicesIndex'
import ServiceDetailPage from './pages/services/ServiceDetailPage'
import DigitalMarketingPage from './pages/services/DigitalMarketingPage'
// Solutions
import SolutionsIndex from './pages/solutions/SolutionsIndex'
import SolutionDetailPage from './pages/solutions/SolutionDetailPage'
// Business Types
import BusinessTypesIndex from './pages/business-types/BusinessTypesIndex'
import BusinessTypeDetailPage from './pages/business-types/BusinessTypeDetailPage'
// Company
import AboutPage from './pages/company/AboutPage'
import CareersPage from './pages/company/CareersPage'
import ContactPage from './pages/company/ContactPage'
import WhyPage from './pages/company/WhyPage'
// Resources
import ResourcesIndex from './pages/resources/ResourcesIndex'
import BlogPage from './pages/resources/BlogPage'
import GuidesPage from './pages/resources/GuidesPage'
import ToolsPage from './pages/resources/ToolsPage'
import FaqPage from './pages/resources/FaqPage'
// Pricing & AI
import PricingPage from './pages/pricing/PricingPage'
import AiPage from './pages/ai/AiPage'
// Office Restore
import OfficeRestorePage from './pages/office-restore/OfficeRestorePage'
import IndividualOfficePage from './pages/office-restore/IndividualOfficePage'
import CoworkingOfficePage from './pages/office-restore/CoworkingOfficePage'
import EStampPage from './pages/estamp/EStampPage'
// Legal
import TermsPage from './pages/legal/TermsPage'
import PrivacyPage from './pages/legal/PrivacyPage'
import RefundPage from './pages/legal/RefundPage'
import DisclaimerPage from './pages/legal/DisclaimerPage'
import VirtualOfficePage from './pages/virtual-office/VirtualOfficePage'
import PartnerRegister from './pages/partner/PartnerRegister'
// Marketplace
import MarketIndex from './pages/market/MarketIndex'
import CategoryPage from './pages/market/CategoryPage'
import ProductPage from './pages/market/ProductPage'
// Admin
import { AdminAuthProvider } from './context/AdminAuthContext'
import AdminLogin        from './pages/admin/AdminLogin'
import AdminLayout       from './pages/admin/AdminLayout'
import AdminDashboard    from './pages/admin/pages/AdminDashboard'
import AdminContacts     from './pages/admin/pages/AdminContacts'
import AdminLeads        from './pages/admin/pages/AdminLeads'
import AdminQuotes       from './pages/admin/pages/AdminQuotes'
import AdminApplications from './pages/admin/pages/AdminApplications'
import AdminOffice       from './pages/admin/pages/AdminOffice'
import AdminSettings     from './pages/admin/pages/AdminSettings'
import AdminPartners     from './pages/admin/pages/AdminPartners'

function NotFound() {
  return (
    <div className="wrap" style={{ padding: '80px 0', textAlign: 'center' }}>
      <h1>Page not found</h1>
      <p className="mut" style={{ marginTop: 12 }}>The page you're looking for doesn't exist.</p>
      <a href="/" className="btn btn-primary" style={{ marginTop: 28, display: 'inline-flex' }}>Go home</a>
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

          {/* ── Partner portal ── */}
          <Route path="/partner/login"     element={<PartnerLogin />} />
          <Route path="/partner/dashboard" element={<PartnerDashboard />} />

          {/* ── Admin panel at /admin ── */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard"    element={<AdminDashboard />} />
            <Route path="contacts"     element={<AdminContacts />} />
            <Route path="leads"        element={<AdminLeads />} />
            <Route path="quotes"       element={<AdminQuotes />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="office"       element={<AdminOffice />} />
            <Route path="settings"     element={<AdminSettings />} />
            <Route path="partners"     element={<AdminPartners />} />
            {/* redirect /admin/anything-else → dashboard */}
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
          <Route path="/user/login" element={<UserLoginPage />} />

          {/* ── Sales CRM at /sales ── */}
          <Route path="/sales" element={<SalesLogin />} />
          <Route path="/sales" element={<SalesLayout />}>
            <Route path="dashboard" element={<SalesDashboard />} />
            <Route path="leads"     element={<SalesLeads />} />
            <Route path="contacts"  element={<SalesContacts />} />
            <Route path="quotes"    element={<SalesQuotes />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </PartnerAuthProvider>
    </SalesAuthProvider>
    </UserAuthProvider>
    </AdminAuthProvider>
  )
}