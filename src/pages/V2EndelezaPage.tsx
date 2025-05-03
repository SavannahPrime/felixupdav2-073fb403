
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import V2Navbar from '../components/V2Navbar';
import V2Footer from '../components/V2Footer';
import { ArrowRight } from 'lucide-react';

const V2EndelezaPage = () => {
  useEffect(() => {
    document.title = "Felix Oloo - Endeleza Youth Initiative";
    window.scrollTo(0, 0);
  }, []);

  const initiatives = [
    {
      title: "Education Support",
      description: "Providing scholarships, mentorship, and educational resources to underprivileged youth across Kenya.",
      image: "/lovable-uploads/4d25893c-e0e0-4cee-85f3-3790d4b76275.png"
    },
    {
      title: "Arts & Culture",
      description: "Promoting artistic expression through fashion shows, cultural events, and creative workshops.",
      image: "/lovable-uploads/75d2a611-491d-48fa-8f51-d4aac3707f31.png"
    },
    {
      title: "Environmental Conservation",
      description: "Leading community clean-ups, tree planting initiatives, and environmental awareness programs.",
      image: "/lovable-uploads/8e031a32-a817-4e19-b4fa-43bd23721f2e.png"
    }
  ];

  return (
    <main className="min-h-screen bg-v2-navy text-v2-cream">
      <V2Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-v2-teal/5 to-transparent"></div>
        <div className="v2-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Endeleza Youth Initiative</h1>
            <p className="text-v2-lavender text-lg mb-8">
              Empowering youth through education, mentorship, and sustainable development across Kenya.
            </p>
            <Link to="/volunteer" className="v2-btn-solid">
              Join Our Mission
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16">
        <div className="v2-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="v2-section-title mb-6">Our Mission</h2>
              <p className="text-v2-lavender mb-6">
                Endeleza Youth Initiative was founded with a simple but powerful mission: to create sustainable 
                opportunities for young Kenyans through education, arts, and community development.
              </p>
              <p className="text-v2-lavender mb-6">
                By combining Felix's experience in the fashion industry with a passion for youth empowerment, 
                Endeleza creates programs that not only develop practical skills but also nurture creativity 
                and foster leadership.
              </p>
              <p className="text-v2-lavender">
                Our goal is to build a future where every young person has the opportunity to discover their 
                talents, pursue their dreams, and contribute positively to their communities.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/97f9824b-6c53-49d0-8b3d-6288a3588b6e.png" 
                alt="Endeleza Youth Initiative" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Initiatives Section */}
      <section className="py-16 bg-v2-card">
        <div className="v2-container">
          <h2 className="v2-section-title mb-12 text-center">Our Initiatives</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <div key={index} className="v2-card rounded-lg overflow-hidden hover:border-v2-teal/50 transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={initiative.image} 
                    alt={initiative.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-poppins text-v2-cream mb-3">{initiative.title}</h3>
                  <p className="text-v2-lavender">{initiative.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section className="py-16">
        <div className="v2-container">
          <h2 className="v2-section-title mb-12 text-center">Our Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-v2-teal mb-2">500+</div>
              <p className="text-v2-lavender">Youth Mentored</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-v2-teal mb-2">20+</div>
              <p className="text-v2-lavender">Community Projects</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-v2-teal mb-2">5</div>
              <p className="text-v2-lavender">Counties Reached</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Get Involved Section */}
      <section className="py-16 bg-v2-card">
        <div className="v2-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="v2-section-title mb-6">Get Involved</h2>
            <p className="text-v2-lavender mb-8">
              There are many ways to support the Endeleza Youth Initiative. Whether you want to volunteer your time, 
              donate resources, or partner with us on projects, your contribution can make a significant difference 
              in the lives of young Kenyans.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/volunteer" className="v2-btn-solid">
                Volunteer With Us
              </Link>
              <Link to="/projects" className="v2-btn">
                Our Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <V2Footer />
    </main>
  );
};

export default V2EndelezaPage;
