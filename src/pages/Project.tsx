'use client';

import React, { useState } from 'react';

const projects = [
  {
    id: 1,
    name: 'EASYA பேசு ENGLISH',
    image: '/assets/images/ec2.jpg',
    content: `
      <div>
        <p>
          <strong>“EASYA பேசு ENGLISH” is a 6-month spoken English program focused on empowering girl children (Grades 6–9) in government schools across Chennai District. Through age-appropriate, play-based sessions held two times a week, the program helps girls build essential communication skills, vocabulary, and confidence in spoken English.
        </p>
 
        <img src="/assets/images/ec2.jpg" alt="Girls learning English" class="my-6 rounded-lg shadow-md w-full h-64 object-cover" />
 
        <p>
          Using songs, storytelling, games, and visual aids, we create an engaging and culturally relevant learning environment.
          Our trained facilitators apply gender-sensitive methods that boost self-esteem, while parents and teachers are involved to reinforce learning beyond the classroom.
        </p>
 
        <img src="/assets/images/ec1.jpg" alt="Program Poster" class="my-6 rounded-lg shadow-md w-full h-64 object-cover" />
 
        <p>
          The goal is to enable over 1000 girls to express themselves fluently and confidently, improving classroom participation, leadership, and future opportunities.
          The program supports SDG 4 (Quality Education), SDG 5 (Gender Equality), and SDG 10 (Reduced Inequalities).
        </p>
      </div>
    `,
  },
  {
    id: 2,
    name: 'Save Girl Child',
    image: '/assets/images/sc1.jpg',
    content: `
      <div>
        <p>
          The <strong>"Save Girl Child"</strong> Project of awareness is being initiated in Chennai government schools with the central aim of propagating the value and dignity of the girl child in our society.
        </p>
 
        <img src="/assets/images/sc1.jpg" alt="Save Girl Child Awareness" class="my-6 rounded-lg shadow-md w-full h-64 object-cover" />
 
        <p>
          This Project looks to educate students, teachers, and the surrounding community about the value of gender equality, the girl child's right to education, and the need to end discrimination and violence against them, and do it as a matter of urgency.
        </p>
 
        <p>
          The Project is built around priority issues like safety and empowerment of girls, and the need for equitable societal values.
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
    name: 'Upskill Young Skill',
    image: '/assets/images/project3.jpg',
    content: `
    <div>
      <p>
        <strong>We Can Voice for Women Foundation</strong> is excited to announce the launch of <strong>Upskill Young Skill</strong>, a Skill Development Centre located in Goonipalayam Village, Thiruvallur District. This centre aims to empower children and women by providing accessible training and opportunities.
      </p>

      <img src="/assets/images/project3.jpg" alt="Upskill Young Skill Centre" class="my-6 rounded-lg shadow-md w-full h-64 object-cover" />

      <p>
        The centre focuses on nurturing children's creativity, communication, and problem-solving skills. Simultaneously, it offers women vocational training, entrepreneurship guidance, financial literacy, and essential life skills necessary for self-reliance.
      </p>
      <br>
      <p>
        This initiative creates a safe and inclusive environment where individuals can build confidence, improve their livelihoods, and contribute to community development.
      </p>

      <p>
        Ultimately, it strives to create a skilled, confident, and empowered society.
      </p>
    </div>
  `,
  }

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
                      <div className="w-full h-60 mb-4 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover object-center"
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
