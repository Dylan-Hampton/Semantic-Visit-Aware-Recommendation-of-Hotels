import { Autocomplete, Skeleton, TextField } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../../hooks";
import { changeCity } from "../../submissionFrame/submitSlice";

interface ICityDropdownProps {
  cities: string[];
  setCity: (c: string) => void;
}

const CityDropdown: React.FC<ICityDropdownProps> = (props: ICityDropdownProps) => {
    const dispatch = useAppDispatch();
    
    const setCity = (e: any) => {
      props.setCity(e.target.innerText);
      dispatch(changeCity(e.target.innerText))
    }

    return (
      <>
      {props.cities ? 
        <Autocomplete
          disablePortal
          id="cityInput"
          options={props.cities}
          getOptionLabel={(option) => option}
          sx={{ 
            width: '100%',
            'marginBottom': '4px',
          }}
          renderInput={(params) => 
            <TextField {...params}
            label="City" />}
          onChange={setCity}
          />
        :
        <Skeleton sx={{ 
          width: '100%',
          'marginBottom': '4px',
        }}/>
      }  
      </>
    )
}

export default CityDropdown;