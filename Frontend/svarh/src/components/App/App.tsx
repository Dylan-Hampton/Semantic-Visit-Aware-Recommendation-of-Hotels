import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import HotelIcon from '@mui/icons-material/Hotel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MapBase from '../map/MapBase/MapBase';


const styles = {
  submitBtn: {
    fontSize: 45,
    backgroundColor: 'coral',
  },
};

function App() {
  return (
    <div className="App">
      <Autocomplete
        disablePortal
        id="cityInput"
        options={inputCities}
        getOptionLabel={(option) => option.name}
        sx={{ width: 250 }}
        renderInput={(params) => 
        <TextField {...params}
        label="City" />}
      />

      <Autocomplete
        multiple
        id="poiInput"
        options={poiTypes}
        getOptionLabel={(option) => option.type}
        sx={{ width: 250 }}
        renderInput={(params) => (
          <TextField{...params} 
            variant="standard" 
            label="Points of Interest"/>
            )
          }
      />

      <Button 
        className='submitButton'
        variant="contained"
        startIcon=<HotelIcon style={{fontSize:45}} /> 
        sx={styles.submitBtn}
        onClick={() => console.log("Clicked Submit")}
        >
          Submit
      </Button>
      <MapBase />
  </div>
  );
}

const poiTypes = [
  { type: 'Museum' },
  { type: 'Statue' },
  { type: 'Mall' },
  { type: 'Park' },
  { type: 'Zoo' },
  { type: 'Aquarium' },
]

const inputCities = [
  { name: 'New York City' },
]

export default App;
