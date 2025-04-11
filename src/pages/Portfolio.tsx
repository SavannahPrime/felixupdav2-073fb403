
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import PortfolioGrid from '../components/PortfolioGrid';
import Footer from '../components/Footer';

const Portfolio = () => {
  useEffect(() => {
    // Set page title
    document.title = "Felix Oloo - Portfolio";
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-fashion-midnight text-fashion-champagne">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="luxury-container">
          <h1 className="section-title mb-6">Portfolio</h1>
          <h2 className="text-xl text-fashion-champagne/80 mb-16 max-w-3xl">
            Runway, Fashion & Pageant Model
          </h2>
          <p className="text-fashion-champagne/70 mb-16 max-w-3xl">
            Felix has modeled for major fashion runways, ad campaigns, and high-profile pageants, 
            known for his versatility and strong presence on stage and in front of the camera.
          </p>
          <PortfolioGrid />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Portfolio;
