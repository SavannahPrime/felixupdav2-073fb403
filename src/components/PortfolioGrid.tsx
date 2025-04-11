
import { useState, useEffect } from 'react';
import SocialMediaDock from './SocialMediaDock';

// Portfolio item type
type PortfolioItem = {
  id: number;
  image: string;
  title: string;
  category: string;
  year: string;
};

// Updated portfolio data with real images
const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    image: '/lovable-uploads/9600aaa4-5bb4-4bdb-93ca-562173f75595.png',
    title: 'Gold Embroidered Blazer',
    category: 'Editorial',
    year: '2023'
  },
  {
    id: 2,
    image: '/lovable-uploads/d84b534c-49f4-4672-80f7-990b985019d5.png',
    title: 'White Shirt Collection',
    category: 'Campaign',
    year: '2023'
  },
  {
    id: 3,
    image: '/lovable-uploads/4d1929d1-adf1-4865-97a9-22d22af1c1d1.png',
    title: 'Classic White Editorial',
    category: 'Editorial',
    year: '2022'
  },
  {
    id: 4,
    image: '/lovable-uploads/5d037160-aa01-4367-9f3f-5c8101a53c4d.png',
    title: 'White T-shirt & Red Pants',
    category: 'Casual',
    year: '2022'
  },
  {
    id: 5,
    image: '/lovable-uploads/b5e0ae0a-f42d-4f90-9c71-c942c8396fb9.png',
    title: 'Classic Suit',
    category: 'Formal',
    year: '2022'
  },
  {
    id: 6,
    image: '/lovable-uploads/a671db4d-5885-4137-a634-b7c4ef41f750.png',
    title: 'Red Carpet Look',
    category: 'Event',
    year: '2021'
  },
  {
    id: 7,
    image: '/lovable-uploads/0ad5f131-f472-411a-b89f-b07ffc30650e.png',
    title: 'Night Shot',
    category: 'Editorial',
    year: '2021'
  },
  {
    id: 8,
    image: '/lovable-uploads/95a08c59-04c1-4ad5-9d37-f204145413e3.png',
    title: 'Contemplative',
    category: 'Portrait',
    year: '2021'
  }
];

const PortfolioGrid = () => {
  const [filter, setFilter] = useState<string>('all');
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(portfolioData);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  useEffect(() => {
    if (filter === 'all') {
      setFilteredItems(portfolioData);
    } else {
      setFilteredItems(portfolioData.filter(item => item.category.toLowerCase() === filter.toLowerCase()));
    }
  }, [filter]);

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const categories = Array.from(new Set(portfolioData.map(item => item.category)));

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="luxury-container">
        <h2 className="section-title mb-16">Portfolio</h2>
        
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
                src={item.image} 
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
                  <span className="text-sm text-fashion-champagne/70">{item.year}</span>
                </div>
              </div>
              
              {/* Social Media Dock */}
              <div className={`absolute top-4 right-4 opacity-0 transition-all duration-300 ${hoveredItem === item.id ? 'opacity-100 translate-y-0' : 'translate-y-2'}`}>
                <SocialMediaDock />
              </div>
            </div>
          ))}
        </div>
        
        {/* Load more button */}
        <div className="mt-16 text-center">
          <button className="btn-luxury">View More</button>
        </div>
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
              src={selectedItem.image} 
              alt={selectedItem.title} 
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="mt-4 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-serif text-fashion-champagne">{selectedItem.title}</h3>
                <div className="flex gap-4 mt-2">
                  <span className="text-fashion-gold">{selectedItem.category}</span>
                  <span className="text-fashion-champagne/70">{selectedItem.year}</span>
                </div>
              </div>
              <SocialMediaDock />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioGrid;
