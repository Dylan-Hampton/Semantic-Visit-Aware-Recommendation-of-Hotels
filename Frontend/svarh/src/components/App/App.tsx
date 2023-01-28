import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import HotelIcon from '@mui/icons-material/Hotel';


const styles = {
  submitBtn: {
    fontSize: 45,
  },
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button 
          className='submitButton'
          variant="contained"
          startIcon=<HotelIcon style={{fontSize:45}} /> 
          sx={styles.submitBtn}
          onClick={() => console.log("Clicked Submit")}
          >
            Submit
          </Button>
      </header>
    </div>
  );
}

export default App;
