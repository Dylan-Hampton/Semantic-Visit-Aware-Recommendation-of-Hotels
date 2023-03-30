import React from 'react';
import './App.css';
import MapBase from '../map/MapBase/MapBase';
import Settings from '../inputBar/advancedSettings/Settings/Settings';
import SubmissionFrame from '../inputBar/submissionFrame/SubmissionFrame';
import RecommendedHotels from '../results/recommendedHotels/RecommendedHotels';
//import MapController, { IAddLineData, IMarkerData } from '../map/mapController/MapController';
//import GeneratedRoute from '../results/generatedRoute/GeneratedRoute/GeneratedRoute';
//import MapController, { IAddMarkerData } from '../map/mapController/MapController';

function App() {
  return (
    <div className="App">
      <MapBase lng={-74.006} lat={40.723}/>
      <SubmissionFrame />
      {<RecommendedHotels hotels={[{name: "Hotel Test 1", routeLength: 1232}, {name: "Hotel Number 2", routeLength: 11432}, {name: "Hotel With a Super Long Name Jeez", routeLength: 10452}, {name: 'test', routeLength: 10}, {name: 'test', routeLength: 10}, {name: 'test', routeLength: 10}, {name: 'test', routeLength: 10}, {name: 'test', routeLength: 10}]}/>
      }
      {//<GeneratedRoute routes={[{},{},{}]}/>
}
      <Settings />
      
       {/* <div className="PubSubTest" style={{backgroundColor: 'green', width: '100px', height: '100px'}} onClick={() => {
        let mapController: MapController = MapController.getInstance();
        // let data: IMarkerData = {
        //   lat: 40.723,
        //   lng: -74.006,
        //   name: 'Test',
        //   type: 'origin'
        // }
        let lineData: IAddLineData = {
          id: '6',
          route: [[-74.006, 40.723],[-74.106, 40.723],[-74.106, 41.000]]
        }
        mapController.publish(MapController.ADD_LINE, lineData);
      }}>
        <span>PubSub Test</span>
      </div> */}
  </div>
  );
}

export default App;
