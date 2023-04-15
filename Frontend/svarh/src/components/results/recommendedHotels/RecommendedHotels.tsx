import { Divider, Grid } from '@mui/material';
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
        let newMap = new Map([...hotelRoutes]);
        hotelRoutes.forEach((isOpen, name) => {
            if (!openRoutes.includes(name)) {
                newMap.set(name, true);
            }
        });
        setHotelRoutes(newMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openRoutes]);

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

    const expandRoutes = () => {
        toggleRoutes(true);
    }

    const collapseRoutes = () => {
        toggleRoutes(false);
    }

    const toggleRoutes = (open?: boolean) => {
        let newMap = new Map<string, boolean>();
        hotelRoutes.forEach((isOpen, name) => {
            newMap.set(name, open !== undefined ? open : getNumRoutesOpen() === 0);
        });
        hotelRoutes.forEach((isOpen, name) => {
            if (!openRoutes.includes(name)) {
                newMap.set(name, true);
            }
        });
        setHotelRoutes(newMap);
    }

    const getNumRoutesOpen = (): number => {
        let count = 0;
        hotelRoutes.forEach((isOpen, name) => {
            if (isOpen && openRoutes.includes(name)) count++;
        });
        return count;
    }

    const hotelCanShowRoute = (name: string): boolean => {
        if (hotelRoutes.has(name)) {
            return hotelRoutes.get(name);
        }
        return false;
    }
    
    const toggleRoute = (hotelName: string) => {
        const newMap = new Map([...hotelRoutes]);
        newMap.set(hotelName, !hotelRoutes.get(hotelName));
        setHotelRoutes(newMap);
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
                                <HotelListItem name={h.name} distance={h.routeLength} pois={h.pois} canShowRoute={hotelCanShowRoute} toggle={toggleRoute} />
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
                            <Grid container display="flex">
                                <Grid item xs={6} display="flex">
                                        <div className="recommended-hotels-toggle-button left-toggle-button" onClick={collapseRoutes}>
                                        <ListControlButton option={'collapse'}/>
                                    </div>
                                </Grid>
                                <Grid item xs={6} display="flex">  
                                    <div className="recommended-hotels-toggle-button right-toggle-button" onClick={expandRoutes}>
                                        <ListControlButton option={'expand'}/>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default RecommendedHotels;