import { object, string } from 'yup';
import { PASSWORD_REGEX } from '@react-express-auth/common';

import type { CreateUserRequest } from '@react-express-auth/common';
import type { SchemaOf } from 'yup';

export const createUserSchema: SchemaOf<CreateUserRequest> = object({
  firstName: string().required(),
  lastName: string().required(),
  username: string().required(),
  email: string().required(),
  password: string()
    .matches(PASSWORD_REGEX, 'Password must contains at least 5 characters.')
    .required(),
});
