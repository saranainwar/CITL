import React from 'react';

function Sidebar() {
  const filters = ['Location', 'Industry', 'Funding'];

  return (
    <aside className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
      <nav className="flex flex-col mt-28 text-sm font-medium leading-loose text-black whitespace-nowrap max-md:mt-10">
        {filters.map((filter) => (
          <div key={filter} className="flex flex-col justify-center p-5 w-full">
            <button className="flex overflow-hidden gap-6 px-2 py-2 max-w-full bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[210px]">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/331873a089866a951af126cf65e14556dad654d215dc38aa7d419cae42c0bc23?placeholderIfAbsent=true&apiKey=a595820471de40108e62248b2a13cb8a" alt="" className="object-contain shrink-0 my-auto w-2 aspect-square" />
              <span className="grow shrink w-[162px]">{filter}</span>
            </button>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
