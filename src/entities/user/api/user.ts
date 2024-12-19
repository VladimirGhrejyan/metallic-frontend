import { enhancedApi as genUserApi } from './user.gen';

export const userApi = genUserApi.enhanceEndpoints({});
export const { useGetMeQuery, useLazyGetMeQuery } = userApi;
