import {
    type Middleware,
    type MiddlewareAPI,
    isFulfilled,
    isRejectedWithValue,
} from '@reduxjs/toolkit';
import { EHttpMethods } from '~shared/types/http-methods';

import { hasErrorMessage, hasMethod, isSignInUrl } from '../utils/snackbar.guard';
import { showSnackbar } from './snackbar-slice';

export const snackbarMiddleware: Middleware =
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
            if (hasMethod(action, EHttpMethods.PATCH) || hasMethod(action, EHttpMethods.PUT)) {
                dispatch(
                    showSnackbar({
                        message: 'Successfully updated',
                        severity: 'success',
                    }),
                );
            }

            if (hasMethod(action, EHttpMethods.POST)) {
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

            if (hasMethod(action, EHttpMethods.DELETE)) {
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
