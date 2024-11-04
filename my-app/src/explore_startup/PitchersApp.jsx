import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

function PitchersApp() {
  return (
    <div className="flex overflow-hidden flex-col pb-10 bg-white">
      <Header />
      <SearchBar />
      <div className="self-center mt-3 w-full max-w-[1379px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </div>
  );
}

export default PitchersApp;
