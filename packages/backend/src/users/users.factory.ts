import type { User, UserRole } from '@prisma/client';
import type { UserDto } from '@react-express-auth/common';

export const createUserDto = (user: User & { roles: UserRole[] }): UserDto => ({
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  email: user.email,
  roles: user.roles.map(({ name }) => name),
});
