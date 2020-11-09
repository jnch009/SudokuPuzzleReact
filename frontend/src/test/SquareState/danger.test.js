import { render, screen } from '@testing-library/react';
import SquareDangerBtn from '../../Components/Square/squareState/Danger';
import NoBorder from '../../Components/Square/squareBorders/None';

const num = 1;
const handleClick = () => {};
const borderColor = 'blue';

it('Square Active', () => {
  const { container } = render(SquareDangerBtn(NoBorder, num, handleClick, borderColor));
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.classList.contains('square')).toBeTruthy();
  expect(container.firstChild.classList.contains('danger')).toBeTruthy();
  expect(screen.getByText('1')).toBeTruthy();
});
