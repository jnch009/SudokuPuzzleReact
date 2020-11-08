import React from 'react';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
<<<<<<< HEAD
import Profile from '../Profile/Profile';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

import { Nav, NavItem } from 'shards-react';
import NavBarItem from '../NavBarItem/NavBarItem';
import { Switch } from 'react-router-dom';
=======

import { Nav, NavItem } from 'shards-react';
import NavBarItem from '../NavBarItem/NavBarItem';
>>>>>>> 1b63424727dde90fe31d96229fda6c33487f2881

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
<<<<<<< HEAD
      <NavBarItem name='Profile' />
=======
      <NavBarItem linkTo='/save' name='Save Game' onClick={navClickHandlers.handleSaveGameClick} />
      <NavBarItem linkTo='/manageSaves' name='Manage Saves' query='?saves=1' />
>>>>>>> 1b63424727dde90fe31d96229fda6c33487f2881
      <NavBarItem
        onClick={navClickHandlers.handleNewGameClick}
        name='New Game'
      />
      <NavItem className='mb-3'>
        {isAuthenticated ? <Logout /> : <Login />}
      </NavItem>
<<<<<<< HEAD

      <Switch>
        <PrivateRoute path='/profile' component={Profile} />
      </Switch>
=======
>>>>>>> 1b63424727dde90fe31d96229fda6c33487f2881
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
