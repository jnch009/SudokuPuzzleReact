import React, { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'shards-react';

const ModalModifyGame = ({ open, setOpen, title, action }) => {
  return (
    <Modal open={open} toggle={() => setOpen(!open)}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <h5>{`Do you want to ${action} this game?`}</h5>
        <div className='d-flex justify-content-around'>
          <Button className='w-25'>Yes</Button>
          <Button className='w-25'>No</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalModifyGame;