
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import V2SocialMediaDock from './V2SocialMediaDock';
import { X } from 'lucide-react';

// Portfolio item type
type PortfolioItem = {
  id: string;
  image_url: string;
  title: string;
  category: string;
  created_at: string;
};

const V2PortfolioGrid = () => {
  const [filter, setFilter] = useState<string>('all');
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  
  // Fetch portfolio data from Supabase
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // Filter out items without images
        const validItems = data?.filter(item => item.image_url) || [];
        setPortfolioData(validItems);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(validItems.map(item => item.category).filter(Boolean))
        ) as string[];
        
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        toast.error('Failed to load portfolio items');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPortfolioItems();
  }, []);
  
  // Filter items when filter or data changes
  useEffect(() => {
    if (filter === 'all') {
      setFilteredItems(portfolioData);
    } else {
      setFilteredItems(
        portfolioData.filter(item => 
          item.category?.toLowerCase() === filter.toLowerCase()
        )
      );
    }
  }, [filter, portfolioData]);

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  // Fallback for empty or loading state
  if (loading) {
    return (
      <section id="portfolio" className="py-20 relative">
        <div className="v2-container">
          <h2 className="v2-section-title mb-16">Portfolio</h2>
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 rounded-full border-4 border-v2-teal border-t-transparent animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="v2-container">
        <h2 className="v2-section-title mb-16">Portfolio</h2>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center mb-12 gap-4">
          <button 
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              filter === 'all' 
                ? 'bg-v2-teal/20 text-v2-teal' 
                : 'text-v2-cream/70 hover:text-v2-cream hover:bg-white/5'
            }`}
            onClick={() => setFilter('all')}
          >
            All Work
          </button>
          
          {categories.map(category => (
            <button 
              key={category}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                filter === category.toLowerCase() 
                  ? 'bg-v2-teal/20 text-v2-teal' 
                  : 'text-v2-cream/70 hover:text-v2-cream hover:bg-white/5'
              }`}
              onClick={() => setFilter(category.toLowerCase())}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Portfolio grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-v2-lavender">No portfolio items found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                className="v2-portfolio-item v2-group"
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-[400px] object-cover"
                  />
                  
                  <div className="v2-portfolio-overlay">
                    <h3 className="text-xl font-medium text-v2-cream">{item.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-v2-teal">{item.category}</span>
                      <span className="text-sm text-v2-lavender">
                        {new Date(item.created_at).getFullYear().toString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Social Media Icons */}
                  <div 
                    className={`absolute top-4 right-4 transition-all duration-300 transform ${
                      hoveredItem === item.id 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 -translate-y-4'
                    }`}
                  >
                    <V2SocialMediaDock />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Load more button */}
        {filteredItems.length > 0 && (
          <div className="mt-16 text-center">
            <button className="v2-btn">
              View More
            </button>
          </div>
        )}
      </div>
      
      {/* Modal for enlarged portfolio item */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <button 
            className="absolute top-8 right-8 text-v2-cream hover:text-v2-teal transition-colors"
            onClick={closeModal}
          >
            <X size={24} />
          </button>
          
          <div className="max-w-4xl w-full bg-v2-navy/60 rounded-lg overflow-hidden">
            <img 
              src={selectedItem.image_url} 
              alt={selectedItem.title} 
              className="w-full max-h-[80vh] object-contain"
            />
            
            <div className="p-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-medium text-v2-cream">{selectedItem.title}</h3>
                <div className="flex gap-4 mt-2">
                  <span className="text-v2-teal">{selectedItem.category}</span>
                  <span className="text-v2-lavender">
                    {new Date(selectedItem.created_at).getFullYear().toString()}
                  </span>
                </div>
              </div>
              <V2SocialMediaDock />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default V2PortfolioGrid;
