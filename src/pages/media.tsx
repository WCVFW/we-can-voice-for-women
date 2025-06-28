"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, X, BookOpen } from "lucide-react" // Added BookOpen icon for magazines

// Helper: extract YouTube video ID from full URL
function getYoutubeVideoId(url: string): string | null {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11}).*/
  const match = url.match(regExp)
  return match && match[2] ? match[2] : null
}

// Helper: get thumbnail from YouTube video ID
function getYoutubeThumbnailFromUrl(url: string): string {
  const id = getYoutubeVideoId(url)
  if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  return "/placeholder.svg?height=300&width=400"
}

// Convert full watch URL to embed URL
function convertToEmbedUrl(url: string): string | null {
  const id = getYoutubeVideoId(url)
  if (id) return `https://www.youtube.com/embed/${id}`
  return null
}

const mediaItems = [
  {
    id: 1,
    type: "video",
    title: "We Support Women Education",
    description: "Education is essential for the development of women. We can voice for women foundation support in higher education for women. Trichy student Nivenita was studied engineering in Madurai Melur with the help of We can voice for women foundation. In this video Nivenita shares her experience.",
    videoUrl: "https://www.youtube.com/watch?v=8mTxV2JBt9U",
  },
  {
    id: 2,
    type: "video",
    title: "No more Depression - Part 1",
    description: "Mrs Sripriya practising as a Psychologist for the past 6 years in chennai. Her area of specialization includes counselling, phychotherapy and Psychometric assessments for various measures of mental health. She handled the substance abused persons and conducted classes as  a support measure for their rehabilitation.",
    videoUrl: "https://www.youtube.com/watch?v=z3_48_JHUpY",
  },
  {
    id: 3,
    type: "video",
    title: "No more Depression - Part 2",
    description: "Ms. Crystal Pereira, is a Mental Health Therapist/Expressive arts Therapist, with 4 + years of experience advocating for the mental health of children, adults, LGBTQ community and facilitating various therapy groups to bring about healing using Expressive arts therapy as a specialized tool. Her area of expertise consists of counselling and dealing with; Teenagers, Adults, Relationships issues, LGBTQ community and Marital issues.",
    videoUrl: "https://www.youtube.com/watch?v=v9Oh-EX9sE4",
  },
  {
    id: 4,
    type: "video",
    title: "No more Depression - Part 3",
    description: "Dr Sangeetha has done her MD Medicine from India and her entire psychiatric training from the United Kingdom. Her medical background gives her the expertise to manage patients who have both medical and comorbid psychiatric problems in a holistic manner. Her psychiatric expertise involves the use of both medication and talking/ counselling therapy.",
    videoUrl: "https://www.youtube.com/watch?v=y-U7lw3KRJ0",
  },
  {
    id: 5,
    type: "video",
    title: "Menstrual cup A to Z in Tamil",
    description: "We at the We can voice for women firmly believe that Women Empowerment is equivalent to the substantial growth of the nation. Therefore, we strive towards providing women education, health benefits, job security, protection and empowerment. Whilst working to broaden the path towards overall development of women we would like to encourage men to join the women in voicing out for the same. We Can voice for women believes that a well rounded development of women includes Education, health benefits. We can voice for women is an organisation that is tirelessly working for the revitalization of the society.",
    videoUrl: "https://www.youtube.com/watch?v=KP6wuVAk3WM",
  },
  {
    id: 6,
    type: "video",
    title: "IAS, IPS Motivational Speech ",
    description: "IAS and IPS What do women have to do to win the exam? How to face IAS exams? What to do as an IAS? Is it difficult to become an IAS? Sun IAS Academy Associate Director Nithya Selvakumar answers the questions easily.",
    videoUrl: "https://www.youtube.com/watch?v=EYBNXErwGRA",
  },
  {
    id: 7,
    type: "image",
    // title: "Healthcare Mobile Clinic Launch",
    // description: "Launch of our new mobile healthcare units serving rural communities.",
    thumbnail: "/assets/images/sample2.jpg?height=300&width=400",
    date: "March 10, 2024",
    views: "8,230",
  },

  // Changed from audio to magazine type
  {
    id: 8,
    type: "magazine",
    title: "we can voice for women 2024 Edition",
    description: "we can voice for women.",
    thumbnail: "/assets/magazines/spring2024_cover.jpg",
    date: "March 8, 2024",
    views: "5,670",
    pages: 48,
    pdfUrl: "/assets/magazines/spring2024.pdf", // hypothetical pdf link
  },

  // New videos
  // {
  //   id: 9,
  //   type: "video",
  //   title: "Sustainability Initiatives 2025",
  //   description: "Our roadmap and achievements towards a greener future.",
  //   videoUrl: "#",
  //   date: "April 10, 2025",
  //   views: "7,400",
  // },
  // {
  //   id: 10,
  //   type: "video",
  //   title: "Tech for Good Conference Highlights",
  //   description: "Innovations and inspiring talks from the recent Tech for Good event.",
  //   videoUrl: "#",
  //   date: "May 2, 2025",
  //   views: "9,120",
  // },

  // New images
  // {
  //   id: 11,
  //   type: "image",
  //   title: "New Education Center Inauguration",
  //   description: "Photos from the inauguration of our new education center in Nairobi.",
  //   thumbnail: "/assets/images/education_center.jpg",
  //   date: "April 5, 2025",
  //   views: "6,830",
  // },
  // {
  //   id: 12,
  //   type: "image",
  //   title: "Clean Water Project Launch",
  //   description: "Images capturing the launch of our clean water initiative in rural areas.",
  //   thumbnail: "/assets/images/clean_water.jpg",
  //   date: "March 25, 2025",
  //   views: "7,550",
  // },

  // More magazines
  // {
  //   id: 13,
  //   type: "magazine",
  //   title: "we can voice for women2025 Edition",
  //   description: "Latest issue featuring new leadership stories and projects.",
  //   thumbnail: "/assets/magazines/summer2025_cover.jpg",
  //   date: "June 10, 2025",
  //   views: "4,320",
  //   pages: 52,
  //   pdfUrl: "/assets/magazines/summer2025.pdf",
  // },
  // {
  //   id: 14,
  //   type: "magazine",
  //   title: "Autumn 2025 Edition",
  //   description: "Insights on innovation and community impact.",
  //   thumbnail: "/assets/magazines/autumn2025_cover.jpg",
  //   date: "September 1, 2025",
  //   views: "3,890",
  //   pages: 50,
  //   pdfUrl: "/assets/magazines/autumn2025.pdf",
  // },
]

