import React from 'react';

const WeCanVoice: React.FC = () => {
  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        ‘We Can Voice for Women’
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        ‘We Can Voice for Women’ is a grassroots movement dedicated to empowering women.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Vision Card */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Vision</h2>
          <p className="text-gray-700">
            A society where every woman is educated, healthy, and empowered – free to make informed choices,
            live with dignity, and shape a future of equality and justice.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Mission</h2>
          <p className="text-gray-700">
            To empower women and girls from marginalised communities by creating safe, inclusive, and
            opportunity-rich environments. Through education, healthcare, economic independence, and advocacy,
            we strive to dismantle systemic barriers and nurture leaders who uplift families, communities, and the nation.
          </p>
        </div>

        {/* Value Card */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Value</h2>
          <p className="text-gray-700">
            Our core values demand fairness and equal access for all women. We empower them with the skills
            and confidence to make their own choices. We create inclusive spaces that embrace every voice
            and celebrate diversity. We act with integrity by being honest and responsible in our community efforts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WeCanVoice;
