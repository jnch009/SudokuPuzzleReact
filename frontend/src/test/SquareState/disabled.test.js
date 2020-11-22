import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import { squareStateConstants } from '../../helperFn/testHelpers';
import SquareDisabledBtn from '../../Components/Square/squareState/Disabled';
import NoBorder from '../../Components/Square/squareBorders/None';

it('Square Active', () => {
  const { container } = render(SquareDisabledBtn(NoBorder, squareStateConstants.num, squareStateConstants.borderColor));
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.classList.contains('square')).toBeTruthy();
  expect(container.firstChild.classList.contains('primary')).toBeTruthy();
  expect(screen.getByText('1')).toBeTruthy();
});
