import { Divider } from '@mui/material';
import React, { useState } from 'react';
import Hotel from './Hotel';
import HotelListItem from './HotelListItem/HotelListItem';
import './RecommendedHotels.css';
import ListControlButton from './ListControlButton/ListControlButton';

interface IRecommendedHotelsProps {
    hotels: Hotel[];
}

const RecommendedHotels: React.FC<IRecommendedHotelsProps> = (props: IRecommendedHotelsProps) => {
    let hotels = props.hotels.sort((a, b) => a.routeLength - b.routeLength)
    const [hotelRoutes, setHotelRoutes] = useState<Map<string, boolean>>(new Map<string, boolean>);

    const toggleRoutes = (show: boolean) => {
        let newMap = new Map<string, boolean>();
        hotelRoutes.forEach((isOpen, name) => {
            newMap.set(name, show);
        });
        setHotelRoutes(newMap);
    }

    const getNumRoutesOpen = (): number => {
        let count = 0;
        hotelRoutes.forEach((isOpen, name) => {
            if (isOpen) count++;
        });
        return count;
    }

    const hotelCanShowRoute = (name: string): boolean => {
        if (hotelRoutes.has(name)) {
            return hotelRoutes.get(name);
        }
        return false;
    }

    return (
        <>
            <div className="recommended-hotels-container">
                <div className="recommended-hotels-header">
                    <h3 className="recommended-hotels-title">Recommended Hotels</h3>
                </div>
                <Divider sx={{ width: '100%'}}/>
                <div className="recommended-hotels-body">
                    {hotels.map((h, i) => {
                        return (
                            <div key={i}>
                                <HotelListItem name={h.name} distance={h.routeLength} pois={h.pois} canShowRoute={hotelCanShowRoute}/>
                                {i !== props.hotels.length - 1 &&
                                    <Divider/>
                                }
                            </div>
                        )
                    })}
                </div>
                <div className="recommended-hotels-footer">
                    <ListControlButton showRoutes={toggleRoutes} showAdd={getNumRoutesOpen() === 0}/>
                </div>
            </div>
        </>
    )
}

export default RecommendedHotels;