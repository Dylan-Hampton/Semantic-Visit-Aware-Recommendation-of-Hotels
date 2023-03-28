import React, { useState } from 'react';
import { useAppSelector } from '../../../../hooks';
import { selectAlgorithm, selectOrigins } from '../../submissionFrame/submitSlice';
import SettingsButton from '../SettingsButton/SettingsButton';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import './Settings.css';

interface ISettingsProps {

}

// export interface ISettingsValues {
//     algorithm: string;
//     maxOrigins: number;
// }

const Settings: React.FC<ISettingsProps> = (props: ISettingsProps) => {
    const maxOrigins = useAppSelector(selectOrigins);
    const algorithm = useAppSelector(selectAlgorithm);

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <>
            <div className={`settings ${showMenu ? 'on-top' : ''}`}>
                {showMenu && <SettingsMenu origins={maxOrigins} algorithm={algorithm.algorithmName}/>}
                <SettingsButton onClick={toggleMenu}/>
            </div>
        </>
    )
}

export default Settings;