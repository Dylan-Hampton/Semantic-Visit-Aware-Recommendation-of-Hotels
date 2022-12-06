import React from 'react';
import './App.css';

import Header from './components/header/header';
import Form from './components/form/form';
import Map from './components/map/map';


function App() {
  return (
    <div style={{ flex: 1 }}>
      <Header />
      <div className='grid'>
        <Form />
        <Map />
      </div>
    </div>
  );
}

export default App;
