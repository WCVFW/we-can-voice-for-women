'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image?: string;
  time: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Free Medical Camp – Goonipalayam Village',
    date: '2025-07-27',
    time: '09:00 AM to 01:00 PM',
    location: 'Goonipalayam, Tamil Nadu, India',
    description: `
      <strong>Medical Camp at Parvathi Pannai, Goonipalayam Village – Bridging a Healthcare Gap</strong><br/><br/>
      Goonipalayam is a rural village with 1,200+ people in 300 homes. While the community is making progress in education and livelihoods, healthcare access remains a big challenge:<br/><br/>
      • No nearby hospital or emergency care<br/>
      • Limited access to medicines and checkups<br/>
      • Elderly, women, and disabled persons lack regular medical support<br/>
      • Poor transport makes it hard to reach medical facilities<br/><br/>
      <strong>Supporting Global Goals:</strong><br/>
      This camp supports the UN Sustainable Development Goals:<br/>
      🏥 SDG 3: Good Health and Well-being<br/>
      ♀️ SDG 5: Gender Equality<br/>
      ⚖️ SDG 10: Reduced Inequalities<br/>
      🤝 SDG 17: Partnerships for the Goals<br/><br/>
      <strong>What We’re Doing:</strong><br/>
      We Can Voice for Women Foundation is organizing a Free Medical Camp to support the village with:<br/>
      ✅ General health checkups<br/>
      ✅ Free medicines<br/>
      ✅ Eye screening<br/>
      ✅ Health advice for women and seniors<br/><br/>
      📍 <strong>Location:</strong> Goonipalayam Village<br/>
      📅 <strong>Date:</strong> 27th July 2025<br/>
      🕘 <strong>Time:</strong> 9:00 AM to 1:00 PM<br/><br/>
      🙌 Event Completed.
    `,
    image: 'assets/images/event1.jpg',
  },
];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getStatus(eventDateStr: string): { status: string; color: string } {
  const today = new Date();
  const eventDate = new Date(eventDateStr);
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  if (eventDate.getTime() === today.getTime()) return { status: '🟡 Today', color: 'text-yellow-500' };
  if (eventDate > today) return { status: '📅 Upcoming', color: 'text-blue-500' };
  return { status: '✅ Completed', color: 'text-green-500' };
}

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 py-16 font-sans"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-pink-600 mb-4 mt-12">Events</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          View our past, current, and upcoming community events below.
        </p>
      </div>

      {/* Detail View */}
      {selectedEvent ? (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
          <button
            className="text-pink-600 mb-4 underline"
            onClick={() => setSelectedEvent(null)}
          >
            ← Back to all events
          </button>
          <img
            src={selectedEvent.image}
            alt={selectedEvent.title}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedEvent.title}</h2>
          <p className="text-sm text-gray-500 mb-2">
            {formatDate(selectedEvent.date)} | {selectedEvent.location}
          </p>
          <div
            className="text-gray-700 leading-relaxed text-sm space-y-2"
            dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
          />
        </div>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const { status, color } = getStatus(event.date);

            return (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.02 }}
                className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 transition cursor-pointer"
                onClick={() => setSelectedEvent(event)}
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

                  {/* Date, Time, and Location */}
                  <p className="text-sm text-gray-500 mb-1">
                    📅 {formatDate(event.date)} | 🕒 {event.time} <br />
                    📍 {event.location}
                  </p>

                  {/* Short Description */}
                  <p className="text-gray-600 text-sm mb-4">
                    {event.description.replace(/<[^>]+>/g, '').split(' ').slice(0, 20).join(' ')}...
                  </p>

                  {/* Status */}
                  <span className={`inline-block text-sm font-medium ${color}`}>
                    {status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
