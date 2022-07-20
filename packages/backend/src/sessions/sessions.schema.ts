import { object, string } from 'yup';

import type { CreateSessionRequest } from '@react-express-auth/common';
import type { SchemaOf } from 'yup';

export const createSessionSchema: SchemaOf<CreateSessionRequest> = object({
  login: string().required(),
  password: string().required(),
});
