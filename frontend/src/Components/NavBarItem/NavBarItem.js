import React from 'react';
import { Link } from 'react-router-dom';
import { Button, NavItem } from 'shards-react';

const NavBarItem = ({ linkTo, onClick, name }) => {
  const navBtn = (
    <Button onClick={onClick} className='navBar'>
      {name}
    </Button>
  );

  return (
    <NavItem className='mb-3'>
      linkTo ? <Link to={{ pathname: linkTo }}>{navBtn}</Link> : {navBtn}
    </NavItem>
  );
};

export default NavBarItem;
