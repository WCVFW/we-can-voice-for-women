import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Routes, Route } from 'react-router-dom';
// import Footer from './components/Footer';

// import About from '@/pages/about';
// import Blogs from '@/pages/blogs';
// import Media from '@/pages/media';
// import Events from '@/pages/events';
// import GetInvolved from '@/pages/getinvolved';
// import Contact from '@/pages/contact';
// import PrivacyPolicy from '@/pages/privacy-policy';
// import RefundPolicy from '@/pages/refund-policy';
// import CookiePolicy from '@/pages/cookie-policy';
// import TermsAndConditions from '@/pages/terms-and-conditions';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;