import { UnknownAction } from '@reduxjs/toolkit';

type TErrorPayload = {
    data: {
        message: string;
    };
};

type TRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const hasErrorMessage = (
    action: UnknownAction,
): action is UnknownAction & { payload: TErrorPayload } => {
    return (
        typeof action.payload === 'object' &&
        action.payload !== null &&
        'data' in action.payload &&
        typeof action.payload.data === 'object' &&
        action.payload.data !== null &&
        'message' in action.payload.data &&
        typeof action.payload.data.message === 'string'
    );
};

export const hasMethod = (
    action: UnknownAction,
    method: TRequestMethod,
): action is UnknownAction & { payload: TErrorPayload } => {
    return (
        typeof action.meta === 'object' &&
        action.meta !== null &&
        'baseQueryMeta' in action.meta &&
        typeof action.meta.baseQueryMeta === 'object' &&
        action.meta.baseQueryMeta !== null &&
        'request' in action.meta.baseQueryMeta &&
        typeof action.meta.baseQueryMeta.request === 'object' &&
        action.meta.baseQueryMeta.request !== null &&
        'method' in action.meta.baseQueryMeta.request &&
        typeof action.meta.baseQueryMeta.request.method === 'string' &&
        action.meta.baseQueryMeta.request.method === method
    );
};

export const isSignInUrl = (
    action: UnknownAction,
): action is UnknownAction & { payload: TErrorPayload } => {
    return (
        typeof action.meta === 'object' &&
        action.meta !== null &&
        'baseQueryMeta' in action.meta &&
        typeof action.meta.baseQueryMeta === 'object' &&
        action.meta.baseQueryMeta !== null &&
        'response' in action.meta.baseQueryMeta &&
        typeof action.meta.baseQueryMeta.response === 'object' &&
        action.meta.baseQueryMeta.response !== null &&
        'url' in action.meta.baseQueryMeta.response &&
        typeof action.meta.baseQueryMeta.response.url === 'string' &&
        action.meta.baseQueryMeta.response.url.includes('/sign-in')
    );
};
