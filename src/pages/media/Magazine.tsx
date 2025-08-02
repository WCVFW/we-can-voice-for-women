import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

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
    downloadUrl: "/assets/images/magazine 1.pdf",
  },
];

export default function MagazineFlipBook() {
  const [openMagazineIndex, setOpenMagazineIndex] = useState<number | null>(null);
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
      className={`flex flex-col items-center px-4 min-h-screen ${
        openMagazineIndex === null ? "mt-8" : "mt-0"
      }`}
    >
      {/* Preview Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-screen-lg ${
          openMagazineIndex !== null ? "pointer-events-none opacity-30" : ""
        }`}
      >
        {magazines.map((magazine, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-[300px] h-[400px] cursor-pointer relative group overflow-hidden rounded-lg shadow-lg"
              onClick={() => {
                if (isMobile) {
                  const downloadUrl = magazine.downloadUrl;
                  const link = document.createElement("a");
                  link.href = downloadUrl;
                  link.download = downloadUrl.split("/").pop() || "magazine.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                } else {
                  setOpenMagazineIndex(index);
                }
              }}
            >
              <img
                src={magazine.pages[0]}
                alt={`Preview of ${magazine.title}`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-2xl font-semibold">
                {isMobile ? "Click to View" : "Click to Open"}
              </div>
            </div>
            <h2 className="mt-2 text-lg font-semibold">{magazine.title}</h2>
          </div>
        ))}
      </div>

      {/* Fullscreen Flipbook */}
      {openMagazineIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-[999] flex flex-col items-center justify-center p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <style>{`body { overflow: hidden !important; }`}</style>

          <div className="relative w-full max-w-6xl">
            <HTMLFlipBook
              className="shadow-2xl rounded mx-auto"
              width={flipSize.width}
              height={flipSize.height}
              minWidth={150}
              maxWidth={1000}
              minHeight={200}
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
                    pageIndex ===
                      magazines[openMagazineIndex].pages.length - 1) && (
                    <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold bg-black bg-opacity-40">
                      {pageIndex === 0 ? "Cover Page" : "Back Cover"}
                    </div>
                  )}
                </div>
              ))}
            </HTMLFlipBook>
          </div>

          {/* MOBILE-ONLY Download Button (optional fallback) */}
          <a
            href={magazines[openMagazineIndex].downloadUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden mt-6 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-800 transition-colors duration-300 shadow-lg text-center w-fit"
          >
            📥 Download Magazine
          </a>

          {/* Close Button */}
          <button
            onClick={() => setOpenMagazineIndex(null)}
            className="mt-4 px-5 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-800 z-[1000] shadow-lg"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
