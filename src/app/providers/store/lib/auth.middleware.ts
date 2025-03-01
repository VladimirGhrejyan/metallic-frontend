import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { authApi } from '~entities/auth';
import { StorageKeys, storage } from '~shared/lib/storage';

import { isErrorResponse } from './utils/is-error-response.guard.ts';

enum HttpStatus {
    'UNAUTHORIZED' = 401,
}

export const authMiddleware: Middleware = (_: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const { payload } = action;

        if (isErrorResponse(payload)) {
            // logout
            if (payload.status === HttpStatus.UNAUTHORIZED) {
                storage.remove(StorageKeys.ACCESS_TOKEN);
                authApi.util.invalidateTags(['auth']);
            }
        }
    }

    return next(action);
};
