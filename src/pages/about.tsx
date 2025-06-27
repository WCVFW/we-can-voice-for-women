import React, { useState } from 'react';
import { Linkedin, } from 'lucide-react';

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
}

const About: React.FC = () => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const [expandedLeaderIds, setExpandedLeaderIds] = useState<number[]>([]);

    const toggleReadMore = () => {
        setShowMore(!showMore);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleLeaderBio = (id: number) => {
        setExpandedLeaderIds((prev) =>
            prev.includes(id) ? prev.filter((lid) => lid !== id) : [...prev, id]
        );
    };

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

    const leaders: Leader[] = [
        {
            id: 1,
            name: "Mr. Gunalan Lavanyan",
            title: "Founder & Chairman",
            image: "assets/images/Gunalan.jpg?height=300&width=300",
            bio: "A seasoned media professional with over 2 decades of experience, Mr. Gunalan Lavanyan is a passionate advocate for social justice. Since initiating the We Can Voice for Women movement in 2016, he has worked tirelessly to reshape public perceptions and attitudes toward women. His leadership combines creative communication, grassroots mobilisation, and strategic vision.",
            social: {
                linkedin: "https://www.linkedin.com/in/gunalancity/",
                twitter: "#",
                email: "chairman@wecanvoiceforwomen.org",
            },
        },
        {
            id: 2,
            name: "Mrs. Oorvasi Gunalan",
            title: "Secretary & Treasurer",
            image: "/assets/images/oruvasi.jpg?height=300&width=300",
            bio: "With a strong academic background in mathematics and an unyielding passion for community welfare, Mrs. Oorvasi Gunalan exemplifies compassion and resilience. She has played a pivotal role in shaping the Foundation’s operations and outreach. Her dedication to counselling women, managing programs, and sustaining grassroots engagement makes her an invaluable force behind the organisation’s impact.",
            social: {
                linkedin: "https://www.linkedin.com/in/goorvasi/",
                twitter: "#",
                email: "secretary@wecanvoiceforwomen.org",
            },
        },
        {
            id: 3,
            name: "Mr. Deepak Radhakrishnan",
            title: "Financial Advisor",
            image: "/assets/images/10.jpg?height=300&width=300",
            bio: "He is a seasoned professional, qualified as a Taxation Advocate and CPA (USA), with deep expertise in accounting and taxation. He is passionately committed to uplifting business standards in India, especially among underserved communities. With a visionary mindset, he focuses on nurturing entrepreneurs and empowering women to build sustainable ventures. Deepak believes in transforming potential into professionalism, one business at a time. His mission is to create a generation of confident professionals and change-makers across India.",
            social: {
                linkedin: "https://www.linkedin.com/in/deepak-radhakrishnan-40a647156/",
                twitter: "#",
                email: "amara@voiceforwomen.org",
            },
        },
        {
            id: 4,
            name: "Prof Mr. A.Md.Abdulkadhar",
            title: "Educational Advisor",
            image: "/assets/images/8.jpg?height=300&width=300",
            bio: "Professor A. Mohamed Abdul Kadhar is a distinguished educationist dedicated to the advancement of women. With a wealth of knowledge, he has authored a compelling array of articles and books that spotlight women winners, achievers, and entrepreneurs. Known for his inspiring and confident speaking style, he serves as a trusted consultant to a variety of educational institutions. His impactful work has been recognised with numerous prestigious awards. Currently, he is playing a pivotal role in shaping the We Can Voice for Women Foundation, offering valuable insights and expertise to empower women's voices and initiatives.",
            social: {
                linkedin: "https://www.linkedin.com/in/prof-abdul-kadhar-52877a332",
                twitter: "#",
                email: "Kadharchem@gmail.com",
            },
        },
    ];

    const visibleContent = showMore ? content : content.slice(0, 4);

    const teamMembers = [
        {
            name: "Logasri P",
            title: "Admin",
            image: "/assets/images/1.jpg",
        },
        {
            name: "Charulatha H",
            title: "Entrepreneurship Coordinator",
            image: "/assets/images/3.jpg",
        },
        {
            name: "Arunadevi A",
            title: "Field Coordinator",
            image: "/assets/images/2.jpg",
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
            title: "Director of Photography",
            image: "/assets/images/4.jpg",
        },
    ];

    const truncate = (text: string, maxLength: number): string =>
        text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    return (
        <>
            {/* About Section */}
            <div
                className="min-h-screen flex items-center justify-center py-10 px-4 bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/images/banner.png')" }}
            >
                <div className="bg-white max-w-4xl w-full p-8 rounded-lg shadow-lg text-center">
                    <h1 className="text-4xl font-bold text-pink-700 mb-10 text-center">About Us</h1>
                    <div className="text-lg text-black space-y-4 text-left">
                        {visibleContent.map((para, index) => (
                            <p key={index} className="whitespace-pre-line">
                                {para}
                            </p>
                        ))}
                    </div>
                    <button
                        onClick={toggleReadMore}
                        className="mt-6 text-pink-600 hover:text-pink-800 font-semibold underline focus:outline-none"
                    >
                        {showMore ? "Read Less" : "Read More"}
                    </button>
                </div>
            </div>


            {/* Leadership Team Section */}
            <section className="py-12 md:py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-pink-700 mb-10 text-center">Leadership</h2>
                    <div className="grid gap-8 md:gap-12 md:grid-cols-2">
                        {leaders.map((leader, index) => {
                            const isExpanded = expandedLeaderIds.includes(leader.id);
                            return (
                                <React.Fragment key={leader.id}>
                                    {/* Inject "Advisory Board" title before the third card */}
                                    {index === 2 && (
                                        <div className="md:col-span-2">
                                            <h3 className="text-4xl font-bold text-pink-700 mb-10 text-center">Advisory Board</h3>
                                        </div>
                                    )}

                                    <div className="overflow-hidden hover:shadow-xl transition-shadow h-full border rounded-lg p-6">
                                        <div className="grid md:grid-cols-3 gap-4 items-center">
                                            <div className="md:col-span-1 bg-gray-50 flex items-center justify-center rounded-lg aspect-w-2 aspect-h-2">
                                                <img
                                                    src={leader.image}
                                                    alt={leader.name}
                                                    className="w-full h-full object-cover rounded-lg shadow-md"
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-gray-800">{leader.name}</h3>
                                                        <p className="text-pink-600 font-medium text-base">{leader.title}</p>
                                                    </div>
                                                    <div className="flex space-x-2 mt-3 md:mt-0">
                                                        {leader.social.linkedin && (
                                                            <a
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                href={leader.social.linkedin}
                                                                className="group p-2 rounded-full bg-white transition duration-300"
                                                                aria-label={`${leader.name}'s LinkedIn`}
                                                            >
                                                                <Linkedin className="h-5 w-5 text-pink-600 group-hover:drop-shadow-[0_0_6px_rgba(236,72,153,0.8)] transition duration-300" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                <p className="text-gray-700 text-sm">
                                                    {isExpanded ? leader.bio : truncate(leader.bio, 140)}
                                                    {leader.bio.length > 140 && (
                                                        <button
                                                            onClick={() => toggleLeaderBio(leader.id)}
                                                            className="text-pink-600 hover:text-pink-800 font-semibold ml-2"
                                                        >
                                                            {isExpanded ? 'Show Less' : 'Read More'}
                                                        </button>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </section>





            {/* Team Grid Section */}
            <section className="py-12 md:py-16 px-4 bg-pink-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-pink-700 mb-10 text-center">Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        {teamMembers.map((member, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                {/* Bigger square image box (2:2) */}
                                <div className="w-full max-w-[300px] aspect-w-1 aspect-h-1 mb-4">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover rounded-none"
                                    />
                                </div>

                                <h3 className="text-xl font-semibold text-pink-700">{member.name}</h3>
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

