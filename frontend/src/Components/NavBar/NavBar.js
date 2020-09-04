import React from 'react';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Profile from '../Profile/Profile';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

import { Nav, NavItem } from 'shards-react';
import NavBarItem from '../NavBarItem/NavBarItem';
import { Switch } from 'react-router-dom';

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
      <NavBarItem linkTo='/profile' name='Profile' difficulty={difficulty} />
      <NavBarItem
        linkTo='/newGame'
        onClick={navClickHandlers.handleNewGameClick}
        name='New Game'
        difficulty={difficulty}
      />
      <NavItem className='mb-3'>
        {isAuthenticated ? <Logout /> : <Login />}
      </NavItem>

      <Switch>
        <PrivateRoute path='/profile' component={Profile}/>
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
