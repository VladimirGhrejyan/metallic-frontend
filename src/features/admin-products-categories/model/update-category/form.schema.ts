import { z } from 'zod';

import { updateProductCategoryFormConstants } from './form.constants';

const { CODE_REQUIRED, CODE_MAX_LENGTH, TITLE_REQUIRED, TITLE_MAX_LENGTH } =
    updateProductCategoryFormConstants.ERRORS;

export const updateProductCategoryFormSchema = z.object({
    code: z.string().min(1, CODE_REQUIRED).max(10, CODE_MAX_LENGTH),
    title: z.string().min(1, TITLE_REQUIRED).max(200, TITLE_MAX_LENGTH),
});
