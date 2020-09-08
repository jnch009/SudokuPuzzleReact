import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormInput,
  ModalFooter,
  Button
} from 'shards-react';

const ModalSaveGame = ({ open, setOpen, setSaveName, choice }) => {
  // const [saveName, setSaveName] = useState('');

  return (
    <Modal open={open} toggle={() => setOpen(!open)}>
      <ModalHeader>Save Game</ModalHeader>
      <ModalBody>
        <h5>Please enter the name of the save</h5>
        <FormInput
          onChange={(e) => setSaveName(e.target.value)}
          placeholder='Save Name'
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => choice(true)}>Save</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalSaveGame;
