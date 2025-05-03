
import { useEffect, useState } from 'react';
import V2Navbar from '../components/V2Navbar';
import V2Footer from '../components/V2Footer';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
  tags?: string[];
}

const V2BlogPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);

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
    <main className="min-h-screen bg-v2-navy text-v2-cream">
      <V2Navbar />
      
      {/* Progress indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-v2-lavender/10 z-50">
        <div className="h-full bg-v2-teal" style={{ width: `${scrollProgress}%` }}></div>
      </div>
      
      <div className={`pt-32 pb-20 transition-opacity duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="v2-container">
          <h1 className="v2-section-title mb-6">Blog</h1>
          <div className="mb-12 max-w-3xl mx-auto">
            <p className="text-v2-lavender text-center">
              Through his voice and experience, Felix shares thoughts on fashion, youth empowerment, 
              and building a future through platforms like Endeleza Youth Initiative.
            </p>
            <div className="w-full h-4 my-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-v2-teal/20 to-transparent"></div>
            </div>
          </div>
          
          <V2BlogList posts={posts} />
        </div>
      </div>
      
      <V2Footer />
    </main>
  );
};

const V2BlogList = ({ posts }: { posts: BlogPost[] }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-v2-lavender/60">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <V2BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

const V2BlogCard = ({ post }: { post: BlogPost }) => {
  // Format date
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get excerpt from content
  const excerpt = post.content.length > 120 
    ? post.content.substring(0, 120) + '...' 
    : post.content;

  return (
    <div className="v2-card h-full flex flex-col hover:border-v2-teal/50 transition-all duration-300">
      {post.image_url && (
        <div className="h-48 overflow-hidden rounded-t-lg">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-poppins text-xl text-v2-cream mb-2">{post.title}</h3>
        <p className="text-v2-lavender/60 text-sm mb-3">{formattedDate}</p>
        <p className="text-v2-lavender mb-4 flex-grow">{excerpt}</p>
        <div className="flex justify-between items-center mt-auto">
          <button className="text-v2-teal hover:text-v2-teal/80 transition-colors text-sm font-medium">
            Read More
          </button>
          {post.tags && post.tags.length > 0 && (
            <div className="flex space-x-2">
              {post.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="text-xs bg-v2-teal/10 text-v2-teal px-2 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default V2BlogPage;
