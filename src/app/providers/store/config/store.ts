import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { orderDraftSlice } from '~entities/order-draft';
import { snackbarMiddleware, snackbarSlice } from '~entities/snackbar';
import { api } from '~shared/config/api';

import { authMiddleware } from '../lib/auth.middleware';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    snackbar: snackbarSlice.reducer,
    orderDraft: orderDraftSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['orderDraft'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat([api.middleware, authMiddleware, snackbarMiddleware]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
