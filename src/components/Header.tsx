import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/public/assets/images/Logo.png"  // ✅ No "/public" needed
              alt="Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain"
            />

            <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-300 bg-clip-text text-transparent">
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
