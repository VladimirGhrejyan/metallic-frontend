import { z } from 'zod';

import { createProductConstants } from './form.constants';

const {
    CODE_REQUIRED,
    CODE_MAX_LENGTH,
    TITLE_REQUIRED,
    TITLE_MAX_LENGTH,
    CATEGORY_ID_REQUIRED,
    COST_PRICE_REQUIRED,
    MARKUP_REQUIRED,
    QUANTITY_AVAILABLE_REQUIRED,
} = createProductConstants.ERRORS;

export const createProductFormSchema = z.object({
    code: z.string().min(1, CODE_REQUIRED).max(10, CODE_MAX_LENGTH),
    title: z.string().min(1, TITLE_REQUIRED).max(200, TITLE_MAX_LENGTH),
    costPrice: z
        .union([z.string(), z.number()])
        .transform((val) => (typeof val === 'string' ? parseFloat(val) : val))
        .refine((val) => !isNaN(val!), {
            message: COST_PRICE_REQUIRED,
        }),
    markup: z
        .union([z.string(), z.number()])
        .transform((val) => (typeof val === 'string' ? parseFloat(val) : val))
        .refine((val) => !isNaN(val!), {
            message: MARKUP_REQUIRED,
        }),
    quantityAvailable: z
        .union([z.string(), z.number()])
        .transform((val) => (typeof val === 'string' ? parseFloat(val) : val))
        .refine((val) => !isNaN(val!), {
            message: QUANTITY_AVAILABLE_REQUIRED,
        }),
    categoryId: z
        .number({ required_error: CATEGORY_ID_REQUIRED })
        .nullable()
        .refine((val) => val !== null, { message: CATEGORY_ID_REQUIRED }),
    description: z.string().nullable(),
});
