import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'shards-react';

const ModalCredits = ({ openCredits, handleCreditsClick }) => {
  return (
    <Modal open={openCredits} toggle={handleCreditsClick}>
      <ModalHeader>Credits</ModalHeader>
      <ModalBody>Developed by: Jeremy Ng Cheng Hin</ModalBody>
    </Modal>
  );
};

export default ModalCredits;
