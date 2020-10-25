import React from 'react';
import { Modal, ModalBody, ModalHeader, FormRadio, Button } from 'shards-react';

const ModalDifficulty = ({ openDifficulty, handleDifficultyClick, difficulty, changeDifficulty }) => {
  return (
    <Modal open={openDifficulty} toggle={handleDifficultyClick}>
      <ModalHeader>Change Difficulty</ModalHeader>
      <ModalBody>
        <FormRadio checked={difficulty === 'Beginner'} onChange={() => changeDifficulty('Beginner')}>
          Beginner
        </FormRadio>
        <FormRadio checked={difficulty === 'Easy'} onChange={() => changeDifficulty('Easy')}>
          Easy
        </FormRadio>
        <FormRadio checked={difficulty === 'Normal'} onChange={() => changeDifficulty('Normal')}>
          Normal
        </FormRadio>
        <FormRadio checked={difficulty === 'Hard'} onChange={() => changeDifficulty('Hard')}>
          Hard
        </FormRadio>
        <Button onClick={handleDifficultyClick}>Accept</Button>
      </ModalBody>
    </Modal>
  );
};

export default ModalDifficulty;
