import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalCredits from '../../Components/Modals/ModalCredits';

it('Expect Credits Header and Body', () => {
  render(<ModalCredits openCredits />);
  expect(screen.getByText('Credits')).toBeTruthy();
  expect(screen.getByText('Developed by: Jeremy Ng Cheng Hin')).toBeTruthy();
});


