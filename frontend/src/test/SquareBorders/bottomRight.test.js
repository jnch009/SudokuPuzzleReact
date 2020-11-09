import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import SquareBorderBottomRight from '../../Components/Square/squareBorders/bottomRight';

const borderColor = 'blue';

it('Bottom right border', () => {
  const { container } = render(<SquareBorderBottomRight borderColor={borderColor} modify={true} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-bottom', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('border-right', `0.2em ${borderColor} solid`);
});

it('Bottom right border not modifiable', () => {
  const { container } = render(<SquareBorderBottomRight borderColor={borderColor} modify={false} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-bottom', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('border-right', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('color', '#fff');
  expect(container.firstChild).toHaveStyleRule('cursor', 'not-allowed!important');
});
