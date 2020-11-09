import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import SquareBorderTop from '../../Components/Square/squareBorders/Top';

const borderColor = 'blue';

it('Top border', () => {
  const { container } = render(<SquareBorderTop borderColor={borderColor} modify={true} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-top', `0.2em ${borderColor} solid`);
});

it('Top border not modifiable', () => {
  const { container } = render(<SquareBorderTop borderColor={borderColor} modify={false} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-top', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('color', '#fff');
  expect(container.firstChild).toHaveStyleRule('cursor', 'not-allowed!important');
});
