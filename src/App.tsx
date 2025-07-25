import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from './context/AuthContext';

import CookieBanner from '@/components/CookieBanner';
import Loader from '@/components/Loader';

import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';

import AdminDashboard from '@/pages/admin/Dashboard';
import AdminLogin from '@/pages/admin/Login';
import NotFound from '@/pages/NotFound';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  persistQueryClient,
} from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

import POSHPolicy from './pages/Posh-Policy';
import CancellationPolicy from './pages/CancellationPolicy ';

// Lazy-loaded pages
const Index = lazy(() => import('./pages/Index'));
const Enlightenment = lazy(() => import('./pages/Enlightenment'));
const Enhealthment = lazy(() => import('./pages/Enhealthment'));
const Empowerment = lazy(() => import('./pages/Empowerment'));
const Donate = lazy(() => import('./pages/Donate'));
const About = lazy(() => import('@/pages/about'));
const Blogs = lazy(() => import('@/pages/media/blogs'));
const Media = lazy(() => import('@/pages/media'));
const Events = lazy(() => import('@/pages/events'));
const Project = lazy(() => import('@/pages/Project'));
const GetInvolved = lazy(() => import('@/pages/getinvolved'));
const Contact = lazy(() => import('@/pages/contact'));
const PrivacyPolicy = lazy(() => import('@/pages/privacy-policy'));
const RefundPolicy = lazy(() => import('@/pages/refund-policy'));
const CookiePolicy = lazy(() => import('@/pages/cookie-policy'));
const PartnershipPolicy = lazy(() => import('@/pages/Partnership-Policy'));
const TermsAndConditions = lazy(() => import('@/pages/terms-and-conditions'));
const FAQ = lazy(() => import('@/pages/FAQ'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
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
    const preloadImages = () => {
      const consent = localStorage.getItem('cookie_consent');
      const cached = localStorage.getItem('cached_images');

      if (consent === 'accepted' && cached) {
        const urls = JSON.parse(cached);
        urls.forEach((src: string) => {
          const img = new Image();
          img.src = src;
        });
      }
    };

    preloadImages();
    setLoading(false); // remove artificial loader delay
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
                {/* Public Site */}
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
                  <Route path="Project" element={<Project />} />
                  <Route path="Contact" element={<Contact />} />
                  <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
                  <Route path="RefundPolicy" element={<RefundPolicy />} />
                  <Route path="CookiePolicy" element={<CookiePolicy />} />
                  <Route path="POSHPolicy" element={<POSHPolicy />} />
                  <Route path="CancellationPolicy" element={<CancellationPolicy />} />
                  <Route path="TermsAndConditions" element={<TermsAndConditions />} />
                  <Route path="PartnershipPolicy" element={<PartnershipPolicy />} />
                  <Route path="FAQ" element={<FAQ />} />
                </Route>

                {/* Admin Dashboard (with Admin Layout) */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                </Route>

                {/* Admin Login (no layout) */}
                <Route path="login" element={<AdminLogin />} />
                {/* 404 Not Found */}
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
