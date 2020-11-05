import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { alertTypes } from '../../helperFn/alertConstants'; 
import { Modal, ModalHeader, ModalBody, Button } from 'shards-react';
import usePromptProvider from '../../hooks/usePromptProvider/index';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const ModalLoadGame = ({ open, setOpen, id, handleGridUpdate }) => {
  const history = useHistory();
  const [accepted, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  
  const { getAccessTokenSilently, user } = useAuth0();
  const { addPrompt } = usePromptProvider();

  useEffect(() => {
    function cleanUp() {
      setOpen(false);
      setAccepted(false);
      setIsLoading(false);
      history.push('/');
    }

    const saveGameLoad = async () => {
      if (accepted){
        setIsLoading(true);
        try {
          const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: process.env.REACT_APP_AUTH0_SCOPE,
          });
    
          const saveLoaded = await fetch(`${process.env.REACT_APP_FETCH}/sudoku/${user.sub}?saveGame=${id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            credentials: 'include',
          });
          const saveData = await saveLoaded.json();

          sessionStorage.setItem('grid', saveData.grid);
          sessionStorage.setItem('difficulty', saveData.difficulty);
          await handleGridUpdate(JSON.parse(saveData.grid), saveData.difficulty);
          addPrompt('Loaded Game!', alertTypes.SUCCESS);
        } catch (e) {
          addPrompt('Error Loading Saved Game', alertTypes.ERROR);
        }

        return cleanUp();
      }
      setIsLoading(false);
      setAccepted(false);
    };

    saveGameLoad();
  }, [accepted, addPrompt, getAccessTokenSilently, handleGridUpdate, history, id, setOpen, user.sub]);

  return (
    <Modal open={open} toggle={() => setOpen(!open)}>
      <ModalHeader>Load</ModalHeader>
      <ModalBody>
        <h5>Do you really want to load this game?</h5>
        {isLoading ? <LoadingIndicator /> : null}
        <div className='d-flex justify-content-around'>
          <Button className='w-25' onClick={() => setAccepted(true)}>Yes</Button>
          <Button className='w-25' onClick={() => setOpen(false)}>No</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalLoadGame;
