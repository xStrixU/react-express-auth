import { UserRoleName } from '@prisma/client';
import { RequestHandler } from 'express';
import status from 'http-status';

import { HttpError } from '../shared/errors/http/http.error';
import { UnauthorizedError } from '../shared/errors/http/unauthorized.error';
import { findByLogin } from '../users/users.facade';

export const auth =
  (...roles: UserRoleName[]): RequestHandler =>
  async (req, res, next) => {
    const { login } = req.session;

    if (login) {
      const user = await findByLogin(login);

      if (user) {
        const userRoleNames = user.roles.map(({ name }) => name);
        const includeRoles = roles.every(roleName =>
          userRoleNames.includes(roleName)
        );

        if (includeRoles) {
          req.authData = {
            user,
            roles: userRoleNames,
          };

          return next();
        }

        return next(
          new HttpError(status.FORBIDDEN, String(status[status.FORBIDDEN]))
        );
      }
    }

    next(new UnauthorizedError());
  };
