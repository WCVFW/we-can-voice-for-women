import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

// Magazine Data – you can add more here
const magazines = [
  {
    title: "Magazine 1",
    pages: [
      "/assets/images/magimg/m1.png",
      "/assets/images/magimg/m2.png",
      "/assets/images/magimg/m3.png",
      "/assets/images/magimg/m4.png",
      "/assets/images/magimg/m5.png",
      "/assets/images/magimg/m6.png",
      "/assets/images/magimg/m7.png",
      "/assets/images/magimg/m8.png",
      "/assets/images/magimg/m9.png",
      "/assets/images/magimg/m10.png",
      "/assets/images/magimg/m11.png",
      "/assets/images/magimg/m12.png",
    ],
  },

];

export default function MagazineFlipBook() {
  const [openMagazineIndex, setOpenMagazineIndex] = useState(null);
  const [flipSize, setFlipSize] = useState({ width: 400, height: 600 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setIsMobile(width < 640);

      let w = Math.min(800, width * 0.9);
      let h = (w / 2) * 3;

      if (h > height * 0.9) {
        h = height * 0.9;
        w = (h * 2) / 3;
      }

      setFlipSize({ width: w, height: h });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`flex flex-col items-center px-4 min-h-screen ${openMagazineIndex === null ? "mt-8" : "mt-0"
        }`}
    >
      {/* Show header ONLY if NOT fullscreen */}


      {/* Preview Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-screen-lg ${openMagazineIndex !== null ? "pointer-events-none opacity-30" : ""
          }`}
      >
        {magazines.map((magazine, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-[300px] h-[400px] cursor-pointer relative group overflow-hidden rounded-lg shadow-lg"
              onClick={() => setOpenMagazineIndex(index)}
            >
              <img
                src={magazine.pages[0]}
                alt={`Preview of ${magazine.title}`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-2xl font-semibold">
                Click to Open
              </div>
            </div>
            <h2 className="mt-2 text-lg font-semibold">{magazine.title}</h2>
          </div>
        ))}
      </div>

      {/* Fullscreen Flipbook */}
      {openMagazineIndex !== null && (
        <div
          className="fixed inset-0 pt-10 mt-10 mb-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Flipbook container with positioned close button */}
          <div className="relative my-4">
            {/* Close Button - bottom right beside flipbook */}
            <button
              onClick={() => setOpenMagazineIndex(null)}
              className="absolute bottom-4 -right-6 translate-x-full px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-800 z-50"
            >
              Close
            </button>

            <HTMLFlipBook
              className="shadow-2xl rounded mx-auto"
              width={flipSize.width}
              height={flipSize.height}
              minWidth={300}
              maxWidth={1000}
              minHeight={400}
              maxHeight={1533}
              drawShadow={false}
              flippingTime={600}
              usePortrait={false}
              startZIndex={10}
              autoSize={false}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={20}
              showPageCorners={true}
              disableFlipByClick={false}
              size={isMobile ? "stretch" : "fixed"}
            >
              {magazines[openMagazineIndex].pages.map((image, pageIndex) => (
                <div
                  key={pageIndex}
                  className="page relative rounded-lg overflow-hidden bg-white"
                  style={{ userSelect: "none" }}
                >
                  <img
                    src={image}
                    alt={`Page ${pageIndex + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  {(pageIndex === 0 ||
                    pageIndex === magazines[openMagazineIndex].pages.length - 1) && (
                      <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold bg-black bg-opacity-40">
                        {pageIndex === 0 ? "Cover Page" : "Back Cover"}
                      </div>
                    )}
                </div>
              ))}
            </HTMLFlipBook>
          </div>
        </div>
      )}

    </div>
  );
}
