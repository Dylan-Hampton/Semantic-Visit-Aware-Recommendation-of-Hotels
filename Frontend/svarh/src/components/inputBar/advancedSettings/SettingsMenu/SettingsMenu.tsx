import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import AlgorithmDropdown from "../AlgorithmDropdown/AlgorithmDropdown";
import MaxOrigins from "../MaxOriginsField/MaxOrigins";
import { ISettingsValues } from "../Settings/Settings";
import './SettingsMenu.css';

interface ISettingsMenuProps {
    saveValues: (v: ISettingsValues) => void;
    savedValues: ISettingsValues;
}

const SettingsMenu: React.FC<ISettingsMenuProps> = (props: ISettingsMenuProps) => {
    const [algorithm, setAlgorithm] = useState(props.savedValues.algorithm);
    const [maxOrigins, setMaxOrigins] = useState(props.savedValues.maxOrigins);

    useEffect(() => {

    }, []);

    //TODO: Get possible algorithms and pass them in through the props
    const algorithms = ['Node-first', 'Edge-first', 'Dijkstra', 'Random Walk'];

    const handleAlgorithmChange = (e: any) => {
        setAlgorithm(e.target.value);
        props.savedValues.algorithm = e.target.value;
        props.saveValues(props.savedValues);
    }

    const handleMaxOriginsChange = (e: any) => {
        if (!Number.isNaN(+e.target.value)) {
            setMaxOrigins(+e.target.value);
        }
        props.savedValues.maxOrigins = +e.target.value;
        props.saveValues(props.savedValues);
    }

    return (
        <>
            <div className="settings-frame">
                <div className="settings-title"><span>Advanced Settings</span></div>
                <Divider />
                <div className="settings-option">
                    <AlgorithmDropdown options={algorithms} value={algorithm} selectEvent={handleAlgorithmChange}/>
                </div>
                <div className="settings-option">  
                    <MaxOrigins value={maxOrigins} onChange={handleMaxOriginsChange}/>
                </div>
            </div>
        </>
    )
}

export default SettingsMenu;