export default function MediaPage() {
  const [filter, setFilter] = useState("all")
  const [playingId, setPlayingId] = useState<number | null>(null)

  const filteredItems = filter === "all" ? mediaItems : mediaItems.filter((item) => item.type === filter)

  const playMedia = (id: number) => setPlayingId(id)
  const stopMedia = () => setPlayingId(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl font-bold text-gray-800 mb-6">Media Center</h1>
          <p className="text-xl text-gray-600">
            Explore our collection of inspiring stories, educational content, and impact documentation
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {["all", "video", "image", "magazine"].map((type) => (
              <Button
                key={type}
                onClick={() => {
                  setFilter(type)
                  setPlayingId(null)
                }}
                variant={filter === type ? "default" : "outline"}
                className={filter === type ? "bg-pink-600 hover:bg-pink-700" : ""}
              >
                {type === "all"
                  ? "All Media"
                  : type === "magazine"
                    ? "Magazines"
                    : `${type.charAt(0).toUpperCase() + type.slice(1)}s`}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => {
              // Thumbnail for video or image or magazine
              const thumbnailUrl =
                item.type === "video" && item.videoUrl
                  ? getYoutubeThumbnailFromUrl(item.videoUrl)
                  : item.thumbnail || "/placeholder.svg?height=300&width=400"

              const embedUrl = item.videoUrl && convertToEmbedUrl(item.videoUrl)

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                    <CardContent className="p-0">
                      {/* Media Section */}
                      <div
                        className={`relative w-full ${item.type === "image" || item.type === "magazine" ? "h-72" : "h-48"
                          }`}
                      >
                        {item.type === "video" && embedUrl && playingId === item.id ? (
                          <iframe
                            className="w-full h-full object-cover"
                            src={`${embedUrl}?autoplay=1`}
                            title={item.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <img
                            src={thumbnailUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}

                        {/* Play/Pause Button Overlay for video */}
                        {item.type === "video" && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            {playingId === item.id ? (
                              <button
                                onClick={() => setPlayingId(null)}
                                aria-label="Pause video"
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-white hover:bg-gray-200 transition-shadow shadow-md"
                              >
                                <X className="w-6 h-6 text-red-600" />
                              </button>
                            ) : (
                              <button
                                onClick={() => playMedia(item.id)}
                                aria-label="Play video"
                                className="flex items-center justify-center px-8 py-3 rounded-full bg-red-600 hover:bg-red-800 transition-shadow shadow-lg"
                                style={{ boxShadow: "0 0 15px rgba(255, 0, 0, 0.75)" }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  fill="white"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </button>
                            )}
                          </div>
                        )}

                        {/* Magazine icon overlay */}
                        {item.type === "magazine" && (
                          <a
                            href={item.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-3 right-3 bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full shadow-lg flex items-center space-x-1"
                            aria-label={`Open magazine ${item.title}`}
                          >
                            <BookOpen className="w-5 h-5" />
                            <span className="text-sm font-semibold">Read</span>
                          </a>
                        )}
                      </div>

                      {/* Text Section */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>

                        {/* Optional: Show pages only for magazine (if you want to keep pages info) */}
                        {item.type === "magazine" && item.pages && (
                          <div className="flex items-center text-gray-500 text-sm italic">
                            <BookOpen className="h-4 w-4 mr-1" />
                            {item.pages} pages
                          </div>
                        )}
                      </div>

                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
