import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function InvestorCard({ name, affiliation, notableInvestments, background, imageUrl, initialFavorite }) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to="/investor/maureen.miranda.22@spit.ac.in" className="flex flex-wrap gap-6 items-start mt-10 w-full bg-neutral-100 max-md:max-w-full rounded-lg border border-gray-200 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <article>
        <div className="flex overflow-hidden flex-col justify-center rounded-xl border border-solid min-w-[240px] w-[300px]">
          <img loading="lazy" src={imageUrl} alt={`${name}'s profile`} className="object-contain w-full aspect-[1.5]" />
        </div>
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full">
          <div className="flex flex-wrap gap-6 items-start w-full text-xl font-medium leading-relaxed text-indigo-900 max-md:max-w-full">
            <h2 className="flex-1 shrink min-w-[240px] max-md:max-w-full">{name}</h2>
            <button 
              onClick={handleFavoriteClick} 
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              className="focus:outline-none"
            >
              <svg
                className={`w-8 h-8 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>
          <hr className="mt-4 w-10 bg-gray-200 border border-solid min-h-[1px]" />
          <div className="mt-4 w-full text-base tracking-normal leading-6 text-gray-500 max-md:max-w-full">
            <p><strong className="text-black">Affiliation:</strong> {affiliation}</p>
            <p><strong className="text-black">Notable Investments:</strong> {notableInvestments}</p>
            <p><strong className="text-black">Background:</strong> {background}</p>
          </div>
          <hr className="mt-4 w-10 bg-gray-200 border border-solid min-h-[1px]" />
        </div>
      </article>
    </Link>
  );
}

export default InvestorCard;
