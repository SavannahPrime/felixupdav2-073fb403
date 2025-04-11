
import { useState } from 'react';
import { Calendar, User, Tag, ChevronRight } from 'lucide-react';

// Sample blog data (in a real app, this would come from a database)
const BLOG_POSTS = [
  {
    id: 1,
    title: "My Journey Through Paris Fashion Week",
    excerpt: "Reflecting on my recent experience walking for three major design houses during this season's Paris Fashion Week...",
    coverImage: "/lovable-uploads/ace1ff45-5ee5-4476-b9bc-44bf0a639a1c.png",
    date: "March 15, 2025",
    author: "Felix Oloo",
    tags: ["Fashion Week", "Paris", "Runway"],
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Behind the Scenes: Vogue Editorial Shoot",
    excerpt: "An inside look at what happens during a high-profile magazine editorial shoot and how models prepare...",
    coverImage: "/lovable-uploads/ace1ff45-5ee5-4476-b9bc-44bf0a639a1c.png",
    date: "February 23, 2025",
    author: "Felix Oloo",
    tags: ["Editorial", "Magazine", "Photography"],
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Model Fitness: My Daily Routine",
    excerpt: "I'm often asked about how I stay in shape for shoots and runway shows. Here's my detailed fitness and nutrition regimen...",
    coverImage: "/lovable-uploads/ace1ff45-5ee5-4476-b9bc-44bf0a639a1c.png",
    date: "January 30, 2025",
    author: "Felix Oloo",
    tags: ["Fitness", "Wellness", "Lifestyle"],
    readTime: "10 min read"
  }
];

const BlogList = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter posts by tag and search query
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesFilter = filter === 'all' || post.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()));
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Extract all unique tags
  const allTags = Array.from(new Set(BLOG_POSTS.flatMap(post => post.tags)));
  
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
            className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-fashion-gold/20 text-fashion-gold border border-fashion-gold/30' : 'bg-black/30 text-fashion-champagne/70 border border-fashion-gold/10 hover:border-fashion-gold/30'}`}
          >
            All Posts
          </button>
          
          {allTags.map(tag => (
            <button 
              key={tag} 
              onClick={() => setFilter(tag.toLowerCase())} 
              className={`px-3 py-1 rounded-full text-sm ${filter === tag.toLowerCase() ? 'bg-fashion-gold/20 text-fashion-gold border border-fashion-gold/30' : 'bg-black/30 text-fashion-champagne/70 border border-fashion-gold/10 hover:border-fashion-gold/30'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-fashion-champagne/60">No blog posts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

const BlogCard = ({ post }: { post: typeof BLOG_POSTS[number] }) => {
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
        
        <h3 className="text-xl font-serif text-fashion-champagne mb-3 group-hover:text-fashion-gold transition-colors">{post.title}</h3>
        
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
