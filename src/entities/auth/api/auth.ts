import { enhancedApi as genAuthApi } from './auth.gen';
import type { SignUpInputDto } from './auth.gen';

export type { SignUpInputDto };

export const authApi = genAuthApi.enhanceEndpoints({});
export const { useSignInMutation, useSignUpMutation } = authApi;
