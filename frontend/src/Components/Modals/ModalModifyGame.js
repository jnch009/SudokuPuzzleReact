import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Modal, ModalHeader, ModalBody, Button } from 'shards-react';

const ModalModifyGame = ({ open, setOpen, title, action, id, handleGridUpdate, handleOverwriteClick }) => {
  const history = useHistory();
  const [accepted, setAccepted] = useState(false);
  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    function cleanUp() {
      setOpen(false);
      setAccepted(false);
      history.push('/');
    }

    const saveGameLoad = async () => {
      if (accepted){
        try {
          const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: process.env.REACT_APP_AUTH0_SCOPE,
          });
    
          const saveLoaded = await fetch(`http://localhost:3001/sudoku/${user.sub}?saveGame=${id}`, {
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
        } catch (e) {
          console.log(e.message);
        }

        return cleanUp();
      }
      setAccepted(false);
    };

    const saveGameOverwrite = async () => {
      if (accepted){
        setOpen(false);
        setAccepted(false);
        handleOverwriteClick(true);
      }
    };

    switch (action) {
    case 'load':
      saveGameLoad();
      break;
    case 'overwrite':
      saveGameOverwrite();
      break;
    default:
      break;
    }
    
  },[accepted]);

  return (
    <Modal open={open} toggle={() => setOpen(!open)}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <h5>{`Do you want to ${action} this game?`}</h5>
        <div className='d-flex justify-content-around'>
          <Button className='w-25' onClick={() => setAccepted(true)}>Yes</Button>
          <Button className='w-25' onClick={() => setOpen(false)}>No</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalModifyGame;
