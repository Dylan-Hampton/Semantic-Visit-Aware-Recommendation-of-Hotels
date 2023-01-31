import { InputLabel, MenuItem, Select } from "@mui/material";
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
            <InputLabel id="algorithm-select">Algorithm</InputLabel>
            <Select 
            labelId="algorithm-select"
            className="algorithm-select"
            label="Algorithm"
            defaultValue={props.value}
            onChange={props.selectEvent}>
                {props.options.map(o => {
                    return <MenuItem value={o}>{o}</MenuItem>
                })}
            </Select>
        </>
    )
}

export default AlgorithmDropdown;