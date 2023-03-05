import React, { useState } from 'react';
import SettingsButton from '../SettingsButton/SettingsButton';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import './Settings.css';

interface ISettingsProps {

}

export interface ISettingsValues {
    algorithm: string;
    maxOrigins: number;
}

const Settings: React.FC<ISettingsProps> = (props: ISettingsProps) => {
    const [showMenu, setShowMenu] = useState(false);

    let defaultValues: ISettingsValues = {
        algorithm: 'Node-first',
        maxOrigins: 10
    }

    const [values, setValues] = useState(defaultValues);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const saveValues = (v: ISettingsValues) => {
        setValues(v);
    }

    return (
        <>
            <div className={`settings ${showMenu ? 'on-top' : ''}`}>
                {showMenu && <SettingsMenu savedValues={values} saveValues={saveValues} />}
                <SettingsButton onClick={toggleMenu}/>
            </div>
        </>
    )
}

export default Settings;