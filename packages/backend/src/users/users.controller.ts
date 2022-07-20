import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import status from 'http-status';

import { createUserDto } from './users.factory';

import { HttpError } from '../shared/errors/http/http.error';
import { InternalServerError } from '../shared/errors/http/internal-server.error';
import { prisma } from '../shared/lib/prisma';

import type { Handler } from '../shared/types';

import type {
  CreateUserRequest,
  CreateUserResponse,
  GetAuthenticatedUserResponse,
} from '@react-express-auth/common';

export const createUser: Handler<
  CreateUserRequest,
  CreateUserResponse
> = async (req, res, next) => {
  try {
    const {
      body: { firstName, lastName, username, email, password },
    } = req;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        roles: {
          create: [{ name: 'USER' }],
        },
      },
      include: { roles: true },
    });

    res.status(status.CREATED).json(createUserDto(user));
  } catch (err) {
    const error =
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
        ? new HttpError(
            status.CONFLICT,
            'User with this username or email already exists.'
          )
        : new InternalServerError();

    next(error);
  }
};

export const getAuthenticatedUser: Handler<
  never,
  GetAuthenticatedUserResponse
> = (req, res) => {
  res.json(createUserDto(req.authData.user));
};
