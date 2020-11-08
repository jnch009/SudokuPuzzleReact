import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalOverwriteConfirm from '../../Components/Modals/ModalOverwriteConfirm';

it('Expect Overwrite Confirm Modal visible', () => {
  render(<ModalOverwriteConfirm open />);
  expect(screen.getByText('Overwrite')).toBeTruthy();
  expect(screen.getByText('Do you want to overwrite this game?')).toBeTruthy();
  expect(screen.getByText('Yes')).toBeTruthy();
  expect(screen.getByText('No')).toBeTruthy();
});
