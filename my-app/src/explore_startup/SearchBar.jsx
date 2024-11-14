import React from 'react';

function SearchBar() {
  return (
    <div className="flex justify-center mt-4 mb-4">
      <div className="flex flex-col whitespace-nowrap border border-solid border-zinc-500 min-h-[37px] text-zinc-700 text-opacity-60 w-[355px] rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <div className="flex items-center px-3 py-2 w-full rounded-full bg-zinc-50 bg-opacity-90 min-h-[36px] border border-solid border-zinc-300 transition-all duration-300 hover:bg-zinc-100">
          <div className="overflow-hidden self-stretch p-2 my-auto w-8 text-lg font-medium leading-3 text-center" aria-hidden="true">
            􀊫
          </div>
          <input 
            type="search" 
            placeholder="Search" 
            className="flex-1 shrink self-stretch my-auto text-lg tracking-tight leading-none bg-transparent border-none outline-none" 
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
