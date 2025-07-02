import { useState, useEffect, Suspense, lazy } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  persistQueryClient,
} from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import AdminDashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/Login';
import NotFound from './pages/NotFound';

import CookieBanner from '@/components/CookieBanner';
import Loader from '@/components/Loader';

// Lazy-loaded routes
const Index = lazy(() => import('./pages/Index'));
const Enlightenment = lazy(() => import('./pages/Enlightenment'));
const Enhealthment = lazy(() => import('./pages/Enhealthment'));
const Empowerment = lazy(() => import('./pages/Empowerment'));
const Donate = lazy(() => import('./pages/Donate'));
const About = lazy(() => import('@/pages/about'));
const Blogs = lazy(() => import('@/pages/blogs'));
const Media = lazy(() => import('@/pages/media'));
const Events = lazy(() => import('@/pages/events'));
const GetInvolved = lazy(() => import('@/pages/getinvolved'));
const Contact = lazy(() => import('@/pages/contact'));
const PrivacyPolicy = lazy(() => import('@/pages/privacy-policy'));
const RefundPolicy = lazy(() => import('@/pages/refund-policy'));
const CookiePolicy = lazy(() => import('@/pages/cookie-policy'));
const TermsAndConditions = lazy(() => import('@/pages/terms-and-conditions'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const Login = lazy(() => import('./pages/admin/Login'));

// React Query Setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      // cacheTime: 1000 * 60 * 60,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
});

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [
        '/assets/images/Logo.png',
        '/assets/images/hero-banner.jpeg',
      ];

      const load = (src: string) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });

      await Promise.all(imageUrls.map(load));

      // Ensure loader is visible for at least 3 seconds
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    preloadImages();
  }, []);

  if (loading) return <Loader />;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <CookieBanner />
          <BrowserRouter>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Index />} />
                  <Route path="enlightenment" element={<Enlightenment />} />
                  <Route path="enhealthment" element={<Enhealthment />} />
                  <Route path="empowerment" element={<Empowerment />} />
                  <Route path="donate" element={<Donate />} />
                  <Route path="About" element={<About />} />
                  <Route path="Blogs" element={<Blogs />} />
                  <Route path="Events" element={<Events />} />
                  <Route path="Media" element={<Media />} />
                  <Route path="GetInvolved" element={<GetInvolved />} />
                  <Route path="Contact" element={<Contact />} />
                  <Route path="Login" element={<Login />} />
                  <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
                  <Route path="RefundPolicy" element={<RefundPolicy />} />
                  <Route path="CookiePolicy" element={<CookiePolicy />} />
                  <Route path="TermsAndConditions" element={<TermsAndConditions />} />
                  <Route path="FAQ" element={<FAQ />} />
                </Route>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                </Route>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
