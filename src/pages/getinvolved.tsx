'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

export default function GetInvolved() {
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const interest = form.interest.value;
    const phone = form.phone.value;

    try {
      const response = await fetch('http://localhost:8080/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, interest, phone }),
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error(error);
      setFormStatus('error');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-pink-50 to-white px-4 py-16 font-sans"
    >
      <div className="max-w-6xl mx-auto">
        {/* 🌟 Hero Content */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-4">
            Join Our Mission — Get Involved
          </h1>
          <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto">
            Empower change by volunteering, donating, or simply sharing our story. Your involvement matters.
          </p>
        </motion.div>

        {/* 🔗 Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {[
            {
              title: 'Volunteer',
              desc: 'Support our community efforts hands-on across education, health, and empowerment.',
            },
            {
              title: 'Donate',
              desc: 'Your contributions help us provide essential services and sustain programs.',
            },
            {
              title: 'Spread Awareness',
              desc: 'Amplify our voice by sharing and advocating for our cause within your network.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              className="bg-white p-6 rounded-lg text-center shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-pink-700 mb-2">{item.title}</h2>
              <p className="text-sm text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 📝 Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-2xl mx-auto"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-pink-600 mb-4 text-center">
            Quick Form to Get Involved
          </h3>

          {formStatus === 'success' && (
            <div className="text-green-600 text-center mb-4">✅ Thank you for getting involved!</div>
          )}
          {formStatus === 'error' && (
            <div className="text-red-600 text-center mb-4">❌ Something went wrong. Please try again.</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <input
              type="text"
              name="fullName"
              required
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-400 focus:border-pink-400"
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-400 focus:border-pink-400"
            />

            <select
              name="interest"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-400 focus:border-pink-400"
            >
              <option value="">Choose your Interest</option>
              <option value="career">Career</option>
              <option value="volunteer">Volunteer</option>
              <option value="internship">Internship</option>
            </select>

            <input
              type="tel"
              name="phone"
              placeholder="Phone (optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-400 focus:border-pink-400"
            />

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md font-semibold transition"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
}