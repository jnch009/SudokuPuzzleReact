import React, { useState, useEffect } from 'react';
import { Button } from 'shards-react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import ModalOverwriteGame from '../Modals/ModalOverwriteGame';
import ModalModifyGame from '../Modals/ModalModifyGame';
import SavedGamesPagination from '../SavedGamesPagination/SavedGamesPagination';

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

const BasicModalExample = ({ handleGridUpdate }) => {
  const history = useHistory();
  const { getAccessTokenSilently, user } = useAuth0();

  const [currentPage, setCurrentPage] = useState(1);
  //TODO add logic to get the games and set the total pages = Math.ceil(games / 3)
  const [totalPages, setTotalPages] = useState();
  const [userGames, setUserGames] = useState([]);

  const [gameId, setGameId] = useState();

  const [openLoadModal, setOpenLoadModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openOverwriteModal, setOpenOverwriteModal] = useState(false);
  const [openOverwriteSave, setOpenOverwriteSaveModal] = useState(false);

  const [userGamesUpdated, setUserGamesUpdated] = useState(false);

  //useEffect to request user and their games  
  const loadUser = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: process.env.REACT_APP_AUTH0_SCOPE,
      });

      await fetch('http://localhost:3001/sudoku/register', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ user_id: user.sub }),
      });

      const res = await fetch(`http://localhost:3001/sudoku/${user.sub}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });
      const data = await res.json();
      setUserGames(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (userGamesUpdated){
      loadUser();
      setUserGamesUpdated(false);
    }
  }, [userGamesUpdated]);

  //useEffect for handling page changes
  useEffect(() => {
    const saveNumber = Number(
      queryString.parse(history.location.search)['saves']
    );
    setCurrentPage(saveNumber);
  }, [history.location]);

  const startSave = (currentPage - 1) * 3;
  const endSave = startSave + 3;

  return (
    <div className='mt-4 d-flex align-items-center flex-column'>
      <ModalModifyGame
        open={openLoadModal}
        setOpen={setOpenLoadModal}
        title='Load Game'
        action='load'
        id={gameId}
        handleGridUpdate={handleGridUpdate}
      />
      <ModalModifyGame
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        title='Delete Game'
        action='delete'
        id={gameId}
        setUserGamesUpdated={setUserGamesUpdated}
      />
      <ModalModifyGame
        open={openOverwriteModal}
        setOpen={setOpenOverwriteModal}
        title='Overwrite'
        action='overwrite'
        id={gameId}
        handleOverwriteClick={setOpenOverwriteSaveModal}
      />
      <ModalOverwriteGame open={openOverwriteSave} setOpen={setOpenOverwriteSaveModal} id={gameId} setUserGamesUpdated={setUserGamesUpdated} />

      {userGames.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h2 className='text-center text-light'>Saved Games</h2>
          <div className='d-flex flex-column align-items-center pt-2'>
            {/* <h1>{`There are ${userGames.length} saved games`}</h1> */}
            {userGames.slice(startSave, endSave).map((game, index) => (
              <div
                key={`${game.name}${index}`}
                className='position-relative save-container savedGamesSection'
              >
                <div className='text-center mb-2 bg-primary p-3 save-styling rounded'>
                  <h6 className='mb-0 text-light'>{`Save Name: ${game.name}`}</h6>
                  <h6 className='mb-0 text-light'>{`Difficulty: ${game.difficulty}`}</h6>
                  <h6 className='mb-0 text-light'>{`Date Saved: ${game.date}`}</h6>
                </div>
                <Button
                  className='hide-hover'
                  onClick={() => {
                    setGameId(index); 
                    setOpenLoadModal(true);
                  }}
                >
                  Load
                </Button>
                <Button
                  className='hide-hover'
                  onClick={() => {
                    setGameId(index);
                    setOpenOverwriteModal(true);
                  }}
                >
                  Overwrite
                </Button>
                <Button
                  className='hide-hover'
                  onClick={() => {
                    setGameId(index);
                    setOpenDeleteModal(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            ))}
            <SavedGamesPagination currentPage={currentPage} firstPage />
          </div>
        </>
      )}
    </div>
  );
};

export default BasicModalExample;
