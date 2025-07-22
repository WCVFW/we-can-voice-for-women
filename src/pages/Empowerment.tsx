import React from 'react';

export default function Empowerment() {
  return (
    <div className="max-w-7xl mx-auto w-full pt-32 px-4 py-12 md:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-pink-700 mb-4">Empowerment</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Creating sustainable futures through entrepreneurship and opportunity.
        </p>
      </div>

      {/* Foundation Section */}
      <div className="bg-pink-50 p-8 rounded-lg shadow-md flex flex-col lg:flex-row items-center gap-8">
        {/* Image Placeholder */}
        <div className="w-full lg:w-1/2">
          <img
            src="assets/images/empower.jpg"
            alt="Women engaged in entrepreneurship"
            className="rounded-md shadow-md w-full h-auto"
          />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold text-pink-700 mb-4">
            Empowering women to lead through enterprise.
          </h2>
          <p className="text-gray-700 mb-4">
            At the We Can Voice for Women Foundation, we firmly believe that true economic progress for women goes beyond traditional employment; it encompasses the power of self-employment and entrepreneurship. Our mission is to empower women to seize new opportunities in various industries and unlock their full potential.
          </p>
          <p className="text-gray-700 mb-4">
            We diligently select grassroots women who are eager and motivated to embark on their journeys in small, micro, and medium enterprises. Through comprehensive training and personalized guidance, we equip these remarkable women with the skills they need to thrive.
          </p>
          <p className="text-gray-700 mb-4">
            Our foundation places a special emphasis on supporting economically disadvantaged women, particularly in the fields of handicrafts and food processing. We facilitate their entrepreneurial dreams by connecting them with vital resources from central and state governments, as well as banking institutions.
          </p>
          <p className="text-gray-700 mb-6">
            We invite passionate volunteers, dedicated individuals, business leaders, government agencies, and corporate partners to join us at the We Can Voice for Women Foundation. Together, we can create a brighter future and drive meaningful economic change for women everywhere.
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
