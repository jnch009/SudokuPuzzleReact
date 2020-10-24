import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalNewGame from '../../Components/Modals/ModalNewGame';

it('Expect New Game Body', () => {
  render(<ModalNewGame openNewGame />);
  expect(screen.getByText(/Are you sure\\?/)).toBeTruthy();
  expect(screen.getByText('Yes')).toBeTruthy();
  expect(screen.getByText('No')).toBeTruthy();
});
