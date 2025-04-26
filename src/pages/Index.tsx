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
  }, []);

  return (
    <main className="min-h-screen bg-fashion-midnight text-fashion-champagne">
      <Navbar />
      <Hero />
      {/* Biography Section */}
      <BiographySection />

      {/* Button to View Rate Card */}
      <section className="py-20 text-center">
        <Link to="/rate-card" className="btn-luxury inline-flex items-center">
          View Professional Rates &amp; Services
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
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
