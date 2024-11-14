import React from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileInfo from './ProfileInfo';


function IHeader() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Replace '12345' with the actual userId variable

  const handleProfileClick = () => {
    navigate(`/investor/${userId}`);
  };

  return (
    <header className="flex flex-wrap gap-5 justify-between py-3 px-6 w-full bg-white max-md:px-5 max-md:max-w-full">
      <nav className="flex flex-grow justify-around items-center text-lg font-medium text-center text-indigo-900 max-md:max-w-full">
        <div className="text-xl font-extrabold text-orange-700">Pitchers</div>
        <a onClick={handleProfileClick} className="my-auto cursor-pointer">
          Profile
        </a>
        <a href="/investorconnect" className="my-auto">Connect</a>
        <a href="/startupchat" className="my-auto">Chat</a>
      </nav>
      <ProfileInfo />
    </header>
  );
}

export default IHeader;