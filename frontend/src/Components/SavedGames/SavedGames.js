import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'shards-react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import ModalOverwriteGame from '../Modals/ModalOverwriteGame';
import ModalModifyGame from '../Modals/ModalModifyGame';
import SavedGamesPagination from '../SavedGamesPagination/SavedGamesPagination';

import './SavedGames.scss';
import { useAuth0 } from '@auth0/auth0-react';
import usePromptProvider from '../../hooks/usePromptProvider/index';
import { alertTypes } from '../../helperFn/alertConstants'; 

const gamesPerPage = 3;
const gameIdCalculation = (index, currentPage, gamesPerPage) => {
  return index+((currentPage-1)*gamesPerPage);
};

const SavedGames = ({ handleGridUpdate, redirectToGrid }) => {
  const history = useHistory();
  const { getAccessTokenSilently, user } = useAuth0();
  const { addPrompt } = usePromptProvider();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [userGames, setUserGames] = useState([]);
  const [userGamesRetrieved, setUserGamesRetrieved] = useState(false);

  const [gameId, setGameId] = useState();

  const [openLoadModal, setOpenLoadModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openOverwriteModal, setOpenOverwriteModal] = useState(false);
  const [openOverwriteSave, setOpenOverwriteSaveModal] = useState(false);

  const [userGamesUpdated, setUserGamesUpdated] = useState(false);

  const loadUser = useCallback(async () => {
    setUserGamesRetrieved(false);
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: process.env.REACT_APP_AUTH0_SCOPE,
      });

      const res = await fetch(`${process.env.REACT_APP_FETCH}/sudoku/${user.sub}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });

      const data = await res.json();
      setUserGames(Array.isArray(data) ? data : []);
      setUserGamesRetrieved(true);
    } catch (e) {
      addPrompt('Error getting saved games', alertTypes.ERROR);
    }
  },[addPrompt, getAccessTokenSilently, user.sub]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (userGamesUpdated){
      loadUser();
      setUserGamesUpdated(false);
    }
  }, [loadUser, userGamesUpdated]);

  useEffect(() => {
    if (userGamesRetrieved){
      if (currentPage > Math.ceil(userGames.length / gamesPerPage)){
        history.replace(`/manageSaves?saves=${currentPage-1}`);
      }
    }
    setTotalPages(Math.ceil(userGames.length / gamesPerPage));
  },[currentPage, history, userGames.length, userGamesRetrieved]);

  useEffect(() => {
    const saveNumber = Number(
      queryString.parse(history.location.search)['saves']
    );

    if (saveNumber <= totalPages){
      setCurrentPage(saveNumber);
    }
  }, [history.location, totalPages]);

  const startSave = (currentPage - 1) * gamesPerPage;
  const endSave = startSave + gamesPerPage;

  return (
    <div className='mt-1 d-flex align-items-center flex-column'>
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

      {!userGamesRetrieved ? (
        <h1 className='h-100 m-0 d-flex justify-content-center align-items-center text-white'>Loading...</h1>
      ) : (
        <>
          <Button className='mb-2' onClick={redirectToGrid}>Back to the game</Button>
          <h2 className='text-center text-light'>Saved Games</h2>
          {userGames.length === 0 ? <h1>There are no saved games</h1> : <div className='d-flex flex-column align-items-center pt-2'>
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
                    setGameId(gameIdCalculation(index,currentPage,gamesPerPage)); 
                    setOpenLoadModal(true);
                  }}
                >
                  Load
                </Button>
                <Button
                  className='hide-hover'
                  onClick={() => {
                    setGameId(gameIdCalculation(index,currentPage,gamesPerPage));
                    setOpenOverwriteModal(true);
                  }}
                >
                  Overwrite
                </Button>
                <Button
                  className='hide-hover'
                  onClick={() => {
                    setGameId(gameIdCalculation(index,currentPage,gamesPerPage));
                    setOpenDeleteModal(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            ))}
            <SavedGamesPagination totalPages={totalPages} currentPage={currentPage} firstPage={currentPage === 1} lastPage={currentPage === totalPages} />
          </div>}
        </>
      )}
    </div>
  );
};

export default SavedGames;
