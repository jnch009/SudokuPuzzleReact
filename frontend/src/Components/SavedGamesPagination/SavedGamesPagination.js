import React from 'react';
import SavedNavigationButton from '../SavedNavigationButton/SavedNavigationButton';
import SavedNavigationLink from '../SavedNavigationLink/SavedNavigationLink';

const SavedGamesPagination = ({ totalPages, currentPage, firstPage, lastPage }) => {
  return (
    <nav aria-label='Saved games navigation'>
      <ul className='pagination justify-content-center'>
        <SavedNavigationButton navigation='«' navigationPage={currentPage-1} disabled={firstPage !== false} />
        {Array(totalPages).fill(null).map((e, index) => { 
          let saveIndex = index + 1;
          return (<SavedNavigationLink
            key={`saveGame${saveIndex}`}
            searchQuery={`?saves=${saveIndex}`}
            pageNumber={saveIndex}
            active={currentPage === saveIndex}
          />);
        })}
        <SavedNavigationButton navigation='»' navigationPage={currentPage+1} disabled={lastPage !== false} />
      </ul>
    </nav>
  );
};

export default SavedGamesPagination;
