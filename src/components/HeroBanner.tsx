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
          backgroundImage: "url('./assets/images/Hero_Banner.png')",
        }}
      >
        <div className="max-w-4xl">
          <div className="w-full flex justify-center px-4">
            <h1
              className="text-white font-semibold tracking-wider text-center mb-6"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(28px, 5vw, 52px)',
                lineHeight: '1.2',
                letterSpacing: '1.2px',
                textShadow: '6px 0 8px rgba(0, 0, 0, 0.8)',
              }}
            >
              Progress of Women is Essential <br />for Progress of the Country
            </h1>
          </div>
          <div className="mt-8 flex justify-center">
            <DonateButton
              size="lg"
              className="px-10 py-4 text-lg shadow-lg shadow-pink-500/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;