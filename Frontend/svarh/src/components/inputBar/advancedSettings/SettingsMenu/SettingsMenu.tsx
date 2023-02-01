import { Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AlgorithmDropdown from "../AlgorithmDropdown/AlgorithmDropdown";
import { ISettingsValues } from "../Settings/Settings";
import './SettingsMenu.css';

interface ISettingsMenuProps {
    saveAlgorithm: (s: string) => void;
    savedValues: ISettingsValues;
}

const SettingsMenu: React.FC<ISettingsMenuProps> = (props: ISettingsMenuProps) => {
    const [algorithm, setAlgorithm] = useState(props.savedValues.algorithm);

    useEffect(() => {

    }, []);

    //TODO: Get possible algorithms and pass them in through the props
    const algorithms = ['Node-first', 'Edge-first', 'Dijkstra', 'Random Walk'];

    const handleAlgorithmChange = (e: any) => {
        setAlgorithm(e.target.value);
        props.saveAlgorithm(e.target.value);
    }

    return (
        <>
            <div className="settings-frame">
                <div className="settings-title"><span>Advanced Settings</span></div>
                <Divider />
                <div className="settings-option">
                    <AlgorithmDropdown options={algorithms} value={algorithm} selectEvent={handleAlgorithmChange}/>
                </div>
            </div>
        </>
    )
}

export default SettingsMenu;