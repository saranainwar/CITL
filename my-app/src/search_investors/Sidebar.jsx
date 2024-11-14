import React from 'react';
import FilterSection from './FilterSection';

function Sidebar() {
  return (
    <aside className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col mt-24 max-md:mt-10 max-md:mr-0">
        <FilterSection title="Industry/Sector" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/b5a10c163f577bab2fb39b3e25af0e0aa87e5abfe87266c028c45b328ce734cf?placeholderIfAbsent=true&apiKey=07248fc168e74f97b89ef7a6bf94fc9f" />
        <FilterSection title="Company Stage" options={['Seed stage', 'Pre-IPO', 'Late stage', 'Growth stage']} />
        <FilterSection title="Investment Type" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/b5a10c163f577bab2fb39b3e25af0e0aa87e5abfe87266c028c45b328ce734cf?placeholderIfAbsent=true&apiKey=07248fc168e74f97b89ef7a6bf94fc9f" />
        <FilterSection title="Revenue Stage" options={['Pre-Revenue', 'Revenue generating', 'Profitable']} />
      </div>
    </aside>
  );
}

export default Sidebar;
