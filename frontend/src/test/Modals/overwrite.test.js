import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalOverwriteGame from '../../Components/Modals/ModalOverwriteGame';

it('Expect Overwrite Game modal visible', () => {
  render(<ModalOverwriteGame open />);
  expect(screen.getByText('Update Game')).toBeTruthy();
  expect(screen.getByText('Please enter the name of the save')).toBeTruthy();
  expect(screen.getByPlaceholderText('Save Name')).toBeTruthy();
  expect(screen.getByText('Overwrite')).toBeTruthy();
});
