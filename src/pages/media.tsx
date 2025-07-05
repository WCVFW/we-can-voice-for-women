"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useYouTubeVideos } from "@/hooks/useYouTubeVideos";

// function getYoutubeThumbnailFromId(videoId: string): string {
//   return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
// }

function convertToEmbedUrlFromId(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

// const GalleryAlbums = [
//   {
//     title: "Album 1",
//     cover: "/assets/Gallerys/4.jpg",
//     Gallerys: ["/assets/Gallerys/4.jpg", "/assets/Gallerys/Hero_Banner.png"],
//   },
// ];

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
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState<number | null>(
    null
  );
  const [sliderIndex, setSliderIndex] = useState<number | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<
    (typeof blogItems)[0] | null
  >(null);

  const { videos, error } = useYouTubeVideos(6);

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
              setSelectedBlog(null);
            }}
          >
            {label}
          </Button>
        ))}
      </div>

      {filter === "video" && (
        <div className="my-10">
          <h2 className="text-3xl font-bold text-pink-700 mb-6 text-center underline">
            Videos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {error && <p className="text-red-500">{error}</p>}
            {videos.map((item) => (
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
                        aria-label="Play video"
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
        </div>
      )}

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

      {/* Gallery code remains unchanged */}
      {/* Blog code remains unchanged */}
      {/* Press and magazine fallback remains unchanged */}
    </div>
  );
}
