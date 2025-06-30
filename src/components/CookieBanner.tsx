'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const COOKIE_KEY = 'cookie_consent';
const COOKIE_EXPIRY_DAYS = 180;

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (stored) {
      try {
        const { value, timestamp } = JSON.parse(stored);
        const expired =
          Date.now() - timestamp > COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
        if (!expired) return; // Still valid, don't show again
      } catch {
        // corrupted data, re-show banner
      }
    }
    setVisible(true);
  }, []);

  const handleConsent = (value: string) => {
    const data = { value, timestamp: Date.now() };
    localStorage.setItem(COOKIE_KEY, JSON.stringify(data));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-gray-800 text-white px-4 py-4 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm sm:text-base">
          We use cookies to improve your experience. You can manage your preferences any time.
        </p>
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => handleConsent('accepted')}
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            Accept
          </Button>
          <Button
            onClick={() => handleConsent('rejected')}
            className="bg-pink-600 hover:bg-pink-700 text-white border border-white"
          >
            Reject
          </Button>
          <Button
            onClick={() => window.location.href = '/cookie-policy'}
            className="text-pink-200 hover:text-white underline"
            variant="ghost"
          >
            Cookie Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
