import React from 'react';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';

import { Nav, NavItem } from 'shards-react';
import NavBarItem from '../NavBarItem/NavBarItem';

const NavBar = ({ isAuthenticated, navClickHandlers, isSideBar, history }) => {
  console.log(history);
  const navSection = (
    <>
      <NavBarItem
        linkTo='/credits'
        onClick={navClickHandlers.handleCreditsClick}
        name='Credits'
      />
      <NavBarItem
        linkTo='/difficulty'
        onClick={navClickHandlers.handleDifficultyClick}
        name='Difficulty'
      />
      <NavBarItem
        linkTo='/solve'
        onClick={navClickHandlers.handleSudokuSolver}
        name='Solve'
      />
      <NavBarItem
        linkTo='/rules'
        onClick={navClickHandlers.handleRulesClick}
        name='How To Play'
      />
      <NavBarItem linkTo='/profile' name='Profile' />
      <NavBarItem linkTo='/manageSaves' name='Manage Saves' />
      <NavBarItem
        linkTo='/newGame'
        onClick={navClickHandlers.handleNewGameClick}
        name='New Game'
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
