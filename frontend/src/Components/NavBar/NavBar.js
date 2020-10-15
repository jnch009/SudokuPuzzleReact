import React from 'react';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Profile from '../Profile/Profile';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

import { Nav, NavItem } from 'shards-react';
import NavBarItem from '../NavBarItem/NavBarItem';
import { Switch } from 'react-router-dom';

const NavBar = ({ isAuthenticated, navClickHandlers, isSideBar }) => {
  const navSection = (
    <>
      <NavBarItem
        onClick={navClickHandlers.handleCreditsClick}
        name='Credits'
      />
      <NavBarItem
        onClick={navClickHandlers.handleDifficultyClick}
        name='Difficulty'
      />
      <NavBarItem
        onClick={navClickHandlers.handleSudokuSolver}
        name='Solve'
      />
      <NavBarItem
        onClick={navClickHandlers.handleRulesClick}
        name='How To Play'
      />
      <NavBarItem name='Profile' />
      <NavBarItem
        onClick={navClickHandlers.handleNewGameClick}
        name='New Game'
      />
      <NavItem className='mb-3'>
        {isAuthenticated ? <Logout /> : <Login />}
      </NavItem>

      <Switch>
        <PrivateRoute path='/profile' component={Profile} />
      </Switch>
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
