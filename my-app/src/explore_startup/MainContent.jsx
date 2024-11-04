import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import CategoryButton from './CategoryButton';
import FilterButton from './FilterButton';
import StartupCard from './StartupCard';
import './MainContent.css';  // Import custom CSS for transitions

function MainContent() {
  const [filterActive, setFilterActive] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();  // Initialize navigate

  const categories = [
    'Technology', 
    'CleanTech', 
    'HealthCare', 
    'Food and Beverage', 
    'Finance', 
    'Mobility',
    'Education', 
    'Entertainment', 
    'Travel', 
    'Retail', 
    'Real Estate', 
    'Gaming', 
    'Automotive'
  ];

  const startups = [
    {
      name: 'SavorySprout',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3705afb7d3fc612c872bc03abb28899522da93d88e485998341d8084ca1fd59c?placeholderIfAbsent=true&apiKey=a595820471de40108e62248b2a13cb8a',
      description: 'SavorySprout is your gateway to fresh, farm-to-table flavors, offering a diverse range of artisanal products that sprout from the earth and satisfy your cravings with every bite.',
      amenities: 'Wifi · Kitchen · Free Parking',
      rating: '5.0',
      reviews: '318'
    },
    {
      name: 'FlavourFrenzy',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/62222bdd1f1c7974c7268befd0ad303c3ac76c6fef734f7482fba048b5c1f54c?placeholderIfAbsent=true&apiKey=a595820471de40108e62248b2a13cb8a',
      description: 'FlavorFrenzy is a culinary adventure that brings a whirlwind of global tastes to your table. We curate the boldest, most exciting flavors from around the world to ignite your taste buds',
      amenities: 'Wifi · Kitchen · Free Parking',
      rating: '5.0',
      reviews: '318'
    },
    {
      name: 'NourishNest',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/17d3b82450a47468a7184063c70dce283004fff6ade63f36a38021d00a8b6316?placeholderIfAbsent=true&apiKey=a595820471de40108e62248b2a13cb8a',
      description: 'NourishNest is where comfort meets nutrition. Our wholesome, home-style meals are crafted with love and the finest ingredients, designed to nourish your body and soul.',
      amenities: 'Wifi · Kitchen · Free Parking',
      rating: '5.0',
      reviews: '318'
    },
    {
      name: 'TechTrends',
      image: 'https://example.com/techtrends.jpg',
      description: 'TechTrends brings you the latest and greatest in technology innovations. Stay ahead with cutting-edge gadgets and software.',
      amenities: 'Wifi · Free Parking',
      rating: '4.8',
      reviews: '150'
    },
    {
      name: 'EcoFuture',
      image: 'https://example.com/ecofuture.jpg',
      description: 'EcoFuture is committed to sustainable solutions and green technologies. Explore our eco-friendly products and services.',
      amenities: 'Wifi · Free Parking',
      rating: '4.9',
      reviews: '200'
    },
    {
      name: 'HealthHub',
      image: 'https://example.com/healthhub.jpg',
      description: 'HealthHub provides innovative health solutions and wellness products to improve your quality of life.',
      amenities: 'Wifi · Kitchen',
      rating: '4.7',
      reviews: '180'
    },
  ];

  const handleFilterClick = () => {
    setFilterActive(prev => !prev);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.maxHeight = filterActive ? containerRef.current.scrollHeight + 'px' : '0px';
    }
  }, [filterActive]);

  const handleCardClick = (startupName) => {
    navigate(`/startup/${startupName}`);  // Use navigate to redirect
  };

  return (
    <main className="flex flex-col ml-5 w-[82%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full max-md:mt-3.5 max-md:max-w-full">
        <div
          ref={containerRef}
          className={`flex flex-wrap gap-2 items-start max-w-full text-sm leading-none text-gray-700 bg-white min-h-[36px] w-[810px] transition-max-height duration-500`}
        >
          {categories.slice(0, filterActive ? categories.length : 6).map((category) => (
            <CategoryButton key={category} label={category} />
          ))}
          <FilterButton
            label={filterActive ? 'Show Less' : 'Filters'}
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/8362a3b1331e4b4fd32c06cb0db276fb458ce79687776868b4509604b3f16668?placeholderIfAbsent=true&apiKey=a595820471de40108e62248b2a13cb8a"
            onClick={handleFilterClick}
          />
        </div>
        <hr className="shrink-0 mt-20 ml-6 max-w-full h-px bg-gray-200 border border-solid w-[1094px] max-md:mt-10" />
        {startups.map((startup, index) => (
          <React.Fragment key={startup.name}>
            <StartupCard
              {...startup}
              onClick={() => handleCardClick(startup.name)}  // Handle click event
            />
            {index < startups.length - 1 && (
              <hr className="shrink-0 mt-7 ml-6 max-w-full h-px bg-gray-200 border border-solid w-[1094px]" />
            )}
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}

export default MainContent;
