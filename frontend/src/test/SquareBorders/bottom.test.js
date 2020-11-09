import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import SquareBorderBottom from '../../Components/Square/squareBorders/Bottom';

const borderColor = 'blue';

it('Bottom border', () => {
  const { container } = render(<SquareBorderBottom borderColor={borderColor} modify={true} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-bottom', `0.2em ${borderColor} solid`);
});

it('Bottom border not modifiable', () => {
  const { container } = render(<SquareBorderBottom borderColor={borderColor} modify={false} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-bottom', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('color', '#fff');
  expect(container.firstChild).toHaveStyleRule('cursor', 'not-allowed!important');
});
