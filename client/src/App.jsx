import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CustomizationProvider } from './context/CustomizationContext';
import { ToastProvider } from './context/ToastContext';

// Customer Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Customer Pages
import { HomePage } from './pages/customer/HomePage';
import { CategoryPage } from './pages/customer/CategoryPage';
import { ThemeDetailPage } from './pages/customer/ThemeDetailPage';
import { RequestPage } from './pages/customer/RequestPage';
import { ConfirmationPage } from './pages/customer/ConfirmationPage';
import { AboutContactPage } from './pages/customer/AboutContactPage';

// Admin Components & Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminRequestsPage } from './pages/admin/AdminRequestsPage';
import { AdminRequestDetailPage } from './pages/admin/AdminRequestDetailPage';
import { AdminCatalogPage } from './pages/admin/AdminCatalogPage';

// Customer Layout Wrapper
const CustomerLayout = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <main style={{ flexGrow: 1 }}>{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CustomizationProvider>
          <ToastProvider>
            <Routes>
              {/* Customer Public Routes */}
              <Route
                path="/"
                element={
                  <CustomerLayout>
                    <HomePage />
                  </CustomerLayout>
                }
              />
              <Route
                path="/category/:slug"
                element={
                  <CustomerLayout>
                    <CategoryPage />
                  </CustomerLayout>
                }
              />
              <Route
                path="/theme/:idOrSlug"
                element={
                  <CustomerLayout>
                    <ThemeDetailPage />
                  </CustomerLayout>
                }
              />
              <Route
                path="/request"
                element={
                  <CustomerLayout>
                    <RequestPage />
                  </CustomerLayout>
                }
              />
              <Route
                path="/request-confirmed/:id"
                element={
                  <CustomerLayout>
                    <ConfirmationPage />
                  </CustomerLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <CustomerLayout>
                    <AboutContactPage pageType="about" />
                  </CustomerLayout>
                }
              />
              <Route
                path="/contact"
                element={
                  <CustomerLayout>
                    <AboutContactPage pageType="contact" />
                  </CustomerLayout>
                }
              />

              {/* Admin Auth Route */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Admin Protected Routes */}
              <Route path="/admin" element={<AdminLayout title="Admin Control Center" />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="requests" element={<AdminRequestsPage />} />
                <Route path="requests/:id" element={<AdminRequestDetailPage />} />
                <Route path="catalog" element={<AdminCatalogPage />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ToastProvider>
        </CustomizationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
