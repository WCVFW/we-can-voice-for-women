import React from 'react';

export default function Enhealthment() {
  return (
    <div className="max-w-7xl mx-auto w-full pt-32 px-4 py-12 md:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-pink-700 mb-4">Enhealthment</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          
        </p>
      </div>

      {/* Foundation Section */}
      <div className="bg-pink-50 p-8 rounded-lg shadow-md flex flex-col lg:flex-row items-center gap-8">
        {/* Image Placeholder */}
        <div className="w-full lg:w-1/2">
          <img
            src="assets/images/ca/ca2.jpg"
            alt="Empowered women receiving medical care"
            className="rounded-md shadow-md w-full h-auto"
          />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold text-pink-700 mb-4">Empowering women through health, hope, and healing.</h2>
          <p className="text-gray-700 mb-4">
            The We Can Voice for Women Foundation is passionately committed to transforming the lives of women living in
            poverty by providing them with essential medical assistance at no cost. Our mission goes beyond treatment; we
            strive to empower women through awareness, education, and prevention of diseases.
          </p>
          <p className="text-gray-700 mb-4">
            We are dedicated to identifying women facing cancer and offering them vital medical treatment to fight this
            life-threatening disease. Our work also encompasses the diagnosis and treatment of infectious and hereditary
            diseases that disproportionately impact women, ensuring that no woman fights her battles alone.
          </p>
          <p className="text-gray-700 mb-6">
            Join us in making a significant impact on women’s health and helping them reclaim their futures. Whether you
            choose to volunteer your time or make a generous donation, your support is crucial in helping us protect and
            uplift women in need.
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
