import React from 'react';
import { Link } from 'react-router-dom';
import { Button, NavItem } from 'shards-react';
import { useAuth0 } from '@auth0/auth0-react';

const NavBarItem = ({ linkTo, onClick, name }) => {
  const { isAuthenticated } = useAuth0();
  const navBtn = (
    <Button onClick={onClick} className='navBar'>
      {name}
    </Button>
  );

  if (isAuthenticated && linkTo === '/save') {
    return <NavItem className='mb-3'>{navBtn}</NavItem>;
  } else if (linkTo) {
    return <NavItem className='mb-3'><Link to={{ pathname: linkTo }}>{navBtn}</Link></NavItem>;
  } else {
    return <NavItem className='mb-3'>{navBtn}</NavItem>;
  }
};

export default NavBarItem;
