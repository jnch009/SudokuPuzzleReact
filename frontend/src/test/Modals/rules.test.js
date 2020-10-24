import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalRules from '../../Components/Modals/ModalRules';

it('Expect Credits Header and Body', () => {
  render(<ModalRules openRules />);
  expect(screen.getByText(/Welcome to Sudoku!/)).toBeTruthy();
  expect(screen.getByText(/1. Only one number from 1-9 is allowed on each row/)).toBeTruthy();
  expect(screen.getByText(/2. Only one number from 1-9 is allowed on each column/)).toBeTruthy();
  expect(screen.getByText(/3. Only one number from 1-9 is allowed in each grid/)).toBeTruthy();
});
