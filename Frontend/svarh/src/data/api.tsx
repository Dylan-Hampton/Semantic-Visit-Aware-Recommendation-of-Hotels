import { createAsyncThunk } from '@reduxjs/toolkit';
import RouteRequest from './request/RouteRequest';
import { apiUrl } from './Constants';
import Route from './response/RouteResponse';

let miToMeter = Number(1609.344);

export const generateRoute = createAsyncThunk<
    Route[], 
    RouteRequest
    >(
    'submit/generateRoute',
    async (request: RouteRequest) => {
        const r: RouteRequest = {
            algorithm: request.algorithm,
            origins: request.origins,
            distance: (request.distance * miToMeter),
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