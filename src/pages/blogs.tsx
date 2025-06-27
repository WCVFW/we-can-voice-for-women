'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  comingSoon?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Rural Women Leading the Change',
    description: 'Explore how women in rural India are transforming their communities through micro-initiatives and local leadership.',
    date: 'June 15, 2025',
    author: 'WCVFW Team',
    image: '/images/blog1.jpg',
    comingSoon: false,
  },
  {
    id: 2,
    title: 'Nutrition Drives in Tribal Areas',
    description: 'Learn about our outreach to promote child and maternal health through simple nutrition education.',
    date: 'July 1, 2025',
    author: 'Health Outreach Team',
    image: '/images/blog2.jpg',
    comingSoon: true,
  },
  {
    id: 3,
    title: 'Legal Aid Camps – Know Your Rights',
    description: 'We organize regular legal aid workshops to spread awareness about women’s rights and protections.',
    date: 'July 15, 2025',
    author: 'Legal Team',
    image: '/images/blog3.jpg',
    comingSoon: true,
  },
];

export default function Blogs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-pink-600 mb-4">Our Stories & Updates</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Read how we are empowering women across India through real impact stories and community updates.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-all border border-gray-100"
          >
            {/* Image */}
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}

            {/* Content */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{post.description}</p>
              <div className="text-xs text-gray-400 flex justify-between">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
              {post.comingSoon && (
                <p className="mt-3 text-pink-500 font-medium text-sm">Coming Soon...</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}