import { useState, useEffect, useRef } from "react";

export default function Card({ title, text, colorClass, center }) {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      // Measure overflow using maxHeight only
      el.style.maxHeight = expanded ? "none" : "4.5em"; // Approx 3 lines
      el.style.overflow = "hidden";

      // Use a short delay to ensure rendering is done
      requestAnimationFrame(() => {
        setIsOverflowing(el.scrollHeight > el.clientHeight + 1);
      });
    }
  }, [text, expanded]);

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 ${
        center ? "text-center" : ""
      }`}
    >
      <h3 className={`text-xl font-semibold ${colorClass} mb-4 text-pink-600`}>
        {title}
      </h3>

      <p
        ref={textRef}
        className="text-gray-700 transition-all"
        style={{
          overflow: "hidden",
          maxHeight: expanded ? "none" : "4.5em", // ~3 lines (1.5em each)
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: expanded ? "unset" : "3",
        }}
      >
        {text}
      </p>

      {isOverflowing && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
