import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import './MapMarker.css';

interface IMapMarkerProps {
    type: "origin" | "poi";
    name: string;
}

const MapMarker: React.FC<IMapMarkerProps> = (props: IMapMarkerProps) => {
    return (
        <>
            <div className="icon">
                <CircleIcon />
            </div>
        </>
    )
}

export default MapMarker;