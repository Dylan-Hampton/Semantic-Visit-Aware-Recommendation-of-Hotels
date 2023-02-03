import { Autocomplete, TextField } from "@mui/material";
import React from "react";

interface ICityDropdownProps {

}

const CityDropdown: React.FC<ICityDropdownProps> = (props: ICityDropdownProps) => {
    
    //TODO: Get possible cities from backend and pass in through the props
    const inputCities = [
        { name: 'New York City' },
    ]

    return (
        
      <Autocomplete
      disablePortal
      id="cityInput"
      options={inputCities}
      getOptionLabel={(option) => option.name}
      sx={{ 
        width: 250,
        'marginBottom': '4px',
      }}
      renderInput={(params) => 
      <TextField {...params}
      label="City" />}
    />
    )
}

export default CityDropdown;