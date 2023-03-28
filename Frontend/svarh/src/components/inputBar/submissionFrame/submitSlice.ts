import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Algorithm, DIJKSTRA, EDGEFIRST, NODEFIRST, RANDOMWALK } from '../../../data/Algorithm';
import { City } from '../../../data/City';
import { RootState } from '../../../store';

interface SubmitState {
    cities: City[],
    city: City,
    algorithm: Algorithm,
    origins: number,
    distance: number,
    categories: { [name: string]: number },
    algorithmChoices: string[],
}

const initialState: SubmitState = {
    cities: [],
    city: {
        cityName: '',
        poiTypes: [],
    },
    algorithmChoices: [RANDOMWALK, DIJKSTRA, EDGEFIRST, NODEFIRST],
    algorithm: {
        algorithmName: NODEFIRST,
        algorithmNum: 3,
    },
    origins: 10,
    distance: -1,
    categories: {
        
    },
}


export const submitSlice = createSlice({
    name: 'submit',
    initialState,
    reducers: {
        receivedCities: (state, action: PayloadAction<City[]>) => {
            state.cities = action.payload
        },
        changeCity: (state, action: PayloadAction<City>) => {
            if (action.payload !== undefined) {
                state.city = action.payload
                state.categories = {}
                for (const name of state.city.poiTypes) {
                    state.categories[name] = 0;
                }
            } else {
                state.city = {
                    cityName: '',
                    poiTypes: [],
                }
                state.categories = {}
            }
        },
        changeAlgorithm: (state, action: PayloadAction<string>) => {
            switch (action.payload) {
                case RANDOMWALK:
                    state.algorithm.algorithmNum = 0
                    state.algorithm.algorithmName = RANDOMWALK
                    break;
                case DIJKSTRA:
                    state.algorithm.algorithmNum = 1
                    state.algorithm.algorithmName = DIJKSTRA
                    break;
                case EDGEFIRST:
                    state.algorithm.algorithmNum = 2
                    state.algorithm.algorithmName = EDGEFIRST
                    break;
                case NODEFIRST:
                    state.algorithm.algorithmNum = 3
                    state.algorithm.algorithmName = NODEFIRST
                    break;
                default:
                    break;
            }
        },
        changeOrigins: (state, action: PayloadAction<number>) => {
            state.origins = action.payload
        },
        changeDistance: (state, action: PayloadAction<number>) => {
            state.distance = action.payload
        },
        changeCategories: (state, action: PayloadAction<{ [name: string]: number }>) => {
            state.categories = action.payload
        },
    }
})

export const { changeCity, changeAlgorithm, changeOrigins, changeDistance, changeCategories, receivedCities } = submitSlice.actions

// Add selectors here
export const selectDistance = (state: RootState) => state.submit.distance
export const selectCity = (state: RootState) => state.submit.city
export const selectAlgorithm = (state: RootState) => state.submit.algorithm
export const selectOrigins = (state: RootState) => state.submit.origins
export const selectCategories = (state: RootState) => state.submit.categories
export const selectCities = (state: RootState) => state.submit.cities
export const selectAlgorithmChoices = (state: RootState) => state.submit.algorithmChoices

export default submitSlice.reducer