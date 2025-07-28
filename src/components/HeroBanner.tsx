import React, { useEffect, useRef, useState } from "react";

const scrollContent = [
  // "Upcoming Event: General Medical Camp at Goonipalayam Village, Thiruvallur District on 27th july 2025",
  // "Upcoming Event: General Medical Camp at Goonipalayam Village, Thiruvallur District on 27th july 2025",
  
];

const HeroBanner = () => {
  const scrollContainerRef = useRef(null);
  const [bgColor, setBgColor] = useState("#ffe3ee"); // Dynamic background for gradient

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let scrollAmount = 0;

    const scroll = () => {
      scrollAmount += 1;
      if (scrollContainer) {
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
    };

    const interval = setInterval(scroll, 20); // Adjust for speed
    return () => clearInterval(interval);
  }, []);

  const duplicatedScrollContent = [...scrollContent, ...scrollContent];

  return (
    <>
      {/* --- HERO BANNER SECTION --- */}
      <div className="relative w-full overflow-hidden pt-[94px] h-screen">
        {/* Background Image */}
        <img
          src="/assets/images/untitled-529.jpeg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Color Picker */}
        <div className="absolute top-5 right-5 z-30 bg-white p-2 rounded shadow">
          <label className="text-sm font-medium">Pick Background Color: </label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="ml-2"
          />
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(180deg, rgba(255,255,255,0) 86%, ${bgColor} 100%), linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5))`,
          }}
        />

        {/* Text Content */}
        <div className="relative z-20 flex flex-col justify-end items-center text-center px-6 pb-20 h-full">
          <div className="max-w-[90%] sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto">
            <h1
              className="font-bold uppercase text-center mb-20
              text-[16px] xs:text-[18px] sm:text-[24px] md:text-[28px] lg:text-[38px] xl:text-[54px] 2xl:text-[62px]
              leading-[1.2] tracking-[0.075em] bg-gradient-to-r from-gray-300 via-pink-200 to-pink-600 bg-clip-text text-transparent xl:mb-2"
            >
              Empowering Women is <br />
              Vital For the Prosperity <br />
              of Our Nation
            </h1>
          </div>
        </div>
      </div>

      {/* --- SCROLLING TICKER BELOW HERO --- */}
      <div className="w-full bg-pink-600 py-4">
        <div
          ref={scrollContainerRef}
          className="whitespace-nowrap flex gap-10 w-full text-white font-semibold text-lg overflow-hidden px-6"
          style={{ willChange: "transform" }}
        >
          {duplicatedScrollContent.map((item, index) => (
            <div key={index} className="px-4 shrink-0">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* --- Animation Styles --- */}
      <style>{`
        @keyframes horizontal-scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-horizontal-scroll {
          animation: horizontal-scroll 60s linear infinite;
        }
      `}</style>
    </>
  );
};

export default HeroBanner;
