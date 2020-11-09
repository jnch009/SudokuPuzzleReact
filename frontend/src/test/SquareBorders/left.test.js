import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import SquareBorderLeft from '../../Components/Square/squareBorders/Left';

const borderColor = 'blue';

it('Left border', () => {
  const { container } = render(<SquareBorderLeft borderColor={borderColor} modify={true} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-left', `0.2em ${borderColor} solid`);
});

it('Left border not modifiable', () => {
  const { container } = render(<SquareBorderLeft borderColor={borderColor} modify={false} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-left', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('color', '#fff');
  expect(container.firstChild).toHaveStyleRule('cursor', 'not-allowed!important');
});
