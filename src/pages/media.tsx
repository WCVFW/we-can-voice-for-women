"use client";

import { useState } from "react";
import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useYouTubeVideos } from "@/hooks/useYouTubeVideos";
import type { Album } from "@/components/admin/DynamicGalleryManager"; // Make sure this path is correct


function convertToEmbedUrlFromId(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}




export default function MediaPage() {
  const [filter, setFilter] = useState<
    "video" | "Gallery" | "magazine" | "blog" | "press" | "Podcast"
  >("video");
  const [playingVideoItem, setPlayingVideoItem] = useState<{
    id: string;
    title: string;
  } | null>(null);


  // album
  const [albums, setAlbums] = useState<Album[]>([
    {
      title: "1 Lakh Candle Lights",
      cover: "/assets/images/cl/c4.jpg",
      images: ["/assets/images/cl/c1.jpg", "/assets/images/cl/c2.jpg", "/assets/images/cl/c3.jpg", "/assets/images/cl/c4.jpg", "/assets/images/cl/c5.jpg", "/assets/images/cl/c6.jpg", "/assets/images/cl/c7.jpg", "/assets/images/cl/c8.jpg", "/assets/images/cl/c9.jpg", "/assets/images/cl/c10.jpg", "/assets/images/cl/c11.jpg", "/assets/images/cl/c12.jpg", "/assets/images/cl/c13.jpg", "/assets/images/cl/c14.jpg", "/assets/images/cl/c15.jpg", "/assets/images/cl/c16.jpg", "/assets/images/cl/c17.jpg", "/assets/images/cl/c18.jpg", "/assets/images/cl/c19.jpg", "/assets/images/cl/c20.jpg", "/assets/images/cl/c21.jpg", "/assets/images/cl/c22.jpg", "/assets/images/cl/c23.jpg", "/assets/images/cl/c24.jpg", "/assets/images/cl/c25.jpg", "/assets/images/cl/c26.jpg"
      ],
    },
    {
      title: "Cancer Awareness Medical Camp",
      cover: "/assets/images/ca/ca3.jpg",
      images: ["/assets/images/ca/ca1.jpg", "/assets/images/ca/ca2.jpg", "/assets/images/ca/ca3.jpg", "/assets/images/ca/ca4.jpg", "/assets/images/ca/ca5.jpg", "/assets/images/ca/ca6.jpg"],
    },
    {
      title: "Why Are Women Slaves?",
      cover: "/assets/images/bd/bd1.jpg",
      images: [
        "/assets/images/bd/bd1.jpg",
        "/assets/images/bd/bd2.JPG",
        "/assets/images/bd/bd3.jpg",
        "/assets/images/bd/bd4.JPG",
        "/assets/images/bd/bd5.jpg",
        "/assets/images/bd/bd6.JPG",
        "/assets/images/bd/bd7.JPG",
        "/assets/images/bd/bd8.JPG",
        "/assets/images/bd/bd9.jpeg",
        "/assets/images/bd/bd10.jpg",
        "/assets/images/bd/bd11.jpg",
        "/assets/images/bd/bd12.jpg",
        "/assets/images/bd/bd13.jpg",
        "/assets/images/bd/bd14.JPG",
        "/assets/images/bd/bd15.JPG",
        "/assets/images/bd/bd16.JPG",
        "/assets/images/bd/bd17.jpg",
        "/assets/images/bd/bd18.jpg",
        "/assets/images/bd/bd19.JPG",
        "/assets/images/bd/bd20.JPG"
      ]
    }

  ]);

  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState<number | null>(
    null
  );
  const [sliderIndex, setSliderIndex] = useState<number | null>(null);
  const [albumPageIndex, setAlbumPageIndex] = useState(0);

  //  Video button
  const { videos, error } = useYouTubeVideos(30);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const indexOfLast = currentPage * videosPerPage;
  const indexOfFirst = indexOfLast - videosPerPage;
  const currentVideos = videos.slice(indexOfFirst, indexOfLast);

  // Blog
  const [selectedBlogIndex, setSelectedBlogIndex] = useState<number | null>(null);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const blogItems = [
    {
      id: 0,
      title: 'Breaking Barriers in Thanjavur: How Meena Turned Her Kitchen into a Profitable Empire',
      description:
        'From murukku to movement: how Meena built a thriving millet-based business from home and became a beacon of hope for women entrepreneurs.',
      date: 'July 9, 2025',
      author: 'Staff Writer',
      image: '/assets/images/bm1.jpg',
      coverImage: '',
      category: ['Women & Enterprise', 'Food Startups', 'Inspiration'],
      comingSoon: false,
      fullContent: (
        <>
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Breaking Barriers in Thanjavur: How Meena Turned Her Kitchen into a Profitable Empire
            </h1>
            <p className="text-sm text-gray-500 mb-2">
              By <span className="font-medium text-gray-700">Staff Writer</span> |{' '}
              <span className="text-pink-600 font-medium">Women & Enterprise</span> | July 2025
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 items-start">
            <div>
              <p className="text-lg text-gray-800 leading-relaxed mb-4">
                In a quiet lane of Thanjavur, amidst the scent of agarbatti and jasmine, lives{' '}
                <span className="font-semibold">Meena Subramaniam</span> — a homemaker turned entrepreneur
                who is now inspiring a generation of women to dream beyond the walls of their homes.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed mb-4">
                What began as a modest effort to sell her signature millet snacks has grown into{' '}
                <span className="italic font-medium">“Meena’s Millet Magic”</span>, a thriving homegrown
                brand that today serves customers across Tamil Nadu.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed mb-4">
                But Meena’s journey didn’t begin with capital or connections. It began with a question —
                one that many women quietly ask themselves: <em>“Can I start something of my own?”</em>
              </p>
            </div>
            <img
              src="/assets/images/bm5.jpg"
              alt="Meena in her kitchen"
              className="rounded-xl shadow-md border border-gray-200"
            />
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">The Spark in the Everyday</h3>
          <p className="mb-6 text-gray-800 leading-relaxed">
            Meena, 34, spent years perfecting traditional recipes passed down from her grandmother.
            Thinai murukku, kambu laddu, ragi mixture — her kitchen was always filled with the crackle
            of frying pans and the fragrance of roasted grains.
          </p>
          <p className="mb-6 text-gray-800 leading-relaxed">
            It wasn’t until her daughter brought home a school project on women-led startups that Meena
            seriously considered turning her culinary skills into a business. “It was like looking in a
            mirror,” Meena recalls. “I saw stories of women like me who started with nothing — and built
            something meaningful.”
          </p>

          <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">From Kitchen Table to Business Table</h3>
          <p className="mb-6 text-gray-800 leading-relaxed">
            With encouragement from her family, Meena took her first step by registering her business
            under the <span className="font-semibold">Udyam MSME scheme</span>, a free government
            registration that opened the door to various small business benefits.
          </p>
          <p className="mb-6 text-gray-800 leading-relaxed">
            She attended a one-day orientation by the Tamil Nadu Startup and Innovation Mission (TANSIM)
            and learned about licensing, branding, and digital marketing. Next came the{' '}
            <span className="font-semibold">FSSAI license</span> and <span className="font-semibold">GST</span> registration,
            even though her turnover didn’t require it yet.
            <br /> <em>“If I was serious, I needed to be professional from day one.”</em>
          </p>

          <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Financing the Dream — Without Breaking the Bank</h3>
          <p className="mb-6 text-gray-800 leading-relaxed">
            Initially, Meena used just <span className="font-semibold">₹20,000</span> from her savings to get
            started. She began small — promoting her snacks on WhatsApp and Instagram.
          </p>
          <p className="mb-6 text-gray-800 leading-relaxed">
            When she was ready to scale, she visited the District Industries Centre and applied under the{' '}
            <span className="italic">UYEGP scheme</span>, where she was eligible for a 25% capital subsidy.
            With a ₹3 lakh loan, she bought packaging equipment, set up hygiene facilities, and hired
            two SHG women.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 items-start">
            <img
              src="/assets/images/bm1.jpg"
              alt="Meena with her team"
              className="rounded-xl shadow-md border border-gray-200"
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Scaling with Purpose</h3>
              <p className="text-gray-800 leading-relaxed">
                As orders grew, so did Meena’s vision. Today she employs six women, supplies organic
                stores in Thanjavur and Tiruchirapalli, and even launched an online store with her
                daughter using Shopify.
                <br />
                <br />
                <em>“I still roast every batch of laddu myself,”</em> Meena smiles, “but now we deliver
                with barcoded labels and paper-based eco packaging.”
              </p>
              <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Lessons from Meena's Journey</h3>
              <ul className="list-disc list-inside ml-4 mb-10 text-gray-700 space-y-2 text-lg leading-relaxed">
                <li>Start Lean: Begin with what you have. Test your product in a small market first.</li>
                <li>
                  Use Government Schemes: Tamil Nadu offers numerous programs like UYEGP, NEEDS, and SHG
                  bank linkage support.
                </li>

              </ul>
            </div>
          </div>






          <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">The Road Ahead</h3>
          <p className="mb-6 text-gray-800 leading-relaxed">
            Meena dreams of going national — not just to expand her brand but to empower others through
            franchise models. <em>“If we can build a millet revolution from our kitchens,”</em> she says,{' '}
            <span className="font-semibold">“why not?”</span>
          </p>
          <p className="mb-6 text-gray-800 leading-relaxed">
            Her story is not just about snacks. It’s about breaking invisible walls and showing that the
            heart of Tamil Nadu’s economy might just beat strongest in the hands of its women.
          </p>

          <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Want to Start Like Meena? Here's Your Checklist</h3>
          <ul className="list-disc list-inside ml-4 mb-10 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>✅ Udyam Registration (Free MSME portal)</li>
            <li>✅ FSSAI License for food</li>
            <li>✅ Local Shop License</li>
            <li>✅ Join SHGs for peer support</li>
            <li>✅ Apply for UYEGP / PMEGP loans</li>
            <li>✅ Use free platforms: WhatsApp, Instagram, Meesho</li>
            <li>✅ Attend EDII-TN training with We Can Voice for Women Foundation support</li>
          </ul>
        </>
      ),
    },

    {
      id: 1, // Assuming this would be the next ID after 0
      title: 'Starting a Business for Women in Tamil Nadu: A Complete Guide',
      description:
        'A comprehensive guide for women entrepreneurs in Tamil Nadu, covering registrations, government schemes, funding options, and profitable business ideas.',
      date: 'July 9, 2025',
      author: 'Staff Writer',
      image: '/assets/images/bm6.jpg', // Placeholder image, you might need to create this
      coverImage: '',
      category: ['Women & Enterprise', 'Business Guide', 'Startups'],
      comingSoon: false,
      fullContent: (
        <>
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              🌟 Starting a Business for Women in Tamil Nadu: A Complete Guide
            </h1>
            <p className="text-sm text-gray-500 mb-2">
              By <span className="font-medium text-gray-700">Staff Writer</span> |{' '}
              <span className="text-pink-600 font-medium">Women & Enterprise</span> | July 2025
            </p>
          </div>

          <p className="text-lg text-gray-800 leading-relaxed mb-6">
            Tamil Nadu has emerged as one of the leading states in India, promoting women entrepreneurship,
            offering a variety of support schemes, low-interest loans, and a vibrant market ecosystem.
            Whether you want to start small or scale big, the state offers ample opportunity.
          </p>

          {/* --- */}
          <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
            ✅ Basic Requirements to Start a Business
          </h2>
          <ul className="list-disc list-inside ml-4 mb-6 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>
              <strong>Business Idea & Plan:</strong> Choose a business that aligns with your skills,
              interest, and market demand. Draft a business plan covering products/services, target
              market, budget, location, and marketing strategy.
            </li>
            <li>
              <strong>Capital:</strong> Decide how much initial capital is needed (can start with
              personal savings, government schemes, or bank loans).
            </li>
            <li>
              <strong>Location:</strong> Decide whether you will operate from home, a rented shop, or
              online.
            </li>
            <li>
              <strong>Legal Structure:</strong> Choose the right legal form:
              <ul className="list-circle list-inside ml-8 mt-1 space-y-1">
                <li>Sole Proprietorship (ideal for small businesses)</li>
                <li>Partnership or LLP</li>
                <li>Private Limited Company</li>
                <li>Self Help Group (SHG) based businesses</li>
              </ul>
            </li>
          </ul>

          {/* --- */}
          <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
            📝 Mandatory Registrations
          </h2>
          <p className="mb-4 text-gray-800 leading-relaxed">
            Here are the common registrations required:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Registration
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-gray-800">Udyam Registration (MSME)</td>
                  <td className="py-4 px-6 text-gray-800">
                    Mandatory for small businesses; enables access to schemes. Free registration on{' '}
                    <a
                      href="https://udyamregistration.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      udyamregistration.gov.in
                    </a>
                    .
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">PAN & TAN</td>
                  <td className="py-4 px-6 text-gray-800">
                    Required for opening business bank accounts and tax filings.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">GST Registration</td>
                  <td className="py-4 px-6 text-gray-800">
                    Required if turnover exceeds ₹40 lakh (₹20 lakh for service businesses). Optional
                    for lower turnover.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Shops & Establishment License</td>
                  <td className="py-4 px-6 text-gray-800">
                    Mandatory if you operate a physical shop or office. Obtain from the local
                    municipality.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">FSSAI License</td>
                  <td className="py-4 px-6 text-gray-800">
                    Mandatory for food-related businesses.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Trade License</td>
                  <td className="py-4 px-6 text-gray-800">Issued by local municipal authorities.</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Professional Tax Registration</td>
                  <td className="py-4 px-6 text-gray-800">If you have employees.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* --- */}
          <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
            💰 Government Assistance & Business Loans
          </h2>
          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">
            1. Tamil Nadu State Government Schemes
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Scheme
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Benefits
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-gray-800">
                    Tamil Nadu Startup and Innovation Mission (TANSIM)
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    Support for startups including mentoring and funding.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">
                    Unemployed Youth Employment Generation Programme (UYEGP)
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    Loan up to ₹10 lakh with 25% subsidy for women.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">
                    New Entrepreneur-cum-Enterprise Development Scheme (NEEDS)
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    For graduates (21–35 years). Loan up to ₹1 crore with 25% subsidy and training
                    support.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">
                    Self Help Group (SHG) Loans through Tamil Nadu Corporation for Development of Women
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    Easy loans to SHGs for starting businesses.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">
            2. Central Government Schemes for Women
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Scheme
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-gray-800">Stand Up India</td>
                  <td className="py-4 px-6 text-gray-800">
                    Loan from ₹10 lakh to ₹1 crore for women entrepreneurs from banks.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Mudra Loan (PMMY)</td>
                  <td className="py-4 px-6 text-gray-800">
                    Up to ₹10 lakh under Shishu, Kishore, and Tarun categories. No collateral required.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Mahila Coir Yojana</td>
                  <td className="py-4 px-6 text-gray-800">
                    Financial support for women in coir industry.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">NSIC Women Scheme</td>
                  <td className="py-4 px-6 text-gray-800">
                    Marketing and raw material assistance for MSMEs owned by women.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* --- */}
          <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
            💡 Is It Possible to Start a Business Without a Loan?
          </h2>
          <p className="mb-4 text-gray-800 leading-relaxed">
            Yes! Many women entrepreneurs begin without loans by adopting the following strategies:
          </p>
          <ul className="list-disc list-inside ml-4 mb-6 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>
              <strong>Start Small (Low Capital):</strong> Begin from home or online. Use personal
              savings or borrow from family.
            </li>
            <li>
              <strong>Crowdfunding:</strong> Raise funds through platforms like Ketto or Milaap for
              socially impactful ideas.
            </li>
            <li>
              <strong>Partnership with Friends/Family:</strong> Share investment and profits.
            </li>
            <li>
              <strong>Use SHG Platform:</strong> Women Self Help Groups in Tamil Nadu provide internal
              loaning and group savings.
            </li>
            <li>
              <strong>Preorders and Advance Payments:</strong> Sell via Instagram/WhatsApp and take
              advance payments before producing goods.
            </li>
          </ul>

          {/* --- */}
          <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
            🏆 Most Profitable Business Ideas for Women in Tamil Nadu
          </h2>
          <p className="mb-4 text-gray-800 leading-relaxed">
            Here are some high-profit, low-investment business ideas ideal for women in Tamil Nadu:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Business Type
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Estimated Investment
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Profit Potential
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-gray-800">Homemade Food / Tiffin Services</td>
                  <td className="py-4 px-6 text-gray-800">₹10,000–₹50,000</td>
                  <td className="py-4 px-6 text-gray-800">High (Daily income)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Tailoring & Boutique</td>
                  <td className="py-4 px-6 text-gray-800">₹25,000–₹1 lakh</td>
                  <td className="py-4 px-6 text-gray-800">High</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">
                    Handmade Products (jewelry, candles, soaps)
                  </td>
                  <td className="py-4 px-6 text-gray-800">₹10,000–₹30,000</td>
                  <td className="py-4 px-6 text-gray-800">Medium to High</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Beauty Parlour / Home Salon</td>
                  <td className="py-4 px-6 text-gray-800">₹50,000–₹2 lakh</td>
                  <td className="py-4 px-6 text-gray-800">Very High</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Online Reselling (Meesho, Amazon)</td>
                  <td className="py-4 px-6 text-gray-800">₹0–₹20,000</td>
                  <td className="py-4 px-6 text-gray-800">High (No inventory needed)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">
                    Digital Marketing Services / Content Writing
                  </td>
                  <td className="py-4 px-6 text-gray-800">₹10,000</td>
                  <td className="py-4 px-6 text-gray-800">High (Service based)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Daycare or Playschool</td>
                  <td className="py-4 px-6 text-gray-800">₹1–3 lakh</td>
                  <td className="py-4 px-6 text-gray-800">Medium</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">
                    Millet-based snacks / Organic Food Business
                  </td>
                  <td className="py-4 px-6 text-gray-800">₹30,000+</td>
                  <td className="py-4 px-6 text-gray-800">High</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">
                    Agro-based or Herbal Farming (e.g., Aloe Vera, Mushroom)
                  </td>
                  <td className="py-4 px-6 text-gray-800">Varies</td>
                  <td className="py-4 px-6 text-gray-800">Very High if scaled</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* --- */}
          <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
            🛠 Step-by-Step Summary for Starting a Business in Tamil Nadu
          </h2>
          <ul className="list-disc list-inside ml-4 mb-6 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>Choose your business idea</li>
            <li>Make a business plan</li>
            <li>Get Udyam and other necessary registrations</li>
            <li>Open a current account in your business name</li>
            <li>Apply for subsidies/loans (if needed)</li>
            <li>Market your business (use social media, word of mouth, local networks)</li>
            <li>Scale gradually and track profits</li>
          </ul>

          {/* --- */}
          <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
            🤝 Final Tips for Women Entrepreneurs
          </h2>
          <ul className="list-disc list-inside ml-4 mb-10 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>Start small but be consistent</li>
            <li>Use government training programs (e.g., EDII-TN)</li>
            <li>Join women entrepreneur groups for support</li>
            <li>Use the Tamil Nadu Industrial Guidance Bureau for queries</li>
          </ul>
        </>
      ),
    },
    {
      id: 2,
      title: 'A Complete Guide for Pregnant Women and New Mothers',
      description:
        'From conception to the first year of your baby’s life — essential tips on nutrition, safe exercises, delivery prep, and newborn care.',
      date: 'July 2025',
      author: 'Staff Writer',
      image: '/assets/images/bm3.jpg',
      coverImage: '/images/pregnancy-cover.jpg', // You might want to update this if you have a specific cover image for this post
      comingSoon: false,
      fullContent: (
        <>
          <p className="mb-6 text-lg leading-relaxed text-gray-800 tracking-wide">
            Pregnancy is a transformative journey in a woman’s life, both physically and emotionally.
            From the moment a woman conceives until the baby is born and beyond, she needs to follow
            healthy practices to ensure both her and the baby’s well-being. This guide outlines
            essential practices, foods, exercises, and guidelines for pregnant women and new mothers,
            along with appropriate examples.
          </p>

          {/* --- */}
          <h3 className="font-bold text-2xl text-pink-700 mt-12 mb-6 border-b-2 border-pink-500 pb-2">
            🍼 Part 1: From the First Month to Childbirth – What Should Pregnant Women Do?
          </h3>

          <h4 className="font-semibold text-xl text-pink-600 mt-6 mb-3">
            1.1 Monthly Guidelines During Pregnancy
          </h4>
          <p className="mb-3 font-semibold text-pink-600">➤ First Trimester (1–3 Months):</p>
          <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>
              Visit a doctor immediately after confirming pregnancy.
            </li>
            <li>
              Start **folic acid supplements** (400–600 mcg/day) to support fetal brain and spinal
              cord development.
            </li>
            <li>
              Deal with symptoms like **morning sickness, nausea, fatigue** by:
              <ul className="list-circle list-inside ml-8 mt-1 space-y-1">
                <li>Eating small, frequent meals</li>
                <li>Staying hydrated</li>
                <li>Getting enough rest</li>
              </ul>
            </li>
            <li>
              <em className="italic text-pink-600">Example:</em> Riya felt dizzy and nauseated in her
              2nd month, but sipping warm ginger water and eating dry toast in the morning helped her
              manage better.
            </li>
          </ul>

          <p className="mb-3 font-semibold text-pink-600">➤ Second Trimester (4–6 Months):</p>
          <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>
              Energy levels improve; appetite increases.
            </li>
            <li>
              Include **iron-rich and calcium-rich foods** like spinach, dates, milk, and eggs.
            </li>
            <li>
              Go for routine **ultrasound and blood tests**.
            </li>
            <li>
              Start **mild exercises** and walking.
            </li>
          </ul>

          <p className="mb-3 font-semibold text-pink-600">➤ Third Trimester (7–9 Months):</p>
          <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>
              Baby gains weight rapidly, so **nutrient-dense foods** are crucial.
            </li>
            <li>
              Monitor **blood pressure** and signs of **gestational diabetes**.
            </li>
            <li>
              Prepare for delivery by:
              <ul className="list-circle list-inside ml-8 mt-1 space-y-1">
                <li>Practicing relaxation techniques</li>
                <li>Attending antenatal classes</li>
                <li>Doing pelvic floor exercises</li>
              </ul>
            </li>
            <li>
              <em className="italic text-pink-600">Example:</em> In her 8th month, Meena practiced
              breathing exercises and squats with her physiotherapist, which helped her have a normal
              delivery.
            </li>
          </ul>

          <h4 className="font-semibold text-xl text-pink-600 mt-8 mb-3">
            1.2 Recommended Foods for Pregnant Women
          </h4>
          <p className="mb-4 text-gray-800 leading-relaxed">
            Maintaining a balanced diet is essential for both mother and baby.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Food Group
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Examples
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Benefits
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-gray-800">Whole Grains</td>
                  <td className="py-4 px-6 text-gray-800">Brown rice, oats, quinoa</td>
                  <td className="py-4 px-6 text-gray-800">Energy, fiber</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Vegetables</td>
                  <td className="py-4 px-6 text-gray-800">Spinach, broccoli, carrots</td>
                  <td className="py-4 px-6 text-gray-800">Vitamins A, C, iron</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Fruits</td>
                  <td className="py-4 px-6 text-gray-800">Apples, bananas, oranges, pomegranate</td>
                  <td className="py-4 px-6 text-gray-800">Antioxidants, hydration</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Proteins</td>
                  <td className="py-4 px-6 text-gray-800">Eggs, dal, lean meats, paneer</td>
                  <td className="py-4 px-6 text-gray-800">Baby’s growth</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Dairy</td>
                  <td className="py-4 px-6 text-gray-800">Milk, curd, cheese</td>
                  <td className="py-4 px-6 text-gray-800">Calcium, Vitamin D</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Healthy Fats</td>
                  <td className="py-4 px-6 text-gray-800">Nuts, ghee (moderate), avocado</td>
                  <td className="py-4 px-6 text-gray-800">Brain development</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-6 font-semibold text-pink-600">
            Stay Hydrated: Drink at least **2.5–3 litres of water** per day.
          </p>

          <h4 className="font-semibold text-xl text-pink-600 mt-8 mb-3">
            1.3 Foods to Avoid During Pregnancy
          </h4>
          <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>**Raw or undercooked meat, eggs, and seafood**</li>
            <li>**High-mercury fish** (e.g., shark, swordfish)</li>
            <li>**Unpasteurized dairy**</li>
            <li>
              Excess **caffeine** (limit to 200mg/day)
            </li>
            <li>**Alcohol and smoking** (strictly avoid)</li>
            <li>
              **Tip:** Avoid **papaya and pineapple** in early pregnancy as they may trigger uterine
              contractions (consult your doctor).
            </li>
          </ul>

          <h4 className="font-semibold text-xl text-pink-600 mt-8 mb-3">
            1.4 Exercises Safe for Pregnant Women
          </h4>
          <p className="mb-4 text-gray-800 leading-relaxed">
            Regular, moderate exercise can help manage weight, improve mood, and prepare for labor.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Exercise Type
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Examples
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Benefits
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-gray-800">Walking</td>
                  <td className="py-4 px-6 text-gray-800">20–30 min daily</td>
                  <td className="py-4 px-6 text-gray-800">Improves blood circulation</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Prenatal Yoga</td>
                  <td className="py-4 px-6 text-gray-800">Cat-cow, butterfly pose</td>
                  <td className="py-4 px-6 text-gray-800">Flexibility, back pain relief</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Breathing exercises</td>
                  <td className="py-4 px-6 text-gray-800">Deep breathing, pranayama</td>
                  <td className="py-4 px-6 text-gray-800">Calms the nervous system</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Kegel exercises</td>
                  <td className="py-4 px-6 text-gray-800">Pelvic muscle strengthening</td>
                  <td className="py-4 px-6 text-gray-800">Prepares for labor</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-10 text-gray-700 leading-relaxed font-semibold">
            **Important:** Always consult your doctor before starting any new exercise during pregnancy.
          </p>

          <h4 className="font-semibold text-xl text-pink-600 mt-8 mb-3">
            1.5 Tips for a Healthy (Normal) Delivery
          </h4>
          <ul className="list-disc list-inside mb-10 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>Stay active with **daily walking and squats** (if approved).</li>
            <li>
              Eat warm, nourishing foods like **garlic soup, ghee rice, and drumstick leaf curry**.
            </li>
            <li>
              Stay mentally calm with **meditation** or reading.
            </li>
            <li>
              Practice **labour breathing techniques** (e.g., Lamaze).
            </li>
            <li>Avoid **processed/junk food** in the final trimester.</li>
            <li>
              **Note:** A relaxed, confident mindset helps in a smooth labour. Support from family plays
              a key role.
            </li>
          </ul>

          <img
            src="/assets/images/bm3.jpg"
            alt="Laddu, ajwain water, and khichdi for new moms"
            className="max-w-md w-full my-10 rounded-2xl shadow-xl border-4 border-pink-200 mx-auto"
          />

          {/* --- */}
          <h3 className="font-bold text-2xl text-pink-700 mt-12 mb-6 border-b-2 border-pink-500 pb-2">
            🤱 Part 2: After Childbirth – Nutrition for New Mothers
          </h3>

          <h4 className="font-semibold text-xl text-pink-600 mt-6 mb-3">
            2.1 Foods That Boost Recovery and Milk Production
          </h4>
          <p className="mb-4 text-gray-800 leading-relaxed">
            Proper nutrition postpartum is crucial for recovery and supporting breastfeeding.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Food
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-gray-800">Fenugreek (methi)</td>
                  <td className="py-4 px-6 text-gray-800">Boosts milk supply</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Garlic</td>
                  <td className="py-4 px-6 text-gray-800">Anti-inflammatory, improves digestion</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Ragi (finger millet) porridge</td>
                  <td className="py-4 px-6 text-gray-800">Calcium & iron rich</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Moong dal khichdi</td>
                  <td className="py-4 px-6 text-gray-800">Light, easy to digest</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Dry fruit laddoos</td>
                  <td className="py-4 px-6 text-gray-800">Energy booster</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Ajwain (carom seeds) water</td>
                  <td className="py-4 px-6 text-gray-800">Relieves gas, improves lactation</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Green leafy vegetables</td>
                  <td className="py-4 px-6 text-gray-800">Iron and fiber</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className="list-disc list-inside mb-10 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>
              <em className="italic text-pink-600">Example:</em> After delivery, Priya drank ajwain
              water every morning and ate ghee-roasted dry fruit laddoos, which helped her recover and
              nurse effectively.
            </li>
          </ul>

          <h4 className="font-semibold text-xl text-pink-600 mt-6 mb-3">
            2.2 Foods to Avoid After Delivery
          </h4>
          <ul className="list-disc list-inside mb-10 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>**Cold foods and drinks** (e.g., ice cream, aerated sodas)</li>
            <li>**Excessively spicy or oily dishes**</li>
            <li>**Caffeine, alcohol, and tobacco**</li>
            <li>
              **Heavy or fried foods** (can cause indigestion or colic in the baby)
            </li>
            <li>
              **Cultural Note:** In many Indian households, new mothers are given warm, home-cooked
              meals made with desi ghee and medicinal spices to aid recovery.
            </li>
          </ul>

          {/* --- */}
          <h3 className="font-bold text-2xl text-pink-700 mt-12 mb-6 border-b-2 border-pink-500 pb-2">
            👶 Part 3: Feeding the Baby – Beyond Breast Milk
          </h3>

          <h4 className="font-semibold text-xl text-pink-600 mt-6 mb-3">
            3.1 0–6 Months: Exclusive Breastfeeding
          </h4>
          <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>
              No water, honey, or formula unless prescribed by a **doctor**.
            </li>
            <li>
              **Breast milk** provides all nutrients, antibodies, and hydration.
            </li>
            <li>
              Feed on demand – **8 to 12 times/day**.
            </li>
            <li>
              **Tip:** Hold the baby upright after feeding to avoid **colic**.
            </li>
          </ul>

          <h4 className="font-semibold text-xl text-pink-600 mt-6 mb-3">
            3.2 6 Months Onward: Introduce Complementary Foods
          </h4>
          <p className="mb-3 text-gray-800 text-lg leading-relaxed">
            Start with 1 new food at a time and wait 3 days before introducing the next. Begin with
            smooth, mashed, or strained foods.
          </p>
          <div className="overflow-x-auto mb-10">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Food Suggestions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-gray-800">6–7 months</td>
                  <td className="py-4 px-6 text-gray-800">
                    Rice water, mashed banana, boiled & mashed carrots or potatoes
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">7–8 months</td>
                  <td className="py-4 px-6 text-gray-800">Suji kheer (semolina), mashed dal with ghee, apple puree</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">8–10 months</td>
                  <td className="py-4 px-6 text-gray-800">Soft idli, khichdi with vegetables, curd</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">10–12 months</td>
                  <td className="py-4 px-6 text-gray-800">Soft chapati soaked in dal, small pieces of soft fruits</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className="list-disc list-inside mb-10 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>
              **Avoid:** Salt, sugar, honey (until 1 year), cow's milk (until 1 year), nuts (risk of
              choking), and processed foods.
            </li>
            <li>
              **Tip:** Watch for signs of **allergies** (rashes, vomiting, diarrhea) when introducing
              new foods.
            </li>
          </ul>

          <img
            src="/assets/images/bm3.jpg"
            alt="Indian weaning food options for babies"
            className="max-w-md w-full my-10 rounded-2xl shadow-xl border-4 border-pink-200 mx-auto"
          />

          {/* --- */}
          <h3 className="font-bold text-2xl text-pink-700 mt-12 mb-4 border-b-2 border-pink-500 pb-2">
            Conclusion
          </h3>
          <p className="mb-6 text-lg font-medium text-pink-700 leading-relaxed">
            Motherhood begins not at birth but at conception. With mindful food choices, daily
            movement, emotional balance, and loving care, a woman nurtures not only her baby’s life but
            her transformation as a mother. The postnatal phase is equally critical — a time for
            recovery, bonding, and nourishment.
          </p>
          <p className="mb-10 text-lg font-medium text-pink-700 leading-relaxed">
            Every stage — from a mother’s morning sickness to her baby’s first spoonful of food — is a
            chapter in a beautiful story. By following the right practices, this journey becomes safer,
            smoother, and more enjoyable.
          </p>
        </>
      ),
    },
    {
      id: 3,
      title: 'Women’s Rights and Legal Protections in India: A Complete Overview',
      description:
        'Explore landmark laws that protect and empower women in India, including inheritance rights, workplace safety (POSH), and domestic violence safeguards.',
      date: 'July 2025',
      author: 'Staff Writer',
      image: '/assets/images/bm4.jpg',
      coverImage: '/images/womens-rights-cover.jpg',
      comingSoon: false,
      fullContent: (
        <>
          <p className="mb-6 text-lg leading-relaxed text-gray-800 tracking-wide">
            India, as a constitutional democracy, guarantees equality and protection for all its citizens, irrespective of gender. Over the years, the country has enacted several progressive laws aimed at empowering women and protecting them from discrimination and abuse. This article explores key legislations that safeguard women's rights in India, focusing on property rights, workplace safety, and protection from domestic violence.
          </p>

          <h3 className="font-bold text-2xl text-pink-700 mt-12 mb-6 border-b-2 border-pink-500 pb-2">
            1. Equal Property Rights for Women in India
          </h3>

          <p className="mb-4 text-lg text-pink-600 font-semibold">
            <strong>The Hindu Succession (Amendment) Act, 2005</strong> marked a major milestone for gender equality in India. It granted daughters the same rights as sons in the ancestral property of a Hindu Undivided Family (HUF).
          </p>

          <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>Daughters now have equal <strong>coparcenary rights</strong>.</li>
            <li>These rights are acquired by <strong>birth</strong>, not dependent on marriage or father’s consent.</li>
            <li>Applies to daughters born before or after the 2005 amendment, if the father was alive as of Sept 9, 2005.</li>
          </ul>

          <p className="mb-6 text-sm italic text-pink-600">
            Legal Reference: Hindu Succession Act, 1956 (Amended by Act 39 of 2005)
          </p>

          <p className="mb-6 text-lg leading-relaxed text-gray-800">
            This law ensured daughters are no longer denied their rightful inheritance, significantly enhancing women’s financial autonomy and legal status.
          </p>

          <h3 className="font-bold text-2xl text-pink-700 mt-12 mb-6 border-b-2 border-pink-500 pb-2">
            2. Protection of Women from Sexual Harassment at Workplace (POSH Act), 2013
          </h3>

          <p className="mb-4 text-lg text-pink-600 font-semibold">
            The <strong>POSH Act</strong> ensures a safe, harassment-free work environment for women. It defines sexual harassment broadly and requires organizations to take active steps to prevent and redress it.
          </p>

          <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>Sexual harassment includes verbal, physical, or visual conduct of a sexual nature.</li>
            <li>Mandatory formation of an <strong>Internal Complaints Committee (ICC)</strong> in organizations with 10+ employees.</li>
            <li>Inquiry must be completed within 90 days.</li>
            <li>Covers both organized and unorganized sectors, including domestic workers.</li>
          </ul>

          <p className="mb-6 text-sm italic text-pink-600">
            Legal Reference: Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013
          </p>

          <p className="mb-6 text-lg leading-relaxed text-gray-800">
            POSH empowers women to stand up against harassment and holds employers accountable, thereby promoting equality at work.
          </p>

          <h3 className="font-bold text-2xl text-pink-700 mt-12 mb-6 border-b-2 border-pink-500 pb-2">
            3. Protection of Women from Domestic Violence Act (PWDVA), 2005
          </h3>

          <p className="mb-4 text-lg text-pink-600 font-semibold">
            Domestic violence includes not only physical harm but also emotional, sexual, and financial abuse. The <strong>PWDVA</strong> is a civil law offering immediate protection and legal remedies to women in abusive domestic environments.
          </p>

          <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>Applies to wives, live-in partners, mothers, sisters, and female relatives in domestic settings.</li>
            <li>Recognizes multiple forms of abuse: physical, sexual, verbal, emotional, and economic.</li>
            <li>Allows for protection orders, residence rights, monetary relief, and child custody.</li>
          </ul>

          <p className="mb-6 text-sm italic text-pink-600">
            Legal Reference: Protection of Women from Domestic Violence Act, 2005
          </p>

          <p className="mb-6 text-lg leading-relaxed text-gray-800">
            Victims can approach a Magistrate, Protection Officer, or even police. The Act does not require filing a criminal FIR to seek help, enabling faster civil relief and safety.
          </p>

          <h3 className="font-bold text-2xl text-pink-700 mt-12 mb-6 border-b-2 border-pink-500 pb-2">
            Other Important Legal Protections for Women
          </h3>

          <ul className="list-disc list-inside mb-10 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li><strong>Dowry Prohibition Act, 1961</strong> – Bans giving or taking of dowry; violators face penalties.</li>
            <li><strong>Maternity Benefit (Amendment) Act, 2017</strong> – Offers 26 weeks of paid leave for mothers.</li>
            <li><strong>Equal Remuneration Act, 1976</strong> – Mandates equal pay for equal work.</li>
            <li><strong>Prohibition of Child Marriage Act, 2006</strong> – Declares child marriage voidable and penalizes the guilty.</li>
            <li><strong>Medical Termination of Pregnancy (Amendment) Act, 2021</strong> – Allows abortion up to 24 weeks in specific cases.</li>
          </ul>

          <h3 className="font-bold text-2xl text-pink-700 mt-12 mb-4 border-b-2 border-pink-500 pb-2">
            Conclusion
          </h3>
          <p className="mb-6 text-lg font-medium text-pink-700 leading-relaxed">
            India has made tremendous strides in legally protecting women's rights, but awareness and enforcement remain key challenges. Laws like the Hindu Succession Amendment, POSH Act, and PWDVA offer powerful tools — but they only work when women know their rights and society supports their enforcement.
          </p>
          <p className="mb-10 text-lg font-medium text-pink-700 leading-relaxed">
            Legal empowerment must go hand in hand with cultural change, access to justice, and education to truly build a gender-equal India.
          </p>

          <h3 className="font-bold text-2xl text-pink-700 mt-12 mb-6 border-b-2 border-pink-500 pb-2">
            📚 References
          </h3>
          <ul className="list-disc list-inside mb-12 text-gray-700 space-y-2 text-lg leading-relaxed">
            <li>The Hindu Succession (Amendment) Act, 2005</li>
            <li>POSH Act, 2013 – Govt. Guidelines and FAQs</li>
            <li>Protection of Women from Domestic Violence Act, 2005</li>
            <li>National Commission for Women: Laws & Resources</li>
          </ul>
        </>
      ),
    },

  ];



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
                  className="w-full h-64 object-cover"
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
        <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto pt-24 pb-12 flex flex-col items-center px-4">
          {/* Title */}
          <h3 className="text-2xl text-white mb-6 font-semibold text-center">
            {albums[selectedAlbumIndex].title}
          </h3>

          {/* Image Carousel with Arrows */}
          <div className="relative w-full max-w-5xl flex items-center justify-center mb-8">
            {/* Left Arrow */}
            <button
              className="absolute left-0 z-10 text-white text-4xl p-2 bg-black/50 hover:bg-black/70 rounded-full"
              onClick={() =>
                setAlbumPageIndex((prev) =>
                  prev === 0 ? Math.floor((albums[selectedAlbumIndex].images.length - 1) / 3) : prev - 1
                )
              }
            >
              ‹
            </button>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-10">
              {albums[selectedAlbumIndex].images
                .slice(albumPageIndex * 3, albumPageIndex * 3 + 3)
                .map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Photo ${albumPageIndex * 3 + idx + 1}`}
                    className="w-full h-72 object-cover rounded-xl shadow-lg cursor-pointer hover:scale-105 transition"
                    onClick={() =>
                      setSliderIndex(albumPageIndex * 3 + idx)
                    }
                  />
                ))}
            </div>

            {/* Right Arrow */}
            <button
              className="absolute right-0 z-10 text-white text-4xl p-2 bg-black/50 hover:bg-black/70 rounded-full"
              onClick={() =>
                setAlbumPageIndex((prev) =>
                  (prev + 1) * 3 >= albums[selectedAlbumIndex].images.length ? 0 : prev + 1
                )
              }
            >
              ›
            </button>
          </div>

          {/* Close Button */}
          <button
            className="mb-10 px-4 py-2 bg-pink-600 text-white rounded"
            onClick={() => {
              setSelectedAlbumIndex(null);
              setSliderIndex(null);
              setAlbumPageIndex(0); // Reset on close
            }}
          >
            Close
          </button>
        </div>
      )}

      {/* ---------------- FULLSCREEN SLIDER ---------------- */}
      {sliderIndex !== null && selectedAlbumIndex !== null && (
        <div className="fixed inset-0 bg-black z-[60] flex flex-col justify-center items-center px-6 py-8">
          {/* Previous Button */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl p-2 bg-black/50 hover:bg-black/70 rounded-full"
            onClick={() =>
              setSliderIndex((prev) =>
                prev === 0
                  ? albums[selectedAlbumIndex].images.length - 1
                  : (prev ?? 1) - 1
              )
            }
          >
            ‹
          </button>

          {/* Image */}
          <img
            src={albums[selectedAlbumIndex].images[sliderIndex]}
            alt={`Slide ${sliderIndex + 1}`}
            className="max-h-[80vh] object-contain rounded shadow-lg"
          />

          {/* Next Button */}
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl p-2 bg-black/50 hover:bg-black/70 rounded-full"
            onClick={() =>
              setSliderIndex((prev) =>
                prev === albums[selectedAlbumIndex].images.length - 1
                  ? 0
                  : (prev ?? 0) + 1
              )
            }
          >
            ›
          </button>

          {/* Close Button below image */}
          <button
            className="mt-6 px-6 py-2 bg-pink-600 text-white rounded "
            onClick={() => setSliderIndex(null)}
          >
            Close
          </button>
        </div>
      )}


      {/* ---------------- BLOG SECTION ---------------- */}
      {filter === "blog" && (
        <div className="my-10 bg-pink-50 min-h-screen px-6 py-12 rounded-lg shadow-md">
          {/* Main Blog + Smaller Blogs Layout */}
          <div className="max-w-7xl mx-auto flex flex-col gap-10">

            {/* Main Blog */}
            {blogItems[0] && (
              <div
                className="flex items-center cursor-pointer p-6 rounded hover:bg-white transition max-w-4xl mx-auto"
                onClick={() => {
                  setSelectedBlogIndex(0);
                  setFullscreen(true);
                }}
              >
                {/* Image container - increased width */}
                <div className="w-[400px] h-68 flex-shrink-0 rounded overflow-hidden">
                  <img
                    src={blogItems[0].image}
                    alt={blogItems[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title container */}
                <div className="flex-grow ml-8">
                  <h2
                    className="text-lg font-normal text-gray-900 leading-snug overflow-hidden"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      wordBreak: 'break-word',
                    }}
                  >
                    {blogItems[0].title}
                  </h2>
                </div>
              </div>
            )}

            {/* Smaller Blogs Grid (3 items) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {blogItems.slice(1, 4).map((blog, i) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl transition overflow-hidden flex flex-col"
                  onClick={() => {
                    setSelectedBlogIndex(i + 1);
                    setFullscreen(true);
                  }}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-3 text-pink-700 font-semibold text-center flex-grow flex items-center justify-center">
                    {blog.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fullscreen View */}
          {fullscreen && selectedBlogIndex !== null && (
            <div className="fixed inset-0 z-[60] pt-24 bg-white flex flex-col overflow-auto">
              {/* Content container fills entire screen */}
              <div className="relative z-10 w-full h-full p-6 flex flex-col">
                {/* Blog Title */}


                {/* Blog Content */}
                <div className="flex-grow overflow-y-auto mb-6">
                  {blogItems[selectedBlogIndex].fullContent}
                </div>

                {/* Buttons at the Bottom */}
                <div className="flex justify-end gap-4 mt-auto">
                  <button
                    onClick={() => setFullscreen(false)}
                    className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBlogIndex(null);
                      setFullscreen(false);
                    }}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}



    </div>
  );

}
