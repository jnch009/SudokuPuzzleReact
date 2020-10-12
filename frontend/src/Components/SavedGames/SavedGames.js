import React, { useState, useEffect } from 'react';
import { Button } from 'shards-react';
import { useHistory, Link } from 'react-router-dom';
import queryString from 'query-string';

import ModalSaveGame from '../Modals/ModalSaveGame';
import ModalModifyGame from '../Modals/ModalModifyGame';
import validateSaveName from '../../helperFn/validation';

import './SavedGames.scss';
import { useAuth0 } from '@auth0/auth0-react';

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
  const { getAccessTokenSilently } = useAuth0();

  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [saveGame, setSaveGame] = useState();
  
  const [openLoadModal, setOpenLoadModal] = useState(false);
  const [loadGame, setLoadGame] = useState();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteGame, setDeleteGame] = useState();

  const [openOverwriteModal, setOpenOverwriteModal] = useState(false);
  const [overwriteGame, setOverwriteGame] = useState();

  const handleModalSelection = (choice, setChoice, setModal, name) => {
    if (choice !== undefined){
      if (choice){
        console.log('accepted');
        if (name === 'Overwrite'){
          setOpen(true);
        }
      } else {
        console.log('cancelled');
      }
      setChoice();
      setModal(false);
    }
  };

  //useEffect to get token
  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: process.env.REACT_APP_AUTH0_SCOPE
        });

        // console.log(accessToken);
      } catch (e){
        console.log(e.message);
      }
    };
    getToken();
  },[]);

  //useEffect for handling page changes
  useEffect(() => {
    const saveNumber = Number(queryString.parse(history.location.search)[
      'saves'
    ]);
    setCurrentPage(saveNumber);
  },[history.location]);

  //useEffect for handling save game success
  useEffect(() => {
    //fetch call along with validation of name
    if (saveGame !== undefined){
      if (!validateSaveName(saveName)){
        alert('did not pass validation');
      } else {
        setOpen(false);
      }
      setSaveGame();
    }
  },[saveGame, saveName]);

  //useEffect for handling save game load
  useEffect(() => {
    handleModalSelection(loadGame, setLoadGame, setOpenLoadModal);
  },[loadGame]);

  //useEffect for handling save game delete
  useEffect(() => {
    handleModalSelection(deleteGame, setDeleteGame, setOpenDeleteModal);
  },[deleteGame]);

  //useEffect for handling save game overwrite
  useEffect(() => {
    handleModalSelection(overwriteGame, setOverwriteGame, setOpenOverwriteModal, 'Overwrite');
  },[overwriteGame]);

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
      <ModalSaveGame open={open} setOpen={setOpen} setSaveName={setSaveName} choice={setSaveGame}/>
      <ModalModifyGame open={openLoadModal} setOpen={setOpenLoadModal} title='Load Game' action='load' choice={setLoadGame}/>
      <ModalModifyGame open={openDeleteModal} setOpen={setOpenDeleteModal} title='Delete Game' action='delete' choice={setDeleteGame}/>
      <ModalModifyGame open={openOverwriteModal} setOpen={setOpenOverwriteModal} title='Overwrite' action='overwrite' choice={setOverwriteGame}/>

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
