import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { alertTypes } from '../../helperFn/alertConstants'; 
import { Modal, ModalHeader, ModalBody, Button } from 'shards-react';
import usePromptProvider from '../../hooks/usePromptProvider/index';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const ModalDeleteGame = ({ open, setOpen, id, setUserGamesUpdated }) => {
  const [accepted, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  
  const { getAccessTokenSilently, user } = useAuth0();
  const { addPrompt } = usePromptProvider();

  useEffect(() => {
    function cleanUp() {
      setOpen(false);
      setAccepted(false);
      setUserGamesUpdated(true);
      setIsLoading(false);
      addPrompt('Deleted Game!', alertTypes.SUCCESS);
    }

    const saveGameDelete = async () => {
      if (accepted){
        setIsLoading(true);
        try {
          const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: process.env.REACT_APP_AUTH0_SCOPE,
          });
      
          await fetch(`${process.env.REACT_APP_FETCH}/sudoku/${user.sub}/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            credentials: 'include',
          });

        } catch (e) {
          addPrompt('Error Deleting Saved Game', alertTypes.ERROR);
        }
        
        return cleanUp();
      }
      setIsLoading(false);
      setAccepted(false);
    };
    saveGameDelete();
  },[accepted, addPrompt, getAccessTokenSilently, id, setOpen, setUserGamesUpdated, user.sub]);


  return (
    <Modal open={open} toggle={() => setOpen(!open)}>
      <ModalHeader>Delete</ModalHeader>
      <ModalBody>
        <h5>Do you really want to delete this game?</h5>
        {isLoading ? <LoadingIndicator /> : null}
        <div className='d-flex justify-content-around'>
          <Button className='w-25' onClick={() => setAccepted(true)}>Yes</Button>
          <Button className='w-25' onClick={() => setOpen(false)}>No</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalDeleteGame;
