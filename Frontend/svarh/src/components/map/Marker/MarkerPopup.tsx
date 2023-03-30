import React from 'react';
import './MarkerPopup.css';

interface IMarkerPopupProps {
    name: string;
}

const MarkerPopup: React.FC<IMarkerPopupProps> = (props: IMarkerPopupProps) => {
    return (
        <div className="marker-popup">
            <span className="marker-name">{props.name}</span>
        </div>
    )
}

export default MarkerPopup;
