import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalDeleteGame from '../../Components/Modals/ModalDeleteGame';

it('Expect Delete Modal visible', () => {
  render(<ModalDeleteGame open />);
  expect(screen.getByText('Delete')).toBeTruthy();
  expect(screen.getByText('Do you really want to delete this game?')).toBeTruthy();
  expect(screen.getByText('Yes')).toBeTruthy();
  expect(screen.getByText('No')).toBeTruthy();
});
