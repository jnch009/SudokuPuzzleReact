import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingIndicator from '../../Components/LoadingIndicator/LoadingIndicator';

it('Loading Indicator visible', () => {
  const { container } = render(<LoadingIndicator />);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.firstChild.classList.contains('spinner-border')).toBeTruthy();
  expect(screen.queryByRole('status')).toBeTruthy();
});
