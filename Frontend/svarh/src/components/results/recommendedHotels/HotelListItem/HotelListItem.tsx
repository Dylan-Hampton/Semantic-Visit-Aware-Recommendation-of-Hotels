import { Grid } from '@mui/material';
import React from 'react';
import HotelIcon from '@mui/icons-material/Hotel';
import './HotelListItem.css';
import { useAppSelector } from '../../../../hooks';
import { IMarkerWithName, selectMarkers, selectOpenRoutesNames, selectToggleRoute } from '../../../../mapDataSlice';
import { IMarkerData } from '../../../map/MapBase/MapBase';
import RouteItem, { IRouteData } from '../Route/RouteItem';
import { PoiNode } from '../../../../data/response/Node';

interface IHotelListItemProps {
    name: string;
    distance: number;
    pois: PoiNode[];
}

const HotelListItem: React.FC<IHotelListItemProps> = (props: IHotelListItemProps) => {
    const markers: IMarkerWithName[] = useAppSelector(selectMarkers);
    const toggleRoute = useAppSelector(selectToggleRoute);
    const openRoutes = useAppSelector(selectOpenRoutesNames);

    const drawRoute = () => {
        const data: IMarkerData = {
            name: props.name,
            lat: 0,
            lng: 0,
            type: 'origin'
        }
        toggleRoute(data);
    }

    const togglePopup = () => {
        markers.forEach((m) => {
            if (m.name === props.name) {
                m.marker.togglePopup();
                return;
            }
        });
    }

    const routeData: IRouteData = {
        pois: props.pois
    }

    return (
        <>
            <Grid container display="flex" className="list-item" onMouseEnter={togglePopup} onMouseLeave={togglePopup} onClick={drawRoute}>
                <div className="list-item-header">
                    <Grid item xs={2} display="flex" justifyContent="center" alignItems="center" ><HotelIcon /></Grid>
                    <Grid item xs={10} container direction="column">
                        <Grid item className="hotel-name">{props.name}</Grid>
                        <Grid item className="hotel-distance">Total Distance: {props.distance.toFixed(1)} m</Grid>
                    </Grid>
                </div>
                
                <Grid item xs={12} display={openRoutes.includes(props.name) ? 'block': 'none'}>
                    <RouteItem route={routeData} />
                </Grid>
            </Grid>
        </>
    )
}

export default HotelListItem;