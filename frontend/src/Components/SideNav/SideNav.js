import React from 'react';
import NavBar from '../NavBar/NavBar';

import './SideNav.scss';

const SideNav = ({
  isAuthenticated,
  navClickHandlers,
  setSidebarVisibility,
}) => {
  return (
    <>
      <div className='h-100 bg-secondary sidenav'>
        <NavBar
          isAuthenticated={isAuthenticated}
          navClickHandlers={navClickHandlers}
          isSideBar={true}
        />
      </div>
      <div className='h-100 w-100 sidenav-bg' onClick={setSidebarVisibility} />
    </>
  );
};

export default SideNav;
