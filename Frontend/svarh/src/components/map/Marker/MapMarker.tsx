import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import './MapMarker.css';

interface IMapMarkerProps {
    type: "origin" | "poi";
    name: string;
}

const MapMarker: React.FC<IMapMarkerProps> = (props: IMapMarkerProps) => {
    const originSizeStyle = {
        fontSize: '28px'
    }
    const poiSizeStyle = {
        fontSize: '20px'
    }
    return (
        <>
            <div className={props.type === "origin" ? 'origin-icon' : 'poi-icon'}>
                <CircleIcon style={props.type === "origin" ? originSizeStyle : poiSizeStyle}/>
            </div>
        </>
    )
}

export default MapMarker;