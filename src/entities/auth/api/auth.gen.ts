import { api } from '/home/vladimir/Desktop/projects/metallic-fe/src/shared/config/api';

export const addTagTypes = ['auth'] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            signIn: build.mutation<SignInApiResponse, SignInApiArg>({
                query: (queryArg) => ({
                    url: `/auth/sign-in`,
                    method: 'POST',
                    body: queryArg.signInInputDto,
                }),
                invalidatesTags: ['auth'],
            }),
            signUp: build.mutation<SignUpApiResponse, SignUpApiArg>({
                query: (queryArg) => ({
                    url: `/auth/sign-up`,
                    method: 'POST',
                    body: queryArg.signUpInputDto,
                }),
                invalidatesTags: ['auth'],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as enhancedApi };
export type SignInApiResponse = /** status 201  */ SignInOutputDto;
export type SignInApiArg = {
    signInInputDto: SignInInputDto;
};
export type SignUpApiResponse = /** status 201  */ SignUpOutputDto;
export type SignUpApiArg = {
    signUpInputDto: SignUpInputDto;
};
export type SignInOutputDto = {
    access_token: string;
};
export type SignInInputDto = {
    email: string;
    password: string;
};
export type SignUpOutputDto = {
    access_token: string;
};
export type SignUpInputDto = {
    email: string;
    password: string;
};
