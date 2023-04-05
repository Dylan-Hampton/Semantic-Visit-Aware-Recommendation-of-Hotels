import React, { useEffect, useRef } from 'react';
import mapboxgl, { Map as ReactMap } from 'mapbox-gl';
import './MapBase.css'; 
import 'mapbox-gl/dist/mapbox-gl.css';
import Marker from '../Marker/MapMarker';
import { renderToStaticMarkup } from 'react-dom/server';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectRoutes } from '../../../routeDataSlice';
import Route from '../../../data/response/RouteResponse';
import MarkerPopup from '../Marker/MarkerPopup';
import { PoiNode } from '../../../data/response/Node';
import { changeMarkers, addMarkerWithName, changeToggleRoute } from '../../../mapDataSlice';

mapboxgl.accessToken = "pk.eyJ1IjoibmF0ZXNjaGVuY2siLCJhIjoiY2xkZ2hha3IwMHJ6djN3bndlYzlud29vaSJ9.4gjvZipOtY9lWJXc3Ffk6g";
if (process.env.NODE_ENV !== 'test'){
    // @ts-ignore
    // eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
    mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
}

export interface IMarkerData {
    name?: string;
    names?: string[];
    lat: number;
    lng: number;
    type: 'origin' | 'poi';
}

interface IAddLineData {
    id: string;
    route: number[][];
}

interface IMapBaseProps {
    lat: number;
    lng: number;
}

