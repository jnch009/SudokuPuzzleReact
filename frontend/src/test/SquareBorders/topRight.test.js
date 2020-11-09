import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import SquareBorderTopRight from '../../Components/Square/squareBorders/topRight';

const borderColor = 'blue';

it('Top Right border', () => {
  const { container } = render(<SquareBorderTopRight borderColor={borderColor} modify={true} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-top', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('border-right', `0.2em ${borderColor} solid`);
});

it('Top Right border not modifiable', () => {
  const { container } = render(<SquareBorderTopRight borderColor={borderColor} modify={false} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-top', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('border-right', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('color', '#fff');
  expect(container.firstChild).toHaveStyleRule('cursor', 'not-allowed!important');
});
