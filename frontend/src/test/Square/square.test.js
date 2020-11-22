import React from 'react';
import 'jest-styled-components';

import { render, screen } from '@testing-library/react';
import { squarePropsConstants } from '../../helperFn/testHelpers';
import Square from '../../Components/Square/square';

//integration test
const borderColor = 'blue';

it('Valid Square', () => {
  const { container } = render(<Square squareProps={squarePropsConstants} modify={true} valid={true} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-top', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('border-left', `0.2em ${borderColor} solid`);
  expect(container.firstChild.classList.contains('square')).toBeTruthy();
  expect(container.firstChild.classList.contains('light')).toBeTruthy();
  expect(screen.getByText('1')).toBeTruthy();
});

