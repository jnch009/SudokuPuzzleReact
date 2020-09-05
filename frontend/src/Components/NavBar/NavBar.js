import React from 'react';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';

import { Nav, NavItem } from 'shards-react';
import NavBarItem from '../NavBarItem/NavBarItem';

const NavBar = ({ isAuthenticated, navClickHandlers, isSideBar, difficulty }) => {
  const navSection = (
    <>
      <NavBarItem
        linkTo='/credits'
        onClick={navClickHandlers.handleCreditsClick}
        name='Credits'
        difficulty={difficulty}
      />
      <NavBarItem
        linkTo='/difficulty'
        onClick={navClickHandlers.handleDifficultyClick}
        name='Difficulty'
        difficulty={difficulty}
      />
      <NavBarItem
        linkTo='/solve'
        onClick={navClickHandlers.handleSudokuSolver}
        name='Solve'
        difficulty={difficulty}
      />
      <NavBarItem
        linkTo='/rules'
        onClick={navClickHandlers.handleRulesClick}
        name='How To Play'
        difficulty={difficulty}
      />
      <NavBarItem linkTo='/manageSaves' name='Manage Saves' difficulty={difficulty} saves={1}/>
      <NavBarItem
        linkTo='/newGame'
        onClick={navClickHandlers.handleNewGameClick}
        name='New Game'
        difficulty={difficulty}
      />
      <NavItem className='mb-3'>
        {isAuthenticated ? <Logout /> : <Login />}
      </NavItem>
    </>
  );

  return isSideBar ? (
    <Nav className='w-100 flex-nowrap' justified vertical>
      {navSection}
    </Nav>
  ) : (
    <Nav justified>{navSection}</Nav>
  );
};

export default NavBar;
