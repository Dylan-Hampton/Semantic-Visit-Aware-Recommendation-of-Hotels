import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

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
    algorithm: -1,
    origins: -1,
    distance: -1,
    categories: [],
}

export const submitSlice = createSlice({
    name: 'submit',
    initialState,
    reducers: {
        changeCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload
        },
        changePois: (state, action: PayloadAction<string[]>) => {
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

export const { } = submitSlice.actions

export const generateRoute = () => (dispatch: any) => {
    // fetch(apiUrl + '/cities').then(async (response) => {
    //     const data = await response.json();
    //     if (response.ok) {
    //         const cities = data as City[];
    //         if (cities.length === 0) {
    //             setFailAlert(true);
    //         }
    //         setCities(cities);
    //     }
    //     else {
    //         setFailAlert(true);
    //     }
    // }).catch(() => {
    //     setFailAlert(true);
    // });
}

// Add selectors here
//export const select[Something] = (state: RootState) => state.[...].value

export default submitSlice.reducer