import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import RouteRequest from '../../../data/request/RouteRequest';
import { apiUrl } from '../../../data/Constants';

interface SubmitState {
    city: string,
    pois: string[],
    algorithm: number,
    origins: number,
    distance: number,
    categories: number[],
}

const initialState: SubmitState = {
    city: '',
    pois: [],
    algorithm: 3,
    origins: 1,
    distance: -1,
    categories: [0,1,0,1,0,1],
}

export const generateRoute = createAsyncThunk(
    'submit/generateRoute',
    // The payload creator receives the partial `{title, content, user}` object
    async (request: any) => {
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


export const submitSlice = createSlice({
    name: 'submit',
    initialState,
    reducers: {
        changeCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload
        },
        changePois: (state, action: PayloadAction<any[]>) => {
            state.pois = action.payload
        },
        changeAlgorithm: (state, action: PayloadAction<number>) => {
            state.algorithm = action.payload
        },
        changeOrigins: (state, action: PayloadAction<number>) => {
            state.origins = action.payload
        },
        changeDistance: (state, action: PayloadAction<number>) => {
            state.distance = action.payload
        },
        changeCategories: (state, action: PayloadAction<number[]>) => {
            state.categories = action.payload
        },
    }
})

export const { changeCity, changePois, changeAlgorithm, changeOrigins, changeDistance, changeCategories } = submitSlice.actions

// export const generateRoute = () => (dispatch: any) => {
// }

// Add selectors here
export const selectDistance = (state: RootState) => state.submit.distance
export const selectCity = (state: RootState) => state.submit.city
export const selectAlgorithm = (state: RootState) => state.submit.algorithm
export const selectOrigins = (state: RootState) => state.submit.origins
export const selectCategories = (state: RootState) => state.submit.categories

export default submitSlice.reducer