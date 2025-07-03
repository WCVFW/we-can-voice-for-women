'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const COOKIE_KEY = 'cookie_consent';
const COOKIE_EXPIRY_DAYS = 180;

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  // Check cookie on first load
  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (stored) {
      try {
        const { value, timestamp } = JSON.parse(stored);
        const isExpired =
          Date.now() - timestamp > COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

        if (!isExpired && (value === 'accepted' || value === 'rejected')) {
          return; // Still valid, no need to show
        }
      } catch {
        // invalid JSON or corrupted data — show banner again
      }
    }
    setVisible(true);
  }, []);

  // Handle Accept or Reject
  const handleConsent = (value: 'accepted' | 'rejected') => {
    const data = {
      value,
      timestamp: Date.now(),
    };
    localStorage.setItem(COOKIE_KEY, JSON.stringify(data));
    setVisible(false);
  };

  // Don't render if not needed
  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-gray-800 text-white px-4 py-4 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm sm:text-base">
          We use cookies to improve your experience. You can manage your preferences at any time.
        </p>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => handleConsent('accepted')}
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            Accept All
          </Button>
          <Button
            onClick={() => handleConsent('rejected')}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            Reject
          </Button>
          <Button
            onClick={() => (window.location.href = '/cookie-policy')}
            variant="ghost"
            className="text-pink-300 hover:text-white underline"
          >
            Cookie Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
