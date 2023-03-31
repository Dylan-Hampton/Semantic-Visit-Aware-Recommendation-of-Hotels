import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import './MapBase.css'; 
import 'mapbox-gl/dist/mapbox-gl.css';
import MapController, { IAddLineData, IMarkerData } from '../mapController/MapController';
import Marker from '../Marker/MapMarker';
import { renderToStaticMarkup } from 'react-dom/server';
import { useAppSelector } from '../../../hooks';
import { selectRoutes } from '../../../routeDataSlice';
import Route from '../../../data/response/RouteResponse';
import MarkerPopup from '../Marker/MarkerPopup';

mapboxgl.accessToken = "pk.eyJ1IjoibmF0ZXNjaGVuY2siLCJhIjoiY2xkZ2hha3IwMHJ6djN3bndlYzlud29vaSJ9.4gjvZipOtY9lWJXc3Ffk6g";
if (process.env.NODE_ENV !== 'test'){
    // @ts-ignore
    // eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
    mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
}


interface IMapBaseProps {
    lat: number;
    lng: number;
}

const MapBase: React.FC<IMapBaseProps> = (props: IMapBaseProps) => {
    const mapContainer = useRef(null);
    const map = useRef<Map>(null);
    let markers: mapboxgl.Marker[] = [];
    const [lineIds, setLineIds] = useState<string[]>([]);
    const routes: Route[] = useAppSelector(selectRoutes);
    let lines: string[] = [];

    const drawHotelRoute = (data: IMarkerData) => {
        console.log(data.name + " Marker Clicked");
        let nodes: number[][] = [];
        routes.forEach(route => {
            if (route.origin.name === data.name) {
                route.nodes.forEach((node) => {
                    nodes.push([node.lng, node.lat]);
                })
                // console.log(nodes)
                const hotelLineData: IAddLineData = {
                    id: route.origin.name,
                    route: nodes,
                }
                lines.push(route.origin.name);
                addLine(hotelLineData);

                route.pois.forEach(poi => {
                    const poiMarkerData: IMarkerData = {
                        lat: poi.lat,
                        lng: poi.lng,
                        name: poi.name,
                        type: "poi",
                    }
                    console.log(poi.name+" Added, lat: " + poi.lat + ", lng: " + poi.lng);
                    addMarker(poiMarkerData);
                })
            }
        })
    }

    const addMarker = (data: IMarkerData) => {
        const el = document.createElement('div');
        const markerEl = renderToStaticMarkup(<Marker type={data.type} name={data.name} />)
        el.innerHTML = markerEl;
        let marker = new mapboxgl.Marker(el).setLngLat([data.lng, data.lat]);
        marker.setPopup(new mapboxgl.Popup({offset: 16, closeOnClick: true, closeButton: false}).setHTML(
            renderToStaticMarkup(<MarkerPopup name={data.name} />)
        ));
        marker.addTo(map.current);
        markers = markers.concat(marker);
        const markerDiv = marker.getElement(); // Add popup toggle on mouse hover
        markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
        markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
        if(data.type === "origin") { 
            markerDiv.addEventListener('click', () => drawHotelRoute(data));
        }
    }

    const addLine = (data: IAddLineData) => {
        if (!map) return;
        const newLineIds = [data.id, ...lineIds];
        setLineIds(newLineIds);
        map.current.addSource('route' + data.id, {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': data.route
                }
            }
        });
        map.current.addLayer({
            'id': 'route' + data.id,
            'type': 'line',
            'source': 'route' + data.id,
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#ffb20d',
                'line-width': 6
            }
        });
    }

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [props.lng, props.lat],
            zoom: 13,
            minZoom: 10,
            pitch: 0,
            maxPitch: 0,
            attributionControl: false
        });
        let mapController: MapController = MapController.getInstance();
        mapController.subscribe(MapController.ADD_MARKER, (data: IMarkerData) => {
            addMarker(data); // Change this to add params as needed, string is passed as an example
        });
        mapController.subscribe(MapController.ADD_LINE, (data: IAddLineData) => {
            addLine(data); // Change this to add params as needed
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (routes !== undefined && routes !== null && routes.length > 0) {
            routes.forEach((route, index) => {
                const originMarkerData: IMarkerData = {
                    lng: route.origin.lng,
                    lat: route.origin.lat,
                    name: route.origin.name,
                    type: 'origin'
                }
                addMarker(originMarkerData);
            });
        }
        return () => { // Called when component unmounts
            markers.forEach((m) => {
                m.remove();
            });
            lines.forEach(line => {
                map.current.removeLayer('route'+line);
                map.current.removeSource('route'+line);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routes]);

    return (
        <div ref={mapContainer} className="map-base">
        </div>
    )
}

export default MapBase;