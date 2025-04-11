
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import VolunteerForm from '../components/VolunteerForm';
import Footer from '../components/Footer';

const Volunteer = () => {
  useEffect(() => {
    // Set page title
    document.title = "Felix Oloo - Volunteer";
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-fashion-midnight text-fashion-champagne">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="luxury-container">
          <h1 className="section-title mb-6">Volunteer Registration</h1>
          <p className="text-fashion-champagne/80 text-center max-w-2xl mx-auto mb-16">
            Join our community of passionate volunteers and help make a difference in the fashion industry. 
            Whether you're interested in event coordination, mentoring, or creative direction, 
            there's a place for you in our programs.
          </p>
          <VolunteerForm />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Volunteer;
