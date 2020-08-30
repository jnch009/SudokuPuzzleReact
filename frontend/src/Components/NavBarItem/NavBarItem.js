import React from 'react';
import { Button, NavItem } from 'shards-react';
import { Link } from 'react-router-dom';

const NavBarItem = ({ linkTo, onClick, name }) => {
  return (
    <NavItem className='mb-3'>
      <Link to={linkTo}>
        <Button onClick={onClick} className='navBar'>
          {name}
        </Button>
      </Link>
    </NavItem>
  );
};

export default NavBarItem;
