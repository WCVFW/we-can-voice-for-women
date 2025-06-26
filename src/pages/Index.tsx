// app/page.js or pages/index.js
import React from 'react';
import HeroBanner from '@/components/HeroBanner';
import MediaSection from '@/components/MediaSection';
import Card from '@/components/Card';

export default function Home() {
  const foundationData = [
    {
      title: 'Vision',
      text: `A society where every woman is educated, healthy, and empowered — free to make informed choices, live with dignity, and shape a future of equality and justice.`,
      colorClass: 'text-pink-600',
    },
    {
      title: 'Mission',
      text: `To empower women and girls from marginalised communities by creating safe, inclusive, and opportunity-rich environments. Through education, healthcare, economic independence, and advocacy, we strive to dismantle systemic barriers and nurture leaders who uplift families, communities, and the nation.`,
      colorClass: 'text-pink-600',
    },
    {
      title: 'Values',
      text: `Our core values demand fairness and equal access for all women. We empower them with the skills and confidence to make their own choices. We create inclusive spaces that embrace every voice and celebrate diversity. We act with integrity by being honest and responsible in our community efforts. With compassion, we support women empathetically and assertively drive collaboration for lasting change. We cultivate resilience to build strong and determined women.`,
      colorClass: 'text-pink-600',
    },
  ];

  const whatWeDoData = [
    {
      title: 'Enlightenment',
      text: 'Advancing equal access to quality education and literacy for girls and women.',
      colorClass: 'text-purple-700',
    },
    {
      title: 'Enhealthment',
      text: 'Promoting physical and mental health through awareness, accessibility, and preventive care.',
      colorClass: 'text-green-700',
    },
    {
      title: 'Empowerment',
      text: 'Enabling economic independence through skills development, employment support, and entrepreneurship.',
      colorClass: 'text-blue-700',
    },
  ];

  return (
    <div className="flex flex-col">
      <HeroBanner />

      {/* Our Foundation Section */}
      <div className="max-w-7xl mx-auto w-full px-4 py-12 md:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Foundation</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            ‘We Can Voice for Women’ is a grassroots movement dedicated to empowering women.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foundationData.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </div>

      {/* What We Do Section */}
      <div className="max-w-7xl mx-auto w-full px-4 py-12 md:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6">What We Do</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whatWeDoData.map((item, index) => (
            <Card key={index} {...item} center />
          ))}
        </div>
      </div>

      <MediaSection />
    </div>
  );
}