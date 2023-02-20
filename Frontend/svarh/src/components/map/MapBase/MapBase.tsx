import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapBase.css'; 
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = "pk.eyJ1IjoibmF0ZXNjaGVuY2siLCJhIjoiY2xkZ2hha3IwMHJ6djN3bndlYzlud29vaSJ9.4gjvZipOtY9lWJXc3Ffk6g";
if (process.env.NODE_ENV !== 'test'){
    // @ts-ignore
    // eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
    mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
}


interface IMapBaseProps {

}

const MapBase: React.FC<IMapBaseProps> = (props: IMapBaseProps) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-74.006);
    const [lat, setLat] = useState(40.723);
    const [zoom, setZoom] = useState(13);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom,
            minZoom: 10,
            pitch: 0,
            maxPitch: 0,
            attributionControl: false
        });
    });

    useEffect(() => {
        if (!map.current) return;
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lng.toFixed(4));
            setZoom(map.current.getCenter().lng.toFixed(4));
        });
    })

    return (
        <>
        <div ref={mapContainer} className="map-base">
        </div>
        </>
    )
}

export default MapBase;