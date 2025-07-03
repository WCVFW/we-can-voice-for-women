import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header
      className="fixed top-0 left-0 w-full bg-[#ffedfa] z-[100] shadow-md"
      style={{
        height: "94px",
        borderBottomLeftRadius: "35px",
        borderBottomRightRadius: "35px",
      }}
    >
      <div className="flex items-center justify-between h-full px-4 sm:px-6 md:px-10 lg:px-16">
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
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
