import { Router } from 'express';

import { createUser, getAuthenticatedUser } from './users.controller';
import { createUserSchema } from './users.schema';

import { auth } from '../auth/auth.middleware';
import { validate } from '../shared/middlewares/validation.middleware';

export const router = Router();
export const basePath = '/users';

router.post('/', validate(createUserSchema), createUser);

router.get('/me', auth(), getAuthenticatedUser);
