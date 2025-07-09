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
      const res = await fetch('http://16.171.19.4:9090/api/contact', {
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
      className="bg-gradient-to-b from-pink-50 to-white px-4 pt-32 pb-20 font-sans"
    >
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg px-6 sm:px-10 lg:px-16 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-4">Contact Us</h1>
          <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto">
            Whether you're looking to volunteer, collaborate, or just say hello — we’d love to hear from you.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-xl p-4 sm:p-6 space-y-6 text-gray-700 text-base"
          >
            {/* Google Map Embed */}
            {/* <div className="w-full h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-md">
              <iframe
                title="WCVFW Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.1981583347587!2d80.19293781523865!3d13.042676416378328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526141f98d9ae7%3A0xe4c0b6e0e0c13be5!2s32%2C%201st%20Main%20Rd%2C%20Ayyappa%20Nagar%2C%20Virugambakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600092%2C%20India!5e0!3m2!1sen!2sin!4v1717748800000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div> */}

            {/* Contact Info Card */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-pink-600">Reach Us At</h2>
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
            </div>
          </motion.div>
          {/* Contact Form */}
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
