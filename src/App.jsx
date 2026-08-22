import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
// Services
import ServicesIndex from './pages/services/ServicesIndex'
import ServiceDetailPage from './pages/services/ServiceDetailPage'
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
// Marketplace
import MarketIndex from './pages/market/MarketIndex'
import CategoryPage from './pages/market/CategoryPage'
import ProductPage from './pages/market/ProductPage'

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
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Home */}
          <Route path="/" element={<HomePage />} />
          {/* Services */}
          <Route path="/services" element={<ServicesIndex />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          {/* Solutions */}
          <Route path="/solutions" element={<SolutionsIndex />} />
          <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
          {/* Business Types */}
          <Route path="/business-types" element={<BusinessTypesIndex />} />
          <Route path="/business-types/:slug" element={<BusinessTypeDetailPage />} />
          {/* Company */}
          <Route path="/company/about" element={<AboutPage />} />
          <Route path="/company/careers" element={<CareersPage />} />
          <Route path="/company/contact" element={<ContactPage />} />
          <Route path="/company/why-launcherdesk" element={<WhyPage />} />
          {/* Resources */}
          <Route path="/resources" element={<ResourcesIndex />} />
          <Route path="/resources/blog" element={<BlogPage />} />
          <Route path="/resources/guides" element={<GuidesPage />} />
          <Route path="/resources/tools" element={<ToolsPage />} />
          <Route path="/resources/faq" element={<FaqPage />} />
          {/* Pricing & AI */}
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/ai" element={<AiPage />} />
          {/* Office Setup */}
          <Route path="/office-restore" element={<OfficeRestorePage />} />
          {/* Marketplace */}
          <Route path="/market" element={<MarketIndex />} />
          <Route path="/market/category" element={<CategoryPage />} />
          <Route path="/market/product" element={<ProductPage />} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}