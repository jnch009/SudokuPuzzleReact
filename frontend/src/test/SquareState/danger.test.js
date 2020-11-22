import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import { squareStateConstants } from '../../helperFn/testHelpers';
import SquareDangerBtn from '../../Components/Square/squareState/Danger';
import NoBorder from '../../Components/Square/squareBorders/None';

it('Square Danger', () => {
  const { container } = render(SquareDangerBtn(NoBorder, squareStateConstants.num, squareStateConstants.handleClick, squareStateConstants.borderColor));
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.classList.contains('square')).toBeTruthy();
  expect(container.firstChild.classList.contains('danger')).toBeTruthy();
  expect(screen.getByText('1')).toBeTruthy();
});
