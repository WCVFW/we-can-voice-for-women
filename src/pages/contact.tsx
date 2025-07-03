'use client';
import { motion } from 'framer-motion';
import React from 'react';

export default function Contact() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-pink-50 to-white px-4 py-20 font-sans"
    >
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10 md:p-14">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-4">Contact Us</h1>
          <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto">
            Whether you're looking to volunteer, collaborate, or just say hello — we’d love to hear from you.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4 text-gray-700 text-base"
          >
            <h2 className="text-xl font-semibold text-pink-600">Reach Us At</h2>
            <p>📍 <strong>Address:</strong> 32, 1st Main Road, Ayyappa Nagar,, Virugambakkam, Chennai, Tamil Nadu 600092</p>
            <p>📧 <strong>Email:</strong>{' '}
              <a href="mailto:support@wecvoiceforwomen.org" className="text-pink-500 hover:underline">
                support@wecvoiceforwomen.org
              </a>
            </p>
            <p>📞 <strong>Phone:</strong>{' '}
              <a href="tel:+919444888197" className="text-pink-500 hover:underline">
                +91 9444888197
              </a>
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onSubmit={(e) => {
              e.preventDefault();
              alert('Message sent! (This is a demo placeholder)');
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows={4}
                placeholder="Write your message here..."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}