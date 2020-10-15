import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormInput,
  ModalFooter,
  Button
} from 'shards-react';
import validateSaveName from '../../helperFn/validation';

const ModalSaveGame = ({ open, setOpen }) => {
  const [saveName, setSaveName] = useState('');
  const [saveGame, setSaveGame] = useState(false);

  //useEffect for handling save game success
  useEffect(() => {
    //fetch call along with validation of name
    if (saveGame){
      if (!validateSaveName(saveName)) {
        alert('did not pass validation');
      } else {
        setOpen(false);
      }
    }
    setSaveGame(false);
  }, [saveGame]);
  
  return (
    <Modal open={open} toggle={setOpen}>
      <ModalHeader>Save Game</ModalHeader>
      <ModalBody>
        <h5>Please enter the name of the save</h5>
        <FormInput
          onChange={(e) => setSaveName(e.target.value)}
          placeholder='Save Name'
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => setSaveGame(true)}>Save</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalSaveGame;
