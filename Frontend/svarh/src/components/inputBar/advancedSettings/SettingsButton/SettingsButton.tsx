import React, { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import './SettingsButton.css';

interface ISettingsButtonProps {
    onClick: (e: any) => void;
}

const SettingsButton: React.FC<ISettingsButtonProps> = (props: ISettingsButtonProps) => {
    const [showClose, setShowClose] = useState(false);

    const onClick = (e: any) => {
        props.onClick(e);
        setShowClose(!showClose);
    }

    return (
        <div className="settings-button" onClick={onClick}>
            {showClose ? 
                <CloseIcon sx={{ fontSize: 35, margin: '4px 4px 0 4px' }}/> 
                : <SettingsIcon sx={{ fontSize: 35, margin: '4px 4px 0 4px' }}/>
            }
        </div>
    )
}

export default SettingsButton;