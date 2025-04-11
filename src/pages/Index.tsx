
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PortfolioGrid from '../components/PortfolioGrid';
import BiographySection from '../components/BiographySection';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "Felix Oloo - High Fashion Model";
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
    };
  }, []);

  return (
    <main className="min-h-screen bg-fashion-midnight text-fashion-champagne">
      <Navbar />
      <Hero />
      <PortfolioGrid />
      <BiographySection />
      
      {/* New Endeleza Youth Initiative Section instead of Contact Form */}
      <section id="endeleza-initiative" className="py-20 relative">
        <div className="luxury-container">
          <h2 className="section-title mb-6">Endeleza Youth Initiative</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <img 
                src="/lovable-uploads/9cc996e1-4d26-46da-b0a1-8dd9fef205b6.png" 
                alt="Endeleza Youth Initiative Logo" 
                className="w-40 md:w-48 mx-auto md:mx-0 mb-6"
              />
              <p className="text-fashion-champagne/80 mb-6">
                Founded by Felix Oloo, the Endeleza Youth Initiative is a youth-led, non-profit organization 
                dedicated to empowering young people and transforming lives across Kenya through education, 
                advocacy, mentorship, and sustainable development.
              </p>
              <p className="text-fashion-champagne/80 mb-8">
                Our mission is to empower young people through education, mentorship, and skill development 
                while promoting sustainable community solutions in areas such as child rights advocacy, water 
                and sanitation, and socio-economic growth.
              </p>
              <Link 
                to="/endeleza" 
                className="btn-luxury inline-flex items-center"
              >
                Learn More About Endeleza
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/dd5de1ca-c0ec-42fb-b873-60644077c079.png" 
                  alt="Endeleza Initiative Students" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/4d25893c-e0e0-4cee-85f3-3790d4b76275.png" 
                  alt="Endeleza Initiative Students with Leader" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/75d2a611-491d-48fa-8f51-d4aac3707f31.png" 
                  alt="Endeleza Initiative Leadership Meeting" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden bg-black/40 flex flex-col items-center justify-center p-4">
                <p className="text-fashion-gold font-serif text-lg mb-2 text-center">Join Our Cause</p>
                <Link 
                  to="/volunteer" 
                  className="text-fashion-champagne hover:text-fashion-gold transition-colors text-sm text-center"
                >
                  Volunteer with Endeleza
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 w-32 h-32 border-r-2 border-b-2 border-fashion-gold/20 -z-10"></div>
        <div className="absolute left-0 top-1/2 w-32 h-32 border-l-2 border-t-2 border-fashion-gold/20 -z-10"></div>
      </section>
      
      <Footer />
    </main>
  );
};

export default Index;
