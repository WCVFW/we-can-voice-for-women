import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
 
const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#ffedfa]"
      style={{
        borderBottomLeftRadius: "35px",
        borderBottomRightRadius: "35px",
        height: "94px",
      }}
    >
      <div className="flex items-center justify-between h-full px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/images/Logo.png"
            alt="Logo"
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
          />
          <span className="text-[16px] font-bold font-roboto bg-gradient-to-r from-rose-500 to-pink-300 bg-clip-text text-transparent">
            We Can Voice For Women
          </span>
        </Link>
 
        {/* Navigation */}
        <Navigation />
      </div>
    </header>
  );
};
 
export default Header;