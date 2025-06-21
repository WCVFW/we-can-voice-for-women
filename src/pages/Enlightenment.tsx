import React from 'react';

export default function Enlightenment() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-12 md:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">Enlightenment</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Empowering women through education and knowledge sharing to foster personal growth and community development.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Educational Programs</h2>
          <p className="text-gray-600 mb-6">
            Our educational programs cover a wide range of topics, from basic literacy and numeracy to advanced skills in technology, 
            business management, and leadership. We believe that education is the foundation for personal empowerment and social change.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✦</span>
              <span>Literacy and numeracy classes for women of all ages</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✦</span>
              <span>Digital literacy and technology skills workshops</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✦</span>
              <span>Financial education and entrepreneurship training</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✦</span>
              <span>Leadership and communication skills development</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Knowledge Sharing</h2>
          <p className="text-gray-600 mb-6">
            We create platforms and opportunities for women to share their knowledge, experiences, and expertise with one another.
            Through mentorship programs, discussion forums, and community events, we facilitate the exchange of ideas and best practices.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✦</span>
              <span>Mentorship programs connecting experienced professionals with aspiring women</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✦</span>
              <span>Community discussion forums on important women's issues</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✦</span>
              <span>Workshops and seminars led by expert women in various fields</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✦</span>
              <span>Resource library with books, articles, and multimedia content</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-purple-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">Upcoming Enlightenment Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-xl font-medium text-purple-700">Digital Literacy Workshop</h3>
            <p className="text-sm text-gray-500">June 25, 2023 | 10:00 AM - 12:00 PM</p>
            <p className="mt-2 text-gray-600">Learn basic computer skills, internet navigation, and online safety.</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-xl font-medium text-purple-700">Financial Education Seminar</h3>
            <p className="text-sm text-gray-500">July 10, 2023 | 2:00 PM - 4:00 PM</p>
            <p className="mt-2 text-gray-600">Understanding personal finance, budgeting, and saving strategies.</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-xl font-medium text-purple-700">Book Club Discussion</h3>
            <p className="text-sm text-gray-500">July 18, 2023 | 6:00 PM - 7:30 PM</p>
            <p className="mt-2 text-gray-600">Join us to discuss "Becoming" by Michelle Obama.</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-xl font-medium text-purple-700">Leadership Training</h3>
            <p className="text-sm text-gray-500">August 5, 2023 | 9:00 AM - 3:00 PM</p>
            <p className="mt-2 text-gray-600">Full-day workshop on developing leadership skills and confidence.</p>
          </div>
        </div>
      </div>
    </div>
  );
}