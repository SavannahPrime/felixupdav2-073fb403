
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import BiographySection from '../components/BiographySection';
import Footer from '../components/Footer';

const Bio = () => {
  useEffect(() => {
    // Set page title
    document.title = "Felix Oloo - Biography";
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-fashion-midnight text-fashion-champagne">
      <Navbar />
      <div className="pt-32">
        <BiographySection />
      </div>
      <Footer />
    </main>
  );
};

export default Bio;
