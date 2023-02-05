import React, { useState } from 'react';
import SettingsButton from '../SettingsButton/SettingsButton';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import './Settings.css';

interface ISettingsProps {

}

export interface ISettingsValues {
    algorithm: string;
}

const Settings: React.FC<ISettingsProps> = (props: ISettingsProps) => {
    const [showMenu, setShowMenu] = useState(false);

    const [algorithm, setAlgorithm] = useState(null);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const saveAlgorithm = (s: string) => {
        setAlgorithm(s);
    }

    return (
        <>
            <div className={`settings ${showMenu ? 'on-top' : ''}`}>
                {showMenu && <SettingsMenu savedValues={{algorithm: algorithm}} saveAlgorithm={saveAlgorithm}/>}
                <SettingsButton onClick={toggleMenu}/>
            </div>
        </>
    )
}

export default Settings;