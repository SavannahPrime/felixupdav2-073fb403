
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CustomNavbar from '@/components/CustomNavbar';

const CustomIndex: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section with background image */}
      <div 
        className="h-screen bg-cover bg-center flex flex-col" 
        style={{ 
          backgroundImage: 'url("/lovable-uploads/8e031a32-a817-4e19-b4fa-43bd23721f2e.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Navigation */}
        <CustomNavbar />
        
        {/* Hero content */}
        <div className="flex-1 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Catwalk Couture Digital</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            Elevating fashion through digital innovation and creative excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">
              <Link to="/portfolio">View Portfolio</Link>
            </Button>
            <Button asChild className="bg-transparent border-2 border-white hover:bg-white hover:text-black transition-colors px-8 py-6 text-lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomIndex;
