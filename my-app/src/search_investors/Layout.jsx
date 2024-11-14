import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

function Layout() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <Header />
      <div className="mt-9 mr-3 ml-3.5 max-md:mr-2.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <Sidebar />
          <MainContent />
        </div>
      </div>
      <style jsx>{`
        builder-component {
          max-width: none !important;
        }
      `}</style>
    </div>
  );
}

export default Layout;