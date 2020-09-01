import React from 'react';
import { Modal, ModalBody, Button } from 'shards-react';

const ModalNewGame = ({ openNewGame, handleNewGameClick, newGameAccepted }) => {
  return (
    <Modal open={openNewGame} toggle={handleNewGameClick}>
      <ModalBody>
        <div className='newGameText'>
          Are you sure?
          <br />
        </div>
        <div className='flexButtons'>
          <Button onClick={newGameAccepted}>Yes</Button>
          <Button onClick={handleNewGameClick}>No</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalNewGame;
