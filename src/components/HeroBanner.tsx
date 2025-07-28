import React, { useEffect, useRef, useState } from "react";

const scrollContent = [
  // "Upcoming Event: General Medical Camp at Goonipalayam Village, Thiruvallur District on 27th July 2025",
  // "Women Empowerment Workshop – Chennai, 10th August 2025",
  // "Skill Training Camp – Coimbatore, 15th August 2025",
];

const images = [
  "/assets/images/untitled-529.jpeg",
  "/assets/images/hero2.jpg",
  "/assets/images/hero3.jpg",
];

const HeroBanner = () => {
  const scrollContainerRef = useRef(null);
  const [bgColor, setBgColor] = useState("#ffe3ee");
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-slide background images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 15000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll ticker
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

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, []);

  const duplicatedScrollContent = [...scrollContent, ...scrollContent];

  return (
    <>
      {/* --- HERO BANNER SECTION --- */}
      <div className="relative w-full overflow-hidden pt-[94px] h-screen transition-all duration-1000">
        {/* Background Image with fade transition */}
        <img
          src={images[currentImage]}
          alt="Hero Background"
          loading="eager"
          className="absolute top-10 left-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
          key={currentImage}
        />

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
    </>
  );
};

export default HeroBanner;
