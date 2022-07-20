import * as bcrypt from 'bcrypt';

import { findByLogin } from '../users/users.facade';
import { AuthenticationError } from './errors/authentication.error';

export const authenticate = async (login: string, password: string) => {
  const user = await findByLogin(login);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AuthenticationError('Invalid username, email or password.');
  }

  return user;
};
