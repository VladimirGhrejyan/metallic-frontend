import { z } from 'zod';

import { signUpFormConstants } from './form.constants';

const { EMAIL_REQUIRED, EMAIL_INVALID, PASSWORD_MIN } = signUpFormConstants.ERRORS;

export const signUpSchema = z.object({
    email: z.string().min(1, EMAIL_REQUIRED).email(EMAIL_INVALID),
    password: z.string().min(6, PASSWORD_MIN),
});
