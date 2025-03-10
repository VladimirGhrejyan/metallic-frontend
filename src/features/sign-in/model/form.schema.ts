import { z } from 'zod';

import { signInFormConstants } from './form.constants';

const { EMAIL_REQUIRED, EMAIL_INVALID, PASSWORD_REQUIRED } = signInFormConstants.ERRORS;

export const signInSchema = z.object({
    email: z.string().min(1, EMAIL_REQUIRED).email(EMAIL_INVALID),
    password: z.string().min(1, PASSWORD_REQUIRED),
});
