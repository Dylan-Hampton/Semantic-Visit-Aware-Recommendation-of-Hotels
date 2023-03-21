import { Divider } from '@mui/material';
import React from 'react';
import Hotel from './Hotel';
import HotelListItem from './HotelListItem/HotelListItem';
import './RecommendedHotels.css';

interface IRecommendedHotelsProps {
    hotels: Hotel[];
}

const RecommendedHotels: React.FC<IRecommendedHotelsProps> = (props: IRecommendedHotelsProps) => {
    let hotels = props.hotels.sort((a, b) => a.routeLength - b.routeLength)
    return (
        <>
            <div className="recommended-hotels-container">
                <div className="recommended-hotels-header">
                    <h3 className="recommended-hotels-title">Recommended Hotels</h3>
                </div>
                <Divider sx={{padding: 1, width: '100%'}}/>
                <div className="recommended-hotels-body">
                    {hotels.map((h, i) => {
                        return (
                            <>
                                <HotelListItem name={h.name} distance={h.routeLength} />
                                {i !== props.hotels.length - 1 &&
                                    <Divider />
                                }
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default RecommendedHotels;