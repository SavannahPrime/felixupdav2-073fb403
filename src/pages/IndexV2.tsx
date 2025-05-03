
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import V2Navbar from '../components/V2Navbar';
import V2Hero from '../components/V2Hero';
import V2PortfolioGrid from '../components/V2PortfolioGrid';
import V2BiographySection from '../components/V2BiographySection';
import V2Footer from '../components/V2Footer';

const IndexV2 = () => {
  useEffect(() => {
    // Set page title
    document.title = "Felix Oloo - High Fashion Model";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-v2-navy text-v2-cream">
      <V2Navbar />
      
      {/* Hero Section */}
      <V2Hero />
      
      {/* Biography Section */}
      <V2BiographySection />

      {/* Button to View Rate Card */}
      <section className="py-20 text-center bg-v2-card">
        <div className="v2-container">
          <h2 className="text-3xl font-bold mb-6">Professional Services & Rates</h2>
          <p className="text-v2-lavender mb-8 max-w-xl mx-auto">
            Inquire about rates for runway shows, modeling classes, event judging, and more.
          </p>
          <Link 
            to="/rate-card" 
            className="v2-btn-solid inline-flex items-center"
          >
            View Professional Rates
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Portfolio Section */}
      <V2PortfolioGrid />

      {/* Endeleza Youth Initiative Section */}
      <section id="endeleza-initiative" className="py-24 relative bg-v2-card">
        <div className="v2-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="v2-section-title mb-6">Endeleza Youth Initiative</h2>
            <p className="text-v2-lavender mb-8">
              Empowering youth through education, mentorship, and sustainable development across Kenya.
              Building a brighter future through community-driven projects and initiatives.
            </p>
            <Link
              to="/endeleza"
              className="v2-btn-solid inline-flex items-center"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden z-0 opacity-10">
          <div className="absolute w-96 h-96 rounded-full bg-v2-teal/20 blur-3xl -top-20 -left-20"></div>
          <div className="absolute w-96 h-96 rounded-full bg-v2-coral/10 blur-3xl -bottom-20 -right-20"></div>
        </div>
      </section>

      <V2Footer />
    </main>
  );
};

export default IndexV2;
