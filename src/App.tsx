import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import Index from './pages/Index';
import Enlightenment from './pages/Enlightenment';
import Enhealthment from './pages/Enhealthment';
import Empowerment from './pages/Empowerment';
import Donate from './pages/Donate';
import AdminDashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/Login';
import NotFound from './pages/NotFound';

import About from '@/pages/about';
import Blogs from '@/pages/blogs';
import Media from '@/pages/media';
import Events from '@/pages/events';
import GetInvolved from '@/pages/getinvolved';
import Contact from '@/pages/contact';
import PrivacyPolicy from '@/pages/privacy-policy';
import RefundPolicy from '@/pages/refund-policy';
import CookiePolicy from '@/pages/cookie-policy';
import TermsAndConditions from '@/pages/terms-and-conditions';
import FAQ from '@/pages/FAQ';
import Login from './pages/admin/Login';


import Loader from '@/components/Loader';

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Adjust time as needed
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
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
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;