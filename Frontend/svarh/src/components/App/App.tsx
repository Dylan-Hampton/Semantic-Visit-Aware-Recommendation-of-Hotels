import React from 'react';
import './App.css';
import MapBase from '../map/MapBase/MapBase';
import Settings from '../inputBar/advancedSettings/Settings/Settings';

function App() {
  return (
    <div className="App">
      <Settings />
      <MapBase />
  </div>
  );
}

export default App;
