import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileInfo() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove specific items from local storage, e.g., userId
    localStorage.removeItem('userId'); // or use localStorage.clear() to remove all
    // Redirect to the home page
    navigate('/');
  };

  return (
    <div className="flex gap-10 font-bold">
      <div className="flex gap-4">
        <div className="flex flex-col my-auto">
          <div className="text-xs text-indigo-900"></div>
          <button
            onClick={handleLogout}
            className="self-start mt-2.5 text-xs text-orange-700"
          >
            Log out
          </button>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/419ff4ff2325b96ab075f6151fbfe87617f434d986633935eb970f4c68a457f8?placeholderIfAbsent=true&apiKey=07248fc168e74f97b89ef7a6bf94fc9f"
          alt="User avatar"
          className="object-contain shrink-0 aspect-[1.1] w-[69px]"
        />
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1cb7a91dd65f5f6226872e939e748b82d1fbe27bf0a645a8790bc9c0fde3a372?placeholderIfAbsent=true&apiKey=07248fc168e74f97b89ef7a6bf94fc9f"
        alt=""
        className="object-contain shrink-0 my-auto aspect-square w-[25px]"
      />
    </div>
  );
}

export default ProfileInfo;
