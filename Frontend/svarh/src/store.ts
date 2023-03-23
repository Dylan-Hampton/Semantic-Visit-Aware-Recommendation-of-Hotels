import { configureStore } from '@reduxjs/toolkit';
import submitReducer from './components/inputBar/submissionFrame/submitSlice';

const store = configureStore({
    reducer: {
        submit: submitReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;