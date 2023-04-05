import React from 'react';
import { selectRoutes } from '../../routeDataSlice';
import { useAppSelector } from '../../hooks';
import Route from '../../data/response/RouteResponse';
import { IRouteData } from './recommendedHotels/Route/RouteItem';
import RecommendedHotels from './recommendedHotels/RecommendedHotels';
import GeneratedRoute from './generatedRoute/GeneratedRoute/GeneratedRoute';
import Hotel from './recommendedHotels/Hotel';
import { selectLines } from '../../mapDataSlice';

interface IResultsProps {

}

const Results: React.FC<IResultsProps> = (props: IResultsProps) => {
    const routes: Route[] = useAppSelector(selectRoutes);
    let lines: IRouteData[] = useAppSelector(selectLines); // Eventually use this through a slice, component should auto update
    return (
        <>
        {routes.length > 0 &&
            (lines.length === 0 ?
                <RecommendedHotels hotels={routes.map(r => {
                    const hotel: Hotel = {
                        name: r.origin.name,
                        routeLength: r.distance,
                        pois: r.pois
                    }
                    return hotel;
                })} /> 
            :
                <GeneratedRoute routes={lines}/>
            )
        }
        </>
    )
}

export default Results;