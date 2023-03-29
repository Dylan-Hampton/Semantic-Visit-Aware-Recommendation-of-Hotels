import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Route from './RouteResponse';
import { RootState } from '../../store';

interface RouteState {
    routes: Route[],
}

const initialState: RouteState = {
    routes: [],
}

export const routeSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        changeRoutes: (state, action: PayloadAction<Route[]>) => {
            state.routes = action.payload
        },
    }
})

export const { changeRoutes } = routeSlice.actions

// Add selectors here
export const selectRoutes = (state: RootState) => state.response.routes

export default routeSlice.reducer