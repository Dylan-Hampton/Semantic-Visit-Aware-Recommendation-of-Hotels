import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';

interface IMapMarkerProps {
    type: "origin" | "poi";
    name: string;
}

const MapMarker: React.FC<IMapMarkerProps> = (props: IMapMarkerProps) => {
    const originStyles = {
        color: 'red',
        fontSize: '24px'
    }
    const poiStyles = {
        color: '#03911b',
        fontSize: '20px'
    }
    return (
        <>
            <CircleIcon style={props.type === "origin" ? originStyles : poiStyles} />
        </>
    )
}

export default MapMarker;