'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, XCircle, Settings } from 'lucide-react';

const COOKIE_KEY = 'cookie_consent';
const IMAGES_KEY = 'cached_images';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const preloadImages = (urls: string[]) => {
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  };

  const handleConsent = () => {
    const imageUrls = [
      '/assets/images/Logo.png',
      '/assets/images/hero-banner.jpeg',
    ];

    // Save consent & preload image URLs
    localStorage.setItem(COOKIE_KEY, 'accepted');
    localStorage.setItem(IMAGES_KEY, JSON.stringify(imageUrls));

    preloadImages(imageUrls);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-gray-900 text-white px-4 py-5 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm sm:text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-pink-500" />
          We use cookies to improve your experience.
        </p>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={handleConsent} className="bg-pink-600 hover:bg-pink-700 text-white flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Accept
          </Button>
          <Button onClick={() => setVisible(false)} className="bg-pink-600 hover:bg-pink-700 text-white border border-white flex items-center gap-1">
            <XCircle className="w-4 h-4" /> Reject
          </Button>
          <Button onClick={() => window.location.href = '/cookie-policy'} className="bg-pink-600 hover:bg-pink-700 text-white underline flex items-center gap-1" variant="ghost">
            <Settings className="w-4 h-4" /> Cookie Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
