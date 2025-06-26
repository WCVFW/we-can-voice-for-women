import { useState, useEffect, useRef } from "react";

export default function Card({ title, text, colorClass, center }) {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 ${
        center ? "text-center" : ""
      }`}
    >
      <h3 className={`text-xl font-semibold ${colorClass} mb-4 text-pink-600`}>
        {title}
      </h3>

      <p className="text-gray-700" style={{ overflowWrap: "break-word" }}>
        {text}
      </p>
    </div>
  );
}
