import { Button } from "@mui/material";
import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import './SettingsButton.css';

interface ISettingsButtonProps {
    onClick: (e: any) => void;
}

const SettingsButton: React.FC<ISettingsButtonProps> = (props: ISettingsButtonProps) => {
    return (
        <div className="settings-button" onClick={props.onClick}>
            <SettingsIcon sx={{ fontSize: 35, margin: '4px 4px 0 4px' }}/>
        </div>
    )
}

export default SettingsButton;