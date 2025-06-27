import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DonateButton from "./DonateButton";

const HeroBanner = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/50 via-pink-600/40 to-transparent z-10 mix-blend-multiply pointer-events-none" />

      {/* Bottom fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background/90 to-transparent z-20 pointer-events-none" />

      {/* Background Image & Bottom Content */}
      <div
        className="relative z-30 flex flex-col justify-end items-center text-center px-6 pb-20 h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('./assets/images/untitled-529.jpeg')",
        }}
      >
        <div className="max-w-[90%] sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Heading */}
          <div className="w-full flex justify-center">
            <h1
              className="text-white font-myriad font-bold uppercase text-center mb-6
  text-[16px] xs:text-[18px] sm:text-[24px] md:text-[28px] lg:text-[36px] xl:text-[44px] 2xl:text-[52px]
  leading-[1.2] tracking-[0.075em]"
              style={{
                textShadow: '6px 0 3px rgb(238, 14, 119)',
              }}
            >
              Empowering Women is Vital<br />
              For the Prosperity of Our Nation
            </h1>

          </div>

          {/* Donate Button */}
          <div className="mt-6 sm:mt-8 flex justify-center">
            <DonateButton
              size="lg"
              className="
        w-32 sm:w-40 md:w-44
        px-2.5 py-1.5 sm:px-4 sm:py-2 
        text-xs sm:text-sm md:text-base 
        shadow-md shadow-pink-400/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;