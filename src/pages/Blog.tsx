
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import BlogList from '../components/BlogList';
import Footer from '../components/Footer';

const Blog = () => {
  useEffect(() => {
    // Set page title
    document.title = "Felix Oloo - Blog";
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-fashion-midnight text-fashion-champagne">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="luxury-container">
          <h1 className="section-title mb-16">Blog</h1>
          <BlogList />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Blog;
