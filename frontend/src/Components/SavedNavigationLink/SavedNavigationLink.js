import React from 'react';
import { Link } from 'react-router-dom';

const SavedNavigationLink = ({ searchQuery, pageNumber, active }) => {
  return (
    <Link
      className={`page-item ${active ? 'active' : '' }`}
      to={searchQuery}
    >
      <span className='page-link'>{pageNumber}</span>
    </Link>
  );
};

export default SavedNavigationLink;
