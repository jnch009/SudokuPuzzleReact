import React from 'react';
import { Button, NavItem } from 'shards-react';

const NavBarItem = ({ onClick, name }) => {
  return (
    <NavItem className='mb-3'>
      <Button onClick={onClick} className='navBar'>
        {name}
      </Button>
    </NavItem>
  );
};

export default NavBarItem;
