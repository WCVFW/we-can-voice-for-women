'use client';

import React from 'react';

const projects = [
  {
    id: 1,
    name: 'Scholarship for Enlightenment',
    description: 'Empowering young girls through educational support programs in rural Tamil Nadu.',
    image: '/assets/images/project-1.jpg',
  },
  {
    id: 2,
    name: 'Menstrual Hygiene Awareness',
    description: 'Workshops and distribution of menstrual cups to promote hygiene and sustainability.',
    image: '/assets/images/project-2.jpg',
  },
  {
    id: 3,
    name: 'Women in Governance',
    description: 'Training sessions encouraging women to participate in local decision-making bodies.',
    image: '/assets/images/project-3.jpg',
  },
];

export default function ProjectPage() {
  return (
    <section className="py-12 md:py-16 px-4 bg-pink-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-pink-700 mb-10 text-center underline underline-offset-4">
          Our Projects
        </h2>

        {/* <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col items-center text-center p-6 bg-white rounded-2xl transition-shadow duration-300 w-full sm:w-[45%] lg:w-[30%] max-w-[320px] min-h-[420px]"
              style={{
                boxShadow: '6px 6px 16px rgba(0, 0, 0, 0.15)', // right and bottom shadow only
              }}
            >
              <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-pink-700 mb-2">{project.name}</h3>
              <p className="text-gray-600 text-sm">{project.description}</p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
