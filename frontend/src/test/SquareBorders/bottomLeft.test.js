import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import SquareBorderBottomLeft from '../../Components/Square/squareBorders/bottomLeft';

const borderColor = 'blue';

it('Bottom left border', () => {
  const { container } = render(<SquareBorderBottomLeft borderColor={borderColor} modify={true} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-bottom', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('border-left', `0.2em ${borderColor} solid`);
});

it('Bottom left border not modifiable', () => {
  const { container } = render(<SquareBorderBottomLeft borderColor={borderColor} modify={false} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-bottom', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('border-left', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('color', '#fff');
  expect(container.firstChild).toHaveStyleRule('cursor', 'not-allowed!important');
});
