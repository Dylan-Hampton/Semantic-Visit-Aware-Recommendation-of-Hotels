import { createAsyncThunk } from '@reduxjs/toolkit';
import RouteRequest from './request/RouteRequest';
import { apiUrl } from './Constants';

export const generateRoute = createAsyncThunk(
    'submit/generateRoute',
    async (request: RouteRequest) => {
        const r: RouteRequest = {
            algorithm: request.algorithm,
            origins: request.origins,
            distance: request.distance,
            categories: request.categories,
        }
        console.log('data:', JSON.stringify(r))
        // We send the initial data to the fake API server
        const response = await fetch(apiUrl + '/routes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(r),
        })
        console.log(response.json())
        // The response includes the complete post object, including unique ID
        return response.json()
    }
  )