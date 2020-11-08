import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalSaveGame from '../../Components/Modals/ModalSaveGame';

it('Expect Save Game modal visible', () => {
  render(<ModalSaveGame open />);
  expect(screen.getByText('Save Game')).toBeTruthy();
  expect(screen.getByText('Please enter the name of the save')).toBeTruthy();
  expect(screen.getByPlaceholderText('Save Name')).toBeTruthy();
  expect(screen.getByText('Save')).toBeTruthy();
});
