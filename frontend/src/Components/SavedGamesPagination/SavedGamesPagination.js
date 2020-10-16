import React from 'react';
import SavedNavigationButton from '../SavedNavigationButton/SavedNavigationButton';
import SavedNavigationLink from '../SavedNavigationLink/SavedNavigationLink';

const SavedGamesPagination = ({ currentPage, firstPage, lastPage }) => {
  return (
    <nav aria-label='Saved games navigation'>
      <ul className='pagination justify-content-center'>
        <SavedNavigationButton navigation='«' navigationPage={currentPage-1} disabled={firstPage} />
        <SavedNavigationLink
          searchQuery={'?saves=1'}
          pageNumber={1}
          active={currentPage === 1}
        />
        <SavedNavigationLink
          searchQuery={'?saves=2'}
          pageNumber={2}
          active={currentPage === 2}
        />
        <SavedNavigationLink
          searchQuery={'?saves=3'}
          pageNumber={3}
          active={currentPage === 3}
        />
        <SavedNavigationButton navigation='»' navigationPage={currentPage+1} disabled={lastPage} />
      </ul>
    </nav>
  );
};

export default SavedGamesPagination;
