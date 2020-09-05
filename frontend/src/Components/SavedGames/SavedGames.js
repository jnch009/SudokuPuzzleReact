import React, { useState } from 'react';
import { Button } from 'shards-react';
import { useHistory, Link } from 'react-router-dom';

import './SavedGames.scss';

const curDate = new Intl.DateTimeFormat('default', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
}).format(new Date(Date.now()));

const games = [
  {
    saveName: '1',
    userName: 'Jeremy',
    date: curDate,
  },
  {
    saveName: '2',
    userName: 'Jeremy',
    date: curDate,
  },
  {
    saveName: '3',
    userName: 'Jeremy',
    date: curDate,
  },
];

const BasicModalExample = ({ open, toggle }) => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);

  const disabledNavigation = (navigation) => {
    const navigationDirection = navigation === 'back' ? currentPage-1 : currentPage+1; 
    const paginationNav = <Link className='page-item' to={{ search: `?saves=${navigationDirection}` }}>
      <span className='page-link' aria-hidden='true'>{navigation === 'back' ? '«' : '»' }</span>
    </Link>;

    if (currentPage === 1 && navigation === 'back'){
      return <span className='page-item disabled'>
        <span className='page-link' aria-hidden='true'>&laquo;</span>
      </span>;
    // using 3 for now, because we can only have a max of 9 saved games
    } else if (currentPage === 3 && navigation === 'forward') {
      return <span className='page-item disabled'>
        <span className='page-link' aria-hidden='true'>&raquo;</span>
      </span>;
    } else {
      return paginationNav;
    }
  };

  return (
    <div className='mt-4'>
      <h2 className='text-center text-light'>Saved Games</h2>
      <div className='d-flex flex-column align-items-center pt-2'>
        {games.map((game) => (
          <div
            key={game.saveName}
            className='position-relative save-container savedGamesSection'
          >
            <div className='text-center mb-2 bg-primary p-3 save-styling rounded'>
              <h6 className='mb-0 text-light'>{`Save Name: ${game.saveName}`}</h6>
              <h6 className='mb-0 text-light'>{`User Name: ${game.userName}`}</h6>
              <h6 className='mb-0 text-light'>{`Date Saved: ${game.date}`}</h6>
            </div>
            <Button className='hide-hover'>Load</Button>
            <Button className='hide-hover'>Delete</Button>
          </div>
        ))}
        <nav aria-label='Page navigation example'>
          <ul className='pagination justify-content-center'>
            {disabledNavigation('back')}
            <Link className='page-item' to={{ search: '?saves=1' }}>
              <span className='page-link'>1</span>
            </Link>
            <Link className='page-item' to={{ search: '?saves=2' }}>
              <span className='page-link'>2</span>
            </Link>
            <Link className='page-item' to={{ search: '?saves=3' }}>
              <span className='page-link'>3</span>
            </Link>
            {disabledNavigation('forward')}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BasicModalExample;
