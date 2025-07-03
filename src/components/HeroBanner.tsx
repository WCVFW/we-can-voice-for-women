import React from "react";

const HeroBanner = () => {
  return (
    <div className="relative w-full overflow-hidden pt-[94px] h-screen">
      {/* Background Image */}
      <img
        src="/assets/images/untitled-529.jpeg"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `
            linear-gradient(180deg, rgba(255,255,255,0) 86%, #ffe3ee 100%),
            linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5))
          `,
        }}
      />

      {/* Content */}
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
  );
};

export default HeroBanner;
