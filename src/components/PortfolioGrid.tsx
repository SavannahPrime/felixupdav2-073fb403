
import { useState, useEffect } from 'react';
import SocialMediaDock from './SocialMediaDock';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import TooltipWrapper from './ui/TooltipWrapper';

// Portfolio item type
type PortfolioItem = {
  id: string;
  image_url: string;
  title: string;
  category: string;
  created_at: string;
};

const PortfolioGrid = () => {
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
        <div className="luxury-container">
          <h2 className="section-title mb-16">images</h2>
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 rounded-full border-4 border-fashion-gold border-t-transparent animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="luxury-container">
        <h2 className="section-title mb-16">Images</h2>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          <button 
            className={`px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${filter === 'all' ? 'text-fashion-gold border-b border-fashion-gold' : 'text-fashion-champagne/70 border-b border-transparent hover:text-fashion-champagne'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {categories.map(category => (
            <button 
              key={category}
              className={`px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${filter === category.toLowerCase() ? 'text-fashion-gold border-b border-fashion-gold' : 'text-fashion-champagne/70 border-b border-transparent hover:text-fashion-champagne'}`}
              onClick={() => setFilter(category.toLowerCase())}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Portfolio grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-fashion-champagne/70">No portfolio items found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                className="portfolio-item group relative overflow-hidden cursor-pointer transition-all duration-500 bg-black"
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-[400px] object-cover transition-all duration-500"
                  style={{ 
                    transform: hoveredItem === item.id ? 'perspective(1000px) rotateX(0deg)' : 'perspective(1000px) rotateX(15deg)',
                    transformOrigin: 'bottom',
                    opacity: hoveredItem === item.id ? 0.8 : 1
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-fashion-midnight opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-serif text-fashion-champagne">{item.title}</h3>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-fashion-gold">{item.category}</span>
                    <span className="text-sm text-fashion-champagne/70">
                      {new Date(item.created_at).getFullYear().toString()}
                    </span>
                  </div>
                </div>
                
                {/* Social Media Dock wrapped with TooltipWrapper */}
                <div className={`absolute top-4 right-4 opacity-0 transition-all duration-300 ${hoveredItem === item.id ? 'opacity-100 translate-y-0' : 'translate-y-2'}`}>
                  <TooltipWrapper>
                    <SocialMediaDock />
                  </TooltipWrapper>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Load more button */}
        {filteredItems.length > 0 && (
          <div className="mt-16 text-center">
            <button className="btn-luxury">View More</button>
          </div>
        )}
      </div>
      
      {/* Modal for enlarged portfolio item */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in">
          <button 
            className="absolute top-8 right-8 text-fashion-champagne hover:text-fashion-gold"
            onClick={closeModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="max-w-4xl w-full">
            <img 
              src={selectedItem.image_url} 
              alt={selectedItem.title} 
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="mt-4 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-serif text-fashion-champagne">{selectedItem.title}</h3>
                <div className="flex gap-4 mt-2">
                  <span className="text-fashion-gold">{selectedItem.category}</span>
                  <span className="text-fashion-champagne/70">
                    {new Date(selectedItem.created_at).getFullYear().toString()}
                  </span>
                </div>
              </div>
              <TooltipWrapper>
                <SocialMediaDock />
              </TooltipWrapper>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioGrid;
