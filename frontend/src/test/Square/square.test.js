import React from 'react';
import 'jest-styled-components';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { squarePropsConstants } from '../../helperFn/testHelpers';
import Square from '../../Components/Square/square';

it('Valid Square', () => {
  const { container } = render(<Square squareProps={squarePropsConstants} modify={true} valid={true} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.classList.contains('square')).toBeTruthy();
  expect(container.firstChild.classList.contains('light')).toBeTruthy();
  expect(screen.getByText('1')).toBeTruthy();
});

it('Invalid Square', () => {
  const { container } = render(<Square squareProps={squarePropsConstants} modify={true} valid={false} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.classList.contains('square')).toBeTruthy();
  expect(container.firstChild.classList.contains('danger')).toBeTruthy();
  expect(screen.getByText('1')).toBeTruthy();
});

it('Unmodifiable Square', () => {
  const { container } = render(<Square squareProps={squarePropsConstants} modify={false} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.classList.contains('square')).toBeTruthy();
  expect(container.firstChild.classList.contains('primary')).toBeTruthy();
  expect(screen.getByText('1')).toBeTruthy();
});

it('Trying to modify an unmodifiable square', () => {
  render(<Square squareProps={squarePropsConstants} modify={false} />);
  expect(screen.getByRole('button')).toBeTruthy();
  userEvent.click(screen.getByRole('button'));
  expect(screen.getByRole('button')).toBeTruthy();
});

it('Modify Square', () => {
  render(<Square squareProps={squarePropsConstants} modify={true} valid={true} />);
  expect(screen.getByRole('button')).toBeTruthy();
  userEvent.click(screen.getByRole('button'));
  expect(screen.queryByRole('button')).toBeFalsy();
  expect(screen.getByRole('textbox')).toBeTruthy();
});
