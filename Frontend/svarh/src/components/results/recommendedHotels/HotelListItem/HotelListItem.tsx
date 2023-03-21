import { Grid } from '@mui/material';
import React from 'react';
import HotelIcon from '@mui/icons-material/Hotel';
import './HotelListItem.css';

interface IHotelListItemProps {
    name: string;
    distance: number;
}

const HotelListItem: React.FC<IHotelListItemProps> = (props: IHotelListItemProps) => {
    return (
        <>
            <Grid container display="flex" className="list-item">
                <Grid item xs={2} display="flex" justifyContent="center" alignItems="center" ><HotelIcon /></Grid>
                <Grid item xs={10} container direction="column">
                    <Grid item className="hotel-name">{props.name}</Grid>
                    <Grid item className="hotel-distance">Total Distance: {props.distance}</Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default HotelListItem;