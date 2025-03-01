import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from '~shared/config/api';

import { authMiddleware } from '../lib/auth.middleware';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([api.middleware, authMiddleware]),
});
