import React from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'shards-react';

const ModalRules = ({ openRules, handleRulesClick }) => {
  return (
    <Modal open={openRules} toggle={handleRulesClick}>
      <ModalHeader>Welcome to Sudoku!</ModalHeader>
      <ModalBody>
        <div className='rulesText'>
          <p>1. Only one number from 1-9 is allowed on each row<br/></p>
          <p>2. Only one number from 1-9 is allowed on each column<br/></p>
          <p>3. Only one number from 1-9 is allowed in each grid<br/></p>
          <p>
            The goal of the game is to find the missing numbers in the grid such
            that all three of these conditions are satisfied and if they are
            then you have successfully completed the puzzle.
            <br/>
          </p>
          <p>
            If not, then you must backtrack and find out which numbers are
            inserted incorrectly.<br/>
          </p>
          <p>
            You will know if the number is inserted incorrectly when the box is
            highlighted red.<br/>
          </p>
        </div>
        <Button onClick={handleRulesClick}>Got it!</Button>
      </ModalBody>
    </Modal>
  );
};

export default ModalRules;
