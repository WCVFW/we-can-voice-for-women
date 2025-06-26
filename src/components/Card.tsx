// components/Card.js
'use client';
import React, { useState } from 'react';

export default function Card({ title, text, colorClass = 'text-pink-600', center = false }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 ${center ? 'text-center' : ''}`}>
      <h3 className={`text-xl font-semibold ${colorClass} mb-4`}>{title}</h3>
      <p className={`text-gray-700 ${!expanded ? 'line-clamp-2' : ''}`}>
        {text}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-sm text-blue-600 hover:underline"
      >
        {expanded ? 'Show Less' : 'Read More'}
      </button>
    </div>
  );
}
