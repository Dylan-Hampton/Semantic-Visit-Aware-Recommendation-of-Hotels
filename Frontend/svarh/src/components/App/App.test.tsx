import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
  expect(screen.getByText(/Search Hotels/i)).toBeInTheDocument();
});

test('renders submission frame inputs', () => {
  render(<App />);
  expect(screen.getByRole("combobox", { name: "City" })).toBeInTheDocument();
  expect(screen.getByRole("combobox", { name: "Points of Interest" })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "Maximum Distance" })).toBeInTheDocument();
});

test('renders submission button', () => {
  render(<App />);
  expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Submit" })).toBeEnabled();
});

test('renders settings button', () => {
  render(<App />);
  expect(screen.getByTestId("SettingsIcon")).toBeInTheDocument(); 
});

test('settings button handles click', () => {
  render(<App />);
  const settingsBtn = screen.getByTestId("SettingsIcon");
  expect(settingsBtn).toBeInTheDocument(); 
  fireEvent.click(settingsBtn);
  expect(settingsBtn).not.toBeInTheDocument();
  expect(screen.getByLabelText("CloseSettingsMenuBtn")).toBeInTheDocument();
  expect(screen.getByText("Advanced Settings")).toBeInTheDocument();
  expect(screen.getByLabelText("Algorithm")).toBeInTheDocument();
});

test('open and close settings panel', () => {
  render(<App />);
  const settingsBtn = screen.getByTestId("SettingsIcon");
  fireEvent.click(settingsBtn);
  expect(settingsBtn).not.toBeInTheDocument();
  const closeSettingsBtn = screen.getByLabelText("CloseSettingsMenuBtn");
  const settingsTxt = screen.getByText("Advanced Settings");
  const algoDropdown = screen.getByLabelText("Algorithm");
  expect(closeSettingsBtn).toBeInTheDocument();
  expect(settingsTxt).toBeInTheDocument();
  expect(algoDropdown).toBeInTheDocument();
  fireEvent.click(screen.getByLabelText("CloseSettingsMenuBtn"));
  expect(screen.getByTestId("SettingsIcon")).toBeInTheDocument(); 
  expect(closeSettingsBtn).not.toBeInTheDocument();
  expect(settingsTxt).not.toBeInTheDocument();
  expect(algoDropdown).not.toBeInTheDocument();
});
