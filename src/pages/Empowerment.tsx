import React from 'react';

export default function Empowerment() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-12 md:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Empowerment</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Creating opportunities for women to develop economic independence, leadership skills, and the confidence to shape their own futures.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Economic Empowerment</h2>
          <p className="text-gray-600 mb-6">
            Financial independence is a critical component of empowerment. Our economic empowerment programs help women 
            develop skills, start businesses, and secure employment to support themselves and their families.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✦</span>
              <span>Entrepreneurship training and business development support</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✦</span>
              <span>Job skills training and career development workshops</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✦</span>
              <span>Microlending and financial support for women-owned businesses</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✦</span>
              <span>Networking opportunities and professional mentorship</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Leadership Development</h2>
          <p className="text-gray-600 mb-6">
            We believe that women should have a seat at every table where decisions are made. Our leadership 
            development programs prepare women to take on leadership roles in their communities, workplaces, and beyond.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✦</span>
              <span>Leadership skills training and confidence building</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✦</span>
              <span>Public speaking and communication workshops</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✦</span>
              <span>Governance and policy training for aspiring political leaders</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✦</span>
              <span>Youth leadership programs for the next generation</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-blue-50 p-8 rounded-lg shadow-md mb-16">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-xl font-medium text-blue-700 mb-2">Sarah's Journey</h3>
            <p className="text-gray-600">
              "After participating in the entrepreneurship program, I was able to start my own catering business. 
              Now I employ five other women and provide for my family with pride."
            </p>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-xl font-medium text-blue-700 mb-2">Maria's Story</h3>
            <p className="text-gray-600">
              "The leadership training gave me the confidence to run for local office. I'm now serving on the city council 
              and advocating for policies that benefit women and families."
            </p>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-xl font-medium text-blue-700 mb-2">Fatima's Transformation</h3>
            <p className="text-gray-600">
              "Learning digital skills opened up a whole new world of opportunities. I now work remotely as a web designer
              and can support my children while having flexibility."
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-8 rounded-lg shadow-md text-white">
        <h2 className="text-2xl font-semibold mb-4">Join Our Empowerment Programs</h2>
        <p className="mb-6">
          Whether you're looking to start a business, develop leadership skills, or simply connect with other empowered women,
          we have programs and resources to support your journey.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-blue-700 hover:bg-blue-50 font-medium py-2 px-6 rounded-md transition-colors">
            View Upcoming Programs
          </button>
          <button className="bg-transparent hover:bg-blue-600 border border-white font-medium py-2 px-6 rounded-md transition-colors">
            Request More Information
          </button>
        </div>
      </div>
    </div>
  );
}