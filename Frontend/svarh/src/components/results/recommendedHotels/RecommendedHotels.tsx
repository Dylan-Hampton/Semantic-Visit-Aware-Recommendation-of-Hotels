import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Hotel from './Hotel';
import HotelListItem from './HotelListItem/HotelListItem';
import './RecommendedHotels.css';
import ListControlButton from './ListControlButton/ListControlButton';
import { useAppSelector } from '../../../hooks';
import { selectOpenRoutesNames } from '../../../mapDataSlice';

interface IRecommendedHotelsProps {
    hotels: Hotel[];
}

const RecommendedHotels: React.FC<IRecommendedHotelsProps> = (props: IRecommendedHotelsProps) => {
    let hotels = props.hotels.sort((a, b) => a.routeLength - b.routeLength)
    const [hotelRoutes, setHotelRoutes] = useState<Map<string, boolean>>(new Map<string, boolean>());
    const openRoutes = useAppSelector(selectOpenRoutesNames);

    useEffect(() => {
        let hotelRoutesMap = new Map<string, boolean>();
        props.hotels.forEach(h => {
            hotelRoutesMap.set(h.name, true);
        });
        setHotelRoutes(hotelRoutesMap);
        return () => {
            setHotelRoutes(new Map<string, boolean>());
        }
    }, [props.hotels]);

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
                <div className="recommended-hotels-body" style={{height: openRoutes.length > 0 ? 'calc(100% - 52px - 26px)' : 'calc(100% - 52px)'}}>
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
                {openRoutes.length > 0 &&
                    <div className="recommended-hotels-footer">
                        <Divider sx={{width: '100%', paddingBottom: 0}}/>
                        <div className="recommended-hotels-toggle">    
                            <div className="recommended-hotels-toggle-button">
                                <ListControlButton showRoutes={toggleRoutes} getNumRoutesOpen={getNumRoutesOpen}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default RecommendedHotels;