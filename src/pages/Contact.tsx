
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Contact = () => {
  useEffect(() => {
    // Set page title
    document.title = "Felix Oloo - Contact";
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-fashion-midnight text-fashion-champagne">
      <Navbar />
      <div className="pt-32">
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
};

export default Contact;
