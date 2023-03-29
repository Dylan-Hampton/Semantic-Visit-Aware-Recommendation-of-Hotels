import { configureStore } from '@reduxjs/toolkit';
import submitReducer from './components/inputBar/submissionFrame/submitSlice';
import routeSlice from './data/response/routeSlice';

const store = configureStore({
    reducer: {
        submit: submitReducer,
        response: routeSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;