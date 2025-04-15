import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import BlogList from '../components/BlogList';
import Footer from '../components/Footer';
import { Progress } from "@/components/ui/progress";
import { supabase } from '@/integrations/supabase/client';

const Blog = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);

  // Fetch posts from backend via Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data || []);
      }
    };
    fetchPosts();
  }, []);

  // Runway audio effect on page load
  useEffect(() => {
    const runwayAudio = new Audio('/runway-music.mp3');
    runwayAudio.volume = 0.1;
    runwayAudio.play().catch(err => console.log('Audio playback prevented:', err));
    
    return () => {
      runwayAudio.pause();
      runwayAudio.currentTime = 0;
    };
  }, []);

  // Set page title, smooth scroll to top and handle scroll progress
  useEffect(() => {
    document.title = "Felix Oloo - Blog";
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
      setPageLoaded(true);
    }, 300);
    
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-fashion-midnight text-fashion-champagne relative overflow-hidden">
      {/* Nebula background */}
      <div className="fixed inset-0 opacity-20 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0ic3RhciIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSJ3aGl0ZSIgc3RvcC1vcGFjaXR5PSIwLjMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxjaXJjbGUgY3g9IjEwJSIgY3k9IjEwJSIgcj0iMXB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iMzAlIiBjeT0iMjAlIiByPSIwLjVweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjUwJSIgY3k9IjE1JSIgcj0iMXB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iNzAlIiBjeT0iMjAlIiByPSIwLjhweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjkwJSIgY3k9IjE1JSIgcj0iMC42cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSIyMCUiIGN5PSI0MCUiIHI9IjAuN3B4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iNDAlIiBjeT0iMzUlIiByPSIwLjRweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjgwJSIgY3k9IjQwJSIgcj0iMC41cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSIxNSUiIGN5PSI2MCUiIHI9IjAuOHB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iMzUlIiBjeT0iNjUlIiByPSIwLjZweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjU1JSIgY3k9IjcwJSIgcj0iMC45cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSI3NSUiIGN5PSI2MCUiIHI9IjAuNXB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iOTUlIiBjeT0iNjUlIiByPSIwLjdweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjI1JSIgY3k9IjkwJSIgcj0iMC40cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSI0NSUiIGN5PSI4NSUiIHI9IjAuNnB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iNjUlIiBjeT0iOTAlIiByPSIwLjhweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9Ijg1JSIgY3k9Ijg1JSIgcj0iMC41cHgiIGZpbGw9InVybCgjc3RhcikiLz48L3N2Zz4=')]">
         <div className="absolute inset-0 bg-gradient-radial from-indigo-900/10 to-transparent"></div>
      </div>
      
      <Navbar />
      
      {/* Measuring tape progress bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-fashion-champagne/10 z-50">
        <div className="relative h-full bg-fashion-gold" style={{ width: `${scrollProgress}%` }}>
          <div className="absolute -top-6 right-0 text-xs text-fashion-gold tracking-wide">
            {Math.round(scrollProgress)}cm
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute top-0 h-2 w-0.5 bg-fashion-champagne/20"
              style={{ left: `${i * 5}%`, height: i % 4 === 0 ? '8px' : '4px' }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className={`pt-32 pb-20 transition-opacity duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="luxury-container text-center">
          <h1 className="section-title mb-6">
        Blog
          </h1>
          <div className="mb-12 max-w-3xl mx-auto">
            <p className="text-fashion-champagne/70 text-center">
              Through his voice and experience, Felix shares thoughts on fashion, youth empowerment, 
              and building a future through platforms like Endeleza Youth Initiative.
            </p>
            <div className="w-full h-4 my-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fashion-gold/20 to-transparent"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJmYWJyaWMiIHg9IjAiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMCwwIEwgNCw0IE0gNCwwIEwgMCw0IiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlPSJyZ2JhKDIxMiwgMTc1LCA1NSwgMC4zKSIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2ZhYnJpYykiLz48L3N2Zz4=')]"></div>
            </div>
          </div>
          
          <BlogList posts={posts} />
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default Blog;
