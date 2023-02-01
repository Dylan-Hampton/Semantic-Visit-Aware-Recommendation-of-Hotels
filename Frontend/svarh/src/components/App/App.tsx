import React from 'react';
import './App.css';
import MapBase from '../map/MapBase/MapBase';
import Settings from '../inputBar/advancedSettings/Settings/Settings';
import GeneratedRoute from '../results/generatedRoute/GeneratedRoute/GeneratedRoute';

function App() {
  return (
    <div className="App">
      <Settings />
      <GeneratedRoute routes={[{},{},{}]}/>
      <MapBase />
  </div>
  );
}

export default App;
