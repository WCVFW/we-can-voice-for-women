import React, { useEffect, useState } from 'react';

export default function Loader() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
        <div className="absolute inset-0 rounded-full border-4 border-pink-400 opacity-30"></div>
        <div className="absolute inset-0 rounded-full border-t-4 border-pink-600 animate-spin"></div>
      </div>
      <p className="mt-6 text-pink-600 text-lg font-medium tracking-wide">Loading...</p>
    </div>
  );
}
