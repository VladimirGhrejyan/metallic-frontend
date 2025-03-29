import { router } from '~app/providers/router/config/router';
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
                    storage.set(StorageKeys.ACCESS_TOKEN, `Bearer ${data.access_token}`);
                    router.navigate({ to: '/' });
                } catch (error) {
                    console.log(error);
                }
            },
        },

        signIn: {
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    storage.set(StorageKeys.ACCESS_TOKEN, `Bearer ${data.access_token}`);
                    router.navigate({ to: '/' });
                } catch (error) {
                    console.log(error);
                }
            },
        },
    },
});
export const { useSignInMutation, useSignUpMutation } = authApi;
