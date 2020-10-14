import React from 'react';
import { Link } from 'react-router-dom';

const SavedNavigationButton = ({ navigation, navigationPage, disabled }) => {
  const difficulty = sessionStorage.getItem('difficulty');
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
        search: `?d=${difficulty}&saves=${navigationPage}`,
      }}
    >
      <span className='page-link' aria-hidden='true'>
        {navigation}
      </span>
    </Link>
  );
};

export default SavedNavigationButton;
