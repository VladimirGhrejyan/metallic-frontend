import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.APP_API_URL,
    }),
    endpoints: () => ({}),
});
