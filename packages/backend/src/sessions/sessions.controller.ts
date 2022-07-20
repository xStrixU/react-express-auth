import status from 'http-status';

import { authenticate } from '../auth/auth.facade';
import { AuthenticationError } from '../auth/errors/authentication.error';
import { SESSION_COOKIE_NAME } from '../shared/config/constants.config';
import { HttpError } from '../shared/errors/http/http.error';
import { InternalServerError } from '../shared/errors/http/internal-server.error';
import { createUserDto } from '../users/users.factory';

import type { Handler } from '../shared/types';

import type {
  CreateSessionRequest,
  CreateSessionResponse,
  DeleteSessionResponse,
} from '@react-express-auth/common';

export const createSession: Handler<
  CreateSessionRequest,
  CreateSessionResponse
> = async (req, res, next) => {
  const {
    body: { login, password },
  } = req;
  try {
    const user = await authenticate(login, password);

    req.session.login = login;

    res.status(status.CREATED).json(createUserDto(user));
  } catch (err) {
    const error =
      err instanceof AuthenticationError
        ? new HttpError(status.UNAUTHORIZED, err.message)
        : new InternalServerError();

    next(error);
  }
};

export const deleteSession: Handler<never, DeleteSessionResponse> = (
  req,
  res,
  next
) => {
  req.session.destroy(err => {
    if (err) {
      return next(new InternalServerError());
    }

    res.clearCookie(SESSION_COOKIE_NAME);
    res.status(status.OK).end();
  });
};
