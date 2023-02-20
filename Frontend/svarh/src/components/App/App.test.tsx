import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

export const mockMapOn = jest.fn();
export const mockMapRemove = jest.fn();

jest.mock('mapbox-gl', () => ({
    Map: function () {
      // @ts-ignore
      this.on = mockMapOn;
      // @ts-ignore
      this.remove = mockMapRemove;
    }
  }));

test('renders search frame header', () => {
  render(<App />);
  const linkHeader = screen.getByText(/Search Hotels/i);
  expect(linkHeader).toBeInTheDocument();
});

test('renders submission button', () => {
  render(<App />);
  const submitBtn = screen.getByText(/Submit/i);
  expect(submitBtn).toBeInTheDocument();
});