'use client';
import { motion } from 'framer-motion';

export default function GetInvolved() {
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

        {/* 📝 Compact Form at the Bottom */}
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thanks for signing up! (Demo only)');
            }}
            className="space-y-4 text-sm"
          >
            {/* Full Name */}
            <input
              type="text"
              required
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-400 focus:border-pink-400"
            />

            {/* Email */}
            <input
              type="email"
              required
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-400 focus:border-pink-400"
            />

            {/* Select Option */}
            <select
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-400 focus:border-pink-400"
            >
              <option value="">Select Interest</option>
              <option value="volunteer">Volunteer</option>
              <option value="donate">Donate</option>
              <option value="awareness">Spread Awareness</option>
            </select>

            {/* Phone */}
            <input
              type="tel"
              placeholder="Phone (optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-400 focus:border-pink-400"
            />

            {/* Submit */}
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
