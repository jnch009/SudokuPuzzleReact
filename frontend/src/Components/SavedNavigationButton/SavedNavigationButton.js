import React from 'react';
import { Link } from 'react-router-dom';

const SavedNavigationButton = ({ navigation, navigationPage, disabled }) => {
  return disabled ? (
    <span className='page-item disabled'>
      <span className='page-link' aria-hidden='true'>
        {navigation}
      </span>
    </span>
  ) : (
    <Link
      className='page-item'
      to={{
        search: `?saves=${navigationPage}`,
      }}
    >
      <span className='page-link' aria-hidden='true'>
        {navigation}
      </span>
    </Link>
  );
};

export default SavedNavigationButton;
