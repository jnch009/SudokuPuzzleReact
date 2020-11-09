import { render, screen } from '@testing-library/react';
import SquareDisabledBtn from '../../Components/Square/squareState/Disabled';
import NoBorder from '../../Components/Square/squareBorders/None';

const num = 1;
const borderColor = 'blue';

it('Square Active', () => {
  const { container } = render(SquareDisabledBtn(NoBorder, num, borderColor));
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.classList.contains('square')).toBeTruthy();
  expect(container.firstChild.classList.contains('primary')).toBeTruthy();
  expect(screen.getByText('1')).toBeTruthy();
});
