import React from 'react';
import './App.css';
import MapBase from '../map/MapBase/MapBase';
import Settings from '../inputBar/advancedSettings/Settings/Settings';
import SubmissionFrame from '../inputBar/submissionFrame/SubmissionFrame';
import RecommendedHotels from '../results/recommendedHotels/RecommendedHotels';
//import GeneratedRoute from '../results/generatedRoute/GeneratedRoute/GeneratedRoute';
//import MapController, { IAddMarkerData } from '../map/mapController/MapController';

function App() {
  return (
    <div className="App">
      <MapBase />
      <SubmissionFrame />
      {<RecommendedHotels hotels={[{name: "Hotel Test 1", routeLength: 1232}, {name: "Hotel Number 2", routeLength: 11432}, {name: "Hotel With a Super Long Name Jeez", routeLength: 10452}, {name: 'test', routeLength: 10}, {name: 'test', routeLength: 10}, {name: 'test', routeLength: 10}, {name: 'test', routeLength: 10}, {name: 'test', routeLength: 10}]}/>
      }
      {//<GeneratedRoute routes={[{},{},{}]}/>
}
      <Settings />
      {/*
       <div className="PubSubTest" style={{backgroundColor: 'green', width: '100px', height: '100px'}} onClick={() => {
        let mapController: MapController = MapController.getInstance();
        let data: IAddMarkerData = {
          test: 'This is a test of pub-sub from the app to the map'
        }
        mapController.publish(MapController.ADD_MARKER, data);
      }}>
        <span>PubSub Test</span>
      </div>
       */}
  </div>
  );
}

export default App;
