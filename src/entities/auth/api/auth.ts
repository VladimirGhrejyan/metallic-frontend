import { StorageKeys, storage } from '~shared/lib/storage';

import { enhancedApi as genAuthApi } from './auth.gen';
import type { SignUpInputDto } from './auth.gen';

export type { SignUpInputDto };

export const authApi = genAuthApi.enhanceEndpoints({
    endpoints: {
        signUp: {
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    storage.set(StorageKeys.ACCESS_TOKEN, data.access_token);
                } catch (error) {
                    console.log(error);
                }
            },
        },

        signIn: {
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    storage.set(StorageKeys.ACCESS_TOKEN, data.access_token);
                } catch (error) {
                    console.log(error);
                }
            },
        },
    },
});
export const { useSignInMutation, useSignUpMutation } = authApi;
