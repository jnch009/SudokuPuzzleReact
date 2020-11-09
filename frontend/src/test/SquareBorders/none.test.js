import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import NoBorder from '../../Components/Square/squareBorders/None';

it('No border', () => {
  const { container } = render(<NoBorder modify={true} />);
  expect(container.firstChild).toMatchSnapshot();
});

it('No border not modifiable', () => {
  const { container } = render(<NoBorder modify={false} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('color', '#fff');
  expect(container.firstChild).toHaveStyleRule('cursor', 'not-allowed!important');
});
