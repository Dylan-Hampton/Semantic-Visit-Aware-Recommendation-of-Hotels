import { Autocomplete, TextField } from "@mui/material";
import React from "react";

interface IPoiDropdownProps {

}

const PoiDropdown: React.FC<IPoiDropdownProps> = (props: IPoiDropdownProps) => {

    //TODO: Get PoI types from database on page load, pass them in through props
    
    const poiTypes = [
        { type: 'Museum' },
        { type: 'Statue' },
        { type: 'Mall' },
        { type: 'Park' },
        { type: 'Zoo' },
        { type: 'Aquarium' },
    ]

    return (
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
    )
}

export default PoiDropdown;