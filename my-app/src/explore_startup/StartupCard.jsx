import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartupCard({ id, name, image, description, amenities, rating, reviews }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/startup/${id}`); // Navigate to the startup details page
  };

  return (
    <motion.div
      className={`flex flex-wrap gap-6 items-start mt-8 ml-6 p-4 rounded-3xl bg-neutral-100 hover:bg-neutral-200 cursor-pointer relative transition-all`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={handleCardClick} // Handle clicks for navigation
    >
      <div className="flex overflow-hidden flex-col justify-center rounded-xl border border-solid min-w-[240px] w-[300px]">
        <img loading="lazy" src={image} alt={`${name} preview`} className="object-contain w-full aspect-[1.5]" />
      </div>
      <div className="flex flex-col flex-1 shrink text-sm basis-0 min-w-[240px] max-md:max-w-full">
        <div className="flex justify-between items-start w-full text-xl font-medium leading-relaxed text-indigo-900">
          <h2 className="flex-1">{name}</h2>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3a96e505061c1159c46a47febc93a98a41a4c6cca12926419b01b4ae20ef5c8?placeholderIfAbsent=true&apiKey=a595820471de40108e62248b2a13cb8a"
            alt=""
            className="object-contain shrink-0 w-8 aspect-square"
          />
        </div>
        <hr className="mt-4 w-10 bg-gray-200 border border-solid min-h-[1px]" />
        <div className="flex flex-col mt-4 w-full text-gray-500">
          <p className="leading-5">{description}</p>
          <p className="mt-2 text-gray-700">{amenities}</p>
        </div>
        <hr className="mt-4 w-10 bg-gray-200 border border-solid min-h-[1px]" />
        <div className="flex gap-4 items-center mt-4 w-full leading-none text-gray-700">
          <span className="font-medium">{rating}</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7b6d222f130c3d4470fa5ccb60425bf4bdcf5317f559b744697fdcb1e36b774?placeholderIfAbsent=true&apiKey=a595820471de40108e62248b2a13cb8a"
            alt="Star rating"
            className="object-contain w-5 aspect-square"
          />
          <span>({reviews} reviews)</span>
        </div>
      </div>
    </motion.div>
  );
}

export default StartupCard;
