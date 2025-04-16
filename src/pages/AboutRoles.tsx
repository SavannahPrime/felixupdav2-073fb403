import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutRoles = () => {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const roles = {
    organizer: {
      title: "Event Organizer",
      description: `Felix Oloo is a professional event organizer and producer, specializing in fashion, pageantry, and high-profile events. 
      He has successfully organized and produced renowned events such as Mr. & Miss Heritage International Kenya, Mr. Nairobi County, 
      and Beauty of Africa International Pageant Kenya. With expertise in event planning, logistics, and execution, Felix ensures seamless 
      and impactful productions that elevate industry standards.`,
      image: "/public/lovable-uploads/about.jpg",
    },
    judge: {
      title: "Event Judge",
      description: `Felix Oloo is a professional event judge with 9 years of experience in fashion and pageantry, specializing in runway, poise, 
      and presentation evaluation. He has judged prestigious competitions, including Mr. & Miss Heritage International Kenya, Mr. Nairobi County, 
      and Beauty of Africa International Pageant Kenya. His expertise ensures fair, insightful, and professional assessments, contributing to the 
      growth and credibility of the industry.`,
      image: "/public/lovable-uploads/judge.jpg",
    },
    instructor: {
      title: "Runway Instructor",
      description: `Felix Oloo is a runway instructor with expertise in catwalk training, posture, and stage presence. He has trained numerous 
      models, preparing them for fashion shows, pageants, and commercial modeling. His instruction focuses on confidence, elegance, and technical 
      precision, ensuring models excel in the competitive fashion industry.`,
      image: "/public/lovable-uploads/Runway.jpg",
    },
  };

  useEffect(() => {
    const role = searchParams.get('role');
    if (role && roles[role]) {
      setActiveRole(role);
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-fashion-midnight text-fashion-champagne">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="luxury-container text-center">
          <h1 className="section-title mb-6">About Felix Oloo</h1>
          <p className="text-fashion-champagne/70 max-w-3xl mx-auto mb-12">
            Discover more about Felix Oloo's expertise and contributions to the fashion and pageantry industries.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-6 mb-12">
            <button
              onClick={() => setActiveRole("organizer")}
              className={`px-6 py-3 rounded ${
                activeRole === "organizer" ? "bg-fashion-gold text-black" : "border border-fashion-gold text-fashion-gold"
              } hover:bg-fashion-gold/80 transition`}
            >
              Event Organizer
            </button>
            <button
              onClick={() => setActiveRole("judge")}
              className={`px-6 py-3 rounded ${
                activeRole === "judge" ? "bg-fashion-gold text-black" : "border border-fashion-gold text-fashion-gold"
              } hover:bg-fashion-gold/80 transition`}
            >
              Event Judge
            </button>
            <button
              onClick={() => setActiveRole("instructor")}
              className={`px-6 py-3 rounded ${
                activeRole === "instructor" ? "bg-fashion-gold text-black" : "border border-fashion-gold text-fashion-gold"
              } hover:bg-fashion-gold/80 transition`}
            >
              Runway Instructor
            </button>
          </div>

          {/* Role Details */}
          {activeRole && (
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src={roles[activeRole].image}
                alt={roles[activeRole].title}
                className="w-full md:w-1/2 rounded-lg shadow-lg"
              />
              <div className="text-left">
                <h2 className="text-3xl font-bold text-fashion-gold mb-4">{roles[activeRole].title}</h2>
                <p className="text-fashion-champagne/70">{roles[activeRole].description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AboutRoles;