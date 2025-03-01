type TErrorPayload = {
    status: number;
    data: {
        errors: unknown[];
        message: string;
        statusCode: number;
    };
};

export const isErrorResponse = (payload: unknown): payload is TErrorPayload => {
    return (
        typeof payload === 'object' &&
        payload !== null &&
        'status' in payload &&
        typeof payload.status === 'number' &&
        'data' in payload &&
        typeof payload.data === 'object' &&
        payload.data !== null &&
        'errors' in payload.data &&
        Array.isArray(payload.data.errors) &&
        'message' in payload.data &&
        typeof payload.data.message === 'string' &&
        'statusCode' in payload.data &&
        typeof payload.data.statusCode === 'number'
    );
};
