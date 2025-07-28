"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useYouTubeVideos } from "@/hooks/useYouTubeVideos";
import type { Album } from "@/components/admin/DynamicGalleryManager";
import MagazineFlipBook from "./media/Magazine";
import Blogs from "./media/blogs";

function convertToEmbedUrlFromId(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export default function MediaPage() {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("filter")?.toLowerCase() ?? "video";

  const [filter, setFilter] = useState<
    "video" | "images" | "magazine" | "blog" | "press" | "podcast"
  >(filterParam as any);

  const [playingVideoItem, setPlayingVideoItem] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const param = searchParams.get("filter")?.toLowerCase() ?? "video";
    setFilter(param as any);
  }, [searchParams]);

  const { videos, error } = useYouTubeVideos(30);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const indexOfLast = currentPage * videosPerPage;
  const indexOfFirst = indexOfLast - videosPerPage;
  const currentVideos = videos.slice(indexOfFirst, indexOfLast);

  const [albums] = useState<Album[]>([
    {
      title: "1 Lakh Candle Lights",
      cover: "/assets/images/cl/c4.jpg",
      images: ["/assets/images/cl/c1.jpg", "/assets/images/cl/c2.jpg", "/assets/images/cl/c3.jpg", "/assets/images/cl/c4.jpg", "/assets/images/cl/c5.jpg", "/assets/images/cl/c6.jpg", "/assets/images/cl/c7.jpg", "/assets/images/cl/c8.jpg", "/assets/images/cl/c9.jpg", "/assets/images/cl/c10.jpg", "/assets/images/cl/c11.jpg", "/assets/images/cl/c12.jpg", "/assets/images/cl/c13.jpg", "/assets/images/cl/c14.jpg", "/assets/images/cl/c15.jpg", "/assets/images/cl/c16.jpg", "/assets/images/cl/c17.jpg", "/assets/images/cl/c18.jpg", "/assets/images/cl/c19.jpg", "/assets/images/cl/c20.jpg", "/assets/images/cl/c21.jpg", "/assets/images/cl/c22.jpg", "/assets/images/cl/c23.jpg", "/assets/images/cl/c24.jpg", "/assets/images/cl/c25.jpg", "/assets/images/cl/c26.jpg"]
    },
    {
      title: "Manvaasanai-Pongal Festivel",
      cover: "/assets/images/mi/mi12.jpg",
      images: ["/assets/images/mi/mi1.jpg", "/assets/images/mi/mi2.jpg", "/assets/images/mi/mi3.jpg", "/assets/images/mi/mi4.jpg", "/assets/images/mi/mi5.jpg", "/assets/images/mi/mi6.jpg", "/assets/images/mi/mi7.jpg", "/assets/images/mi/mi8.jpg", "/assets/images/mi/mi9.jpg", "/assets/images/mi/mi10.jpg", "/assets/images/mi/mi11.jpg", "/assets/images/mi/mi12.jpg",],
    },
    {
      title: "Scholarship For Higher Education",
      cover: "/assets/images/ci/ci1.png",
      images: ["/assets/images/ci/ci1.png", "/assets/images/ci/ci2.png", "/assets/images/ci/ci3.png", "/assets/images/ci/ci4.png"],
    },
    {
      title: "Cancer Awareness Medical Camp",
      cover: "/assets/images/ca/ca3.jpg",
      images: ["/assets/images/ca/ca1.jpg", "/assets/images/ca/ca2.jpg", "/assets/images/ca/ca3.jpg", "/assets/images/ca/ca4.jpg", "/assets/images/ca/ca5.jpg", "/assets/images/ca/ca6.jpg"],
    },
    {
      title: "General Medical Camp",
      cover: "/assets/images/medicalcampu/0T5A8347.JPG",
      images: ["/assets/images/medicalcampu/0T5A8255.JPG","/assets/images/medicalcampu/0T5A8347.JPG","/assets/images/medicalcampu/0T5A8348.JPG","/assets/images/medicalcampu/0T5A8390.JPG","/assets/images/medicalcampu/0T5A8425.JPG","/assets/images/medicalcampu/0T5A8441.JPG","/assets/images/medicalcampu/0T5A8445.JPG","/assets/images/medicalcampu/0T5A8465.JPG","/assets/images/medicalcampu/0T5A8472.JPG","/assets/images/medicalcampu/0T5A8480.JPG","/assets/images/medicalcampu/0T5A8483.JPG","/assets/images/medicalcampu/0T5A8507.JPG","/assets/images/medicalcampu/0T5A8518.JPG","/assets/images/medicalcampu/0T5A8529.JPG","/assets/images/medicalcampu/0T5A8627.JPG","/assets/images/medicalcampu/0T5A8698.JPG"],
    },
  ]);

  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState<number | null>(null);
  const [sliderIndex, setSliderIndex] = useState<number | null>(null);
  const [albumPageIndex, setAlbumPageIndex] = useState(0);

  const pressImages = [
    { src: "assets/images/press/pm2.jpg", alt: "Puthiya Vaazhviyal Malar" },
    { src: "assets/images/press/pm1.jpg", alt: "Kunguma Chimizh" },
  ];

  const filters = [
    ["video", "Videos"],
    ["images", "Images"],
    ["magazine", "Magazine"],
    ["blog", "Blog"],
    ["press", "Press"],
    ["podcast", "Podcast"],
  ] as const;

  return (
    <div className="min-h-screen bg-white px-4 pt-28 pb-8 max-w-7xl mx-auto">
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 mt-6">
        {filters.map(([id, label]) => (
          <Button
            key={id}
            size="sm"
            variant={filter === id ? "default" : "outline"}
            className={
              filter === id
                ? "bg-pink-600 text-pink-100 hover:bg-pink-700"
                : "text-pink-600 border-pink-600 hover:bg-pink-100"
            }
            onClick={() => {
              setFilter(id);
              setPlayingVideoItem(null);
              setSliderIndex(null);
              setSelectedAlbumIndex(null);
              setCurrentPage(1);
              navigate(`?filter=${id}`);
              window.scrollTo(0, 0);
            }}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* VIDEO Section */}
      {filter === "video" && (
        <div className="my-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {error && <p className="text-red-500">{error}</p>}
            {currentVideos.map((item) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="overflow-hidden hover:shadow-2xl transition duration-300">
                  <CardContent className="p-0 relative">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-contain block" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setPlayingVideoItem(item)}
                        className="p-3 bg-red-600 rounded-full"
                      >
                        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M8 5v14l11-7z" /></svg>
                      </button>
                    </div>
                  </CardContent>
                  <div className="px-4 py-2 text-center font-semibold text-gray-700">
                    <a href={`https://www.youtube.com/watch?v=${item.id}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-pink-600">
                      {item.title}
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
              <Button variant="outline" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</Button>
              {[...Array(totalPages)].map((_, index) => (
                <Button key={index} size="icon" variant={currentPage === index + 1 ? "default" : "outline"}
                  className={currentPage === index + 1 ? "bg-pink-600 text-white" : "text-pink-600 border-pink-400"}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button variant="outline" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</Button>
            </div>
          )}
        </div>
      )}

      {/* VIDEO MODAL */}
      {playingVideoItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 pt-[100px]">
          <div className="relative w-[90vw] max-w-6xl h-[80vh] bg-black rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={`${convertToEmbedUrlFromId(playingVideoItem.id)}?autoplay=1`}
              title={playingVideoItem.title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
            <button
              onClick={() => setPlayingVideoItem(null)}
              className="absolute top-4 right-4 bg-white text-red-600 rounded-full p-2 hover:bg-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* GALLERY */}
      {filter === "images" && (
        <div className="my-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album, index) => (
            <div key={index} onClick={() => setSelectedAlbumIndex(index)} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer">
              <img src={album.cover} alt={album.title} className="w-full h-64 object-cover" />
              <div className="p-4 text-center text-pink-700 font-semibold">{album.title}</div>
            </div>
          ))}
        </div>
      )}

      {/* ALBUM MODAL */}
      {selectedAlbumIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto pt-32 pb-12 flex flex-col items-center px-4">
          <h3 className="text-2xl text-white mb-6 font-semibold text-center">{albums[selectedAlbumIndex].title}</h3>
          <div className="relative w-full max-w-5xl flex items-center justify-center mb-8">
            <button className="absolute left-0 z-10 text-white text-4xl p-2 bg-black/50 hover:bg-black/70 rounded-full"
              onClick={() => setAlbumPageIndex((prev) => prev === 0 ? Math.floor((albums[selectedAlbumIndex].images.length - 1) / 3) : prev - 1)}>‹</button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-10">
              {albums[selectedAlbumIndex].images.slice(albumPageIndex * 3, albumPageIndex * 3 + 3).map((img, idx) => (
                <img key={idx} src={img} alt="" className="w-full h-72 object-cover rounded-xl shadow-lg cursor-pointer hover:scale-105 transition"
                  onClick={() => setSliderIndex(albumPageIndex * 3 + idx)} />
              ))}
            </div>

            <button className="absolute right-0 z-10 text-white text-4xl p-2 bg-black/50 hover:bg-black/70 rounded-full"
              onClick={() => setAlbumPageIndex((prev) => (prev + 1) * 3 >= albums[selectedAlbumIndex].images.length ? 0 : prev + 1)}>›</button>
          </div>

          <Button onClick={() => { setSelectedAlbumIndex(null); setSliderIndex(null); setAlbumPageIndex(0); }} className="mb-10 bg-pink-600 text-white">Close</Button>
        </div>
      )}

      {/* FULLSCREEN IMAGE SLIDER */}
      {sliderIndex !== null && selectedAlbumIndex !== null && (
        <div className="fixed inset-0 bg-black z-[999] flex flex-col justify-center items-center px-6 py-8 pt-24">
          <div className="relative group w-full flex justify-center items-center">
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl p-2 bg-black/50 hover:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setSliderIndex((prev) => prev === 0 ? albums[selectedAlbumIndex].images.length - 1 : (prev ?? 1) - 1)}>‹</button>
            <img src={albums[selectedAlbumIndex].images[sliderIndex]} className="max-h-[80vh] object-contain rounded shadow-lg" />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl p-2 bg-black/50 hover:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setSliderIndex((prev) => prev === albums[selectedAlbumIndex].images.length - 1 ? 0 : (prev ?? 0) + 1)}>›</button>
          </div>
          <Button onClick={() => setSliderIndex(null)} className="mt-6 bg-pink-600 text-white">Close</Button>
        </div>
      )}

      {/* BLOG */}
      {filter === "blog" && <Blogs />}

      {/* PRESS */}
      {filter === "press" && (
        <div className="space-y-8">
          {pressImages.map((img, i) => (
            <div key={i}>
              <img src={img.src} alt={img.alt} className="w-full rounded-lg shadow-md" />
              <p className="mt-2 text-sm text-gray-700">{img.alt}</p>
            </div>
          ))}
        </div>
      )}

      {/* MAGAZINE */}
      {filter === "magazine" && <MagazineFlipBook />}
    </div>
  );
}
