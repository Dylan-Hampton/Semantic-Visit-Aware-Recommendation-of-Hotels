import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Algorithm, DIJKSTRA, POIFIRST, ORIGINFIRST, RANDOMWALK } from './data/Algorithm';
import { generateRoute } from './data/api';
import { City } from './data/City';
import Route from './data/response/RouteResponse';
import { RootState } from './store';
import { KILOMETERS, METERS, MILES } from "./components/inputBar/inputFields/MetricDropdown/MetricDropdown";

interface SubmitState {
    cities: City[],
    city: City,
    algorithm: Algorithm,
    origins: number,
    distance: number,
    categories: { [name: string]: number },
    algorithmChoices: string[],
    routes: Route[],
    loading: boolean,
    distMetric: string,
}

const initialState: SubmitState = {
    cities: [],
    city: {
        cityName: '',
        poiTypes: [],
        lat: 40.731491,
        lng: -73.997093
    },
    algorithmChoices: [RANDOMWALK, DIJKSTRA, POIFIRST, ORIGINFIRST],
    algorithm: {
        algorithmName: ORIGINFIRST,
        algorithmNum: 3,
    },
    origins: 10,
    distance: -1,
    categories: {},
    routes: [],
    loading: false,
    distMetric: MILES,
}


export const routeDataSlice = createSlice({
    name: 'routeData',
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
                    lat: 0,
                    lng: 0
                }
                state.categories = {}
            }
        },
        changeAlgorithm: (state, action: PayloadAction<string>) => {
            switch (action.payload) {
                case DIJKSTRA:
                    state.algorithm.algorithmNum = 0
                    state.algorithm.algorithmName = DIJKSTRA
                    break;
                case RANDOMWALK:
                    state.algorithm.algorithmNum = 1
                    state.algorithm.algorithmName = RANDOMWALK
                    break;
                case POIFIRST:
                    state.algorithm.algorithmNum = 2
                    state.algorithm.algorithmName = POIFIRST
                    break;
                case ORIGINFIRST:
                    state.algorithm.algorithmNum = 3
                    state.algorithm.algorithmName = ORIGINFIRST
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
        changeDistanceMetric: (state, action: PayloadAction<string>) => {
            switch (action.payload) {
                case MILES:
                    state.distMetric = action.payload;
                    break;
                case KILOMETERS:
                    state.distMetric = action.payload;
                    break;
                case METERS:
                    state.distMetric = action.payload;
                    break;
                default:
                    break;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(generateRoute.pending, (state, action) => {
            state.loading = true
        })
        .addCase(generateRoute.fulfilled, (state, action) => {
            state.loading = false
            state.routes = action.payload
        })
        .addCase(generateRoute.rejected, (state, action) => {
            state.loading = false
        })
    },
})

export const { changeCity, changeAlgorithm, changeOrigins, changeDistance, changeCategories, receivedCities, changeDistanceMetric } = routeDataSlice.actions

// Add selectors here
export const selectDistance = (state: RootState) => state.routeData.distance
export const selectCity = (state: RootState) => state.routeData.city
export const selectAlgorithm = (state: RootState) => state.routeData.algorithm
export const selectOrigins = (state: RootState) => state.routeData.origins
export const selectCategories = (state: RootState) => state.routeData.categories
export const selectCities = (state: RootState) => state.routeData.cities
export const selectAlgorithmChoices = (state: RootState) => state.routeData.algorithmChoices
export const selectRoutes = (state: RootState) => state.routeData.routes
export const selectDistanceMetric = (state: RootState) => state.routeData.distMetric

export default routeDataSlice.reducer