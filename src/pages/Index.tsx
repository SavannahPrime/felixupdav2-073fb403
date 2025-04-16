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
       {/* Biography Section */}
       <BiographySection />
       
       {/* Rate Card Section */}
       <section id="rate-card" className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
        <div className="luxury-container">
          <h2 className="section-title mb-10 text-4xl font-extrabold tracking-tight text-center">
            Professional Rates &amp; Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Rates List */}
            <div className="space-y-6">
              <ul className="space-y-4 text-lg">
                <li className="flex justify-between items-center border-b border-gray-700 py-2">
                  <span className="font-medium">Runway Model</span>
                  <span className="font-semibold">Ksh. 12,000</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-700 py-2">
                  <span className="font-medium">Runway Training</span>
                  <span className="font-semibold">Ksh. 30,000</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-700 py-2">
                  <span className="font-medium">Fashion Shoot</span>
                  <span className="font-semibold">Ksh. 20,000</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-700 py-2">
                  <span className="font-medium">Judging</span>
                  <span className="font-semibold">Ksh. 20,000</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-700 py-2">
                  <span className="font-medium">Fashion Content Creation</span>
                  <span className="font-semibold">Ksh. 20,000</span>
                </li>
              </ul>
            </div>
            {/* Social Metrics */}
            <div className="flex flex-col justify-center text-center bg-gray-800 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Social Metrics</h3>
              <p className="text-lg mb-2">
                <span className="font-medium">Instagram:</span> <span className="font-semibold">@felix_oloo_</span>
              </p>
              <p className="text-lg">
                <span className="font-medium">Followers:</span> <span className="font-semibold">27.5k</span>
              </p>
            </div>
          </div>
        </div>
      </section>

     
      <PortfolioGrid />
      
     
      
      {/* Endeleza Youth Initiative Section */}
      <section id="endeleza-initiative" className="py-20 relative">
        <div className="luxury-container">
          <h2 className="section-title mb-6">Endeleza Youth Initiative</h2>
          <p className="text-fashion-champagne/80 mb-6">
            Empowering youth through education, mentorship, and sustainable development across Kenya.
          </p>
          <Link 
            to="/endeleza" 
            className="btn-luxury inline-flex items-center"
          >
            Learn More About Endeleza
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
