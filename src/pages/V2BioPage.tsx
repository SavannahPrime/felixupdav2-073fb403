
import { useEffect } from 'react';
import V2Navbar from '../components/V2Navbar';
import V2BiographySection from '../components/V2BiographySection';
import V2Footer from '../components/V2Footer';

const V2BioPage = () => {
  useEffect(() => {
    document.title = "Felix Oloo - Biography";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-v2-navy text-v2-cream">
      <V2Navbar />
      <div className="pt-32">
        <V2BiographySection />
      </div>
      <V2Footer />
    </main>
  );
};

export default V2BioPage;
