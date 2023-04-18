import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from '../../../../hooks';
import { changeDistance } from '../../../../routeDataSlice';
import './MaximumDistance.css';

interface IMaximumDistanceProps {

}

const MaximumDistance: React.FC<IMaximumDistanceProps> = (props: IMaximumDistanceProps) => {
    const [maxDist, changeMaxDist] = useState(null);
    const dispatch = useAppDispatch();

    const handleMaximumDistanceChange = (e: any) => {
        let valAsNum: number = parseInt(e.target.value);
        if ((Number.isNaN(valAsNum) && maxDist != null) || (!Number.isNaN(valAsNum) && valAsNum >= 0)) {
            changeMaxDist(e.target.value === '' ? null : e.target.value);
            dispatch(changeDistance(Number(valAsNum)));
        }
    }

    return (
        <div className="maxDist">
            <TextField 
                inputProps={{ inputMode: 'text', pattern: '[0-9]*' }} 
                //InputProps={{endAdornment: <InputAdornment position="end">mi</InputAdornment>}}
                className="maxDistInput" 
                id="outlined-basic" 
                label="Maximum Distance" 
                value={maxDist ?? ''}
                onChange={handleMaximumDistanceChange} 
                variant="outlined" />
        </div>
    );
}

export default MaximumDistance;