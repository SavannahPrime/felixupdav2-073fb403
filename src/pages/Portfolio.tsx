
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
          <h1 className="section-title mb-16">Portfolio</h1>
          <PortfolioGrid />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Portfolio;
