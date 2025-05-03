
import { useEffect } from 'react';
import V2Navbar from '../components/V2Navbar';
import V2ContactSection from '../components/V2ContactSection';
import V2Footer from '../components/V2Footer';

const V2ContactPage = () => {
  useEffect(() => {
    document.title = "Felix Oloo - Contact";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-v2-navy text-v2-cream">
      <V2Navbar />
      <div className="pt-32">
        <V2ContactSection />
      </div>
      <V2Footer />
    </main>
  );
};

export default V2ContactPage;
