import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

export const loginSchema = toTypedSchema(
    yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(6).max(20).required()
    })
);

export const signSchema = toTypedSchema(
    yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(6).max(20).required(),
        confirmpassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
        name: yup.string().min(3).max(20).required(),
    })
);