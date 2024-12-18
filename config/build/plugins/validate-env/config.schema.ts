import { z } from 'zod';

export const configSchema = z.object({
    APP_TITLE: z.string(),
    APP_API_URL: z.string(),
    APP_OPENAPI_SCHEMA_URL: z.string(),
});
