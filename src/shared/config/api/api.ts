import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StorageKeys, storage } from '~shared/lib/storage';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.APP_API_URL,
        prepareHeaders: (headers) => {
            const token = storage.get(StorageKeys.ACCESS_TOKEN);
            if (token) {
                headers.set('Authorization', token);
            }
        },
    }),
    endpoints: () => ({}),
});
