import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from '~shared/config/api';

import { authMiddleware } from '../lib/auth.middleware';
import { snackbarSlice } from '../lib/snackbar-slice';
import { toastiMiddleware } from '../lib/toast.middleware';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    snackbar: snackbarSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([api.middleware, authMiddleware, toastiMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
