import React, { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'shards-react';

const ModalModifyGame = ({ open, setOpen, title, action, choice }) => {
  return (
    <Modal open={open} toggle={() => setOpen(!open)}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <h5>{`Do you want to ${action} this game?`}</h5>
        <div className='d-flex justify-content-around'>
          <Button className='w-25' onClick={() => choice(true)}>Yes</Button>
          <Button className='w-25' onClick={() => choice(false)}>No</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalModifyGame;