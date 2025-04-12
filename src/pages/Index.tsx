
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
