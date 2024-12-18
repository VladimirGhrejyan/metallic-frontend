import { api } from '/home/vladimir/Desktop/projects/metallic-fe/src/shared/config/api';

export const addTagTypes = ['users'] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getMe: build.query<GetMeApiResponse, GetMeApiArg>({
                query: () => ({ url: `/users/me` }),
                providesTags: ['users'],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as enhancedApi };
export type GetMeApiResponse = /** status 200  */ GetMeOutputDto;
export type GetMeApiArg = void;
export type GetMeOutputDto = {
    id: number;
    username: string;
};
