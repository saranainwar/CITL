import React from 'react';

function ProfileInfo() {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col my-auto">
        <div className="text-xs text-indigo-900">Naval ravikant</div>
        <button className="self-start mt-2.5 text-xs text-orange-700">Log out</button>
      </div>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/419ff4ff2325b96ab075f6151fbfe87617f434d986633935eb970f4c68a457f8?placeholderIfAbsent=true&apiKey=a595820471de40108e62248b2a13cb8a" alt="Naval ravikant's profile" className="object-contain shrink-0 aspect-[1.1] w-[69px]" />
    </div>
  );
}

export default ProfileInfo;