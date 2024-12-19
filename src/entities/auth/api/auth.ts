import { enhancedApi as genAuthApi } from './auth.gen';

export const authApi = genAuthApi.enhanceEndpoints({});
export const { useSignInMutation, useSignUpMutation } = authApi;
