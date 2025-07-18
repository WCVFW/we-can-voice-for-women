import React, { useState } from "react";
import { Linkedin, MapPin } from "lucide-react";

interface SocialLinks {
  linkedin: string;
  twitter: string;
  email: string;
}

interface Leader {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
  social: SocialLinks;
  imageStyle?: React.CSSProperties;
  location?: string;
}

const About: React.FC = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [expandedLeaderIds, setExpandedLeaderIds] = useState<number[]>([]);

  const toggleReadMore = () => {
    setShowMore(!showMore);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleLeaderBio = (id: number) => {
    setExpandedLeaderIds((prev) =>
      prev.includes(id) ? prev.filter((lid) => lid !== id) : [...prev, id]
    );
  };

  const isExpanded = (id: number) => expandedLeaderIds.includes(id);

  const content: string[] = [
    `The We Can Voice for Women Foundation is a grassroots NGO committed to fostering gender equity and empowering women across India.`,
    `Established in 2019, the Foundation was born out of a deep-seated belief that women’s empowerment is not just a social imperative but a national priority essential for inclusive and sustainable development.`,
    `We believe that true empowerment is multi-dimensional and must address the foundational pillars of education, healthcare, economic independence, legal protection, and social inclusion.`,
    `Through our work, we aim to dismantle societal barriers, advocate for women's rights, and build an ecosystem where women can thrive with dignity and autonomy.`,
    `Our programs are designed to uplift women from marginalised communities by equipping them with the knowledge, skills, resources, and confidence to lead independent and meaningful lives.`,
    `We are also firm advocates of male allyship and actively promote the involvement of men as partners in the journey towards gender justice.`,
    `Our organisation operates with a dynamic team of youth leaders, experienced social workers, and committed mentors.`,
    `Under the visionary leadership of our founders, Mr. Gunalan Lavanyan and Mrs. Oorvasi Gunalan, the Foundation has grown from a local movement into a structured and impactful organisation dedicated to societal transformation.`,
  ];

  const visibleContent = showMore ? content : content.slice(0, 4);
  const head = "rgb(219 39 119)";
  const pargraph = "#C2185B";

  const leaders: Leader[] = [
    {
      id: 1,
      name: "Mr. Gunalan Lavanyan",
      title: "Founder & Chairman",
      image: "assets/images/sub1.png",
      bio: "A seasoned media professional with over 2 decades of experience, Mr. Gunalan Lavanyan is a passionate advocate for social justice. Since initiating the We Can Voice for Women movement in 2016, he has worked tirelessly to reshape public perceptions and attitudes toward women.His leadership combines creative communication, grassroots mobilisation, and strategic vision.",
      social: {
        linkedin: "https://www.linkedin.com/in/gunalancity/",
        twitter: "#",
        email: "chairman@wecanvoiceforwomen.org",
      },
      imageStyle: {
        width: "260px",
        height: "420px",
      },
    },
    {
      id: 2,
      name: "Mrs. Oorvasi Gunalan",
      title: "Secretary & Treasurer",
      image: "/assets/images/sub2.png",
      bio: " Mrs. Oorvasi Gunalan exemplifies compassion and resilience. She has played a pivotal role in shaping the Foundation’s operations and outreach. Her dedication to counselling women, managing programs, and sustaining grassroots engagement makes her an invaluable force behind the organisation’s impact.",
      social: {
        linkedin: "https://www.linkedin.com/in/goorvasi/",
        twitter: "#",
        email: "secretary@wecanvoiceforwomen.org",
      },
      imageStyle: {
        width: "260px",
        height: "420px",
      },
    },
    {
      id: 3,
      name: "Mr. Deepak Radhakrishnan",
      title: "Financial Advisor",
      image: "/assets/images/sub3.png",
      bio: "He is a qualified Taxation Advocate and CPA (USA) with extensive expertise in accounting and taxation. Committed to improving business standards in India, he focuses on nurturing entrepreneurs and empowering women to build sustainable ventures, aiming to transform potential into professionalism across the country.",
      social: {
        linkedin: "https://www.linkedin.com/in/deepak-radhakrishnan-40a647156/",
        twitter: "#",
        email: "amara@voiceforwomen.org",
      },
    },
    {
      id: 4,
      name: "Prof Mr.A.Md.Abdulkadhar",
      title: "Educational Advisor",
      image: "/assets/images/sub4.png",
      bio: "Professor A. Mohamed Abdul Kadhar is an educationist committed to women's advancement. He has written extensively on women achievers and serves as a consultant for educational institutions. Currently, he supports the We Can Voice for Women Foundation, empowering women's initiatives.",
      social: {
        linkedin: "https://www.linkedin.com/in/prof-abdul-kadhar-52877a332",
        twitter: "#",
        email: "Kadharchem@gmail.com",
      },
    },
    {
      id: 5,
      name: "Mr. Sudarshan Meenakshi Sundharam ",
      title: "Global advisor",
      location: "Toronto, Canada",
      image: "/assets/images/sub5.png",
      bio: "Sudarshan Meenakshi Sundharam has a Diploma in Electronics Engineering and Post Graduate diploma in Dialysis Technology. He has worked at Toronto General Hospital since 2001 and teaches at Centennial College, . He has published articles on renal engineering, and many of his students work in hospitals across Canada.",
      social: {
        linkedin: "http://www.linkedin.com/in/sudarshan-meenakshi-6790a324a",
        twitter: "#",
        email: "amara@voiceforwomen.org",
      },
    },
    {
      id: 6,
      name: "Ms. Sripriya V",
      title: "Consultant Psychologist",
      image: "/assets/images/sub6.png",
      bio: "Mrs. Sripriya V is a psychologist specialising in counselling, psychotherapy, and psychometric assessments. As a certified hypnotherapist, she has experience in substance abuse rehabilitation and leads Employee Assistance Program (EAP) sessions. Fluent in multiple languages, she creates a comfortable space for clients.",
      social: {
        linkedin: "https://www.linkedin.com/in/sripriya-psy/",
        twitter: "#",
        email: "amara@voiceforwomen.org",
      },
    },
  ];

  const teamMembers = [
    {
      name: "Sreedevi K",
      title: "Project Co-ordinator",
      image: "/assets/images/15.jpg",
    },
    {
      name: "Logasri P",
      title: "Field Co-ordinator",
      image: "/assets/images/1.jpg",
    },
    {
      name: "Kavi Muhil Sriraman",
      title: "Fundraiser Executive",
      image: "/assets/images/14.jpg",
    },
    {
      name: "Charulatha H",
      title: "Entrepreneurship Co-ordinator",
      image: "/assets/images/3.jpg",
    },
    {
      name: "Prakash V",
      title: "Senior Full Stack Developer",
      image: "/assets/images/6.jpg",
    },
    {
      name: "Shenbagavel V",
      title: "Junior Full Stack Developer",
      image: "/assets/images/5.jpg",
    },
    {
      name: "Rajesh M",
      title: "Videographer",
      image: "/assets/images/4.jpg",
    },
    {
      name: "Pradeep E",
      title: "Visual Editor",
      image: "/assets/images/Pradeep.jpg",
    },
  ];

  const truncate = (text: string, maxLength: number): string =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <>
      {/* About Section */}
      <div className="pt-20 px-6 pb-10 overflow-x-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 mt-24 px-4">
          {/* About Content - narrower */}
          <div className="w-full md:w-1/2 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-6 text-center">
              About Us
            </h1>
            <div className="text-base text-black space-y-4 text-left">
              {visibleContent.map((para, index) => (
                <p key={index} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
            <br />
            <button
              onClick={toggleReadMore}
              className="mt-6 bg-pink-500 text-white hover:bg-pink-200 hover:text-pink-800 font-semibold focus:outline-none px-6 py-2 relative"
              style={{
                clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                borderRadius: "8px", // adjust value as needed
              }}
            >
              {showMore ? "Read Less" : "Read More"}
            </button>
          </div>

          {/* Image Column */}
          <div className="w-full md:w-1/2 relative flex flex-col gap-2 items-center">
            {/* First Image */}
            <img
              src="/assets/images/with out text.jpg"
              alt="About 1"
              className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover rounded-2xl shadow-md"
            />

            {/* Second Image */}
            <img
              src="/assets/images/2540d9abd673d7579cfbe93b02f0fa44376fa8bb.jpg"
              alt="About 2"
              className="w-full object-cover rounded-2xl shadow-md"
              style={{ height: "340px" }}
            />

            {/* Third Image */}
            {/* <div className="relative w-full flex justify-center md:justify-start"> */}
            <img
              src="/assets/images/ca/ca3.jpg"
              alt="About 3"
              className="object-cover rounded-2xl shadow-md bg-white border"
              style={{
                padding: "8px",
                width: "100%",
                maxWidth: "360px",
                height: "240px",
                // marginLeft: '0px',
                marginTop: "-60px",
              }}
            />

            {/* On desktop, apply overlap using media query */}
            {/* <style>{`
      @media (min-width: 768px) {
        img[alt='About 3'] {
          margin-left: -120px !important;
          margin-top: -200px !important;
        }
      }
    `}</style> */}
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* Leadership Team Section */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-pink-700 mb-10 text-center">
            Our Leadership
          </h2>

          <div className="space-y-16">
            {Array.from(
              { length: Math.ceil(leaders.length / 2) },
              (_, rowIndex) => {
                const rowLeaders = leaders.slice(
                  rowIndex * 2,
                  rowIndex * 2 + 2
                );

                return (
                  <React.Fragment key={rowIndex}>
                    {rowIndex === 1 && (
                      <h3 className="text-3xl font-semibold text-pink-600 mb-6 text-center">
                        Advisory Board
                      </h3>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-4 md:px-16 justify-center">
                      {rowLeaders.map((leader) => {
                        const isReversed = [3, 4, 5, 6].includes(leader.id);

                        return (
                          <div
                            key={leader.id}
                            className={`flex flex-col sm:flex-row ${isReversed ? "sm:flex-row-reverse" : ""
                              } gap-4 items-center justify-center`}
                          >
                            {/* Image Card */}
                            <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-[280px] h-[420px] flex items-center justify-center">
                              <img
                                src={leader.image}
                                alt={leader.name}
                                className="object-cover w-full h-full"
                              />
                            </div>

                            {/* Detail Card */}
                            <div
                              className="relative shadow-lg rounded-2xl p-4 w-[280px] h-[420px] flex flex-col bg-no-repeat bg-center bg-pink-50"
                              style={{
                                backgroundImage: `url('assets/images/AC.png')`,
                                backgroundSize: "160px",
                              }}
                            >
                              <div className="flex-1 bg-opacity-80 p-3 rounded-lg text-center overflow-hidden">
                                <h3
                                  className="text-lg font-bold text-black"
                                  style={{ color: head }}
                                >
                                  {leader.name}
                                </h3>
                                {leader.id === 5 && leader.location && (
                                  <p className="mt-2 text-sm font-semibold flex justify-center items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {leader.location}
                                  </p>
                                )}
                                <p className="text-sm text-black font-bold mb-2">
                                  {leader.title}
                                </p>

                                {/* Bio */}
                                <div
                                  className="font-bold text-left text-sm overflow-hidden"
                                  style={{ color: pargraph }}
                                >
                                  <p>{leader.bio}</p>
                                </div>

                                {/* Location (only for ID 5) */}
                              </div>

                              {/* Social Icon */}
                              <div className="absolute bottom-4 right-4">
                                {leader.social?.linkedin && (
                                  <a
                                    href={leader.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 flex items-center justify-center bg-pink-50 rounded-full hover:bg-pink-100 transition"
                                  >
                                    <Linkedin className="text-pink-600 w-4 h-4" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </React.Fragment>
                );
              }
            )}
          </div>
        </div>
      </section>
      {/* Team Members */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-pink-700 mb-10 text-center">
            Our Team
          </h2>
          <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 rounded-2xl transition-shadow duration-300 w-full sm:w-[45%] lg:w-[30%] max-w-[300px] min-h-[400px]"
                style={{
                  boxShadow: "6px 6px 18px rgba(0, 0, 0, 0.20)", // X and Y offsets → right & bottom
                }}
              >
                <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-pink-700">
                  {member.name}
                </h3>
                <p className="text-gray-700 text-base">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
