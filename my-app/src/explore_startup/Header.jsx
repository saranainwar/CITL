import React from 'react';

function Header() {
  return (
    <header className="flex flex-wrap gap-4 justify-between pt-4 pr-4 pb-1 pl-8 w-full bg-white max-md:px-4 max-md:max-w-full">
      <nav className="flex gap-40 my-auto text-lg font-semibold text-center text-indigo-900 max-md:max-w-full">
        <div className="text-xl font-extrabold text-orange-700 basis-auto">Pitchers</div>
        <a href="#profile" className="my-auto text-l px-4 py-2">Profile</a>
        <a href="#explore" className="basis-auto text-l px-4 py-2">Explore Startups</a>
        <a href="#connect" className="text-l px-4 py-2">Connect</a>
      </nav>
      <div className="flex gap-6 font-bold">
        <ProfileInfo />
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a0df63e09da0c5ddc7bca5c5cb25749f45968c5b895a1c86110ce03791f3fc0?placeholderIfAbsent=true&apiKey=a595820471de40108e62248b2a13cb8a" alt="" className="object-contain shrink-0 my-auto aspect-square w-[20px]" />
      </div>
    </header>
  );
}

function ProfileInfo() {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col my-auto">
        <div className="text-xs text-indigo-900">Naval Ravikant</div>
        <button className="self-start mt-2 text-xs text-orange-700">Log out</button>
      </div>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/419ff4ff2325b96ab075f6151fbfe87617f434d986633935eb970f4c68a457f8?placeholderIfAbsent=true&apiKey=a595820471de40108e62248b2a13cb8a" alt="Naval Ravikant's profile" className="object-contain shrink-0 aspect-[1.1] w-[60px]" />
    </div>
  );
}

export default Header;
