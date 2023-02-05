import React from 'react';
import './App.css';
import MapBase from '../map/MapBase/MapBase';
import Settings from '../inputBar/advancedSettings/Settings/Settings';
import SubmissionFrame from '../inputBar/submissionFrame/SubmissionFrame';
import RecommendedHotels from '../inputBar/recommendedHotels/RecommendedHotels';
import GeneratedRoute from '../results/generatedRoute/GeneratedRoute/GeneratedRoute';

function App() {
  return (
    <div className="App">
      <SubmissionFrame />
      {//<RecommendedHotels />
      }
      <GeneratedRoute routes={[{},{},{}]}/>
      <Settings />
      <MapBase />
  </div>
  );
}

export default App;
