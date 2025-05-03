
import { useEffect } from 'react';
import V2Navbar from '../components/V2Navbar';
import V2VolunteerForm from '../components/V2VolunteerForm';
import V2Footer from '../components/V2Footer';

const V2VolunteerPage = () => {
  useEffect(() => {
    document.title = "Felix Oloo - Volunteer";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-v2-navy text-v2-cream">
      <V2Navbar />
      <div className="pt-32 pb-20">
        <div className="v2-container max-w-5xl">
          <h1 className="v2-section-title mb-6">Volunteer Registration</h1>
          
          <p className="text-v2-lavender text-center max-w-2xl mx-auto mb-16">
            Felix leads a mission to empower Kenyan youth with education and mentorship, offering opportunities 
            and hope for a better tomorrow. Join our community of passionate volunteers and help make a difference 
            in the lives of young Kenyans through education, arts, and fashion.
          </p>
          
          <div className="v2-card p-8 rounded-lg border border-white/10">
            <V2VolunteerForm />
          </div>
        </div>
      </div>
      <V2Footer />
    </main>
  );
};

export default V2VolunteerPage;
