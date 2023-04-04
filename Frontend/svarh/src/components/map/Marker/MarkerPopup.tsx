import React from 'react';
import './MarkerPopup.css';
import { Divider } from '@mui/material';

interface IMarkerPopupProps {
    name?: string;
    names?: string[];
}

const MarkerPopup: React.FC<IMarkerPopupProps> = (props: IMarkerPopupProps) => {
    return (
        <div className="marker-popup">
            {props.name !== undefined ?
                <span className="marker-name">{props.name}</span>
            :
                props.names.map((n,i) => {
                    return (
                    <div key={i}>
                        <span className="marker-name">{n}</span>
                        {i !== props.names.length - 1 && <Divider />}
                    </div>
                    );
                })
            }
        </div>
    )
}

export default MarkerPopup;
