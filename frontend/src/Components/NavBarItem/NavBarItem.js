import React from 'react';
import { Button, NavItem } from 'shards-react';
import { Link } from 'react-router-dom';

const NavBarItem = ({ linkTo, onClick, name, difficulty }) => {
  return (
    <NavItem className='mb-3'>
      <Link to={{ pathname: linkTo, search: `?d=${difficulty}` }}>
        <Button onClick={onClick} className='navBar'>
          {name}
        </Button>
      </Link>
    </NavItem>
  );
};

export default NavBarItem;
