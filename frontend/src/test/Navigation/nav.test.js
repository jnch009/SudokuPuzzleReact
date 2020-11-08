import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NavBar from '../../Components/NavBar/NavBar';
import SideNav from '../../Components/SideNav/SideNav';

const mockClickHandlers = {
  handleCreditsClick: () => {},
  handleDifficultyClick: () => {},
  handleSudokuSolver: () => {},
  handleRulesClick: () => {},
  handleNewGameClick: () => {},
};

it('NavBar items, not authenticated', () => {
  render(<Router><NavBar navClickHandlers={mockClickHandlers} /></Router>);
  expect(screen.getByText('Credits')).toBeTruthy();
  expect(screen.getByText('Difficulty')).toBeTruthy();
  expect(screen.getByText('Solve')).toBeTruthy();
  expect(screen.getByText(/How To Play/)).toBeTruthy();
  expect(screen.getByText(/New Game/)).toBeTruthy();
  expect(screen.getByText(/Log In/)).toBeTruthy();
});

it('NavBar items, authenticated', () => {
  render(<Router><NavBar navClickHandlers={mockClickHandlers} isAuthenticated /></Router>);
  expect(screen.getByText('Credits')).toBeTruthy();
  expect(screen.getByText('Difficulty')).toBeTruthy();
  expect(screen.getByText('Solve')).toBeTruthy();
  expect(screen.getByText(/How To Play/)).toBeTruthy();
  expect(screen.getByText(/New Game/)).toBeTruthy();
  expect(screen.getByText(/Log Out/)).toBeTruthy();
});

it('Sidebar not authenticated', () => {
  render(<Router><SideNav navClickHandlers={mockClickHandlers} /></Router>);
  expect(screen.getByText('Credits')).toBeTruthy();
  expect(screen.getByText('Difficulty')).toBeTruthy();
  expect(screen.getByText('Solve')).toBeTruthy();
  expect(screen.getByText(/How To Play/)).toBeTruthy();
  expect(screen.getByText(/New Game/)).toBeTruthy();
  expect(screen.getByText(/Log In/)).toBeTruthy();
});

it('Sidebar authenticated', () => {
  render(<Router><SideNav navClickHandlers={mockClickHandlers} isAuthenticated /></Router>);
  expect(screen.getByText('Credits')).toBeTruthy();
  expect(screen.getByText('Difficulty')).toBeTruthy();
  expect(screen.getByText('Solve')).toBeTruthy();
  expect(screen.getByText(/How To Play/)).toBeTruthy();
  expect(screen.getByText(/New Game/)).toBeTruthy();
  expect(screen.getByText(/Log Out/)).toBeTruthy();
});
