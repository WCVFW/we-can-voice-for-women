// app/page.js or pages/index.js
import React from 'react';
import HeroBanner from '@/components/HeroBanner';
import MediaSection from '@/components/MediaSection';
import Card from '@/components/Card';

export default function Home() {
  const foundationData = [
    {
      title: 'Vision',
      text: `A society where every woman is educated, healthy, and empowered to make choices and shape a future of equality and justice.`,
      colorClass: 'text-pink-600',
    },
    {
      title: 'Mission',
      text: `Empower marginalized women and girls by fostering safe, inclusive environments and promoting education, healthcare, and advocacy to uplift families and communities.`,
      colorClass: 'text-pink-600',
    },
    {
      title: 'Values',
      text: `We promote fairness and empowerment for women, celebrate diversity, and foster collaboration to build resilience.`,
      colorClass: 'text-pink-600',
    },
  ];

  const whatWeDoData = [
    {
      title: 'Enlightenment',
      text: 'When women achieve independence through education, they unlock their full potential and flourish in every aspect of life.',
      colorClass: 'text-pink-600',
    },
    {
      title: 'Enhealthment',
      text: 'A healthy woman embodies vitality. We provide essential medical support to underserved women, ensuring they thrive.',
      colorClass: 'text-pink-600',
    },
    {
      title: 'Empowerment',
      text: 'Grassroots women can improve their economic status through self-employment, and we are here to empower their journey to success.',
      colorClass: 'text-pink-600',
    },
  ];

  return (
    <div className="flex flex-col">
      <HeroBanner />

      {/* Our Foundation Section */}
      <div className="max-w-7xl mx-auto w-full px-4 py-12 md:px-6 lg:px-8 bg-pink-200">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-pink-600">Our Foundation</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto font-sans">
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
          <h2 className="text-3xl font-bold text-pink-600 mb-6">What We Do</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whatWeDoData.map((item, index) => (
            <Card key={index} {...item} center />
          ))}
        </div>
      </div>
      {/* <MediaSection /> */}
    </div>
  );
}