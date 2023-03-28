import { Divider } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { changeAlgorithm, changeOrigins, selectAlgorithmChoices } from "../../submissionFrame/submitSlice";
import AlgorithmDropdown from "../AlgorithmDropdown/AlgorithmDropdown";
import MaxOrigins from "../MaxOriginsField/MaxOrigins";
import './SettingsMenu.css';

interface ISettingsMenuProps {
    origins: number,
    algorithm: string,
}

const SettingsMenu: React.FC<ISettingsMenuProps> = (props: ISettingsMenuProps) => {
    const dispatch = useAppDispatch();
    const algorithms = useAppSelector(selectAlgorithmChoices)

    const handleAlgorithmChange = (e: any) => {
        dispatch(changeAlgorithm(e.target.value))
    }

    const handleMaxOriginsChange = (e: any) => {
        if (!Number.isNaN(+e.target.value)) {
            dispatch(changeOrigins(+e.target.value))
            // setMaxOrigins(+e.target.value)
        }
        // props.savedValues.maxOrigins = +e.target.value;
        // props.saveValues(props.savedValues);
    }

    return (
        <>
            <div className="settings-frame">
                <div className="settings-title"><span>Advanced Settings</span></div>
                <Divider />
                <div className="settings-option">
                    <AlgorithmDropdown options={algorithms} value={props.algorithm} selectEvent={handleAlgorithmChange}/>
                </div>
                <div className="settings-option">  
                    <MaxOrigins value={props.origins} onChange={handleMaxOriginsChange}/>
                </div>
            </div>
        </>
    )
}

export default SettingsMenu;