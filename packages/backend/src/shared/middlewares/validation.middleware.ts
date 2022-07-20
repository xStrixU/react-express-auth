import status from 'http-status';
import { ValidationError } from 'yup';

import { HttpError } from '../errors/http/http.error';
import { InternalServerError } from '../errors/http/internal-server.error';

import type { RequestHandler } from 'express';
import type { ObjectSchema } from 'yup';
import type { ObjectShape } from 'yup/lib/object';

export const validate =
  <T extends ObjectShape>(schema: ObjectSchema<T>): RequestHandler =>
  async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });

      next();
    } catch (err) {
      const error =
        err instanceof ValidationError
          ? new HttpError(status.BAD_REQUEST, err.errors.join(', '))
          : new InternalServerError();

      next(error);
    }
  };
