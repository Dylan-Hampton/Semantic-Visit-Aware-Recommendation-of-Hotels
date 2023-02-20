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

test('renders submission frame inputs', () => {
  render(<App />);
  expect(screen.getByRole("combobox", { name: "City" })).toBeInTheDocument();
  expect(screen.getByRole("combobox", { name: "Points of Interest" })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "Maximum Distance" })).toBeInTheDocument();
});

test('renders submission button', () => {
  render(<App />);
  const submitBtn = screen.getByRole("button", { name: "Submit" });
  expect(submitBtn).toBeInTheDocument();
});
