
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import V2Navbar from '../components/V2Navbar';
import V2Footer from '../components/V2Footer';
import { Home } from 'lucide-react';

const V2NotFoundPage = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Felix Oloo - Page Not Found";
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-v2-navy text-v2-cream">
      <V2Navbar />
      
      <div className="pt-32 pb-20">
        <div className="v2-container flex flex-col items-center justify-center text-center">
          <div className="text-9xl font-bold text-v2-teal/50 mb-6">404</div>
          
          <h1 className="text-3xl font-poppins font-bold mb-4">Page Not Found</h1>
          
          <p className="text-v2-lavender max-w-md mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          
          <Link to="/" className="v2-btn-solid inline-flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Return to Homepage
          </Link>
        </div>
      </div>
      
      <V2Footer />
    </main>
  );
};

export default V2NotFoundPage;
