import { createAsyncThunk } from '@reduxjs/toolkit';
import RouteRequest from './request/RouteRequest';
import { apiUrl } from './Constants';
import Route from './response/RouteResponse';
import { MILES, KILOMETERS, METERS, MILETOMETER, KILOMETERTOMETER } from '../components/inputBar/inputFields/MetricDropdown/MetricDropdown';

export const generateRoute = createAsyncThunk<
    Route[], 
    {request: RouteRequest, distanceMetric: string}
    >(
    'submit/generateRoute',
    async (payload: {request: RouteRequest, distanceMetric: string}) => {
        let metricToMeter = Number(1);
        switch(payload.distanceMetric) {
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
        const r: RouteRequest = {
            algorithm: payload.request.algorithm,
            origins: payload.request.origins,
            distance: (payload.request.distance * metricToMeter),
            categories: payload.request.categories,
            city: payload.request.city
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