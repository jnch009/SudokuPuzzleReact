import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalLoadGame from '../../Components/Modals/ModalLoadGame';

it('Expect Load Modal visible', () => {
  render(<ModalLoadGame open />);
  expect(screen.getByText('Load')).toBeTruthy();
  expect(screen.getByText('Do you really want to load this game?')).toBeTruthy();
  expect(screen.getByText('Yes')).toBeTruthy();
  expect(screen.getByText('No')).toBeTruthy();
});
