import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
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

const ModalSaveGame = ({ open, setOpen }) => {
  const [saveName, setSaveName] = useState('');
  const [saveGameAccepted, setSaveGameAccepted] = useState(false);
  const { getAccessTokenSilently, user } = useAuth0();
  const { addPrompt } = usePromptProvider();

  useEffect(() => {
    const savingGame = async () => {
      if (saveGameAccepted) {
        if (!validateSaveName(saveName)) {
          addPrompt('Did not pass validation', alertTypes.ERROR);
        } else {
          try {
            const accessToken = await getAccessTokenSilently({
              audience: process.env.REACT_APP_AUTH0_AUDIENCE,
              scope: process.env.REACT_APP_AUTH0_SCOPE,
            });
      
            const resp = await fetch('http://localhost:3001/sudoku', {
              method: 'POST',
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

            if (resp.status !== 200){
              throw await resp.json();
            } else {
              addPrompt('Saved Game!', alertTypes.SUCCESS);
            }
          } catch (e) {
            addPrompt(typeof e !== 'object' ? e : 'Error Saving Game', alertTypes.ERROR);
          }

          setOpen(false);
          setSaveName('');
        }
      }
      setSaveGameAccepted(false);
    };
    savingGame();
  }, [saveGameAccepted]);

  return (
    <Modal open={open} toggle={setOpen}>
      <ModalHeader>Save Game</ModalHeader>
      <ModalBody>
        <h5>Please enter the name of the save</h5>
        <FormInput onChange={(e) => setSaveName(e.target.value)} placeholder='Save Name' />
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => setSaveGameAccepted(true)}>Save</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalSaveGame;
