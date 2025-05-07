import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { snackbarMiddleware, snackbarSlice } from '~entities/snackbar';
import { api } from '~shared/config/api';

import { authMiddleware } from '../lib/auth.middleware';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    snackbar: snackbarSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([api.middleware, authMiddleware, snackbarMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
