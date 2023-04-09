import { Autocomplete, Skeleton, TextField } from "@mui/material";
import React from "react";
import { City } from "../../../../data/City";
import { useAppDispatch } from "../../../../hooks";
import { changeDistanceMetric } from "../../../../routeDataSlice";

interface IMetricDropdownProps {
  metrics: string[];
}

const CityDropdown: React.FC<IMetricDropdownProps> = (props: IMetricDropdownProps) => {
    const dispatch = useAppDispatch();
    
    const setMetric = (e: any) => {
      dispatch(changeDistanceMetric(props.metrics.find(i => i === e.target.innerText)))
    }

    return (
      <>
      {props.metrics ? 
        <Autocomplete
          disablePortal
          id="metricInput"
          options={props.metrics}
          getOptionLabel={(option) => option}
          sx={{ 
            width: '30%',
            'marginBottom': '4px',
          }}
          renderInput={(params) => 
            <TextField {...params}
            label="Metric" />}
          onChange={setMetric}
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