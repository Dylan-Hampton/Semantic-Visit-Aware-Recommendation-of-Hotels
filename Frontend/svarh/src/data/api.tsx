import { createAsyncThunk } from '@reduxjs/toolkit';
import RouteRequest from './request/RouteRequest';
import { apiUrl } from './Constants';
import Route from './response/RouteResponse';
import { MILES, KILOMETERS, METERS, MILETOMETER, KILOMETERTOMETER } from '../components/inputBar/inputFields/MetricDropdown/MetricDropdown';
import { selectDistanceMetric } from '../routeDataSlice';
import { useAppSelector } from '../hooks';

export const generateRoute = createAsyncThunk<
    Route[], 
    RouteRequest
    >(
    'submit/generateRoute',
    async (request: RouteRequest) => {
        let metricToMeter = Number(1);
        switch(useAppSelector(selectDistanceMetric)) {
            case MILES:
                metricToMeter = MILETOMETER;
                break;
            case KILOMETERS:
                metricToMeter = KILOMETERTOMETER;
                break;
            case METERS:
                break;
            default:
                break;
        }
        console.log("conversion metric = " + metricToMeter);
        const r: RouteRequest = {
            algorithm: request.algorithm,
            origins: request.origins,
            distance: (request.distance * metricToMeter),
            categories: request.categories,
            city: request.city
        }
        const response = await fetch(apiUrl + '/routes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(r),
        })
        const data = await response.json();
        return data as Route[]
    }
  )