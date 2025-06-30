"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// YouTube helpers
function getYoutubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11}).*/;
  const match = url.match(regExp);
  return match && match[2] ? match[2] : null;
}

function getYoutubeThumbnailFromUrl(url: string): string {
  const id = getYoutubeVideoId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "/placeholder.svg";
}

function convertToEmbedUrl(url: string): string | null {
  const id = getYoutubeVideoId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

// Sample data
const mediaItems = [
  { id: 1, type: "video", title: "We Support Women Education", videoUrl: "https://www.youtube.com/watch?v=8mTxV2JBt9U" },
  { id: 2, type: "video", title: "No more Depression - Part 1", videoUrl: "https://www.youtube.com/watch?v=z3_48_JHUpY" },
  { id: 3, type: "video", title: "No more Depression - Part 2", videoUrl: "https://www.youtube.com/watch?v=v9Oh-EX9sE4" },
  { id: 4, type: "video", title: "No more Depression - Part 3", videoUrl: "https://www.youtube.com/watch?v=y-U7lw3KRJ0" },
  { id: 5, type: "video", title: "Menstrual cup A to Z in Tamil", videoUrl: "https://www.youtube.com/watch?v=KP6wuVAk3WM" },
  { id: 6, type: "video", title: "IAS, IPS Motivational Speech", videoUrl: "https://www.youtube.com/watch?v=EYBNXErwGRA" },

];
const imageAlbums = [
  {
    title: "Album 1",
    cover: "public/media/1.JPG", // cover image for album
    images: ["/public/media/1.JPG", "/assets/images/4.jpg", "/assets/images/Hero_Banner.png"],
  },
  // {
  //   title: "Album 2",
  //   cover: "/images/photo4.jpg",
  //   images: ["/images/photo4.jpg", "/images/photo5.jpg", "/images/photo3.jpg"],
  // },
  // {
  //   title: "Album 3",
  //   cover: "/images/photo5.jpg",
  //   images: ["/images/photo5.jpg", "/images/photo1.jpg"],
  // },
];
const blogItems = [
  {
    id: 1,
    title: "Breaking Barriers in Thanjavur: How Meena Turned Her Kitchen into a Profitable Empire",
    author: "Staff Writer",
    category: "Women & Enterprise",
    date: "July 2025",
    excerpt: "In a quiet lane of Thanjavur, lives Meena Subramaniam — a homemaker turned entrepreneur inspiring a generation of women...",
    content: `
In a quiet lane of Thanjavur, amidst the scent of agarbatti and jasmine, lives Meena Subramaniam — a homemaker turned entrepreneur who is now inspiring a generation of women to dream beyond the walls of their homes.

What began as a modest effort to sell her signature millet snacks has grown into “Meena’s Millet Magic”, a thriving homegrown brand that today serves customers across Tamil Nadu.

But Meena’s journey didn’t begin with capital or connections. It began with a question — one that many women quietly ask themselves: “Can I start something of my own?”

---

### The Spark in the Everyday

Meena, 34, spent years perfecting traditional recipes passed down from her grandmother. Thinai murukku, kambu laddu, ragi mixture — her kitchen was always filled with the crackle of frying pans and the fragrance of roasted grains.

It wasn’t until her daughter brought home a school project on women-led startups that Meena seriously considered turning her culinary skills into a business. “It was like looking in a mirror,” Meena recalls. “I saw stories of women like me who started with nothing — and built something meaningful.”

---

### From Kitchen Table to Business Table

With encouragement from her family, Meena took her first step by registering her business under the Udyam MSME scheme, a free government registration that opened the door to various small business benefits...

... (continue full content here)

---

### Sidebar: Want to Start Like Meena? Here's Your Checklist:

✅ Udyam Registration (Free MSME portal)

✅ FSSAI License for food

✅ Local Shop License

✅ Join SHGs for peer support

✅ Apply for UYEGP / PMEGP loans

✅ Use free platforms: WhatsApp, Instagram, Meesho

✅ Attend EDII-TN training with We Can Voice for Women Foundation support.
    `,
  },
];



export default function MediaPage() {
  const [filter, setFilter] = useState<"video" | "image" | "magazine" | "blog" | "press">("video");
  const [sliderIndex, setSliderIndex] = useState<number | null>(null);
  const [playingVideoItem, setPlayingVideoItem] = useState<typeof mediaItems[0] | null>(null);
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState<number | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<typeof blogItems[0] | null>(null);



  const filteredItems = mediaItems.filter((item) => item.type === filter);

  const openImageModal = (index: number) => setSliderIndex(index);
  const closeImageModal = () => setSliderIndex(null);

  const filters: Array<[string, string]> = [
    ["video", "Videos"],
    ["image", "Images"],
    ["magazine", "Magazine"],
    ["blog", "Blog"],
    ["press", "Press"],
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-8 max-w-7xl mx-auto">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {filters.map(([id, label]) => (
          <Button
            key={id}
            size="sm"
            variant={filter === id ? "default" : "outline"}
            className={filter === id ? "bg-pink-600 hover:bg-pink-700" : ""}
            onClick={() => {
              setFilter(id as any);
              setPlayingVideoItem(null);
              setSliderIndex(null);
            }}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Video View */}
      {filter === "video" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const thumb = getYoutubeThumbnailFromUrl(item.videoUrl!);

            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="group">
                <Card className="overflow-hidden hover:shadow-2xl transition duration-300">
                  <CardContent className="p-0 relative">
                    <img src={thumb} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setPlayingVideoItem(item)}
                        className="p-3 bg-red-600 rounded-full"
                        aria-label="Play video in full screen"
                      >
                        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </CardContent>

                  {/* Add the title below the CardContent */}
                  <div className="px-4 py-2 text-center font-semibold text-gray-700">
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-pink-600"
                    >
                      {item.title}
                    </a>
                  </div>

                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Fullscreen Video Modal */}
      {playingVideoItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-6">
          <div className="relative w-[90vw] max-w-6xl h-[80vh] bg-black rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={`${convertToEmbedUrl(playingVideoItem.videoUrl)}?autoplay=1`}
              title={playingVideoItem.title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
            <button
              onClick={() => setPlayingVideoItem(null)}
              className="absolute top-4 right-4 bg-white text-red-600 rounded-full p-2 hover:bg-gray-200"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}



      {/* Images First View*/}
      {/* {filter === "image" && selectedAlbumIndex === null && (
        <div className="grid sm:grid-cols-3 gap-4">
          {imageAlbums.map((album, i) => (
            <div
              key={i}
              onClick={() => setSelectedAlbumIndex(i)}
              className="cursor-pointer rounded overflow-hidden border hover:shadow-lg"
            >
              <img src={album.cover} alt={`Album ${i + 1}`} className="w-full h-48 object-cover" />
              <div className="p-2 text-center font-medium">{album.title}</div>
            </div>
          ))}
        </div>
      )} */}
      {/* images Secon View */}
      {/* {filter === "image" && selectedAlbumIndex !== null && sliderIndex === null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <motion.button
            onClick={() => setSelectedAlbumIndex(null)}
            className="mb-6 bg-gray-300 px-5 py-2 rounded shadow-sm hover:bg-gray-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Albums
          </motion.button>

          <div className="grid sm:grid-cols-3 gap-6">
            {imageAlbums[selectedAlbumIndex].images.map((img, i) => (
              <motion.div
                key={i}
                onClick={() => setSliderIndex(i)}
                className="cursor-pointer rounded overflow-hidden border hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <img src={img} alt={`Image ${i + 1}`} className="w-full h-48 object-cover" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )} */}


      {/* Image Modal */}
      {sliderIndex !== null && selectedAlbumIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setSliderIndex(null)}
            className="absolute top-6 right-6 bg-white rounded-full p-2"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl max-h-[80vh] w-full flex items-center justify-center">
            <button
              onClick={() =>
                sliderIndex > 0 && setSliderIndex(sliderIndex - 1)
              }
              className="absolute left-0 bg-gray-800 bg-opacity-60 text-white rounded-full p-2"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <img
              src={imageAlbums[selectedAlbumIndex].images[sliderIndex]}
              alt=""
              className="max-h-[80vh] w-auto max-w-full"
            />
            <button
              onClick={() =>
                sliderIndex < imageAlbums[selectedAlbumIndex].images.length - 1 &&
                setSliderIndex(sliderIndex + 1)
              }
              className="absolute right-0 bg-gray-800 bg-opacity-60 text-white rounded-full p-2"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Blog View */}
      {/* {filter === "blog" && !selectedBlog && (
        <div className="grid md:grid-cols-2 gap-6">
          {blogItems.map((blog) => (
            <Card key={blog.id} className="hover:shadow-lg transition-shadow">
              <img
                src="/assets/images/sample2.jpg" // You can customize per blog
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{blog.excerpt}</p>
                <Button
                  variant="link"
                  className="text-pink-600 hover:underline p-0"
                  onClick={() => setSelectedBlog(blog)}
                >
                  Read More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )} */}

      {/* Blog Detail View */}
      {/* {filter === "blog" && selectedBlog && (
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            className="mb-4 text-sm text-gray-600 hover:underline"
            onClick={() => setSelectedBlog(null)}
          >
            ← Back to Blogs
          </Button>
          <h1 className="text-2xl font-bold mb-2">{selectedBlog.title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            By {selectedBlog.author} • {selectedBlog.category} • {selectedBlog.date}
          </p>
          <div className="prose prose-pink max-w-none" dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
        </div>
      )} */}



      {/* Placeholder for other sections */}
      {filter !== "video" && filter !== "image" && (
        <div className="py-32 text-center text-gray-500 italic">
          No content for <strong>{filter}</strong> yet.
        </div>
      )}
    </div>
  );
}
