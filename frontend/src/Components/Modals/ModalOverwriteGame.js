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

const ModalOverwriteGame = ({ open, setOpen, id, setUserGamesUpdated }) => {
  const [saveName, setSaveName] = useState('');
  const [overwriteGameAccepted, setOverwriteGameAccepted] = useState(false);
  const { getAccessTokenSilently, user } = useAuth0();
  const { addPrompt } = usePromptProvider();

  useEffect(() => {
    function cleanUp() {
      setOpen(false);
      setUserGamesUpdated(true);
      addPrompt('Updated Saved Game!', alertTypes.SUCCESS);
    }
    
    const savingGame = async () => {
      if (overwriteGameAccepted) {
        if (!validateSaveName(saveName)) {
          addPrompt('Did not pass validation', alertTypes.ERROR);
        } else {
          try {
            const accessToken = await getAccessTokenSilently({
              audience: process.env.REACT_APP_AUTH0_AUDIENCE,
              scope: process.env.REACT_APP_AUTH0_SCOPE,
            });

            await fetch(`http://localhost:3001/sudoku/${user.sub}/${id}`, {
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
                  date: new Intl.DateTimeFormat('default', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                  }).format(new Date(Date.now())),
                },
              }),
            });
          } catch (e) {
            addPrompt('Error Overwriting Saved Game', alertTypes.ERROR);
          }

          return cleanUp();
        }
      }
      setOverwriteGameAccepted(false);
    };
    savingGame();
  }, [overwriteGameAccepted]);

  return (
    <Modal open={open} toggle={setOpen}>
      <ModalHeader>Update Game</ModalHeader>
      <ModalBody>
        <h5>Please enter the name of the save</h5>
        <FormInput onChange={(e) => setSaveName(e.target.value)} placeholder='Save Name' />
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => setOverwriteGameAccepted(true)}>
          Overwrite
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalOverwriteGame;
