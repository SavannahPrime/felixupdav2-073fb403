
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import V2Navbar from '../components/V2Navbar';
import V2Footer from '../components/V2Footer';

const RateCard = () => {
  return (
    <main className="min-h-screen bg-v2-navy text-v2-cream">
      <V2Navbar />
      
      <div className="v2-container py-32">
        <Link to="/" className="v2-btn inline-flex items-center mb-12">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold tracking-tight text-center mb-10">
          Professional Rates &amp; Services
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Rates List */}
          <div className="v2-card p-8">
            <h2 className="text-xl font-medium text-v2-teal mb-6">Service Rates</h2>
            <ul className="space-y-6">
              <li className="flex justify-between items-center border-b border-white/10 py-4">
                <span className="font-medium">Runway Model</span>
                <span className="font-semibold text-v2-teal">Ksh. 12,000</span>
              </li>
              <li className="flex justify-between items-center border-b border-white/10 py-4">
                <span className="font-medium">Runway Training</span>
                <span className="font-semibold text-v2-teal">Ksh. 30,000</span>
              </li>
              <li className="flex justify-between items-center border-b border-white/10 py-4">
                <span className="font-medium">Fashion Shoot</span>
                <span className="font-semibold text-v2-teal">Ksh. 20,000</span>
              </li>
              <li className="flex justify-between items-center border-b border-white/10 py-4">
                <span className="font-medium">Judging</span>
                <span className="font-semibold text-v2-teal">Ksh. 20,000</span>
              </li>
              <li className="flex justify-between items-center border-b border-white/10 py-4">
                <span className="font-medium">Fashion Content Creation</span>
                <span className="font-semibold text-v2-teal">Ksh. 20,000</span>
              </li>
            </ul>
          </div>
          
          {/* Model Image */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img
                src="/images/model.jpg" // Replace with the actual path to the model's image
                alt="Model"
                className="rounded-lg shadow-lg w-full max-w-md object-cover h-[500px]"
              />
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-v2-teal/40 rounded-br"></div>
              <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-v2-teal/40 rounded-tl"></div>
            </div>
            <p className="text-center text-v2-lavender mt-6">
              Felix Oloo - High Fashion Model
            </p>
          </div>
        </div>

        {/* Measurements Section */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Measurements</h2>
          <div className="v2-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ul className="space-y-6">
                <li className="flex justify-between items-center border-b border-white/10 py-4">
                  <span className="font-medium">Height</span>
                  <span className="font-semibold">6'2" (188 cm)</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/10 py-4">
                  <span className="font-medium">Chest</span>
                  <span className="font-semibold">38" (96 cm)</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/10 py-4">
                  <span className="font-medium">Waist</span>
                  <span className="font-semibold">32" (81 cm)</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/10 py-4">
                  <span className="font-medium">Hips</span>
                  <span className="font-semibold">38" (96 cm)</span>
                </li>
              </ul>
              <ul className="space-y-6">
                <li className="flex justify-between items-center border-b border-white/10 py-4">
                  <span className="font-medium">Shoe Size</span>
                  <span className="font-semibold">10 (US) / 44 (EU)</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/10 py-4">
                  <span className="font-medium">Hair Color</span>
                  <span className="font-semibold">Black</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/10 py-4">
                  <span className="font-medium">Eye Color</span>
                  <span className="font-semibold">Brown</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="mt-16 text-center">
          <Link to="/contact" className="v2-btn-solid">
            Book Now
          </Link>
        </section>
      </div>
      
      <V2Footer />
    </main>
  );
};

export default RateCard;
