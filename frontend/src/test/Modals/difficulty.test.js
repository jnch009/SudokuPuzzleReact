import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalDifficulty from '../../Components/Modals/ModalDifficulty';

it('Expect Difficulty settings to be visible', () => {
  render(<ModalDifficulty openDifficulty />);
  expect(screen.getByText(/Change Difficulty/)).toBeTruthy();
  expect(screen.getByText('Beginner')).toBeTruthy();
  expect(screen.getByText('Easy')).toBeTruthy();
  expect(screen.getByText('Normal')).toBeTruthy();
  expect(screen.getByText('Hard')).toBeTruthy();
});
