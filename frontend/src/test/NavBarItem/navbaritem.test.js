import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBarItem from '../../Components/NavBarItem/NavBarItem';

const name = 'Sudoku';

it('NavBarItem component visible', () => {
  render(<NavBarItem name={name} />);
  expect(screen.getByRole('button')).toBeTruthy();
  expect(screen.getByText(name)).toBeTruthy();
});
