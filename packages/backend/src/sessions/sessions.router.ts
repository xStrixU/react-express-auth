import { Router } from 'express';

import { createSession, deleteSession } from './sessions.controller';
import { createSessionSchema } from './sessions.schema';

import { validate } from '../shared/middlewares/validation.middleware';

export const router = Router();
export const basePath = '/sessions';

router.post('/', validate(createSessionSchema), createSession);

router.delete('/', deleteSession);
