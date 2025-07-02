import React from "react";

const HeroBanner = () => {
  return (
    <div
      className="relative w-full overflow-hidden pt-[94px] h-screen" // Space for fixed header
    >
      {/* Background Image Layer */}
      <img
        src="./assets/images/untitled-529.jpeg"
        alt="Hero Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Gradient Overlay Layer */}
      <div
        className="absolute top-0 left-0 w-full h-full z-10"
        style={{
          background: `
            linear-gradient(180deg, rgba(255, 255, 255, 0) 86.13%, #ffe3ee 100%),
            linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-end items-center text-center px-6 pb-20 h-full">
        <div className="max-w-[90%] sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="font-myriad font-[800] uppercase text-center mb-20
              text-[16px] xs:text-[18px] sm:text-[24px] md:text-[28px] lg:text-[36px] xl:text-[44px] 2xl:text-[52px]
              leading-[1.2] tracking-[0.075em]
              bg-clip-text text-transparent"
            style={{
              background:
                "linear-gradient(85.01deg, #D7D7D7 2.3%, #FFEDFA 40.82%, #E53888 90.22%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
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
