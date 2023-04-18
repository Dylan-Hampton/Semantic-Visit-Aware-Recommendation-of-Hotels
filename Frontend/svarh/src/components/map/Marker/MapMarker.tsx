import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import './MapMarker.css';

interface IMapMarkerProps {
    type: "origin" | "poi";
    name: string;
}

const MapMarker: React.FC<IMapMarkerProps> = (props: IMapMarkerProps) => {
    const originSizeStyle = {
        fontSize: '32px'
    }
    const poiSizeStyle = {
        fontSize: '20px'
    }
    return (
        <>
            <div className={props.type === "origin" ? 'origin-icon' : 'poi-icon'}>
                {props.type === "origin" ?
                    <FmdGoodIcon style={originSizeStyle}/>
                :
                    <CircleIcon style={poiSizeStyle}/>
                }
                
            </div>
        </>
    )
}

export default MapMarker;