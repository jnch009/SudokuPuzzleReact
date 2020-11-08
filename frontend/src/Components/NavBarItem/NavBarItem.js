import React from 'react';
<<<<<<< HEAD
import { Button, NavItem } from 'shards-react';

const NavBarItem = ({ onClick, name }) => {
  return (
    <NavItem className='mb-3'>
      <Button onClick={onClick} className='navBar'>
        {name}
      </Button>
    </NavItem>
  );
=======
import { Link } from 'react-router-dom';
import { Button, NavItem } from 'shards-react';
import { useAuth0 } from '@auth0/auth0-react';

const NavBarItem = ({ linkTo, onClick, name, query }) => {
  const { isAuthenticated } = useAuth0();
  const navBtn = (
    <Button onClick={onClick} className='navBar'>
      {name}
    </Button>
  );

  if (isAuthenticated && linkTo === '/save') {
    return <NavItem className='mb-3'>{navBtn}</NavItem>;
  } else if (linkTo) {
    return <NavItem className='mb-3'><Link to={{ pathname: linkTo, search: query }}>{navBtn}</Link></NavItem>;
  } else {
    return <NavItem className='mb-3'>{navBtn}</NavItem>;
  }
>>>>>>> 1b63424727dde90fe31d96229fda6c33487f2881
};

export default NavBarItem;
