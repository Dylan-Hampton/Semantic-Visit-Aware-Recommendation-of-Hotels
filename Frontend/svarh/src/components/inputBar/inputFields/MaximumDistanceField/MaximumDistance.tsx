import { TextField } from "@mui/material";
import React, { useState } from "react";
import './MaximumDistance.css';

interface IMaximumDistanceProps {

}

const MaximumDistance: React.FC<IMaximumDistanceProps> = (props: IMaximumDistanceProps) => {
    const [maxDist, changeMaxDist] = useState(false)

    const handleMaximumDistanceChange = (e: any) => {
        changeMaxDist(e.target.value)
        console.log(maxDist)
    }

    return (
        <div className="maxDist">
            <TextField id="outlined-basic" label="Maximum Distance" onChange={() => handleMaximumDistanceChange} variant="outlined" />
        </div>
    );
}

export default MaximumDistance;