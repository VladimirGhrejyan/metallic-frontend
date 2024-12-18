import { enhancedApi as generatedAuthApi } from './auth.gen';

export const authApi = generatedAuthApi.enhanceEndpoints({});
export const { useSignInMutation, useSignUpMutation } = authApi;
