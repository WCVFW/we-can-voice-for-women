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

const queryClient = new QueryClient();

const App = () => (
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

export default App;