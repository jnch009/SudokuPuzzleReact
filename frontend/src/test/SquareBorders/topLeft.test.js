import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import SquareBorderTopLeft from '../../Components/Square/squareBorders/topLeft';

const borderColor = 'blue';

it('Top Left border', () => {
  const { container } = render(<SquareBorderTopLeft borderColor={borderColor} modify={true} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-top', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('border-left', `0.2em ${borderColor} solid`);
});

it('Top Left border not modifiable', () => {
  const { container } = render(<SquareBorderTopLeft borderColor={borderColor} modify={false} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-top', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('border-left', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('color', '#fff');
  expect(container.firstChild).toHaveStyleRule('cursor', 'not-allowed!important');
});
