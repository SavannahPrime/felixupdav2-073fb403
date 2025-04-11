
import { useState, useEffect } from 'react';

// Portfolio item type
type PortfolioItem = {
  id: number;
  image: string;
  title: string;
  category: string;
  year: string;
};

// Sample portfolio data
const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b',
    title: 'Vogue Italia Editorial',
    category: 'Editorial',
    year: '2023'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae',
    title: 'Paris Fashion Week',
    category: 'Runway',
    year: '2023'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    title: 'Calvin Klein Campaign',
    category: 'Campaign',
    year: '2022'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1496217590455-aa63a8350eea',
    title: 'Milan Fashion Week',
    category: 'Runway',
    year: '2022'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
    title: 'GQ Magazine Cover',
    category: 'Editorial',
    year: '2022'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1512646605205-78422b7c7896',
    title: 'Versace Campaign',
    category: 'Campaign',
    year: '2021'
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd',
    title: 'New York Fashion Week',
    category: 'Runway',
    year: '2021'
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    title: 'Prada Lookbook',
    category: 'Campaign',
    year: '2021'
  }
];

const PortfolioGrid = () => {
  const [filter, setFilter] = useState<string>('all');
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(portfolioData);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  
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
          <button 
            className={`px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${filter === 'editorial' ? 'text-fashion-gold border-b border-fashion-gold' : 'text-fashion-champagne/70 border-b border-transparent hover:text-fashion-champagne'}`}
            onClick={() => setFilter('editorial')}
          >
            Editorial
          </button>
          <button 
            className={`px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${filter === 'runway' ? 'text-fashion-gold border-b border-fashion-gold' : 'text-fashion-champagne/70 border-b border-transparent hover:text-fashion-champagne'}`}
            onClick={() => setFilter('runway')}
          >
            Runway
          </button>
          <button 
            className={`px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${filter === 'campaign' ? 'text-fashion-gold border-b border-fashion-gold' : 'text-fashion-champagne/70 border-b border-transparent hover:text-fashion-champagne'}`}
            onClick={() => setFilter('campaign')}
          >
            Campaign
          </button>
        </div>
        
        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className="portfolio-item"
              onClick={() => handleItemClick(item)}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-[400px] object-cover"
                style={{ transform: 'perspective(1000px) rotateX(15deg)', transformOrigin: 'bottom' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(15deg)';
                }}
              />
              <div className="portfolio-overlay">
                <h3 className="text-xl font-serif text-fashion-champagne">{item.title}</h3>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-fashion-gold">{item.category}</span>
                  <span className="text-sm text-fashion-champagne/70">{item.year}</span>
                </div>
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
            <div className="mt-4">
              <h3 className="text-2xl font-serif text-fashion-champagne">{selectedItem.title}</h3>
              <div className="flex justify-between mt-2">
                <span className="text-fashion-gold">{selectedItem.category}</span>
                <span className="text-fashion-champagne/70">{selectedItem.year}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioGrid;
