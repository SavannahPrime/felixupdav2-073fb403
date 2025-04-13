import { useState, useEffect } from 'react';
import { Calendar, User, Tag, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
}

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch blog data from Supabase and transform it for front-end display
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) {
          console.error('Error fetching blog posts:', error);
        } else {
          // Transform the raw data into the shape used by BlogList
          const posts = (data || []).map((post: any) => ({
            id: post.id,
            title: post.title,
            excerpt: post.content
              ? post.content.length > 150
                ? post.content.substring(0, 150) + '...'
                : post.content
              : '',
            coverImage: post.image_url || '/default-image.png',
            date: new Date(post.created_at).toLocaleDateString(),
            author: 'Felix Oloo',
            tags: post.tags || [],
            readTime: '5 min read'
          }));
          setBlogPosts(posts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter posts by tag and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesFilter =
      filter === 'all' ||
      post.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()));
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Extract all unique tags from the real blog data
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  if (loading) {
    return <div className="py-16 text-center text-fashion-champagne">Loading blog posts...</div>;
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 px-4 py-2 bg-black/30 border border-fashion-gold/20 rounded-md text-fashion-champagne placeholder:text-fashion-champagne/50 focus:outline-none focus:border-fashion-gold/50"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'all'
                ? 'bg-fashion-gold/20 text-fashion-gold border border-fashion-gold/30'
                : 'bg-black/30 text-fashion-champagne/70 border border-fashion-gold/10 hover:border-fashion-gold/30'
            }`}
          >
            All Posts
          </button>

          {allTags.map(tag => (
            <button 
              key={tag} 
              onClick={() => setFilter(tag.toLowerCase())} 
              className={`px-3 py-1 rounded-full text-sm ${
                filter === tag.toLowerCase()
                  ? 'bg-fashion-gold/20 text-fashion-gold border border-fashion-gold/30'
                  : 'bg-black/30 text-fashion-champagne/70 border border-fashion-gold/10 hover:border-fashion-gold/30'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-fashion-champagne/60">No blog posts found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <div className="group bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg overflow-hidden hover:border-fashion-gold/40 transition-all duration-300">
      <div className="aspect-[16/9] overflow-hidden">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center text-xs text-fashion-champagne/60 mb-3 space-x-4">
          <span className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {post.date}
          </span>
          <span className="flex items-center">
            <User size={14} className="mr-1" />
            {post.author}
          </span>
        </div>

        <h3 className="text-xl font-serif text-fashion-champagne mb-3 group-hover:text-fashion-gold transition-colors">
          {post.title}
        </h3>

        <p className="text-fashion-champagne/80 text-sm mb-4">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-1 bg-fashion-gold/10 text-fashion-gold/80 rounded-full">
              <Tag size={10} className="inline mr-1" />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-fashion-champagne/60">{post.readTime}</span>
          <button className="flex items-center text-fashion-gold hover:text-fashion-champagne transition-colors text-sm">
            Read More <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
