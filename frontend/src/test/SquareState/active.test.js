import { render, screen } from '@testing-library/react';
import SquareBtnLight from '../../Components/Square/squareState/Active';
import NoBorder from '../../Components/Square/squareBorders/None';

const num = 1;
const handleClick = () => {};
const borderColor = 'blue';

it('Square Active', () => {
  const { container } = render(SquareBtnLight(NoBorder, num, handleClick, borderColor));
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.classList.contains('square')).toBeTruthy();
  expect(container.firstChild.classList.contains('light')).toBeTruthy();
  expect(screen.getByText('1')).toBeTruthy();
});
