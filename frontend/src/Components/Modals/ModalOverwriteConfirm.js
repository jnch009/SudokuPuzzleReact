import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'shards-react';

const ModalOverwriteConfirm = ({ open, setOpen, handleOverwriteClick }) => {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const saveGameOverwrite = async () => {
      if (accepted){
        setOpen(false);
        setAccepted(false);
        handleOverwriteClick(true);
      }
    };
    
    saveGameOverwrite();
  },[accepted, handleOverwriteClick, setOpen]);

  return (
    <Modal open={open} toggle={() => setOpen(!open)}>
      <ModalHeader>Overwrite</ModalHeader>
      <ModalBody>
        <h5>Do you want to overwrite this game?</h5>
        <div className='d-flex justify-content-around'>
          <Button className='w-25' onClick={() => setAccepted(true)}>Yes</Button>
          <Button className='w-25' onClick={() => setOpen(false)}>No</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalOverwriteConfirm;

