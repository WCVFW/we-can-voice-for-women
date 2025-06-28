import React, { useEffect, useState } from 'react';

export default function Loader() {
  const [flyOut, setFlyOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFlyOut(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60">
        {/* Ball 1 */}
        <div
          className={`absolute rounded-full bg-gradient-to-br from-pink-500 to-purple-500 animate-ping 
          ${flyOut ? 'animate-[flyTopLeft_0.6s_forwards]' : 'top-1/2 left-1/2 w-6 h-6 -translate-x-full -translate-y-full'}`}
        />
        {/* Ball 2 */}
        <div
          className={`absolute rounded-full bg-gradient-to-br from-pink-500 to-purple-500 animate-ping 
          ${flyOut ? 'animate-[flyTopRight_0.6s_forwards]' : 'top-1/2 left-1/2 w-6 h-6 translate-x-full -translate-y-full'}`}
        />
        {/* Ball 3 */}
        <div
          className={`absolute rounded-full bg-gradient-to-br from-pink-500 to-purple-500 animate-ping 
          ${flyOut ? 'animate-[flyBottomLeft_0.6s_forwards]' : 'top-1/2 left-1/2 w-6 h-6 -translate-x-full translate-y-full'}`}
        />
        {/* Ball 4 */}
        <div
          className={`absolute rounded-full bg-gradient-to-br from-pink-500 to-purple-500 animate-ping 
          ${flyOut ? 'animate-[flyBottomRight_0.6s_forwards]' : 'top-1/2 left-1/2 w-6 h-6 translate-x-full translate-y-full'}`}
        />
      </div>

      <p
        className={`mt-8 text-base sm:text-lg md:text-xl text-pink-600 font-semibold transition-opacity duration-500 ${
          flyOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        Loading...
      </p>
    </div>
  );
}
