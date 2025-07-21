'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image?: string;
  isUpcoming: boolean;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Women Empowerment Workshop',
    date: 'July 15, 2025',
    location: 'Delhi, India',
    description:
      'A full-day workshop on leadership, legal rights, and self-defense techniques for women from rural communities.',
    image: '/images/event1.jpg',
    isUpcoming: true,
  },
  // {
  //   id: 2,
  //   title: 'Health Awareness Camp',
  //   date: 'August 2, 2025',
  //   location: 'Ranchi, Jharkhand',
  //   description:
  //     'Organizing free checkups, menstrual hygiene awareness, and nutrition sessions in collaboration with local doctors.',
  //   image: '/images/event2.jpg',
  //   isUpcoming: true,
  // },
  // {
  //   id: 3,
  //   title: 'Fundraiser Gala',
  //   date: 'September 10, 2025',
  //   location: 'Bangalore, India',
  //   description:
  //     'An evening of stories, performances, and support for the cause of girl child education.',
  //   image: '/images/event3.jpg',
  //   isUpcoming: true,
  // },
];

export default function Events() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 py-16 font-sans"
    >
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-pink-600 mb-4 mt-12">Upcoming Events</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Join us at our upcoming events to make a difference and uplift lives through empowerment and outreach.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.02 }}
            className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 transition"
          >
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h2>
              <p className="text-sm text-gray-500 mb-1">{event.date} | {event.location}</p>
              <p className="text-gray-600 text-sm mb-4">{event.description}</p>
              <span className="inline-block text-sm text-pink-600 font-medium">
                {event.isUpcoming ? 'Register Now' : 'Event Closed'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <p className="text-lg text-gray-700">
          Want to collaborate or volunteer at our next event?
        </p>
        <a
          href="/donate"
          className="inline-block mt-4 px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition"
        >
          Donate Now
        </a>
      </div>
    </motion.div>
  );
}