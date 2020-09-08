import React, { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'shards-react';

const ModalLoadGame = ({ openLoadGame, setOpenLoadGame }) => {
  return (
    <Modal open={openLoadGame} toggle={() => setOpenLoadGame(!openLoadGame)}>
      <ModalHeader>Load Game</ModalHeader>
      <ModalBody>
        <h5>Do you want to load this game?</h5>
        <div className='d-flex justify-content-around'>
          <Button className='w-25'>Yes</Button>
          <Button className='w-25'>No</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalLoadGame;
