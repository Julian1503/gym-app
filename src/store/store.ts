import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import {apiErrorMiddleware} from "./apiErrorMiddleware";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware();
        middleware.push(apiErrorMiddleware);
        return middleware;
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;