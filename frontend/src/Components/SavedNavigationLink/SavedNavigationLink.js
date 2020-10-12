import React from 'react';
import { Link } from 'react-router-dom';

const SavedNavigationLink = ({ searchQuery, pageNumber }) => {
  return (
    <Link
      className='page-item'
      to={searchQuery}
    >
      <span className='page-link'>{pageNumber}</span>
    </Link>
  );
};

export default SavedNavigationLink;
