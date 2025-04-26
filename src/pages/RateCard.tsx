import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const RateCard = () => {
  return (
    <main className="min-h-screen bg-fashion-midnight text-fashion-champagne">
      <div className="luxury-container py-20">
        <Link to="/" className="btn-luxury inline-flex items-center mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight text-center mb-10">
          Professional Rates &amp; Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Rates List */}
          <div className="space-y-6">
            <ul className="space-y-4 text-lg">
              <li className="flex justify-between items-center border-b border-gray-700 py-2">
                <span className="font-medium">Runway Model</span>
                <span className="font-semibold">Ksh. 12,000</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-700 py-2">
                <span className="font-medium">Runway Training</span>
                <span className="font-semibold">Ksh. 30,000</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-700 py-2">
                <span className="font-medium">Fashion Shoot</span>
                <span className="font-semibold">Ksh. 20,000</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-700 py-2">
                <span className="font-medium">Judging</span>
                <span className="font-semibold">Ksh. 20,000</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-700 py-2">
                <span className="font-medium">Fashion Content Creation</span>
                <span className="font-semibold">Ksh. 20,000</span>
              </li>
            </ul>
          </div>
          {/* Model Image */}
          <div className="flex flex-col items-center">
            <img
              src="/images/model.jpg" // Replace with the actual path to the model's image
              alt="Model"
              className="rounded-lg shadow-lg w-full max-w-md"
            />
            <p className="text-center text-fashion-champagne/80 mt-4">
              Felix Oloo - High Fashion Model
            </p>
          </div>
        </div>

        {/* Measurements Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Measurements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="space-y-4 text-lg">
              <li className="flex justify-between items-center border-b border-gray-700 py-2">
                <span className="font-medium">Height</span>
                <span className="font-semibold">6'2" (188 cm)</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-700 py-2">
                <span className="font-medium">Chest</span>
                <span className="font-semibold">38" (96 cm)</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-700 py-2">
                <span className="font-medium">Waist</span>
                <span className="font-semibold">32" (81 cm)</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-700 py-2">
                <span className="font-medium">Hips</span>
                <span className="font-semibold">38" (96 cm)</span>
              </li>
            </ul>
            <ul className="space-y-4 text-lg">
              <li className="flex justify-between items-center border-b border-gray-700 py-2">
                <span className="font-medium">Shoe Size</span>
                <span className="font-semibold">10 (US) / 44 (EU)</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-700 py-2">
                <span className="font-medium">Hair Color</span>
                <span className="font-semibold">Black</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-700 py-2">
                <span className="font-medium">Eye Color</span>
                <span className="font-semibold">Brown</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
};

export default RateCard;