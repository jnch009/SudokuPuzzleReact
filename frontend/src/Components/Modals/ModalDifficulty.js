import React from 'react';
import { Modal, ModalBody, ModalHeader, FormRadio, Button } from 'shards-react';

<<<<<<< HEAD
const ModalDifficulty = ({
  openDifficulty,
  handleDifficultyClick,
  difficulty,
  changeDifficulty,
}) => {
=======
const ModalDifficulty = ({ openDifficulty, handleDifficultyClick, difficulty, changeDifficulty }) => {
>>>>>>> 1b63424727dde90fe31d96229fda6c33487f2881
  return (
    <Modal open={openDifficulty} toggle={handleDifficultyClick}>
      <ModalHeader>Change Difficulty</ModalHeader>
      <ModalBody>
<<<<<<< HEAD
        <FormRadio
          label='Beginner'
          checked={difficulty === 'Beginner'}
          onChange={() => {
            changeDifficulty('Beginner');
          }}
        >
          Beginner
        </FormRadio>
        <FormRadio
          checked={difficulty === 'Easy'}
          onChange={() => {
            changeDifficulty('Easy');
          }}
        >
          Easy
        </FormRadio>
        <FormRadio
          checked={difficulty === 'Normal'}
          onChange={() => {
            changeDifficulty('Normal');
          }}
        >
          Normal
        </FormRadio>
        <FormRadio
          checked={difficulty === 'Hard'}
          onChange={() => {
            changeDifficulty('Hard');
          }}
        >
=======
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
>>>>>>> 1b63424727dde90fe31d96229fda6c33487f2881
          Hard
        </FormRadio>
        <Button onClick={handleDifficultyClick}>Accept</Button>
      </ModalBody>
    </Modal>
  );
};

export default ModalDifficulty;
