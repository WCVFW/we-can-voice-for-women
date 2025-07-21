import React from 'react';

export default function Enlightenment() {
  return (
    <div className="max-w-7xl mx-auto w-full pt-32 px-4 py-12 md:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-pink-700 mb-4">Enlightenment</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Empowering women through education for a brighter tomorrow.
        </p>
      </div>

      {/* Foundation Section */}
      <div className="bg-pink-50 p-8 rounded-lg shadow-md flex flex-col lg:flex-row items-center gap-8">
        {/* Image Placeholder */}
        <div className="w-full lg:w-1/2">
          <img
            src="assets/images/Enlightenmentinside.jpg"
            alt="Women learning English in a classroom"
            className="rounded-md shadow-md w-full h-auto"
          />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold text-pink-700 mb-4">
            Empowering women through education and opportunity.
          </h2>
          <p className="text-gray-700 mb-4">
            At the We Can Voice for Women Foundation, we firmly believe that empowering women through education is the cornerstone of a thriving society. Our initiative, 'Easya Pesu English,' is designed to equip women with essential English language skills, opening doors to global opportunities.
          </p>
          <p className="text-gray-700 mb-4">
            By focusing on socially disadvantaged groups, including lower-class women and girls from rural and urban communities, we are breaking down barriers and enabling them to confidently communicate in English.
          </p>
          <p className="text-gray-700 mb-4">
            Our commitment doesn't stop there; we are dedicated to ensuring that every woman has access to higher education. For those facing financial challenges, we provide scholarships to help fulfill their dreams of academic achievement.
          </p>
          <p className="text-gray-700 mb-6">
            Join us in our mission to transform lives and uplift communities. Your support for the We Can Voice for Women Foundation can make a profound difference, helping women empower themselves through education.
          </p>
          <a href="/donate">
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded transition duration-200">
              Donate Now
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
