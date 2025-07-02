// app/page.js or pages/index.js
import React from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '@/components/HeroBanner';
import MediaSection from '@/components/MediaSection';
import Card from '@/components/Card';
import Card1 from '@/components/Card1';

export default function Home() {
  const foundationData = [
    {
      id: 1,
      title: 'Vision',
      text: `A society where every woman is educated, healthy, and empowered to make choices and shape a future of equality and justice.`,
      bgColor: '#fde3ec',
      textColor: '#e53888', // Tailwind's gray-800
    },
    {
      id: 2,
      title: 'Mission',
      text: `Empower marginalized women and girls by fostering safe, inclusive environments and promoting education, healthcare, and advocacy to uplift families and communities.`,
      bgColor: '#e53888',
      textColor: '#ffffff',
    },
    {
      id: 3,
      title: 'Values',
      text: `We promote fairness and empowerment for women, celebrate diversity, and foster collaboration to build resilience.`,
      bgColor: '#fde3ec',
      textColor: '#e53888',
    },
  ];
  const whatWeDoData = [
    {
      title: 'Enlightenment',
      description: 'When women achieve independence through education, they unlock their full potential and flourish in every aspect of life.',
      colorClass: 'text-pink-600',
      href: '#',
      image: 'assets/images/Enlightenment.jpg',

    },
    {
      title: 'Enhealthment',
      description: 'A healthy woman embodies vitality. We provide essential medical support to underserved women, ensuring they thrive.',
      colorClass: 'text-white-600',
      href: '#',
      image: 'assets/images/Enhealthment.jpg',

    },
    {
      title: 'Empowerment',
      description: 'Grassroots women can improve their economic status through self-employment, and we are here to empower their journey to success.',
      colorClass: 'text-pink-600',
      href: '#',
      image: 'assets/images/Empowerment.jpeg',

    },
  ];
  return (
    <div className="flex flex-col overflow-x-hidden">
      <HeroBanner />

      {/* Our Foundation Section */}
      <div className="relative max-w-7xl mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
        {/* Left Decoration Image */}
        <img
          src="assets/images/Asset_1.png"
          alt="Left Decoration"
          className="hidden lg:block absolute z-0 object-contain w-[150px] sm:w-[180px] lg:w-[420px]"
          style={{
            left: '-15%',
            top: '45%',
          }}
        />

        {/* Right Decoration Image */}
        <img
          src="assets/images/Asset_2.png"
          alt="Right Decoration"
          className="hidden lg:block absolute z-0 object-contain w-[150px] sm:w-[180px] lg:w-[420px]"
          style={{
            right: '-10%', // changed from -15% to prevent scroll
            top: '0%',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-16 text-center px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-pink-600">
              Our Foundation
            </h2>
            <p className="text-base sm:text-lg text-pink-600 max-w-4xl mx-auto font-sans">
              ‘We Can Voice for Women’ is a grassroots movement dedicated to empowering women.
            </p>
          </div>

          {/* Card Grid */}
          <div className="mt-20 sm:mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center px-4">
            {foundationData.map((item, index) => (
              <div
                key={item.id}
                className={`w-[335px] h-[356px] rounded-[10px] border border-gray-200 p-6 shadow-sm transition duration-300 transform hover:scale-105 ${
                  item.id === 2 ? 'md:-mt-32' : 'hover:shadow-lg'
                }`}
                style={{
                  backgroundColor: item.bgColor,
                  color: item.textColor,
                }}
              >
                <Card {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What We Do Section */}
      <div className="max-w-6xl mx-auto w-full px-4 py-8 md:px-4 lg:px-6 mb-14">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">What We Do</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {whatWeDoData.map((item, index) => (
            <Link to={item.href || '/'} key={index}>
              <Card1 {...item} />
            </Link>
          ))}
        </div>
      </div>

      {/* <MediaSection /> */}
    </div>
  );
};