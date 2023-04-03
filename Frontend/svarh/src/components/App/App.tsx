import React from 'react';
import './App.css';
import MapBase from '../map/MapBase/MapBase';
import Settings from '../inputBar/advancedSettings/Settings/Settings';
import SubmissionFrame from '../inputBar/submissionFrame/SubmissionFrame';
import Results from '../results/Results';

function App() {
  return (
    <div className="App">
      <MapBase lng={-73.995} lat={40.723}/>
      <SubmissionFrame />
      <Results />
      <Settings />
  </div>
  );
}

export default App;
