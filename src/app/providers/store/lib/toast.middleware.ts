import {
    type Middleware,
    type MiddlewareAPI,
    isFulfilled,
    isRejectedWithValue,
} from '@reduxjs/toolkit';

import { showSnackbar } from './snackbar-slice';
import { hasErrorMessage, hasMethod, isSignInUrl } from './utils/toast.guard';

export const toastiMiddleware: Middleware =
    ({ dispatch }: MiddlewareAPI) =>
    (next) =>
    (action) => {
        if (isRejectedWithValue(action) && hasErrorMessage(action)) {
            dispatch(
                showSnackbar({
                    message: action.payload.data.message,
                    severity: 'error',
                }),
            );
        }

        if (isFulfilled(action)) {
            if (hasMethod(action, 'PATCH') || hasMethod(action, 'PUT')) {
                dispatch(
                    showSnackbar({
                        message: 'Successfully updated',
                        severity: 'success',
                    }),
                );
            }

            if (hasMethod(action, 'POST')) {
                if (isSignInUrl(action)) {
                    dispatch(
                        showSnackbar({
                            message: 'Successfully sign in',
                            severity: 'success',
                        }),
                    );
                } else {
                    dispatch(
                        showSnackbar({
                            message: 'Successfully created',
                            severity: 'success',
                        }),
                    );
                }
            }

            if (hasMethod(action, 'DELETE')) {
                dispatch(
                    showSnackbar({
                        message: 'Successfully deleted',
                        severity: 'success',
                    }),
                );
            }
        }

        return next(action);
    };
