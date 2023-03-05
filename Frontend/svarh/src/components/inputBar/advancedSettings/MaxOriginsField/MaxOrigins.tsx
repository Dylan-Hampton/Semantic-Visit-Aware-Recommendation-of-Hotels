import { TextField } from "@mui/material";
import React from "react";
import './MaxOrigins.css';

interface IMaxOriginsProps {
    value: number | undefined;
    onChange: (e: any) => void;
}

const MaxOrigins: React.FC<IMaxOriginsProps> = (props: IMaxOriginsProps) => {
    return (
        <>
            <TextField 
            variant="outlined"
            className="max-origins"
            label={"Max # of Origins"}
            value={props.value ?? ''}
            onChange={props.onChange} />
        </>
    )
}

export default MaxOrigins;