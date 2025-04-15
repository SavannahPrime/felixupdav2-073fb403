import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Contact = () => {
  useEffect(() => {
    // Set page title and scroll to top
    document.title = "Felix Oloo - Contact";
    window.scrollTo(0, 0);
    
    // If deploying on Azure, ensure to run your best practices tool
    // azure_development-get_best_practices
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
