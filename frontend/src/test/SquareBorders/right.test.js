import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import SquareBorderRight from '../../Components/Square/squareBorders/Right';

const borderColor = 'blue';

it('Right border', () => {
  const { container } = render(<SquareBorderRight borderColor={borderColor} modify={true} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-right', `0.2em ${borderColor} solid`);
});

it('Right border not modifiable', () => {
  const { container } = render(<SquareBorderRight borderColor={borderColor} modify={false} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyleRule('border-right', `0.2em ${borderColor} solid`);
  expect(container.firstChild).toHaveStyleRule('color', '#fff');
  expect(container.firstChild).toHaveStyleRule('cursor', 'not-allowed!important');
});
