import { z } from 'zod';

export const configSchema = z.object({
    APP_TITLE: z.string(),
});
