import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DonateButton from "./DonateButton";

const HeroBanner = () => {
  return (
    <div className="relative">
      {/* Pink Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-600/30 to-rose-400/30 mix-blend-multiply z-0" />

      {/* Background Image and Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-32 md:py-48 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/images/hero-background.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight drop-shadow-lg">
          Empowering Women Through Action
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl drop-shadow">
          Join our mission to uplift women through education, health
          initiatives, and economic empowerment programs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <DonateButton size="lg" className="text-lg px-8" />
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
            asChild
          >
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
