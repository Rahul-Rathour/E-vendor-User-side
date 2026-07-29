import React, { useState } from 'react';
import TopHeader from './TopHeader';
import Navbar from './Navbar';
import MobileHeader from './MobileHeader';
import MobileSidebar from './MobileSidebar';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  return (
    <header className="sticky top-0 left-0 z-50 w-full">

      {/* Desktop */}
      <div className="hidden lg:block">
        <TopHeader />
        <Navbar />
      </div>

      {/* Mobile */}
      <div className="lg:hidden">

        <MobileHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <MobileSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

      </div>

    </header>
  );
};

export default Header;