import React from 'react';

function SearchBar() {
  return (
    <div className="flex gap-5 ml-10 max-w-full w-[1000px] transition-transform duration-300 ease-in-out hover:scale-105">
      {/* Search input container */}
      <div className="flex flex-col grow shrink-0 my-auto border-2 border-solid border-zinc-400 rounded-full h-[44px] w-full shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <div className="flex items-center px-4 py-1 w-full rounded-full bg-zinc-50 bg-opacity-90">
          <div className="text-gray-400 w-6 flex justify-center items-center text-lg">
            🔍
          </div>
          <input
            type="search"
            placeholder="Search investors"
            className="flex-1 ml-2 text-lg bg-transparent border-none focus:outline-none text-gray-700"
            aria-label="Search investors"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
