'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:9090/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert('Message sent!');
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      alert('Server error.');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-pink-50 to-white px-4 py-20 font-sans"
    >
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10 md:p-14">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-4">Contact Us</h1>
          <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto">
            Whether you're looking to volunteer, collaborate, or just say hello — we’d love to hear from you.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4 text-gray-700 text-base"
          >
            <h2 className="text-xl font-semibold text-pink-600">Reach Us At</h2>
            <p>📍 <strong>Address:</strong> 32, 1st Main Road, Ayyappa Nagar, Virugambakkam, Chennai</p>
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

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
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
