import React from 'react';

export default function Enhealthment() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-12 md:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Enhealthment</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Promoting women's health and wellness through education, access to care, and community support programs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Health Education</h2>
          <p className="text-gray-600 mb-6">
            We believe that knowledge is power, especially when it comes to health. Our health education programs 
            provide women with accurate information about their bodies, common health conditions, preventive care, 
            and treatment options.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✦</span>
              <span>Reproductive health and family planning workshops</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✦</span>
              <span>Mental health awareness and self-care sessions</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✦</span>
              <span>Nutrition and healthy lifestyle education</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✦</span>
              <span>Disease prevention and health maintenance guidance</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Access to Care</h2>
          <p className="text-gray-600 mb-6">
            We work to improve access to healthcare services for women, especially those in underserved communities.
            Through partnerships with healthcare providers and community organizations, we help women navigate the 
            healthcare system and receive the care they need.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✦</span>
              <span>Free health screenings and check-ups</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✦</span>
              <span>Referrals to affordable healthcare providers</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✦</span>
              <span>Transportation assistance to medical appointments</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✦</span>
              <span>Healthcare navigation and advocacy support</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-green-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Wellness Programs</h2>
        <p className="text-gray-600 mb-6">
          Our wellness programs take a holistic approach to health, addressing physical, mental, and emotional well-being. 
          We offer a variety of activities and resources to help women reduce stress, build resilience, and enhance their quality of life.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-md shadow text-center">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-green-700">Yoga & Meditation</h3>
            <p className="mt-2 text-gray-600">Weekly classes for stress reduction and mindfulness</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow text-center">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-green-700">Support Groups</h3>
            <p className="mt-2 text-gray-600">Safe spaces to share experiences and find support</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow text-center">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-green-700">Self-Care Resources</h3>
            <p className="mt-2 text-gray-600">Tools and practices for everyday wellness</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow text-center">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-green-700">Health Coaching</h3>
            <p className="mt-2 text-gray-600">Personalized guidance for health goals</p>
          </div>
        </div>
      </div>
    </div>
  );
}