const MapBase: React.FC<IMapBaseProps> = (props: IMapBaseProps) => {
    const mapContainer = useRef(null);
    const map = useRef<ReactMap>(null);
    let markers: mapboxgl.Marker[] = [];
    let markerQuantity = new Map<mapboxgl.Marker, number>();
    let markerNames = new Map<mapboxgl.Marker, string[]>();
    const routes: Route[] = useAppSelector(selectRoutes);
    let lines: string[] = [];
    const mapDispatch = useAppDispatch();

    const countMarker = (marker: mapboxgl.Marker) => {
        if (markerQuantity.has(marker)) {
            markerQuantity.set(marker, markerQuantity.get(marker) + 1);
        }
        else {
            markerQuantity.set(marker, 1);
        }
    }

    const uncountMarker = (marker: mapboxgl.Marker) => {
        if (markerQuantity.has(marker)) {
            let currentCount: number = markerQuantity.get(marker);
            if (currentCount > 1) {
                markerQuantity.set(marker, currentCount - 1);
            }
            else {
                markerQuantity.delete(marker);
            }
        }
    }

    const drawHotelRoute = (data: IMarkerData) => {
        //console.log(data.name + " Marker Clicked");
        let nodes: number[][] = [];

        routes.forEach(route => {
            if (route.origin.name === data.name) {
                if (!map.current.getSource('route'+route.origin.name)) {
                    console.log("Displaying " + route.origin.name + " route");
                    route.nodes.forEach((node) => {
                        nodes.push([node.lng, node.lat]);
                    })
                    // console.log(nodes);
                    const hotelLineData: IAddLineData = {
                        id: route.origin.name,
                        route: nodes,
                    }
                    lines.push(route.origin.name);
                    addLine(hotelLineData);

                    let noOverlapNames: Map<number[], string[]> = new Map<number[], string[]>();
                    route.pois.forEach(refPoi => {
                        const lngLatObj = [refPoi.lng, refPoi.lat];
                        let keysMatch = false;
                        for (const key of noOverlapNames.keys()) {
                            keysMatch = true;
                            if (key.length !== lngLatObj.length) {
                                keysMatch = false;
                            } else {
                                for (let i = 0; i < key.length; i++) {
                                    if (key[i] !== lngLatObj[i]) {
                                        keysMatch = false;
                                        break;
                                    }
                                }
                            }
                          
                            if (keysMatch) {
                                noOverlapNames.set(key, [refPoi.name, ...noOverlapNames.get(key)]);
                                break;
                            }
                        }
                        if (!keysMatch) {
                            noOverlapNames.set(lngLatObj, [refPoi.name]);
                        }
                    });

                    noOverlapNames.forEach((names, lngLatObj) => {
                        const poiMarkerData: IMarkerData = {
                            lat: lngLatObj[1],
                            lng: lngLatObj[0],
                            names: names,
                            type: "poi",
                        }
                        console.log(names +" Added, lat: " + lngLatObj[1] + ", lng: " + lngLatObj[0]);
                        addMarker(poiMarkerData);
                    });

                    let minRouteLng = route.origin.lng, minRouteLat = route.origin.lat, 
                        maxRouteLng = route.origin.lng, maxRouteLat = route.origin.lat;
                    route.pois.forEach(poi => {
                        const lng = poi.lng, lat = poi.lat;
                        if (lng > maxRouteLng) { maxRouteLng = lng; }
                        if (lat > maxRouteLat) { maxRouteLat = lat; }
                        if (lng < minRouteLng) { minRouteLng = lng; }
                        if (lat < minRouteLat) { minRouteLat = lat; }
                    })
                    map.current.fitBounds([[minRouteLng, minRouteLat], [maxRouteLng, maxRouteLat]], {
                        padding: {top: 250, bottom: 250, left: 500, right: 500}
                    });
                }
                else {
                    //console.log("Hiding " + route.origin.name + " route");
                    hideHotelRoute(data);
                }
            }
        })
    }

    const hideHotelRoute = (data: IMarkerData) => {
        map.current.removeLayer('route'+data.name);
        map.current.removeSource('route'+data.name);
        lines = lines.filter(l => l !== data.name);
        let pois: PoiNode[] = [];
        routes.forEach(route => {
            if (route.origin.name === data.name) {
                route.pois.forEach(poi => {
                    if (!pois.some(p => p.lat === poi.lat && p.lng === poi.lng)) {
                        pois.push(poi);
                    }
                })
            }
        })
        markers.forEach(m => {
            pois.forEach(poi => {
                let lat = m.getLngLat().lat;
                let lng = m.getLngLat().lng;
                if (poi.lat === lat && poi.lng === lng) {
                    uncountMarker(m);
                    const currentCount = markerQuantity.get(m);
                    if (currentCount === undefined || currentCount < 1) {
                        m.remove();
                        markerNames.delete(m);
                        markers = markers.filter(mk => mk !== m);
                    }
                }
            })
        })
    }

    const addMarker = (data: IMarkerData) => {
        if (data.type === 'poi') {
            markerNames.forEach((names, m) => {
                if (m.getLngLat().lat === data.lat && m.getLngLat().lng === data.lng) {
                    data.names = [...names, ...data.names.filter(n => !names.includes(n))];
                    m.setPopup(new mapboxgl.Popup({offset: 16, closeOnClick: true, closeButton: false}).setHTML(
                        renderToStaticMarkup(<MarkerPopup name={data.name} names={data.names}/>)
                    ));
                }
            });
            markerQuantity.forEach((n, m) => {
                if (m.getLngLat().lat === data.lat && m.getLngLat().lng === data.lng) {
                    countMarker(m);
                    return;
                }
            });
        }
        const el = document.createElement('div');
        const markerEl = renderToStaticMarkup(<Marker type={data.type} name={data.name} />)
        el.innerHTML = markerEl;
        let marker = new mapboxgl.Marker(el).setLngLat([data.lng, data.lat]);
        marker.setPopup(new mapboxgl.Popup({offset: 16, closeOnClick: true, closeButton: false}).setHTML(
            renderToStaticMarkup(<MarkerPopup name={data.name} names={data.names}/>)
        ));
        marker.addTo(map.current);
        countMarker(marker);
        if (data.type === 'poi') {
            markerNames.set(marker, data.names !== undefined ? data.names : [data.name]);
        }
        markers = markers.concat(marker);
        mapDispatch(addMarkerWithName({marker: marker, name: data.name}));
        const markerDiv = marker.getElement(); // Add popup toggle on mouse hover
        markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
        markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
        if(data.type === "origin") { 
            markerDiv.addEventListener('click', () => drawHotelRoute(data));
        }
    }

    const addLine = (data: IAddLineData) => {
        if (!map) return;
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

            let minRouteLng = routes[0].origin.lng, minRouteLat = routes[0].origin.lat, 
            maxRouteLng = routes[0].origin.lng, maxRouteLat = routes[0].origin.lat;

            routes.forEach(route => {
                const lng = route.origin.lng, lat = route.origin.lat;
                if (lng > maxRouteLng) { maxRouteLng = lng; }
                if (lat > maxRouteLat) { maxRouteLat = lat; }
                if (lng < minRouteLng) { minRouteLng = lng; }
                if (lat < minRouteLat) { minRouteLat = lat; }
            })
            map.current.fitBounds([[minRouteLng, minRouteLat], [maxRouteLng, maxRouteLat]], {
                padding: {top: 50, bottom: 50, left: 300, right: 300}
            });
        }
        else { 
            map.current.setZoom(13); // set map back to original zoom / location
            map.current.panTo([-73.995,40.723]); 
        }
        mapDispatch(changeToggleRoute(drawHotelRoute));

        return () => { // Called when component unmounts
            markers.forEach((m) => {
                m.remove();
            });
            mapDispatch(changeMarkers([]));
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