import React from 'react';
import './App.css';
import MapBase from '../map/MapBase/MapBase';
import CityDropdown from '../inputBar/inputFields/CityDropdown/CityDropdown';
import PoiDropdown from '../inputBar/inputFields/PoIDropdown/PoiDropdown';
import SubmitButton from '../inputBar/inputFields/SubmitButton/SubmitButton';

function App() {
  return (
    <div className="App">
      <MapBase />
  </div>
  );
}

export default App;
