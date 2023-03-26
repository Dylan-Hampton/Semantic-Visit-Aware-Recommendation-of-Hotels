import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import RouteRequest from '../../../data/request/RouteRequest';

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
    algorithm: 2,
    origins: 10,
    distance: -1,
    categories: [],
}

export const generateRoute = createAsyncThunk(
    'submit/generateRoute',
    // The payload creator receives the partial `{title, content, user}` object
    async (state: any) => {
        const r: RouteRequest = {
            algorithm: state.algorithm,
            origins: 10,
            distance: state.distance,
            categories: [2, 3],
        }
        // We send the initial data to the fake API server
        const response = await fetch('/fakeApi/generateRoute', {
            method: 'POST',
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
//     // fetch(apiUrl + '/cities').then(async (response) => {
//     //     const data = await response.json();
//     //     if (response.ok) {
//     //         const cities = data as City[];
//     //         if (cities.length === 0) {
//     //             setFailAlert(true);
//     //         }
//     //         setCities(cities);
//     //     }
//     //     else {
//     //         setFailAlert(true);
//     //     }
//     // }).catch(() => {
//     //     setFailAlert(true);
//     // });
// }

// Add selectors here
//export const select[Something] = (state: RootState) => state.[...].value

export default submitSlice.reducer