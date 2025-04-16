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
            Runway Model, Event Organiser & Event Judge 
          </h2>
          <p className="text-fashion-champagne/70 mb-16 max-w-3xl">
            Felix Oloo is a seasoned fashion and runway model, model trainer, and event organizer 
            with expertise in pageantry, catwalk coaching, and event production. As the General Manager 
            of Iconic Dash Modeling Academy, he has trained and mentored numerous models. He is also the 
            Director of Endeleza Youth Initiative, supporting educational projects. Beyond fashion, he is 
            an entrepreneur with investments in poultry and sugarcane farming. Felix is a respected event 
            judge and business strategist, dedicated to excellence in the modeling and entertainment industries.
          </p>
          <PortfolioGrid />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Portfolio;
