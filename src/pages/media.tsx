"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useYouTubeVideos } from "@/hooks/useYouTubeVideos";
import type { Album } from "@/components/admin/DynamicGalleryManager"; // Make sure this path is correct

function convertToEmbedUrlFromId(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

const blogItems = [
  {
    id: 1,
    title:
      "Breaking Barriers in Thanjavur: How Meena Turned Her Kitchen into a Profitable Empire",
    author: "Staff Writer",
    category: "Women & Enterprise",
    date: "July 2025",
    excerpt:
      "In a quiet lane of Thanjavur, lives Meena Subramaniam — a homemaker turned entrepreneur inspiring a generation...",
    content: `<p>Full blog content here…</p>`,
  },
];

export default function MediaPage() {
  const [filter, setFilter] = useState<
    "video" | "Gallery" | "magazine" | "blog" | "press" | "Podcast"
  >("video");
  const [playingVideoItem, setPlayingVideoItem] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const [albums, setAlbums] = useState<Album[]>([
    {
      title: "Empowerment Workshop",
      cover: "/assets/Gallerys/cover1.jpg",
      images: ["/assets/Gallerys/1.jpg", "/assets/Gallerys/2.jpg"],
    },
    {
      title: "Rural Health Drive",
      cover: "/assets/Gallerys/cover2.jpg",
      images: ["/assets/Gallerys/5.jpg", "/assets/Gallerys/6.jpg"],
    },
  ]);

  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState<number | null>(
    null
  );
  const [sliderIndex, setSliderIndex] = useState<number | null>(null);

  const { videos, error } = useYouTubeVideos(30);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const indexOfLast = currentPage * videosPerPage;
  const indexOfFirst = indexOfLast - videosPerPage;
  const currentVideos = videos.slice(indexOfFirst, indexOfLast);

  const filters = [
    ["video", "Videos"],
    ["Gallery", "Gallery"],
    ["magazine", "Magazine"],
    ["blog", "Blog"],
    ["press", "Press"],
    ["Podcast", "Podcast"],
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
            }}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* ---------------- VIDEO SECTION ---------------- */}
      {filter === "video" && (
        <div className="my-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {error && <p className="text-red-500">{error}</p>}
            {currentVideos.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition duration-300">
                  <CardContent className="p-0 relative">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-48 object-contain block"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setPlayingVideoItem(item)}
                        className="p-3 bg-red-600 rounded-full"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-6 h-6"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </CardContent>
                  <div className="px-4 py-2 text-center font-semibold text-gray-700">
                    <a
                      href={`https://www.youtube.com/watch?v=${item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-pink-600"
                    >
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
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {[...Array(totalPages)].map((_, index) => (
                <Button
                  key={index}
                  size="icon"
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  className={
                    currentPage === index + 1
                      ? "bg-pink-600 text-white"
                      : "text-pink-600 border-pink-400"
                  }
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ---------------- VIDEO MODAL ---------------- */}
      {playingVideoItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-6 pt-[100px]">
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

      {/* ---------------- GALLERY ---------------- */}
      {filter === "Gallery" && (
        <div className="my-10">
          {/* <h2 className="text-3xl font-bold text-pink-700 mb-6 text-center underline">
            Gallery Albums
          </h2> */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
                onClick={() => setSelectedAlbumIndex(index)}
              >
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center text-pink-700 font-semibold">
                  {album.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- ALBUM MODAL ---------------- */}
      {selectedAlbumIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-6 overflow-y-auto pt-24">
          <h3 className="text-2xl text-white mb-4 font-semibold">
            {albums[selectedAlbumIndex].title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
            {albums[selectedAlbumIndex].images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Photo ${idx + 1}`}
                className="w-full h-48 object-cover rounded cursor-pointer hover:scale-105 transition"
                onClick={() => setSliderIndex(idx)}
              />
            ))}
          </div>
          <button
            className="mt-6 px-4 py-2 bg-white text-red-600 rounded hover:bg-gray-200"
            onClick={() => setSelectedAlbumIndex(null)}
          >
            Close
          </button>
        </div>
      )}

      {/* ---------------- FULLSCREEN SLIDER ---------------- */}
      {sliderIndex !== null && selectedAlbumIndex !== null && (
        <div className="fixed inset-0 bg-black z-[60] flex flex-col justify-center items-center">
          <img
            src={albums[selectedAlbumIndex].images[sliderIndex]}
            alt="Gallery Slide"
            className="max-h-[80vh] object-contain rounded shadow-lg"
          />
          <div className="flex gap-6 mt-6">
            <Button
              variant="outline"
              className="text-white border-white"
              onClick={() =>
                setSliderIndex((prev) =>
                  prev === 0
                    ? albums[selectedAlbumIndex].images.length - 1
                    : (prev ?? 1) - 1
                )
              }
            >
              Previous
            </Button>
            <Button
              variant="outline"
              className="text-white border-white"
              onClick={() =>
                setSliderIndex((prev) =>
                  prev === albums[selectedAlbumIndex].images.length - 1
                    ? 0
                    : (prev ?? 0) + 1
                )
              }
            >
              Next
            </Button>
            <Button
              variant="destructive"
              onClick={() => setSliderIndex(null)}
              className="ml-4"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
