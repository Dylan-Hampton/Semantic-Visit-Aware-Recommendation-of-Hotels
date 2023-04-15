import React from 'react';
import { selectRoutes } from '../../routeDataSlice';
import { useAppSelector } from '../../hooks';
import Route from '../../data/response/RouteResponse';
import RecommendedHotels from './recommendedHotels/RecommendedHotels';
import Hotel from './recommendedHotels/Hotel';

interface IResultsProps {

}

const Results: React.FC<IResultsProps> = (props: IResultsProps) => {
    const routes: Route[] = useAppSelector(selectRoutes);
    return (
        <>
        {routes.length > 0 &&
            <RecommendedHotels hotels={routes.map(r => {
                const hotel: Hotel = {
                    name: r.origin.name,
                    routeLength: r.distance,
                    pois: r.pois
                }
                return hotel;
            })} /> 
        }
        </>
    )
}

export default Results;