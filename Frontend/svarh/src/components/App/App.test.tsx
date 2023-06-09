import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from '../../store';
import SubmissionFrame from '../inputBar/submissionFrame/SubmissionFrame';
import Settings from '../inputBar/advancedSettings/Settings/Settings';

export const mockMapOn = jest.fn();
export const mockMapRemove = jest.fn();

// test change

jest.mock('mapbox-gl', () => ({
    Map: function () {
      // @ts-ignore
      this.on = mockMapOn;
      // @ts-ignore
      this.remove = mockMapRemove;
    }
  }));

test('renders search frame header', () => {
  render(<Provider store={store}>
           <SubmissionFrame></SubmissionFrame>
         </Provider>);
  expect(screen.getByText(/Search Hotels/i)).toBeInTheDocument();
});

test('renders submission frame inputs', () => {
  render(<Provider store={store}>
    <SubmissionFrame></SubmissionFrame>
  </Provider>);
  expect(screen.getByRole("combobox", { name: "City" })).toBeInTheDocument();
  expect(screen.getByRole("combobox", { name: "Points of Interest" })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "Maximum Distance" })).toBeInTheDocument();
});

test('renders submission button', () => {
  render(<Provider store={store}>
          <SubmissionFrame></SubmissionFrame>
        </Provider>);
  expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Submit" })).toBeEnabled();
});

test('renders settings button', () => {
  render(<Provider store={store}>
          <Settings></Settings>
        </Provider>);
  expect(screen.getByTestId("SettingsIcon")).toBeInTheDocument(); 
});

test('settings button handles click', () => {
  const defaultOriginNum = "10";
  render(<Provider store={store}>
          <Settings></Settings>
        </Provider>);
  const settingsBtn = screen.getByTestId("SettingsIcon");
  expect(settingsBtn).toBeInTheDocument(); 
  fireEvent.click(settingsBtn); // open settings panel

  expect(settingsBtn).not.toBeInTheDocument();
  expect(screen.getByLabelText("CloseSettingsMenuBtn")).toBeInTheDocument();
  expect(screen.getByText("Advanced Settings")).toBeInTheDocument();
  expect(screen.getByLabelText("Algorithm")).toBeInTheDocument();
  expect(screen.getByLabelText("Max # of Origins")).toBeInTheDocument();
  expect(screen.getByLabelText("Max # of Origins")).toHaveValue(defaultOriginNum);
});

test('open and close settings panel', () => {
  render(<Provider store={store}>
        <Settings></Settings>
        </Provider>);
  const settingsBtn = screen.getByTestId("SettingsIcon");
  fireEvent.click(settingsBtn); // open settings panel

  expect(settingsBtn).not.toBeInTheDocument();
  const closeSettingsBtn = screen.getByLabelText("CloseSettingsMenuBtn");
  const settingsTxt = screen.getByText("Advanced Settings");
  const algoDropdown = screen.getByLabelText("Algorithm");
  expect(closeSettingsBtn).toBeInTheDocument();
  expect(settingsTxt).toBeInTheDocument();
  expect(algoDropdown).toBeInTheDocument();
  fireEvent.click(screen.getByLabelText("CloseSettingsMenuBtn")); // close settings panel
  
  expect(screen.getByTestId("SettingsIcon")).toBeInTheDocument(); 
  expect(closeSettingsBtn).not.toBeInTheDocument();
  expect(settingsTxt).not.toBeInTheDocument();
  expect(algoDropdown).not.toBeInTheDocument();
});

// test('renders view hotels return button', () => {
//   render(<GeneratedRoute routes={[{},{},{}]}/>);
//   expect(screen.getByLabelText("HotelReturnBtn")).toBeInTheDocument(); 
// });

// test('scroll through generated routes panel', () => {
//   render(<GeneratedRoute routes={[{},{},{}]}/>);
//   // expect(screen.getByTestId("NavigateBeforeIcon")).toBeDisabled();   not too sure on how to check if icon is disabled, toBeDisabled seems to be for buttons

//   // Test scrolling forwards 
//   const maxRoutes = 3;
//   for(let i = 0; i < maxRoutes; i++)
//   {
//     expect(screen.getByText("Generated Route #" + (i+1))).toBeInTheDocument();
//     if(i < (maxRoutes - 1))
//     {
//       fireEvent.click(screen.getByTestId("NavigateNextIcon"));
//     }
//   }

//   // Test scrolling backwards 
//   for(let i = (maxRoutes-1); i >= 0; i--)
//   {
//     expect(screen.getByText("Generated Route #" + (i+1))).toBeInTheDocument();
//     if(i > 0)
//     {
//       fireEvent.click(screen.getByTestId("NavigateBeforeIcon"));
//     }
//   }
// });
