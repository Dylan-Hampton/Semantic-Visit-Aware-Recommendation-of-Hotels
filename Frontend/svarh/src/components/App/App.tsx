import React from 'react';
import './App.css';
import MapBase from '../map/MapBase/MapBase';
import Settings from '../inputBar/advancedSettings/Settings/Settings';
import SubmissionFrame from '../inputBar/submissionFrame/SubmissionFrame';
import RecommendedHotels from '../inputBar/recommendedHotels/RecommendedHotels';

function App() {
  return (
    <div className="App">
      <SubmissionFrame />
      <RecommendedHotels />
      <Settings />
      <MapBase />
  </div>
  );
}

export default App;
