import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormInput,
  ModalFooter,
  Button,
} from 'shards-react';
import validateSaveName from '../../helperFn/validation';
import usePromptProvider from '../../hooks/usePromptProvider/index';
import { alertTypes } from '../../helperFn/alertConstants'; 
import fn from '../../helperFn/boardFunctions';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const ModalOverwriteGame = ({ open, setOpen, id, setUserGamesUpdated }) => {
  const [saveName, setSaveName] = useState('');
  const [overwriteGameAccepted, setOverwriteGameAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessTokenSilently, user } = useAuth0();
  const { addPrompt } = usePromptProvider();

  useEffect(() => {
    function cleanUp() {
      setOpen(false);
      setOverwriteGameAccepted(false);
      setUserGamesUpdated(true);
      addPrompt('Updated Saved Game!', alertTypes.SUCCESS);
    }
    
    const savingGame = async () => {
      if (overwriteGameAccepted && open) {
        setIsLoading(true);
        if (!validateSaveName(saveName)) {
          addPrompt('Did not pass validation', alertTypes.ERROR);
        } else {
          try {
            const accessToken = await getAccessTokenSilently({
              audience: process.env.REACT_APP_AUTH0_AUDIENCE,
              scope: process.env.REACT_APP_AUTH0_SCOPE,
            });

            await fetch(`${process.env.REACT_APP_FETCH}/sudoku/${user.sub}/${id}`, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                user_id: user.sub,
                saveGame: {
                  name: saveName,
                  grid: sessionStorage.getItem('grid'),
                  difficulty: sessionStorage.getItem('difficulty'),
                  date: fn.getCurrentDate()
                }
              }),
            });
          } catch (e) {
            addPrompt('Error Overwriting Saved Game', alertTypes.ERROR);
          }

          return cleanUp();
        }
      }
      setIsLoading(false);
      setOverwriteGameAccepted(false);
    };
    savingGame();
  }, [addPrompt, getAccessTokenSilently, id, open, overwriteGameAccepted, saveName, setOpen, setUserGamesUpdated, user]);

  return (
    <Modal open={open} toggle={setOpen}>
      <ModalHeader>Update Game</ModalHeader>
      <ModalBody>
        <h5>Please enter the name of the save</h5>
        <FormInput onChange={(e) => setSaveName(e.target.value)} placeholder='Save Name' />
      </ModalBody>
      {isLoading ? <LoadingIndicator /> : null}
      <ModalFooter>
        <Button onClick={() => setOverwriteGameAccepted(true)}>
          Overwrite
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalOverwriteGame;
