import { configureStore } from '@reduxjs/toolkit';
import routeDataReducer from './routeDataSlice';
import mapDataReducer from './mapDataSlice';

const store = configureStore({
    reducer: {
        routeData: routeDataReducer,
        mapData: mapDataReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;