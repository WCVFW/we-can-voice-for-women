import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 whitespace-nowrap">
            <img
              src="/assets/images/Logo.png"
              alt="Logo"
              className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 object-contain shrink-0"
            />
            <span className="text-[12px] xs:text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-rose-500 to-pink-300 bg-clip-text text-transparent leading-tight">
              We Can Voice For Women
            </span>
          </Link>
        </div>
        <Navigation />
      </div>
    </header>

  );
};

export default Header;
