import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRouteData } from "./components/results/generatedRoute/Route/Route";
import { RootState } from './store';
import { IMarkerData } from './components/map/MapBase/MapBase';

export interface IMarkerWithName {
    marker: mapboxgl.Marker;
    name: string;
}

interface MapState {
    markers: IMarkerWithName[];
    lines: IRouteData[];
    toggleRoute: (data?: IMarkerData) => void;
}

const initialState: MapState = {
    markers: [],
    lines: [],
    toggleRoute: () => {}
}

export const mapDataSlice = createSlice({
    name: 'mapData',
    initialState: initialState,
    reducers: {
        changeMarkers: (state, action: PayloadAction<IMarkerWithName[]>) => {
            state.markers = action.payload;
        },
        addMarkerWithName: (state, action: PayloadAction<IMarkerWithName>) => {
            state.markers = [action.payload, ...state.markers];
        },
        changeLines: (state, action: PayloadAction<IRouteData[]>) => {
            state.lines = action.payload;
        },
        changeToggleRoute: (state, action: PayloadAction<(data: IMarkerData) => void>) => {
            state.toggleRoute = action.payload;
        }
    }
});

export const { changeMarkers, addMarkerWithName, changeLines, changeToggleRoute } = mapDataSlice.actions;

export const selectMarkers = (state: RootState) => state.mapData.markers;
export const selectLines = (state: RootState) => state.mapData.lines;
export const selectToggleRoute = (state: RootState) => state.mapData.toggleRoute;

export default mapDataSlice.reducer;