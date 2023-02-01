import { MenuItem, TextField } from "@mui/material";
import React from "react";
import './AlgorithmDropdown.css';

interface IAlgorithmDropdownProps {
    options: string[];
    value: string | undefined;
    selectEvent: (e: any) => void;
}

const AlgorithmDropdown: React.FC<IAlgorithmDropdownProps> = (props: IAlgorithmDropdownProps) => {
    return (
        <>
            <TextField select
            SelectProps={{ MenuProps: { disableScrollLock: true } }}
            variant="outlined"
            className="algorithm-select"
            label={"Algorithm"}
            value={props.value ?? ''}
            onChange={props.selectEvent}>
                {props.options.map(o => {
                    return <MenuItem key={o} value={o}>{o}</MenuItem>
                })}
            </TextField>
        </>
    )
}

export default AlgorithmDropdown;