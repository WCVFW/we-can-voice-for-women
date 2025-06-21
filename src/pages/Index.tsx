import React from 'react';
import HeroBanner from '@/components/HeroBanner';
import MediaSection from '@/components/MediaSection';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroBanner />
      <div className="max-w-7xl mx-auto w-full px-4 py-12 md:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Foundation</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            ‘We Can Voice for Women’ is a grassroots movement dedicated to empowering women.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Vision Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
            <h3 className="text-xl font-semibold text-pink-600 mb-4">Vision</h3>
            <p className="text-gray-700">
              A society where every woman is educated, healthy, and empowered — free to make informed choices, live with dignity,
              and shape a future of equality and justice.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
            <h3 className="text-xl font-semibold text-pink-600 mb-4">Mission</h3>
            <p className="text-gray-700">
              To empower women and girls from marginalised communities by creating safe, inclusive, and opportunity-rich environments.
              Through education, healthcare, economic independence, and advocacy, we strive to dismantle systemic barriers and
              nurture leaders who uplift families, communities, and the nation.
            </p>
          </div>

          {/* Values Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
            <h3 className="text-xl font-semibold text-pink-600 mb-4">Values</h3>
            <p className="text-gray-700">
              Our core values demand fairness and equal access for all women. We empower them with the skills and confidence to make their own choices.
              We create inclusive spaces that embrace every voice and celebrate diversity. We act with integrity by being honest and responsible in our community efforts.With compassion, we support women empathetically and assertively drive collaboration for lasting change. We cultivate resilience to build strong and determined women.
            </p>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto w-full px-4 py-12 md:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6">What We Do</h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Enlightenment Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 text-center">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">Enlightenment</h3>
            <p className="text-gray-600">
              Advancing equal access to quality education and literacy for girls and women.
            </p>
          </div>

          {/* Enhealthment Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 text-center">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Enhealthment</h3>
            <p className="text-gray-600">
              Promoting physical and mental health through awareness, accessibility, and preventive care.
            </p>
          </div>

          {/* Empowerment Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 text-center">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Empowerment</h3>
            <p className="text-gray-600">
              Enabling economic independence through skills development, employment support, and entrepreneurship.
            </p>
          </div>
        </div>
      </div>



      <MediaSection />
    </div>

  );
}