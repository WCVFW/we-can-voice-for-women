'use client';
 
import React, { useState } from 'react';
 
const projects = [
  {
    id: 1,
    name: 'EASYA பேசு ENGLISH',
    image: '/assets/images/sc2.jpg', // second image
    content: `
      <div>
        <p>
          <strong>“EASYA பேசு ENGLISH”</strong> is a 6-month spoken English program focused on empowering girl children (Grades 1–7) in government schools across Chennai District.
          Through age-appropriate, play-based sessions held two times a week, the program helps girls build essential communication skills, vocabulary, and confidence in spoken English.
        </p>
 
        <img src="/assets/images/sc1.jpg" alt="Girls learning English" class="my-6 rounded-lg shadow-md" />
 
        <p>
          Using songs, storytelling, games, and visual aids, we create an engaging and culturally relevant learning environment.
          Our trained facilitators apply gender-sensitive methods that boost self-esteem, while parents and teachers are involved to reinforce learning beyond the classroom.
        </p>
 
        <img src="/assets/images/sc2.jpg" alt="Program Poster" class="my-6 rounded-lg shadow-md" />
 
        <p>
          The goal is to enable over 1000 girls to express themselves fluently and confidently, improving classroom participation, leadership, and future opportunities.
          The program supports SDG 4 (Quality Education), SDG 5 (Gender Equality), and SDG 10 (Reduced Inequalities).
        </p>
      </div>
    `,
  },
  {
    id: 2,
    name: 'Save Girl Child Campaign',
    image: '/assets/images/sc1.jpg',
    content: `
    <div>
      <p>
        The <strong>"Save Girl Child"</strong> campaign of awareness is being initiated in Chennai government schools with the central aim of propagating the value and dignity of the girl child in our society.
      </p>
 
      <img src="/assets/images/sc1.jpg" alt="Save Girl Child Awareness" class="my-6 rounded-lg shadow-md w-full h-64 object-cover" />
 
      <p>
        This campaign looks to educate students, teachers, and the surrounding community about the value of gender equality, the girl child's right to education, and the need to end discrimination and violence against them, and do it as a matter of urgency.
      </p>
 
      <p>
        The campaign is built around priority issues like safety and empowerment of girls, and the need for equitable societal values.
      </p>
 
      <img src="/assets/images/sc2.jpg" alt="Empowering the Girl Child" class="my-6 rounded-lg shadow-md w-full h-64 object-cover" />
 
      <p>
        Through community engagement, creative workshops, and interactive sessions, the campaign aims to bring about long-term change by urging young minds to respect and empower the girl child.
      </p>
    </div>
  `,
  },
 
  {
    id: 3,
    name: '',
    image: '/assets/images/project-3.jpg',
    content: '',
  },
];
 
 
export default function ProjectPage() {
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null);
 
  return (
    <section className="pt-24 pb-16 px-4 bg-pink-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {!selectedProject ? (
          <>
            <h2 className="pt-10 text-4xl font-bold text-pink-700 mb-10 text-center underline underline-offset-4">
              Our Projects
            </h2>
 
            <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
              {projects.map(
                (project) =>
                  project.name && (
                    <div
                      key={project.id}
                      className="cursor-pointer flex flex-col items-center text-center p-4 bg-white rounded-2xl transition-shadow duration-300 w-full sm:w-[45%] lg:w-[30%] max-w-[320px] hover:shadow-lg"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-pink-700">{project.name}</h3>
                    </div>
                  )
              )}
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto px-4">
            {/* Title */}
            <h1 className="text-4xl font-bold text-pink-700 mb-6">
              {selectedProject.name}
            </h1>
 
            {/* Content */}
            <div
              className="prose prose-pink max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: selectedProject.content }}
            />
 
            {/* Back Button at Bottom */}
            <div className="mt-10 text-center">
              <button
                className="text-sm font-medium text-pink-700 underline hover:text-pink-900 transition"
                onClick={() => setSelectedProject(null)}
              >
                ← Back to Projects
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}