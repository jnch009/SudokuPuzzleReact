import { render, screen } from '@testing-library/react';
import { squareStateConstants } from '../../helperFn/testHelpers';
import SquareBtnLight from '../../Components/Square/squareState/Active';
import NoBorder from '../../Components/Square/squareBorders/None';

it('Square Active', () => {
  const { container } = render(SquareBtnLight(NoBorder, squareStateConstants.num, squareStateConstants.handleClick, squareStateConstants.borderColor));
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.classList.contains('square')).toBeTruthy();
  expect(container.firstChild.classList.contains('light')).toBeTruthy();
  expect(screen.getByText('1')).toBeTruthy();
});
