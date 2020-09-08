import React, { useState, useEffect } from 'react';
import { Button } from 'shards-react';
import { useHistory, Link } from 'react-router-dom';
import queryString from 'query-string';

import ModalSaveGame from '../Modals/ModalSaveGame';
import ModalModifyGame from '../Modals/ModalModifyGame';

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
  {
    saveName: '4',
    userName: 'Jeremy',
    date: curDate,
  },
  {
    saveName: '5',
    userName: 'Jeremy',
    date: curDate,
  },
  {
    saveName: '6',
    userName: 'Jeremy',
    date: curDate,
  },
  {
    saveName: '7',
    userName: 'Jeremy',
    date: curDate,
  },
  {
    saveName: '8',
    userName: 'Jeremy',
    date: curDate,
  },
  {
    saveName: '9',
    userName: 'Jeremy',
    date: curDate,
  },
];

const BasicModalExample = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openLoadModal, setOpenLoadModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openOverwriteModal, setOpenOverwriteModal] = useState(false);

  //useEffect for handling page changes
  useEffect(() => {
    const saveNumber = Number(queryString.parse(history.location.search)[
      'saves'
    ]);
    setCurrentPage(saveNumber);
  },[history.location]);

  //useEffect for handling save game success

  //useEffect for handling save game load

  //useEffect for handling save game delete

  //useEffect for handling save game overwrite

  const disabledNavigation = (navigation) => {
    const navigationPage = navigation === 'back' ? currentPage-1 : currentPage+1; 
    const paginationNav = <Link className='page-item' to={{ search: `?d=${sessionStorage.getItem('difficulty')}&saves=${navigationPage}` }}>
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
  const startSave = (currentPage-1)*3;
  const endSave = startSave+3;

  return (
    <div className='mt-4 d-flex align-items-center flex-column'>
      <ModalSaveGame open={open} setOpen={setOpen}/>
      <ModalModifyGame open={openLoadModal} setOpen={setOpenLoadModal} title='Load Game' action='load'/>
      <ModalModifyGame open={openDeleteModal} setOpen={setOpenDeleteModal} title='Delete Game' action='delete'/>
      <ModalModifyGame open={openOverwriteModal} setOpen={setOpenOverwriteModal} title='Overwrite' action='overwrite'/>

      <h2 className='text-center text-light'>Saved Games</h2>
      <Button className='w-25' onClick={() => setOpen(true)}>Save a new game</Button>
      <div className='d-flex flex-column align-items-center pt-2'>
        {games.slice(startSave,endSave).map((game) => (
          <div
            key={game.saveName}
            className='position-relative save-container savedGamesSection'
          >
            <div className='text-center mb-2 bg-primary p-3 save-styling rounded'>
              <h6 className='mb-0 text-light'>{`Save Name: ${game.saveName}`}</h6>
              <h6 className='mb-0 text-light'>{`User Name: ${game.userName}`}</h6>
              <h6 className='mb-0 text-light'>{`Date Saved: ${game.date}`}</h6>
            </div>
            <Button className='hide-hover' onClick={() => setOpenLoadModal(true)}>Load</Button>
            <Button className='hide-hover' onClick={() => setOpenOverwriteModal(true)}>Overwrite</Button>
            <Button className='hide-hover' onClick={() => setOpenDeleteModal(true)}>Delete</Button>
          </div>
        ))}
        <nav aria-label='Page navigation example'>
          <ul className='pagination justify-content-center'>
            {disabledNavigation('back')}
            <Link className='page-item' to={{ search: `?d=${sessionStorage.getItem('difficulty')}&saves=1` }}>
              <span className='page-link'>1</span>
            </Link>
            <Link className='page-item' to={{ search: `?d=${sessionStorage.getItem('difficulty')}&saves=2` }}>
              <span className='page-link'>2</span>
            </Link>
            <Link className='page-item' to={{ search: `?d=${sessionStorage.getItem('difficulty')}&saves=3` }}>
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
